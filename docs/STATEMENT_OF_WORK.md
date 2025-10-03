# Statement of Work: SCC Intelligence Platform MVP
## Strategic Claim Consultants - Production-Ready MVP

**Prepared for:** Strategic Claim Consultants
**Prepared by:** Development Team
**Date:** September 30, 2025
**Timeline:** 2 Weeks (80 Hours Maximum)
**Objective:** Deliver production-ready MVP for commercial property insurance claims processing

---

## Executive Summary

This Statement of Work outlines the development effort required to transform the SCC Intelligence Platform from a functional prototype to a production-ready MVP. The scope leverages your existing GCP infrastructure (BigQuery, Google Cloud Storage) and Apache server to minimize recurring costs while delivering enterprise-grade AI-powered claims processing.

**Key Deliverables:**
- Secure authentication with Google Workspace integration
- Enterprise cloud storage (GCP) with complete media management
- AI-powered inspection report generation with RAG using BigQuery vector search
- Custom PDF generation matching client's existing template
- Complete audit trail and compliance logging
- Apache server deployment with PM2/Docker

**Cost Optimization Strategy:**
- Leverage existing BigQuery for vector database (no additional DB costs)
- Self-host on Apache server (eliminate Vercel $20/month)
- Option to self-host ChromaDB if needed (eliminate external vector DB)
- Use existing GCP credits and infrastructure

---

## Project Scope & Requirements

### 1. Infrastructure & Cloud Integration (Epic 1)

#### 1.1 Google Cloud Platform Setup (6 hours)
**Critical Components:**
- [ ] Audit existing GCP Project and IAM roles
- [ ] Create Cloud Storage buckets with lifecycle policies:
  - `scc-claims-documents` - Insurance policies, reports
  - `scc-inspection-media` - Photos, videos (with CDN)
  - `scc-audio-transcripts` - Voice recordings, transcripts
  - `scc-ai-analysis` - JSON/MD analysis files, embeddings
- [ ] Configure bucket permissions and CORS
- [ ] Set up Cloud CDN for media delivery
- [ ] Implement signed URLs for secure downloads (4-hour expiry)
- [ ] Use existing service account or create minimal-permission account

#### 1.2 BigQuery Vector Search Setup (4 hours)
**BigQuery ML for Embeddings:**
```sql
-- Create dataset for vector operations
CREATE SCHEMA IF NOT EXISTS scc_vectors;

-- Table for document embeddings
CREATE TABLE scc_vectors.embeddings (
  id STRING,
  content_type STRING, -- 'inspection_area', 'transcript', 'document'
  entity_id STRING,
  text_content STRING,
  embedding ARRAY<FLOAT64>, -- 1536 dimensions for OpenAI
  metadata JSON,
  created_at TIMESTAMP
);

-- Create vector index for similarity search
CREATE VECTOR INDEX embedding_index
ON scc_vectors.embeddings(embedding)
OPTIONS (
  distance_type = 'COSINE',
  index_type = 'IVF'
);
```

**Implementation:**
- [ ] Set up BigQuery datasets for vectors and analytics
- [ ] Create tables with vector index support
- [ ] Implement similarity search queries
- [ ] Set up scheduled queries for embedding updates
- [ ] Configure BigQuery data transfer service (if needed)

**Alternative Option: Self-Hosted ChromaDB**
- [ ] Docker container setup on Apache server
- [ ] Persistent volume for vector storage
- [ ] API endpoint configuration
- [ ] Health checks and auto-restart
- **Cost:** $0/month (self-hosted)
- **Decision Point:** BigQuery if < 10K vectors, ChromaDB if > 50K vectors

**Deliverables:**
- GCP infrastructure documented in `/docs/GCP_SETUP.md`
- BigQuery schema and indexes
- Vector search API wrapper
- Environment variables template

---

### 2. Authentication & Authorization (Epic 2)

#### 2.1 Auth.js Integration with Google OAuth (6 hours)
**Implementation:**
- [ ] Install and configure Auth.js v5 for Next.js 15 App Router
- [ ] Google Workspace OAuth integration (admin consent flow)
- [ ] Session management with JWT tokens (stored in PostgreSQL or Redis)
- [ ] Middleware-based route protection (`/dashboard/*`, `/api/*`)
- [ ] Role-based access control (RBAC):
  - `admin` - Full access
  - `adjuster` - Claims & inspections
  - `inspector` - Inspections only
  - `client` - Read-only access to their claims

**Security Requirements:**
- [ ] CSRF protection
- [ ] Session timeout (8 hours)
- [ ] Refresh token rotation
- [ ] Secure cookie settings (httpOnly, sameSite, secure)
- [ ] IP whitelist option for admin routes

**Deliverables:**
- `/middleware.ts` with auth checks
- `/app/api/auth/[...nextauth]/route.ts` configuration
- User profile UI in dashboard
- Role permission matrix documented

---

### 3. Database Schema & Architecture (Epic 3)

#### 3.1 Database Setup & Schema Design (10 hours)

**Database Options:**

**Option A: Google Cloud SQL (Recommended)**
- Fully managed PostgreSQL on GCP
- Automatic backups and point-in-time recovery
- High availability with automatic failover
- Integrated with GCP IAM
- Cost: $7-50/month depending on instance size

**Option B: Self-Hosted PostgreSQL**
- Docker container on Apache server
- Full control over configuration
- Cost: $0/month (uses existing infrastructure)
- Requires manual backup management

**Core Tables with RAG Optimization:**

```sql
-- Users & Authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) CHECK (role IN ('admin', 'adjuster', 'inspector', 'client')),
  avatar_url TEXT,
  google_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

-- Claims Management
CREATE TABLE claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_number VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(50) NOT NULL, -- 'active', 'pending', 'settled', 'closed'
  phase VARCHAR(50), -- 'documentation', 'inspection', 'negotiation', 'settlement'
  client_id UUID REFERENCES users(id),
  property_id UUID,
  date_of_loss DATE NOT NULL,
  damage_types TEXT[], -- Array of damage types
  estimated_value DECIMAL(12,2),
  current_offer DECIMAL(12,2),
  insurance_carrier VARCHAR(255),
  policy_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);
CREATE INDEX idx_claims_status ON claims(status);
CREATE INDEX idx_claims_client_id ON claims(client_id);
CREATE INDEX idx_claims_created_at ON claims(created_at DESC);

-- Properties
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT NOT NULL,
  city VARCHAR(100),
  state VARCHAR(2),
  zip VARCHAR(10),
  property_type VARCHAR(50) CHECK (property_type IN ('residential', 'commercial')),
  year_built INTEGER,
  square_feet INTEGER,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  metadata JSONB, -- Additional property details
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_properties_location ON properties(lat, lng);
CREATE INDEX idx_properties_metadata ON properties USING GIN (metadata);

-- Inspections
CREATE TABLE inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
  inspector_id UUID REFERENCES users(id),
  status VARCHAR(50) NOT NULL, -- 'scheduled', 'in_progress', 'completed', 'approved'
  scheduled_date TIMESTAMP,
  completed_at TIMESTAMP,
  completion_percentage INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_inspections_claim_id ON inspections(claim_id);
CREATE INDEX idx_inspections_inspector_id ON inspections(inspector_id);
CREATE INDEX idx_inspections_status ON inspections(status);

-- Inspection Areas (optimized for RAG retrieval)
CREATE TABLE inspection_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id UUID REFERENCES inspections(id) ON DELETE CASCADE,
  area_name VARCHAR(255) NOT NULL,
  category VARCHAR(100), -- 'Exterior', 'Interior', 'Systems'
  status VARCHAR(50) NOT NULL,
  priority VARCHAR(20) CHECK (priority IN ('high', 'medium', 'low')),
  findings TEXT, -- Full-text searchable
  damage_description TEXT,
  recommended_actions TEXT,
  estimated_cost DECIMAL(12,2),
  bigquery_embedding_id VARCHAR(255), -- Reference to BigQuery vector
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_inspection_areas_inspection_id ON inspection_areas(inspection_id);
CREATE INDEX idx_inspection_areas_category ON inspection_areas(category);
-- Full-text search on findings
CREATE INDEX idx_inspection_areas_findings_fts ON inspection_areas USING GIN (to_tsvector('english', findings));
CREATE INDEX idx_inspection_areas_damage_fts ON inspection_areas USING GIN (to_tsvector('english', damage_description));

-- Media Files (photos, videos, documents)
CREATE TABLE media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
  inspection_id UUID REFERENCES inspections(id) ON DELETE CASCADE,
  area_id UUID REFERENCES inspection_areas(id) ON DELETE CASCADE,
  file_type VARCHAR(50) NOT NULL, -- 'photo', 'audio', 'video', 'document', 'pdf'
  gcp_bucket VARCHAR(255) NOT NULL,
  gcp_path TEXT NOT NULL, -- Full path in GCS
  signed_url TEXT,
  url_expires_at TIMESTAMP,
  file_size BIGINT, -- Bytes
  mime_type VARCHAR(100),
  vision_labels JSONB, -- Google Vision API results
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  uploaded_by UUID REFERENCES users(id)
);
CREATE INDEX idx_media_files_claim_id ON media_files(claim_id);
CREATE INDEX idx_media_files_inspection_id ON media_files(inspection_id);
CREATE INDEX idx_media_files_area_id ON media_files(area_id);
CREATE INDEX idx_media_files_type ON media_files(file_type);
CREATE INDEX idx_media_files_vision_labels ON media_files USING GIN (vision_labels);

-- Audio Transcripts
CREATE TABLE audio_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_file_id UUID REFERENCES media_files(id) ON DELETE CASCADE,
  area_id UUID REFERENCES inspection_areas(id) ON DELETE CASCADE,
  transcript TEXT NOT NULL, -- Full-text indexed
  confidence_score FLOAT,
  language VARCHAR(10) DEFAULT 'en-US',
  duration_seconds INTEGER,
  bigquery_embedding_id VARCHAR(255), -- Reference to BigQuery vector
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_audio_transcripts_media_file_id ON audio_transcripts(media_file_id);
CREATE INDEX idx_audio_transcripts_area_id ON audio_transcripts(area_id);
CREATE INDEX idx_audio_transcripts_fts ON audio_transcripts USING GIN (to_tsvector('english', transcript));

-- AI Analysis Results
CREATE TABLE ai_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
  inspection_id UUID REFERENCES inspections(id) ON DELETE CASCADE,
  analysis_type VARCHAR(50) NOT NULL, -- 'preliminary', 'final', 'opportunity', 'cost_estimate'
  findings JSONB NOT NULL, -- Structured AI findings
  similar_cases JSONB[], -- Array of similar case summaries from RAG
  cost_estimate JSONB, -- Detailed cost breakdown
  confidence_score FLOAT,
  model_version VARCHAR(100), -- 'gpt-4-turbo-2024-04-09'
  tokens_used INTEGER,
  processing_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  analyzed_by UUID REFERENCES users(id)
);
CREATE INDEX idx_ai_analyses_claim_id ON ai_analyses(claim_id);
CREATE INDEX idx_ai_analyses_inspection_id ON ai_analyses(inspection_id);
CREATE INDEX idx_ai_analyses_type ON ai_analyses(analysis_type);
CREATE INDEX idx_ai_analyses_findings ON ai_analyses USING GIN (findings);

-- Activity Logs (Timeline)
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL, -- 'claim_created', 'document_uploaded', 'inspection_completed', etc.
  entity_type VARCHAR(50), -- 'claim', 'inspection', 'media', 'report'
  entity_id UUID,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_activity_logs_claim_id ON activity_logs(claim_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);

-- Email Logs
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
  recipient VARCHAR(255) NOT NULL,
  subject TEXT NOT NULL,
  email_type VARCHAR(50), -- 'report_delivery', 'status_update', 'notification'
  status VARCHAR(50) NOT NULL, -- 'sent', 'failed', 'bounced'
  provider_message_id VARCHAR(255),
  provider_response JSONB,
  sent_at TIMESTAMP DEFAULT NOW(),
  sent_by UUID REFERENCES users(id)
);
CREATE INDEX idx_email_logs_claim_id ON email_logs(claim_id);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at DESC);
CREATE INDEX idx_email_logs_status ON email_logs(status);

-- Report Templates (for PDF generation)
CREATE TABLE report_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  sections JSONB NOT NULL, -- Array of section configurations
  styles JSONB, -- CSS/styling configuration
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Database Functions for Automation:**
```sql
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON claims
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- (Repeat for other tables)

-- Auto-log activity on claim updates
CREATE OR REPLACE FUNCTION log_claim_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO activity_logs (claim_id, action, description, metadata)
    VALUES (NEW.id, 'claim_created', 'New claim created', row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    INSERT INTO activity_logs (claim_id, action, description, metadata)
    VALUES (NEW.id, 'status_changed',
            format('Status changed from %s to %s', OLD.status, NEW.status),
            jsonb_build_object('old_status', OLD.status, 'new_status', NEW.status));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER claim_activity_log AFTER INSERT OR UPDATE ON claims
  FOR EACH ROW EXECUTE FUNCTION log_claim_activity();
```

**Deliverables:**
- Prisma schema file (`/prisma/schema.prisma`)
- Migration scripts (`/prisma/migrations/`)
- Database seeding scripts with demo data
- ER diagram (dbdiagram.io or similar)
- Query optimization document

---

### 4. Media Management System (Epic 4)

#### 4.1 Upload Pipeline (8 hours)
**Features:**
- [ ] Client-side file validation (type, size limits: 50MB per file)
- [ ] Direct-to-GCS uploads with resumable uploads (using signed PUT URLs)
- [ ] Progress tracking with real-time updates
- [ ] Automatic thumbnail generation for images (Cloud Functions)
- [ ] EXIF data extraction and storage
- [ ] Virus scanning integration (optional: ClamAV or GCP Security Scanner)
- [ ] Batch upload support (multi-file drag & drop)

**Implementation:**
```typescript
// /lib/gcs/upload.ts
export async function generateSignedUploadUrl(
  fileName: string,
  contentType: string,
  metadata: Record<string, string>
): Promise<{ signedUrl: string; publicUrl: string }> {
  // Generate signed URL valid for 1 hour
  // Return URL for direct browser upload
}
```

#### 4.2 Google Vision API Integration (4 hours)
**Implementation:**
- [ ] Cloud Function triggered on GCS upload (or Next.js API route)
- [ ] Batch image analysis (labels, objects, text OCR, explicit content)
- [ ] Store results in `media_files.vision_labels` JSONB column
- [ ] Generate semantic descriptions for RAG context
- [ ] Extract text from documents (receipts, estimates)

**Vision API Features:**
```json
{
  "labels": ["roof damage", "water stain", "structural crack"],
  "objects": [
    {"name": "shingle", "confidence": 0.95, "boundingBox": {...}},
    {"name": "gutter", "confidence": 0.88, "boundingBox": {...}}
  ],
  "text": "ABC Roofing - Estimate: $45,000",
  "safeSearch": {"adult": "VERY_UNLIKELY", "violence": "UNLIKELY"},
  "dominantColors": ["#3A5F8C", "#8B7355"]
}
```

#### 4.3 Download & Retrieval (3 hours)
- [ ] Generate signed URLs on-demand (4-hour expiry)
- [ ] Browser-based viewing for images/PDFs (inline rendering)
- [ ] Bulk download ZIP creation (stream large zips)
- [ ] CDN-accelerated delivery for frequent access
- [ ] Thumbnail serving for gallery views

**API Endpoints:**
```
GET  /api/media/:id/url          - Get signed download URL
GET  /api/media/:id/thumbnail    - Get thumbnail URL
POST /api/media/upload           - Generate upload URL
GET  /api/media/claim/:claimId   - List all media for claim
POST /api/media/bulk-download    - Create ZIP of selected files
```

**Deliverables:**
- `/app/api/media/*` routes
- `/lib/gcs/storage.ts` utility library
- Upload progress UI component
- Media gallery component with lightbox
- Thumbnail grid component

---

### 5. Voice Recording & Transcription (Epic 5)

#### 5.1 Audio Recording System (5 hours)
**Web Audio API Implementation:**
- [ ] Browser-based audio recording (MediaRecorder API)
- [ ] Real-time waveform visualization (Canvas API)
- [ ] Area-specific recording (tied to `inspection_areas.id`)
- [ ] Chunked upload for large files (5MB chunks)
- [ ] Playback controls with timestamp markers
- [ ] Recording pause/resume functionality
- [ ] Audio quality settings (bitrate: 128kbps)

**UI Components:**
```typescript
// Record → Upload → Transcribe workflow
<AudioRecorder
  areaId={areaId}
  onRecordingComplete={(file) => uploadAudio(file)}
  maxDuration={600} // 10 minutes
/>

<AudioPlayer
  audioUrl={signedUrl}
  transcript={transcript}
  onTimestampClick={(time) => seekTo(time)}
/>
```

#### 5.2 Speech-to-Text Integration (6 hours)
**Using Google Cloud Speech-to-Text (preferred) or OpenAI Whisper**

**Option 1: Google Speech-to-Text (Recommended - existing GCP)**
- [ ] Async long-running recognition for files > 1 min
- [ ] Automatic language detection
- [ ] Speaker diarization (distinguish multiple speakers)
- [ ] Punctuation and formatting
- [ ] Confidence scores per word
- [ ] Timestamps for word-level alignment

**Option 2: OpenAI Whisper API**
- [ ] Fallback if Google STT has issues
- [ ] Better accuracy for technical jargon
- [ ] Lower cost for shorter files

**Transcription Workflow:**
```
Audio Upload → GCS → Trigger Cloud Function →
Speech-to-Text API → Save Transcript → Generate Embedding →
Store in BigQuery → Return to UI
```

**Implementation:**
```typescript
// /lib/stt/transcribe.ts
export async function transcribeAudio(
  gcsUri: string,
  options: TranscriptionOptions
): Promise<TranscriptResult> {
  // Call Google Speech-to-Text API
  // Return transcript with timestamps and confidence
}

// Cloud Function or API Route
POST /api/audio/transcribe
{
  "mediaFileId": "uuid",
  "areaId": "uuid",
  "gcsPath": "gs://bucket/audio.m4a"
}
```

**Queue Management (if needed):**
- [ ] Use Cloud Tasks for async processing
- [ ] Retry logic with exponential backoff
- [ ] Webhook callback when complete
- [ ] Status tracking in database

**Deliverables:**
- `/app/api/audio/*` endpoints
- `/lib/stt/google-speech.ts` service
- Audio recorder component
- Audio player with synced transcript
- Transcript editing UI (corrections)

---

### 6. AI-Powered Report Generation (Epic 6)

#### 6.1 RAG System with BigQuery Vector Search (12 hours)

**Architecture Overview:**
```
┌─────────────────┐
│ Current Context │ (Transcripts + Images + Area Data)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Generate        │ (OpenAI Embeddings API)
│ Embedding       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ BigQuery Vector Search              │
│ SELECT id, content, metadata,       │
│   VECTOR_SEARCH(embedding,          │
│     query_embedding, 'COSINE', 10)  │
│   AS similarity                     │
│ FROM scc_vectors.embeddings         │
│ WHERE content_type IN (...)         │
│ ORDER BY similarity DESC            │
│ LIMIT 10                            │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────┐
│ Retrieved       │ (Top-K similar cases)
│ Context         │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│ LLM Generation                  │
│ (GPT-4 with RAG context)        │
│ → Key Findings                  │
│ → Damage Description            │
│ → Recommended Actions           │
│ → Cost Estimate                 │
└─────────────────────────────────┘
```

**BigQuery Implementation:**

```typescript
// /lib/rag/bigquery-vector.ts
import { BigQuery } from '@google-cloud/bigquery';

export class BigQueryVectorStore {
  private bq: BigQuery;

  constructor() {
    this.bq = new BigQuery({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE
    });
  }

  async addEmbedding(data: {
    id: string;
    contentType: string;
    entityId: string;
    textContent: string;
    embedding: number[];
    metadata: any;
  }) {
    const query = `
      INSERT INTO scc_vectors.embeddings
      (id, content_type, entity_id, text_content, embedding, metadata, created_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())
    `;
    await this.bq.query({ query, params: [
      data.id, data.contentType, data.entityId,
      data.textContent, data.embedding, JSON.stringify(data.metadata)
    ]});
  }

  async similaritySearch(
    queryEmbedding: number[],
    contentTypes: string[],
    limit: number = 10
  ): Promise<SimilarDocument[]> {
    const query = `
      SELECT
        id,
        content_type,
        entity_id,
        text_content,
        metadata,
        COSINE_DISTANCE(embedding, @queryEmbedding) as distance
      FROM scc_vectors.embeddings
      WHERE content_type IN UNNEST(@contentTypes)
      ORDER BY distance ASC
      LIMIT @limit
    `;

    const [rows] = await this.bq.query({
      query,
      params: {
        queryEmbedding,
        contentTypes,
        limit
      }
    });

    return rows;
  }

  async hybridSearch(
    queryEmbedding: number[],
    keywords: string[],
    contentTypes: string[]
  ): Promise<SimilarDocument[]> {
    // Combine vector similarity with keyword matching
    const query = `
      WITH vector_results AS (
        SELECT *, COSINE_DISTANCE(embedding, @queryEmbedding) as vector_score
        FROM scc_vectors.embeddings
        WHERE content_type IN UNNEST(@contentTypes)
      ),
      keyword_results AS (
        SELECT *,
          (SELECT COUNT(*) FROM UNNEST(@keywords) AS kw
           WHERE LOWER(text_content) LIKE CONCAT('%', LOWER(kw), '%')) AS keyword_score
        FROM scc_vectors.embeddings
        WHERE content_type IN UNNEST(@contentTypes)
      )
      SELECT
        v.*,
        k.keyword_score,
        (1.0 - v.vector_score) * 0.7 + k.keyword_score * 0.3 AS combined_score
      FROM vector_results v
      JOIN keyword_results k USING (id)
      ORDER BY combined_score DESC
      LIMIT 20
    `;

    const [rows] = await this.bq.query({ query, params: { queryEmbedding, keywords, contentTypes }});
    return rows;
  }
}
```

**Embedding Pipeline:**
```typescript
// /lib/rag/embeddings.ts
import OpenAI from 'openai';

export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002', // 1536 dimensions, $0.0001/1K tokens
    input: text.slice(0, 8000) // Truncate to ~8K tokens
  });

  return response.data[0].embedding;
}

export async function batchGenerateEmbeddings(texts: string[]): Promise<number[][]> {
  // Batch up to 100 texts per request for efficiency
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: texts
  });

  return response.data.map(d => d.embedding);
}
```

**Historical Data Ingestion:**
```typescript
// /scripts/ingest-historical-data.ts
// Run once to populate BigQuery with past inspection reports

async function ingestHistoricalReports() {
  const reports = await fetchAllHistoricalReports(); // From existing system

  for (const report of reports) {
    // For each area in the report
    for (const area of report.areas) {
      const text = `
        Property: ${report.property.address}
        Area: ${area.name}
        Findings: ${area.findings}
        Description: ${area.description}
        Actions: ${area.actions}
        Cost: $${area.cost}
      `.trim();

      const embedding = await generateEmbedding(text);

      await bigQueryVectorStore.addEmbedding({
        id: `historical-${report.id}-${area.id}`,
        contentType: 'historical_inspection',
        entityId: report.id,
        textContent: text,
        embedding,
        metadata: {
          property_type: report.property.type,
          damage_types: report.damageTypes,
          final_cost: area.cost,
          year: report.completedYear
        }
      });
    }
  }
}
```

#### 6.2 LLM Analysis Pipeline (8 hours)
**Multi-Agent System:**

```typescript
// /lib/ai/agents/analysis-pipeline.ts

export class InspectionAnalysisPipeline {

  async analyzeInspection(inspectionId: string): Promise<AnalysisResult> {
    // Step 1: Gather all context
    const context = await this.gatherContext(inspectionId);

    // Step 2: Run agents in parallel
    const [transcriptAnalysis, imageAnalysis] = await Promise.all([
      this.analyzeTranscripts(context.transcripts),
      this.analyzeImages(context.images)
    ]);

    // Step 3: RAG retrieval for each area
    const ragResults = await this.retrieveSimilarCases(context.areas);

    // Step 4: Generate preliminary report
    const report = await this.generateReport({
      transcriptAnalysis,
      imageAnalysis,
      ragResults,
      context
    });

    return report;
  }

  private async analyzeTranscripts(transcripts: Transcript[]) {
    // Combine all transcripts for an area
    const grouped = groupBy(transcripts, 'areaId');

    const analyses = await Promise.all(
      Object.entries(grouped).map(([areaId, areaTranscripts]) => {
        const combinedText = areaTranscripts.map(t => t.transcript).join('\n\n');

        return this.llm.analyze({
          prompt: `
            You are an expert property damage assessor analyzing field notes from a home inspection.

            INSPECTOR NOTES:
            ${combinedText}

            Extract and structure:
            1. Key Findings (bullet points)
            2. Damage Description (detailed paragraph)
            3. Recommended Actions (prioritized list)
            4. Severity Assessment (minor/moderate/major/critical)
            5. Potential Cost Range

            Be specific and technical. Cite evidence from the notes.
          `,
          area: areaId
        });
      })
    );

    return analyses;
  }

  private async analyzeImages(images: ImageData[]) {
    // Group images by area
    const grouped = groupBy(images, 'areaId');

    const analyses = await Promise.all(
      Object.entries(grouped).map(async ([areaId, areaImages]) => {
        // Combine Vision API results
        const visionData = areaImages.flatMap(img => img.visionLabels);

        return this.llm.analyze({
          prompt: `
            You are analyzing property damage based on photo evidence.

            DETECTED ELEMENTS:
            ${JSON.stringify(visionData, null, 2)}

            NUMBER OF PHOTOS: ${areaImages.length}

            Based on this visual evidence:
            1. Describe visible damage patterns
            2. Assess severity based on visual indicators
            3. Identify potential underlying issues not visible
            4. Recommend further investigation areas
          `,
          area: areaId
        });
      })
    );

    return analyses;
  }

  private async retrieveSimilarCases(areas: InspectionArea[]) {
    const vectorStore = new BigQueryVectorStore();

    const ragResults = await Promise.all(
      areas.map(async (area) => {
        const queryText = `${area.findings} ${area.damage_description}`;
        const embedding = await generateEmbedding(queryText);

        const similar = await vectorStore.hybridSearch(
          embedding,
          [area.category, ...area.damage_types], // Keywords
          ['historical_inspection']
        );

        return {
          areaId: area.id,
          similarCases: similar.slice(0, 5),
          avgCost: similar.reduce((sum, c) => sum + c.metadata.final_cost, 0) / similar.length
        };
      })
    );

    return ragResults;
  }

  private async generateReport(data: {
    transcriptAnalysis: any[];
    imageAnalysis: any[];
    ragResults: any[];
    context: any;
  }) {
    // Final synthesis with RAG context
    const prompt = `
      You are generating a preliminary property inspection report.

      INSPECTION CONTEXT:
      Property: ${data.context.property.address}
      Type: ${data.context.property.type}
      Damage Types: ${data.context.damageTypes.join(', ')}

      FIELD NOTES ANALYSIS:
      ${JSON.stringify(data.transcriptAnalysis, null, 2)}

      PHOTO ANALYSIS:
      ${JSON.stringify(data.imageAnalysis, null, 2)}

      SIMILAR HISTORICAL CASES:
      ${JSON.stringify(data.ragResults, null, 2)}

      Generate a comprehensive preliminary report with:

      For each area:
      1. KEY FINDINGS (3-5 bullet points, specific and actionable)
      2. DAMAGE DESCRIPTION (detailed paragraph, technical language)
      3. RECOMMENDED ACTIONS (prioritized steps with timeline)
      4. COST ESTIMATE (based on historical data, with range)

      Also identify:
      - Potential coverage opportunities
      - Hidden damage risks
      - Code compliance issues
      - Items that might be overlooked in a standard adjuster review

      Format as JSON with clear structure.
    `;

    const report = await this.llm.generateStructured(prompt);

    return report;
  }
}
```

**API Endpoint:**
```typescript
// /app/api/ai/analyze/route.ts
export async function POST(request: Request) {
  const { inspectionId } = await request.json();

  // Validate user has permission
  const session = await getSession();
  if (!session) return new Response('Unauthorized', { status: 401 });

  // Run analysis pipeline
  const pipeline = new InspectionAnalysisPipeline();
  const result = await pipeline.analyzeInspection(inspectionId);

  // Save to database
  await prisma.aiAnalysis.create({
    data: {
      inspectionId,
      analysisType: 'preliminary',
      findings: result,
      confidenceScore: result.confidence,
      modelVersion: 'gpt-4-turbo-2024-04-09'
    }
  });

  return Response.json(result);
}
```

**Deliverables:**
- `/lib/rag/bigquery-vector.ts` - Vector store implementation
- `/lib/rag/embeddings.ts` - Embedding utilities
- `/lib/ai/agents/analysis-pipeline.ts` - Multi-agent system
- `/app/api/ai/analyze` - Analysis API endpoint
- `/scripts/ingest-historical-data.ts` - Data ingestion script
- Cost estimation model based on historical data
- Report preview UI with human-in-the-loop editing

---

### 7. Custom PDF Generation (Epic 7)

#### 7.1 Template Cloning with Puppeteer (6 hours)
**Process:**
1. [ ] Analyze client's existing PDF template (provide sample)
2. [ ] Create React components matching each section
3. [ ] Implement data binding for dynamic content
4. [ ] Set up Puppeteer on Apache server (headless Chrome)
5. [ ] PDF rendering with proper page breaks
6. [ ] Header/footer customization
7. [ ] Watermark & branding

**Component Structure:**
```typescript
// /components/pdf/report-template.tsx
export function InspectionReportPDF({ data }: { data: ReportData }) {
  return (
    <div className="report-container">
      <CoverPage property={data.property} claim={data.claim} />
      <ExecutiveSummary summary={data.summary} />
      <PropertyInfo property={data.property} />

      {data.areas.map(area => (
        <AreaSection
          key={area.id}
          area={area}
          photos={area.media}
          transcript={area.transcript}
        />
      ))}

      <CostBreakdown costs={data.costs} historical={data.ragComparison} />
      <Recommendations actions={data.recommendations} />
      <Appendix />
    </div>
  );
}

// Each section component
function AreaSection({ area, photos, transcript }) {
  return (
    <section className="area-section page-break">
      <h2>{area.name}</h2>

      <div className="findings">
        <h3>Key Findings</h3>
        <ul>
          {area.findings.map(f => <li key={f}>{f}</li>)}
        </ul>
      </div>

      <div className="description">
        <h3>Damage Description</h3>
        <p>{area.damageDescription}</p>
      </div>

      <div className="photos">
        <h3>Photo Evidence ({photos.length} images)</h3>
        <div className="photo-grid">
          {photos.map(photo => (
            <div key={photo.id} className="photo-item">
              <img src={photo.signedUrl} alt={photo.metadata.caption} />
              <p className="caption">{photo.metadata.caption}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="actions">
        <h3>Recommended Actions</h3>
        <ol>
          {area.recommendedActions.map(a => <li key={a}>{a}</li>)}
        </ol>
      </div>

      <div className="cost">
        <h3>Estimated Cost</h3>
        <p className="amount">${area.estimatedCost.toLocaleString()}</p>
        <p className="note">Based on {area.similarCasesCount} similar cases</p>
      </div>
    </section>
  );
}
```

#### 7.2 PDF Generation Service (4 hours)
```typescript
// /lib/pdf/generator.ts
import puppeteer from 'puppeteer';
import { renderToStaticMarkup } from 'react-dom/server';
import { InspectionReportPDF } from '@/components/pdf/report-template';

export async function generateInspectionPDF(
  reportData: ReportData
): Promise<{ pdfPath: string; publicUrl: string }> {
  // Render React component to HTML
  const html = renderToStaticMarkup(<InspectionReportPDF data={reportData} />);

  // Launch headless browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Load HTML with styles
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>${getReportStyles()}</style>
      </head>
      <body>${html}</body>
    </html>
  `, { waitUntil: 'networkidle0' });

  // Generate PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    displayHeaderFooter: true,
    headerTemplate: getHeaderTemplate(reportData),
    footerTemplate: getFooterTemplate(reportData)
  });

  await browser.close();

  // Upload to GCS
  const fileName = `report-${reportData.inspectionId}-${Date.now()}.pdf`;
  const gcsPath = `reports/${reportData.claimId}/${fileName}`;

  await uploadToGCS('scc-claims-documents', gcsPath, pdfBuffer);

  const publicUrl = await generateSignedUrl(gcsPath, 24 * 60 * 60); // 24 hours

  return { pdfPath: gcsPath, publicUrl };
}

// Queue-based generation (optional, for heavy load)
import { Queue } from 'bullmq';
const pdfQueue = new Queue('pdf-generation');

export async function queuePDFGeneration(reportData: ReportData) {
  await pdfQueue.add('generate-report', reportData);
}
```

**Deliverables:**
- `/lib/pdf/generator.ts` - PDF service
- `/components/pdf/*` - Report template components
- `/app/api/reports/generate` - PDF generation endpoint
- PDF preview modal
- Template configuration UI for customization

---

### 8. Email Integration (Epic 8)

#### 8.1 Email Provider Setup (4 hours)
**Options:**
- **Resend** (Recommended: $20/month for 50K emails)
- **SendGrid** (Alternative: $19.95/month for 100 emails/day)
- **Google Workspace SMTP** (Free if using existing Workspace)

**Implementation:**
```typescript
// /lib/email/send.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReportEmail({
  to,
  claimId,
  reportUrl,
  clientName
}: SendReportParams) {
  const { data, error } = await resend.emails.send({
    from: 'reports@scc-adjusting.com',
    to,
    subject: `Inspection Report Ready - Claim #${claimId}`,
    react: ReportReadyEmail({ clientName, reportUrl }),
    attachments: [
      {
        filename: 'inspection-report.pdf',
        path: reportUrl // Signed GCS URL
      }
    ]
  });

  // Log email
  await prisma.emailLog.create({
    data: {
      claimId,
      recipient: to,
      subject: `Inspection Report Ready - Claim #${claimId}`,
      emailType: 'report_delivery',
      status: error ? 'failed' : 'sent',
      providerMessageId: data?.id,
      providerResponse: { data, error }
    }
  });

  return { success: !error, data, error };
}
```

**Email Templates (React Email):**
```typescript
// /emails/report-ready.tsx
import { Html, Head, Body, Container, Section, Text, Button } from '@react-email/components';

export function ReportReadyEmail({ clientName, reportUrl }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={heading}>Your Inspection Report is Ready</Text>
            <Text style={paragraph}>
              Hi {clientName},
            </Text>
            <Text style={paragraph}>
              Your property inspection report has been completed and is now available for download.
              This comprehensive report includes detailed findings, photo evidence, and our
              professional recommendations.
            </Text>
            <Button style={button} href={reportUrl}>
              Download Report
            </Button>
            <Text style={paragraph}>
              The download link will expire in 24 hours for security purposes.
            </Text>
            <Text style={footer}>
              Strategic Claim Consultants<br />
              Your trusted insurance claim partner
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

**Deliverables:**
- `/lib/email/send.ts` - Email service
- `/emails/*` - React Email templates
- `/app/api/email/send` - Send API endpoint
- Email preview in dev mode (`/api/email/preview`)
- Delivery tracking dashboard

---

### 9. Timeline & Activity Logging (Epic 9)

#### 9.1 Activity Log System (5 hours)
**Auto-Logging Middleware:**
```typescript
// /lib/logging/activity-logger.ts
export async function logActivity({
  claimId,
  userId,
  action,
  entityType,
  entityId,
  description,
  metadata
}: ActivityLogParams) {
  await prisma.activityLog.create({
    data: {
      claimId,
      userId,
      action,
      entityType,
      entityId,
      description,
      metadata
    }
  });
}

// Middleware wrapper
export function withActivityLog(action: string) {
  return async (handler: Function) => {
    return async (...args: any[]) => {
      const result = await handler(...args);

      // Log after successful operation
      await logActivity({
        action,
        entityType: result.entityType,
        entityId: result.id,
        description: `${action} completed`,
        metadata: result
      });

      return result;
    };
  };
}
```

**API Endpoint:**
```typescript
// /app/api/claims/[id]/timeline/route.ts
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id: claimId } = params;

  const timeline = await prisma.activityLog.findMany({
    where: { claimId },
    include: {
      user: { select: { name: true, avatar_url: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return Response.json(timeline);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { action, description, metadata } = await request.json();
  const session = await getSession();

  await logActivity({
    claimId: params.id,
    userId: session.user.id,
    action,
    description,
    metadata
  });

  return Response.json({ success: true });
}
```

**Timeline UI Component:**
```typescript
// /components/timeline/activity-timeline.tsx
export function ActivityTimeline({ claimId }: { claimId: string }) {
  const { data: activities } = useSWR(`/api/claims/${claimId}/timeline`);

  return (
    <div className="timeline">
      {activities?.map(activity => (
        <div key={activity.id} className="timeline-item">
          <div className="timeline-marker" />
          <div className="timeline-content">
            <div className="flex items-center gap-2">
              <Avatar user={activity.user} />
              <span className="font-medium">{activity.user.name}</span>
              <span className="text-sm text-gray-500">{formatDate(activity.createdAt)}</span>
            </div>
            <p className="mt-1">{activity.description}</p>
            {activity.metadata && (
              <details className="mt-2 text-sm text-gray-600">
                <summary>View details</summary>
                <pre className="mt-2">{JSON.stringify(activity.metadata, null, 2)}</pre>
              </details>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Deliverables:**
- Activity logging middleware
- Timeline API endpoints
- Timeline UI component
- Export to CSV/PDF for compliance
- Filter & search functionality

---

### 10. Production Deployment (Epic 10)

#### 10.1 Deployment Options

**Option A: Apache Server (Cost-Optimized) - $0/month**
**Option B: Vercel (Managed) - $20/month**

---

#### 10.1A Apache Server Setup & Configuration (5 hours)
**Apache Configuration:**
```apache
# /etc/apache2/sites-available/scc-intelligence.conf

<VirtualHost *:443>
    ServerName scc-intelligence.yourdomain.com
    ServerAlias www.scc-intelligence.yourdomain.com

    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/yourdomain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/yourdomain.com/privkey.pem

    # Proxy to Next.js app
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    # WebSocket support for hot reload (dev only)
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:3000/$1" [P,L]

    # Security headers
    Header always set X-Frame-Options "DENY"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"

    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
    </IfModule>

    ErrorLog ${APACHE_LOG_DIR}/scc-error.log
    CustomLog ${APACHE_LOG_DIR}/scc-access.log combined
</VirtualHost>

# Redirect HTTP to HTTPS
<VirtualHost *:80>
    ServerName scc-intelligence.yourdomain.com
    Redirect permanent / https://scc-intelligence.yourdomain.com/
</VirtualHost>
```

**Enable required modules:**
```bash
sudo a2enmod proxy proxy_http rewrite ssl headers deflate
sudo systemctl restart apache2
```

#### 10.2 Next.js Production Setup (4 hours)
**PM2 Process Manager:**
```bash
# Install PM2
npm install -g pm2

# Create ecosystem file
```

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'scc-intelligence',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/scc-intelligence',
    instances: 2, // 2 instances for load balancing
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

**Deployment Script:**
```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Deploying SCC Intelligence Platform..."

# Pull latest code
cd /var/www/scc-intelligence
git pull origin main

# Install dependencies
npm ci --production

# Run database migrations
npm run migrate:deploy

# Build Next.js app
npm run build

# Restart PM2
pm2 restart scc-intelligence

# Health check
sleep 5
curl -f http://localhost:3000/api/health || exit 1

echo "✅ Deployment successful!"
```

**Docker Alternative (Optional):**
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    volumes:
      - ./logs:/app/logs
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    restart: always
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=scc_intelligence
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}

  redis:
    image: redis:7-alpine
    restart: always
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

#### 10.3 Security Hardening (3 hours)
**Environment Variables:**
```bash
# /var/www/scc-intelligence/.env.production
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/scc_intelligence?schema=public&connection_limit=10

# Auth
NEXTAUTH_URL=https://scc-intelligence.yourdomain.com
NEXTAUTH_SECRET=<generate-strong-secret-64-chars>
GOOGLE_CLIENT_ID=<from-gcp-console>
GOOGLE_CLIENT_SECRET=<from-gcp-console>

# GCP
GCP_PROJECT_ID=your-project-id
GCP_BUCKET_DOCUMENTS=scc-claims-documents
GCP_BUCKET_MEDIA=scc-inspection-media
GCS_KEY_FILE=/var/secrets/gcp-service-account.json

# OpenAI
OPENAI_API_KEY=<your-key>

# Email
RESEND_API_KEY=<your-key>
FROM_EMAIL=reports@scc-adjusting.com

# Redis (for rate limiting, caching)
REDIS_URL=redis://localhost:6379

# Sentry (error tracking)
SENTRY_DSN=<your-dsn>
```

**File Permissions:**
```bash
# Secure permissions
chmod 600 /var/www/scc-intelligence/.env.production
chmod 600 /var/secrets/gcp-service-account.json
chown www-data:www-data /var/www/scc-intelligence -R
```

**Firewall (UFW):**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

#### 10.4 Monitoring & Logging (3 hours)
**Sentry Error Tracking:**
```typescript
// /lib/monitoring/sentry.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers?.['authorization'];
    }
    return event;
  }
});
```

**Health Check Endpoint:**
```typescript
// /app/api/health/route.ts
export async function GET() {
  const checks = {
    database: await checkDatabase(),
    gcs: await checkGCS(),
    redis: await checkRedis(),
    timestamp: new Date().toISOString()
  };

  const healthy = Object.values(checks).every(c => c === true || c.status === 'ok');

  return Response.json(
    { status: healthy ? 'healthy' : 'degraded', checks },
    { status: healthy ? 200 : 503 }
  );
}
```

**Log Aggregation:**
```bash
# Install Winston for structured logging
npm install winston winston-daily-rotate-file
```

```typescript
// /lib/logging/logger.ts
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new DailyRotateFile({
      filename: '/var/www/scc-intelligence/logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

#### 10.5 Backup Strategy (2 hours)
**Automated Daily Backups:**
```bash
#!/bin/bash
# /usr/local/bin/backup-scc.sh

DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/var/backups/scc-intelligence"

# Database backup
pg_dump scc_intelligence > "$BACKUP_DIR/db-$DATE.sql"
gzip "$BACKUP_DIR/db-$DATE.sql"

# Upload to GCS
gsutil cp "$BACKUP_DIR/db-$DATE.sql.gz" gs://scc-backups/database/

# Cleanup old backups (keep 30 days)
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +30 -delete

echo "✅ Backup completed: $DATE"
```

**Cron Job:**
```bash
# Run daily at 2 AM
0 2 * * * /usr/local/bin/backup-scc.sh >> /var/log/scc-backup.log 2>&1
```

#### 10.1B Vercel Deployment (Managed Option) (2 hours)

**Vercel Configuration:**
```javascript
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"], // US East (closest to clients)
  "env": {
    "NODE_ENV": "production",
    "DATABASE_URL": "@database_url",
    "NEXTAUTH_URL": "https://scc-intelligence.vercel.app",
    "NEXTAUTH_SECRET": "@nextauth_secret"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

**Setup Steps:**
- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables
- [ ] Set up custom domain (if needed)
- [ ] Configure Google Cloud SQL connection (Cloud SQL Proxy)
- [ ] Enable Web Analytics and Speed Insights
- [ ] Set up deployment notifications (Slack/Email)

**Benefits of Vercel:**
- ✅ Zero configuration deployment
- ✅ Automatic HTTPS with SSL
- ✅ Global CDN (300+ edge locations)
- ✅ Automatic scaling (serverless)
- ✅ Preview deployments for every PR
- ✅ Built-in Web Analytics
- ✅ Instant rollbacks
- ✅ 99.99% uptime SLA

**Drawbacks:**
- ❌ $20/month ongoing cost
- ❌ Less control over server configuration
- ❌ Serverless function 10-second timeout (may need workaround for PDF generation)

**Deliverables:**
- Vercel project configured
- Environment variables documentation
- Custom domain setup guide
- Deployment workflow documentation

---

#### 10.2 Google Cloud SQL Setup (4 hours)

**Instance Configuration:**
```bash
# Create Cloud SQL instance
gcloud sql instances create scc-intelligence-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-east1 \
  --root-password=<secure-password> \
  --backup-start-time=02:00 \
  --enable-bin-log \
  --maintenance-window-day=SUN \
  --maintenance-window-hour=3

# Create database
gcloud sql databases create scc_intelligence \
  --instance=scc-intelligence-db

# Create user
gcloud sql users create scc_app_user \
  --instance=scc-intelligence-db \
  --password=<secure-password>
```

**Connection from Next.js:**
```typescript
// For Apache Server deployment
DATABASE_URL=postgresql://scc_app_user:password@<CLOUD_SQL_IP>:5432/scc_intelligence

// For Vercel deployment (using Cloud SQL Proxy)
DATABASE_URL=postgresql://scc_app_user:password@/scc_intelligence?host=/cloudsql/<PROJECT>:<REGION>:<INSTANCE>
```

**Backup Strategy:**
- [ ] Automated daily backups (included)
- [ ] 7-day retention (configurable)
- [ ] Point-in-time recovery
- [ ] Export backups to GCS (weekly)

**Deliverables:**
- Cloud SQL instance configured
- Connection strings documented
- Backup/restore procedures
- Performance monitoring setup

---

#### 10.3 Deployment Comparison Matrix

| Feature | Apache Server | Vercel |
|---------|---------------|--------|
| **Cost** | $0/month | $20/month |
| **Setup Time** | 5-8 hours | 1-2 hours |
| **SSL/HTTPS** | Manual (Let's Encrypt) | Automatic |
| **Scaling** | Manual (PM2 instances) | Automatic (serverless) |
| **CDN** | Manual setup | Included (global) |
| **Deployment** | Git pull + PM2 restart | Git push (auto-deploy) |
| **Rollback** | Manual script | One-click |
| **DevOps Required** | Yes (moderate) | No |
| **Server Maintenance** | You manage | Vercel manages |
| **Monitoring** | Self-setup (Sentry) | Built-in analytics |
| **Uptime SLA** | Self-managed | 99.99% |
| **Best For** | Cost-sensitive, technical team | Fast iteration, non-technical team |

**Recommendation:**
- **MVP/Early Stage:** Use Vercel for speed and reliability
- **After Product-Market Fit:** Migrate to Apache if $20/month matters
- **Enterprise:** Use Apache with dedicated infrastructure team

---

**Deliverables (Both Options):**
- Deployment documentation for chosen option
- Environment variables template
- Health check endpoints
- Monitoring dashboard
- Backup/restore scripts
- Rollback procedures

---

## Development Timeline (Revised)

### Week 1: Foundation & Core Systems (40 hours)

**Monday (8h): Infrastructure**
- [ ] GCP audit and bucket setup (3h)
- [ ] BigQuery vector database setup (3h)
- [ ] Apache server prep and SSL (2h)

**Tuesday (8h): Authentication & Database**
- [ ] Auth.js + Google OAuth (4h)
- [ ] Database schema design and migration (4h)

**Wednesday (8h): Media Management Part 1**
- [ ] Upload pipeline (direct to GCS) (4h)
- [ ] Google Vision API integration (3h)
- [ ] Download/retrieval system (1h)

**Thursday (8h): Voice & Transcription**
- [ ] Audio recording UI (3h)
- [ ] Google Speech-to-Text integration (4h)
- [ ] Transcript storage and display (1h)

**Friday (8h): Testing & Refinement**
- [ ] End-to-end testing of Week 1 features (4h)
- [ ] Bug fixes and performance optimization (3h)
- [ ] Checkpoint demo preparation (1h)

**🎯 Checkpoint 1:** Demo core infrastructure (auth, uploads, transcription)

---

### Week 2: AI Features & Production (40 hours)

**Monday (8h): RAG System**
- [ ] BigQuery vector search implementation (4h)
- [ ] Embedding generation pipeline (2h)
- [ ] Historical data ingestion script (2h)

**Tuesday (8h): LLM Analysis**
- [ ] Multi-agent analysis pipeline (5h)
- [ ] Report generation with RAG context (3h)

**Wednesday (8h): PDF & Email**
- [ ] Template cloning with Puppeteer (4h)
- [ ] PDF generation service (2h)
- [ ] Email integration (Resend) (2h)

**Thursday (8h): Timeline & Polish**
- [ ] Activity logging system (3h)
- [ ] Timeline UI component (2h)
- [ ] UI/UX refinements (2h)
- [ ] Mobile responsiveness fixes (1h)

**Friday (8h): Deployment & Hardening**
- [ ] Production deployment to Apache (3h)
- [ ] Security hardening (2h)
- [ ] Monitoring and logging setup (2h)
- [ ] Final testing and documentation (1h)

**🎯 Checkpoint 2:** Full MVP ready for UAT

---

## Technical Stack (Updated)

**Frontend:**
- Next.js 15.5 (App Router)
- React 19
- TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion

**Backend:**
- Next.js API Routes
- Prisma ORM
- Google Cloud SQL (PostgreSQL 15) or Self-Hosted PostgreSQL
- Auth.js v5

**Cloud Services (GCP):**
- Google Cloud Storage (existing)
- Google Cloud SQL (PostgreSQL)
- BigQuery ML (vector search)
- Google Vision API
- Google Speech-to-Text
- Google Cloud Memorystore (Redis) - optional
- OpenAI GPT-4 + Embeddings

**Infrastructure Options:**
- **Option A (Cost-Optimized):** Apache HTTP Server + PM2 + Let's Encrypt SSL
- **Option B (Managed):** Vercel Deployment ($20/month, zero DevOps overhead)

**AI/ML:**
- BigQuery Vector Search (primary)
- ChromaDB (fallback option, self-hosted)
- OpenAI Embeddings (Ada v2)
- RAG architecture

---

## Budget Estimate (Revised)

**Development Hours:** 80 hours @ $150/hour = **$12,000**

**Monthly Operating Costs:**

### **Deployment Option A: Apache Server (Cost-Optimized)**

| Service | Cost | Notes |
|---------|------|-------|
| Google Cloud SQL (db-f1-micro) | $7 | Shared CPU, 0.6GB RAM, 10GB storage |
| GCP Cloud Storage | $23 | 100GB @ $0.023/GB |
| BigQuery | $0-50 | Pay per query, ~$5/TB scanned |
| Google Vision API | $15 | 1000 images @ $1.50/1000 |
| Google Speech-to-Text | $24 | 100 hours @ $0.24/min |
| OpenAI API | $100-300 | Depends on volume |
| Resend Email | $20 | 50K emails/month |
| Apache Server | $0 | Existing infrastructure |
| Domain & SSL | $0 | Let's Encrypt (free) |
| **Total** | **~$189-439/month** | |

### **Deployment Option B: Vercel (Managed, Zero DevOps)**

| Service | Cost | Notes |
|---------|------|-------|
| Google Cloud SQL (db-f1-micro) | $7 | Shared CPU, 0.6GB RAM, 10GB storage |
| GCP Cloud Storage | $23 | 100GB @ $0.023/GB |
| BigQuery | $0-50 | Pay per query, ~$5/TB scanned |
| Google Vision API | $15 | 1000 images @ $1.50/1000 |
| Google Speech-to-Text | $24 | 100 hours @ $0.24/min |
| OpenAI API | $100-300 | Depends on volume |
| Resend Email | $20 | 50K emails/month |
| **Vercel Pro** | **$20** | **Auto-scaling, CDN, SSL, zero config** |
| Domain | $0 | Included in Vercel |
| **Total** | **~$209-459/month** | |

**Cost Comparison:**
- **Apache Server:** $189-439/month (requires DevOps knowledge)
- **Vercel:** $209-459/month (+$20, but zero DevOps overhead)
- **Difference:** Only $20/month for managed hosting

**Recommendation:** Use Vercel for MVP launch, migrate to Apache if needed for cost optimization after validating product-market fit.

### **Alternative: Self-Hosted PostgreSQL (Maximum Cost Savings)**

| Service | Cost | Notes |
|---------|------|-------|
| PostgreSQL (Docker on Apache) | $0 | Self-managed, requires backup setup |
| GCP Cloud Storage | $23 | 100GB @ $0.023/GB |
| BigQuery | $0-50 | Pay per query, ~$5/TB scanned |
| Google Vision API | $15 | 1000 images @ $1.50/1000 |
| Google Speech-to-Text | $24 | 100 hours @ $0.24/min |
| OpenAI API | $100-300 | Depends on volume |
| Resend Email | $20 | 50K emails/month |
| Apache Server | $0 | Existing infrastructure |
| Domain & SSL | $0 | Let's Encrypt (free) |
| **Total** | **~$182-432/month** | |

**Annual Cost Comparison:**
- **Self-Hosted (Apache + Docker DB):** ~$2,184 - $5,184/year
- **Apache + Cloud SQL:** ~$2,268 - $5,268/year (+$84/year for managed DB)
- **Vercel + Cloud SQL:** ~$2,508 - $5,508/year (+$240/year for managed hosting)

---

## Risk Mitigation

| Risk | Impact | Mitigation | Contingency |
|------|--------|------------|-------------|
| BigQuery query costs exceed budget | Medium | Implement query caching, limit to 10 results per search | Switch to self-hosted ChromaDB ($0/month) |
| AI API rate limits | Medium | Queue system, exponential backoff | Multiple API keys, fallback providers |
| Large file uploads fail | High | Resumable uploads, chunking, timeout handling | Direct GCS signed uploads |
| PDF generation timeout | Medium | Async queue (Cloud Tasks), limit report size | Pre-render sections, lazy loading |
| Transcription accuracy <90% | Medium | Confidence thresholds, human review workflow | Manual correction UI, re-transcribe |
| Apache server downtime | High | PM2 auto-restart, health checks | Docker container with auto-restart |
| Database performance degradation | Medium | Connection pooling, read replicas, query optimization | Upgrade PostgreSQL plan |

---

## Success Metrics

**MVP Launch Criteria:**
- [ ] 100% of core features functional
- [ ] <2s average page load time
- [ ] <10s PDF generation for standard report (20 pages)
- [ ] 90%+ STT accuracy (Google Speech-to-Text benchmark)
- [ ] Zero critical security vulnerabilities (OWASP Top 10)
- [ ] 99.5% uptime SLA
- [ ] Complete audit trail for all claims
- [ ] Pass security audit (HTTPS, secure headers, input validation)

**User Acceptance Testing:**
- [ ] 5 test claims processed end-to-end
- [ ] Client approval on PDF template design
- [ ] Performance testing with 50 concurrent users
- [ ] Mobile responsiveness verified (iOS/Android)
- [ ] Email delivery rate >95%
- [ ] RAG retrieval accuracy >80% (manual spot checks)

---

## Deliverables Checklist

### Code & Documentation
- [ ] Production-ready codebase in GitHub/GitLab
- [ ] Database schema + migration scripts
- [ ] API documentation (auto-generated from OpenAPI)
- [ ] Technical architecture diagram
- [ ] User guides (PDF + video tutorials)
- [ ] Admin dashboard access
- [ ] Deployment runbook

### Infrastructure
- [ ] Apache server configured and hardened
- [ ] PM2 process manager setup
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] BigQuery datasets and indexes
- [ ] GCS buckets with proper permissions
- [ ] Backup automation (daily)

### Security & Compliance
- [ ] Google OAuth integration
- [ ] RBAC implementation
- [ ] Activity logging for all mutations
- [ ] Secure file storage with signed URLs
- [ ] Environment variables properly secured
- [ ] Firewall rules configured

### Testing & Quality
- [ ] Integration tests for critical flows
- [ ] Load testing results documented
- [ ] Security scan passed (OWASP ZAP or similar)
- [ ] Performance benchmarks met

### Support
- [ ] 30-day post-launch support
- [ ] Bug fix SLA (critical: 24h, high: 72h)
- [ ] On-call contact for emergencies

---

## Post-Launch Support (30 Days)

**Included:**
- Bug fixes and critical patches
- Performance optimization
- User training sessions (2x 1-hour sessions)
- Documentation updates
- Minor feature adjustments

**Not Included (Additional Billing):**
- New features beyond scope
- Integration with third-party systems
- Design changes
- Data migration from legacy systems

---

## Payment Terms

**Milestone-Based:**
- **25% ($3,000)** - Upon SOW approval and project kickoff
- **25% ($3,000)** - Week 1 checkpoint (core infrastructure demo)
- **25% ($3,000)** - Week 2 checkpoint (AI features demo)
- **25% ($3,000)** - Production launch and UAT completion

**Invoicing:** Net 15 days

---

## Assumptions

1. Client provides existing GCP project with billing enabled
2. Client has Google Workspace for OAuth integration
3. Client provides sample PDF template for cloning
4. Client provides access to historical inspection data (if available)
5. **If Apache deployment:** Server has Node.js 18+ and sufficient resources (4GB RAM, 2 CPU cores minimum)
6. **Database:** Client chooses between Google Cloud SQL or self-hosted PostgreSQL on Docker
7. **Hosting:** Client chooses between Apache (cost-optimized) or Vercel (managed)
8. Client handles domain DNS configuration
9. Client provides testing resources for UAT
10. Weekly check-in meetings (1 hour each)
11. Feedback turnaround within 48 hours

---

## Next Steps

1. **Client Review:** Approve this SOW and technical approach (by Sept 30, 2025)
2. **Kickoff Meeting:** Oct 1, 2025 - Finalize priorities, access credentials
3. **Week 1 Checkpoint:** Oct 4, 2025 - Demo infrastructure
4. **Week 2 Checkpoint:** Oct 11, 2025 - Demo AI features
5. **UAT Testing:** Oct 14-15, 2025 - Client testing period
6. **Production Launch:** Oct 16, 2025 - Go-live with monitoring
7. **Post-Launch Review:** Oct 30, 2025 - Retrospective and handoff

---

## Acceptance Criteria

This project will be considered complete when:
1. All features in scope are deployed to production on Apache server
2. Client can successfully:
   - Log in with Google Workspace account
   - Upload policy documents to GCS
   - Conduct home inspection with photos + audio recordings
   - View auto-transcribed audio with timestamps
   - Trigger AI analysis with RAG-powered insights
   - Review preliminary report with cost estimates
   - Edit and approve final report
   - Generate custom PDF matching template
   - Send report to client via email
   - View complete timeline of claim activity
3. System passes security audit
4. Performance benchmarks met (load testing results)
5. Documentation delivered and team trained
6. 30-day support period initiated

---

## Signatures

**Client Representative:**

Name: _____________________________

Title: _____________________________

Signature: _________________________ Date: _____________

---

**Development Team:**

Name: _____________________________

Title: _____________________________

Signature: _________________________ Date: _____________

---

## Appendix A: BigQuery Vector Search Example

```sql
-- Example similarity search query
DECLARE query_embedding ARRAY<FLOAT64>;

-- Get embedding for current inspection area
SET query_embedding = (
  SELECT embedding
  FROM scc_vectors.embeddings
  WHERE id = 'current-area-123'
);

-- Find similar historical cases
SELECT
  e.entity_id,
  e.text_content,
  JSON_VALUE(e.metadata, '$.final_cost') as historical_cost,
  JSON_VALUE(e.metadata, '$.property_type') as property_type,
  COSINE_DISTANCE(e.embedding, query_embedding) as similarity_score
FROM scc_vectors.embeddings e
WHERE e.content_type = 'historical_inspection'
  AND JSON_VALUE(e.metadata, '$.property_type') = 'residential'
ORDER BY similarity_score ASC
LIMIT 10;
```

---

## Appendix B: PM2 Quick Commands

```bash
# Start app
pm2 start ecosystem.config.js

# View logs
pm2 logs scc-intelligence

# Monitor
pm2 monit

# Restart
pm2 restart scc-intelligence

# Stop
pm2 stop scc-intelligence

# Status
pm2 status

# Save PM2 process list (auto-restart on server reboot)
pm2 save
pm2 startup
```

---

**Document Version:** 2.0
**Last Updated:** September 30, 2025
**Prepared by:** Development Team

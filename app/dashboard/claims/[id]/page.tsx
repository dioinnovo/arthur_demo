'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, User, Phone, Mail, MapPin, Calendar, Building2, Home,
  FileText, Camera, History, Shield, CheckCircle, Clock, AlertTriangle,
  DollarSign, Download, Edit, Save, X, Plus, Upload, Eye, Send,
  TrendingUp, AlertCircle, FileSearch, Briefcase, Star, CalendarCheck,
  Droplets, Check, Target, Zap, Brain, Calculator, ChevronDown,
  CloudRain, Image, XCircle
} from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FileUploadModal } from '@/components/ui/file-upload-modal'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/ui/section-header'

export default function PatientCareCoordinationPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [documents, setDocuments] = useState<any[]>([])

  // Mock data - patient care case
  const patient = {
    id: params.id,
    status: 'Active Care',
    phase: 'Treatment',
    admissionDate: '2024-03-15',
    lastUpdated: '2024-03-18',
    episodeCost: 45000,
    projectedSavings: 12000,

    // Patient Information
    demographics: {
      name: 'James Mitchell',
      mrn: 'MRN-45678',
      dateOfBirth: '1965-03-15',
      phone: '(305) 555-0123',
      email: 'jmitchell@email.com',
      preferredContact: 'Phone',
      riskScore: 78
    },

    // Clinical Details
    clinical: {
      primaryDiagnosis: 'Type 2 Diabetes with Complications',
      icd10Codes: ['E11.65', 'E11.9', 'I10'],
      comorbidities: ['Hypertension', 'Chronic Kidney Disease Stage 3', 'Obesity'],
      medications: ['Metformin 1000mg BID', 'Lisinopril 20mg QD', 'Atorvastatin 40mg QD'],
      allergies: ['Penicillin', 'Sulfa'],
      lastA1c: 11.2,
      lastBP: '156/92',
      bmi: 32.5
    },

    // Care Team
    careTeam: {
      primaryPhysician: 'Dr. Sarah Chen',
      careCoordinator: 'Maria Rodriguez, RN',
      specialists: ['Dr. Kim - Endocrinology', 'Dr. Lee - Nephrology'],
      pharmacist: 'John Davis, PharmD',
      socialWorker: 'Linda Thompson, LCSW'
    },

    // Health Plan
    insurance: {
      plan: 'Medicare Advantage',
      memberId: 'MA123456789',
      groupNumber: 'GRP-789',
      effectiveDate: '2023-01-01',
      caseManager: 'Susan White',
      caseManagerPhone: '(305) 555-9876'
    },

    // Care Plan
    carePlan: {
      scheduled: '2024-03-20',
      coordinator: 'Maria Rodriguez',
      status: 'In Progress',
      goals: ['A1c < 7%', 'BP < 130/80', 'Weight loss 10%'],
      interventions: ['Weekly monitoring', 'Nutrition counseling', 'Medication optimization'],
      nextReview: '2024-04-20'
    },

    // Care History
    history: [
      { date: '2024-03-10', type: 'ED Visit', diagnosis: 'Hyperglycemia', cost: 3500 },
      { date: '2024-02-15', type: 'Hospitalization', diagnosis: 'DKA', cost: 18000 },
      { date: '2024-01-20', type: 'Specialist Visit', diagnosis: 'CKD Follow-up', cost: 450 }
    ],

    // Documents
    documents: [
      { name: 'Care_Plan_2024.pdf', date: '2024-03-15', size: '2.4 MB', type: 'care-plan' },
      { name: 'Insurance_Policy.pdf', date: '2024-03-15', size: '1.8 MB', type: 'policy' },
      { name: 'Property_Photos.zip', date: '2024-03-16', size: '45.2 MB', type: 'photos' },
      { name: 'Contractor_Estimates.pdf', date: '2024-03-17', size: '3.1 MB', type: 'estimate' },
      { name: 'Inspection_Photos_Exterior.jpg', date: '2024-03-18', size: '8.2 MB', type: 'photos' },
      { name: 'Inspection_Photos_Interior.jpg', date: '2024-03-18', size: '12.5 MB', type: 'photos' },
      { name: 'Structural_Damage_Report.pdf', date: '2024-03-19', size: '5.7 MB', type: 'report' }
    ],

    // Timeline Events
    timeline: [
      {
        id: 1,
        date: '2024-03-10',
        time: '09:30 AM',
        type: 'incident',
        title: 'Hurricane Damage Occurred',
        description: 'Category 3 hurricane made landfall causing significant damage to property',
        user: 'System',
        icon: CloudRain,
        color: 'red'
      },
      {
        id: 2,
        date: '2024-03-11',
        time: '10:15 AM',
        type: 'claim',
        title: 'Initial Claim Filed',
        description: 'Client submitted initial claim to insurance carrier State Farm',
        user: 'Michael Johnson',
        icon: FileText,
        color: 'blue'
      },
      {
        id: 3,
        date: '2024-03-12',
        time: '02:30 PM',
        type: 'contact',
        title: 'Insurance Adjuster Assigned',
        description: 'Sarah Thompson from State Farm assigned as primary adjuster',
        user: 'State Farm',
        icon: User,
        color: 'gray'
      },
      {
        id: 4,
        date: '2024-03-15',
        time: '11:00 AM',
        type: 'document',
        title: 'Documents Uploaded',
        description: 'Initial damage report and insurance policy uploaded to system',
        user: 'James Rodriguez',
        documents: ['Initial_Damage_Report.pdf', 'Insurance_Policy.pdf'],
        icon: Upload,
        color: 'green'
      },
      {
        id: 5,
        date: '2024-03-16',
        time: '03:45 PM',
        type: 'inspection',
        title: 'Property Inspection Scheduled',
        description: 'Comprehensive inspection scheduled for March 20, 2024',
        user: 'James Rodriguez',
        icon: Camera,
        color: 'purple'
      },
      {
        id: 6,
        date: '2024-03-17',
        time: '09:00 AM',
        type: 'estimate',
        title: 'Initial Offer Received',
        description: 'Insurance carrier provided initial settlement offer of $195,000',
        user: 'Sarah Thompson',
        amount: 195000,
        icon: DollarSign,
        color: 'yellow'
      },
      {
        id: 7,
        date: '2024-03-18',
        time: '02:15 PM',
        type: 'analysis',
        title: 'AI Coverage Analysis Completed',
        description: 'Scotty AI identified additional coverage opportunities worth $90,000',
        user: 'Scotty AI',
        icon: Brain,
        color: 'blue'
      },
      {
        id: 8,
        date: '2024-03-19',
        time: '10:30 AM',
        type: 'negotiation',
        title: 'Counter-Offer Submitted',
        description: 'Submitted counter-offer for $347,000 based on comprehensive damage assessment',
        user: 'James Rodriguez',
        amount: 347000,
        icon: TrendingUp,
        color: 'green'
      }
    ]
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: History },
    { id: 'documents', label: 'Documents', icon: FileSearch },
    { id: 'assessment', label: 'Analysis', icon: Shield },
    { id: 'settlement', label: 'Settlement', icon: DollarSign }
  ]

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
        {/* Back button and Status on same line */}
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={() => router.push('/dashboard/claims')}
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Claims</span>
          </Button>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>
            {claim.status}
          </span>
        </div>

        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Claim #{claim.id}
            </h1>
          </div>
        </div>

        {/* Property Image with Address Overlay */}
        <div className="relative h-48 sm:h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img 
            src={claim.property.imageUrl} 
            alt={claim.property.address}
            className="w-full h-full object-cover"
          />
          
          {/* Dark gradient from bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/60 to-transparent" />
          
          {/* Property Address */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-white text-lg sm:text-xl leading-tight drop-shadow-lg">
              {claim.property.address}
            </h3>
          </div>
          
          {/* Property Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-gray-900/90 text-gray-800 shadow-lg">
              {claim.property.type}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-scc-red hover:bg-red-600 text-white"
            title={isEditing ? "Save changes" : "Edit claim information"}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                Edit
              </>
            )}
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Quick Stats - Changed to 2 columns */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Estimated Value</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              ${claim.estimatedValue.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Current Offer</p>
            <p className="text-lg sm:text-2xl font-bold text-scc-red">
              ${claim.currentOffer.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Potential Recovery</p>
            <p className="text-lg sm:text-2xl font-bold text-green-600">
              +${(claim.estimatedValue - claim.currentOffer).toLocaleString()}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3" />
              Est. Days to Close
            </p>
            <p className="text-lg sm:text-2xl font-bold text-blue-600">
              14-21 days
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Based on similar cases</p>
          </div>
        </div>
      </div>

      {/* Tabs - Mobile Optimized */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          {/* Mobile: All 5 tabs fit on screen */}
          <div className="sm:hidden flex w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 border-b-2 transition-all min-w-0 ${
                    activeTab === tab.id
                      ? 'border-scc-red text-scc-red bg-red-50 dark:bg-red-900/10'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tablet: Show all 5 tabs with smaller sizing */}
          <div className="hidden sm:flex lg:hidden w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-2 border-b-2 transition-all min-w-0 ${
                    activeTab === tab.id
                      ? 'border-scc-red text-scc-red bg-red-50 dark:bg-red-900/10'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Desktop: Full width tabs */}
          <div className="hidden lg:flex w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center gap-2 py-3 px-4 border-b-2 transition-all justify-center ${
                    activeTab === tab.id
                      ? 'border-scc-red text-scc-red bg-red-50 dark:bg-red-900/10'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-4">
          {/* Overview Tab - Combined Client, Property & Financial Info */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Client Information */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Client Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Company</span>
                      <span className="font-medium">{claim.client.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Contact</span>
                      <span className="font-medium">{claim.client.contact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Phone</span>
                      <span className="font-medium">{claim.client.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
                      <span className="font-medium text-sm">{claim.client.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Relationship Score</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="font-medium">{claim.client.relationshipScore}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    {claim.property.type === 'Commercial' ? (
                      <Building2 className="w-5 h-5" />
                    ) : (
                      <Home className="w-5 h-5" />
                    )}
                    Property Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Type</span>
                      <span className="font-medium">{claim.property.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Address</span>
                      <span className="font-medium text-sm text-right max-w-[200px]">{claim.property.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Square Feet</span>
                      <span className="font-medium">{claim.property.squareFeet.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Year Built</span>
                      <span className="font-medium">{claim.property.yearBuilt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Construction</span>
                      <span className="font-medium">{claim.property.construction}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance Information */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Insurance & Damage Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Carrier</p>
                    <p className="font-medium">{claim.insurance.carrier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Policy Number</p>
                    <p className="font-medium">{claim.insurance.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Coverage Limit</p>
                    <p className="font-medium">${claim.insurance.coverageLimit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Deductible</p>
                    <p className="font-medium">${claim.insurance.deductible.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Adjuster</p>
                    <p className="font-medium">{claim.insurance.adjuster}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Adjuster Phone</p>
                    <p className="font-medium">{claim.insurance.adjusterPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date of Loss</p>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {claim.damage.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Damage Type</p>
                    <p className="font-medium">{claim.damage.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Severity</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        claim.damage.severity === 'Major' ? 'bg-red-100 text-red-800' :
                        claim.damage.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {claim.damage.severity}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Initial Estimate</p>
                    <p className="font-medium text-green-600">
                      ${claim.damage.initialEstimate.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Adjusted Estimate</p>
                    <p className="font-bold text-green-600">
                      ${claim.damage.adjustedEstimate.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Potential Increase</p>
                    <p className="font-medium text-scc-red">
                      +${(claim.damage.adjustedEstimate - claim.damage.initialEstimate).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {/* Dates at the bottom */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span>Created: {claim.createdDate}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span>Updated: {claim.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Assessment Tab - Comprehensive AI-Powered Analysis */}
          {activeTab === 'assessment' && (
            <div className="space-y-6">
              {/* Assessment Success Dashboard - Simplified colors */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Target className="text-scc-red" size={20} />
                    Claim Assessment Intelligence
                  </h3>
                  <span className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto">
                    Analysis Complete
                  </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">97.2%</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">AI Confidence</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-scc-red">$385K</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Max Recovery</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">+$190K</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Above Offer</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">94%</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Success Rate</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Recovery Potential Analysis</h4>
                    <span className="text-sm text-green-600 font-medium">Excellent</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Strong evidence package with multiple recovery opportunities identified</p>
                </div>
              </div>

              {/* AI Damage Classification */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Brain className="text-scc-red" size={20} />
                  AI Damage Classification & Analysis
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Primary Damages */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Primary Damage Assessment</h4>
                    <div className="space-y-3">
                      {[
                        { type: 'Hurricane Wind Damage', severity: 'Major', confidence: 97, amount: '$185,000' },
                        { type: 'Roof Structural Damage', severity: 'Major', confidence: 94, amount: '$95,000' },
                        { type: 'Water Intrusion Damage', severity: 'Moderate', confidence: 91, amount: '$45,000' },
                        { type: 'HVAC System Damage', severity: 'Replace', confidence: 88, amount: '$35,000' }
                      ].map((damage, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-gray-100">{damage.type}</p>
                              <p className={`text-sm ${
                                damage.severity === 'Major' ? 'text-red-600 font-medium' :
                                damage.severity === 'Moderate' ? 'text-yellow-600' :
                                damage.severity === 'Replace' ? 'text-scc-red' :
                                'text-gray-600'
                              }`}>
                                {damage.severity} Damage
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{damage.amount}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{damage.confidence}% confidence</p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                            <div
                              className="bg-blue-500 h-1.5 rounded-full"
                              style={{ width: `${damage.confidence}%` }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Hidden Damages */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">AI-Detected Hidden Damages</h4>
                    <div className="space-y-3">
                      {[
                        { type: 'Foundation Settling', detection: 'High', amount: '$15,000', action: 'Inspect' },
                        { type: 'Mold in Wall Cavities', detection: 'Medium', amount: '$8,500', action: 'Test' },
                        { type: 'Electrical Panel Corrosion', detection: 'High', amount: '$3,200', action: 'Document' },
                        { type: 'Insulation Contamination', detection: 'Medium', amount: '$2,750', action: 'Verify' }
                      ].map((hidden, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{hidden.type}</p>
                              <p className={`text-xs ${
                                hidden.detection === 'High' ? 'text-gray-700 font-medium' : 'text-gray-600'
                              }`}>
                                {hidden.detection} Probability
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900 dark:text-gray-100">{hidden.amount}</p>
                              <Button variant="link" className="text-xs text-blue-600 hover:underline font-medium p-0 h-auto">
                                {hidden.action}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Recovery Tip:</strong> Document these hidden damages to add $29,450 to settlement
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coverage Intelligence Engine */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Shield className="text-gray-600 dark:text-gray-400" size={20} />
                  Coverage Intelligence & Policy Matching
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Coverage Analysis */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Automated Coverage Analysis</h4>
                    <div className="space-y-2">
                      {[
                        { coverage: 'Building Protection', status: 'Covered', amount: '$185,000', match: 'Confirmed' },
                        { coverage: 'Other Structures', status: 'Covered', amount: '$45,000', match: 'Confirmed' },
                        { coverage: 'Ordinance & Law', status: 'Available', amount: '$45,000', match: 'Opportunity' },
                        { coverage: 'Business Interruption', status: 'Covered', amount: '$32,000', match: 'Applicable' },
                        { coverage: 'Extra Expense Coverage', status: 'Available', amount: '$18,000', match: 'Eligible' }
                      ].map((coverage, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                coverage.match === 'Confirmed' ? 'bg-green-50' :
                                coverage.match === 'Opportunity' ? 'bg-amber-50' :
                                'bg-blue-50'
                              }`}>
                                {coverage.match === 'Confirmed' ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : coverage.match === 'Opportunity' ? (
                                  <AlertCircle className="w-5 h-5 text-amber-600" />
                                ) : (
                                  <AlertCircle className="w-5 h-5 text-blue-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{coverage.coverage}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    coverage.status === 'Covered' ? 'bg-green-100 text-green-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {coverage.status}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                                  <span className="text-xs text-gray-600 dark:text-gray-400">{coverage.match}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900 dark:text-gray-100">{coverage.amount}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Policy Compliance */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Policy Compliance Check</h4>
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="text-green-500" size={20} />
                          <span className="font-medium text-sm">State Regulations</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 ml-7">All documentation meets Florida requirements</p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="text-green-500" size={20} />
                          <span className="font-medium text-sm">Time Limits</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 ml-7">Filed within policy time requirements</p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="text-yellow-500" size={20} />
                          <span className="font-medium text-sm">Additional Coverage</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 ml-7">Ordinance & Law benefits not yet claimed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Estimation Engine */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Calculator className="text-scc-red" size={20} />
                  Intelligent Cost Estimation Engine
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Estimate Breakdown */}
                  <div className="lg:col-span-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Detailed Repair Estimate</h4>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <div className="space-y-2">
                        {[
                          { item: 'Roof Structural Repair', code: 'RSR-240', quantity: '45 SQ', unit: '$185 per SQ', total: '$95,000' },
                          { item: 'Hurricane Window Replacement', code: 'HWR-110', quantity: '12 EA', unit: '$2,850 per EA', total: '$34,200' },
                          { item: 'HVAC System Replacement', code: 'HSR-320', quantity: '1 System', unit: '$35,000', total: '$35,000' },
                          { item: 'Water Damage Restoration', code: 'WDR-450', quantity: '850 SF', unit: '$45 per SF', total: '$38,250' },
                          { item: 'Electrical Panel Upgrade', code: 'EPU-100', quantity: '1 Panel', unit: '$8,500', total: '$8,500' },
                          { item: 'Ordinance & Law Upgrades', code: 'OLU-200', quantity: '1 LS', unit: '$45,000', total: '$45,000' }
                        ].map((line, index) => (
                          <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-3">
                            <div className="grid grid-cols-6 gap-2 text-sm">
                              <div className="col-span-2">
                                <p className="font-medium text-gray-900 dark:text-gray-100">{line.item}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{line.code}</p>
                              </div>
                              <div className="text-center text-gray-600 dark:text-gray-400">{line.quantity}</div>
                              <div className="text-center text-gray-600 dark:text-gray-400">{line.unit}</div>
                              <div className="text-right font-semibold text-scc-red col-span-2">{line.total}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                            <span className="font-medium">$255,950</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Overhead & Profit (20%)</span>
                            <span className="font-medium">$51,190</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Tax (7%)</span>
                            <span className="font-medium">$21,490</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Depreciation Recovery</span>
                            <span className="font-medium text-green-600">$13,000</span>
                          </div>
                          <div className="flex justify-between text-lg sm:text-xl font-bold pt-2 border-t border-gray-300 dark:border-gray-600">
                            <span className="text-gray-900 dark:text-gray-100">Total Maximum Recovery</span>
                            <span className="text-scc-red">$385,450</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Intelligence */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Pricing Intelligence</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Data Sources</h5>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="text-green-500" size={16} />
                            <span>RSMeans Pricing Database</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="text-green-500" size={16} />
                            <span>Miami-Dade Market Rates</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="text-green-500" size={16} />
                            <span>Contractor Network Pricing</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="text-green-500" size={16} />
                            <span>Updated Daily</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Market Analysis</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Local Market Position:</span>
                            <span className="font-semibold text-gray-700 dark:text-gray-300">Above Average</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Pricing Confidence:</span>
                            <span className="font-semibold text-green-600">94.7%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Contractor Availability:</span>
                            <span className="font-semibold text-scc-red">Limited</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Action Items</h5>
                        <div className="space-y-2">
                          <Button className="w-full bg-scc-red hover:bg-red-600" size="sm">
                            Generate Detailed Estimate
                          </Button>
                          <Button className="w-full border-scc-red text-scc-red hover:bg-scc-red/10" variant="outline" size="sm">
                            Export to PDF
                          </Button>
                          <Button className="w-full" variant="outline" size="sm">
                            Share with Team
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settlement Strategy & Evidence Analyzer */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Settlement Strategy */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Target className="text-gray-600 dark:text-gray-400" size={20} />
                    Settlement Strategy Module
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">AI Recommendations</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="text-green-500 mt-0.5" size={16} />
                          <span>Open with demand of $385,450 (100% of analysis)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="text-green-500 mt-0.5" size={16} />
                          <span>Settlement floor: $325,000 (acceptable minimum)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="text-yellow-500 mt-0.5" size={16} />
                          <span>Emphasize ordinance & law coverage ($45K)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <TrendingUp className="text-blue-500 mt-0.5" size={16} />
                          <span>Leverage: 12 comparable settlements avg. $375K</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Success Indicators</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Negotiation Success:</span>
                          <span className="font-semibold text-green-600">94%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Expected Settlement:</span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">$340K - $365K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Time to Settlement:</span>
                          <span className="font-semibold text-blue-600">12-18 days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidence Strength Analyzer */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <FileSearch className="text-gray-600 dark:text-gray-400" size={20} />
                    Evidence Strength Analyzer
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Documentation Score</h4>
                        <span className="text-xl sm:text-2xl font-bold text-green-600">87%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Strong evidence package with room for improvement</p>
                    </div>

                    <div className="space-y-2">
                      {[
                        { item: 'Photo Documentation', status: 'Complete', score: 95 },
                        { item: 'Professional Inspection', status: 'Complete', score: 92 },
                        { item: 'Repair Estimates', status: 'Complete', score: 88 },
                        { item: 'Weather Report', status: 'Missing', score: 0 },
                        { item: 'Comparable Claims', status: 'Partial', score: 60 }
                      ].map((evidence, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{evidence.item}</p>
                              <p className={`text-xs ${
                                evidence.status === 'Complete' ? 'text-green-600' :
                                evidence.status === 'Partial' ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {evidence.status}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`text-sm font-bold ${
                                evidence.score >= 80 ? 'text-green-600' :
                                evidence.score >= 50 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {evidence.score}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Improvement Tip:</strong> Add weather report (+8%) and complete comparables (+5%) to reach 95% documentation score
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="w-full justify-between bg-scc-red hover:bg-red-600" size="lg">
                  <span className="font-medium">Generate Demand Package</span>
                  <Send className="w-4 h-4" />
                </Button>
                <Button className="w-full justify-between" variant="outline" size="lg">
                  <span className="font-medium">Export Full Report</span>
                  <Download className="w-4 h-4" />
                </Button>
                <Button className="w-full justify-between" variant="outline" size="lg">
                  <span className="font-medium">Schedule Re-inspection</span>
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Timeline Tab - Activity Feed */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <SectionHeader
                title="Claim Timeline"
                description="Complete activity history and claim progress"
                actions={[
                  {
                    label: "Add Event",
                    icon: Plus,
                    className: "bg-scc-red hover:bg-red-600 text-white"
                  },
                  {
                    label: "Generate Report",
                    icon: Download,
                    variant: "outline"
                  }
                ]}
              />

              {/* Timeline Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{claim.timeline.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Events</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">9</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Days Elapsed</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Documents</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">Active</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                <div className="space-y-4">
                  {claim.timeline.map((event, index) => {
                    const Icon = event.icon || Calendar
                    const getEventColor = () => {
                      switch(event.color) {
                        case 'red': return 'bg-red-500'
                        case 'blue': return 'bg-blue-500'
                        case 'green': return 'bg-green-500'
                        case 'yellow': return 'bg-yellow-500'
                        case 'purple': return 'bg-purple-500'
                        case 'gray': return 'bg-gray-500'
                        default: return 'bg-gray-500'
                      }
                    }

                    return (
                      <div key={event.id} className="relative flex items-start gap-4 group">
                        {/* Icon */}
                        <div className={`relative z-10 w-16 h-16 rounded-full ${getEventColor()} flex items-center justify-center shadow-lg`}>
                          <Icon className="text-white" size={24} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{event.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                            </div>
                            {event.amount && (
                              <span className="text-lg font-bold text-green-600">
                                ${event.amount.toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Metadata */}
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-3">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User size={12} />
                              <span>{event.user}</span>
                            </div>
                          </div>

                          {/* Documents if attached */}
                          {event.documents && event.documents.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Attached Documents:</p>
                              <div className="flex flex-wrap gap-2">
                                {event.documents.map((doc, docIndex) => (
                                  <span key={docIndex} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                                    <FileText size={10} />
                                    {doc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Load More */}
              <div className="flex items-center justify-center pt-4">
                <Button variant="ghost" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                  Show older events
                </Button>
              </div>
            </div>
          )}

          {/* Documents Tab - Enhanced with Photos and Documents */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <SectionHeader
                title="Documents & Evidence"
                description="All claim documentation, photos, and evidence in one place"
                actions={[
                  {
                    label: "Upload Files",
                    icon: Upload,
                    onClick: () => setShowUploadModal(true),
                    className: "bg-scc-red hover:bg-red-600 text-white"
                  }
                ]}
              />

              {/* Evidence Completion Score */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-green-900">Evidence Completion Score</h4>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">85%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3 mb-2">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-green-800">Great progress! Photos and core documents are complete.</p>
              </div>

              {/* Documents Grid - 5 Cards including Inspection Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* Damage Documentation Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Camera className="text-gray-600" size={20} />
                    Damage Documentation
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <FileText className="text-blue-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Inspection_Report.pdf</p>
                          <p className="text-xs text-gray-500 truncate">2.4 MB • March 17, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <FileText className="text-blue-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Initial_Damage_Report.pdf</p>
                          <p className="text-xs text-gray-500 truncate">1.8 MB • March 15, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <Image className="text-purple-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Property_Photos.zip</p>
                          <p className="text-xs text-gray-500 truncate">45.2 MB • March 16, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insurance Documents Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Shield className="text-gray-600" size={20} />
                    Insurance Documents
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <FileText className="text-purple-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Insurance_Policy.pdf</p>
                          <p className="text-xs text-gray-500 truncate">1.8 MB • March 15, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <FileText className="text-purple-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Declaration_Pages.pdf</p>
                          <p className="text-xs text-gray-500 truncate">445 KB • March 15, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <FileText className="text-purple-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Policy_Analysis.pdf</p>
                          <p className="text-xs text-gray-500 truncate">890 KB • March 18, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estimates & Invoices Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <DollarSign className="text-gray-600" size={20} />
                    Estimates & Invoices
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-green-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Contractor_Estimates.pdf</p>
                          <p className="text-xs text-gray-500 truncate">3.1 MB • March 17, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-green-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Emergency_Repairs_Invoice.pdf</p>
                          <p className="text-xs text-gray-500 truncate">892 KB • March 16, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <Clock className="text-yellow-500 flex-shrink-0" size={16} />
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </Button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-gray-400 flex-shrink-0" size={20} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-500">Supplemental_Estimate.pdf</p>
                          <p className="text-xs text-gray-400">Not uploaded</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <XCircle className="text-gray-400 flex-shrink-0" size={16} />
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50" disabled title="Not available">
                          <Eye className="text-gray-400" size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50" disabled title="Not available">
                          <Download className="text-gray-400" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Correspondence Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Mail className="text-gray-600" size={20} />
                    Correspondence
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-red-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Denial_Letter.pdf</p>
                          <p className="text-xs text-gray-500 truncate">234 KB • March 11, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <AlertTriangle className="text-red-500 flex-shrink-0" size={16} />
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </Button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-blue-600" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Appeal_Letter.pdf</p>
                          <p className="text-xs text-gray-500 truncate">156 KB • March 18, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-gray-400 flex-shrink-0" size={20} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-500">Follow_up_Correspondence.pdf</p>
                          <p className="text-xs text-gray-400">Not uploaded</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <XCircle className="text-gray-400 flex-shrink-0" size={16} />
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50" disabled title="Not available">
                          <Eye className="text-gray-400" size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50" disabled title="Not available">
                          <Download className="text-gray-400" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inspection Status Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Camera className="text-gray-600" size={20} />
                    Inspection Status
                  </h4>
                  <div className="space-y-4">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        claim.inspection.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : claim.inspection.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : claim.inspection.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {claim.inspection.status}
                      </span>
                    </div>

                    {/* Inspection Details */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="text-gray-500" size={16} />
                        <span className="text-gray-600 dark:text-gray-400">Date:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">March 20, 2024</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="text-gray-500" size={16} />
                        <span className="text-gray-600 dark:text-gray-400">Time:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">10:00 AM</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="text-gray-500" size={16} />
                        <span className="text-gray-600 dark:text-gray-400">Inspector:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{claim.inspection.inspector}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="text-gray-500" size={16} />
                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{claim.inspection.type}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 space-y-2">
                      {claim.inspection.status === 'Scheduled' && (
                        <Link
                          href={`/dashboard/inspection/INS-002/start`}
                          className="w-full px-4 py-2 bg-scc-red text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <Camera size={16} />
                          Start Inspection
                        </Link>
                      )}
                      {claim.inspection.status === 'In Progress' && (
                        <>
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600 dark:text-gray-400">Progress</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">65%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                          <Link
                            href={`/dashboard/inspection/INS-002/continue`}
                            className="w-full px-4 py-2 bg-scc-red text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                          >
                            <Camera size={16} />
                            Continue Inspection
                          </Link>
                        </>
                      )}
                      {claim.inspection.status === 'Completed' && (
                        <Link
                          href={`/dashboard/inspection/INS-002/report`}
                          className="w-full px-4 py-2 bg-scc-red text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <FileText size={16} />
                          View Report
                        </Link>
                      )}
                      {!claim.inspection.status || claim.inspection.status === 'Not Scheduled' && (
                        <Link
                          href={`/dashboard/inspection/new?claimId=${claim.id}`}
                          className="w-full px-4 py-2 bg-scc-red text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <Calendar size={16} />
                          Schedule Inspection
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary and Download All */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Documents: 9 files • 54.8 MB</p>
                </div>
                <Button className="bg-scc-red hover:bg-red-600 text-white">
                  Download All as ZIP
                </Button>
              </div>
            </div>
          )}

          {/* Settlement Negotiation Tab */}
          {activeTab === 'settlement' && (
            <div className="space-y-6">
              {/* Success Metrics Dashboard */}
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Settlement Success Indicators</h3>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">High Probability</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">94%</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Win Probability</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-scc-red">$385K</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Optimal Demand</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">$340K-</span>
                      <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 -mt-1">$365K</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Expected Range</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">+$170K</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Above Initial Offer</p>
                  </div>
                </div>
              </div>

              {/* Power Negotiation Arsenal */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Target className="text-scc-red" size={20} />
                  Power Negotiation Arsenal
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Market Data Leverage</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">12 comparable settlements in 2-mile radius</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Average settlement: $375K (similar damage)</li>
                            <li>• Highest: $420K (Miami Beach, 2023)</li>
                            <li>• Your demand is 8% below market average</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <Building2 className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Code Upgrade Goldmine</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Building code violations = forced upgrades</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Ordinance & Law Coverage: $45K available</li>
                            <li>• 2023 wind load requirements not met</li>
                            <li>• Electrical panel must be upgraded</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <Briefcase className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Business Interruption Ace</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Lost revenue documentation is airtight</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• $45K per month documented loss</li>
                            <li>• 3-month closure minimum</li>
                            <li>• Additional living expenses covered</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <History className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Insurer Track Record</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">State Farm's settlement patterns</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Average 2.3 rounds to settle</li>
                            <li>• Typically counters at 70% of demand</li>
                            <li>• Weakest on ordinance & law coverage</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Pressure Points</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Time-sensitive leverage factors</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Adjuster Sarah Thompson: 89% approval rate</li>
                            <li>• Q1 settlement quota pressure</li>
                            <li>• Hurricane season approaching</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shield className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Legal Threat Level</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Litigation readiness assessment</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Bad faith potential: Medium-High</li>
                            <li>• Statute limitations: 18 months left</li>
                            <li>• Attorney fees recoverable</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tactical Negotiation Playbook */}
              <div className="bg-scc-red/10 border border-scc-red/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Zap className="text-scc-red" size={20} />
                  Tactical Negotiation Playbook
                </h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-scc-red">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Phase 1: Opening Move Strategy</h4>
                      <span className="px-2 py-1 bg-scc-red text-white rounded text-xs font-medium">Start Strong</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Lead with strength - establish credibility and set high anchor</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200">
                        <p className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">Key Message</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">"12 comparable settlements average $375K"</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200">
                        <p className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">Evidence Lead</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">"Code violations require $45K upgrades"</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200">
                        <p className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">Urgency Factor</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">"Business losing $45K per month"</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-scc-red">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Phase 2: Counter-Attack Responses</h4>
                      <span className="px-2 py-1 bg-scc-red text-white rounded text-xs font-medium">Defend & Counter</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Anticipated objections and killer responses</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded border">
                        <div className="text-xs font-medium text-gray-900 dark:text-gray-100 min-w-[80px]">If they say:</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 flex-1">"Policy limits don't cover code upgrades"</div>
                        <div className="text-xs font-medium text-scc-red min-w-[80px]">You respond:</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 flex-1">"Ordinance & Law endorsement clearly states..."</div>
                      </div>
                      <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded border">
                        <div className="text-xs font-medium text-gray-900 dark:text-gray-100 min-w-[80px]">If they say:</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 flex-1">"Market comparables are too high"</div>
                        <div className="text-xs font-medium text-scc-red min-w-[80px]">You respond:</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 flex-1">"Here's identical property on Ocean Drive..."</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-scc-red">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Phase 3: Closing Techniques</h4>
                      <span className="px-2 py-1 bg-scc-red text-white rounded text-xs font-medium">Close Deal</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Scarcity Close</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">"Hurricane season starts in 6 weeks - contractor availability will disappear"</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Authority Close</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">"State regulations require we notify DOI if settlement under $340K"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Center */}
              <div className="bg-white dark:bg-gray-900 border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Negotiation Command Center</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Ready to Execute</h4>
                    <div className="space-y-2">
                      <Button className="w-full justify-between bg-scc-red hover:bg-red-600" size="lg">
                        Send Demand Letter
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button className="w-full justify-between" variant="secondary" size="lg">
                        Schedule Settlement Conference
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button className="w-full justify-between" variant="secondary" size="lg">
                        Generate Negotiation Script
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Timeline Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-scc-red" size={16} />
                        <span className="text-sm">Demand sent (Mar 12)</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">✓ Complete</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-gray-500 dark:text-gray-400" size={16} />
                        <span className="text-sm">Response due (Mar 19)</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-auto">5 days left</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="text-gray-400" size={16} />
                        <span className="text-sm text-gray-400">Conference TBD</span>
                        <span className="text-xs text-gray-400 ml-auto">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              {/* Recommended Action Plan - PRIORITY */}
              <div className="bg-scc-red/10 border border-scc-red/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">🎯 Priority Action Plan</h3>
                  <span className="px-3 py-1 bg-scc-red text-white rounded-full text-sm font-medium">Act Now</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Based on AI analysis of claim history, take these immediate actions to recover additional funds:</p>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-scc-red/20">
                    <div className="w-6 h-6 bg-scc-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">File supplemental claim for 2021 water damage</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Potential recovery: <span className="font-semibold text-green-600">$8,500</span> • Time-sensitive action required</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-scc-red/20">
                    <div className="w-6 h-6 bg-scc-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">Re-open 2022 wind damage claim before statute expires</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Potential recovery: <span className="font-semibold text-green-600">$18,000</span> • Statute expires in 8 months</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-scc-red/20">
                    <div className="w-6 h-6 bg-scc-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">Schedule comprehensive inspection for current claim</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Prevent future underpayment • Document all hidden damages</p>
                    </div>
                  </li>
                </ol>
                <div className="mt-4 pt-4 border-t border-scc-red/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Additional Recovery Potential</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">From historical underpayments</p>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">$26,500</p>
                  </div>
                </div>
              </div>

              {/* AI Property History Analysis */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-scc-red mt-1" size={20} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                      <span>AI Property History Analysis</span>
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Our AI is searching through 5 years of claim history to identify underpayments and re-opening opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Claims History */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Claims History Analysis</h3>
                
                {/* Enhanced claim history items */}
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">2022 Wind Damage Claim</h4>
                          <span className="text-sm font-medium text-scc-red">Underpaid by $18,000</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Original Settlement: $45,000</p>
                        <button className="text-xs text-scc-red hover:underline mt-1">Re-open Claim</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">2021 Water Damage Claim</h4>
                          <span className="text-sm font-medium text-scc-red">Underpaid by $8,500</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Original Settlement: $22,000</p>
                        <button className="text-xs text-scc-red hover:underline mt-1">Re-open Claim</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">2020 Hurricane Damage</h4>
                          <span className="text-sm font-medium text-green-600">Fairly Settled</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Original Settlement: $125,000</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">$125,000</p>
                        <p className="text-xs text-green-600">Settled</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hidden Damage Indicators */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                  <h4 className="font-semibold text-purple-900 mb-3">Hidden Damage Indicators</h4>
                  <p className="text-sm text-purple-800 mb-3">
                    Based on historical patterns, check for these commonly missed damages:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">Foundation settling from water saturation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">HVAC system contamination</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">Electrical panel corrosion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">Hidden mold in wall cavities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">Roof decking deterioration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">Compromised insulation</span>
                    </div>
                  </div>
                </div>

                {/* Summary Statistics */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-5">
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Past Claims</p>
                      <p className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                        $85K
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Underpayments</p>
                      <p className="text-base sm:text-xl md:text-2xl font-bold text-red-600">$26.5K</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Recovery Rate</p>
                      <p className="text-base sm:text-xl md:text-2xl font-bold text-green-600">85%</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}


        </div>
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        claimId={params.id as string}
        onUploadSuccess={(document) => {
          // Add the uploaded document to the local state
          setDocuments(prev => [...prev, document])
          // You can also trigger a refresh of the documents list here
          console.log('Document uploaded:', document)
        }}
      />
    </div>
  )
}
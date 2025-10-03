'use client'

import { useState, useEffect, useCallback } from 'react'
import { inspectionMediaData } from '@/lib/inspection-media'

export interface MediaFile {
  id: string
  type: 'photo' | 'audio' | 'document'
  url: string
  thumbnail?: string
  title: string
  description?: string
  timestamp: string
  category: string
  tags?: string[]
  transcript?: string
  duration?: number
}

export interface AssessmentArea {
  id: string
  name: string
  category: string
  status: 'completed' | 'skipped' | 'in_progress' | 'not_started'
  photoCount: number
  notesCount: number
  findings: string
  clinicalObservations: string
  recommendedActions: string
  estimatedCost: number
  priority: 'high' | 'medium' | 'low'
  previewImage?: string
  media: MediaFile[]
}

export interface SessionData {
  id: string
  patient: {
    name: string
    mrn: string
    dob?: string
    policyNumber?: string
  }
  areas: AssessmentArea[]
  createdAt: string
  updatedAt: string
  completionPercentage: number
}

// Default assessment categories for a new care session
const DEFAULT_ASSESSMENT_AREAS: Omit<AssessmentArea, 'media'>[] = [
  // Clinical Assessment
  { id: 'vitals-measurements', name: 'Vital Signs & Measurements', category: 'Clinical Assessment', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', clinicalObservations: '', recommendedActions: '', estimatedCost: 0, priority: 'low' },
  { id: 'medication-review', name: 'Medication Review & Reconciliation', category: 'Clinical Assessment', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', clinicalObservations: '', recommendedActions: '', estimatedCost: 0, priority: 'low' },
  { id: 'symptom-assessment', name: 'Symptom Assessment', category: 'Clinical Assessment', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', clinicalObservations: '', recommendedActions: '', estimatedCost: 0, priority: 'low' },

  // Care Planning
  { id: 'care-plan-review', name: 'Care Plan Review', category: 'Care Planning', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', clinicalObservations: '', recommendedActions: '', estimatedCost: 0, priority: 'low' },
  { id: 'patient-education', name: 'Patient Education & Engagement', category: 'Care Planning', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', clinicalObservations: '', recommendedActions: '', estimatedCost: 0, priority: 'low' },
  { id: 'sdoh-assessment', name: 'Social Determinants of Health', category: 'Care Planning', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', clinicalObservations: '', recommendedActions: '', estimatedCost: 0, priority: 'low' },

  // Coordination
  { id: 'followup-coordination', name: 'Follow-up Coordination', category: 'Coordination', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', clinicalObservations: '', recommendedActions: '', estimatedCost: 0, priority: 'low' },
  { id: 'care-team-communication', name: 'Care Team Communication', category: 'Coordination', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', clinicalObservations: '', recommendedActions: '', estimatedCost: 0, priority: 'low' }
]

export function useSessionData(sessionId: string) {
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load care session data
  useEffect(() => {
    if (!sessionId) {
      setError('No care session ID provided')
      setLoading(false)
      return
    }

    try {
      // Special handling for demo session CS-001 (Margaret Thompson)
      if (sessionId === 'CS-001' || sessionId === 'CS-002') {
        // Create demo areas with some completed, some in progress
        const demoAreas: AssessmentArea[] = DEFAULT_ASSESSMENT_AREAS.map((area, index) => {
          let status: 'completed' | 'in_progress' | 'not_started' | 'skipped' = 'not_started'

          // First 3 areas completed
          if (index < 3) {
            status = 'completed'
          }
          // 4th area in progress
          else if (index === 3) {
            status = 'in_progress'
          }

          return {
            ...area,
            status,
            media: []
          }
        })

        const completedCount = demoAreas.filter(a => a.status === 'completed' || a.status === 'skipped').length
        const completionPercentage = Math.round((completedCount / demoAreas.length) * 100)

        const demoData: SessionData = {
          id: sessionId,
          patient: {
            name: 'Margaret Thompson',
            mrn: 'MRN-784512',
            dob: '1965-04-15',
            policyNumber: 'BC-2024-89456'
          },
          areas: demoAreas,
          createdAt: '2024-03-15T10:30:00Z',
          updatedAt: new Date().toISOString(),
          completionPercentage
        }

        setSessionData(demoData)
        // Don't save demo data to localStorage to keep it fresh
      } else {
        // Try to load from localStorage for non-demo sessions
        const stored = localStorage.getItem(`session-${sessionId}-data`)
        if (stored) {
          const data = JSON.parse(stored)
          setSessionData(data)
        } else {
          // Check if there's basic session info
          const basicInfo = localStorage.getItem(`session-${sessionId}`)
          if (basicInfo) {
            // Initialize with default areas
            const basic = JSON.parse(basicInfo)
            const newData: SessionData = {
              id: sessionId,
              patient: {
                name: basic.patientName || '',
                mrn: basic.mrn || '',
                dob: basic.dob,
                policyNumber: basic.policyNumber
              },
              areas: DEFAULT_ASSESSMENT_AREAS.map(area => ({ ...area, media: [] })),
              createdAt: basic.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              completionPercentage: 0
            }
            setSessionData(newData)
            // Save the initialized data
            localStorage.setItem(`session-${sessionId}-data`, JSON.stringify(newData))
          } else {
            setError(`No care session found with ID: ${sessionId}`)
          }
        }
      }
    } catch (err) {
      console.error('Error loading care session data:', err)
      setError('Failed to load care session data')
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  // Save care session data
  const saveSessionData = useCallback((data: SessionData) => {
    try {
      // Calculate completion percentage
      const totalAreas = data.areas.length
      const completedAreas = data.areas.filter(a => a.status === 'completed' || a.status === 'skipped').length
      data.completionPercentage = Math.round((completedAreas / totalAreas) * 100)
      data.updatedAt = new Date().toISOString()

      localStorage.setItem(`session-${sessionId}-data`, JSON.stringify(data))
      setSessionData(data)
      return true
    } catch (err) {
      console.error('Error saving care session data:', err)
      setError('Failed to save care session data')
      return false
    }
  }, [sessionId])

  // Update a specific assessment area
  const updateArea = useCallback((areaId: string, updates: Partial<AssessmentArea>) => {
    if (!sessionData) return false

    const updatedData = {
      ...sessionData,
      areas: sessionData.areas.map(area =>
        area.id === areaId ? { ...area, ...updates } : area
      )
    }

    return saveSessionData(updatedData)
  }, [sessionData, saveSessionData])

  // Mark area as completed
  const markAreaCompleted = useCallback((areaId: string) => {
    return updateArea(areaId, { status: 'completed' })
  }, [updateArea])

  // Mark area as skipped
  const markAreaSkipped = useCallback((areaId: string) => {
    return updateArea(areaId, { status: 'skipped' })
  }, [updateArea])

  // Mark area as in progress
  const markAreaInProgress = useCallback((areaId: string) => {
    return updateArea(areaId, { status: 'in_progress' })
  }, [updateArea])

  // Add media to an area
  const addMediaToArea = useCallback((areaId: string, media: MediaFile) => {
    if (!sessionData) return false

    const area = sessionData.areas.find(a => a.id === areaId)
    if (!area) return false

    const updatedMedia = [...(area.media || []), media]
    const photoCount = updatedMedia.filter(m => m.type === 'photo').length
    const notesCount = updatedMedia.filter(m => m.type === 'audio').length

    return updateArea(areaId, {
      media: updatedMedia,
      photoCount,
      notesCount
    })
  }, [sessionData, updateArea])

  // Get care session progress
  const getProgress = useCallback(() => {
    if (!sessionData) return { percentage: 0, completed: 0, total: 0 }

    const total = sessionData.areas.length
    const completed = sessionData.areas.filter(a =>
      a.status === 'completed' || a.status === 'skipped'
    ).length

    return {
      percentage: sessionData.completionPercentage,
      completed,
      total
    }
  }, [sessionData])

  return {
    sessionData,
    loading,
    error,
    saveSessionData,
    updateArea,
    markAreaCompleted,
    markAreaSkipped,
    markAreaInProgress,
    addMediaToArea,
    getProgress
  }
}

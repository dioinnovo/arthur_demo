'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Search, Filter, Clock, CheckCircle, AlertCircle,
  Activity, Heart, Brain, Shield, Stethoscope, Wind,
  TrendingUp, Users, Calendar, ChevronRight, Target
} from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { CLINICAL_PATHWAYS } from '@/lib/constants/healthcare-terminology'

interface ClinicalPathway {
  id: string
  patientName: string
  mrn: string
  pathwayType: string
  status: 'active' | 'scheduled' | 'completed' | 'monitoring'
  startDate: string
  nextMilestone: string
  progress: number
  careManager: string
  riskScore: string
  outcomes: {
    adherence: number
    qualityScore: number
    costSavings: number
  }
}

export default function ClinicalPathwaysPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPathway, setFilterPathway] = useState('all')

  const activePathways: ClinicalPathway[] = [
    {
      id: 'CP-001',
      patientName: 'Margaret Thompson',
      mrn: 'MRN-784512',
      pathwayType: 'Heart Failure Protocol',
      status: 'active',
      startDate: '2024-02-15',
      nextMilestone: 'Cardiology Follow-up',
      progress: 72,
      careManager: 'Sarah Chen, RN',
      riskScore: 'High',
      outcomes: {
        adherence: 88,
        qualityScore: 92,
        costSavings: 24500
      }
    },
    {
      id: 'CP-002',
      patientName: 'Robert Johnson',
      mrn: 'MRN-784513',
      pathwayType: 'COPD Management',
      status: 'active',
      startDate: '2024-02-20',
      nextMilestone: 'Pulmonary Function Test',
      progress: 45,
      careManager: 'Michael Davis, RN',
      riskScore: 'Medium',
      outcomes: {
        adherence: 75,
        qualityScore: 85,
        costSavings: 15200
      }
    },
    {
      id: 'CP-003',
      patientName: 'Eleanor Martinez',
      mrn: 'MRN-784514',
      pathwayType: 'Post-Surgical Care',
      status: 'monitoring',
      startDate: '2024-03-01',
      nextMilestone: 'Wound Check',
      progress: 90,
      careManager: 'Jennifer Park, MSW',
      riskScore: 'Low',
      outcomes: {
        adherence: 95,
        qualityScore: 98,
        costSavings: 32000
      }
    },
    {
      id: 'CP-004',
      patientName: 'James Wilson',
      mrn: 'MRN-784515',
      pathwayType: 'Diabetes Management',
      status: 'scheduled',
      startDate: '2024-03-25',
      nextMilestone: 'Initial Assessment',
      progress: 0,
      careManager: 'Lisa Wong, RN',
      riskScore: 'High',
      outcomes: {
        adherence: 0,
        qualityScore: 0,
        costSavings: 0
      }
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'scheduled': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      case 'monitoring': return 'bg-amber-100 text-amber-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPathwayIcon = (pathwayType: string) => {
    if (pathwayType.includes('Heart') || pathwayType.includes('CHF')) return Heart
    if (pathwayType.includes('COPD') || pathwayType.includes('Pulmonary')) return Wind
    if (pathwayType.includes('Diabetes')) return Activity
    if (pathwayType.includes('Behavioral') || pathwayType.includes('Mental')) return Brain
    if (pathwayType.includes('Preventive')) return Shield
    if (pathwayType.includes('Post-Surgical')) return Stethoscope
    return Activity
  }

  const filteredPathways = activePathways.filter(pathway => {
    const matchesSearch =
      pathway.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pathway.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pathway.pathwayType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || pathway.status === filterStatus
    const matchesPathway = filterPathway === 'all' || pathway.pathwayType === filterPathway
    return matchesSearch && matchesStatus && matchesPathway
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Clinical Pathways"
        description="Evidence-based care protocols and patient journey management"
        action={
          <button
            className="h-12 px-6 bg-arthur-blue text-white rounded-full hover:bg-arthur-blue-dark flex items-center justify-center gap-2 w-full sm:w-auto transition-colors font-medium"
          >
            <Plus size={20} />
            <span>New Pathway</span>
          </button>
        }
      />

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by patient name, MRN, or pathway type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-arthur-blue/30 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="monitoring">Monitoring</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filterPathway}
              onChange={(e) => setFilterPathway(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Pathways</option>
              {CLINICAL_PATHWAYS.map(pathway => (
                <option key={pathway.id} value={pathway.name}>{pathway.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Pathways Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPathways.map((pathway) => {
          const Icon = getPathwayIcon(pathway.pathwayType)
          return (
            <div
              key={pathway.id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => router.push(`/dashboard/care-coordination/${pathway.id}`)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-arthur-blue/10 rounded-lg flex items-center justify-center">
                    <Icon className="text-arthur-blue" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">{pathway.patientName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{pathway.mrn}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(pathway.status)}`}>
                    {pathway.status.charAt(0).toUpperCase() + pathway.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    pathway.riskScore === 'High' ? 'bg-red-100 text-red-700' :
                    pathway.riskScore === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {pathway.riskScore} Risk
                  </span>
                </div>
              </div>

              {/* Pathway Info */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-arthur-blue mb-1">{pathway.pathwayType}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    Started {pathway.startDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {pathway.careManager}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Pathway Progress</span>
                  <span className="text-xs font-bold text-arthur-blue">{pathway.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-arthur-blue h-2 rounded-full transition-all"
                    style={{ width: `${pathway.progress}%` }}
                  />
                </div>
              </div>

              {/* Next Milestone */}
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Next Milestone</p>
                    <p className="text-sm font-semibold text-arthur-blue">{pathway.nextMilestone}</p>
                  </div>
                  <Target className="text-arthur-blue" size={20} />
                </div>
              </div>

              {/* Outcomes Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Adherence</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{pathway.outcomes.adherence}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Quality</p>
                  <p className="text-lg font-bold text-green-600">{pathway.outcomes.qualityScore}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Savings</p>
                  <p className="text-lg font-bold text-blue-600">${(pathway.outcomes.costSavings / 1000).toFixed(0)}k</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full flex items-center justify-center gap-2 text-arthur-blue hover:text-arthur-blue-dark font-medium text-sm">
                  View Pathway Details
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-arthur-blue to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={24} />
          <h2 className="text-xl font-bold">Arthur AI Pathway Insights</h2>
        </div>
image.png
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">Optimization Alert</h3>
            <p className="text-sm opacity-90">3 patients could benefit from transitioning to lower-intensity pathways based on improvement metrics.</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">Adherence Risk</h3>
            <p className="text-sm opacity-90">5 patients showing declining engagement. Recommend proactive outreach within 48 hours.</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">Cost Opportunity</h3>
            <p className="text-sm opacity-90">Implementing home monitoring for 8 patients could save $125K annually.</p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredPathways.length === 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <AlertCircle className="text-gray-400 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No pathways found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria or create a new clinical pathway</p>
        </div>
      )}
    </div>
  )
}
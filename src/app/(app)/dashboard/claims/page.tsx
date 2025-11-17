'use client'

import { useState } from 'react'
import { Users, Plus, Search, Filter, TrendingUp, AlertCircle, Activity, BarChart3 } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import PatientCard from './_components/PatientCard'
import { aggregatePatientData, getPatientStatistics, type Claim } from '@/lib/utils/patient-aggregation'

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({
    riskLevel: 'all',
    coverageStatus: 'all',
    carrier: 'all'
  })

  // Sample claims data (same as before but now used for aggregation)
  const activeClaims: Claim[] = [
    {
      id: 'CLM-2024-001',
      patientName: 'Margaret Thompson',
      mrn: 'MRN-784512',
      requestType: 'Prior Authorization',
      condition: 'Type 2 Diabetes - Insulin Pump',
      status: 'Coverage Review',
      priority: 'High',
      policyCarrier: 'Blue Cross Blue Shield',
      policyNumber: 'BCA-2024-98745632',
      requestedTreatment: 'Continuous Glucose Monitor + Insulin Pump',
      coverageStatus: 'Partial Coverage',
      coverageGap: '$2,400 out-of-pocket',
      aiRecommendation: 'Alternative CGM covered at 100%',
      estimatedSavings: 2400,
      nextAction: 'Submit alternative device authorization',
      aiConfidence: 94,
      daysOpen: 3,
      lastActivity: '2 hours ago'
    },
    {
      id: 'CLM-2024-002',
      patientName: 'Robert Chen',
      mrn: 'MRN-329847',
      requestType: 'Treatment Authorization',
      condition: 'Type 1 Diabetes - CGM Device',
      status: 'Provider Network Review',
      priority: 'Medium',
      policyCarrier: 'UnitedHealthcare',
      policyNumber: 'UHC-EPO-456789',
      requestedTreatment: 'Continuous Glucose Monitoring System',
      coverageStatus: 'In-Network Required',
      coverageGap: '$1,200 if out-of-network',
      aiRecommendation: 'In-network DME supplier 1.5 mi away, same device',
      estimatedSavings: 1200,
      nextAction: 'Coordinate in-network DME placement',
      aiConfidence: 96,
      daysOpen: 1,
      lastActivity: '45 min ago'
    },
    {
      id: 'CLM-2024-003',
      patientName: 'Emily Rodriguez',
      mrn: 'MRN-567234',
      requestType: 'Specialist Referral',
      condition: 'Gestational Diabetes - High Risk OB',
      status: 'Coverage Verified',
      priority: 'High',
      policyCarrier: 'Aetna',
      policyNumber: 'AET-HMO-789456',
      requestedTreatment: 'Maternal-Fetal Medicine Consultation',
      coverageStatus: 'Fully Covered',
      coverageGap: '$40 copay (specialist tier)',
      aiRecommendation: 'Top-rated MFM specialist in-network, 2-day wait',
      estimatedSavings: 0,
      nextAction: 'Schedule appointment with Dr. Rodriguez',
      aiConfidence: 98,
      daysOpen: 2,
      lastActivity: 'Today'
    }
  ]

  // Aggregate patients from claims
  const patientsWithClaims = aggregatePatientData(activeClaims)

  // Filter patients
  const filteredPatients = patientsWithClaims.filter(patient => {
    const matchesSearch = searchQuery === '' ||
      patient.patientInfo.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.patientInfo.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.patientInfo.currentConditions.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      patient.patientInfo.carrier.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRiskLevel = activeFilters.riskLevel === 'all' || patient.riskLevel === activeFilters.riskLevel
    const matchesCoverageStatus = activeFilters.coverageStatus === 'all' ||
      (activeFilters.coverageStatus === 'issues' && patient.coverageIssuesCount > 0) ||
      (activeFilters.coverageStatus === 'clean' && patient.coverageIssuesCount === 0)
    const matchesCarrier = activeFilters.carrier === 'all' || patient.patientInfo.carrier === activeFilters.carrier

    return matchesSearch && matchesRiskLevel && matchesCoverageStatus && matchesCarrier
  })

  // Get statistics
  const stats = getPatientStatistics(patientsWithClaims)

  return (
    <div className="space-y-4">
      {/* Header */}
      <PageHeader
        title="Patient Hub"
        description="Comprehensive patient overview with policy analysis and authorization management"
        action={
          <button
            className="h-12 px-6 bg-arthur-blue text-white rounded-full hover:bg-arthur-blue-dark flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium">New Patient</span>
          </button>
        }
      />

      {/* KPI Cards - Patient Focused */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Patients</p>
            <Users className="text-arthur-blue" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalPatients}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Under care coordination</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Coverage Issues</p>
            <AlertCircle className="text-orange-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-orange-600">
            {stats.patientsWithCoverageIssues}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Patients need attention</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">High-Risk Patients</p>
            <Activity className="text-red-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-red-600">
            {stats.highRiskPatients}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Require close monitoring</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Claims/Patient</p>
            <BarChart3 className="text-emerald-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-emerald-600">
            {stats.avgClaimsPerPatient}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active authorizations</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by patient name, MRN, condition, or insurance carrier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-arthur-blue focus:border-arthur-blue transition-all"
            />
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap gap-3">
            {/* Risk Level Filter */}
            <select
              value={activeFilters.riskLevel}
              onChange={(e) => setActiveFilters({...activeFilters, riskLevel: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-arthur-blue focus:border-arthur-blue text-sm transition-all"
            >
              <option value="all">All Risk Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Coverage Status Filter */}
            <select
              value={activeFilters.coverageStatus}
              onChange={(e) => setActiveFilters({...activeFilters, coverageStatus: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-arthur-blue focus:border-arthur-blue text-sm transition-all"
            >
              <option value="all">All Coverage Status</option>
              <option value="issues">Has Coverage Issues</option>
              <option value="clean">No Issues</option>
            </select>

            {/* Carrier Filter */}
            <select
              value={activeFilters.carrier}
              onChange={(e) => setActiveFilters({...activeFilters, carrier: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-arthur-blue focus:border-arthur-blue text-sm transition-all"
            >
              <option value="all">All Carriers</option>
              <option value="Blue Cross Blue Shield">Blue Cross Blue Shield</option>
              <option value="UnitedHealthcare">UnitedHealthcare</option>
              <option value="Aetna">Aetna</option>
              <option value="Cigna">Cigna</option>
            </select>

            {/* Clear Filters Button */}
            {(searchQuery || activeFilters.riskLevel !== 'all' || activeFilters.coverageStatus !== 'all' || activeFilters.carrier !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilters({ riskLevel: 'all', coverageStatus: 'all', carrier: 'all' })
                }}
                className="px-4 py-2 text-sm text-arthur-blue hover:bg-arthur-blue/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <Filter size={16} />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Patients</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{filteredPatients.length} patients</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.patientInfo.mrn} patient={patient} />
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">No patients found</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-br from-arthur-blue to-blue-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={24} />
          <h2 className="text-xl font-bold">Arthur AI Patient Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={18} />
              <h3 className="font-semibold">High-Risk Patient Alert</h3>
            </div>
            <p className="text-sm text-white/90">{stats.highRiskPatients} patients require immediate care coordination. Multiple chronic conditions detected with suboptimal treatment adherence patterns.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={18} />
              <h3 className="font-semibold">Coverage Optimization</h3>
            </div>
            <p className="text-sm text-white/90">{stats.patientsWithCoverageIssues} patients have coverage gaps. AI-recommended alternatives available with 100% coverage for critical treatments.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 size={18} />
              <h3 className="font-semibold">Care Coordination Opportunity</h3>
            </div>
            <p className="text-sm text-white/90">Avg {stats.avgClaimsPerPatient} active authorizations per patient. Streamline multi-specialty coordination to reduce administrative burden by 40%.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

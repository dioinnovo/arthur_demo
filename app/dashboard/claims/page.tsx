'use client'

import { useState } from 'react'
import { FileText, ChevronRight, Plus, Search, Filter, TrendingUp, DollarSign, Clock, AlertCircle, CheckCircle2, Calendar, Shield, CheckSquare } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'

export default function ClaimsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    priority: 'all',
    requestType: 'all'
  })

  const activeClaims = [
    {
      id: 'CLM-2024-001',
      patientName: 'Margaret Thompson',
      mrn: 'MRN-784512',
      requestType: 'Prior Authorization',
      condition: 'Type 2 Diabetes - Insulin Pump',
      status: 'Coverage Review',
      priority: 'High',
      policyCarrier: 'UnitedHealthcare Medicare Advantage',
      policyNumber: 'UHC-MA-784512',
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
      patientName: 'Robert Johnson',
      mrn: 'MRN-892341',
      requestType: 'Treatment Authorization',
      condition: 'Hip Replacement - Post-Acute Care',
      status: 'Provider Network Review',
      priority: 'Medium',
      policyCarrier: 'Aetna PPO',
      policyNumber: 'AET-PPO-892341',
      requestedTreatment: 'Skilled Nursing Facility - 30 days',
      coverageStatus: 'In-Network Required',
      coverageGap: '$8,200 if out-of-network',
      aiRecommendation: 'In-network SNF 2.1 mi away, same quality score',
      estimatedSavings: 8200,
      nextAction: 'Coordinate in-network SNF placement',
      aiConfidence: 98,
      daysOpen: 1,
      lastActivity: '45 min ago'
    },
    {
      id: 'CLM-2024-003',
      patientName: 'Eleanor Martinez',
      mrn: 'MRN-567823',
      requestType: 'Specialist Referral',
      condition: 'Chronic CHF - NYHA Class III',
      status: 'Coverage Verified',
      priority: 'High',
      policyCarrier: 'Cigna Medicare Advantage',
      policyNumber: 'CIG-MA-567823',
      requestedTreatment: 'Interventional Cardiology Consultation',
      coverageStatus: 'Fully Covered',
      coverageGap: '$0 copay (specialist tier)',
      aiRecommendation: 'Top-rated provider in-network, 3-day wait',
      estimatedSavings: 0,
      nextAction: 'Schedule appointment with Dr. Chen',
      aiConfidence: 96,
      daysOpen: 5,
      lastActivity: 'Today'
    },
    {
      id: 'CLM-2024-004',
      patientName: 'David Kim',
      mrn: 'MRN-234156',
      requestType: 'Medication Authorization',
      condition: 'Major Depressive Disorder',
      status: 'Formulary Review',
      priority: 'Critical',
      policyCarrier: 'Blue Cross Blue Shield',
      policyNumber: 'BCBS-PPO-234156',
      requestedTreatment: 'Brand-name antidepressant (Trintellix)',
      coverageStatus: 'Not on Formulary',
      coverageGap: '$340/month out-of-pocket',
      aiRecommendation: 'Generic equivalent covered, same efficacy',
      estimatedSavings: 4080,
      nextAction: 'Provider consultation for generic switch',
      aiConfidence: 91,
      daysOpen: 2,
      lastActivity: '3 hours ago'
    }
  ]

  const filteredClaims = activeClaims.filter(claim => {
    const matchesSearch = searchQuery === '' ||
      claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.policyCarrier.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = activeFilters.status === 'all' || claim.status === activeFilters.status
    const matchesPriority = activeFilters.priority === 'all' || claim.priority === activeFilters.priority
    const matchesRequestType = activeFilters.requestType === 'all' || claim.requestType === activeFilters.requestType

    return matchesSearch && matchesStatus && matchesPriority && matchesRequestType
  })

  const totalActiveRequests = activeClaims.length
  const totalEstimatedSavings = activeClaims.reduce((sum, claim) => sum + claim.estimatedSavings, 0)
  const coverageIssues = activeClaims.filter(claim => claim.coverageStatus !== 'Fully Covered').length
  const avgConfidence = Math.round(activeClaims.reduce((sum, claim) => sum + claim.aiConfidence, 0) / activeClaims.length)

  return (
    <div className="space-y-4">
      {/* Header */}
      <PageHeader
        title="Policy Analysis & Authorization"
        description="AI-powered coverage verification, prior authorization, and cost optimization"
        action={
          <button
            className="h-12 px-6 bg-arthur-blue text-white rounded-full hover:bg-arthur-blue-dark flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium">New Authorization Request</span>
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Requests</p>
            <FileText className="text-arthur-blue" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalActiveRequests}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pending authorization</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Coverage Issues</p>
            <AlertCircle className="text-orange-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-orange-600">
            {coverageIssues}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Require attention</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Patient Savings</p>
            <DollarSign className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-green-600">
            ${(totalEstimatedSavings / 1000).toFixed(1)}K
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Through optimization</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">AI Confidence</p>
            <CheckSquare className="text-emerald-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-emerald-600">
            {avgConfidence}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Average across requests</p>
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
              placeholder="Search by patient name, MRN, condition, or policy carrier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-arthur-blue focus:border-arthur-blue transition-all"
            />
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <select
              value={activeFilters.status}
              onChange={(e) => setActiveFilters({...activeFilters, status: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-arthur-blue focus:border-arthur-blue text-sm transition-all"
            >
              <option value="all">All Status</option>
              <option value="Coverage Review">Coverage Review</option>
              <option value="Provider Network Review">Provider Network Review</option>
              <option value="Coverage Verified">Coverage Verified</option>
              <option value="Formulary Review">Formulary Review</option>
              <option value="Pending Documentation">Pending Documentation</option>
              <option value="Approved">Approved</option>
            </select>

            {/* Priority Filter */}
            <select
              value={activeFilters.priority}
              onChange={(e) => setActiveFilters({...activeFilters, priority: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-arthur-blue focus:border-arthur-blue text-sm transition-all"
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Request Type Filter */}
            <select
              value={activeFilters.requestType}
              onChange={(e) => setActiveFilters({...activeFilters, requestType: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-arthur-blue focus:border-arthur-blue text-sm transition-all"
            >
              <option value="all">All Request Types</option>
              <option value="Prior Authorization">Prior Authorization</option>
              <option value="Treatment Authorization">Treatment Authorization</option>
              <option value="Specialist Referral">Specialist Referral</option>
              <option value="Medication Authorization">Medication Authorization</option>
            </select>

            {/* Clear Filters Button */}
            {(searchQuery || activeFilters.status !== 'all' || activeFilters.priority !== 'all' || activeFilters.requestType !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilters({ status: 'all', priority: 'all', requestType: 'all' })
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

      {/* Active Requests Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Authorization Requests</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{filteredClaims.length} active</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredClaims.map((claim) => (
            <Link
              key={claim.id}
              href={`/dashboard/claims/${claim.id}`}
              className="block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-arthur-blue hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{claim.mrn}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    claim.priority === 'Critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                    claim.priority === 'High' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                    claim.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}>
                    {claim.priority}
                  </span>
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-1">{claim.patientName}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">{claim.condition}</p>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                {/* Request Type Badge */}
                <div className="flex items-center gap-2">
                  <Shield className="text-arthur-blue" size={14} />
                  <span className="text-xs font-semibold text-arthur-blue">{claim.requestType}</span>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">Status:</span>
                  <span className={`font-medium text-xs ${
                    claim.coverageStatus === 'Fully Covered' ? 'text-green-600 dark:text-green-400' :
                    claim.coverageStatus === 'Partial Coverage' ? 'text-orange-600 dark:text-orange-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {claim.coverageStatus}
                  </span>
                </div>

                {/* Coverage Gap */}
                {claim.coverageGap && claim.coverageStatus !== 'Fully Covered' && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-2">
                    <p className="text-xs text-orange-700 dark:text-orange-300 font-medium">{claim.coverageGap}</p>
                  </div>
                )}

                {/* AI Recommendation */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <CheckSquare className="text-arthur-blue flex-shrink-0 mt-0.5" size={14} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">AI Recommendation</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{claim.aiRecommendation}</p>
                    </div>
                  </div>
                  {claim.estimatedSavings > 0 && (
                    <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Est. Savings:</span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">
                          ${claim.estimatedSavings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Next Action */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Next Action:</p>
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{claim.nextAction}</p>
                  </div>
                  <ChevronRight className="text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2 group-hover:text-arthur-blue transition" size={18} />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {claim.daysOpen}d open
                  </span>
                  <span className="flex items-center gap-1">
                    AI: {claim.aiConfidence}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-br from-arthur-blue to-blue-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={24} />
          <h2 className="text-xl font-bold">Arthur AI Policy Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={18} />
              <h3 className="font-semibold">Cost Optimization</h3>
            </div>
            <p className="text-sm text-white/90">3 coverage gaps identified with alternative in-network options. Potential patient savings of $14.6K annually through smart plan navigation.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} />
              <h3 className="font-semibold">Fast-Track Approvals</h3>
            </div>
            <p className="text-sm text-white/90">2 requests eligible for expedited approval based on policy analysis. Arthur AI auto-generated supporting documentation to accelerate authorization.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={18} />
              <h3 className="font-semibold">Provider Network Intelligence</h3>
            </div>
            <p className="text-sm text-white/90">All referrals matched with in-network, top-rated providers within 5 miles. Zero out-of-network penalties predicted across active requests.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

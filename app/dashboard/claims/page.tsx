'use client'

import { useState } from 'react'
import { FileText, ChevronRight, Plus, Search, Filter, TrendingUp, DollarSign, Clock, AlertCircle, CheckCircle2, Calendar } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'

export default function ClaimsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    priority: 'all',
    claimType: 'all'
  })

  const activeClaims = [
    {
      id: 'CLM-2024-001',
      claimantName: 'Margaret Thompson',
      caseNumber: 'MC-2024-1047',
      injuryType: 'Complex Diabetes Management - High-Risk Patient',
      status: 'Active Care Coordination',
      priority: 'High',
      dateOfLoss: '2024-08-15',
      daysOpen: 45,
      currentDemand: 12500,
      aiRecommendedSettlement: 8200,
      insuranceCarrier: 'UnitedHealthcare Medicare',
      adjuster: 'Care Coordinator',
      nextAction: 'Endocrinology Specialist Referral',
      potentialIncrease: -4300,
      aiConfidence: 94,
      lastActivity: '2 hours ago',
      voiceNote: 'Patient reports improved glucose control with new medication regimen. Adherence at 92%. Coordinating with endocrinologist for follow-up in 2 weeks.',
      transcript: '10:45 AM - Care Coordinator Call with patient. Discussed medication compliance, dietary changes, and upcoming specialist appointments. Patient expressed satisfaction with care plan.'
    },
    {
      id: 'CLM-2024-002',
      claimantName: 'Robert Johnson',
      caseNumber: 'MC-2024-1048',
      injuryType: 'Post-Acute Care - Hip Replacement Recovery',
      status: 'Transition Planning',
      priority: 'Medium',
      dateOfLoss: '2024-09-02',
      daysOpen: 28,
      currentDemand: 15800,
      aiRecommendedSettlement: 11200,
      insuranceCarrier: 'Aetna Commercial',
      adjuster: 'Case Manager',
      nextAction: 'Home Health Services Setup',
      potentialIncrease: -4600,
      aiConfidence: 88,
      lastActivity: 'Today',
      voiceNote: 'Patient ready for discharge. Arranged home health PT 3x weekly. DME equipment delivered. Family support system confirmed.',
      transcript: '2:15 PM - Discharge planning meeting with patient, family, and care team. Reviewed home safety, medication schedule, and PT exercises. Patient verbalized understanding.'
    },
    {
      id: 'CLM-2024-003',
      claimantName: 'Eleanor Martinez',
      caseNumber: 'MC-2024-1049',
      injuryType: 'Chronic CHF Management - NYHA Class III',
      status: 'Optimization Active',
      priority: 'High',
      dateOfLoss: '2024-07-20',
      daysOpen: 72,
      currentDemand: 18900,
      aiRecommendedSettlement: 13400,
      insuranceCarrier: 'Cigna Medicare Advantage',
      adjuster: 'Clinical Coordinator',
      nextAction: 'Cardiology Follow-up & Medication Optimization',
      potentialIncrease: -5500,
      aiConfidence: 96,
      lastActivity: 'Today',
      voiceNote: 'Patient showing significant improvement with new diuretic regimen. Weight stable, no recent hospitalizations. Care team meeting scheduled to discuss potential for reduced monitoring.',
      transcript: '9:30 AM - Weekly check-in call. Patient reports feeling better, improved exercise tolerance. No shortness of breath at rest. Medication adherence excellent at 98%.'
    },
    {
      id: 'CLM-2024-004',
      claimantName: 'David Kim',
      caseNumber: 'MC-2024-1050',
      injuryType: 'Behavioral Health Crisis - High Utilizer',
      status: 'Intensive Case Management',
      priority: 'Critical',
      dateOfLoss: '2024-09-15',
      daysOpen: 15,
      currentDemand: 28500,
      aiRecommendedSettlement: 14200,
      insuranceCarrier: 'Blue Cross Blue Shield',
      adjuster: 'Behavioral Health Specialist',
      nextAction: 'Psychiatric Assessment & Care Plan Development',
      potentialIncrease: -14300,
      aiConfidence: 91,
      lastActivity: '1 day ago',
      voiceNote: 'Patient stabilizing after crisis intervention. Connected with community mental health services. Medication management appointment scheduled. Social worker assisting with housing stability.',
      transcript: '4:00 PM - Crisis assessment with patient and psychiatrist. Patient agrees to treatment plan including medication management, weekly therapy, and peer support group. Safety plan established.'
    }
  ]

  const filteredClaims = activeClaims.filter(claim => {
    const matchesSearch = searchQuery === '' ||
      claim.claimantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.injuryType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.insuranceCarrier.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = activeFilters.status === 'all' || claim.status === activeFilters.status
    const matchesPriority = activeFilters.priority === 'all' || claim.priority === activeFilters.priority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const totalActiveClaims = activeClaims.length
  const totalDemandValue = activeClaims.reduce((sum, claim) => sum + claim.currentDemand, 0)
  const totalAIRecommended = activeClaims.reduce((sum, claim) => sum + claim.aiRecommendedSettlement, 0)
  const totalPotentialIncrease = totalAIRecommended - totalDemandValue

  return (
    <div className="space-y-4">
      {/* Header */}
      <PageHeader
        title="Medical Cost Management"
        description="AI-powered care coordination and cost optimization for high-value patient care"
        action={
          <button
            className="h-12 px-6 bg-arthur-blue text-white rounded-full hover:bg-arthur-blue-dark flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium">New Care Case</span>
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Care Cases</p>
            <FileText className="text-arthur-blue" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalActiveClaims}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Under active management</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Monthly Cost</p>
            <DollarSign className="text-blue-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            ${(totalDemandValue / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Before optimization</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">AI Optimized Cost</p>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-green-600">
            ${(totalAIRecommended / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">With care coordination</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</p>
            <TrendingUp className="text-emerald-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-emerald-600">
            ${Math.abs(totalPotentialIncrease / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
            <span>↓ {Math.abs((totalPotentialIncrease / totalDemandValue) * 100).toFixed(1)}%</span>
            <span className="text-gray-500 dark:text-gray-400">cost reduction</span>
          </p>
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
              placeholder="Search by claimant name, case number, injury type, or carrier..."
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
              <option value="Investigation">Investigation</option>
              <option value="Medical Treatment">Medical Treatment</option>
              <option value="Active Negotiation">Active Negotiation</option>
              <option value="Settlement Pending">Settlement Pending</option>
              <option value="Closed">Closed</option>
            </select>

            {/* Priority Filter */}
            <select
              value={activeFilters.priority}
              onChange={(e) => setActiveFilters({...activeFilters, priority: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-arthur-blue focus:border-arthur-blue text-sm transition-all"
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            {/* Claim Type Filter */}
            <select
              value={activeFilters.claimType}
              onChange={(e) => setActiveFilters({...activeFilters, claimType: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-arthur-blue focus:border-arthur-blue text-sm transition-all"
            >
              <option value="all">All Claim Types</option>
              <option value="auto">Auto Accident</option>
              <option value="slip-fall">Slip & Fall</option>
              <option value="workplace">Workplace Injury</option>
              <option value="medical">Medical Malpractice</option>
              <option value="product">Product Liability</option>
            </select>

            {/* Clear Filters Button */}
            {(searchQuery || activeFilters.status !== 'all' || activeFilters.priority !== 'all' || activeFilters.claimType !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilters({ status: 'all', priority: 'all', claimType: 'all' })
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

      {/* Active Claims Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Active Claims</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{filteredClaims.length} claims</span>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredClaims.map((claim) => (
            <Link
              key={claim.id}
              href={`/dashboard/claims/${claim.id}`}
              className="block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-arthur-blue transition cursor-pointer"
            >
              {/* Claim Header */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b-2 border-arthur-blue">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{claim.caseNumber}</span>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      claim.priority === 'Critical' ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300' :
                      claim.priority === 'High' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300' :
                      claim.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' :
                      'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                    }`}>
                      {claim.priority}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{claim.claimantName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{claim.injuryType}</p>
              </div>

              {/* Claim Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                  <span className={`font-medium ${
                    claim.status === 'Active Negotiation' ? 'text-blue-600 dark:text-blue-400' :
                    claim.status === 'Settlement Pending' ? 'text-green-600 dark:text-green-400' :
                    claim.status === 'Investigation' ? 'text-amber-600 dark:text-amber-400' :
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                    {claim.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Insurance Carrier:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{claim.insuranceCarrier}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Adjuster:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{claim.adjuster}</span>
                </div>

                {/* Settlement Values */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Current Demand:</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        ${claim.currentDemand.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">AI Recommended:</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        ${claim.aiRecommendedSettlement.toLocaleString()}
                      </span>
                    </div>
                    {claim.potentialIncrease > 0 && (
                      <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 px-2 py-1.5 rounded">
                        <span className="text-xs font-medium text-green-700 dark:text-green-300">Potential Increase:</span>
                        <span className="text-sm font-bold text-green-700 dark:text-green-300">
                          +${claim.potentialIncrease.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Confidence */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">AI Confidence:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          claim.aiConfidence >= 90 ? 'bg-green-500' :
                          claim.aiConfidence >= 80 ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${claim.aiConfidence}%` }}
                      />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{claim.aiConfidence}%</span>
                  </div>
                </div>

                {/* Next Action */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next Action:</p>
                      <p className="text-sm font-medium text-arthur-blue">{claim.nextAction}</p>
                    </div>
                    <ChevronRight className="text-gray-400 dark:text-gray-500 flex-shrink-0" size={20} />
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {claim.daysOpen} days open
                  </span>
                  <span>Last activity: {claim.lastActivity}</span>
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
          <h2 className="text-xl font-bold">Arthur AI Settlement Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={18} />
              <h3 className="font-semibold">High-Value Opportunities</h3>
            </div>
            <p className="text-sm text-white/90">2 claims show potential for 30%+ settlement increases based on similar case outcomes.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} />
              <h3 className="font-semibold">Time-Sensitive Actions</h3>
            </div>
            <p className="text-sm text-white/90">3 claims approaching statute of limitations. Immediate action required within 30 days.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} />
              <h3 className="font-semibold">Documentation Complete</h3>
            </div>
            <p className="text-sm text-white/90">5 claims ready for demand letters. AI has optimized settlement amounts based on medical records.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

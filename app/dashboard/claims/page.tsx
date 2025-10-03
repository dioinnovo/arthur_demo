'use client'

import { useState } from 'react'
import { Users, ChevronRight, Plus, Search, Filter, Activity, AlertCircle, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'

export default function CareCoordinationDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    riskLevel: 'all',
    careType: 'all'
  })

  const activeCases = [
    {
      id: 'PT-2024-001',
      patientName: 'Margaret Thompson',
      mrn: 'MRN-784512',
      age: 72,
      riskScore: 'High',
      primaryDx: 'CHF with Diabetes',
      status: 'Active Care',
      careManager: 'Sarah Chen, RN',
      nextIntervention: 'Medication Reconciliation',
      daysInProgram: 45,
      costSavings: 12500,
      qualityScore: 92,
      lastContact: '2 days ago'
    },
    {
      id: 'PT-2024-002',
      patientName: 'Robert Johnson',
      mrn: 'MRN-784513',
      age: 68,
      riskScore: 'Medium',
      primaryDx: 'COPD with HTN',
      status: 'Monitoring',
      careManager: 'Michael Davis, RN',
      nextIntervention: 'Pulmonary Rehab Assessment',
      daysInProgram: 28,
      costSavings: 8200,
      qualityScore: 88,
      lastContact: 'Today'
    },
    {
      id: 'PT-2024-003',
      patientName: 'Eleanor Martinez',
      mrn: 'MRN-784514',
      age: 65,
      riskScore: 'High',
      primaryDx: 'Post-Surgical Recovery',
      status: 'Transitioning',
      careManager: 'Jennifer Park, MSW',
      nextIntervention: 'Home Health Setup',
      daysInProgram: 14,
      costSavings: 15000,
      qualityScore: 95,
      lastContact: 'Today'
    }
  ]

  const filteredCases = activeCases.filter(patient => {
    const matchesSearch = searchQuery === '' ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.primaryDx.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = activeFilters.status === 'all' || patient.status === activeFilters.status
    const matchesRisk = activeFilters.riskLevel === 'all' || patient.riskScore === activeFilters.riskLevel

    return matchesSearch && matchesStatus && matchesRisk
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <PageHeader
        title="Care Coordination Hub"
        description="Comprehensive patient care management and coordination"
        action={
          <button
            className="h-12 px-6 bg-arthur-blue text-white rounded-full hover:bg-arthur-blue-dark flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium">New Patient</span>
          </button>
        }
      />

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by patient name, MRN, diagnosis, or care manager..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all"
            />
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <select
              value={activeFilters.status}
              onChange={(e) => setActiveFilters({...activeFilters, status: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm transition-all"
            >
              <option value="all">All Status</option>
              <option value="Active Care">Active Care</option>
              <option value="Monitoring">Monitoring</option>
              <option value="Transitioning">Transitioning</option>
              <option value="Stable">Stable</option>
            </select>

            {/* Risk Level Filter */}
            <select
              value={activeFilters.riskLevel}
              onChange={(e) => setActiveFilters({...activeFilters, riskLevel: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm transition-all"
            >
              <option value="all">All Risk Levels</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>

            {/* Care Type Filter */}
            <select
              value={activeFilters.careType}
              onChange={(e) => setActiveFilters({...activeFilters, careType: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm transition-all"
            >
              <option value="all">All Care Types</option>
              <option value="chronic">Chronic Disease Management</option>
              <option value="postacute">Post-Acute Care</option>
              <option value="transition">Care Transitions</option>
              <option value="preventive">Preventive Care</option>
            </select>

            {/* Clear Filters Button */}
            {(searchQuery || activeFilters.status !== 'all' || activeFilters.riskLevel !== 'all' || activeFilters.careType !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilters({ status: 'all', riskLevel: 'all', careType: 'all' })
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

      {/* Active Patient Cases */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Active Patient Cases</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{filteredCases.length} patients</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredCases.map((patient) => (
            <Link
              key={patient.id}
              href={`/dashboard/care-coordination/${patient.id}`}
              className="block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-arthur-blue transition cursor-pointer"
            >
              {/* Patient Header */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b-2 border-arthur-blue">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{patient.mrn}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    patient.riskScore === 'High' ? 'bg-red-100 text-red-800' :
                    patient.riskScore === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {patient.riskScore} Risk
                  </span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{patient.patientName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Age {patient.age} • {patient.primaryDx}</p>
              </div>

              {/* Care Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                  <span className={`font-medium ${
                    patient.status === 'Active Care' ? 'text-blue-600' :
                    patient.status === 'Transitioning' ? 'text-amber-600' :
                    'text-gray-600'
                  }`}>
                    {patient.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Care Manager:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{patient.careManager}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Next Action:</span>
                  <span className="font-medium text-arthur-blue truncate ml-2">{patient.nextIntervention}</span>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Days</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{patient.daysInProgram}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Quality</p>
                      <p className="text-lg font-bold text-green-600">{patient.qualityScore}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Savings</p>
                      <p className="text-lg font-bold text-blue-600">${(patient.costSavings / 1000).toFixed(0)}k</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Clock size={12} />
                    Last contact: {patient.lastContact}
                  </span>
                  <ChevronRight className="text-gray-400 dark:text-gray-500" size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Care Interventions Dashboard */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-arthur-blue" size={24} />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Active Care Interventions</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* High-Priority Intervention */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Margaret Thompson</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">CHF Exacerbation Prevention</p>
              </div>
              <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full flex items-center gap-1">
                <AlertCircle size={10} />
                High Priority
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Risk Score:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">8.5/10</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">ED Risk (30d):</span>
                <span className="font-semibold text-amber-600">72%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Potential Cost Avoidance:</span>
                <span className="font-semibold text-green-600">$45,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 dark:text-gray-400">Today - Medication adherence check scheduled</span>
              </div>
              <div className="text-xs text-gray-500 ml-4">
                Arthur recommends immediate nurse visit + diuretic adjustment
              </div>
            </div>
          </div>

          {/* Medium-Priority Intervention */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Robert Johnson</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">COPD Management</p>
              </div>
              <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-full">Medium Priority</span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Risk Score:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">6.2/10</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Readmission Risk:</span>
                <span className="font-semibold text-yellow-600">45%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Potential Cost Avoidance:</span>
                <span className="font-semibold text-green-600">$28,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Tomorrow - Pulmonary function test</span>
              </div>
              <div className="text-xs text-gray-500 ml-4">
                Inhaler technique training + oxygen therapy evaluation pending
              </div>
            </div>
          </div>
        </div>

        {/* Care Coordination Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-arthur-blue">156</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Active Patients</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">$2.4M</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Cost Savings YTD</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">4.8</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Star Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">92%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Patient Satisfaction</p>
          </div>
        </div>
      </div>

      {/* AI-Driven Care Insights */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border-l-4 border-arthur-blue">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-arthur-blue" size={24} />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Arthur Care Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-amber-900 dark:text-amber-200">Rising Risk Detected</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">12 patients showing early signs of decompensation. Proactive interventions recommended.</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-200">Care Gap Alert</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">28 patients overdue for preventive screenings. Schedule outreach campaigns.</p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-green-900 dark:text-green-200">Cost Optimization</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Switching 8 patients to generic medications could save $45K monthly.</p>
          </div>
        </div>
      </div>

    </div>
  )
}
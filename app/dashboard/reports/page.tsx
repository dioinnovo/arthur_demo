'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  TrendingUp, Download, Eye, Search, Filter, Calendar, CheckCircle,
  AlertCircle, Clock, Users, DollarSign, Activity, Heart,
  Award, Target, BarChart3, PieChart, LineChart, ArrowUp,
  ArrowDown, Shield, Star, Brain
} from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

interface PerformanceMetric {
  id: string
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  trendValue: number
  category: 'quality' | 'financial' | 'operational' | 'patient'
  lastUpdated: Date
  description: string
}

interface QualityReport {
  id: string
  measureName: string
  measureType: 'HEDIS' | 'CMS Stars' | 'CAHPS' | 'ACO'
  performance: number
  benchmark: number
  gap: number
  patientsEligible: number
  patientsCompliant: number
  status: 'exceeds' | 'meets' | 'below'
  impactOnReimbursement: number
}

export default function HealthcareAnalyticsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'quality' | 'financial' | 'operational' | 'patient'>('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState<'month' | 'quarter' | 'year'>('quarter')

  const performanceMetrics: PerformanceMetric[] = [
    {
      id: '1',
      name: 'HEDIS Composite Score',
      value: 87.5,
      target: 85,
      trend: 'up',
      trendValue: 3.2,
      category: 'quality',
      lastUpdated: new Date(),
      description: 'Overall Healthcare Effectiveness Data and Information Set performance'
    },
    {
      id: '2',
      name: 'Total Cost of Care PMPM',
      value: 385,
      target: 410,
      trend: 'down',
      trendValue: -6.1,
      category: 'financial',
      lastUpdated: new Date(),
      description: 'Per Member Per Month cost across all lines of business'
    },
    {
      id: '3',
      name: '30-Day Readmission Rate',
      value: 12.3,
      target: 15,
      trend: 'down',
      trendValue: -2.7,
      category: 'operational',
      lastUpdated: new Date(),
      description: 'Percentage of patients readmitted within 30 days of discharge'
    },
    {
      id: '4',
      name: 'Patient Satisfaction (CAHPS)',
      value: 4.6,
      target: 4.5,
      trend: 'up',
      trendValue: 0.2,
      category: 'patient',
      lastUpdated: new Date(),
      description: 'Consumer Assessment of Healthcare Providers and Systems score'
    },
    {
      id: '5',
      name: 'CMS Star Rating',
      value: 4.5,
      target: 4.0,
      trend: 'stable',
      trendValue: 0,
      category: 'quality',
      lastUpdated: new Date(),
      description: 'Centers for Medicare & Medicaid Services quality rating'
    },
    {
      id: '6',
      name: 'ED Utilization Rate',
      value: 245,
      target: 280,
      trend: 'down',
      trendValue: -12.5,
      category: 'operational',
      lastUpdated: new Date(),
      description: 'Emergency Department visits per 1,000 members'
    }
  ]

  const qualityReports: QualityReport[] = [
    {
      id: '1',
      measureName: 'Diabetes Care - HbA1c Control',
      measureType: 'HEDIS',
      performance: 82,
      benchmark: 78,
      gap: 4,
      patientsEligible: 450,
      patientsCompliant: 369,
      status: 'exceeds',
      impactOnReimbursement: 125000
    },
    {
      id: '2',
      measureName: 'Medication Adherence - Statins',
      measureType: 'CMS Stars',
      performance: 88,
      benchmark: 85,
      gap: 3,
      patientsEligible: 680,
      patientsCompliant: 598,
      status: 'exceeds',
      impactOnReimbursement: 95000
    },
    {
      id: '3',
      measureName: 'Breast Cancer Screening',
      measureType: 'HEDIS',
      performance: 71,
      benchmark: 75,
      gap: -4,
      patientsEligible: 320,
      patientsCompliant: 227,
      status: 'below',
      impactOnReimbursement: -45000
    },
    {
      id: '4',
      measureName: 'Care Coordination Rating',
      measureType: 'CAHPS',
      performance: 92,
      benchmark: 88,
      gap: 4,
      patientsEligible: 1200,
      patientsCompliant: 1104,
      status: 'exceeds',
      impactOnReimbursement: 180000
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeds':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
      case 'meets':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
      case 'below':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
    }
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable', isPositive: boolean) => {
    if (trend === 'up') return <ArrowUp className={`w-4 h-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
    if (trend === 'down') return <ArrowDown className={`w-4 h-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
    return <span className="w-4 h-4 text-gray-400">—</span>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Calculate aggregate statistics
  const stats = {
    totalMembers: 15234,
    activeInterventions: 1847,
    costSavingsYTD: 2456000,
    qualityBonus: 850000,
    averageRiskScore: 1.24,
    careGapsClosed: 3421
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <PageHeader
        title="Performance Analytics"
        description="Real-time healthcare quality and financial performance metrics"
        action={
          <button className="h-12 px-6 bg-arthur-blue text-white rounded-full hover:bg-arthur-blue-dark flex items-center justify-center gap-2 transition-colors">
            <Download size={20} />
            <span>Export Report</span>
          </button>
        }
      />

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-arthur-blue" size={20} />
            <span className="text-xs text-green-600 font-semibold">+5.2%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalMembers.toLocaleString()}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Members</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <Activity className="text-green-600" size={20} />
            <span className="text-xs text-green-600 font-semibold">+12%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.activeInterventions.toLocaleString()}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active Interventions</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-blue-600" size={20} />
            <span className="text-xs text-green-600 font-semibold">+18%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${(stats.costSavingsYTD / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Cost Savings YTD</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <Award className="text-purple-600" size={20} />
            <span className="text-xs text-green-600 font-semibold">+22%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${(stats.qualityBonus / 1000).toFixed(0)}K</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Quality Bonus</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <Shield className="text-amber-600" size={20} />
            <span className="text-xs text-amber-600 font-semibold">Stable</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.averageRiskScore}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Avg Risk Score</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <Target className="text-red-600" size={20} />
            <span className="text-xs text-green-600 font-semibold">+34%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.careGapsClosed.toLocaleString()}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Gaps Closed</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search metrics, reports, or measures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-arthur-blue/20 text-gray-900 dark:text-gray-100"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Categories</option>
            <option value="quality">Quality Measures</option>
            <option value="financial">Financial Performance</option>
            <option value="operational">Operational Metrics</option>
            <option value="patient">Patient Experience</option>
          </select>

          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {performanceMetrics.map(metric => (
          <div key={metric.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{metric.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{metric.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                metric.category === 'quality' ? 'bg-blue-100 text-blue-700' :
                metric.category === 'financial' ? 'bg-green-100 text-green-700' :
                metric.category === 'operational' ? 'bg-purple-100 text-purple-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {metric.category.charAt(0).toUpperCase() + metric.category.slice(1)}
              </span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {metric.category === 'financial' ? `$${metric.value}` :
                   metric.name.includes('Rate') ? `${metric.value}%` :
                   metric.value}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {getTrendIcon(metric.trend, metric.trend === 'down' && metric.category === 'financial')}
                  <span className={`text-sm font-medium ${
                    metric.trendValue > 0 ? 'text-green-600' :
                    metric.trendValue < 0 ? 'text-red-600' :
                    'text-gray-500'
                  }`}>
                    {metric.trendValue > 0 ? '+' : ''}{metric.trendValue}%
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">Target</p>
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                  {metric.category === 'financial' ? `$${metric.target}` : metric.target}
                </p>
                <div className="mt-2">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        metric.value >= metric.target ? 'bg-green-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quality Measures Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quality Measure Performance</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Measure
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Compliance
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Gap to Goal
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Financial Impact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {qualityReports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{report.measureName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Benchmark: {report.benchmark}%</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-arthur-blue/10 text-arthur-blue rounded text-xs font-medium">
                      {report.measureType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{report.performance}%</p>
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            report.status === 'exceeds' ? 'bg-green-500' :
                            report.status === 'meets' ? 'bg-blue-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${report.performance}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {report.patientsCompliant}/{report.patientsEligible}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">patients</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                      {report.gap > 0 ? '+' : ''}{report.gap}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className={`text-sm font-semibold ${
                      report.impactOnReimbursement > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {report.impactOnReimbursement > 0 ? '+' : ''}{formatCurrency(report.impactOnReimbursement)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-gradient-to-r from-arthur-blue to-blue-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Brain size={24} />
          <h2 className="text-xl font-bold">ARTHUR AI Performance Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">Improvement Opportunity</h3>
            <p className="text-sm opacity-90">Closing breast cancer screening gaps for 93 patients would generate $45K in quality bonuses.</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">Cost Trend Alert</h3>
            <p className="text-sm opacity-90">PMPM costs trending 8% below budget. Reinvest savings in preventive care programs.</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">Star Rating Impact</h3>
            <p className="text-sm opacity-90">Maintaining current trajectory will achieve 5-star rating next quarter, unlocking $2.1M bonus.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
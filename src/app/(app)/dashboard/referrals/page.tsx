'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users, Plus, Calendar, Clock, MapPin, User, CheckCircle,
  AlertCircle, FileText, TrendingUp, Search, Filter, Download,
  Stethoscope, Brain, Activity, Heart, ChevronRight, Eye,
  AlertTriangle, ArrowRight, UserCheck, Timer
} from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'

interface Referral {
  id: string
  patientId: string
  patientName: string
  dateOfBirth: string
  mrn: string // Medical Record Number
  referralType: 'routine' | 'urgent' | 'emergent' | 'consultation' | 'followUp'
  specialty: string
  referringProvider: string
  referringFacility: string
  reasonForReferral: string
  clinicalNotes?: string
  icd10Codes: string[]
  status: 'pending' | 'triaged' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  createdDate: string
  scheduledDate?: string
  completedDate?: string
  assignedProvider?: string
  assignedFacility?: string
  insurance: {
    plan: string
    memberId: string
    authorizationRequired: boolean
    authorizationStatus?: 'pending' | 'approved' | 'denied'
  }
  clinicalData?: {
    vitalSigns?: any
    medications?: string[]
    allergies?: string[]
    recentLabs?: any[]
    riskScore?: number
  }
  timeline?: {
    created: string
    triaged?: string
    scheduled?: string
    seen?: string
    reportSent?: string
  }
}

export default function ReferralManagementPage() {
  const router = useRouter()
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')

  // Mock data for demo
  useEffect(() => {
    const mockReferrals: Referral[] = [
      {
        id: 'REF-2024-001',
        patientId: 'P-12847',
        patientName: 'James Mitchell',
        dateOfBirth: '1965-03-15',
        mrn: 'MRN-45678',
        referralType: 'urgent',
        specialty: 'Cardiology',
        referringProvider: 'Dr. Sarah Chen',
        referringFacility: 'Primary Care Associates',
        reasonForReferral: 'Chest pain, abnormal EKG, elevated troponins',
        clinicalNotes: 'Patient presents with unstable angina, needs urgent cardiac evaluation',
        icd10Codes: ['I20.0', 'R07.9', 'R94.31'],
        status: 'triaged',
        priority: 'high',
        createdDate: '2024-03-18',
        scheduledDate: '2024-03-19',
        assignedProvider: 'Dr. Michael Roberts',
        assignedFacility: 'Cardiac Care Center',
        insurance: {
          plan: 'Medicare Advantage',
          memberId: 'MA123456789',
          authorizationRequired: true,
          authorizationStatus: 'approved'
        },
        clinicalData: {
          riskScore: 78
        }
      },
      {
        id: 'REF-2024-002',
        patientId: 'P-98234',
        patientName: 'Margaret Thompson',
        dateOfBirth: '1952-07-22',
        mrn: 'MRN-67890',
        referralType: 'routine',
        specialty: 'Orthopedics',
        referringProvider: 'Dr. Robert Wilson',
        referringFacility: 'Valley Medical Group',
        reasonForReferral: 'Chronic knee pain, osteoarthritis, considering joint replacement',
        icd10Codes: ['M17.11', 'M25.561'],
        status: 'scheduled',
        priority: 'medium',
        createdDate: '2024-03-15',
        scheduledDate: '2024-03-28',
        assignedProvider: 'Dr. Jennifer Lee',
        insurance: {
          plan: 'Commercial PPO',
          memberId: 'PPO987654321',
          authorizationRequired: true,
          authorizationStatus: 'pending'
        },
        clinicalData: {
          riskScore: 45
        }
      },
      {
        id: 'REF-2024-003',
        patientId: 'P-45678',
        patientName: 'Robert Davis',
        dateOfBirth: '1948-11-30',
        mrn: 'MRN-34567',
        referralType: 'consultation',
        specialty: 'Endocrinology',
        referringProvider: 'Dr. Emily Johnson',
        referringFacility: 'Community Health Center',
        reasonForReferral: 'Uncontrolled diabetes, HbA1c 11.2%, insulin adjustment needed',
        icd10Codes: ['E11.65', 'E11.9'],
        status: 'in-progress',
        priority: 'high',
        createdDate: '2024-03-10',
        scheduledDate: '2024-03-17',
        assignedProvider: 'Dr. David Kim',
        insurance: {
          plan: 'Medicare',
          memberId: 'MED456789123',
          authorizationRequired: false
        },
        clinicalData: {
          riskScore: 82
        }
      },
      {
        id: 'REF-2024-004',
        patientId: 'P-67890',
        patientName: 'Lisa Anderson',
        dateOfBirth: '1978-05-18',
        mrn: 'MRN-78901',
        referralType: 'routine',
        specialty: 'Behavioral Health',
        referringProvider: 'Dr. Mark Thompson',
        referringFacility: 'Family Medicine Practice',
        reasonForReferral: 'Depression, anxiety, requesting therapy services',
        icd10Codes: ['F32.1', 'F41.1'],
        status: 'pending',
        priority: 'medium',
        createdDate: '2024-03-18',
        insurance: {
          plan: 'Commercial HMO',
          memberId: 'HMO111222333',
          authorizationRequired: true,
          authorizationStatus: 'pending'
        },
        clinicalData: {
          riskScore: 62
        }
      },
      {
        id: 'REF-2024-005',
        patientId: 'P-34567',
        patientName: 'William Brown',
        dateOfBirth: '1970-09-05',
        mrn: 'MRN-23456',
        referralType: 'emergent',
        specialty: 'Neurology',
        referringProvider: 'Dr. Patricia White',
        referringFacility: 'Emergency Department',
        reasonForReferral: 'Acute stroke symptoms, needs immediate evaluation',
        icd10Codes: ['I63.9', 'G45.9'],
        status: 'completed',
        priority: 'critical',
        createdDate: '2024-03-17',
        scheduledDate: '2024-03-17',
        completedDate: '2024-03-17',
        assignedProvider: 'Dr. Steven Chang',
        insurance: {
          plan: 'Medicare',
          memberId: 'MED999888777',
          authorizationRequired: false
        },
        clinicalData: {
          riskScore: 95
        }
      }
    ]

    setTimeout(() => {
      setReferrals(mockReferrals)
      setLoading(false)
    }, 500)
  }, [])

  // Statistics
  const stats = {
    total: referrals.length,
    pending: referrals.filter(r => r.status === 'pending').length,
    urgent: referrals.filter(r => r.priority === 'high' || r.priority === 'critical').length,
    scheduled: referrals.filter(r => r.status === 'scheduled').length,
    avgResponseTime: '2.3 hours',
    completionRate: '94%'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'scheduled': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'triaged': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'high': return <AlertCircle className="w-4 h-4 text-orange-600" />
      case 'medium': return <Clock className="w-4 h-4 text-yellow-600" />
      default: return <Timer className="w-4 h-4 text-gray-400" />
    }
  }

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty) {
      case 'Cardiology': return <Heart className="w-5 h-5" />
      case 'Neurology': return <Brain className="w-5 h-5" />
      case 'Behavioral Health': return <Brain className="w-5 h-5" />
      case 'Endocrinology': return <Activity className="w-5 h-5" />
      default: return <Stethoscope className="w-5 h-5" />
    }
  }

  // Filter referrals
  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.mrn.includes(searchTerm) ||
                         referral.id.includes(searchTerm)
    const matchesFilter = filter === 'all' || referral.status === filter
    const matchesSpecialty = selectedSpecialty === 'all' || referral.specialty === selectedSpecialty
    return matchesSearch && matchesFilter && matchesSpecialty
  })

  return (
    <div className="space-y-6 w-full">
      <PageHeader
        title="Referral Management"
        description="Intelligent routing and tracking for patient referrals"
        action={
          <button
            onClick={() => router.push('/dashboard/referrals/new')}
            className="h-12 px-6 bg-arthur-blue text-white rounded-full hover:bg-arthur-blue-dark flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium">New Referral</span>
          </button>
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-arthur-blue/10 rounded-lg">
              <Users className="w-5 h-5 text-arthur-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Referrals</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.pending}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Pending Triage</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.urgent}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Urgent/Critical</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.scheduled}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Scheduled</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Timer className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.avgResponseTime}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Avg Response</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-arthur-care/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-arthur-care" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.completionRate}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by patient name, MRN, or referral ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="triaged">Triaged</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="all">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Endocrinology">Endocrinology</option>
            <option value="Neurology">Neurology</option>
            <option value="Behavioral Health">Behavioral Health</option>
          </select>

          <button className="px-4 py-2 bg-arthur-blue text-white rounded-lg hover:bg-arthur-blue-hover flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Referrals List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-arthur-blue"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Referral ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Specialty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Referring Provider</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReferrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-4">
                      {getPriorityIcon(referral.priority)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{referral.id}</div>
                      <div className="text-xs text-gray-500">{referral.referralType}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{referral.patientName}</div>
                      <div className="text-xs text-gray-500">MRN: {referral.mrn}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-arthur-blue">{getSpecialtyIcon(referral.specialty)}</div>
                        <span className="text-sm">{referral.specialty}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">{referral.referringProvider}</div>
                      <div className="text-xs text-gray-500">{referral.referringFacility}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {referral.createdDate}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/referrals/${referral.id}`}
                          className="text-arthur-blue hover:text-arthur-blue-hover"
                        >
                          <Eye size={18} />
                        </Link>
                        {referral.status === 'pending' && (
                          <button className="text-green-600 hover:text-green-700">
                            <UserCheck size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Shield, AlertCircle, CheckCircle2, DollarSign, Clock, FileText, User, MapPin, Phone, Mail, ChevronRight, TrendingUp, Calendar } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

export default function AuthorizationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const claimId = params.id as string

  // Mock authorization data - aligned with Arthur Health business model
  const authDetails = {
    id: claimId,
    patientName: 'Margaret Thompson',
    mrn: 'MRN-784512',
    requestType: 'Prior Authorization',
    condition: 'Type 2 Diabetes - Insulin Pump',
    status: 'Coverage Review',
    priority: 'High',
    policyCarrier: 'UnitedHealthcare Medicare Advantage',
    policyNumber: 'UHC-MA-784512',
    requestedTreatment: 'Continuous Glucose Monitor + Insulin Pump System (Dexcom G7 + Tandem t:slim X2)',
    coverageStatus: 'Partial Coverage',
    coverageGap: '$2,400 out-of-pocket annually',
    aiRecommendation: 'Alternative CGM (FreeStyle Libre 3) covered at 100% with same clinical efficacy. Estimated annual savings: $2,400',
    estimatedSavings: 2400,
    nextAction: 'Submit alternative device prior authorization',
    aiConfidence: 94,
    daysOpen: 3,
    submittedDate: '2024-09-27',
    targetDecisionDate: '2024-10-12',
    
    patient: {
      name: 'Margaret Thompson',
      mrn: 'MRN-784512',
      dob: '1952-04-15',
      age: 72,
      phone: '(555) 123-4567',
      email: 'mthompson@email.com',
      primaryCareProvider: 'Dr. Sarah Chen, MD',
      referringProvider: 'Dr. James Park, Endocrinology',
    },
    
    policy: {
      carrier: 'UnitedHealthcare Medicare Advantage',
      policyNumber: 'UHC-MA-784512',
      planType: 'Medicare Advantage HMO',
      deductible: '$0',
      outOfPocketMax: '$5,500',
      currentOOPSpent: '$1,240',
    },
    
    clinical: {
      diagnosis: 'Type 2 Diabetes Mellitus with complications',
      icd10Codes: ['E11.9', 'E11.65'],
      requestReason: 'Patient requires CGM and insulin pump for improved glycemic control. Current HbA1c 8.9%, target <7.0%.',
      medicalNecessity: 'High - Multiple daily injections insufficient',
    },
    
    aiAnalysis: {
      policyFindings: [
        'Dexcom G7 CGM requires prior auth with 50% coinsurance',
        'FreeStyle Libre 3 CGM covered at 100% (preferred device)',
        'Tandem pump covered at 80% with same integration capability',
      ],
      providerMatches: [
        {
          name: 'Boston Diabetes Center',
          distance: '2.1 mi',
          rating: 4.8,
          inNetwork: true,
        },
      ],
    },
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-arthur-blue transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Back to Requests</span>
      </button>

      <PageHeader
        title={`Authorization: ${authDetails.id}`}
        description={`${authDetails.requestType} for ${authDetails.patientName}`}
      />

      {/* Status Banner */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <AlertCircle className="text-orange-600" size={24} />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                {authDetails.coverageStatus}: {authDetails.coverageGap}
              </h3>
              <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Arthur AI Recommendation:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{authDetails.aiRecommendation}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 ml-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Potential Savings</p>
            <p className="text-3xl font-bold text-green-600">${authDetails.estimatedSavings.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">annually</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Details */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Shield className="text-arthur-blue" size={24} />
              Authorization Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Request Type</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.requestType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Priority</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                  {authDetails.priority}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Submitted</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.submittedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Target Decision</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.targetDecisionDate}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Requested Treatment</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.requestedTreatment}</p>
              </div>
            </div>
          </div>

          {/* Clinical Info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <FileText className="text-arthur-blue" size={24} />
              Clinical Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Diagnosis</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.clinical.diagnosis}</p>
                <div className="flex gap-2 mt-2">
                  {authDetails.clinical.icd10Codes.map((code) => (
                    <span key={code} className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full font-mono">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Request Reason</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{authDetails.clinical.requestReason}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Medical Necessity</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.clinical.medicalNecessity}</p>
              </div>
            </div>
          </div>

          {/* AI Policy Analysis */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <TrendingUp className="text-arthur-blue" size={24} />
              Arthur AI Policy Analysis
            </h2>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-600" />
                Policy Review Complete
              </h3>
              <ul className="space-y-2">
                {authDetails.aiAnalysis.policyFindings.map((finding, i) => (
                  <li key={i} className="text-sm text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-blue-300 dark:border-blue-700">
                    {finding}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">In-Network Providers</h3>
              {authDetails.aiAnalysis.providerMatches.map((provider, i) => (
                <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{provider.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{provider.distance} away • ⭐ {provider.rating}</p>
                    </div>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
                      In-Network
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Patient Info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <User className="text-arthur-blue" size={20} />
              Patient
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.patient.name}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">MRN</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.patient.mrn}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">DOB</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.patient.dob} (Age {authDetails.patient.age})</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Contact</p>
                <p className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
                  <Phone size={14} /> {authDetails.patient.phone}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Referring Provider</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.patient.referringProvider}</p>
              </div>
            </div>
          </div>

          {/* Policy Info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Shield className="text-arthur-blue" size={20} />
              Insurance
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Carrier</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.policy.carrier}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Policy #</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.policy.policyNumber}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Plan Type</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.policy.planType}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">OOP Max</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.policy.outOfPocketMax}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">OOP Spent</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{authDetails.policy.currentOOPSpent}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-arthur-blue to-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg p-3 text-left transition-all flex items-center justify-between group">
                <span className="text-sm font-medium">Contact Patient</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg p-3 text-left transition-all flex items-center justify-between group">
                <span className="text-sm font-medium">Submit Revised Request</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg p-3 text-left transition-all flex items-center justify-between group">
                <span className="text-sm font-medium">Download Documents</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

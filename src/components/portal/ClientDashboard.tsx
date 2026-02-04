
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, FileText, MessageSquare, Receipt, Clock, 
  ChevronRight, AlertCircle, CheckCircle, Loader2, 
  Upload, TrendingUp, Calendar
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardData {
  activeCases: number;
  totalCases: number;
  unreadMessages: number;
  pendingInvoices: number;
  pendingAmount: number;
}

interface Case {
  id: string;
  case_number: string;
  title: string;
  case_type: string;
  status: string;
  progress: number;
  priority: string;
  next_hearing_date: string | null;
  attorneys: {
    name: string;
    designation: string;
    image_url: string;
  };
}

interface ClientDashboardProps {
  onNavigate: (view: string, caseId?: string) => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ onNavigate }) => {
  const { client } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('client_token');
    if (!token) return;

    try {
      // Fetch dashboard summary
      const { data: dashboardData } = await supabase.functions.invoke('client-portal', {
        body: { action: 'getDashboard', token }
      });

      if (dashboardData?.success) {
        setDashboard(dashboardData.dashboard);
      }

      // Fetch cases
      const { data: casesData } = await supabase.functions.invoke('client-portal', {
        body: { action: 'getCases', token }
      });

      if (casesData?.success) {
        setCases(casesData.cases || []);
      }
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'on_hold': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={40} className="text-[#d4af37] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2">
          Welcome back, {client?.fullName?.split(' ')[0]}
        </h1>
        <p className="text-gray-400">
          Here's an overview of your legal matters
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="card-dark-hover p-6 cursor-pointer"
          onClick={() => onNavigate('cases')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#d4af37]/10 flex items-center justify-center">
              <Briefcase size={24} className="text-[#d4af37]" />
            </div>
            <TrendingUp size={20} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">{dashboard?.activeCases || 0}</p>
          <p className="text-gray-400 text-sm">Active Cases</p>
        </div>

        <div 
          className="card-dark-hover p-6 cursor-pointer"
          onClick={() => onNavigate('documents')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center">
              <FileText size={24} className="text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{dashboard?.totalCases || 0}</p>
          <p className="text-gray-400 text-sm">Total Cases</p>
        </div>

        <div 
          className="card-dark-hover p-6 cursor-pointer"
          onClick={() => onNavigate('messages')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 flex items-center justify-center">
              <MessageSquare size={24} className="text-purple-400" />
            </div>
            {(dashboard?.unreadMessages || 0) > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {dashboard?.unreadMessages}
              </span>
            )}
          </div>
          <p className="text-3xl font-bold text-white">{dashboard?.unreadMessages || 0}</p>
          <p className="text-gray-400 text-sm">Unread Messages</p>
        </div>

        <div 
          className="card-dark-hover p-6 cursor-pointer"
          onClick={() => onNavigate('invoices')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/10 flex items-center justify-center">
              <Receipt size={24} className="text-orange-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">
            {dashboard?.pendingAmount?.toLocaleString() || 0}
            <span className="text-lg text-gray-400 ml-1">BDT</span>
          </p>
          <p className="text-gray-400 text-sm">{dashboard?.pendingInvoices || 0} Pending Invoices</p>
        </div>
      </div>

      {/* Active Cases */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-playfair text-xl font-semibold text-white">Your Cases</h2>
          <button 
            onClick={() => onNavigate('cases')}
            className="text-[#d4af37] text-sm hover:text-[#f4d03f] flex items-center gap-1"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>

        {cases.length === 0 ? (
          <div className="card-dark p-8 text-center">
            <Briefcase size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No cases found</p>
            <p className="text-gray-500 text-sm mt-2">
              Contact us to discuss your legal needs
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cases.slice(0, 3).map((caseItem) => (
              <div 
                key={caseItem.id}
                className="card-dark-hover p-6 cursor-pointer"
                onClick={() => onNavigate('case-details', caseItem.id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#d4af37] text-sm font-mono">{caseItem.case_number}</span>
                      <span className={`text-xs px-2 py-1 border ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`text-xs ${getPriorityColor(caseItem.priority)}`}>
                        {caseItem.priority.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white mb-1">{caseItem.title}</h3>
                    <p className="text-gray-400 text-sm">{caseItem.case_type}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Progress */}
                    <div className="text-center">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#1a1a1a"
                            strokeWidth="4"
                            fill="none"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#d4af37"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - caseItem.progress / 100)}`}
                            className="transition-all duration-500"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm">
                          {caseItem.progress}%
                        </span>
                      </div>
                    </div>

                    {/* Attorney */}
                    {caseItem.attorneys && (
                      <div className="flex items-center gap-3">
                        <img 
                          src={caseItem.attorneys.image_url} 
                          alt={caseItem.attorneys.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#d4af37]/30"
                        />
                        <div className="hidden md:block">
                          <p className="text-white text-sm font-medium">{caseItem.attorneys.name}</p>
                          <p className="text-gray-500 text-xs">{caseItem.attorneys.designation}</p>
                        </div>
                      </div>
                    )}

                    {/* Next Hearing */}
                    {caseItem.next_hearing_date && (
                      <div className="hidden lg:flex items-center gap-2 text-sm">
                        <Calendar size={16} className="text-[#d4af37]" />
                        <span className="text-gray-400">
                          {new Date(caseItem.next_hearing_date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}

                    <ChevronRight size={20} className="text-gray-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-playfair text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => onNavigate('documents')}
            className="card-dark-hover p-4 flex flex-col items-center gap-2 text-center"
          >
            <Upload size={24} className="text-[#d4af37]" />
            <span className="text-white text-sm">Upload Document</span>
          </button>
          <button 
            onClick={() => onNavigate('messages')}
            className="card-dark-hover p-4 flex flex-col items-center gap-2 text-center"
          >
            <MessageSquare size={24} className="text-[#d4af37]" />
            <span className="text-white text-sm">Send Message</span>
          </button>
          <button 
            onClick={() => onNavigate('invoices')}
            className="card-dark-hover p-4 flex flex-col items-center gap-2 text-center"
          >
            <Receipt size={24} className="text-[#d4af37]" />
            <span className="text-white text-sm">View Invoices</span>
          </button>
          <button 
            onClick={() => onNavigate('cases')}
            className="card-dark-hover p-4 flex flex-col items-center gap-2 text-center"
          >
            <Briefcase size={24} className="text-[#d4af37]" />
            <span className="text-white text-sm">All Cases</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;

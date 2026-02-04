
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Briefcase, FileText, MessageSquare, Receipt, 
  LogOut, User, ChevronRight, Settings, Bell, Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import ClientDashboard from '@/components/portal/ClientDashboard';
import CaseDetailsView from '@/components/portal/CaseDetailsView';

interface ClientPortalPageProps {
  onLogout: () => void;
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

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  due_date: string;
  cases: {
    case_number: string;
    title: string;
  };
}

const ClientPortalPage: React.FC<ClientPortalPageProps> = ({ onLogout }) => {
  const { client, logout } = useAuth();
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'cases', icon: Briefcase, label: 'My Cases' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'invoices', icon: Receipt, label: 'Invoices' },
  ];

  const handleNavigate = (view: string, caseId?: string) => {
    setCurrentView(view);
    if (caseId) setSelectedCaseId(caseId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  const fetchCases = async () => {
    const token = localStorage.getItem('client_token');
    if (!token) return;

    setIsLoading(true);
    const { data } = await supabase.functions.invoke('client-portal', {
      body: { action: 'getCases', token }
    });

    if (data?.success) {
      setCases(data.cases || []);
    }
    setIsLoading(false);
  };

  const fetchInvoices = async () => {
    const token = localStorage.getItem('client_token');
    if (!token) return;

    setIsLoading(true);
    const { data } = await supabase.functions.invoke('client-portal', {
      body: { action: 'getInvoices', token }
    });

    if (data?.success) {
      setInvoices(data.invoices || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentView === 'cases') fetchCases();
    if (currentView === 'invoices') fetchInvoices();
  }, [currentView]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'paid': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'overdue': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const renderContent = () => {
    if (currentView === 'case-details' && selectedCaseId) {
      return (
        <CaseDetailsView 
          caseId={selectedCaseId} 
          onBack={() => setCurrentView('cases')} 
        />
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <ClientDashboard onNavigate={handleNavigate} />;

      case 'cases':
        return (
          <div className="space-y-6">
            <h1 className="font-playfair text-2xl font-bold text-white">My Cases</h1>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 size={32} className="text-[#d4af37] animate-spin" />
              </div>
            ) : cases.length === 0 ? (
              <div className="card-dark p-8 text-center">
                <Briefcase size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No cases found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cases.map((caseItem) => (
                  <div 
                    key={caseItem.id}
                    className="card-dark-hover p-6 cursor-pointer"
                    onClick={() => handleNavigate('case-details', caseItem.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[#d4af37] text-sm font-mono">{caseItem.case_number}</span>
                          <span className={`text-xs px-2 py-1 border ${getStatusColor(caseItem.status)}`}>
                            {caseItem.status.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="font-semibold text-white mb-1">{caseItem.title}</h3>
                        <p className="text-gray-400 text-sm">{caseItem.case_type}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                          <p className="text-white text-sm">{caseItem.progress}% Complete</p>
                          <div className="w-24 h-2 bg-[#1a1a1a] rounded-full mt-1">
                            <div 
                              className="h-full bg-[#d4af37] rounded-full"
                              style={{ width: `${caseItem.progress}%` }}
                            />
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'invoices':
        return (
          <div className="space-y-6">
            <h1 className="font-playfair text-2xl font-bold text-white">Invoices</h1>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 size={32} className="text-[#d4af37] animate-spin" />
              </div>
            ) : invoices.length === 0 ? (
              <div className="card-dark p-8 text-center">
                <Receipt size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No invoices found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="card-dark p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[#d4af37] font-mono">{invoice.invoice_number}</span>
                          <span className={`text-xs px-2 py-1 border ${getStatusColor(invoice.status)}`}>
                            {invoice.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-white">{invoice.description}</p>
                        <p className="text-gray-400 text-sm mt-1">
                          Case: {invoice.cases?.case_number} - {invoice.cases?.title}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">
                          {invoice.amount.toLocaleString()} <span className="text-sm text-gray-400">{invoice.currency}</span>
                        </p>
                        <p className="text-gray-500 text-sm">
                          Due: {new Date(invoice.due_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'documents':
      case 'messages':
        return (
          <div className="space-y-6">
            <h1 className="font-playfair text-2xl font-bold text-white">
              {currentView === 'documents' ? 'Documents' : 'Messages'}
            </h1>
            <div className="card-dark p-8 text-center">
              <p className="text-gray-400">Select a case to view {currentView}</p>
              <button 
                onClick={() => setCurrentView('cases')}
                className="btn-outline-gold mt-4"
              >
                View Cases
              </button>
            </div>
          </div>
        );

      default:
        return <ClientDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#111111] border-r border-[#d4af37]/20 transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#d4af37]/20">
            <h2 className="font-playfair text-xl font-bold text-white">Client Portal</h2>
            <p className="text-[#d4af37] text-xs mt-1">Kamal & Associates</p>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-[#d4af37]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center">
                <User size={20} className="text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{client?.fullName}</p>
                <p className="text-gray-500 text-xs truncate">{client?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id || (item.id === 'cases' && currentView === 'case-details')
                    ? 'bg-[#d4af37]/10 text-[#d4af37]'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-[#d4af37]/20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-[#0a0a0a] border-b border-[#d4af37]/20 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              <LayoutDashboard size={24} />
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-white relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ClientPortalPage;

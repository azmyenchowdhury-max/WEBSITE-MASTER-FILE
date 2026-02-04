
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Calendar, Clock, User, FileText, MessageSquare, 
  Upload, Send, Loader2, CheckCircle, Circle, AlertCircle,
  Download, Paperclip, X
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface CaseDetailsViewProps {
  caseId: string;
  onBack: () => void;
}

interface CaseData {
  id: string;
  case_number: string;
  title: string;
  description: string;
  case_type: string;
  status: string;
  progress: number;
  priority: string;
  start_date: string;
  next_hearing_date: string | null;
  court_name: string | null;
  notes: string | null;
  attorneys: {
    name: string;
    email: string;
    designation: string;
    image_url: string;
    specialization: string;
  };
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string | null;
  completed_at: string | null;
}

interface Document {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  description: string | null;
  created_at: string;
}

interface Message {
  id: string;
  sender_type: string;
  content: string;
  created_at: string;
}

const CaseDetailsView: React.FC<CaseDetailsViewProps> = ({ caseId, onBack }) => {
  const { client } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'messages'>('overview');
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCaseDetails();
  }, [caseId]);

  useEffect(() => {
    if (activeTab === 'documents') fetchDocuments();
    if (activeTab === 'messages') fetchMessages();
  }, [activeTab]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchCaseDetails = async () => {
    const token = localStorage.getItem('client_token');
    if (!token) return;

    try {
      const { data } = await supabase.functions.invoke('client-portal', {
        body: { action: 'getCaseDetails', token, caseId }
      });

      if (data?.success) {
        setCaseData(data.case);
        setMilestones(data.milestones || []);
      }
    } catch (error) {
      console.error('Error fetching case:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDocuments = async () => {
    const token = localStorage.getItem('client_token');
    if (!token) return;

    const { data } = await supabase.functions.invoke('client-portal', {
      body: { action: 'getDocuments', token, caseId }
    });

    if (data?.success) {
      setDocuments(data.documents || []);
    }
  };

  const fetchMessages = async () => {
    const token = localStorage.getItem('client_token');
    if (!token) return;

    const { data } = await supabase.functions.invoke('client-portal', {
      body: { action: 'getMessages', token, caseId }
    });

    if (data?.success) {
      setMessages(data.messages || []);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    const token = localStorage.getItem('client_token');
    if (!token) return;

    setIsSending(true);
    try {
      const { data } = await supabase.functions.invoke('client-portal', {
        body: { action: 'sendMessage', token, caseId, content: newMessage.trim() }
      });

      if (data?.success) {
        setMessages(prev => [...prev, data.message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem('client_token');
    if (!token) return;

    setIsUploading(true);
    try {
      // Upload to storage
      const fileName = `${caseId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('client-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Save document metadata
      const { data } = await supabase.functions.invoke('client-portal', {
        body: {
          action: 'uploadDocument',
          token,
          caseId,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          storagePath: fileName
        }
      });

      if (data?.success) {
        setDocuments(prev => [data.document, ...prev]);
      }
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-400" />;
      case 'in_progress': return <Clock size={16} className="text-yellow-400" />;
      default: return <Circle size={16} className="text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={40} className="text-[#d4af37] animate-spin" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="text-center py-20">
        <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
        <p className="text-gray-400">Case not found</p>
        <button onClick={onBack} className="btn-outline-gold mt-4">Go Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-400" />
        </button>
        <div>
          <p className="text-[#d4af37] text-sm font-mono">{caseData.case_number}</p>
          <h1 className="font-playfair text-2xl font-bold text-white">{caseData.title}</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#d4af37]/20">
        {['overview', 'documents', 'messages'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-[2px] ${
              activeTab === tab
                ? 'text-[#d4af37] border-[#d4af37]'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Case Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-dark p-6">
              <h3 className="font-semibold text-white mb-4">Case Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Type</p>
                  <p className="text-white">{caseData.case_type}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="text-white capitalize">{caseData.status.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-gray-500">Start Date</p>
                  <p className="text-white">{new Date(caseData.start_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Next Hearing</p>
                  <p className="text-white">
                    {caseData.next_hearing_date 
                      ? new Date(caseData.next_hearing_date).toLocaleDateString()
                      : 'Not scheduled'}
                  </p>
                </div>
                {caseData.court_name && (
                  <div className="col-span-2">
                    <p className="text-gray-500">Court</p>
                    <p className="text-white">{caseData.court_name}</p>
                  </div>
                )}
              </div>
              {caseData.description && (
                <div className="mt-4 pt-4 border-t border-[#d4af37]/20">
                  <p className="text-gray-500 text-sm mb-2">Description</p>
                  <p className="text-gray-300 text-sm">{caseData.description}</p>
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Progress</h3>
                <span className="text-[#d4af37] font-bold">{caseData.progress}%</span>
              </div>
              <div className="w-full h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-500"
                  style={{ width: `${caseData.progress}%` }}
                />
              </div>
            </div>

            {/* Milestones */}
            {milestones.length > 0 && (
              <div className="card-dark p-6">
                <h3 className="font-semibold text-white mb-4">Milestones</h3>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {getStatusIcon(milestone.status)}
                        {index < milestones.length - 1 && (
                          <div className="w-0.5 h-full bg-[#d4af37]/20 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-white font-medium">{milestone.title}</p>
                        {milestone.description && (
                          <p className="text-gray-400 text-sm mt-1">{milestone.description}</p>
                        )}
                        {milestone.due_date && (
                          <p className="text-gray-500 text-xs mt-2">
                            Due: {new Date(milestone.due_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Attorney Info */}
          <div>
            <div className="card-dark p-6">
              <h3 className="font-semibold text-white mb-4">Assigned Attorney</h3>
              <div className="text-center">
                <img 
                  src={caseData.attorneys.image_url}
                  alt={caseData.attorneys.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-[#d4af37]/30"
                />
                <p className="text-white font-semibold">{caseData.attorneys.name}</p>
                <p className="text-[#d4af37] text-sm">{caseData.attorneys.designation}</p>
                <p className="text-gray-400 text-sm mt-2">{caseData.attorneys.specialization}</p>
                <a 
                  href={`mailto:${caseData.attorneys.email}`}
                  className="text-gray-400 text-sm hover:text-[#d4af37] transition-colors mt-2 block"
                >
                  {caseData.attorneys.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          {/* Upload Button */}
          <div className="card-dark p-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="btn-gold w-full flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Upload Document
                </>
              )}
            </button>
            <p className="text-gray-500 text-xs text-center mt-2">
              Supported: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
            </p>
          </div>

          {/* Documents List */}
          {documents.length === 0 ? (
            <div className="card-dark p-8 text-center">
              <FileText size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="card-dark p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#d4af37]/10 flex items-center justify-center">
                      <FileText size={20} className="text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{doc.file_name}</p>
                      <p className="text-gray-500 text-xs">
                        {formatFileSize(doc.file_size)} • Uploaded by {doc.uploaded_by} • {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Download size={18} className="text-[#d4af37]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="card-dark flex flex-col h-[500px]">
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No messages yet</p>
                <p className="text-gray-500 text-sm">Start a conversation with your attorney</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender_type === 'client' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${
                    msg.sender_type === 'client'
                      ? 'bg-[#d4af37] text-black'
                      : 'bg-[#1a1a1a] text-white border border-[#d4af37]/20'
                  } px-4 py-3 rounded-lg`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender_type === 'client' ? 'text-black/60' : 'text-gray-500'
                    }`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-[#d4af37]/20 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-[#0a0a0a] border border-[#d4af37]/30 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim() || isSending}
                className="btn-gold px-4 disabled:opacity-50"
              >
                {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseDetailsView;

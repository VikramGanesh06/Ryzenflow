
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  Shield, 
  Layout, 
  LogOut, 
  HardDrive, 
  Users, 
  X, 
  Loader2,
  MoreVertical,
  Folder,
  FileText,
  Plus,
  FolderPlus,
  Upload,
  Grid,
  Database,
  ChevronRight
} from 'lucide-react';

// --- Types ---
type Section = 'overview' | 'files' | 'notes' | 'team';

interface FolderData { id: string; name: string; createdAt: any; }
interface FileData { id: string; name: string; size: string; folderId?: string; createdAt: any; }
interface NoteData { id: string; title: string; content?: string; createdAt: any; }
interface TeamData { id: string; name: string; role: string; createdAt: any; }

// --- Modal Component ---
const Modal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode 
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC<{ onProfileClick?: () => void }> = ({ onProfileClick }) => {
  const user = auth.currentUser;
  const uid = user?.uid || '';
  const userName = user?.email?.split('@')[0] || 'User';
  const userInitial = userName.substring(0, 2).toUpperCase();
  
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [loading, setLoading] = useState(true);

  // --- Data State ---
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [files, setFiles] = useState<FileData[]>([]);
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [team, setTeam] = useState<TeamData[]>([]);

  // --- Modal States ---
  const [modalType, setModalType] = useState<'folder' | 'file' | 'note' | 'member' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Form State ---
  const [formName, setFormName] = useState('');
  const [formExtra, setFormExtra] = useState('');

  useEffect(() => {
    if (!uid) return;

    const unsubFolders = onSnapshot(query(collection(db, 'users', uid, 'folders'), orderBy('createdAt', 'desc')), (s) => 
      setFolders(s.docs.map(d => ({ id: d.id, ...d.data() } as FolderData)))
    );
    const unsubFiles = onSnapshot(query(collection(db, 'users', uid, 'files'), orderBy('createdAt', 'desc')), (s) => 
      setFiles(s.docs.map(d => ({ id: d.id, ...d.data() } as FileData)))
    );
    const unsubNotes = onSnapshot(query(collection(db, 'users', uid, 'notes'), orderBy('createdAt', 'desc')), (s) => 
      setNotes(s.docs.map(d => ({ id: d.id, ...d.data() } as NoteData)))
    );
    const unsubTeam = onSnapshot(query(collection(db, 'users', uid, 'teamMembers'), orderBy('createdAt', 'desc')), (s) => 
      setTeam(s.docs.map(d => ({ id: d.id, ...d.data() } as TeamData)))
    );

    setLoading(false);
    return () => {
      unsubFolders(); unsubFiles(); unsubNotes(); unsubTeam();
    };
  }, [uid]);

  const handleLogout = () => signOut(auth);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    setIsSubmitting(true);

    try {
      const col = modalType === 'folder' ? 'folders' : 
                  modalType === 'file' ? 'files' : 
                  modalType === 'note' ? 'notes' : 'teamMembers';
      
      const data: any = { createdAt: serverTimestamp() };
      if (modalType === 'folder') data.name = formName;
      if (modalType === 'file') { data.name = formName; data.size = '1.2 MB'; }
      if (modalType === 'note') { data.title = formName; data.content = formExtra; }
      if (modalType === 'member') { data.name = formName; data.role = formExtra || 'Viewer'; }

      await addDoc(collection(db, 'users', uid, col), data);
      
      setModalType(null);
      setFormName('');
      setFormExtra('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fafa] grid-pattern flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 py-3 px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/assets/ryzenflow-logo.svg" 
              alt="RyzenFlow Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-[#1e293b]">RyzenFlow</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <a href="#" className="text-sm font-medium text-[#64748b] hover:text-[#1e293b] transition-colors">Product</a>
            <a href="#" className="text-sm font-medium text-[#64748b] hover:text-[#1e293b] transition-colors">Solutions</a>
            <a href="#" className="text-sm font-medium text-[#64748b] hover:text-[#1e293b] transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-[#64748b] hover:text-[#1e293b] transition-colors">Support</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onProfileClick}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#f0fdf4] text-[#10b981] rounded-xl text-xs font-bold shadow-lg hover:bg-[#dcfce7] transition-colors"
            >
              <Grid size={14} />
              Profile
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white rounded-xl text-xs font-bold shadow-lg">
              <Grid size={14} />
              Dashboard
            </button>
            <button onClick={handleLogout} className="p-2 text-[#94a3b8] hover:text-[#64748b]">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto w-full px-8 py-8 flex-1">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-[#ecfdf5] rounded-full flex items-center justify-center text-[#10b981] font-bold text-sm border border-[#d1fae5]">
              {userInitial}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1e293b] tracking-tight">Dashboard</h1>
              <p className="text-[#94a3b8] text-sm font-medium">Manage your secure assets.</p>
            </div>
          </div>
          
          {/* Pill Navigation */}
          <div className="flex bg-[#f1f5f9]/50 border border-[#e2e8f0] p-1.5 rounded-2xl shadow-sm">
            <button 
              onClick={() => setActiveSection('overview')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold transition-all ${activeSection === 'overview' ? 'bg-white text-[#10b981] shadow-sm' : 'text-[#94a3b8] hover:text-[#64748b]'}`}
            >
              <Grid size={14} /> Overview
            </button>
            <button 
              onClick={() => setActiveSection('files')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold transition-all ${activeSection === 'files' ? 'bg-white text-[#10b981] shadow-sm' : 'text-[#94a3b8] hover:text-[#64748b]'}`}
            >
              <Folder size={14} /> My Files
            </button>
            <button 
              onClick={() => setActiveSection('notes')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold transition-all ${activeSection === 'notes' ? 'bg-white text-[#10b981] shadow-sm' : 'text-[#94a3b8] hover:text-[#64748b]'}`}
            >
              <FileText size={14} /> Notes
            </button>
            <button 
              onClick={() => setActiveSection('team')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold transition-all ${activeSection === 'team' ? 'bg-white text-[#10b981] shadow-sm' : 'text-[#94a3b8] hover:text-[#64748b]'}`}
            >
              <Users size={14} /> Team
            </button>
          </div>
        </div>

        {/* --- Overview Section --- */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vault Status Card */}
              <div className="bg-white p-8 rounded-[24px] border border-[#f1f5f9] shadow-sm">
                <div className="w-10 h-10 bg-[#f0fdf4] rounded-xl flex items-center justify-center text-[#10b981] mb-6 border border-[#dcfce7]">
                  <Shield size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#1e293b] mb-2">Vault Status</h3>
                <p className="text-[#94a3b8] text-xs font-medium mb-6 leading-relaxed">Your environment is secure and encrypted.</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0fdf4] text-[#10b981] text-[11px] font-bold border border-[#dcfce7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span> Active Protection
                </div>
              </div>

              {/* Storage Card */}
              <div className="bg-white p-8 rounded-[24px] border border-[#f1f5f9] shadow-sm flex flex-col">
                <div className="w-10 h-10 bg-[#f5f3ff] rounded-xl flex items-center justify-center text-[#8b5cf6] mb-6 border border-[#ede9fe]">
                  <Database size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#1e293b] mb-2">Storage</h3>
                <p className="text-[#94a3b8] text-xs font-medium mb-6 leading-relaxed flex-1">{files.length} files stored in your cloud vault.</p>
                <div className="pt-4 border-t border-[#f8fafc]">
                  <span className="text-[11px] font-bold text-[#cbd5e1] uppercase tracking-wider">Standard Plan</span>
                </div>
              </div>

              {/* Team Access Card */}
              <div className="bg-white p-8 rounded-[24px] border border-[#f1f5f9] shadow-sm">
                <div className="w-10 h-10 bg-[#eff6ff] rounded-xl flex items-center justify-center text-[#3b82f6] mb-6 border border-[#dbeafe]">
                  <Users size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#1e293b] mb-2">Team Access</h3>
                <p className="text-[#94a3b8] text-xs font-medium mb-6 leading-relaxed">{team.length} active members in this workspace.</p>
                <button onClick={() => setActiveSection('team')} className="text-[11px] font-bold text-[#3b82f6] hover:text-[#2563eb] transition-colors">Manage Team</button>
              </div>
            </div>

            {/* Dark Welcome Banner */}
            <div className="bg-[#111827] rounded-[24px] p-10 flex flex-col items-start justify-center relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-1/4 h-full bg-[#1f2937] opacity-50 blur-[100px] pointer-events-none"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">Welcome to RyzenFlow 2.0</h2>
              <p className="text-[#94a3b8] text-sm max-w-xl leading-relaxed mb-8 font-medium">
                You now have full access to the new file management system, secure notes, and team collaboration tools.
              </p>
              <button 
                onClick={() => setActiveSection('files')}
                className="px-6 py-3 bg-[#10b981] text-white rounded-xl font-bold text-sm hover:bg-[#059669] transition-all flex items-center gap-2 shadow-lg"
              >
                Start Uploading <Upload size={16} />
              </button>
            </div>
          </div>
        )}

        {/* --- Files Section --- */}
        {activeSection === 'files' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-bold text-[#1e293b]">My Files</h2>
              <div className="flex gap-2">
                <button onClick={() => setModalType('folder')} className="px-4 py-2 bg-white border border-[#e2e8f0] text-[#475569] rounded-xl text-xs font-bold hover:bg-[#f8fafc] transition-all flex items-center gap-2">
                  <FolderPlus size={14} /> New Folder
                </button>
                <button onClick={() => setModalType('file')} className="px-4 py-2 bg-[#10b981] text-white rounded-xl text-xs font-bold hover:bg-[#059669] transition-all flex items-center gap-2">
                  <Upload size={14} /> Add File
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[24px] border border-[#f1f5f9] shadow-sm overflow-hidden min-h-[500px]">
              <table className="w-full text-left">
                <thead className="bg-[#f8fafc]/50 border-b border-[#f1f5f9]">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">NAME</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">TYPE</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">SIZE</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {files.length === 0 && folders.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-40">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="w-12 h-12 bg-[#f8fafc] rounded-xl flex items-center justify-center text-[#cbd5e1] mb-4 border border-[#f1f5f9]">
                            <Folder size={24} />
                          </div>
                          <p className="text-sm font-bold text-[#1e293b]">No files yet</p>
                          <p className="text-[#94a3b8] text-xs mt-1">Create a folder or upload a file to get started.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {folders.map(f => (
                        <tr key={f.id} className="border-b border-[#f8fafc] last:border-0 hover:bg-[#f8fafc]/30 transition-colors">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <Folder size={18} className="text-[#fbbf24]" fill="currentColor" fillOpacity={0.1} />
                              <span className="text-sm font-bold text-[#1e293b]">{f.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-[11px] font-bold text-[#94a3b8] uppercase">Folder</td>
                          <td className="px-8 py-5 text-[11px] font-bold text-[#94a3b8]">--</td>
                          <td className="px-8 py-5 text-right">
                            <button className="text-[#cbd5e1] hover:text-[#64748b]"><MoreVertical size={16} /></button>
                          </td>
                        </tr>
                      ))}
                      {files.map(f => (
                        <tr key={f.id} className="border-b border-[#f8fafc] last:border-0 hover:bg-[#f8fafc]/30 transition-colors">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <FileText size={18} className="text-[#10b981]" />
                              <span className="text-sm font-bold text-[#1e293b]">{f.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-[11px] font-bold text-[#94a3b8] uppercase">File</td>
                          <td className="px-8 py-5 text-[11px] font-bold text-[#94a3b8]">{f.size}</td>
                          <td className="px-8 py-5 text-right">
                            <button className="text-[#cbd5e1] hover:text-[#64748b]"><MoreVertical size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- Notes Section --- */}
        {activeSection === 'notes' && (
           <div className="space-y-6">
              <div className="flex justify-between items-center mb-2">
                 <h2 className="text-sm font-bold text-[#1e293b]">My Notes</h2>
                 <button onClick={() => setModalType('note')} className="px-4 py-2 bg-[#10b981] text-white rounded-xl text-xs font-bold hover:bg-[#059669] transition-all flex items-center gap-2">
                    <Plus size={14} /> New Note
                 </button>
              </div>
              {notes.length === 0 ? (
                <div className="bg-white rounded-[24px] border border-[#f1f5f9] p-32 flex flex-col items-center justify-center text-center">
                   <div className="w-12 h-12 bg-[#f8fafc] rounded-xl flex items-center justify-center text-[#cbd5e1] mb-4 border border-[#f1f5f9]">
                      <FileText size={24} />
                   </div>
                   <p className="text-sm font-bold text-[#1e293b]">No notes yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notes.map(n => (
                    <div key={n.id} className="bg-white p-8 rounded-2xl border border-[#f1f5f9] shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-[#1e293b] mb-3">{n.title}</h3>
                      <p className="text-[#94a3b8] text-xs line-clamp-3 leading-relaxed">{n.content || 'No content.'}</p>
                    </div>
                  ))}
                </div>
              )}
           </div>
        )}

        {/* --- Team Section --- */}
        {activeSection === 'team' && (
           <div className="space-y-6">
              <div className="flex justify-between items-center mb-2">
                 <h2 className="text-sm font-bold text-[#1e293b]">Team Members</h2>
                 <button onClick={() => setModalType('member')} className="px-4 py-2 bg-[#10b981] text-white rounded-xl text-xs font-bold hover:bg-[#059669] transition-all flex items-center gap-2">
                    <Plus size={14} /> Add Member
                 </button>
              </div>
              <div className="bg-white rounded-[24px] border border-[#f1f5f9] shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#f8fafc]/50 border-b border-[#f1f5f9]">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">NAME</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest text-right">ROLE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="py-24 text-center">
                          <p className="text-xs font-bold text-[#94a3b8]">0 active members in this workspace.</p>
                        </td>
                      </tr>
                    ) : (
                      team.map(m => (
                        <tr key={m.id} className="border-b border-[#f8fafc] last:border-0 hover:bg-[#f8fafc]/30">
                          <td className="px-8 py-5 font-bold text-sm text-[#1e293b]">{m.name}</td>
                          <td className="px-8 py-5 text-right text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">{m.role}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
           </div>
        )}
      </main>

      {/* Footer Branding */}
      <div className="py-6 bg-white/50 text-center border-t border-[#f1f5f9]">
         <p className="text-[10px] text-[#cbd5e1] font-bold uppercase tracking-[0.2em]">Enterprise Secure Infrastructure v2.0</p>
      </div>

      {/* Modals */}
      <Modal 
        isOpen={!!modalType} 
        onClose={() => { setModalType(null); setFormName(''); setFormExtra(''); }} 
        title={modalType === 'folder' ? 'Create New Folder' : 
               modalType === 'file' ? 'Add Secure File' : 
               modalType === 'note' ? 'New Secure Note' : 'Add Team Member'}
      >
        <form onSubmit={handleAction} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold text-[#94a3b8] uppercase tracking-widest mb-3">
              {modalType === 'note' ? 'Title' : 'Name'}
            </label>
            <input 
              autoFocus
              required
              className="w-full px-5 py-3.5 bg-[#f8fafc] border border-[#f1f5f9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10b981]/10 focus:border-[#10b981] transition-all text-sm font-medium"
              placeholder="..."
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          {(modalType === 'note' || modalType === 'member') && (
            <div>
              <label className="block text-[11px] font-bold text-[#94a3b8] uppercase tracking-widest mb-3">
                {modalType === 'note' ? 'Content' : 'Role'}
              </label>
              {modalType === 'note' ? (
                <textarea 
                  className="w-full px-5 py-3.5 bg-[#f8fafc] border border-[#f1f5f9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10b981]/10 focus:border-[#10b981] transition-all text-sm min-h-[120px] resize-none font-medium"
                  value={formExtra}
                  onChange={(e) => setFormExtra(e.target.value)}
                />
              ) : (
                <select 
                  className="w-full px-5 py-3.5 bg-[#f8fafc] border border-[#f1f5f9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10b981]/10 focus:border-[#10b981] transition-all text-sm font-bold appearance-none"
                  value={formExtra}
                  onChange={(e) => setFormExtra(e.target.value)}
                >
                  <option value="Viewer">Viewer</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
              )}
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setModalType(null)} 
              className="flex-1 py-4 bg-[#f8fafc] text-[#94a3b8] rounded-xl font-bold text-xs hover:bg-[#f1f5f9] transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 py-4 bg-[#10b981] text-white rounded-xl font-bold text-xs hover:bg-[#059669] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Confirm'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

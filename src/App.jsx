import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithCustomToken, 
  signInAnonymously, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  deleteDoc 
} from 'firebase/firestore';
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  Search,
  Copy,
  MessageCircle,
  FileText,
  Edit,
  Trash2,
  Filter,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  ShieldAlert,
  ExternalLink,
  Share2,
  History,
  UserCheck,
  Sparkles,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Check,
  RefreshCw,
  Eye,
  Award
} from 'lucide-react';

let db = null;
let auth = null;
let appId = 'erp-edu-default';

if (typeof __firebase_config !== 'undefined' && __firebase_config) {
  try {
    const firebaseConfig = JSON.parse(__firebase_config);
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    appId = typeof __app_id !== 'undefined' ? __app_id : 'erp-edu-default';
  } catch (e) {
    console.error("Erro ao inicializar Firebase:", e);
  }
}

const INITIAL_STUDENTS = [
  {
    id: 'alu-01',
    name: 'Mariana Silveira',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    contactEmail: 'mariana.contato@gmail.com',
    googleEmail: 'mariana.silveira.yt@gmail.com',
    phone: '11987654321',
    cpf: '123.456.789-00',
    address: 'Av. Paulista, 1000 - São Paulo/SP',
    birthDate: '1995-04-12',
    enrolledSince: '2024-01-15',
    createdAt: new Date().toISOString()
  },
  {
    id: 'alu-02',
    name: 'Lucas Gabriel Mendes',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    contactEmail: 'lucas.mendes@outlook.com',
    googleEmail: 'lucas.mendes.google@gmail.com',
    phone: '21998877665',
    cpf: '234.567.890-11',
    address: 'Rua Barata Ribeiro, 250 - Rio de Janeiro/RJ',
    birthDate: '1998-09-20',
    enrolledSince: '2025-02-10',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_TEACHERS = [
  {
    id: 'prof-01',
    name: 'Prof. Dr. Roberto Albuquerque',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    email: 'roberto.albuquerque@edu.com.br',
    phone: '11991234567',
    cpf: '987.654.321-99',
    address: 'Alameda Santos, 850 - SP',
    birthDate: '1980-03-15',
    pixKey: 'roberto.albuquerque@edu.com.br (E-mail)',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prof-02',
    name: 'Profª. Dra. Beatriz Valença',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    email: 'beatriz.valenca@edu.com.br',
    phone: '11982345678',
    cpf: '876.543.210-88',
    address: 'Rua Oscar Freire, 120 - SP',
    birthDate: '1984-07-22',
    pixKey: '11982345678 (Telefone)',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_COURSES = [
  {
    id: 'cur-01',
    name: 'Formação Completa em Gestão Estratégica',
    bannerUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
    description: 'Curso prático com metodologias ativas, liderança executiva e finanças corporativas.',
    workloadHours: 120,
    teachers: [
      { teacherId: 'prof-01', repassPerStudent: 350 },
      { teacherId: 'prof-02', repassPerStudent: 250 }
    ],
    createdAt: new Date().toISOString()
  }
];

const INITIAL_COHORTS = [
  {
    id: 'turma-01',
    courseId: 'cur-01',
    name: 'Turma 2026.1 - Sábados Manhã',
    startDate: '2026-03-07',
    endDate: '2026-07-25',
    status: 'Em Andamento',
    pricePix: 1800,
    priceStudent: 1650,
    priceCard: 1950,
    teachers: [
      { teacherId: 'prof-01', repassPerStudent: 350 },
      { teacherId: 'prof-02', repassPerStudent: 250 }
    ],
    createdAt: new Date().toISOString()
  }
];

const INITIAL_ENROLLMENTS = [
  {
    id: 'mat-01',
    studentId: 'alu-01',
    cohortId: 'turma-01',
    priceMode: 'Preço Aluno (R$ 1.650,00)',
    totalAmount: 1650,
    enrollmentDate: '2026-02-15',
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_INSTALLMENTS = [
  {
    id: 'parc-01',
    enrollmentId: 'mat-01',
    studentId: 'alu-01',
    cohortId: 'turma-01',
    installmentNumber: 1,
    totalInstallments: 3,
    amount: 550,
    dueDate: '2026-02-20',
    status: 'paid',
    paidAt: '2026-02-19',
    paymentMethod: 'PIX',
    notes: 'Pago via PIX com comprovante anexado',
    receiptUrl: '',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cloudSynced, setCloudSynced] = useState(false);

  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [cohorts, setCohorts] = useState(INITIAL_COHORTS);
  const [enrollments, setEnrollments] = useState(INITIAL_ENROLLMENTS);
  const [installments, setInstallments] = useState(INITIAL_INSTALLMENTS);
  const [teacherPayouts, setTeacherPayouts] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  const [modalStudentOpen, setModalStudentOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState(null);

  const [modalTeacherOpen, setModalTeacherOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [selectedTeacherForProfile, setSelectedTeacherForProfile] = useState(null);

  const [modalCourseOpen, setModalCourseOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [modalCohortOpen, setModalCohortOpen] = useState(false);
  const [editingCohort, setEditingCohort] = useState(null);

  const [modalEnrollmentOpen, setModalEnrollmentOpen] = useState(false);
  const [modalPaymentOpen, setModalPaymentOpen] = useState(false);
  const [selectedInstallmentForPayment, setSelectedInstallmentForPayment] = useState(null);

  const [modalCancelEnrollmentOpen, setModalCancelEnrollmentOpen] = useState(false);
  const [selectedEnrollmentToCancel, setSelectedEnrollmentToCancel] = useState(null);

  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [financeFilter, setFinanceFilter] = useState('all');

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyToClipboard = (text, label = 'Informação') => {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showToast(`${label} copiada com sucesso!`);
    } catch (err) {
      showToast('Erro ao copiar', 'error');
    }
  };

  const addAuditLog = (action, target, details) => {
    const newLog = {
      id: `log-${Date.now()}`,
      user: 'Administração (ADM)',
      action,
      target,
      details,
      timestamp: new Date().toLocaleString('pt-BR')
    };
    setAuditLogs(prev => [newLog, ...prev]);

    if (db && user) {
      const logRef = doc(collection(db, 'artifacts', appId, 'public', 'data', 'auditLogs'), newLog.id);
      setDoc(logRef, newLog).catch(console.error);
    }
  };

  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth error:", err);
      }
    };
    initAuth();
    const unsubAuth = onAuthStateChanged(auth, setUser);
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!db || !user) return;
    setCloudSynced(true);

    const makeSub = (colName, setter, initialData) => {
      const q = collection(db, 'artifacts', appId, 'public', 'data', colName);
      return onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
          setter(list);
        } else if (initialData && initialData.length > 0) {
          initialData.forEach(item => {
            setDoc(doc(db, 'artifacts', appId, 'public', 'data', colName, item.id), item);
          });
        }
      }, (err) => console.warn(`Snapshot error in ${colName}:`, err));
    };

    const unsubStudents = makeSub('students', setStudents, INITIAL_STUDENTS);
    const unsubTeachers = makeSub('teachers', setTeachers, INITIAL_TEACHERS);
    const unsubCourses = makeSub('courses', setCourses, INITIAL_COURSES);
    const unsubCohorts = makeSub('cohorts', setCohorts, INITIAL_COHORTS);
    const unsubEnrollments = makeSub('enrollments', setEnrollments, INITIAL_ENROLLMENTS);
    const unsubInstallments = makeSub('installments', setInstallments, INITIAL_INSTALLMENTS);
    const unsubPayouts = makeSub('teacherPayouts', setTeacherPayouts, []);
    const unsubLogs = makeSub('auditLogs', setAuditLogs, []);

    return () => {
      unsubStudents();
      unsubTeachers();
      unsubCourses();
      unsubCohorts();
      unsubEnrollments();
      unsubInstallments();
      unsubPayouts();
      unsubLogs();
    };
  }, [user]);

  const persistItem = async (colName, item) => {
    if (db && user) {
      try {
        await setDoc(doc(collection(db, 'artifacts', appId, 'public', 'data', colName), item.id), item);
      } catch (err) {
        console.error(`Erro ao salvar ${colName}:`, err);
      }
    }
  };

  const isStudentAdimplenteInCohort = (studentId, cohortId) => {
    const studentInstallments = installments.filter(i => i.studentId === studentId && i.cohortId === cohortId);
    if (studentInstallments.length === 0) return true;
    const hasOverdue = studentInstallments.some(i => i.status === 'overdue');
    return !hasOverdue;
  };

  const getCohortAdimplentesCount = (cohortId) => {
    const activeCohortEnrollments = enrollments.filter(e => e.cohortId === cohortId && e.status === 'active');
    return activeCohortEnrollments.filter(e => isStudentAdimplenteInCohort(e.studentId, cohortId)).length;
  };

  const getCohortActiveEnrollmentsCount = (cohortId) => {
    return enrollments.filter(e => e.cohortId === cohortId && e.status === 'active').length;
  };

  const financialMetrics = useMemo(() => {
    const confirmedIncome = installments
      .filter(i => i.status === 'paid')
      .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

    const pendingIncome = installments
      .filter(i => i.status === 'pending')
      .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

    const overdueIncome = installments
      .filter(i => i.status === 'overdue')
      .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

    let totalRepasseLiberado = 0;
    cohorts.forEach(cohort => {
      const adimplentesCount = getCohortAdimplentesCount(cohort.id);
      (cohort.teachers || []).forEach(t => {
        totalRepasseLiberado += adimplentesCount * Number(t.repassPerStudent || 0);
      });
    });

    const totalRepasseExecutado = teacherPayouts.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
    const repassePendente = Math.max(0, totalRepasseLiberado - totalRepasseExecutado);

    return {
      confirmedIncome,
      pendingIncome,
      overdueIncome,
      totalIncomeExpected: confirmedIncome + pendingIncome + overdueIncome,
      totalRepasseLiberado,
      totalRepasseExecutado,
      repassePendente
    };
  }, [installments, cohorts, enrollments, teacherPayouts]);

  const formatBRL = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleCancelEnrollment = (enrollment) => {
    const updatedEnrollment = { ...enrollment, status: 'canceled' };
    setEnrollments(prev => prev.map(e => e.id === enrollment.id ? updatedEnrollment : e));
    persistItem('enrollments', updatedEnrollment);

    const updatedInstallments = installments.map(inst => {
      if (inst.enrollmentId === enrollment.id && (inst.status === 'pending' || inst.status === 'overdue')) {
        const canceledInst = { ...inst, status: 'canceled', notes: `${inst.notes || ''} [Cancelado por encerramento de matrícula]` };
        persistItem('installments', canceledInst);
        return canceledInst;
      }
      return inst;
    });
    setInstallments(updatedInstallments);

    const studentObj = students.find(s => s.id === enrollment.studentId);
    const cohortObj = cohorts.find(c => c.id === enrollment.cohortId);

    addAuditLog(
      'Cancelamento de Matrícula',
      `${studentObj?.name || 'Aluno'} - ${cohortObj?.name || 'Turma'}`,
      'Matrícula cancelada com cancelamento automático de parcelas futuras e recálculo de repasse.'
    );

    setModalCancelEnrollmentOpen(false);
    setSelectedEnrollmentToCancel(null);
    showToast('Matrícula cancelada com sucesso. Parcelas futuras canceladas.');
  };

  const openWhatsAppCobrança = (student, installment, type = 'preventiva') => {
    const rawPhone = (student.phone || '').replace(/\D/g, '');
    if (!rawPhone) {
      showToast('Telefone do aluno não informado', 'error');
      return;
    }
    const cleanPhone = rawPhone.startsWith('55') ? rawPhone : `55${rawPhone}`;
    const cohortObj = cohorts.find(c => c.id === installment.cohortId);

    let msg = '';
    if (type === 'vencida') {
      msg = `Olá ${student.name}, tudo bem? Aqui é da secretaria da escola. Constatamos uma pendência da parcela ${installment.installmentNumber}/${installment.totalInstallments} referente à turma "${cohortObj?.name || 'do curso'}", no valor de ${formatBRL(installment.amount)}, com vencimento em ${installment.dueDate}. Poderia nos enviar o comprovante atualizado ou necessita de uma nova chave PIX para acerto?`;
    } else {
      msg = `Olá ${student.name}! Passando para lembrar que a sua parcela ${installment.installmentNumber}/${installment.totalInstallments} da turma "${cohortObj?.name || 'do curso'}" no valor de ${formatBRL(installment.amount)} vencerá em ${installment.dueDate}. Caso precise de auxílio, estamos à disposição!`;
    }

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-fade-in text-sm">
          {toastMessage.type === 'error' ? (
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span>{toastMessage.msg}</span>
        </div>
      )}

      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-lg leading-tight">ERP Educacional</h1>
                <p className="text-xs text-slate-500 hidden sm:block">Painel de Gestão e Administração</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {cloudSynced ? 'Nuvem Sincronizada' : 'Modo Operacional'}
            </span>
            <button
              onClick={() => setModalEnrollmentOpen(true)}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Matrícula Rápida</span>
              <span className="sm:hidden">Matricular</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-0 sm:px-4 lg:px-8 py-0 sm:py-6">
        <aside className="hidden md:flex flex-col w-64 pr-6 shrink-0">
          <nav className="space-y-1.5 sticky top-24">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'students', label: 'Alunos & Visão 360°', icon: Users, count: students.length },
              { id: 'teachers', label: 'Professores & PIX', icon: UserCheck, count: teachers.length },
              { id: 'courses', label: 'Cursos & Turmas', icon: BookOpen, count: cohorts.length },
              { id: 'finance', label: 'Financeiro & Repasses', icon: DollarSign, badge: installments.filter(i => i.status === 'overdue').length },
              { id: 'audit', label: 'Auditoria ADM', icon: History }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-700'}`}>
                      {tab.count}
                    </span>
                  )}
                  {tab.badge > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-white w-4/5 max-w-xs h-full p-4 space-y-2 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-bold text-slate-900">Navegação Principal</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1 pt-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                  { id: 'students', label: 'Alunos', icon: Users },
                  { id: 'teachers', label: 'Professores', icon: UserCheck },
                  { id: 'courses', label: 'Cursos & Turmas', icon: BookOpen },
                  { id: 'finance', label: 'Financeiro', icon: DollarSign },
                  { id: 'audit', label: 'Auditoria ADM', icon: History }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium ${
                        isActive ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 w-full pb-20 sm:pb-8 px-4 sm:px-0">
          
          {}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {financialMetrics.overdueIncome > 0 && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-rose-900 text-sm">Alerta de Inadimplência Ativa</h4>
                      <p className="text-xs text-rose-700">
                        Existem {installments.filter(i => i.status === 'overdue').length} parcelas vencidas totalizando{' '}
                        <strong className="font-bold">{formatBRL(financialMetrics.overdueIncome)}</strong>.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('finance');
                      setFinanceFilter('overdue');
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Cobrar Alunos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-medium">Entradas Confirmadas</span>
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900">
                    {formatBRL(financialMetrics.confirmedIncome)}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                    <Check className="w-3 h-3" /> Recebido em caixa
                  </span>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-medium">A Vencer / Previsto</span>
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900">
                    {formatBRL(financialMetrics.pendingIncome)}
                  </div>
                  <span className="text-[11px] text-amber-600 font-medium mt-1 block">
                    Parcelas futuras
                  </span>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-medium">Repasses Devidos</span>
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900">
                    {formatBRL(financialMetrics.totalRepasseLiberado)}
                  </div>
                  <span className="text-[11px] text-indigo-600 font-medium mt-1 block">
                    Base: alunos adimplentes
                  </span>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-medium">Repasses Pendentes</span>
                    <div className="p-2 bg-violet-50 text-violet-600 rounded-xl">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900">
                    {formatBRL(financialMetrics.repassePendente)}
                  </div>
                  <span className="text-[11px] text-violet-600 font-medium mt-1 block">
                    Aguardando transferência
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Turmas e Reconhecimento de Repasses</h3>
                      <p className="text-xs text-slate-500">Cálculo de repasse aos professores calculado por alunos adimplentes</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('courses')}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      Ver todas
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cohorts.map(cohort => {
                      const course = courses.find(c => c.id === cohort.courseId);
                      const totalStudents = getCohortActiveEnrollmentsCount(cohort.id);
                      const adimplentes = getCohortAdimplentesCount(cohort.id);
                      const inadimplentes = totalStudents - adimplentes;

                      return (
                        <div key={cohort.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-all">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-slate-900 text-sm">{cohort.name}</h4>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                  cohort.status === 'Em Andamento' ? 'bg-indigo-100 text-indigo-700' :
                                  cohort.status === 'Inscrições Abertas' ? 'bg-emerald-100 text-emerald-700' :
                                  'bg-slate-200 text-slate-700'
                                }`}>
                                  {cohort.status}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">{course?.name}</p>
                            </div>

                            <div className="flex items-center gap-4 text-xs">
                              <div className="text-center">
                                <span className="text-slate-400 block text-[10px] uppercase font-bold">Matriculados</span>
                                <span className="font-bold text-slate-800">{totalStudents}</span>
                              </div>
                              <div className="text-center">
                                <span className="text-emerald-500 block text-[10px] uppercase font-bold">Adimplentes</span>
                                <span className="font-bold text-emerald-600">{adimplentes}</span>
                              </div>
                              {inadimplentes > 0 && (
                                <div className="text-center">
                                  <span className="text-rose-500 block text-[10px] uppercase font-bold">Inadimplentes</span>
                                  <span className="font-bold text-rose-600">{inadimplentes}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2 text-slate-600">
                              <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                              <span>Professores vinculados: {(cohort.teachers || []).length}</span>
                            </div>
                            <div className="font-medium text-slate-700">
                              Repasse gerado: <strong className="text-indigo-600">
                                {formatBRL(
                                  (cohort.teachers || []).reduce((acc, t) => acc + (adimplentes * Number(t.repassPerStudent || 0)), 0)
                                )}
                              </strong>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-900 text-sm mb-3">Atalhos Operacionais</h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setModalEnrollmentOpen(true)}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 text-left transition-all group"
                      >
                        <GraduationCap className="w-5 h-5 text-indigo-600 mb-1.5 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-slate-900 block">Nova Matrícula</span>
                        <span className="text-[10px] text-slate-500">Com parcelamento</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingStudent(null);
                          setModalStudentOpen(true);
                        }}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 text-left transition-all group"
                      >
                        <Users className="w-5 h-5 text-emerald-600 mb-1.5 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-slate-900 block">Cadastrar Aluno</span>
                        <span className="text-[10px] text-slate-500">Dados + E-mail YT</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingTeacher(null);
                          setModalTeacherOpen(true);
                        }}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-200 text-left transition-all group"
                      >
                        <UserCheck className="w-5 h-5 text-amber-600 mb-1.5 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-slate-900 block">Novo Professor</span>
                        <span className="text-[10px] text-slate-500">Chave PIX e dados</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingCohort(null);
                          setModalCohortOpen(true);
                        }}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-violet-50 hover:border-violet-200 text-left transition-all group"
                      >
                        <BookOpen className="w-5 h-5 text-violet-600 mb-1.5 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-slate-900 block">Criar Turma</span>
                        <span className="text-[10px] text-slate-500">Tabela de preços</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-900 text-sm">Últimas Ações ADM</h3>
                      <button onClick={() => setActiveTab('audit')} className="text-[11px] text-indigo-600 font-semibold">
                        Histórico
                      </button>
                    </div>
                    <div className="space-y-2.5">
                      {auditLogs.slice(0, 3).map(log => (
                        <div key={log.id} className="text-xs border-l-2 border-indigo-500 pl-2.5 py-0.5">
                          <span className="font-semibold text-slate-800 block">{log.action}: {log.target}</span>
                          <span className="text-slate-500 text-[11px]">{log.details}</span>
                          <span className="text-slate-400 text-[10px] block mt-0.5">{log.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {}
          {activeTab === 'students' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Gestão de Alunos & Ficha 360°</h2>
                  <p className="text-xs text-slate-500">E-mail Google/YouTube para liberação de acessos e data retroativa</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Buscar por nome, CPF, e-mail..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditingStudent(null);
                      setModalStudentOpen(true);
                    }}
                    className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Novo Aluno</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students
                  .filter(s => 
                    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.contactEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.googleEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.cpf?.includes(searchQuery)
                  )
                  .map(student => {
                    const studentEnrollments = enrollments.filter(e => e.studentId === student.id);
                    const studentInstallments = installments.filter(i => i.studentId === student.id);
                    const hasOverdue = studentInstallments.some(i => i.status === 'overdue');

                    return (
                      <div key={student.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={student.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                                alt={student.name}
                                className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
                              />
                              <div>
                                <h3 className="font-bold text-slate-900 text-sm leading-tight">{student.name}</h3>
                                <span className="text-[11px] text-slate-500">Aluno desde: {student.enrolledSince || 'Não inf.'}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setEditingStudent(student);
                                  setModalStudentOpen(true);
                                }}
                                className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
                                title="Editar Cadastro"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-4 space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-slate-400" /> Contato:
                              </span>
                              <span className="font-medium text-slate-800 truncate max-w-[150px]">{student.contactEmail}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500 flex items-center gap-1.5 font-semibold text-rose-600">
                                <Sparkles className="w-3.5 h-3.5 text-rose-500" /> E-mail YouTube:
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-slate-900 truncate max-w-[130px]">{student.googleEmail}</span>
                                <button
                                  onClick={() => copyToClipboard(student.googleEmail, 'E-mail do YouTube')}
                                  className="p-1 text-slate-400 hover:text-indigo-600"
                                  title="Copiar e-mail YouTube"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500 flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-slate-400" /> WhatsApp:
                              </span>
                              <span className="font-medium text-slate-800">{student.phone}</span>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between text-xs">
                            <span className="text-slate-500">
                              {studentEnrollments.length} turma(s) vinculada(s)
                            </span>
                            {hasOverdue ? (
                              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px] flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> Inadimplente
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium text-[10px] flex items-center gap-1">
                                <Check className="w-3 h-3" /> Em dia
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                          <button
                            onClick={() => setSelectedStudentForProfile(student)}
                            className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Abrir Ficha 360°</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {}
          {activeTab === 'teachers' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Corpo Docente & Gestão de Chaves PIX</h2>
                  <p className="text-xs text-slate-500">Atalho rápido para cópia de PIX e extrato de repasses baseados em adimplência</p>
                </div>
                <button
                  onClick={() => {
                    setEditingTeacher(null);
                    setModalTeacherOpen(true);
                  }}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Cadastrar Professor</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teachers.map(teacher => {
                  const allocatedCohorts = cohorts.filter(c => (c.teachers || []).some(t => t.teacherId === teacher.id));
                  
                  let totalDevido = 0;
                  allocatedCohorts.forEach(cohort => {
                    const teacherConfig = (cohort.teachers || []).find(t => t.teacherId === teacher.id);
                    const adimplentes = getCohortAdimplentesCount(cohort.id);
                    totalDevido += adimplentes * Number(teacherConfig?.repassPerStudent || 0);
                  });

                  const totalPago = teacherPayouts
                    .filter(p => p.teacherId === teacher.id)
                    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

                  const saldoPendente = Math.max(0, totalDevido - totalPago);

                  return (
                    <div key={teacher.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={teacher.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                              alt={teacher.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                            />
                            <div>
                              <h3 className="font-bold text-slate-900 text-sm leading-tight">{teacher.name}</h3>
                              <span className="text-[11px] text-slate-500">CPF: {teacher.cpf}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setEditingTeacher(teacher);
                              setModalTeacherOpen(true);
                            }}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-4 bg-emerald-50/70 border border-emerald-200 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Chave PIX Cadastrada
                            </span>
                            <button
                              onClick={() => copyToClipboard(teacher.pixKey, 'Chave PIX do Docente')}
                              className="flex items-center gap-1 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded-lg transition-all"
                            >
                              <Copy className="w-3 h-3" />
                              <span>Copiar Chave</span>
                            </button>
                          </div>
                          <p className="font-mono text-xs text-emerald-950 font-semibold break-all bg-white/80 p-2 rounded-lg border border-emerald-100 mt-1.5">
                            {teacher.pixKey || 'Chave não cadastrada'}
                          </p>
                        </div>

                        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block">LIBERADO (ADIMP.)</span>
                            <span className="font-bold text-slate-800">{formatBRL(totalDevido)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-emerald-600 font-bold block">PAGO</span>
                            <span className="font-bold text-emerald-600">{formatBRL(totalPago)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-violet-600 font-bold block">PENDENTE</span>
                            <span className="font-bold text-violet-600">{formatBRL(saldoPendente)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">{allocatedCohorts.length} turma(s) vinculada(s)</span>
                        <button
                          onClick={() => setSelectedTeacherForProfile(teacher)}
                          className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                          <span>Ver Ficha do Docente</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {}
          {activeTab === 'courses' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Catálogo de Cursos & Turmas</h2>
                  <p className="text-xs text-slate-500">Cursos base com professores vinculados e turmas abertas</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingCourse(null);
                      setModalCourseOpen(true);
                    }}
                    className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Novo Curso Base</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingCohort(null);
                      setModalCohortOpen(true);
                    }}
                    className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Abrir Nova Turma</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Cursos Base Cadastrados no Catálogo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map(course => (
                    <div key={course.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">{course.name}</h4>
                          <button
                            onClick={() => {
                              setEditingCourse(course);
                              setModalCourseOpen(true);
                            }}
                            className="p-1 text-slate-400 hover:text-indigo-600"
                            title="Editar Curso"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-3">{course.description || 'Sem descrição cadastrada.'}</p>
                        
                        <div className="space-y-1 mb-3">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Professores Padrão Vinculados:</span>
                          {(course.teachers || []).length === 0 ? (
                            <span className="text-[11px] text-slate-400 italic">Nenhum professor vinculado</span>
                          ) : (
                            (course.teachers || []).map((t, idx) => {
                              const prof = teachers.find(p => p.id === t.teacherId);
                              return (
                                <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 px-2 py-1 rounded-lg">
                                  <span className="font-medium text-slate-700">{prof?.name || 'Professor'}</span>
                                  <span className="text-indigo-600 font-semibold">{formatBRL(t.repassPerStudent)} / aluno</span>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Carga Horária:</span>
                        <span className="font-bold text-indigo-600">{course.workloadHours}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Turmas Abertas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cohorts.map(cohort => {
                    const course = courses.find(c => c.id === cohort.courseId);
                    const enrolledCount = getCohortActiveEnrollmentsCount(cohort.id);
                    const adimplentesCount = getCohortAdimplentesCount(cohort.id);

                    return (
                      <div key={cohort.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-slate-900 text-base">{cohort.name}</h4>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                  cohort.status === 'Em Andamento' ? 'bg-indigo-100 text-indigo-700' :
                                  cohort.status === 'Inscrições Abertas' ? 'bg-emerald-100 text-emerald-700' :
                                  cohort.status === 'Concluída' ? 'bg-slate-100 text-slate-700' :
                                  'bg-rose-100 text-rose-700'
                                }`}>
                                  {cohort.status}
                                </span>
                              </div>
                              <p className="text-xs text-indigo-600 font-medium mt-0.5">{course?.name}</p>
                            </div>
                            <button
                              onClick={() => {
                                setEditingCohort(cohort);
                                setModalCohortOpen(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                            <div><span className="text-slate-400">Início:</span> <strong>{cohort.startDate}</strong></div>
                            <div><span className="text-slate-400">Término:</span> <strong>{cohort.endDate}</strong></div>
                          </div>

                          <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Tabela de Preços à Vista</span>
                            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                              <div className="bg-white p-1.5 rounded-lg border border-slate-200/60">
                                <span className="text-[10px] text-slate-400 block">PIX</span>
                                <span className="font-bold text-slate-800">{formatBRL(cohort.pricePix)}</span>
                              </div>
                              <div className="bg-white p-1.5 rounded-lg border border-slate-200/60">
                                <span className="text-[10px] text-slate-400 block">Aluno</span>
                                <span className="font-bold text-indigo-600">{formatBRL(cohort.priceStudent)}</span>
                              </div>
                              <div className="bg-white p-1.5 rounded-lg border border-slate-200/60">
                                <span className="text-[10px] text-slate-400 block">Cartão</span>
                                <span className="font-bold text-slate-800">{formatBRL(cohort.priceCard)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 space-y-1.5">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Corpo Docente Alocado</span>
                            {(cohort.teachers || []).map((t, idx) => {
                              const profObj = teachers.find(p => p.id === t.teacherId);
                              return (
                                <div key={idx} className="flex items-center justify-between text-xs bg-slate-50/80 px-2.5 py-1.5 rounded-lg">
                                  <span className="font-medium text-slate-700">{profObj?.name || 'Professor'}</span>
                                  <span className="text-slate-500 font-semibold">{formatBRL(t.repassPerStudent)} / aluno</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-600">
                            <strong>{enrolledCount}</strong> matriculado(s) | <strong className="text-emerald-600">{adimplentesCount}</strong> adimplente(s)
                          </span>
                          <button
                            onClick={() => setModalEnrollmentOpen(true)}
                            className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Matricular Aluno</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {}
          {activeTab === 'finance' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Contabilidade & Gestão Financeira</h2>
                  <p className="text-xs text-slate-500">Contas a receber, cobrança preventiva/WhatsApp e saídas para repasses</p>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { id: 'all', label: 'Todas' },
                    { id: 'overdue', label: 'Vencidas' },
                    { id: 'pending', label: 'A Vencer' },
                    { id: 'paid', label: 'Pagas' },
                    { id: 'canceled', label: 'Canceladas' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFinanceFilter(f.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        financeFilter === f.id
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Entradas / Mensalidades dos Alunos</h3>
                  <span className="text-xs text-slate-500">
                    Exibindo {installments.filter(i => financeFilter === 'all' ? true : i.status === financeFilter).length} lançamentos
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">Aluno / Contato</th>
                        <th className="py-3 px-4">Turma & Parcela</th>
                        <th className="py-3 px-4">Valor</th>
                        <th className="py-3 px-4">Vencimento</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Ações Rápidas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {installments
                        .filter(i => financeFilter === 'all' ? true : i.status === financeFilter)
                        .map(inst => {
                          const student = students.find(s => s.id === inst.studentId);
                          const cohort = cohorts.find(c => c.id === inst.cohortId);

                          return (
                            <tr key={inst.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-4">
                                <span className="font-bold text-slate-900 block">{student?.name || 'Aluno'}</span>
                                <span className="text-slate-400 text-[11px]">{student?.phone}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-medium text-slate-800 block truncate max-w-[180px]">{cohort?.name || 'Turma'}</span>
                                <span className="text-[11px] font-semibold text-indigo-600">
                                  Parcela {inst.installmentNumber} de {inst.totalInstallments} ({inst.paymentMethod || 'PIX'})
                                </span>
                              </td>
                              <td className="py-3 px-4 font-bold text-slate-900">
                                {formatBRL(inst.amount)}
                              </td>
                              <td className="py-3 px-4 font-medium">
                                {inst.dueDate}
                                {inst.paidAt && (
                                  <span className="text-[10px] text-emerald-600 block">Pago em: {inst.paidAt}</span>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  inst.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                                  inst.status === 'overdue' ? 'bg-rose-100 text-rose-800 animate-pulse' :
                                  inst.status === 'canceled' ? 'bg-slate-200 text-slate-600' :
                                  'bg-amber-100 text-amber-800'
                                }`}>
                                  {inst.status === 'paid' && <CheckCircle2 className="w-3 h-3" />}
                                  {inst.status === 'overdue' && <AlertCircle className="w-3 h-3" />}
                                  {inst.status === 'pending' && <Clock className="w-3 h-3" />}
                                  {inst.status === 'canceled' && <XCircle className="w-3 h-3" />}
                                  {inst.status === 'paid' ? 'Paga' :
                                   inst.status === 'overdue' ? 'Vencida' :
                                   inst.status === 'canceled' ? 'Cancelada' : 'A Vencer'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                                {student && inst.status !== 'paid' && inst.status !== 'canceled' && (
                                  <button
                                    onClick={() => openWhatsAppCobrança(student, inst, inst.status === 'overdue' ? 'vencida' : 'preventiva')}
                                    className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-all"
                                    title="Enviar mensagem WhatsApp de cobrança"
                                  >
                                    <MessageCircle className="w-4 h-4" />
                                  </button>
                                )}
                                {inst.status !== 'paid' && inst.status !== 'canceled' && (
                                  <button
                                    onClick={() => {
                                      setSelectedInstallmentForPayment(inst);
                                      setModalPaymentOpen(true);
                                    }}
                                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-[11px] shadow-sm transition-all"
                                  >
                                    Dar Baixa
                                  </button>
                                )}
                                {inst.status === 'paid' && (
                                  <span className="text-[11px] text-emerald-600 font-bold">Liquidada</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Gestão de Saídas: Repasses a Professores</h3>
                  <p className="text-xs text-slate-500">
                    O valor liberado para pagamento é calculado estritamente sobre a quantidade de alunos adimplentes na turma
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cohorts.map(cohort => {
                    const adimplentesCount = getCohortAdimplentesCount(cohort.id);
                    return (
                      <div key={cohort.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <h4 className="font-bold text-slate-900 text-sm">{cohort.name}</h4>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {adimplentesCount} alunos adimplentes
                          </span>
                        </div>

                        <div className="space-y-2">
                          {(cohort.teachers || []).map((t, idx) => {
                            const prof = teachers.find(p => p.id === t.teacherId);
                            const repasseCalculado = adimplentesCount * Number(t.repassPerStudent || 0);

                            return (
                              <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200/70 flex flex-col justify-between gap-2">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-bold text-slate-800 text-xs block">{prof?.name}</span>
                                    <span className="text-[11px] text-slate-500">{formatBRL(t.repassPerStudent)} × {adimplentesCount} alunos</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[10px] text-slate-400 block font-bold">TOTAL LIBERADO</span>
                                    <span className="font-bold text-indigo-600 text-sm">{formatBRL(repasseCalculado)}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                  <button
                                    onClick={() => copyToClipboard(prof?.pixKey || '', 'Chave PIX')}
                                    className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800"
                                  >
                                    <Copy className="w-3 h-3" />
                                    <span>Copiar PIX</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      const newPayout = {
                                        id: `payout-${Date.now()}`,
                                        cohortId: cohort.id,
                                        teacherId: prof.id,
                                        amount: repasseCalculado,
                                        paidAt: new Date().toISOString().split('T')[0],
                                        studentCountAdimplente: adimplentesCount,
                                        status: 'paid',
                                        notes: `Repasse referente a ${adimplentesCount} alunos adimplentes na turma ${cohort.name}`
                                      };
                                      setTeacherPayouts(prev => [newPayout, ...prev]);
                                      persistItem('teacherPayouts', newPayout);
                                      addAuditLog('Repasse Docente Executado', `${prof.name} - ${cohort.name}`, `Valor de ${formatBRL(repasseCalculado)} liquidado.`);
                                      showToast('Repasse marcado como pago com sucesso!');
                                    }}
                                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold transition-all shadow-sm"
                                  >
                                    Marcar como Pago
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Registro de Auditoria do Sistema (Uso Interno)</h2>
                <p className="text-xs text-slate-500">Log de todas as modificações manuais de datas, valores, matrículas e baixas financeiras</p>
              </div>

              <div className="divide-y divide-slate-100">
                {auditLogs.map(log => (
                  <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{log.action}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium">{log.user}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5"><strong>Alvo:</strong> {log.target} &bull; {log.details}</p>
                    </div>
                    <span className="text-slate-400 text-[11px] whitespace-nowrap">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around z-30 shadow-lg">
        {[
          { id: 'dashboard', label: 'Início', icon: TrendingUp },
          { id: 'students', label: 'Alunos', icon: Users },
          { id: 'teachers', label: 'Docentes', icon: UserCheck },
          { id: 'courses', label: 'Turmas', icon: BookOpen },
          { id: 'finance', label: 'Financeiro', icon: DollarSign }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-indigo-600 font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>

      {modalStudentOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingStudent ? 'Editar Cadastro do Aluno' : 'Novo Cadastro de Aluno'}
              </h3>
              <button onClick={() => setModalStudentOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const studentData = {
                  id: editingStudent ? editingStudent.id : `alu-${Date.now()}`,
                  name: formData.get('name'),
                  photoUrl: formData.get('photoUrl') || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
                  contactEmail: formData.get('contactEmail'),
                  googleEmail: formData.get('googleEmail'),
                  phone: formData.get('phone'),
                  cpf: formData.get('cpf'),
                  address: formData.get('address'),
                  birthDate: formData.get('birthDate'),
                  enrolledSince: formData.get('enrolledSince') || new Date().toISOString().split('T')[0],
                  createdAt: editingStudent ? editingStudent.createdAt : new Date().toISOString()
                };

                if (editingStudent) {
                  setStudents(prev => prev.map(s => s.id === editingStudent.id ? studentData : s));
                  addAuditLog('Edição de Aluno', studentData.name, 'Dados cadastrais atualizados');
                  showToast('Aluno atualizado com sucesso!');
                } else {
                  setStudents(prev => [studentData, ...prev]);
                  addAuditLog('Novo Aluno', studentData.name, 'Cadastro de aluno criado no sistema');
                  showToast('Aluno cadastrado com sucesso!');
                }

                persistItem('students', studentData);
                setModalStudentOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nome Completo *</label>
                <input
                  name="name"
                  required
                  defaultValue={editingStudent?.name || ''}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">E-mail de Contato Geral *</label>
                  <input
                    name="contactEmail"
                    type="email"
                    required
                    defaultValue={editingStudent?.contactEmail || ''}
                    placeholder="ex: contato@email.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-rose-600 flex items-center gap-1 block mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> E-mail Google (YouTube) *
                  </label>
                  <input
                    name="googleEmail"
                    type="email"
                    required
                    defaultValue={editingStudent?.googleEmail || ''}
                    placeholder="aluno@gmail.com"
                    className="w-full px-3 py-2 border border-rose-200 bg-rose-50/40 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Telefone / WhatsApp *</label>
                  <input
                    name="phone"
                    required
                    defaultValue={editingStudent?.phone || ''}
                    placeholder="11999998888"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">CPF *</label>
                  <input
                    name="cpf"
                    required
                    defaultValue={editingStudent?.cpf || ''}
                    placeholder="000.000.000-00"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Data de Nascimento</label>
                  <input
                    name="birthDate"
                    type="date"
                    defaultValue={editingStudent?.birthDate || ''}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-indigo-700 block mb-1">Data de Inscrição *</label>
                  <input
                    name="enrolledSince"
                    type="date"
                    required
                    defaultValue={editingStudent?.enrolledSince || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-indigo-200 bg-indigo-50/40 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Endereço Completo</label>
                <input
                  name="address"
                  defaultValue={editingStudent?.address || ''}
                  placeholder="Rua, Número, Bairro, Cidade/UF"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">URL da Foto de Perfil (Opcional)</label>
                <input
                  name="photoUrl"
                  defaultValue={editingStudent?.photoUrl || ''}
                  placeholder="https://exemplo.com/foto.jpg"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalStudentOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md"
                >
                  Salvar Aluno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedStudentForProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudentForProfile.photoUrl}
                  alt={selectedStudentForProfile.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{selectedStudentForProfile.name}</h3>
                  <p className="text-xs text-slate-500">Aluno cadastrado desde: <strong>{selectedStudentForProfile.enrolledSince}</strong></p>
                </div>
              </div>
              <button onClick={() => setSelectedStudentForProfile(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div><span className="text-slate-400 block">E-mail Principal:</span> <strong className="text-slate-800">{selectedStudentForProfile.contactEmail}</strong></div>
              <div>
                <span className="text-rose-500 font-semibold block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Acesso YouTube (Google):
                </span>
                <strong className="text-slate-900">{selectedStudentForProfile.googleEmail}</strong>
              </div>
              <div><span className="text-slate-400 block">WhatsApp:</span> <strong className="text-slate-800">{selectedStudentForProfile.phone}</strong></div>
              <div><span className="text-slate-400 block">CPF:</span> <strong className="text-slate-800">{selectedStudentForProfile.cpf}</strong></div>
              <div className="sm:col-span-2"><span className="text-slate-400 block">Endereço:</span> <span className="text-slate-700">{selectedStudentForProfile.address || 'Não informado'}</span></div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Histórico de Cursos & Turmas
              </h4>
              <div className="space-y-2">
                {enrollments.filter(e => e.studentId === selectedStudentForProfile.id).map(enrollment => {
                  const cohort = cohorts.find(c => c.id === enrollment.cohortId);
                  const course = courses.find(c => c.id === cohort?.courseId);

                  return (
                    <div key={enrollment.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{cohort?.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            enrollment.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {enrollment.status === 'active' ? 'Matrícula Ativa' : 'Cancelada/Trancada'}
                          </span>
                        </div>
                        <span className="text-slate-500 text-[11px] block">{course?.name} &bull; Matrícula: {enrollment.enrollmentDate}</span>
                      </div>

                      {enrollment.status === 'active' && (
                        <button
                          onClick={() => {
                            setSelectedEnrollmentToCancel(enrollment);
                            setModalCancelEnrollmentOpen(true);
                          }}
                          className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-semibold text-[11px] transition-all"
                        >
                          Cancelar Matrícula
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Histórico Financeiro Individual
              </h4>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {installments.filter(i => i.studentId === selectedStudentForProfile.id).map(inst => (
                  <div key={inst.id} className="p-3 flex items-center justify-between text-xs bg-white">
                    <div>
                      <span className="font-semibold text-slate-800">Parcela {inst.installmentNumber}/{inst.totalInstallments}</span>
                      <span className="text-slate-400 block text-[11px]">Vencimento: {inst.dueDate} {inst.paidAt && `(Pago em ${inst.paidAt})`}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900">{formatBRL(inst.amount)}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inst.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                        inst.status === 'overdue' ? 'bg-rose-100 text-rose-700' :
                        inst.status === 'canceled' ? 'bg-slate-200 text-slate-600' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {inst.status === 'paid' ? 'Paga' : inst.status === 'overdue' ? 'Vencida' : inst.status === 'canceled' ? 'Cancelada' : 'A Vencer'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {modalTeacherOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingTeacher ? 'Editar Cadastro do Docente' : 'Novo Cadastro de Docente'}
              </h3>
              <button onClick={() => setModalTeacherOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const teacherData = {
                  id: editingTeacher ? editingTeacher.id : `prof-${Date.now()}`,
                  name: formData.get('name'),
                  photoUrl: formData.get('photoUrl') || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  cpf: formData.get('cpf'),
                  address: formData.get('address'),
                  birthDate: formData.get('birthDate'),
                  pixKey: formData.get('pixKey'),
                  createdAt: editingTeacher ? editingTeacher.createdAt : new Date().toISOString()
                };

                if (editingTeacher) {
                  setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? teacherData : t));
                  addAuditLog('Edição de Docente', teacherData.name, 'Chave PIX ou dados alterados');
                  showToast('Docente atualizado com sucesso!');
                } else {
                  setTeachers(prev => [teacherData, ...prev]);
                  addAuditLog('Novo Docente', teacherData.name, 'Professor incluído no corpo docente');
                  showToast('Docente cadastrado com sucesso!');
                }

                persistItem('teachers', teacherData);
                setModalTeacherOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nome Completo do Professor *</label>
                <input
                  name="name"
                  required
                  defaultValue={editingTeacher?.name || ''}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 space-y-1">
                <label className="font-bold text-emerald-900 block flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-emerald-600" /> Chave PIX para Repasses *
                </label>
                <input
                  name="pixKey"
                  required
                  defaultValue={editingTeacher?.pixKey || ''}
                  placeholder="CPF, CNPJ, E-mail, Telefone ou Chave Aleatória"
                  className="w-full px-3 py-2 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">E-mail *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    defaultValue={editingTeacher?.email || ''}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">WhatsApp *</label>
                  <input
                    name="phone"
                    required
                    defaultValue={editingTeacher?.phone || ''}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">CPF *</label>
                  <input
                    name="cpf"
                    required
                    defaultValue={editingTeacher?.cpf || ''}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Data de Nascimento</label>
                  <input
                    name="birthDate"
                    type="date"
                    defaultValue={editingTeacher?.birthDate || ''}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Endereço Completo</label>
                <input
                  name="address"
                  defaultValue={editingTeacher?.address || ''}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">URL da Foto (Opcional)</label>
                <input
                  name="photoUrl"
                  defaultValue={editingTeacher?.photoUrl || ''}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalTeacherOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md"
                >
                  Salvar Docente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedTeacherForProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTeacherForProfile.photoUrl}
                  alt={selectedTeacherForProfile.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{selectedTeacherForProfile.name}</h3>
                  <p className="text-xs text-slate-500">Corpo Docente Especializado</p>
                </div>
              </div>
              <button onClick={() => setSelectedTeacherForProfile(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase block">Chave PIX para Transferência</span>
                <span className="font-mono text-sm font-bold text-emerald-950">{selectedTeacherForProfile.pixKey}</span>
              </div>
              <button
                onClick={() => copyToClipboard(selectedTeacherForProfile.pixKey, 'Chave PIX')}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <Copy className="w-4 h-4" />
                <span>Copiar PIX</span>
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Turmas Alocadas & Repasses por Aluno</h4>
              <div className="space-y-2">
                {cohorts.filter(c => (c.teachers || []).some(t => t.teacherId === selectedTeacherForProfile.id)).map(cohort => {
                  const teacherConfig = (cohort.teachers || []).find(t => t.teacherId === selectedTeacherForProfile.id);
                  const adimplentes = getCohortAdimplentesCount(cohort.id);
                  const valorDevido = adimplentes * Number(teacherConfig?.repassPerStudent || 0);

                  return (
                    <div key={cohort.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{cohort.name}</span>
                        <span className="text-slate-500 text-[11px]">
                          Repasse acordado: {formatBRL(teacherConfig?.repassPerStudent)} / aluno
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block">{adimplentes} alunos adimplentes</span>
                        <span className="font-bold text-indigo-600">{formatBRL(valorDevido)} a receber</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {modalCourseOpen && (
        <CourseModal
          teachers={teachers}
          editingCourse={editingCourse}
          onClose={() => setModalCourseOpen(false)}
          onSave={(courseData) => {
            if (editingCourse) {
              setCourses(prev => prev.map(c => c.id === editingCourse.id ? courseData : c));
              addAuditLog('Edição de Curso', courseData.name, 'Informações e professores do catálogo alterados');
              showToast('Curso atualizado com sucesso!');
            } else {
              setCourses(prev => [courseData, ...prev]);
              addAuditLog('Novo Curso Base', courseData.name, 'Curso cadastrado no catálogo com docentes');
              showToast('Curso cadastrado com sucesso!');
            }
            persistItem('courses', courseData);
            setModalCourseOpen(false);
          }}
        />
      )}

      {modalCohortOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingCohort ? 'Editar Turma' : 'Abertura de Nova Turma'}
              </h3>
              <button onClick={() => setModalCohortOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                
                const selectedTeachers = teachers.map(t => {
                  const isChecked = formData.get(`teacher_check_${t.id}`);
                  const repassVal = Number(formData.get(`teacher_repass_${t.id}`) || 0);
                  if (isChecked) {
                    return { teacherId: t.id, repassPerStudent: repassVal };
                  }
                  return null;
                }).filter(Boolean);

                const cohortData = {
                  id: editingCohort ? editingCohort.id : `turma-${Date.now()}`,
                  courseId: formData.get('courseId'),
                  name: formData.get('name'),
                  startDate: formData.get('startDate'),
                  endDate: formData.get('endDate'),
                  status: formData.get('status'),
                  pricePix: Number(formData.get('pricePix') || 0),
                  priceStudent: Number(formData.get('priceStudent') || 0),
                  priceCard: Number(formData.get('priceCard') || 0),
                  teachers: selectedTeachers,
                  createdAt: editingCohort ? editingCohort.createdAt : new Date().toISOString()
                };

                if (editingCohort) {
                  setCohorts(prev => prev.map(c => c.id === editingCohort.id ? cohortData : c));
                  addAuditLog('Edição de Turma', cohortData.name, 'Configuração da turma atualizada');
                  showToast('Turma atualizada com sucesso!');
                } else {
                  setCohorts(prev => [cohortData, ...prev]);
                  addAuditLog('Nova Turma Criada', cohortData.name, 'Turma aberta para matrículas');
                  showToast('Turma aberta com sucesso!');
                }

                persistItem('cohorts', cohortData);
                setModalCohortOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Curso Base *</label>
                  <select
                    name="courseId"
                    required
                    defaultValue={editingCohort?.courseId || courses[0]?.id}
                    onChange={(e) => {
                      const selectedCourse = courses.find(c => c.id === e.target.value);
                      if (selectedCourse && selectedCourse.teachers && !editingCohort) {
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status da Turma *</label>
                  <select
                    name="status"
                    required
                    defaultValue={editingCohort?.status || 'Inscrições Abertas'}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-semibold text-indigo-700"
                  >
                    <option value="Planejada">Planejada</option>
                    <option value="Inscrições Abertas">Inscrições Abertas</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluída">Concluída</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nome / Identificador da Turma *</label>
                <input
                  name="name"
                  required
                  defaultValue={editingCohort?.name || 'Turma 2026.2 - Sábado'}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Data de Início Prevista *</label>
                  <input
                    name="startDate"
                    type="date"
                    required
                    defaultValue={editingCohort?.startDate || ''}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Data de Término Prevista *</label>
                  <input
                    name="endDate"
                    type="date"
                    required
                    defaultValue={editingCohort?.endDate || ''}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block text-xs">Tabela de Preços da Turma (R$) *</span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Preço PIX</label>
                    <input
                      name="pricePix"
                      type="number"
                      required
                      defaultValue={editingCohort?.pricePix || 1500}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-indigo-700 font-semibold block mb-1">Preço Aluno</label>
                    <input
                      name="priceStudent"
                      type="number"
                      required
                      defaultValue={editingCohort?.priceStudent || 1350}
                      className="w-full px-2.5 py-1.5 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-indigo-50/50 font-bold text-indigo-700"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Preço Cartão</label>
                    <input
                      name="priceCard"
                      type="number"
                      required
                      defaultValue={editingCohort?.priceCard || 1650}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-800 block text-xs">Atribuição de Professores e Repasse por Aluno</span>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {teachers.map(t => {
                    const assigned = (editingCohort?.teachers || []).find(item => item.teacherId === t.id);
                    return (
                      <div key={t.id} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name={`teacher_check_${t.id}`}
                            defaultChecked={!!assigned}
                            className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                          />
                          <span className="font-medium text-slate-800">{t.name}</span>
                        </label>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-400">R$ / aluno:</span>
                          <input
                            type="number"
                            name={`teacher_repass_${t.id}`}
                            defaultValue={assigned?.repassPerStudent || 300}
                            className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-right font-bold text-indigo-600 bg-white"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalCohortOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md"
                >
                  Salvar Turma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalEnrollmentOpen && (
        <EnrollmentQuickModal
          students={students}
          cohorts={cohorts}
          onClose={() => setModalEnrollmentOpen(false)}
          onSave={({ enrollment, installments: newInstallments }) => {
            setEnrollments(prev => [enrollment, ...prev]);
            setInstallments(prev => [...newInstallments, ...prev]);
            persistItem('enrollments', enrollment);
            newInstallments.forEach(inst => persistItem('installments', inst));

            const sName = students.find(s => s.id === enrollment.studentId)?.name || 'Aluno';
            const cName = cohorts.find(c => c.id === enrollment.cohortId)?.name || 'Turma';

            addAuditLog('Nova Matrícula', `${sName} em ${cName}`, `Valor total: ${formatBRL(enrollment.totalAmount)} em ${newInstallments.length} parcela(s)`);
            showToast('Matrícula e cronograma de parcelas criados com sucesso!');
            setModalEnrollmentOpen(false);
          }}
        />
      )}

      {modalPaymentOpen && selectedInstallmentForPayment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Confirmar Recebimento / Baixa</h3>
              <button onClick={() => setModalPaymentOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const paidAt = formData.get('paidAt');
                const paymentMethod = formData.get('paymentMethod');
                const notes = formData.get('notes');
                const receiptUrl = formData.get('receiptUrl');

                const updated = {
                  ...selectedInstallmentForPayment,
                  status: 'paid',
                  paidAt,
                  paymentMethod,
                  notes,
                  receiptUrl
                };

                setInstallments(prev => prev.map(i => i.id === updated.id ? updated : i));
                persistItem('installments', updated);

                const studentObj = students.find(s => s.id === updated.studentId);
                addAuditLog('Baixa de Parcela', `${studentObj?.name} (Parc. ${updated.installmentNumber}/${updated.totalInstallments})`, `Recebimento de ${formatBRL(updated.amount)} via ${paymentMethod}`);
                showToast('Pagamento confirmado e liquidado!');
                setModalPaymentOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Valor da Parcela</span>
                <span className="text-xl font-bold text-slate-900">{formatBRL(selectedInstallmentForPayment.amount)}</span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Data da Confirmação / Liquidação *</label>
                <input
                  name="paidAt"
                  type="date"
                  required
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Forma de Pagamento Confirmada *</label>
                <select
                  name="paymentMethod"
                  defaultValue={selectedInstallmentForPayment.paymentMethod || 'PIX'}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium"
                >
                  <option value="PIX">PIX (Transferência / QR Code)</option>
                  <option value="Cartão">Cartão de Crédito / Débito</option>
                  <option value="Boleto">Boleto Bancário</option>
                  <option value="Dinheiro">Dinheiro em Espécie</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Link do Comprovante (Opcional)</label>
                <input
                  name="receiptUrl"
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Observações Financeiras</label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="ex: Identificado no extrato do Banco Itaú..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalPaymentOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md"
                >
                  Confirmar Baixa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalCancelEnrollmentOpen && selectedEnrollmentToCancel && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 bg-rose-100 rounded-2xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Confirmar Cancelamento de Matrícula</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Ao confirmar o cancelamento da matrícula:
              <br />
              &bull; <strong>Todas as parcelas futuras</strong> não pagas serão automaticamente canceladas.
              <br />
              &bull; A <strong>base de cálculo do repasse aos professores</strong> será recalculada imediatamente, removendo este aluno da base adimplente.
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setModalCancelEnrollmentOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 text-xs"
              >
                Voltar
              </button>
              <button
                onClick={() => handleCancelEnrollment(selectedEnrollmentToCancel)}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold text-xs shadow-md"
              >
                Sim, Cancelar Matrícula
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CourseModal({ teachers, editingCourse, onClose, onSave }) {
  const [courseTeachers, setCourseTeachers] = useState(editingCourse?.teachers || []);

  const handleTeacherToggle = (teacherId, checked) => {
    if (checked) {
      if (!courseTeachers.some(t => t.teacherId === teacherId)) {
        setCourseTeachers([...courseTeachers, { teacherId, repassPerStudent: 300 }]);
      }
    } else {
      setCourseTeachers(courseTeachers.filter(t => t.teacherId !== teacherId));
    }
  };

  const handleRepassChange = (teacherId, val) => {
    setCourseTeachers(courseTeachers.map(t => t.teacherId === teacherId ? { ...t, repassPerStudent: Number(val) } : t));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-lg">
            {editingCourse ? 'Editar Curso Base' : 'Novo Curso Base (Catálogo)'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const courseData = {
              id: editingCourse ? editingCourse.id : `cur-${Date.now()}`,
              name: formData.get('name'),
              bannerUrl: formData.get('bannerUrl') || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
              description: formData.get('description'),
              workloadHours: Number(formData.get('workloadHours') || 0),
              teachers: courseTeachers,
              createdAt: editingCourse ? editingCourse.createdAt : new Date().toISOString()
            };
            onSave(courseData);
          }}
          className="space-y-3 text-xs"
        >
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Nome do Curso *</label>
            <input
              name="name"
              required
              defaultValue={editingCourse?.name || ''}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Carga Horária (horas/aula) *</label>
            <input
              name="workloadHours"
              type="number"
              required
              defaultValue={editingCourse?.workloadHours || 40}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Descrição Detalhada</label>
            <textarea
              name="description"
              rows={2}
              defaultValue={editingCourse?.description || ''}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">URL do Banner Promocional</label>
            <input
              name="bannerUrl"
              defaultValue={editingCourse?.bannerUrl || ''}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="font-bold text-slate-800 block text-xs">Vincular Professores & Repasse Padrão por Aluno</span>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {teachers.map(t => {
                const assigned = courseTeachers.find(item => item.teacherId === t.id);
                return (
                  <div key={t.id} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!assigned}
                        onChange={(e) => handleTeacherToggle(t.id, e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span className="font-medium text-slate-800">{t.name}</span>
                    </label>
                    {assigned && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400">R$ / aluno:</span>
                        <input
                          type="number"
                          value={assigned.repassPerStudent}
                          onChange={(e) => handleRepassChange(t.id, e.target.value)}
                          className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-right font-bold text-indigo-600 bg-white"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md"
            >
              Salvar Curso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EnrollmentQuickModal({ students, cohorts, onClose, onSave }) {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [selectedCohortId, setSelectedCohortId] = useState(cohorts[0]?.id || '');
  const [enrollmentDate, setEnrollmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [priceMode, setPriceMode] = useState('pix'); 
  const [paymentCondition, setPaymentCondition] = useState('single');
  const [numInstallments, setNumInstallments] = useState(3);
  
  const currentCohort = cohorts.find(c => c.id === selectedCohortId);

  const basePrice = useMemo(() => {
    if (!currentCohort) return 0;
    if (priceMode === 'student') return Number(currentCohort.priceStudent || 0);
    if (priceMode === 'card') return Number(currentCohort.priceCard || 0);
    return Number(currentCohort.pricePix || 0);
  }, [currentCohort, priceMode]);

  const [customInstallments, setCustomInstallments] = useState([]);

  useEffect(() => {
    if (paymentCondition === 'single') {
      setCustomInstallments([{
        number: 1,
        amount: basePrice,
        dueDate: enrollmentDate
      }]);
    } else {
      const count = Math.max(2, Number(numInstallments));
      const splitAmount = Math.round((basePrice / count) * 100) / 100;
      const list = [];
      const baseDate = new Date(enrollmentDate);

      for (let i = 1; i <= count; i++) {
        const d = new Date(baseDate);
        d.setMonth(d.getMonth() + (i - 1));
        list.push({
          number: i,
          amount: splitAmount,
          dueDate: d.toISOString().split('T')[0]
        });
      }
      setCustomInstallments(list);
    }
  }, [basePrice, paymentCondition, numInstallments, enrollmentDate]);

  const handleInstallmentChange = (index, field, value) => {
    setCustomInstallments(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: field === 'amount' ? Number(value) : value };
      return next;
    });
  };

  const handleSave = () => {
    const enrollmentId = `mat-${Date.now()}`;
    const priceLabel = priceMode === 'pix' ? `Preço PIX (R$ ${basePrice})` :
                       priceMode === 'student' ? `Preço Aluno (R$ ${basePrice})` : `Preço Cartão (R$ ${basePrice})`;

    const enrollment = {
      id: enrollmentId,
      studentId: selectedStudentId,
      cohortId: selectedCohortId,
      priceMode: priceLabel,
      totalAmount: basePrice,
      enrollmentDate,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    const finalInstallments = customInstallments.map(inst => ({
      id: `parc-${Date.now()}-${inst.number}`,
      enrollmentId,
      studentId: selectedStudentId,
      cohortId: selectedCohortId,
      installmentNumber: inst.number,
      totalInstallments: customInstallments.length,
      amount: inst.amount,
      dueDate: inst.dueDate,
      status: 'pending',
      paidAt: null,
      paymentMethod: priceMode === 'card' ? 'Cartão' : 'PIX',
      notes: '',
      receiptUrl: '',
      createdAt: new Date().toISOString()
    }));

    onSave({ enrollment, installments: finalInstallments });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-lg">Realizar Matrícula & Gerador de Parcelas</h3>
          <button onClick={onClose} className="p-1 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Selecionar Aluno *</label>
              <select
                value={selectedStudentId}
                onChange={e => setSelectedStudentId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.cpf})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Selecionar Turma *</label>
              <select
                value={selectedCohortId}
                onChange={e => setSelectedCohortId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium"
              >
                {cohorts.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-indigo-700 block mb-1">Data da Matrícula (Retroativa) *</label>
              <input
                type="date"
                value={enrollmentDate}
                onChange={e => setEnrollmentDate(e.target.value)}
                className="w-full px-3 py-2 border border-indigo-200 bg-indigo-50/40 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Modalidade de Preço Aplicada *</label>
              <select
                value={priceMode}
                onChange={e => setPriceMode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-bold text-slate-900"
              >
                <option value="pix">Preço PIX (R$ {currentCohort?.pricePix})</option>
                <option value="student">Preço Aluno (R$ {currentCohort?.priceStudent})</option>
                <option value="card">Preço Cartão (R$ {currentCohort?.priceCard})</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">Condição de Pagamento</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentCondition('single')}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] ${
                    paymentCondition === 'single' ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-600'
                  }`}
                >
                  À Vista
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentCondition('installment')}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] ${
                    paymentCondition === 'installment' ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-600'
                  }`}
                >
                  Parcelado
                </button>
              </div>
            </div>

            {paymentCondition === 'installment' && (
              <div className="flex items-center gap-2 pt-2">
                <label className="text-slate-600 font-medium">Quantidade de Parcelas:</label>
                <input
                  type="number"
                  min={2}
                  max={24}
                  value={numInstallments}
                  onChange={e => setNumInstallments(Number(e.target.value))}
                  className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-center font-bold bg-white"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <span className="font-bold text-slate-800 block text-xs">
              Cronograma de Parcelas Geradas (Ajuste datas e valores livremente):
            </span>
            <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
              {customInstallments.map((inst, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 w-16">Parc. {inst.number}:</span>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-slate-400">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={inst.amount}
                      onChange={e => handleInstallmentChange(index, 'amount', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-200 rounded-lg font-bold text-slate-900 bg-white"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="date"
                      value={inst.dueDate}
                      onChange={e => handleInstallmentChange(index, 'dueDate', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-200 rounded-lg font-medium text-slate-800 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md"
            >
              Concluir Matrícula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
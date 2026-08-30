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

// --- CONFIGURAÇÃO FIREBASE / PERSISTÊNCIA ---
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

// --- DADOS INICIAIS (SEED) PARA DEMONSTRAÇÃO IMEDIATA ---
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
  },
  {
    id: 'alu-03',
    name: 'Camila Fernandes',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    contactEmail: 'camila.fernandes@empresa.com.br',
    googleEmail: 'camila.f.aulas@gmail.com',
    phone: '31976543210',
    cpf: '345.678.901-22',
    address: 'Rua dos Inconfidentes, 400 - Belo Horizonte/MG',
    birthDate: '2000-11-05',
    enrolledSince: '2023-08-01',
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
    createdAt: new Date().toISOString()
  },
  {
    id: 'cur-02',
    name: 'Inteligência de Mercado & Análise de Dados',
    bannerUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    description: 'Domínio de métricas, business intelligence, visualização e tomada de decisão orientada a dados.',
    workloadHours: 80,
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
  },
  {
    id: 'turma-02',
    courseId: 'cur-02',
    name: 'Turma Noturna 2026 - Terças e Quintas',
    startDate: '2026-04-14',
    endDate: '2026-08-20',
    status: 'Inscrições Abertas',
    pricePix: 1400,
    priceStudent: 1300,
    priceCard: 1550,
    teachers: [
      { teacherId: 'prof-02', repassPerStudent: 400 }
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
    status: 'active', // active, canceled, locked
    createdAt: new Date().toISOString()
  },
  {
    id: 'mat-02',
    studentId: 'alu-02',
    cohortId: 'turma-01',
    priceMode: 'Preço Cartão (R$ 1.950,00)',
    totalAmount: 1950,
    enrollmentDate: '2026-02-20',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 'mat-03',
    studentId: 'alu-03',
    cohortId: 'turma-02',
    priceMode: 'Preço PIX (R$ 1.400,00)',
    totalAmount: 1400,
    enrollmentDate: '2026-03-01',
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
    status: 'paid', // paid, pending, overdue, canceled
    paidAt: '2026-02-19',
    paymentMethod: 'PIX',
    notes: 'Pago via PIX com comprovante anexado',
    receiptUrl: 'https://exemplo.com/comprovante1.pdf',
    createdAt: new Date().toISOString()
  },
  {
    id: 'parc-02',
    enrollmentId: 'mat-01',
    studentId: 'alu-01',
    cohortId: 'turma-01',
    installmentNumber: 2,
    totalInstallments: 3,
    amount: 550,
    dueDate: '2026-03-20',
    status: 'paid',
    paidAt: '2026-03-20',
    paymentMethod: 'PIX',
    notes: 'Confirmado no extrato bancário',
    receiptUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 'parc-03',
    enrollmentId: 'mat-01',
    studentId: 'alu-01',
    cohortId: 'turma-01',
    installmentNumber: 3,
    totalInstallments: 3,
    amount: 550,
    dueDate: '2026-04-20',
    status: 'pending',
    paidAt: null,
    paymentMethod: 'PIX',
    notes: '',
    receiptUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 'parc-04',
    enrollmentId: 'mat-02',
    studentId: 'alu-02',
    cohortId: 'turma-01',
    installmentNumber: 1,
    totalInstallments: 3,
    amount: 650,
    dueDate: '2026-02-25',
    status: 'paid',
    paidAt: '2026-02-25',
    paymentMethod: 'Cartão',
    notes: 'Recibo Stripe/Gateway',
    receiptUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 'parc-05',
    enrollmentId: 'mat-02',
    studentId: 'alu-02',
    cohortId: 'turma-01',
    installmentNumber: 2,
    totalInstallments: 3,
    amount: 650,
    dueDate: '2026-03-25',
    status: 'overdue', // vencida
    paidAt: null,
    paymentMethod: 'Cartão',
    notes: 'Tentativa de cobrança pendente',
    receiptUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 'parc-06',
    enrollmentId: 'mat-02',
    studentId: 'alu-02',
    cohortId: 'turma-01',
    installmentNumber: 3,
    totalInstallments: 3,
    amount: 650,
    dueDate: '2026-04-25',
    status: 'pending',
    paidAt: null,
    paymentMethod: 'Cartão',
    notes: '',
    receiptUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 'parc-07',
    enrollmentId: 'mat-03',
    studentId: 'alu-03',
    cohortId: 'turma-02',
    installmentNumber: 1,
    totalInstallments: 1,
    amount: 1400,
    dueDate: '2026-03-05',
    status: 'paid',
    paidAt: '2026-03-04',
    paymentMethod: 'PIX',
    notes: 'Pagamento à vista realizado com sucesso',
    receiptUrl: '',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_TEACHER_PAYOUTS = [
  {
    id: 'payout-01',
    cohortId: 'turma-01',
    teacherId: 'prof-01',
    amount: 700,
    paidAt: '2026-03-28',
    studentCountAdimplente: 2,
    status: 'paid',
    notes: 'Repasse adiantado do primeiro ciclo de aulas'
  }
];

const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-01',
    user: 'Administração Geral',
    action: 'Criação de Turma',
    target: 'Turma 2026.1 - Sábados Manhã',
    details: 'Turma criada com 2 professores alocados',
    timestamp: '2026-02-01 10:30'
  },
  {
    id: 'log-02',
    user: 'Administração Geral',
    action: 'Baixa de Parcela',
    target: 'Mariana Silveira (Parc. 1/3)',
    details: 'Valor de R$ 550,00 confirmado via PIX',
    timestamp: '2026-02-19 14:15'
  }
];

export default function App() {
  // --- ESTADO PRINCIPAL ---
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, students, teachers, courses, finance, audit
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cloudSynced, setCloudSynced] = useState(false);

  // Entidades do ERP
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [cohorts, setCohorts] = useState(INITIAL_COHORTS);
  const [enrollments, setEnrollments] = useState(INITIAL_ENROLLMENTS);
  const [installments, setInstallments] = useState(INITIAL_INSTALLMENTS);
  const [teacherPayouts, setTeacherPayouts] = useState(INITIAL_TEACHER_PAYOUTS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Estados de Modais
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

  // Busca e Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [financeFilter, setFinanceFilter] = useState('all'); // all, paid, pending, overdue, canceled

  // --- HELPER DE NOTIFICAÇÃO (TOAST) ---
  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- CLIPBOARD HELPER ---
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

  // --- LOG DE AUDITORIA ---
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

  // --- SINCRONIZAÇÃO AUTOMÁTICA VIA FIRESTORE (SE DISPONÍVEL) ---
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
        console.error("Erro na autenticação:", err);
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
      }, (err) => console.warn(`Erro no snapshot ${colName}:`, err));
    };

    const unsubStudents = makeSub('students', setStudents, INITIAL_STUDENTS);
    const unsubTeachers = makeSub('teachers', setTeachers, INITIAL_TEACHERS);
    const unsubCourses = makeSub('courses', setCourses, INITIAL_COURSES);
    const unsubCohorts = makeSub('cohorts', setCohorts, INITIAL_COHORTS);
    const unsubEnrollments = makeSub('enrollments', setEnrollments, INITIAL_ENROLLMENTS);
    const unsubInstallments = makeSub('installments', setInstallments, INITIAL_INSTALLMENTS);
    const unsubPayouts = makeSub('teacherPayouts', setTeacherPayouts, INITIAL_TEACHER_PAYOUTS);
    const unsubLogs = makeSub('auditLogs', setAuditLogs, INITIAL_AUDIT_LOGS);

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

  // Persistência genérica
  const persistItem = async (colName, item) => {
    if (db && user) {
      try {
        await setDoc(doc(collection(db, 'artifacts', appId, 'public', 'data', colName), item.id), item);
      } catch (err) {
        console.error(`Erro ao salvar ${colName}:`, err);
      }
    }
  };

  // --- REGRAS DE NEGÓCIO E ADIMPLÊNCIA ---
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
      {/* --- TOAST NOTIFICATION --- */}
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

      {/* --- CABEÇALHO SUPERIOR --- */}
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

      {/* --- CORPO PRINCIPAL --- */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-0 sm:px-4 lg:px-8 py-0 sm:py-6">
        {/* NAVEGAÇÃO LATERAL DESKTOP */}
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

        {/* CONTEÚDO */}
        <main className="flex-1 w-full pb-20 sm:pb-8 px-4 sm:px-0">
          {/* DASHBOARD */}
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
                  <span className="text-xs font-medium text-slate-500 block mb-2">Entradas Confirmadas</span>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900">{formatBRL(financialMetrics.confirmedIncome)}</div>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-medium text-slate-500 block mb-2">A Vencer / Previsto</span>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900">{formatBRL(financialMetrics.pendingIncome)}</div>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-medium text-slate-500 block mb-2">Repasses Devidos</span>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900">{formatBRL(financialMetrics.totalRepasseLiberado)}</div>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-medium text-slate-500 block mb-2">Repasses Pendentes</span>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900">{formatBRL(financialMetrics.repassePendente)}</div>
                </div>
              </div>
            </div>
          )}

          {/* MÓDULO ALUNOS */}
          {activeTab === 'students' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">Gestão de Alunos & Ficha 360°</h2>
                <button
                  onClick={() => { setEditingStudent(null); setModalStudentOpen(true); }}
                  className="bg-indigo-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold"
                >
                  Novo Aluno
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map(student => (
                  <div key={student.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={student.photoUrl} alt={student.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{student.name}</h3>
                        <span className="text-xs text-slate-500">Desde: {student.enrolledSince}</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1">
                      <div><strong>Contato:</strong> {student.contactEmail}</div>
                      <div className="text-rose-600 font-semibold"><strong>E-mail YouTube:</strong> {student.googleEmail}</div>
                      <div><strong>WhatsApp:</strong> {student.phone}</div>
                    </div>
                    <button
                      onClick={() => setSelectedStudentForProfile(student)}
                      className="w-full py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-semibold"
                    >
                      Abrir Ficha 360°
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MÓDULO PROFESSORES */}
          {activeTab === 'teachers' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">Corpo Docente & Chaves PIX</h2>
                <button
                  onClick={() => { setEditingTeacher(null); setModalTeacherOpen(true); }}
                  className="bg-indigo-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold"
                >
                  Novo Professor
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teachers.map(teacher => (
                  <div key={teacher.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <h3 className="font-bold text-slate-900">{teacher.name}</h3>
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 uppercase block">Chave PIX</span>
                        <span className="font-mono text-xs font-bold text-emerald-950">{teacher.pixKey}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(teacher.pixKey, 'Chave PIX')}
                        className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold"
                      >
                        Copiar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MÓDULO FINANCEIRO */}
          {activeTab === 'finance' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900">Contabilidade & Gestão Financeira</h2>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Aluno</th>
                      <th className="py-3 px-4">Valor</th>
                      <th className="py-3 px-4">Vencimento</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {installments.map(inst => {
                      const student = students.find(s => s.id === inst.studentId);
                      return (
                        <tr key={inst.id}>
                          <td className="py-3 px-4 font-bold text-slate-900">{student?.name}</td>
                          <td className="py-3 px-4 font-bold">{formatBRL(inst.amount)}</td>
                          <td className="py-3 px-4">{inst.dueDate}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              inst.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                              inst.status === 'overdue' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {inst.status === 'paid' ? 'Paga' : inst.status === 'overdue' ? 'Vencida' : 'A Vencer'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {student && inst.status !== 'paid' && (
                              <button
                                onClick={() => openWhatsAppCobrança(student, inst, inst.status === 'overdue' ? 'vencida' : 'preventiva')}
                                className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg"
                              >
                                WhatsApp
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
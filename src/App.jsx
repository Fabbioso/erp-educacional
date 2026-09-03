import os

code_content = '''import React, { useState, useEffect } from 'react';
import { 
  Users, GraduationCap, BookOpen, DollarSign, ShieldCheck, 
  Plus, Search, CheckCircle, AlertTriangle, Clock, ChevronRight, 
  Trash2, Edit, Calendar, MapPin, User, FileText, ArrowRight, X, Filter, Ban, Cake, ExternalLink, RefreshCw
} from 'lucier-react'; // Fallback to inline SVG icons for guaranteed render without icon dep errors

// Icon helper components using native inline SVGs for 100% reliability
const IconUsers = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 100 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);
const IconGraduation = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
);
const IconBook = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const IconDollar = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 8v2m0-10e-5c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const IconShield = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
);
const IconCake = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-1.5-.454M9 6v2m3-2v2m3-2v2M4 11h16a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6a1 1 0 011-1z" /></svg>
);
const IconFilter = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Persistent state initialized from LocalStorage or empty arrays
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('merkaba_students');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem('merkaba_teachers');
    return saved ? JSON.parse(saved) : [];
  });

  const [baseCourses, setBaseCourses] = useState(() => {
    const saved = localStorage.getItem('merkaba_baseCourses');
    return saved ? JSON.parse(saved) : [];
  });

  const [cohorts, setCohorts] = useState(() => {
    const saved = localStorage.getItem('merkaba_cohorts');
    return saved ? JSON.parse(saved) : [];
  });

  const [enrollments, setEnrollments] = useState(() => {
    const saved = localStorage.getItem('merkaba_enrollments');
    return saved ? JSON.parse(saved) : [];
  });

  const [installments, setInstallments] = useState(() => {
    const saved = localStorage.getItem('merkaba_installments');
    return saved ? JSON.parse(saved) : [];
  });

  const [teacherPayouts, setTeacherPayouts] = useState(() => {
    const saved = localStorage.getItem('merkaba_teacherPayouts');
    return saved ? JSON.parse(saved) : [];
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('merkaba_auditLogs');
    return saved ? JSON.parse(saved) : [{ id: 1, action: 'Sistema iniciado (Modo de Testes)', user: 'Administrador', timestamp: new Date().toLocaleString() }];
  });

  // Sync state changes to LocalStorage
  useEffect(() => { localStorage.setItem('merkaba_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('merkaba_teachers', JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { localStorage.setItem('merkaba_baseCourses', JSON.stringify(baseCourses)); }, [baseCourses]);
  useEffect(() => { localStorage.setItem('merkaba_cohorts', JSON.stringify(cohorts)); }, [cohorts]);
  useEffect(() => { localStorage.setItem('merkaba_enrollments', JSON.stringify(enrollments)); }, [enrollments]);
  useEffect(() => { localStorage.setItem('merkaba_installments', JSON.stringify(installments)); }, [installments]);
  useEffect(() => { localStorage.setItem('merkaba_teacherPayouts', JSON.stringify(teacherPayouts)); }, [teacherPayouts]);
  useEffect(() => { localStorage.setItem('merkaba_auditLogs', JSON.stringify(auditLogs)); }, [auditLogs]);

  // Modal States
  const [showQuickEnrollModal, setShowQuickEnrollModal] = useState(false);
  const [showNewStudentModal, setShowNewStudentModal] = useState(false);
  const [showNewTeacherModal, setShowNewTeacherModal] = useState(false);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [showNewCohortModal, setShowNewCohortModal] = useState(false);
  const [showStudent360Modal, setShowStudent360Modal] = useState(null);
  const [showTeacherPayoutModal, setShowTeacherPayoutModal] = useState(null);

  // Filters State
  const [finFilterStudent, setFinFilterStudent] = useState('');
  const [finFilterCohort, setFinFilterCohort] = useState('');
  const [finFilterDateStart, setFinFilterDateStart] = useState('');
  const [finFilterDateEnd, setFinFilterDateEnd] = useState('');

  const [repFilterTeacher, setRepFilterTeacher] = useState('');
  const [repFilterCohort, setRepFilterCohort] = useState('');

  // Course Filter for Cohort view
  const [cohortCourseFilter, setCohortCourseFilter] = useState('');

  // Form States
  const [quickForm, setQuickForm] = useState({
    name: '', email: '', phone: '', birthDate: '', cohortId: '', paymentMethod: 'PIX', paymentType: 'vista', installmentsCount: 1, customValue: '', dueDate: new Date().toISOString().split('T')[0]
  });

  const [studentForm, setStudentForm] = useState({ name: '', cpf: '', email: '', phone: '', birthDate: '', notes: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', cpf: '', email: '', phone: '', pixKey: '', birthDate: '' });
  const [courseForm, setCourseForm] = useState({ name: '', workload: '', description: '', teacherAssignments: [] });
  const [cohortForm, setCohortForm] = useState({ baseCourseId: '', code: '', startDate: '', schedule: '', basePrice: '' });

  // Log Action
  const logAction = (action) => {
    setAuditLogs(prev => [{ id: Date.now(), action, user: 'Administrador (Ambiente de Testes)', timestamp: new Date().toLocaleString() }, ...prev]);
  };

  // Helper: Birthday Check
  const getTodayBirthdays = () => {
    const today = new Date();
    const currentMonthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const studentBdays = students.filter(s => s.birthDate && s.birthDate.endsWith(currentMonthDay)).map(s => ({ ...s, type: 'Aluno' }));
    const teacherBdays = teachers.filter(t => t.birthDate && t.birthDate.endsWith(currentMonthDay)).map(t => ({ ...t, type: 'Professor' }));
    
    return [...studentBdays, ...teacherBdays];
  };

  // Quick Enroll Handler
  const handleQuickEnroll = (e) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.cohortId) {
      alert('Por favor, preencha o nome do aluno e selecione uma turma.');
      return;
    }

    const cohort = cohorts.find(c => c.id === Number(quickForm.cohortId));
    if (!cohort) {
      alert('Turma selecionada inválida.');
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: quickForm.name,
      email: quickForm.email || 'N/A',
      phone: quickForm.phone || 'N/A',
      birthDate: quickForm.birthDate || '',
      cpf: '000.000.000-00',
      registrationDate: new Date().toLocaleDateString('pt-BR')
    };

    const newEnrollment = {
      id: Date.now() + 1,
      studentId: newStudent.id,
      cohortId: cohort.id,
      status: 'active',
      date: new Date().toLocaleDateString('pt-BR')
    };

    const totalVal = Number(quickForm.customValue) || Number(cohort.basePrice) || 1000;
    const newInsts = [];
    
    if (quickForm.paymentType === 'vista') {
      newInsts.push({
        id: Date.now() + 2,
        enrollmentId: newEnrollment.id,
        number: 1,
        totalParts: 1,
        value: totalVal,
        dueDate: quickForm.dueDate,
        status: 'pending',
        paymentMethod: quickForm.paymentMethod
      });
    } else {
      const parts = Number(quickForm.installmentsCount) || 2;
      const partVal = totalVal / parts;
      const baseDate = new Date(quickForm.dueDate || Date.now());

      for (let i = 0; i < parts; i++) {
        const d = new Date(baseDate);
        d.setMonth(d.getMonth() + i);
        newInsts.push({
          id: Date.now() + 2 + i,
          enrollmentId: newEnrollment.id,
          number: i + 1,
          totalParts: parts,
          value: partVal,
          dueDate: d.toISOString().split('T')[0],
          status: 'pending',
          paymentMethod: quickForm.paymentMethod
        });
      }
    }

    setStudents(prev => [...prev, newStudent]);
    setEnrollments(prev => [...prev, newEnrollment]);
    setInstallments(prev => [...prev, ...newInsts]);

    logAction(`Matrícula rápida realizada para ${newStudent.name} na turma ${cohort.code}`);
    setShowQuickEnrollModal(false);
    setQuickForm({ name: '', email: '', phone: '', birthDate: '', cohortId: '', paymentMethod: 'PIX', paymentType: 'vista', installmentsCount: 1, customValue: '', dueDate: new Date().toISOString().split('T')[0] });
  };

  // Add Teacher
  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!teacherForm.name) return;
    const newT = { id: Date.now(), ...teacherForm };
    setTeachers(prev => [...prev, newT]);
    logAction(`Novo professor cadastrado: ${newT.name}`);
    setShowNewTeacherModal(false);
    setTeacherForm({ name: '', cpf: '', email: '', phone: '', pixKey: '', birthDate: '' });
  };

  // Add Course
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseForm.name) return;
    const newC = { id: Date.now(), ...courseForm };
    setBaseCourses(prev => [...prev, newC]);
    logAction(`Novo curso base cadastrado: ${newC.name}`);
    setShowNewCourseModal(false);
    setCourseForm({ name: '', workload: '', description: '', teacherAssignments: [] });
  };

  // Add Cohort
  const handleAddCohort = (e) => {
    e.preventDefault();
    if (!cohortForm.baseCourseId) return;
    const course = baseCourses.find(c => c.id === Number(cohortForm.baseCourseId));
    const newCoh = {
      id: Date.now(),
      baseCourseId: Number(cohortForm.baseCourseId),
      code: cohortForm.code || `TURMA-${Date.now().toString().slice(-4)}`,
      startDate: cohortForm.startDate,
      schedule: cohortForm.schedule,
      basePrice: Number(cohortForm.basePrice) || 0,
      status: 'Aberto'
    };
    setCohorts(prev => [...prev, newCoh]);
    logAction(`Nova turma criada: ${newCoh.code} (${course?.name || ''})`);
    setShowNewCohortModal(false);
    setCohortForm({ baseCourseId: '', code: '', startDate: '', schedule: '', basePrice: '' });
  };

  // Toggle Enrollment Suspension
  const handleToggleSuspendEnrollment = (enrollmentId) => {
    setEnrollments(prev => prev.map(e => {
      if (e.id === enrollmentId) {
        const newStatus = e.status === 'suspended' ? 'active' : 'suspended';
        logAction(`Status de matrícula #${e.id} alterado para: ${newStatus}`);
        return { ...e, status: newStatus };
      }
      return e;
    }));
  };

  // Toggle Installment Payment Status
  const handlePayInstallment = (instId) => {
    setInstallments(prev => prev.map(inst => {
      if (inst.id === instId) {
        const newStatus = inst.status === 'paid' ? 'pending' : 'paid';
        logAction(`Parcela #${inst.id} marcada como: ${newStatus}`);
        return { ...inst, status: newStatus, paidDate: newStatus === 'paid' ? new Date().toLocaleDateString('pt-BR') : null };
      }
      return inst;
    }));
  };

  // Cancel Installment Status
  const handleCancelInstallment = (instId) => {
    setInstallments(prev => prev.map(inst => {
      if (inst.id === instId) {
        logAction(`Parcela #${inst.id} cancelada devido à alteração de contrato/desistência.`);
        return { ...inst, status: 'cancelled' };
      }
      return inst;
    }));
  };

  // Teacher Payout
  const handleRegisterPayout = (teacherId, cohortId, amount) => {
    if (!amount || amount <= 0) return;
    const newPayout = {
      id: Date.now(),
      teacherId,
      cohortId,
      amount: Number(amount),
      date: new Date().toLocaleDateString('pt-BR')
    };
    setTeacherPayouts(prev => [...prev, newPayout]);
    logAction(`Repasse de R$ ${amount} registrado para o professor ID #${teacherId}`);
  };

  // Filtered Installments Sorted by Due Date
  const filteredInstallments = installments
    .filter(inst => {
      const enr = enrollments.find(e => e.id === inst.enrollmentId);
      if (!enr) return false;
      const stu = students.find(s => s.id === enr.studentId);
      const coh = cohorts.find(c => c.id === enr.cohortId);

      if (finFilterStudent && stu && !stu.name.toLowerCase().includes(finFilterStudent.toLowerCase())) return false;
      if (finFilterCohort && coh && coh.id !== Number(finFilterCohort)) return false;
      if (finFilterDateStart && inst.dueDate < finFilterDateStart) return false;
      if (finFilterDateEnd && inst.dueDate > finFilterDateEnd) return false;

      return true;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Overdue alert total
  const overdueTotal = installments
    .filter(i => i.status === 'pending' && new Date(i.dueDate) < new Date())
    .reduce((acc, i) => acc + Number(i.value), 0);

  const birthdaysToday = getTodayBirthdays();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Header Bar */}
      <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg font-bold text-xl tracking-wider text-white shadow-inner">
              ❖ MERKABA
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-none">Merkaba ERP Educacional</h1>
              <span className="text-xs text-indigo-300">Ambiente de Testes e Homologação</span>
            </div>
          </div>
          <button
            onClick={() => setShowQuickEnrollModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2 transition shadow"
          >
            <Plus className="w-4 h-4" />
            <span>+ Matrícula Rápida</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-xl shadow-sm border border-slate-200 p-4 shrink-0 flex flex-col space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase px-3 pb-2">Menu Principal</div>
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <IconUsers className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'students' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <div className="flex items-center space-x-3">
              <IconGraduation className="w-5 h-5" />
              <span>Alunos & Visão 360°</span>
            </div>
            <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full">{students.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('teachers')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'teachers' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <div className="flex items-center space-x-3">
              <IconUsers className="w-5 h-5" />
              <span>Professores & PIX</span>
            </div>
            <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full">{teachers.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'courses' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <div className="flex items-center space-x-3">
              <IconBook className="w-5 h-5" />
              <span>Cursos & Turmas</span>
            </div>
            <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full">{cohorts.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('finance')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'finance' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <div className="flex items-center space-x-3">
              <IconDollar className="w-5 h-5" />
              <span>Financeiro</span>
            </div>
            {overdueTotal > 0 && <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">!</span>}
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'payouts' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <IconDollar className="w-5 h-5 text-emerald-600" />
            <span>Repasses a Docentes</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'audit' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <IconShield className="w-5 h-5" />
            <span>Auditoria ADM</span>
          </button>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden">
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Painel Geral da Instituição</h2>
                <span className="text-xs bg-indigo-100 text-indigo-800 font-medium px-2.5 py-1 rounded-full">Ambiente de Testes Ativo</span>
              </div>

              {/* Birthday Banner if any */}
              {birthdaysToday.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
                  <IconCake className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900">Aniversariantes do Dia! 🎂</h4>
                    <p className="text-sm text-amber-800">
                      Parabéns aos aniversariantes hoje: {birthdaysToday.map(b => `${b.name} (${b.type})`).join(', ')}.
                    </p>
                  </div>
                </div>
              )}

              {/* Overdue Alert Banner */}
              {overdueTotal > 0 && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-rose-900">Alerta de Inadimplência</h4>
                      <p className="text-sm text-rose-800">Existem parcelas vencidas que somam <strong>R$ {overdueTotal.toFixed(2)}</strong>.</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('finance')} className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                    Cobrar Alunos
                  </button>
                </div>
              )}

              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500 uppercase">Total de Alunos</span>
                  <div className="text-2xl font-bold text-slate-800 mt-1">{students.length}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500 uppercase">Professores Cadastrados</span>
                  <div className="text-2xl font-bold text-slate-800 mt-1">{teachers.length}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500 uppercase">Turmas Ativas</span>
                  <div className="text-2xl font-bold text-slate-800 mt-1">{cohorts.filter(c => c.status === 'Aberto').length}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500 uppercase">Entradas Recebidas</span>
                  <div className="text-2xl font-bold text-emerald-600 mt-1">
                    R$ {installments.filter(i => i.status === 'paid').reduce((acc, i) => acc + Number(i.value), 0).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-sm font-bold text-slate-700 uppercase mb-3">Atalhos Rápidos de Gestão</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button onClick={() => setShowQuickEnrollModal(true)} className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-left text-sm font-semibold transition border border-indigo-200">
                    + Matrícula Rápida
                  </button>
                  <button onClick={() => setShowNewStudentModal(true)} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-left text-sm font-semibold transition">
                    + Novo Aluno
                  </button>
                  <button onClick={() => setShowNewTeacherModal(true)} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-left text-sm font-semibold transition">
                    + Novo Professor
                  </button>
                  <button onClick={() => setShowNewCohortModal(true)} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-left text-sm font-semibold transition">
                    + Abrir Nova Turma
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STUDENTS TAB */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Alunos Cadastrados</h2>
                <button onClick={() => setShowNewStudentModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-2 rounded-lg flex items-center space-x-1">
                  <Plus className="w-4 h-4" /> <span>Novo Aluno</span>
                </button>
              </div>

              {students.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <IconGraduation className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 font-medium">Nenhum aluno cadastrado no ambiente de testes.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Nome</th>
                        <th className="p-3">CPF</th>
                        <th className="p-3">Data Nasc.</th>
                        <th className="p-3">Contato</th>
                        <th className="p-3 text-right">Ações & Atalhos</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {students.map(student => (
                        <tr key={student.id} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-indigo-900">{student.name}</td>
                          <td className="p-3 text-slate-600">{student.cpf || 'N/A'}</td>
                          <td className="p-3 text-slate-600">{student.birthDate ? new Date(student.birthDate).toLocaleDateString('pt-BR') : 'N/A'}</td>
                          <td className="p-3 text-slate-600">{student.phone} / {student.email}</td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => setShowStudent360Modal(student)}
                              className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-xs font-semibold border border-indigo-200"
                            >
                              Ficha 360° / Fin.
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TEACHERS TAB */}
          {activeTab === 'teachers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Docentes & Professores</h2>
                <button onClick={() => setShowNewTeacherModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-2 rounded-lg flex items-center space-x-1">
                  <Plus className="w-4 h-4" /> <span>Novo Professor</span>
                </button>
              </div>

              {teachers.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <IconUsers className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 font-medium">Nenhum professor cadastrado.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Nome</th>
                        <th className="p-3">Data Nasc.</th>
                        <th className="p-3">Chave PIX</th>
                        <th className="p-3">Contato</th>
                        <th className="p-3 text-right">Atalhos de Gestão</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {teachers.map(teacher => (
                        <tr key={teacher.id} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-800">{teacher.name}</td>
                          <td className="p-3 text-slate-600">{teacher.birthDate ? new Date(teacher.birthDate).toLocaleDateString('pt-BR') : 'N/A'}</td>
                          <td className="p-3 text-slate-600 font-mono text-xs">{teacher.pixKey || 'N/A'}</td>
                          <td className="p-3 text-slate-600">{teacher.phone}</td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => {
                                setRepFilterTeacher(teacher.id);
                                setActiveTab('payouts');
                              }}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-xs font-semibold border border-emerald-200"
                            >
                              Ver Repasses
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* COURSES & COHORTS TAB */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              {/* Courses Section */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-slate-800">1. Catálogo de Cursos Base</h2>
                  <button onClick={() => setShowNewCourseModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center space-x-1">
                    <Plus className="w-3.5 h-3.5" /> <span>Novo Curso Base</span>
                  </button>
                </div>

                {baseCourses.length === 0 ? (
                  <p className="text-slate-400 text-xs italic">Nenhum curso base cadastrado.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {baseCourses.map(course => (
                      <div key={course.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50">
                        <h4 className="font-bold text-indigo-900 text-sm">{course.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Carga Horária: {course.workload}h</p>
                        <div className="mt-2 text-right">
                          <button
                            onClick={() => setCohortCourseFilter(course.id)}
                            className="text-xs text-indigo-600 hover:underline font-semibold"
                          >
                            Ver Turmas Vinculadas →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cohorts Section */}
              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">2. Turmas Abertas & Concluídas</h2>
                    {cohortCourseFilter && (
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        Filtrado por Curso Base ID #{cohortCourseFilter}{' '}
                        <button onClick={() => setCohortCourseFilter('')} className="ml-1 font-bold">×</button>
                      </span>
                    )}
                  </div>
                  <button onClick={() => setShowNewCohortModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center space-x-1">
                    <Plus className="w-3.5 h-3.5" /> <span>Abrir Turma</span>
                  </button>
                </div>

                {cohorts.length === 0 ? (
                  <p className="text-slate-400 text-xs italic">Nenhuma turma cadastrada.</p>
                ) : (
                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Código Turma</th>
                          <th className="p-3">Curso Base</th>
                          <th className="p-3">Preço Base</th>
                          <th className="p-3">Matriculados</th>
                          <th className="p-3 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {cohorts
                          .filter(c => !cohortCourseFilter || c.baseCourseId === Number(cohortCourseFilter))
                          .map(cohort => {
                            const course = baseCourses.find(bc => bc.id === cohort.baseCourseId);
                            const count = enrollments.filter(e => e.cohortId === cohort.id).length;
                            return (
                              <tr key={cohort.id} className="hover:bg-slate-50">
                                <td className="p-3 font-bold text-indigo-900">{cohort.code}</td>
                                <td className="p-3 text-slate-700">{course?.name || 'Não informado'}</td>
                                <td className="p-3 text-slate-700">R$ {Number(cohort.basePrice).toFixed(2)}</td>
                                <td className="p-3"><span className="bg-slate-200 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-full">{count} alunos</span></td>
                                <td className="p-3 text-right space-x-2">
                                  <button
                                    onClick={() => {
                                      setFinFilterCohort(cohort.id);
                                      setActiveTab('finance');
                                    }}
                                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold"
                                  >
                                    Ver Financeiro
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FINANCE TAB */}
          {activeTab === 'finance' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Controle Financeiro de Parcela & Mensalidades</h2>
              </div>

              {/* Filters Box */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Filtrar por Aluno</label>
                  <input
                    type="text"
                    placeholder="Nome do aluno..."
                    value={finFilterStudent}
                    onChange={e => setFinFilterStudent(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Filtrar por Turma</label>
                  <select
                    value={finFilterCohort}
                    onChange={e => setFinFilterCohort(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  >
                    <option value="">Todas as Turmas</option>
                    {cohorts.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Data Início Vencimento</label>
                  <input
                    type="date"
                    value={finFilterDateStart}
                    onChange={e => setFinFilterDateStart(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Data Fim Vencimento</label>
                  <input
                    type="date"
                    value={finFilterDateEnd}
                    onChange={e => setFinFilterDateEnd(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              {/* Installment Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Vencimento ↑</th>
                      <th className="p-3">Aluno</th>
                      <th className="p-3">Turma</th>
                      <th className="p-3">Parcela</th>
                      <th className="p-3">Valor</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredInstallments.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="p-6 text-center text-slate-400">Nenhum lançamento financeiro encontrado com os filtros selecionados.</td>
                      </tr>
                    ) : (
                      filteredInstallments.map(inst => {
                        const enr = enrollments.find(e => e.id === inst.enrollmentId);
                        const stu = students.find(s => s.id === enr?.studentId);
                        const coh = cohorts.find(c => c.id === enr?.cohortId);

                        return (
                          <tr key={inst.id} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-slate-800">{new Date(inst.dueDate).toLocaleDateString('pt-BR')}</td>
                            <td className="p-3 text-indigo-900 font-medium">{stu?.name || 'N/A'}</td>
                            <td className="p-3 text-slate-600">{coh?.code || 'N/A'}</td>
                            <td className="p-3 text-slate-600">{inst.number}/{inst.totalParts}</td>
                            <td className="p-3 font-bold text-slate-800">R$ {Number(inst.value).toFixed(2)}</td>
                            <td className="p-3">
                              {inst.status === 'paid' && <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">Pago</span>}
                              {inst.status === 'pending' && <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">Pendente</span>}
                              {inst.status === 'cancelled' && <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2.5 py-0.5 rounded-full">Cancelado</span>}
                            </td>
                            <td className="p-3 text-right space-x-2">
                              {inst.status !== 'cancelled' && (
                                <>
                                  <button
                                    onClick={() => handlePayInstallment(inst.id)}
                                    className={`px-2.5 py-1 rounded text-xs font-semibold ${inst.status === 'paid' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                                  >
                                    {inst.status === 'paid' ? 'Desfazer Pago' : 'Marcar Pago'}
                                  </button>
                                  <button
                                    onClick={() => handleCancelInstallment(inst.id)}
                                    className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-xs font-semibold border border-rose-200"
                                  >
                                    Cancelar
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAYOUTS TAB */}
          {activeTab === 'payouts' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Extrato Detalhado de Repasses Docentes</h2>
              </div>

              {/* Filters */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Filtrar por Professor</label>
                  <select
                    value={repFilterTeacher}
                    onChange={e => setRepFilterTeacher(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  >
                    <option value="">Todos os Professores</option>
                    {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Filtrar por Turma</label>
                  <select
                    value={repFilterCohort}
                    onChange={e => setRepFilterCohort(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  >
                    <option value="">Todas as Turmas</option>
                    {cohorts.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
                  </select>
                </div>
              </div>

              {/* Payout Summary per Teacher */}
              <div className="space-y-3">
                {teachers
                  .filter(t => !repFilterTeacher || t.id === Number(repFilterTeacher))
                  .map(teacher => {
                    const teacherPayoutsList = teacherPayouts.filter(p => p.teacherId === teacher.id);
                    const totalPaid = teacherPayoutsList.reduce((acc, p) => acc + p.amount, 0);

                    return (
                      <div key={teacher.id} className="border border-slate-200 rounded-xl p-4 bg-white">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h3 className="font-bold text-slate-800 text-base">{teacher.name}</h3>
                            <span className="text-xs text-slate-500">Chave PIX: {teacher.pixKey || 'Não cadastrada'}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-slate-500 block">Total Repassado</span>
                            <span className="text-lg font-bold text-emerald-600">R$ {totalPaid.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Recent Payouts Table */}
                        <div className="mt-3 bg-slate-50 rounded-lg p-2 text-xs">
                          <span className="font-semibold text-slate-600 block mb-1">Histórico de Lançamentos de Repasse:</span>
                          {teacherPayoutsList.length === 0 ? (
                            <p className="text-slate-400 italic">Nenhum repasse efetuado ainda.</p>
                          ) : (
                            <ul className="divide-y divide-slate-200">
                              {teacherPayoutsList.map(p => {
                                const coh = cohorts.find(c => c.id === p.cohortId);
                                return (
                                  <li key={p.id} className="py-1 flex justify-between">
                                    <span>Data: {p.date} - Turma: {coh?.code || 'N/A'}</span>
                                    <span className="font-bold text-slate-800">R$ {p.amount.toFixed(2)}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* AUDIT LOG TAB */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Trilha de Auditoria & Segurança</h2>
              <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs max-h-96 overflow-y-auto space-y-2">
                {auditLogs.map(log => (
                  <div key={log.id} className="border-b border-slate-800 pb-1">
                    <span className="text-emerald-400">[{log.timestamp}]</span> <span className="text-amber-300">[{log.user}]</span>: {log.action}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* QUICK ENROLL MODAL */}
      {showQuickEnrollModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Matrícula Rápida & Forma de Pagamento</h3>
              <button onClick={() => setShowQuickEnrollModal(false)} className="text-slate-400 hover:text-slate-600">×</button>
            </div>

            <form onSubmit={handleQuickEnroll} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo do Aluno *</label>
                <input
                  type="text"
                  required
                  value={quickForm.name}
                  onChange={e => setQuickForm({ ...quickForm, name: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={quickForm.email}
                    onChange={e => setQuickForm({ ...quickForm, email: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Data Nascimento</label>
                  <input
                    type="date"
                    value={quickForm.birthDate}
                    onChange={e => setQuickForm({ ...quickForm, birthDate: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Selecione a Turma *</label>
                <select
                  required
                  value={quickForm.cohortId}
                  onChange={e => setQuickForm({ ...quickForm, cohortId: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                >
                  <option value="">-- Selecione uma turma --</option>
                  {cohorts.map(c => <option key={c.id} value={c.id}>{c.code} (Base: R$ {c.basePrice})</option>)}
                </select>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Forma de Pagamento</label>
                <select
                  value={quickForm.paymentMethod}
                  onChange={e => setQuickForm({ ...quickForm, paymentMethod: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg mb-2"
                >
                  <option value="PIX">PIX</option>
                  <option value="Cartão de Crédito/Débito">Cartão de Crédito / Débito</option>
                  <option value="Boleto Bancário">Boleto Bancário</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>

                <div className="flex space-x-4 my-2">
                  <label className="flex items-center space-x-1.5 text-xs font-medium">
                    <input
                      type="radio"
                      name="ptype"
                      checked={quickForm.paymentType === 'vista'}
                      onChange={() => setQuickForm({ ...quickForm, paymentType: 'vista', installmentsCount: 1 })}
                    />
                    <span>Pagamento à Vista</span>
                  </label>
                  <label className="flex items-center space-x-1.5 text-xs font-medium">
                    <input
                      type="radio"
                      name="ptype"
                      checked={quickForm.paymentType === 'parcelado'}
                      onChange={() => setQuickForm({ ...quickForm, paymentType: 'parcelado', installmentsCount: 2 })}
                    />
                    <span>Pagamento Parcelado</span>
                  </label>
                </div>

                {quickForm.paymentType === 'parcelado' && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <label className="block text-xs text-slate-600">Nº de Parcelas</label>
                      <input
                        type="number"
                        min="2"
                        max="24"
                        value={quickForm.installmentsCount}
                        onChange={e => setQuickForm({ ...quickForm, installmentsCount: e.target.value })}
                        className="w-full p-1.5 border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600">1º Vencimento</label>
                      <input
                        type="date"
                        value={quickForm.dueDate}
                        onChange={e => setQuickForm({ ...quickForm, dueDate: e.target.value })}
                        className="w-full p-1.5 border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowQuickEnrollModal(false)} className="px-4 py-2 border rounded-lg text-slate-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg">Confirmar Matrícula</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT 360 MODAL */}
      {showStudent360Modal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Ficha 360° do Aluno</h3>
                <p className="text-xs text-slate-500">{showStudent360Modal.name} (CPF: {showStudent360Modal.cpf})</p>
              </div>
              <button onClick={() => setShowStudent360Modal(null)} className="text-slate-400 hover:text-slate-600">×</button>
            </div>

            {/* Enrolled Cohorts */}
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-bold text-slate-700 border-b pb-1 mb-2">Turmas Matriculadas</h4>
                {enrollments.filter(e => e.studentId === showStudent360Modal.id).length === 0 ? (
                  <p className="text-slate-400 text-xs italic">Nenhuma matrícula ativa.</p>
                ) : (
                  <div className="space-y-2">
                    {enrollments.filter(e => e.studentId === showStudent360Modal.id).map(enr => {
                      const coh = cohorts.find(c => c.id === enr.cohortId);
                      return (
                        <div key={enr.id} className="p-2 border rounded flex justify-between items-center bg-slate-50">
                          <div>
                            <span className="font-semibold text-indigo-900">{coh?.code || 'Turma N/A'}</span>
                            <span className="text-xs text-slate-500 ml-2">(Status Matrícula: {enr.status})</span>
                          </div>
                          <button
                            onClick={() => handleToggleSuspendEnrollment(enr.id)}
                            className={`px-2 py-1 rounded text-xs font-semibold ${enr.status === 'suspended' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}
                          >
                            {enr.status === 'suspended' ? 'Reativar Matrícula' : 'Suspender Matrícula'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Payment History */}
              <div>
                <h4 className="font-bold text-slate-700 border-b pb-1 mb-2">Extrato de Pagamentos</h4>
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="p-2">Vencimento</th>
                        <th className="p-2">Parcela</th>
                        <th className="p-2">Valor</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {installments
                        .filter(i => {
                          const enr = enrollments.find(e => e.id === i.enrollmentId);
                          return enr?.studentId === showStudent360Modal.id;
                        })
                        .map(inst => (
                          <tr key={inst.id}>
                            <td className="p-2">{new Date(inst.dueDate).toLocaleDateString('pt-BR')}</td>
                            <td className="p-2">{inst.number}/{inst.totalParts}</td>
                            <td className="p-2 font-bold">R$ {Number(inst.value).toFixed(2)}</td>
                            <td className="p-2">{inst.status}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW TEACHER MODAL */}
      {showNewTeacherModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Professor</h3>
            <form onSubmit={handleAddTeacher} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo *</label>
                <input required type="text" value={teacherForm.name} onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Data Nascimento</label>
                  <input type="date" value={teacherForm.birthDate} onChange={e => setTeacherForm({ ...teacherForm, birthDate: e.target.value })} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Telefone</label>
                  <input type="text" value={teacherForm.phone} onChange={e => setTeacherForm({ ...teacherForm, phone: e.target.value })} className="w-full p-2 border rounded" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Chave PIX</label>
                <input type="text" value={teacherForm.pixKey} onChange={e => setTeacherForm({ ...teacherForm, pixKey: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewTeacherModal(false)} className="px-3 py-1.5 border rounded">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW COURSE MODAL */}
      {showNewCourseModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Curso Base</h3>
            <form onSubmit={handleAddCourse} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nome do Curso *</label>
                <input required type="text" value={courseForm.name} onChange={e => setCourseForm({ ...courseForm, name: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Carga Horária (horas)</label>
                <input type="number" value={courseForm.workload} onChange={e => setCourseForm({ ...courseForm, workload: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewCourseModal(false)} className="px-3 py-1.5 border rounded">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW COHORT MODAL */}
      {showNewCohortModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Abrir Nova Turma</h3>
            <form onSubmit={handleAddCohort} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Curso Base *</label>
                <select required value={cohortForm.baseCourseId} onChange={e => setCohortForm({ ...cohortForm, baseCourseId: e.target.value })} className="w-full p-2 border rounded">
                  <option value="">-- Selecione o Curso Base --</option>
                  {baseCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Código da Turma (Ex: TURMA-2026-A)</label>
                <input type="text" value={cohortForm.code} onChange={e => setCohortForm({ ...cohortForm, code: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Preço Base do Curso (R$)</label>
                <input type="number" value={cohortForm.basePrice} onChange={e => setCohortForm({ ...cohortForm, basePrice: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewCohortModal(false)} className="px-3 py-1.5 border rounded">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded font-semibold">Criar Turma</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
'''

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code_content)

print("App.jsx created successfully for the test environment.")
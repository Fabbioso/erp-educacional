import React, { useState, useEffect } from 'react';

// Ícones nativos SVG
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
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-1.5-.454M9 6v2m3-2v2m3-2v2M4 11h16a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6a1 1 0 011-1z" /></svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [students, setStudents] = useState(() => JSON.parse(localStorage.getItem('merkaba_students') || '[]'));
  const [teachers, setTeachers] = useState(() => JSON.parse(localStorage.getItem('merkaba_teachers') || '[]'));
  const [baseCourses, setBaseCourses] = useState(() => JSON.parse(localStorage.getItem('merkaba_baseCourses') || '[]'));
  const [cohorts, setCohorts] = useState(() => JSON.parse(localStorage.getItem('merkaba_cohorts') || '[]'));
  const [enrollments, setEnrollments] = useState(() => JSON.parse(localStorage.getItem('merkaba_enrollments') || '[]'));
  const [installments, setInstallments] = useState(() => JSON.parse(localStorage.getItem('merkaba_installments') || '[]'));
  const [teacherPayouts, setTeacherPayouts] = useState(() => JSON.parse(localStorage.getItem('merkaba_teacherPayouts') || '[]'));
  const [auditLogs, setAuditLogs] = useState(() => JSON.parse(localStorage.getItem('merkaba_auditLogs') || '[{"id": 1, "action": "Sistema iniciado (Ambiente de Testes)", "user": "Administrador", "timestamp": "' + new Date().toLocaleString() + '"}]'));

  useEffect(() => { localStorage.setItem('merkaba_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('merkaba_teachers', JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { localStorage.setItem('merkaba_baseCourses', JSON.stringify(baseCourses)); }, [baseCourses]);
  useEffect(() => { localStorage.setItem('merkaba_cohorts', JSON.stringify(cohorts)); }, [cohorts]);
  useEffect(() => { localStorage.setItem('merkaba_enrollments', JSON.stringify(enrollments)); }, [enrollments]);
  useEffect(() => { localStorage.setItem('merkaba_installments', JSON.stringify(installments)); }, [installments]);
  useEffect(() => { localStorage.setItem('merkaba_teacherPayouts', JSON.stringify(teacherPayouts)); }, [teacherPayouts]);
  useEffect(() => { localStorage.setItem('merkaba_auditLogs', JSON.stringify(auditLogs)); }, [auditLogs]);

  // Modais
  const [showQuickEnrollModal, setShowQuickEnrollModal] = useState(false);
  const [showNewStudentModal, setShowNewStudentModal] = useState(false);
  const [showNewTeacherModal, setShowNewTeacherModal] = useState(false);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [showNewCohortModal, setShowNewCohortModal] = useState(false);
  const [showStudent360Modal, setShowStudent360Modal] = useState(null);

  // Filtros
  const [finFilterStudent, setFinFilterStudent] = useState('');
  const [finFilterCohort, setFinFilterCohort] = useState('');
  const [finFilterDateStart, setFinFilterDateStart] = useState('');
  const [finFilterDateEnd, setFinFilterDateEnd] = useState('');

  const [repFilterTeacher, setRepFilterTeacher] = useState('');
  const [repFilterCohort, setRepFilterCohort] = useState('');
  const [cohortCourseFilter, setCohortCourseFilter] = useState('');

  // Formulários
  const [quickForm, setQuickForm] = useState({
    name: '', email: '', phone: '', birthDate: '', cohortId: '', paymentMethod: 'PIX', paymentType: 'vista', installmentsCount: 1, customValue: '', dueDate: new Date().toISOString().split('T')[0]
  });

  const [studentForm, setStudentForm] = useState({ name: '', cpf: '', email: '', phone: '', birthDate: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', cpf: '', email: '', phone: '', pixKey: '', birthDate: '' });
  const [courseForm, setCourseForm] = useState({ name: '', workload: '', description: '' });
  const [cohortForm, setCohortForm] = useState({ baseCourseId: '', code: '', startDate: '', schedule: '', basePrice: '' });

  const logAction = (action) => {
    setAuditLogs(prev => [{ id: Date.now(), action, user: 'Administrador', timestamp: new Date().toLocaleString() }, ...prev]);
  };

  const getTodayBirthdays = () => {
    const today = new Date();
    const currentMonthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const studentBdays = students.filter(s => s.birthDate && s.birthDate.endsWith(currentMonthDay)).map(s => ({ ...s, type: 'Aluno' }));
    const teacherBdays = teachers.filter(t => t.birthDate && t.birthDate.endsWith(currentMonthDay)).map(t => ({ ...t, type: 'Professor' }));
    return [...studentBdays, ...teacherBdays];
  };

  const handleQuickEnroll = (e) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.cohortId) {
      alert('Preencha o nome do aluno e selecione uma turma.');
      return;
    }

    const cohort = cohorts.find(c => c.id === Number(quickForm.cohortId));
    if (!cohort) {
      alert('Turma selecionada não encontrada. Crie uma turma primeiro!');
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

    logAction(`Matrícula realizada para ${newStudent.name} na turma ${cohort.code}`);
    setShowQuickEnrollModal(false);
    setQuickForm({ name: '', email: '', phone: '', birthDate: '', cohortId: '', paymentMethod: 'PIX', paymentType: 'vista', installmentsCount: 1, customValue: '', dueDate: new Date().toISOString().split('T')[0] });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!studentForm.name) return;
    const newS = { id: Date.now(), ...studentForm, registrationDate: new Date().toLocaleDateString('pt-BR') };
    setStudents(prev => [...prev, newS]);
    logAction(`Novo aluno cadastrado: ${newS.name}`);
    setShowNewStudentModal(false);
    setStudentForm({ name: '', cpf: '', email: '', phone: '', birthDate: '' });
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!teacherForm.name) return;
    const newT = { id: Date.now(), ...teacherForm };
    setTeachers(prev => [...prev, newT]);
    logAction(`Novo professor cadastrado: ${newT.name}`);
    setShowNewTeacherModal(false);
    setTeacherForm({ name: '', cpf: '', email: '', phone: '', pixKey: '', birthDate: '' });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseForm.name) return;
    const newC = { id: Date.now(), ...courseForm };
    setBaseCourses(prev => [...prev, newC]);
    logAction(`Novo curso base cadastrado: ${newC.name}`);
    setShowNewCourseModal(false);
    setCourseForm({ name: '', workload: '', description: '' });
  };

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
    logAction(`Nova turma criada: ${newCoh.code}`);
    setShowNewCohortModal(false);
    setCohortForm({ baseCourseId: '', code: '', startDate: '', schedule: '', basePrice: '' });
  };

  const handleToggleSuspendEnrollment = (enrollmentId) => {
    setEnrollments(prev => prev.map(e => {
      if (e.id === enrollmentId) {
        const newStatus = e.status === 'suspended' ? 'active' : 'suspended';
        logAction(`Status da matrícula #${e.id} alterado para: ${newStatus}`);
        return { ...e, status: newStatus };
      }
      return e;
    }));
  };

  const handlePayInstallment = (instId) => {
    setInstallments(prev => prev.map(inst => {
      if (inst.id === instId) {
        const newStatus = inst.status === 'paid' ? 'pending' : 'paid';
        logAction(`Parcela #${inst.id} alterada para: ${newStatus}`);
        return { ...inst, status: newStatus };
      }
      return inst;
    }));
  };

  const handleCancelInstallment = (instId) => {
    setInstallments(prev => prev.map(inst => {
      if (inst.id === instId) {
        logAction(`Parcela #${inst.id} cancelada.`);
        return { ...inst, status: 'cancelled' };
      }
      return inst;
    }));
  };

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

  const overdueTotal = installments
    .filter(i => i.status === 'pending' && new Date(i.dueDate) < new Date())
    .reduce((acc, i) => acc + Number(i.value), 0);

  const birthdaysToday = getTodayBirthdays();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg font-bold text-xl tracking-wider text-white">❖ MERKABA</div>
            <div>
              <h1 className="text-lg font-semibold leading-none">Merkaba ERP Educacional</h1>
              <span className="text-xs text-indigo-300">Ambiente de Testes e Homologação</span>
            </div>
          </div>
          <button
            onClick={() => setShowQuickEnrollModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2 transition shadow"
          >
            <span>+ Matrícula Rápida</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6">
        <aside className="w-full md:w-64 bg-white rounded-xl shadow-sm border border-slate-200 p-4 shrink-0 flex flex-col space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase px-3 pb-2">Menu Principal</div>
          
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
            <IconUsers className="w-5 h-5" /> <span>Dashboard</span>
          </button>

          <button onClick={() => setActiveTab('students')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'students' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><IconGraduation className="w-5 h-5" /><span>Alunos & Visão 360°</span></div>
            <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full">{students.length}</span>
          </button>

          <button onClick={() => setActiveTab('teachers')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'teachers' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><IconUsers className="w-5 h-5" /><span>Professores & PIX</span></div>
            <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full">{teachers.length}</span>
          </button>

          <button onClick={() => setActiveTab('courses')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'courses' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><IconBook className="w-5 h-5" /><span>Cursos & Turmas</span></div>
            <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full">{cohorts.length}</span>
          </button>

          <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'finance' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><IconDollar className="w-5 h-5" /><span>Financeiro</span></div>
            {overdueTotal > 0 && <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">!</span>}
          </button>

          <button onClick={() => setActiveTab('payouts')} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'payouts' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
            <IconDollar className="w-5 h-5 text-emerald-600" /> <span>Repasses a Docentes</span>
          </button>

          <button onClick={() => setActiveTab('audit')} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'audit' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
            <IconShield className="w-5 h-5" /> <span>Auditoria ADM</span>
          </button>
        </aside>

        <main className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Painel Geral da Instituição</h2>
                <span className="text-xs bg-indigo-100 text-indigo-800 font-medium px-2.5 py-1 rounded-full">Ambiente de Testes Ativo</span>
              </div>

              {birthdaysToday.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
                  <IconCake className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900">Aniversariantes do Dia! 🎂</h4>
                    <p className="text-sm text-amber-800">Parabéns: {birthdaysToday.map(b => `${b.name} (${b.type})`).join(', ')}.</p>
                  </div>
                </div>
              )}

              {overdueTotal > 0 && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-rose-900">Alerta de Inadimplência</h4>
                    <p className="text-sm text-rose-800">Parcelas vencidas somam <strong>R$ {overdueTotal.toFixed(2)}</strong>.</p>
                  </div>
                  <button onClick={() => setActiveTab('finance')} className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">Ver Cobranças</button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><span className="text-xs font-medium text-slate-500 uppercase">Total de Alunos</span><div className="text-2xl font-bold text-slate-800 mt-1">{students.length}</div></div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><span className="text-xs font-medium text-slate-500 uppercase">Professores</span><div className="text-2xl font-bold text-slate-800 mt-1">{teachers.length}</div></div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><span className="text-xs font-medium text-slate-500 uppercase">Turmas Ativas</span><div className="text-2xl font-bold text-slate-800 mt-1">{cohorts.length}</div></div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><span className="text-xs font-medium text-slate-500 uppercase">Entradas Recebidas</span><div className="text-2xl font-bold text-emerald-600 mt-1">R$ {installments.filter(i => i.status === 'paid').reduce((acc, i) => acc + Number(i.value), 0).toFixed(2)}</div></div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-sm font-bold text-slate-700 uppercase mb-3">Atalhos Rápidos de Gestão</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button onClick={() => setShowQuickEnrollModal(true)} className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-left text-sm font-semibold border border-indigo-200">+ Matrícula Rápida</button>
                  <button onClick={() => setShowNewStudentModal(true)} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-left text-sm font-semibold">+ Novo Aluno</button>
                  <button onClick={() => setShowNewTeacherModal(true)} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-left text-sm font-semibold">+ Novo Professor</button>
                  <button onClick={() => setShowNewCohortModal(true)} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-left text-sm font-semibold">+ Abrir Nova Turma</button>
                </div>
              </div>
            </div>
          )}

          {/* STUDENTS */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-slate-800">Alunos Cadastrados</h2><button onClick={() => setShowNewStudentModal(true)} className="bg-indigo-600 text-white text-sm px-3 py-2 rounded-lg">+ Novo Aluno</button></div>
              {students.length === 0 ? <p className="text-slate-400 text-sm text-center py-8">Nenhum aluno cadastrado no ambiente de testes.</p> : (
                <div className="overflow-x-auto border rounded-xl"><table className="w-full text-left text-sm"><thead className="bg-slate-100"><tr><th className="p-3">Nome</th><th className="p-3">Data Nasc.</th><th className="p-3">Contato</th><th className="p-3 text-right">Ações</th></tr></thead><tbody className="divide-y">{students.map(s => (<tr key={s.id}><td className="p-3 font-semibold">{s.name}</td><td className="p-3">{s.birthDate ? new Date(s.birthDate).toLocaleDateString('pt-BR') : 'N/A'}</td><td className="p-3">{s.phone} / {s.email}</td><td className="p-3 text-right"><button onClick={() => setShowStudent360Modal(s)} className="px-2 py-1 bg-indigo-50 text-indigo-700 border rounded text-xs font-semibold">Ficha 360° / Financeiro</button></td></tr>))}</tbody></table></div>
              )}
            </div>
          )}

          {/* TEACHERS */}
          {activeTab === 'teachers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-slate-800">Docentes & Professores</h2><button onClick={() => setShowNewTeacherModal(true)} className="bg-indigo-600 text-white text-sm px-3 py-2 rounded-lg">+ Novo Professor</button></div>
              {teachers.length === 0 ? <p className="text-slate-400 text-sm text-center py-8">Nenhum professor cadastrado.</p> : (
                <div className="overflow-x-auto border rounded-xl"><table className="w-full text-left text-sm"><thead className="bg-slate-100"><tr><th className="p-3">Nome</th><th className="p-3">Data Nasc.</th><th className="p-3">Chave PIX</th><th className="p-3 text-right">Ações</th></tr></thead><tbody className="divide-y">{teachers.map(t => (<tr key={t.id}><td className="p-3 font-semibold">{t.name}</td><td className="p-3">{t.birthDate ? new Date(t.birthDate).toLocaleDateString('pt-BR') : 'N/A'}</td><td className="p-3 font-mono text-xs">{t.pixKey || 'N/A'}</td><td className="p-3 text-right"><button onClick={() => { setRepFilterTeacher(t.id); setActiveTab('payouts'); }} className="px-2 py-1 bg-emerald-50 text-emerald-700 border rounded text-xs font-semibold">Ver Repasses</button></td></tr>))}</tbody></table></div>
              )}
            </div>
          )}

          {/* COURSES & COHORTS */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3"><h2 className="text-lg font-bold text-slate-800">Cursos Base</h2><button onClick={() => setShowNewCourseModal(true)} className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg">+ Novo Curso Base</button></div>
                {baseCourses.length === 0 ? <p className="text-slate-400 text-xs italic">Nenhum curso cadastrado.</p> : <div className="grid grid-cols-3 gap-3">{baseCourses.map(c => <div key={c.id} className="p-3 border rounded bg-slate-50"><h4 className="font-bold text-indigo-900">{c.name}</h4><p className="text-xs text-slate-500">{c.workload}h</p></div>)}</div>}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3"><h2 className="text-lg font-bold text-slate-800">Turmas Abertas</h2><button onClick={() => setShowNewCohortModal(true)} className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg">+ Abrir Nova Turma</button></div>
                {cohorts.length === 0 ? <p className="text-slate-400 text-xs italic">Nenhuma turma cadastrada.</p> : <div className="border rounded-xl"><table className="w-full text-left text-sm"><thead className="bg-slate-100"><tr><th className="p-3">Código</th><th className="p-3">Preço Base</th></tr></thead><tbody className="divide-y">{cohorts.map(c => <tr key={c.id}><td className="p-3 font-bold">{c.code}</td><td className="p-3">R$ {Number(c.basePrice).toFixed(2)}</td></tr>)}</tbody></table></div>}
              </div>
            </div>
          )}

          {/* FINANCE */}
          {activeTab === 'finance' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Controle Financeiro de Mensalidades</h2>
              
              <div className="bg-slate-50 p-3 rounded-xl border grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Aluno</label>
                  <input type="text" placeholder="Buscar aluno..." value={finFilterStudent} onChange={e => setFinFilterStudent(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Turma</label>
                  <select value={finFilterCohort} onChange={e => setFinFilterCohort(e.target.value)} className="w-full p-2 border rounded">
                    <option value="">Todas as Turmas</option>
                    {cohorts.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Vencimento De</label>
                  <input type="date" value={finFilterDateStart} onChange={e => setFinFilterDateStart(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Vencimento Até</label>
                  <input type="date" value={finFilterDateEnd} onChange={e => setFinFilterDateEnd(e.target.value)} className="w-full p-2 border rounded" />
                </div>
              </div>

              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="p-3">Vencimento ↑</th>
                      <th className="p-3">Aluno</th>
                      <th className="p-3">Parcela</th>
                      <th className="p-3">Valor</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredInstallments.length === 0 ? (
                      <tr><td colSpan="6" className="p-6 text-center text-slate-400">Nenhum lançamento encontrado.</td></tr>
                    ) : (
                      filteredInstallments.map(i => {
                        const enr = enrollments.find(e => e.id === i.enrollmentId);
                        const stu = students.find(s => s.id === enr?.studentId);
                        return (
                          <tr key={i.id} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold">{new Date(i.dueDate).toLocaleDateString('pt-BR')}</td>
                            <td className="p-3 text-indigo-900 font-medium">{stu?.name || 'N/A'}</td>
                            <td className="p-3">{i.number}/{i.totalParts}</td>
                            <td className="p-3 font-bold">R$ {Number(i.value).toFixed(2)}</td>
                            <td className="p-3">
                              {i.status === 'paid' && <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">Pago</span>}
                              {i.status === 'pending' && <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">Pendente</span>}
                              {i.status === 'cancelled' && <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded">Cancelado</span>}
                            </td>
                            <td className="p-3 text-right space-x-1">
                              {i.status !== 'cancelled' && (
                                <>
                                  <button onClick={() => handlePayInstallment(i.id)} className="px-2 py-1 bg-emerald-600 text-white rounded text-xs font-semibold">
                                    {i.status === 'paid' ? 'Desfazer' : 'Marcar Pago'}
                                  </button>
                                  <button onClick={() => handleCancelInstallment(i.id)} className="px-2 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded text-xs font-semibold">
                                    Cancelar Parcela
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

          {/* PAYOUTS */}
          {activeTab === 'payouts' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Extrato Detalhado de Repasses Docentes</h2>
              <div className="space-y-3">
                {teachers.map(t => (
                  <div key={t.id} className="p-4 border rounded-xl bg-white shadow-sm">
                    <h3 className="font-bold text-base text-slate-800">{t.name}</h3>
                    <p className="text-xs text-slate-500">Chave PIX: {t.pixKey || 'Não cadastrada'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AUDIT */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Trilha de Auditoria</h2>
              <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs space-y-1">
                {auditLogs.map(l => <div key={l.id}>[{l.timestamp}] [{l.user}]: {l.action}</div>)}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL MATRÍCULA RÁPIDA COMPLETO */}
      {showQuickEnrollModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Matrícula Rápida & Forma de Pagamento</h3>
              <button onClick={() => setShowQuickEnrollModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">×</button>
            </div>

            <form onSubmit={handleQuickEnroll} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo do Aluno *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: João da Silva"
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
                    placeholder="aluno@email.com"
                    value={quickForm.email}
                    onChange={e => setQuickForm({ ...quickForm, email: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Data de Nascimento</label>
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
                {cohorts.length === 0 && (
                  <p className="text-xs text-rose-600 mt-1">Nenhuma turma criada. Crie uma turma primeiro na aba "Cursos & Turmas".</p>
                )}
              </div>

              <div className="border-t border-slate-200 pt-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Forma de Pagamento *</label>
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
                  <label className="flex items-center space-x-1.5 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="ptype"
                      checked={quickForm.paymentType === 'vista'}
                      onChange={() => setQuickForm({ ...quickForm, paymentType: 'vista', installmentsCount: 1 })}
                    />
                    <span>À Vista</span>
                  </label>
                  <label className="flex items-center space-x-1.5 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="ptype"
                      checked={quickForm.paymentType === 'parcelado'}
                      onChange={() => setQuickForm({ ...quickForm, paymentType: 'parcelado', installmentsCount: 2 })}
                    />
                    <span>Parcelado</span>
                  </label>
                </div>

                {quickForm.paymentType === 'parcelado' && (
                  <div className="grid grid-cols-2 gap-2 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <div>
                      <label className="block text-xs text-slate-600 font-medium">Nº de Parcelas</label>
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
                      <label className="block text-xs text-slate-600 font-medium">1º Vencimento</label>
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

      {/* MODAL NOVO ALUNO */}
      {showNewStudentModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Aluno</h3>
            <form onSubmit={handleAddStudent} className="space-y-3 text-sm">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo *</label><input required type="text" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">CPF</label><input type="text" value={studentForm.cpf} onChange={e => setStudentForm({ ...studentForm, cpf: e.target.value })} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Data Nascimento</label><input type="date" value={studentForm.birthDate} onChange={e => setStudentForm({ ...studentForm, birthDate: e.target.value })} className="w-full p-2 border rounded" /></div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewStudentModal(false)} className="px-3 py-1.5 border rounded">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NOVO PROFESSOR */}
      {showNewTeacherModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Professor</h3>
            <form onSubmit={handleAddTeacher} className="space-y-3 text-sm">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo *</label><input required type="text" value={teacherForm.name} onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Data Nascimento</label><input type="date" value={teacherForm.birthDate} onChange={e => setTeacherForm({ ...teacherForm, birthDate: e.target.value })} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Chave PIX</label><input type="text" value={teacherForm.pixKey} onChange={e => setTeacherForm({ ...teacherForm, pixKey: e.target.value })} className="w-full p-2 border rounded" /></div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewTeacherModal(false)} className="px-3 py-1.5 border rounded">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NOVO CURSO BASE */}
      {showNewCourseModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Curso Base</h3>
            <form onSubmit={handleAddCourse} className="space-y-3 text-sm">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Nome do Curso *</label><input required type="text" value={courseForm.name} onChange={e => setCourseForm({ ...courseForm, name: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Carga Horária (horas)</label><input type="number" value={courseForm.workload} onChange={e => setCourseForm({ ...courseForm, workload: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewCourseModal(false)} className="px-3 py-1.5 border rounded">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NOVA TURMA */}
      {showNewCohortModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Abrir Nova Turma</h3>
            <form onSubmit={handleAddCohort} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Curso Base *</label>
                <select required value={cohortForm.baseCourseId} onChange={e => setCohortForm({ ...cohortForm, baseCourseId: e.target.value })} className="w-full p-2 border rounded">
                  <option value="">-- Selecione o Curso Base --</option>
                  {baseCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Código da Turma (Ex: TURMA-2026-A)</label><input type="text" value={cohortForm.code} onChange={e => setCohortForm({ ...cohortForm, code: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Preço Base (R$)</label><input type="number" value={cohortForm.basePrice} onChange={e => setCohortForm({ ...cohortForm, basePrice: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewCohortModal(false)} className="px-3 py-1.5 border rounded">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded font-semibold">Criar Turma</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FICHA 360 ALUNO */}
      {showStudent360Modal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Ficha 360°: {showStudent360Modal.name}</h3>
              <button onClick={() => setShowStudent360Modal(null)} className="text-slate-400 hover:text-slate-600 font-bold">×</button>
            </div>
            <div className="space-y-3 text-xs">
              <p><strong>Contato:</strong> {showStudent360Modal.phone} | {showStudent360Modal.email}</p>
              <p><strong>Data Nasc:</strong> {showStudent360Modal.birthDate ? new Date(showStudent360Modal.birthDate).toLocaleDateString('pt-BR') : 'N/A'}</p>
              
              <h4 className="font-bold border-b pb-1 mt-3">Turmas e Matrículas</h4>
              {enrollments.filter(e => e.studentId === showStudent360Modal.id).map(enr => {
                const coh = cohorts.find(c => c.id === enr.cohortId);
                return (
                  <div key={enr.id} className="flex justify-between items-center p-2 border rounded bg-slate-50">
                    <span>{coh?.code || 'Turma N/A'} ({enr.status})</span>
                    <button onClick={() => handleToggleSuspendEnrollment(enr.id)} className="px-2 py-1 bg-amber-100 text-amber-800 rounded font-bold">
                      {enr.status === 'suspended' ? 'Reativar' : 'Suspender Matrícula'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
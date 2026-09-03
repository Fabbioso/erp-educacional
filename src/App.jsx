import React, { useState, useEffect } from 'react';

// Icon helper components using native inline SVGs
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

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
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
    return saved ? JSON.parse(saved) : [{ id: 1, action: 'Sistema iniciado (Ambiente de Testes)', user: 'Administrador', timestamp: new Date().toLocaleString() }];
  });

  useEffect(() => { localStorage.setItem('merkaba_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('merkaba_teachers', JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { localStorage.setItem('merkaba_baseCourses', JSON.stringify(baseCourses)); }, [baseCourses]);
  useEffect(() => { localStorage.setItem('merkaba_cohorts', JSON.stringify(cohorts)); }, [cohorts]);
  useEffect(() => { localStorage.setItem('merkaba_enrollments', JSON.stringify(enrollments)); }, [enrollments]);
  useEffect(() => { localStorage.setItem('merkaba_installments', JSON.stringify(installments)); }, [installments]);
  useEffect(() => { localStorage.setItem('merkaba_teacherPayouts', JSON.stringify(teacherPayouts)); }, [teacherPayouts]);
  useEffect(() => { localStorage.setItem('merkaba_auditLogs', JSON.stringify(auditLogs)); }, [auditLogs]);

  const [showQuickEnrollModal, setShowQuickEnrollModal] = useState(false);
  const [showNewStudentModal, setShowNewStudentModal] = useState(false);
  const [showNewTeacherModal, setShowNewTeacherModal] = useState(false);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [showNewCohortModal, setShowNewCohortModal] = useState(false);
  const [showStudent360Modal, setShowStudent360Modal] = useState(null);

  const [finFilterStudent, setFinFilterStudent] = useState('');
  const [finFilterCohort, setFinFilterCohort] = useState('');
  const [finFilterDateStart, setFinFilterDateStart] = useState('');
  const [finFilterDateEnd, setFinFilterDateEnd] = useState('');

  const [repFilterTeacher, setRepFilterTeacher] = useState('');
  const [repFilterCohort, setRepFilterCohort] = useState('');
  const [cohortCourseFilter, setCohortCourseFilter] = useState('');

  const [quickForm, setQuickForm] = useState({
    name: '', email: '', phone: '', birthDate: '', cohortId: '', paymentMethod: 'PIX', paymentType: 'vista', installmentsCount: 1, customValue: '', dueDate: new Date().toISOString().split('T')[0]
  });

  const [teacherForm, setTeacherForm] = useState({ name: '', cpf: '', email: '', phone: '', pixKey: '', birthDate: '' });
  const [courseForm, setCourseForm] = useState({ name: '', workload: '', description: '' });
  const [cohortForm, setCohortForm] = useState({ baseCourseId: '', code: '', startDate: '', schedule: '', basePrice: '' });

  const logAction = (action) => {
    setAuditLogs(prev => [{ id: Date.now(), action, user: 'Administrador (Ambiente de Testes)', timestamp: new Date().toLocaleString() }, ...prev]);
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
    logAction(`Nova turma criada: ${newCoh.code} (${course?.name || ''})`);
    setShowNewCohortModal(false);
    setCohortForm({ baseCourseId: '', code: '', startDate: '', schedule: '', basePrice: '' });
  };

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

  const handlePayInstallment = (instId) => {
    setInstallments(prev => prev.map(inst => {
      if (inst.id === instId) {
        const newStatus = inst.status === 'paid' ? 'pending' : 'paid';
        logAction(`Parcela #${inst.id} marcada como: ${newStatus}`);
        return { ...inst, status: newStatus };
      }
      return inst;
    }));
  };

  const handleCancelInstallment = (instId) => {
    setInstallments(prev => prev.map(inst => {
      if (inst.id === instId) {
        logAction(`Parcela #${inst.id} cancelada devido à alteração de contrato/desistência.`);
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
            <span>+ Matrícula Rápida</span>
          </button>
        </div>
      </header>

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
                    <p className="text-sm text-amber-800">Parabéns aos aniversariantes hoje: {birthdaysToday.map(b => `${b.name} (${b.type})`).join(', ')}.</p>
                  </div>
                </div>
              )}

              {overdueTotal > 0 && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-rose-900">Alerta de Inadimplência</h4>
                    <p className="text-sm text-rose-800">Existem parcelas vencidas que somam <strong>R$ {overdueTotal.toFixed(2)}</strong>.</p>
                  </div>
                  <button onClick={() => setActiveTab('finance')} className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">Cobrar Alunos</button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><span className="text-xs font-medium text-slate-500 uppercase">Total de Alunos</span><div className="text-2xl font-bold text-slate-800 mt-1">{students.length}</div></div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><span className="text-xs font-medium text-slate-500 uppercase">Professores Cadastrados</span><div className="text-2xl font-bold text-slate-800 mt-1">{teachers.length}</div></div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><span className="text-xs font-medium text-slate-500 uppercase">Turmas Ativas</span><div className="text-2xl font-bold text-slate-800 mt-1">{cohorts.filter(c => c.status === 'Aberto').length}</div></div>
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

          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-slate-800">Alunos Cadastrados</h2><button onClick={() => setShowNewStudentModal(true)} className="bg-indigo-600 text-white text-sm px-3 py-2 rounded-lg">+ Novo Aluno</button></div>
              {students.length === 0 ? <p className="text-slate-400 text-sm text-center py-8">Nenhum aluno cadastrado no ambiente de testes.</p> : (
                <div className="overflow-x-auto border rounded-xl"><table className="w-full text-left text-sm"><thead className="bg-slate-100"><tr><th className="p-3">Nome</th><th className="p-3">Contato</th><th className="p-3 text-right">Ações</th></tr></thead><tbody className="divide-y">{students.map(s => (<tr key={s.id}><td className="p-3 font-semibold">{s.name}</td><td className="p-3">{s.phone} / {s.email}</td><td className="p-3 text-right"><button onClick={() => setShowStudent360Modal(s)} className="px-2 py-1 bg-indigo-50 text-indigo-700 border rounded text-xs font-semibold">Ficha 360°</button></td></tr>))}</tbody></table></div>
              )}
            </div>
          )}

          {activeTab === 'teachers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-slate-800">Docentes & Professores</h2><button onClick={() => setShowNewTeacherModal(true)} className="bg-indigo-600 text-white text-sm px-3 py-2 rounded-lg">+ Novo Professor</button></div>
              {teachers.length === 0 ? <p className="text-slate-400 text-sm text-center py-8">Nenhum professor cadastrado.</p> : (
                <div className="overflow-x-auto border rounded-xl"><table className="w-full text-left text-sm"><thead className="bg-slate-100"><tr><th className="p-3">Nome</th><th className="p-3">PIX</th><th className="p-3 text-right">Ações</th></tr></thead><tbody className="divide-y">{teachers.map(t => (<tr key={t.id}><td className="p-3 font-semibold">{t.name}</td><td className="p-3">{t.pixKey || 'N/A'}</td><td className="p-3 text-right"><button onClick={() => { setRepFilterTeacher(t.id); setActiveTab('payouts'); }} className="px-2 py-1 bg-emerald-50 text-emerald-700 border rounded text-xs font-semibold">Ver Repasses</button></td></tr>))}</tbody></table></div>
              )}
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3"><h2 className="text-lg font-bold text-slate-800">Cursos Base</h2><button onClick={() => setShowNewCourseModal(true)} className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg">+ Novo Curso</button></div>
                {baseCourses.length === 0 ? <p className="text-slate-400 text-xs italic">Nenhum curso cadastrado.</p> : <div className="grid grid-cols-3 gap-3">{baseCourses.map(c => <div key={c.id} className="p-3 border rounded bg-slate-50"><h4 className="font-bold text-indigo-900">{c.name}</h4><p className="text-xs text-slate-500">{c.workload}h</p></div>)}</div>}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3"><h2 className="text-lg font-bold text-slate-800">Turmas</h2><button onClick={() => setShowNewCohortModal(true)} className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg">+ Abrir Turma</button></div>
                {cohorts.length === 0 ? <p className="text-slate-400 text-xs italic">Nenhuma turma cadastrada.</p> : <div className="border rounded-xl"><table className="w-full text-left text-sm"><thead className="bg-slate-100"><tr><th className="p-3">Código</th><th className="p-3">Preço</th></tr></thead><tbody className="divide-y">{cohorts.map(c => <tr key={c.id}><td className="p-3 font-bold">{c.code}</td><td className="p-3">R$ {c.basePrice}</td></tr>)}</tbody></table></div>}
              </div>
            </div>
          )}

          {activeTab === 'finance' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Controle Financeiro</h2>
              <div className="overflow-x-auto border rounded-xl"><table className="w-full text-left text-sm"><thead className="bg-slate-100"><tr><th className="p-3">Vencimento</th><th className="p-3">Valor</th><th className="p-3">Status</th><th className="p-3 text-right">Ações</th></tr></thead><tbody className="divide-y">{filteredInstallments.map(i => (<tr key={i.id}><td className="p-3">{i.dueDate}</td><td className="p-3 font-bold">R$ {i.value}</td><td className="p-3">{i.status}</td><td className="p-3 text-right space-x-1"><button onClick={() => handlePayInstallment(i.id)} className="px-2 py-1 bg-emerald-600 text-white rounded text-xs">Marcar Pago</button><button onClick={() => handleCancelInstallment(i.id)} className="px-2 py-1 bg-rose-50 text-rose-700 border rounded text-xs">Cancelar</button></td></tr>))}</tbody></table></div>
            </div>
          )}

          {activeTab === 'payouts' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Extrato de Repasses Docentes</h2>
              <div className="space-y-3">{teachers.map(t => <div key={t.id} className="p-3 border rounded"><h4 className="font-bold">{t.name}</h4></div>)}</div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Trilha de Auditoria</h2>
              <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs space-y-1">{auditLogs.map(l => <div key={l.id}>[{l.timestamp}] {l.action}</div>)}</div>
            </div>
          )}
        </main>
      </div>

      {showQuickEnrollModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">Matrícula Rápida</h3><button onClick={() => setShowQuickEnrollModal(false)}>×</button></div>
            <form onSubmit={handleQuickEnroll} className="space-y-3 text-sm">
              <div><label className="block text-xs font-semibold mb-1">Nome *</label><input required type="text" value={quickForm.name} onChange={e => setQuickForm({ ...quickForm, name: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-xs font-semibold mb-1">Turma *</label><select required value={quickForm.cohortId} onChange={e => setQuickForm({ ...quickForm, cohortId: e.target.value })} className="w-full p-2 border rounded"><option value="">-- Selecione --</option>{cohorts.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}</select></div>
              <div className="pt-3 flex justify-end space-x-2"><button type="button" onClick={() => setShowQuickEnrollModal(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded font-semibold">Salvar</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
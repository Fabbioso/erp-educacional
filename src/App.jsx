import React, { useState, useEffect } from 'react';

// Componentes de Ícones em SVG Nativo
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
  const [auditLogs, setAuditLogs] = useState(() => JSON.parse(localStorage.getItem('merkaba_auditLogs') || '[]'));

  useEffect(() => { localStorage.setItem('merkaba_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('merkaba_teachers', JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { localStorage.setItem('merkaba_baseCourses', JSON.stringify(baseCourses)); }, [baseCourses]);
  useEffect(() => { localStorage.setItem('merkaba_cohorts', JSON.stringify(cohorts)); }, [cohorts]);
  useEffect(() => { localStorage.setItem('merkaba_enrollments', JSON.stringify(enrollments)); }, [enrollments]);
  useEffect(() => { localStorage.setItem('merkaba_installments', JSON.stringify(installments)); }, [installments]);
  useEffect(() => { localStorage.setItem('merkaba_auditLogs', JSON.stringify(auditLogs)); }, [auditLogs]);

  // Modais de Criação
  const [showQuickEnrollModal, setShowQuickEnrollModal] = useState(false);
  const [showNewStudentModal, setShowNewStudentModal] = useState(false);
  const [showNewTeacherModal, setShowNewTeacherModal] = useState(false);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [showNewCohortModal, setShowNewCohortModal] = useState(false);
  
  // Modais de Edição
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingCohort, setEditingCohort] = useState(null);

  // Modais de Atalhos Rápidos
  const [selectedStudentFor360, setSelectedStudentFor360] = useState(null);
  const [selectedCohortForStudents, setSelectedCohortForStudents] = useState(null);
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('');

  // Filtros Financeiros (Etapa 3)
  const [finFilterStudent, setFinFilterStudent] = useState('');
  const [finFilterCohort, setFinFilterCohort] = useState('');
  const [finFilterDateStart, setFinFilterDateStart] = useState('');
  const [finFilterDateEnd, setFinFilterDateEnd] = useState('');

  // Formulários de Criação
  const [studentForm, setStudentForm] = useState({ name: '', cpf: '', email: '', phone: '', birthDate: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', cpf: '', email: '', phone: '', pixKey: '', birthDate: '' });
  const [courseForm, setCourseForm] = useState({ name: '', workload: '', description: '' });
  const [cohortForm, setCohortForm] = useState({ baseCourseId: '', code: '', startDate: '', basePrice: '' });
  const [quickForm, setQuickForm] = useState({
    studentId: '', cohortId: '', paymentMethod: 'PIX', paymentType: 'vista', installmentsCount: 1, customValue: '', dueDate: new Date().toISOString().split('T')[0]
  });

  const logAction = (action) => {
    setAuditLogs(prev => [{ id: Date.now(), action, user: 'Administrador', timestamp: new Date().toLocaleString() }, ...prev]);
  };

  const getTodayBirthdays = () => {
    const today = new Date();
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    const currentDay = String(today.getDate()).padStart(2, '0');
    const target = `-${currentMonth}-${currentDay}`;

    const studentBdays = students.filter(s => s.birthDate && s.birthDate.endsWith(target)).map(s => ({ name: s.name, type: 'Aluno' }));
    const teacherBdays = teachers.filter(t => t.birthDate && t.birthDate.endsWith(target)).map(s => ({ name: t.name, type: 'Professor' }));

    return [...studentBdays, ...teacherBdays];
  };

  const birthdaysToday = getTodayBirthdays();

  // --- HANDLERS DE ALUNO ---
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!studentForm.name) return;
    const newStudent = { id: Date.now(), ...studentForm, registrationDate: new Date().toLocaleDateString('pt-BR') };
    setStudents(prev => [...prev, newStudent]);
    logAction(`Novo aluno cadastrado: ${newStudent.name}`);
    setShowNewStudentModal(false);
    setStudentForm({ name: '', cpf: '', email: '', phone: '', birthDate: '' });
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    setStudents(prev => prev.map(s => s.id === editingStudent.id ? editingStudent : s));
    logAction(`Cadastro do aluno atualizado: ${editingStudent.name}`);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      const stu = students.find(s => s.id === id);
      setStudents(prev => prev.filter(s => s.id !== id));
      setEnrollments(prev => prev.filter(e => e.studentId !== id));
      logAction(`Aluno excluído: ${stu?.name || id}`);
    }
  };

  // --- HANDLERS DE PROFESSOR ---
  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!teacherForm.name) return;
    const newTeacher = { id: Date.now(), ...teacherForm };
    setTeachers(prev => [...prev, newTeacher]);
    logAction(`Novo professor cadastrado: ${newTeacher.name}`);
    setShowNewTeacherModal(false);
    setTeacherForm({ name: '', cpf: '', email: '', phone: '', pixKey: '', birthDate: '' });
  };

  const handleUpdateTeacher = (e) => {
    e.preventDefault();
    setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? editingTeacher : t));
    logAction(`Cadastro do professor atualizado: ${editingTeacher.name}`);
    setEditingTeacher(null);
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este professor?')) {
      const tea = teachers.find(t => t.id === id);
      setTeachers(prev => prev.filter(t => t.id !== id));
      logAction(`Professor excluído: ${tea?.name || id}`);
    }
  };

  // --- HANDLERS DE CURSO ---
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseForm.name) return;
    const newCourse = { id: Date.now(), ...courseForm };
    setBaseCourses(prev => [...prev, newCourse]);
    logAction(`Novo curso cadastrado: ${newCourse.name}`);
    setShowNewCourseModal(false);
    setCourseForm({ name: '', workload: '', description: '' });
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    setBaseCourses(prev => prev.map(c => c.id === editingCourse.id ? editingCourse : c));
    logAction(`Curso atualizado: ${editingCourse.name}`);
    setEditingCourse(null);
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este curso base?')) {
      const cou = baseCourses.find(c => c.id === id);
      setBaseCourses(prev => prev.filter(c => c.id !== id));
      logAction(`Curso excluído: ${cou?.name || id}`);
    }
  };

  // --- HANDLERS DE TURMA ---
  const handleAddCohort = (e) => {
    e.preventDefault();
    if (!cohortForm.baseCourseId) return;
    const newCohort = { id: Date.now(), ...cohortForm, baseCourseId: Number(cohortForm.baseCourseId) };
    setCohorts(prev => [...prev, newCohort]);
    logAction(`Nova turma criada: ${newCohort.code}`);
    setShowNewCohortModal(false);
    setCohortForm({ baseCourseId: '', code: '', startDate: '', basePrice: '' });
  };

  const handleUpdateCohort = (e) => {
    e.preventDefault();
    setCohorts(prev => prev.map(c => c.id === editingCohort.id ? { ...editingCohort, baseCourseId: Number(editingCohort.baseCourseId) } : c));
    logAction(`Turma atualizada: ${editingCohort.code}`);
    setEditingCohort(null);
  };

  const handleDeleteCohort = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta turma?')) {
      const coh = cohorts.find(c => c.id === id);
      setCohorts(prev => prev.filter(c => c.id !== id));
      setEnrollments(prev => prev.filter(e => e.cohortId !== id));
      logAction(`Turma excluída: ${coh?.code || id}`);
    }
  };

  // --- HANDLERS DE MATRÍCULA E FINANCEIRO (ETAPA 3) ---
  const handleQuickEnroll = (e) => {
    e.preventDefault();
    if (!quickForm.studentId || !quickForm.cohortId) {
      alert('Selecione um aluno e uma turma.');
      return;
    }

    const cohort = cohorts.find(c => c.id === Number(quickForm.cohortId));
    const student = students.find(s => s.id === Number(quickForm.studentId));

    const newEnr = {
      id: Date.now(),
      studentId: student.id,
      cohortId: cohort.id,
      status: 'active',
      date: new Date().toLocaleDateString('pt-BR')
    };

    const totalValue = Number(quickForm.customValue) || Number(cohort.basePrice) || 1000;
    const newInstallments = [];

    if (quickForm.paymentType === 'vista') {
      newInstallments.push({
        id: Date.now() + 1,
        enrollmentId: newEnr.id,
        number: 1,
        totalParts: 1,
        value: totalValue,
        dueDate: quickForm.dueDate,
        status: 'pending',
        paymentMethod: quickForm.paymentMethod
      });
    } else {
      const parts = Number(quickForm.installmentsCount) || 2;
      const partValue = totalValue / parts;
      const baseDate = new Date(quickForm.dueDate + 'T00:00:00');

      for (let i = 0; i < parts; i++) {
        const d = new Date(baseDate);
        d.setMonth(d.getMonth() + i);
        newInstallments.push({
          id: Date.now() + 1 + i,
          enrollmentId: newEnr.id,
          number: i + 1,
          totalParts: parts,
          value: partValue,
          dueDate: d.toISOString().split('T')[0],
          status: 'pending',
          paymentMethod: quickForm.paymentMethod
        });
      }
    }

    setEnrollments(prev => [...prev, newEnr]);
    setInstallments(prev => [...prev, ...newInstallments]);
    logAction(`Matrícula realizada com financeiro para ${student.name} na turma ${cohort.code}`);
    setShowQuickEnrollModal(false);
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
        logAction(`Status da parcela #${inst.id} alterado para: ${newStatus}`);
        return { ...inst, status: newStatus };
      }
      return inst;
    }));
  };

  const handleCancelInstallment = (instId) => {
    if (window.confirm('Deseja cancelar esta parcela?')) {
      setInstallments(prev => prev.map(inst => {
        if (inst.id === instId) {
          logAction(`Parcela #${inst.id} cancelada.`);
          return { ...inst, status: 'cancelled' };
        }
        return inst;
      }));
    }
  };

  // Lógica de Filtro e Ordenação das Parcelas no Financeiro
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

  // Cálculo de Métricas no Financeiro
  const totalReceived = installments.filter(i => i.status === 'paid').reduce((acc, i) => acc + Number(i.value), 0);
  const totalPending = installments.filter(i => i.status === 'pending').reduce((acc, i) => acc + Number(i.value), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg font-bold text-xl tracking-wider text-white">❖ MERKABA</div>
            <div>
              <h1 className="text-lg font-semibold leading-none">Merkaba ERP Educacional</h1>
              <span className="text-xs text-indigo-300">Modo Operacional</span>
            </div>
          </div>
          <button
            onClick={() => setShowQuickEnrollModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2 transition shadow"
          >
            <span>+ Matrícula Rápida</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6">
        {/* Sidebar */}
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
            <div className="flex items-center space-x-3"><IconDollar className="w-5 h-5" /><span>Financeiro & Repasses</span></div>
            {installments.some(i => i.status === 'pending') && <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">!</span>}
          </button>

          <button onClick={() => setActiveTab('audit')} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'audit' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
            <IconShield className="w-5 h-5" /> <span>Auditoria ADM</span>
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Painel Geral da Instituição</h2>

              {birthdaysToday.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center space-x-3">
                  <IconCake className="w-6 h-6 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-900">Aniversariantes do Dia! 🎂</h4>
                    <p className="text-sm text-amber-800">
                      Parabéns a: {birthdaysToday.map(b => `${b.name} (${b.type})`).join(', ')}.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500 uppercase">Entradas Confirmadas</span>
                  <div className="text-2xl font-bold text-emerald-600 mt-1">R$ {totalReceived.toFixed(2)}</div>
                  <span className="text-xs text-emerald-600 font-medium">✓ Recebido em caixa</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500 uppercase">A Vencer / Previsto</span>
                  <div className="text-2xl font-bold text-amber-600 mt-1">R$ {totalPending.toFixed(2)}</div>
                  <span className="text-xs text-amber-600 font-medium">Parcelas futuras</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500 uppercase">Repasses Devidos</span>
                  <div className="text-2xl font-bold text-slate-800 mt-1">R$ 0,00</div>
                  <span className="text-xs text-indigo-600 font-medium">Base: alunos adimplentes</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500 uppercase">Repasses Pendentes</span>
                  <div className="text-2xl font-bold text-slate-800 mt-1">R$ 0,00</div>
                  <span className="text-xs text-slate-500 font-medium">Aguardando transferência</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-sm font-bold text-slate-700 uppercase mb-3">Atalhos Operacionais</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button onClick={() => setShowQuickEnrollModal(true)} className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-left text-sm font-semibold transition border border-indigo-200">
                    + Nova Matrícula
                  </button>
                  <button onClick={() => setShowNewStudentModal(true)} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-left text-sm font-semibold transition">
                    + Cadastrar Aluno
                  </button>
                  <button onClick={() => setShowNewTeacherModal(true)} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-left text-sm font-semibold transition">
                    + Cadastrar Professor
                  </button>
                  <button onClick={() => setShowNewCohortModal(true)} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-left text-sm font-semibold transition">
                    + Abrir Turma
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ALUNOS */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Alunos Cadastrados</h2>
                <button onClick={() => setShowNewStudentModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-2 rounded-lg">
                  + Cadastrar Aluno
                </button>
              </div>

              {students.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-8">Nenhum aluno cadastrado.</p>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600 font-semibold border-b">
                      <tr>
                        <th className="p-3">Nome</th>
                        <th className="p-3">Data Nasc.</th>
                        <th className="p-3">Contato</th>
                        <th className="p-3 text-right">Ações & Gestão</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {students.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-800">{s.name}</td>
                          <td className="p-3 text-slate-600">{s.birthDate ? new Date(s.birthDate + 'T00:00:00').toLocaleDateString('pt-BR') : 'N/A'}</td>
                          <td className="p-3 text-slate-600">{s.phone} | {s.email}</td>
                          <td className="p-3 text-right space-x-1.5">
                            <button
                              onClick={() => setSelectedStudentFor360(s)}
                              className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-xs font-semibold border border-indigo-200"
                            >
                              Ficha 360°
                            </button>
                            <button
                              onClick={() => setEditingStudent(s)}
                              className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-xs font-semibold border border-amber-200"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(s.id)}
                              className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-xs font-semibold border border-rose-200"
                            >
                              Excluir
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

          {/* PROFESSORES */}
          {activeTab === 'teachers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Docentes & Professores</h2>
                <button onClick={() => setShowNewTeacherModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-2 rounded-lg">
                  + Cadastrar Professor
                </button>
              </div>

              {teachers.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-8">Nenhum professor cadastrado.</p>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600 font-semibold border-b">
                      <tr>
                        <th className="p-3">Nome</th>
                        <th className="p-3">Data Nasc.</th>
                        <th className="p-3">Chave PIX</th>
                        <th className="p-3 text-right">Ações & Gestão</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {teachers.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-800">{t.name}</td>
                          <td className="p-3 text-slate-600">{t.birthDate ? new Date(t.birthDate + 'T00:00:00').toLocaleDateString('pt-BR') : 'N/A'}</td>
                          <td className="p-3 font-mono text-xs text-slate-600">{t.pixKey || 'N/A'}</td>
                          <td className="p-3 text-right space-x-1.5">
                            <button
                              onClick={() => setActiveTab('finance')}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-xs font-semibold border border-emerald-200"
                            >
                              Repasses
                            </button>
                            <button
                              onClick={() => setEditingTeacher(t)}
                              className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-xs font-semibold border border-amber-200"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteTeacher(t.id)}
                              className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-xs font-semibold border border-rose-200"
                            >
                              Excluir
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

          {/* CURSOS & TURMAS */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-slate-800">Cursos Base</h2>
                  <button onClick={() => setShowNewCourseModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-lg">
                    + Novo Curso Base
                  </button>
                </div>
                {baseCourses.length === 0 ? <p className="text-slate-400 text-xs italic">Nenhum curso cadastrado.</p> : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {baseCourses.map(c => (
                      <div key={c.id} className="p-3 border rounded-xl bg-slate-50 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-indigo-900">{c.name}</h4>
                          <p className="text-xs text-slate-500">{c.workload}h</p>
                        </div>
                        <div className="mt-3 pt-2 border-t flex justify-between items-center">
                          <button
                            onClick={() => setSelectedCourseFilter(c.id === selectedCourseFilter ? '' : c.id)}
                            className="text-xs text-indigo-600 hover:underline font-semibold"
                          >
                            {selectedCourseFilter === c.id ? 'Ver Todas' : 'Filtrar Turmas →'}
                          </button>
                          <div className="space-x-1">
                            <button onClick={() => setEditingCourse(c)} className="text-xs text-amber-600 font-semibold px-1.5 py-0.5 rounded hover:bg-amber-50">Editar</button>
                            <button onClick={() => handleDeleteCourse(c.id)} className="text-xs text-rose-600 font-semibold px-1.5 py-0.5 rounded hover:bg-rose-50">Excluir</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-slate-800">Turmas</h2>
                    {selectedCourseFilter && (
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-semibold">
                        Filtrado por Curso
                      </span>
                    )}
                  </div>
                  <button onClick={() => setShowNewCohortModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-lg">
                    + Abrir Turma
                  </button>
                </div>

                {cohorts.length === 0 ? <p className="text-slate-400 text-xs italic">Nenhuma turma cadastrada.</p> : (
                  <div className="border rounded-xl overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="p-3">Código</th>
                          <th className="p-3">Preço Base</th>
                          <th className="p-3">Alunos Matriculados</th>
                          <th className="p-3 text-right">Ações & Atalhos</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {cohorts
                          .filter(c => !selectedCourseFilter || c.baseCourseId === Number(selectedCourseFilter))
                          .map(c => {
                            const enrolledCount = enrollments.filter(e => e.cohortId === c.id).length;
                            return (
                              <tr key={c.id} className="hover:bg-slate-50">
                                <td className="p-3 font-bold text-slate-800">{c.code}</td>
                                <td className="p-3 text-slate-600">R$ {Number(c.basePrice).toFixed(2)}</td>
                                <td className="p-3">
                                  <span className="bg-slate-200 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                    {enrolledCount} alunos
                                  </span>
                                </td>
                                <td className="p-3 text-right space-x-1.5">
                                  <button
                                    onClick={() => setSelectedCohortForStudents(c)}
                                    className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-xs font-semibold border border-indigo-200"
                                  >
                                    Ver Alunos
                                  </button>
                                  <button
                                    onClick={() => setEditingCohort(c)}
                                    className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-xs font-semibold border border-amber-200"
                                  >
                                    Editar
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCohort(c.id)}
                                    className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-xs font-semibold border border-rose-200"
                                  >
                                    Excluir
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

          {/* FINANCEIRO (ETAPA 3 IMPLEMENTADA) */}
          {activeTab === 'finance' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Controle Financeiro de Parcelas & Mensalidades</h2>
              </div>

              {/* Filtros Combinados */}
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
                  <label className="block font-semibold text-slate-600 mb-1">Vencimento De</label>
                  <input
                    type="date"
                    value={finFilterDateStart}
                    onChange={e => setFinFilterDateStart(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Vencimento Até</label>
                  <input
                    type="date"
                    value={finFilterDateEnd}
                    onChange={e => setFinFilterDateEnd(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              {/* Tabela de Parcelas Ordenada */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Vencimento ↑</th>
                      <th className="p-3">Aluno</th>
                      <th className="p-3">Turma</th>
                      <th className="p-3">Parcela</th>
                      <th className="p-3">Forma</th>
                      <th className="p-3">Valor</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredInstallments.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="p-6 text-center text-slate-400">
                          Nenhum lançamento financeiro encontrado com os filtros selecionados.
                        </td>
                      </tr>
                    ) : (
                      filteredInstallments.map(inst => {
                        const enr = enrollments.find(e => e.id === inst.enrollmentId);
                        const stu = students.find(s => s.id === enr?.studentId);
                        const coh = cohorts.find(c => c.id === enr?.cohortId);

                        return (
                          <tr key={inst.id} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-slate-800">
                              {new Date(inst.dueDate + 'T00:00:00').toLocaleDateString('pt-BR')}
                            </td>
                            <td className="p-3 font-medium text-indigo-900">{stu?.name || 'N/A'}</td>
                            <td className="p-3 text-slate-600">{coh?.code || 'N/A'}</td>
                            <td className="p-3 text-slate-600">{inst.number}/{inst.totalParts}</td>
                            <td className="p-3 text-slate-600 text-xs">{inst.paymentMethod || 'PIX'}</td>
                            <td className="p-3 font-bold text-slate-800">R$ {Number(inst.value).toFixed(2)}</td>
                            <td className="p-3">
                              {inst.status === 'paid' && <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">Pago</span>}
                              {inst.status === 'pending' && <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">Pendente</span>}
                              {inst.status === 'cancelled' && <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2.5 py-0.5 rounded-full">Cancelado</span>}
                            </td>
                            <td className="p-3 text-right space-x-1.5">
                              {inst.status !== 'cancelled' && (
                                <>
                                  <button
                                    onClick={() => handlePayInstallment(inst.id)}
                                    className={`px-2.5 py-1 rounded text-xs font-semibold ${inst.status === 'paid' ? 'bg-slate-100 text-slate-600 border' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
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

          {/* AUDITORIA */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Trilha de Auditoria</h2>
              <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs space-y-1">
                {auditLogs.length === 0 ? <p className="text-slate-500">Nenhum log registrado.</p> : auditLogs.map(l => <div key={l.id}>[{l.timestamp}] [{l.user}]: {l.action}</div>)}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL EDITAR ALUNO */}
      {editingStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Editar Aluno</h3>
            <form onSubmit={handleUpdateStudent} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo *</label>
                <input required type="text" value={editingStudent.name} onChange={e => setEditingStudent({ ...editingStudent, name: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">CPF</label>
                  <input type="text" value={editingStudent.cpf || ''} onChange={e => setEditingStudent({ ...editingStudent, cpf: e.target.value })} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Data Nascimento</label>
                  <input type="date" value={editingStudent.birthDate || ''} onChange={e => setEditingStudent({ ...editingStudent, birthDate: e.target.value })} className="w-full p-2 border rounded" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Telefone</label>
                  <input type="text" value={editingStudent.phone || ''} onChange={e => setEditingStudent({ ...editingStudent, phone: e.target.value })} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">E-mail</label>
                  <input type="email" value={editingStudent.email || ''} onChange={e => setEditingStudent({ ...editingStudent, email: e.target.value })} className="w-full p-2 border rounded" />
                </div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setEditingStudent(null)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-amber-600 text-white rounded font-semibold">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR PROFESSOR */}
      {editingTeacher && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Editar Professor</h3>
            <form onSubmit={handleUpdateTeacher} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo *</label>
                <input required type="text" value={editingTeacher.name} onChange={e => setEditingTeacher({ ...editingTeacher, name: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Data Nascimento</label>
                  <input type="date" value={editingTeacher.birthDate || ''} onChange={e => setEditingTeacher({ ...editingTeacher, birthDate: e.target.value })} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Telefone</label>
                  <input type="text" value={editingTeacher.phone || ''} onChange={e => setEditingTeacher({ ...editingTeacher, phone: e.target.value })} className="w-full p-2 border rounded" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Chave PIX</label>
                <input type="text" value={editingTeacher.pixKey || ''} onChange={e => setEditingTeacher({ ...editingTeacher, pixKey: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setEditingTeacher(null)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-amber-600 text-white rounded font-semibold">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR CURSO BASE */}
      {editingCourse && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Editar Curso Base</h3>
            <form onSubmit={handleUpdateCourse} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nome do Curso *</label>
                <input required type="text" value={editingCourse.name} onChange={e => setEditingCourse({ ...editingCourse, name: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Carga Horária (horas)</label>
                <input type="number" value={editingCourse.workload || ''} onChange={e => setEditingCourse({ ...editingCourse, workload: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setEditingCourse(null)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-amber-600 text-white rounded font-semibold">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR TURMA */}
      {editingCohort && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Editar Turma</h3>
            <form onSubmit={handleUpdateCohort} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Curso Base *</label>
                <select required value={editingCohort.baseCourseId} onChange={e => setEditingCohort({ ...editingCohort, baseCourseId: e.target.value })} className="w-full p-2 border rounded">
                  <option value="">-- Selecione um Curso Base --</option>
                  {baseCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Código da Turma</label>
                <input type="text" value={editingCohort.code || ''} onChange={e => setEditingCohort({ ...editingCohort, code: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Preço Base (R$)</label>
                <input type="number" value={editingCohort.basePrice || ''} onChange={e => setEditingCohort({ ...editingCohort, basePrice: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setEditingCohort(null)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-amber-600 text-white rounded font-semibold">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FICHA 360 DO ALUNO */}
      {selectedStudentFor360 && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Ficha 360° do Aluno</h3>
              <button onClick={() => setSelectedStudentFor360(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">×</button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-indigo-900 text-base">{selectedStudentFor360.name}</p>
                <p className="text-xs text-slate-600">CPF: {selectedStudentFor360.cpf || 'N/A'}</p>
                <p className="text-xs text-slate-600">Contato: {selectedStudentFor360.phone} | {selectedStudentFor360.email}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-700 text-xs uppercase mb-2">Turmas Vinculadas & Status de Matrícula</h4>
                {enrollments.filter(e => e.studentId === selectedStudentFor360.id).length === 0 ? (
                  <p className="text-slate-400 text-xs italic">Este aluno ainda não está matriculado em nenhuma turma.</p>
                ) : (
                  <div className="space-y-2">
                    {enrollments.filter(e => e.studentId === selectedStudentFor360.id).map(enr => {
                      const coh = cohorts.find(c => c.id === enr.cohortId);
                      return (
                        <div key={enr.id} className="p-3 border rounded-xl flex justify-between items-center bg-white shadow-sm">
                          <div>
                            <span className="font-bold text-slate-800">{coh?.code || 'Turma N/A'}</span>
                            <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${enr.status === 'suspended' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                              {enr.status === 'suspended' ? 'Matrícula Suspensa' : 'Ativa'}
                            </span>
                          </div>
                          <button
                            onClick={() => handleToggleSuspendEnrollment(enr.id)}
                            className={`px-2.5 py-1 rounded text-xs font-semibold ${enr.status === 'suspended' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}
                          >
                            {enr.status === 'suspended' ? 'Reativar' : 'Suspender Matrícula'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ALUNOS DA TURMA */}
      {selectedCohortForStudents && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Alunos na Turma: {selectedCohortForStudents.code}</h3>
              <button onClick={() => setSelectedCohortForStudents(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">×</button>
            </div>
            <div className="space-y-3">
              {enrollments.filter(e => e.cohortId === selectedCohortForStudents.id).length === 0 ? (
                <p className="text-slate-400 text-xs italic py-4 text-center">Nenhum aluno matriculado nesta turma ainda.</p>
              ) : (
                <ul className="divide-y border rounded-xl">
                  {enrollments.filter(e => e.cohortId === selectedCohortForStudents.id).map(enr => {
                    const stu = students.find(s => s.id === enr.studentId);
                    return (
                      <li key={enr.id} className="p-3 flex justify-between items-center text-sm">
                        <span className="font-semibold text-slate-800">{stu?.name || 'Aluno N/A'}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${enr.status === 'suspended' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {enr.status === 'suspended' ? 'Suspensa' : 'Ativa'}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAIS DE CADASTRO PADRÃO */}
      {showNewStudentModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Aluno</h3>
            <form onSubmit={handleAddStudent} className="space-y-3 text-sm">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo *</label><input required type="text" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">CPF</label><input type="text" value={studentForm.cpf} onChange={e => setStudentForm({ ...studentForm, cpf: e.target.value })} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Data Nascimento</label><input type="date" value={studentForm.birthDate} onChange={e => setStudentForm({ ...studentForm, birthDate: e.target.value })} className="w-full p-2 border rounded" /></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Telefone</label><input type="text" value={studentForm.phone} onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">E-mail</label><input type="email" value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} className="w-full p-2 border rounded" /></div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewStudentModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar Aluno</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNewTeacherModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Professor</h3>
            <form onSubmit={handleAddTeacher} className="space-y-3 text-sm">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo *</label><input required type="text" value={teacherForm.name} onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Data Nascimento</label><input type="date" value={teacherForm.birthDate} onChange={e => setTeacherForm({ ...teacherForm, birthDate: e.target.value })} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Telefone</label><input type="text" value={teacherForm.phone} onChange={e => setTeacherForm({ ...teacherForm, phone: e.target.value })} className="w-full p-2 border rounded" /></div>
              </div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Chave PIX</label><input type="text" value={teacherForm.pixKey} onChange={e => setTeacherForm({ ...teacherForm, pixKey: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewTeacherModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar Professor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNewCourseModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Curso Base</h3>
            <form onSubmit={handleAddCourse} className="space-y-3 text-sm">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Nome do Curso *</label><input required type="text" value={courseForm.name} onChange={e => setCourseForm({ ...courseForm, name: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Carga Horária (horas)</label><input type="number" value={courseForm.workload} onChange={e => setCourseForm({ ...courseForm, workload: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewCourseModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar Curso</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNewCohortModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Abrir Nova Turma</h3>
            <form onSubmit={handleAddCohort} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Curso Base *</label>
                <select required value={cohortForm.baseCourseId} onChange={e => setCohortForm({ ...cohortForm, baseCourseId: e.target.value })} className="w-full p-2 border rounded">
                  <option value="">-- Selecione um Curso Base --</option>
                  {baseCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Código da Turma (Ex: TURMA-2026-A)</label><input type="text" value={cohortForm.code} onChange={e => setCohortForm({ ...cohortForm, code: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Preço Base (R$)</label><input type="number" value={cohortForm.basePrice} onChange={e => setCohortForm({ ...cohortForm, basePrice: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewCohortModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded font-semibold">Criar Turma</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MATRÍCULA COM OPÇÕES FINANCEIRAS */}
      {showQuickEnrollModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Nova Matrícula & Condição Financeira</h3>
            <form onSubmit={handleQuickEnroll} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Selecione o Aluno *</label>
                <select required value={quickForm.studentId} onChange={e => setQuickForm({ ...quickForm, studentId: e.target.value })} className="w-full p-2 border rounded">
                  <option value="">-- Selecione o Aluno --</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Selecione a Turma *</label>
                <select required value={quickForm.cohortId} onChange={e => setQuickForm({ ...quickForm, cohortId: e.target.value })} className="w-full p-2 border rounded">
                  <option value="">-- Selecione a Turma --</option>
                  {cohorts.map(c => <option key={c.id} value={c.id}>{c.code} (Base: R$ {c.basePrice})</option>)}
                </select>
              </div>

              <div className="border-t pt-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Forma de Pagamento</label>
                <select value={quickForm.paymentMethod} onChange={e => setQuickForm({ ...quickForm, paymentMethod: e.target.value })} className="w-full p-2 border rounded mb-2">
                  <option value="PIX">PIX</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Boleto">Boleto Bancário</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>

                <div className="flex space-x-4 my-2">
                  <label className="flex items-center space-x-1 text-xs">
                    <input type="radio" name="ptype" checked={quickForm.paymentType === 'vista'} onChange={() => setQuickForm({ ...quickForm, paymentType: 'vista', installmentsCount: 1 })} />
                    <span>À Vista</span>
                  </label>
                  <label className="flex items-center space-x-1 text-xs">
                    <input type="radio" name="ptype" checked={quickForm.paymentType === 'parcelado'} onChange={() => setQuickForm({ ...quickForm, paymentType: 'parcelado', installmentsCount: 2 })} />
                    <span>Parcelado</span>
                  </label>
                </div>

                {quickForm.paymentType === 'parcelado' && (
                  <div className="grid grid-cols-2 gap-2 mt-2 bg-slate-50 p-2 rounded border">
                    <div>
                      <label className="block text-xs text-slate-600">Nº Parcelas</label>
                      <input type="number" min="2" max="24" value={quickForm.installmentsCount} onChange={e => setQuickForm({ ...quickForm, installmentsCount: e.target.value })} className="w-full p-1.5 border rounded" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600">1º Vencimento</label>
                      <input type="date" value={quickForm.dueDate} onChange={e => setQuickForm({ ...quickForm, dueDate: e.target.value })} className="w-full p-1.5 border rounded" />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowQuickEnrollModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Confirmar Matrícula</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
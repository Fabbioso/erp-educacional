import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// Ícones em SVG Nativo
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
  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [baseCourses, setBaseCourses] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [teacherPayouts, setTeacherPayouts] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

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

  // Modais e Filtros
  const [selectedStudentFor360, setSelectedStudentFor360] = useState(null);
  const [selectedCohortForStudents, setSelectedCohortForStudents] = useState(null);
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('');
  const [finFilterStudent, setFinFilterStudent] = useState('');
  const [finFilterCohort, setFinFilterCohort] = useState('');
  const [finFilterDateStart, setFinFilterDateStart] = useState('');
  const [finFilterDateEnd, setFinFilterDateEnd] = useState('');
  const [payoutTeacherFilter, setPayoutTeacherFilter] = useState('');

  // Formulários
  const [studentForm, setStudentForm] = useState({ name: '', cpf: '', email: '', phone: '', birthDate: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', cpf: '', email: '', phone: '', pixKey: '', birthDate: '' });
  const [courseForm, setCourseForm] = useState({ name: '', workload: '', description: '' });
  const [cohortForm, setCohortForm] = useState({ baseCourseId: '', teacherId: '', code: '', startDate: '', basePrice: '', payoutPercentage: '50' });
  const [quickForm, setQuickForm] = useState({
    studentId: '', cohortId: '', paymentMethod: 'PIX', paymentType: 'vista', installmentsCount: 1, customValue: '', dueDate: new Date().toISOString().split('T')[0]
  });

  // Carregar dados da Nuvem (Supabase)
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const { data: stu } = await supabase.from('students').select('*');
      const { data: tea } = await supabase.from('teachers').select('*');
      const { data: cou } = await supabase.from('base_courses').select('*');
      const { data: coh } = await supabase.from('cohorts').select('*');
      const { data: enr } = await supabase.from('enrollments').select('*');
      const { data: ins } = await supabase.from('installments').select('*');
      const { data: pay } = await supabase.from('teacher_payouts').select('*');
      const { data: log } = await supabase.from('audit_logs').select('*');

      setStudents((stu || []).map(s => ({ ...s, birthDate: s.birth_date, registrationDate: s.registration_date })));
      setTeachers((tea || []).map(t => ({ ...t, birthDate: t.birth_date, pixKey: t.pix_key })));
      setBaseCourses(cou || []);
      setCohorts((coh || []).map(c => ({ ...c, baseCourseId: c.base_course_id, teacherId: c.teacher_id, basePrice: c.base_price, payoutPercentage: c.payout_percentage })));
      setEnrollments((enr || []).map(e => ({ ...e, studentId: e.student_id, cohortId: e.cohort_id })));
      setInstallments((ins || []).map(i => ({ ...i, enrollmentId: i.enrollment_id, totalParts: i.total_parts, dueDate: i.due_date, paymentMethod: i.payment_method })));
      setTeacherPayouts((pay || []).map(p => p.id));
      setAuditLogs(log || []);
    } catch (err) {
      console.error('Erro ao buscar dados do Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const logAction = async (action) => {
    const newLog = { id: Date.now(), action, user: 'Administrador', timestamp: new Date().toLocaleString() };
    setAuditLogs(prev => [newLog, ...prev]);
    await supabase.from('audit_logs').insert([newLog]);
  };

  const getTodayBirthdays = () => {
    const today = new Date();
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    const currentDay = String(today.getDate()).padStart(2, '0');
    const target = `-${currentMonth}-${currentDay}`;

    const studentBdays = (students || []).filter(s => s.birthDate && String(s.birthDate).endsWith(target)).map(s => ({ name: s.name, type: 'Aluno' }));
    const teacherBdays = (teachers || []).filter(t => t.birthDate && String(t.birthDate).endsWith(target)).map(t => ({ name: t.name, type: 'Professor' }));

    return [...studentBdays, ...teacherBdays];
  };

  const birthdaysToday = getTodayBirthdays();

  // ALUNOS
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!studentForm.name) return;
    const id = Date.now();
    const newStudent = { id, name: studentForm.name, cpf: studentForm.cpf, email: studentForm.email, phone: studentForm.phone, birth_date: studentForm.birthDate, registration_date: new Date().toLocaleDateString('pt-BR') };
    await supabase.from('students').insert([newStudent]);
    logAction(`Novo aluno cadastrado: ${newStudent.name}`);
    setShowNewStudentModal(false);
    setStudentForm({ name: '', cpf: '', email: '', phone: '', birthDate: '' });
    fetchAllData();
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    await supabase.from('students').update({
      name: editingStudent.name, cpf: editingStudent.cpf, email: editingStudent.email, phone: editingStudent.phone, birth_date: editingStudent.birthDate
    }).eq('id', editingStudent.id);
    logAction(`Cadastro do aluno atualizado: ${editingStudent.name}`);
    setEditingStudent(null);
    fetchAllData();
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      await supabase.from('students').delete().eq('id', id);
      logAction(`Aluno excluído ID: ${id}`);
      fetchAllData();
    }
  };

  // PROFESSORES
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (!teacherForm.name) return;
    const newTeacher = { id: Date.now(), name: teacherForm.name, cpf: teacherForm.cpf, email: teacherForm.email, phone: teacherForm.phone, pix_key: teacherForm.pixKey, birth_date: teacherForm.birthDate };
    await supabase.from('teachers').insert([newTeacher]);
    logAction(`Novo professor cadastrado: ${newTeacher.name}`);
    setShowNewTeacherModal(false);
    setTeacherForm({ name: '', cpf: '', email: '', phone: '', pixKey: '', birthDate: '' });
    fetchAllData();
  };

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    await supabase.from('teachers').update({
      name: editingTeacher.name, cpf: editingTeacher.cpf, email: editingTeacher.email, phone: editingTeacher.phone, pix_key: editingTeacher.pixKey, birth_date: editingTeacher.birthDate
    }).eq('id', editingTeacher.id);
    logAction(`Cadastro do professor atualizado: ${editingTeacher.name}`);
    setEditingTeacher(null);
    fetchAllData();
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este professor?')) {
      await supabase.from('teachers').delete().eq('id', id);
      logAction(`Professor excluído ID: ${id}`);
      fetchAllData();
    }
  };

  // CURSOS
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!courseForm.name) return;
    const newCourse = { id: Date.now(), name: courseForm.name, workload: courseForm.workload, description: courseForm.description };
    await supabase.from('base_courses').insert([newCourse]);
    logAction(`Novo curso cadastrado: ${newCourse.name}`);
    setShowNewCourseModal(false);
    setCourseForm({ name: '', workload: '', description: '' });
    fetchAllData();
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    await supabase.from('base_courses').update({ name: editingCourse.name, workload: editingCourse.workload }).eq('id', editingCourse.id);
    logAction(`Curso atualizado: ${editingCourse.name}`);
    setEditingCourse(null);
    fetchAllData();
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este curso base?')) {
      await supabase.from('base_courses').delete().eq('id', id);
      logAction(`Curso excluído ID: ${id}`);
      fetchAllData();
    }
  };

  // TURMAS
  const handleAddCohort = async (e) => {
    e.preventDefault();
    if (!cohortForm.baseCourseId) return;
    const newCohort = {
      id: Date.now(),
      base_course_id: Number(cohortForm.baseCourseId),
      teacher_id: cohortForm.teacherId ? Number(cohortForm.teacherId) : null,
      code: cohortForm.code,
      base_price: Number(cohortForm.basePrice),
      payout_percentage: Number(cohortForm.payoutPercentage) || 50
    };
    await supabase.from('cohorts').insert([newCohort]);
    logAction(`Nova turma criada: ${newCohort.code}`);
    setShowNewCohortModal(false);
    setCohortForm({ baseCourseId: '', teacherId: '', code: '', startDate: '', basePrice: '', payoutPercentage: '50' });
    fetchAllData();
  };

  const handleUpdateCohort = async (e) => {
    e.preventDefault();
    await supabase.from('cohorts').update({
      base_course_id: Number(editingCohort.baseCourseId),
      teacher_id: editingCohort.teacherId ? Number(editingCohort.teacherId) : null,
      code: editingCohort.code,
      base_price: Number(editingCohort.basePrice),
      payout_percentage: Number(editingCohort.payoutPercentage) || 50
    }).eq('id', editingCohort.id);
    logAction(`Turma atualizada: ${editingCohort.code}`);
    setEditingCohort(null);
    fetchAllData();
  };

  const handleDeleteCohort = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta turma?')) {
      await supabase.from('cohorts').delete().eq('id', id);
      logAction(`Turma excluída ID: ${id}`);
      fetchAllData();
    }
  };

  // MATRÍCULAS E FINANCEIRO
  const handleQuickEnroll = async (e) => {
    e.preventDefault();
    if (!quickForm.studentId || !quickForm.cohortId) {
      alert('Selecione um aluno e uma turma.');
      return;
    }

    const cohort = (cohorts || []).find(c => c.id === Number(quickForm.cohortId));
    const student = (students || []).find(s => s.id === Number(quickForm.studentId));

    if (!cohort || !student) return;

    const enrId = Date.now();
    const newEnr = {
      id: enrId,
      student_id: student.id,
      cohort_id: cohort.id,
      status: 'active',
      date: new Date().toLocaleDateString('pt-BR')
    };

    await supabase.from('enrollments').insert([newEnr]);

    const totalValue = Number(quickForm.customValue) || Number(cohort.basePrice) || 1000;
    const newInstallments = [];

    if (quickForm.paymentType === 'vista') {
      newInstallments.push({
        id: Date.now() + 1,
        enrollment_id: enrId,
        number: 1,
        total_parts: 1,
        value: totalValue,
        due_date: quickForm.dueDate || new Date().toISOString().split('T')[0],
        status: 'pending',
        payment_method: quickForm.paymentMethod
      });
    } else {
      const parts = Number(quickForm.installmentsCount) || 2;
      const partValue = totalValue / parts;
      const baseDate = new Date((quickForm.dueDate || new Date().toISOString().split('T')[0]) + 'T00:00:00');

      for (let i = 0; i < parts; i++) {
        const d = new Date(baseDate);
        d.setMonth(d.getMonth() + i);
        newInstallments.push({
          id: Date.now() + 1 + i,
          enrollment_id: enrId,
          number: i + 1,
          total_parts: parts,
          value: partValue,
          due_date: d.toISOString().split('T')[0],
          status: 'pending',
          payment_method: quickForm.paymentMethod
        });
      }
    }

    await supabase.from('installments').insert(newInstallments);
    logAction(`Matrícula realizada na nuvem para ${student.name} na turma ${cohort.code}`);
    setShowQuickEnrollModal(false);
    fetchAllData();
  };

  const handleToggleSuspendEnrollment = async (enrollmentId) => {
    const enr = enrollments.find(e => e.id === enrollmentId);
    if (!enr) return;
    const newStatus = enr.status === 'suspended' ? 'active' : 'suspended';
    await supabase.from('enrollments').update({ status: newStatus }).eq('id', enrollmentId);
    logAction(`Status da matrícula #${enrollmentId} alterado para: ${newStatus}`);
    fetchAllData();
  };

  const handlePayInstallment = async (instId) => {
    const inst = installments.find(i => i.id === instId);
    if (!inst) return;
    const newStatus = inst.status === 'paid' ? 'pending' : 'paid';
    await supabase.from('installments').update({ status: newStatus }).eq('id', instId);
    logAction(`Status da parcela #${instId} alterado para: ${newStatus}`);
    fetchAllData();
  };

  const handleCancelInstallment = async (instId) => {
    if (window.confirm('Deseja cancelar esta parcela?')) {
      await supabase.from('installments').update({ status: 'cancelled' }).eq('id', instId);
      logAction(`Parcela #${instId} cancelada.`);
      fetchAllData();
    }
  };

  const handleTogglePayoutStatus = async (teacherId, cohortId) => {
    const key = `${teacherId}_${cohortId}`;
    if (teacherPayouts.includes(key)) {
      await supabase.from('teacher_payouts').delete().eq('id', key);
    } else {
      await supabase.from('teacher_payouts').insert([{ id: key }]);
    }
    logAction(`Status do repasse alterado para ${key}`);
    fetchAllData();
  };

  const filteredInstallments = (installments || [])
    .filter(inst => {
      if (!inst) return false;
      const enr = (enrollments || []).find(e => e.id === inst.enrollmentId);
      if (!enr) return false;
      const stu = (students || []).find(s => s.id === enr.studentId);
      const coh = (cohorts || []).find(c => c.id === enr.cohortId);

      if (finFilterStudent && stu && !stu.name.toLowerCase().includes(finFilterStudent.toLowerCase())) return false;
      if (finFilterCohort && coh && coh.id !== Number(finFilterCohort)) return false;
      if (finFilterDateStart && inst.dueDate && inst.dueDate < finFilterDateStart) return false;
      if (finFilterDateEnd && inst.dueDate && inst.dueDate > finFilterDateEnd) return false;

      return true;
    })
    .sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));

  const totalReceived = (installments || []).filter(i => i && i.status === 'paid').reduce((acc, i) => acc + Number(i.value || 0), 0);
  const totalPending = (installments || []).filter(i => i && i.status === 'pending').reduce((acc, i) => acc + Number(i.value || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg font-bold text-xl tracking-wider text-white">❖ MERKABA</div>
            <div>
              <h1 className="text-lg font-semibold leading-none">Merkaba ERP Educacional</h1>
              <span className="text-xs text-emerald-400 font-medium">● Conectado ao Supabase (Nuvem)</span>
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
            <div className="flex items-center space-x-3"><IconDollar className="w-5 h-5" /><span>Financeiro</span></div>
          </button>

          <button onClick={() => setActiveTab('payouts')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'payouts' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
            <div className="flex items-center space-x-3"><IconDollar className="w-5 h-5 text-emerald-600" /><span>Repasses a Docentes</span></div>
          </button>

          <button onClick={() => setActiveTab('audit')} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'audit' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
            <IconShield className="w-5 h-5" /> <span>Auditoria ADM</span>
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {loading ? (
            <div className="text-center py-12 text-slate-500 font-semibold">Carregando dados da nuvem...</div>
          ) : (
            <>
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
                    <p className="text-slate-400 text-sm text-center py-8">Nenhum aluno cadastrado no banco de dados.</p>
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
                                <button onClick={() => setSelectedStudentFor360(s)} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold border border-indigo-200">Ficha 360°</button>
                                <button onClick={() => setEditingStudent(s)} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-semibold border border-amber-200">Editar</button>
                                <button onClick={() => handleDeleteStudent(s.id)} className="px-2 py-1 bg-rose-50 text-rose-700 rounded text-xs font-semibold border border-rose-200">Excluir</button>
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
                    <p className="text-slate-400 text-sm text-center py-8">Nenhum professor cadastrado no banco de dados.</p>
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
                                <button onClick={() => { setPayoutTeacherFilter(t.id); setActiveTab('payouts'); }} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold border border-emerald-200">Repasses PIX →</button>
                                <button onClick={() => setEditingTeacher(t)} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-semibold border border-amber-200">Editar</button>
                                <button onClick={() => handleDeleteTeacher(t.id)} className="px-2 py-1 bg-rose-50 text-rose-700 rounded text-xs font-semibold border border-rose-200">Excluir</button>
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
                      <button onClick={() => setShowNewCourseModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-lg">+ Novo Curso Base</button>
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
                              <button onClick={() => setSelectedCourseFilter(c.id === selectedCourseFilter ? '' : c.id)} className="text-xs text-indigo-600 font-semibold">{selectedCourseFilter === c.id ? 'Ver Todas' : 'Filtrar Turmas →'}</button>
                              <div className="space-x-1">
                                <button onClick={() => setEditingCourse(c)} className="text-xs text-amber-600 font-semibold px-1.5 py-0.5">Editar</button>
                                <button onClick={() => handleDeleteCourse(c.id)} className="text-xs text-rose-600 font-semibold px-1.5 py-0.5">Excluir</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-lg font-bold text-slate-800">Turmas</h2>
                      <button onClick={() => setShowNewCohortModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-lg">+ Abrir Turma</button>
                    </div>
                    {cohorts.length === 0 ? <p className="text-slate-400 text-xs italic">Nenhuma turma cadastrada.</p> : (
                      <div className="border rounded-xl overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-100">
                            <tr>
                              <th className="p-3">Código</th>
                              <th className="p-3">Professor Responsável</th>
                              <th className="p-3">Preço Base</th>
                              <th className="p-3">Repasse Docente</th>
                              <th className="p-3 text-right">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {cohorts.filter(c => !selectedCourseFilter || c.baseCourseId === Number(selectedCourseFilter)).map(c => {
                              const teacher = teachers.find(t => t.id === Number(c.teacherId));
                              return (
                                <tr key={c.id} className="hover:bg-slate-50">
                                  <td className="p-3 font-bold text-slate-800">{c.code}</td>
                                  <td className="p-3 text-slate-700 font-medium">{teacher ? teacher.name : 'A definir'}</td>
                                  <td className="p-3 text-slate-600">R$ {Number(c.basePrice || 0).toFixed(2)}</td>
                                  <td className="p-3 text-slate-600">{c.payoutPercentage || 50}%</td>
                                  <td className="p-3 text-right space-x-1.5">
                                    <button onClick={() => setSelectedCohortForStudents(c)} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold border border-indigo-200">Ver Alunos</button>
                                    <button onClick={() => setEditingCohort(c)} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-semibold border border-amber-200">Editar</button>
                                    <button onClick={() => handleDeleteCohort(c.id)} className="px-2 py-1 bg-rose-50 text-rose-700 rounded text-xs font-semibold border border-rose-200">Excluir</button>
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

              {/* FINANCEIRO */}
              {activeTab === 'finance' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-800">Controle Financeiro de Parcelas & Mensalidades</h2>
                  <div className="overflow-x-auto border rounded-xl">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-100">
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
                      <tbody className="divide-y">
                        {filteredInstallments.length === 0 ? (
                          <tr><td colSpan="7" className="p-6 text-center text-slate-400">Nenhum lançamento financeiro na nuvem.</td></tr>
                        ) : (
                          filteredInstallments.map(inst => {
                            const enr = enrollments.find(e => e.id === inst.enrollmentId);
                            const stu = students.find(s => s.id === enr?.studentId);
                            const coh = cohorts.find(c => c.id === enr?.cohortId);

                            return (
                              <tr key={inst.id} className="hover:bg-slate-50">
                                <td className="p-3 font-semibold">{inst.dueDate ? new Date(inst.dueDate + 'T00:00:00').toLocaleDateString('pt-BR') : 'N/A'}</td>
                                <td className="p-3 font-medium text-indigo-900">{stu?.name || 'N/A'}</td>
                                <td className="p-3 text-slate-600">{coh?.code || 'N/A'}</td>
                                <td className="p-3 text-slate-600">{inst.number}/{inst.totalParts}</td>
                                <td className="p-3 font-bold">R$ {Number(inst.value || 0).toFixed(2)}</td>
                                <td className="p-3">
                                  {inst.status === 'paid' && <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">Pago</span>}
                                  {inst.status === 'pending' && <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">Pendente</span>}
                                  {inst.status === 'cancelled' && <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">Cancelado</span>}
                                </td>
                                <td className="p-3 text-right space-x-1.5">
                                  {inst.status !== 'cancelled' && (
                                    <>
                                      <button onClick={() => handlePayInstallment(inst.id)} className={`px-2.5 py-1 rounded text-xs font-semibold ${inst.status === 'paid' ? 'bg-slate-100 text-slate-600 border' : 'bg-emerald-600 text-white'}`}>
                                        {inst.status === 'paid' ? 'Desfazer' : 'Marcar Pago'}
                                      </button>
                                      <button onClick={() => handleCancelInstallment(inst.id)} className="px-2 py-1 bg-rose-50 text-rose-700 rounded text-xs border border-rose-200">Cancelar</button>
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

              {/* REPASSES A DOCENTES */}
              {activeTab === 'payouts' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-800">Extrato Detalhado de Repasses a Docentes (Nuvem)</h2>
                  {teachers.filter(t => !payoutTeacherFilter || t.id === Number(payoutTeacherFilter)).map(teacher => {
                    const teacherCohorts = cohorts.filter(c => Number(c.teacherId) === teacher.id);

                    return (
                      <div key={teacher.id} className="border rounded-xl p-4 bg-white shadow-sm space-y-4">
                        <div className="border-b pb-2">
                          <h3 className="font-bold text-indigo-900">{teacher.name}</h3>
                          <p className="text-xs text-slate-500">Chave PIX: <span className="font-mono font-semibold">{teacher.pixKey || 'Não cadastrada'}</span></p>
                        </div>

                        {teacherCohorts.length === 0 ? <p className="text-xs text-slate-400 italic">Sem turmas vinculadas.</p> : (
                          <div className="space-y-2">
                            {teacherCohorts.map(cohort => {
                              const activeStudentsCount = enrollments.filter(e => e.cohortId === cohort.id && e.status === 'active').length;
                              const pricePerStudent = Number(cohort.basePrice || 0);
                              const payoutPct = Number(cohort.payoutPercentage || 50);
                              const totalCohortPayout = (activeStudentsCount * pricePerStudent) * (payoutPct / 100);
                              const payoutKey = `${teacher.id}_${cohort.id}`;
                              const isPayoutDone = teacherPayouts.includes(payoutKey);

                              return (
                                <div key={cohort.id} className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center text-xs">
                                  <div>
                                    <span className="font-bold text-slate-800">{cohort.code}</span>
                                    <span className="ml-3 text-slate-600">{activeStudentsCount} alunos ativos | Comissão: {payoutPct}%</span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <span className="font-bold text-emerald-700">R$ {totalCohortPayout.toFixed(2)}</span>
                                    <button onClick={() => handleTogglePayoutStatus(teacher.id, cohort.id)} className={`px-3 py-1.5 rounded-lg font-semibold ${isPayoutDone ? 'bg-slate-200 text-slate-700' : 'bg-emerald-600 text-white'}`}>
                                      {isPayoutDone ? '✓ Repasse Efetuado' : 'Marcar Repasse Pago'}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* AUDITORIA */}
              {activeTab === 'audit' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-800">Trilha de Auditoria (Nuvem)</h2>
                  <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs space-y-1">
                    {auditLogs.length === 0 ? <p className="text-slate-500">Nenhum log registrado.</p> : auditLogs.map(l => <div key={l.id}>[{l.timestamp}] [{l.user}]: {l.action}</div>)}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* MODAIS DE CADASTRO PADRÃO */}
      {showNewStudentModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Aluno (Nuvem)</h3>
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
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar na Nuvem</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNewTeacherModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Professor (Nuvem)</h3>
            <form onSubmit={handleAddTeacher} className="space-y-3 text-sm">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo *</label><input required type="text" value={teacherForm.name} onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Data Nascimento</label><input type="date" value={teacherForm.birthDate} onChange={e => setTeacherForm({ ...teacherForm, birthDate: e.target.value })} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Telefone</label><input type="text" value={teacherForm.phone} onChange={e => setTeacherForm({ ...teacherForm, phone: e.target.value })} className="w-full p-2 border rounded" /></div>
              </div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Chave PIX</label><input type="text" value={teacherForm.pixKey} onChange={e => setTeacherForm({ ...teacherForm, pixKey: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewTeacherModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar na Nuvem</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNewCourseModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Curso Base</h3>
            <form onSubmit={handleAddCourse} className="space-y-3 text-sm">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Nome do Curso *</label><input required type="text" value={courseForm.name} onChange={e => setCourseForm({ ...courseForm, name: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Carga Horária (horas)</label><input type="number" value={courseForm.workload} onChange={e => setCourseForm({ ...courseForm, workload: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewCourseModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar na Nuvem</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNewCohortModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Abrir Nova Turma</h3>
            <form onSubmit={handleAddCohort} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Curso Base *</label>
                <select required value={cohortForm.baseCourseId} onChange={e => setCohortForm({ ...cohortForm, baseCourseId: e.target.value })} className="w-full p-2 border rounded">
                  <option value="">-- Selecione um Curso Base --</option>
                  {baseCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Professor Responsável</label>
                <select value={cohortForm.teacherId} onChange={e => setCohortForm({ ...cohortForm, teacherId: e.target.value })} className="w-full p-2 border rounded">
                  <option value="">-- Selecione o Professor --</option>
                  {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Código da Turma</label><input type="text" value={cohortForm.code} onChange={e => setCohortForm({ ...cohortForm, code: e.target.value })} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">% Repasse Docente</label><input type="number" value={cohortForm.payoutPercentage} onChange={e => setCohortForm({ ...cohortForm, payoutPercentage: e.target.value })} className="w-full p-2 border rounded" /></div>
              </div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1">Preço Base (R$)</label><input type="number" value={cohortForm.basePrice} onChange={e => setCohortForm({ ...cohortForm, basePrice: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewCohortModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded font-semibold">Criar na Nuvem</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showQuickEnrollModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
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
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Confirmar na Nuvem</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
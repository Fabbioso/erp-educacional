import React, { useState, useEffect } from 'react';

// Componentes de Ícones em SVG Nativo (100% estáveis)
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

  // Modais
  const [showQuickEnrollModal, setShowQuickEnrollModal] = useState(false);
  const [showNewStudentModal, setShowNewStudentModal] = useState(false);
  const [showNewTeacherModal, setShowNewTeacherModal] = useState(false);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [showNewCohortModal, setShowNewCohortModal] = useState(false);

  // Formulários
  const [studentForm, setStudentForm] = useState({ name: '', cpf: '', email: '', phone: '', birthDate: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', cpf: '', email: '', phone: '', pixKey: '', birthDate: '' });
  const [courseForm, setCourseForm] = useState({ name: '', workload: '', description: '' });
  const [cohortForm, setCohortForm] = useState({ baseCourseId: '', code: '', startDate: '', basePrice: '' });
  const [quickForm, setQuickForm] = useState({ studentId: '', cohortId: '', paymentMethod: 'PIX', installmentsCount: 1 });

  const logAction = (action) => {
    setAuditLogs(prev => [{ id: Date.now(), action, user: 'Administrador', timestamp: new Date().toLocaleString() }, ...prev]);
  };

  // Lógica de verificação de Aniversariantes do Dia
  const getTodayBirthdays = () => {
    const today = new Date();
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    const currentDay = String(today.getDate()).padStart(2, '0');
    const target = `-${currentMonth}-${currentDay}`;

    const studentBdays = students.filter(s => s.birthDate && s.birthDate.endsWith(target)).map(s => ({ name: s.name, type: 'Aluno' }));
    const teacherBdays = teachers.filter(t => t.birthDate && t.birthDate.endsWith(target)).map(t => ({ name: t.name, type: 'Professor' }));

    return [...studentBdays, ...teacherBdays];
  };

  const birthdaysToday = getTodayBirthdays();

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!studentForm.name) return;
    const newStudent = { id: Date.now(), ...studentForm, registrationDate: new Date().toLocaleDateString('pt-BR') };
    setStudents(prev => [...prev, newStudent]);
    logAction(`Novo aluno cadastrado: ${newStudent.name}`);
    setShowNewStudentModal(false);
    setStudentForm({ name: '', cpf: '', email: '', phone: '', birthDate: '' });
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!teacherForm.name) return;
    const newTeacher = { id: Date.now(), ...teacherForm };
    setTeachers(prev => [...prev, newTeacher]);
    logAction(`Novo professor cadastrado: ${newTeacher.name}`);
    setShowNewTeacherModal(false);
    setTeacherForm({ name: '', cpf: '', email: '', phone: '', pixKey: '', birthDate: '' });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseForm.name) return;
    const newCourse = { id: Date.now(), ...courseForm };
    setBaseCourses(prev => [...prev, newCourse]);
    logAction(`Novo curso cadastrado: ${newCourse.name}`);
    setShowNewCourseModal(false);
    setCourseForm({ name: '', workload: '', description: '' });
  };

  const handleAddCohort = (e) => {
    e.preventDefault();
    if (!cohortForm.baseCourseId) return;
    const newCohort = { id: Date.now(), ...cohortForm, baseCourseId: Number(cohortForm.baseCourseId) };
    setCohorts(prev => [...prev, newCohort]);
    logAction(`Nova turma criada: ${newCohort.code}`);
    setShowNewCohortModal(false);
    setCohortForm({ baseCourseId: '', code: '', startDate: '', basePrice: '' });
  };

  const handleQuickEnroll = (e) => {
    e.preventDefault();
    if (!quickForm.studentId || !quickForm.cohortId) {
      alert('Selecione um aluno e uma turma.');
      return;
    }
    const cohort = cohorts.find(c => c.id === Number(quickForm.cohortId));
    const student = students.find(s => s.id === Number(quickForm.studentId));

    const newEnr = { id: Date.now(), studentId: student.id, cohortId: cohort.id, status: 'active', date: new Date().toLocaleDateString('pt-BR') };
    
    setEnrollments(prev => [...prev, newEnr]);
    logAction(`Matrícula realizada: ${student.name} na turma ${cohort.code}`);
    setShowQuickEnrollModal(false);
  };

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

              {/* Alerta de Aniversariantes do Dia */}
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

              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500 uppercase">Entradas Confirmadas</span>
                  <div className="text-2xl font-bold text-slate-800 mt-1">R$ 0,00</div>
                  <span className="text-xs text-emerald-600 font-medium">✓ Recebido em caixa</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500 uppercase">A Vencer / Previsto</span>
                  <div className="text-2xl font-bold text-slate-800 mt-1">R$ 0,00</div>
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

              {/* Atalhos Operacionais */}
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
                        <th className="p-3">CPF</th>
                        <th className="p-3">Contato</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {students.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-800">{s.name}</td>
                          <td className="p-3 text-slate-600">{s.birthDate ? new Date(s.birthDate + 'T00:00:00').toLocaleDateString('pt-BR') : 'N/A'}</td>
                          <td className="p-3 text-slate-600">{s.cpf || 'N/A'}</td>
                          <td className="p-3 text-slate-600">{s.phone} | {s.email}</td>
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
                        <th className="p-3">Contato</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {teachers.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-800">{t.name}</td>
                          <td className="p-3 text-slate-600">{t.birthDate ? new Date(t.birthDate + 'T00:00:00').toLocaleDateString('pt-BR') : 'N/A'}</td>
                          <td className="p-3 font-mono text-xs text-slate-600">{t.pixKey || 'N/A'}</td>
                          <td className="p-3 text-slate-600">{t.phone}</td>
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
                    {baseCourses.map(c => <div key={c.id} className="p-3 border rounded bg-slate-50"><h4 className="font-bold text-indigo-900">{c.name}</h4><p className="text-xs text-slate-500">{c.workload}h</p></div>)}
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-slate-800">Turmas</h2>
                  <button onClick={() => setShowNewCohortModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-lg">
                    + Abrir Turma
                  </button>
                </div>
                {cohorts.length === 0 ? <p className="text-slate-400 text-xs italic">Nenhuma turma cadastrada.</p> : (
                  <div className="border rounded-xl"><table className="w-full text-left text-sm"><thead className="bg-slate-100"><tr><th className="p-3">Código</th><th className="p-3">Preço Base</th></tr></thead><tbody className="divide-y">{cohorts.map(c => <tr key={c.id}><td className="p-3 font-bold">{c.code}</td><td className="p-3">R$ {Number(c.basePrice).toFixed(2)}</td></tr>)}</tbody></table></div>
                )}
              </div>
            </div>
          )}

          {/* FINANCEIRO */}
          {activeTab === 'finance' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Financeiro & Repasses</h2>
              <p className="text-slate-500 text-sm">Controle financeiro de recebimentos e saídas.</p>
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

      {/* MODAL CADASTRAR ALUNO */}
      {showNewStudentModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Cadastrar Novo Aluno</h3>
            <form onSubmit={handleAddStudent} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo *</label>
                <input required type="text" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">CPF</label>
                  <input type="text" value={studentForm.cpf} onChange={e => setStudentForm({ ...studentForm, cpf: e.target.value })} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Data Nascimento</label>
                  <input type="date" value={studentForm.birthDate} onChange={e => setStudentForm({ ...studentForm, birthDate: e.target.value })} className="w-full p-2 border rounded" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Telefone</label>
                  <input type="text" value={studentForm.phone} onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">E-mail</label>
                  <input type="email" value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} className="w-full p-2 border rounded" />
                </div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewStudentModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar Aluno</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CADASTRAR PROFESSOR */}
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
                <button type="button" onClick={() => setShowNewTeacherModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar Professor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CADASTRAR CURSO BASE */}
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
                <button type="button" onClick={() => setShowNewCourseModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded font-semibold">Salvar Curso</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ABRIR TURMA */}
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
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Código da Turma (Ex: TURMA-2026-A)</label>
                <input type="text" value={cohortForm.code} onChange={e => setCohortForm({ ...cohortForm, code: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Preço Base (R$)</label>
                <input type="number" value={cohortForm.basePrice} onChange={e => setCohortForm({ ...cohortForm, basePrice: e.target.value })} className="w-full p-2 border rounded" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewCohortModal(false)} className="px-3 py-1.5 border rounded text-slate-600">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded font-semibold">Criar Turma</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MATRÍCULA RÁPIDA */}
      {showQuickEnrollModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Efetuar Matrícula</h3>
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
                  {cohorts.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
                </select>
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
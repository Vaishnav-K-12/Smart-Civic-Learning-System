import { Sun, Moon, LogOut, Award, User as UserIcon, BookOpen, CheckSquare, MessageSquare, ShieldAlert, Users, Volume2, Globe } from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  lang: 'en' | 'te';
  setLang: (l: 'en' | 'te') => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  onSelectLoginRole?: (type: 'citizen' | 'official') => void;
}

export default function Navbar({
  user,
  onLogout,
  lang,
  setLang,
  darkMode,
  setDarkMode,
  activeTab,
  setActiveTab,
  onSelectLoginRole
}: NavbarProps) {
  const t = {
    en: {
      title: "Smart Civic Learning",
      tagline: "Ward 88, AP",
      landing: "Home",
      dashboard: "Dashboard",
      modules: "Modules",
      challenges: "Challenges",
      reports: "Report Issues",
      leaderboard: "Leaderboard",
      teacher: "Teacher Portal",
      admin: "Admin Portal",
      logout: "Sign Out",
      points: "Points",
      level: "Level"
    },
    te: {
      title: "స్మార్ట్ సివిక్ లెర్నింగ్",
      tagline: "వార్డు 88, ఏపీ",
      landing: "హోమ్",
      dashboard: "డాష్‌బోర్డ్",
      modules: "పాఠ్యాంశాలు",
      challenges: "సవాళ్లు",
      reports: "సమస్యల నివేదిక",
      leaderboard: "లీడర్‌బోర్డ్",
      teacher: "ఉపాధ్యాయుని పోర్టల్",
      admin: "అడ్మిన్ పోర్టల్",
      logout: "లాగ్ అవుట్",
      points: "పాయింట్లు",
      level: "స్థాయి"
    }
  };

  const nav = t[lang];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20 mr-3">
              <Award className="h-6 w-6" id="navbar-logo-icon" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                {nav.title}
              </h1>
              <p className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                {nav.tagline}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'landing'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {nav.landing}
            </button>

            {user && (
              <>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'dashboard'
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {nav.dashboard}
                </button>

                <button
                  onClick={() => setActiveTab('modules')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'modules'
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {nav.modules}
                </button>

                <button
                  onClick={() => setActiveTab('challenges')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'challenges'
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {nav.challenges}
                </button>

                <button
                  onClick={() => setActiveTab('reports')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'reports'
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {nav.reports}
                </button>

                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'leaderboard'
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {nav.leaderboard}
                </button>

                {user.role === UserRole.TEACHER && (
                  <button
                    onClick={() => setActiveTab('teacher')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all border border-blue-200 dark:border-blue-900 ${
                      activeTab === 'teacher'
                        ? 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950'
                        : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    {nav.teacher}
                  </button>
                )}

                {user.role === UserRole.ADMIN && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all border border-emerald-200 dark:border-emerald-900 ${
                      activeTab === 'admin'
                        ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950'
                        : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                    }`}
                  >
                    {nav.admin}
                  </button>
                )}
              </>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2">
            {/* User points pill */}
            {user && (
              <div className="hidden sm:flex items-center bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-full px-3 py-1 mr-1">
                <Award className="h-4 w-4 text-amber-500 mr-1.5" />
                <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">
                  {user.points} <span className="text-[10px] opacity-75">{nav.points}</span>
                </span>
                <span className="mx-1.5 text-blue-200">|</span>
                <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                  Lvl {user.level}
                </span>
              </div>
            )}

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              title="Toggle Language"
            >
              <Globe className="h-3.5 w-3.5 text-blue-500" />
              <span>{lang === 'en' ? 'EN' : 'తెలుగు'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Authentication Buttons / Profile */}
            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <UserIcon className="h-4 w-4 text-blue-600" />
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                  title={nav.logout}
                >
                  <LogOut className="h-4.5 w-4.5" id="logout-button" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    if (onSelectLoginRole) onSelectLoginRole('citizen');
                    setActiveTab('login');
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition border border-blue-200 dark:border-blue-900/50 cursor-pointer"
                >
                  Citizen Login
                </button>
                <button
                  onClick={() => {
                    if (onSelectLoginRole) onSelectLoginRole('official');
                    setActiveTab('login');
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition border border-indigo-200 dark:border-indigo-900/50 cursor-pointer"
                >
                  Official Login
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar for quick touch targets */}
      {user && (
        <div className="lg:hidden flex items-center justify-around border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-2 px-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center p-1 text-[10px] font-medium transition ${
              activeTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
            }`}
          >
            <UserIcon className="h-4 w-4 mb-0.5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`flex flex-col items-center justify-center p-1 text-[10px] font-medium transition ${
              activeTab === 'modules' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
            }`}
          >
            <BookOpen className="h-4 w-4 mb-0.5" />
            <span>Modules</span>
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex flex-col items-center justify-center p-1 text-[10px] font-medium transition ${
              activeTab === 'challenges' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
            }`}
          >
            <CheckSquare className="h-4 w-4 mb-0.5" />
            <span>Challenges</span>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex flex-col items-center justify-center p-1 text-[10px] font-medium transition ${
              activeTab === 'reports' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
            }`}
          >
            <ShieldAlert className="h-4 w-4 mb-0.5" />
            <span>Reports</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex flex-col items-center justify-center p-1 text-[10px] font-medium transition ${
              activeTab === 'leaderboard' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
            }`}
          >
            <Users className="h-4 w-4 mb-0.5" />
            <span>Leaders</span>
          </button>
        </div>
      )}
    </header>
  );
}

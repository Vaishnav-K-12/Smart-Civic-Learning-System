import React, { useState, useEffect } from 'react';
import { Users, FileDown, CheckCircle, XCircle, Award, Volume2, ArrowRight, BookOpen, Clock, BarChart, PlusCircle, CheckCircle2, AlertTriangle, MapPin } from 'lucide-react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { User, ChallengeSubmission, Certificate, CommunityReport } from '../types';

interface TeacherPortalProps {
  token: string;
  lang: 'en' | 'te';
  reports?: CommunityReport[];
  onUpdateReportStatus?: (id: string, status: 'reported' | 'investigating' | 'resolved', notes: string) => void;
  onChallengeCreated?: () => void;
}

export default function TeacherPortal({ token, lang, reports = [], onUpdateReportStatus, onChallengeCreated }: TeacherPortalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [submissions, setSubmissions] = useState<ChallengeSubmission[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  
  // Custom challenge form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPoints, setNewPoints] = useState(100);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Status note updates per report id
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  const loadData = async () => {
    try {
      // Get all users (from leaderboard endpoint)
      const usersRes = await fetch('/api/leaderboard');
      const usersData = await usersRes.json();
      setUsers(usersData.leaderboard || []);

      // Get submitted challenge proofs
      const subsRes = await fetch('/api/teacher/submissions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const subsData = await subsRes.json();
      setSubmissions(subsData.submissions || []);

      // Get granted certificates
      const certsRes = await fetch('/api/teacher/certificates', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const certsData = await certsRes.json();
      setCertificates(certsData.certificates || []);

      // Get general analytics
      const analyticsRes = await fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const analyticsData = await analyticsRes.json();
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed fetching teacher portal data', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleCreateChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim() || !newPoints) return;

    try {
      const res = await fetch('/api/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          points: Number(newPoints)
        })
      });
      if (res.ok) {
        setFeedbackMsg('Civic campaign challenge published successfully to all citizens!');
        setNewTitle('');
        setNewDesc('');
        setNewPoints(100);
        loadData();
        if (onChallengeCreated) {
          onChallengeCreated();
        }
        setTimeout(() => setFeedbackMsg(''), 5000);
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to create challenge');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGrantCertificate = async (userId: string) => {
    try {
      const res = await fetch('/api/teacher/grant-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      });
      if (res.ok) {
        setFeedbackMsg('Certificate granted successfully to citizen!');
        loadData();
        setTimeout(() => setFeedbackMsg(''), 4000);
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to grant certificate');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (subId: string) => {
    try {
      const res = await fetch(`/api/teacher/submissions/${subId}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSubmissions(prev => prev.map(s => s.id === subId ? { ...s, status: 'approved' } : s));
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (subId: string) => {
    try {
      const res = await fetch(`/api/teacher/submissions/${subId}/reject`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSubmissions(prev => prev.map(s => s.id === subId ? { ...s, status: 'rejected' } : s));
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadCSV = () => {
    // Direct browser redirect to CSV route with authorization query/cookie or download link
    const anchor = document.createElement('a');
    anchor.href = `/api/teacher/export-csv`;
    // Pass session token as query parameter so browser can download directly
    anchor.setAttribute('download', 'civic_learning_engagement_report.csv');
    // Using a simple fetch with token, then generating blob is safer for auth headers
    fetch('/api/teacher/export-csv', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      anchor.href = url;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  // Recharts Chart Formats
  const chartData = users.slice(0, 5).map(u => ({
    name: u.name.split(' ')[0],
    Points: u.points,
    Level: u.level
  }));

  const pieData = analytics ? [
    { name: 'Approved', value: analytics.approvedChallenges, color: '#22C55E' },
    { name: 'Pending', value: Math.max(0, analytics.totalSubmissions - analytics.approvedChallenges), color: '#3B82F6' }
  ] : [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Teacher & Volunteer Coordinator Portal
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monitor regional student progress, download survey reports, and approve community campaign challenge proofs.
          </p>
        </div>
        <button
          onClick={handleDownloadCSV}
          className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-500/10 transition cursor-pointer"
        >
          <FileDown className="h-4.5 w-4.5" />
          <span>Export CSP CSV Report</span>
        </button>
      </div>

      {/* Metrics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xs">
            <Users className="h-6 w-6 text-blue-500 mb-2" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Enrolled Citizens</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{analytics.totalUsers}</p>
          </div>
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xs">
            <Award className="h-6 w-6 text-emerald-500 mb-2" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed Challenges</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{analytics.totalSubmissions}</p>
          </div>
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xs">
            <BookOpen className="h-6 w-6 text-amber-500 mb-2" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quizzes Passed</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{analytics.totalQuizzesPassed}</p>
          </div>
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xs">
            <BarChart className="h-6 w-6 text-indigo-500 mb-2" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Quiz Score</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{analytics.averageQuizScore}%</p>
          </div>
        </div>
      )}

      {/* Post a New Challenge Form */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span>Post a New Community Campaign Challenge</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish a civic campaign challenge (e.g. Backyard Tree Plantation, Waste Segregation) that citizens can complete to earn points and XP.
          </p>
        </div>

        <form onSubmit={handleCreateChallenge} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase">Challenge Title (English)</label>
            <input
              type="text"
              required
              placeholder="e.g. Backyard Tree Plantation"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase">Description / Instruction</label>
            <input
              type="text"
              required
              placeholder="e.g. Plant a sapling in your compound and upload photo proof."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div className="space-y-1 flex flex-col md:flex-row items-end gap-3">
            <div className="flex-1 w-full">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Points Reward</label>
              <input
                type="number"
                min="10"
                max="500"
                value={newPoints}
                onChange={(e) => setNewPoints(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition whitespace-nowrap cursor-pointer"
            >
              Publish Challenge
            </button>
          </div>
        </form>

        {feedbackMsg && (
          <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
            {feedbackMsg}
          </p>
        )}
      </div>

      {/* Grid of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recharts Bar */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider">Top Students Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="Points" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Level" fill="#10B981" radius={[4, 4, 0, 0]} />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recharts Pie */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider">Challenge Proof Approval Rates</h3>
          <div className="h-64 flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-400 text-xs">No analytics logs available</p>
            )}
          </div>
        </div>
      </div>

      {/* Create New Challenge Form */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <PlusCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span>Publish New Civic Campaign Challenge</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish a physical civic campaign action or community task for Ward 88 citizens to perform and upload proof for verification.
          </p>
        </div>

        {feedbackMsg && (
          <div className="p-3 text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-100 dark:border-emerald-900 font-medium animate-pulse">
            {feedbackMsg}
          </div>
        )}

        <form onSubmit={handleCreateChallenge} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Challenge Title (English)</label>
              <input
                type="text"
                required
                placeholder="e.g. Clean the local beach"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">XP Points / Wallet Reward</label>
              <input
                type="number"
                required
                min={10}
                max={1000}
                value={newPoints}
                onChange={(e) => setNewPoints(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Challenge Description & Proof requirements</label>
            <textarea
              required
              rows={3}
              placeholder="Provide a clear description of the physical task and specify what proof (e.g. photo of segregation, or cloth bags) needs to be submitted."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
            >
              Publish Campaign Challenge
            </button>
          </div>
        </form>
      </div>

      {/* Verify Submissions Area */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Verify Citizen Challenge Submissions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Review uploaded photographic proofs of completed physical tasks and release rewards directly to citizen wallets.
          </p>
        </div>

        <div className="space-y-4">
          {submissions.filter(s => s.status === 'pending').length === 0 ? (
            <div className="text-center py-10 text-slate-400 border border-dashed border-slate-200 dark:border-slate-700/80 rounded-xl">
              <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-semibold">All submissions verified</p>
              <p className="text-xs opacity-75">No pending proofs require manual verification today.</p>
            </div>
          ) : (
            submissions.filter(s => s.status === 'pending').map((sub) => (
              <div
                key={sub.id}
                className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded uppercase">
                      {sub.challengeTitle}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(sub.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Citizen: {sub.userName}
                  </p>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    "{sub.proofText}"
                  </p>

                  <p className="text-[11px] font-semibold text-emerald-600">
                    Reward value: +{sub.pointsAwarded} XP / Points
                  </p>
                </div>

                {/* Proof photo */}
                {sub.photoUrl && (
                  <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 flex-shrink-0">
                    <img src={sub.photoUrl} alt="Challenge proof visual" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Approve/Reject CTA */}
                <div className="flex md:flex-col justify-end items-center gap-2">
                  <button
                    onClick={() => handleApprove(sub.id)}
                    className="flex-1 md:w-full flex items-center justify-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Approve Release</span>
                  </button>
                  <button
                    onClick={() => handleReject(sub.id)}
                    className="flex-1 md:w-full flex items-center justify-center space-x-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Reject Proof</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Monitor list of students */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white">Active Citizen Profiles Registry</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-900 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Citizen Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Rank Level</th>
                <th className="p-3">Wallet Points</th>
                <th className="p-3">Badges Distributed</th>
                <th className="p-3 text-right">Certificate Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition">
                  <td className="p-3 font-semibold text-slate-850 dark:text-slate-100">{u.name}</td>
                  <td className="p-3">{u.location}</td>
                  <td className="p-3 font-mono font-medium">Level {u.level}</td>
                  <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{u.points} pts</td>
                  <td className="p-3 font-mono">{u.badgesCount} badges</td>
                  <td className="p-3 text-right">
                    {certificates.some(c => c.userId === u.id) ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-100 dark:border-emerald-900 font-bold text-[10px]">
                        <Award className="h-3.5 w-3.5 text-emerald-500 animate-bounce" />
                        <span>Certified ({certificates.find(c => c.userId === u.id)?.certificateNumber})</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleGrantCertificate(u.id)}
                        className="px-3 py-1 bg-blue-150 hover:bg-blue-200 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-[10px] rounded-lg transition inline-flex items-center space-x-1 cursor-pointer"
                      >
                        <Award className="h-3.5 w-3.5 text-blue-500" />
                        <span>Grant CSP Certificate</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Community Grievance & Dispatches */}
      <div id="community-grievance-section" className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-rose-500 animate-pulse" />
            Manage Community Grievance Reports (Citizen Complaints)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitor littering, potholes, or damaged assets in Ward No. 88 and immediately dispatch warnings/resolutions to citizens.
          </p>
        </div>

        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
          {reports.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">No community reports submitted yet.</div>
          ) : (
            reports.map((rep) => (
              <div
                key={rep.id}
                className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-xs font-mono font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-600 px-2 py-0.5 rounded border border-rose-100 dark:border-rose-900/50">
                    {rep.type.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 font-bold rounded uppercase ${
                    rep.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                    rep.status === 'investigating' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {rep.status === 'investigating' ? 'Underway / Dispatched' : rep.status}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 flex-1">
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold flex items-center">
                      <MapPin className="h-3.5 w-3.5 text-rose-500 mr-1" />
                      {rep.location}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                      "{rep.description}"
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Reported by: <span className="font-semibold text-slate-600 dark:text-slate-300">{rep.userName}</span> • {new Date(rep.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  {rep.photoUrl && (
                    <div className="w-20 h-16 rounded overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                      <img src={rep.photoUrl} alt="Evidence" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Direct Action triggers */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  {rep.status !== 'resolved' ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Add custom dispatch updates or resolution remarks..."
                        value={notes[rep.id] || ''}
                        onChange={(e) => setNotes({ ...notes, [rep.id]: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600"
                      />
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            if (onUpdateReportStatus) {
                              const noteText = notes[rep.id] || 'Work is underway to fix your reported issue! Our dispatch team has been notified and is on the way.';
                              onUpdateReportStatus(rep.id, 'investigating', noteText);
                            }
                          }}
                          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center space-x-1 cursor-pointer"
                        >
                          <span>⚡ Notify Citizen: Work on Way!</span>
                        </button>
                        <button
                          onClick={() => {
                            if (onUpdateReportStatus) {
                              const noteText = notes[rep.id] || 'Verified and resolved by our local CSP coordination team. Thank you!';
                              onUpdateReportStatus(rep.id, 'resolved', noteText);
                            }
                          }}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Check & Resolve Issue</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-100 dark:border-emerald-900/60 text-[11px] text-emerald-800 dark:text-emerald-300">
                      <span className="font-bold">Resolution Note sent to Citizen: </span>
                      {rep.adminNotes || "Issue checked and resolved successfully."}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Megaphone, AlertCircle, MessageSquare, Trash2, CheckCircle2, SlidersHorizontal, MapPin } from 'lucide-react';
import { CommunityReport, Feedback, Announcement } from '../types';

interface AdminPortalProps {
  token: string;
  lang: 'en' | 'te';
  reports: CommunityReport[];
  onUpdateReportStatus: (id: string, status: 'reported' | 'investigating' | 'resolved', notes: string) => void;
}

export default function AdminPortal({ token, lang, reports, onUpdateReportStatus }: AdminPortalProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  
  // Announcement form state
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annMsg, setAnnMsg] = useState('');

  // Report status inputs per report id
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  const loadAdminData = async () => {
    try {
      // Get feedbacks
      const fbRes = await fetch('/api/feedback');
      const fbData = await fbRes.json();
      setFeedbacks(fbData.feedbacks || []);

      // Get announcements
      const annRes = await fetch('/api/announcements');
      const annData = await annRes.json();
      setAnnouncements(annData.announcements || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: annTitle, content: annContent })
      });
      if (res.ok) {
        setAnnMsg('Announcement broadcasted successfully to all Ward 88 citizens.');
        setAnnTitle('');
        setAnnContent('');
        loadAdminData();
        setTimeout(() => setAnnMsg(''), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Command Center</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Post emergency announcements, track community safety reports, and inspect educational feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Col 1 - Dispatch Announcement */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
            <Megaphone className="h-5 w-5 mr-2 text-blue-600" />
            Dispatch Announcement
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish notifications about beach cleanups, composting programs, or road repairs directly to all citizen dashboards.
          </p>

          <form onSubmit={handlePostAnnouncement} className="space-y-3 pt-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Title</label>
              <input
                required
                type="text"
                placeholder="e.g., Road repairs near High Road"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Detailed Content</label>
              <textarea
                required
                rows={4}
                placeholder="Provide date, timing, coordination instructions, or links..."
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            {annMsg && (
              <p className="text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-100">
                {annMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-md transition cursor-pointer"
            >
              Broadcast Notification
            </button>
          </form>

          {/* Active announcements list */}
          <div className="pt-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase">Recent Broadcasts</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{ann.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{ann.content}</p>
                  <p className="text-[9px] text-slate-400 font-mono mt-1">
                    {new Date(ann.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2 - Community reports escalation queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-rose-500" />
              Manage Community Grievances
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Escalate littering, road blocks, or damaged water pipelines to repair teams and award 150 points upon resolution.
            </p>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {reports.length === 0 ? (
                <p className="text-center py-8 text-slate-400 text-xs">No active reports</p>
              ) : (
                reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="text-xs font-mono font-bold bg-rose-50 text-rose-600 px-2 py-0.5 rounded border border-rose-100">
                        {rep.type.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 font-bold rounded uppercase ${
                        rep.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                        rep.status === 'investigating' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {rep.status === 'investigating' ? 'Under Investigation' : rep.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold flex items-center">
                      <MapPin className="h-3.5 w-3.5 text-rose-500 mr-1" />
                      {rep.location}
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                      "{rep.description}"
                    </p>

                    {/* Report action resolution details */}
                    {rep.status !== 'resolved' ? (
                      <div className="flex flex-col space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <input
                          type="text"
                          placeholder="Resolution/Investigation comments..."
                          value={notes[rep.id] || ''}
                          onChange={(e) => setNotes({ ...notes, [rep.id]: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => {
                              onUpdateReportStatus(
                                rep.id,
                                'investigating',
                                notes[rep.id] || 'Work is underway to fix your reported issue! Our dispatch team has been notified and is on the way.'
                              );
                            }}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg shadow-sm transition cursor-pointer flex items-center space-x-1"
                          >
                            <span>⚡ Notify Citizen: Work on Way!</span>
                          </button>
                          <button
                            onClick={() => {
                              onUpdateReportStatus(rep.id, 'resolved', notes[rep.id] || 'Pothole/litter resolved by local municipal team.');
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition cursor-pointer"
                          >
                            Resolve & Award
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-100 dark:border-emerald-900/60 text-[11px] text-emerald-800 dark:text-emerald-300">
                        <span className="font-bold">Resolution: </span>
                        {rep.adminNotes || "Resolved successfully."}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Citizen Feedback auditing */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-amber-500" />
              Citizen Feedback & Course Ratings
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Audit course satisfaction ratings and review suggested improvements.
            </p>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {feedbacks.length === 0 ? (
                <p className="text-center py-6 text-slate-400 text-xs">No feedback submitted yet</p>
              ) : (
                feedbacks.map((fb) => (
                  <div key={fb.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-150 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{fb.moduleTitle}</span>
                      <span className="text-amber-500 font-bold">★ {fb.rating}/5</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 italic">"{fb.suggestion || 'No remarks left.'}"</p>
                    <p className="text-[9px] text-slate-400 font-mono">By: {fb.userName} • {new Date(fb.timestamp).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

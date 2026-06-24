import React, { useState } from 'react';
import { Camera, MapPin, AlertTriangle, CheckCircle, Clock, Eye, SlidersHorizontal, Trash2 } from 'lucide-react';
import { CommunityReport } from '../types';

interface ReportIssueFormProps {
  reports: CommunityReport[];
  onSubmit: (data: { type: any; location: string; description: string; photoUrl: string }) => void;
  isAdmin: boolean;
  onUpdateStatus?: (id: string, status: 'reported' | 'investigating' | 'resolved', notes: string) => void;
  lang: 'en' | 'te';
}

export default function ReportIssueForm({
  reports,
  onSubmit,
  isAdmin,
  onUpdateStatus,
  lang
}: ReportIssueFormProps) {
  const [type, setType] = useState<'littering' | 'broken_road' | 'damaged_property' | 'unsafe_crossing'>('littering');
  const [location, setLocation] = useState('Mangalapalem Sachivalayam Entrance, Visakhapatnam');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [statusNotes, setStatusNotes] = useState<{ [key: string]: string }>({});

  const landmarks = [
    "Mangalapalem Sachivalayam Entrance",
    "Ward No. 88 Primary School Junction",
    "Visakhapatnam High Road Crossing",
    "Secondary Drinking Water Tank Area",
    "Local Community Park & Library",
    "Mangalapalem Main Bazaar Street"
  ];

  const landmarkCoords: { [key: string]: { lat: number; lng: number; x: number; y: number } } = {
    "Mangalapalem Sachivalayam Entrance": { lat: 17.6868, lng: 83.2185, x: 50, y: 50 },
    "Ward No. 88 Primary School Junction": { lat: 17.6881, lng: 83.2170, x: 30, y: 35 },
    "Visakhapatnam High Road Crossing": { lat: 17.6852, lng: 83.2198, x: 70, y: 65 },
    "Secondary Drinking Water Tank Area": { lat: 17.6895, lng: 83.2210, x: 80, y: 20 },
    "Local Community Park & Library": { lat: 17.6860, lng: 83.2155, x: 20, y: 60 },
    "Mangalapalem Main Bazaar Street": { lat: 17.6875, lng: 83.2202, x: 65, y: 45 }
  };

  const getSelectedCoordinates = () => {
    for (const key of Object.keys(landmarkCoords)) {
      if (location.includes(key)) {
        return landmarkCoords[key];
      }
    }
    return landmarkCoords["Mangalapalem Sachivalayam Entrance"];
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onSubmit({
      type,
      location,
      description,
      photoUrl: photo
    });
    // Reset
    setDescription('');
    setPhoto('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle className="h-3 w-3 mr-1 text-emerald-500" />
            Resolved
          </span>
        );
      case 'investigating':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
            <Clock className="h-3 w-3 mr-1 text-amber-500" />
            Investigating
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            <AlertTriangle className="h-3 w-3 mr-1 text-blue-500" />
            Reported
          </span>
        );
    }
  };

  const filteredReports = reports.filter(r => filterType === 'all' || r.type === filterType);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Col 1 - Create Report Form */}
      <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-rose-500" />
            Report Civic Issue
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Empower local secretaria Secretariat teams to resolve issues in Mangalapalem instantly.
          </p>
        </div>

        <form onSubmit={handleSubmitReport} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Issue Type
            </label>
            <select
              value={type}
              onChange={(e: any) => setType(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="littering">Public Littering / Garbage</option>
              <option value="broken_road">Broken Road / Pothole</option>
              <option value="damaged_property">Damaged Public Property</option>
              <option value="unsafe_crossing">Unsafe Crossing Spot</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Simulated Location Spot
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {landmarks.map((l, idx) => (
                <option key={idx} value={`${l}, Visakhapatnam`}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Issue Description
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context like size of pothole, blockages, or risk factors to aid speed of resolution..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Upload Photo Proof
            </label>
            <div className="flex items-center space-x-3">
              <label className="flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl cursor-pointer hover:bg-blue-100 transition border border-blue-100 dark:border-blue-900/50">
                <Camera className="h-5 w-5 mr-1.5" />
                <span className="text-xs font-semibold">Capture / Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {photo && (
                <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100">
                  <img src={photo} alt="Upload preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPhoto('')}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[10px] font-bold opacity-0 hover:opacity-100 transition"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Map */}
          <div className="pt-2">
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Secretariat Interactive Map (Ward 88)
            </label>
            <div className="h-32 rounded-xl bg-slate-100 dark:bg-slate-900/40 relative overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center">
              {/* Fake Radar Map visual background */}
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:12px_12px] opacity-15"></div>
              
              {/* Concentric radar circles */}
              <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 border border-blue-500/10 rounded-full pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 w-[140px] h-[140px] -translate-x-1/2 -translate-y-1/2 border border-blue-500/10 rounded-full pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 w-[60px] h-[60px] -translate-x-1/2 -translate-y-1/2 border border-blue-500/10 rounded-full pointer-events-none"></div>

              {/* Render other reports as small dots with tooltips */}
              {reports && reports.map((rep) => {
                let coords = null;
                for (const name of Object.keys(landmarkCoords)) {
                  if (rep.location && rep.location.includes(name)) {
                    coords = landmarkCoords[name];
                    break;
                  }
                }
                if (!coords) return null;

                const isResolved = rep.status === 'resolved';
                const isInvestigating = rep.status === 'investigating';
                const colorClass = isResolved 
                  ? 'bg-emerald-500 hover:bg-emerald-600' 
                  : isInvestigating 
                    ? 'bg-amber-500 hover:bg-amber-600' 
                    : 'bg-red-500 hover:bg-red-600';

                return (
                  <div
                    key={rep.id}
                    style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
                  >
                    <div className={`h-3 w-3 rounded-full ${colorClass} flex items-center justify-center shadow-md transition-transform hover:scale-125 border border-white dark:border-slate-950`}>
                      <span className="w-1 h-1 rounded-full bg-white"></span>
                    </div>
                    {/* Hover tooltip */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-slate-900/95 dark:bg-slate-950/95 text-white text-[10px] p-2.5 rounded-lg shadow-xl border border-slate-700/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                      <p className="font-extrabold text-blue-400 text-xs mb-0.5">{rep.type.replace('_', ' ').toUpperCase()}</p>
                      <p className="font-semibold text-slate-200">{rep.location.split(',')[0]}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5 max-w-[200px] overflow-hidden text-ellipsis">{rep.description}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${isResolved ? 'bg-emerald-400' : isInvestigating ? 'bg-amber-400' : 'bg-red-400'}`}></span>
                        <span className="text-[9px] font-bold text-slate-300 capitalize">{rep.status}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bouncing Map Pin for currently selected landmark */}
              <div
                style={{ left: `${getSelectedCoordinates().x}%`, top: `${getSelectedCoordinates().y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out z-10"
              >
                <div className="absolute h-8 w-8 -left-2 -top-2 rounded-full border border-blue-500 animate-ping opacity-35 pointer-events-none"></div>
                <div className="h-5.5 w-5.5 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                  <MapPin className="h-3.5 w-3.5 text-white animate-bounce" />
                </div>
              </div>

              {/* Bottom geo coordinate label */}
              <span className="absolute bottom-2 left-2 bg-slate-900/90 dark:bg-slate-950/90 text-white text-[9px] font-mono px-2 py-0.5 rounded-md border border-slate-800 shadow-md">
                GEO: {getSelectedCoordinates().lat.toFixed(4)}° N, {getSelectedCoordinates().lng.toFixed(4)}° E
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition"
          >
            Submit Report (Earn Points)
          </button>
        </form>
      </div>

      {/* Col 2 - Active Reports Dashboard */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Community Issues</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live bulletin of reported issues currently tracked by Ward No. 88 secretaries.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="littering">Littering</option>
              <option value="broken_road">Broken Roads</option>
              <option value="damaged_property">Public Property</option>
              <option value="unsafe_crossing">Unsafe Crossings</option>
            </select>
          </div>
        </div>

        {/* List of reports */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
              <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold">No issues currently reported</p>
              <p className="text-xs opacity-75">Be the first to keep Ward No. 88 clean and safe!</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:shadow-xs transition flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                      {report.type.replace('_', ' ').toUpperCase()}
                    </span>
                    {getStatusBadge(report.status)}
                    <span className="text-[10px] text-slate-400 font-mono ml-auto md:ml-0">
                      {new Date(report.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center">
                    <MapPin className="h-3.5 w-3.5 text-rose-500 mr-1" />
                    {report.location}
                  </h3>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {report.description}
                  </p>

                  <p className="text-[10px] text-slate-400 font-medium">
                    Reported by: <span className="text-slate-600 dark:text-slate-300 font-semibold">{report.userName}</span>
                  </p>

                  {/* Admin notes displaying resolution updates */}
                  {report.adminNotes && (
                    <div className={`mt-2 p-2.5 rounded-lg border ${
                      report.status === 'resolved'
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-50/60 dark:bg-amber-950/25 border-amber-150 dark:border-amber-900/60 text-amber-800 dark:text-amber-300'
                    }`}>
                      <p className="text-[11px] font-bold flex items-center">
                        {report.status === 'resolved' ? (
                          <>
                            <CheckCircle className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                            Secretariat Resolution Note:
                          </>
                        ) : (
                          <>
                            <Clock className="h-3.5 w-3.5 mr-1 text-amber-650 dark:text-amber-400 animate-pulse" />
                            Secretariat Update: Work Underway / Dispatched
                          </>
                        )}
                      </p>
                      <p className="text-[10px] mt-0.5 italic opacity-95">
                        {report.adminNotes}
                      </p>
                    </div>
                  )}

                  {/* Admin resolution gate */}
                  {isAdmin && onUpdateStatus && report.status !== 'resolved' && (
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Secretariat Status update:</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Add action note (e.g., 'Repaired road slab...')"
                          value={statusNotes[report.id] || ''}
                          onChange={(e) => setStatusNotes({ ...statusNotes, [report.id]: e.target.value })}
                          className="flex-1 px-2.5 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            onUpdateStatus(report.id, 'investigating', statusNotes[report.id] || '');
                          }}
                          className="px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded hover:bg-amber-600"
                        >
                          Investigate
                        </button>
                        <button
                          onClick={() => {
                            onUpdateStatus(report.id, 'resolved', statusNotes[report.id] || 'Verified and resolved by Ward No 88 secretariats.');
                          }}
                          className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded hover:bg-emerald-700"
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Report Image thumbnail if uploaded */}
                {report.photoUrl && (
                  <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 flex-shrink-0">
                    <img src={report.photoUrl} alt="Issue evidence" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

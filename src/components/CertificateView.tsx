import { Award, ShieldCheck, Printer, Calendar, BookOpen } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateViewProps {
  certificate: Certificate;
  onBack: () => void;
  lang: 'en' | 'te';
}

export default function CertificateView({ certificate, onBack, lang }: CertificateViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <div className="flex justify-between items-center mb-6 no-print">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          ← Back to Dashboard
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <Printer className="h-4 w-4" />
          <span>Download / Print PDF</span>
        </button>
      </div>

      {/* Styled Printable Certificate Container */}
      <div className="bg-white text-slate-900 border-12 border-double border-amber-600 p-8 sm:p-12 md:p-16 rounded-lg shadow-2xl relative overflow-hidden bg-[radial-gradient(#fdfbf7_1px,transparent_1px)] [background-size:16px_16px] print:border-8 print:shadow-none print:my-0">
        
        {/* Certificate Watermark background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none">
          <Award className="h-[400px] w-[400px] text-amber-500" />
        </div>

        {/* Certificate Headers */}
        <div className="text-center relative z-10 space-y-3">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-blue-50 border-4 border-amber-500 flex items-center justify-center text-amber-600 shadow-md">
              <Award className="h-12 w-12" />
            </div>
          </div>
          
          <h2 className="text-sm font-mono tracking-widest uppercase font-bold text-blue-700">
            GOVERNMENT OF ANDHRA PRADESH
          </h2>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 uppercase">
            MANGALAPALEM WARD SACHIVALAYAM - WARD NO. 88
          </h3>
          <p className="text-xs font-mono text-slate-500 tracking-wider">
            COMMUNITY SERVICE PROJECT (CSP) • VISAKHAPATNAM
          </p>

          <div className="h-1 w-40 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-4"></div>
        </div>

        {/* Certificate Body */}
        <div className="text-center relative z-10 my-10 space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl italic font-semibold text-amber-700 tracking-wide">
            Certificate of Responsible Citizenship
          </h1>
          
          <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">
            This is proudly awarded to
          </p>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 border-b border-slate-300 max-w-lg mx-auto pb-2 font-serif">
            {certificate.userName}
          </h2>

          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            for successfully completing the <span className="font-semibold text-blue-700">Smart Civic Learning Curriculum</span> on road safety, traffic awareness, Swachh Bharat cleanliness protocols, municipal waste management, and regional conservation guidelines under the AP CSP Framework.
          </p>

          <p className="text-sm text-slate-500 italic">
            In demonstration of active participation and compliance with the fundamental duties enshrined in Article 51A of the Indian Constitution, making a tangible positive impact in Mangalapalem Sachivalayam, Visakhapatnam.
          </p>
        </div>

        {/* Footers, Seals, and Signatures */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 mt-12 border-t border-slate-200">
          
          {/* Sign 1 */}
          <div className="text-center space-y-1">
            <div className="h-12 flex items-end justify-center font-serif italic text-sm text-slate-700">
              Dr. Prasad Rao
            </div>
            <div className="h-px bg-slate-400 max-w-[160px] mx-auto"></div>
            <p className="text-xs font-semibold text-slate-700">CSP Project Director</p>
            <p className="text-[10px] text-slate-400">Visakhapatnam CSP Grid</p>
          </div>

          {/* Seal Graphic */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="h-16 w-16 rounded-full border-4 border-dashed border-emerald-600 flex items-center justify-center text-emerald-600 font-mono text-[10px] font-bold rotate-12 bg-white/50 p-1">
              <div className="text-center leading-tight">
                SECRETARIAT<br/>SEAL<br/>★ W-88 ★
              </div>
            </div>
            <p className="text-[10px] font-mono text-slate-500 mt-1">Verified Digital Stamp</p>
          </div>

          {/* Sign 2 */}
          <div className="text-center space-y-1">
            <div className="h-12 flex items-end justify-center font-serif italic text-sm text-slate-700">
              K. Srinivasa Rao
            </div>
            <div className="h-px bg-slate-400 max-w-[160px] mx-auto"></div>
            <p className="text-xs font-semibold text-slate-700">Ward Secretariat Officer</p>
            <p className="text-[10px] text-slate-400">Sachivalayam Ward No. 88</p>
          </div>

        </div>

        {/* Certificate Metadata */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-slate-400 space-y-2 sm:space-y-0">
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
            <span>Awarded on: {certificate.completionDate}</span>
          </div>
          <div className="flex items-center">
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
            <span>Serial ID: {certificate.certificateNumber}</span>
          </div>
        </div>

      </div>

      {/* CSS print utility style injected locally to ensure absolute flawless output */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .no-print {
            display: none !important;
          }
          .bg-white {
            background-color: white !important;
            color: black !important;
          }
          /* Print only the certificate block */
          div.max-w-4xl, div.max-w-4xl * {
            visibility: visible;
          }
          div.max-w-4xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}

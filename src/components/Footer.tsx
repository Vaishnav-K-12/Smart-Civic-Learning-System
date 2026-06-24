import { Award, ShieldCheck, Heart, MapPin } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'te';
}

export default function Footer({ lang }: FooterProps) {
  const content = {
    en: {
      text: "Andhra Pradesh Community Service Project (CSP) educational initiative.",
      location: "Mangalapalem Sachivalayam, Ward No. 88, Visakhapatnam.",
      objective: "Dedicated to fostering social responsibility, waste management awareness, road safety compliance, and fundamental duties among citizens.",
      rights: "Smart Civic Learning System. Government-tech startup design."
    },
    te: {
      text: "ఆంధ్రప్రదేశ్ కమ్యూనిటీ సర్వీస్ ప్రాజెక్ట్ (CSP) విద్యా చొరవ.",
      location: "మంగళపాలెం సచివాలయం, వార్డు నెం. 88, విశాఖపట్నం.",
      objective: "పౌరులలో సామాజిక బాధ్యత, వ్యర్థాల నిర్వహణ, రహదారి భద్రత మరియు ప్రాథమిక విధులను పెంపొందించడానికి అంకితం చేయబడింది.",
      rights: "స్మార్ట్ సివిక్ లెర్నింగ్ సిస్టమ్. ప్రభుత్వం-టెక్ డిజైన్."
    }
  };

  const nav = content[lang];

  return (
    <footer className="w-full bg-slate-950 text-slate-300 py-12 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1 - CSP Branding */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white mr-3">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-wide">AP CSP Initiative</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {nav.text}
            </p>
            <div className="flex items-center text-xs text-slate-500 font-mono">
              <MapPin className="h-4 w-4 mr-1 text-blue-500" />
              {nav.location}
            </div>
          </div>

          {/* Col 2 - Mission & SDGS */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Project Focus</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              {nav.objective}
            </p>
          </div>

          {/* Col 3 - Framework & Compliance */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Legal & Compliance</h4>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span>Good Samaritan Law Protection</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span>Article 51A Fundamental Duties</span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-4">
              Andhra Pradesh Ward Secretariat No. 88 Development Grid.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {nav.rights}
          </p>
          <p className="text-xs text-slate-500 flex items-center mt-2 sm:mt-0">
            Made with <Heart className="h-3 w-3 text-rose-500 mx-1 fill-rose-500" /> for Visakhapatnam Citizens
          </p>
        </div>
      </div>
    </footer>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Award,
  BookOpen,
  CheckSquare,
  ShieldAlert,
  Users,
  LogOut,
  User as UserIcon,
  Globe,
  Sun,
  Moon,
  ArrowRight,
  Search,
  Bell,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Camera,
  MapPin,
  AlertTriangle,
  Clock,
  Compass,
  FileDown,
  BarChart,
  Send,
  Lock,
  Mail,
  Phone,
  ThumbsUp,
  HelpCircle,
  FileText,
  Sparkles,
  RefreshCw
} from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CertificateView from './components/CertificateView';
import ReportIssueForm from './components/ReportIssueForm';
import CivicQuizSystem from './components/CivicQuizSystem';
import TeacherPortal from './components/TeacherPortal';
import AdminPortal from './components/AdminPortal';
import { User, UserRole, Quiz, Module, Challenge, QuizResult, ChallengeSubmission, CommunityReport, RecommendationPath, Announcement } from './types';

// Let's declare our comprehensive, highly educational modules
const civicModules: Module[] = [
  {
    id: 'traffic-rules',
    title: 'Essential Traffic Rules & Signs',
    titleTe: 'ముఖ్యమైన ట్రాఫిక్ నియమాలు & సంకేతాలు',
    category: 'Road Safety',
    description: 'Learn critical road safety regulations, traffic signal meanings, and road markings specific to high roads.',
    descriptionTe: 'ముఖ్యమైన రహదారి భద్రతా నిబంధనలు, ట్రాఫిక్ సిగ్నల్స్ మరియు రోడ్డు మార్కింగ్‌లను నేర్చుకోండి.',
    content: `Understanding traffic rules prevents accidents and keeps highways moving. Key concepts include:
• Traffic Light Signals: Red means stop, Amber/Yellow means prepare to stop/caution, and Green means go safely.
• Road markings: A solid white line indicates lane changes are forbidden; dashed lines mean lane switching is allowed under care.
• Speed Guidelines: Heavy vehicles and school buses are limited to 40 km/h inside residential wards, while two-wheelers must follow 50 km/h limits on the Visakhapatnam national highway bypass.
• Good road habits: Maintain a safe stopping distance from the vehicle in front, and always wear certified helmets or seatbelts.`,
    contentTe: `ట్రాఫిక్ నియమాలను అర్థం చేసుకోవడం ప్రమాదాలను నిвариస్తుంది. ప్రధాన అంశాలు:
• ట్రాఫిక్ సిగ్నల్స్: ఎరుపు అంటే ఆగండి, పసుపు అంటే జాగ్రత్త వహించండి, ఆకుపచ్చ అంటే సురక్షితంగా వెళ్ళండి.
• రోడ్డు మార్కింగ్‌లు: నిరంతర తెల్లని గీత ఉన్నచోట లేన్ మారకూడదు; విరిగిన గీతలు ఉన్నచోట జాగ్రత్తగా మారవచ్చు.
• వేగ పరిమితులు: నివాస ప్రాంతాలలో పాఠశాల బస్సులు 40 కి.మీ/గం వేగంతో మాత్రమే వెళ్లాలి.`,
    quiz: {
      moduleId: 'traffic-rules',
      title: 'Traffic Rules Master Challenge',
      questions: [
        {
          id: 'q-tf-1',
          question: 'What does a solid single white line drawn down the center of the road mean?',
          questionTe: 'రోడ్డు మధ్యలో గీసిన తెల్లని నిరంతర గీత అర్థం ఏమిటి?',
          options: [
            'Overtaking and lane changes are prohibited',
            'You can park your vehicle anytime',
            'Overtaking is allowed freely',
            'None of the above'
          ],
          optionsTe: [
            'ఓవర్‌టేకింగ్ మరియు లేన్ మార్పులు నిషేధించబడ్డాయి',
            'మీరు వాహనాన్ని ఎప్పుడైనా పార్క్ చేయవచ్చు',
            'ఓవర్‌టేకింగ్ స్వేచ్ఛగా అనుమతించబడుతుంది',
            'పైవేవీ కావు'
          ],
          correctIndex: 0,
          explanation: 'A solid white line indicates that lane changing or crossing over the line to overtake is legally prohibited for traffic safety.',
          explanationTe: 'ఘన తెల్లటి గీత భద్రత దృష్ట్యా లేన్ మారడం లేదా దాటడం చట్టబద్ధంగా నిషేధించబడిందని సూచిస్తుంది.'
        },
        {
          id: 'q-tf-2',
          question: 'What is the speed limit for school zones or dense residential zones in Andhra Pradesh?',
          questionTe: 'ఆంధ్రప్రదేశ్‌లో స్కూల్ జోన్లలో గరిష్ట వేగ పరిమితి ఎంత?',
          options: [
            '60 km/h',
            '30 km/h',
            '80 km/h',
            'Unrestricted'
          ],
          optionsTe: [
            '60 కి.మీ/గం',
            '30 కి.మీ/గం',
            '80 కి.మీ/గం',
            'ఎలాంటి పరిమితి లేదు'
          ],
          correctIndex: 1,
          explanation: 'To protect children and pedestrians, speed limits inside school zones and dense residential areas are kept at 30 km/h maximum.',
          explanationTe: 'పిల్లలు మరియు పౌరుల రక్షణ కోసం స్కూల్ జోన్లలో వేగ పరిమితి గరిష్టంగా 30 కి.మీ/గం ఉంటుంది.'
        },
        {
          id: 'q-tf-3',
          question: 'What does a flashing red light at an intersection signify?',
          questionTe: 'జంక్షన్ వద్ద మినుకుమినుకుమనే ఎరుపు కాంతి దేనిని సూచిస్తుంది?',
          options: [
            'Accelerate to clear the crossing quickly',
            'Stop completely, check for traffic, and proceed when safe',
            'Keep driving with normal speed',
            'Ignore and keep going'
          ],
          optionsTe: [
            'త్వరగా దాటడానికి వేగాన్ని పెంచండి',
            'పూర్తిగా ఆగి, ట్రాఫిక్‌ను చూసి, సురక్షితంగా ఉన్నప్పుడు ముందుకు వెళ్లండి',
            'సాధారణ వేగంతో డ్రైవ్ చేయండి',
            'నిరాకరించి ముందుకు వెళ్లండి'
          ],
          correctIndex: 1,
          explanation: 'A flashing red traffic light behaves exactly like a "Stop" sign: you must halt completely, yield to crossing traffic, and move only when clear.',
          explanationTe: 'మినుకుమినుకుమనే ఎరుపు రంగు లైట్ "స్టాప్" గుర్తుగా పనిచేస్తుంది: పూర్తిగా ఆగి ముందుకు సాగాలి.'
        },
        {
          id: 'q-tf-4',
          question: 'When parking your vehicle on a downward slope, which gear should you engage for safety?',
          questionTe: 'రోడ్డు కిందకి వాలుగా ఉన్నప్పుడు పార్కింగ్ చేసేటప్పుడు భద్రత కోసం ఏ గేర్ వేయాలి?',
          options: [
            'First gear',
            'Neutral',
            'Reverse gear',
            'Third gear'
          ],
          optionsTe: [
            'మొదటి గేర్',
            'న్యూట్రల్',
            'రివర్స్ గేర్',
            'మూడవ గేర్'
          ],
          correctIndex: 2,
          explanation: 'When parking on a downhill slope, you should engage reverse gear (and turn wheels toward the curb) so that mechanical transmission prevents the vehicle from rolling forward.',
          explanationTe: 'కిందికి వాలుగా ఉన్నప్పుడు రివర్స్ గేర్ వేయడం వల్ల వాహనం ముందుకు దూసుకుపోకుండా ఉంటుంది.'
        },
        {
          id: 'q-tf-5',
          question: 'What is the primary meaning of a double solid yellow line in the center of the road?',
          questionTe: 'రోడ్డు మధ్యలో ఉన్న రెండు పసుపు రంగు నిరంతర గీతల అర్థం ఏమిటి?',
          options: [
            'Overtaking is allowed only during daytime',
            'Lane crossing or overtaking is strictly prohibited in both directions',
            'It is a parking zone indicator',
            'Motorcycles are exempt from keeping left'
          ],
          optionsTe: [
            'పగటిపూట మాత్రమే ఓవర్‌టేకింగ్ అనుమతించబడుతుంది',
            'రెండు దిశల ట్రాఫిక్‌కు కూడా లైన్ దాటడం లేదా ఓవర్‌టేకింగ్ పూర్తిగా నిషేధించబడింది',
            'ఇది పార్కింగ్ జోన్ సూచిక',
            'మోటార్ సైకిళ్లకు మినహాయింపు ఉంటుంది'
          ],
          correctIndex: 1,
          explanation: 'A double solid yellow line signifies that lane crossing or overtaking is strictly forbidden for traffic coming from both directions.',
          explanationTe: 'రెండు వైపుల వాహనాలకు కూడా మధ్యలో ఉన్న లైన్ దాటడం లేదా ఓవర్‌టేకింగ్ చేయడం చట్టవిరుద్ధం.'
        }
      ]
    }
  },
  {
    id: 'road-safety',
    title: 'Pedestrian Safety & Zebra Crossings',
    titleTe: 'పాదచారుల భద్రత & జీబ్రా క్రాసింగ్‌లు',
    category: 'Road Safety',
    description: 'Master defensive walking, proper utilization of pedestrian zones, and giving right of way to walking citizens.',
    descriptionTe: 'సురక్షితంగా నడవడం, జీబ్రా క్రాసింగ్‌లను ఉపయోగించడం మరియు కుడి వైపు ప్రాధాన్యత ఇవ్వడం నేర్చుకోండి.',
    content: `Pedestrians are the most vulnerable group on roads. Protect lives by following these guidelines:
• Always utilize the sidewalk. If no sidewalk exists, walk on the extreme right side of the road facing oncoming vehicles.
• Zebra Crossings are legal safe havens. Motorists are legally required to stop and yield when a pedestrian steps onto a zebra crossing.
• Eye Contact rule: Before crossing, always make eye contact with oncoming drivers to ensure they have seen you and are actively decelerating.
• Look Right, Left, then Right again before stepping onto high-speed lanes.`,
    contentTe: `పాదచారుల భద్రతకు అత్యంత ప్రాధాన్యత ఇవ్వాలి:
• ఎల్లప్పుడూ ఫుట్‌పాత్‌లపైనే నడవండి. లేకపోతే ఎదురుగా వచ్చే ట్రాఫిక్‌కు ముఖంగా కుడి వైపున నడవండి.
• జీబ్రా క్రాసింగ్స్ వద్ద పాదచారులకు మొదటి ప్రాధాన్యత ఉంటుంది. డ్రైవర్లు తప్పక ఆగాలి.`,
    quiz: {
      moduleId: 'road-safety',
      title: 'Pedestrian Safety Challenge',
      questions: [
        {
          id: 'q-rs-1',
          question: 'If no sidewalk is available, on which side of the road should a pedestrian walk?',
          questionTe: 'ఫుట్‌పాత్ లేనప్పుడు, పాదచారులు రోడ్డుకు ఏ వైపున నడవాలి?',
          options: [
            'On the left side of the road, with back to traffic',
            'On the right side of the road, facing oncoming traffic',
            'In the center of the road',
            'Walk wherever comfortable'
          ],
          optionsTe: [
            'ఎడమ వైపున, వెనుక నుండి వచ్చే ట్రాఫిక్‌కు ముఖంగా',
            'కుడి వైపున, ఎదురుగా వచ్చే వాహనాలకు ముఖంగా',
            'రోడ్డు మధ్యలో',
            'ఎక్కడ సౌకర్యంగా ఉంటే అక్కడ'
          ],
          correctIndex: 1,
          explanation: 'Walking on the right side facing oncoming traffic gives you visual awareness of cars approaching you directly, allowing quick evasive action.',
          explanationTe: 'ఎదురుగా వచ్చే వాహనాలకు ముఖంగా కుడి వైపున నడవడం వల్ల ప్రమాదాల ముప్పు తక్కువగా ఉంటుంది.'
        },
        {
          id: 'q-rs-2',
          question: 'Who has the absolute legal right-of-way on a marked Zebra Crossing?',
          questionTe: 'జీబ్రా క్రాసింగ్ వద్ద చట్టబద్ధమైన మొదటి ప్రాధాన్యత ఎవరికి ఉంటుంది?',
          options: [
            'The fastest moving automobile',
            'Pedestrians',
            'Public transit buses',
            'Police vehicles with no emergency sirens'
          ],
          optionsTe: [
            'అతివేగంగా వెళ్లే కారుకు',
            'పాదచారులకు',
            'ఆర్టీసీ బస్సులకు',
            'పోలీసు వాహనాలకు'
          ],
          correctIndex: 1,
          explanation: 'Pedestrians have absolute priority on any marked zebra crossing. Drivers must yield and halt when pedestrians are crossing.',
          explanationTe: 'జీబ్రా క్రాసింగ్ పై నడిచే పాదచారులకు మొదటి హక్కు ఉంటుంది. వాహనాలు తప్పనిసరిగా ఆగాలి.'
        },
        {
          id: 'q-rs-3',
          question: 'At an intersection with no pedestrian signals, when is it safe to cross the street?',
          questionTe: 'పాదచారుల సిగ్నల్స్ లేని కూడలి వద్ద ఎప్పుడు రోడ్డు దాటడం సురక్షితం?',
          options: [
            'Whenever you are in a hurry',
            'Only when vehicles have completely stopped or vehicle traffic signals are red',
            'When vehicles are driving slowly around 40 km/h',
            'Running across suddenly when there is a small gap'
          ],
          optionsTe: [
            'మీరు తొందరగా ఉన్నప్పుడు ఎప్పుడైనా',
            'వాహనాలు పూర్తిగా ఆగినప్పుడు లేదా వాహన సిగ్నల్స్ ఎరుపు రంగులో ఉన్నప్పుడు మాత్రమే',
            'వాహనాలు సుమారు 40 కి.మీ/గం వేగంతో నెమ్మదిగా వెళుతున్నప్పుడు',
            'చిన్న గ్యాప్ ఉన్నప్పుడు ఒక్కసారిగా పరుగెత్తడం'
          ],
          correctIndex: 1,
          explanation: 'Never step in front of moving traffic. Cross only when all vehicular flow has completely stopped or their light is red, ensuring motorists see you.',
          explanationTe: 'వాహనాల ప్రవాహం పూర్తిగా ఆగినప్పుడు లేదా వారికి ఎరుపు సిగ్నల్ పడినప్పుడు మాత్రమే దాటాలి.'
        },
        {
          id: 'q-rs-4',
          question: 'Why should pedestrians avoid looking at mobile screens or wearing tight headphones while walking near busy roads?',
          questionTe: 'రద్దీగా ఉండే రోడ్ల పక్కన నడుస్తున్నప్పుడు పాదచారులు మొబైల్ చూడటం లేదా హెడ్‌ఫోన్‌లు ధరించడం ఎందుకు నివారించాలి?',
          options: [
            'It drains the mobile battery faster',
            'It is illegal to carry phones on roads',
            'It dangerously reduces auditory and visual awareness of nearby traffic',
            'It attracts unwanted attention'
          ],
          optionsTe: [
            'ఇది మొబైల్ బ్యాటరీని త్వరగా ఖాళీ చేస్తుంది',
            'రోడ్లపై ఫోన్లు తీసుకెళ్లడం చట్టవిరుద్ధం',
            'ఇది ప్రమాదకరంగా వాహనాల శబ్దాలు మరియు పరిసరాలపై అవగాహనను తగ్గిస్తుంది',
            'ఇది అనవసరమైన దృష్టిని ఆకర్షిస్తుంది'
          ],
          correctIndex: 2,
          explanation: 'Using headphones or screens cuts off auditory cues (like horns or screeching brakes) and visual focus, which are crucial to react to sudden road dangers.',
          explanationTe: 'హెడ్‌ఫోన్‌లు మరియు స్క్రీన్‌లు పక్కనుంచి వచ్చే హారన్ శబ్దాలు వినబడకుండా చేసి ప్రమాదాలకు దారితీస్తాయి.'
        }
      ]
    }
  },
  {
    id: 'emergency-responses',
    title: 'Emergency Response & Good Samaritan Laws',
    titleTe: 'అత్యవసర సహాయం & గుడ్ సమరిటన్ చట్టాలు',
    category: 'Emergency Help',
    description: 'Learn how to respond in critical hours, coordinate with emergency services, and understand legal protections.',
    descriptionTe: 'రోడ్డు ప్రమాదాల సమయంలో త్వరితగతిన స్పందించడం మరియు చట్టపరమైన రక్షణలను తెలుసుకోండి.',
    content: `Knowing how to act during emergencies can save lives. The first hour after a traumatic injury is known as the "Golden Hour".
• Good Samaritan Law of India: Enacted by the Supreme Court, this law guarantees absolute protection to citizens who render medical or non-medical care at accident scenes.
• No legal hassles: Police cannot force you to reveal your identity, nor can hospitals refuse immediate emergency treatment.
• Ambulance priority: Always steer your vehicle to the extreme left edge of the road to make way for ambulances. Blockades carry a fine of up to ₹10,000.`,
    contentTe: `అత్యవసర परिस्थितियोंల్లో త్వరితగతిన స్పందించడం అత్యవసరం:
• "గోల్డెన్ అవర్" అత్యంత కీలకం. ఈ సమయంలో క్షతగాత్రులను రక్షించడం ఎంతో పుణ్యం.
• గుడ్ సమరిటన్ చట్టం ప్రకారం సహాయం చేసిన వ్యక్తిని పోలీసులు ఎలాంటి ఇబ్బందులు పెట్టకూడదు.`,
    quiz: {
      moduleId: 'emergency-responses',
      title: 'Emergency Hero Challenge',
      questions: [
        {
          id: 'q-er-1',
          question: 'What legal protection does the Good Samaritan Law of India guarantee you?',
          questionTe: 'భారతదేశంలో గుడ్ సమరిటన్ చట్టం ద్వారా లభించే రక్షణ ఏమిటి?',
          options: [
            'No criminal or civil liability for rescue actions performed in good faith',
            'Hospitals can charge you for victims medical bills',
            'Mandatory arrest for help failure',
            'You are required to register at the nearest station'
          ],
          optionsTe: [
            'నిజాయితీగా చేసిన సహాయ చర్యలకు ఎలాంటి నేర లేదా సివిల్ బాధ్యత ఉండదు',
            'బాధితుడి వైద్య ఖర్చులను మీరే చెల్లించాలి',
            'సహాయం చేయకపోతే తప్పక అరెస్ట్ అవుతారు',
            'పోలీస్ స్టేషన్ లో నమోదు చేసుకోవాలి'
          ],
          correctIndex: 0,
          explanation: 'The Supreme Court approved Good Samaritan guidelines declare that helpers face zero police interrogation, medical liability, or court appearances.',
          explanationTe: 'సహాయం చేసిన ఏ వ్యక్తిని పోలీసులు వేధించకూడదని చట్టం చెబుతోంది.'
        },
        {
          id: 'q-er-2',
          question: 'What is the unified single emergency helpline number in India for accident, police, and fire assistance?',
          questionTe: 'ప్రమాదం, పోలీసులు మరియు అగ్నిమాపక సహాయం కోసం భారతదేశంలో ఏకీకృత అత్యవసర హెల్ప్‌లైన్ నంబర్ ఏది?',
          options: [
            '100',
            '112',
            '101',
            '911'
          ],
          optionsTe: [
            '100',
            '112',
            '101',
            '911'
          ],
          correctIndex: 1,
          explanation: 'India integrated emergency services under a single number 112, acting as a one-stop response setup for immediate dispatch.',
          explanationTe: 'భారతదేశం అత్యవసర సేవలను 112 అనే ఒకే ఒక ఏకీకృత నంబర్ కిందకు తీసుకువచ్చింది.'
        },
        {
          id: 'q-er-3',
          question: 'What is the first and most critical action when you witness a road accident with severe injuries?',
          questionTe: 'తీవ్రమైన గాయాలతో కూడిన రోడ్డు ప్రమాదాన్ని చూసినప్పుడు చేయాల్సిన మొదటి అత్యంత కీలకమైన చర్య ఏమిటి?',
          options: [
            'Record a video for social media accounts',
            'Ensure scene safety, check victim responsiveness, and immediately call 112 / 108 for an ambulance',
            'Flee the scene immediately to avoid police presence',
            'Try to drag the victim roughly without supporting their spine'
          ],
          optionsTe: [
            'సోషల్ మీడియా ఖాతాల కోసం వీడియో రికార్డ్ చేయడం',
            'దృశ్యం సురక్షితంగా ఉందని నిర్ధారించుకుని, బాధితుడి స్పందనను చూసి, వెంటనే 112 / 108 కి కాల్ చేయడం',
            'పోలీసులు వస్తారనే భయంతో వెంటనే అక్కడి నుండి పారిపోవడం',
            'వెన్నెముకకు మద్దతు ఇవ్వకుండా బాధితుడిని బలంగా లాగడం'
          ],
          correctIndex: 1,
          explanation: 'First secure the location so oncoming traffic does not hit you, check responsiveness, and call emergency services immediately to initiate medical transport.',
          explanationTe: 'మొదట పరిసరాలు సురక్షితంగా ఉన్నాయని చూసి, క్షతగాత్రులను కాపాడేందుకు 112 లేదా 108 కి కాల్ చేయాలి.'
        }
      ]
    }
  },
  {
    id: 'waste-management',
    title: 'Cleanliness & Waste Management (3-Bins)',
    titleTe: 'పరిశుభ్రత & వ్యర్థాల నిర్వహణ (3-బుట్టలు)',
    category: 'Environment',
    description: 'Learn scientific waste segregation, local composting techniques, and avoiding regional sanitation hazards.',
    descriptionTe: 'వ్యర్థాలను తడి, పొడి మరియు ప్రమాదకరమైన చెత్తగా వేరు చేయడం నేర్చుకోండి.',
    content: `Sanitation prevents outbreak of deadly fevers in Visakhapatnam. The essential framework is the 3-Bin System:
• Green Bin: Organic / Biodegradable waste (food waste, fruit peels, flowers, leaves). Used for vermicomposting.
• Blue Bin: Recyclable dry waste (clean paper, plastic water bottles, cardboards, aluminum tins).
• Red Bin: Household hazardous waste (expired medicines, batteries, paints, sanitary products).
• Practice home composting: Set up a simple compost barrel in your backyard to transform food waste into rich soil manure for organic home farming.`,
    contentTe: `మంగళపాలెం వార్డు 88 లో దోమల నిర్మూలన మరియు పరిశుభ్రతకు 3 బుట్టల విధానం:
• ఆకుపచ్చ బుట్ట: తడి చెత్త (కూరగాయలు, ఆహార వ్యర్థాలు)
• నీలం బుట్ట: పొడి చెత్త (ప్లాస్టిక్, కాగితాలు)
• ఎరుపు బుట్ట: హానికరమైన వ్యర్థాలు (బ్యాటరీలు, మందులు)`,
    quiz: {
      moduleId: 'waste-management',
      title: 'Sanitation Champion Quiz',
      questions: [
        {
          id: 'q-wm-1',
          question: 'Which waste product should go into the Green waste bin?',
          questionTe: 'ఆకుపచ్చ రంగు చెత్త బుట్టలో వేయాల్సిన వ్యర్థం ఏది?',
          options: [
            'Banana peels and kitchen food waste',
            'Old dry cell batteries',
            'Plastic bottles and steel cans',
            'Broken window pane glasses'
          ],
          optionsTe: [
            'అరటి తొక్కలు మరియు వంటగది ఆహార వ్యర్థాలు',
            'పాత డ్రై సెల్ బ్యాటరీలు',
            'ప్లాస్టిక్ సీసాలు మరియు ఉక్కు డబ్బాలు',
            'పగిలిన కిటికీ అద్దాలు'
          ],
          correctIndex: 0,
          explanation: 'Biodegradable wet waste like kitchen scraps, vegetables, and tea dust belong in the Green bin for compost formation.',
          explanationTe: 'కూరగాయల తొక్కలు, మిగిలిపోయిన ఆహారం ఆకుపచ్చ బుట్టలో వేసి ఎరువుగా మార్చవచ్చు.'
        },
        {
          id: 'q-wm-2',
          question: 'What is the correct path and destination for dry recyclable waste put inside the Blue Bin?',
          questionTe: 'నీలిరంగు చెత్త బుట్టలో వేసే పొడి రీసైక్లింగ్ వ్యర్థాలు ఎక్కడికి వెళతాయి?',
          options: [
            'It is buried in deep forest soil',
            'It is sorted and sent to dedicated recycling plants to make new products',
            'It is thrown directly into nearest lake or river',
            'It is mixed back with wet food waste in landfills'
          ],
          optionsTe: [
            'అడవులలో లోతుగా పూడ్చిపెడతారు',
            'ఇది వేరు చేయబడి కొత్త ఉత్పత్తుల తయారీకి రీసైక్లింగ్ కర్మాగారాలకు పంపబడుతుంది',
            'నేరుగా స్థానిక చెరువులు లేదా నదులలో వేయబడుతుంది',
            'డంపింగ్ యార్డ్‌లలో తిరిగి తడి చెత్తతో కలుపుతారు'
          ],
          correctIndex: 1,
          explanation: 'Dry waste in the blue bin (papers, plastics, glass, metal) is diverted from landfills and goes to material recovery facilities for recycling.',
          explanationTe: 'నీలిరంగు బుట్టలోని ప్లాస్టిక్, కాగితాలు రీసైక్లింగ్ కోసం పంపబడి పర్యావరణ కాలుష్యాన్ని తగ్గిస్తాయి.'
        },
        {
          id: 'q-wm-3',
          question: 'Why is open-air burning of dry leaves, plastics, and household paper highly discouraged in residential wards?',
          questionTe: 'నివాస ప్రాంతాల్లో పొడి ఆకులు, ప్లాస్టిక్ మరియు కాగితాలను బహిరంగంగా కాల్చడం ఎందుకు నిషేధించబడింది?',
          options: [
            'It causes bad odor only but has no health risks',
            'It releases highly toxic chemical compounds like dioxins and causes severe respiratory illness',
            'It burns up precious soil minerals directly',
            'It takes too much time to burn completely'
          ],
          optionsTe: [
            'ఇది కేవలం దుర్వాసన కలిగిస్తుంది కానీ ఆరోగ్య నష్టాలు లేవు',
            'ఇది డయాక్సిన్ల వంటి అత్యంత విషపూరిత రసాయనాలను విడుదల చేస్తుంది మరియు శ్వాసకోశ వ్యాధులకు దారితీస్తుంది',
            'ఇది నేరుగా విలువైన నేల ఖనిజాలను దహనం చేస్తుంది',
            'పూర్తిగా కాలడానికి చాలా సమయం పడుతుంది'
          ],
          correctIndex: 1,
          explanation: 'Burning dry waste and plastics produces toxic smoke, particulate matter, and carcinogenic gases, creating high health risks for children and elderly neighbors.',
          explanationTe: 'ప్లాస్టిక్స్ మరియు వ్యర్థాలను బహిరంగంగా కాల్చడం వల్ల గుండె మరియు శ్వాసకోశ సమస్యలను కలిగించే నల్లటి విషపూరిత పొగ విడుదలవుతుంది.'
        }
      ]
    }
  },
  {
    id: 'water-conservation',
    title: 'Water Conservation & Wastage Reduction',
    titleTe: 'నీటి సంరక్షణ & వృధా నియంత్రణ',
    category: 'Environment',
    description: 'Learn efficient domestic water usage practices, rainwater harvesting, graywater recycling, and stopping leaky faucets.',
    descriptionTe: 'ఇంటి వద్ద నీటి వృధాను తగ్గించడం, వర్షపు నీటి నిల్వ మరియు కుళాయిల లీకేజీల నివారణ నేర్చుకోండి.',
    content: `Fresh water is a finite resource. Conserving water secures our future:
• Every drip counts: A single dripping tap can waste more than 30 to 100 liters of water daily. Fix leaks immediately.
• Say NO to running hoses: Wash vehicles using a single bucket of water instead of a continuous running hose pipe, saving up to 200 liters per wash.
• Rainwater Harvesting (RWH): Installing RWH shafts at homes recharges the dry groundwater aquifers, ensuring borewells never run dry during hot summers.
• Greywater recycling: Reuse clean kitchen wash water to feed home garden plants instead of letting it run into street drains.`,
    contentTe: `మంచినీరు అత్యంత విలువైనది. దానిని కాపాడుకోవడం మన కర్తవ్యం:
• ఒక్క చుక్క కూడా వృధా కాకూడదు: లీక్ అవుతున్న ఒక కుళాయి రోజుకు 30 నుండి 100 లీటర్ల నీటిని వృధా చేస్తుంది. వెంటనే మరమ్మతు చేయండి.
• బకెట్ ఉపయోగించండి: కార్లు లేదా బైక్‌లు కడగడానికి పైపులకు బదులుగా బకెట్ ఉపయోగించండి. దీనివల్ల 200 లీటర్ల నీరు ఆదా అవుతుంది.
• ఇంకుడు గుంతలు (RWH): వర్షపు నీటిని భూమిలోకి పంపడం వల్ల వేసవిలో కూడా బావులు ఎండిపోకుండా ఉంటాయి.`,
    quiz: {
      moduleId: 'water-conservation',
      title: 'Water Guardian Quiz',
      questions: [
        {
          id: 'q-wc-1',
          question: 'Which of the following household activities causes the highest fresh water wastage daily?',
          questionTe: 'కింది వాటిలో ఏది ప్రతిరోజూ అత్యధిక మంచినీటి వృధాకు దారితీస్తుంది?',
          options: [
            'Using a bucket and mug to take a bath',
            'Leaving a hosepipe running continuously to wash cars or sweep porches',
            'Using a small cup of water while brushing teeth',
            'Watering garden plants with a watering can'
          ],
          optionsTe: [
            'స్నానం చేయడానికి బకెట్ మరియు మగ్ ఉపయోగించడం',
            'కార్లు కడగడానికి లేదా వరండాలను శుభ్రం చేయడానికి హోస్ పైప్‌ను నిరంతరంగా వదిలివేయడం',
            'పళ్ళు తోముకునేటప్పుడు చిన్న కప్పు నీటిని ఉపయోగించడం',
            'గార్డెన్ మొక్కలకు క్యాన్ ఉపయోగించి నీరు పోయడం'
          ],
          correctIndex: 1,
          explanation: 'Running hosepipes release massive volumes of water (up to 15-20 liters per minute). Shifting to buckets controls consumption drastically.',
          explanationTe: 'నిరంతరాయంగా పైపుల ద్వారా నీటిని వదలడం వల్ల నిమిషానికి 20 లీటర్ల వరకు నీరు వృధా అవుతుంది.'
        },
        {
          id: 'q-wc-2',
          question: 'What is the primary community benefit of implementing Rainwater Harvesting (RWH) on your residential plot?',
          questionTe: 'మీ నివాస స్థలంలో వర్షపు నీటి సంరక్షణ (RWH) అమలు చేయడం వల్ల కలిగే ప్రధాన ప్రయోజనం ఏమిటి?',
          options: [
            'It makes the surrounding air dry',
            'It recharges local groundwater tables and increases borewell sustainability',
            'It is a mandatory rule that increases water taxes',
            'It filters drinking water to industrial standards'
          ],
          optionsTe: [
            'ఇది చుట్టుపక్కల గాలిని పొడిగా చేస్తుంది',
            'ఇది భూగర్భ జలాల మట్టాన్ని పెంచి బోరుబావులను ఎండిపోకుండా కాపాడుతుంది',
            'ఇది నీటి పన్నులను పెంచే నియమం మాత్రమే',
            'ఇది త్రాగునీటిని పారిశ్రామిక ప్రమాణాలకు ఫిల్టర్ చేస్తుంది'
          ],
          correctIndex: 1,
          explanation: 'Rainwater harvesting channels rooftop rain straight into recharge shafts, directly feeding the local aquifer and keeping borewells productive.',
          explanationTe: 'వర్షపు నీటిని భూమిలోకి పంపడం ద్వారా స్థానిక భూగర్భ జలాల మట్టం పెరిగి వేసవిలో కూడా నీటి లభ్యత ఉంటుంది.'
        },
        {
          id: 'q-wc-3',
          question: 'How much water can a single slow-dripping tap waste in a single day if kept unrepaired?',
          questionTe: 'మరమ్మతు చేయని ఒక లీక్ అవుతున్న కుళాయి ఒక రోజులో ఎన్ని లీటర్ల నీటిని వృధా చేస్తుంది?',
          options: [
            'Less than 1 liter',
            'Between 30 to 100 liters',
            'Around 5000 liters',
            'Zero wastage'
          ],
          optionsTe: [
            '1 లీటర్ కంటే తక్కువ',
            '30 నుండి 100 లీటర్ల వరకు',
            'సుమారు 5000 లీటర్లు',
            'ఏమీ వృధా కాదు'
          ],
          correctIndex: 1,
          explanation: 'Even a minor leak dripping once per second translates to approximately 30 to 100 liters of water lost down the drain per day.',
          explanationTe: 'సెకనుకు ఒక చుక్క పడినా కూడా రోజుకు 30 నుండి 100 లీటర్ల అమూల్యమైన మంచినీరు వృధాగా పోతుంది.'
        }
      ]
    }
  },
  {
    id: 'anti-littering',
    title: 'Anti-Littering & Civic Pride',
    titleTe: 'యాంటీ-లిట్టరింగ్ & కమ్యూనిటీ రక్షణ',
    category: 'Environment',
    description: 'Learn the ecological impact of open littering, avoiding storm drain blockages, and developing trash responsibility.',
    descriptionTe: 'బహిరంగ ప్రదేశాలలో చెత్త వేయడం వల్ల కలిగే నష్టాలు, డ్రెయిన్ల బ్లాకేజీల నివారణ మరియు పౌర బాధ్యతను తెలుసుకోండి.',
    content: `Littering ruins neighborhood spaces, spreads vector diseases, and harms local wildlife. Take charge with these habits:
• Carry it home: If a public dustbin is not nearby, keep paper wraps, empty cups, or plastic items in your pockets until you reach a proper bin.
• Protect storm drains: Littering in street gutters and storm water drains leads to terrible blockages, resulting in dirty sewage flooding onto public streets during sudden downpours.
• Keep organic separate: Animals search for food scraps in public spaces. Disposing of food wastes wrapped inside tied plastic bags causes cows or stray dogs to consume the plastic, leading to painful fatal choking.
• Zero plastic footprint: Transition to sustainable cloth/jute bags when visiting local vegetable markets.`,
    contentTe: `చెత్తను బహిరంగంగా వేయడం వల్ల వ్యాధులు ప్రబలుతాయి మరియు వీధులు మురికిగా మారతాయి:
• చెత్తను వెంట తీసుకెళ్లండి: పబ్లిక్ చెత్త బుట్ట లేకపోతే, చెత్తను మీ జేబులో ఉంచి ఇంటికి వెళ్లి పారవేయండి.
• డ్రైనేజీలను రక్షించండి: వీధి కాలువలలో చెత్త వేయడం వల్ల వర్షాలకు మురుగునీరు రోడ్లపైకి వస్తుంది.
• మూగజీవాలను కాపాడండి: ప్లాస్టిక్ కవర్లలో ఆహారాన్ని కట్టి పారవేయడం వల్ల పశువులు వాటిని తిని ప్రాణాలు కోల్పోతున్నాయి.`,
    quiz: {
      moduleId: 'anti-littering',
      title: 'Civic Pride Advocate Quiz',
      questions: [
        {
          id: 'q-al-1',
          question: 'What is the most responsible action if you cannot find a public dustbin nearby while consuming a snack in a public park?',
          questionTe: 'పబ్లిక్ పార్కులో తినుబండారాలు తిన్న తర్వాత పబ్లిక్ చెత్త బుట్ట కనిపించకపోతే ఏమి చేయడం అత్యంత బాధ్యతాయుతమైన చర్య?',
          options: [
            'Throw the wrapper under a thick bush where it is not easily visible',
            'Keep the waste in your bag or pocket and dispose of it when you find a proper bin or reach home',
            'Leave it on the park bench for cleaners to collect later',
            'Drop it on the walking path'
          ],
          optionsTe: [
            'ఎవరికీ కనిపించకుండా పొదల్లో విసిరేయడం',
            'చెత్తను మీ బ్యాగ్ లేదా జేబులో ఉంచి, తదుపరి లభించే బుట్టలో లేదా ఇంటికి వెళ్ళిన తర్వాత పారవేయడం',
            'శుభ్రం చేసేవారు ఊడుస్తారని పార్క్ బెంచ్‌పైనే వదిలివేయడం',
            'నడిచే దారిలోనే పడేయడం'
          ],
          correctIndex: 1,
          explanation: 'True civic responsibility means maintaining absolute personal custody of your own waste until you can dispose of it legally and cleanly.',
          explanationTe: 'మీ చెత్తను క్రమపద్ధతిలో పారవేసేవరకు మీ వద్దే ఉంచుకోవడం నిజమైన పౌర బాధ్యత.'
        },
        {
          id: 'q-al-2',
          question: 'How does throwing plastic bottles and bags into street storm drains and gutters directly harm the environment in coastal towns like Visakhapatnam?',
          questionTe: 'వీధి కాలువలలో ప్లాస్టిక్ సీసాలు వేయడం విశాఖపట్నం వంటి తీర నగరాల్లో పర్యావరణానికి ఎలా హాని కలిగిస్తుంది?',
          options: [
            'It dissolves into groundwater instantly',
            'Storm water drains lead directly into local rivers, beaches, and oceans without filtration, choking marine aquatic life',
            'It turns rainwater acidic',
            'It prevents the natural growth of street grass'
          ],
          optionsTe: [
            'ఇది భూమిలోకి త్వరగా కరిగిపోతుంది',
            'మురుగు కాలువలు వడపోత లేకుండా నేరుగా సముద్రంలోకి లేదా నదుల్లోకి ప్రవహించి జలచరాల మరణానికి కారణమవుతాయి',
            'ఇది వర్షపు నీటిని ఆమ్లంగా మారుస్తుంది',
            'ఇది వీధి గడ్డి సహజ వృద్ధిని నిరోధిస్తుంది'
          ],
          correctIndex: 1,
          explanation: 'Unlike indoor sewer systems, outdoor storm water drains dump directly into water bodies. Plastics thrown in drains travel into the sea, choking turtles and fish.',
          explanationTe: 'వీధి డ్రెయిన్ల ద్వారా ప్లాస్టిక్ నేరుగా సముద్రంలోకి చేరి చేపలు, తాబేళ్లు వంటి అమాయక జలచరాలను చంపుతుంది.'
        },
        {
          id: 'q-al-3',
          question: 'What is the primary danger when cows, goats, or stray animals consume kitchen wastes that have been tightly tied inside plastic bags?',
          questionTe: 'ప్లాస్టిక్ కవర్లలో కట్టి పారవేసిన వంటగది వ్యర్థాలను ఆవులు లేదా ఇతర జంతువులు తినడం వల్ల కలిగే ప్రధాన ప్రమాదం ఏమిటి?',
          options: [
            'They digest the plastic easily as fiber source',
            'The plastic blocks their digestive tracts, leading to severe illness, starvation, or painful death',
            'It makes their milk taste sweeter',
            'No danger exists'
          ],
          optionsTe: [
            'వారు ప్లాస్టిక్‌ను ఫైబర్ వనరుగా సులభంగా జీర్ణించుకుంటారు',
            'ప్లాస్టిక్ వారి జీర్ణవ్యవస్థను పూర్తిగా అడ్డుకుని, ఆకలితో మరియు తీవ్రమైన నొప్పితో మరణించేలా చేస్తుంది',
            'ఇది వారి పాలు మరింత తీపిగా ఉండేలా చేస్తుంది',
            'ఎలాంటి ప్రమాదం లేదు'
          ],
          correctIndex: 1,
          explanation: 'Animals cannot separate plastic from food smells. Swallowed plastic bags accumulate in their stomachs, causing complete bowel obstruction and starvation.',
          explanationTe: 'ప్లాస్టిక్ సంచులను జంతువులు వేరు చేయలేవు. అవి తిన్న ప్లాస్టిక్ కడుపులో పేరుకుపోయి మూగజీవాల మరణానికి దారితీస్తుంది.'
        }
      ]
    }
  }
];

const initialChallenges: Challenge[] = [
  {
    id: 'ch-zebra',
    title: 'Zebra Crossing Advocate',
    titleTe: 'జీబ్రా క్రాసింగ్ ప్రాక్టీస్',
    description: 'Take a photo or provide a short explanation of you actively crossing the high road using only marked zebra lines.',
    points: 100
  },
  {
    id: 'ch-waste',
    title: '3-Bin Kitchen Setup',
    titleTe: '3-బుట్టల వంటగది అమరిక',
    description: 'Establish three distinct designated bins (Green, Blue, Red) in your home to segregate waste and take a picture proof.',
    points: 150
  },
  {
    id: 'ch-plastic',
    title: 'No Single-Use Plastic Week',
    titleTe: 'ప్లాస్టిక్ రహిత వారం',
    description: 'Replace plastic bags with standard jute or cloth bags for market purchases in Mangalapalem bazaar. Share proof.',
    points: 200
  }
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [lang, setLang] = useState<'en' | 'te'>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Application state
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [submissions, setSubmissions] = useState<ChallengeSubmission[]>([]);
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationPath[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [dashboardTip, setDashboardTip] = useState<{ greeting: string; tip: string } | null>(null);
  const [loadingTip, setLoadingTip] = useState<boolean>(false);

  // Feedback states
  const [selectedModuleFeedback, setSelectedModuleFeedback] = useState<Module | null>(null);
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackSuccess, setFeedbackSuccess] = useState<string>('');

  // Active quiz state
  const [activeQuizModule, setActiveQuizModule] = useState<Module | null>(null);

  // Auth inputs
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('Chiranjeevi Kumar');
  const [authAge, setAuthAge] = useState('24');
  const [authMobile, setAuthMobile] = useState('9876543210');
  const [authLocation, setAuthLocation] = useState('Mangalapalem, Ward 88');
  const [authRole, setAuthRole] = useState<UserRole>(UserRole.CITIZEN);
  const [authError, setAuthError] = useState('');
  const [loginRoleType, setLoginRoleType] = useState<'citizen' | 'official'>('citizen');
  const [loginOfficialRole, setLoginOfficialRole] = useState<'teacher' | 'admin'>('teacher');

  // Challenge submissions form inputs
  const [proofText, setProofText] = useState('');
  const [proofPhoto, setProofPhoto] = useState('');
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Certificate state
  const [activeCertificate, setActiveCertificate] = useState<any>(null);
  const [certError, setCertError] = useState('');

  // Profile fields state
  const [profileName, setProfileName] = useState('');
  const [profileMobile, setProfileMobile] = useState('');
  const [profileLocation, setProfileLocation] = useState('');
  const [profileAge, setProfileAge] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

  // Dark mode trigger
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load announcements
  const loadAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      setAnnouncements(data.announcements || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Load Leaderboard
  const loadLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Load reports
  const loadReports = async () => {
    try {
      const res = await fetch('/api/reports');
      const data = await res.json();
      setReports(data.reports || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Load challenges
  const loadChallenges = async () => {
    try {
      const res = await fetch('/api/challenges');
      const data = await res.json();
      setChallenges(data.challenges || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Load dynamic dashboard tip from Gemini
  const loadDashboardTip = async (sessionToken: string) => {
    try {
      setLoadingTip(true);
      const res = await fetch('/api/gemini/dashboard-tip', {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setDashboardTip({ greeting: data.greeting, tip: data.tip });
      }
    } catch (err) {
      console.error('Failed fetching dynamic dashboard tip', err);
    } finally {
      setLoadingTip(false);
    }
  };

  // Load session user data
  const loadUserData = async (sessionToken: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        
        // Fetch dynamic AI advice tip for the dashboard
        loadDashboardTip(sessionToken);
        
        // Load challenges submissions
        const subRes = await fetch('/api/challenges/submissions', {
          headers: { 'Authorization': `Bearer ${sessionToken}` }
        });
        const subData = await subRes.json();
        setSubmissions(subData.submissions || []);

        // Load adaptive recommendations
        const recRes = await fetch('/api/recommendations', {
          headers: { 'Authorization': `Bearer ${sessionToken}` }
        });
        const recData = await recRes.json();
        setRecommendations(recData.recommendations || []);

        // Prepopulate profile editing fields
        setProfileName(data.user.name);
        setProfileMobile(data.user.mobile);
        setProfileLocation(data.user.location);
        setProfileAge(data.user.age.toString());
      }
    } catch (err) {
      console.error('Failed fetching user profile with token', err);
    }
  };

  useEffect(() => {
    loadAnnouncements();
    loadLeaderboard();
    loadReports();
    loadChallenges();
  }, []);

  // Try to authenticate automatic seed user on initial load is disabled per user request
  useEffect(() => {
    // Left empty to prevent automatic login on load, allowing manual entry.
  }, []);

  const handleSelectLoginRole = (type: 'citizen' | 'official') => {
    setLoginRoleType(type);
    setAuthError('');
    setAuthEmail('');
    setAuthPassword('');
  };

  const handleSelectOfficialRole = (role: 'teacher' | 'admin') => {
    setLoginOfficialRole(role);
    setAuthError('');
    setAuthEmail('');
    setAuthPassword('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        loadUserData(data.token);
        // Direct users to different parts of the website depending on login type
        if (data.user.role === UserRole.TEACHER) {
          setActiveTab('teacher');
        } else if (data.user.role === UserRole.ADMIN) {
          setActiveTab('admin');
        } else {
          setActiveTab('dashboard');
        }
      } else {
        setAuthError(data.error || 'Login failed');
      }
    } catch (err) {
      setAuthError('Connection error to server-side.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: authName,
          email: authEmail,
          password: authPassword,
          mobile: authMobile,
          age: authAge,
          location: authLocation,
          role: authRole
        })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        loadUserData(data.token);
        setActiveTab('dashboard');
      } else {
        setAuthError(data.error || 'Registration failed');
      }
    } catch (err) {
      setAuthError('Connection error to server-side.');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess('');
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profileName,
          mobile: profileMobile,
          location: profileLocation,
          age: profileAge
        })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setProfileSuccess('Profile credentials verified and updated successfully.');
        loadLeaderboard();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    setActiveTab('landing');
  };

  const handleQuizSubmit = async (data: {
    moduleId: string;
    score: number;
    totalQuestions: number;
    incorrectQuestions: string[];
  }) => {
    const res = await fetch('/api/quizzes/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    const resData = await res.json();
    
    // Refresh user state
    if (resData.user) {
      setUser(resData.user);
    }
    loadUserData(token);
    loadLeaderboard();
    return resData;
  };

  const handleDismissRecommendation = async (moduleId: string) => {
    try {
      await fetch(`/api/recommendations/${moduleId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setRecommendations(prev => prev.filter(r => r.moduleId !== moduleId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChallengeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChallenge) return;
    setSubmitSuccess('');
    try {
      const res = await fetch('/api/challenges/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          challengeId: activeChallenge.id,
          challengeTitle: activeChallenge.title,
          proofText,
          photoUrl: proofPhoto,
          points: activeChallenge.points
        })
      });
      if (res.ok) {
        setSubmitSuccess('Your challenge has been submitted and approved successfully! Points and XP have been awarded!');
        setProofText('');
        setProofPhoto('');
        loadUserData(token);
        loadLeaderboard();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReportIssueSubmit = async (data: {
    type: any;
    location: string;
    description: string;
    photoUrl: string;
  }) => {
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        loadReports();
        // Grant rapid instant point preview
        loadUserData(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModuleFeedback) return;
    setFeedbackSuccess('');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          moduleId: selectedModuleFeedback.id,
          moduleTitle: selectedModuleFeedback.title,
          rating: feedbackRating,
          suggestion: feedbackText
        })
      });
      if (res.ok) {
        setFeedbackSuccess('Thank you! Your constructive feedback has been logged for regional development.');
        setFeedbackText('');
        setSelectedModuleFeedback(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateCertificate = async () => {
    setCertError('');
    setActiveCertificate(null);
    try {
      const res = await fetch('/api/certificate', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setActiveCertificate(data.certificate);
      } else {
        setCertError(data.detail || data.error);
      }
    } catch (err) {
      setCertError('Requirements not met yet. Complete quizzes to unlock!');
    }
  };

  const handleUpdateReportStatusAdmin = async (
    id: string,
    status: 'reported' | 'investigating' | 'resolved',
    notes: string
  ) => {
    try {
      const res = await fetch(`/api/admin/reports/${id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, adminNotes: notes })
      });
      if (res.ok) {
        loadReports();
        loadUserData(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Filter modules/challenges based on functional search queries
  const filteredModules = civicModules.filter(
    m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dict = {
    en: {
      tag: "AP Community Service Project",
      hero_title: "Empowering AP Citizens Through Smart Civic Education",
      hero_sub: "Earn points, complete local challenges, report municipal grievances, and build a safer, cleaner environment inside Ward No. 88, Mangalapalem.",
      cta_learn: "Explore Learning Modules",
      cta_report: "Report Grievance",
      dashboard: "Citizen Dashboard",
      my_stats: "Verified Stats",
      level: "Civic Level",
      points: "Points",
      recs: "Adaptive Recommendations",
      challenges: "Active Community Campaigns",
      verify: "Secretariat Verifier",
      certificate: "Download Certificate"
    },
    te: {
      tag: "ఆంధ్రప్రదేశ్ కమ్యూనిటీ సర్వీస్ ప్రాజెక్ట్",
      hero_title: "స్మార్ట్ సివిక్ విద్య ద్వారా పౌరుల సాధికారత",
      hero_sub: "పాయింట్లు సంపాదించండి, వార్డు సమస్యలను నివేదించండి మరియు వార్డు నంబర్ 88, మంగళపాలెంలో సురక్షితమైన మరియు పరిశుభ్రమైన వాతావరణాన్ని నిర్మించండి.",
      cta_learn: "పాఠ్యాంశాలను అన్వేషించండి",
      cta_report: "సమస్యల నివేదిక",
      dashboard: "సిటిజెన్ డాష్‌బోర్డ్",
      my_stats: "ధృవీకరించబడిన గణాంకాలు",
      level: "సివిక్ స్థాయి",
      points: "పాయింట్లు",
      recs: "వ్యక్తిగత సూచనలు",
      challenges: "కమ్యూనిటీ ప్రచారాలు",
      verify: "సచివాలయ ధ్రువీకరణ",
      certificate: "ధృవీకరణ పత్రం"
    }
  }[lang];

  return (
    <div className={`min-h-screen bg-[#F8FAFC] dark:bg-slate-900 transition-colors duration-200 flex flex-col font-sans text-slate-800 dark:text-slate-200`}>
      {/* Navbar Integration */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // clear active states
          setActiveQuizModule(null);
          setActiveCertificate(null);
        }}
        onSelectLoginRole={handleSelectLoginRole}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* LANDING PAGE / WELCOME TAB */}
        {activeTab === 'landing' && (
          <div className="space-y-12 animate-fade-in">
            {/* Elegant Hero Visual Section */}
            <div className="relative bg-gradient-to-br from-blue-700 to-indigo-900 text-white rounded-3xl overflow-hidden shadow-xl p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row justify-between items-center gap-8 border-b-4 border-amber-500">
              {/* Abs Grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
              
              <div className="relative z-10 space-y-6 max-w-2xl">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ★ {dict.tag} (Ward 88)
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  {dict.hero_title}
                </h1>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                  {dict.hero_sub}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => user ? setActiveTab('modules') : setActiveTab('register')}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center space-x-2 text-sm cursor-pointer"
                  >
                    <span>{dict.cta_learn}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => user ? setActiveTab('reports') : setActiveTab('login')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition text-sm cursor-pointer"
                  >
                    {dict.cta_report}
                  </button>
                </div>
              </div>

              <div className="relative z-10 w-full lg:w-96 h-64 sm:h-72 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-blue-500 text-[10px] font-bold uppercase rounded tracking-wider">AP-CSP ADAPTIVE PICK</span>
                    <Clock className="h-4 w-4 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-bold mt-4 leading-snug">Public Cleanliness & 3-Bin Composting</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Improve sanitation and prevent mosquito-borne fevers. Segregate wet vs dry household garbage scientifically in Ward 88.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-blue-300">Level Requirement: Lvl 1</span>
                    <span className="text-emerald-400 font-bold">+50 Points</span>
                  </div>
                  <button
                    onClick={() => {
                      if (user) {
                        setActiveTab('modules');
                      } else {
                        setActiveTab('login');
                      }
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition"
                  >
                    Start Quick Lesson
                  </button>
                </div>
              </div>
            </div>

            {/* DUAL PORTAL GATEWAY SECTION */}
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[10px] uppercase tracking-wider rounded-full border border-blue-100 dark:border-blue-900">
                  AP-CSP Access Hub
                </span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Select Portal to Continue</h2>
                <p className="text-sm text-slate-500">Explore educational modules as a citizen, or log in as an administrator/coordinator to review progress.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Citizen Portal Card */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Citizen & Student Learning</h3>
                      <p className="text-xs text-slate-400 mt-1">For Ward No. 88 local residents and active students</p>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        <span>Interactive visual curriculum (Waste Management, Traffic Safety)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        <span>Compete on live Ward Leaderboards</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        <span>Download accredited official civic competence certificate</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        <span>Submit instant ward reports & track resolution live</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setLoginRoleType('citizen');
                      setActiveTab('login');
                    }}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Enter Citizen Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Official Command Center Card */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <ShieldAlert className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Government Secretariat Portal</h3>
                      <p className="text-xs text-slate-400 mt-1">For authorized administrators, coordinators, and teachers</p>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                        <span>Review and approve uploaded student challenge proofs</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                        <span>Verify citizen profiles and issue official awards</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                        <span>Address local safety & waste grievances posted by citizens</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                        <span>Broadcast emergency ward notices to the central bulletin</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setLoginRoleType('official');
                      setActiveTab('login');
                    }}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Enter Official Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* SDG Goals Framework Section */}
            <div className="space-y-4">
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">SDG Alignment & Regional Focus</h2>
                <p className="text-xs text-slate-500">How the AP CSP Curriculum directly aligns with United Nations Sustainable Development Goals.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-red-100 dark:border-red-950 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold text-red-600 uppercase">SDG Goal 4</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">Quality Education</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">Spreading mandatory civic knowledge across Visakhapatnam school children and residents.</p>
                </div>

                <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-amber-100 dark:border-amber-950 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold text-amber-600 uppercase">SDG Goal 11</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">Sustainable Cities</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">Promoting pedestrian-friendly zones, zebra compliance, and reduced highway speed margins.</p>
                </div>

                <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-emerald-100 dark:border-emerald-950 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">SDG Goal 12</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">Responsible Consumption</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">Enforcing clean separation of plastic recyclables, minimizing waste dumps in Ward No. 88.</p>
                </div>

                <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-blue-100 dark:border-blue-950 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">SDG Goal 16</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">Strong Institutions</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">Empowering community-secretariat collaboration via quick digital grievance reports.</p>
                </div>
              </div>
            </div>

            {/* Quick Informative Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Our Educational Objective</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The Andhra Pradesh Community Service Project (AP-CSP) is a certified educational curriculum designed to inspire active local citizenship. By educating people about road protocols, traffic lights, primary first aid, household wet/dry separation, and the Good Samaritan protection laws, we foster a responsible, self-sustaining society.
                </p>
                <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400 font-bold">
                  <span>Enacted under AP Ward Secretariat No. 88 Dev Grid</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Ward Announcements</h3>
                <div className="space-y-3">
                  {announcements.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No urgent bulletins posted by administrators.</p>
                  ) : (
                    announcements.slice(0, 3).map((ann) => (
                      <div key={ann.id} className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-xl">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{ann.title}</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{ann.content}</p>
                        <span className="text-[9px] text-slate-400 font-mono block mt-1">{new Date(ann.date).toLocaleDateString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CITIZEN DASHBOARD TAB */}
        {activeTab === 'dashboard' && user && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Quick welcome block */}
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  You are driving real change in <span className="font-bold text-blue-600">{user.location}</span>. Keep up your active participation!
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {user.badges.map((badge, idx) => (
                    <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300">
                      🏆 {badge.replace('badge-', '').toUpperCase()} EXPERT
                    </span>
                  ))}
                </div>
              </div>

              {/* Points status meter */}
              <div className="bg-slate-900 text-white rounded-xl p-5 w-full md:w-64 space-y-3 flex-shrink-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold tracking-wider text-[10px] uppercase text-blue-400">Total Progress</span>
                  <span className="font-mono text-emerald-400">Lvl {user.level}</span>
                </div>
                <div>
                  <p className="text-2xl font-black font-mono">{user.points} <span className="text-xs font-normal text-slate-400">Points</span></p>
                </div>
                <div className="space-y-1">
                  <div className="w-full bg-slate-800 h-1.5 rounded-full">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(100, (user.xp % 200) / 2)}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono text-right">
                    {200 - (user.xp % 200)} XP to next level
                  </p>
                </div>
              </div>
            </div>

            {/* DYNAMIC GEMINI INSIGHT BLOCK */}
            {dashboardTip && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900/40 dark:to-indigo-950/20 border border-blue-100 dark:border-indigo-900/50 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Dynamic AI Civic Assistant</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                    {dashboardTip.greeting}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed bg-white/60 dark:bg-slate-900/40 p-3 rounded-xl border border-blue-50/50 dark:border-slate-800/50">
                    <span className="font-bold text-indigo-500 shrink-0">Tip for Today:</span>
                    <span>{dashboardTip.tip}</span>
                  </p>
                </div>
                <button
                  onClick={() => loadDashboardTip(token)}
                  disabled={loadingTip}
                  className="px-4 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition shrink-0 flex items-center space-x-1 border border-indigo-500/20 disabled:opacity-50"
                >
                  <RefreshCw className={`h-3 w-3 ${loadingTip ? 'animate-spin' : ''}`} />
                  <span>{loadingTip ? 'Refreshing...' : 'Get New AI Insight'}</span>
                </button>
              </div>
            )}

            {/* AI ADAPTIVE LEARNING REC PANEL */}
            {recommendations.length > 0 && (
              <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border-2 border-indigo-100 dark:border-indigo-900 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-indigo-100 dark:bg-indigo-950 rounded-lg text-indigo-600">
                      <Compass className="h-5 w-5 animate-spin-slow" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">AI Adaptive Recommended Route</h3>
                      <p className="text-[10px] text-indigo-600 font-bold">Recommended based on your recent quiz results</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-mono font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                            {rec.moduleId.toUpperCase()}
                          </span>
                          <button
                            onClick={() => handleDismissRecommendation(rec.moduleId)}
                            className="text-slate-400 hover:text-slate-600 text-[10px] font-bold"
                          >
                            Dismiss
                          </button>
                        </div>
                        <p className="text-xs italic text-slate-600 dark:text-slate-300 mt-2">
                          "{rec.geminiAnalysis}"
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Recommended Focus:</p>
                        <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                          {rec.recommendedLessons.map((les, lidx) => (
                            <li key={lidx} className="flex items-center">
                              <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                              {les}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => setActiveTab('modules')}
                        className="w-full py-1.5 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-700 transition"
                      >
                        Start Learning
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main stats block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Lessons</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{user.completedModules.length}</p>
                <p className="text-[10px] text-slate-500 mt-1">out of 10 primary syllabus topics</p>
              </div>

              <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Quizzes</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{user.completedQuizzes.length}</p>
                <p className="text-[10px] text-slate-500 mt-1">Unlock certificate with 3 passes</p>
              </div>

              <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Challenges</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{user.completedChallenges.length}</p>
                <p className="text-[10px] text-slate-500 mt-1">Pending verification: {submissions.filter(s => s.status === 'pending').length}</p>
              </div>

              {/* Certificate generate block */}
              <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-850 dark:to-slate-800 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-xs flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Curriculum Badge</p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">Responsible Citizen Award</p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleGenerateCertificate}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition"
                  >
                    Generate PDF Certificate
                  </button>
                  {certError && (
                    <p className="text-[10px] text-rose-600 font-bold mt-1 text-center">
                      {certError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Middle Row: Progress and active challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Learning Progress List */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">Your Educational Curriculums</h3>
                <div className="space-y-3">
                  {civicModules.map((mod) => {
                    const isCompleted = user.completedModules.includes(mod.id);
                    return (
                      <div
                        key={mod.id}
                        onClick={() => {
                          setActiveQuizModule(null);
                          setActiveTab('modules');
                        }}
                        className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{lang === 'en' ? mod.title : mod.titleTe}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-semibold">{mod.category}</p>
                          </div>
                        </div>

                        <div>
                          {isCompleted ? (
                            <span className="text-xs font-bold text-emerald-600 flex items-center">
                              <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-500" />
                              Passed
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-blue-600 flex items-center">
                              Incomplete
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Regional Leaderboard positioning */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">Top Civic Contributors</h3>
                <div className="space-y-3">
                  {leaderboard.slice(0, 4).map((lead, idx) => {
                    const isMe = lead.id === user.id;
                    return (
                      <div
                        key={lead.id}
                        className={`p-3 rounded-xl flex items-center justify-between border ${
                          isMe ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-950/20' : 'border-slate-100 dark:border-slate-700/60'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className={`h-6 w-6 font-mono font-bold text-xs flex items-center justify-center rounded-full ${
                            idx === 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            0{idx + 1}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                              {lead.name} {isMe && '(You)'}
                            </p>
                            <p className="text-[9px] text-slate-400 font-mono">{lead.location}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-bold text-blue-600">{lead.points} pts</p>
                          <p className="text-[9px] text-slate-400 font-mono">Level {lead.level}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition"
                >
                  View Full Leaderboard
                </button>
              </div>

            </div>

          </div>
        )}

        {/* EDUCATIONAL MODULES TAB */}
        {activeTab === 'modules' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header / Search filter */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  AP-CSP Learning Curriculum
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Read comprehensive guidelines to become an active, legally protected Good Samaritan.
                </p>
              </div>

              {/* Functional Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search syllabus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Quiz system rendering if quiz module selected */}
            {activeQuizModule ? (
              <CivicQuizSystem
                quiz={activeQuizModule.quiz}
                lang={lang}
                onClose={() => {
                  setActiveQuizModule(null);
                  loadUserData(token);
                }}
                onSubmit={handleQuizSubmit}
              />
            ) : (
              /* Grid of modules */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredModules.map((module) => {
                  const isCompleted = user?.completedModules.includes(module.id);
                  return (
                    <div
                      key={module.id}
                      className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xs flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                            {module.category}
                          </span>
                          {isCompleted && (
                            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
                              <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-500" />
                              Passed
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {lang === 'en' ? module.title : module.titleTe}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          {lang === 'en' ? module.description : module.descriptionTe}
                        </p>

                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-medium whitespace-pre-wrap max-h-48 overflow-y-auto border border-slate-100 dark:border-slate-800/80">
                          {lang === 'en' ? module.content : module.contentTe}
                        </div>
                      </div>

                      {/* Launch Quiz / feedback trigger */}
                      <div className="flex items-center space-x-2 pt-2 border-t border-slate-150 dark:border-slate-700/60">
                        {user ? (
                          <>
                            <button
                              onClick={() => setActiveQuizModule(module)}
                              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-md transition"
                            >
                              Verify Knowledge (Challenge)
                            </button>
                            <button
                              onClick={() => {
                                setSelectedModuleFeedback(module);
                                setFeedbackSuccess('');
                              }}
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-lg transition"
                            >
                              Feedback
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setActiveTab('login')}
                            className="w-full py-2 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg"
                          >
                            Sign In to Test Knowledge
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Feedback Modal Overlay */}
            {selectedModuleFeedback && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-slate-800 max-w-md w-full p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 animate-scale-up">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 dark:text-white">Submit Lesson Feedback</h3>
                    <button onClick={() => setSelectedModuleFeedback(null)} className="text-slate-400 text-sm font-semibold">✕</button>
                  </div>

                  <p className="text-xs text-slate-500">Provide suggestions to help Ward 88 coordinators improve lesson content.</p>

                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Constructive Rating</p>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((stars) => (
                          <button
                            key={stars}
                            type="button"
                            onClick={() => setFeedbackRating(stars)}
                            className="text-lg"
                          >
                            {stars <= feedbackRating ? '★' : '☆'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Your constructive feedback</p>
                      <textarea
                        required
                        rows={3}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="e.g. Include maps of actual zebra spots..."
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow"
                    >
                      Submit Feedback
                    </button>
                  </form>
                </div>
              </div>
            )}
            
            {/* Feedback Success banner */}
            {feedbackSuccess && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 rounded-2xl max-w-md mx-auto text-center text-xs font-bold">
                {feedbackSuccess}
              </div>
            )}

          </div>
        )}

        {/* CIVIC CHALLENGES TAB */}
        {activeTab === 'challenges' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Active Community Campaigns
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Perform daily actions inside Ward No. 88, upload proof, and claim points to rise on the leaderboard.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Challenges list */}
              <div className="lg:col-span-2 space-y-4">
                {challenges.map((ch) => {
                  const submission = submissions.find(s => s.challengeId === ch.id);
                  const isPending = submission?.status === 'pending';
                  const isApproved = submission?.status === 'approved';

                  return (
                    <div
                      key={ch.id}
                      className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-slate-900 dark:text-white text-base">
                            {lang === 'en' ? ch.title : ch.titleTe}
                          </h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-md border border-emerald-100">
                            +{ch.points} pts
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          {ch.description}
                        </p>
                      </div>

                      <div className="w-full sm:w-auto">
                        {isApproved ? (
                          <span className="px-4 py-2 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-500" />
                            Approved (+{ch.points} pts)
                          </span>
                        ) : isPending ? (
                          <span className="px-4 py-2 text-xs font-bold text-amber-600 bg-amber-50 rounded-lg flex items-center justify-center">
                            <Clock className="h-4 w-4 mr-1 text-amber-500" />
                            Pending approval
                          </span>
                        ) : user ? (
                          <button
                            onClick={() => {
                              setActiveChallenge(ch);
                              setSubmitSuccess('');
                            }}
                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition"
                          >
                            Submit Proof
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveTab('login')}
                            className="w-full px-4 py-2 bg-slate-100 text-slate-400 text-xs rounded-lg"
                          >
                            Login to claim
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submission Form panel */}
              <div className="lg:col-span-1">
                {activeChallenge ? (
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center">
                      <Camera className="h-5 w-5 mr-2 text-blue-600" />
                      Submit Proof for: {activeChallenge.title}
                    </h3>
                    
                    <form onSubmit={handleChallengeSubmit} className="space-y-4 pt-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Proof description & Remarks
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={proofText}
                          onChange={(e) => setProofText(e.target.value)}
                          placeholder="e.g. Crossed using Zebra crossing at Ward Secretariat junction today morning at 9 AM..."
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                        />
                      </div>

                      {/* File upload widget with preview */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                          Upload Camera Snap
                        </label>
                        <div className="flex items-center space-x-3">
                          <label className="flex items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition">
                            <Camera className="h-4 w-4 mr-1 text-slate-500" />
                            <span className="text-xs font-semibold text-slate-600">Select Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                          {proofPhoto && (
                            <div className="relative h-12 w-12 rounded overflow-hidden border">
                              <img src={proofPhoto} className="h-full w-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setProofPhoto('')}
                                className="absolute inset-0 bg-black/50 text-white text-[9px] font-bold opacity-0 hover:opacity-100 transition"
                              >
                                Clear
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {submitSuccess && (
                        <p className="text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-100">
                          {submitSuccess}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveChallenge(null)}
                          className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition"
                        >
                          Submit Proof
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center py-12 text-slate-400">
                    <CheckSquare className="h-8 w-8 mx-auto mb-2 opacity-60" />
                    <p className="text-xs font-semibold">Select an active challenge campaign to initiate your verifier submission!</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* REPORT GRIEVANCES / ISSUES TAB */}
        {activeTab === 'reports' && (
          <div className="space-y-8 animate-fade-in">
            <ReportIssueForm
              reports={reports}
              lang={lang}
              isAdmin={user?.role === UserRole.ADMIN}
              onUpdateStatus={handleUpdateReportStatusAdmin}
              onSubmit={handleReportIssueSubmit}
            />
          </div>
        )}

        {/* LEADERBOARD TAB */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">Regional Ward Leaderboard</h1>
              <p className="text-xs text-slate-500">
                Top performing citizens based on verified quizzes passed and community campaign proofs approved in Ward No. 88.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-700 to-blue-600 text-white flex justify-between items-center">
                <span className="font-bold text-sm tracking-wide uppercase">Standing</span>
                <span className="font-mono text-xs text-blue-100">Visakhapatnam, Andhra Pradesh</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {leaderboard.map((lead, idx) => {
                  const isMe = lead.id === user?.id;
                  return (
                    <div
                      key={lead.id}
                      className={`p-4 sm:p-5 flex items-center justify-between transition ${
                        isMe ? 'bg-blue-50/50 dark:bg-blue-950/20' : 'hover:bg-slate-50/50 dark:hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className={`h-8 w-8 rounded-full font-mono font-bold text-sm flex items-center justify-center ${
                          idx === 0
                            ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-500/20'
                            : idx === 1
                            ? 'bg-slate-100 text-slate-600'
                            : idx === 2
                            ? 'bg-orange-50 text-orange-700'
                            : 'bg-slate-50 text-slate-400'
                        }`}>
                          {idx + 1}
                        </span>

                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
                            {lead.name} {isMe && <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-[9px] font-bold">YOU</span>}
                          </p>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{lead.location}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-base font-black font-mono text-blue-600 dark:text-blue-400">{lead.points} <span className="text-xs font-normal text-slate-400">pts</span></p>
                        <p className="text-[10px] text-slate-500 font-semibold font-mono">Level {lead.level}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE / EDIT PROFILE TAB */}
        {activeTab === 'profile' && user && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Civic Credentials</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Keep your credentials updated to align with ward level verification lists.</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Name</label>
                    <input
                      required
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mobile Number</label>
                    <input
                      required
                      type="tel"
                      value={profileMobile}
                      onChange={(e) => setProfileMobile(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Age</label>
                    <input
                      required
                      type="number"
                      value={profileAge}
                      onChange={(e) => setProfileAge(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Sachivalayam Ward Location</label>
                    <input
                      required
                      type="text"
                      value={profileLocation}
                      onChange={(e) => setProfileLocation(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                {profileSuccess && (
                  <p className="text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-100">
                    {profileSuccess}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition"
                >
                  Verify and Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TEACHER COORDINATOR PORTAL */}
        {activeTab === 'teacher' && user && user.role === UserRole.TEACHER && (
          <TeacherPortal
            token={token}
            lang={lang}
            reports={reports}
            onUpdateReportStatus={handleUpdateReportStatusAdmin}
            onChallengeCreated={loadChallenges}
          />
        )}

        {/* ADMIN COMMAND CENTER */}
        {activeTab === 'admin' && user && user.role === UserRole.ADMIN && (
          <AdminPortal
            token={token}
            lang={lang}
            reports={reports}
            onUpdateReportStatus={handleUpdateReportStatusAdmin}
          />
        )}

        {/* CERTIFICATE DISPLAY IF UNLOCKED */}
        {activeCertificate && (
          <CertificateView
            certificate={activeCertificate}
            lang={lang}
            onBack={() => {
              setActiveCertificate(null);
              setActiveTab('dashboard');
            }}
          />
        )}

        {/* LOGIN TAB */}
        {activeTab === 'login' && !user && (
          <div className="max-w-lg mx-auto my-8 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              
              {/* Separate Portal Selector Tabs */}
              <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                <button
                  type="button"
                  onClick={() => handleSelectLoginRole('citizen')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                    loginRoleType === 'citizen'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Citizen Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectLoginRole('official')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                    loginRoleType === 'official'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <ShieldAlert className="h-4 w-4" />
                  <span>Official Login</span>
                </button>
              </div>

              {loginRoleType === 'citizen' ? (
                // CITIZEN LOGIN FORM
                <div className="space-y-4 animate-fade-in">
                  <div className="text-center space-y-2">
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-extrabold text-[10px] uppercase rounded">
                      Citizen / Student Section
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Sign In to Civic Learning</h2>
                    <p className="text-xs text-slate-500">Access modules, upload challenge proof, and report local grievances.</p>
                  </div>
                </div>
              ) : (
                // OFFICIAL LOGIN FORM
                <div className="space-y-4 animate-fade-in">
                  <div className="text-center space-y-2">
                    <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 font-extrabold text-[10px] uppercase rounded">
                      Authorized Administration
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Official Command Center</h2>
                    <p className="text-xs text-slate-500">Review community reports, verify challenge submissions, or add modules.</p>
                  </div>

                  {/* Sub-role selector */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/40 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleSelectOfficialRole('teacher')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        loginOfficialRole === 'teacher'
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <Users className="h-3.5 w-3.5" />
                      <span>Teacher Coordinator</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectOfficialRole('admin')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        loginOfficialRole === 'admin'
                          ? 'bg-emerald-600 text-white font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <Lock className="h-3.5 w-3.5" />
                      <span>Secretariat Admin</span>
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Registered Email</label>
                  <input
                    required
                    type="email"
                    value={authEmail}
                    placeholder={
                      loginRoleType === 'citizen'
                        ? 'citizen@csp.in'
                        : loginOfficialRole === 'teacher'
                        ? 'teacher@csp.edu'
                        : 'admin@csp.gov.in'
                    }
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Password</label>
                  <input
                    required
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
                  />
                </div>

                {authError && (
                  <p className="text-xs text-rose-600 font-bold bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-lg border border-rose-100 dark:border-rose-900/50">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  className={`w-full py-2.5 text-white font-bold text-sm rounded-lg shadow-md transition-all ${
                    loginRoleType === 'citizen'
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/10'
                      : loginOfficialRole === 'teacher'
                      ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/10'
                      : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10'
                  }`}
                >
                  Verify {loginRoleType === 'citizen' ? 'Citizen' : loginOfficialRole === 'teacher' ? 'Teacher' : 'Admin'} Access
                </button>
              </form>

              <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setAuthEmail('');
                    setAuthPassword('');
                    setActiveTab('register');
                  }}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Create citizen account instead
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REGISTER TAB */}
        {activeTab === 'register' && !user && (
          <div className="max-w-lg mx-auto my-8 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Register Civic Account</h2>
                <p className="text-xs text-slate-500">Join other Mangalapalem citizens driving sustainable change.</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Chiranjeevi Kumar"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Registered Email</label>
                    <input
                      required
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Age</label>
                    <input
                      required
                      type="number"
                      value={authAge}
                      onChange={(e) => setAuthAge(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Password</label>
                    <input
                      required
                      type="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Mobile Number</label>
                    <input
                      required
                      type="tel"
                      value={authMobile}
                      onChange={(e) => setAuthMobile(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Assigned Role</label>
                    <select
                      value={authRole}
                      onChange={(e: any) => setAuthRole(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
                    >
                      <option value={UserRole.CITIZEN}>Citizen (Student)</option>
                      <option value={UserRole.TEACHER}>Teacher Coordinator</option>
                      <option value={UserRole.ADMIN}>Ward Secretariat Admin</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Sachivalayam / Ward Location</label>
                  <input
                    required
                    type="text"
                    value={authLocation}
                    onChange={(e) => setAuthLocation(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  />
                </div>

                {authError && (
                  <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2.5 rounded-lg border border-rose-100">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg shadow-md transition"
                >
                  Create Verified Citizen Account
                </button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Already have an account? Sign In
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer component */}
      <Footer lang={lang} />
    </div>
  );
}

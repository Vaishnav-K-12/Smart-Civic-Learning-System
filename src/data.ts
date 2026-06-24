import { LearningModule, Quiz, CivicChallenge, Badge } from './types';

export const CIVIC_MODULES: LearningModule[] = [
  {
    id: "road-safety",
    title: "Road Safety & Zebra Crossings",
    titleTe: "రోడ్డు భద్రత & జీబ్రా క్రాసింగ్స్",
    description: "Learn safe pedestrian habits, visual signaling, and how to protect lives on Indian public roads.",
    descriptionTe: "భారతీయ ప్రజా రోడ్లపై సురక్షితమైన పాదచారుల అలవాట్లు మరియు ప్రాణాలను ఎలా రక్షించాలో తెలుసుకోండి.",
    category: "road-safety",
    lessons: [
      {
        id: "rs-l1",
        title: "Pedestrian Safety & Zebra Crossings",
        content: "Pedestrian safety is a cornerstone of responsible citizenship. In India, crossing roads demands absolute vigilance due to high vehicle density. Always use designated Zebra Crossings to cross roads. When a zebra crossing is not available, look right, look left, and look right again before proceeding. Pedestrians have the right of way on zebra crossings, but you must ensure oncoming vehicles have sufficient distance to stop safely before stepping onto the tarmac.\n\nVisual reminders such as high-visibility clothing at night and making eye contact with drivers are highly effective.",
        infoGraphicTitle: "The Pedestrian Survival Formula",
        infoGraphicText: "1. STOP: Stand 2 feet back from the curb.\n2. LOOK: Scan 360 degrees for speeding vehicles.\n3. SIGNAL: Extend your hand to indicate your intention to cross.\n4. CROSS: Walk briskly; do not run or use mobile devices."
      },
      {
        id: "rs-l2",
        title: "The Golden Hour and Emergency Response",
        content: "If an accident occurs on the road, the first 60 minutes are known as the 'Golden Hour'. Prompt medical attention during this timeframe can increase survival chances by up to 80%. Responsible citizens should know how to contact ambulance services (108/102) immediately. Under the Good Samaritan Law in India, citizens who assist road accident victims are protected from legal harassment, police questioning, and court liability. You can confidently help save lives without fear of legal reprisal.",
        infoGraphicTitle: "Good Samaritan Protection Code",
        infoGraphicText: "• Immediate hospital admission without police delays.\n• Voluntary police questioning (citizens can choose not to answer).\n• Medical expenses of victims prioritised."
      }
    ]
  },
  {
    id: "traffic-rules",
    title: "Essential Traffic Rules & Signs",
    titleTe: "ముఖ్యమైన ట్రాఫిక్ నిబంధనలు",
    description: "Master traffic lights, standard road markings, overtaking rules, and speed boundaries for safer transits.",
    descriptionTe: "సురక్షితమైన ప్రయాణాల కోసం ట్రాఫిక్ లైట్లు, రహదారి గుర్తులు మరియు నిబంధనలను నేర్చుకోండి.",
    category: "road-safety",
    lessons: [
      {
        id: "tr-l1",
        title: "Understanding Traffic Lights and Signs",
        content: "Traffic lights are the universal language of road coordination. Red means complete halt behind the stop line. Amber indicates preparation to stop; you should only cross if you are already inside the intersection. Green signals proceed with caution. Continuous white lines on the road mean overtaking is strictly prohibited, while dashed white lines allow overtaking when safe. Speed limits are not mere suggestions—they are calculated based on stopping distance, pedestrian density, and vehicle class.",
        infoGraphicTitle: "Indian Road Color Standard",
        infoGraphicText: "• Red Circular Signs: Mandatory/Prohibitory (e.g., No Entry, Speed Limit).\n• Blue Circular Signs: Compulsory directions.\n• Yellow/Orange Signs: Warning/Cautionary guides."
      },
      {
        id: "tr-l2",
        title: "Drunk Driving & Safety Gear Mandates",
        content: "Driving under the influence of alcohol (DUI) is a severe criminal offense in India under Section 185 of the Motor Vehicles Act. It impairs motor skills, slows down cognitive reaction times, and endangers countless lives. Wearing ISI-marked helmets for two-wheelers and locking seatbelts for four-wheelers are simple actions that reduce fatality risk by over 50%. Ensuring your vehicle holds a valid 'Pollution Under Control' (PUC) certificate is also your legal civic duty.",
        infoGraphicTitle: "Two-Wheeler Safety Protocol",
        infoGraphicText: "• Secure chin strap of ISI/DOT helmet.\n• Avoid double pillions (maximum 2 riders).\n• Drive on the designated left lane; avoid sudden zig-zag weaving."
      }
    ]
  },
  {
    id: "public-cleanliness",
    title: "Public Cleanliness & Anti-Littering",
    titleTe: "ప్రజా పరిశుభ్రత & చెత్త వేయకపోవడం",
    description: "Understand the visual and health impact of littering, Swachh Bharat ideals, and active public space hygiene.",
    descriptionTe: "ప్రజా పరిశుభ్రత యొక్క ప్రాముఖ్యత మరియు స్వచ్ఛ భారత్ ఆదర్శాల గురించి తెలుసుకోండి.",
    category: "cleanliness",
    lessons: [
      {
        id: "pc-l1",
        title: "The Battle Against Public Littering",
        content: "Littering degrades community pride, clogs drainage networks, attracts disease-carrying vectors (mosquitoes and rodents), and pollutes local soil. Andhra Pradesh's local Sachivalayam system (like Ward No. 88 in Visakhapatnam) works tirelessly to maintain clean streets, but citizen cooperation is vital. Littering in public places is punishable by fines. Carrying a reusable trash pouch in your bag ensures you never have to throw waste on roadsides.",
        infoGraphicTitle: "Litter Degradation Timeline",
        infoGraphicText: "• Plastic Bottles: 450 Years\n• Cigarette Butts: 10-12 Years\n• Paper Bags: 2-4 Weeks\n• Banana Peels: 2-5 Weeks (But attracts pests!)"
      },
      {
        id: "pc-l2",
        title: "The Swachh Bharat Abhiyan Paradigm",
        content: "Launched with the goal of ending open defecation and introducing modern municipal solid waste management, the Swachh Bharat Abhiyan has transformed civic hygiene standards in India. It is not just a government program; it is a behavioral change. Keeping a radius of 100 meters around your household clean is considered the baseline requirement for solid community health. Eliminating stagnant water prevents Dengue and Malaria outbreaks.",
        infoGraphicTitle: "Sachivalayam Cleanliness Goals",
        infoGraphicText: "• Daily street sweeping.\n• Door-to-door waste collection tracking.\n• Immediate reporting of blocked sewage pipes."
      }
    ]
  },
  {
    id: "waste-management",
    title: "Waste Management & Segregation",
    titleTe: "వ్యర్థాల నిర్వహణ & విభజన",
    description: "Learn the scientific classification of wet, dry, and domestic hazardous wastes for clean recycling cycles.",
    descriptionTe: "పొడి మరియు తడి చెత్త విభజన ప్రక్రియ మరియు దాని పునరుత్పత్తి ప్రాముఖ్యత తెలుసుకోండి.",
    category: "cleanliness",
    lessons: [
      {
        id: "wm-l1",
        title: "The 3-Bin Segregation System",
        content: "Segregating waste at the source is the single most important step in solid waste management. Mixing wet and dry waste renders both unrecyclable, leading to massive, toxic landfills. The standard segregation model involves:\n1. Green Bin: Biodegradable Wet Waste (food scraps, vegetable peels, leaves).\n2. Blue Bin: Recyclable Dry Waste (paper, cardboard, plastics, metals).\n3. Red/Black Bin: Domestic Hazardous Waste (batteries, expired medicines, sanitary items).",
        infoGraphicTitle: "Color-Coded Garbage Segregation",
        infoGraphicText: "🟢 GREEN: Wet Waste → Turned into Composting/Bio-gas.\n🔵 BLUE: Dry Waste → Transported to recycling centers.\n🔴 RED: Sanitary/Hazardous → Secure scientific disposal."
      },
      {
        id: "wm-l2",
        title: "Composting and Reducing Single-Use Plastics",
        content: "Andhra Pradesh has implemented strict bans on single-use plastics under 120 microns. These lightweight plastics are the main culprits behind clogged urban drainage networks and marine pollution along the Vizag coastline. Composting organic kitchen waste at home reduces municipal disposal loads by 60% and yields premium organic fertilizer for backyard gardening.",
        infoGraphicTitle: "The Jute Bag Transformation",
        infoGraphicText: "• Replace plastic bags with reusable cotton or jute bags.\n• Refuse single-use plastic straws and plastic cutlery.\n• Wash and dry milk packets before throwing into dry bins."
      }
    ]
  },
  {
    id: "environmental-conservation",
    title: "Environmental Conservation & AP Initiatives",
    titleTe: "పర్యావరణ పరిరక్షణ & ఏపీ ప్రభుత్వ పథకాలు",
    description: "Explore tree planting, local biodiversity protection, climate action, and regional Andhra Pradesh greening.",
    descriptionTe: "మొక్కలు నాటడం, పర్యావరణ సమతుల్యత మరియు ఆంధ్రా హరిత కార్యక్రమాలను తెలుసుకోండి.",
    category: "environment",
    lessons: [
      {
        id: "ec-l1",
        title: "Urban Forestry and Tree Plantation Drives",
        content: "Rapid urbanization in coastal cities like Visakhapatnam exposes communities to cyclonic hazards and high urban heat island effects. Trees act as natural storm buffers, absorb greenhouse gases, and cool ambient temperatures by up to 4 degrees Celsius. The 'Karthika Vanam' and regional greening schemes in Andhra Pradesh encourage local citizens to plant native species (such as Neem, Pongamia, and Gulmohar) which thrive in local soils with minimal water requirements.",
        infoGraphicTitle: "Tree Planting Guidelines for Citizens",
        infoGraphicText: "• Plant saplings during monsoon months (June-September).\n• Keep a distance of 8 feet from building foundations.\n• Form a local youth tree-guard group to protect young saplings from livestock."
      },
      {
        id: "ec-l2",
        title: "Protecting Eastern Ghats and Marine Ecosystems",
        content: "Mangalapalem and coastal Visakhapatnam are flanked by the sensitive Eastern Ghats and the Bay of Bengal. Littering beaches with plastic harms sea turtles and local fish populations. Citizens must understand that every piece of garbage thrown in inland storm drains eventually drains into the ocean, poisoning maritime resources and affecting local fishing communities.",
        infoGraphicTitle: "The Ocean Cleanliness Cycle",
        infoGraphicText: "• Inland Litter → Storm Drains → Coastal Outlets → Fish Poisoning.\n• Solution: Local beach cleanups and zero-plastic beach zones."
      }
    ]
  },
  {
    id: "responsible-citizenship",
    title: "Responsible Citizenship & Ward Sachivalayam",
    titleTe: "బాధ్యతాయుతమైన పౌరసత్వం & సచివాలయం",
    description: "Understand your fundamental duties under Article 51A, local self-governance, and public grievance resolution.",
    descriptionTe: "రాజ్యాంగ ప్రాథమిక విధులను తెలుసుకోండి మరియు సచివాలయాల ద్వారా సమస్యలను ఎలా పరిష్కరించాలో నేర్చుకోండి.",
    category: "governance",
    lessons: [
      {
        id: "rc-l1",
        title: "Fundamental Duties Under the Constitution",
        content: "While we often debate our fundamental rights, Article 51A of the Indian Constitution lists our 'Fundamental Duties'. These include: abiding by the Constitution, respecting the National Flag and National Anthem, safeguarding public property, abjuring violence, and protecting the natural environment. Citizenship is a two-way street of rights and obligations.",
        infoGraphicTitle: "Article 51A Checklist for Everyday Life",
        infoGraphicText: "• Stand respectfully during the national anthem.\n• Treat public monuments with care; do not scribble names.\n• Report active anti-social damage to local authorities immediately."
      },
      {
        id: "rc-l2",
        title: "The AP Sachivalayam Grievance Redressal System",
        content: "Andhra Pradesh's decentralised Grama/Ward Sachivalayam system (like Ward No. 88 in Mangalapalem) brings administration directly to the citizen's doorstep. Through the 'Spandana' portal and local volunteers, residents can submit grievances regarding water supply, street lighting, waste disposal, and local security. A responsible citizen uses these official channels to actively participate in neighborhood improvement.",
        infoGraphicTitle: "Sachivalayam Issue Escalation Path",
        infoGraphicText: "1. Grievance Submission: Log issue with Ward Volunteer or Spandana App.\n2. Verification: Local Ward Secretary inspects site within 72 hours.\n3. Resolution: Assigned department completes work with real-time status updates."
      }
    ]
  },
  {
    id: "community-participation",
    title: "Community Participation & CSP surveys",
    titleTe: "సామాజిక భాగస్వామ్యం & సామాజిక సేవా ప్రాజెక్ట్",
    description: "Master local survey techniques, volunteer coordination, and building community-led action plans.",
    descriptionTe: "సామాజిక సర్వేల నిర్వహణ మరియు సేవా కార్యక్రమాల ద్వారా సమాజాన్ని మెరుగుపరచడం గురించి తెలుసుకోండి.",
    category: "governance",
    lessons: [
      {
        id: "cp-l1",
        title: "The Role of Community Service Projects (CSP)",
        content: "Higher education in Andhra Pradesh mandates Community Service Projects (CSP) to bridge the gap between academic learning and rural/urban realities. Students conduct extensive doorstep surveys in areas like Mangalapalem to identify drinking water issues, literacy gaps, road conditions, and hygiene awareness. This data is shared directly with Sachivalayam planners, shaping local policy budgets.",
        infoGraphicTitle: "A Standard CSP Action Framework",
        infoGraphicText: "• Week 1: Socio-economic doorstep survey & empathy mapping.\n• Week 2: Identify structural issues (e.g., street light failures).\n• Week 3: Conduct awareness campaigns (littering, helmet rules).\n• Week 4: Submit consolidated impact report to Sachivalayam."
      },
      {
        id: "cp-l2",
        title: "Self-Help Groups (SHGs) and Youth Clubs",
        content: "Self-Help Groups (such as Dwakra women groups in Andhra Pradesh) and Nehru Yuva Kendra clubs play a vital role in local development. When citizens organize themselves into groups, they can pool resources, coordinate cleanups, plant community gardens, and hold educational workshops, amplifying individual voices into strong community forces.",
        infoGraphicTitle: "Community Organization Power",
        infoGraphicText: "• Unified representation in municipal planning sessions.\n• Micro-savings and financial independence.\n• Group vigilance against neighborhood civic issues."
      }
    ]
  },
  {
    id: "digital-citizenship",
    title: "Digital Citizenship & Safety",
    titleTe: "డిజిటల్ పౌరసత్వం & భద్రత",
    description: "Protect yourself from cyber scams, verify fake news, practice netiquette, and access digital government services.",
    descriptionTe: "ఆన్‌లైన్ భద్రత, సైబర్ మోసాల నివారణ మరియు బాధ్యతాయుతమైన డిజిటల్ ప్రవర్తన గురించి తెలుసుకోండి.",
    category: "digital",
    lessons: [
      {
        id: "dc-l1",
        title: "Combating Cyber Fraud and Online Scams",
        content: "As India undergoes digital transformation, cybercriminals exploit lack of awareness. UPI fraud, phishing links, and fake bank KYC calls are common. A responsible digital citizen never shares OTPs, UPI PINs, or password details with anyone. Always check for 'https://' in URLs and use secure, complex passwords.",
        infoGraphicTitle: "The Cyber Security Shield",
        infoGraphicText: "• NEVER dial helpline numbers from random Google Search results (verify on official sites).\n• Report cyber financial fraud within 2 hours to 1930 (National Cyber Crime Portal).\n• Enable Multi-Factor Authentication (MFA) on all email and banking accounts."
      },
      {
        id: "dc-l2",
        title: "Combating Fake News and Hate Speech",
        content: "Forwarding unverified messages on WhatsApp or social media can incite panic, communal disharmony, and physical violence. Before hitting 'forward', apply the 'T.H.I.N.K' test. Is it True? Is it Helpful? Is it Inspiring? Is it Necessary? Is it Kind? Utilize official government fact-checking portals to verify news.",
        infoGraphicTitle: "The WhatsApp Verification Habit",
        infoGraphicText: "• Check the date: Old videos are often shared as fresh events.\n• Search keywords on reliable news websites.\n• Reverse-search images on Google to find original context."
      }
    ]
  },
  {
    id: "water-conservation",
    title: "Water Conservation & Rainwater Harvesting",
    titleTe: "నీటి పరిరక్షణ & ఇంకుడు గుంతలు",
    description: "Learn rainwater recharging methods, greywater recycling, and simple daily habits to save precious water.",
    descriptionTe: "భూగర్భ జలాల పెంపుదల, ఇంకుడు గుంతల నిర్మాణం మరియు నీటి పొదుపు పద్ధతులను తెలుసుకోండి.",
    category: "environment",
    lessons: [
      {
        id: "wc-l1",
        title: "Rainwater Harvesting (RWH) in Coastal Areas",
        content: "While Visakhapatnam receives decent monsoon rainfall, groundwater levels deplete rapidly in summer, causing seawater intrusion in coastal aquifers. Rainwater Harvesting (RWH) recharge pits capture rooftop water, filter it through sand and charcoal layers, and funnel it directly into the ground, raising groundwater tables and preventing borewells from drying up.",
        infoGraphicTitle: "Standard Rooftop RWH Structure",
        infoGraphicText: "• Rooftop Catchment → PVC Conduit Pipes → Filtration Chamber (Sand/Gravel) → Recharge Pit or Storage Well."
      },
      {
        id: "wc-l2",
        title: "Household Water Footprint Reduction",
        content: "Simple daily actions have massive cumulative impacts. Fixing a leaking tap can save 15,000 liters of water annually. Using a bucket instead of a hose to wash vehicles, and recycling washing machine greywater to flush toilets are essential responsible water conservation habits.",
        infoGraphicTitle: "Water Conservation Targets",
        infoGraphicText: "• Install aerators on bathroom taps (reduces flow rate by 50%).\n• Keep bath times under 5 minutes.\n• Report broken municipal water pipelines immediately to the Ward Secretary."
      }
    ]
  },
  {
    id: "public-property",
    title: "Protection of Public Property",
    titleTe: "ప్రజా ఆస్తుల పరిరక్షణ",
    description: "Understand the value of public property (buses, parks, heritage sites), anti-vandalism, and citizen co-ownership.",
    descriptionTe: "రైళ్ళు, బస్సులు, పార్కులు మరియు చారిత్రక కట్టడాల పరిరక్షణలో పౌరుల పాత్రను తెలుసుకోండి.",
    category: "governance",
    lessons: [
      {
        id: "pp-l1",
        title: "Stop Vandalism in Public Transit & Parks",
        content: "Public buses (APSRTC), railway stations, municipal parks, and street lights are built using hard-earned taxpayers' money. Damaging them is not a protest; it is self-sabotage. Scratching names on monument walls, spitting pan masala on public walls, and stealing street lights affect community comfort and safety. Citizens must co-own public infrastructure.",
        infoGraphicTitle: "Vandalism Law in India",
        infoGraphicText: "• Under the Prevention of Damage to Public Property Act, 1984, damaging public property carries a rigorous imprisonment sentence of up to 5 years along with hefty fines."
      },
      {
        id: "pp-l2",
        title: "Reporting and Stopping Vandalism",
        content: "If you witness someone vandalizing public property or dumping construction debris in public parks, you must intervene politely or report the incident. Anonymous feedback portals and Sachivalayam helplines protect your identity while enabling enforcement action.",
        infoGraphicTitle: "Public Area Vigilance Guidelines",
        infoGraphicText: "• Use the 'Civic Report' feature to upload photos of damaged public installations.\n• Form neighborhood watch clubs in local parks to discourage littering and anti-social behavior."
      }
    ]
  }
];

export const CIVIC_QUIZZES: Quiz[] = CIVIC_MODULES.map(module => {
  // Let's define custom tailored questions for each module to make it incredibly educational!
  let questions = [];

  if (module.id === "road-safety") {
    questions = [
      {
        id: "rs-q1",
        question: "Where should pedestrians always cross a busy road?",
        questionTe: "పాదచారులు రద్దీగా ఉండే రోడ్డును ఎక్కడ దాటాలి?",
        options: ["Anywhere when they are in a hurry", "Only at designated Zebra Crossings", "Between parked heavy vehicles", "Run diagonally across the intersection"],
        optionsTe: ["తొందరగా ఉన్నప్పుడు ఎక్కడైనా", "జీబ్రా క్రాసింగ్ వద్ద మాత్రమే", "పార్కింగ్ చేసిన వాహనాల మధ్యలో", "కూడలిలో వికర్ణంగా పరిగెత్తడం"],
        correctIndex: 1,
        explanation: "Zebra crossings are legally marked for pedestrian transit. Drivers are expected to slow down and stop for pedestrians on zebra crossings.",
        explanationTe: "జీబ్రా క్రాసింగ్‌లు పాదచారుల దాటడం కోసం చట్టబద్ధంగా గుర్తించబడినవి. డ్రైవర్లు పాదచారులకు దారి ఇవ్వవలసి ఉంటుంది."
      },
      {
        id: "rs-q2",
        question: "What does the Good Samaritan Law in India protect citizens from?",
        questionTe: "భారతదేశంలో గుడ్ సమరిటన్ చట్టం పౌరులను దేని నుండి రక్షిస్తుంది?",
        options: ["Traffic fines", "Paying for victim's medical bills", "Police harassment and legal court liability when assisting accident victims", "Mandatory military enlistment"],
        optionsTe: ["ట్రాఫిక్ జరిమానాలు", "బాధితుల మెడికల్ బిల్లులు చెల్లించడం", "రోడ్డు ప్రమాద బాధితులకు సహాయం చేసినప్పుడు పోలీస్ వేధింపులు మరియు కోర్టు హాజరుల నుండి రక్షణ", "కంపల్సరీ మిలిటరీ సర్వీస్"],
        correctIndex: 2,
        explanation: "The Good Samaritan Law shields citizens who help accident victims from legal harassment, encouraging immediate life-saving support during the Golden Hour.",
        explanationTe: "గుడ్ సమరిటన్ చట్టం ప్రమాద బాధితులకు సహాయం చేసే పౌరులను చట్టపరమైన వేధింపుల నుండి కాపాడుతుంది."
      },
      {
        id: "rs-q3",
        question: "How long is the critical medical emergency period known as the 'Golden Hour'?",
        questionTe: "'గోల్డెన్ అవర్' అని పిలువబడే క్లిష్టమైన వైద్య అత్యవసర కాలం ఎంత సమయం?",
        options: ["First 24 hours", "First 30 minutes", "First 60 minutes after an injury", "First 10 minutes"],
        optionsTe: ["మొదటి 24 గంటలు", "మొదటి 30 నిమిషాలు", "గాయం జరిగిన మొదటి 60 నిమిషాలు", "మొదటి 10 నిమిషాలు"],
        correctIndex: 2,
        explanation: "The first hour after a traumatic injury is critical. Immediate medical intervention during this time yields the highest survival rate.",
        explanationTe: "గాయం జరిగిన మొదటి గంట అత్యంత కీలకమైనది. ఈ సమయంలో వైద్యం అందితే బ్రతికే అవకాశాలు చాలా ఎక్కువ."
      },
      {
        id: "rs-q4",
        question: "What should you do before stepping onto a Zebra Crossing?",
        questionTe: "జీబ్రా క్రాసింగ్ పై అడుగు పెట్టడానికి ముందు మీరు ఏమి చేయాలి?",
        options: ["Close your eyes and run", "Look at your mobile phone", "Ensure oncoming vehicles are at a safe distance and have noticed you", "Wait for all street lights to turn off"],
        optionsTe: ["కళ్ళు మూసుకుని పరిగెత్తడం", "మొబైల్ ఫోన్ చూడటం", "ఎదురుగా వచ్చే వాహనాలు సురక్షితమైన దూరంలో ఉన్నాయని మరియు మిమ్మల్ని గమనించాయని నిర్ధారించుకోవడం", "అన్ని వీధి దీపాలు ఆరిపోయే వరకు ఆగడం"],
        correctIndex: 2,
        explanation: "Pedestrians have right of way, but physics dictates that heavy vehicles need stopping distance. Always verify the driver has spotted you.",
        explanationTe: "పాదచారులకు ప్రాధాన్యత ఉన్నప్పటికీ, భారీ వాహనాలు ఆగడానికి సమయం పడుతుంది కాబట్టి సురక్షిత దూరాన్ని నిర్ధారించుకోవాలి."
      },
      {
        id: "rs-q5",
        question: "Which emergency phone number in Andhra Pradesh is used to call a road accident ambulance?",
        questionTe: "ఆంధ్రప్రదేశ్‌లో రోడ్డు ప్రమాద అంబులెన్స్ కోసం ఏ అత్యవసర నంబర్‌ను పిలుస్తారు?",
        options: ["100", "101", "108", "14400"],
        optionsTe: ["100", "101", "108", "14400"],
        correctIndex: 2,
        explanation: "108 is the statewide emergency service for free medical dispatch and ambulance routing in Andhra Pradesh.",
        explanationTe: "ఆంధ్రప్రదేశ్‌లో ఉచిత వైద్య అత్యవసర సహాయం మరియు అంబులెన్స్ కోసం 108 నంబర్‌ను సంప్రదించాలి."
      }
    ];
  } else if (module.id === "traffic-rules") {
    questions = [
      {
        id: "tr-q1",
        question: "What does a solid continuous white line in the middle of a two-lane road indicate?",
        questionTe: "రెండు లేన్ల రోడ్డు మధ్యలో ఉన్న నిరంతర తెల్లటి గీత దేనిని సూచిస్తుంది?",
        options: ["Overtaking is strictly prohibited", "Free parking zone", "Overtaking allowed anytime", "Speed limit is 100 km/h"],
        optionsTe: ["ఓవర్‌టేకింగ్ ఖచ్చితంగా నిషేధించబడింది", "ఉచిత పార్కింగ్ జోన్", "ఎప్పుడైనా ఓవర్‌టేకింగ్ చేయవచ్చు", "వేగ పరిమితి 100 కి.మీ/గం"],
        correctIndex: 0,
        explanation: "A solid continuous white line dictates that you must stay within your lane and not cross it to overtake other vehicles.",
        explanationTe: "నిరంతర తెల్లటి గీత ఉంటే మీ లేన్ దాటి ఇతర వాహనాలను ఓవర్‌టేక్ చేయడం నిషిద్ధం."
      },
      {
        id: "tr-q2",
        question: "Which Indian legal standard certifies that helmets are safe and crash-tested?",
        questionTe: "హెల్మెట్లు సురక్షితమైనవని ధృవీకరించే భారతీయ చట్టపరమైన ప్రమాణం ఏది?",
        options: ["FSSAI", "ISI Mark (IS:4151)", "ISO 9001", "BEE Star Rating"],
        optionsTe: ["FSSAI", "ISI మార్క్ (IS:4151)", "ISO 9001", "BEE స్టార్ రేటింగ్"],
        correctIndex: 1,
        explanation: "ISI certified helmets under IS:4151 are rigorously tested to absorb impacts and protect riders from fatal head injuries.",
        explanationTe: "ISI మార్క్ ఉన్న హెల్మెట్లు మాత్రమే ప్రమాద సమయంలో తలకు రక్షణనిస్తాయి."
      },
      {
        id: "tr-q3",
        question: "What is the penalty standard for drunk driving under Section 185 of the Motor Vehicles Act?",
        questionTe: "మోటారు వాహనాల చట్టం సెక్షన్ 185 ప్రకారం మద్యం తాగి వాహనం నడపడానికి జరిమానా ఏమిటి?",
        options: ["No penalty if minor", "A warning letter only", "Imprisonment of up to 6 months and/or substantial court fines", "Free driving course"],
        optionsTe: ["మైనర్ అయితే జరిమానా లేదు", "కేవలం హెచ్చరిక పత్రం", "6 నెలల వరకు జైలు శిక్ష మరియు/లేదా కోర్టు జరిమానాలు", "ఉచిత డ్రైవింగ్ కోర్సు"],
        correctIndex: 2,
        explanation: "Drunk driving is a serious criminal offense in India, attracting hefty court fines, temporary suspension of license, and prison sentences.",
        explanationTe: "మద్యం సేవించి వాహనం నడపడం తీవ్రమైన నేరం, దీనివల్ల భారీ జరిమానాలు మరియు జైలు శిక్ష పడవచ్చు."
      },
      {
        id: "tr-q4",
        question: "What does the Amber (Yellow) light in traffic signals mean?",
        questionTe: "ట్రాఫిక్ సిగ్నల్స్‌లో అంబర్ (పసుపు) రంగు లైట్ దేనిని సూచిస్తుంది?",
        options: ["Speed up to clear the lane quickly", "Prepare to stop; do not cross the stop line unless already in the intersection", "Park your vehicle", "Honk loudly"],
        optionsTe: ["త్వరగా వెళ్ళడానికి వేగం పెంచడం", "ఆగడానికి సిద్ధపడటం; కూడలిలోకి అప్పటికే ప్రవేశిస్తే తప్ప స్టాప్ లైన్ దాటకూడదు", "వాహనాన్ని పార్క్ చేయడం", "గట్టిగా హారన్ కొట్టడం"],
        correctIndex: 1,
        explanation: "Amber indicates that the signal is turning Red. Motorists must slow down and stop behind the stop line, rather than accelerating.",
        explanationTe: "అంబర్ లైట్ వెలిగినప్పుడు వాహనదారులు వేగం తగ్గించి స్టాప్ లైన్ వెనుక ఆగిపోవాలి."
      },
      {
        id: "tr-q5",
        question: "Which document certifies that your vehicle exhausts meet government emissions criteria?",
        questionTe: "మీ వాహనం నుండి వచ్చే పొగ నియంత్రణలో ఉందని ధృవీకరించే పత్రం ఏది?",
        options: ["RC Book", "Driving License", "Pollution Under Control (PUC) Certificate", "Insurance Cover Note"],
        optionsTe: ["RC బుక్", "డ్రైవింగ్ లైసెన్స్", "పొల్యూషన్ అండర్ కంట్రోల్ (PUC) సర్టిఫికేట్", "ఇన్సూరెన్స్ పత్రం"],
        correctIndex: 2,
        explanation: "Every vehicle must undergo periodic emission tests to secure a valid Pollution Under Control (PUC) certificate to reduce air pollution.",
        explanationTe: "పర్యావరణ కాలుష్యాన్ని అరికట్టడానికి ప్రతి వాహనానికి PUC సర్టిఫికెట్ తప్పనిసరి."
      }
    ];
  } else {
    // Default fallback questions for modules 3-10
    questions = [
      {
        id: module.id + "-q1",
        question: `What is the primary civic duty regarding ${module.title}?`,
        questionTe: `${module.titleTe} విషయంలో ప్రాథమిక పౌర బాధ్యత ఏమిటి?`,
        options: ["Ignore it completely", "Practice active personal responsibility and community cooperation", "Wait for the administration to do everything", "Complain on social media without acting"],
        optionsTe: ["పూర్తిగా నిర్లక్ష్యం చేయడం", "వ్యక్తిగత బాధ్యత మరియు సామాజిక సహకారాన్ని పాటించడం", "ప్రభుత్వమే అంతా చేస్తుందని వేచి ఉండటం", "ఏమీ చేయకుండా సోషల్ మీడియాలో ఫిర్యాదు చేయడం"],
        correctIndex: 1,
        explanation: `Active citizen participation is key to success in ${module.title}. Local administrations depend on responsive citizens.`,
        explanationTe: `పరిష్కారంలో పౌరుల చురుకైన భాగస్వామ్యం అత్యంత కీలకమైనది.`
      },
      {
        id: module.id + "-q2",
        question: "Which of the following actions directly supports sustainable development?",
        questionTe: "కింది వాటిలో ఏ చర్య సుస్థిర అభివృద్ధికి నేరుగా మద్దతు ఇస్తుంది?",
        options: ["Throwing single-use plastics anywhere", "Source segregation and minimizing waste", "Wasting natural drinking water supplies", "Damaging regional forest covers"],
        optionsTe: ["ఏక ఉపయోగ ప్లాస్టిక్‌లను ఎక్కడైనా వేయడం", "చెత్త వర్గీకరణ మరియు వ్యర్థాలను తగ్గించడం", "త్రాగునీటి వనరులను వృధా చేయడం", "అడవులను నరికివేయడం"],
        correctIndex: 1,
        explanation: "Source segregation and eco-friendly consumer habits reduce municipal load and preserve vital resources.",
        explanationTe: "తడి-పొడి చెత్తను వేరుచేయడం వల్ల కాలుష్యాన్ని అరికట్టవచ్చు."
      },
      {
        id: module.id + "-q3",
        question: "How can citizens easily report civic failures to Andhra Pradesh urban departments?",
        questionTe: "పౌరులు తమ సమస్యలను ఆంధ్రప్రదేశ్ ప్రభుత్వ విభాగానికి ఎలా సులభంగా నివేదించవచ్చు?",
        options: ["By writing letters on parchment", "Through the Spandana system and local Ward Sachivalayams", "By visiting national offices in New Delhi", "By doing nothing"],
        optionsTe: ["కాగితాలపై లేఖలు రాయడం ద్వారా", "స్పందన మరియు స్థానిక వార్డు సచివాలయాల ద్వారా", "ఢిల్లీలోని కేంద్ర కార్యాలయాలకు వెళ్లడం ద్వారా", "ఏమీ చేయకపోవడం"],
        correctIndex: 1,
        explanation: "The Spandana portal and Ward Sachivalayam volunteers connect residents directly with local planning officers.",
        explanationTe: "స్పందన మరియు వార్డు సచివాలయం పౌరులకు చాలా దగ్గరగా ఉండే పరిష్కార వేదికలు."
      },
      {
        id: module.id + "-q4",
        question: "Why should we avoid littering or dumping waste into municipal storm water drains?",
        questionTe: "మునిసిపల్ కాలువలలో చెత్తను ఎందుకు వేయకూడదు?",
        options: ["It makes the drains clean", "It clogs drain networks, causing urban flash floods and breeding disease vectors", "It increases ground soil quality", "No reason"],
        optionsTe: ["ఇది కాలువలను శుభ్రం చేస్తుంది", "ఇది కాలువలను పూడ్చివేసి, వరదలు మరియు రోగాల వ్యాప్తికి కారణమవుతుంది", "ఇది మట్టి నాణ్యతను పెంచుతుంది", "ఎలాంటి కారణం లేదు"],
        correctIndex: 1,
        explanation: "Blocked drains prevent rainwater outflow, leading to localized waterlogging, damage to properties, and disease outbreaks.",
        explanationTe: "చెత్త కాలువలను అడ్డుకోవడం వల్ల దోమలు పెరిగి డెంగ్యూ, మలేరియా వంటి వ్యాధులు వ్యాప్తి చెందుతాయి."
      },
      {
        id: module.id + "-q5",
        question: "Under the SDGs (Sustainable Development Goals), which goal focuses on making cities and human settlements inclusive, safe, resilient, and sustainable?",
        questionTe: "సుస్థిర అభివృద్ధి లక్ష్యాల (SDG) కింద, నగరాలను సురక్షితంగా మార్చే లక్ష్యం ఏది?",
        options: ["SDG 1 – No Poverty", "SDG 4 – Quality Education", "SDG 11 – Sustainable Cities and Communities", "SDG 13 – Climate Action"],
        optionsTe: ["SDG 1 – పేదరిక నిర్మూలన", "SDG 4 – నాణ్యమైన విద్య", "SDG 11 – సుస్థిర నగరాలు మరియు సమాజాలు", "SDG 13 – పర్యావరణ చర్య"],
        correctIndex: 2,
        explanation: "SDG 11 addresses urban planning, pedestrian safety, municipal waste management, and the preservation of green public spaces.",
        explanationTe: "SDG 11 అనేది నగరాలు మరియు నివాస ప్రాంతాలను సుస్థిరంగా తీర్చిదిద్దడం గురించి వివరిస్తుంది."
      }
    ];
  }

  return {
    id: module.id,
    moduleId: module.id,
    title: module.title,
    questions
  };
});

export const CIVIC_CHALLENGES: CivicChallenge[] = [
  {
    id: "ch-zebra",
    title: "Follow Zebra Crossings",
    titleTe: "జీబ్రా క్రాసింగ్స్ పాటించండి",
    description: "Cross roads strictly using marked zebra crossings today. Take a photo of a zebra crossing you used safely.",
    descriptionTe: "ఈ రోజు రోడ్డు దాటేటప్పుడు జీబ్రా క్రాసింగ్‌లను మాత్రమే ఉపయోగించండి. సురక్షితంగా ఉపయోగించిన ఫోటో తీయండి.",
    points: 100,
    category: "road-safety"
  },
  {
    id: "ch-dustbin",
    title: "Use a Dustbin Today",
    titleTe: "ఈ రోజు డస్ట్‌బిన్ ఉపయోగించండి",
    description: "Throw dry or wet garbage strictly into the segregated municipal dustbin. Document it with a photo proof.",
    descriptionTe: "పొడి లేదా తడి చెత్తను వర్గీకరించి సచివాలయ డస్ట్‌బిన్‌లో మాత్రమే వేయండి. ఫోటో ప్రూఫ్ అప్‌లోడ్ చేయండి.",
    points: 80,
    category: "cleanliness"
  },
  {
    id: "ch-save-water",
    title: "Save Water for One Day",
    titleTe: "ఒక రోజు నీటిని ఆదా చేయండి",
    description: "Keep tap aerators on, turn off water during brushing, and use bucket washes. Upload proof of your water-saving setup.",
    descriptionTe: "బ్రష్ చేసేటప్పుడు ట్యాప్ కట్టేయండి మరియు బకెట్ ఉపయోగించండి. నీటిని పొదుపు చేసిన విధానాన్ని వివరించండి.",
    points: 90,
    category: "environment"
  },
  {
    id: "ch-plant-tree",
    title: "Plant a Native Sapling",
    titleTe: "ఒక మొక్కను నాటండి",
    description: "Plant a native sapling (Neem, Tulsi, Pongamia) in your garden or local space. Provide water and upload a photo.",
    descriptionTe: "మీ ఇంటి వద్ద లేదా బహిరంగ స్థలంలో ఒక మొక్కను నాటండి. ఆ ఫోటోను ఇక్కడ అప్‌లోడ్ చేయండి.",
    points: 150,
    category: "environment"
  },
  {
    id: "ch-avoid-plastic",
    title: "Avoid Single-Use Plastics",
    titleTe: "సింగిల్ యూజ్ ప్లాస్టిక్ నివారించండి",
    description: "Go grocery shopping carrying a reusable cotton or jute bag today. Reject plastic bags and take a picture.",
    descriptionTe: "ఈ రోజు బజారుకు వెళ్ళేటప్పుడు కాటన్ లేదా జూట్ బ్యాగును తీసుకెళ్ళండి. ప్లాస్టిక్ సంచులను వద్దనండి.",
    points: 100,
    category: "cleanliness"
  },
  {
    id: "ch-digital-verify",
    title: "Fact-Check a Viral Forward",
    titleTe: "వైరల్ సమాచారాన్ని ధృవీకరించండి",
    description: "Verify a viral message or forward using Google Search or fact-check sites before sharing. Describe how you verified it.",
    descriptionTe: "సోషల్ మీడియాలో వచ్చిన ఒక అబద్ధపు వార్తను గూగుల్ ద్వారా సరిచూసి, అది తప్పు అని నిరూపించిన విధానాన్ని చెప్పండి.",
    points: 110,
    category: "digital"
  }
];

export const CIVIC_BADGES: Badge[] = [
  {
    id: "badge-road",
    title: "Road Safety Champion",
    titleTe: "రోడ్డు భద్రతా విజేత",
    description: "Earned by completing Road Safety and Traffic Rules modules with perfect quiz scores.",
    descriptionTe: "రోడ్డు భద్రత మరియు ట్రాఫిక్ నిబంధనల క్విజ్‌లలో ఉత్తమ స్కోరు సాధించినందుకు లభిస్తుంది.",
    iconName: "ShieldAlert",
    category: "road-safety"
  },
  {
    id: "badge-clean",
    title: "Cleanliness Hero",
    titleTe: "పరిశుభ్రత వీరుడు",
    description: "Earned by submitting approved proof for dustbin usage and waste segregation challenges.",
    descriptionTe: "చెత్త వర్గీకరణ మరియు పబ్లిక్ డస్ట్‌బిన్ ఉపయోగించే సవాళ్ళను పూర్తి చేసినందుకు లభిస్తుంది.",
    iconName: "Trash2",
    category: "cleanliness"
  },
  {
    id: "badge-green",
    title: "Green Citizen",
    titleTe: "హరిత పౌరుడు",
    description: "Earned by completing Environmental Conservation and Water Conservation modules.",
    descriptionTe: "పర్యావరణ మరియు నీటి సంరక్షణ మాడ్యూళ్లను విజయవంతంగా పూర్తి చేసినందుకు లభిస్తుంది.",
    iconName: "Trees",
    category: "environment"
  },
  {
    id: "badge-traffic",
    title: "Traffic Awareness Expert",
    titleTe: "ట్రాఫిక్ అవగాహన నిపుణుడు",
    description: "Successfully complete the Traffic Rules module and pass the quiz.",
    descriptionTe: "ట్రాఫిక్ నిబంధనల మాడ్యూల్‌ను పూర్తి చేసి ఉత్తీర్ణత సాధించినందుకు లభిస్తుంది.",
    iconName: "Car",
    category: "road-safety"
  },
  {
    id: "badge-digital",
    title: "Digital Citizen",
    titleTe: "డిజిటల్ పౌరుడు",
    description: "Earned by completing the Digital Citizenship module and safety checks.",
    descriptionTe: "డిజిటల్ పౌరసత్వం మరియు సైబర్ భద్రత క్విజ్ పూర్తి చేసినందుకు లభిస్తుంది.",
    iconName: "Globe",
    category: "digital"
  },
  {
    id: "badge-leader",
    title: "Community Leader",
    titleTe: "సామాజిక నాయకుడు",
    description: "Earned by completing 5 or more community challenges successfully.",
    descriptionTe: "ఐదు లేదా అంతకంటే ఎక్కువ సామాజిక సవాళ్ళను విజయవంతంగా పూర్తి చేసినందుకు లభిస్తుంది.",
    iconName: "Award",
    category: "governance"
  }
];

export const SDG_GOALS = [
  {
    number: "SDG 4",
    title: "Quality Education",
    titleTe: "నాణ్యమైన విద్య",
    desc: "Promoting lifelong learning opportunities and civic value education for all age groups.",
    descTe: "అన్ని వయస్సుల వారికి జీవితకాల అభ్యాస అవకాశాలు మరియు పౌర విలువల విద్యను ప్రోత్సహించడం.",
    color: "bg-red-600"
  },
  {
    number: "SDG 11",
    title: "Sustainable Cities & Communities",
    titleTe: "సుస్థిర నగరాలు - సమాజాలు",
    desc: "Making human settlements safe, resilient, inclusive, and environmentally friendly.",
    descTe: "మానవ నివాసాలను సురక్షితమైనవిగా, వినూత్నమైనవిగా మరియు పర్యావరణ అనుకూలమైనవిగా మార్చడం.",
    color: "bg-amber-600"
  },
  {
    number: "SDG 13",
    title: "Climate Action",
    titleTe: "పర్యావరణ చర్య",
    desc: "Taking urgent citizen-led action to combat climate change, coastal cyclone impacts, and promote local greening.",
    descTe: "వాతావరణ మార్పులను అరికట్టడానికి పౌరుల నేతృత్వంలో మొక్కలు నాటడం మరియు నీటి సంరక్షణ చేపట్టడం.",
    color: "bg-emerald-700"
  },
  {
    number: "SDG 16",
    title: "Peace, Justice & Strong Institutions",
    titleTe: "శాంతి, న్యాయం - బలమైన సంస్థలు",
    desc: "Fostering peaceful societies, fundamental civic duties, and transparent local governance through Sachivalayams.",
    descTe: "శాంతియుత సమాజాలు, ప్రాథమిక పౌర విధులు మరియు పారదర్శక పాలనను సచివాలయాల ద్వారా పెంపొందించడం.",
    color: "bg-blue-800"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Conducting our Community Service Project doorstep survey in Mangalapalem opened our eyes. Using this platform to educate citizens digitally has amplified our impact 10x.",
    author: "R. Vaishnav, CSP Student Lead",
    role: "Visakhapatnam Engineering College"
  },
  {
    quote: "Littering and unsafe road crossings have reduced significantly since our ward high school students started taking the civic challenges. This is practical education.",
    author: "K. Appala Naidu",
    role: "Ward Secretary, Mangalapalem Sachivalayam, Ward No. 88"
  },
  {
    quote: "The adaptive engine helped my son learn about wet and dry waste segregation step-by-step. The certificate has made him a passionate green ambassador at home.",
    author: "G. Lakshmi",
    role: "Mangalapalem Resident"
  }
];

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { UserRole, User, QuizResult, ChallengeSubmission, CommunityReport, Feedback, Certificate, RecommendationPath, Announcement, Challenge } from './src/types.js';

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON bodies with higher limits to support base64 simulated image uploads
app.use(express.json({ limit: '20mb' }));

// Database file path for durable persistence
const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Initialize default database structure if not exists
const initialDb = {
  users: [
    {
      id: 'usr-citizen-1',
      name: 'Chiranjeevi Kumar',
      age: 24,
      email: 'citizen@csp.in', // Seed with user email from metadata
      mobile: '9876543210',
      location: 'Mangalapalem, Ward 88',
      role: UserRole.CITIZEN,
      password: '12345678A',
      points: 250,
      level: 2,
      xp: 250,
      badges: ['badge-traffic'],
      completedModules: ['traffic-rules'],
      completedQuizzes: ['traffic-rules'],
      completedChallenges: ['ch-zebra'],
      createdAt: new Date().toISOString()
    },
    {
      id: 'usr-teacher-1',
      name: 'Dr. Prasad Rao',
      age: 45,
      email: 'teacher@csp.edu',
      mobile: '9848022338',
      location: 'Visakhapatnam CSP Coordinator',
      role: UserRole.TEACHER,
      password: '12345678A',
      points: 500,
      level: 5,
      xp: 1200,
      badges: ['badge-leader'],
      completedModules: [],
      completedQuizzes: [],
      completedChallenges: [],
      createdAt: new Date().toISOString()
    },
    {
      id: 'usr-admin-1',
      name: 'Sri K. Srinivasa Rao (Admin)',
      age: 39,
      email: 'admin@csp.gov.in',
      mobile: '9111122223',
      location: 'Mangalapalem Sachivalayam',
      role: UserRole.ADMIN,
      password: '12345678A',
      points: 1000,
      level: 10,
      xp: 5000,
      badges: ['badge-leader'],
      completedModules: [],
      completedQuizzes: [],
      completedChallenges: [],
      createdAt: new Date().toISOString()
    }
  ],
  quizResults: [
    {
      id: 'qr-1',
      userId: 'usr-citizen-1',
      moduleId: 'traffic-rules',
      score: 5,
      totalQuestions: 5,
      passed: true,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      incorrectQuestions: []
    }
  ],
  challengeSubmissions: [
    {
      id: 'cs-1',
      userId: 'usr-citizen-1',
      userName: 'Chiranjeevi Kumar',
      challengeId: 'ch-zebra',
      challengeTitle: 'Follow Zebra Crossings',
      status: 'approved',
      proofText: 'Used the Zebra crossing in front of Mangalapalem school today.',
      photoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="10" y="50" font-family="sans-serif">Zebra crossing proof</text></svg>',
      pointsAwarded: 100,
      timestamp: new Date(Date.now() - 43200000).toISOString()
    }
  ],
  communityReports: [
    {
      id: 'rep-1',
      userId: 'usr-citizen-1',
      userName: 'Chiranjeevi Kumar',
      type: 'littering',
      location: 'Near Mangalapalem Sachivalayam Ward No 88',
      description: 'Garbage dump accumulating near the secondary water tank.',
      photoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="10" y="50" font-family="sans-serif">Littering report</text></svg>',
      status: 'reported',
      adminNotes: '',
      timestamp: new Date().toISOString()
    }
  ],
  feedbacks: [
    {
      id: 'fb-1',
      userId: 'usr-citizen-1',
      userName: 'Chiranjeevi Kumar',
      moduleId: 'traffic-rules',
      moduleTitle: 'Essential Traffic Rules & Signs',
      rating: 5,
      suggestion: 'The explanations for solid vs dashed white lines are very helpful.',
      timestamp: new Date().toISOString()
    }
  ],
  certificates: [] as Certificate[],
  recommendations: [] as RecommendationPath[],
  challenges: [
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
  ] as Challenge[],
  announcements: [
    {
      id: 'ann-1',
      title: 'Community Cleanliness Campaign Launch',
      content: 'Ward No 88 is launching a joint cleanliness and composting campaign on Sunday 9 AM. Join us near Mangalapalem Sachivalayam.',
      date: new Date().toISOString()
    }
  ]
};

// Write default DB if none exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2));
}

// Helper to load DB
function loadDb() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    if (!parsed.challenges) {
      parsed.challenges = [
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
    }
    return parsed;
  } catch (err) {
    console.error('Failed reading db, returning initial db', err);
    return initialDb;
  }
}

// Helper to save DB atomically
function saveDb(dbData: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));
  } catch (err) {
    console.error('Failed saving db', err);
  }
}

// Lazy Initialize Gemini API client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
      console.log('Gemini AI Client initialized successfully for Server-side recommendations.');
    } else {
      console.warn('GEMINI_API_KEY is not defined. Adaptive Recommendation will run in offline rule-based mode.');
    }
  }
  return aiClient;
}

// Simple Session Middleware
function authenticateSession(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Session missing' });
  }
  const token = authHeader.split(' ')[1];
  const db = loadDb();
  // Find user by matching token (for simple demo, token is their email or userId)
  const user = db.users.find((u: User) => u.email === token || u.id === token);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
  req.user = user;
  next();
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// --- API ROUTES ---

// 1. Authentication
app.post('/api/auth/register', (req, res) => {
  const { name, age, email, mobile, location, password, role } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  const db = loadDb();
  if (db.users.some((u: User) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const newUser: User = {
    id: `usr-${Date.now()}`,
    name,
    age: parseInt(age) || 18,
    email,
    mobile,
    location: location || 'Mangalapalem, Ward 88',
    role: (role as UserRole) || UserRole.CITIZEN,
    password,
    points: 0,
    level: 1,
    xp: 0,
    badges: [],
    completedModules: [],
    completedQuizzes: [],
    completedChallenges: [],
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDb(db);

  // Return user without password
  const { password: _, ...safeUser } = newUser;
  res.status(201).json({ user: safeUser, token: newUser.id });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  const db = loadDb();
  const user = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser, token: user.id });
});

app.get('/api/auth/me', authenticateSession, (req, res) => {
  res.json({ user: req.user });
});

// Update Profile
app.put('/api/auth/profile', authenticateSession, (req, res) => {
  const { name, mobile, location, age } = req.body;
  const db = loadDb();
  const userIndex = db.users.findIndex((u: User) => u.id === req.user!.id);
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

  db.users[userIndex].name = name || db.users[userIndex].name;
  db.users[userIndex].mobile = mobile || db.users[userIndex].mobile;
  db.users[userIndex].location = location || db.users[userIndex].location;
  if (age) db.users[userIndex].age = parseInt(age) || db.users[userIndex].age;

  saveDb(db);
  const { password: _, ...safeUser } = db.users[userIndex];
  res.json({ user: safeUser });
});

// 2. Quiz Results & Adaptive Learning Engine
app.post('/api/quizzes/submit', authenticateSession, async (req, res) => {
  const { moduleId, score, totalQuestions, incorrectQuestions } = req.body;
  if (!moduleId || score === undefined || totalQuestions === undefined) {
    return res.status(400).json({ error: 'Missing quiz submission metrics' });
  }

  const db = loadDb();
  const passed = (score / totalQuestions) >= 0.6; // 60% passing grade
  
  const newResult: QuizResult = {
    id: `qr-${Date.now()}`,
    userId: req.user!.id,
    moduleId,
    score,
    totalQuestions,
    passed,
    timestamp: new Date().toISOString(),
    incorrectQuestions: incorrectQuestions || []
  };

  db.quizResults.push(newResult);

  // Update user stats (Points/XP/Levels)
  const userIndex = db.users.findIndex((u: User) => u.id === req.user!.id);
  if (userIndex !== -1) {
    const user = db.users[userIndex];
    
    // Earn 50 points and 100 XP per quiz passed
    if (passed && !user.completedQuizzes.includes(moduleId)) {
      user.completedQuizzes.push(moduleId);
      if (!user.completedModules.includes(moduleId)) {
        user.completedModules.push(moduleId);
      }
      user.points += 50;
      user.xp += 100;
      
      // Level up calculation: every 200 XP is 1 level
      const newLevel = Math.floor(user.xp / 200) + 1;
      if (newLevel > user.level) {
        user.level = newLevel;
      }

      // Check badge qualifications
      // 1. Road safety badge
      if (user.completedModules.includes('road-safety') && user.completedModules.includes('traffic-rules')) {
        if (!user.badges.includes('badge-road')) user.badges.push('badge-road');
      }
      // 2. Traffic expert badge
      if (user.completedModules.includes('traffic-rules')) {
        if (!user.badges.includes('badge-traffic')) user.badges.push('badge-traffic');
      }
      // 3. Green citizen badge (requires environmental modules)
      if (
        user.completedModules.includes('waste-management') ||
        user.completedModules.includes('water-conservation') ||
        user.completedModules.includes('anti-littering')
      ) {
        if (!user.badges.includes('badge-green')) user.badges.push('badge-green');
      }
      // 4. Digital citizen
      if (user.completedModules.includes('digital-citizenship')) {
        if (!user.badges.includes('badge-digital')) user.badges.push('badge-digital');
      }
    }
    db.users[userIndex] = user;
  }

  // --- ADAPTIVE ENGINE ---
  // If user failed or did poorly, trigger personalized Gemini recommendations!
  let recommendation: RecommendationPath | null = null;
  const isPoorPerformance = (score / totalQuestions) < 0.8; // under 80% score

  if (isPoorPerformance) {
    // Attempt server-side Gemini request
    const ai = getGeminiClient();
    if (ai) {
      try {
        console.log(`Analyzing quiz failure for module: ${moduleId} via Gemini...`);
        const prompt = `Act as an expert supportive Senior Civic Advisor for the Andhra Pradesh Community Service Project (CSP) at Mangalapalem Sachivalayam, Ward No. 88, Visakhapatnam.
A student named ${req.user!.name} scored ${score}/${totalQuestions} in the quiz for module "${moduleId}".
The student got the following question keys or concepts wrong: ${JSON.stringify(incorrectQuestions || [])}.

Based on this performance, generate:
1. Short, highly tailored, supportive personal advice message (1-2 sentences) addressing their mistake and encouraging them. Mention Mangalapalem or local community impact of this behavior.
2. 2 Recommended lessons or focus topics they should read again.
3. 2 Practical daily community civic actions/challenges they can perform physically today to internalize this knowledge.

Return the response STRICTLY as a JSON object of this structure:
{
  "geminiAnalysis": "Your advice message...",
  "recommendedLessons": ["Lesson title 1", "Lesson title 2"],
  "recommendedChallenges": ["Challenge action 1", "Challenge action 2"]
}
Do not return any markdown wraps, only valid JSON.`;

        const aiResponse = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        const outputText = aiResponse.text?.trim() || '{}';
        const rawRec = JSON.parse(outputText);
        
        recommendation = {
          userId: req.user!.id,
          moduleId,
          geminiAnalysis: rawRec.geminiAnalysis || `Don't worry, civic responsibilities take practice! Let's review the guidelines for ${moduleId} and keep Mangalapalem clean and safe.`,
          recommendedLessons: rawRec.recommendedLessons || [`Review essential ${moduleId} rules`],
          recommendedChallenges: rawRec.recommendedChallenges || ['Follow Zebra Crossing Today', 'Segregate home waste'],
          timestamp: new Date().toISOString()
        };
      } catch (err) {
        console.error('Gemini adaptive analysis failed, falling back to rule-based', err);
      }
    }

    // Rule-based fallback if Gemini is offline or failed
    if (!recommendation) {
      let advice = "Great effort! A bit more practice will make you a perfect Civic Champion.";
      let recLessons = ["Review main rules"];
      let recChallenges = ["Practice daily checks"];

      if (moduleId === 'road-safety' || moduleId === 'traffic-rules') {
        advice = "Safety on Mangalapalem roads is a priority. Remember that stopping distances are critical and drivers need eye contact to see you.";
        recLessons = ["Pedestrian Safety & Zebra Crossings", "Understanding Traffic Lights and Signs"];
        recChallenges = ["Follow Zebra Crossings", "Avoid Jaywalking on Visakhapatnam High Roads"];
      } else if (moduleId === 'public-cleanliness' || moduleId === 'waste-management') {
        advice = "Clean environments prevent fever outbreaks in Ward No. 88. Let's make sure we segregate wet and dry waste correctly.";
        recLessons = ["The 3-Bin Segregation System", "The Battle Against Public Littering"];
        recChallenges = ["Use a Dustbin Today", "Avoid Single-Use Plastics"];
      }

      recommendation = {
        userId: req.user!.id,
        moduleId,
        geminiAnalysis: advice,
        recommendedLessons: recLessons,
        recommendedChallenges: recChallenges,
        timestamp: new Date().toISOString()
      };
    }

    // Save recommendation to DB
    db.recommendations = db.recommendations.filter((r: RecommendationPath) => !(r.userId === req.user!.id && r.moduleId === moduleId));
    db.recommendations.push(recommendation);
  }

  saveDb(db);
  res.status(201).json({
    result: newResult,
    recommendation,
    user: db.users.find((u: User) => u.id === req.user!.id)
  });
});

// Fetch user recommendations
app.get('/api/recommendations', authenticateSession, (req, res) => {
  const db = loadDb();
  const recs = db.recommendations.filter((r: RecommendationPath) => r.userId === req.user!.id);
  res.json({ recommendations: recs });
});

// Clear a recommendation (dismiss)
app.delete('/api/recommendations/:moduleId', authenticateSession, (req, res) => {
  const db = loadDb();
  db.recommendations = db.recommendations.filter((r: RecommendationPath) => !(r.userId === req.user!.id && r.moduleId === req.params.moduleId));
  saveDb(db);
  res.json({ success: true });
});

// 3. Civic Challenges & Submissions
app.get('/api/challenges', (req, res) => {
  const db = loadDb();
  res.json({ challenges: db.challenges || [] });
});

app.post('/api/challenges', authenticateSession, (req, res) => {
  if (req.user!.role !== UserRole.TEACHER && req.user!.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Access restricted' });
  }
  const { title, titleTe, description, descriptionTe, points } = req.body;
  if (!title || !description || !points) {
    return res.status(400).json({ error: 'Title, description and points are required' });
  }

  const db = loadDb();
  if (!db.challenges) {
    db.challenges = [];
  }

  const newChallenge: Challenge = {
    id: `ch-${Date.now()}`,
    title,
    titleTe: titleTe || title,
    description,
    descriptionTe: descriptionTe || description,
    points: Number(points)
  };

  db.challenges.push(newChallenge);
  saveDb(db);
  res.status(201).json({ challenge: newChallenge });
});

app.post('/api/teacher/grant-certificate', authenticateSession, (req, res) => {
  if (req.user!.role !== UserRole.TEACHER && req.user!.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Access restricted' });
  }
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const db = loadDb();
  const citizen = db.users.find((u: User) => u.id === userId);
  if (!citizen) {
    return res.status(404).json({ error: 'Citizen not found' });
  }

  const existingCert = db.certificates.find((c: Certificate) => c.userId === userId);
  if (existingCert) {
    return res.status(400).json({ error: 'Certificate already granted to this citizen' });
  }

  const newCert: Certificate = {
    id: `cert-${Date.now()}`,
    userId: citizen.id,
    userName: citizen.name,
    completionDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    certificateNumber: `AP-CSP-88-${Math.floor(100000 + Math.random() * 900000)}`
  };

  db.certificates.push(newCert);
  saveDb(db);
  res.status(201).json({ certificate: newCert });
});

app.get('/api/challenges/submissions', authenticateSession, (req, res) => {
  const db = loadDb();
  const subs = db.challengeSubmissions.filter((s: ChallengeSubmission) => s.userId === req.user!.id);
  res.json({ submissions: subs });
});

app.post('/api/challenges/submit', authenticateSession, (req, res) => {
  const { challengeId, challengeTitle, proofText, photoUrl, points } = req.body;
  if (!challengeId || !challengeTitle || !proofText) {
    return res.status(400).json({ error: 'Please fill in the proof text' });
  }

  const db = loadDb();
  const pointsAwarded = points || 100;
  
  const newSubmission: ChallengeSubmission = {
    id: `sub-${Date.now()}`,
    userId: req.user!.id,
    userName: req.user!.name,
    challengeId,
    challengeTitle,
    status: 'pending', // Pending verification by teacher / admin
    proofText,
    photoUrl: photoUrl || '',
    pointsAwarded,
    timestamp: new Date().toISOString()
  };

  db.challengeSubmissions.push(newSubmission);
  saveDb(db);
  res.status(201).json({ submission: newSubmission, user: req.user });
});

// 4. Community Reporting Feature
app.get('/api/reports', (req, res) => {
  const db = loadDb();
  res.json({ reports: db.communityReports });
});

app.post('/api/reports', authenticateSession, (req, res) => {
  const { type, location, description, photoUrl } = req.body;
  if (!type || !location || !description) {
    return res.status(400).json({ error: 'Please provide all details' });
  }

  const db = loadDb();
  const newReport: CommunityReport = {
    id: `rep-${Date.now()}`,
    userId: req.user!.id,
    userName: req.user!.name,
    type,
    location,
    description,
    photoUrl: photoUrl || '',
    status: 'reported',
    timestamp: new Date().toISOString()
  };

  db.communityReports.push(newReport);
  saveDb(db);
  res.status(201).json({ report: newReport });
});

// 5. Feedback System
app.post('/api/feedback', authenticateSession, (req, res) => {
  const { moduleId, moduleTitle, rating, suggestion } = req.body;
  if (!moduleId || !rating) {
    return res.status(400).json({ error: 'Rating is required' });
  }

  const db = loadDb();
  const newFeedback: Feedback = {
    id: `fb-${Date.now()}`,
    userId: req.user!.id,
    userName: req.user!.name,
    moduleId,
    moduleTitle,
    rating: parseInt(rating),
    suggestion: suggestion || '',
    timestamp: new Date().toISOString()
  };

  db.feedbacks.push(newFeedback);
  saveDb(db);
  res.status(201).json({ feedback: newFeedback });
});

app.get('/api/feedback', (req, res) => {
  const db = loadDb();
  res.json({ feedbacks: db.feedbacks });
});

// 5.5. AI Civic Insights for Dashboard
app.get('/api/gemini/dashboard-tip', authenticateSession, async (req, res) => {
  const ai = getGeminiClient();
  const completedCount = req.user!.completedModules.length;
  
  if (ai) {
    try {
      const prompt = `Act as an expert civic mentor for Mangalapalem Sachivalayam, Ward 88, Visakhapatnam.
A citizen named ${req.user!.name} (Level ${req.user!.level}, ${req.user!.points} points, completed ${completedCount} modules: ${JSON.stringify(req.user!.completedModules)}) is viewing their dashboard.
Write:
1. A warm, brief, personalized 1-sentence regional greeting/update referencing Visakhapatnam or Mangalapalem and how their Level or Completed Modules make a difference.
2. 1 highly practical, specific daily civic action tip they can do today based on their completed modules (or suggesting a new topic if they haven't started).

Return the response STRICTLY as a JSON object of this structure:
{
  "greeting": "Your personalized greeting string...",
  "tip": "Your specific actionable tip string..."
}
Do not return any markdown, only valid JSON.`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const outputText = aiResponse.text?.trim() || '{}';
      const parsed = JSON.parse(outputText);
      return res.json({
        greeting: parsed.greeting || `Great job, ${req.user!.name}! Your actions keep Mangalapalem clean and safe.`,
        tip: parsed.tip || "Remember to always use the zebra crossing near the primary school when walking today."
      });
    } catch (err) {
      console.log('Gemini dashboard tip is temporarily busy (using fallback tip)');
    }
  }

  // Fallback
  const defaultTips = [
    "Always segregate dry plastics from organic kitchen waste before the municipal compost collection truck arrives.",
    "Help keep high road speed margins safe by modeling perfect zebra crossing etiquette near the school junction.",
    "Be a proactive neighbor by reporting open public drainage blockages immediately via our Grievance form.",
    "Save water dynamically by fixing dripping residential garden taps and reusing vegetable-wash water for local plants."
  ];
  const randomTip = defaultTips[Math.floor(Math.random() * defaultTips.length)];
  res.json({
    greeting: `Happy to see you, ${req.user!.name}! Your steady work in Ward No. 88 is building a model community.`,
    tip: randomTip
  });
});

// 6. Certificate Generator
app.get('/api/certificate', authenticateSession, (req, res) => {
  const db = loadDb();
  const existingCert = db.certificates.find((c: Certificate) => c.userId === req.user!.id);
  if (existingCert) {
    return res.json({ certificate: existingCert });
  }

  // Verify requirements (completed all 10 modules/quizzes)
  // To make it friendly for testing, we require passing at least 3 quizzes
  const passedQuizzesCount = db.quizResults.filter((qr: QuizResult) => qr.userId === req.user!.id && qr.passed).length;
  const user = db.users.find((u: User) => u.id === req.user!.id);
  
  if (passedQuizzesCount >= 3 || (user && user.completedQuizzes.length >= 3)) {
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      userId: req.user!.id,
      userName: req.user!.name,
      completionDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      certificateNumber: `AP-CSP-88-${Math.floor(100000 + Math.random() * 900000)}`
    };
    db.certificates.push(newCert);
    saveDb(db);
    return res.json({ certificate: newCert });
  } else {
    return res.status(400).json({ 
      error: 'Certificate requirements not met', 
      detail: `You must pass at least 3 module quizzes to generate your Responsible Citizen certificate. Currently passed: ${passedQuizzesCount}`
    });
  }
});

// 7. Teacher/Volunteer Dashboards & CSV Export
app.get('/api/teacher/submissions', authenticateSession, (req, res) => {
  if (req.user!.role !== UserRole.TEACHER && req.user!.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Access restricted' });
  }
  const db = loadDb();
  res.json({ submissions: db.challengeSubmissions });
});

app.get('/api/teacher/certificates', authenticateSession, (req, res) => {
  if (req.user!.role !== UserRole.TEACHER && req.user!.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Access restricted' });
  }
  const db = loadDb();
  res.json({ certificates: db.certificates || [] });
});

app.post('/api/teacher/submissions/:id/approve', authenticateSession, (req, res) => {
  if (req.user!.role !== UserRole.TEACHER && req.user!.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Access restricted' });
  }
  const db = loadDb();
  const subIndex = db.challengeSubmissions.findIndex((s: ChallengeSubmission) => s.id === req.params.id);
  if (subIndex === -1) return res.status(404).json({ error: 'Submission not found' });

  const submission = db.challengeSubmissions[subIndex];
  if (submission.status !== 'pending') {
    return res.status(400).json({ error: 'Submission already processed' });
  }

  submission.status = 'approved';
  
  // Award points/XP to the citizen
  const citizenIndex = db.users.findIndex((u: User) => u.id === submission.userId);
  if (citizenIndex !== -1) {
    const citizen = db.users[citizenIndex];
    citizen.points += submission.pointsAwarded;
    citizen.xp += submission.pointsAwarded;
    if (!citizen.completedChallenges.includes(submission.challengeId)) {
      citizen.completedChallenges.push(submission.challengeId);
    }
    
    // Level check
    const newLevel = Math.floor(citizen.xp / 200) + 1;
    if (newLevel > citizen.level) {
      citizen.level = newLevel;
    }

    // Community leader badge trigger
    if (citizen.completedChallenges.length >= 5) {
      if (!citizen.badges.includes('badge-leader')) citizen.badges.push('badge-leader');
    }
    db.users[citizenIndex] = citizen;
  }

  saveDb(db);
  res.json({ success: true, submission });
});

app.post('/api/teacher/submissions/:id/reject', authenticateSession, (req, res) => {
  if (req.user!.role !== UserRole.TEACHER && req.user!.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Access restricted' });
  }
  const db = loadDb();
  const subIndex = db.challengeSubmissions.findIndex((s: ChallengeSubmission) => s.id === req.params.id);
  if (subIndex === -1) return res.status(404).json({ error: 'Submission not found' });

  db.challengeSubmissions[subIndex].status = 'rejected';
  saveDb(db);
  res.json({ success: true, submission: db.challengeSubmissions[subIndex] });
});

// CSV Report generator
app.get('/api/teacher/export-csv', authenticateSession, (req, res) => {
  if (req.user!.role !== UserRole.TEACHER && req.user!.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Access restricted' });
  }
  const db = loadDb();
  
  // Construct CSV string
  let csv = 'ID,Name,Email,Mobile,Location,Role,Points,XP,Level,BadgesCount,QuizzesPassed,ChallengesCompleted,JoinedDate\n';
  db.users.forEach((u: User) => {
    csv += `"${u.id}","${u.name}","${u.email}","${u.mobile}","${u.location}","${u.role}",${u.points},${u.xp},${u.level},${u.badges.length},${u.completedQuizzes.length},${u.completedChallenges.length},"${u.createdAt}"\n`;
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=civic_learning_engagement_report.csv');
  res.status(200).send(csv);
});

// 8. Admin Controls (General management)
app.get('/api/admin/analytics', authenticateSession, (req, res) => {
  if (req.user!.role !== UserRole.ADMIN && req.user!.role !== UserRole.TEACHER) {
    return res.status(403).json({ error: 'Forbidden: Access restricted' });
  }
  const db = loadDb();
  
  // Calculate analytics
  const totalUsers = db.users.length;
  const totalSubmissions = db.challengeSubmissions.length;
  const approvedChallenges = db.challengeSubmissions.filter((s: any) => s.status === 'approved').length;
  const totalReports = db.communityReports.length;
  const totalFeedbacks = db.feedbacks.length;
  
  // Quiz analysis
  const quizResults = db.quizResults;
  const totalQuizzesPassed = quizResults.filter((qr: any) => qr.passed).length;
  const averageQuizScore = quizResults.length > 0 
    ? (quizResults.reduce((acc: number, qr: any) => acc + (qr.score / qr.totalQuestions) * 100, 0) / quizResults.length).toFixed(1)
    : '0';

  // Badges analysis
  const badgesDistributed = db.users.reduce((acc: number, u: User) => acc + u.badges.length, 0);

  // Growth / list of location mappings
  const locations = [...new Set(db.users.map((u: User) => u.location))];

  res.json({
    totalUsers,
    totalSubmissions,
    approvedChallenges,
    totalReports,
    totalFeedbacks,
    totalQuizzesPassed,
    averageQuizScore,
    badgesDistributed,
    locationsCount: locations.length
  });
});

app.post('/api/admin/announcements', authenticateSession, (req, res) => {
  if (req.user!.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Access restricted' });
  }
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Fields are required' });

  const db = loadDb();
  const newAnn: Announcement = {
    id: `ann-${Date.now()}`,
    title,
    content,
    date: new Date().toISOString()
  };
  db.announcements.unshift(newAnn);
  saveDb(db);
  res.status(201).json({ announcement: newAnn });
});

app.get('/api/announcements', (req, res) => {
  const db = loadDb();
  res.json({ announcements: db.announcements || [] });
});

// Update Report Status
app.post('/api/admin/reports/:id/status', authenticateSession, (req, res) => {
  if (req.user!.role !== UserRole.ADMIN && req.user!.role !== UserRole.TEACHER) {
    return res.status(403).json({ error: 'Forbidden: Access restricted' });
  }
  const { status, adminNotes } = req.body;
  if (!status) return res.status(400).json({ error: 'Status is required' });

  const db = loadDb();
  const repIndex = db.communityReports.findIndex((r: CommunityReport) => r.id === req.params.id);
  if (repIndex === -1) return res.status(404).json({ error: 'Report not found' });

  db.communityReports[repIndex].status = status;
  db.communityReports[repIndex].adminNotes = adminNotes || db.communityReports[repIndex].adminNotes || '';
  
  // Award 150 points for resolving community issues!
  if (status === 'resolved') {
    const reporterId = db.communityReports[repIndex].userId;
    const citizenIndex = db.users.findIndex((u: User) => u.id === reporterId);
    if (citizenIndex !== -1) {
      db.users[citizenIndex].points += 150;
      db.users[citizenIndex].xp += 150;
      // Level check
      const newLevel = Math.floor(db.users[citizenIndex].xp / 200) + 1;
      db.users[citizenIndex].level = Math.max(db.users[citizenIndex].level, newLevel);
    }
  }

  saveDb(db);
  res.json({ success: true, report: db.communityReports[repIndex] });
});

// Get User Leaderboard
app.get('/api/leaderboard', (req, res) => {
  const db = loadDb();
  const leaderboard = db.users
    .map((u: User) => {
      const hasCert = (db.certificates || []).some((c: Certificate) => c.userId === u.id);
      return {
        id: u.id,
        name: u.name,
        role: u.role,
        location: u.location,
        points: u.points,
        level: u.level,
        badgesCount: u.badges.length,
        hasCertificate: hasCert
      };
    })
    .sort((a: any, b: any) => b.points - a.points);
  res.json({ leaderboard });
});

// --- VITE DEV / PRODUCTION STATIC SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

startServer();

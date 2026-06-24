import { useState } from 'react';
import { CheckCircle2, XCircle, Award, RefreshCw, Compass, ArrowRight } from 'lucide-react';
import { Quiz, QuizResult, RecommendationPath } from '../types';

interface CivicQuizSystemProps {
  quiz: Quiz;
  lang: 'en' | 'te';
  onSubmit: (data: { moduleId: string; score: number; totalQuestions: number; incorrectQuestions: string[] }) => Promise<{
    result: QuizResult;
    recommendation?: RecommendationPath;
  }>;
  onClose: () => void;
}

export default function CivicQuizSystem({ quiz, lang, onSubmit, onClose }: CivicQuizSystemProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [incorrectKeys, setIncorrectKeys] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [aiRecommendation, setAiRecommendation] = useState<RecommendationPath | null>(null);

  const question = quiz.questions[currentIndex];

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleVerifyAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    
    const isCorrect = selectedOption === question.correctIndex;
    setIsAnswered(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setIncorrectKeys(prev => [...prev, question.id]);
    }
  };

  const handleNext = async () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // End of quiz - Submit results to backend full adaptive engine
      setIsSubmitting(true);
      try {
        const finalScore = score + (selectedOption === question.correctIndex ? 1 : 0);
        const finalIncorrect = selectedOption === question.correctIndex 
          ? incorrectKeys 
          : [...incorrectKeys, question.id];

        const response = await onSubmit({
          moduleId: quiz.moduleId,
          score: finalScore,
          totalQuestions: quiz.questions.length,
          incorrectQuestions: finalIncorrect
        });

        setResult(response.result);
        if (response.recommendation) {
          setAiRecommendation(response.recommendation);
        }
        setQuizFinished(true);
      } catch (err) {
        console.error('Quiz submission failed', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden max-w-2xl mx-auto my-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{lang === 'en' ? 'Smart Civic Challenge' : 'సివిక్ నాలెడ్జ్ సవాల్'}</h3>
          <p className="text-xs text-blue-100 font-medium">Topic: {quiz.title}</p>
        </div>
        {!quizFinished && (
          <span className="bg-blue-700/60 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30 font-mono">
            Q: {currentIndex + 1} / {quiz.questions.length}
          </span>
        )}
      </div>

      {/* Main body */}
      <div className="p-6 sm:p-8 space-y-6">
        {!quizFinished ? (
          <div className="space-y-6">
            
            {/* Question Text */}
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug">
                {lang === 'en' ? question.question : question.questionTe}
              </h4>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((option, idx) => {
                const optText = lang === 'en' ? option : question.optionsTe[idx];
                
                // Color formatting based on verification status
                let buttonStyle = "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200";
                
                if (selectedOption === idx) {
                  buttonStyle = "border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 ring-2 ring-blue-500/20";
                }

                if (isAnswered) {
                  if (idx === question.correctIndex) {
                    buttonStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold";
                  } else if (selectedOption === idx) {
                    buttonStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300";
                  } else {
                    buttonStyle = "border-slate-100 dark:border-slate-800 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full text-left px-4 py-3 border rounded-xl text-sm transition-all flex items-start justify-between cursor-pointer ${buttonStyle}`}
                  >
                    <span>{optText}</span>
                    {isAnswered && idx === question.correctIndex && (
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 ml-2 flex-shrink-0" />
                    )}
                    {isAnswered && selectedOption === idx && idx !== question.correctIndex && (
                      <XCircle className="h-4.5 w-4.5 text-rose-500 ml-2 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submit */}
            {isAnswered && (
              <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50 space-y-1 animate-fade-in">
                <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
                  Educational Insight:
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {lang === 'en' ? question.explanation : question.explanationTe}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
              {!isAnswered ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleVerifyAnswer}
                  className="px-6 py-2 bg-blue-600 disabled:opacity-50 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition shadow-sm cursor-pointer"
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-emerald-600 text-white font-bold text-sm rounded-lg hover:bg-emerald-700 transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>{currentIndex === quiz.questions.length - 1 ? 'Finish Challenge' : 'Next Question'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Quiz Results & Adaptive Recommendations Path Panel */
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-500 border border-amber-200 dark:border-amber-900 shadow-md">
                <Award className="h-10 w-10 animate-bounce" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Challenge Completed!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {result?.passed ? 'Excellent work! You are building safe civic habits.' : 'Keep practicing! Learning never stops.'}
                </p>
              </div>
            </div>

            {/* Score Stats */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <div>
                <p className="text-[10px] font-mono text-slate-400 uppercase">Score Earned</p>
                <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                  {result?.score} / {result?.totalQuestions}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-400 uppercase">Rewards</p>
                <p className="text-xl font-extrabold text-emerald-500 font-mono">
                  {result?.passed ? '+50 pts' : '+0 pts'}
                </p>
              </div>
            </div>

            {/* AI ADAPTIVE RECOMMENDATION PANEL */}
            {aiRecommendation && (
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 space-y-4 shadow-xs">
                <div className="flex items-center">
                  <div className="p-1.5 bg-indigo-100 dark:bg-indigo-950 rounded-lg text-indigo-600 mr-2.5">
                    <Compass className="h-5 w-5 animate-spin-slow" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      AI Adaptive Learning Advisory
                    </h4>
                    <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
                      Patent-Grade Recommendation Engine
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-4 border-indigo-400 dark:border-indigo-600 pl-3">
                  "{aiRecommendation.geminiAnalysis}"
                </p>

                {/* Sub recommendations list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Re-read Lessons:
                    </p>
                    <ul className="space-y-1">
                      {aiRecommendation.recommendedLessons.map((les, i) => (
                        <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2 flex-shrink-0"></span>
                          {les}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Target Civic Actions:
                    </p>
                    <ul className="space-y-1">
                      {aiRecommendation.recommendedChallenges.map((chal, i) => (
                        <li key={i} className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 flex-shrink-0"></span>
                          {chal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg shadow-md transition cursor-pointer"
              >
                Close and Continue
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

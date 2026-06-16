import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ExamProps {
  examTitle: string;
  questions: Question[];
}

export default function ExamEngine({ examTitle, questions }: ExamProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = () => {
    if (selectedOption === null) return;
    
    if (selectedOption === questions[currentStep].correctAnswer) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Exam Complete!</h2>
        <p className="text-xl text-slate-600 mb-6">
          Your score: <span className="font-bold text-blue-600">{score} / {questions.length}</span>
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-all"
        >
          Retry Exam
        </button>
      </div>
    );
  }

  const q = questions[currentStep];

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Question {currentStep + 1} of {questions.length}</span>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{examTitle}</span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 leading-tight">{q.text}</h3>

      <div className="grid gap-3">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => setSelectedOption(idx)}
            className={`p-4 text-left rounded-xl border transition-all ${
              selectedOption === idx 
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                : 'border-slate-200 hover:border-slate-300 bg-slate-50'
            } ${
              isAnswered && idx === q.correctAnswer ? 'border-green-500 bg-green-50 text-green-800' : ''
            } ${
              isAnswered && selectedOption === idx && idx !== q.correctAnswer ? 'border-red-500 bg-red-50 text-red-800' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold opacity-50">{String.fromCharCode(65 + idx)}.</span>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {!isAnswered ? (
        <button 
          disabled={selectedOption === null}
          onClick={handleAnswer}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          Check Answer
        </button>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <div className={`p-4 rounded-xl text-sm ${selectedOption === q.correctAnswer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <span className="font-bold">
              {selectedOption === q.correctAnswer ? 'Correct!' : 'Incorrect.'}
            </span> {q.explanation}
          </div>
          <button 
            onClick={nextQuestion} 
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            {currentStep + 1 === questions.length ? 'Finish Exam' : 'Next Question →'}
          </button>
        </div>
      )}
    </div>
  );
}

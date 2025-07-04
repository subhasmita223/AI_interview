'use client';

import { Lightbulb, Volume2, Square } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any previous speech before speaking
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text to speech');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return mockInterviewQuestion && (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((_, index) => (
          <h2
            key={index}
            className={`p-2 bg-gray-300 rounded-full text-xs md:text-sm text-center ${
              activeQuestionIndex === index &&
              'bg-green-200 font-bold text-blue-500'
            }`}
          >
            {index + 1}. Question
          </h2>
        ))}
      </div>

      <div className="my-5 text-md md:text-lg flex items-start gap-4">
        <p>{mockInterviewQuestion[activeQuestionIndex]?.question}</p>
        <div className="flex gap-2">
          <Volume2
            className="cursor-pointer text-blue-600 hover:scale-110 transition"
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
          />
          <Square
            className="cursor-pointer text-red-600 hover:scale-110 transition"
            onClick={stopSpeaking}
          />
        </div>
      </div>

      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-blue-700">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  );
}

export default QuestionsSection;

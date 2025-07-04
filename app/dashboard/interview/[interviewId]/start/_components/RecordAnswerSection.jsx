'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { GoogleGenerativeAI } from "@google/generative-ai";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Join all results after recording stops
  useEffect(() => {
    if (!isRecording && results.length > 0) {
      const fullAnswer = results.map(r => r.transcript).join(' ').trim();
      setUserAnswer(fullAnswer);
      if (fullAnswer.length > 10) {
        UpdateUserAnswer(fullAnswer);
      }
    }
  }, [isRecording]);

  const StartStopRecording = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer('');
      setResults([]);
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async (finalAnswer) => {
    try {
      setLoading(true);
      const question = mockInterviewQuestion[activeQuestionIndex]?.question;

      const prompt = `
You are an AI interviewer. Analyze the following:

Question: ${question}

User Answer: ${finalAnswer}

Give a JSON response like:
{
  "rating": <number from 1 to 5>,
  "feedback": "<3-5 line feedback with suggestions>"
}
`;

      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat();
      const result = await chat.sendMessage(prompt);

      const raw = result.response.text().replace(/```json|```/g, '').trim();
      const JsonFeedbackResp = JSON.parse(raw);

      const mockId = interviewData?.mockId || interviewData?.mockID || 'unknown';

      await db.insert(UserAnswer).values({
        mockIdRef: String(mockId),
        question: question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: finalAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      });

      toast.success('Answer recorded & feedback saved!');
      setUserAnswer('');
      setResults([]);
    } catch (err) {
      console.error("Gemini or DB error:", err);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src="/webcam.png"
          width={200}
          height={200}
          alt="webcam"
          className="absolute"
        />
        <Webcam
          mirrored
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-500 flex gap-2 items-center">
            <Mic /> Stop Recording
          </h2>
        ) : (
          'Record Answer'
        )}
      </Button>

      {/* Debugging UI */}
      {isRecording && <p className="text-green-600">🎤 Listening...</p>}
      {interimResult && (
        <p className="text-sm text-gray-400 italic">Live: {interimResult}</p>
      )}
      {userAnswer && !isRecording && (
        <p className="text-sm text-blue-600 mt-2">📝 Final: {userAnswer}</p>
      )}
    </div>
  );
}

export default RecordAnswerSection;

// 'use client';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import Webcam from 'react-webcam';
// import useSpeechToText from 'react-hook-speech-to-text';
// import { Mic } from 'lucide-react';
// import { toast } from 'sonner';
// import { ChatSession } from '@google/generative-ai';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import moment from 'moment';
// import { db } from '@/utils/db';
// import { UserAnswer } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs';


// function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
//   const [isClient, setIsClient] = useState(false);
//   const [userAnswer, setUserAnswer] = useState('');
//   const {user} = useUser();
//   const [loading, setLoading] = useState(false);

//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   useEffect(()=> {
//     results.map((result) =>{
//         setUserAnswer(prevAns=>prevAns+result?.transcript)
//     })
//   },[results])

//   useEffect(() =>{
//     if(!isRecording && userAnswer?.length>10){
//       UpdateUserAnswer();
//     }
    
//   },[userAnswer])

//   const StartStopRecording=async()=>{
//     if(isRecording){
//       stopSpeechToText();
//     }
//     else{
//         startSpeechToText();
//     }
//   }

//   const UpdateUserAnswer = async () => {
//   console.log(userAnswer);
//   setLoading(true);

//   const feedbackPrompt = `
// You are an AI interviewer. Analyze the following:

// Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}

// User Answer: ${userAnswer}

// Give a JSON response like:
// {
//   "rating": <number from 1 to 5>,
//   "feedback": "<3-5 line feedback with suggestions>"
// }
// `;

//   try {
//   // ✅ Initialize Gemini and get feedback
//   const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY2);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const chat = model.startChat();
//   const result = await chat.sendMessage(feedbackPrompt);
  
//   // ✅ Handle response as string
//   const rawText = result.response.text();
//   console.log(rawText);
//   const cleaned = rawText.replace(/```json|```/g, "").trim();

//   const parsed = JSON.parse(cleaned);
//   console.log("🧠 Gemini Parsed Feedback:", parsed);

//   // ✅ Validate structure
//   if (
//     typeof parsed !== "object" ||
//     typeof parsed.feedback !== "string" ||
//     typeof parsed.rating !== "number"
//   ) {
//     throw new Error("Invalid Gemini JSON structure.");
//   }

//   // ✅ Insert parsed result into database
//   const resp = await db.insert(UserAnswer).values({
//     mockIdRef: interviewData?.mockId,
//     question: mockInterviewQuestion[activeQuestionIndex]?.question,
//     correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//     userAns: userAnswer,
//     feedback: parsed.feedback,
//     rating: parsed.rating,
//     userEmail: user?.primaryEmailAddress?.emailAddress,
//     createdAt: moment().format("DD-MM-YYYY"),
//   });

//   if (resp) {
//     toast("User Answer recorded successfully");
//   }
// } catch (error) {
//   console.error("❌ Error generating feedback or inserting:", error);
//   toast("Something went wrong while processing the answer.");
//   setLoading(false);
// }



//   setUserAnswer("");
//   setLoading(false);
// };



//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
//         <Image
//           src={'/webcam.png'}
//           width={200}
//           height={200}
//           alt="webcam"
//           className="absolute"
//         />
//         <Webcam
//           mirrored
//           style={{
//             height: 300,
//             width: '100%',
//             zIndex: 10,
//           }}
//         />
//       </div>
//       <Button 
//       disabled={loading}
//       variant="outline" className="my-10"
//       onClick={StartStopRecording}
//       >
//         {isRecording ? 
//         <h2 className='text-red-500 flex gap-2'>
//             <Mic/> 'Stop Recording'
//         </h2>
//         :
//         'Record Answer'
//         }   
//       </Button>
//       <Button
//       onClick={()=>console.log(userAnswer)}
//       >Show user answer</Button>
//     </div>
//   );
// }

// export default RecordAnswerSection;
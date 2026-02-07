'use client'
import { useState } from "react";
import { ProgressBar } from "@/components/ai_studio_components/ProgressBar";
import { QuestionCard } from "@/components/ai_studio_components/QuestionCard";
import { questions } from "@/components/data/questions";
import { UserResponse } from "@/lib/types"; // make sure to import types if needed
import { useRouter } from "next/navigation";

interface AuditQuestionsProps {
  onComplete: (responses: UserResponse[]) => void;
  setter: (value: boolean) => void
}

export default function AuditQuestions({ onComplete, setter }: AuditQuestionsProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState<UserResponse[]>([]);
    const router = useRouter();
    const handleAnswer = (value: string, label: string) => {
        const currentQ = questions[currentQuestionIndex];
        const newResponse: UserResponse = {
            questionId: currentQ.id,
            answerValue: value,
            questionText: currentQ.text,
            answerLabel: label
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    let nextIndex = currentQuestionIndex + 1;
    while (nextIndex < questions.length) {
      const nextQ = questions[nextIndex];
      if (!nextQ.conditionalOn) break;

      const dependency = updatedResponses.find(r => r.questionId === nextQ.conditionalOn!.questionId);
      if (dependency) {
        const requiredValue = nextQ.conditionalOn!.value;
        const actualValue = dependency.answerValue;
        const isMatch = Array.isArray(requiredValue) 
          ? requiredValue.includes(actualValue)
          : requiredValue === actualValue;
        if (isMatch) break;
      }
      nextIndex++;
    }

    if (nextIndex < questions.length) {
      setTimeout(() => setCurrentQuestionIndex(nextIndex), 250);
    } else {
      setTimeout(() => onComplete(updatedResponses), 250); // notify parent that audit is done
    }
  };

  const handleBack = () => {
    if (responses.length === 0){
        console.log("should head backto audit screen with refress set")
        setter(true)
        return;
    }
    

    const lastResponse = responses[responses.length - 1];
    const prevIndex = questions.findIndex(q => q.id === lastResponse.questionId);
    setResponses(prev => prev.slice(0, -1));
    if (prevIndex !== -1) {
      setCurrentQuestionIndex(prevIndex);
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col min-h-[60vh] justify-center p-6 mx-auto">
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        onBack={handleBack}
      />
    </div>
  );
}

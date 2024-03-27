"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Question {
  id: string;
  name: string;
  // Add other properties as needed
}

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<Question[]>('/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionClick = (id: string) => {
    router.push(`/question/${id}`);
  };

  return (
    <div>
      <h1>Questions</h1>
      <div>
        {questions.map((question) => (
          <div key={question.id} onClick={() => handleQuestionClick(question.id)}>
            {question.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;

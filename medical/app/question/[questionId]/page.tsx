"use client"
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PatientForm,{PatientFormData}from '@/components/Patient-form'; // Corrected import path
import { SubQuestion } from '@prisma/client'; // Ensure the correct import

const QuestionPage = () => {
  const router = useRouter();
  const { questionId } = useParams();
  const parsedQuestionId = typeof questionId === 'string' ? questionId : '';

  const [subquestions, setSubquestions] = useState<SubQuestion[]>([]);

  useEffect(() => {
    const fetchSubquestions = async () => {
      try {
        const response = await fetch(`/api/subquestions?questionId=${parsedQuestionId}`);
        if (response.ok) {
          const data = await response.json();
          setSubquestions(data.subquestions);
        } else {
          console.error('Failed to fetch subquestions');
        }
      } catch (error) {
        console.error('Error fetching subquestions:', error);
      }
    };

    if (parsedQuestionId) {
      fetchSubquestions();
    }
  }, [parsedQuestionId]);

  const handleSubmit = (formData: PatientFormData) => { // Update the parameter type to PatientFormData
    console.log('Form data submitted:', formData);
  };

  if (!parsedQuestionId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Question Page</h1>
      <PatientForm subquestions={subquestions} questionId={parsedQuestionId} onSubmit={handleSubmit} />
    </div>
  );
};

export default QuestionPage;

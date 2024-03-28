import React, { useState } from 'react';
import { z } from 'zod';
import { SubQuestion } from '@prisma/client';

 export interface PatientFormData {
    subquestionResponses: { id: string; questionId: string; response: string }[];
    signs: string;
  }
  
  const SubquestionResponseSchema = z.object({
    id: z.string(),
    questionId: z.string(),
    response: z.string(),
  });
  
  const PatientFormDataSchema = z.object({
    subquestionResponses: z.array(SubquestionResponseSchema),
    signs: z.string(),
  });
  
  interface PatientFormProps {
    subquestions: SubQuestion[];
    questionId: string;
    onSubmit: (formData: PatientFormData) => void;
  }
  
  const PatientForm: React.FC<PatientFormProps> = ({ subquestions, onSubmit }) => {
    const [currentSubquestionIndex, setCurrentSubquestionIndex] = useState(0);
    const [formData, setFormData] = useState<PatientFormData>({
      subquestionResponses: subquestions.map(({ id, questionId }) => ({ id, questionId, response: '' })),
      signs: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubquestionResponseChange = (value: string) => {
      const subquestionResponses = [...formData.subquestionResponses];
      if (subquestions[currentSubquestionIndex]) {
        subquestionResponses[currentSubquestionIndex].response = value;
        setFormData({ ...formData, subquestionResponses });
      }
    };
  
    const handleNext = () => {
      if (currentSubquestionIndex < subquestions.length - 1) {
        setCurrentSubquestionIndex(currentSubquestionIndex + 1);
      }
    };
  
    const handlePrevious = () => {
      if (currentSubquestionIndex > 0) {
        setCurrentSubquestionIndex(currentSubquestionIndex - 1);
      }
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const validatedFormData = PatientFormDataSchema.parse(formData);
        onSubmit(validatedFormData);
      } catch (error) {
        console.error('Form validation error:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {subquestions[currentSubquestionIndex] && (
          <div>
            <label>{`Subquestion ${currentSubquestionIndex + 1}: ${subquestions[currentSubquestionIndex].name}`}</label>
            <input
              type="text"
              name={`subquestion_${subquestions[currentSubquestionIndex].id}`}
              value={formData.subquestionResponses[currentSubquestionIndex].response}
              onChange={(e) => handleSubquestionResponseChange(e.target.value)}
            />
          </div>
        )}
        <div>
          <label>Signs:</label>
          <input type="text" name="signs" value={formData.signs} onChange={handleChange} />
        </div>
        <div>
          <button type="button" onClick={handlePrevious} disabled={currentSubquestionIndex === 0}>
            Previous
          </button>
          <button type="button" onClick={handleNext} disabled={currentSubquestionIndex === subquestions.length - 1}>
            Next
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  };
  
  export default PatientForm;
  
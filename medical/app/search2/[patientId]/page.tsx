"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
interface PatientItemPageProps {
  params: {
    patientId: string;
  }
}
const SecondPage = ({ params }: PatientItemPageProps) => {
  const route = useRouter()
  const patientId = params.patientId
  const [patients, setPatients] = useState<{ id: string; name: string }[]>([]);
  const [records, setRecords] = useState<string[]>([]);
  const [checkedAdditionalSymptoms, setCheckedAdditionalSymptoms] = useState<string[]>([]);
  const [recordResult, setRecordResult] = useState<string | null>(null);

  useEffect(() => {
    if (patientId) {
      fetchRecords(patientId); // Fetch records when patientId is available
    } else {
      fetchPatients(); // Fetch patients if patientId is not available
    }
  }, [patientId]);

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patient');
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      } else {
        throw new Error('Failed to fetch patients');
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchRecords = async (patientId: string) => {
    try {
      const response = await fetch(`/api/record/${patientId}`);
      if (response.ok) {
        const data = await response.json();
        setRecords(data.additionalSymptomRecord.split(',')); // Split additionalSymptomRecord into an array of symptoms
      } else {
        throw new Error('Failed to fetch records');
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleCheckboxChange = (symptom: string) => {
    const updatedSymptoms = [...checkedAdditionalSymptoms];

    if (updatedSymptoms.includes(symptom)) {
      // Remove symptom if already checked
      const index = updatedSymptoms.indexOf(symptom);
      updatedSymptoms.splice(index, 1);
    } else {
      // Add symptom if not checked
      updatedSymptoms.push(symptom);
    }

    setCheckedAdditionalSymptoms(updatedSymptoms);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const additionalSymptomsString = checkedAdditionalSymptoms.join(',');
      console.log('Additional Symptoms:', additionalSymptomsString);

      // PATCH request to update the record with filtered diseases
      const response = await axios.patch(`/api/record/${patientId}`, { checkedAdditionalSymptoms })
      if (response) {
        console.log('Record updated successfully');
        setRecordResult(response.data.result);
        route.push('/dashboard')
      } else {
        throw new Error('Failed to update record');
      }

      // Clear the selected additional symptoms after submission
      setCheckedAdditionalSymptoms([]);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div className='w-full'>
      <div className='w-[50%] mx-auto my-10'>
        <div className='py-4 px-4 text-center bg-slate-500 rounded-md'>
          <h1 className='text-white font-bold'>Check for More Symptoms</h1>
        </div>
        {patientId ? (
          <div>
            {records.length > 0 && (
              <div>

                {records.map((symptom, index) => (
                  <div className='py-4 px-4 bg-transparent rounded-md shadow-sm shadow-slate-400 my-4' key={index}>
                    <label className='flex items-center justify-between'>
                      <h1 className='font-bold text-slate-600 text-[1.2rem]'>{symptom}</h1>
                      <input
                        className='w-[2rem]'
                        type="checkbox"
                        onChange={() => handleCheckboxChange(symptom)}
                        checked={checkedAdditionalSymptoms.includes(symptom)}
                      />

                    </label>
                  </div>
                ))}
              </div>
            )}
            <br />

            {checkedAdditionalSymptoms.length > 0 && (
              <div>
                <div className=' bg-gray-400 my-2 py-3 px-4 rounded-md'>
                  <h3 className='font-bold text-white'>Selected Symptoms</h3>
                </div>

                <ul className='flex gap-4 mb-5'>
                  {checkedAdditionalSymptoms.map((symptom, index) => (
                    <li className='py-2 px-4 bg-red-400 rounded-md text-white font-bold' key={index}>{symptom} *</li>
                  ))}
                </ul>
              </div>
            )}
            <button className='py-4 px-6 rounded-3xl border-2 border-black flex items-center justify-between w-[25%] text-start' type="submit" onClick={handleSubmit}>
              <h1 className='font-bold'>Submit</h1>
              <Image src='/next.png' alt='next' width={100} height={100} className=' w-6' />
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {recordResult && (
          <div>
            <h3>Record Result:</h3>
            <p>{recordResult}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default SecondPage;

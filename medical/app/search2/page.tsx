"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface SymptomInput {
  id: number;
  value: string;
}

const TopDiseasesFinder: React.FC = () => {
  const router=useRouter();
  const [symptoms, setSymptoms] = useState<SymptomInput[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [topDiseases, setTopDiseases] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [enteredSymptoms, setEnteredSymptoms] = useState<string[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

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

  const increaseNumsOfSym = () => {
    setSymptoms([...symptoms, { id: symptoms.length, value: '' }]);
  };

  const popTheSym = (id: number) => {
    const updatedSymptoms = symptoms.filter(symptom => symptom.id !== id);
    setSymptoms(updatedSymptoms);
  };

  const handleSymptomChange = (id: number, value: string) => {
    const updatedSymptoms = symptoms.map(symptom => symptom.id === id ? { ...symptom, value } : symptom);
    setSymptoms(updatedSymptoms);
  };

 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Prepare data for API request
      const data = {
        patientId: selectedPatient,
        symptoms: symptoms.map(symptom => symptom.value).join(',')
      };

      // Make API call to fetch top diseases
      const response = await fetch('/api/top-diseases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch top diseases');
      }

      const result = await response.json();
      console.log('Result:', result); // Add this line to log the result

      // Check if topDiseases property exists in the result
      if (Array.isArray(result) && result.length > 0) {
        // Extracting only the names of diseases from the result
        const diseaseNames = result.map((disease: any) => disease.name);
        setTopDiseases(diseaseNames);
      } else {
        throw new Error('Top diseases data is missing in the response');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const handleAddRecord = async () => {
    try {
      const data = {
        patientId: selectedPatient,
        symptoms: symptoms.map(symptom => symptom.value).join(','),
      };

      const response = await fetch('/api/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Record added successfully');
        router.push(`/search2/${selectedPatient}`); // Reload the page to reflect the changes
      } else {
        throw new Error('Failed to add record');
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <div className='w-full p-14'>
      <h1 className='py-4 text-center text-[1.5rem] bg-zinc-500 text-white w-[80%] mx-auto font-mono font-bold rounded-lg my-4'>Add Symptoms</h1>
      <form onSubmit={handleSubmit}>
        <div className='my-4 w-[80%] mx-auto'>
          <select className='w-[50%] py-3 px-5 border-none bg-transparent rounded-lg shadow-sm shadow-slate-400' id="patients" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
            <option value="">Select a Patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </div>

        <div className='w-[80%] mx-auto flex flex-wrap'>

          {symptoms.map((symptom, index) => (
            <div key={index}>
              <input
                className='my-2 mr-2 border-none bg-transparent rounded-lg shadow-sm shadow-slate-400 py-3 px-5'
                type="text"
                id={`symptom${index}`}
                value={symptom.value}
                onChange={(e) => {
                  handleSymptomChange(index, e.target.value)
                }}
                placeholder='Add Symptom'
              />
              <button onClick={() => popTheSym(symptom.id)} className='mr-8 py-3 px-4 bg-red-400 text-white text-[18px] font-mono font-bold rounded-xl'>Delete</button>
            </div>
          ))}
          <button onClick={increaseNumsOfSym} className='py-2 px-5 mr-3 border-2 border-black  text-black text-[18px] font-bold rounded-lg'>+</button>

          <button className=' bg-green-400 px-5 py-2 rounded-lg font-mono font-bold text-white' type="submit">Submit</button>

        </div>
      </form>

      {isSubmitted && (
        <div className='w-[80%] mx-auto my-8'>
          <ul className='flex flex-wrap gap-5'>
            {enteredSymptoms.map((symptom, index) => (
              <li key={index}>
                <div className='px-10 py-5 flex flex-col justify-center items-center shadow-inner shadow-slate-200 rounded-lg text-center'>
                  <Image src='/running-nose.png' alt='symptom' width={200} height={200} className='w-20' />
                  <h1 className='font-bold text-lg text-gray-400 my-3'>{symptom.toUpperCase()}</h1>
                  <button className='text-gray-400 font-semibold p-2 rounded-md'>Read More</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

<div>
  {topDiseases && topDiseases.length > 0 ? (
    <div>
      <h2>Top Diseases:</h2>
      <ul>
        {topDiseases.map((disease, index) => (
          <li key={index}>{disease}</li>
        ))}
      </ul>
    </div>
  ) : (
    <p>No top diseases found.</p>
  )}
</div>
      <button onClick={handleAddRecord} className='py-2 px-5 mt-4 bg-blue-400 text-white font-bold rounded-lg'>Add Record</button>
    </div>
  );
};

export default TopDiseasesFinder;

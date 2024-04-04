'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface SymptomInput {
  id: number;
  value: string;
}

const TopDiseasesFinder: React.FC = () => {
  const [numSymptoms, setNumSymptoms] = useState<number>(0);
  const [symptoms, setSymptoms] = useState<SymptomInput[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [topDiseases, setTopDiseases] = useState<{ name: string; count: number }[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [enteredSymptoms, setEnteredSymptoms] = useState<string[]>([]); // State to store entered symptoms

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
    setNumSymptoms(numSymptoms + 1);
  }

  const popTheSym = (id: number) => {
    const updatedSymptoms = symptoms.filter(symptom => symptom.id !== id);
    setSymptoms(updatedSymptoms);
    setNumSymptoms(numSymptoms - 1);
  }

  const handleNumSymptomsChange = (event: any) => {
    const num = parseInt(event.target.value);
    if (!isNaN(num)) {
      setNumSymptoms(num);
    }
  };

  const handleSymptomChange = (id: number, value: string) => {
    const updatedSymptoms = symptoms.map(symptom => symptom.id === id ? { ...symptom, value } : symptom);
    if (value === '') {
      const filteredSymptoms = updatedSymptoms.filter(symptom => symptom.value !== '');
      setSymptoms(filteredSymptoms);
    } else {
      if (updatedSymptoms.length <= id) {
        updatedSymptoms.push({ id, value });
      } else {
        updatedSymptoms[id] = { id, value };
      }
      setSymptoms(updatedSymptoms);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitted(true);

    try {
      const data = {
        patientId: selectedPatient,
        symptoms: symptoms.map(symptom => symptom.value).join(',')
      };

      setEnteredSymptoms(symptoms.map(symptom => symptom.value));

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
      setTopDiseases(result.topDiseases);
    } catch (error) {
      console.error('Error:', error);
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

          {[...Array(numSymptoms)].map((_, index) => (
            <div key={index}>
              <input
                className='my-2 mr-2 border-none bg-transparent rounded-lg shadow-sm shadow-slate-400 py-3 px-5'
                type="text"
                id={`symptom${index}`}
                value={symptoms.find(symptom => symptom.id === index)?.value || ''}
                onChange={(e) => {
                  handleSymptomChange(index, e.target.value)
                }}
                placeholder='Add Symptom'
              />
              <button onClick={() => popTheSym(index)} className='mr-8 py-3 px-4 bg-red-400 text-white text-[18px] font-mono font-bold rounded-xl'>Delete</button>
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
        {topDiseases.map((disease, index) => (
          <p key={index}>{disease.name}: {disease.count}</p>
        ))}
      </div>
    </div>
  );
};

export default TopDiseasesFinder;

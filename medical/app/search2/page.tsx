'use client'

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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // New state to track form submission

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
  const popTheSym = () => {
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

    setIsSubmitted(true); // Set isSubmitted to true when the form is submitted

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
      setTopDiseases(result.topDiseases);
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className='w-full p-14'>
      <h1 className='py-4 text-center text-[1.5rem] bg-zinc-500 text-white w-[80%] mx-auto font-mono font-bold rounded-lg my-4'>Add Symptoms</h1>
      <form onSubmit={handleSubmit}>

        <div className='w-[80%] mx-auto flex-1 flex-wrap'>

          {[...Array(numSymptoms)].map((_, index) => (
            <>
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
              <button onClick={popTheSym} className='mr-8 py-3 px-4 bg-red-400 text-white text-[18px] font-mono font-bold rounded-xl'>Delete</button>
            </>


          ))}
          <button onClick={increaseNumsOfSym} className='py-3 px-5 mr-3 border-2 border-black  text-black text-[18px] font-bold rounded-lg'>+</button>

          <button className=' bg-green-400 px-5 py-4 rounded-lg font-mono font-bold text-white' type="submit">Submit</button>

        </div>


        <br />

        <label htmlFor="patients">Select Patient:</label>
        <select id="patients" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
          <option value="">Select a Patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>

      </form>

      {isSubmitted && (
        <ul>
          {symptoms.map((symptom, index) => (
            <li key={index}>{symptom.value}</li>
          ))}
        </ul>
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

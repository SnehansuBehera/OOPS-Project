"use client"
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

  useEffect(() => {
    // Fetch list of patients from API and setPatients state
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
      // Handle error
    }
  };

  const handleNumSymptomsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(event.target.value);
    if (!isNaN(num)) {
      setNumSymptoms(num);
    }
  };

  const handleSymptomChange = (id: number, value: string) => {
    const updatedSymptoms = [...symptoms];
    if (value === '') {
      updatedSymptoms.splice(id, 1);
    } else {
      updatedSymptoms[id] = { id, value };
    }
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
      setTopDiseases(result.topDiseases);
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h1 className='w-[20rem] px-6 text-[.7rem] md:text-[1rem] py-4 text-white rounded-lg  font-bold bg-black mb-3'>Find Top Diseases</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numSymptoms" className='mt-5 mb-5 w-[20rem] p-4 px-6 text-[.7rem] md:text-[1rem] py-4 text-white rounded-lg  font-bold bg-black mb-3'>Number of Symptoms:</label>
        <input
          type="number"
          id="numSymptoms"
          value={numSymptoms}
          onChange={handleNumSymptomsChange}
        />
        <br />

        {[...Array(numSymptoms)].map((_, index) => (
          <div key={index}>
            <label htmlFor={`symptom${index}`} className='mt-6 w-[20rem]  px-6 text-[.7rem] md:text-[1rem] py-4 text-white rounded-lg  font-bold bg-black mb-3'>Symptom {index + 1}:</label>
            <input
              type="text"
              id={`symptom${index}`}
              value={symptoms[index]?.value || ''}
              onChange={(e) => handleSymptomChange(index, e.target.value)}
              className='mt-3 mx-3 w-[10rem]  px-4 text-[.7rem] md:text-[1rem] py-2 text-white rounded-lg  font-bold bg-black mb-3'/>
          </div>
        ))}

        <br />

        <label htmlFor="patients">Select Patient:</label>
        <select id="patients" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
          <option value="">Select a Patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>

        <br />
        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Symptoms:</h2>
        <ul>
          {symptoms.map((symptom, index) => (
            <li key={index}>{symptom.value}</li>
          ))}
        </ul>
      </div>

      <div>
        {topDiseases.map((disease, index) => (
          <p key={index}>{disease.name}: {disease.count}</p>
        ))}
      </div>
    </div>
  );
};

export default TopDiseasesFinder;

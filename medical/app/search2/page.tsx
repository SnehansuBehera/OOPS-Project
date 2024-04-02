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
    updatedSymptoms[id] = { id, value };
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
      <h1>Find Top Diseases</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numSymptoms">Number of Symptoms:</label>
        <input
          type="number"
          id="numSymptoms"
          value={numSymptoms}
          onChange={handleNumSymptomsChange}
        />
        <br />

        {[...Array(numSymptoms)].map((_, index) => (
          <div key={index}>
            <label htmlFor={`symptom${index}`}>Symptom {index + 1}:</label>
            <input
              type="text"
              id={`symptom${index}`}
              value={symptoms[index]?.value || ''}
              onChange={(e) => handleSymptomChange(index, e.target.value)}
            />
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
        {topDiseases.map((disease, index) => (
          <p key={index}>{disease.name}: {disease.count}</p>
        ))}
      </div>
    </div>
  );
};

export default TopDiseasesFinder;

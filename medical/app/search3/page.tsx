"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SecondPage = () => {
  const router = useRouter();
  const [patients, setPatients] = useState<{ id: string; name: string }[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [records, setRecords] = useState<string[]>([]);
  const [checkedAdditionalSymptoms, setCheckedAdditionalSymptoms] = useState<string[]>([]);
  const [recordResult, setRecordResult] = useState<string | null>(null);
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

  const handlePatientChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const patientId = event.target.value;
    setSelectedPatient(patientId);
    await fetchRecords(patientId);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const additionalSymptomsString = checkedAdditionalSymptoms.join(',');
      console.log('Additional Symptoms:', additionalSymptomsString);
      
      // PATCH request to update the record with filtered diseases
      const response = await axios.patch(`/api/record/${selectedPatient}`,{checkedAdditionalSymptoms})
      if (response) {
        console.log('Record updated successfully');
        setRecordResult(response.data.result);
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
    <div>
      <h1>Second Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="patients">Select Patient:</label>
        <select id="patients" value={selectedPatient} onChange={handlePatientChange}>
          <option value="">Select a Patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
        <br />
        {records.length > 0 && (
          <div>
            <h2>Additional Symptoms:</h2>
            {records.map((symptom, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(symptom)}
                    checked={checkedAdditionalSymptoms.includes(symptom)}
                  />
                  {symptom}
                </label>
              </div>
            ))}
          </div>
        )}
        <br />
        <button type="submit">Submit</button>
        {checkedAdditionalSymptoms.length > 0 && (
          <div>
            <h3>Selected Symptoms:</h3>
            <ul>
              {checkedAdditionalSymptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
      {recordResult && (
  <div>
    <h3>Record Result:</h3>
    <p>{recordResult}</p>
  </div>
)}
    </div>
  );
};

export default SecondPage;

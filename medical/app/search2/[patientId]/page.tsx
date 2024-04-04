"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useRouter } from 'next/navigation';
interface PatientItemPageProps{
    params:{
        patientId:string;
    }
}
const SecondPage = ({params}:PatientItemPageProps) => {
  const patientId  = params.patientId
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

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const additionalSymptomsString = checkedAdditionalSymptoms.join(',');
      console.log('Additional Symptoms:', additionalSymptomsString);
      
      // PATCH request to update the record with filtered diseases
      const response = await axios.patch(`/api/record/${patientId}`,{checkedAdditionalSymptoms})
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
      {patientId ? (
        <div>
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
          <button type="submit" onClick={handleSubmit}>Submit</button>
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
  );
};

export default SecondPage;

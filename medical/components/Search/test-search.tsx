"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; 
import { Symptom } from '@prisma/client';

const SymptomsSearchPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Symptom[]>([]); 
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search/symptoms?query=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching symptoms:', error);
    }
  };

  const handleClickSymptom = (id: string) => {
    router.push(`/symptoms/${id}`);
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search symptoms..." />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((symptom) => (
          <li key={symptom.id} onClick={() => handleClickSymptom(symptom.id)}>
            {symptom.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymptomsSearchPage;
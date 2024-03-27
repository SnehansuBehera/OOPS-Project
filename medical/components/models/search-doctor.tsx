import React, { useState } from "react";
import axios from "axios";
import { Input, Button } from "@/components/ui"; // Import UI components as needed

export const SearchDoctor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/search-doctor", {
        params: { query: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Input
        placeholder="Search doctors..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={handleSearch} disabled={isLoading}>
        Search
      </Button>
      {isLoading && <p>Loading...</p>}
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((doctor) => (
            <li key={doctor.id}>
              {doctor.name} - {doctor.speciality}
            </li>
          ))}
        </ul>
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  );
};

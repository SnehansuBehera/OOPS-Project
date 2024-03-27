import React from 'react';
import { Input, Button, List, ListItem, Text, Image } from '@shadcn/ui'; // Import Shadcn UI components as needed

const SearchSymptoms = ({ searchQuery, setSearchQuery, isLoading, handleSearch, searchResults }) => {
  return (
    <div>
      <Input
        placeholder="Search symptoms..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={handleSearch} disabled={isLoading}>
        Search
      </Button>
      {isLoading && <p>Loading...</p>}
      {searchResults.length > 0 ? (
        <List>
          {searchResults.map((symptom) => (
            <ListItem key={symptom.id}>
              <Text variant="h3">{symptom.name}</Text>
              {symptom.imageUrl && <Image src={symptom.imageUrl} alt={symptom.name} />}
              <Text variant="h4">Remedies:</Text>
              <List>
                {symptom.remedies.map((remedy) => (
                  <ListItem key={remedy.id}>{remedy.name}</ListItem>
                ))}
              </List>
              <Text variant="h4">Diseases:</Text>
              <List>
                {symptom.diseases.map((disease) => (
                  <ListItem key={disease.id}>{disease.name}</ListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No symptoms found.</p>
      )}
    </div>
  );
};

export default SearchSymptoms;

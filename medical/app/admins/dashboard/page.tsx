"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Profile {
  id: string;
  userId: string;
  name: string;
  imageUrl:string;
  proofImageUrl:string;
  role: 'ADMIN' | 'PENDING' | 'REQUEST' | 'APPROVED';
}

const AdminPage = () => {
  const router=useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('/api/profile/request');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const approveProfile = async (profileId: string) => {
    try {
      await axios.patch(`/api/profile/${profileId}`, { role: 'APPROVED' });
      setProfiles(profiles.map(profile =>
        profile.id === profileId ? { ...profile, role: 'APPROVED' } : profile
      ));
      router.refresh();
    } catch (error) {
      console.error('Error approving profile:', error);
    }
  };

  const deleteProfile = async (profileId: string) => {
    try {
      await axios.delete(`/api/profile/${profileId}`);
      setProfiles(profiles.filter(profile => profile.id !== profileId));
      router.refresh();
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      {profiles.map(profile => (
        <div key={profile.id}>
          <p>Name: {profile.name}</p>
          <p>Role: {profile.role}</p>
          <p>Image: 
                  <Image
                src={profile.imageUrl}
                width={50}
                height={50}
                alt="Image Item"
                className="object-cover"
           />
           </p>
          <p>Worker Proof Image:  
              <Image
                  src={profile.proofImageUrl}
                  width={50}
                  height={50}
                  alt="Image Item"
                  className="object-cover"
            />
           </p>

          {profile.role !== 'ADMIN' && (
          <button onClick={() => approveProfile(profile.id)}>Approve</button>
          )}
          {profile.role !== 'ADMIN' && (
            <button onClick={() => deleteProfile(profile.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminPage;

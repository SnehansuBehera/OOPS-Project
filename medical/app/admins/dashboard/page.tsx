"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Profile {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  proofImageUrl: string;
  role: 'ADMIN' | 'PENDING' | 'REQUEST' | 'APPROVED';
}

const AdminPage = () => {
  const router = useRouter();
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
    <div className='w-full'>
      <div className='py-2 px-6 rounded-md shadow-sm shadow-slate-400 bg-slate-400 w-[80%] mx-auto my-4'>
        <h1 className='font-bold text-[1.5rem] text-white'>Admin Page</h1>
      </div>

      {profiles.map(profile => (
        <div className='w-[80%] mx-auto flex gap-16 items-center justify-evenly px-4 rounded-md shadow-md shadow-slate-300 py-6' key={profile.id}>
          {/* 
          */}
          <div className='flex flex-col items-center justify-center gap-4'>
            <p>
              <Image
                src={profile.imageUrl}
                width={200}
                height={200}
                alt="Image Item"
                className="object-cover rounded-full w-[8rem]"
              />
            </p>
            <p className='font-bold text-[20px]'>{profile.name}</p>
          </div>

          <div className='py-20 border-l-2 border-gray-400'></div>
          <div className='flex flex-col items-center justify-center gap-4'>
            <p>
              <Image
                src={profile.proofImageUrl}
                width={200}
                height={200}
                alt="Image Item"
                className="object-cover rounded-lg w-[8rem]"
              />
            </p>
            <div className='py-2 px-4 rounded-md shadow-sm shadow-slate-400 '>
              <p className='font-bold text-[20px]'>{profile.role}</p>
            </div>

          </div>

          <div className='flex items-center justify-center gap-4'>
            {profile.role !== 'ADMIN' && (
              <button className='bg-green-400 text-white font-bold text-[16px] py-4 px-5 rounded-md ' onClick={() => approveProfile(profile.id)}>Approve</button>
            )}
            {profile.role !== 'ADMIN' && (
              <button className='bg-red-400 text-white font-bold text-[16px] py-4 px-5 rounded-md ' onClick={() => deleteProfile(profile.id)}>Delete</button>
            )}
          </div>

        </div>
      ))}
    </div>
  );
};

export default AdminPage;

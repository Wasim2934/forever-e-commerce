import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { shopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Profile = () => {
  const { backendUrl, token, navigate } = useContext(shopContext);
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/user/profile', {
          headers: { token },
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [backendUrl, token, navigate]);

  if (loading) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center text-gray-600 text-sm tracking-wide'>
        Loading profile...
      </div>
    );
  }

  return (
    <div className='min-h-[70vh] flex items-center justify-center py-12 px-4'>
      <div className='w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]'>
        <div className='bg-linear-to-r from-gray-900 via-gray-800 to-gray-700 px-8 py-8 text-white'>
          <div className='flex items-center gap-5'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm'>
              <img src={assets.profile_icon} alt='profile icon' className='h-8 w-8 object-contain invert' />
            </div>
            <div>
              <p className='text-xs uppercase tracking-[0.22em] text-gray-300'>Account</p>
              <h2 className='mt-1 text-3xl font-medium'>My Profile</h2>
            </div>
          </div>
        </div>

        <div className='p-8 md:p-10'>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='rounded-xl border border-gray-200 bg-gray-50 p-5'>
              <p className='text-xs font-medium uppercase tracking-[0.18em] text-gray-500'>Full Name</p>
              <p className='mt-3 text-xl font-medium text-gray-800'>{user.name}</p>
            </div>

            <div className='rounded-xl border border-gray-200 bg-gray-50 p-5'>
              <p className='text-xs font-medium uppercase tracking-[0.18em] text-gray-500'>Email</p>
              <p className='mt-3 break-all text-xl font-medium text-gray-800'>{user.email}</p>
            </div>
          </div>

          <div className='mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-5 text-sm text-gray-600'>
            Welcome back! Your account is active and ready to shop.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

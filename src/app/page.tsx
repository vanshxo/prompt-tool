
'use client';// app/page.tsx or pages/index.tsx (choose based on your setup)
import { useState, useEffect } from 'react';

import Loader from '../components/Loader';

import ChatArea from '@/components/chat';
const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading period (replace with actual data fetching logic)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center h-screen">
          
          <ChatArea />
          
        </div>
        
      )}
    </div>
  );
};

export default Home;

 

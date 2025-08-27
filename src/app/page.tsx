'use client';

import HomeClientWrapper from '@/components/HomeClientWrapper';
import WhoToFollow from '@/components/WhoToFollow';
import { getDbUserId } from '@/actions/user.action';
import { useEffect, useState } from 'react';

export default function Home() {
  const [dbUserId, setDbUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDbUserId = async () => {
      const id = await getDbUserId();
      setDbUserId(id);
    };
    fetchDbUserId();
  }, []);

  if (!dbUserId) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <HomeClientWrapper dbUserId={dbUserId} />
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}

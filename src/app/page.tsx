import { getDbUserId } from '@/actions/user.action';
import WhoToFollow from '@/components/WhoToFollow';
import HomeClientWrapper from '@/components/HomeClientWrapper';

export default async function Home() {
  let dbUserId: string | null = null;
  
  try {
    dbUserId = await getDbUserId();
  } catch (error) {
    // User is not authenticated, this is normal
    console.log('User not authenticated, continuing without dbUserId');
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <HomeClientWrapper dbUserId={dbUserId} />
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}

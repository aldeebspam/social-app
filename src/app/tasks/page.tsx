import WhoToFollow from '@/components/WhoToFollow';
import HomeClientWrapper from '@/components/HomeClientWrapper';

// Force dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic';

export default async function TasksPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <HomeClientWrapper dbUserId={null} />
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}

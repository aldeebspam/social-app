import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import WhoToFollow from "@/components/WhoToFollow";
import HomeContent from "@/components/HomeContent";

export default async function Home() {
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <HomeContent posts={posts} dbUserId={dbUserId} />
      </div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}
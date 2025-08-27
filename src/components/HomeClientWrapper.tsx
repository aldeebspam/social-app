'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getPosts } from '@/actions/post.action';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

type Post = Awaited<ReturnType<typeof getPosts>>[number];

export default function HomeClientWrapper({ dbUserId }: { dbUserId: string | null }) {
  const { isSignedIn, isLoaded } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [isSignedIn]);

  if (!isLoaded) {
    return <div className="lg:col-span-6 space-y-6">Loading...</div>;
  }

  return (
    <div className="lg:col-span-6 space-y-6">
      {isSignedIn ? <CreatePost /> : null}
      {posts.map(post => (
        <PostCard key={post.id} post={post} dbUserId={dbUserId} />
      ))}
    </div>
  );
}

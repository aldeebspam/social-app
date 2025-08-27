'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getPosts } from '@/actions/post.action';
import CreatePostWrapper from './CreatePostWrapper';
import PostCard from './PostCard';

// Define the Post type
type Post = Awaited<ReturnType<typeof getPosts>>[number];

export default function HomeClientWrapper({ dbUserId }: { dbUserId: string | null }) {
  const { isSignedIn } = useUser();
  const [posts, setPosts] = useState<Post[]>([]); // Fix: Add proper type

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [isSignedIn]);

  return (
    <div className="lg:col-span-6 space-y-6">
      <CreatePostWrapper />
      {posts.map(post => (
        <PostCard key={post.id} post={post} dbUserId={dbUserId} />
      ))}
    </div>
  );
}

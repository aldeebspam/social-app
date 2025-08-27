'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getPosts } from '@/actions/post.action';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

type Post = Awaited<ReturnType<typeof getPosts>>[number];

export default function HomeClientWrapper({ dbUserId }: { dbUserId: string | null }) {
  const { user, isLoaded } = useUser(); // Changed: use 'user' instead of 'isSignedIn'
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [user]); // Changed: depend on 'user' instead of 'isSignedIn'

  if (!isLoaded) {
    return <div className="lg:col-span-6 space-y-6">Loading...</div>;
  }

  return (
    <div className="lg:col-span-6 space-y-6">
      {user ? <CreatePost /> : null} {/* Changed: check 'user' instead of 'isSignedIn' */}
      {posts.map(post => (
        <PostCard key={post.id} post={post} dbUserId={dbUserId} />
      ))}
    </div>
  );
}

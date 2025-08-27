'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getPosts } from '@/actions/post.action';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

type Post = Awaited<ReturnType<typeof getPosts>>[number];

export default function HomeClientWrapper({ dbUserId }: { dbUserId: string | null }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  // Debug logging
  console.log('HomeClientWrapper render:', { 
    user: !!user, 
    isSignedIn, 
    isLoaded, 
    dbUserId 
  });

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
      {/* Debug info */}
      <div className="text-xs text-muted-foreground p-2 bg-muted rounded mb-4">
        Debug: User: {user ? 'Yes' : 'No'}, SignedIn: {isSignedIn ? 'Yes' : 'No'}, Loaded: {isLoaded ? 'Yes' : 'No'}
      </div>
      
      {isSignedIn ? <CreatePost /> : null}
      
      {posts.map(post => (
        <PostCard key={post.id} post={post} dbUserId={dbUserId} />
      ))}
    </div>
  );
}
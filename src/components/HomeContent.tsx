"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

type Post = any; // Replace with your actual post type

function HomeContent({ 
  posts, 
  dbUserId 
}: { 
  posts: Post[];
  dbUserId: string | null;
}) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [currentPosts, setCurrentPosts] = useState(posts);

  // Refresh posts when user signs in/out
  useEffect(() => {
    if (isLoaded) {
      // You can add logic here to refresh posts if needed
      // For now, we'll just use the initial posts
    }
  }, [isLoaded, isSignedIn]);

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {isSignedIn ? <CreatePost /> : null}
      
      <div className="space-y-6">
        {currentPosts.map((post) => (
          <PostCard key={post.id} post={post} dbUserId={dbUserId} />
        ))}
      </div>
    </>
  );
}

export default HomeContent;

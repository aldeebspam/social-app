"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

type Post = any; // Replace with your actual post type

function HomeContent({ 
  initialUser, 
  initialPosts, 
  dbUserId 
}: { 
  initialUser: any;
  initialPosts: Post[];
  dbUserId: string | null;
}) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [posts, setPosts] = useState(initialPosts);
  const [currentUser, setCurrentUser] = useState(initialUser);

  // Update current user when Clerk user state changes
  useEffect(() => {
    if (isLoaded) {
      setCurrentUser(user);
    }
  }, [user, isLoaded]);

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <>
        {initialUser ? <CreatePost /> : null}
        <div className="space-y-6">
          {initialPosts.map((post) => (
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
        {posts.map((post) => (
          <PostCard key={post.id} post={post} dbUserId={dbUserId} />
        ))}
      </div>
    </>
  );
}

export default HomeContent;

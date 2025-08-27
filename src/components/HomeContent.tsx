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
  const { user, isLoaded } = useUser();
  const [posts, setPosts] = useState(initialPosts);

  // Update posts when user changes
  useEffect(() => {
    if (isLoaded && user !== initialUser) {
      // Re-fetch posts or update state as needed
      // You might want to call an API endpoint here
    }
  }, [user, isLoaded, initialUser]);

  return (
    <>
      {user ? <CreatePost /> : null}
      
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} dbUserId={dbUserId} />
        ))}
      </div>
    </>
  );
}

export default HomeContent;

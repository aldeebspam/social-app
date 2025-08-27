'use client';
import { useUser } from '@clerk/nextjs';
import CreatePost from './CreatePost';

export default function CreatePostWrapper() {
  const { isSignedIn } = useUser();
  if (!isSignedIn) return null;
  return <CreatePost />;
}

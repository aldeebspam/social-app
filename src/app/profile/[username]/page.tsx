import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";
import type { Metadata, ResolvingMetadata } from "next";

// ✅ خليه object عادي مش Promise
type PageProps = {
  params: {
    username: string;
  };
};

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = params; // ✅ من غير await
  const user = await getProfileByUsername(username);

  if (!user) {
    return {
      title: "User not found",
    };
  }

  return {
    title: user.name ?? user.username,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = params; // ✅ من غير await
  const user = await getProfileByUsername(username);

  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}

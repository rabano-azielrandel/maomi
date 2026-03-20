import { create } from "domain";
import { createClient } from "../supabase/server";
import { User } from "@/types/profile/user";

export async function getUserData() {
    const supabase = await createClient();

    const {data: {user}, error: userError} = await supabase.auth.getUser();

    if (userError  || !user) throw new Error(userError?.message || "User not found");

    const { data, error: profileError } = await supabase
    .schema("maomi")
    .from("profiles")
    .select("username, display_name, avatar_url, bio, created_at")
    .eq('id', user.id)
    .single();

    if(profileError) throw new Error(profileError.message);

    return data as User;
}

export async function getUserPostCount() {
    const supabase = await createClient();

    const {data: {user}, error: userError} = await supabase.auth.getUser();

    if (userError || !user) throw new Error(userError?.message || "User not found");

    const {count, error: countError} = await supabase
    .schema("maomi")
    .from("posts")
    .select('*', {count: 'exact'})
    .eq('id', user.id)

    if (countError) throw new Error (countError.message);

    return count ?? 0;
}

export async function getUserFollow(userId: string) {
  const supabase = await createClient();

  // followers (people who follow this user)
  const { count: followers, error: followersError } = await supabase
    .schema("maomi")
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);

  if (followersError) throw new Error(followersError.message);

  // following (people this user follows)
  const { count: following, error: followingError } = await supabase
    .schema("maomi")
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId);

  if (followingError) throw new Error(followingError.message);

  return {
    followers: followers ?? 0,
    following: following ?? 0,
  };
}
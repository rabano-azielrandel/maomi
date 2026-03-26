import { create } from "domain";
import { createClient } from "../supabase/server";
import { User, UpdateUser } from "@/types/profile/user";

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
  const { count: follower, error: followersError } = await supabase
    .schema("maomi")
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);

  if (followersError) throw new Error(followersError?.message || "Followers Error");

  // following (people this user follows)
  const { count: following, error: followingError } = await supabase
    .schema("maomi")
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId);

  if (followingError) throw new Error(followingError?.message || "Following Error");

  return {
    follower: follower ?? 0,
    following: following ?? 0,
  };
}

export async function updateUserProfile(data: Partial<UpdateUser>) {
  const supabase = await createClient();

  const {data: {user}, error: userError} = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error(userError?.message || "User not found");
  }

  // 1. Prepare update object (only include defined values)
  const updatePayload: Record<string, any> = {};

  if (data.username !== undefined) updatePayload.username = data.username;
  if (data.display_name !== undefined) updatePayload.display_name = data.display_name;
  if (data.bio !== undefined) updatePayload.bio = data.bio;

  // 2. Handle avatar upload
  if (data.avatar_file instanceof File) {
    const filePath = `avatars/${user.id}-${Date.now()}`;

    const { error: uploadError } = await supabase.storage
      .from("maomi-media")
      .upload(filePath, data.avatar_file);

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicUrl } = supabase.storage
      .from("maomi-media")
      .getPublicUrl(filePath);

    updatePayload.avatar_url = publicUrl.publicUrl;
  }

  // 3. Handle banner upload
  if (data.banner_file instanceof File) {
    const filePath = `banners/${user.id}-${Date.now()}`;

    const { error: uploadError } = await supabase.storage
      .from("maomi-media")
      .upload(filePath, data.banner_file);

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicUrl } = supabase.storage
      .from("maomi-media")
      .getPublicUrl(filePath);

    updatePayload.banner_url = publicUrl.publicUrl;
  }

  // 4. Always update timestamp
  updatePayload.updated_at = new Date().toISOString();

  // 5. Prevent empty update
  if (Object.keys(updatePayload).length === 0) {
    throw new Error("No fields to update");
  }

  // 6. Run update
  const { data: updateData, error: updateError } = await supabase
    .schema("maomi")
    .from("profiles")
    .update(updatePayload)
    .eq("id", user.id)
    .select()
    .single();

  if (updateError) throw new Error(updateError.message);

  return updateData;
}
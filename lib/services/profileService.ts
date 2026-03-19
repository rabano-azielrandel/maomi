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
    .select("username, display_name, avatar_url, bio")
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
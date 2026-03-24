import { createClient } from "../supabase/server";
import { CreatePostInput } from "@/types/feed/post-type";

export async function createPost(input: CreatePostInput) {
  const supabase = await createClient();

  const { userId, content, files } = input;

  // 1. Insert post
  const { data: post, error } = await supabase
    .schema("maomi")
    .from("posts")
    .insert({
      user_id: userId,
      content: content || null
    })
    .select()
    .single();

  if (error) throw error;

  // 2. If no file → done
  if (!files || files.length === 0) {
    return post;
  }

  // 3. Loop through files
  for (const file of files) {
    const filePath = `posts/${userId}/${Date.now()}-${file.name}`;

    const blob = new Blob([file.buffer], { type: file.type });
    
    // Upload file
    const { error: uploadError } = await supabase.storage
      .from("maomi-media")
      .upload(filePath, blob);

    if (uploadError) {
      console.error("UPLOAD ERROR FULL:", uploadError);
      throw uploadError;
    }
    const { data } = supabase.storage.from("maomi-media").getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    const { error: mediaError } = await supabase
      .schema("maomi")
      .from("media")
      .insert({
        post_id: post.id,
        user_id: userId,
        url: publicUrl,
        media_type: file.type.startsWith("video") ? "video" : "image",
      });

    if (mediaError) throw mediaError;
  }
  return post;
}




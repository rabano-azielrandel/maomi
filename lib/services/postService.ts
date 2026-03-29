import { createClient } from "../supabase/server";
import { CreatePostInput, PostCards } from "@/types/feed/post-type";

export async function createPost(input: CreatePostInput) {
  const supabase = await createClient();

  const { userId, content, files, link } = input;

  // 1️ CREATE THE MAIN POST
  const { data: post, error: postError } = await supabase
    .schema("maomi")
    .from("posts")
    .insert({
      user_id: userId,
      content: content || null,
    })
    .select()
    .single();

  if (postError) throw postError;

  // 2️ HANDLE MEDIA FILES (images/videos)
  if (files && files.length > 0) {
    for (const file of files) {
      const filePath = `posts/${userId}/${Date.now()}-${file.name}`;
      const blob = new Blob([file.buffer], { type: file.type });

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("maomi-media")
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("maomi-media")
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      // Insert into media table
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
  }

  // 3️ HANDLE LINK (optional) Only links have thumbnails
  if (link) {
    const { url, title, description, thumbnail } = link;
    let thumbnailUrl: string | null = null;

    if (thumbnail) {
      const filePath = `links/${userId}/${Date.now()}-${thumbnail.name}`;
      const blob = new Blob([thumbnail.buffer], { type: thumbnail.type });

      // Upload thumbnail
      const { error: uploadError } = await supabase.storage
        .from("maomi-media")
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("maomi-media")
        .getPublicUrl(filePath);

      thumbnailUrl = data.publicUrl;
    }

    // Insert link metadata
    const { error: linkError } = await supabase
      .schema("maomi")
      .from("links")
      .insert({
        post_id: post.id,
        url,
        title: title ?? null,
        description: description ?? null,
        thumbnail_url: thumbnailUrl,
      });

    if (linkError) throw linkError;
  }

  // 4️ RETURN POST
  return post;
}

export async function getPosts(){
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) throw new Error(userError?.message ?? "User not found");

  const { data, error } = await supabase
  .rpc('get_posts_with_media', {p_user_id: user.id});

  if (error) throw new Error(error?.message ?? "Fetch posts failed");

  return data as PostCards[];
}


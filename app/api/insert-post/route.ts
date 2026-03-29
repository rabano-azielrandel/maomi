import { NextRequest, NextResponse } from "next/server";
import { createPost } from "@/lib/services/postService";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error(userError?.message ?? "Unauthorized");

    const formData = await req.formData();

    const content = formData.get("content") as string;

    const filesData: FormDataEntryValue[] = formData.getAll("files");

    const linkUrl = formData.get("link_url") as string | null;
    const linkTitle = formData.get("link_title") as string | null;
    const linkDesc = formData.get("link_desc") as string | null;
    const linkThumbnail = formData.get("link_thumbnail") as File | null;

    // Convert to proper File-like objects
    const files: { buffer: ArrayBuffer; name: string; type: string }[] = [];

    for (const file of filesData) {
      if (file instanceof File) {
        const buffer = await file.arrayBuffer();
        files.push({ buffer, name: file.name, type: file.type });
      }
    }

    let linkThumbnailFile = null;

    if (linkThumbnail instanceof File) {
      const buffer = await linkThumbnail.arrayBuffer();

      linkThumbnailFile = {
        buffer,
        name: linkThumbnail.name,
        type: linkThumbnail.type,
      };
    }

    const post = await createPost({
      userId: user.id,
      content,
      files,
      link: linkUrl
        ? {
            url: linkUrl,
            title: linkTitle,
            description: linkDesc,
            thumbnail: linkThumbnailFile,
          }
        : null,
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.log("route catch: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
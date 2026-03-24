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

    // Convert to proper File-like objects
    const files: { buffer: ArrayBuffer; name: string; type: string }[] = [];

    for (const file of filesData) {
      if (file instanceof File) {
        const buffer = await file.arrayBuffer();
        files.push({ buffer, name: file.name, type: file.type });
      }
    }

    const post = await createPost({
      userId: user.id,
      content,
      files,
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.log("route catch: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
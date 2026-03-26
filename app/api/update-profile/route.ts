import { NextResponse, NextRequest } from "next/server";
import { updateUserProfile } from "@/lib/services/profileService";
import { UpdateUser } from "@/types/profile/user";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const avatarFile = formData.get("avatar_file");
    const bannerFile = formData.get("banner_file");

    // Extract values properly
    const data: UpdateUser = {
      username: formData.get("username") as string | null,
      display_name: formData.get("display_name") as string | null,
      bio: formData.get("bio") as string | null,

      avatar_file: avatarFile instanceof File ? avatarFile : undefined,
      banner_file: bannerFile instanceof File ? bannerFile : undefined,
    };

    // Clean undefined / empty values
    Object.keys(data).forEach((key) => {
      const k = key as keyof UpdateUser;
      if (
        data[k] === null ||
        data[k] === "" ||
        (data[k] instanceof File && data[k].size === 0)
      ) {
        delete data[k];
      }
    });

    const result = await updateUserProfile(data);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
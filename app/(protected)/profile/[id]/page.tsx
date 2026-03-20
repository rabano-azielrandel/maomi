import ProfileContent from "./profilecontent";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-4 relative">
      <Suspense
        fallback={
          <div className="h-screen flex centerXY">Loading profile...</div>
        }
      >
        <ProfileContent userID={id} />
      </Suspense>
    </div>
  );
}

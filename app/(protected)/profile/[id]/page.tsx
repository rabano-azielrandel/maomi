import ProfileContent from "./profilecontent";
import { Suspense } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="flex flex-col gap-4 relative">
      <Suspense
        fallback={
          <div className="h-screen flex centerXY">Loading profile...</div>
        }
      >
        <ProfileWrapper params={params} />
      </Suspense>
    </div>
  );
}

async function ProfileWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ProfileContent userID={id} />;
}

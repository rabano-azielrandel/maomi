import ProfileContent from "./profilecontent";
import { Suspense } from "react";

export default async function page() {
  return (
    <div className="flex flex-col gap-4 relative">
      <Suspense
        fallback={
          <div className="h-screen flex centerXY">Loading profile...</div>
        }
      >
        <ProfileContent />
      </Suspense>
    </div>
  );
}

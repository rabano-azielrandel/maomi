import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

import PrimarySidebar from "@/components/primary-sidebar";
import SecondarySidebar from "@/components/secondary-sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex flex-col items-center">
      <div className="flex-1 w-full max-w-screen-xl flex overflow-hidden">
        <div className="flex-[2] min-h-screen flex flex-col p-4">
          <PrimarySidebar />
        </div>
        <div className="flex-[6] min-h-screen">{children}</div>
        <div className="flex-[3] min-h-screen flex flex-col p-4 overflow-y-auto">
          <SecondarySidebar />
        </div>
      </div>
    </main>
  );
}

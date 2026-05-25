import { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <WhatsAppButton />
    </>
  );
}

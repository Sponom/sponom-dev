import SiteShell, { siteMetadata } from "@/components/SiteShell";
import "../globals.css";

export const metadata = siteMetadata("en");

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}

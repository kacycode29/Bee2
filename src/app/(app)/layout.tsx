import { requireActiveLicense } from "@/lib/session";
import { AppShell } from "@/components/layout/AppShell";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireActiveLicense();
  return <AppShell isAdmin={user.role === "ADMIN"}>{children}</AppShell>;
}

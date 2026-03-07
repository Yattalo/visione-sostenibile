import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminShell from "./AdminShell";

export const dynamic = "force-dynamic";

function parseEmailList(input?: string) {
  if (!input) return [];
  return input
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function getSessionEmail(sessionClaims: Record<string, unknown> | null | undefined) {
  if (!sessionClaims) return "";

  const candidates = [
    sessionClaims.email,
    sessionClaims.email_address,
    sessionClaims.primary_email_address,
  ];

  const firstEmail = candidates.find((value): value is string => typeof value === "string");
  return firstEmail?.trim().toLowerCase() ?? "";
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, redirectToSignIn, sessionClaims } = await auth();

  if (!userId) {
    return redirectToSignIn({ returnBackUrl: "/admin" });
  }

  const allowlist = new Set([
    ...parseEmailList(process.env.ADMIN_EMAILS),
    ...parseEmailList(process.env.ADMIN_NOTIFICATION_EMAIL),
  ]);
  const sessionEmail = getSessionEmail(sessionClaims as Record<string, unknown> | null | undefined);

  if (allowlist.size > 0 && sessionEmail && !allowlist.has(sessionEmail)) {
    redirect("/");
  }

  return <AdminShell>{children}</AdminShell>;
}

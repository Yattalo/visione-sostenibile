import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AreaPrivataShell } from "./AreaPrivataShell";

export const dynamic = "force-dynamic";

export default async function AreaPrivataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/area-privata");
  }

  const user = await currentUser();

  return (
    <AreaPrivataShell
      userName={user?.firstName ?? user?.username ?? "Utente"}
      userImageUrl={user?.imageUrl}
    >
      {children}
    </AreaPrivataShell>
  );
}

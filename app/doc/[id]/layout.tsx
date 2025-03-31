import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

export default async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  // Ensures `params` is awaited
  const id = params.id;

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

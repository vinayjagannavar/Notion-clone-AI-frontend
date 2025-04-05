import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

export default async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>; // important!
}) {
  const { id } = await params; // ✅ unwrap the Promise here

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

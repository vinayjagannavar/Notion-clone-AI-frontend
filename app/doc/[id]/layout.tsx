import RoomProvider from "@/components/RoomProvider";

export default async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>; // ✅ Note: Promise
}) {
  const { id } = await params; // ✅ Await the params

  

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

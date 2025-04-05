'use client'
import { useRoom,useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import {LiveblocksYjsProvider} from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import "@blocknote/core/fonts/inter.css"
import "@blocknote/shadcn/style.css"
import stringToColor from "@/lib/stringToColor";
import { useCreateBlockNote} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import TranslateDocument from "./TranslateDocument";

type EditorProps = {
    doc: Y.Doc;
    provider: any;
    darkMode: boolean;
};

function BlockNote({doc, provider, darkMode} : EditorProps) {
    const userInfo = useSelf((me) => me.info);

    const editor = useCreateBlockNote({
        collaboration: {
          provider,
          fragment: doc.getXmlFragment("document-store"),
          user: {
            name: userInfo?.name ?? "Anonymous",
            color: stringToColor(userInfo?.email ?? "anon@example.com"),
          },
        },
      });
  return (
    <div className="relative max-w-6xl mx-auto">
        <BlockNoteView
        className="min-h-screen"
        editor={editor}
        theme={darkMode?"dark":"light"}
        />
    </div>
  )
}

function Editor() {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(()=>{
        
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);

        console.log("Room status:", room.getStatus());
        yProvider.on("synced", (isSynced: boolean) => {
            console.log("Yjs synced?", isSynced);
          });

        setDoc(yDoc);
        setProvider(yProvider);

        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
        }
    },[room])

    if (!doc || !provider){
        return null;
    }

    const style = `hover:text-white ${
        darkMode
          ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
          : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
      }`;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 justify-end mb-10">
                {/* TranslateDocument AI */}
                <TranslateDocument doc={doc} />
                {/* ChatToDocument AI */}

                {/* Dark Mode */}
                <Button className={style} onClick={() => setDarkMode(!darkMode)}>
                    {darkMode? <SunIcon/> : <MoonIcon/>}
                </Button>
            </div>

            {/* BlockNote */}
            <BlockNote doc={doc} provider={provider} darkMode={darkMode}/>
        </div>
    )
}
export default Editor
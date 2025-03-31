'use client'

import { useMyPresence, useOthers } from "@liveblocks/react";
import { PointerEvent } from "react";
import FollowPointer from "./FollowPointer";

function LiveCursorProvider({ children }: {
    children: React.ReactNode;
}) {
    const [myPresence, updateMyPresence] = useMyPresence();
    const others = useOthers();

    function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
        const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
        updateMyPresence({ cursor });
    }

    function handlePointerLeave() {
        updateMyPresence({ cursor: null });
    }

    return (
        <div onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            {others
                .filter((other) => other.presence?.cursor)
                .map((other) => (
                    <FollowPointer
                        key={other.connectionId}
                        info={other.info}
                        x={other.presence!.cursor!.x}
                        y={other.presence!.cursor!.y}
                    />
                ))}
            {children}
        </div>
    )
}
export default LiveCursorProvider
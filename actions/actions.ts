'use server';

import { admindb } from "@/firebase-admin";
import liveblocks from "@/lib/liveBlock";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
    //auth().protect();

    const { sessionClaims } = await auth();

    const docCollectionRef = admindb.collection("documents");

    const docRef = await docCollectionRef.add({
        title: "New Doc"
    })

    await admindb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id,
    });

    return {docId: docRef.id};
}

export async function deleteDocument(roomId : string){
    //auth().protect();

    try {
        await admindb.collection("documents").doc(roomId).delete();

        const query = await admindb
        .collectionGroup("rooms")
        .where("roomId", "==", roomId)
        .get();

        const batch = admindb.batch();

        query.docs.forEach((doc) => {
            batch.delete(doc.ref);
        })

        await batch.commit();

        await liveblocks.deleteRoom(roomId);

        return {success: true};

    } catch(error) {
        console.error(error);
        return {success : false};
    }
}
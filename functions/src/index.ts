import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();


const firestore = admin.firestore();


export const addMessage = functions.https.onCall(async (data, context) => {
    const message = {
      "foo": "bar"
    };

    await firestore.collection("messages").add(message);

    const allMessagesSnapshot = await firestore.collection("messages").get();

    const messageStrings = allMessagesSnapshot.docs.map(doc => doc.data());

    return {
      "messages": messageStrings
    };
});

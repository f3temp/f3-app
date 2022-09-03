import { CallableContext } from "firebase-functions/v1/https"
import * as firebaseAdmin from "firebase-admin"

const firestore = firebaseAdmin.firestore()

import {
    AddMessageInputs,
    AddMessageResult
} from "./api-interfaces"

const apiHandlersByName = new Map<string, (data: any, context: CallableContext) => any>()

function registerApiHandler(name: string, handler: (data: any, context: CallableContext) => any) {
    apiHandlersByName.set(name, handler)
}

registerApiHandler("addMessage", async (inputs: AddMessageInputs, conext): Promise<AddMessageResult> => {
    const message = {
        "text": inputs.text
    }

    await firestore.collection("messages").add(message)

    const allMessagesSnapshot = await firestore.collection("messages").get()

    const messageStrings = allMessagesSnapshot.docs.map(doc => doc.data())

    return {
        "messages": messageStrings
    }
})

registerApiHandler("clearMessages", async (data, conext) => {
    await firestore.recursiveDelete(firestore.collection("messages"))

    return {}
})

export default apiHandlersByName
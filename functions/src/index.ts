import * as functions from "firebase-functions"
import * as firebaseAdmin from "firebase-admin"

firebaseAdmin.initializeApp()

import apiHandlersByName from "./api-handlers"

export const api = functions.https.onCall(async (data, context) => {
  const name = data.name
  const inputs = data.inputs

  functions.logger.info("Got API request: " + name, ", inputs: ", inputs)

  const handler = apiHandlersByName.get(name)

  if (!handler) {
    return {
      "failure": `No API handler for name ${name}, all options are: ${JSON.stringify(apiHandlersByName.keys)} foo`
    }
  }

  try {
    const result = await handler(inputs, context)

    return {
      "success": result
    }
  } catch (error) {
    return {
      "failure": "An error occurred."
    }
  }
})

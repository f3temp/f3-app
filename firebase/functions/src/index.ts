import * as functions from "firebase-functions";

const region = functions.region("us-west2");

export const helloWorld = region.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

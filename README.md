# F3 App

## Overview
Web app built in React with Typescript.
Backend logic is also written in Typescript.

Web app is served by Firebase Hosting.
Backend logic is on Firebase Cloud Functions.
Database is Firebase Firestore.

#

## Local iteration

Build functions
From f3-app/functions `npm run build`

Start Firebase emulators:
From f3-app/ run `firebase emulators:start`

Start local React iteration server, pointed at emulators:
From f3-app/web/ run `npm run start`


## Setup Firebase credentials
From f3-app/ run `firebase login`

## Deploy to Firebase
From f3-app/ run `firebase deploy`


#

### Why a single function called "api"?
In order to avoid CORS issues, I'm routing function invocation HTTP requests through the Firebase Hosting server.
This is configured in firebase.json/hosting/rewrites.
I haven't found a way to configure a wildcard redirect for function invocations.
To avoid a workflow where we have to modify firebase.json every time we modify a function, I'm seeing if we can get away
with just considering our api to be a function, and use data within the function invocation to route to different API
handlers.


import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';

import Text from 'src/components/Text';
import type { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react'



// Firebase Demo

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, Firestore, DocumentData, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, signInAnonymously, connectAuthEmulator } from "firebase/auth"
import { getFunctions, httpsCallable, connectFunctionsEmulator, Functions } from "firebase/functions"

import {
  AddMessageInputs,
  AddMessageResult
} from "src/../../../functions/src/api-interfaces"

const firebaseConfig = {
  apiKey: "AIzaSyA8c7S9GuMLZI9Wd3ioG0_g6vTR_G7pC_E",
  authDomain: "f3demo-1e9ca.firebaseapp.com",
  projectId: "f3demo-1e9ca",
  storageBucket: "f3demo-1e9ca.appspot.com",
  messagingSenderId: "139030022891",
  appId: "1:139030022891:web:2f65b03f4233b2b6830cae",
  measurementId: "G-97J7M9J9WS"
}


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const shouldUseFirebaseEmulators = process.env.NODE_ENV === "development"

const mainUrl = "https://f3demo-1e9ca.web.app"

const functions = shouldUseFirebaseEmulators
  ? getFunctions(app)
  : getFunctions(app, mainUrl)

const auth = getAuth(app)

if (shouldUseFirebaseEmulators) {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectFunctionsEmulator(functions, "localhost", 5001)
  connectAuthEmulator(auth, "http://localhost:9099")
}

export const authenticateAnonymously = () => {
  return signInAnonymously(auth)
}

const apiCallable = httpsCallable(functions, 'api')

async function api<INPUTS, RESULT>(name: string, inputs: INPUTS): Promise<RESULT> {
  console.log("Sending API request:", name, inputs)

  return apiCallable({
    name: name,
    inputs: inputs
  }).then(result => {
    const data: any = result.data
    console.log("Got API result:", {
      "name ": name,
      "inputs": inputs,
      "response": data
    })

    if (data.success != undefined) {
      return data.success
    }

    return result
  })
}


const getMessages = async () => {
  const messagesCollection = collection(db, 'messages')
  const messageDocs = await getDocs(messagesCollection)
  const messages = messageDocs.docs.map(doc => doc.data())
  return messages
}

/// ====


const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
    };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function FirebaseDemo() {
  const theme = useTheme();


  const [userId, setUserId] = useState<string>()
  const [messages, setMessages] = useState<string[]>([])

  const refreshMessages = () => {
    getMessages().then(messages => {
      setMessages(messages.map(it => JSON.stringify(it)))
    })
  }

  useEffect(() => {
    console.log("call authenticateAnonymously")
    authenticateAnonymously().then(userCredential => {
      console.log("got userCredential.user.uid: " + userCredential.user.uid)
      setUserId(userCredential.user.uid)
    })
  }, [])

  useEffect(() => {
    if (userId != null) {
      refreshMessages()
    }
  }, [userId])


  const handleAddMessageClick = () => {
    api<AddMessageInputs, AddMessageResult>("addMessage", {
      text: "Cool message text"
    }).then(result => {
      refreshMessages()
    })
  }

  const handleClearMessagesClick = () => {
    api("clearMessages", {}).then(result => {
      refreshMessages()
    })
  }

  const notLoggedInContent = <Grid spacing={0} container>
    <Grid item xs={12} md={6}>
      <Box p={4}>
        <Typography
          sx={{
            pb: 3
          }}
          variant="h4"
        >
          Firebase Demo (Authenticating...)
        </Typography>
      </Box>
    </Grid>
  </Grid>

  const loggedInContent = <Grid spacing={0} container>
    <Grid item xs={12} md={6}>
      <Box p={4}>
        <Typography
          sx={{
            pb: 3
          }}
          variant="h4"
        >
          Firebase Demo
        </Typography>
        <Box>

        </Box>
        <Grid container spacing={3}>
          <Grid sm item>
            <Button fullWidth variant="outlined" onClick={handleAddMessageClick}>
              Add Message
            </Button>
          </Grid>
          <Grid sm item>
            <Button fullWidth variant="contained" onClick={handleClearMessagesClick}>
              Clear Messages
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
    <Grid
      sx={{
        position: 'relative'
      }}
      display="flex"
      alignItems="center"
      item
      xs={12}
      md={6}
    >
      <Box
        component="span"
        sx={{
          display: { xs: 'none', md: 'inline-block' }
        }}
      >
        <Divider absolute orientation="vertical" />
      </Box>
      <Box py={4} pr={4} flex={1}>
        <Grid container spacing={0}>

          <Grid xs={12} sm={7} item display="flex" alignItems="center">
            <List
              disablePadding
              sx={{
                width: '100%',
                margin: 1
              }}
            >
              {
                messages.map((message, index) => <ListItem disableGutters
                  key={`message-${index}`}
                >
                  <ListItemText
                    primary={message}
                    primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                    secondary="Message"
                    secondaryTypographyProps={{
                      variant: 'subtitle2',
                      noWrap: true
                    }}
                  />
                </ListItem>)
              }
            </List>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  </Grid>

  return (
    <Card>
      {userId ? loggedInContent : notLoggedInContent}
    </Card>
  );
}

export default FirebaseDemo;

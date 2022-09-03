import React, { useEffect, useState } from 'react'
import './App.css'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, Firestore, DocumentData, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, signInAnonymously, connectAuthEmulator } from "firebase/auth"
import { getFunctions, httpsCallable, connectFunctionsEmulator, Functions } from "firebase/functions"

import Button from '@mui/material/Button'

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';

import {
  AddMessageInputs,
  AddMessageResult
} from "../../../functions/src/api-interfaces"

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
const auth = getAuth(app)
const db = getFirestore(app)

const shouldUseFirebaseEmulators = process.env.NODE_ENV === "development"

const mainUrl = "https://f3demo-1e9ca.web.app"

const functions = shouldUseFirebaseEmulators
  ? getFunctions(app)
  : getFunctions(app, mainUrl)

if (shouldUseFirebaseEmulators) {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectFunctionsEmulator(functions, "localhost", 5001)
  connectAuthEmulator(auth, "http://localhost:9099")
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


export const authenticateAnonymously = () => {
  return signInAnonymously(auth)
}

const getMessages = async () => {
  const messagesCollection = collection(db, 'messages')
  const messageDocs = await getDocs(messagesCollection)
  const messages = messageDocs.docs.map(doc => doc.data())
  return messages
}



const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();


function App() {
  const [userId, setUserId] = useState<string>()
  const [messages, setMessages] = useState<string[]>([])

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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

  const mainListItems = (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </React.Fragment>
  );

  const secondaryListItems = (
    <React.Fragment>
      {/* <ListSubheader component="div" inset>
        Other
      </ListSubheader> */}
    </React.Fragment>
  );

  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                F3 App
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={14} md={8} lg={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 600,
                    }}
                  >
                    <Typography>
                      Messages
                    </Typography>

                    <Button
                      variant="contained"
                      onClick={handleClearMessagesClick}
                    >
                      Clear Messages
                    </Button>

                    {
                      messages.map((message, index) => <Typography
                        key={`message-${index}`}
                      >
                        {message}
                      </Typography>)
                    }

                    <Button
                      variant="contained"
                      onClick={handleAddMessageClick}
                    >
                      Add Message
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default App

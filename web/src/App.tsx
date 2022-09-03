import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, DocumentData, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, signInAnonymously, connectAuthEmulator} from "firebase/auth";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";



const firebaseConfig = {
  apiKey: "AIzaSyA8c7S9GuMLZI9Wd3ioG0_g6vTR_G7pC_E",
  authDomain: "f3demo-1e9ca.firebaseapp.com",
  projectId: "f3demo-1e9ca",
  storageBucket: "f3demo-1e9ca.appspot.com",
  messagingSenderId: "139030022891",
  appId: "1:139030022891:web:2f65b03f4233b2b6830cae",
  measurementId: "G-97J7M9J9WS"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app, "https://f3demo-1e9ca.web.app");

// connectFirestoreEmulator(db, 'localhost', 8080)
// connectFunctionsEmulator(functions, "localhost", 5001);
// connectAuthEmulator(auth, "http://localhost:9099");


const addMessage = httpsCallable(functions, 'addMessage');

export const authenticateAnonymously = () => {
  return signInAnonymously(auth);
};

const getMessages = async () => {
  const messagesCollection = collection(db, 'messages');
  const messageDocs = await getDocs(messagesCollection);
  const messages = messageDocs.docs.map(doc => doc.data());
  return messages;
}

function App() {
  const [userId, setUserId] = useState<string>();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    console.log("call authenticateAnonymously")
    authenticateAnonymously().then(userCredential => {
      console.log("got userCredential.user.uid: " + userCredential.user.uid)
      setUserId(userCredential.user.uid);
    });
  }, [])

  useEffect(() => {
    if (userId != null) {
      getMessages().then(messages => {
        setMessages(messages.map(it => JSON.stringify(it)))
      })
    }
  }, [userId])

  const handleClick = () => {
    console.log("handleClick calling addMessage")
    addMessage({}).then(result => {
      console.log("Got addMessage result")
      getMessages().then(messages => {
        setMessages(messages.map(it => JSON.stringify(it)))
      })
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Messages:
        </p>
        {
          messages.map(message => <div key={message}>
            {message}
          </div>)
        }

      <button type="button" onClick={handleClick}>
        Click Me
      </button>
      </header>
    </div>
  );
}

export default App;

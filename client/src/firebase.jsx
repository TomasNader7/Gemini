import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { gapi } from 'gapi-script';
import firebaseConfig from "./config/firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const initializeGapi = () => {
    gapi.load("client:auth2", () => {
        gapi.client
            .init({
                clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Ensure the environment variable is correct
                scope: "email profile openid", // Include necessary scopes
            })
            .then(() => {
                console.log("Google API initialized successfully.");
            })
            .catch((error) => {
                console.error("Error initializing Google API:", error);
            });
    });
};

export { auth, db };

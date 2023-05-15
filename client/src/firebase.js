import firebase from "firebase/compat/app";
import "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Add Firebase storage
import "firebase/compat/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDAhXwUiBsnKziKXBaHesaKWcQxUdemxTk",
    authDomain: "code-crafters64.firebaseapp.com",
    projectId: "code-crafters64",
    storageBucket: "code-crafters64.appspot.com",
    messagingSenderId: "929034672141",
    appId: "1:929034672141:web:65d6dd23a6a7df5c9a5d44",
    measurementId: "G-FMGPD7L7K1"
  };
  
const app = ​​initializeApp(firebaseConfig);
​​const  auth = getAuth(app);
​​const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const logout = () => {
    signOut(auth);
  };
  export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };
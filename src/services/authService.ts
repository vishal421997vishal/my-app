import {auth} from "./firebase/firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut, UserCredential,} from "firebase/auth";

// Function to register a new user with email and password
export const registerUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

// Function to login a user with email and password
export const loginUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Function to logout the current user
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

// Example function to get the current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

export const onAuthChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};
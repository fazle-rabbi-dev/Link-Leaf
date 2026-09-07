// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyBiaLnV6RlfHQbahdwDjWhloyGMH5klSQs',
   authDomain: 'link-leaf-fr.firebaseapp.com',
   projectId: 'link-leaf-fr',
   storageBucket: 'link-leaf-fr.firebasestorage.app',
   messagingSenderId: '866905004908',
   appId: '1:866905004908:web:33de622794b92628973149',
};

// Ensure we don't re-initialize the app on hot reloads
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Silence harmless Firebase IndexedDB error when tab is hidden/HMR
// "Database is closing/hidden" is thrown as unhandledRejection
if (typeof window !== 'undefined') {
   window.addEventListener('unhandledrejection', (e) => {
      if (e.reason?.message?.includes('Database is closing/hidden')) {
         e.preventDefault();
      }
   });
}

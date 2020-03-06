import { useEffect } from 'react';
import firebase, { auth } from '../services/firebase';

const githubProvider = new firebase.auth.GithubAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default (callback) => {
  useEffect(() => {
    const getResult = async () => {
      const result = await auth.getRedirectResult();
      callback(result);
    };

    getResult();

  }, []);

  const signInWithGitHub = () => {
    auth.signInWithRedirect(githubProvider);
  };

  const signInWithGoogle = () => {
    auth.signInWithRedirect(googleProvider);
  };

  return {
    signInWithGitHub,
    signInWithGoogle
  };
};
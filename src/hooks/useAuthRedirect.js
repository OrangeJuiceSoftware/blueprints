import { useState, useEffect } from 'react';
import firebase, { auth } from '../services/firebase';

const githubProvider = new firebase.auth.GithubAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default () => {
  const [result, setResult] = useState();
  const [redirectError, setRedirectError] = useState();

  useEffect(() => {
    auth.getRedirectResult()
      .then(setResult)
      .catch(setRedirectError);
  }, []);

  const signInWithGitHub = () => {
    auth.signInWithRedirect(githubProvider);
  };

  const signInWithGoogle = () => {
    auth.signInWithRedirect(googleProvider);
  };

  return [
    result,
    redirectError,
    {
      signInWithGitHub,
      signInWithGoogle
    }
  ];
};
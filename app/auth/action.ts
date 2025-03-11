
import { signIn, signOut } from "next-auth/react";

export const GoogleSignIn = async () => {
  try {
    await signIn("google");
  } catch (error) {
    throw error;
  }
};

export const authSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
};
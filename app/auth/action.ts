
import { signIn } from "next-auth/react";

export const GoogleSignIn=async()=>{
try{
  await signIn("google");
}
catch(error){
    throw error;
}
}
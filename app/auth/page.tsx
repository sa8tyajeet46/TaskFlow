"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { GoogleSignIn } from './action';

function page() {
    const handleGoogleSignIn=async (e:React.MouseEvent)=>{
        e.preventDefault();
        try{
          await GoogleSignIn();
        }catch(error:any){
            throw new Error(error?.message || "Internal server Error");
        }
    }
  return (
    <div>
        <Button variant="ghost" onClick={handleGoogleSignIn}>Sign in with Google</Button>
    </div>
  )
}

export default page
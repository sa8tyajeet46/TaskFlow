"use client"
import acceptOrganizationInvite from '@/app/api/organization/acceptOrganizationInvite'
import { Button } from '@/components/ui/button'
import React, { useCallback } from 'react'
import { toast } from 'sonner'

type acceptInviteprops={
    params:{
    id:string
    }
}
 function page({params}:acceptInviteprops) {
   
    const handleSubmit = useCallback(
        async (e: React.MouseEvent) => {
          e.preventDefault();
          try {
          
            // console.log(email);
            // console.log(organizationId);
            const org = await acceptOrganizationInvite(params.id);
    
            // mutate("/api/getOrganization");
            // toast.success("Organization created successfully");
    
            // Close the dialog after successful submission
            // setOpen(false);
          } catch (error: any) {
            console.log(error);
            toast.error(error?.message || "Internal server error");
            throw Error(error?.message || "Internal server error");
          }
        },
        [params]
      );
    
  return (
    <div className='w-full min-h-screen bg-slate-200'>
    <Button onClick={handleSubmit}>Accept Invitation</Button></div>
  )
}

export default page
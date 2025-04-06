"use client"
import acceptOrganizationInvite from '@/app/api/organization/acceptOrganizationInvite'
import { Button } from '@/components/ui/button'
import React, { useCallback } from 'react'
import { toast } from 'sonner'
import logo from "@/public/images/logo.svg";
import Image from "next/image";

type acceptInviteprops = {
  params: {
    id: string;
  };
};
function page({ params }: acceptInviteprops) {
  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        const response = await acceptOrganizationInvite(params.id);

        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
        }
      } catch (error: any) {
        toast.error("Internal server error");
      }
    },
    [params]
  );

  return (
    <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center items-center space-y-4">
      <Image src={logo} width={200} height={200} alt="logo" />

      <Button onClick={handleSubmit}>Accept Invitation</Button>
    </div>
  );
}

export default page
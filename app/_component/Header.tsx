import React, { useCallback } from 'react'
import logo from "@/public/images/logo.svg"
import Image from 'next/image'
import Link from 'next/link'
// import { Button } from ''
import { authSignOut } from '../auth/action'
import { Button } from '@/components/ui/button'
import { CreateOrganizationModal } from './createOrganizationDialog'
import { usePathname } from 'next/navigation'
import { CreateProjectModal } from './createProjectDialog'
import { SendOrganizationInviteModal } from './sendOrganizationInviteDialog'

declare type HeaderProps={
organizationId?:string;
}

function Header({organizationId}:HeaderProps) {
  
 const pathName=usePathname();
 const isOrganizationDashboard=pathName?.includes("organizations");
 console.log(pathName);
    const handleSignout = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
          await authSignOut();
        } catch (error) {}
      }, []);
  return (
    <div className='w-full md:px-8 px-4 py-8 flex items-center justify-between'>
        <Link href="/"><div className="flex flex-row items-center text-3xl space-x-2 font-bold">
            <Image src={logo} width={50} height={50} alt="logo" />
            <div>Taskflow</div>
          </div>
          </Link>
          <div className='flex space-x-4 h-full items-center'>
            {pathName=="/" &&<CreateOrganizationModal />}
            {organizationId && isOrganizationDashboard && <CreateProjectModal organizationId={organizationId} />}
            {organizationId && isOrganizationDashboard && <SendOrganizationInviteModal organizationId={organizationId}/>}
            
          <Button 
          onClick={handleSignout}
          variant="taskFlowDark"
          >Sign Out</Button>
          
          </div>
    </div>
  )
}

export default Header
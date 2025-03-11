"use client"
import { CreateProjectModal } from '@/app/_component/createProjectDialog'
import useSingleOrganization from '@/hooks/getSinglerganization'
import React from 'react'

type organizationParamProps={

    params:{
        id:string
    }
}
function page({params}:organizationParamProps) {
    const {id}=params;
    const {data,isLoading,error}=useSingleOrganization(id);
    const projects=data?.projects??[];
    console.log(projects)
  return (
    <div>
      <CreateProjectModal />
    </div>
  )
}

export default page
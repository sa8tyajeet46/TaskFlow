"use client"
import { CreateProjectModal } from '@/app/_component/createProjectDialog'
import Header from "@/app/_component/Header";
import useSingleOrganization from "@/hooks/getSinglerganization";
import Link from "next/link";
import React from "react";

type organizationParamProps = {
  params: {
    id: string;
  };
};
function page({ params }: organizationParamProps) {
  const { id } = params;
  const { data, isLoading, error } = useSingleOrganization(id);

  const projects = data?.projects ?? [];

  return (
    <div className="w-full min-h-screen bg-slate-200">
      <Header organizationId={id} />
      {/* <CreateProjectModal organizationId={id} /> */}
      {projects.map((project: any) => {
        return (
          <div>
            <Link href={`/project/${project.id}`}>{project.name}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default page
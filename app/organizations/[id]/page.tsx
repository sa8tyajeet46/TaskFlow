"use client"
import { CreateProjectModal } from '@/app/_component/createProjectDialog'
import Header from "@/app/_component/Header";
import ProjectCard from "@/app/_component/ProjectCard";
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
      <div className="w-full flex justify-center flex-col">
        <div className="flex text-2xl font-semibold md:px-8 px-4 pb-7">
          Your Projects
        </div>
        <div className="flex flex-wrap justify-start px-8 space-x-8">
          {!data && (
            <>
              {Array(5)
                .fill(5)
                .map((_, index) => (
                  <ProjectCard.skeleton key={index} />
                ))}
            </>
          )}
          {projects.map((project: any) => {
            return (
              <div>
                {/* <Link href={`/project/${project.id}`}>{project.name}</Link> */}
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page
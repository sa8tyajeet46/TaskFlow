'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, CheckCircle, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { AddMemberModal } from './addMemberToProjectDialog';

interface Project {
  createdAt: string;
  createdById: string;
  description: string;
  endDate: string;
  id: string;
  name: string;
  organizationId: string;
  startDate: string;
  status: string;
  updatedAt: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const router = useRouter();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDuration = (): string => {
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="flex justify-between items-center">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Project</div>
            <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(project.status)}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </div>
            <AddMemberModal organizationId={project?.organizationId ?? ""} projectId={project.id??""} />
          </div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{project.name}</h2>
          <p className="mt-2 text-gray-500">{project.description}</p>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex items-center mb-2">
              <CalendarDays className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">Duration: {calculateDuration()}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">Created: {formatDate(project.createdAt)}</span>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 p-3 rounded-lg text-xs text-gray-500">
            <p className="mb-1">Project ID: {project.id}</p>
            <p className="mb-1">Organization ID: {project.organizationId}</p>
            <p>Created By: {project.createdById}</p>
          </div>

          <div className="mt-4 text-right">
            <Button onClick={() => router.push(`/project/${project.id}`)}>
              View Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


ProjectCard.skeleton = () => {
  return (
    <div className="max-w-md mx-auto !bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          
          <Skeleton className="h-7 w-3/4 mt-3" />
          <Skeleton className="h-5 w-full mt-3" />
          
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex items-center mb-2">
              <Skeleton className="h-4 w-4 rounded-full mr-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex items-center mb-2">
              <Skeleton className="h-4 w-4 rounded-full mr-2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 rounded-full mr-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          
          <div className="mt-4 bg-gray-50 p-3 rounded-lg">
            <Skeleton className="h-3 w-1/2 mb-2" />
            <Skeleton className="h-3 w-2/3 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
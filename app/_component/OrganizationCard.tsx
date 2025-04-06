import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { EllipsisVertical, Users, Calendar, Building } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

declare type OrganizationCardProps = {
  organizationName: string;
  id: string;
  createdAt: string;
  memberCount: number;
};

function OrganizationCard({
  organizationName,
  id,
  createdAt,
  memberCount,
}: OrganizationCardProps) {
  const createdLabel = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Edit organization", id);
  };

  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("View details", id);
  };

  return (
    <Link
      href={`/organizations/${id}`}
      className="w-64 bg-white h-44 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-4 relative group overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>

      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={handleMenuClick}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-[#3A04FF] text-white hover:bg-[#3A04FF]/90"
            >
              <EllipsisVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewDetailsClick}>
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#3A04FF]/10 mb-2">
          <Building size={24} className="text-[#3A04FF]" />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-[18px] font-semibold text-gray-800 truncate max-w-full">
          {organizationName}
        </h3>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <div className="flex items-center justify-center gap-1 text-gray-600">
          <Users size={14} className="text-[#3A04FF]/70" />
          <span className="text-sm">{memberCount} members</span>
        </div>

        <div className="flex items-center justify-center gap-1 text-gray-500 text-xs">
          <Calendar size={12} className="text-[#3A04FF]/70" />
          <span>Created {createdLabel}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-0 bg-[#3A04FF]/5 group-hover:h-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"></div>
    </Link>
  );
}

OrganizationCard.skeleton = () => {
  return (
    <div className="w-64 h-40 rounded-lg overflow-hidden flex flex-col p-4 gap-4">
      <div className="flex items-center justify-center">
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
      <Skeleton className="h-6 w-4/5 mx-auto" />
      <div className="flex flex-col gap-2 items-center">
        <Skeleton className="h-4 w-2/4" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    </div>
  );
};

export default OrganizationCard;
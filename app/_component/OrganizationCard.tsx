import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { EllipsisVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

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
  const createdLabel = formatDistanceToNow(createdAt);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("clicked");
  };
  return (
    <Link
      href={`/organizations/${id}`}
      className="w-52 bg-white h-32 rounded-lg shadow-sm flex flex-col justify-center items-center relative"
    >
      <div className="absolute top-2 right-2 bg-[#3A04FF] flex justify-center items-center text-white p-1 rounded-full">
        <button onClick={handleClick}>
          <EllipsisVertical className="text-sm " size="16" />
        </button>
      </div>
      <div className="text-[18px] font-semibold">{organizationName}</div>
      <div className="font-thin">{memberCount} members</div>
      <div className="absolute left-3 bottom-3 text-[#3A04FF]/70 text-sm">
        {createdLabel}
      </div>
    </Link>
  );
}

OrganizationCard.skeleton = () => {
  return (
    <Skeleton
      // href={`/organizations/${id}`}
      className="w-52 h-32 rounded-lg "
    ></Skeleton>
  );
};

export default OrganizationCard;

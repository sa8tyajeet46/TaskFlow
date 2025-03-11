"use client";
import { Button } from "@/components/ui/button";
import { useOrganizationModal } from "@/hooks/useOragnizationModal";
import { useCallback } from "react";
import useOrganization from "@/hooks/useOrganization";
import { authSignOut } from "./auth/action";
import OrganizationCard from "./_component/OrganizationCard";
import { CreateOrganizationModal } from "./_component/createOrganizationDialog";
export default function Home() {
  const handleSignout = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await authSignOut();
    } catch (error) {}
  }, []);
  const { data = null, error, isLoading } = useOrganization();
  if (!data) {
    return null;
  }
  console.log(data);
  return (
    <div className="">
      <Button onClick={handleSignout}>Sign Out</Button>
      <CreateOrganizationModal />
      {data.map((org: any) => {
        return (
          <OrganizationCard
            organizationName={org.organizationName}
            id={org.organizationId}
          ></OrganizationCard>
        );
      })}
    </div>
  );
}

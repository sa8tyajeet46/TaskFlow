"use client";
import { Button } from "@/components/ui/button";
import { useOrganizationModal } from "@/hooks/useOragnizationModal";
import { useCallback } from "react";
import useOrganization from "@/hooks/useOrganization";
import { authSignOut } from "./auth/action";
import OrganizationCard from "./_component/OrganizationCard";
import { CreateOrganizationModal } from "./_component/createOrganizationDialog";
import { SessionProvider } from "next-auth/react";
import Header from "./_component/Header";
export default function Home() {
  // const handleSignout = useCallback(async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   try {
  //     await authSignOut();
  //   } catch (error) {}
  // }, []);
  const { data = null, error, isLoading } = useOrganization();
  // if (!data) {
  //   return null;
  // }
  if (Array.isArray(data) && data.length === 0) {
    return (
      <div className="w-full min-h-screen bg-slate-200">
        <Header />
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen bg-slate-200">
      <Header />
      <div className="w-full flex justify-center flex-col">
        <div className="flex text-2xl font-semibold md:px-8 px-4 pb-7">
          Your Organizations
        </div>
        <div className="flex  md:px-8 px-4 flex-wrap gap-8">
          {!data && (
            <>
              {Array(6)
                .fill(6)
                .map((_, index) => (
                  <OrganizationCard.skeleton key={index} />
                ))}
            </>
          )}
          {data?.map((org: any) => {
            return (
              <OrganizationCard
                organizationName={org.organizationName}
                id={org.organizationId}
                createdAt={org.createdAt}
                memberCount={org.memberCount}
              ></OrganizationCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

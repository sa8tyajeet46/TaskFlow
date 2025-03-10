"use client";
import { Button } from "@/components/ui/button";
import { CreateOraganizationModal } from "./_component/createOrganizationDialog";
import { useOrganizationModal } from "@/hooks/useOragnizationModal";
import { useCallback } from "react";
import useOrganization from "@/hooks/useOrganization";
export default function Home() {
  const { open, onClose, setOpen } = useOrganizationModal();
  const handleModalOpen = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen();
    },
    [setOpen]
  );
  const { data = null, error, isLoading } = useOrganization();
  if (!data) {
    return null;
  }
  console.log(data);
  return (
    <div className="">
      <CreateOraganizationModal open={open} onClose={onClose} />
      <Button variant="ghost" onClick={handleModalOpen}>
        Create Organisation
      </Button>
      {data.map((org: any) => {
        return <div>{org.organizationName}</div>;
      })}
    </div>
  );
}

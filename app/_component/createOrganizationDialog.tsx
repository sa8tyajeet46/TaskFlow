"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useState } from "react";
import CreateOrganization from "../api/organization/route";
import { toast } from "sonner";
import useOrganization from "@/hooks/useOrganization";
import { useSWRConfig } from "swr";
import { PlusIcon } from "lucide-react";

export function CreateOrganizationModal() {
  const { mutate } = useSWRConfig();
  const [organizationName, setOrganizationName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        if (!organizationName) {
          toast.error("Please provide organization name");
          return;
        }

        const org = await CreateOrganization(organizationName);

        mutate("/api/getOrganization");
        toast.success("Organization created successfully");

        // Close the dialog after successful submission
        setOpen(false);
      } catch (error: any) {
        toast.error(error?.message || "Internal server error");
        throw Error(error?.message || "Internal server error");
      }
    },
    [organizationName, mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="taskFlow"
          className="border border-black hover:border-transparent"
        >
          <PlusIcon size={35} />
          Create Organisation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={organizationName}
              placeholder="Organization Name"
              onChange={(e) => {
                e.preventDefault();
                setOrganizationName(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
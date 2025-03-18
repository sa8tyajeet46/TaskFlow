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
import sendOrganizationInvite from "../api/organization/sendOrganizationInvte";

declare type SendOrganizationInviteModalProps={
  organizationId:string;
}
export function SendOrganizationInviteModal({organizationId}:SendOrganizationInviteModalProps) {
  const { mutate } = useSWRConfig();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        if (!email) {
          toast.error("Please provide email");
          return;
        }
        // console.log(email);
        // console.log(organizationId);
        const org = await sendOrganizationInvite(organizationId,email);

        // mutate("/api/getOrganization");
        // toast.success("Organization created successfully");

        // Close the dialog after successful submission
        setOpen(false);
      } catch (error: any) {
        console.log(error);
        toast.error(error?.message || "Internal server error");
        throw Error(error?.message || "Internal server error");
      }
    },
    [email, mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="taskFlow"
          className="border border-black hover:border-transparent"
        >
          <PlusIcon size={35} />
        Send Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Invite Link</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="name"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" 
          onClick={handleSubmit}
          >
            Send Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
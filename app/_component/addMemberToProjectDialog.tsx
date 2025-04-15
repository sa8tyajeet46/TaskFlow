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
import { mutate, useSWRConfig } from "swr";
import { PlusIcon } from "lucide-react";
import useOrganizationMembers from "@/hooks/getOrganizationMember";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import addMemberToProject from "../api/Project/addNewMember";
declare type AddMemberModalProps={
  organizationId:string;
  projectId:string;
}

export function AddMemberModal({organizationId,projectId}:AddMemberModalProps) {
  const { mutate } = useSWRConfig();
//   const [organizationName, setOrganizationName] = useState("");
  const [open, setOpen] = useState(false);
  const [member,setMember]=useState<string | undefined>(undefined);
  const { data, error, isLoading } = useOrganizationMembers(organizationId);

  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        if (!member) {
          toast.error("Please select a member");
          return;
        }

        const response = await addMemberToProject(member, projectId);
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
        }

        // mutate("/api/getOrganization");
        // toast.success("Organization created successfully");

        // Close the dialog after successful submission
        setOpen(false);
      } catch (error: any) {
        toast.error(error?.message || "Internal server error");
        throw Error(error?.message || "Internal server error");
      }
    },
    [member, mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger >
        <Button
          variant="taskFlow"
          className="border border-black hover:border-transparent"
          onClick={(e:React.MouseEvent)=>{
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <PlusIcon size={35} />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
  <Label htmlFor="status">Members</Label>
  <Select value={member} onValueChange={setMember} disabled={isLoading}>
    <SelectTrigger>
      <SelectValue placeholder={isLoading ? "Loading..." : "Select Member"} />
    </SelectTrigger>
    <SelectContent  position="popper" className="z-50">
      {isLoading && (
        <SelectItem value="loading" disabled>
          Loading...
        </SelectItem>
      )}
      {data?.length > 0 ? (
        data.map((member: any) => (
          <SelectItem key={member.id} value={member.user.id}>
            {member.user.name}
          </SelectItem>
        ))
      ) : (
        !isLoading && (
          <SelectItem value="no-member" disabled>
            No members found
          </SelectItem>
        )
      )}
    </SelectContent>
  </Select>
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
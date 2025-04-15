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
import { CreateTaskList } from "../api/TaskList/route";

declare type CreateTaskListModalProps={
    projectId:string;
}
export function CreateTaskListModal({projectId}:CreateTaskListModalProps) {
  const { mutate } = useSWRConfig();
  const [taskListName, setTaskListName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        // if (!organizationName) {
        //   toast.error("Please provide organization name");
        //   return;
        // }

        const org = await CreateTaskList(projectId, taskListName);

        mutate(`/api/getTaskList/${projectId}`);
        toast.success("Organization created successfully");

        // Close the dialog after successful submission
        setOpen(false);
      } catch (error: any) {
        toast.error(error?.message || "Internal server error");
        throw Error(error?.message || "Internal server error");
      }
    },
    [taskListName, mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Task List</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task List</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={taskListName}
              placeholder="Organization Name"
              onChange={(e) => {
                e.preventDefault();
                setTaskListName(e.target.value);
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
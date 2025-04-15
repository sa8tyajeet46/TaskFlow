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
import { Textarea } from "@/components/ui/textarea";
import GlobalDatePicker from "./GlobalDatePicker";
import CreateProject from "../api/Project/route";
import { PlusIcon } from "lucide-react";

export function CreateProjectModal({
  organizationId,
}: {
  organizationId: string;
}) {
  const { mutate } = useSWRConfig();
  const [projectObj, setProjectObj] = useState({
    projectName: "",
    description: "",
    // startDate: undefined,
    // endDate: undefined,
  });
  const [startDate, setstartDate] = useState<Date>();
  const [endDate, setendDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      const requestObj = {
        projectName: projectObj.projectName,
        description: projectObj.description,
        organizationId: organizationId,
        startDate: startDate ? startDate : new Date(Date.now()),
        endDate: endDate ? endDate : new Date(Date.now()),
      };
      try {
        const org = await CreateProject(
          requestObj.projectName,
          requestObj.description,
          requestObj.organizationId,
          requestObj.startDate,
          requestObj.endDate
        );

        mutate(`/api/getSingleOrganization/${organizationId}`);
        toast.success("project created successfully");

        // Close the dialog after successful submission
        setOpen(false);
      } catch (error: any) {
        toast.error(error?.message || "Internal server error");
        throw Error(error?.message || "Internal server error");
      }
    },
    [setProjectObj, startDate, endDate, projectObj]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="taskFlow"
          className="border border-black hover:border-transparent"
        >
          <PlusIcon size={35} />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <div className=" gap-4 py-4">
          <div className="flex flex-col space-y-2">
            <div>
              {" "}
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={projectObj.projectName}
                placeholder="Project Name"
                onChange={(e) => {
                  e.preventDefault();
                  setProjectObj({ ...projectObj, projectName: e.target.value });
                }}
                className="col-span-3"
              />
            </div>
            <div>
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={projectObj.description}
                placeholder="Project Description"
                onChange={(e) => {
                  e.preventDefault();
                  setProjectObj({ ...projectObj, description: e.target.value });
                }}
                className="col-span-3"
              />
            </div>
            <div className="flex w-full justify-between items-center">
              <Label htmlFor="name" className="text-right">
                Start Date
              </Label>
              <GlobalDatePicker date={startDate} setDate={setstartDate} />
            </div>
            <div className="flex w-full justify-between items-center">
              <Label htmlFor="name" className="text-right">
                End Date
              </Label>
              <GlobalDatePicker date={endDate} setDate={setendDate} />
            </div>
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
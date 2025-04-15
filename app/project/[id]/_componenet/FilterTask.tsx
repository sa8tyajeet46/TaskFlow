import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

type FilterTaskProps = {
  id: string;
};

function FilterTask({ id }: FilterTaskProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTOMe, setAssignedToMe] = useState(false);

  const handleFilter = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentQueryParams = queryString.parse(window.location.search);

    const newQueryParams = {
      ...currentQueryParams,
      status,
      priority,
      assignedTOMe,
    };

    const url = queryString.stringifyUrl(
      {
        url: `/project/${id}`,
        query: newQueryParams,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  };

  const cancelFilter = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentQueryParams = queryString.parse(window.location.search);

    const newQueryParams = {
      search: currentQueryParams?.search,
    };

    const url = queryString.stringifyUrl(
      {
        url: `/project/${id}`,
        query: newQueryParams,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    setStatus("");
    setPriority("");
    setAssignedToMe(false);
    router.push(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">
            Status
          </Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="TODO">To Do</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="REVIEW">Review</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority" className="text-sm font-medium">
            Priority
          </Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 mt-6 sm:mt-0">
          <Checkbox
            id="assignedToMe"
            checked={assignedTOMe}
            onCheckedChange={(checked: boolean) => setAssignedToMe(checked)}
          />
          <Label htmlFor="assignedToMe" className="text-sm">
            Assigned to me
          </Label>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button onClick={handleFilter} className="w-full sm:w-auto">
          Apply Filters
        </Button>
        <Button
          onClick={cancelFilter}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}

export default FilterTask;

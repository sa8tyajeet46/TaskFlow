"use client"

import { CreateTaskListModal } from "@/app/_component/createTaskListDialog";
import useTaskList from "@/hooks/getTaskList";
import TaskDropDown from "./_componenet/TaskDropDown";
import CreateTaskDialog from "@/app/_component/createTaskDialog";
import SearchInput from "@/app/_component/SearchInput";
import FilterTask from "./_componenet/FilterTask";

type projectParamProps = {
  params: {
    id: string;
  };
  searchParams: {
    search?: string;
    status?: string;
    priority?: string;
    assignedTOMe?: string;
  };
};
function page({ params, searchParams }: projectParamProps) {
  const { id } = params;
  const { data, error, isLoading } = useTaskList(id);

  return (
    <div>
      <SearchInput id={id} />
      <CreateTaskListModal projectId={id} />
      <FilterTask id={id} />
      <div className="grid grid-cols-4">
        {data?.map((taskList: any) => {
          return (
            <div className="flex flex-col">
              <div>{taskList?.name}</div>
              <TaskDropDown
                taskListId={taskList.id}
                searchParams={searchParams}
              />
              <CreateTaskDialog
                taskListId={taskList?.id}
                projectid={id}
                createdbyId={""}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page
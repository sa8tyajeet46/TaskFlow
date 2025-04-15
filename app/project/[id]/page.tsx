"use client";

import { CreateTaskListModal } from "@/app/_component/createTaskListDialog";
import useTaskList from "@/hooks/getTaskList";
import TaskDropDown from "./_componenet/TaskDropDown";
import CreateTaskDialog from "@/app/_component/createTaskDialog";
import SearchInput from "@/app/_component/SearchInput";
import FilterTask from "./_componenet/FilterTask";
import { AddMemberModal } from "@/app/_component/addMemberToProjectDialog";
import Header from "@/app/_component/Header";
import useTask from "@/hooks/getTask";
import React, { useState } from "react";
import {
  closestCenter,
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Skeleton } from "@/components/ui/skeleton";
import updateTaskList from "@/app/api/UpdateTaskListId/route";

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

function Page({ params, searchParams }: projectParamProps) {
  const { id } = params;
  // const { data, error, isLoading } = useTaskList(id);
  const {
    data = [],
    error,
    isLoading,
    mutate,
  } = useTask(
    id,
    searchParams?.search,
    searchParams?.status,
    searchParams?.priority,
    searchParams?.assignedTOMe
  );

  const [localTasks, setLocalTasks] = useState<any[]>(data);

  const [activeTask, setActiveTask] = useState<{
    taskId: string;
    sourceListId: string;
  } | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [draggedTask, setDraggedTask] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Only start dragging after moving 8px (prevents accidental drags)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  React.useEffect(() => {
    setLocalTasks(data);
  }, [data]);

  const getTaskPosition = (id: any) => {
    return localTasks.findIndex((task) => task.id === id);
  };

  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;

  //   if (!over || active.id === over.id) return;

  //   const oldIndex = getTaskPosition(active.id);
  //   const newIndex = getTaskPosition(over.id);

  //   if (oldIndex === -1 || newIndex === -1) return;

  //   const reordered = arrayMove(localTasks, oldIndex, newIndex);
  //   setLocalTasks(reordered);
  // };

  const findTaskListById = (taskListId: string) => {
    return localTasks.find((taskList) => taskList.id === taskListId);
  };

  // Find a task within all task lists
  const findTaskById = (taskId: string) => {
    for (const taskList of localTasks) {
      const task = taskList.tasks.find((task: any) => task.id === taskId);
      if (task) {
        return { task, taskListId: taskList.id };
      }
    }
    return null;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    setDraggedTask(null);
    const { active, over } = event;
    console.log(over?.data.current?.type);
    if (!over || !activeTask) {
      setActiveTask(null);
      return;
    }

    const activeData = active.data.current as {
      taskId: string;
      taskListId: string;
    };
    const activeTaskId = activeData.taskId;
    const activeTaskListId = activeData.taskListId;

    const overData = over.data.current as any;

    let overTaskId;
    let overTaskListId;

    if (overData.type === "taskList") {
      overTaskListId = overData.taskListId;
      overTaskId = null;
    } else if (overData.type === "task") {
      overTaskId = overData.taskId;
      overTaskListId = overData.taskListId;
    } else {
      console.error("Unknown drop target type:", overData);
      setActiveTask(null);
      return;
    }

    console.log(
      "Source list:",
      activeTaskListId,
      "Target list:",
      overTaskListId
    );

    if (activeTaskListId === overTaskListId) {
      const taskList = findTaskListById(activeTaskListId);
      if (!taskList) return;

      if (!overTaskId) {
        const oldIndex = taskList.tasks.findIndex(
          (task: any) => task.id === activeTaskId
        );

        if (oldIndex !== -1) {
          const newTasks = [...localTasks];
          const taskListIndex = newTasks.findIndex(
            (tl) => tl.id === activeTaskListId
          );

          if (taskListIndex !== -1) {
            const taskToMove = newTasks[taskListIndex].tasks[oldIndex];
            const updatedTasks = newTasks[taskListIndex].tasks.filter(
              (t: any) => t.id !== activeTaskId
            );
            updatedTasks.push(taskToMove);

            newTasks[taskListIndex] = {
              ...newTasks[taskListIndex],
              tasks: updatedTasks,
            };

            setLocalTasks(newTasks);
          }
        }
      } else {
        const oldIndex = taskList.tasks.findIndex(
          (task: any) => task.id === activeTaskId
        );
        const newIndex = taskList.tasks.findIndex(
          (task: any) => task.id === overTaskId
        );

        if (oldIndex !== -1 && newIndex !== -1) {
          const newTasks = [...localTasks];
          const taskListIndex = newTasks.findIndex(
            (tl) => tl.id === activeTaskListId
          );

          if (taskListIndex !== -1) {
            newTasks[taskListIndex] = {
              ...newTasks[taskListIndex],
              tasks: arrayMove(
                newTasks[taskListIndex].tasks,
                oldIndex,
                newIndex
              ),
            };

            setLocalTasks(newTasks);
          }
        }
      }
    } else {
      const sourceTaskList = findTaskListById(activeTaskListId);
      const targetTaskList = findTaskListById(overTaskListId);

      if (!sourceTaskList || !targetTaskList) return;

      const taskToMove = sourceTaskList.tasks.find(
        (task: any) => task.id === activeTaskId
      );
      if (!taskToMove) return;

      const updatedSourceTasks = sourceTaskList.tasks.filter(
        (task: any) => task.id !== activeTaskId
      );

      const updatedTargetTasks = [...targetTaskList.tasks];

      if (!overTaskId) {
        updatedTargetTasks.push(taskToMove);
      } else {
        const targetIndex = updatedTargetTasks.findIndex(
          (task: any) => task.id === overTaskId
        );
        if (targetIndex !== -1) {
          updatedTargetTasks.splice(targetIndex, 0, taskToMove);
        } else {
          updatedTargetTasks.push(taskToMove);
        }
      }

      const newTasks = localTasks.map((taskList) => {
        if (taskList.id === activeTaskListId) {
          return { ...taskList, tasks: updatedSourceTasks };
        }
        if (taskList.id === overTaskListId) {
          return { ...taskList, tasks: updatedTargetTasks };
        }
        return taskList;
      });

      setLocalTasks(newTasks);

      // Here you would call your API to update the task's list ID
      try {
        await updateTaskList(activeTaskId, overTaskListId);
      } catch (error) {
        console.error("Failed to update task list:", error);
        // mutate();
      }
    }

    setActiveTask(null);
  };

  console.log(localTasks, "local");

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { taskId, taskListId } = active.data.current as {
      taskId: string;
      taskListId: string;
    };

    setActiveId(taskId);
    setActiveTask({ taskId, sourceListId: taskListId });

    const taskList = findTaskListById(taskListId);
    const task = taskList?.tasks.find((t: any) => t.id === taskId);
    setDraggedTask(task);
  };

  const TaskItem = ({ task, isDragging = false }) => (
    <div
      className={`p-3 bg-white border rounded-lg shadow-sm mb-2 transition-all duration-200 ${
        isDragging ? "opacity-75 scale-105 shadow-md" : ""
      }`}
    >
      <h3 className="font-medium">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-500 truncate">{task.description}</p>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-3 mt-2">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm mt-2">Failed to load tasks.</div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <Header organizationId={id} />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SearchInput id={id} />
          <div className="flex gap-2">
            <CreateTaskListModal projectId={id} />
          </div>
        </div>

        <FilterTask id={id} />

        {isLoading && (
          <div className="text-center text-gray-600">Loading tasks...</div>
        )}
        {error && (
          <div className="text-center text-red-500">Failed to load tasks.</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            {localTasks?.map((taskList: any) => (
              <div
                key={taskList.id}
                className="bg-white shadow-lg rounded-2xl p-4 flex flex-col space-y-4 max-w-[400px]"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {taskList?.name}
                </h2>

                <TaskDropDown
                  taskListId={taskList.id}
                  searchParams={searchParams}
                  data={taskList.tasks}
                />

                <CreateTaskDialog
                  taskListId={taskList?.id}
                  projectid={id}
                  createdbyId={""}
                />
              </div>
            ))}
            <DragOverlay adjustScale={true}>
              {draggedTask ? (
                <TaskItem task={draggedTask} isDragging={true} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default Page;

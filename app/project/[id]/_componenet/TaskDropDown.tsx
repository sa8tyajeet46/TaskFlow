"use client";
import useTask from "@/hooks/getTask";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { Droppable } from "./Droppable";

type TaskDropDownProps = {
  taskListId: string;
  searchParams: {
    search?: string;
    status?: string;
    priority?: string;
    assignedTOMe?: string;
  };
  data: any[];
};

function TaskDropDown({ taskListId, searchParams, data }: TaskDropDownProps) {
  const { setNodeRef } = useDroppable({
    id: taskListId,
    data: {
      type: "taskList",
      taskListId: taskListId,
    },
  });

  if (data.length === 0) {
    return (
      <div className="text-gray-500 text-sm mt-2 italic">
        No tasks found in this list.
      </div>
    );
  }

  return (
    <div className="space-y-5 mt-4 min-h-24" ref={setNodeRef}>
      <SortableContext
        strategy={verticalListSortingStrategy}
        id={taskListId}
        items={data.map((task) => task.id)}
      >
        {data.map((task) => (
          <TaskCard key={task.id} task={task} taskListId={taskListId} />
        ))}
      </SortableContext>
    </div>
  );
}

export default TaskDropDown;

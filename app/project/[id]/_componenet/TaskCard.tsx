import { Badge } from "@/components/ui/badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format } from "date-fns";
import { Draggable } from "./Draggable";
import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({task,taskListId }:any){
    const {attributes,transform,transition,listeners,setNodeRef,isDragging} =useSortable({id:task.id,data: {
      type: "task",
      taskId: task.id,
      taskListId: taskListId,
      
    }})
    // console.log(task.status);
    const style={
        transform:CSS.Transform.toString(transform),
        transition:transition,
        // opacity: isDragging ? 0.5 : 1,
  zIndex: isDragging ? 10 : 1,
//  position:isDragging?"absolute":"relative"
    }

 
    return (
    // <Draggable id={task.id} style={style}>
      <div
   
              key={task.id}
              ref={setNodeRef}
              {...attributes}
              {...listeners}
              style={style}
              className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2 border "
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{task.title}</h3>
                <Badge
                  variant="outline"
                  className={`${
                    task.priority === "HIGH"
                      ? "border-red-500 text-red-500"
                      : task.priority === "MEDIUM"
                      ? "border-yellow-500 text-yellow-500"
                      : "border-gray-400 text-gray-500"
                  }`}
                >
                  {task.priority}
                </Badge>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Status: {task.status.replaceAll("_", " ")}</span>
                <span>
                  Due:{" "}
                  {task.dueDate
                    ? format(new Date(task.dueDate), "dd MMM yyyy")
                    : "—"}
                </span>
              </div>
            </div>
            // </Draggable>
          );
}
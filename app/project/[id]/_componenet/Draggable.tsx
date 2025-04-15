import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props:{
  id:string,
  children:React.ReactNode
  style:{} | undefined
}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={props.style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
import {create} from "zustand";

declare type useOrganizationModalprops={
    open:boolean,
    setOpen:()=>void,
    onClose:()=>void
}
export const useOrganizationModal=create<useOrganizationModalprops>((set)=>({
    open:false,
    setOpen:()=>set(()=>({open:true})),
    onClose:()=>set(()=>({open:false}))
}))
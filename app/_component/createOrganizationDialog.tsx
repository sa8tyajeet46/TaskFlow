"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCallback, useState } from "react"
import  CreateOrganization  from "../api/organization/route"
import { toast } from "sonner"
import useOrganization from "@/hooks/useOrganization"
import {SWRConfig, useSWRConfig} from "swr"
declare type createOraganizationModalprops={
open:boolean,
onClose:()=>void
}


export function CreateOraganizationModal({open,onClose}:createOraganizationModalprops) {
  const {mutate}=useSWRConfig();
    const [organizationName,setOrganizationName]=useState("");
    const handleSubmit=useCallback(async (e:React.MouseEvent)=>{
    e.preventDefault();
    try{
        if(!organizationName)
        {
            onClose();
            toast.error("please provide organization Name");
            return;
        }
          const org=await CreateOrganization(organizationName);

       
          mutate("/api/getOrganization")
          
         toast.success("Organization created succesfully");
    }
    catch(error:any){
        console.log(error);
        toast.error(error?.message || "internal server error");
        throw Error(error?.message || "internal server error");
    }
    onClose();
    },[CreateOrganization,organizationName])
  return (
    <Dialog open={open} onOpenChange={()=>{
        onClose();
    }}>
     
      <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={organizationName}
            placeholder="organization Name"
            onChange={(e)=>{
                e.preventDefault();
                setOrganizationName(e.target.value)
            }} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      
      </DialogContent>
    </Dialog>
  )
}

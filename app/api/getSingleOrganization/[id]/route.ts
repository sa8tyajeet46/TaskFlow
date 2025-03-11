import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";


const GET=async(req:NextApiRequest,{params}:{params:{id?:string}})=>{
    try{
      const session=await auth();
      
      if(!session?.user?.email)
      {
        return Response.json({error:"user not authenticated"},{status:401});
      }
     const {id:orgId}=params;
     console.log(orgId)
    //   const user=await prisma.user.findUnique({
    //     where:{
    //         id:session?.user?.id ?? ""
    //     }
    //   });

      const org=await prisma.organization.findMany({
        where:{
            id:orgId
        },
        include:{
            projects:true
        }
      });

    //   const filteredOrg=org.map((org)=>{
    //     const forg={...org,organizationName:org.organization.name};
        

    //     return forg
    //   })

      return Response.json(org);
    }
    catch(error){
      console.log(error);
        return Response.json({error:"Internal server error"},{status:500});
    }
}

export  {GET};
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
      const user=await prisma.user.findUnique({
        where:{
          email:session?.user?.email
        }
      });
      const {id}=params
     const members=await prisma.organizationMember.findMany({
        where:{
            organizationId:id,
            userId:{
              not:user?.id
            }
        },
        include:{
          user:true
        }
        
     })

      return Response.json(members);
    }
    catch(error){
        return Response.json({error:"Internal server error"},{status:500});
    }
}

export  {GET};
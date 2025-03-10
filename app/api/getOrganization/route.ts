import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";


const GET=async()=>{
    try{
      const session=await auth();
      
      if(!session?.user?.email)
      {
        return Response.json({error:"user not authenticated"},{status:401});
      }

      const user=await prisma.user.findUnique({
        where:{
            id:session?.user?.id ?? ""
        }
      });

      const org=await prisma.organizationMember.findMany({
        where:{
            userId:user?.id
        },
        include:{
            organization:true
        }
      });

      const filteredOrg=org.map((org)=>{
        const forg={...org,organizationName:org.organization.name};
        

        return forg
      })

      return Response.json(filteredOrg);
    }
    catch(error){
        return Response.json({error:"Internal server error"},{status:500});
    }
}

export  {GET};
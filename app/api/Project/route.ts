"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function CreateOrganization(organizationName: string) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not authenticated");
    }
    
    if (!organizationName) {
      return Error("please provide organization name");

    }
    
    // console.log(session?.user?.email);

    const organization = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          email: session?.user?.email ?? ""
        }
      });
      
      const org = await tx.organization.create({
        data: {
          name: organizationName,
        },
      });
      
      const team=await tx.organizationMember.create({
        data: {
          organizationId: org.id ?? "",
          userId: user?.id ?? "",
          role: "admin",
        },
        include:{
          organization:true
        }
      });

    
      
      return {...team,organizationName:team.organization.name};;
    });
   
    
    return organization;
  } catch (error) {
    // console.log(error);
    return Error("Internal Server Error")
  }
}

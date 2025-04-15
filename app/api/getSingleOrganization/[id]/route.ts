import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";


const GET=async(req:NextApiRequest,{params}:{params:{id?:string}})=>{
    try {
      const session = await auth();

      if (!session?.user?.email) {
        return Response.json(
          { error: "user not authenticated" },
          { status: 401 }
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
      });
      const { id: orgId } = params;

      const org = await prisma.organization.findUnique({
        where: {
          id: orgId,
        },
        include: {
          projects: {
            where: {
              members: {
                some: {
                  userId: user?.id ?? "",
                },
              },
            },
          },
        },
      });

      return Response.json(org);
    } catch (error) {
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

export  {GET};
"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {SignJWT} from "jose"
import nodemailer from 'nodemailer';

export default async function sendOrganizationInvite(
  organizationId: string,
  email: string
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not authenticated");
    }

    if (!organizationId) {
      return Error("please provide organization name");
    }
    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });
    
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
   
    if (user) {
        const organizationMember = await prisma.organizationMember.findUnique({
            where: {
              organizationId_userId: {
                organizationId: organizationId,
                userId: user.id ?? "",
              },
            },
          });
          console.log(organizationMember)
      if (organizationMember) {
        throw Error("already a member");
      }
    }

    const secret = new TextEncoder().encode(
        process.env.JWT_SECRET,
      )

   const jwt_signed_organizationId= await new SignJWT({id:organization?.id,email:email})
   .setProtectedHeader({ alg:'HS256' })
  .setIssuedAt()
  .setExpirationTime('2h')
  .sign(secret);

  const link=`http://localhost:3000/acceptInvitation/${jwt_signed_organizationId}`
   
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // Set to true for port 465, otherwise false
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const info = await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_EMAIL_TO,
    to:email,                                    
                                   
    subject: "Organization Invite" , 
    text: `click on the link to ${link}`,        
    // html: message.html,                  
});
    return {
      message: "inviataion sent",
    };
  } catch (error) {
    console.log(error);
    return Error("Internal Server Error");
  }
}

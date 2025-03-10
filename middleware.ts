import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";

const AuthRoutes = ["/auth"];
const AuthApiRoutes = "/api";

export default async function authMiddleware(req: NextRequest) {
   
  const isLoggedIn = !!(await auth());

  const { nextUrl } = req;

  const isAuthApiRoutes = String(nextUrl.pathname).startsWith(AuthApiRoutes);

  if (isAuthApiRoutes) {
    return null;
  }

  const isAuthRoute = AuthRoutes.includes(String(nextUrl.pathname));

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return null;
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return null;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

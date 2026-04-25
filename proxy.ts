import { clerkMiddleware, createRouteMatcher, currentUser } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/protected(.*)', '/admin(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect();

        if (isAdminRoute(req)) {
            const user = await currentUser();
            const adminEmail = process.env.ADMIN_EMAIL;
            const isAuthorized = user?.emailAddresses.some(e => e.emailAddress === adminEmail);

            if (!isAuthorized) {
                return Response.redirect(new URL('/', req.url));
            }
        }
    }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}

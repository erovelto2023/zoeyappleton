import { auth, currentUser } from "@clerk/nextjs/server";

export async function isAdmin() {
    const { userId } = await auth();
    if (!userId) return false;

    const user = await currentUser();
    if (!user) return false;

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
        console.warn("ADMIN_EMAIL is not set in environment variables");
        return false;
    }

    // Check if any of the user's email addresses match the admin email
    return user.emailAddresses.some(email => email.emailAddress === adminEmail);
}

export async function authorizeAdmin() {
    if (!(await isAdmin())) {
        throw new Error("Unauthorized");
    }
}

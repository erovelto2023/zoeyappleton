import { format } from "date-fns";
import { Mail, Calendar, Trash2 } from "lucide-react";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
    await dbConnect();
    const messages = await Message.find({}).sort({ createdAt: -1 });

    async function deleteMessage(formData: FormData) {
        "use server";
        const id = formData.get("id");
        if (id) {
            await dbConnect();
            await Message.findByIdAndDelete(id);
            revalidatePath("/admin/messages");
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
                <p className="text-sm text-muted-foreground">
                    inquiries from the contact form.
                </p>
            </div>

            <div className="grid gap-4">
                {messages.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                        No messages yet.
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id.toString()} className="bg-white dark:bg-slate-900 border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        {msg.name}
                                    </h3>
                                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                                        <Mail className="w-3 h-3 mr-1" />
                                        <a href={`mailto:${msg.email}`} className="hover:text-primary transition-colors">
                                            {msg.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
                                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                        <Calendar className="w-3 h-3" />
                                        {format(new Date(msg.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                    </span>
                                    <form action={deleteMessage}>
                                        <input type="hidden" name="id" value={msg._id.toString()} />
                                        <button
                                            type="submit"
                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                            title="Delete Message"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md text-sm leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                                {msg.message}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

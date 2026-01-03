import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, PenTool } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Link href="/admin/books">
                    <Card className="hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Books</CardTitle>
                            <Book className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Manage Books</div>
                            <p className="text-xs text-muted-foreground">Add or edit your book catalog</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/characters">
                    <Card className="hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Characters</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Manage Characters</div>
                            <p className="text-xs text-muted-foreground">Update character profiles</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/posts">
                    <Card className="hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                            <PenTool className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Manage Blog</div>
                            <p className="text-xs text-muted-foreground">Write and publish articles</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    )
}

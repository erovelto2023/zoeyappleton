"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Loader2, Mail, Search } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface Subscriber {
    _id: string;
    email: string;
    status: string;
    createdAt: string;
}

export default function HeartstringsPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await axios.get("/api/newsletter");
                setSubscribers(response.data);
            } catch (error) {
                console.error("Failed to fetch subscribers:", error);
                toast.error("Failed to load subscribers.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, []);

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const copyEmails = () => {
        const emails = filteredSubscribers.map(s => s.email).join(", ");
        navigator.clipboard.writeText(emails);
        toast.success("Copied all emails to clipboard!");
    }

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Heartstrings Magazine</h2>
                    <p className="text-muted-foreground">Manage your VIP subscribers ({subscribers.length} total)</p>
                </div>
                <Button onClick={copyEmails} variant="outline" className="gap-2">
                    <Copy className="h-4 w-4" /> Copy All Emails
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by email..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email Address</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date Joined</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSubscribers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                            No subscribers found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredSubscribers.map((sub) => (
                                        <TableRow key={sub._id}>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                {sub.email}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {format(new Date(sub.createdAt), "MMM d, yyyy")}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

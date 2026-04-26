import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UploadCloud, Edit, Download, Eye } from 'lucide-react';
import dbConnect from '@/lib/db';
import GlossaryTerm from '@/models/GlossaryTerm';
import { Search } from '@/components/ui/search';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const dynamic = 'force-dynamic';

export default async function GlossaryAdminPage({
    searchParams,
}: {
    searchParams: Promise<{
        query?: string;
    }>;
}) {
    const { query = "" } = await searchParams;
    await dbConnect();
    const filter = query ? { keyword: { $regex: query, $options: "i" } } : {};

    const terms = await GlossaryTerm.find(filter).sort({ keyword: 1 }).lean();
    const formattedTerms = JSON.parse(JSON.stringify(terms));

    return (
        <div className="p-8 space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Glossary Terms</h2>
                    <p className="text-muted-foreground">{formattedTerms.length} terms</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link href="/admin/glossary/bulk-import">
                        <Button variant="default">
                            <UploadCloud className="mr-2 h-4 w-4" /> Bulk Import JSON
                        </Button>
                    </Link>
                    <a href="/api/glossary/export" download="glossary.json">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" /> Export JSON
                        </Button>
                    </a>
                </div>
            </div>

            <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <Search placeholder="Search terms..." />
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                            <TableRow>
                                <TableHead>Term Name</TableHead>
                                <TableHead>Hook / Vibe</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead className="text-center">Views</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formattedTerms.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                        {query ? "No terms found matching your search." : "No glossary terms imported yet."}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                formattedTerms.map((term: any) => (
                                    <TableRow key={term._id}>
                                        <TableCell className="font-medium text-nowrap">{term.keyword}</TableCell>
                                        <TableCell className="max-w-xs truncate text-muted-foreground" title={term.hook}>{term.hook}</TableCell>
                                        <TableCell className="text-muted-foreground text-sm">/glossary/{term.slug}</TableCell>
                                        <TableCell className="text-center font-mono">{term.views || 0}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/glossary/${term.slug}`} target="_blank">
                                                    <Button variant="ghost" size="icon" title="View Public Page">
                                                        <Eye className="w-4 h-4 text-muted-foreground" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/glossary/${term._id}`}>
                                                    <Button variant="ghost" size="icon" title="Edit Term">
                                                        <Edit className="w-4 h-4 text-muted-foreground" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

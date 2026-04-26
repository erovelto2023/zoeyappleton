import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UploadCloud, Edit, Trash2 } from 'lucide-react';
import dbConnect from '@/lib/db';
import GlossaryTerm from '@/models/GlossaryTerm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search } from '@/components/ui/search';

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
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Glossary Terms</h2>
                <div className="flex gap-4">
                    <Link href="/admin/glossary/bulk-import">
                        <Button variant="default">
                            <UploadCloud className="mr-2 h-4 w-4" /> Bulk Import JSON
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="w-full max-w-sm">
                <Search placeholder="Search terms..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formattedTerms.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        {query ? "No terms found matching your search." : "No glossary terms imported yet."}
                    </div>
                ) : (
                    formattedTerms.map((term: any) => (
                        <Card key={term._id} className="overflow-hidden">
                            <CardHeader className="p-4 pb-2">
                                <CardTitle className="text-xl">{term.keyword}</CardTitle>
                                <CardDescription className="line-clamp-2">{term.hook}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                                <p className="text-xs text-muted-foreground mb-4">Slug: {term.slug}</p>
                                <div className="flex gap-2">
                                    <Link href={`/glossary/${term.slug}`} target="_blank" className="w-full">
                                        <Button variant="outline" className="w-full text-xs">
                                            View Public
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}

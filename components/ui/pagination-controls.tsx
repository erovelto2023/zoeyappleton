"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages: number;
}

export function PaginationControls({
    hasNextPage,
    hasPrevPage,
    totalPages,
}: PaginationControlsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = searchParams.get("page") ?? "1";
    const per_page = searchParams.get("per_page") ?? "10";

    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            <Button
                variant="outline"
                size="sm"
                disabled={!hasPrevPage}
                onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("page", (Number(page) - 1).toString());
                    router.push(`${pathname}?${params.toString()}`);
                }}
            >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
            </Button>

            <div className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
            </div>

            <Button
                variant="outline"
                size="sm"
                disabled={!hasNextPage}
                onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("page", (Number(page) + 1).toString());
                    router.push(`${pathname}?${params.toString()}`);
                }}
            >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
    );
}

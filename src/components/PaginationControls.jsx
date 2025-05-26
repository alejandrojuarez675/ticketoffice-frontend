// src/components/PaginationControls.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function PaginationControls({ currentPage, totalPages, basePath }) {
    const router = useRouter();
    const searchParams = useSearchParams(); 

    const handlePrevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', newPage.toString());
            router.push(`${basePath}?${params.toString()}`);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', newPage.toString());
            router.push(`${basePath}?${params.toString()}`);
        }
    };

    if (totalPages <= 1) {
        return null; // No mostrar controles si solo hay una página o menos
    }

    return (
        <div className="flex justify-center items-center space-x-4 mt-8">
            <button
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
            >
                Next
            </button>
        </div>
    );
}
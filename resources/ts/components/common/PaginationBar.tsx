"use client";

import { cn } from "@/ts/utils";

type PageProps = {
  lastPage: number;
  currentPage: number;
  prefix?: string;
  query?: string;
}

const PagiantionBar = ({ lastPage, currentPage, prefix = '/', query = '' }: PageProps) => {
  const getPaginationRange = () => {
    const delta = 2; // Number of pages to show around the current page
    const range: number[] = [];
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(lastPage, currentPage + delta); i++) {
      range.push(i);
    }
    if (currentPage - delta > 1) range.unshift(-1); // Add "..." at the beginning
    if (currentPage + delta < lastPage) range.push(-1); // Add "..." at the end
    return range;
  };

  const paginationRange = getPaginationRange();

  const onPageChange = (page: number) => {
    if (query && query !== '' && page != 1) {
      window.location.href = `${prefix}?page=${page}&q=${query}`;
    } else if (!query || query == '' || query === undefined) {
      window.location.href = `${prefix}?page=${page}`;
    } else {
      window.location.href = prefix;
    }
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <a href="#" onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </a>
        </li>

        {/* Page Numbers */}
        {paginationRange.map((page, index) =>
          page === -1 ? (
            // Ellipsis for omitted pages
            <li key={`${index}-${page}`}>
              <span key={index} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                ...
              </span>
            </li>
          ) : (
            <li key={page}>
              <a href="#" onClick={() => page !== currentPage && onPageChange(page)} className={cn(
                "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                {
                  'bg-border hover:bg-border': page == currentPage
                }
              )}>
                {page}
              </a>
            </li>
          )
        )}

        <li>
          <a href="#" onClick={() => currentPage < lastPage && onPageChange(currentPage + 1)} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PagiantionBar;

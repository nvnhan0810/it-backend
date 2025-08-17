"use client";

import { PaginationInfo } from "@/ts/types/common";
import { cn } from "@/ts/utils";
import { router } from "@inertiajs/react";

type PaginationBarProps = {
  pagination: PaginationInfo;
  preserveQuery?: boolean;
  preserveScroll?: boolean;
};

const PaginationBar = ({ pagination, preserveQuery = true, preserveScroll = false }: PaginationBarProps) => {
  const { current_page, last_page, links } = pagination;

  const handlePageChange = (page: number) => {
    if (page === current_page) return;

    router.get(
      window.location.pathname,
      { page },
      {
        preserveUrl: preserveQuery,
        preserveScroll,
        replace: true,
      }
    );
  };

  const handlePrevious = () => {
    if (current_page > 1) {
      handlePageChange(current_page - 1);
    }
  };

  const handleNext = () => {
    if (current_page < last_page) {
      handlePageChange(current_page + 1);
    }
  };

  return (
    <nav aria-label="Page navigation" className="flex items-center justify-center">
      <ul className="flex items-center -space-x-px h-10 text-base">
        {/* Previous Button */}
        <li>
          <button
            onClick={handlePrevious}
            disabled={current_page === 1}
            className={cn(
              "flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
              {
                "opacity-50 cursor-not-allowed": current_page === 1,
              }
            )}
          >
            <span className="sr-only">Previous</span>
            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </button>
        </li>

        {/* Page Numbers */}
        {links.slice(1, -1).map((link, index) => {
          if (link.label === "...") {
            return (
              <li key={`ellipsis-${index}`}>
                <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                  ...
                </span>
              </li>
            );
          }

          const page = parseInt(link.label);
          if (isNaN(page)) return null;

          return (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page)}
                className={cn(
                  "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                  {
                    "bg-gray-600 text-white border-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-700": link.active,
                  }
                )}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next Button */}
        <li>
          <button
            onClick={handleNext}
            disabled={current_page === last_page}
            className={cn(
              "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
              {
                "opacity-50 cursor-not-allowed": current_page === last_page,
              }
            )}
          >
            <span className="sr-only">Next</span>
            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationBar;

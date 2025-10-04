"use client";

import { PaginationInfo } from "@/ts/types/common";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

type PaginationBarProps = {
  pagination: PaginationInfo;
};

const PaginationBar = ({ pagination }: PaginationBarProps) => {
  const { current_page, links } = pagination;

  const getPageHref = (page: number) => {
    if (page < 1) {
      page = 1;
    } else if (page > pagination.last_page) {
      page = pagination.last_page;
    }
    return `${window.location.pathname}?page=${page}`;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={getPageHref(current_page - 1)} isActive={current_page > 1} />
        </PaginationItem>

        {links.slice(1, -1).map((link, index) => {
          if (link.label === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const page = parseInt(link.label);
          if (isNaN(page)) return null;

          return (
            <PaginationItem key={page}>
              <PaginationLink href={getPageHref(page)} isActive={page === current_page}>{page}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext href={getPageHref(current_page + 1)} isActive={current_page < pagination.last_page} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBar;

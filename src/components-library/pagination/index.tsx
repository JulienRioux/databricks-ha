import { FC, useCallback, useMemo } from "react";
import {
  Dots,
  FirstOrLastPageNumber,
  PageNumber,
  PaginationWrapper,
} from "./styles";
import { PaginationProps } from "./types";
import { generatePaginationNumbers } from "@/lib/pagination";

const Pagination: FC<PaginationProps> = ({ current, total, onChange }) => {
  const paginationNumbers = useMemo(
    () => generatePaginationNumbers({ total, current }),
    [total, current]
  );

  const handleClick = useCallback((page: number) => onChange(page), [onChange]);

  const handlePreviousClick = useCallback(
    () => current > 1 && onChange(current - 1),
    [current, onChange]
  );

  const handleNextClick = useCallback(
    () => current < total && onChange(current + 1),
    [current, total, onChange]
  );

  // Variables to decide wether to show the first and last item of pagination.
  const SHOW_FIRST_PAGE =
    paginationNumbers.length && !paginationNumbers?.includes(1);
  const SHOW_LAST_PAGE =
    paginationNumbers.length && !paginationNumbers?.includes(total);

  if (total === 0) return null;

  return (
    <PaginationWrapper>
      <PageNumber
        disabled={current === 1}
        onClick={handlePreviousClick}
        data-testid="previous-btn"
      >
        ←
      </PageNumber>

      {SHOW_FIRST_PAGE && (
        <FirstOrLastPageNumber>
          <PageNumber
            $isActive={current === 1}
            onClick={() => handleClick(1)}
            data-testid="first-page-button"
          >
            {1}
          </PageNumber>
          <Dots data-testid="first-page-dots">...</Dots>
        </FirstOrLastPageNumber>
      )}

      {paginationNumbers.map((pageNumber) => (
        <PageNumber
          key={pageNumber}
          $isActive={current === pageNumber}
          data-testid={
            current === pageNumber ? "pagination-btn-is-active" : undefined
          }
          onClick={() => handleClick(pageNumber)}
        >
          {pageNumber}
        </PageNumber>
      ))}

      {SHOW_LAST_PAGE && (
        <FirstOrLastPageNumber>
          <Dots data-testid="last-page-dots">...</Dots>
          <PageNumber
            $isActive={current === total}
            onClick={() => handleClick(total)}
            data-testid="last-page-button"
          >
            {total}
          </PageNumber>
        </FirstOrLastPageNumber>
      )}

      <PageNumber
        disabled={current === total}
        onClick={handleNextClick}
        data-testid="next-btn"
      >
        →
      </PageNumber>
    </PaginationWrapper>
  );
};

export default Pagination;

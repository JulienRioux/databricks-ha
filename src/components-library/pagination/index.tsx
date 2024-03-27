import { FC } from "react";
import {
  Dots,
  FirstOrLastPageNumber,
  PageNumber,
  PaginationWrapper,
} from "./styles";
import { PaginationProps } from "./types";
import { generatePaginationNumbers } from "@/lib/pagination";

const Pagination: FC<PaginationProps> = ({ current, total, onChange }) => {
  const handleClick = (page: number) => {
    onChange(page);
  };

  const paginationNumbers = generatePaginationNumbers({ total, current });

  return (
    <PaginationWrapper>
      {!paginationNumbers?.includes(1) && (
        <FirstOrLastPageNumber>
          <PageNumber $isActive={current === 1} onClick={() => handleClick(1)}>
            {1}
          </PageNumber>
          <Dots>...</Dots>
        </FirstOrLastPageNumber>
      )}

      {paginationNumbers.map((pageNumber) => (
        <PageNumber
          key={pageNumber}
          $isActive={current === pageNumber}
          onClick={() => handleClick(pageNumber)}
        >
          {pageNumber}
        </PageNumber>
      ))}

      {!paginationNumbers?.includes(total) && (
        <FirstOrLastPageNumber>
          <Dots>...</Dots>
          <PageNumber
            $isActive={current === total}
            onClick={() => handleClick(total)}
          >
            {total}
          </PageNumber>
        </FirstOrLastPageNumber>
      )}
    </PaginationWrapper>
  );
};

export default Pagination;

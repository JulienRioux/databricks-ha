/**
 * Calculates a range of page numbers for pagination, centered around the current page.
 * It generates up to 7 numbers.
 *
 * @param {Object} params - Parameters including total and current page numbers.
 * @param {number} params.total - Total number of pages.
 * @param {number} params.current - The currently active page.
 * @returns {number[]} An array of page numbers for pagination, including the current page.
 *
 * Example:
 * generatePaginationNumbers({ total: 10, current: 5 });
 * // Returns [2, 3, 4, 5, 6, 7, 8]
 */
export const generatePaginationNumbers = ({
  total,
  current,
}: {
  total: number;
  current: number;
}): number[] => {
  // Determine the start and end page numbers
  let startPage: number = Math.max(1, Math.min(current - 3, total - 6));
  let endPage: number = Math.min(total, startPage + 6);

  // Generate the range of page numbers
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => i + startPage
  );
};

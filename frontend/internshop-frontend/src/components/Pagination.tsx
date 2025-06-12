import React from "react";
import Button from "../components/Buttons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="mt-4 flex justify-center space-x-2">
      <Button
        variant="primary"
        size="small"
        onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
        disabled={currentPage === 0}
        className="disabled:opacity-50"
      >
        Previous
      </Button>

      {[...Array(totalPages)].map((_, i) => (
        <Button
          key={i}
          size="small"
          variant={currentPage === i ? "primary" : "secondary"}
          onClick={() => onPageChange(i)}
          disabled={currentPage === i}
          className={currentPage === i ? "font-bold opacity-100" : ""}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        variant="primary"
        size="small"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
        disabled={currentPage === totalPages - 1}
        className="disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;

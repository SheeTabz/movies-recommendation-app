interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const maxVisible = 5;
  const startPage = Math.max(1, Math.min(totalPages - maxVisible + 1, currentPage - Math.floor(maxVisible / 2)));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all duration-200 text-sm"
      >
        Previous
      </button>
      
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const pageNum = startPage + i;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
              currentPage === pageNum
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all duration-200 text-sm"
      >
        Next
      </button>
    </div>
  );
}
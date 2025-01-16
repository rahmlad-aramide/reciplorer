import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const DropdownFilterSkeleton = (): React.ReactElement => {
    return (
      <div className="animate-pulse flex w-full">
        {/* Skeleton for the trigger */}
        <div className="h-10 w-full md:min-w-40 bg-gray-200 rounded-md"></div>
      </div>
    );
  };

  export function DesktopTableSkeleton({ columnCount = 5, rowCount = 10 }: { columnCount?: number; rowCount?: number }) {
    return (
      <Table>
        {/* Skeleton for Table Header */}
        <TableHeader className="bg-neutral-100 text-neutral-600 rounded py-4 animate-pulse">
          <TableRow>
            {Array.from({ length: columnCount }).map((_, index) => (
              <TableHead key={index}>
                <div className="h-6 bg-gray-200 rounded mx-auto"></div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        
        {/* Skeleton for Table Body */}
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="animate-pulse">
              {Array.from({ length: columnCount }).map((_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

export const MobileTableSkeleton: React.FC<{ rowCount?: number }> = ({ rowCount = 10 }) => {
  return (
    <div className="flex flex-col w-full">
      {Array.from({ length: rowCount }).map((_, index) => (
        <div
          key={index}
          className="py-4 md:px-4 border-b-2 flex gap-2 animate-pulse"
        >
          {/* Skeleton for the thumbnail */}
          <div className="flex mr-4 w-20">
            <div className="w-20 h-20 bg-gray-200 border rounded-lg"></div>
          </div>

          {/* Skeleton for the text content */}
          <div className="flex flex-col flex-1 justify-between">
            {/* Name skeleton */}
            <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
            {/* Category and Area skeleton */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
              <div className="h-1 w-1 rounded-full bg-gray-300"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
            </div>
            {/* Tags skeleton */}
            <div className="flex justify-end gap-1">
              {Array.from({ length: 2 }).map((_, tagIndex) => (
                <div
                  key={tagIndex}
                  className="h-6 bg-gray-200 rounded-full px-2 py-1 w-16"
                ></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
  
  export function RecipeTableHeadSkeleton(): React.ReactElement {
    return (
      <div className="flex items-center justify-between md:justify-start gap-4 py-4 animate-pulse">
        {/* Skeleton for the search input */}
        <div className="relative flex items-center w-full">
          <div className="w-full md:max-w-xs h-10 bg-gray-200 rounded-md pl-8"></div>
          <div className="absolute left-2 top-1/2 h-[18px] w-[18px] bg-gray-300 rounded-full -translate-y-1/2"></div>
        </div>
        {/* Skeleton for the filters */}
        <div className="flex gap-4">
          {/* Mobile filter button */}
          <div className="flex md:hidden w-10 h-10 bg-gray-200 rounded-md"></div>
          {/* Dropdown filters for desktop */}
          <div className="hidden md:flex gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="w-24 h-10 bg-gray-200 rounded-md"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export const TablePaginationSkeleton: React.FC = () => {
    return (
      <div className="flex flex-col xs:flex-row gap-2 items-center justify-between px-2 animate-pulse">
        {/* Showing X of Y Skeleton */}
        <div className="flex text-sm text-muted-foreground">
          <div className="h-4 bg-gray-200 rounded-md w-32"></div>
        </div>
        
        {/* Pagination Buttons Skeleton */}
        <div className="flex items-center space-x-2">
          {/* First Page Button */}
          <div className="hidden lg:flex h-8 w-8 bg-gray-200 rounded-md"></div>
          {/* Previous Page Button */}
          <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
          {/* Numbered Page Buttons */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-8 w-8 bg-gray-200 rounded-md"
            ></div>
          ))}
          {/* Next Page Button */}
          <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
          {/* Last Page Button */}
          <div className="hidden lg:flex h-8 w-8 bg-gray-200 rounded-md"></div>
        </div>
  
        {/* Rows per Page Selector Skeleton */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="h-4 bg-gray-200 rounded-md w-20"></div>
          <div className="h-8 w-[70px] bg-gray-200 rounded-md"></div>
        </div>
      </div>
    );
  };
 
  export function RecipeTableSkeleton(): React.ReactElement {
    return (
      <>
      <div className="rounded-md transition duration-200">
        <RecipeTableHeadSkeleton />
      </div>
      <div className="hidden md:flex mt-4">
        <DesktopTableSkeleton columnCount={5} rowCount={10} />
      </div>
      <div className="flex md:hidden mt-4">
        <MobileTableSkeleton rowCount={10} />
      </div>
      <div className="mt-4">
        <TablePaginationSkeleton />
      </div>
      </>
    )}
import { render, screen, fireEvent } from "@testing-library/react";
import { TablePagination } from "@/app/recipes/pagination";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

interface RecipeRow {
  idMeal: string;
  strMeal: string;
  strCategory: string;
}

const columnHelper = createColumnHelper<RecipeRow>();

const columns = [
  columnHelper.accessor("strMeal", {
    header: "Recipe Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("strCategory", {
    header: "Category",
    cell: (info) => info.getValue(),
  }),
];

const mockData: RecipeRow[] = [
  { idMeal: "1", strMeal: "Spaghetti", strCategory: "Pasta" },
  { idMeal: "2", strMeal: "Pizza", strCategory: "Italian" },
  { idMeal: "3", strMeal: "Burger", strCategory: "Fast Food" },
  { idMeal: "4", strMeal: "Tacos", strCategory: "Mexican" },
];

describe("TablePagination", () => {
  const table = useReactTable<RecipeRow>({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 2,
      },
    },
  });

  it("renders pagination controls correctly", () => {
    render(<TablePagination table={table} />);

    // Check "Rows per page" text
    expect(screen.getByText("Rows per page")).toBeInTheDocument();

    // Check page navigation buttons
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
  });

  it("displays the correct number of rows", () => {
    render(<TablePagination table={table} />);

    // Check the "Showing X of Y" text
    expect(screen.getByText("Showing 2 of 4.")).toBeInTheDocument();
  });

  it("navigates to the correct page when buttons are clicked", () => {
    render(<TablePagination table={table} />);

    // Click on the second page button
    const pageButton = screen.getByRole("button", { name: "2" });
    fireEvent.click(pageButton);

    // Verify the page index is updated
    expect(table.getState().pagination.pageIndex).toBe(1);
  });

  it("updates rows per page when changed", () => {
    render(<TablePagination table={table} />);

    // Change rows per page to 3
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "3" } });

    // Verify the page size is updated
    expect(table.getState().pagination.pageSize).toBe(3);
  });

  it("disables navigation buttons when there are no additional pages", () => {
    render(<TablePagination table={table} />);

    // Check "Previous" and "First" buttons are disabled on the first page
    expect(screen.getByRole("button", { name: "Go to first page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Go to previous page" })).toBeDisabled();

    // Click to go to the last page
    const lastPageButton = screen.getByRole("button", { name: "Go to last page" });
    fireEvent.click(lastPageButton);

    // Check "Next" and "Last" buttons are disabled on the last page
    expect(screen.getByRole("button", { name: "Go to next page" })).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });
});

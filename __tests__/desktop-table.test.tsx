import { render, screen, fireEvent } from '@testing-library/react';
import { DesktopTable } from '@/app/recipes/desktop-table';
import { useRouter } from 'next/navigation';
import { ColumnDef, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

interface RecipeRow {
  idMeal: string;
  strMeal: string;
  strCategory: string;
}

describe('DesktopTable', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  const mockData: RecipeRow[] = [
    { idMeal: '1', strMeal: 'Spaghetti', strCategory: 'Pasta' },
    { idMeal: '2', strMeal: 'Pizza', strCategory: 'Italian' },
  ];

  const columnHelper = createColumnHelper<RecipeRow>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<RecipeRow, any>[] = [
    columnHelper.accessor((row) => row.strMeal, {
      id: 'strMeal',
      header: 'Recipe Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.strCategory, {
      id: 'strCategory',
      header: 'Category',
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable<RecipeRow>({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  it('renders table headers and rows correctly', () => {
    render(<DesktopTable columns={columns} table={table} />);

    // Check headers
    expect(screen.getByText('Recipe Name')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();

    // Check rows
    expect(screen.getByText('Spaghetti')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
    expect(screen.getByText('Italian')).toBeInTheDocument();
  });

  it('displays "No results" when there are no rows', () => {
    const emptyTable = useReactTable<RecipeRow>({
      data: [],
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    render(<DesktopTable columns={columns} table={emptyTable} />);

    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('navigates to the correct route when a row is clicked', () => {
    render(<DesktopTable columns={columns} table={table} />);

    // Click on the first row
    fireEvent.click(screen.getByText('Spaghetti'));

    // Check if push was called with the correct route
    expect(mockPush).toHaveBeenCalledWith('/recipes/1');
  });
});

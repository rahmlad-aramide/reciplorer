import { render, screen } from '@testing-library/react';
import { SimilarRecipeTable } from '@/app/recipes/[idMeal]/similar-recipe-table';

const mockData = [
  { strMeal: 'Recipe 1', strMealThumb: '/image1.jpg', idMeal: '1' },
  { strMeal: 'Recipe 2', strMealThumb: '/image2.jpg', idMeal: '2' },
];

const mockColumns = [
  { id: 'name', header: 'Name', accessorKey: 'strMeal' },
];

describe('SimilarRecipeTable', () => {
  it('renders similar recipes correctly', () => {
    render(<SimilarRecipeTable columns={mockColumns} data={mockData} />);

    expect(screen.getByText('Recipe 1')).toBeInTheDocument();
    expect(screen.getByText('Recipe 2')).toBeInTheDocument();
  });
});

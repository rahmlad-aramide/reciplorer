import { render, screen } from "@testing-library/react";
import { MobileTable } from "@/app/recipes/mobile-table";
import { Tags } from "@/app/recipes/tags";
import { StaticImageData } from "next/image";
import placeholderImage from "@/assets/placeholder.png";

// Mock the Tags component
jest.mock("@/components/tags", () => ({
  Tags: jest.fn(() => <div>Mocked Tags</div>),
}));

interface RecipeRow {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strTags: string | null;
  strMealThumb: string | StaticImageData;
}

const mockData: RecipeRow[] = [
  {
    idMeal: "1",
    strMeal: "Spaghetti",
    strCategory: "Pasta",
    strArea: "Italian",
    strTags: "Dinner,Easy",
    strMealThumb: "/images/spaghetti.jpg",
  },
  {
    idMeal: "2",
    strMeal: "Pizza",
    strCategory: "Fast Food",
    strArea: "American",
    strTags: null,
    strMealThumb: "",
  },
];

describe("MobileTable", () => {
  const getRowKey = (row: RecipeRow) => row.idMeal;
  const getLinkHref = (row: RecipeRow) => `/recipes/${row.idMeal}`;
  const getThumbnail = (row: RecipeRow) => row.strMealThumb || placeholderImage;
  const getName = (row: RecipeRow) => row.strMeal;
  const getCategory = (row: RecipeRow) => row.strCategory;
  const getArea = (row: RecipeRow) => row.strArea;
  const getTags = (row: RecipeRow) => row.strTags;

  it("renders all rows with correct data", () => {
    render(
      <MobileTable
        rows={mockData}
        getRowKey={getRowKey}
        getLinkHref={getLinkHref}
        getThumbnail={getThumbnail}
        getName={getName}
        getCategory={getCategory}
        getArea={getArea}
        getTags={getTags}
      />
    );

    // Check if rows are rendered
    expect(screen.getByText("Spaghetti")).toBeInTheDocument();
    expect(screen.getByText("Pizza")).toBeInTheDocument();

    // Check category and area
    expect(screen.getByText("Pasta")).toBeInTheDocument();
    expect(screen.getByText("Italian")).toBeInTheDocument();
    expect(screen.getByText("Fast Food")).toBeInTheDocument();
    expect(screen.getByText("American")).toBeInTheDocument();
  });

  it("renders placeholder image if thumbnail is missing", () => {
    render(
      <MobileTable
        rows={mockData}
        getRowKey={getRowKey}
        getLinkHref={getLinkHref}
        getThumbnail={getThumbnail}
        getName={getName}
        getCategory={getCategory}
        getArea={getArea}
        getTags={getTags}
      />
    );

    // Check if the placeholder image is used for the second row
    const images = screen.getAllByRole("img");
    expect(images[1]).toHaveAttribute("src", placeholderImage);
  });

  it("calls the Tags component with correct props", () => {
    render(
      <MobileTable
        rows={mockData}
        getRowKey={getRowKey}
        getLinkHref={getLinkHref}
        getThumbnail={getThumbnail}
        getName={getName}
        getCategory={getCategory}
        getArea={getArea}
        getTags={getTags}
      />
    );

    // Ensure the Tags component is rendered
    expect(Tags).toHaveBeenCalledWith(
      { tags: "Dinner,Easy", isMobile: true },
      {}
    );
  });

  it("renders links with correct hrefs", () => {
    render(
      <MobileTable
        rows={mockData}
        getRowKey={getRowKey}
        getLinkHref={getLinkHref}
        getThumbnail={getThumbnail}
        getName={getName}
        getCategory={getCategory}
        getArea={getArea}
        getTags={getTags}
      />
    );

    // Check if links have the correct hrefs
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/recipes/1");
    expect(links[1]).toHaveAttribute("href", "/recipes/2");
  });
});

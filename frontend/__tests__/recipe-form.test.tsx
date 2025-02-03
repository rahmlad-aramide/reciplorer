import { render, screen, fireEvent } from "@testing-library/react";
import RecipeForm from "@/app/recipes/new/recipe-form"; // Update with the actual path
import "@testing-library/jest-dom";

const mockAddRecipe = jest.fn();

describe("RecipeForm Component", () => {
  it("renders all form fields and the submit button", () => {
    render(<RecipeForm onAddRecipe={mockAddRecipe} />);
    
    expect(screen.getByLabelText(/Recipe Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Area/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tags \(Comma-separated\)/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows validation messages when required fields are empty", async () => {
    render(<RecipeForm onAddRecipe={mockAddRecipe} />);
    
    // Submit the form without filling in the fields
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    // Expect validation messages to appear
    expect(await screen.findByText(/Recipe Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Category is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Area is required/i)).toBeInTheDocument();
  });

  it("submits the form and shows the success drawer", async () => {
    render(<RecipeForm onAddRecipe={mockAddRecipe} />);
    
    // Fill in the fields
    fireEvent.change(screen.getByLabelText(/Recipe Name/i), { target: { value: "Spaghetti Bolognese" } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: "Pasta" } });
    fireEvent.change(screen.getByLabelText(/Area/i), { target: { value: "Italian" } });
    fireEvent.change(screen.getByLabelText(/Tags \(Comma-separated\)/i), { target: { value: "Dinner,Easy" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    // Expect the success drawer to appear
    expect(await screen.findByText(/Success!!!/i)).toBeInTheDocument();
    expect(screen.getByText(/Recipe was added successfully/i)).toBeInTheDocument();
  });

  it("handles drawer actions correctly", async () => {
    render(<RecipeForm onAddRecipe={mockAddRecipe} />);

    // Fill in the fields and submit the form
    fireEvent.change(screen.getByLabelText(/Recipe Name/i), { target: { value: "Spaghetti Bolognese" } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: "Pasta" } });
    fireEvent.change(screen.getByLabelText(/Area/i), { target: { value: "Italian" } });
    fireEvent.change(screen.getByLabelText(/Tags \(Comma-separated\)/i), { target: { value: "Dinner,Easy" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Expect the success drawer to appear
    expect(await screen.findByText(/Success!!!/i)).toBeInTheDocument();

    // Test "Add Another Recipe" button
    const addAnotherButton = screen.getByRole("button", { name: /add another recipe/i });
    fireEvent.click(addAnotherButton);
    expect(screen.queryByText(/Success!!!/i)).not.toBeInTheDocument(); // Drawer should close

    // Test "Go Back" button
    fireEvent.click(screen.getByRole("button", { name: /submit/i })); // Reopen the drawer
    const goBackButton = screen.getByRole("button", { name: /go back/i });
    fireEvent.click(goBackButton);
    expect(screen.queryByText(/Success!!!/i)).not.toBeInTheDocument(); // Drawer should close
  });
});

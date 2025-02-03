"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { generateLocalId } from "@/lib/helper";
import { IRecipe } from "@/types";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SuccessIcon } from "@/assets/svg";

const recipeFormSchema = z.object({
  recipeName: z.string().min(3, "Recipe Name must be at least 3 characters long"),
  category: z.string().nonempty("Category is required"),
  area: z.string().nonempty("Area is required"),
  tags: z.string().optional(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

const RecipeForm = ({ onAddRecipe }: { onAddRecipe: (recipe: IRecipe) => void }) => {
  const {push} = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false);

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      recipeName: "",
      category: "",
      area: "",
      tags: "",
    },
  });

  const handleSubmit = (data: RecipeFormValues) => {
    const newRecipe: IRecipe = {
      idMeal: generateLocalId(),
      strMeal: data.recipeName,
      strCategory: data.category,
      strArea: data.area,
      strTags: data.tags || null,
      strMealThumb: "",
      strYoutube: "",
      strIngredient1: "",
      strIngredient2: "",
      strIngredient3: "",
      strIngredient4: "",
      strIngredient5: "",
      strIngredient6: "",
      strIngredient7: "",
      strIngredient8: "",
      strIngredient9: "",
      strIngredient10: "",
      strIngredient11: "",
      strIngredient12: "",
      strIngredient13: "",
      strIngredient14: "",
      strIngredient15: "",
      strDrinkAlternate: "",
      strInstructions: "",
      strImageSource: "",
      strCreativeCommonsConfirmed: "",
      dateModified: "",
    };

    onAddRecipe(newRecipe);
    setDrawerOpen(true);
    form.reset();
  };

  const handleAddAnother = () => {
    setDrawerOpen(!drawerOpen);
    form.reset();
  };

  const handleGoBack = () => {
    setDrawerOpen(!drawerOpen);
    push('/recipes')
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-5 w-full max-w-md">
          <FormField
            name="recipeName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Recipe Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Category" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="area"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Area" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (Comma-separated)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Tags" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" variant="secondary" size={'lg'} className="mt-4 w-full">
              Submit <ArrowRight />
            </Button>
          </div>
        </form>
      </Form>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-xl my-2 text-neutral-800 text-center">
              <div className="flex justify-center">
                <SuccessIcon />
              </div>
                  Success!!!
            </DrawerTitle>
            <DrawerDescription className="text-base text-center">
            <p>Recipe was added successfully.</p>
              What would you like to do next?
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="max-w-md w-full mx-auto">
            <Button onClick={handleAddAnother} variant="secondary" size={'lg'}>
              Add Another Recipe
            </Button>
            <DrawerClose asChild>
              <Button onClick={handleGoBack} variant="outline">
                Go Back
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RecipeForm;

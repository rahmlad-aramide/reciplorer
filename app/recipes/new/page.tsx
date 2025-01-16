'use client'
import { useRecipeContext } from "@/contexts/RecipeContext";
import RecipeForm from "./recipe-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AddRecipe () {
    const { addRecipe } = useRecipeContext();
    return (
        <main className="py-10 font-[family-name:var(--font-geist-sans)]">
            <section className="container mx-auto bg-white p-5 md:px-10 lg:px-20 mt-10 rounded-lg">
                <div className="flex gap-1 md:col-span-2 mb-2">
                    <Link
                        href={"/recipes"}
                        className="flex justify-center items-center hover:scale-110 transition duration-200"
                    >
                        <ChevronLeft size={20} color="#292D32" />
                        <span>Back</span>
                    </Link>
                </div>
                <h1 className="text-xl/normal font-semibold text-neutral-800">Add a new recipe</h1>
                {/* Add recipe form */}
                <RecipeForm onAddRecipe={addRecipe} />
            </section>
        </main>
    )
}
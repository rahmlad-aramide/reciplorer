import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import hero from "@/assets/hero.webp";
import image1 from "@/assets/Broccoli.png";
import image2 from "@/assets/Tomato.png";
import image3 from "@/assets/Garlic.png";
import image4 from "@/assets/chicken.png";
import image5 from "@/assets/onion.png";
import image6 from "@/assets/pepper.png";

export default function Home() {
  const imagesArray = [image1, image2, image3, image4, image5, image6];
  return (
    <main className="lg:container flex flex-col md:flex-row items-center justify-items-center min-h-screen gap-8 mt-20 px-4 md:px-5 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-7 md:gap-14 w-full md:w-1/2 mt-16 md:my-8">
        <div className="flex flex-col gap-7">
          <h1 className="text-5xl/[3.5rem] md:text-6xl/[4rem] font-[family-name:var(--font-aloevera-bold)] font-bold">
            Cooking Made Simple: Unleash your culinary creativity.
          </h1>
          <p className="text-xl font-normal text-[#7F7D7D]">
            Discover over a <span className="text-secondary">thousand recipes</span> at your fingertips. With our
            curated collection of the best recipes, you&apos;ll find the easiest
            ways to cook delicious meals every time. Let your culinary journey
            begin!
          </p>
        </div>
        <Link
          href={"/recipes"}
          className="flex justify-center items-center bg-secondary text-white text-xl/normal shadow-sm hover:bg-secondary/80 gap-2 rounded-md px-6 h-12 transition duration-200 leading-none max-w-xs"
        >
          <ShoppingBasket size={24} />
          Explore Recipes
        </Link>
      </div>
      <div className="relative overflow-clip flex w-full md:w-1/2">
        <div className="flex p-5">
          <Image
            src={hero}
            width={1500}
            height={1352}
            alt="A chicken holding a plate of food"
            className="w-full"
          />
        </div>
        {/* Orbiting Images */}
        <div className="absolute inset-0 animate-spin-slow">
          {imagesArray.map((src, index) => {
            const angle = (360 / imagesArray.length) * index;
            return (
              <div
                key={index}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "center",
                }}
              >
                <div
                  className="absolute left-1/2 top-0 transform -translate-x-1/2"
                  style={{
                    transform: `translateY(-0.1rem) rotate(-${angle}deg)`,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Orbit ${index + 1}`}
                    width={48}
                    height={48}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

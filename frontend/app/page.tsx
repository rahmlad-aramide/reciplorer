import { ShoppingBasket, Heart, ListChecks, Brain, Map, Calculator, ChefHat } from "lucide-react";
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
    <main className="font-[family-name:var(--font-geist-sans)] text-black">
      {/* Hero Section */}
      <section className="lg:container flex flex-col md:flex-row items-center justify-items-center min-h-screen gap-8 mt-10 px-4 md:px-5">
        <div className="flex flex-col gap-7 md:gap-14 w-full md:w-1/2 mt-16 md:my-8">
          <div className="flex flex-col gap-7">
            <h1 className="text-5xl/[3.5rem] md:text-6xl/[4rem] font-[family-name:var(--font-aloevera-bold)] font-bold">
              Cooking Made Simple: Unleash your culinary creativity.
            </h1>
            <p className="text-xl font-normal text-[#7F7D7D]">
              Discover over a <span className="text-secondary">thousand recipes</span> at your fingertips. With our
              curated collection, you&apos;ll find the easiest
              ways to cook delicious meals every time.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href={"/recipes"}
              className="flex justify-center items-center bg-secondary text-white text-xl/normal shadow-sm hover:bg-secondary/80 gap-2 rounded-md px-6 h-12 transition duration-200 leading-none max-w-xs"
            >
              <ShoppingBasket size={24} />
              Explore Recipes
            </Link>
            <Link
                href="/register"
                className="flex justify-center items-center border-2 border-primary text-primary text-xl/normal shadow-sm hover:bg-primary/10 gap-2 rounded-md px-6 h-12 transition duration-200 leading-none"
            >
                Get Started
            </Link>
          </div>
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
          <div className="absolute inset-0 animate-spin-slow pointer-events-none">
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
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 py-20 px-4 md:px-5">
        <div className="lg:container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 font-[family-name:var(--font-aloevera-bold)]">Why Choose Reciplorer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
                icon={<Brain className="text-primary" size={40} />}
                title="AI Cooking Assistant"
                description="Get instant answers to your cooking questions, from ingredient substitutions to technique tips."
            />
            <FeatureCard
                icon={<Heart className="text-secondary" size={40} />}
                title="Personalized Experience"
                description="Set your dietary preferences (Vegan, Halal, etc.) and get recommendations tailored just for you."
            />
            <FeatureCard
                icon={<ListChecks className="text-blue-500" size={40} />}
                title="Smart Shopping Lists"
                description="Automatically generate shopping lists from your recipes and track what's in your pantry."
            />
            <FeatureCard
                icon={<Map className="text-green-500" size={40} />}
                title="Global Discovery"
                description="Explore cuisines from around the world with our interactive map-based dish explorer."
            />
            <FeatureCard
                icon={<Calculator className="text-orange-500" size={40} />}
                title="Nutritional Breakdown"
                description="Stay on track with detailed calorie, protein, and carb information for every meal."
            />
             <FeatureCard
                icon={<ChefHat className="text-purple-500" size={40} />}
                title="Meal Planner"
                description="Organize your week with ease using our drag-and-drop meal planning tool."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-5">
        <div className="lg:container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16 font-[family-name:var(--font-aloevera-bold)]">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-around items-center gap-12">
            <Step number="1" title="Discover" description="Browse thousands of curated recipes or use AI to find exactly what you need." />
            <Step number="2" title="Plan" description="Add recipes to your weekly plan and generate an instant shopping list." />
            <Step number="3" title="Cook" description="Follow step-by-step instructions with real-time assistance from our AI." />
          </div>
        </div>
      </section>

      {/* Community / Testimonial Section */}
      <section className="bg-primary text-white py-20 px-4 md:px-5">
        <div className="lg:container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 font-[family-name:var(--font-aloevera-bold)]">Join Our Community</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            &quot;Reciplorer has completely changed how I cook. The AI assistant is a lifesaver when I&apos;m missing an ingredient!&quot;
          </p>
          <p className="font-bold">- Sarah J., Home Cook</p>
          <Link
            href="/register"
            className="inline-block mt-12 bg-white text-primary font-bold text-xl px-10 py-4 rounded-full hover:bg-neutral-100 transition duration-200"
          >
            Start Your Culinary Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 border-t">
        <p>&copy; 2024 Reciplorer. All rights reserved.</p>
      </footer >
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center max-w-xs">
      <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">{number}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

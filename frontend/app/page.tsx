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

import { CheckCircle, Star, Users, Zap } from "lucide-react";

export default function Home() {
  const imagesArray = [image1, image2, image3, image4, image5, image6];
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="lg:container flex flex-col md:flex-row items-center justify-items-center min-h-[90vh] gap-8 pt-20 px-4 md:px-5">
        <div className="flex flex-col gap-7 md:gap-14 w-full md:w-1/2 mt-16 md:my-8">
          <div className="flex flex-col gap-7">
            <h1 className="text-5xl/[3.5rem] md:text-6xl/[4rem] font-bold tracking-tight">
              Cooking Made Simple: Unleash your culinary creativity.
            </h1>
            <p className="text-xl font-normal text-slate-600">
              Discover over a <span className="text-secondary">thousand recipes</span> at your fingertips. With our
              curated collection, you&apos;ll find the easiest
              ways to cook delicious meals every time.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href={"/login"}
              className="flex justify-center items-center bg-primary text-white text-lg font-medium shadow-sm hover:bg-primary/90 gap-2 rounded-lg px-8 h-12 transition-all duration-200"
            >
              Get Started
            </Link>
            <Link
              href={"#features"}
              className="flex justify-center items-center bg-white border border-slate-200 text-slate-900 text-lg font-medium shadow-sm hover:bg-slate-50 gap-2 rounded-lg px-8 h-12 transition-all duration-200"
            >
              Learn More
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
      <section id="features" className="py-24 bg-white">
        <div className="lg:container px-4 md:px-5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need to cook like a pro</h2>
            <p className="text-lg text-slate-600">Reciplorer comes packed with features to make your cooking journey seamless and enjoyable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Zap className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-xl font-bold mb-3">Quick Discovery</h3>
              <p className="text-slate-600">Find the perfect recipe in seconds with our advanced multi-tier filtering system.</p>
            </div>
            <div className="p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-xl font-bold mb-3">Community Driven</h3>
              <p className="text-slate-600">Share your own culinary masterpieces and get inspired by others in our vibrant community.</p>
            </div>
            <div className="p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Star className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-xl font-bold mb-3">AI Assistant</h3>
              <p className="text-slate-600">Get instant answers to substitution questions and cooking tips from our AI assistant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="lg:container px-4 md:px-5">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">How Reciplorer Works</h2>
               <div className="space-y-6">
                  {[
                    "Sign up for a free account to personalize your experience.",
                    "Browse through thousands of curated recipes or search by ingredients.",
                    "Save your favorites to custom collections for easy access.",
                    "Use the meal planner and shopping list tools to stay organized."
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <p className="text-lg text-slate-700">{step}</p>
                    </div>
                  ))}
               </div>
            </div>
            <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
               {/* Mockup or Image */}
               <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                  Application Preview
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="lg:container px-4 md:px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">Loved by home cooks everywhere</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", text: "Reciplorer changed the way I meal prep. The AI assistant is a lifesaver!", role: "Home Chef" },
              { name: "Mark T.", text: "The best recipe app I've ever used. So clean and easy to navigate.", role: "Food Blogger" },
              { name: "Elena R.", text: "I love sharing my recipes with the community. It's so rewarding!", role: "Amateur Cook" }
            ].map((t, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-lg border border-slate-100 italic">
                <p className="text-slate-700 mb-6 font-medium">"{t.text}"</p>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="lg:container px-4 md:px-5">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                 <div className="w-10 h-10 bg-primary rounded-lg"></div>
                 <span className="text-2xl font-bold">Reciplorer</span>
              </div>
              <div className="flex gap-8 text-slate-400">
                 <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                 <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                 <Link href="#" className="hover:text-white transition-colors">Contact</Link>
              </div>
              <p className="text-slate-500">© 2024 Reciplorer. All rights reserved.</p>
           </div>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link"
import logo from '@/assets/placeholder.png';
import Image from "next/image";
import { ShoppingBasket, UserRound } from "lucide-react";

export const Navbar = () => {
    return (
        <header className="shadow fixed top-0 w-full bg-white z-50 h-20 flex my-auto">
            <nav className="container mx-auto my-auto px-5 py-3 font-[family-name:var(--font-geist-sans)]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="font-bold text-lg sm:text-2xl/normal text-primary flex items-center gap-1">
                            <Image src={logo} alt="Reciplorer logo" width={700} height={700} className="h-8 md:h-10 w-8 md:w-10 rounded-lg" />
                            Reciplorer
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center text-xl/normal gap-[50px]">
                        <Link href="/" className="hover:underline underline-offset-2">Home</Link>
                        <Link href="/recipes" className="hover:underline underline-offset-2">Recipes</Link>
                    </div>
                    <div className="flex items-center text-sm sm:text-xl/normal gap-[50px]">
                        <Link href="/" className="hidden md:flex transition duration-200 hover:scale-110"><UserRound /></Link>
                        <Link href={'/recipes'} className="flex md:hidden justify-center items-center bg-secondary text-white shadow-sm hover:bg-secondary/80 gap-1 rounded-md px-4 h-9 transition duration-200 leading-none">
                            <ShoppingBasket size={20} />
                            Explore
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}
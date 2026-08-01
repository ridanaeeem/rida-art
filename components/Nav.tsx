"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Caveat } from "next/font/google";
import { Darker_Grotesque } from "next/font/google";
import { Arimo } from "next/font/google";
import Image from "next/image";
import concerts from "/public/concerts.gif";
import film from "/public/film.gif";

const arimo = Arimo({ subsets: ["latin"] });
const darker_grotesque = Darker_Grotesque({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"] });

export default function Nav() {
	const pathname = usePathname();

	return (
		<nav>
			<div className="bg-white text-black px-20">
				<div className="header flex flex-col font-bold">
					<h1
						className={`text-4xl md:text-left md:text-7xl lg:text-8xl xl:text-8xl pl-[2vw] lg:pl-[1vw] ${darker_grotesque.className}`}>
						<Link href="/">RIDA NAEEM</Link>
					</h1>
				</div>
				<ul className="text-xl md:text-3xl flex font-normal max-md:text-center max-md:justify-center ">
					{/* {pathname !== "/" && ( */}
					<div className="flex flex-col md:flex-row justify-center items-center">
						<li className={`px-5 ${pathname === "/concerts" ? "text-[#809BB3]" : "null"}`}>
							<Link href="/3d">3D</Link>
						</li>
						<li className={`px-5 ${pathname === "/personal" ? "text-[#809BB3]" : "null"}`}>
							<Link href="/2d">2D</Link>
						</li>
					</div>
					{/* )} */}
					<li className={`px-5 ${pathname === "/photos" ? "text-[#809BB3]" : "null"}`}>
						<a href="https://photos.rnaeem.com" target="_blank">
							Photos
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

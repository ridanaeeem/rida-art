"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ModalData, defaultPhoto } from "../types";
import artArray from "@/components/ArtArray";
import ceramicsArray from "@/components/CeramicsArray";
import Link from "next/link";
import { Darker_Grotesque } from "next/font/google";

const darker_grotesque = Darker_Grotesque({ subsets: ["latin"] });

export default function Page() {
	const [modalData, setModalData] = useState<ModalData>({
		photo: defaultPhoto,
		isOpen: false,
		showLink: false,
	});

	for (let i = 0; i < artArray.length; i++) {
		artArray[i].index = i;
	}

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setModalData({
					photo: defaultPhoto,
					isOpen: false,
					showLink: false,
				});
			}
		};
		const handleLeft = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				setModalData((prevModalData) => {
					let newIndex = (prevModalData.photo.index - 1 + artArray.length) % artArray.length;

					return {
						...prevModalData,
						photo: artArray[newIndex],
						isOpen: true,
					};
				});
			}
		};
		const handleRight = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight") {
				setModalData((prevModalData) => {
					let newIndex = (prevModalData.photo.index + 1) % artArray.length;

					return {
						...prevModalData,
						photo: artArray[newIndex],
						isOpen: true,
					};
				});
			}
		};
		if (modalData.isOpen) {
			window.addEventListener("keydown", handleEsc);
			window.addEventListener("keydown", handleLeft);
			window.addEventListener("keydown", handleRight);
		}
		return () => {
			window.removeEventListener("keydown", handleEsc);
			window.removeEventListener("keydown", handleLeft);
			window.removeEventListener("keydown", handleRight);
		};
	}, [modalData.isOpen]);

	const transitionLength = 1;

	return (
		<div>
			<title>Film Photography</title>
			<main>
				<div className="bg-white">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{
							duration: transitionLength,
						}}>
						<div className="p-2 mx-[5vw] lg:mx-20 md:p-5">
							<div className="text-l md:text-3xl flex font-normal max-md:text-center max-md:justify-center text-black"></div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 ">
								<Link href="/3d" key={0} className="flex justify-center items-center relative ">
									<img
										className="z-10 flex items-center justify-center transition-all duration-300 hover:brightness-50 "
										src={ceramicsArray[4].imageSrc[0]}
										alt="Ceramics"
									/>
									<p className={`z-10 text-5xl text-black absolute ${darker_grotesque.className}`}>
										Ceramics
									</p>
								</Link>
								<Link href="/2d" key={1} className="flex justify-center items-center relative">
									<img
										className="z-10 flex items-center justify-center transition-all duration-300 hover:brightness-50 "
										src={artArray[9].imageSrc[0]}
										alt="2D Art"
									/>{" "}
									<p className={`z-10 text-5xl text-black absolute ${darker_grotesque.className}`}>
										2D Art
									</p>
								</Link>
							</div>
						</div>
					</motion.div>
				</div>
			</main>
		</div>
	);
}

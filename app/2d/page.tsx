"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PhotoThumbnail from "@/components/PhotoThumbnail";
import PhotoModal from "@/components/PhotoModal";
import { ModalData, defaultPhoto } from "@/types";
import artArray from "@/components/ArtArray";

export default function Page2d() {
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
					<div className="inset-0 flex justify-center">
						<PhotoModal
							modalData={modalData}
							setModalData={setModalData}
							isFiltered={false}
							pageArray={artArray}
						/>
					</div>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{
							duration: transitionLength,
						}}>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 p-2 mx-[5vw] lg:mx-20 md:p-5">
							{artArray.map((photo) => (
								<div key={photo.index} className="relative">
									<PhotoThumbnail photo={photo} setModalData={setModalData} />
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</main>
		</div>
	);
}

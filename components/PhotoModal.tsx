import React from "react";
import { Darker_Grotesque } from "next/font/google";
import { ModalData, PhotoProps } from "@/types";
import Link from "next/link";

const darker_grotesque = Darker_Grotesque({ subsets: ["latin"] });

export default function PhotoModal({
	modalData,
	setModalData,
	isFiltered,
	pageArray,
}: {
	modalData: ModalData;
	setModalData: React.Dispatch<React.SetStateAction<ModalData>>;
	isFiltered: boolean;
	pageArray: PhotoProps[];
}) {
	if (!modalData.isOpen) return null;

	let path = "";

	return (
		<div
			className={`${
				darker_grotesque.className
			} ${"fixed lg:inset-0 z-50 flex flex-col items-center justify-center m-5 lg:m-10 xl:m-20 text-center font-normal"}`}>
			<div
				className="fixed inset-0 bg-black bg-opacity-85"
				onClick={() => setModalData({ ...modalData, isOpen: false })}
			/>
			<div className="relative bg-white p-3 md:p-5 rounded-lg text-[#171719] flex flex-center items-center justify-center flex-col flex-wrap break-words">
				<Link href={modalData.photo.imageSrc[modalData.photo.imageSrc.length - 1]} target="_blank">
					<img
						src={modalData.photo.imageSrc[modalData.photo.imageSrc.length - 1]}
						alt={modalData.photo.imageAlt}
						className="w-auto max-w-screen max-h-[75vh] mb-4 object-contain"
					/>
				</Link>
				<p className="text-2xl">
					{/* {description + ": "} */}
					{modalData.showLink && modalData.photo.collection !== "" ? (
						<Link
							href={`${path}${modalData.photo.collection}`}
							// target="_blank"
							rel="noreferrer"
							className="hover:text-[#910c0c]">
							View{" "}
							<strong>
								{modalData.photo.hasOwnProperty("collectionName")
									? modalData.photo.collectionName
									: "Collection"}
							</strong>
						</Link>
					) : null}
				</p>
				<p className="text-md md:text-3xl flex-wrap break-words object-contain">{modalData.photo.stats}</p>
				<p className="text-md md:text-3xl flex-wrap break-words object-contain">
					{modalData.photo.description}
				</p>
				<p>{modalData.photo.filtered}</p>
			</div>
			<div className="flex text-4xl justify-between m-2 text-white z-10">
				<button
					className="px-6"
					onClick={() => {
						setModalData((prevModalData: ModalData) => {
							let newIndex = (prevModalData.photo.index - 1 + pageArray.length) % pageArray.length;
							if (isFiltered) {
								while (pageArray[newIndex].filtered === false) {
									newIndex = (newIndex - 1 + pageArray.length) % pageArray.length;
								}
							}
							return {
								...prevModalData,
								photo: pageArray[newIndex],
								isOpen: true,
							};
						});
					}}>
					&larr;
				</button>
				<button
					className="px-6"
					onClick={() => {
						setModalData((prevModalData: ModalData) => {
							let newIndex = (prevModalData.photo.index + 1) % pageArray.length;
							if (isFiltered) {
								while (pageArray[newIndex].filtered === false) {
									newIndex = (newIndex + 1) % pageArray.length;
								}
							}
							return {
								...prevModalData,
								photo: pageArray[newIndex],
								isOpen: true,
							};
						});
					}}>
					&rarr;
				</button>
			</div>
		</div>
	);
}

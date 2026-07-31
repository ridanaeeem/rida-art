import { PhotoProps, ModalData } from "../types";

export default function PhotoThumbnail({
	setModalData,
	photo,
}: {
	setModalData: React.Dispatch<React.SetStateAction<ModalData>>;
	photo: PhotoProps;
}) {
	return (
		<img
			src={photo.imageSrc[0]}
			alt={photo.imageAlt}
			className="cursor-pointer h-full object-cover"
			onClick={() => setModalData({ photo: photo, isOpen: true, showLink: true })}></img>
	);
}

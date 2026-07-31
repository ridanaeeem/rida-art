export type ModalData = {
	photo: PhotoProps;
	isOpen: boolean;
	showLink?: boolean;
};

export type PhotoProps = {
	imageSrc: string[];
	imageAlt: string;
	materials: string;
	collection: string;
	collectionName?: string;
	stats: string;
	classAdjustments: string;
	tags?: string[];
	index: number;
	filtered?: boolean;
};

export const defaultPhoto: PhotoProps = {
	imageSrc: [],
	imageAlt: "",
	materials: "",
	collection: "",
	stats: "",
	classAdjustments: "",
	tags: [],
	index: 0,
	filtered: false,
};

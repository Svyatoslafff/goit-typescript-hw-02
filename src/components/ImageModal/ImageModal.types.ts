export type ImageModalProps = {
    isOpen: boolean;
    closeModal(): void;
    likes: number;
    img: string;
    alt: string;
    creator: { name: string; location: string };
};

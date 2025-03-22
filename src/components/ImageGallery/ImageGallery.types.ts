import { ImagesArray } from '../App/App.types';

export type ImageGallseryProps = {
    images: ImagesArray;
    onOpenModal: (id: string) => void;
};

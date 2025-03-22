import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.scss';
import React, { ReactElement } from 'react';
import { ImagesArray } from '../App/App.types';

export default function ImageGallery({
    images,
    onOpenModal,
}: {
    images: ImagesArray;
    onOpenModal: (id: string) => void;
}): ReactElement {
    return (
        <ul className={css.galleryList}>
            {images.map(image => {
                const { id } = image;
                return (
                    <li key={id} id={id} onClick={() => onOpenModal(id)}>
                        <ImageCard image={image} />
                    </li>
                );
            })}
        </ul>
    );
}

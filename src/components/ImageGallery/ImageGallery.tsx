import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.scss';
import React from 'react';
import * as types from './ImageGallery.types';

export default function ImageGallery({
    images,
    onOpenModal,
}: types.ImageGallseryProps) {
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

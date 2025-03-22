import { Image } from '../App/App.types';
import css from './ImageCard.module.scss';
import React from 'react';

export default function ImageCard({
    image: {
        urls: { small: smallImgUrl },
        alt_description,
    },
}: {
    image: Image;
}) {
    return (
        <img
            src={smallImgUrl}
            alt={alt_description}
            className={css.smallImage}
        />
    );
}

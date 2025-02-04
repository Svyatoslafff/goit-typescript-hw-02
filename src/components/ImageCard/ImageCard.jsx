import css from './ImageCard.module.scss';

export default function ImageCard({
    image: {
        urls: { small: smallImgUrl },
        alt_description,
    },
}) {
    return (
        <img
            src={smallImgUrl}
            alt={alt_description}
            className={css.smallImage}
        />
    );
}

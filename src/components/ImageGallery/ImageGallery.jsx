import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.scss';
export default function ImageGallery({ images }) {
    return (
        <ul className={css.galleryList}>
            {images.map(image => {
                return (
                    <li key={image.id}>
                        <ImageCard image={image} />
                    </li>
                );
            })}
        </ul>
    );
}

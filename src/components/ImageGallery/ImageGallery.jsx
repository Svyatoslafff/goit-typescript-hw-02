// import { Link } from 'react-scroll';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.scss';

export default function ImageGallery({ images, scrollToId }) {
    console.log(scrollToId);
    return (
        <ul className={css.galleryList}>
            {images.map(image => {
                const { id } = image;
                return (
                    <li key={id} id={id}>
                        <ImageCard image={image} />
                    </li>
                );
            })}
        </ul>
    );
}

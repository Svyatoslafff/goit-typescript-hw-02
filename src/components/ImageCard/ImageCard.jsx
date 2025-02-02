import { useEffect, useState } from 'react';

import ImageModal from '../ImageModal/ImageModal';
import css from './ImageCard.module.scss';

export default function ImageCard({
    image: {
        urls: { small: smallImgUrl, regular: regularImgUrl },
        alt_description,
        likes,
        user,
    },
}) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        const body = document.querySelector('body');
        if (isOpenModal === true) {
            body.classList.add('body-scroll-lock');
        } else {
            body.classList.remove('body-scroll-lock');
        }
    }, [isOpenModal]);

    function openModal() {
        setIsOpenModal(true);
    }
    function closeModal() {
        setIsOpenModal(false);
    }
    return (
        <div>
            <img
                src={smallImgUrl}
                alt={alt_description}
                onClick={openModal}
                className={css.smallImage}
            />
            <ImageModal
                isOpen={isOpenModal}
                closeModal={closeModal}
                likes={likes}
                creator={user}
                img={regularImgUrl}
                alt={alt_description}
            />
        </div>
    );
}

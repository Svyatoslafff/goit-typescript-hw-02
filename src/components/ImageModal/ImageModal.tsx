import { IoPersonSharp } from 'react-icons/io5';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoIosHeartEmpty } from 'react-icons/io';
import css from './ImageModal.module.scss';
import Modal from 'react-modal';
import React, { ReactElement } from 'react';

const modalStyles = {
    overlay: {
        backgroundColor: '#000000a1',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {},
};

export default function ImageModal({
    isOpen,
    closeModal,
    likes,
    img,
    alt,
    creator: { name, location },
}): ReactElement {
    Modal.setAppElement('#root');
    return (
        <Modal
            isOpen={isOpen}
            style={modalStyles}
            onRequestClose={closeModal}
            preventScroll={false}
            className={css.modal}
        >
            <img src={img} alt={alt} className={css.modalImage} />
            <ul className={css.imageInfo}>
                <li>
                    <IoPersonSharp size={20} className={css.icon} />
                    <span className="infoCharacteristics"> {name}</span>
                </li>
                {location !== null && (
                    <li>
                        <FaMapLocationDot size={20} className={css.icon} />
                        <span className="infoCharacteristics">{location}</span>
                    </li>
                )}
                <li>
                    <IoIosHeartEmpty size={20} className={css.icon} />
                    <span className="infoCharacteristics"> {likes}</span>
                </li>
            </ul>
        </Modal>
    );
}

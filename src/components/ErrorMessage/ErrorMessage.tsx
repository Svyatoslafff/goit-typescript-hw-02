import { MdOutlineError } from 'react-icons/md';
import { IoReloadCircle } from 'react-icons/io5';
import css from './ErrorMessage.module.scss';

export default function ErrorMessage({ message }) {
    return (
        <div className={css.errorContainer}>
            <div className={css.messageContainer}>
                <MdOutlineError
                    color="#ff4f4f"
                    size={60}
                    className={css.errorIcon}
                />
                <h2>{message}</h2>
                <p>Please try again later!</p>
                <button
                    className={css.pageReload}
                    onClick={() => window.location.reload()}
                >
                    <IoReloadCircle size={60} className={css.reloadIcon} />
                </button>
            </div>
        </div>
    );
}

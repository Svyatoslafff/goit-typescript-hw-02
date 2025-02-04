import { useState, useEffect } from 'react';

import css from './App.module.scss';
import * as api from '/src/api.js';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { animateScroll as scroll } from 'react-scroll';
import ImageModal from '../ImageModal/ImageModal';

function App() {
    // states
    const [images, setImages] = useState([]);
    const [request, setRequest] = useState({ query: 'animals', perPage: 9 });
    const [loaderIsActive, setLoaderIsActive] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isError, setIsError] = useState(false);

    // images loading
    useEffect(() => {
        async function getData() {
            try {
                setIsError(false);
                setLoaderIsActive(true);

                const newImages = (
                    await api.searchByRequest({
                        request: request.query,
                        perPage: request.perPage,
                        page,
                    })
                ).data;

                if (newImages.total === 0) {
                    toast.error(
                        'Sorry, nothing were found! Search something else.',
                        {
                            style: {
                                maxWidth: '300px',
                            },
                        }
                    );
                    return;
                }

                if (images.length === 0) {
                    setTotalPages(newImages.total_pages);
                } else if (page === totalPages) {
                    toast.error("You've reached the last page");
                }

                const imagesToShow = newImages.results;
                setImages([...images, ...imagesToShow]);
            } catch (error) {
                toast.error('Error');
                setIsError(error);
            } finally {
                setLoaderIsActive(false);
                if (page !== 1) {
                    const scrollHeight = screen.height - 120 * 2;
                    console.log(scrollHeight);

                    scroll.scrollMore(scrollHeight, {
                        behabior: 'smooth',
                    });
                }
            }
        }
        getData();
    }, [request, page]);

    function onSearch(value) {
        setImages([]);
        setPage(1);

        setRequest(value);
    }

    function onLoadMore() {
        setPage(previousPage => previousPage + 1);
    }

    // Modal
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalUserInfo, setModalUserInfo] = useState({
        likes: 0,
        user: '',
        regularImgUrl: '',
        alt_description: '',
    });

    useEffect(() => {
        const body = document.querySelector('body');
        if (isOpenModal === true) {
            body.classList.add('body-scroll-lock');
        } else {
            body.classList.remove('body-scroll-lock');
        }
    }, [isOpenModal]);

    function openModal(id) {
        const {
            likes,
            user,
            alt_description,
            urls: { regular },
        } = images.find(image => image.id === id);

        setModalUserInfo({
            likes,
            user,
            regularImgUrl: regular,
            alt_description,
        });
        setIsOpenModal(true);
    }
    function closeModal() {
        setIsOpenModal(false);
    }

    return (
        <>
            <SearchBar onSearch={onSearch} perPage={request.perPage} />
            <main className={css.main}>
                {isError === false ? (
                    <ImageGallery
                        images={images}
                        onOpenModal={openModal}
                        onCloseModal={closeModal}
                    />
                ) : (
                    <ErrorMessage message={isError.message} />
                )}
                {loaderIsActive === true && (
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                )}
                {images.length > 0 &&
                    isError === false &&
                    page !== totalPages &&
                    loaderIsActive === false && (
                        <LoadMoreBtn onLoadMore={onLoadMore} />
                    )}
            </main>
            <ImageModal
                isOpen={isOpenModal}
                closeModal={closeModal}
                likes={modalUserInfo.likes}
                creator={modalUserInfo.user}
                img={modalUserInfo.regularImgUrl}
                alt={modalUserInfo.alt_description}
            />
        </>
    );
}

export default App;

import React, { useState, useEffect } from 'react';

// import css from './App.module.scss';
import css from './App.module.scss';
import * as types from './App.types';
import * as api from '../../api';
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
    const [images, setImages] = useState<types.ImagesArray>([]);
    const [request, setRequest] = useState({ query: 'animals', perPage: 9 });
    const [loaderIsActive, setLoaderIsActive] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState<types.Error>({
        message: '',
        isError: false,
    });

    // images loading
    useEffect(() => {
        async function getData() {
            try {
                setError({
                    ...error,
                    isError: false,
                });
                setLoaderIsActive(true);

                const newImages: types.imagesData = (
                    await api.searchByRequest<{ data: types.imagesData }>({
                        request: request.query,
                        perPage: request.perPage,
                        page,
                    })
                ).data;

                console.log(newImages);

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
                setError({
                    message: error,
                    isError: true,
                });
            } finally {
                setLoaderIsActive(false);
                if (page !== 1) {
                    const scrollHeight: number = screen.height - 120 * 2;
                    console.log(scrollHeight);

                    scroll.scrollMore(scrollHeight, {
                        behabior: 'smooth',
                    });
                }
            }
        }
        getData();
    }, [request, page]);

    // function onSearch(value: requestQuery) {
    function onSearch(value: { query: string; perPage: number }): void {
        setImages([]);
        setPage(1);

        setRequest(value);
    }
    //
    //
    //

    function onLoadMore(): void {
        setPage(previousPage => previousPage + 1);
    }

    // Modal
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalUserInfo, setModalUserInfo] = useState({
        likes: 0,
        user: { name: '', location: '' },
        urls: {
            regular: '',
        },
        alt_description: '',
    });

    useEffect(() => {
        const body = document.querySelector('body') as HTMLBodyElement;
        if (isOpenModal === true) {
            body.classList.add('body-scroll-lock');
        } else {
            body.classList.remove('body-scroll-lock');
        }
    }, [isOpenModal]);

    function openModal(id: string): void {
        const image = images.find(image => image.id === id);
        if (image) {
            const {
                likes,
                user,
                alt_description,
                urls: { regular },
            }: types.Image = image;

            setModalUserInfo({
                likes,
                user,
                urls: { regular },
                alt_description,
            });

            setIsOpenModal(true);
        } else {
            setError({ message: 'image is not found!', isError: true });
        }
    }
    function closeModal(): void {
        setIsOpenModal(false);
    }

    return (
        <>
            <SearchBar onSearch={onSearch} perPage={request.perPage} />
            <main className={css.main}>
                {!error.isError ? (
                    <ImageGallery images={images} onOpenModal={openModal} />
                ) : (
                    <ErrorMessage message={error.message} />
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
                    error.isError === false &&
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
                img={modalUserInfo.urls.regular}
                alt={modalUserInfo.alt_description}
            />
        </>
    );
}

export default App;

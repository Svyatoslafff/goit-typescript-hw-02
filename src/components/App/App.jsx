import { useState, useEffect } from 'react';

import css from './App.module.scss';
import * as api from '/src/api.js';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { animateScroll as scroll } from 'react-scroll';

function App() {
    const [images, setImages] = useState([]);
    const [request, setRequest] = useState({ query: 'animals', perPage: 9 });
    const [loaderIsActive, setLoaderIsActive] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isError, setIsError] = useState(false);
    const [imageToScroll, setImageToScroll] = useState('');

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

                console.log(newImages);
                const imagesToShow = newImages.results;
                console.log(imagesToShow);

                setImageToScroll(imagesToShow[0].id);

                setImages([...images, ...imagesToShow]);
            } catch (error) {
                toast.error('Error');
                setIsError(error);
            } finally {
                setLoaderIsActive(false);
                if (page !== 1) {
                    scroll.scrollMore(
                        document
                            .querySelector(`#${imageToScroll}`)
                            .getBoundingClientRect().height * 2
                    );
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

    return (
        <>
            <SearchBar onSearch={onSearch} perPage={request.perPage} />
            <main>
                {isError === false ? (
                    <ImageGallery images={images} scrollToId={imageToScroll} />
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
                        <LoadMoreButton onLoadMore={onLoadMore} />
                    )}
            </main>
        </>
    );
}

export default App;

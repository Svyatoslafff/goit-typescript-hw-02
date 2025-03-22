import css from './LoadMoreBtn.module.scss';
export default function LoadMoreBtn({ onLoadMore }) {
    function handleClick() {
        onLoadMore();
    }
    return (
        <button onClick={handleClick} className={css.loadMore}>
            Load More
        </button>
    );
}

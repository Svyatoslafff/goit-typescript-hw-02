import css from './LoadMoreButton.module.scss';
export default function LoadMoreButton({ onLoadMore }) {
    function handleClick() {
        onLoadMore();
    }
    return (
        <button onClick={handleClick} className={css.loadMore}>
            Load More
        </button>
    );
}

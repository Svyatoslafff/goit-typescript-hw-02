import css from './LoadMoreBtn.module.scss';
import React from 'react';

export default function LoadMoreBtn({ onLoadMore }: { onLoadMore(): void }) {
    function handleClick(): void {
        onLoadMore();
    }
    return (
        <button onClick={handleClick} className={css.loadMore}>
            Load More
        </button>
    );
}

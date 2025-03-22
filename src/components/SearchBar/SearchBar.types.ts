import { OnSearchValues } from '../App/App.types';

export type SearchBarProps = {
    onSearch(value: OnSearchValues): void;
    perPage: number;
};

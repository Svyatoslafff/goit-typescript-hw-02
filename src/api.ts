import axios from 'axios';
axios.defaults.baseURL = 'https://api.unsplash.com';

type apiProps = {
    request: string;
    perPage: number;
    page: number;
};

export async function searchByRequest<T>({
    request,
    perPage,
    page,
}: apiProps): Promise<T> {
    return await axios.get(
        `/search/photos/?client_id=INZNQBY7jNSMYGAwYl5WiM_4F0w0iFu_Wg_dUjiUOUg&per_page=${perPage}&page=${page}&orientation=landscape&query=${request}`
    );
}

import axios from 'axios';
axios.defaults.baseURL = 'https://api.unsplash.com';
export async function searchByRequest({ request, perPage, page }) {
    return await axios.get(
        `/search/photos/?client_id=INZNQBY7jNSMYGAwYl5WiM_4F0w0iFu_Wg_dUjiUOUg&per_page=${perPage}&page=${page}&orientation=landscape&query=${request}`
    );
}

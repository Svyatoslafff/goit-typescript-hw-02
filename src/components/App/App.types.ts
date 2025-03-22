export type User = {
    name: string;
    location: string;
};

export type Urls = {
    raw: string;
    regular: string;
    full: string;
    small: string;
};

export type Image = {
    user: User;
    alt_description: string;
    id: string;
    likes: number;
    urls: Urls;
};

export type ImagesArray = Image[];

export type imagesData = {
    results: ImagesArray;
    total: number;
    total_pages: number;
};

export type Error = {
    message: string;
    isError: boolean;
};

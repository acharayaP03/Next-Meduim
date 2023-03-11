export interface Posts {
    _id: string;
    title: string;
    author: {
        name: string,
        image: string
    };
    _createdAt: string;
    description: string;
    mainImage: {
        asset: {
            url: string
        }
    };
    slug: {
        current: string
    };
    body: [object]
}
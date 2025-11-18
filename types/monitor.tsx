export interface Monitor {
    id: number;
    image: string;
    rank: string;
    name: string;
    specs: string;
    rating: number;
    totalReviews: number;
    features: string[];
    discount: number;
    originalPrice: number;
    availability: string;
    badge?: string;
    performance?: number;
    reliability?: number;
    value?: number;
    popularity?: number;
    support?: number;
}

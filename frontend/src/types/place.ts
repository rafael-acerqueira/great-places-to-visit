export default interface Place {
  id: number;
  hero_url: string;
  name: string;
  rating: number;
  reviews: number;
  address: string;
  phone?: string;
  website?: string;
}
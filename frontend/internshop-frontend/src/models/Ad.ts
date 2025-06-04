export interface AdProps {
  id?: number | null;
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  category?: string;
  city?: string;
  datePosted?: string;
  user?: any | null; 
}

export class Ad {
  id: number | null;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  city: string;
  datePosted: string;
  user: any | null;

  constructor({
    id = null,
    title = "",
    description = "",
    imageUrl = "",
    price = 0,
    category = "",
    city = "",
    datePosted = "",
    user = null
  }: AdProps) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.category = category;
    this.city = city;
    this.datePosted = datePosted;
    this.user = user;
  }
}
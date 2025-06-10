import { User } from "./User";

export interface AdProps {
  id?: number | null;
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  category?: string;
  city?: string;
  datePosted?: string;
  user: Partial<User> | null;

}

export class Ad {
  id: number | null = null;
  title: string = "";
  description: string = "";
  imageUrl: string = "";
  price: number = 0;
  category: string = "";
  city: string = "";
  datePosted: string = "";
  user: Partial<User> | null = null;
}

import { User } from "./User";

export type Ad = {
  id?: number | null;
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  category?: string;
  city?: string;
  postedDate?: string | null;
  user?: Partial<User> | null;
};

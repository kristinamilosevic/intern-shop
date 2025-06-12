import { Ad } from "../models/Ad";
import { Categories } from "../models/Categories";
import { fetchUserIdByUsername } from "./userService";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${BASE_URL}/ads`; 

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchAds(
  page: number,
  category?: Categories | null,
  title?: string | null,
  minPrice?: number | null,
  maxPrice?: number | null,
  userId?: number | null 
): Promise<{ ads: Ad[]; totalPages: number }> {
  let url = `${API_URL}?page=${page}`;

  if (category) {
    url += `&category=${category}`;
  }
  if (title && title.trim() !== "") {
    url += `&title=${encodeURIComponent(title.trim())}`;
  }
  if (minPrice != null) {
    url += `&minPrice=${minPrice}`;
  }
  if (maxPrice != null) {
    url += `&maxPrice=${maxPrice}`;
  }
  if (userId != null) {
    url += `&userId=${userId}`;
  }

  const response = await fetch(url, {
    headers: {
      ...getAuthHeaders()
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ads");
  }

  const data = await response.json();

  return {
    ads: data.ads,
    totalPages: data.totalPages ?? 1
  };
}


export async function deleteAd(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}/deactivate`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders()
    }
  });

  if (!response.ok) {
    throw new Error("Failed to logically delete ad");
  }
}

export async function updateAd(ad: Ad): Promise<Ad> {
  const response = await fetch(`${API_URL}/${ad.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()
    },
    body: JSON.stringify(ad),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update ad: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

export const fetchAdById = async (id: number): Promise<Ad> => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      ...getAuthHeaders()
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ad");
  }

  return await response.json();
};

export async function saveAd(adData: Partial<Ad>): Promise<Ad> {
  const username = localStorage.getItem("username");
  if (!username) {
    throw new Error("Nema korisničkog imena u localStorage-u.");
  }

  const userId = await fetchUserIdByUsername(username);

  const adPayload: Ad = {
    id: null,
    title: adData.title || "",
    description: adData.description || "",
    price: Number(adData.price) || 0,
    city: adData.city || "",
    category: adData.category || "",
    postedDate: new Date().toISOString(),
    imageUrl: adData.imageUrl || "",
    user: {
      id: userId,
      username: "",
      phoneNumber: "",
    },
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(adPayload),
  });

  if (!response.ok) {
    throw new Error("Greška prilikom čuvanja oglasa.");
  }

  return response.json();
}

import { Ad } from "../models/Ad";
import { Categories } from "../models/Categories";

const API_URL = "/api/ads";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchAds(
  page: number,
  category?: Categories | null,
  title?: string | null
): Promise<{ ads: Ad[]; totalPages: number }> {
  let url = `${API_URL}?page=${page}`;

  if (category) {
    url += `&category=${category}`;
  }

  if (title && title.trim() !== "") {
    url += `&title=${encodeURIComponent(title.trim())}`;
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

  if (!Array.isArray(data.ads)) {
    throw new Error("Unexpected data format: ads field is missing or not an array");
  }

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

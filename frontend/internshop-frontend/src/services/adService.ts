import { Ad } from "../models/Ad";

const API_URL = "/api/ads";

export async function fetchAds(page: number): Promise<{ ads: Ad[]; totalPages: number }> {
    const response = await fetch(`${API_URL}?page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch ads");
    }
  
    const data = await response.json();
  
    if (!Array.isArray(data.ads)) {
      throw new Error("Unexpected data format: ads field is missing or not an array");
    }
  
    return {
      ads: data.ads.map((ad: any) => new Ad(ad)),
      totalPages: data.totalPages ?? 1
    };
  }
  

export async function deleteAd(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}/deactivate`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to logically delete ad");
  }
}

export async function updateAd(ad: Ad): Promise<Ad> {
  const token = localStorage.getItem("token");

  const response = await fetch(`/api/ads/${ad.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(ad),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update ad: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

  
  

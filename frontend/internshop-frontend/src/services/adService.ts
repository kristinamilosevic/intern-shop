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
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete ad");
  }
}

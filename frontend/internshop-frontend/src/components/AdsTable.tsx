import React, { useEffect, useState } from "react";
import { Ad } from "../models/Ad";
import { fetchAds, deleteAd } from "../services/adService";

interface AdTableProps {
  currentUserId: number;
  onEdit?: (adId: number) => void; 
}

const AdTable: React.FC<AdTableProps> = ({ currentUserId, onEdit }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    loadAds(currentPage);
  }, [currentPage]);

  const loadAds = async (page: number) => {
    try {
      const { ads, totalPages } = await fetchAds(page);
      setAds(ads);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error loading ads:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAd(id);
      loadAds(currentPage);
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const handleEdit = (id: number) => {
    if (onEdit) onEdit(id);
    else console.log("Edit clicked for ad id:", id);
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-[#D5C7A3] bg-[#F6F0F0] shadow rounded-lg">
        <thead className="bg-[#F2E2B1] text-[#5C533F]">
          <tr>
            <th className="p-3 text-left">Slika</th>
            <th className="p-3 text-left">Naziv</th>
            <th className="p-3 text-left">Opis</th>
            <th className="p-3 text-left">Cena</th>
            <th className="p-3 text-left">Grad</th>
            <th className="p-3 text-left">Kategorija</th>
            <th className="p-3 text-left">Akcija</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => {
            const isOwner = ad.user?.id === currentUserId;
            return (
              <tr
                key={ad.id}
                className="border-t border-[#D5C7A3] hover:bg-[#F2E2B1]/40"
              >
                <td className="p-3">
                  <img
                    src={`/images/${ad.imageUrl || "placeholder.png"}`}
                    alt={ad.title}
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td className="p-3 text-[#5C533F]">{ad.title}</td>
                <td className="p-3 text-[#5C533F]">{ad.description}</td>
                <td className="p-3 text-[#5C533F]">{ad.price ? `$${ad.price}` : "-"}</td>
                <td className="p-3 text-[#5C533F]">{ad.city || "-"}</td>
                <td className="p-3 text-[#5C533F]">{ad.category || "-"}</td>
                <td className="p-3 space-x-2">
                  {isOwner ? (
                    <>
                      <button
                        className="bg-[#D5C7A3] text-[#F6F0F0] text-sm px-3 py-1 rounded hover:bg-[#BDB395] transition-colors"
                        onClick={() => handleEdit(ad.id!)}
                      >
                        Izmeni
                      </button>
                      <button
                        className="bg-red-300 text-[#F6F0F0] text-sm px-3 py-1 rounded hover:bg-red-400 transition-colors"
                        onClick={() => handleDelete(ad.id!)}
                      >
                        Obriši
                      </button>
                    </>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          className="bg-[#D5C7A3] text-[#5C533F] px-3 py-1 rounded hover:bg-[#BDB395] transition-colors disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
          disabled={currentPage === 0}
        >
          Prethodna
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded transition-colors ${
              currentPage === i
                ? "bg-[#5C533F] text-white"
                : "bg-[#F6F0F0] text-[#5C533F] hover:bg-[#F2E2B1]"
            }`}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="bg-[#D5C7A3] text-[#5C533F] px-3 py-1 rounded hover:bg-[#BDB395] transition-colors disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
        >
          Sledeća
        </button>
      </div>
    </div>
  );
};

export default AdTable;

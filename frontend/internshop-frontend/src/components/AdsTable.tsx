import React, { useEffect, useState } from "react";
import { Ad } from "../models/Ad";
import { fetchAds, deleteAd, updateAd } from "../services/adService";
import { Link } from "react-router-dom";
import EditAd from "../components/EditAd";
import Pagination from "../components/Pagination";
import Button from "../components/Buttons"; 

interface AdTableProps {
  currentUserId: number;
  onEdit?: (adId: number) => void;
}

const AdTable: React.FC<AdTableProps> = ({ currentUserId, onEdit }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

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

  const handleEditClick = (ad: Ad) => {
    setSelectedAd(ad);
  };

  const handleCloseModal = () => {
    setSelectedAd(null);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAd) return;

    try {
      await updateAd(selectedAd);
      handleCloseModal();
      loadAds(currentPage);
    } catch (error) {
      alert("An error occurred while updating the ad.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!selectedAd) return;
    const { name, value } = e.target;
    const updatedAd = { ...selectedAd, [name]: value };
    setSelectedAd(updatedAd);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedAd) {
      setSelectedAd({ ...selectedAd, imageUrl: file.name });
    }
  };

  const tableColumns = [
    { label: "Image", value: "imageUrl" },
    { label: "Title", value: "title" },
    { label: "Description", value: "description" },
    { label: "Price", value: "price" },
    { label: "City", value: "city" },
    { label: "Category", value: "category" },
  ];

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-[#D5C7A3] bg-[#F6F0F0] shadow rounded-lg">
        <thead className="bg-[#F2E2B1] text-[#5C533F]">
          <tr>
            {tableColumns.map((col) => (
              <th key={col.value} className="p-3 text-left">
                {col.label}
              </th>
            ))}
            <th className="p-3 text-left">Action</th>
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
                  <Link to={`/adDetail/${ad.id}`}>
                    <img
                      src={`/images/${ad.imageUrl || "placeholder.png"}`}
                      alt={ad.title}
                      className="h-16 w-16 object-cover rounded cursor-pointer"
                    />
                  </Link>
                </td>
                <td className="p-3 text-[#5C533F]">
                  <Link to={`/adDetail/${ad.id}`} className="hover:underline">
                    {ad.title}
                  </Link>
                </td>
                <td className="p-3 text-[#5C533F]">{ad.description}</td>
                <td className="p-3 text-[#5C533F]">
                  {ad.price ? `$${ad.price}` : "-"}
                </td>
                <td className="p-3 text-[#5C533F]">{ad.city || "-"}</td>
                <td className="p-3 text-[#5C533F]">{ad.category || "-"}</td>
                <td className="p-3 space-x-2">
                  {isOwner && (
                    <>
                      <Button
                        variant="primary" 
                        size="small"  
                        onClick={() => handleEditClick(ad)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger" 
                        size="small"  
                        onClick={() => handleDelete(ad.id!)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedAd && (
        <EditAd
          selectedAd={selectedAd}
          onClose={handleCloseModal}
          onChange={handleInputChange}
          onImageChange={handleImageChange}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default AdTable;
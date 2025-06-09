import React, { useEffect, useState } from "react";
import { Ad } from "../models/Ad";
import { fetchAds, deleteAd, updateAd } from "../services/adService";
import { Categories } from "../models/Categories";

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

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-[#D5C7A3] bg-[#F6F0F0] shadow rounded-lg">
        <thead className="bg-[#F2E2B1] text-[#5C533F]">
          <tr>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => {
            const isOwner = ad.user?.id === currentUserId;
            return (
              <tr key={ad.id} className="border-t border-[#D5C7A3] hover:bg-[#F2E2B1]/40">
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
                  {isOwner && (
                    <>
                      <button
                        className="bg-[#D5C7A3] text-[#F6F0F0] text-sm px-3 py-1 rounded hover:bg-[#BDB395] transition-colors"
                        onClick={() => handleEditClick(ad)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-300 text-[#F6F0F0] text-sm px-3 py-1 rounded hover:bg-red-400 transition-colors"
                        onClick={() => handleDelete(ad.id!)}
                      >
                        Delete
                      </button>
                    </>
                  )}
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
          Previous
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
          Next
        </button>
      </div>

      {selectedAd && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-[#5C533F]">Edit Ad</h2>
            <form onSubmit={handleFormSubmit}>
              <label className="block mb-2 text-[#5C533F]">
                Title:
                <input
                  type="text"
                  name="title"
                  value={selectedAd.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                  required
                />
              </label>
              <label className="block mb-2 text-[#5C533F]">
                Description:
                <textarea
                  name="description"
                  value={selectedAd.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                  required
                />
              </label>
              <label className="block mb-2 text-[#5C533F]">
                Price:
                <input
                  type="number"
                  name="price"
                  value={selectedAd.price || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                  min={0}
                />
              </label>
              <label className="block mb-2 text-[#5C533F]">
                City:
                <input
                  type="text"
                  name="city"
                  value={selectedAd.city || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                />
              </label>
              <label className="block mb-2 text-[#5C533F]">
                Category:
                <select
                  name="category"
                  value={selectedAd.category || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {Categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-4 text-[#5C533F]">
                Image:
                <div className="mt-2 mb-2">
                  <img
                    src={
                      selectedAd.imageUrl?.startsWith("data:")
                        ? selectedAd.imageUrl
                        : `/images/${selectedAd.imageUrl || "placeholder.png"}`
                    }
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block mt-1"
                />
              </label>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#D5C7A3] hover:bg-[#BDB395] text-[#5C533F]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdTable;

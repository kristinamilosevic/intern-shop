import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Ad } from "../models/Ad";
import { fetchAdById, deleteAd } from "../services/adService";

const AdDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  const currentUserId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (!id) return;
    fetchAdById(Number(id))
      .then(setAd)
      .catch((err) => {
        console.error("Failed to fetch ad:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!ad) return;
    if (window.confirm("Are you sure you want to delete this ad?")) {
      try {
        await deleteAd(ad.id!);
        navigate("/ads");
      } catch (error) {
        alert("Error deleting ad");
      }
    }
  };

  if (loading) return <p className="text-center mt-8 text-lg text-gray-600">Loading...</p>;
  if (!ad) return <p className="text-center mt-8 text-lg text-red-600">Ad not found</p>;

  const isOwner = ad.user?.id === currentUserId;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6 text-[#5C533F]">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wide text-center text-[#7D6E45]">
        {ad.title}
      </h1>

      <div className="w-full h-72 flex items-center justify-center bg-white rounded-lg overflow-hidden mb-4 shadow-inner border border-gray-200">
        <img
          src={`/images/${ad.imageUrl || "placeholder.png"}`}
          alt={ad.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="text-center mb-8 text-lg text-gray-700 space-y-1">
        <p><span className="font-semibold text-[#A08439]">Description:</span> {ad.description}</p>
        <p><span className="font-semibold text-[#A08439]">Price:</span> {ad.price ? `$${ad.price.toFixed(2)}` : "-"}</p>
        <p><span className="font-semibold text-[#A08439]">City:</span> {ad.city || "-"}</p>
        <p><span className="font-semibold text-[#A08439]">Category:</span> {ad.category || "-"}</p>
      </div>

      <div className="mt-8 p-6 border border-[#D5C7A3] rounded-lg bg-[#FBF9F3] shadow-md max-w-md mx-auto text-[#5C533F]">
  <h2 className="text-2xl font-semibold mb-4 border-b border-[#D5C7A3] pb-2 text-[#7D6E45] text-center">
    User Info
  </h2>
  <div className="space-y-4 text-lg max-w-sm mx-auto">
  <p className="flex items-center justify-start space-x-3">
    <strong className="w-24">Username:</strong>
    <span>{ad.user?.username || "Unknown"}</span>
  </p>
  <p className="flex items-center justify-start space-x-3">
    <strong className="w-24">Phone:</strong>
    <span>{ad.user?.phoneNumber || "Not provided"}</span>
  </p>
</div>
  </div>
      {isOwner && (
        <div className="mt-10 flex space-x-4 justify-end">
          <button
            className="bg-[#D5C7A3] text-[#5C533F] px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#BDB395] transition-colors duration-200"
            onClick={() => navigate(`/ads/edit/${ad.id}`)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-600 transition-colors duration-200"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AdDetail;

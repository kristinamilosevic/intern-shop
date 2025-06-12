import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Ad } from "../models/Ad";
import { fetchAdById, deleteAd, updateAd } from "../services/adService";
import { fetchUserIdByUsername } from "../services/userService";
import Button from "../components/Buttons";
import EditAd from "../components/EditAd";

const AdDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [selectedAdForEdit, setSelectedAdForEdit] = useState<Ad | null>(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const loadUserId = async () => {
      if (!username) return;
      try {
        const userId = await fetchUserIdByUsername(username);
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    loadUserId();
  }, [username]);

  const loadAd = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const fetchedAd = await fetchAdById(Number(id));
      setAd(fetchedAd);
      if (selectedAdForEdit && fetchedAd.id === selectedAdForEdit.id) {
        setSelectedAdForEdit(fetchedAd);
      }
    } catch (err) {
      console.error("Failed to fetch ad:", err);
      setAd(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAd();
  }, [id]);

  const handleDelete = async () => {
    if (!ad) return;
    const confirmed = window.confirm("Are you sure you want to delete this ad?");
    if (!confirmed) return;

    try {
      await deleteAd(ad.id!);
      navigate("/ads");
    } catch (error) {
      alert("Error deleting ad.");
      console.error(error);
    }
  };

  const handleEditClick = (adToEdit: Ad) => {
    setSelectedAdForEdit(adToEdit);
  };

  const handleCloseEditModal = () => {
    setSelectedAdForEdit(null);
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!selectedAdForEdit) return;
    const { name, value } = e.target;
    setSelectedAdForEdit((prevAd) => ({ ...prevAd!, [name]: value }));
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedAdForEdit) {
      setSelectedAdForEdit((prevAd) => ({ ...prevAd!, imageUrl: file.name }));
    }
  };

  const handleEditFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAdForEdit) return;

    try {
      await updateAd(selectedAdForEdit);
      handleCloseEditModal();
      loadAd();
    } catch (error) {
      alert("An error occurred while updating the ad.");
      console.error("Error updating ad:", error);
    }
  };

  if (loading)
    return <p className="text-center mt-8 text-lg text-gray-600">Loading...</p>;

  if (!ad)
    return <p className="text-center mt-8 text-lg text-red-600">Ad not found.</p>;

  const isOwner = currentUserId !== null && ad.user?.id === currentUserId;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6 text-[#8E806A]">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wide text-center text-[#8E806A]">
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
        <p>
          <span className="font-semibold text-[#8E806A]">Description:</span>{" "}
          {ad.description}
        </p>
        <p>
          <span className="font-semibold text-[#8E806A]">Price:</span>{" "}
          {ad.price ? `$${ad.price.toFixed(2)}` : "-"}
        </p>
        <p>
          <span className="font-semibold text-[#8E806A]">City:</span>{" "}
          {ad.city || "-"}
        </p>
        <p>
          <span className="font-semibold text-[#8E806A]">Category:</span>{" "}
          {ad.category || "-"}
        </p>
        <p>
          <span className="font-semibold text-[#8E806A]">Posted Date:</span>{" "}
          {ad.postedDate
            ? new Date(ad.postedDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "-"}
        </p>
      </div>

      <div className="mt-8 p-6 border border-[#D5C7A3] rounded-lg bg-[#FBF9F3] shadow-md max-w-md mx-auto text-[#AA8976]">
        <h2 className="text-2xl font-semibold mb-4 border-b border-[#D5C7A3] pb-2 text-[#8E806A] text-center">
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
          <Button
            variant="primary"
            size="medium"
            onClick={() => handleEditClick(ad)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="medium"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      )}

      {selectedAdForEdit && (
        <EditAd
          selectedAd={selectedAdForEdit}
          onClose={handleCloseEditModal}
          onChange={handleEditInputChange}
          onImageChange={handleEditImageChange}
          onSubmit={handleEditFormSubmit}
        />
      )}
    </div>
  );
};

export default AdDetail;
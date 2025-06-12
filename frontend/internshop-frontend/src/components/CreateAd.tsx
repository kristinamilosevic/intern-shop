import React, { useState } from "react";
import { Ad } from "../models/Ad";
import { Categories } from "../models/Categories";
import { fetchUserIdByUsername } from "../services/userService";
import Button from "../components/Buttons";
import { saveAd } from "../services/adService"; 
import { useNavigate } from "react-router-dom";

interface AdFormProps  {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ad: Ad) => void;
}

const AdForm: React.FC<AdFormProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Ad>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const imageUrl = imageFile ? imageFile.name : "";
      const adToSave = { ...formData, imageUrl };

      const savedAd = await saveAd(adToSave);
      onSave(savedAd);
      setFormData({});
      setImageFile(null);
      onClose();
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Unknown error.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F6F0F0] p-8 rounded-lg w-full max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#8E806A]">New Listing</h2>

        {error && (
          <div className="mb-3 p-2 bg-red-200 text-red-800 rounded">{error}</div>
        )}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border rounded"
          disabled={loading}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border rounded resize-none"
          rows={4}
          disabled={loading}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border rounded"
          disabled={loading}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border rounded"
          disabled={loading}
        />

        <select
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border rounded"
          disabled={loading}
        >
          <option value="" disabled>
            Select Category
          </option>
          {Object.values(Categories).map((category: string) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <label className="block mb-3 text-[#5C533F]">
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-1"
            disabled={loading}
          />
        </label>

        {imageFile && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="h-32 w-32 object-cover rounded"
            />
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            size="medium"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="medium"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Ad"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdForm;

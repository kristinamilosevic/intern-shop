import React from "react";
import { Ad } from "../models/Ad";
import { Categories } from "../models/Categories";
import Button from "../components/Buttons";

interface EditAdProps {
  selectedAd: Ad;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EditAd: React.FC<EditAdProps> = ({
  selectedAd,
  onClose,
  onChange,
  onImageChange,
  onSubmit,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-[#5C533F]">Edit Ad</h2>
        <form onSubmit={onSubmit}>
          <label className="block mb-2 text-[#5C533F]">
            Title:
            <input
              type="text"
              name="title"
              value={selectedAd.title}
              onChange={onChange}
              className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
              required
            />
          </label>
          <label className="block mb-2 text-[#5C533F]">
            Description:
            <textarea
              name="description"
              value={selectedAd.description}
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
              className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
            />
          </label>
          <label className="block mb-2 text-[#5C533F]">
            Category:
            <select
              name="category"
              value={selectedAd.category || ""}
              onChange={onChange}
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
              onChange={onImageChange}
              className="block mt-1"
            />
          </label>
          <div className="flex justify-end space-x-3">
            <Button
                type="button"
                variant="secondary"
                size="medium"
                onClick={onClose}
            >
                Cancel
            </Button>
            <Button
                type="submit"
                variant="primary"
                size="medium"
            >
                Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAd;

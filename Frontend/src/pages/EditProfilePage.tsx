// frontend/src/pages/EditProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import MedicalHistoryModal from "../modals/MedicalHistoryModal";

const EditProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // id can be 'new' or an existing user id
  const navigate = useNavigate();
  const { login } = useAuth();
  const [profile, setProfile] = useState<any>({
    username: "",
    email: "",
    phone: "",
    emergencyContact: "",
    profilePic: "",
    age: "",
    height: "",
    weight: "",
    emergencyContacts: ["", "", ""],
    medicalConditions: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // For an existing user, load profile data
  useEffect(() => {
    if (id && id !== "new") {
      getProfile(id)
        .then((data) => setProfile(data.user))
        .catch((err) => setError(err.message));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id === "new") {
        // In new registration, update profile after signup (if needed)
        const data = await updateProfile(profile._id, profile);
        login(data.user);
        setLoading(false);
        window.alert("Profile created successfully!");
        navigate("/");
      } else {
        const data = await updateProfile(id, profile);
        login(data.user);
        setLoading(false);
        window.alert("Profile updated successfully!");
        navigate("/");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Operation failed");
    }
  };

  return (
    <div className="container mx-auto p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl mb-6 font-bold text-center">
        {id === "new" ? "Complete Your Profile" : "Edit Profile"}
      </h1>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {loading && (
        <div className="text-blue-400 mb-4 text-center">
          Saving profile... Please wait.
        </div>
      )}
      <form onSubmit={handleUpdate} className="space-y-6 max-w-2xl mx-auto">
        {/* New field: Profile Image URL */}
        <div>
          <label className="block mb-2">Profile Image URL</label>
          <input
            type="text"
            name="profilePic"
            placeholder="Enter image URL"
            value={profile.profilePic || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
          {profile.profilePic && (
            <img
              src={profile.profilePic}
              alt="Profile Preview"
              className="mt-2 w-24 h-24 object-cover rounded-full"
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={profile.username || ""}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email || ""}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone || ""}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
          <input
            type="text"
            name="emergencyContact"
            placeholder="Primary Emergency Contact"
            value={profile.emergencyContact || ""}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={profile.height || ""}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={profile.weight || ""}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input
            type="text"
            name="emergencyContacts0"
            placeholder="Additional Emergency Contact 1"
            value={profile.emergencyContacts?.[0] || ""}
            onChange={(e) => {
              const contacts = profile.emergencyContacts || ["", "", ""];
              contacts[0] = e.target.value;
              setProfile({ ...profile, emergencyContacts: contacts });
            }}
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
          <input
            type="text"
            name="emergencyContacts1"
            placeholder="Additional Emergency Contact 2"
            value={profile.emergencyContacts?.[1] || ""}
            onChange={(e) => {
              const contacts = profile.emergencyContacts || ["", "", ""];
              contacts[1] = e.target.value;
              setProfile({ ...profile, emergencyContacts: contacts });
            }}
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
          <input
            type="text"
            name="emergencyContacts2"
            placeholder="Additional Emergency Contact 3"
            value={profile.emergencyContacts?.[2] || ""}
            onChange={(e) => {
              const contacts = profile.emergencyContacts || ["", "", ""];
              contacts[2] = e.target.value;
              setProfile({ ...profile, emergencyContacts: contacts });
            }}
            className="w-full p-3 rounded-md bg-gray-800 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md"
        >
          Add Medical Condition
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md"
        >
          {loading
            ? "Processing..."
            : id === "new"
            ? "Register & Continue"
            : "Save Profile"}
        </button>
      </form>

      {showModal && (
        <MedicalHistoryModal
          onClose={() => setShowModal(false)}
          currentConditions={profile.medicalConditions || []}
          onSave={(conditions: string[]) =>
            setProfile({ ...profile, medicalConditions: conditions })
          }
        />
      )}
    </div>
  );
};

export default EditProfilePage;

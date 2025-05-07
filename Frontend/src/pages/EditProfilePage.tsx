import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import MedicalHistoryModal from "../modals/MedicalHistoryModal";

const EditProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [profile, setProfile] = useState<any>({
    username: "",
    email: "",
    phone: "",
    emergencyContact: "",
    profilePic: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    emergencyContacts: ["", "", ""],
    medicalConditions: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

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
    <div className="min-h-screen flex flex-col items-center justify-start w-auto p-4 md:p-8 lg:p-10 bg-gray-50">
      <div className="w-full max-w-5xl bg-gray-50 p-6 rounded-2xl shadow-2xl border border-gray-600">
        {error && (
          <div className="text-red-400 mb-4 text-center font-semibold text-sm md:text-base">
            {error}
          </div>
        )}
        {loading && (
          <div className="text-gray-700 mb-4 text-center text-sm md:text-base">
            Saving profile... Please wait.
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Profile Picture */}
          <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center">
            <div className="w-full sm:w-1/2 sm:mr-4 mb-4 sm:mb-0">
              <label className="text-gray-800 block mb-1 text-xs md:text-sm font-medium">
                Profile URL
              </label>
              <input
                type="text"
                name="profilePic"
                placeholder="Enter URL"
                value={profile.profilePic || ""}
                onChange={handleChange}
                onFocus={() => setFocusedInput("profilePic")}
                onBlur={() => setFocusedInput(null)}
                className={`w-full p-2 rounded-md bg-white text-gray-700 border border-gray-400 ${
                  focusedInput === "profilePic"
                    ? "border-[#2092fa] border-2"
                    : ""
                } focus:outline-none text-xs md:text-sm`}
              />
            </div>
            {profile.profilePic && (
              <img
                src={profile.profilePic}
                alt="Profile Preview"
                className="w-16 h-16 object-cover rounded-full mt-4"
              />
            )}
          </div>

          {/* Username & Email */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="text-gray-800 block mb-1 text-xs md:text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={profile.username || ""}
                onChange={handleChange}
                onFocus={() => setFocusedInput("username")}
                onBlur={() => setFocusedInput(null)}
                required
                className={`w-full p-2 rounded-md bg-white text-gray-700 border border-gray-400 ${
                  focusedInput === "username" ? "border-[#2092fa] border-2" : ""
                } focus:outline-none text-xs md:text-sm`}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="text-gray-800 block mb-1 text-xs md:text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={profile.email || ""}
                onChange={handleChange}
                disabled
                className={`w-full p-2 rounded-md bg-white text-gray-700 border border-gray-400 opacity-70 cursor-not-allowed focus:outline-none text-xs md:text-sm`}
              />
            </div>
          </div>

          {/* Phone and Primary Emergency Contact */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="text-gray-800 block mb-1 text-xs md:text-sm font-medium">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={profile.phone || ""}
                onChange={handleChange}
                onFocus={() => setFocusedInput("phone")}
                onBlur={() => setFocusedInput(null)}
                required
                className={`w-full p-2 rounded-md bg-white text-gray-700 border border-gray-400 ${
                  focusedInput === "phone" ? "border-[#2092fa] border-2" : ""
                } focus:outline-none text-xs md:text-sm`}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="text-gray-800 block mb-1 text-xs md:text-sm font-medium">
                Emergency Contact Number
              </label>
              <input
                type="text"
                name="emergencyContact"
                placeholder="Emergency Contact"
                value={profile.emergencyContact || ""}
                onChange={handleChange}
                onFocus={() => setFocusedInput("emergencyContact")}
                onBlur={() => setFocusedInput(null)}
                required
                className={`w-full p-2 rounded-md bg-white text-gray-700 border border-gray-400 ${
                  focusedInput === "emergencyContact"
                    ? "border-[#2092fa] border-2"
                    : ""
                } focus:outline-none text-xs md:text-sm`}
              />
            </div>
          </div>

          {/* Height, Weight, Age, Gender */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/4">
              <label className="text-gray-800 block mb-1 text-xs md:text-sm font-medium">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                placeholder="Height"
                value={profile.height || ""}
                onChange={handleChange}
                onFocus={() => setFocusedInput("height")}
                onBlur={() => setFocusedInput(null)}
                required
                className={`w-full p-2 rounded-md bg-white text-gray-700 border border-gray-400 ${
                  focusedInput === "height" ? "border-[#2092fa] border-2" : ""
                } focus:outline-none text-xs md:text-sm`}
              />
            </div>
            <div className="w-full sm:w-1/4">
              <label className="text-gray-800 block mb-1 text-xs md:text-sm font-medium">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                placeholder="Weight"
                value={profile.weight || ""}
                onChange={handleChange}
                onFocus={() => setFocusedInput("weight")}
                onBlur={() => setFocusedInput(null)}
                required
                className={`w-full p-2 rounded-md bg-white text-gray-700 border border-gray-400 ${
                  focusedInput === "weight" ? "border-[#2092fa] border-2" : ""
                } focus:outline-none text-xs md:text-sm`}
              />
            </div>
            <div className="w-full sm:w-1/4">
              <label className="text-gray-800 block mb-1 text-xs md:text-sm font-medium">
                Age
              </label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={profile.age || ""}
                onChange={handleChange}
                onFocus={() => setFocusedInput("age")}
                onBlur={() => setFocusedInput(null)}
                required
                className={`w-full p-2 rounded-md bg-white text-gray-700 border border-gray-400 ${
                  focusedInput === "age" ? "border-[#2092fa] border-2" : ""
                } focus:outline-none text-xs md:text-sm`}
              />
            </div>
            <div className="w-full sm:w-1/4">
              <label className="text-gray-800 block mb-1 text-xs md:text-sm font-medium">
                Gender
              </label>
              <select
                name="gender"
                value={profile.gender || ""}
                onChange={handleChange}
                onFocus={() => setFocusedInput("gender")}
                onBlur={() => setFocusedInput(null)}
                required
                className={`w-full p-2 rounded-md bg-white text-gray-700 border border-gray-400 ${
                  focusedInput === "gender" ? "border-[#2092fa] border-2" : ""
                } focus:outline-none text-xs md:text-sm`}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Medical History and Submit Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-auto min-w-[160px] max-w-[200px] p-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-400 hover:text-white transition text-xs md:text-sm font-medium"
            >
              Add Medical History
            </button>
            <button
              type="submit"
              className="w-auto min-w-[140px] max-w-[180px] px-6 py-2 rounded-md transition text-sm md:text-base text-white bg-[#2092fa] hover:bg-blue-500 font-medium"
            >
              {id === "new" ? "Create Profile" : "Update Profile"}
            </button>
          </div>
        </form>
      </div>

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

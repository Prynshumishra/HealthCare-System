import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  // 🔐 Password Strength
  const getPasswordStrength = (password) => {
    if (password.length < 6) return { text: "Weak", color: "bg-red-500", width: "33%" };
    if (password.length < 10) return { text: "Medium", color: "bg-yellow-500", width: "66%" };
    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return { text: "Strong", color: "bg-green-500", width: "100%" };
    }
    return { text: "Medium", color: "bg-yellow-500", width: "66%" };
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess(false);

      if (!docImg) {
        setLoading(false);
        return toast.error("Please upload doctor image");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: { aToken },
        }
      );

      if (data.success) {
        setSuccess(true);
        toast.success(data.message);

        // Reset form
        setDocImg(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");

        setTimeout(() => setSuccess(false), 3000);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">

      {/* Success Banner */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-100 text-green-700 animate-pulse">
          🎉 Doctor Added Successfully!
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Add New Doctor</h1>
        <p className="text-gray-500 mt-1">
          Fill in the details below to register a new doctor.
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl">

        {/* Image Upload */}
        <div className="flex items-center gap-6 mb-10">
          <label htmlFor="doc-img" className="cursor-pointer group relative">
            <img
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow-md group-hover:opacity-80 transition"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
              Change Photo
            </div>
          </label>
          <input
            type="file"
            id="doc-img"
            accept="image/*"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <div>
            <p className="text-gray-700 font-medium">Doctor Profile Photo</p>
            <p className="text-sm text-gray-500">
              Upload a clear professional image.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="space-y-4">

            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Doctor Name"
              required
            />

            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              type="email"
              placeholder="Doctor Email"
              required
            />

            {/* Password */}
            <div>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                type="password"
                placeholder="Password"
                required
              />

              {password && (
                <div className="mt-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-2 ${getPasswordStrength(password).color} transition-all duration-300`}
                      style={{ width: getPasswordStrength(password).width }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-gray-500">
                    Strength: {getPasswordStrength(password).text}
                  </p>
                </div>
              )}
            </div>

            <select
              value={experience}
              onChange={e => setExperience(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              {[...Array(15)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>

            <input
              value={fees}
              onChange={e => setFees(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              type="number"
              placeholder="Fees"
              required
            />

          </div>

          {/* RIGHT */}
          <div className="space-y-4">

            <select
              value={speciality}
              onChange={e => setSpeciality(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>

            <input
              value={degree}
              onChange={e => setDegree(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Education"
              required
            />

            <input
              value={address1}
              onChange={e => setAddress1(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Address line 1"
            />

            <input
              value={address2}
              onChange={e => setAddress2(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Address line 2"
            />

          </div>
        </div>

        {/* About */}
        <textarea
          value={about}
          onChange={e => setAbout(e.target.value)}
          rows={5}
          className="mt-8 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Write about doctor"
          required
        />

        {/* Submit */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-xl font-medium text-white flex items-center gap-2 transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg"
            }`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Adding...
              </>
            ) : (
              "Add Doctor"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddDoctor;

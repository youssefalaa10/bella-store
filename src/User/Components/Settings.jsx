import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/Slices/AuthSlice";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function Settings() {
  const { userDetails } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: userDetails ? userDetails.userName : "",
    userEmail: userDetails ? userDetails.userEmail : "",
    phone: userDetails ? userDetails.phone : "",
    address: userDetails ? userDetails.address : "",
    city: userDetails ? userDetails.city : "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({
          userName: user.displayName || formData.userName,
          userEmail: user.email || formData.userEmail,
          phone: userDetails ? userDetails.phone : "",
          address: userDetails ? userDetails.address : "",
          city: userDetails ? userDetails.city : "",
        });
      } else {
        console.log("No user is authenticated");
      }
    });

    return () => unsubscribe();
  }, [formData.userEmail, formData.userName, userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.userEmail) {
      console.log("Please fill in all required fields.");
      return;
    }

    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        console.log("User updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-4 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Settings
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Name
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-btncolor focus:outline-none text-gray-700"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Email
          </label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-btncolor focus:outline-none text-gray-700"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-btncolor focus:outline-none text-gray-700"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-btncolor focus:outline-none text-gray-700"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-btncolor focus:outline-none text-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-btncolor hover:bg-gray-600 text-white py-3 px-4 rounded-md shadow-lg hover:bg-btncolor-dark transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btncolor"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default Settings;

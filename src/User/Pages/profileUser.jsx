import { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { CiUser, CiHeart, CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/Slices/AuthSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

function ProfileUser() {
  const dispatch = useDispatch();
  const { user, userDetails, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(fetchUserData(currentUser.uid));
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (location.pathname === "/profileUser") {
      navigate("/profileUser/userInfo");
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center object-centerw-full mt-[25%]">
        <div className="">
          <span className="loading loading-infinity loading-lg text-mainColor"></span>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center object-centerw-full mt-[25%]">
        <div className="">
          <span className="loading loading-infinity loading-lg text-mainColor"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100vh] flex">
      <div className="w-[20%] shadow-lg p-5 relative">
        <h2 className="text-titleColor text-[1.2rem] font-semibold text-center">
          User Profile
        </h2>
        <div className="flex flex-col gap-4 mt-6">
          <NavLink
            to="/profileUser/userInfo"
            className={({ isActive }) =>
              `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
                isActive
                  ? "bg-btncolor text-white"
                  : "hover:bg-btncolor hover:text-white"
              } p-2 rounded-md`
            }
          >
            <CiUser size={20} />
            User Info
          </NavLink>

          <NavLink
            to="/profileUser/userfav"
            className={({ isActive }) =>
              `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                isActive
                  ? "bg-btncolor text-white"
                  : "hover:bg-btncolor hover:text-white"
              } p-2 rounded-md`
            }
          >
            <CiHeart size={20} />
            Favourites
          </NavLink>

          <NavLink
            to="/profileUser/Settings"
            className={({ isActive }) =>
              `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                isActive
                  ? "bg-btncolor text-white"
                  : "hover:bg-btncolor hover:text-white"
              } p-2 rounded-md`
            }
          >
            <CiSettings size={20} />
            Settings
          </NavLink>

          <NavLink
            to="/profileUser/orders"
            className={({ isActive }) =>
              `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                isActive
                  ? "bg-btncolor text-white"
                  : "hover:bg-btncolor hover:text-white"
              } p-2 rounded-md`
            }
          >
            <IoIosNotificationsOutline size={20} />
            My Orders
          </NavLink>
        </div>

        <div className="absolute bottom-2 w-full text-center">
          <NavLink
            to="/"
            className="ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full p-4 rounded-md"
          >
            <FaSignOutAlt size={20} />
            Back Home
          </NavLink>
        </div>
      </div>

      <div className="w-[80%] p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileUser;

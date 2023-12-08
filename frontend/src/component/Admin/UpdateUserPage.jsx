import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";

const UpdateUserPage = ({ userValues }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/admin/user/${userId}`,
          { withCredentials: true }
        );
        setName(data.user.name);
        setEmail(data.user.email);
        setRole(data.user.role);
      } catch (error) {
        toast.error("Failed to fetch user details");
        console.log(error);
      }
    }

    fetchUserDetails();
  }, [userId]);


  const updateUserSubmitHandler = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email);
      formData.set("role", role);

      await axios.put(
        `http://localhost:4000/api/admin/user/${userId}`,
        formData,
        { withCredentials: true }
      );
      
      toast.success("User Updated Successfully");
      navigate("/admin-home");
    } catch (error) {
      toast.error("Failed to update user. Please try again later.");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="w-screen mt-10 bg-black min-h-screen text-slate-300 relative py-4">
        <div className="flex flex-col md:flex-row mx-auto gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-full my-10 px-5  md:px-10">

          <div className="w-full flex flex-col h-[100vh] box-border bg-gray-300  p-5  ">
            <form
              className="flex flex-col justify-evenly items-center m-auto p-3 sm:w-1/2 md:w-1/3 h-[70%]  bg-white/60 rounded shadow-lg shadow-black"
              onSubmit={updateUserSubmitHandler}
            >
              <h1 className="text-black align-middle  text-3xl md:text-4xl font-Homehero">Update User</h1>

              <div className="flex items-center w-[100%]">
                <PersonIcon className="scale-x-[1vmax] text-[1.6vmax] text-black" />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full  p-4 box-border rounded-sm text-sm md:text-[0.9vmax] outline-none "
                />
              </div>
              <div className="flex items-center w-[100%]">
                <MailOutlineIcon className="scale-x-[1vmax] text-[1.6vmax] text-black" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 box-border rounded-sm text-sm md:text-[0.9vmax] outline-none "
                />
              </div>

              <div className="flex items-center w-[100%]">
                <VerifiedUserIcon className="scale-x-[1vmax] text-[1.6vmax] text-black" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-4 box-border rounded-sm text-sm md:text-[0.9vmax] outline-none "
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <Button
                id="updateUserBtn"
                type="submit"
                disabled={updateLoading || role === ""}
                className="bg-black/5 text-white text-[0.9vmax] w-1/2 p-[0.8vmax] cursor-pointer outline-none shadow-sm shadow-black hover:bg-black/10 transition duration-200 ease-in-out"
              >
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUserPage;

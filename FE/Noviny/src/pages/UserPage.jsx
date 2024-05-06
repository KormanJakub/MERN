import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { decodeJWT } from "../util/token.js";

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [formData, setFormData] = useState({
    nickName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const tokenLoc = localStorage.getItem("uiAppToken");
  const decodedToken = decodeJWT(tokenLoc);
  const userIdWithToken = decodedToken.userId === userId;
  const adminRole = localStorage.getItem("uiAppRole") === "admin";

  const canEditOrDelete = userIdWithToken || adminRole;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/getUserById/${userId}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("uiAppToken"),
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setFormData({
            nickName: userData.record.nickName,
            firstName: userData.record.firstName,
            lastName: userData.record.lastName,
            email: userData.record.email,
          });
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const deleteUser = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/admin/deleteUser/${userId}`,
        {
          method: "DELETE",
          headers: {
            "x-access-token": localStorage.getItem("uiAppToken"),
          },
        }
      );

      if (response.ok) {
        console.log("User successfully deleted.");
        navigate("/admin"); // Redirect to admin page after deleting
      } else {
        console.error("Failed to delete user. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/updateUser/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("uiAppToken"),
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("User successfully updated.");
        setEditMode(false);
        setUser({record: formData});
      } else {
        console.error("Failed to update user. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const changePassword = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/updatePassword/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("uiAppToken"),
          },
          body: JSON.stringify({ password: formData.password }),
        }
      );

      if (response.ok) {
        console.log("Password successfully changed.");
        setChangePasswordMode(false);
      } else {
        console.error("Failed to change password. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-column align-items-center justify-content-center min-h-screen">
      <div className="card w-6">
        <h1 className="text-center mb-4">User Profile</h1>
        {editMode ? (
          <>
            <div className="p-field mb-4">
              <label htmlFor="nickName">Nick Name:</label>
              <InputText
                id="nickName"
                name="nickName"
                value={formData.nickName}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="p-field mb-4">
              <label htmlFor="firstName">First Name:</label>
              <InputText
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="p-field mb-4">
              <label htmlFor="lastName">Last Name:</label>
              <InputText
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="p-field mb-4">
              <label htmlFor="email">Email:</label>
              <InputText
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="flex justify-content-center gap-2">
              <Button label="Save" icon="pi pi-save" className="p-button-success" onClick={updateUser} />
              <Button label="Cancel" icon="pi pi-times" className="p-button-danger" onClick={() => setEditMode(false)} />
            </div>
          </>
        ) : changePasswordMode ? (
          <>
            <div className="p-field mb-4">
              <label htmlFor="password">New Password:</label>
              <Password
                id="password"
                name="password"
                value={formData.password}
                feedback={false}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="flex justify-content-center gap-2">
              <Button label="Change Password" icon="pi pi-save" className="p-button-success" onClick={changePassword} />
              <Button label="Cancel" icon="pi pi-times" className="p-button-danger" onClick={() => setChangePasswordMode(false)} />
            </div>
          </>
        ) : (
          <>
            <p className="text-center">Nick Name: {user.record.nickName}</p>
            <p className="text-center">First Name: {user.record.firstName}</p>
            <p className="text-center">Last Name: {user.record.lastName}</p>
            <p className="text-center">Email: {user.record.email}</p>
            {canEditOrDelete && (
              <div className="flex justify-content-center gap-2 mt-4">
                <Button label="Edit" icon="pi pi-pencil" className="p-button-primary" onClick={() => setEditMode(true)} />
                <Button label="Change Password" icon="pi pi-key" className="p-button-secondary" onClick={() => setChangePasswordMode(true)} />
                <Button label="Delete user" icon="pi pi-trash" className="p-button-danger" onClick={deleteUser} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

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
            password: "",
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
        setUser({ record: formData });
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

  const adminRole = localStorage.getItem("uiAppRole");

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {editMode ? (
        <>
          <div className="p-field">
            <label htmlFor="nickName">Nick Name:</label>
            <InputText
              id="nickName"
              name="nickName"
              value={formData.nickName}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-field">
            <label htmlFor="firstName">First Name:</label>
            <InputText
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-field">
            <label htmlFor="lastName">Last Name:</label>
            <InputText
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-field">
            <label htmlFor="email">Email:</label>
            <InputText
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <Button label="Save" icon="pi pi-save" onClick={updateUser} />
          <Button label="Cancel" icon="pi pi-times" className="ml-2" onClick={() => setEditMode(false)} />
        </>
      ) : changePasswordMode ? (
        <>
          <div className="p-field">
            <label htmlFor="password">New Password:</label>
            <InputText
              id="password"
              name="password"
              value={formData.password}
              type="password"
              onChange={handleInputChange}
            />
          </div>
          <Button label="Change Password" icon="pi pi-save" onClick={changePassword} />
          <Button label="Cancel" icon="pi pi-times" className="ml-2" onClick={() => setChangePasswordMode(false)} />
        </>
      ) : (
        <>
          <p>Nick Name: {user.record.nickName}</p>
          <p>First Name: {user.record.firstName}</p>
          <p>Last Name: {user.record.lastName}</p>
          <p>Email: {user.record.email}</p>
          {adminRole === "admin" && (
            <>
              <Button label="Edit" icon="pi pi-pencil" onClick={() => setEditMode(true)} />
              <Button label="Change Password" icon="pi pi-key" className="ml-2" onClick={() => setChangePasswordMode(true)} />
              <Button label="Delete user" icon="pi pi-trash" className="p-button-danger ml-2" onClick={deleteUser} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserPage;

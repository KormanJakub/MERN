import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Knob } from "primereact/knob";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
import { Message } from "primereact/message";

const AdminPage = () => {
  const [userDatas, setUsersData] = useState([]);
  const [articleDatas, setArticleDatas] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [newUser, setNewUser] = useState({
    nickName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_repeat: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("uiAppToken");

        let response = await fetch("http://localhost:3000/admin/allUsers", {
          headers: {
            "x-access-token": token,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setUsersData(responseData);
        } else if (response.status === 401) {
          navigate("/login");
        }

        response = await fetch(
          "http://localhost:3000/articles/getAllArticles",
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        if (response.ok) {
          const responseData1 = await response.json();
          setArticleDatas(responseData1);
        } else if (response.status === 401) {
          navigate("/login");
        }
      } catch (error) {
        console.log("Error loading data for ADMIN!");
      }
    };
    load();
  }, [navigate]);

  const handleRowClick = (event) => {
    const userId = event.data._id;
    navigate(`/user/${userId}`);
  };

  const handleRowClickArticle = (event) => {
    const art_id = event.data._id;
    navigate(`/articles/${art_id}`);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setNewUser({
      nickName: "",
      email: "",
      password: "",
      password_repeat: "",
      firstName: "",
      lastName: "",
    });
    setPasswordMismatch(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "password" || name === "password_repeat") {
      setPasswordMismatch(
        name === "password"
          ? value !== newUser.password_repeat
          : value !== newUser.password
      );
    }
  };

  const handleAddUser = async () => {
    if (passwordMismatch || !newUser.password) {
      console.error("Passwords do not match or are empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/admin/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("uiAppToken"),
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsersData((prevUsers) => [...prevUsers, createdUser]);
        handleDialogClose();
        console.log("User successfully added.");
      } else {
        console.error("Failed to add user. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <Knob
            value={userDatas.length}
            disabled
            size={150}
            valueColor="#48d1cc"
            className="mx-auto"
          />
          <p className="text-center mt-2 font-semibold">Registered users</p>
        </div>
        <div className="flex flex-col items-center">
          <Knob
            value={articleDatas.length}
            disabled
            size={150}
            className="mx-auto"
          />
          <p className="text-center mt-2 font-semibold">Created articles</p>
        </div>
      </div>

      <div className="mb-4 flex justify-end mt-4">
        <Button
          label="Add User"
          icon="pi pi-plus"
          className="p-button-primary"
          onClick={() => setShowDialog(true)}
        />
      </div>

      <DataTable
        className="mt-5 mb-8"
        showGridlines
        removableSort
        value={userDatas}
        tableStyle={{ minWidth: "100%", minHeight: "20rem" }}
        paginator
        rows={5}
        responsiveLayout="scroll"
        onRowClick={handleRowClick}
      >
        <Column
          className="cursor-pointer"
          field="nickName"
          header="Nick Name"
        />
        <Column field="firstName" header="First Name" />
        <Column field="lastName" header="Last Name" />
        <Column field="email" header="Email" />
      </DataTable>

      <DataTable
        value={articleDatas}
        showGridlines
        removableSort
        tableStyle={{ minWidth: "100%", minHeight: "20rem" }}
        paginator
        rows={5}
        responsiveLayout="scroll"
        onRowClick={handleRowClickArticle}
      >
        <Column
          className="cursor-pointer"
          field="name"
          header="Name of article"
        />
        <Column field="publicationTime" header="Publication time" />
        <Column field="userName" header="Writer" />
      </DataTable>

      <Dialog
        header="Add User"
        visible={showDialog}
        style={{ width: "90vw", maxWidth: "500px" }}
        modal
        onHide={handleDialogClose}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="nickName">Nick Name</label>
            <InputText
              id="nickName"
              name="nickName"
              value={newUser.nickName}
              onChange={handleInputChange}
            />
          </div>
          <div class="p-field">
            <label htmlFor="firstName">First Name</label>
            <InputText
              id="firstName"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div class="p-field">
            <label htmlFor="lastName">Last Name</label>
            <InputText
              id="lastName"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div class="p-field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div class="p-field">
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              feedback={false}
            />
          </div>
          <div class="p-field">
            <label htmlFor="password_repeat">Repeat Password</label>
            <Password
              id="password_repeat"
              name="password_repeat"
              value={newUser.password_repeat}
              onChange={handleInputChange}
              feedback={false}
            />
          </div>
          {passwordMismatch && (
            <Message severity="error" text="Passwords do not match!" />
          )}
          <div class="flex justify-end gap-2">
            <Button
              label="Add"
              icon="pi pi-check"
              className="p-button-success"
              onClick={handleAddUser}
              disabled={passwordMismatch || !newUser.password}
            />
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-secondary"
              onClick={handleDialogClose}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminPage;

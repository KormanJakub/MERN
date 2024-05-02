import { useEffect, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { Knob } from "primereact/knob";

const AdminPage = ({ onSelect }) => {
  const [userDatas, setUsersData] = useState([]);
  const [articleDatas, setArticleDatas] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/allUsers");
        if (response.ok) {
          const responseData = await response.json();
          setUsersData(
            responseData.map((item) => {
              return {
                ...item,
              };
            })
          );
        }

        const responseArticle = await fetch(
          "http://localhost:3000/articles/getAllArticles"
        );

        if (responseArticle.ok) {
          const responseData1 = await responseArticle.json();
          setArticleDatas(
            responseData1.map((item) => {
              return {
                ...item,
              };
            })
          );
        }
      } catch (error) {
        console.log("Error loding datas for ADMIN!");
      }
    };
    load();
  }, []);

  return (
    <div className="admin">
      <div className="flex gap-8  align-items-center justify-content-center">
        <div>
          <Knob
            value={userDatas.length}
            disabled
            size={250}
            valueColor="#48d1cc"
          />
          <p className="ml-5">Registered users!</p>
        </div>

        <div className="articles">
          <Knob value={articleDatas.length} disabled size={250} />
          <p className="ml-5">Created articles!</p>
        </div>
      </div>

      <DataTable
        className="mt-5 mb-8"
        showGridlines
        removableSort
        value={userDatas}
        tableStyle={{ minWidth: "50rem", minHeight: "20rem" }}
        paginator
        rows={5}
      >
        <Column
          className="cursor-pointer"
          field="nickName"
          header="Nick Name"
        ></Column>
        <Column field="firstName" header="First Name"></Column>
        <Column field="lastName" header="Last Name"></Column>
        <Column field="email" header="Email"></Column>
      </DataTable>

      <DataTable
        value={articleDatas}
        showGridlines
        removableSort
        tableStyle={{ minWidth: "50rem", minHeight: "20rem" }}
        paginator
        rows={5}
      >
        <Column
          className="cursor-pointer"
          field="name"
          header="Name of article"
        ></Column>
        <Column field="publicationTime" header="Publication time"></Column>
        <Column field="userName" header="Writer"></Column>
      </DataTable>
    </div>
  );
};

export default AdminPage;

import { useEffect, useState } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const AdminPage = ({ onSelect }) => {
  const [userDatas, setUsersData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/allUsers");
        if (response.ok) {
          const responseData = await response.json();
          setUsersData(
            responseData.map((item) => {
              return {
                ...item
              };
            })
          )
        }
      } catch (error) {
        alert("Error loding articles!");
      }
    };
    load();
  }, []);

  return (
    <div>
      <DataTable value={userDatas} tableStyle={{ minWidth: '50rem' }}>
          <Column field="nickName" header="Nick Name"></Column>
          <Column field="firstName" header="First Name"></Column>
          <Column field="lastName" header="Last Name"></Column>
          <Column field="email" header="Email"></Column>
        </DataTable>
    </div>
  );
};

export default AdminPage;
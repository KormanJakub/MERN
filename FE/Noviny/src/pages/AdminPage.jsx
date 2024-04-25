import { useEffect, useState } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const AdminPage = ({ onSelect }) => {
    const [userDatas, setUsersData] = useState([]);

    useEffect(() => {
      const load = async() => {
      try {
        const response = await fetch("http://localhost:3000/admin/allUsers");
        if (response.ok) {
          const responseData = await response.json();
          setUsersData(
            responseData.map((item) => {
                console.log(item);
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
            
        </div>
    );
};

export default AdminPage;
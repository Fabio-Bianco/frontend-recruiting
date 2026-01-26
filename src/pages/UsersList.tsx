import { useEffect, useState } from "react";
//import Material React Table
import { MaterialReactTable } from "material-react-table";
import { getUsers } from "../api/users.api";
import type { User } from "../types/user";
import { Link } from "react-router-dom";



export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  const columns = [
    { accessorKey: "name", header: "Nome" },
    { accessorKey: "email", header: "Email" },
  ];

  return (
    <div>
      <h1>Lista Utenti</h1>

      <MaterialReactTable columns={columns} data={users} />
    </div>
  );
}

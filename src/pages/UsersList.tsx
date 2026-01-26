//import React e gli hook necessari
import { useEffect, useState } from "react";
//import Material React Table
import { MaterialReactTable } from "material-react-table";
// Import della funzione che recupera gli utenti dal backend
import { getUsers } from "../api/users.api";
// Import del tipo User
import type { User } from "../types/user";
// Import del componente Link per la navigazione
import { Link } from "react-router-dom";


// Questo componente rappresenta la pagina che mostra la lista degli utenti
export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect viene eseguito una sola volta quando il componente viene montato
  useEffect(() => {
    async function loadUsers() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }

    loadUsers(); // Avviamo il caricamento
  }, []);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  // Definizione delle colonne per Material React Table
const columns = [
  {
    accessorKey: "name",
    header: "Nome",
    Cell: ({ row }: any) => (
      <Link to={`/users/${row.original.id}`}>{row.original.name}</Link>
    ),
  },
  { accessorKey: "email", header: "Email" },
];

  return (
    <div>
      <h1>Lista Utenti</h1>


      <MaterialReactTable columns={columns} data={users} />
    </div>
  );
}

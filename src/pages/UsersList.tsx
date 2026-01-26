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

// Import dei tipi di Material React Table
import type { MRT_ColumnDef } from "material-react-table";


// Questo componente rappresenta la pagina che mostra la lista degli utenti
export default function UsersList() {

  // -----------------------------
  // 1) DATA (i post dal backend)
  // -----------------------------

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);


  // -----------------------------
  // 2) TABLE STATE (stato tabella)
  // -----------------------------

  // -----------------------------
  // 3) LOAD DATA (fetch posts)
  // -----------------------------

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
  const columns: MRT_ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      Cell: ({ row }) => (
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

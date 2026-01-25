import { useEffect, useState } from "react";
import { getUsers } from "../api/users.api";

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([]);
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

  return (
    <div>
      <h1>Lista Utenti</h1>

      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <br />
            <small>{user.email}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

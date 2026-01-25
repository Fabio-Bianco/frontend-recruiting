import { useEffect, useState } from "react";
import { getUsers } from "../api/users.api";
import type { User } from "../types/user";


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

  return (
    <div>
      <h1>Lista Utenti</h1>

      <ul>
        {users.map((user) => (
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

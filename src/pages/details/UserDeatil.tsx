import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/users.api";
import type { User } from "../../types/user";

export function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        const status = (err as any)?.response?.status;
        setError(status === 404 ? "Utente non trovato." : "Errore nel caricamento dell'utente.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  if (loading) return <div>Caricamento in corso...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>Utente non trovato.</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

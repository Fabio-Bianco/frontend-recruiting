import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/users.api";
import type { User } from "../../types/user";


export default function UserDetail() {
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
        if (status === 404) {

          setError("Utente non trovato.");

        } else {

          setError("Errore nel caricamento dell'utente.");
        }
        setUser(null);

      } finally {

        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Utente non trovato.</p>;

  return (
    <div>
      <h1>Pagina di dettaglio dell'utente</h1>
      <p>ID dell'utente: {id}</p>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

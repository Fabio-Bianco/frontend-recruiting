// importazione useParams da react-router-dom
import { useParams } from "react-router-dom";



export default function PostsDetails() {

    const { id } = useParams();

    return (
        <div>
            <h1>Pagina di dettaglio del post</h1>
            <p>ID del post: {id}</p>
        </div>
    )

}
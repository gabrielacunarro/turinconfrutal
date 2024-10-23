import { useState, useEffect, useContext } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import ReactLoading from 'react-loading';
import { ItemsContext } from "../contexts/ItemsContext.jsx";
import ProductTable from "./ProductTable"; // Asegúrate de que ProductTable esté correctamente importado

export const ItemListContainer = () => { // Asegúrate de que esté exportado correctamente
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(ItemsContext);

    useEffect(() => {
        const db = getFirestore();
        const refCollection = collection(db, "items");

        getDocs(refCollection)
            .then((snapshot) => {
                setItems(
                    snapshot.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() };
                    })
                );
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Container className="spinner">
                <ReactLoading type="spin" color="#000" />
            </Container>
        );
    }

    if (items.length === 0) {
        return <Container className="text-center mt-4">No hay productos disponibles.</Container>;
    }

    return (
        <Container className="mt-4">
            <ProductTable items={items} addItem={addItem} />
        </Container>
    );
};

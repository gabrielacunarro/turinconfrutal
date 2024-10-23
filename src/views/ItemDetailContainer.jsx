// import { useState, useEffect, useContext } from "react";
// import { getFirestore, getDocs, collection } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Table, Button } from "react-bootstrap";
// import ReactLoading from 'react-loading';
// import { ItemsContext } from "../contexts/ItemsContext.jsx"; // Asegúrate de importar tu contexto

// export const ItemListContainer = () => {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { addItem } = useContext(ItemsContext); // Para agregar ítems al carrito

//     useEffect(() => {
//         const db = getFirestore();
//         const refCollection = collection(db, "items");

//         getDocs(refCollection)
//             .then((snapshot) => {
//                 setItems(
//                     snapshot.docs.map((doc) => {
//                         return { id: doc.id, ...doc.data() };
//                     })
//                 );
//             })
//             .finally(() => setLoading(false));
//     }, []);

//     if (loading) {
//         return (
//             <Container className="spinner">
//                 <ReactLoading type="spin" color="#000" />
//             </Container>
//         );
//     }

//     if (items.length === 0) {
//         return <Container className="text-center mt-4">No hay productos disponibles.</Container>;
//     }

//     const handleAddItem = (item) => {
//         const quantity = parseInt(document.getElementById(`quantity-${item.id}`).value, 10); // Obtiene la cantidad del input
//         if (quantity > 0) {
//             addItem({ ...item, quantity }); // Agrega el ítem con la cantidad al carrito
//         }
//     };

//     return (
//         <Container className="mt-4">
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Nombre</th>
//                         <th>Precio</th>
//                         <th>Cantidad</th>
//                         <th>Acciones</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {items.map((item) => (
//                         <tr key={item.id}>
//                             <td>{item.title}</td>
//                             <td>${item.price}</td>
//                             <td>
//                                 <input
//                                     type="number"
//                                     min="0"
//                                     defaultValue="0"
//                                     id={`quantity-${item.id}`}
//                                     style={{ width: '60px' }}
//                                 />
//                             </td>
//                             <td>
//                                 <Button
//                                     variant="success"
//                                     onClick={() => handleAddItem(item)} 
//                                 >
//                                     Agregar
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

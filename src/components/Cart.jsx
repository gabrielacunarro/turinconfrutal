import { useContext, useState } from 'react';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { ItemsContext } from '../contexts/ItemsContext';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    nombre: "",
    telefono: "",
    direccion: "",
    aclaraciones: "",
    zona: "",
    pago: ""
};

export const Cart = () => {
    const [buyer, setBuyer] = useState(initialValues);
    const { items, clearItems } = useContext(ItemsContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log(items);


    const total = items.reduce((acc, act) => acc + act.price * act.quantity, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBuyer((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        // Validación simple de los campos del formulario
        if (!buyer.nombre || !buyer.telefono || !buyer.direccion || !buyer.zona || !buyer.pago) {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        const order = {
            buyer,
            items,
            total,
        };

        setLoading(true);

        try {
            const db = getFirestore();
            const orderCollection = collection(db, "orders");
            const docRef = await addDoc(orderCollection, order);
            alert("Your order: " + docRef.id + " was successfully created");

            // Limpiar el carrito después del checkout
            clearItems();
            setLoading(false);
            // Redirigir a la página de detalles de la orden
            navigate(`/order/${docRef.id}`);
        } catch (error) {
            console.error("Error creating order: ", error);
            setLoading(false);
            alert("Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <>
            {items.length === 0 ? (
                <p>No has agregado ningún producto aún.</p>
            ) : (
                <>
                    {items.map((item) => (
                        <div className='cart-detail' key={item.id}>
                            <img src={item.imageId} height={100} alt={item.title} />
                            <h2>Quantity: {item.quantity}</h2>
                            <h3>Price: {item.price}</h3>
                        </div>
                    ))}
                    <div className='total'>
                        <h4>Total U$s: {total}</h4>
                    </div>
                    <form onSubmit={handleCheckout}>
                        <div>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={buyer.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Teléfono:</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={buyer.telefono}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Dirección:</label>
                            <input
                                type="text"
                                name="direccion"
                                value={buyer.direccion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Aclaraciones:</label>
                            <textarea
                                name="aclaraciones"
                                value={buyer.aclaraciones}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Zona:</label>
                            <input
                                type="text"
                                name="zona"
                                value={buyer.zona}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Método de Pago:</label>
                            <select name="pago" value={buyer.pago} onChange={handleChange} required>
                                <option value="">Seleccione</option>
                                <option value="efectivo">Efectivo</option>
                                <option value="tarjeta">Tarjeta</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Checkout'}
                        </button>
                    </form>
                </>
            )}
        </>
    );
};

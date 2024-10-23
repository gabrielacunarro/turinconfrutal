// src/OrderForm.jsx
import React, { useState } from 'react';
import { db } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const OrderForm = ({ productos }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    const procesarPedido = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'pedidos'), {
                nombre,
                telefono,
                direccion,
                productos: productosSeleccionados,
            });
            alert('Pedido realizado con éxito');
        } catch (error) {
            console.error('Error al realizar el pedido: ', error);
        }
    };

    return (
        <form onSubmit={procesarPedido}>
            <h2>Formulario de Pedido</h2>
            <input type="text" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} required />
            <input type="text" placeholder="Teléfono" onChange={(e) => setTelefono(e.target.value)} required />
            <input type="text" placeholder="Dirección" onChange={(e) => setDireccion(e.target.value)} required />
            <div>
                <h3>Selecciona Productos</h3>
                {productos.map(producto => (
                    <div key={producto.id}>
                        <input 
                            type="checkbox" 
                            value={producto.id} 
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setProductosSeleccionados([...productosSeleccionados, producto]);
                                } else {
                                    setProductosSeleccionados(productosSeleccionados.filter(p => p.id !== producto.id));
                                }
                            }} 
                        />
                        {producto.nombre} - ${producto.precio}
                    </div>
                ))}
            </div>
            <button type="submit">Enviar Pedido</button>
        </form>
    );
};

export default OrderForm;

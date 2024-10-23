import PropTypes from 'prop-types'; // Importa PropTypes
import { Table, Button } from "react-bootstrap";

const ProductTable = ({ items, addItem }) => {
    const handleAddItem = (item, unitType) => {
        let quantity = 0;
        if (unitType === 'unit') {
            quantity = parseInt(document.getElementById(`unit-quantity-${item.id}`).value, 10);
        } else if (unitType === 'kg') {
            quantity = parseInt(document.getElementById(`kg-quantity-${item.id}`).value, 10);
        }

        if (quantity > 0) {
            addItem({ ...item, quantity, unitType }); // Agrega el item al carrito
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad (Unidades)</th>
                    <th>Cantidad (Kg)</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>${item.price}</td>
                        <td>
                            <input
                                type="number"
                                min="0"
                                defaultValue="0"
                                id={`unit-quantity-${item.id}`}
                                style={{ width: '60px' }}
                                onChange={() => document.getElementById(`kg-quantity-${item.id}`).value = ""}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0"
                                defaultValue="0"
                                id={`kg-quantity-${item.id}`}
                                style={{ width: '60px' }}
                                onChange={() => document.getElementById(`unit-quantity-${item.id}`).value = ""}
                            />
                        </td>
                        <td>
                            <Button
                                variant="success"
                                onClick={() => handleAddItem(item)}
                            >
                                +
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

// Agrega validaciones de props
ProductTable.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
    addItem: PropTypes.func.isRequired,
};

export default ProductTable;

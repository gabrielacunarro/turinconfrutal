import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ItemsContext = createContext();

export const Provider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        const alreadyExists = items.some((i) => i.id === item.id);

        if (alreadyExists) {
            const transform = items.map(i => {
                if (i.id === item.id) {
                    return { ...i, quantity: i.quantity + item.quantity }
                } else {
                    return i
                }
            });
            setItems(transform)
        } else {
            setItems((prev) => [...prev, item]);
        }
    };

    const getTotalItems = () => items.length;

    const clearItems = () => {
        setItems([]);
    };

    return (
        <ItemsContext.Provider value={{ items, addItem, getTotalItems, clearItems }}>
            {children}
        </ItemsContext.Provider>
    );
};

Provider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ItemsContext };

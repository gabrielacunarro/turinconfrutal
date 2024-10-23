import { useContext } from 'react';
import { ItemsContext } from '../contexts/ItemsContext.jsx';

export const CartWidget = () => {
    const { getTotalItems } = useContext(ItemsContext);

    return (
        <div>
            <i className="bi bi-cart"></i>
            <span>{getTotalItems()}</span>
        </div>
    );
};

import React from 'react';
import Menu from '../../components/MenuBar';
// import { Container } from './styles';

export default function Home() {

    const product = {
        description: '',
        price: '',
        photo: '',
    }

    const ProductContext = React.createContext(product)

    return (
        <>
            <ProductContext.Provider value={product}>
                <Menu />
            </ProductContext.Provider>

        </>
    );
}

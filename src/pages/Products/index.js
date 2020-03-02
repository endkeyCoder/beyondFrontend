import React from 'react';
import ProductForm from '../../components/ProductForm';
import MenuBar from '../../components/MenuBar';

// import { Container } from './styles';

export default function Products() {
    return (
        <div>
            <MenuBar />
            <ProductForm id="formProduct" />
        </div>
    );
}

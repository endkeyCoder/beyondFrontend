import React from 'react';

import './styles.css';

export default function ProductForm({ id }) {
    return (
        <form className="formProduct">
            <div className="productHeader">
                <h3>Cadastro de produtos</h3>
            </div>
            <div className="productBody">
                <div className="productItem">
                    <label>Nome</label>
                    <input type="text" placeholder="nome do produto" />
                </div>
                <div className="productItem">
                    <label>Descrição</label>
                    <textarea rows={5} placeholder="detalhes do produto" />
                </div>
                <div className="productItem">
                    <label>Preço</label>
                    <input type="number" />
                </div>
            </div>
            <div className="productItem">
                <button>Cadastrar</button>
            </div>
        </form>

    );
}

import React from 'react';

import './styles.css';

export default function ClientsForm() {
    return (
        <form className="formClients">
            <div className="headerClients">
                <h1>Cadastro de Clientes</h1>
            </div>
            <div className="bodyClients">
                <div className="registrationData">
                    <div className="itemClients">
                        <label>Nome</label>
                        <input type="text" />
                    </div>
                    <div className="itemClients">
                        <label>Endereço</label>
                        <input type="text" placeholder="Ex: R. Maria de josé, 123 - Vila São João" />
                    </div>
                    <div className="itemClients">
                        <label>Cidade</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="docmentsClients">
                    <div className="itemClients">
                        <label>CPF</label>
                        <input type="text" maxLength={11} />
                    </div>
                    <div className="itemClients">
                        <label>RG</label>
                        <input type="text" maxLength={11} />
                    </div>
                </div>
            </div>
        </form>
    );
}

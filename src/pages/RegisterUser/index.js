import React from 'react';
import RegisterUserForm from '../../components/RegisterUserForm'
import './styles.css';

export default function RegisterUser() {
    return (
        <div className="containerRegisterUser">
            <section>
                <RegisterUserForm />
            </section>
        </div>
    );
}

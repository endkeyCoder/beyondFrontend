import React from 'react';
import RegisterUserForm from '../../components/RegisterUserForm'
import MenuBar from '../../components/MenuBar';
import './styles.css';

export default function RegisterUser() {
    return (
        <>
            <MenuBar />
            <div className="containerRegisterUser">

                <section>
                    <RegisterUserForm />
                </section>
            </div>
        </>

    );
}

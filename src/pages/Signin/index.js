import React from 'react';

import FormSignin from '../../components/SigninForm';


import './styles.css';

export default function Signin() {

    return (
        <div className="containerSignin">
            <section className="sectionSignin">
                <FormSignin />
            </section>
        </div>

    );
}

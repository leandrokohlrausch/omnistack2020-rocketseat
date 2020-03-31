import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import LogoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

import './styles.css';

function Logon () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handlerLogin (e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { email, password } );
            localStorage.setItem('ongId', response.data.id);
            localStorage.setItem('ongName', response.data.name);
            localStorage.setItem('credentials', response.data.token);
            history.push('/profile');
        } catch (err) {
            alert("Falha no login");
        }
    }


    return (
        <div className="logon-container">
            <section className="form">
                <img src={LogoImg} alt="Logo"/>
                <form onSubmit={handlerLogin}>
                    <h1>Faça seu logon</h1>
                    <input type="email" placeholder="Seu email"
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                    />
                    <input type="password" placeholder="Senha"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}

export default Logon;
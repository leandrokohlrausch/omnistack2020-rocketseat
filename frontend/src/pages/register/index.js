import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import LogoImg from '../../assets/logo.svg';

import api from '../../services/api';

function Register () {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ whatsapp, setWhatsApp ] = useState('');
    const [ city, setsetCity ] = useState('');
    const [ uf, setUf ] = useState('');

    const history = useHistory();

    async function handlerRegister (e) {
        e.preventDefault();
        const data = {
            name, 
            email, 
            whatsapp,
            city,
            uf,
            password
        };

        try {
            const response = await api.post('ongs', data);
            alert(`Cadastro com sucesso`);
            history.push("/");    
        } catch (err) {
            alert(`Erro no cadastro. Tente novamente`);
        } 
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Logo"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handlerRegister} >
                    <input type="text" 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={ e => setName(e.target.value) }
                    />
                    <input type="email" 
                    placeholder="E-mail da ONG"
                    value={email}
                    onChange={ e => setEmail(e.target.value) }/>
                    <input type="password" 
                    placeholder="Senha ONG"
                    value={password}
                    onChange={ e => setPassword(e.target.value) }/>
                    <input type="text" 
                    placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={ e => setWhatsApp(e.target.value) }/>
                    <div className="input-group">
                        <input type="text" placeholder="Cidade da ONG"
                               value={city}
                               onChange={ e => setsetCity(e.target.value) }/>
                        <input type="text" placeholder="UF da ONG" style={{ width: 80 }}
                               value={uf}
                               onChange={ e => setUf(e.target.value) }/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
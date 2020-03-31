import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import LogoImg from '../../assets/logo.svg';


function Profile () {
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const credential = localStorage.getItem('credentials');

    if (!credential && !ongName && !ongId) {
        handlerLogout();
    } 

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profiles', {
            headers : {
                Authorization : `Bearer ${credential}`
            }
        }).then( response => {
            setIncidents(response.data);
        })
    }, [ ongId ]);


    async function handlerDeleteIncident (id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers : {
                    Authorization : `Bearer ${credential}`
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar incidente. tente novamente');
        }
    }

    function handlerLogout () {
        localStorage.removeItem('ongName');
        localStorage.removeItem('ongId');
        localStorage.removeItem('credentials');
        history.push("/");
    }

    return (
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt="Logo"/>
                <span>Bem vinda {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handlerLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map( incident => (
                   <li key={incident.id}>
                   <strong>Caso:</strong>
                   <p>{incident.title}</p>

                   <strong>Descrição</strong>
                    <p>{incident.description}</p>

                   <strong>Valor</strong>
                    <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>

                   <button type="button" onClick={() => handlerDeleteIncident(incident.id) } >
                       <FiTrash2 size={20} color="#a8a8b3"/>
                   </button>
                   </li>   
                ))}
            </ul>
        </div>
    );
}

export default Profile;
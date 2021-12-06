import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import constantes from '../../../constantes';
export const EditarEncuesta = _ =>{
    const [encuestas, setEncuestas] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        axios.get(constantes.url_servidor+'/encuestas/'+id).then((response)=>{
            setEncuestas(response.data);
        });
    }, [id]);

    const editar = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            nombre: form.nombre.value,
            usuario_id: form.usuario_id.value,
            descripcion: form.descripcion.value,
        };

        axios.put(constantes.url_servidor+'/encuestas/'+id, data).then((response)=>{
            window.location.replace(constantes.url_servidor2+'/encuestas');
        });
    }

    return (
        <div>
            <li><Link className="btn btn-secondary" to="/encuestas">Volver</Link></li>
            <ul>
                <table>
                    <tbody>
                        <tr key={encuestas.id}>
                            <td>|</td><td>{encuestas.id}{')'}</td>
                            <td>|</td><td>{encuestas.nombre}</td>
                            <td>|</td><td>{encuestas.usuario_id}</td>
                            <td>|</td><td>{encuestas.descripcion}</td><td>|</td>
                        </tr>
                    </tbody>
                </table>
            </ul>
            <form onSubmit={editar}>
                <input type="text" placeholder={encuestas.nombre} name="nombre"></input>
                <input type="number" placeholder={encuestas.usuario_id} name="usuario_id"></input>
                <input type="text" placeholder={encuestas.descripcion} name="descripcion"></input>
                <button type="submit">Editar</button>
            </form>
        </div>
    );
}
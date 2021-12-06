import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import constantes from '../../../constantes';
export const EditarSeccion = _ =>{
    const [secciones, setSeccion] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        axios.get(constantes.url_servidor+'/secciones/'+id).then((response)=>{
            setSeccion(response.data);
        });
    }, [id]);

    const editar = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            nombre: form.nombre.value,
            encuesta_id: form.encuesta_id.value,
        };

        axios.put(constantes.url_servidor+'/secciones/'+id, data).then((response)=>{
            window.location.replace(constantes.url_servidor2+'/secciones');
        });
    }

    return (
        <div>
            <li><Link className="btn btn-secondary" to="/secciones">Volver</Link></li>
            <ul>
                <table>
                    <tbody>
                        <tr key={secciones.id}>
                            <td>|</td><td>{secciones.id}{')'}</td>
                            <td>|</td><td>{secciones.nombres}</td>
                            <td>|</td><td>{secciones.encuesta_id}</td><td>|</td>
                        </tr>
                    </tbody>
                </table>
            </ul>
            <form onSubmit={editar}>
                <input type="text" placeholder={secciones.nombre} name="nombre"></input>
                <input type="number" placeholder={secciones.encuesta_id} name="encuesta_id"></input>
                <button type="submit">Editar</button>
            </form>
        </div>
    );
}
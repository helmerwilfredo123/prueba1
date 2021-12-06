import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import constantes from '../../../constantes';
export const EditarPregunta = _ =>{
    const [preguntas, setPregunta] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        axios.get(constantes.url_servidor+'/preguntas/'+id).then((response)=>{
            setPregunta(response.data);
        });
    }, [id]);

    const editar = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            pregunta: form.pregunta.value,
            seccion_id: form.seccion_id.value,
            tipoPregunta: form.tipoPregunta.value,
        };

        axios.put(constantes.url_servidor+'/preguntas/'+id, data).then((response)=>{
            window.location.replace(constantes.url_servidor2+'/preguntas');
        });
    }

    return (
        <div>
            <li><Link className="btn btn-secondary"  to="/preguntas">Volver</Link></li>
            <ul>
                <table>
                    <tbody>
                        <tr key={preguntas.id}>
                            <td>|</td><td>{preguntas.id}{')'}</td>
                            <td>|</td><td>{preguntas.pregunta}</td>
                            <td>|</td><td>{preguntas.seccion_id}</td>
                            <td>|</td><td>{preguntas.tipoPregunta}</td><td>|</td>
                        </tr>
                    </tbody>
                </table>
            </ul>
            <form onSubmit={editar}>
                <input type="text" placeholder={preguntas.pregunta} name="pregunta"></input>
                <input type="number" placeholder={preguntas.seccion_id} name="seccion_id"></input>
                <input type="text" placeholder={preguntas.tipoPregunta} name="tipoPregunta"></input>
                <button type="submit">Editar</button>
            </form>
        </div>
    );
}
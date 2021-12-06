import React from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';
import constantes from '../../../constantes';
export const crearPregunta = _ => {
    const crear = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            pregunta: form.pregunta.value,
            seccion_id: form.seccion_id.value,
            tipoPregunta: form.tipoPregunta.value,
          
        };

        axios.post(constantes.url_servidor+'/preguntas', data).then((response)=>{
            window.history.back();
        });
    }

    return (
        <div>
            <li><Link className="btn btn-secondary" to="/preguntas">Volver</Link></li>
            <form onSubmit={crear}>
                <input className="btn btn-outline-dark" type="text" placeholder="Pregunta" name="pregunta"></input>
                <input className="btn btn-outline-dark" type="number" placeholder="ID Seccion" name="seccion_id"></input>
     
                <select  name="tipoPregunta" className="btn btn-outline-dark">
                <option selected>TipoDePregunta</option>
                    <option>abierta</option>
                    <option>cerrada</option>
                </select>
               
                <button className="btn btn-success" type="submit">Guardar</button>
            </form>
           
        </div>
    )
}
import React from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';
import constantes from '../../../constantes';
export const crearEncuesta = _ => {
    const crear = (event) =>{
        event.preventDefault();
        const form = event.target;
        const data = {
            nombre: form.nombre.value,
            usuario_id: form.usuario_id.value,
            descripcion: form.descripcion.value,
        };

        axios.post(constantes.url_servidor+'/encuestas', data).then((response)=>{
            window.history.back();
        });
    }

    return (
        <div>
            <li><Link className="btn btn-secondary" to="/usuarios">Volver</Link></li>
            <form onSubmit={crear}>
                <input type="text" placeholder="Nombre" name="nombre"></input>
                <input type="number" placeholder="ID Usuario" name="usuario_id"></input>
                <input type="text" placeholder="Descripcion" name="descripcion"></input>
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}
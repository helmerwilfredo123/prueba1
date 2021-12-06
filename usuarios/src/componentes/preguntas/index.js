import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';
import constantes from '../../constantes';
export const ListarPreguntas = _ => {
    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
        axios.get(constantes.url_servidor+'/preguntas').then((response)=>{
            setPreguntas(response.data);
        });
    }, [setPreguntas]);

    function idPregunta(pregunta){
        return (
            window.location.replace(constantes.url_servidor2+"/preguntas/editar/"+ pregunta.id)
        );
    }

    function borrar(pregunta){
        var opcion=window.confirm("El elemento seleccionado se eliminará. ¿Desea continuar?");
        if (opcion){
            axios.delete(constantes.url_servidor+'/preguntas/'+pregunta).then(response =>{
                window.location.reload()
            })
        }
    }

    return (
        <div>
            <li>Preguntas → |<Link className="btn btn-success" to="/preguntas/crear"> Crear |</Link></li>
            <ul>
                <table>
                    <thead>
                        <tr>
                            <th>|</th><th>ID</th><th>|</th><th>Pregunta</th>
                            <th>|</th><th>ID Seccion</th><th>|</th><th>Tipo Pregunta</th><th>|</th>
                        </tr>
                    </thead>
                    <tbody>
                        {preguntas.map((pregunta, key) => (
                            <tr key={pregunta.id}>
                                <td>|</td>
                                <td>{pregunta.id}{')'}</td>
                                <td>|</td>
                                <td>{pregunta.pregunta}</td>
                                <td>|</td>
                                <td>{pregunta.seccion_id}</td>
                                <td>|</td>
                                <td>{pregunta.tipoPregunta}</td>
                                <td>|</td>
                             
                                <td><button className="btn btn-outline-dark" onClick={()=>idPregunta(pregunta)}>Editar</button></td>
                                <td><button className="btn btn-outline-dark" onClick={()=>borrar(pregunta.id)}>Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ul>
        </div>
    );
}

import axios from "axios"
import constantes from '../constantes';
function Login(){
    const login = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = {
            email: form.email.value,
            contrasena: form.contrasena.value,
        };
        axios.post(constantes.url_servidor+'/login',data)
            .then((response)=>{
             localStorage.setItem('token',response.data.token)
              //console.log(response)
             //window.history.back();
        });
        }           

return(
<form onSubmit={login}>
   <div className="row">
       <div className="col-15">
    <input type="email" placeholder="Email" name="email"></input>
    <input type="password" placeholder="Contraseña" name="contrasena"></input>
    <button type="submit">Guardar</button>
    </div>
    </div>
</form>

);
} 
export default Login;

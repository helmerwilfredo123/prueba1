from MySQLdb.cursors import Cursor
from flask import Flask, flash,session,jsonify,request,render_template, redirect, url_for
from flask_mysqldb import MySQL
from flask_cors import CORS
import bcrypt,pymysql
import mysql.connector
from flask_jwt_extended import create_access_token,JWTManager,jwt_required,get_jwt_identity

app = Flask (__name__)  
CORS(app)
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="",
  database="usuarios"
)
app.config["JWT_SECRET_KEY"] = "8Ga@jJh6YL@f%nS$U^Ga0@o^g!fgcRJe"
jwt=JWTManager(app)
@app.post('/login')
def login():
    email = request.json.get("email", None)
    contrasena = request.json.get("contrasena", None)
    cursor = mydb.cursor(dictionary=True)
    cursor.execute("select * from usuario where email=%s and contrasena=%s",(email,contrasena,))
    usuario = cursor.fetchone()
    cursor.close()
    print (usuario)

    if not usuario:
        return jsonify({
            "message": "Datos de acceso invalidos"
        })
    token = create_access_token(identity=usuario["id"])
    return jsonify({
        "token": token
    })

@app.route('/')
def index():
    return "Hola mundof"

######### USUARIOS #########

@app.post('/usuarios')
def crearUsuario():
    #request = lo q me envia el cliente
    #response = lo q le voy a responder
    datos = request.json
    cursor = mydb.cursor()
    cursor.execute('''INSERT INTO usuario(nombres, email, contrasena)
        VALUE(%s, %s, %s)''', (
        datos['nombres'],
        datos['email'],
        datos['contrasena'],
    ))
    mydb.commit()

    return jsonify({
        "mensaje": "Usuario almacenado correctamente"
    })
#----------------------------------------

@app.get('/usuarios')
@jwt_required()
def listarUsuarios():
    usuario=get_jwt_identity()
    cursor = mydb.cursor(dictionary=True)

    cursor.execute('SELECT * FROM usuario')

    usuarios = cursor.fetchall()
    #print(usuario)
    return jsonify(usuarios)

@app.get('/usuarios/<id>')
def obtenerUnUsuario(id):
    cursor = mydb.cursor(dictionary=True)

    cursor.execute('SELECT * FROM usuario WHERE id=%s', (id,))

    usuario = cursor.fetchone()

    return jsonify(usuario)

@app.put('/usuarios/<id>') #alt + 60 < | alt + 62 >
def actualizarUsuario(id):
    datos = request.json

    cursor = mydb.cursor()

    cursor.execute('UPDATE usuario SET nombres=%s, email=%s, contrasena=%s WHERE id=%s',(
        datos['nombres'],
        datos['email'],
        datos['contrasena'],
        id
    ))

    mydb.commit()

    return jsonify({
        "mensaje": "Usuario actualizado correctamente"
    })

@app.delete('/usuarios/<id>')
def eliminarUsuario(id):

    cursor = mydb.cursor()

    cursor.execute('DELETE FROM usuario WHERE id=%s', (id,)) #en las tuplas hay q colocar una coma al final del ultimo elemento

    mydb.commit()

    return jsonify({
        "mensaje":"Usuario eliminado correctamente"
    })

######### ENCUESTAS #########

@app.post('/encuestas')

def crearEncuesta():
    #request = lo q me envia el cliente
    #response = lo q le voy a responder
    datos = request.json
    
    cursor = mydb.cursor()

    cursor.execute('''INSERT INTO encuesta(nombre, usuario_id, descripcion)
        VALUE(%s, %s, %s)''', (
        datos['nombre'],
        datos['usuario_id'],
        datos['descripcion'],
    ))

    mydb.commit()

    return jsonify({
        "mensaje": "Encuesta almacenada correctamente"
    })

@app.get('/encuestas')

def listarEncuestas():
   
    cursor = mydb.cursor(dictionary=True)

    cursor.execute('SELECT * FROM encuesta')

    encuestas = cursor.fetchall()
   
    return jsonify(encuestas)

@app.get('/encuestas/<id>')
def obtenerUnaEncuesta(id):
    cursor = mydb.cursor(dictionary=True)

    cursor.execute('SELECT * FROM encuesta WHERE id=%s', (id,))

    encuesta = cursor.fetchone()

    return jsonify(encuesta)

@app.put('/encuestas/<id>') #alt + 60 < | alt + 62 >
def actualizarEncuesta(id):
    datos = request.json

    cursor = mydb.cursor()

    cursor.execute('UPDATE encuesta SET nombre=%s, usuario_id=%s, descripcion=%s WHERE id=%s',(
        datos['nombre'],
        datos['usuario_id'],
        datos['descripcion'],
        id
    ))

    mydb.commit()

    return jsonify({
        "mensaje": "Encuesta actualizada correctamente"
    })

@app.delete('/encuestas/<id>')
def eliminarEncuesta(id):

    cursor = mydb.cursor()

    cursor.execute('DELETE FROM encuesta WHERE id=%s', (id,)) #en las tuplas hay q colocar una coma al final del ultimo elemento

    mydb.commit()

    return jsonify({
        "mensaje":"Encuesta eliminada correctamente"
    })

######### SECCIONES #########

@app.post('/secciones')
def crearSeccion():
    #request = lo q me envia el cliente
    #response = lo q le voy a responder
    datos = request.json
    
    cursor = mydb.cursor()

    cursor.execute('''INSERT INTO seccion(nombre, encuesta_id)
        VALUE(%s, %s)''', (
        datos['nombre'],
        datos['encuesta_id']
    ))

    mydb.commit()

    return jsonify({
        "mensaje": "Seccion almacenada correctamente"
    })

@app.get('/secciones')
def listarSecciones():
    cursor = mydb.cursor(dictionary=True)

    cursor.execute('SELECT * FROM seccion')

    seccion = cursor.fetchall()

    return jsonify(seccion)

@app.get('/secciones/<id>')
def obtenerUnaSeccion(id):
    cursor = mydb.cursor(dictionary=True)

    cursor.execute('SELECT * FROM seccion WHERE id=%s', (id,))

    seccion = cursor.fetchone()

    return jsonify(seccion)

@app.put('/secciones/<id>') #alt + 60 < | alt + 62 >
def actualizarSeccion(id):
    datos = request.json

    cursor = mydb.cursor()

    cursor.execute('UPDATE seccion SET nombre=%s, encuesta_id=%s WHERE id=%s',(
        datos['nombre'],
        datos['encuesta_id'],
        id
    ))

    mydb.commit()

    return jsonify({
        "mensaje": "Seccion actualizada correctamente"
    })

@app.delete('/secciones/<id>')
def eliminarSeccion(id):

    cursor = mydb.cursor()

    cursor.execute('DELETE FROM seccion WHERE id=%s', (id,)) #en las tuplas hay q colocar una coma al final del ultimo elemento

    mydb.commit()

    return jsonify({
        "mensaje":"Seccion eliminada correctamente"
    })

######### PREGUNTAS #########

@app.post('/preguntas')
def crearPregunta():
    #request = lo q me envia el cliente
    #response = lo q le voy a responder
    datos = request.json
    
    cursor = mydb.cursor()

    cursor.execute('''INSERT INTO pregunta(pregunta, seccion_id, tipoPregunta)
        VALUE(%s, %s, %s)''', (
        datos['pregunta'],
        datos['seccion_id'],
        datos['tipoPregunta'],
    ))

    mydb.commit()

    return jsonify({
        "mensaje": "Pregunta almacenada correctamente"
    })

@app.get('/preguntas')
def listarPreguntas():
    cursor = mydb.cursor(dictionary=True)

    cursor.execute('SELECT * FROM pregunta')

    pregunta = cursor.fetchall()

    return jsonify(pregunta)

@app.get('/preguntas/<id>')
def obtenerUnaPregunta(id):
    cursor = mydb.cursor(dictionary=True)

    cursor.execute('SELECT * FROM pregunta WHERE id=%s', (id,))

    pregunta = cursor.fetchone()

    return jsonify(pregunta)

@app.put('/preguntas/<id>') #alt + 60 < | alt + 62 >
def actualizarPregunta(id):
    datos = request.json

    cursor = mydb.cursor()

    cursor.execute('UPDATE pregunta SET pregunta=%s, seccion_id=%s, tipoPregunta=%s WHERE id=%s',(
        datos['pregunta'],
        datos['seccion_id'],
        datos['tipoPregunta'],
        id
    ))

    mydb.commit()

    return jsonify({
        "mensaje": "Pregunta actualizada correctamente"
    })

@app.delete('/preguntas/<id>')
def eliminarPregunta(id):

    cursor = mydb.cursor()

    cursor.execute('DELETE FROM pregunta WHERE id=%s', (id,)) #en las tuplas hay q colocar una coma al final del ultimo elemento

    mydb.commit()

    return jsonify({
        "mensaje":"Pregunta eliminada correctamente"
    })


app.run(debug=True) 

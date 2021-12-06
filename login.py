import pymysql

connection = pymysql.connect(

    host = "localhost",
    user = "root",
    password= "",
    db = "encuesta"
)

cursor = connection.cursor()



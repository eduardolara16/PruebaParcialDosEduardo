//Importaciones
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'

//variables de entorno
dotenv.config()


//Configuracion de la app 
const app =express()

//leer datos via body
app.use(express.json())


//conectar a la base de datos
db()

//Definicion de la ruta
app.use('/api/services', servicesRoutes)

//Definicion del puerto
const PORT = process.env.PORT || 4001

//Ejecutar el app
app.listen(PORT, () =>{
    console.log(colors.blue('El servidor se esta ejecutando en el puerto', PORT))
})




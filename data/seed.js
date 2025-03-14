import dotenv from 'dotenv'
import { db } from '../config/db.js'
import Services from '../models/Services.js'
import { services } from './studentServices.js'

dotenv.config()

await db()

async function seedDB(){
    try {
        await Services.insertMany(services)
        console.log('Se agregaron los datos de forma correcta!');
        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

async function clearDB(){
    try {
        await Services.deleteMany()
        console.log('Se eliminaron los datos correctamente');
        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

//if(process.argv[2] == '--import'){
  //  seedDB()
//} else if(process.argv[2] == '--destroy'){
  //  clearDB()
//} else {
  //  console.log('Uso incorrecto. Usa --import para sembrar o --destroy para limpiar la base de datos.');
    //process.exit(1)
//}


// metodo que uso el ing
if(process.argv[2] === '--import'){
    seedDB()
}else{
    clearDB()
}
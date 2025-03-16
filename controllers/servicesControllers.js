import { services } from '../data/polizasServices.js'
import Services from '../models/Services.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

//crear servicio
const createService = async (req, res) => {
    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }
    try {
        const service = new Services(req.body)
        await service.save()

        res.json({
            msg: 'El Servicio se creo correctamente'
        })
    } catch (error) {
        console.log(error);
    }
}


//const getServices = (req, res) =>{
  //  res.json(services)
//}

///////////////////////////////////////
const getServices = async (req, res) =>{
    try {
        const services = await Services.find()
        res.json(services)
    } catch (error) {
        console.log(error)   
    }
}

const getServicesById = async (req, res) => {
    const { id } = req.params

    //validar objecto id (llamada de funcion desde utils)
    if (validateObjectId(id, res)) return

    
    //validar que exista desde utils
    const service = await Services.findById(id)
    if(!service){
        return handleNotFoundError('El servicio no existe!', res)
    }
    //mostrar el servicio
    res.json(service)
}

//actualizar servicio 
const updateService = async (req, res) => {
    const { id } = req.params 

    //validar object id
    if(validateObjectId(id, res)) return

    //validacion de la existencia (desde index utils)
    const service = await Services.findById(id)
    if(!service){
        return handleNotFoundError('El servicio no existe!', res)
    }

    //nuevos valores al escribir
    service.numeroPoliza = req.body.numeroPoliza || service.numeroPoliza
    service.tipoSeguro = req.body.tipoSeguro || service.tipoSeguro
    service.titular = req.body.titular || service.titular
    service.monto = req.body.monto || service.monto

    try {
        await service.save()
        res.json({
            msg: 'Servicio correctamente actualizado!'
        })
    } catch (error) {
        console.log (error)
    }
}


//eliminar servicios 
const deleteService = async (req, res) =>{
    const { id } = req.params 

    //validar object id
    if(validateObjectId(id, res)) return

    //validacion de la existencia (desde index utils)
    const service = await Services.findById(id)
    if(!service){
        return handleNotFoundError('El servicio no existe!', res)
    }

    try {
      await service.deleteOne()  
      res.json({
        msg: 'Servicio elimiando de forma correcta!'
      })
    } catch (error) {
        console.log(error)
    }
}

export{
    createService,
    getServices,
    getServicesById,
    updateService,
    deleteService
}



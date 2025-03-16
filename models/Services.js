import mongoose from 'mongoose'

const servicesSchema = mongoose.Schema({
    numeroPoliza: {
        type: String,
        required: true,
        trim: true,
        unique: true // Asegura que cada número de póliza sea único
    },
    tipoSeguro: {
        type: String,
        required: true,
        trim: true,
        enum: ['Auto', 'Vida', 'Hogar', 'Salud'] // Restringe los valores permitidos
    },
    titular: {
        type: String,
        required: true,
        trim: true
    },
    monto: {
        type: Number,
        required: true,
        trim: true // Aunque `trim` no afecta a números, lo dejo por consistencia con tu estructura original
    }
})

const Services = mongoose.model('Services', servicesSchema)
export default Services


import { v4 as uuidv4 } from 'uuid';

export const generarId = ()=>{
    return uuidv4();    
}

export const formatDate = fecha => {
    const date = new Date(fecha);

    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return date.toLocaleDateString('es-ES', opciones);
}


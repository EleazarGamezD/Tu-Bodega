import { v4 as uuid} from 'uuid';


export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function ) =>{

    //delcaramos la variable de la extension del archivo luego le hacemos division "split y lo indexamos 
    const fileExtension = file.mimetype.split('/')[1]

    //integramos con uuid para que este genere un nombre alaeatorio cada vez que se sube una imagen 
    const fileName = `${uuid()}.${fileExtension}`

    callback(null, 'new name')

}
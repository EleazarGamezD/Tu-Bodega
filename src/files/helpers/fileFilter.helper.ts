

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function ) =>{

    if(!file) return callback (new Error('file is empty'), false )

    //declaramos la variable para extension del archivo y le hacemos un split "division" de segundo valor [1]
    const fileExtension = file.mimetype.split('/')[1]
    
    // indicamos cuales son las extesiones validas y las declaramos en la variable vaildExtension
    const validExtension = ['jpg','png','jpeg','gif']
    
    // luego validamos que la extension este incluida en los tipos de extensiones validas 
    if ( validExtension.includes(fileExtension)){
        return callback (null,true)
    }

    callback(null, false)

}
//TRABAJANDO AUN EN PROGRESO
//Logica implementada para realizar peticiones a la base de datos:
const {storage} = require('@google-cloud/storage');
const db = require('../configs/db.config.js');
const bucketName = 'desafio360';

//Funcion para cargar image
const uploadImageToStorage = async (file) => {
    const blob = storage.Bucket(bucketName).file(file.originalname);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
        blobStream.on('errr',(err) => reject(err));
        blobStream.on('finish', ()=> {
            //la url publica del archivo cargado
            const fileUrl = `https://storage.googleapis.com/${bucketName}/${file.originalname}`
            resolve(fileUrl);
        });
        blobStream.end(file.buffer);
    });
};

// Endpoint para crear un producto con imagen
exports.createProduct = async (req, res) => {
    try {
        const { nombre, marca, codigo, stock, estados_idestados, precio } = req.body;
        const file = req.file;  // Suponiendo que la imagen se envía como un archivo (con `multipart/form-data`)

        // Subir la imagen y obtener la URL
        const imageUrl = await uploadImageToStorage(file);

        // Llamar al procedimiento almacenado para insertar el producto
        const sql = `EXEC InsertarProducto 
                        @CategoriaProductos_idCategoriaProductos = :CategoriaProductos_idCategoriaProductos,
                        @usuarios_idusuarios = :usuarios_idusuarios,
                        @nombre = :nombre,
                        @marca = :marca,
                        @codigo = :codigo,
                        @stock = :stock,
                        @estados_idestados = :estados_idestados,
                        @precio = :precio,
                        @foto = :foto`;

        await db.sequelize.query(sql, {
            replacements: {
                CategoriaProductos_idCategoriaProductos: 1,  // Suponiendo que siempre será 1 para Condimentos
                usuarios_idusuarios: 1,  // Asigna el ID del usuario adecuado
                nombre,
                marca,
                codigo,
                stock,
                estados_idestados,
                precio,
                foto: imageUrl  // La URL de la imagen subida
            },
            type: db.Sequelize.QueryTypes.EXEC
        });

        res.status(201).json({ message: 'Producto creado con éxito.' });
    } catch (error) {
        console.error('Error al crear producto: ', error);
        res.status(500).json({ message: 'Error al crear el producto.' });
    }
};





export const errorHandler = (err, req, res, next) => {
   
    console.error(`[Error] ${err.name || 'Error'}: ${err.message}`);
    if (err.stack) {
        console.error(err.stack);
    }

    
    const statusCode = err.statusCode || err.status || 500;

    // Respuesta unificada al cliente
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Error interno del servidor',
      
        ...(err.errors && { errors: err.errors })
    });
};
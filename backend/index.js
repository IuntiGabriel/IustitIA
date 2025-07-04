const express = require('express');
const multer = require('multer');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Configurar multer para cargar archivos
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para recibir los datos del formulario
app.post('/cases', upload.array('documents'), async (req, res) => {
  try {
    const formData = req.body;
    // La variable 'files' la dejamos por si la necesitamos en el futuro, pero no la enviamos a n8n
    const files = req.files;

    console.log('Enviando a n8n:', formData); // Agregamos un log para depurar

    // Enviar SÓLO los datos de texto a n8n webhook
    const response = await axios.post(process.env.N8N_WEBHOOK_URL, formData);

    res.status(200).json({ success: true, message: 'Caso enviado a procesamiento' });
  } catch (error) {
    // Este log ahora nos dará más detalles si axios vuelve a fallar
    if (error.response) {
      console.error('Error desde n8n o servidor destino:', error.response.data);
    } else {
      console.error('Error al procesar el caso:', error.message);
    }
    res.status(500).json({ success: false, message: 'Error en el backend' });
  }
});

/*app.post('/cases', upload.array('documents'), async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    // Enviar datos a n8n webhook
    // LÍNEA CORREGIDA
    const response = await axios.post(process.env.N8N_WEBHOOK_URL, formData);

    /*const response = await axios.post(process.env.N8N_WEBHOOK_URL, {
      formData,
      files,
    });

    res.status(200).json({ success: true, message: 'Caso enviado a procesamiento' });
  } catch (error) {
    console.error('Error al procesar el caso:', error.message);
    res.status(500).json({ success: false, message: 'Error en el backend' });
  }
});*/

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

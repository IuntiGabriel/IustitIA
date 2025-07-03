
# Flujo N8N - Generación de Borrador Jurídico con IA (Gemini y OpenAI)

## 🔁 Descripción
Este flujo recibe datos desde un backend vía Webhook, arma un prompt legal y llama a Gemini Pro (Google) o GPT-4 (OpenAI) para generar un documento preliminar de demanda o sucesión. Luego genera un PDF y lo envía por email y WhatsApp al abogado correspondiente.

---

## 📥 Importar el flujo en N8N

1. Abrí tu instancia de n8n.
2. Hacé clic en "Import" en la esquina superior derecha.
3. Seleccioná el archivo `flujo-sucesion-gemini-openai.json`.

---

## ⚙️ Configuración de APIs

### 🔹 Gemini Pro
1. Obtené tu API Key en https://makersuite.google.com/app/apikey
2. Usá el endpoint:  
   `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=TU_API_KEY`

### 🔹 OpenAI GPT-4
1. Obtené tu API Key desde https://platform.openai.com/account/api-keys
2. Endpoint sugerido:  
   `https://api.openai.com/v1/chat/completions`
3. Modelo: `"gpt-4"`

---

## ✉️ Configuración de Email

Podés usar el nodo “Send Email” con:

- **SMTP** (ej: Gmail, Outlook)
- **SendGrid API** (recomendado para producción)

---

## 📲 Configuración de WhatsApp

Integración con:

- **Twilio WhatsApp API**
- **WhatsApp Cloud API**
- **UltraMsg / Chat-API** (alternativas no oficiales)

Necesitarás la URL y token correspondiente.

---

## 🔌 Conectar Backend al Webhook

En tu backend Express, hacé un `POST` al Webhook de n8n:

```js
await axios.post('https://tu-n8n.com/webhook/flujo-sucesion', {
  formData: {
    nombre: "Juan Pérez",
    fecha_fallecimiento: "2022-10-10",
    herederos: ["Carlos Pérez", "Laura Pérez"],
    domicilio: "Av. Siempre Viva 123"
  }
});
```

---

¡Listo para probar tu MVP legal automatizado! 🚀

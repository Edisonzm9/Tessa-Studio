
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { FormData } from '../types';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        analysis_summary: {
            type: Type.STRING,
            description: "A brief summary in Spanish of the client's needs based on their form submission."
        },
        recommendation_type: {
            type: Type.STRING,
            enum: ["EXISTING_SOFTWARE", "CUSTOM_SOLUTION"],
            description: "The type of recommendation, either existing software or a custom solution."
        },
        recommendations: {
            type: Type.ARRAY,
            description: "A list of 1 to 3 recommended existing software products. This should be empty if a custom solution is recommended.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The name of the software." },
                    description: { type: Type.STRING, description: "A brief explanation in Spanish of why this software is a good fit for the client." },
                    estimated_cost: { type: Type.STRING, description: "The estimated monthly or annual cost, e.g., '$50/mes', '$2000/año'." }
                },
                required: ["name", "description", "estimated_cost"]
            }
        },
        custom_solution_rationale: {
            type: Type.STRING,
            description: "A detailed rationale in Spanish for why a custom solution from Tessa Studio is the best option. This should be empty if existing software is recommended."
        }
    },
    required: ["analysis_summary", "recommendation_type", "recommendations", "custom_solution_rationale"]
};


const buildPrompt = (formData: FormData) => {
    return `
    Eres un consultor experto en tecnología de Tessa Studio, un centro de innovación tecnológica de élite.
    Tu tarea es analizar el perfil de la siguiente empresa y generar un informe de recomendación de software. Sé objetivo, conciso y profesional.

    **Perfil de la Empresa:**
    - Nombre de la Empresa: ${formData.companyName}
    - Sector: ${formData.industry}
    - Número de Empleados: ${formData.employees}
    - Presupuesto Tecnológico Estimado: ${formData.budget}
    - Madurez Tecnológica: ${formData.techMaturity}
    - Desafíos Actuales: ${formData.challenges}
    - Funcionalidades Requeridas: ${formData.features.join(', ')}

    **Instrucciones:**
    1.  **Analiza las Necesidades:** Basado en el perfil, determina la complejidad y especificidad de los requerimientos.
    2.  **Toma de Decisión:**
        -   Si las necesidades del cliente pueden ser satisfechas de manera efectiva por software existente en el mercado, establece 'recommendation_type' como 'EXISTING_SOFTWARE'. Propón de 1 a 3 de las opciones más relevantes.
        -   Si las necesidades son muy específicas, complejas, requieren integraciones únicas o superan las capacidades del software estándar, establece 'recommendation_type' como 'CUSTOM_SOLUTION'.
    3.  **Genera el Informe:** Completa todos los campos del schema JSON. No incluyas texto, explicaciones o markdown fuera del objeto JSON. El idioma de todo el texto de salida debe ser español.

    **Base de Conocimiento de Software (Ejemplos de referencia, no es una lista exhaustiva):**
    -   **Hotelería:** Cloudbeds, Mews, Opera PMS
    -   **Restaurantes:** Toast, Square for Restaurants, Lightspeed, Restroworks
    -   **Manufactura:** Katana MRP, SAP S/4HANA, Oracle NetSuite
    -   **eCommerce:** Shopify, WooCommerce, Magento, BigCommerce
    -   **CRM:** Salesforce, HubSpot CRM, Zoho CRM, Pipedrive
    -   **ERP:** Odoo, ERPNext, SAP Business One, NetSuite
    -   **RRHH:** BambooHR, Workday, Factorial HR
    -   **Atención al Cliente:** Zendesk, Freshdesk, Intercom
    -   **Gestión de Proyectos:** Asana, Jira, Trello, Monday.com
    -   **BI & Análisis de Datos:** Tableau, Power BI, Looker

    Ahora, genera el informe JSON basado en el perfil proporcionado.
    `;
};

export const getSolutionsReport = async (formData: FormData) => {
    try {
        const prompt = buildPrompt(formData);

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error getting solutions report from Gemini:", error);
        throw new Error("No se pudo generar el informe. Por favor, intente de nuevo más tarde.");
    }
};

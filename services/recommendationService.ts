
import type { FormData, SolutionsReportData, SoftwareRecommendation } from '../types';

// Base de datos de software simple basada en funcionalidades
const softwareDatabase: { [key: string]: SoftwareRecommendation[] } = {
  'CRM (Gestión de Clientes)': [
    { name: 'HubSpot CRM', description: 'Excelente para Pymes, con un plan gratuito robusto y enfocado en marketing y ventas.', estimated_cost: '$0 - $800/mes' },
    { name: 'Salesforce', description: 'La plataforma líder para grandes empresas, altamente personalizable y escalable.', estimated_cost: '$25 - $300/usuario/mes' },
  ],
  'ERP (Planificación de Recursos)': [
    { name: 'Odoo', description: 'Solución de código abierto y modular que se adapta a múltiples necesidades empresariales.', estimated_cost: '$20 - $50/usuario/mes' },
    { name: 'NetSuite', description: 'ERP en la nube completo para empresas en crecimiento, abarcando finanzas, inventario y más.', estimated_cost: 'Variable' },
  ],
  'Contabilidad y Finanzas': [
    { name: 'QuickBooks', description: 'Ideal para pequeñas y medianas empresas, muy popular y fácil de usar.', estimated_cost: '$15 - $180/mes' },
    { name: 'Xero', description: 'Alternativa moderna a QuickBooks con fuertes capacidades de integración.', estimated_cost: '$12 - $65/mes' },
  ],
  'Gestión de Proyectos': [
      { name: 'Asana', description: 'Herramienta visual para gestión de proyectos y tareas, ideal para equipos colaborativos.', estimated_cost: '$0 - $25/usuario/mes' },
      { name: 'Jira', description: 'Estándar en la industria del software para seguimiento de proyectos ágiles.', estimated_cost: '$0 - $15/usuario/mes' },
  ],
  'Punto de Venta (POS)': [
    { name: 'Square POS', description: 'Sistema de punto de venta versátil para minoristas y restaurantes.', estimated_cost: '$0 - $60/mes' }
  ],
  'Gestión de Inventario': [
      { name: 'Zoho Inventory', description: 'Gestión de inventario multicanal para empresas en crecimiento.', estimated_cost: '$0 - $249/mes'}
  ],
  'Recursos Humanos (RRHH)': [
      { name: 'BambooHR', description: 'Software de RRHH completo para la gestión del ciclo de vida del empleado.', estimated_cost: 'Por cotización'}
  ],
  'Soporte al Cliente': [
      { name: 'Zendesk', description: 'Plataforma de servicio al cliente omnicanal para mejorar la relación con los clientes.', estimated_cost: '$19 - $99/agente/mes'}
  ],
  'default': [
      { name: 'Odoo', description: 'Plataforma modular que cubre CRM, ERP, contabilidad y más, ideal como punto de partida.', estimated_cost: 'Variable' },
      { name: 'Zoho One', description: 'Suite de más de 40 aplicaciones empresariales a un costo accesible.', estimated_cost: '$37/usuario/mes' }
  ]
};

const getSoftwareRecommendations = (features: string[]): SoftwareRecommendation[] => {
    const recommendations = new Set<SoftwareRecommendation>();
    
    if (features.length === 0) {
        softwareDatabase['default'].forEach(rec => recommendations.add(rec));
        return Array.from(recommendations);
    }
    
    for (const feature of features) {
        if (softwareDatabase[feature]) {
            recommendations.add(softwareDatabase[feature][0]); // Agregar la primera recomendación para la característica
        }
    }
    
    if(recommendations.size === 0) {
       recommendations.add(softwareDatabase['default'][0]);
    }

    // Limitar a un máximo de 3 recomendaciones
    return Array.from(recommendations).slice(0, 3);
}

export const getAutonomousReport = (formData: FormData): Promise<SolutionsReportData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Lógica basada en reglas para determinar la recomendación
      const needsCustomSolution = 
        (formData.challenges.length > 150) || 
        (formData.features.length > 4) ||
        (formData.industry.toLowerCase() === 'otro' && formData.challenges.length > 50) ||
        (formData.techMaturity === 'Experto' && formData.features.length > 2) ||
        (formData.budget === '$5000+');

      let report: SolutionsReportData;

      if (needsCustomSolution) {
        report = {
          analysis_summary: `Basado en la complejidad de tus desafíos, la especificidad de las funcionalidades requeridas (${formData.features.join(', ')}) y tu perfil empresarial, hemos determinado que una solución estándar podría no ser suficiente para alcanzar tus objetivos.`,
          recommendation_type: 'CUSTOM_SOLUTION',
          recommendations: [],
          custom_solution_rationale: `Tus necesidades son únicas. Requieren un sistema que se integre perfectamente con tus operaciones existentes, escale con tu crecimiento y te proporcione una ventaja competitiva. Un software genérico presentaría limitaciones, mientras que una solución a medida de Tessa Studio se construiría precisamente para tus flujos de trabajo y metas estratégicas.`
        };
      } else {
        const recommendedSoftware = getSoftwareRecommendations(formData.features);
        report = {
          analysis_summary: `Hemos analizado tu perfil y tus necesidades de ${formData.features.join(', ') || 'generales'}. Concluimos que existen soluciones de software en el mercado que pueden cubrir eficazmente tus requerimientos actuales y facilitar tu crecimiento.`,
          recommendation_type: 'EXISTING_SOFTWARE',
          recommendations: recommendedSoftware,
          custom_solution_rationale: ""
        };
      }

      resolve(report);
    }, 2000); // Simular un retraso de red para mejorar la experiencia de usuario
  });
};

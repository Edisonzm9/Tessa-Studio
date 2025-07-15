
export const NAV_LINKS = [
  { name: 'Servicios', href: '#services' },
  { name: 'Filosofía', href: '#philosophy' },
  { name: 'Asistente', href: '#assistant' },
  { name: 'Testimonios', href: '#testimonials' },
];

export const SERVICES_DATA = [
  {
    title: 'Consultoría Estratégica',
    description: "Nuestra consultoría es nuestro servicio más valioso, centrado 100% en tu éxito. Entendemos los retos económicos y técnicos de la implantación de software, por lo que te acompañamos en cada paso. Realizamos un análisis exhaustivo con nuestro software de diagnóstico para recomendar soluciones existentes que se adapten a ti, o bien, desarrollamos tecnología a medida para cualquier necesidad, garantizando una implementación, mantenimiento y resultados impecables.",
    icon: 'consulting',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'Desarrollo a Medida',
    description: 'Soluciones de software únicas, diseñadas para escalar y cumplir tus objetivos específicos. Creamos desde aplicaciones web complejas hasta sistemas empresariales robustos, utilizando las tecnologías más modernas para garantizar un rendimiento y seguridad excepcionales.',
    icon: 'code',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'Integraciones con IA',
    description: 'Potenciamos tus aplicaciones con inteligencia artificial para optimizar decisiones y experiencias. Implementamos modelos de machine learning, procesamiento de lenguaje natural y visión por computadora para dar a tu negocio una ventaja competitiva inteligente.',
    icon: 'ai',
    image: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'Automatización de Procesos',
    description: 'Optimizamos tus flujos de trabajo, reduciendo costos operativos y aumentando la eficiencia. Analizamos tus procesos manuales y repetitivos para reemplazarlos con soluciones de software automatizadas que liberan a tu equipo para tareas de mayor valor.',
    icon: 'automation',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'Aplicaciones Móviles',
    description: 'Creamos experiencias móviles nativas y fluidas para iOS y Android que conectan con tus usuarios. Nuestro enfoque se centra en un diseño intuitivo, un rendimiento impecable y una integración perfecta con tus sistemas existentes.',
    icon: 'mobile',
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'Análisis de Datos & BI',
    description: 'Transformamos datos brutos en insights estratégicos para una toma de decisiones informada. Desarrollamos dashboards interactivos y sistemas de business intelligence que te permiten visualizar tus KPIs y entender mejor tu negocio.',
    icon: 'data',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

export const TESTIMONIALS_DATA = [
    {
        quote: "Tessa Studio transformó nuestra operación. Su enfoque en IA nos dio una ventaja competitiva que no creíamos posible.",
        name: "Ana García",
        company: "CEO, Innovate Corp"
    },
    {
        quote: "El desarrollo a medida fue impecable. Entendieron nuestras necesidades a la perfección y entregaron un producto excepcional.",
        name: "Carlos Rodriguez",
        company: "Director de TI, LogiTech"
    },
    {
        quote: "La automatización de nuestros procesos nos ahorró cientos de horas. El equipo de Tessa es profesional y altamente capacitado.",
        name: "Sofia Martinez",
        company: "Gerente de Operaciones, MarketFast"
    }
];

export const FORM_OPTIONS = {
  industry: ['Hotelería', 'Restauración', 'Manufactura', 'eCommerce', 'Servicios Financieros', 'Salud', 'Educación', 'Logística', 'Consultoría', 'Otro'],
  employees: ['1-10', '11-50', '51-200', '201-500', '500+'],
  budget: ['$0 - $500', '$501 - $2000', '$2001 - $5000', '$5000+'],
  techMaturity: ['Principiante', 'Intermedio', 'Avanzado', 'Experto'],
  features: [
      'CRM (Gestión de Clientes)', 'ERP (Planificación de Recursos)', 'Contabilidad y Finanzas', 'Gestión de Proyectos', 
      'Punto de Venta (POS)', 'Gestión de Inventario', 'Automatización de Marketing', 'Recursos Humanos (RRHH)', 
      'Soporte al Cliente', 'Seguridad TI', 'Business Intelligence'
    ]
};

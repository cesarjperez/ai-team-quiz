export const AVATARS = [
  { id: 'cyber-bot', emoji: '🤖', label: 'Núcleo Sintético', ring: 'from-cyan-400 to-blue-600' },
  { id: 'neural-spark', emoji: '⚡', label: 'Pulso Neural', ring: 'from-violet-400 to-fuchsia-600' },
  { id: 'quantum-owl', emoji: '🦉', label: 'Oráculo RAG', ring: 'from-emerald-400 to-teal-600' },
  { id: 'astro-pilot', emoji: '🚀', label: 'Piloto Agéntico', ring: 'from-amber-400 to-orange-600' },
  { id: 'shield-sec', emoji: '🛡️', label: 'Guardián MCP', ring: 'from-rose-400 to-pink-600' },
  { id: 'crystal-mind', emoji: '💎', label: 'Mente Vectorial', ring: 'from-sky-400 to-indigo-600' },
];

export const TEAM_ROLES = [
  'Software Engineer',
  'Frontend / UI Developer',
  'Backend & Data Engineer',
  'AI / ML Specialist',
  'Product & Tech Lead',
  'QA & Automation',
  'DevOps / Cloud',
  'Innovación & Operaciones',
];

export const RANKS = [
  { minXP: 0, title: 'Explorador de Prompts', badge: '🌱', color: 'text-slate-300' },
  { minXP: 400, title: 'Operador de Contexto', badge: '⚡', color: 'text-cyan-400' },
  { minXP: 1000, title: 'Conector MCP', badge: '🔌', color: 'text-violet-400' },
  { minXP: 1800, title: 'Ingeniero de Skills & RAG', badge: '🧠', color: 'text-emerald-400' },
  { minXP: 2800, title: 'Arquitecto de Agentes IA', badge: '🤖', color: 'text-amber-400' },
  { minXP: 4000, title: 'Gran Maestro AI Nexus', badge: '👑', color: 'text-fuchsia-400' },
];

export const ACHIEVEMENTS = [
  {
    id: 'first_win',
    title: 'Primer Contacto',
    description: 'Supera tu primer nivel con al menos 60% de aciertos.',
    icon: '🚀',
    xpBonus: 100,
  },
  {
    id: 'perfect_score',
    title: 'Precisión Quirúrgica',
    description: 'Obtén un 100% de respuestas correctas en cualquier partida.',
    icon: '🎯',
    xpBonus: 150,
  },
  {
    id: 'streak_5',
    title: 'Racha en Llamas',
    description: 'Consigue 5 respuestas correctas consecutivas en una partida.',
    icon: '🔥',
    xpBonus: 120,
  },
  {
    id: 'streak_8',
    title: 'Sobrecarga Neural',
    description: 'Consigue 8 respuestas correctas consecutivas sin fallar.',
    icon: '⚡',
    xpBonus: 220,
  },
  {
    id: 'speed_runner',
    title: 'Reflejos Neurales',
    description: 'Supera cualquier nivel respondiendo en promedio en 10 segundos o menos y sin salir de pestaña.',
    icon: '⏱️',
    xpBonus: 180,
  },
  {
    id: 'mcp_specialist',
    title: 'Especialista MCP',
    description: 'Aprueba el Nivel 2 (MCP) con 80% o más de precisión.',
    icon: '🔌',
    xpBonus: 150,
  },
  {
    id: 'rag_sage',
    title: 'Sabio Vectorial',
    description: 'Aprueba el Nivel 4 (RAG & Fine-Tuning) con 80% o más.',
    icon: '🧬',
    xpBonus: 150,
  },
  {
    id: 'agent_commander',
    title: 'Comandante Agéntico',
    description: 'Supera el Nivel 5 de Agentes Autónomos y Tool Calling.',
    icon: '🤖',
    xpBonus: 200,
  },
  {
    id: 'all_levels',
    title: 'Graduado Full-Stack IA',
    description: 'Supera los 6 niveles del programa (del Nivel 0 al Nivel 5).',
    icon: '🏆',
    xpBonus: 350,
  },
  {
    id: 'arena_champion',
    title: 'Campeón de la Arena',
    description: 'Completa el Desafío Global Mixto con al menos 80% de aciertos.',
    icon: '👑',
    xpBonus: 300,
  },
];

export const QUIZ_LEVELS = [
  {
    level: 0,
    id: 'level-0',
    shortTitle: 'Conceptos Base',
    title: 'Nivel 0: Conceptos Base y Vocabulario IA',
    description: 'Punto de partida ideal: qué es un LLM, un prompt, un token, la ventana de contexto, un MCP, una skill, RAG y un agente.',
    icon: 'Compass',
    accent: 'sky',
    gradient: 'from-sky-500/20 via-indigo-500/10 to-transparent',
    borderGlow: 'hover:border-sky-400/60',
    badgeBg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    questions: [
      {
        id: 'l0-q1',
        tag: '¿Qué es un LLM?',
        question: '¿Qué es un LLM (Large Language Model o Modelo de Lenguaje Grande)?',
        options: [
          'Un sistema de inteligencia artificial entrenado con enormes volúmenes de texto capaz de comprender instrucciones y generar lenguaje o código.',
          'Una base de datos tradicional de tablas como Excel o MySQL.',
          'Un antivirus diseñado para acelerar el navegador web.',
          'Un lenguaje de programación exclusivo para fabricar microchips.',
        ],
        correct: 0,
        explanation:
          'Ejemplos de LLMs son Gemini, Claude o GPT. Funcionan identificando patrones estadísticos y semánticos del lenguaje para redactar, resumir, traducir, razonar y programar.',
      },
      {
        id: 'l0-q2',
        tag: '¿Qué es un Prompt?',
        question: "¿Qué es un 'Prompt' cuando interactúas con una Inteligencia Artificial?",
        options: [
          'La instrucción, pregunta o contexto de entrada que le damos a la IA para indicarle qué tarea debe realizar.',
          'El recibo de pago mensual de la suscripción de software.',
          'Un error de conexión cuando falla el Wi-Fi de la oficina.',
          'El ventilador físico que enfría la tarjeta gráfica.',
        ],
        correct: 0,
        explanation:
          'Un buen prompt explica qué necesitas, con qué contexto y en qué formato esperas la respuesta. Es la forma principal de comunicarnos con un modelo generativo.',
      },
      {
        id: 'l0-q3',
        tag: '¿Qué es un Token?',
        question: "En términos sencillos, ¿qué es un 'Token' dentro de un modelo de IA?",
        options: [
          'Cada una de las pequeñas piezas de texto (sílabas, palabras o signos) en las que la IA divide las frases para leerlas y escribirlas.',
          'Una moneda física coleccionable que regalan las empresas de tecnología.',
          'Únicamente los archivos de video que pesan más de 1 GB.',
          'El nombre de usuario del administrador de sistemas.',
        ],
        correct: 0,
        explanation:
          'Las IAs no leen letra por letra ni siempre palabra completa: parten el texto en bloques llamados tokens. Tanto la memoria del chat como el costo de uso se miden en tokens.',
      },
      {
        id: 'l0-q4',
        tag: 'Ventana de Contexto',
        question: "¿Qué es la 'Ventana de Contexto' (Context Window) de una IA?",
        options: [
          'La memoria de corto plazo del modelo: cuánta información (mensajes y archivos) puede recordar y analizar al mismo tiempo en una conversación.',
          'El tamaño en pulgadas del monitor donde abres el chat.',
          'Una ventana emergente de publicidad en el navegador.',
          'El horario de oficina en el que responde el soporte técnico.',
        ],
        correct: 0,
        explanation:
          'Piensa en la ventana de contexto como la mesa de trabajo de la IA: todo lo que cabe sobre la mesa (tu pregunta, el historial y documentos adjuntos) puede ser leído a la vez.',
      },
      {
        id: 'l0-q5',
        tag: '¿Qué es un MCP?',
        question: '¿Qué es un MCP (Model Context Protocol) explicado de forma sencilla?',
        options: [
          'Un conector universal (como un puerto USB-C para la IA) que le permite conectarse de forma estándar a herramientas como Slack, bases de datos, Drive o GitHub.',
          'Un programa para editar fotografías en blanco y negro.',
          'La marca de un procesador exclusivo para teléfonos móviles.',
          'Un formato de compresión de audio similar al MP3.',
        ],
        correct: 0,
        explanation:
          'Sin MCP habría que programar integraciones distintas para cada herramienta. Con MCP, la IA puede consultar datos reales o ejecutar acciones autorizadas de manera estándar.',
      },
      {
        id: 'l0-q6',
        tag: '¿Qué es una Skill?',
        question: "¿Qué es una 'Skill' (Habilidad) en herramientas y agentes de IA?",
        options: [
          'Un manual o receta reutilizable con instrucciones paso a paso para que la IA ejecute una tarea repetitiva siempre con el estándar del equipo.',
          'Un videojuego instalado oculto dentro del navegador.',
          'El nivel de brillo de la pantalla de la computadora.',
          'Un cable de red de alta velocidad.',
        ],
        correct: 0,
        explanation:
          'En lugar de explicarle desde cero cada día cómo hacer un reporte o revisar código, guardas ese conocimiento en una Skill y el asistente la aplica cuando hace falta.',
      },
      {
        id: 'l0-q7',
        tag: '¿Qué es RAG?',
        question: '¿Qué significa usar RAG (Generación Aumentada por Recuperación) en una empresa?',
        options: [
          'Hacer que la IA busque primero en los documentos propios de la empresa antes de responder, evitando inventar datos.',
          'Borrar toda la información antigua del servidor cada noche.',
          'Cambiar el idioma de la computadora a inglés automáticamente.',
          'Aumentar el volumen de los altavoces durante una videollamada.',
        ],
        correct: 0,
        explanation:
          'Un LLM general no conoce tus manuales internos privados. Con RAG, el sistema busca los párrafos relevantes en tus archivos y se los entrega a la IA como respaldo real.',
      },
      {
        id: 'l0-q8',
        tag: '¿Qué es un Agente?',
        question: "En términos simples, ¿qué diferencia a un 'Agente de IA' de un chat básico?",
        options: [
          'Un chat básico solo responde con texto; un Agente puede planificar pasos y usar herramientas (buscar, leer archivos, ejecutar tareas) para lograr un objetivo.',
          'Un Agente de IA es una persona física respondiendo detrás del teclado.',
          'El chat básico funciona con internet y el Agente solo funciona apagado.',
          'No tienen ninguna diferencia, solo cambia el logotipo.',
        ],
        correct: 0,
        explanation:
          'Mientras un chatbot tradicional contesta una pregunta y espera, un Agente de IA puede dividir un problema en pasos, consultar sistemas, verificar si algo falló y completar el trabajo.',
      },
    ],
  },
  {
    level: 1,
    id: 'level-1',
    shortTitle: 'Fundamentos LLM',
    title: 'Nivel 1: Fundamentos y Arquitectura',
    description: 'Comportamiento técnico de tokens, límites de contexto, parámetros de muestreo, system prompts y salidas estructuradas.',
    icon: 'Cpu',
    accent: 'cyan',
    gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    borderGlow: 'hover:border-cyan-400/60',
    badgeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    questions: [
      {
        id: 'l1-q1',
        tag: 'Tokenización Técnica',
        question: '¿Cómo influye el proceso de tokenización en el costo y consumo al procesar distintos textos o código?',
        options: [
          'Una misma palabra siempre equivale exactamente a 1 token sin importar el idioma ni la longitud.',
          'Palabras poco comunes, código con mucha indentación o idiomas con acentos suelen dividirse en más sub-tokens, consumiendo más presupuesto y contexto.',
          'Los números y signos de puntuación no consumen tokens en ningún modelo.',
          'El tokenizador solo cuenta las mayúsculas y descarta las minúsculas.',
        ],
        correct: 1,
        explanation:
          'Los tokenizadores (como BPE) asignan 1 token a secuencias frecuentes en su entrenamiento (a menudo inglés), mientras palabras compuestas, JSON verboso o español suelen requerir más fragmentos por oración.',
      },
      {
        id: 'l1-q2',
        tag: 'Límites de Contexto',
        question: '¿Qué ocurre técnicamente cuando la suma de mensajes, archivos e instrucciones supera la ventana de contexto o la satura en exceso?',
        options: [
          'El modelo amplía automáticamente la memoria RAM física de tu computadora.',
          'La API rechaza la petición o trunca mensajes antiguos, y además el exceso de ruido intermedio puede degradar la atención del modelo (context rot).',
          'La respuesta se vuelve 100% inmune a cualquier error.',
          'El historial se guarda gratuitamente dentro de los pesos permanentes del modelo.',
        ],
        correct: 1,
        explanation:
          'La ventana de contexto suma entrada + salida. Incluso en ventanas grandes (128k–1M tokens), meter información irrelevante encarece cada turno y diluye la precisión sobre los detalles importantes.',
      },
      {
        id: 'l1-q3',
        tag: 'Sampling',
        question: "¿Qué función cumple el parámetro de 'temperatura' (temperature) en la generación de texto?",
        options: [
          'Mide la temperatura de los servidores en la nube donde corre el modelo.',
          'Controla la velocidad de procesamiento del hardware gráfico (GPU).',
          'Regula el grado de aleatoriedad y creatividad en la selección de los tokens.',
          'Determina el límite de caracteres permitidos por mensaje.',
        ],
        correct: 2,
        explanation:
          'Temperaturas bajas (0.0 – 0.2) hacen la salida más determinista y precisa (ideal para código, SQL o extracción JSON), mientras que valores más altos favorecen variedad e ideación creativa.',
      },
      {
        id: 'l1-q4',
        tag: 'Fiabilidad',
        question: "¿Qué es una 'alucinación' (hallucination) en los LLMs?",
        options: [
          'Un error de red que desconecta la sesión del usuario.',
          'La generación de información falsa o inventada presentada con total seguridad.',
          'Cuando el modelo responde en un idioma extranjero por equivocación.',
          'Una función secreta para activar modos de desarrollo.',
        ],
        correct: 1,
        explanation:
          'Como los LLMs predicen el siguiente token estadísticamente probable en lugar de consultar hechos verificados por defecto, pueden inventar APIs, citas o datos plausibles si carecen de contexto anclado (grounding).',
      },
      {
        id: 'l1-q5',
        tag: 'Prompt Engineering',
        question: '¿Cuál es la principal ventaja de usar un prompt estructurado frente a una instrucción libre?',
        options: [
          'Reduce automáticamente el consumo de energía eléctrica.',
          'Permite guiar al modelo con mayor precisión, contexto y formato de salida deseado.',
          'Elimina por completo la necesidad de usar tokens.',
          'Hace que el modelo sea inmune a las alucinaciones.',
        ],
        correct: 1,
        explanation:
          'Separar claramente el rol, el contexto de referencia, las restricciones y el esquema de salida (por ejemplo JSON o Markdown con ejemplos few-shot) reduce drásticamente la ambigüedad.',
      },
      {
        id: 'l1-q6',
        tag: 'Arquitectura de Mensajes',
        question: '¿Cuál es la diferencia práctica entre un System Prompt y un User Prompt?',
        options: [
          'El System Prompt define reglas globales, rol y límites persistentes; el User Prompt contiene la solicitud puntual del usuario.',
          'El System Prompt solo acepta código binario y el User Prompt acepta texto.',
          'No existe diferencia; las APIs modernas ignoran el System Prompt.',
          'El User Prompt tiene mayor jerarquía de seguridad que el System Prompt.',
        ],
        correct: 0,
        explanation:
          'Los modelos se entrenan para dar prioridad conductual al mensaje de sistema (System Instruction), convirtiéndolo en el lugar ideal para fijar políticas, tono, esquemas y guardrails.',
      },
      {
        id: 'l1-q7',
        tag: 'Costos y Latencia',
        question: 'En APIs de LLMs comerciales, ¿por qué los tokens de salida (output) suelen costar más y tardar más que los de entrada (input)?',
        options: [
          'Porque los tokens de entrada se procesan en paralelo (prefill) mientras los de salida se generan uno por uno de forma autorregresiva.',
          'Porque los tokens de salida se envían por correo electrónico cifrado.',
          'Porque los proveedores cobran un impuesto adicional solo a las vocales.',
          'Porque los tokens de entrada no utilizan memoria VRAM en la GPU.',
        ],
        correct: 0,
        explanation:
          'Durante la fase de lectura (prefill), la GPU procesa el prompt en paralelo; en cambio, en la decodificación cada nuevo token depende de todos los anteriores, haciendo la generación secuencial e intensiva en ancho de banda de memoria.',
      },
      {
        id: 'l1-q8',
        tag: 'Salidas Estandarizadas',
        question: "¿Qué garantizan las 'Structured Outputs' (salidas estructuradas con JSON Schema) frente a solo pedir 'responde en JSON' en el prompt?",
        options: [
          'Restringen la decodificación de tokens para que la respuesta cumpla estrictamente el esquema definido sin errores de sintaxis.',
          'Hacen que el modelo responda 10 veces más rápido sin leer el prompt.',
          'Traducen automáticamente los valores del JSON a todos los idiomas.',
          'Encriptan el JSON para que nadie en el equipo pueda leerlo.',
        ],
        correct: 0,
        explanation:
          'Mediante constrained decoding (máscaras gramaticales sobre los tokens válidos), el motor impide generar llaves inválidas o campos faltantes, haciendo seguras las integraciones con código backend.',
      },
    ],
  },
  {
    level: 2,
    id: 'level-2',
    shortTitle: 'Protocolo MCP',
    title: 'Nivel 2: Conectividad y Protocolos (MCP)',
    description: 'Model Context Protocol, arquitectura Host-Client-Server, herramientas externas y seguridad de integraciones.',
    icon: 'Network',
    accent: 'violet',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    borderGlow: 'hover:border-violet-400/60',
    badgeBg: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    questions: [
      {
        id: 'l2-q1',
        tag: 'Estándar Abierto',
        question: '¿Qué significa la sigla MCP en el ecosistema de IA actual?',
        options: [
          'Machine Control Program',
          'Model Context Protocol',
          'Multi-Core Processor',
          'Maximum Context Pipeline',
        ],
        correct: 1,
        explanation:
          'Model Context Protocol (MCP) es el estándar abierto diseñado para conectar aplicaciones de IA con sistemas externos de datos y herramientas de forma uniforme (a menudo comparado con un puerto USB-C para IA).',
      },
      {
        id: 'l2-q2',
        tag: 'Propósito MCP',
        question: '¿Cuál es el propósito principal del protocolo MCP?',
        options: [
          'Estandarizar la conexión segura y directa entre modelos de lenguaje y fuentes de datos o herramientas.',
          'Comprimir los archivos de video en formato MP4 automáticamente.',
          'Acelerar la velocidad de descarga de modelos de código abierto en GitHub.',
          'Traducir código de Python a JavaScript de forma nativa.',
        ],
        correct: 0,
        explanation:
          'MCP resuelve el problema N×M: en lugar de escribir un conector distinto para cada modelo y cada herramienta empresarial, un único servidor MCP sirve a cualquier cliente compatible.',
      },
      {
        id: 'l2-q3',
        tag: 'Arquitectura',
        question: 'En una arquitectura MCP, ¿qué papel juega el cliente (Client)?',
        options: [
          'Es el servidor remoto que aloja los datos de la base de datos empresarial.',
          'Es el conector dentro de la aplicación de IA (chat o IDE) que mantiene la sesión 1:1 y solicita capacidades al servidor MCP.',
          'Es el usuario final que paga la suscripción mensual.',
          'Es un archivo de configuración estático en formato JSON.',
        ],
        correct: 1,
        explanation:
          'La aplicación Host (por ejemplo tu IDE o agente) instancia clientes MCP que negocian capacidades mediante JSON-RPC 2.0 con cada servidor MCP conectado.',
      },
      {
        id: 'l2-q4',
        tag: 'Capacidades',
        question: '¿Qué tipo de capacidades principales puede exponer un servidor MCP (MCP Server)?',
        options: [
          'Resources (datos de lectura), Tools (funciones ejecutables) y Prompts (plantillas reutilizables).',
          'Únicamente imágenes en formato PNG y JPG.',
          'Claves de cifrado RSA y certificados SSL.',
          'Registros de transacciones bancarias físicas.',
        ],
        correct: 0,
        explanation:
          'MCP organiza sus primitivas del servidor en tres pilares: Resources (contexto tipo archivo/URI), Tools (acciones invocadas por el modelo) y Prompts (flujos predefinidos para el usuario).',
      },
      {
        id: 'l2-q5',
        tag: 'Escalabilidad',
        question: '¿Por qué es revolucionario el MCP para los desarrolladores de agentes de IA?',
        options: [
          'Porque reemplaza por completo la necesidad de usar Python.',
          'Porque evita tener que crear integraciones personalizadas y frágiles para cada herramienta o fuente de datos.',
          'Porque duplica la velocidad de los procesadores de los servidores.',
          'Porque permite entrenar modelos desde cero en minutos.',
        ],
        correct: 1,
        explanation:
          'Al desacoplar el agente de la implementación específica de Jira, GitHub, Postgres o Slack, los equipos reutilizan servidores MCP auditados y mantienen una arquitectura limpia.',
      },
      {
        id: 'l2-q6',
        tag: 'Transportes MCP',
        question: '¿Cuáles son los mecanismos de transporte estándar que utiliza MCP para comunicar cliente y servidor?',
        options: [
          'stdio (entrada/salida estándar para procesos locales) y Streamable HTTP / SSE para servidores remotos.',
          'Únicamente cables Bluetooth y puertos serie RS-232.',
          'Envío de paquetes UDP sin confirmación de entrega.',
          'Archivos temporales escritos en el Escritorio cada segundo.',
        ],
        correct: 0,
        explanation:
          'Los servidores MCP locales suelen ejecutarse como subprocesos ligeros comunicándose por stdio, mientras que los despliegues empresariales compartidos emplean HTTP con streaming y autenticación OAuth.',
      },
      {
        id: 'l2-q7',
        tag: 'Resources vs Tools',
        question: 'En MCP, ¿cuál es la diferencia clave entre exponer algo como Resource frente a exponerlo como Tool?',
        options: [
          'Un Resource provee contexto de solo lectura sin efectos secundarios; una Tool ejecuta lógica o acciones dinámicas decididas por el modelo.',
          'Los Resources cuestan dinero y las Tools son gratuitas.',
          'Las Tools solo devuelven números enteros y los Resources devuelven audio.',
          'No hay diferencia alguna en la especificación MCP.',
        ],
        correct: 0,
        explanation:
          'Separar lectura contextual (Resources, como esquemas de BD o documentos) de acciones operativas (Tools, como crear un ticket o ejecutar una consulta) mejora el control de permisos.',
      },
      {
        id: 'l2-q8',
        tag: 'Seguridad MCP',
        question: '¿Qué buena práctica de seguridad es indispensable al conectar servidores MCP con herramientas de escritura o borrado?',
        options: [
          'Aplicar principio de mínimo privilegio y exigir confirmación humana (Human-in-the-Loop) para acciones sensibles.',
          'Otorgar credenciales de administrador raíz a todos los servidores por comodidad.',
          'Guardar los tokens de API directamente dentro del prompt público.',
          'Desactivar todos los registros de auditoría (logs) para ganar velocidad.',
        ],
        correct: 0,
        explanation:
          'Dado que un LLM podría ser manipulado mediante prompt injection indirecto al leer datos externos, las herramientas destructivas o de escritura externa deben requerir aprobación explícita y tokens con permisos acotados.',
      },
    ],
  },
  {
    level: 3,
    id: 'level-3',
    shortTitle: 'Skills Modulares',
    title: 'Nivel 3: Skills y Automatización Modular',
    description: 'Empaquetado de conocimiento operativo, SKILL.md, carga progresiva de contexto y estandarización de equipo.',
    icon: 'Layers',
    accent: 'emerald',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderGlow: 'hover:border-emerald-400/60',
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    questions: [
      {
        id: 'l3-q1',
        tag: 'Definición de Skill',
        question: "¿Cómo se define una 'skill' (habilidad) en el contexto de agentes de codificación y asistentes modernos?",
        options: [
          'Una certificación oficial emitida por OpenAI o Anthropic.',
          'Un paquete estructurado de instrucciones, scripts y recursos reutilizables para ejecutar una tarea especializada.',
          'Un comando oculto para reiniciar los servidores.',
          'Una librería de Python instalada exclusivamente mediante pip.',
        ],
        correct: 1,
        explanation:
          'Una Skill convierte el know-how de tu equipo (cómo hacer despliegues, auditorías, migraciones o diseños) en un módulo autocontenido que el agente descubre y sigue cuando la tarea lo amerita.',
      },
      {
        id: 'l3-q2',
        tag: 'Eficiencia Operativa',
        question: '¿Cuál es la ventaja clave de encapsular flujos en una skill en lugar de reescribir prompts largos manualmente?',
        options: [
          'Se evita repetir instrucciones complejas, asegurando consistencia, calidad repetible y ahorro de tiempo en todo el equipo.',
          'El modelo consume cero tokens al ejecutar una skill.',
          'Permite que el modelo funcione sin conexión a internet.',
          'Elimina la necesidad de validar resultados.',
        ],
        correct: 0,
        explanation:
          'Al versionar una skill en el repositorio, todo el equipo ejecuta el mismo estándar experto sin depender de que cada persona recuerde docenas de pasos o reglas borde.',
      },
      {
        id: 'l3-q3',
        tag: 'Anatomía de Skill',
        question: '¿Qué elementos suelen componer una skill bien estructurada?',
        options: [
          'Un archivo principal SKILL.md (con frontmatter YAML de nombre/descripción e instrucciones) más carpetas opcionales como scripts/, examples/ o references/.',
          'Únicamente una imagen de perfil y un nombre en código.',
          'Una base de datos SQL completa integrada.',
          'Un archivo ejecutable .exe exclusivo para Windows.',
        ],
        correct: 0,
        explanation:
          'El frontmatter YAML (name y description) permite al agente saber cuándo activar la skill, mientras SKILL.md y sus subcarpetas aportan el procedimiento paso a paso y utilidades deterministas.',
      },
      {
        id: 'l3-q4',
        tag: 'Ingeniería Modular',
        question: '¿Cómo se relaciona una skill con el concepto de modularidad en ingeniería de software?',
        options: [
          'No tienen ninguna relación, la IA no sigue principios de software.',
          'Permite aislar capacidades específicas para activarlas, probarlas o actualizarlas de manera independiente sin saturar todo el sistema.',
          'Obliga a reescribir todo el código fuente cada vez que se actualiza.',
          'Hace que el agente sea monolítico y difícil de mantener.',
        ],
        correct: 1,
        explanation:
          'Igual que los módulos de software con alta cohesión y bajo acoplamiento, cada skill resuelve un dominio concreto y evoluciona sin romper otras capacidades del agente.',
      },
      {
        id: 'l3-q5',
        tag: 'Recursos Auxiliares',
        question: '¿Qué rol juegan los archivos auxiliares (scripts, plantillas, referencias) dentro de una skill?',
        options: [
          'Proveer guías detalladas, validadores deterministas o plantillas que el agente carga o ejecuta solo cuando los necesita.',
          'Ocupar espacio en disco innecesariamente.',
          'Bloquear el acceso de usuarios no autorizados.',
          'Hacer que el sistema operativo se vuelva más lento.',
        ],
        correct: 0,
        explanation:
          'Delegar tareas mecánicas o propensas a error a un script dentro de scripts/ ahorra miles de tokens de razonamiento y garantiza ejecución 100% determinista.',
      },
      {
        id: 'l3-q6',
        tag: 'Progressive Disclosure',
        question: "¿Qué ventaja aporta la 'carga progresiva de contexto' (Progressive Disclosure) en el sistema de skills?",
        options: [
          'El agente solo mantiene en memoria el nombre y descripción breve de las skills disponibles, leyendo el SKILL.md completo únicamente cuando es relevante.',
          'Carga todas las skills del mundo en cada mensaje aunque no se usen.',
          'Borra el historial del usuario cada 30 segundos.',
          'Reduce la resolución de la pantalla para ahorrar batería.',
        ],
        correct: 0,
        explanation:
          'Si inyectáramos 50 manuales largos en el System Prompt siempre, degradaríamos la atención del LLM y dispararíamos costos. Con carga bajo demanda, la ventana de contexto permanece limpia y enfocada.',
      },
      {
        id: 'l3-q7',
        tag: 'Rules vs Skills',
        question: '¿Cuándo conviene usar una Regla Global (Rule) en vez de una Skill?',
        options: [
          'Usa Reglas para convenciones breves que aplican en casi toda tarea (ej. estilo de código); usa Skills para flujos extensos o específicos de una tarea.',
          'Nunca uses Reglas; las Reglas están prohibidas en proyectos modernos.',
          'Usa Reglas únicamente para guardar imágenes pesadas.',
          'Las Skills siempre se ejecutan antes de encender la computadora.',
        ],
        correct: 0,
        explanation:
          'Las reglas siempre presentes deben ser concisas (principios generales del repo), mientras que los playbooks profundos (ej. migrar esquemas o generar reportes) viven mejor como Skills activables.',
      },
      {
        id: 'l3-q8',
        tag: 'Activación Semántica',
        question: '¿Por qué es crítico redactar una buena propiedad `description` en el frontmatter de `SKILL.md`?',
        options: [
          'Porque el agente decide si debe activar y leer la skill evaluando principalmente esa descripción frente a la petición del usuario.',
          'Porque define el color del botón en el navegador.',
          'Porque sin más de 5,000 palabras el archivo no guarda en Git.',
          'Porque sirve como contraseña de acceso al repositorio.',
        ],
        correct: 0,
        explanation:
          'Una descripción clara que indique qué hace la skill y en qué escenarios usarla actúa como disparador semántico preciso para el enrutador o planificador del agente.',
      },
    ],
  },
  {
    level: 4,
    id: 'level-4',
    shortTitle: 'RAG y Vectores',
    title: 'Nivel 4: RAG, Fine-Tuning y Recuperación',
    description: 'Búsqueda semántica, embeddings, chunking estratégico, búsqueda híbrida, reranking y ajuste fino.',
    icon: 'Database',
    accent: 'amber',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderGlow: 'hover:border-amber-400/60',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    questions: [
      {
        id: 'l4-q1',
        tag: 'RAG vs Fine-Tuning',
        question: '¿Cuál es la diferencia fundamental entre RAG (Retrieval-Augmented Generation) y Fine-Tuning?',
        options: [
          'RAG busca e inyecta información externa relevante en tiempo de consulta sin modificar el modelo; Fine-Tuning ajusta los pesos internos del modelo.',
          'RAG es solo para imágenes y Fine-Tuning es solo para texto.',
          'Son exactamente el mismo proceso con diferentes nombres comerciales.',
          'Fine-Tuning no requiere ejemplos de entrenamiento, mientras que RAG sí.',
        ],
        correct: 0,
        explanation:
          'RAG conecta al modelo con fuentes vivas y verificables al instante; Fine-Tuning especializa el comportamiento, formato o jerga interna entrenando sobre pares curados.',
      },
      {
        id: 'l4-q2',
        tag: 'Vector Databases',
        question: '¿Qué función cumple una base de datos vectorial (Vector Database) en un sistema RAG?',
        options: [
          'Almacenar contraseñas de usuarios cifradas.',
          'Indexar fragmentos convertidos en vectores numéricos (embeddings) para recuperar los más cercanos por similitud semántica.',
          'Gestionar las hojas de cálculo contables en formato XLS.',
          'Renderizar gráficos en 3D para videojuegos.',
        ],
        correct: 1,
        explanation:
          'Mediante índices ANN como HNSW o IVF, las bases vectoriales encuentran en milisegundos textos conceptualmente relacionados aunque no compartan exactamente las mismas palabras.',
      },
      {
        id: 'l4-q3',
        tag: 'Caso de Uso Ideal',
        question: '¿En qué escenario es más recomendable aplicar RAG en lugar de Fine-Tuning?',
        options: [
          'Cuando el modelo debe responder con trazabilidad y citas sobre documentación interna que se actualiza con frecuencia.',
          'Cuando solo quieres cambiar el estilo poético permanente del modelo sin datos cambiantes.',
          'Cuando no existe ningún documento ni fuente de referencia.',
          'Cuando buscas eliminar la necesidad de enviar prompts.',
        ],
        correct: 0,
        explanation:
          'Con RAG, actualizar el conocimiento es tan rápido como re-indexar el documento modificado, respetando permisos de acceso por usuario y permitiendo citar la fuente exacta.',
      },
      {
        id: 'l4-q4',
        tag: 'Embeddings',
        question: "¿Qué es un 'embedding' en el contexto de procesamiento de lenguaje natural?",
        options: [
          'Un código de barras impreso en las etiquetas de los servidores.',
          'Una representación numérica densa (vector de cientos o miles de dimensiones) que captura el significado semántico de un texto.',
          'Un error crítico de compilación en Python.',
          'Un plugin de navegador para traducir páginas.',
        ],
        correct: 1,
        explanation:
          'En el espacio vectorial de embeddings, frases con significados parecidos ("reiniciar contraseña" y "recuperar acceso a mi cuenta") quedan geométricamente muy próximas (alta similitud coseno).',
      },
      {
        id: 'l4-q5',
        tag: 'Límites de Chunking',
        question: '¿Cuál es una limitación común de los sistemas RAG ingenuos (Naive RAG)?',
        options: [
          'La pérdida de contexto global si el fragmento recuperado (chunk) queda aislado de encabezados o información previa indispensable.',
          'Que no pueden procesar texto extraído de archivos PDF.',
          'Que eliminan por completo la ventana de contexto del LLM.',
          'Que requieren obligatoriamente GPUs locales en el teléfono del usuario.',
        ],
        correct: 0,
        explanation:
          'Si un fragmento dice "Su límite aumentó un 15%" sin mencionar a qué producto o año pertenece, el LLM puede confundirse. Técnicas como Contextual Retrieval, metadatos ricos y solapamiento mitigan esto.',
      },
      {
        id: 'l4-q6',
        tag: 'Búsqueda Híbrida',
        question: '¿Por qué los sistemas RAG de producción suelen combinar búsqueda vectorial con búsqueda léxica (BM25) en una Búsqueda Híbrida?',
        options: [
          'Porque los vectores capturan significado semántico, mientras BM25 destaca encontrando códigos exactos, SKUs, siglas técnicas o nombres propios.',
          'Porque obliga al usuario a escribir la pregunta dos veces.',
          'Porque BM25 genera imágenes automáticamente.',
          'Porque los embeddings no funcionan con textos en español.',
        ],
        correct: 0,
        explanation:
          'Un embedding puro puede fallar al buscar el código de error exacto "ERR_4092_AUTH", donde BM25 acierta de inmediato. Fusionar ambos resultados (ej. con Reciprocal Rank Fusion) eleva notablemente el recall.',
      },
      {
        id: 'l4-q7',
        tag: 'Reranking',
        question: '¿Qué papel cumple un modelo Reranker (Cross-Encoder) dentro de un pipeline RAG avanzado?',
        options: [
          'Evalúa conjuntamente la pregunta y los ~20-50 candidatos recuperados para reordenarlos con alta precisión antes de pasar el top final al LLM.',
          'Traduce la base de datos entera a código ensamblador.',
          'Reemplaza al usuario generando preguntas al azar.',
          'Borra los documentos antiguos de la empresa cada viernes.',
        ],
        correct: 0,
        explanation:
          'La búsqueda vectorial inicial es ultrarrápida pero aproximada; aplicar un Reranker sobre los mejores candidatos filtra ruido y coloca los fragmentos verdaderamente relevantes en los primeros lugares.',
      },
      {
        id: 'l4-q8',
        tag: 'Chunk Overlap',
        question: "Al dividir documentos largos en fragmentos (chunking), ¿para qué se configura un 'overlap' (solapamiento entre fragmentos contiguos)?",
        options: [
          'Para evitar cortar ideas o frases clave justo a la mitad entre el final de un fragmento y el inicio del siguiente.',
          'Para duplicar la factura de almacenamiento sin beneficio técnico.',
          'Para encriptar las palabras repetidas.',
          'Para impedir que el modelo lea el último párrafo.',
        ],
        correct: 0,
        explanation:
          'Un solapamiento moderado (ej. 10%–15% de tokens) preserva la continuidad semántica en las fronteras de corte, mejorando la calidad de los embeddings resultantes.',
      },
    ],
  },
  {
    level: 5,
    id: 'level-5',
    shortTitle: 'Agentes y Tools',
    title: 'Nivel 5: Agentes Autónomos y Tool Calling',
    description: 'Function calling, ciclos ReAct, subagentes, orquestación multi-agente, sandboxing y evaluación de trayectorias.',
    icon: 'Bot',
    accent: 'rose',
    gradient: 'from-rose-500/20 via-fuchsia-500/10 to-transparent',
    borderGlow: 'hover:border-rose-400/60',
    badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    questions: [
      {
        id: 'l5-q1',
        tag: 'Tool Calling',
        question: "¿Qué es el 'Tool Calling' (o Function Calling) en los modelos de lenguaje modernos?",
        options: [
          'Una llamada telefónica automatizada realizada por la IA.',
          'La capacidad del modelo para decidir cuándo invocar herramientas externas emitiendo argumentos estructurados que el sistema ejecuta.',
          'Un comando manual de consola para instalar editores de texto.',
          'La interfaz visual donde el usuario cambia el color del chat.',
        ],
        correct: 1,
        explanation:
          'Importante: el LLM no ejecuta la API directamente por arte de magia; emite una solicitud estructurada (nombre de función + JSON de parámetros), la aplicación la ejecuta de forma controlada y le devuelve el resultado al modelo.',
      },
      {
        id: 'l5-q2',
        tag: 'Autonomía Agéntica',
        question: '¿Cómo se diferencia un Agente Autónomo de un flujo de prompt lineal tradicional?',
        options: [
          'El agente planifica dinámicamente, usa herramientas, inspecciona errores del entorno e itera decisiones hasta resolver el objetivo.',
          'El agente funciona sin necesidad de electricidad ni servidores.',
          'El prompt lineal tradicional puede corregirse solo ante fallos de compilación.',
          'No hay diferencia, ambos son sinónimos exactos.',
        ],
        correct: 0,
        explanation:
          'Mientras un pipeline fijo sigue pasos preprogramados rígidos, un agente adapta su siguiente paso según la retroalimentación real (tests fallidos, resultados de búsqueda, logs).',
      },
      {
        id: 'l5-q3',
        tag: 'Ciclo ReAct',
        question: '¿Qué es un bucle de razonamiento y acción (ciclo ReAct) en agentes de IA?',
        options: [
          'Un ciclo iterativo donde el modelo razona (Reason), ejecuta una herramienta (Act), observa la salida real (Observe) y ajusta su plan.',
          'Un error de bucle infinito que daña físicamente la tarjeta madre.',
          'Una librería de componentes visuales creada para interfaces móviles.',
          'Un protocolo exclusivo para redes Wi-Fi.',
        ],
        correct: 0,
        explanation:
          'El patrón ReAct combina cadena de pensamiento con interacción empírica: en vez de adivinar qué contiene un archivo o cuánto da un cálculo, el agente consulta la herramienta y razona sobre la evidencia.',
      },
      {
        id: 'l5-q4',
        tag: 'Seguridad y Sandboxing',
        question: '¿Qué riesgo principal introduce otorgar ejecución de código o llamadas a APIs a un agente autónomo?',
        options: [
          'Que el monitor cambie su tasa de refresco por sí solo.',
          'Ejecución accidental o inducida de comandos destructivos, fuga de secretos o bucles costosos si carece de sandboxing y límites.',
          'Que el teclado físico cambie de idioma mecánicamente.',
          'Reducción permanente de la memoria RAM instalada.',
        ],
        correct: 1,
        explanation:
          'Por ello los agentes robustos operan dentro de entornos aislados (sandboxes), con presupuestos máximos de iteraciones/tokens y solicitud de permiso explícito antes de acciones fuera del perímetro seguro.',
      },
      {
        id: 'l5-q5',
        tag: 'Orquestación',
        question: 'En el diseño de arquitecturas avanzadas, ¿qué es la orquestación multi-agente (Orchestration)?',
        options: [
          'La coordinación de múltiples agentes o subagentes especializados, estado compartido, herramientas y flujos de control hacia una meta compleja.',
          'La composición de música instrumental para presentaciones.',
          'El montaje mecánico de cables de red en el centro de datos.',
          'La compresión de archivos ZIP mediante línea de comandos.',
        ],
        correct: 0,
        explanation:
          'Un agente coordinador puede delegar subtareas en paralelo (ej. investigar código, revisar seguridad y ejecutar pruebas) y sintetizar sus hallazgos finales.',
      },
      {
        id: 'l5-q6',
        tag: 'Subagentes y Contexto',
        question: '¿Cuál es uno de los mayores beneficios técnicos de delegar una investigación extensa a un subagente?',
        options: [
          'Aísla docenas de lecturas intermedias en la ventana de contexto propia del subagente, devolviendo al agente principal solo una síntesis limpia.',
          'Permite usar la tarjeta gráfica del vecino por Bluetooth.',
          'Evita que el código necesite pruebas unitarias.',
          'Convierte automáticamente lenguajes interpretados en binarios del kernel.',
        ],
        correct: 0,
        explanation:
          'El aislamiento de contexto evita contaminar ("context rot") la conversación principal con miles de líneas de búsqueda exploratoria, manteniendo alta precisión y paralelismo.',
      },
      {
        id: 'l5-q7',
        tag: 'Diseño de Tools',
        question: 'Al diseñar herramientas (Tools) para que un agente las use con alta fiabilidad, ¿qué práctica da mejores resultados?',
        options: [
          'Definir nombres claros, descripciones precisas de casos de uso, esquemas tipados estrictos y mensajes de error informativos que guíen la autocorrección.',
          'Nombrar las funciones f1, f2, f3 sin descripción para ahorrar algunos tokens.',
          'Devolver únicamente el código "ERROR 500" sin detalles cuando un parámetro es inválido.',
          'Combinar 40 acciones distintas dentro de un solo parámetro de texto libre.',
        ],
        correct: 0,
        explanation:
          'Para un agente, las definiciones de sus Tools son su interfaz de usuario (ACI — Agent-Computer Interface). Buenos mensajes de validación permiten al modelo corregir sus argumentos en el siguiente turno.',
      },
      {
        id: 'l5-q8',
        tag: 'Evaluación de Agentes',
        question: '¿Cómo se evalúa rigurosamente la calidad de un agente en producción (Agent Evals)?',
        options: [
          'Midiendo tasa de éxito en tareas reales representativas, calidad de la trayectoria (herramientas elegidas), latencia, costo y seguridad ante casos borde.',
          'Contando únicamente cuántas palabras bonitas incluye el saludo inicial.',
          'Probando una sola pregunta fácil manualmente antes de salir a producción.',
          'Verificando únicamente que el servidor devuelva HTTP 200.',
        ],
        correct: 0,
        explanation:
          'Un banco de evaluaciones automatizadas (benchmarks internos del equipo) permite cambiar prompts, herramientas o versión del modelo detectando regresiones antes de afectar a los usuarios.',
      },
    ],
  },
];

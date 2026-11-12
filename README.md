# ⚡ AI Nexus Quiz — Entrenamiento Gamificado de IA para Equipos

Plataforma web moderna, interactiva y gamificada construida con **React + Vite + Tailwind CSS** para evaluar y fortalecer el dominio técnico de equipos en **Inteligencia Artificial moderna** (*LLMs, Protocolo MCP, Skills Modulares, RAG Vectorial y Agentes Autónomos*).

---

## ✨ Novedades y Características Principales

- **🎨 Diseño Futurista / AI Glassmorphism:** Interfaz oscura de alto contraste con paneles translúcidos, resplandores aurora dinámicos, micro-animaciones y soporte de atajos de teclado (`1–4` para responder y `Enter` para avanzar).
- **🧠 Banco Ampliado (48 Preguntas Curadas, Nivel 0 al 5 + Aleatorización):**
  - **Nivel 0:** Conceptos Base y Vocabulario IA (¿Qué es un LLM, un Prompt, un Token, la Ventana de Contexto, un MCP, una Skill, RAG y un Agente?).
  - **Nivel 1:** Fundamentos y Arquitectura LLM (Tokenización técnica, Context Window, Sampling, System Prompts, Structured Outputs, Latencia/Costos).
  - **Nivel 2:** Conectividad y Protocolos (MCP — Host/Client/Server, Resources vs Tools, Transportes `stdio`/HTTP, Seguridad Human-in-the-Loop).
  - **Nivel 3:** Skills y Automatización Modular (`SKILL.md`, Progressive Disclosure, Reglas vs Skills, Scripts deterministas).
  - **Nivel 4:** RAG, Fine-Tuning y Recuperación (Embeddings, Vector DBs, Búsqueda Híbrida BM25 + Vectorial, Reranking, Chunk Overlap).
  - **Nivel 5:** Agentes Autónomos y Tool Calling (Function Calling, Ciclo ReAct, Subagentes, Sandboxing, Agent Evals).
  - **⚔️ Arena Global Mixta:** Reto especial de 10 preguntas combinando todos los módulos.
  - Tanto el orden de las preguntas como el de las opciones cambian automáticamente en cada partida.
- **💡 Explicación Técnica Instantánea + Repaso Final:** Cada respuesta muestra al instante el *porqué* técnico y al terminar el nivel puedes filtrar entre **Todas** las preguntas o **Solo Errores**.
- **🏆 Gamificación Completa + Escudo Antitrampa:**
  - **Tiempo obligatorio de 30s por pregunta** (sin opción de pausar ni quitar el reloj).
  - **Detector de cambio de pestaña / ventana:** advierte en la 1ª salida y **anula automáticamente la pregunta activa** si vuelve a salir.
  - **Bloqueo anticopiado:** selección de texto, clic derecho y atajos `Ctrl+C` deshabilitados durante el cuestionario.
  - **Modo Pantalla Completa en Nivel 5:** el nivel final exige pantalla completa activa para responder.
  - Puntos **XP**, **6 Rangos Evolutivos**, **Rachas en vivo (`🔥`)**, **Estrellas (`⭐⭐⭐`)**, **10 Medallas Desbloqueables**, celebraciones con **confeti** y sintetizador de audio Web Audio API.
- **🪪 Perfil Persistente y Credencial con Sello de Integridad:**
  - Progreso guardado automáticamente en `localStorage`.
  - Generador integrado de **Credencial Técnica en PNG HD** con **Sello de Integridad Verificada** (mostrando `0 salidas de pestaña` o el número exacto de salidas registradas) y botón para copiar resumen formateado para **Slack / Microsoft Teams / WhatsApp**.

---

## 🚀 Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Generar build de producción
npm run build
```

---

## 🌐 Despliegue Automático en GitHub Pages

Este repositorio ya incluye el flujo automatizado en [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Sube tus cambios a la rama `main` en GitHub.
2. En tu repositorio de GitHub, entra en **Settings → Pages**.
3. En **Build and deployment → Source**, selecciona **GitHub Actions**.
4. ¡Listo! Cada `git push` compilará la aplicación con Vite y publicará automáticamente la nueva versión en `https://cesarjperez.github.io/ai-team-quiz/`.

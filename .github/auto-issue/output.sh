#!/bin/bash
# Script generado desde normalized.yaml

gh issue create \
  --title "Dependencia de Datos Estáticos para el Talento" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
Actualmente, la información de artistas y obras reside en archivos .ts locales dentro de /src/data/, lo que requiere un nuevo despliegue cada vez que se une un talento.

## Resultado actual:
Esto limita la agilidad editorial y hace que el contenido se vuelva obsoleto rápidamente si la comunidad crece.

## Propuesta de solución:
Integrar un Headless CMS como Sanity o Storyblok para permitir que los administradores actualicen perfiles sin tocar el código.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Ausencia de un Sistema de Autenticación" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
El proyecto no cuenta con una pasarela de inicio de sesión para que los talentos gestionen sus propios perfiles.

## Resultado actual:
La falta de autogestión sobrecarga a los desarrolladores y limita la interacción personalizada del usuario.

## Propuesta de solución:
Implementar Clerk para una configuración rápida de perfiles o Auth.js si se prefiere una solución de código abierto y flexible.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Inexistencia de una Base de Datos Relacional Escalable" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
El almacenamiento de datos en archivos JSON o TS impide realizar consultas complejas, como filtrar talentos por múltiples habilidades simultáneamente.

## Resultado actual:
A medida que la base de datos de "Revolución Digital" crezca, los archivos estáticos afectarán el tiempo de compilación y la memoria.

## Propuesta de solución:
Adoptar Supabase (PostgreSQL) para manejar relaciones complejas entre talentos, categorías y colaboraciones con alto rendimiento.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Vulnerabilidad ante Ataques XSS por falta de CSP" \
  --label "bug,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
No se ha configurado explícitamente una Política de Seguridad de Contenido (CSP) en el proyecto.

## Resultado actual:
Al ser una plataforma que mostrará contenido de diversos creadores, existe el riesgo de inyección de scripts maliciosos.

## Propuesta de solución:
Activar la funcionalidad experimental de CSP nativa en Astro 5.9+ y usar experimentalStaticHeaders para servir los hashes de seguridad desde Vercel.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Gestión Ineficiente de Carga de Archivos" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
El proyecto no tiene un flujo definido para que los músicos o artistas suban sus obras directamente.

## Resultado actual:
Subir archivos pesados a través de funciones serverless puede causar tiempos de espera (timeouts) y costos elevados.

## Propuesta de solución:
Implementar el patrón de Presigned URLs para que los usuarios suban sus archivos directamente a un bucket de S3 o Supabase Storage, optimizando el rendimiento del backend.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Limitación de Actualización de Contenido (SSG Puro)" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
Al usar Generación de Sitios Estáticos (SSG), los cambios en la galería dinámica no se reflejan hasta que termina un nuevo build de producción.

## Resultado actual:
Los concursos activos y nuevas colaboraciones requieren inmediatez que el SSG tradicional no ofrece por sí solo.

## Propuesta de solución:
Configurar Regeneración Estática Incremental (ISR) en el adaptador de Vercel para invalidar y reconstruir páginas específicas bajo demanda sin redeployar todo el sitio.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Arquitectura de Carpetas con Baja Escalabilidad" \
  --label "refactor,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
La carpeta src/components mezcla componentes transversales con específicos de galerías y talentos.

## Resultado actual:
Una estructura plana genera caos visual y dificultad de mantenimiento a medida que se añaden nuevas funcionalidades como "Escritura" o "Código".

## Propuesta de solución:
Organizar los archivos siguiendo la "Arquitectura de Gritos" (Screaming Architecture) o agrupando por "Features" para que la estructura refleje el dominio del proyecto.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Falta de Monitoreo de Experiencia de Usuario Real (RUM)" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
El proyecto confía en métricas de laboratorio (Lighthouse) pero no mide cómo cargan las imágenes en los dispositivos reales de la comunidad en Cuba.

## Resultado actual:
Las condiciones de red variables en la región exigen optimizaciones basadas en datos de campo para evitar altas tasas de rebote.

## Propuesta de solución:
Integrar el componente @casoon/astro-webvitals para capturar métricas como LCP e INP de usuarios reales y enviarlas a un endpoint de análisis.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Uso de Rutas de Importación Relativas Complejas" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
Se utilizan rutas como ../../components/gallery/ en los archivos de la galería.

## Resultado actual:
Esto aumenta la carga cognitiva del desarrollador y facilita errores al mover archivos de directorio.

## Propuesta de solución:
Configurar Alias de Rutas (@/*) en el archivo tsconfig.json para simplificar las importaciones y mejorar la legibilidad del código.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Optimización Manual de Imágenes Estáticas" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
Las imágenes en src/assets/ se procesan pero el proyecto no aprovecha plenamente los servicios de optimización en el borde (Edge).

## Resultado actual:
Los portafolios de fotografía pesados pueden degradar drásticamente el Largest Contentful Paint (LCP) si no se sirven en formatos como AVIF de forma dinámica.

## Propuesta de solución:
Habilitar el imageService en el adaptador de Vercel para que las imágenes se redimensionen y optimicen automáticamente en el CDN.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Buscador de Talentos Limitado al Lado del Cliente" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
El buscador actual en TalentsCards.tsx filtra sobre un array estático cargado en memoria.

## Resultado actual:
Si la comunidad llega a tener miles de talentos, descargar todo el JSON en el cliente afectará el rendimiento y el consumo de datos móviles.

## Propuesta de solución:
Migrar a búsqueda en el servidor (Server-side Search) utilizando API Routes de Astro y consultas Full-text search en PostgreSQL.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Ausencia de Pruebas Automatizadas (Unitarias y E2E)" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
La documentación menciona "Testing Manual" pero no hay una suite de pruebas automatizada integrada en el CI/CD.

## Resultado actual:
Las refactorizaciones en componentes críticos como DinamycGallery pueden introducir errores visuales o lógicos sin que el equipo lo note.

## Propuesta de solución:
Implementar Vitest para lógica de negocio y Playwright para asegurar que las rutas críticas (como el registro de concursos) funcionen en todos los navegadores.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Falta de Interactividad en Tiempo Real" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
Los concursos y colaboraciones no muestran actualizaciones instantáneas (ej. nuevas postulaciones) sin recargar la página.

## Resultado actual:
La naturaleza comunitaria de "Revolución Digital" se beneficia de la "presencia" y el feedback inmediato.

## Propuesta de solución:
Utilizar las capacidades de Realtime de Supabase para actualizar la UI de concursos automáticamente cuando se añaden nuevos registros a la base de datos.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Uso Excesivo de React para Componentes Sencillos" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
Se utilizan islas de React para funcionalidades que podrían resolverse con JavaScript estándar o componentes de Astro.

## Resultado actual:
Cada isla de React añade peso al bundle de JavaScript, lo que ralentiza la interactividad en redes móviles lentas.

## Propuesta de solución:
Migrar componentes puramente visuales a componentes de Astro (.astro) y usar scripts de cliente para interactividad ligera, reservando React solo para estados complejos.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Gestión Insegura de Variables de Entorno" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
Aunque se usan archivos .env, no hay una validación estricta de que las variables necesarias existan en el entorno de producción.

## Resultado actual:
Fallos en la conexión con futuras APIs o servicios de backend pueden causar errores 500 silenciosos si faltan llaves secretas.

## Propuesta de solución:
Utilizar astro:env para definir esquemas de variables de entorno con validación en tiempo de build y tipado estático.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Navegación entre Páginas con Recarga Completa" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
El paso entre /galeria y /talentos provoca una recarga total del navegador, perdiendo el estado de la aplicación.

## Resultado actual:
Esto degrada la percepción de "aplicación moderna" y aumenta el consumo de recursos al recargar el header y footer.

## Propuesta de solución:
Implementar View Transitions de Astro para permitir transiciones fluidas y persistencia de elementos entre rutas sin la sobrecarga de una SPA completa.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Falta de Localización e Internacionalización (i18n)" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
La plataforma está diseñada únicamente en español, limitando la visibilidad de los talentos ante empresas o colaboradores internacionales.

## Resultado actual:
Para cumplir la visión de "mostrar talento" a nivel global, el soporte multiidioma es fundamental.

## Propuesta de solución:
Configurar el sistema de enrutamiento i18n nativo de Astro para servir contenido en español e inglés mediante subdirectorios de URL.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Componentes con Props no Tipadas Rigurosamente" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
Algunos componentes Astro podrían estar aceptando props sin una interfaz TypeScript definida, facilitando errores de desarrollo.

## Resultado actual:
En un proyecto colaborativo, la falta de contratos claros en los componentes aumenta el tiempo de integración.

## Propuesta de solución:
Forzar el uso de la interfaz Props en todos los componentes .astro y activar el modo strict en el archivo tsconfig.json.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Riesgo de Cold Starts en Funciones Dinámicas" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
Al migrar a SSR para perfiles de usuario, las funciones serverless de Node.js podrían experimentar latencia en la primera carga.

## Resultado actual:
Un retraso de 1 segundo en cargar un perfil de talento puede ser la diferencia entre una contratación o un rebote.

## Propuesta de solución:
Evaluar el uso del Vercel Edge Runtime para tareas de renderizado ligero y autenticación, reduciendo los cold starts a menos de 5ms.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

gh issue create \
  --title "Falta de una Estrategia de Caching de API" \
  --label "enhancement,needs-triage" \
  --body "$(cat <<'EOF'
## Descripción:
Si el componente de galería llama a una API externa en cada renderizado de servidor, se consumen recursos innecesarios.

## Resultado actual:
Esto puede llevar a exceder las cuotas de Vercel y generar costos inesperados por uso de CPU.

## Propuesta de solución:
Implementar cabeceras Cache-Control agresivas o usar la funcionalidad de Data Cache de Vercel para reutilizar respuestas de API entre múltiples visitas.

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"

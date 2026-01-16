#!/bin/bash
# Script para crear issues automáticamente desde deficiencias normalizadas
# Uso: bash create-issues.sh

echo "🚀 Creando issues automáticamente..."
echo ""

gh issue create --title "[enhancement] Migrar datos de talentos de archivos estáticos a Headless CMS" --label "enhancement" --body "## Descripción:
La información de artistas reside en archivos .ts locales requiriendo redespliegue cada vez que se une un talento, limitando la agilidad editorial.

## Resultado esperado:
Los administradores deben poder actualizar perfiles de talentos sin necesidad de modificar código o desplegar nuevamente.

## Resultado actual:
Cada vez que se une un nuevo talento, se requiere modificar archivos en /src/data/ y realizar un nuevo despliegue completo.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Integrar Headless CMS (Sanity o Storyblok) para actualizar perfiles sin tocar código. Esto permitirá que los administradores gestionen el contenido de forma dinámica."

gh issue create --title "[enhancement] Implementar sistema de autenticación para gestión de perfiles" --label "enhancement" --body "## Descripción:
No existe pasarela de inicio de sesión para que los talentos gestionen sus propios perfiles, sobrecargando desarrolladores y limitando interacción personalizada.

## Resultado esperado:
Los talentos deben poder autenticarse y gestionar sus propios perfiles de manera independiente.

## Resultado actual:
No existe sistema de autenticación. Los desarrolladores deben actualizar manualmente toda la información de los talentos.

## Impacto en usuarios:
Alto

## Propuesta de solución / pistas:
Implementar Clerk o Auth.js para autogestión de perfiles. Esto reducirá la carga en el equipo de desarrollo y permitirá a los usuarios mantener sus propios datos actualizados."

gh issue create --title "[enhancement] Migrar a base de datos relacional escalable" --label "enhancement" --body "## Descripción:
El almacenamiento en archivos JSON/TS impide consultas complejas y afectará rendimiento con crecimiento de datos.

## Resultado esperado:
El sistema debe soportar consultas complejas como filtrar talentos por múltiples habilidades simultáneamente con alto rendimiento.

## Resultado actual:
Los datos están en archivos estáticos JSON/TS, limitando capacidades de consulta y escalabilidad.

## Impacto en usuarios:
Alto

## Propuesta de solución / pistas:
Adoptar Supabase (PostgreSQL) para manejar relaciones complejas con alto rendimiento. Esto permitirá consultas avanzadas y mejor escalabilidad a medida que crezca la comunidad."

gh issue create --title "[bug] Configurar Content Security Policy (CSP)" --label "bug" --body "## Descripción:
Sin CSP explícita, existe riesgo de inyección de scripts maliciosos en una plataforma que mostrará contenido de diversos creadores.

## Resultado esperado:
La plataforma debe tener protección contra ataques XSS mediante una política de seguridad de contenido configurada adecuadamente.

## Resultado actual:
No se ha configurado explícitamente una Content Security Policy en el proyecto.

## Impacto en usuarios:
Alto

## Propuesta de solución / pistas:
Activar CSP nativa en Astro 5.9+ con experimentalStaticHeaders. Esto protegerá la plataforma contra scripts maliciosos inyectados."

gh issue create --title "[enhancement] Implementar sistema de carga directa de archivos" --label "enhancement" --body "## Descripción:
No existe flujo definido para que artistas suban obras directamente, causando potenciales timeouts y costos elevados en serverless.

## Resultado esperado:
Los artistas deben poder subir sus obras directamente sin intermediarios, con un sistema optimizado que evite timeouts.

## Resultado actual:
No hay un flujo definido para carga de archivos por parte de los usuarios.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Implementar Presigned URLs para subida directa a S3 o Supabase Storage. Esto optimizará el rendimiento del backend y reducirá costos."

gh issue create --title "[enhancement] Configurar Incremental Static Regeneration (ISR)" --label "enhancement" --body "## Descripción:
Con SSG puro, cambios en galería no se reflejan hasta nuevo build, limitando inmediatez para concursos y colaboraciones activas.

## Resultado esperado:
Los cambios en contenido dinámico (concursos, colaboraciones) deben reflejarse rápidamente sin necesidad de redesplegar todo el sitio.

## Resultado actual:
Los cambios requieren un build completo de producción para reflejarse en el sitio.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Configurar ISR en adaptador de Vercel para invalidar páginas específicas bajo demanda. Esto permitirá actualizar contenido sin redespliegue completo."

gh issue create --title "[refactor] Reorganizar arquitectura de componentes por features" --label "refactor" --body "## Descripción:
La carpeta src/components mezcla componentes transversales con específicos, generando caos visual y dificultad de mantenimiento.

## Resultado esperado:
La estructura de carpetas debe reflejar claramente el dominio del proyecto y facilitar la localización de componentes.

## Resultado actual:
src/components tiene una estructura plana que mezcla diferentes tipos de componentes sin organización clara.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Aplicar Screaming Architecture o agrupación por Features para reflejar el dominio del proyecto. Esto mejorará la mantenibilidad a medida que se añadan nuevas funcionalidades."

gh issue create --title "[enhancement] Implementar Real User Monitoring (RUM)" --label "enhancement" --body "## Descripción:
El proyecto solo usa métricas de laboratorio sin medir cómo cargan imágenes en dispositivos reales bajo condiciones de red variables en Cuba.

## Resultado esperado:
Deben recopilarse métricas de rendimiento de usuarios reales para optimizar basándose en datos de campo.

## Resultado actual:
Solo se confía en métricas de laboratorio (Lighthouse) sin datos de usuarios reales.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Integrar @casoon/astro-webvitals para capturar LCP e INP de usuarios reales. Esto permitirá optimizar basándose en condiciones reales de red."

gh issue create --title "[refactor] Configurar alias de rutas para importaciones" --label "refactor" --body "## Descripción:
Rutas como ../../components/gallery/ aumentan carga cognitiva y facilitan errores al mover archivos.

## Resultado esperado:
Las importaciones deben ser claras y simples usando alias de rutas consistentes.

## Resultado actual:
Se utilizan rutas de importación relativas complejas que dificultan el mantenimiento.

## Impacto en usuarios:
Bajo

## Propuesta de solución / pistas:
Configurar alias (@/*) en tsconfig.json para simplificar importaciones. Esto mejorará la legibilidad del código."

gh issue create --title "[enhancement] Habilitar optimización de imágenes en Edge CDN" --label "enhancement" --body "## Descripción:
No se aprovecha optimización en el borde, impactando negativamente LCP en portafolios de fotografía pesados.

## Resultado esperado:
Las imágenes deben optimizarse automáticamente en formatos modernos (AVIF, WebP) y redimensionarse dinámicamente en el CDN.

## Resultado actual:
Las imágenes se procesan manualmente sin aprovechar servicios de optimización en el borde.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Habilitar imageService en adaptador de Vercel para optimización automática en CDN. Esto mejorará significativamente el LCP."

gh issue create --title "[enhancement] Migrar búsqueda de talentos a server-side" --label "enhancement" --body "## Descripción:
El buscador actual filtra sobre array estático en memoria, lo que afectará rendimiento con miles de talentos.

## Resultado esperado:
La búsqueda debe ser eficiente incluso con miles de talentos, sin descargar todos los datos al cliente.

## Resultado actual:
El buscador en TalentsCards.tsx filtra sobre un array completo cargado en memoria del cliente.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Implementar búsqueda en servidor con API Routes de Astro y Full-text search en PostgreSQL. Esto optimizará el rendimiento y reducirá consumo de datos móviles."

gh issue create --title "[enhancement] Implementar suite de pruebas automatizadas" --label "enhancement" --body "## Descripción:
Sin pruebas automatizadas en CI/CD, refactorizaciones pueden introducir errores visuales o lógicos sin detectarlos.

## Resultado esperado:
El proyecto debe tener cobertura de pruebas automatizadas para prevenir regresiones.

## Resultado actual:
La documentación menciona testing manual pero no hay suite de pruebas automatizada integrada en CI/CD.

## Impacto en usuarios:
Alto

## Propuesta de solución / pistas:
Implementar Vitest para lógica de negocio y Playwright para rutas críticas. Esto asegurará la calidad del código en refactorizaciones futuras."

gh issue create --title "[enhancement] Implementar actualizaciones en tiempo real para concursos" --label "enhancement" --body "## Descripción:
Concursos y colaboraciones no muestran actualizaciones instantáneas sin recargar, perdiendo oportunidad de feedback inmediato comunitario.

## Resultado esperado:
Los usuarios deben ver actualizaciones instantáneas en concursos y colaboraciones sin necesidad de recargar la página.

## Resultado actual:
No hay interactividad en tiempo real, requiriendo recarga manual para ver nuevas postulaciones.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Utilizar capacidades Realtime de Supabase para actualizar UI automáticamente. Esto mejorará la experiencia comunitaria con feedback inmediato."

gh issue create --title "[refactor] Reducir uso de islas React en componentes sencillos" --label "refactor" --body "## Descripción:
Islas de React se usan para funcionalidades simples, añadiendo peso al bundle y ralentizando interactividad en redes móviles lentas.

## Resultado esperado:
Solo los componentes con estado complejo deben usar React, optimizando el bundle de JavaScript.

## Resultado actual:
Se utilizan islas de React incluso para componentes que podrían resolverse con JavaScript estándar o componentes de Astro.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Migrar componentes visuales a .astro y scripts de cliente, reservando React para estados complejos. Esto reducirá el tamaño del bundle."

gh issue create --title "[bug] Validar variables de entorno con astro:env" --label "bug" --body "## Descripción:
Sin validación estricta de variables necesarias, fallos en APIs pueden causar errores 500 silenciosos en producción.

## Resultado esperado:
Las variables de entorno deben validarse en tiempo de build con tipado estático.

## Resultado actual:
Se usan archivos .env pero sin validación estricta de que las variables necesarias existan en producción.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Usar astro:env para esquemas con validación en tiempo de build y tipado estático. Esto prevendrá errores silenciosos en producción."

gh issue create --title "[enhancement] Implementar View Transitions de Astro" --label "enhancement" --body "## Descripción:
La navegación entre páginas provoca recarga total, perdiendo estado y aumentando consumo de recursos.

## Resultado esperado:
La navegación debe ser fluida sin recargas completas, manteniendo elementos persistentes como header y footer.

## Resultado actual:
La navegación entre /galeria y /talentos provoca recarga completa del navegador.

## Impacto en usuarios:
Bajo

## Propuesta de solución / pistas:
Implementar View Transitions para transiciones fluidas y persistencia de elementos. Esto mejorará la percepción de aplicación moderna."

gh issue create --title "[enhancement] Implementar soporte multiidioma (i18n)" --label "enhancement" --body "## Descripción:
La plataforma solo está en español, limitando visibilidad de talentos ante empresas o colaboradores internacionales.

## Resultado esperado:
La plataforma debe estar disponible en múltiples idiomas para alcanzar audiencia global.

## Resultado actual:
El sitio está diseñado únicamente en español.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Configurar sistema de enrutamiento i18n nativo de Astro para español e inglés. Esto cumplirá con la visión de mostrar talento a nivel global."

gh issue create --title "[refactor] Tipar rigurosamente props de componentes" --label "refactor" --body "## Descripción:
Algunos componentes aceptan props sin interfaz TypeScript, facilitando errores y aumentando tiempo de integración en proyecto colaborativo.

## Resultado esperado:
Todos los componentes deben tener contratos claros con interfaces TypeScript definidas.

## Resultado actual:
Algunos componentes Astro aceptan props sin interfaz TypeScript definida.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Forzar interfaz Props en componentes .astro y activar modo strict en tsconfig.json. Esto mejorará la experiencia de desarrollo colaborativo."

gh issue create --title "[enhancement] Optimizar cold starts con Vercel Edge Runtime" --label "enhancement" --label "help wanted" --body "## Descripción:
Funciones serverless de Node.js en SSR pueden tener latencia significativa en primera carga, afectando experiencia de usuario.

## Resultado esperado:
Las funciones dinámicas deben responder con latencia mínima incluso en cold starts.

## Resultado actual:
Al migrar a SSR, las funciones serverless de Node.js podrían experimentar latencia en la primera carga.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Evaluar Vercel Edge Runtime para reducir cold starts a menos de 5ms. Esto garantizará experiencia de usuario óptima incluso en primeras cargas."

gh issue create --title "[enhancement] Implementar estrategia de caching de API" --label "enhancement" --body "## Descripción:
Llamadas a API en cada renderizado consumen recursos innecesarios y pueden exceder cuotas de Vercel.

## Resultado esperado:
Las respuestas de API deben cachearse apropiadamente para reutilizarse entre múltiples visitas.

## Resultado actual:
Si el componente de galería llama a una API externa en cada renderizado de servidor, se consumen recursos innecesarios.

## Impacto en usuarios:
Medio

## Propuesta de solución / pistas:
Implementar cabeceras Cache-Control o usar Data Cache de Vercel para reutilizar respuestas. Esto evitará exceder cuotas y reducirá costos."

echo ""
echo "✅ Issues creados exitosamente!"

# Storage Seed Branch

Esta rama existe únicamente para servir como **seed inicial de contenido para la rama principal**.
No contiene lógica de aplicación ni código funcional.

## Contenido

Esta rama contiene el archivo [`copy.json`](./copy.json) con la configuración de los archivos que serán copiados

## Uso

Esta rama será leída por el script `storage-seed.ts` de la rama principal, que se encargará de copiar los archivos especificados en `copy.json` a la ubicación correspondiente.

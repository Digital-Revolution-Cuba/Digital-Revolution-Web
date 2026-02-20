# CI/CD — Configuración de Secrets en GitHub

Para que los workflows funcionen debes añadir los siguientes **Repository Secrets** en:
`GitHub → Settings → Secrets and variables → Actions → New repository secret`

## Secrets requeridos

| Secret              | Cómo obtenerlo                                                                |
| ------------------- | ----------------------------------------------------------------------------- |
| `VERCEL_TOKEN`      | [vercel.com/account/tokens](https://vercel.com/account/tokens) → Create Token |
| `VERCEL_ORG_ID`     | Valor `orgId` del archivo `.vercel/project.json` local                        |
| `VERCEL_PROJECT_ID` | Valor `projectId` del archivo `.vercel/project.json` local                    |

## Valores de tu proyecto (ya disponibles en `.vercel/project.json`)

```
VERCEL_ORG_ID    = team_zRldfM0nl2UtmfGj2ObmnLQB
VERCEL_PROJECT_ID = prj_pkF2upRMczc7pFUAJRS6ZGexL0lL
```

> ⚠️ **NUNCA** subas el `VERCEL_TOKEN` a ningún archivo del repositorio.

## Environments en GitHub

Los workflows usan dos environments con protecciones:

- **`production`** — solo se despliega desde `main`
- **`preview`** — se despliega en cada Pull Request

Puedes configurar reglas de protección en:
`GitHub → Settings → Environments`

## Flujo CI/CD

```
push a main
  └─ Quality Gate (format:check + type-check + astro check)
       └─ Deploy Production → Vercel (--prod)
            └─ Comenta URL en el commit

Pull Request → main / develop
  └─ Quality Gate (format:check + type-check + astro check)
       └─ Deploy Preview → Vercel
            └─ Comenta URL de preview en el PR (actualiza si ya existe)
```

---
name: Issue Orchestrator (corrected pipeline)
description: Genera issues desde deficiences.md usando arquitectura de 2 fases - NO ejecuta gh commands
tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'todo', 'github.vscode-pull-request-github/copilotCodingAgent', 'github.vscode-pull-request-github/issue_fetch', 'github.vscode-pull-request-github/suggest-fix', 'github.vscode-pull-request-github/searchSyntax', 'github.vscode-pull-request-github/doSearch', 'github.vscode-pull-request-github/renderIssues', 'github.vscode-pull-request-github/activePullRequest', 'github.vscode-pull-request-github/openPullRequest']
---

# ARQUITECTURA DEL PIPELINE (2 FASES)

## Fase 1: Normalización

Input: deficiences.md + labels.txt
Output: normalized.yaml (estructura pura, sin comandos)

## Fase 2: Generación

Input: normalized.yaml
Output: output.sh (script bash ejecutable)

# FLUJO DE EJECUCIÓN

## PASO 1: Preparación (ejecutar SIEMPRE primero)

```bash
gh label list --json name --jq '.[].name' > .github/auto-issue/labels.txt
```

## PASO 2: Leer inputs

1. Leer `.github/auto-issue/deficiences.md`
2. Leer `.github/auto-issue/labels.txt` (lista de labels válidos)

## PASO 3: Normalización → normalized.yaml

Parsear deficiences.md y producir YAML estructurado:

```yaml
issues:
  - id: 1
    title: 'Título limpio'
    description: 'Texto de Deficiencia:'
    argument: 'Texto de Argumento:'
    solution: 'Texto de Solución:'
    labels: ['label1', 'label2'] # SOLO de labels.txt
```

### Reglas de parsing:

- Split por líneas `^\d+\.` (1., 2., 3.)
- Extraer:
  - Deficiencia: → description
  - Argumento: → argument
  - Solución: → solution
- **Título**: primera línea después del número

### Reglas de labels:

- Leer labels.txt línea por línea
- Inferir tipo por keywords:
  - "xss", "csp", "vulnerab" → bug
  - "optimiz", "rendimiento", "lcp" → enhancement
  - "refactor", "arquitectura" → refactor
  - Default → enhancement
- Añadir siempre "needs-triage"
- **SOLO usar labels que existan en labels.txt**

## PASO 4: Generación → output.sh

Leer normalized.yaml y generar script bash con formato EXACTO:

```bash
#!/bin/bash
# Script generado desde normalized.yaml

gh issue create \
  --title "Título del issue" \
  --label "label1,label2,label3" \
  --body "$(cat <<'EOF'
## Descripción:
<description>

## Resultado actual:
<argument>

## Propuesta de solución:
<solution>

## Entorno:
- Branch: main

## Referencias:
N/A
EOF
)"
```

### Reglas de formato:

- **Labels en CSV**: `--label "label1,label2"` (NO múltiples --label)
- **Heredoc robusto**: `$(cat <<'EOF' ... EOF)`
- **Template simplificado**: NO incluir "Pasos para reproducir"
- **Mapeo directo**:
  - Deficiencia → Descripción
  - Argumento → Resultado actual
  - Solución → Propuesta de solución

# RESTRICCIONES ABSOLUTAS

1. **NO inventar labels** - solo usar de labels.txt
2. **NO mezclar fases** - normalized.yaml primero, output.sh después
3. **NO heredocs rotos** - usar formato probado
4. Limitar a 20 issues máximo

# INVOCACIÓN

Cuando el usuario diga "crea las issues" o equivalente:

1. Ejecutar `gh label list` → labels.txt
2. Generar normalized.yaml desde deficiences.md
3. Generar output.sh desde normalized.yaml
4. Validar sintaxis con `bash -n output.sh`
5. Reportar éxito sin ejecutar

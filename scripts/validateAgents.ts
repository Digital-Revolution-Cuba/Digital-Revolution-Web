/**
 * Script de validación del sistema de agentes
 *
 * Verifica que todos los agentes tengan la estructura correcta:
 * - Frontmatter con metadata
 * - Sección de Anti-Patterns
 * - Sección de Workflow/Proceso
 * - Sección de Coordinación
 * - Ejemplos de código
 *
 * @usage pnpm tsx scripts/validateAgents.ts
 */

import { readdir, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface AgentValidation {
  name: string;
  hasFrontmatter: boolean;
  hasAntiPatterns: boolean;
  hasWorkflow: boolean;
  hasCoordination: boolean;
  hasExamples: boolean;
  antiPatternCount: number;
  exampleCount: number;
}

async function validateAgents() {
  const agentsDir = join(__dirname, '..', '.github', 'agents');
  const files = await readdir(agentsDir);

  const agentFiles = files.filter((f) => f.endsWith('.agent.md'));

  console.log('🤖 Sistema de Agentes - Validación\n');
  console.log(`📊 Total de agentes: ${agentFiles.length}\n`);

  const results: AgentValidation[] = [];

  for (const agentFile of agentFiles) {
    const content = await readFile(join(agentsDir, agentFile), 'utf-8');

    const validation: AgentValidation = {
      name: agentFile,
      hasFrontmatter: content.startsWith('---'),
      hasAntiPatterns:
        content.includes('## 🚫 Anti-Patterns') ||
        content.includes('## Anti-Patterns'),
      hasWorkflow:
        content.includes('## Workflow') ||
        content.includes('## 🔄') ||
        content.includes('## 📋'),
      hasCoordination:
        content.includes('## 🤝 Coordinación') ||
        content.includes('## Coordinación'),
      hasExamples:
        content.includes('```typescript') ||
        content.includes('```tsx') ||
        content.includes('```javascript'),
      antiPatternCount: (content.match(/❌/g) || []).length,
      exampleCount: (content.match(/```/g) || []).length / 2, // Dividir por 2 porque hay apertura y cierre
    };

    results.push(validation);
  }

  // Mostrar resultados
  console.log(
    '┌─────────────────────────────────┬──────────┬──────────────┬──────────┬──────────────┬──────────┬─────────────┬──────────┐',
  );
  console.log(
    '│ Agente                          │ Metadata │ Anti-Patterns│ Workflow │ Coordinación │ Ejemplos │ Anti-Ptrns# │ Ejemplos#│',
  );
  console.log(
    '├─────────────────────────────────┼──────────┼──────────────┼──────────┼──────────────┼──────────┼─────────────┼──────────┤',
  );

  let allValid = true;

  for (const result of results) {
    const isValid =
      result.hasFrontmatter &&
      result.hasAntiPatterns &&
      result.hasWorkflow &&
      result.hasExamples &&
      result.antiPatternCount >= 3 &&
      result.exampleCount >= 3;

    if (!isValid) allValid = false;

    const status = (val: boolean) => (val ? '✅' : '❌');

    const name = result.name.padEnd(31);
    const metadata = status(result.hasFrontmatter).padEnd(8);
    const antiPatterns = status(result.hasAntiPatterns).padEnd(13);
    const workflow = status(result.hasWorkflow).padEnd(9);
    const coordination = status(result.hasCoordination).padEnd(13);
    const examples = status(result.hasExamples).padEnd(9);
    const apCount = result.antiPatternCount.toString().padEnd(11);
    const exCount = Math.floor(result.exampleCount).toString().padEnd(9);

    console.log(
      `│ ${name} │ ${metadata} │ ${antiPatterns} │ ${workflow} │ ${coordination} │ ${examples} │ ${apCount} │ ${exCount}│`,
    );
  }

  console.log(
    '└─────────────────────────────────┴──────────┴──────────────┴──────────┴──────────────┴──────────┴─────────────┴──────────┘\n',
  );

  // Estadísticas
  const totalAntiPatterns = results.reduce(
    (sum, r) => sum + r.antiPatternCount,
    0,
  );
  const totalExamples = results.reduce(
    (sum, r) => sum + Math.floor(r.exampleCount),
    0,
  );
  const avgAntiPatterns = (totalAntiPatterns / results.length).toFixed(1);
  const avgExamples = (totalExamples / results.length).toFixed(1);

  console.log('📈 Estadísticas:');
  console.log(`   • Anti-patterns totales: ${totalAntiPatterns}`);
  console.log(`   • Anti-patterns promedio: ${avgAntiPatterns} por agente`);
  console.log(`   • Ejemplos totales: ${totalExamples}`);
  console.log(`   • Ejemplos promedio: ${avgExamples} por agente\n`);

  // Verificar cobertura de roles
  const hasOrchestrator = agentFiles.some((f) => f.includes('orchestrator'));
  const hasArchitecture = agentFiles.some((f) => f.includes('architecture'));
  const hasComponent = agentFiles.some((f) => f.includes('component'));
  const hasAPI = agentFiles.some((f) => f.includes('api'));
  const hasRefactor = agentFiles.some((f) => f.includes('refactor'));
  const hasTesting = agentFiles.some((f) => f.includes('testing'));
  const hasPerformance = agentFiles.some((f) => f.includes('performance'));
  const hasSecurity = agentFiles.some((f) => f.includes('security'));
  const hasDocs = agentFiles.some((f) => f.includes('documentation'));

  console.log('🎯 Cobertura de Roles:');
  console.log(`   ${hasOrchestrator ? '✅' : '❌'} Orchestrator Agent`);
  console.log(`   ${hasArchitecture ? '✅' : '❌'} Architecture Agent`);
  console.log(`   ${hasComponent ? '✅' : '❌'} Component Agent`);
  console.log(`   ${hasAPI ? '✅' : '❌'} API Agent`);
  console.log(`   ${hasRefactor ? '✅' : '❌'} Refactor Agent`);
  console.log(`   ${hasTesting ? '✅' : '❌'} Testing Agent`);
  console.log(`   ${hasPerformance ? '✅' : '❌'} Performance Agent`);
  console.log(`   ${hasSecurity ? '✅' : '❌'} Security Agent`);
  console.log(`   ${hasDocs ? '✅' : '❌'} Documentation Agent\n`);

  const coreAgentsComplete =
    hasOrchestrator &&
    hasArchitecture &&
    hasComponent &&
    hasAPI &&
    hasRefactor &&
    hasTesting &&
    hasPerformance &&
    hasSecurity &&
    hasDocs;

  // Resultado final
  if (allValid && coreAgentsComplete) {
    console.log('✅ SISTEMA DE AGENTES VÁLIDO\n');
    console.log('   Todos los agentes tienen la estructura correcta y');
    console.log('   todos los roles core están cubiertos.\n');
    process.exit(0);
  } else {
    console.log('❌ SISTEMA DE AGENTES INCOMPLETO\n');

    if (!allValid) {
      console.log('   Algunos agentes no cumplen con los requisitos mínimos:');
      console.log('   • Frontmatter con metadata');
      console.log('   • Sección de Anti-Patterns (mínimo 3)');
      console.log('   • Sección de Workflow');
      console.log('   • Ejemplos de código (mínimo 3)\n');
    }

    if (!coreAgentsComplete) {
      console.log('   Faltan agentes core del sistema.\n');
    }

    process.exit(1);
  }
}

// Ejecutar
validateAgents().catch((error) => {
  console.error('❌ Error al validar agentes:', error);
  process.exit(1);
});

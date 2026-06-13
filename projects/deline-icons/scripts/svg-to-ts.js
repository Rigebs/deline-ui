const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, '../svg-source');
const outputFile = path.join(__dirname, '../src/lib/icon-registry.ts');

// Verificar que existe la carpeta svg-source
if (!fs.existsSync(svgDir)) {
  console.error('❌ La carpeta svg-source/ no existe');
  process.exit(1);
}

// Leer todos los archivos SVG
const files = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));

if (files.length === 0) {
  console.error('❌ No se encontraron archivos SVG en svg-source/');
  process.exit(1);
}

const icons = {};

files.forEach(file => {
  const iconName = path.basename(file, '.svg');
  let svgContent = fs.readFileSync(path.join(svgDir, file), 'utf-8');
  
  // Limpiar el SVG
  svgContent = svgContent
    .replace(/<!--[\s\S]*?-->/g, '') // Remover comentarios
    .replace(/\n\s*/g, ' ')          // Remover saltos de línea
    .replace(/\s{2,}/g, ' ')         // Remover espacios múltiples
    .replace(/>\s+</g, '><')         // Remover espacios entre tags
    // --- NUEVAS LÍNEAS PARA EL COLOR ---
    .replace(/fill="((?!none|currentColor)[^"]+)"/g, 'fill="currentColor"')
    .replace(/stroke="((?!none|currentColor)[^"]+)"/g, 'stroke="currentColor"')
    // ------------------------------------
    .trim();
  
  icons[iconName] = svgContent;
});

// Generar el archivo TypeScript
const iconNames = Object.keys(icons).map(name => `'${name}'`).join(' | ');

const output = `// 🤖 Auto-generated file. Do not edit manually.
// Generated from SVG files on ${new Date().toISOString()}

export const ICON_REGISTRY: Record<string, string> = {
${Object.entries(icons).map(([name, svg]) => 
  `  '${name}': \`${svg}\`,`
).join('\n')}
};

// Total icons: ${files.length}
export const ICON_NAMES = [
${Object.keys(icons).map(name => `  '${name}'`).join(',\n')}
] as const;

export type IconName = ${iconNames};
`;

fs.writeFileSync(outputFile, output, 'utf-8');

console.log(`✅ Generated ${files.length} icons:`);
files.forEach(f => console.log(`   • ${path.basename(f, '.svg')}`));
console.log(`📄 Output: ${outputFile}`);
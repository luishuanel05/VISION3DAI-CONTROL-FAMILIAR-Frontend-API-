import fs from'node:fs';import path from'node:path';const raiz=path.resolve('.');let errores=[];function caminar(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory()&&!['.git','node_modules','datos'].includes(e.name))caminar(p);else if(e.isFile()&&['.js','.json'].includes(path.extname(p))){const t=fs.readFileSync(p,'utf8');if(/from ['"]express['"]|require\(['"]express['"]\)/.test(t))errores.push(`Express detectado en ${p}`)}}}caminar(raiz);for(const obligatorio of ['backend/servidor.js','backend/base-datos/esquema.sql','frontend/dashboard.html','docs/richard/08-INTEGRACION_VISION3D.md'])if(!fs.existsSync(path.join(raiz,obligatorio)))errores.push(`Falta ${obligatorio}`);
for (const archivo of fs.readdirSync(path.join(raiz, 'frontend')).filter(nombre => nombre.endsWith('.html'))) {
  const contenido = fs.readFileSync(path.join(raiz, 'frontend', archivo), 'utf8');
  if (/\sstyle=/.test(contenido)) errores.push(`Estilo inline detectado en frontend/${archivo}`);
  if (contenido.split(/\r?\n/).some(linea => linea.length > 240)) errores.push(`Línea HTML excesivamente larga en frontend/${archivo}`);
}

if(errores.length){console.error(errores.join('\n'));process.exit(1)}console.log('Verificación completada: estructura válida y sin Express.');
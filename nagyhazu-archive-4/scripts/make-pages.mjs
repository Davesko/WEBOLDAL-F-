import { mkdir,copyFile } from 'node:fs/promises';
for(let id=1;id<=10;id++){
 await mkdir(`dist/work/${id}`,{recursive:true});
 await copyFile('dist/index.html',`dist/work/${id}/index.html`);
}
console.log('Ten directly addressable photograph pages exported.');

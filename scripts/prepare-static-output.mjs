import { access, cp, rename, rm } from 'node:fs/promises';

const clientDirectory = new URL('../dist/client/', import.meta.url);
const clientIndex = new URL('index.html', clientDirectory);
const outputDirectory = new URL('../dist/', import.meta.url);
const stagingDirectory = new URL('../.dist-static-staging/', import.meta.url);

await access(clientIndex);
await rm(stagingDirectory, { recursive: true, force: true });
await cp(clientDirectory, stagingDirectory, { recursive: true });
await rm(outputDirectory, { recursive: true, force: true });
await rename(stagingDirectory, outputDirectory);

console.log('Static output prepared in dist/');

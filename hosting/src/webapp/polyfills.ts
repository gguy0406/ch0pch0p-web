/* eslint-disable @typescript-eslint/no-explicit-any */
// Import the Buffer class from the 'buffer' package
import { Buffer } from 'buffer';

// Assign the Buffer class to the global scope
(window as any).global = window;
(window as any).process = {};
(window as any).process = window;
(window as any).process.browser = true;
(window as any).process.version = '';
(window as any).process.versions = { node: false };
(window as any).global.Buffer = Buffer;

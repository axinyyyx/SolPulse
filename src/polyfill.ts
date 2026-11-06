import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
  (window as unknown as { global: typeof window }).global = window;
}

if (typeof globalThis !== 'undefined') {
  (globalThis as unknown as { Buffer: typeof Buffer }).Buffer = (globalThis as unknown as { Buffer: typeof Buffer }).Buffer || Buffer;
}

export { Buffer };

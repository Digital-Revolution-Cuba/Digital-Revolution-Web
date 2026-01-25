/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare module '*.avif' {
  const value: {
    src: string;
    width: number;
    height: number;
    format: 'avif';
  };
  export default value;
}

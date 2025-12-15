/// <reference types="astro/client" />

declare module '*.avif' {
  const value: {
    src: string;
    width: number;
    height: number;
    format: 'avif';
  };
  export default value;
}

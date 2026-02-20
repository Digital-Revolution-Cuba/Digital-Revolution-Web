export interface Collaboration {
  name: string;
  description: string;
  logo: string;
  url?: string;
}

export const collaborations: Collaboration[] = [
  {
    name: "Empresa Alpha",
    description: "Plataforma web escalable para gestión empresarial.",
    logo: "/logos/alpha.svg",
    url: "#",
  },
  {
    name: "Startup Beta",
    description: "Aplicación moderna enfocada en experiencia de usuario.",
    logo: "/logos/beta.svg",
    url: "#",
  },
  {
    name: "Proyecto Gamma",
    description: "Sistema robusto con arquitectura limpia y segura.",
    logo: "/logos/gamma.svg",
    url: "#",
  },
];

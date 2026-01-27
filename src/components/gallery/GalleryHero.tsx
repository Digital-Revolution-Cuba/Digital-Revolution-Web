import '../../styles/components/gallery.css';

// SVG Icons inline
const Camera = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const Palette = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const Music = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

export function HeroSection() {
  return (
    <section className="hero">
      {/* Background */}
      <div className="hero__bg">
        <div className="hero__bg-base" />

        <svg
          className="hero__bg-orange"
          viewBox="0 0 500 400"
          preserveAspectRatio="none"
        >
          <polygon points="500,0 500,400 100,0" />
        </svg>

        <div className="hero__bg-cyan" />

        <svg
          className="hero__bg-diagonal"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 850,0 0,450" />
        </svg>
      </div>

      {/* Content */}
      <div className="hero__content">
        <div className="hero__layout">
          {/* Left */}
          <div className="hero__left">
            <h1 className="hero__title hero__title-primary">GALERÍA</h1>

            <p className="hero__description">
              Descubre obras únicas de creativos excepcionales. Conecta con
              artistas y encuentra inspiración para tus proyectos.
            </p>

            <div className="hero__actions">
              <button className="border-brand-navy text-accent-orange hover:bg-accent-cyan bg-brand-navy hover:text-brand-dark z-10 rounded-lg border px-8 py-3 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(52,223,222,0.4)]">
                Ver Galeria
              </button>
              <button className="border-brand-navy text-accent-orange hover:bg-accent-cyan bg-brand-navy hover:text-brand-dark rounded-lg border px-8 py-3 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(52,223,222,0.4)]">
                Subir Otra
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="hero__right">
            <div className="hero__media">
              {/* Main */}
              <div className="hero__media-main">
                <div className="hero__media-content">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaGVoMYgexcg0ul46xRd4XBTsxD8vq9qmMuQ&s?height=400&width=320"
                    alt="Artista destacado"
                    width={320}
                    height={400}
                  />
                  <div className="hero__media-caption">
                    <Camera />
                    <span>Fotografía</span>
                  </div>
                </div>
              </div>

              {/* Secondary */}
              <div className="hero__media-secondary">
                <div className="hero__media-content secondary">
                  <img
                    src="https://www.shutterstock.com/shutterstock/photos/2607564367/display_1500/stock-photo-inner-world-of-women-creative-digital-collage-artwork-mixed-media-graphic-design-elements-2607564367.jpg?height=200&width=180"
                    alt="Ilustración digital"
                    width={180}
                    height={200}
                  />
                  <div className="hero__media-caption">
                    <Palette />
                    <span>Ilustración</span>
                  </div>
                </div>
              </div>

              {/* Tertiary */}
              <div className="hero__media-tertiary">
                <div className="hero__media-content tertiary">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661962387472-553d96ed01a3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=180&width=160"
                    alt="Música"
                    width={160}
                    height={180}
                  />
                  <div className="hero__media-caption">
                    <Music />
                    <span>Música</span>
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div className="hero__dot-accent" />
              <div className="hero__dot-primary" />
              <div className="hero__dot-neutral" />

              {/* Geometric Decorative Elements */}
              <div
                className="hero__decorative"
                style={{ top: '15%', left: '10%', width: '200px' }}
              >
                <div
                  className="hero__line-horizontal"
                  style={{ width: '200px' }}
                />
              </div>

              <div
                className="hero__decorative"
                style={{
                  top: '35%',
                  right: '5%',
                  width: '3px',
                  height: '100px',
                }}
              >
                <div
                  className="hero__line-vertical"
                  style={{ height: '100px' }}
                />
              </div>

              <div
                className="hero__decorative"
                style={{ top: '20%', right: '15%' }}
              >
                <div
                  className="hero__circle-outline accent"
                  style={{ width: '80px', height: '80px' }}
                />
              </div>

              <div
                className="hero__decorative"
                style={{ bottom: '10%', left: '5%' }}
              >
                <div
                  className="hero__circle-outline primary"
                  style={{ width: '60px', height: '60px' }}
                />
              </div>

              <div
                className="hero__decorative"
                style={{ top: '40%', left: '8%' }}
              >
                <div className="hero__triangle accent" />
              </div>

              <div
                className="hero__decorative"
                style={{ bottom: '25%', right: '12%' }}
              >
                <div className="hero__triangle primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import type { ConcursoCardData } from "../../types/concursos.types";

interface Props extends ConcursoCardData {
  // keep props shape compatible with existing usages
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export default function ConcursoCard(props: Props) {
  const { id, slug, title, category, status, image, imageAlt, fechaCierre, featured } = props;

  return (
    <article className={`concurso-card ${featured ? "featured" : ""}`} data-id={id}>
      <a href={`/concursos/${slug}`} className="card-link">
        <div className="card-image-wrapper">
          <img src={image} alt={imageAlt} className="card-image" loading="lazy" />
          <div className="card-overlay"></div>
          {featured && <span className="featured-badge">Destacado</span>}
          <span className={`status-badge status-${status}`}>{status}</span>
        </div>

        <div className="card-content">
          <div className="card-category">{category}</div>

          <h3 className="card-title">{title}</h3>

          <div className="card-footer">
            <div className="card-date">
              <svg
                className="icon-calendar"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12.667 2.667H3.333A.667.667 0 0 0 2.667 3.333v9.334a.667.667 0 0 0 .666.666h9.334a.667.667 0 0 0 .666-.666V3.333a.667.667 0 0 0-.666-.666ZM10.667 1.333v2.667M5.333 1.333v2.667M2.667 6.667h10.666"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Cierre: {formatDate(fechaCierre)}</span>
            </div>

            <span className="card-cta">
              Ver detalles
              <svg
                className="icon-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.333 8h9.334M9.333 4.667 12.667 8l-3.334 3.333"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}

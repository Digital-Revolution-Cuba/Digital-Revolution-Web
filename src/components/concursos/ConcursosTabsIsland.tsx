/**
 * ConcursosTabsIsland - Interactive tabs for filtering contests
 * UNIQUE DESIGN: Tab-based filtering (not accordion, not sidebar)
 */

import type { CollectionEntry } from "astro:content";
import { useMemo, useState } from "react";
import { CATEGORY_LABELS } from "../../config/concursosConfig";
import type { ConcursoCategory } from "../../types/concursos.types";
import { formatDate } from "../../utils/concursosUtils";

interface Props {
  activos: CollectionEntry<"concursos">[];
  proximos: CollectionEntry<"concursos">[];
  finalizados: CollectionEntry<"concursos">[];
}

type TabType = "activos" | "proximos" | "finalizados";

export default function ConcursosTabsIsland({ activos, proximos, finalizados }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("activos");
  const [selectedCategory, setSelectedCategory] = useState<ConcursoCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get current contests based on active tab
  const currentConcursos = useMemo(() => {
    let contests: CollectionEntry<"concursos">[] = [];

    switch (activeTab) {
      case "activos":
        contests = activos;
        break;
      case "proximos":
        contests = proximos;
        break;
      case "finalizados":
        contests = finalizados;
        break;
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      contests = contests.filter((c) => c.data.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      contests = contests.filter(
        (c) =>
          c.data.title.toLowerCase().includes(query) ||
          c.data.description.toLowerCase().includes(query)
      );
    }

    return contests;
  }, [activeTab, selectedCategory, searchQuery, activos, proximos, finalizados]);

  const tabConfig = [
    {
      id: "activos" as TabType,
      label: "Activos",
      count: activos.length,
      color: "#9747ff",
    },
    {
      id: "proximos" as TabType,
      label: "Próximos",
      count: proximos.length,
      color: "#34dfde",
    },
    {
      id: "finalizados" as TabType,
      label: "Finalizados",
      count: finalizados.length,
      color: "#666",
    },
  ];

  const categories: Array<{ id: ConcursoCategory | "all"; label: string }> = [
    { id: "all", label: "Todas" },
    { id: "fotografia", label: CATEGORY_LABELS.fotografia },
    { id: "musica", label: CATEGORY_LABELS.musica },
    { id: "arte-digital", label: CATEGORY_LABELS["arte-digital"] },
    { id: "video", label: CATEGORY_LABELS.video },
    { id: "escritura", label: CATEGORY_LABELS.escritura },
  ];

  return (
    <section className="concursos-tabs-section" id="concursos-tabs">
      <div className="tabs-container">
        {/* TABS NAVIGATION */}
        <div className="tabs-nav" role="tablist" aria-label="Filtrar concursos por estado">
          {tabConfig.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              style={
                {
                  "--tab-color": tab.color,
                } as React.CSSProperties
              }
            >
              <span className="tab-label">{tab.label}</span>
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* SEARCH & CATEGORY FILTERS */}
        <div className="filters-row">
          {/* Search */}
          <div className="search-wrapper">
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar concurso..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Buscar concursos"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="search-clear"
                aria-label="Limpiar búsqueda"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-pill ${selectedCategory === cat.id ? "active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB PANELS */}
        <div className="tab-panels">
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="tab-panel active"
          >
            {currentConcursos.length > 0 ? (
              <div className="concursos-masonry">
                {currentConcursos.map((concurso, index) => (
                  <ConcursoCard key={concurso.id} concurso={concurso} index={index} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                <h3>No hay concursos disponibles</h3>
                <p>Intenta ajustar los filtros o revisa más tarde</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Card component with UNIQUE ribbon design
function ConcursoCard({
  concurso,
  index,
}: {
  concurso: CollectionEntry<"concursos">;
  index: number;
}) {
  const { data } = concurso;
  const categoryLabel = CATEGORY_LABELS[data.category];

  // Ribbon colors by status
  const ribbonColors: Record<typeof data.status, string> = {
    activo: "linear-gradient(135deg, #9747ff, #ff47d4)",
    proximo: "linear-gradient(135deg, #34dfde, #19ceee)",
    finalizado: "linear-gradient(135deg, #666, #888)",
    cerrado: "linear-gradient(135deg, #444, #666)",
  };

  const statusLabels: Record<typeof data.status, string> = {
    activo: "Activo",
    proximo: "Próximo",
    finalizado: "Finalizado",
    cerrado: "Cerrado",
  };

  return (
    <article className={`concurso-card-masonry card-${index % 3}`}>
      <a href={`/concursos/${concurso.data.slug}`} className="card-link">
        {/* Angular Ribbon */}
        <div className="card-ribbon" style={{ background: ribbonColors[data.status] }}>
          {statusLabels[data.status]}
        </div>

        {/* Image */}
        <div className="card-image-container">
          <img src={data.image} alt={data.imageAlt} className="card-image" loading="lazy" />
          <div className="card-overlay"></div>
        </div>

        {/* Content */}
        <div className="card-body">
          <div className="card-category">{categoryLabel}</div>
          <h3 className="card-title">{data.title}</h3>
          <p className="card-description">{data.description}</p>

          <div className="card-meta">
            <div className="meta-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span>Cierre: {formatDate(data.fechas.cierre)}</span>
            </div>
            {data.featured && (
              <div className="featured-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Destacado
              </div>
            )}
          </div>
        </div>
      </a>
    </article>
  );
}

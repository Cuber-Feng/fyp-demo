import { useState } from 'react';

export default function AlgorithmSidebar({ categories, activeAlgorithmId, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="sidebar-header">
        <a className="brand" href="/" aria-label="Algorithm Lab home">
          <span>
            <strong>DSA Learning</strong>
            <small>Data Structures & Algorithms</small>
          </span>
        </a>
        <button
          className="sidebar-toggle"
          type="button"
          aria-label={isOpen ? 'Close algorithms menu' : 'Open algorithms menu'}
          aria-expanded={isOpen}
          aria-controls="algorithm-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sidebar-toggle-icon" aria-hidden="true" />
        </button>
      </div>

      <nav className="algorithm-nav" id="algorithm-menu" aria-label="Algorithm categories">
        {categories.map((category) => (
          <section className="algorithm-category" key={category.id}>
            <h2 className="category-label">{category.label}</h2>
            <div className="algorithm-list">
              {category.algorithms.map((algorithm) => {
                const isActive = algorithm.id === activeAlgorithmId;
                return (
                  <button
                    className={`algorithm-link${isActive ? ' active' : ''}`}
                    key={algorithm.id}
                    type="button"
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => {
                      onSelect(algorithm.id);
                      setIsOpen(false);
                    }}
                  >
                    {algorithm.label}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

      <p className="sidebar-footer"> &copy; 2026 Cody Feng. <br />All Rights Reserved.</p>
    </aside>
  );
}

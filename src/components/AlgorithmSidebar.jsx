export default function AlgorithmSidebar({ categories, activeAlgorithmId, onSelect }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="/" aria-label="Algorithm Lab home">
        <span>
          <strong>DSA Learning</strong>
          <small>Data Structures & Algorithms</small>
        </span>
      </a>

      <nav className="algorithm-nav" aria-label="Algorithm categories">
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
                    onClick={() => onSelect(algorithm.id)}
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

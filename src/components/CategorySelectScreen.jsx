import { categories } from '../data/questions';

const categoryIcons = {
  '한국사': '🏛️',
  '과학': '🔬',
  '지리': '🌍',
  '일반상식': '💡'
};

const categoryColors = {
  '한국사': '#e74c3c',
  '과학': '#3498db',
  '지리': '#27ae60',
  '일반상식': '#9b59b6'
};

const CategorySelectScreen = ({ onSelectCategory, onBack }) => {
  return (
    <div className="category-select-screen">
      <div className="category-select-content">
        <button className="back-button" onClick={onBack}>
          ← 뒤로
        </button>

        <h1 className="title">카테고리 선택</h1>
        <p className="subtitle">도전할 카테고리를 선택하세요</p>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category}
              className="category-card"
              style={{ '--category-color': categoryColors[category] }}
              onClick={() => onSelectCategory(category)}
            >
              <span className="category-icon">{categoryIcons[category]}</span>
              <span className="category-name">{category}</span>
              <span className="category-count">10문제</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelectScreen;

import { useState } from 'react';
import { gameModeConfig } from '../utils/gameModes';

const ResultScreen = ({ results, onRestart, onGoHome }) => {
  const [shareMessage, setShareMessage] = useState('');
  const {
    totalScore,
    correctAnswers,
    totalQuestions,
    accuracy,
    categoryStats,
    averageResponseTime,
    longestStreak,
    gameMode,
    selectedCategory,
    hintsUsed
  } = results;

  const modeInfo = gameModeConfig[gameMode];

  const getGrade = (percent) => {
    if (percent >= 90) return { grade: 'A+', message: '완벽합니다!', color: '#10b981' };
    if (percent >= 80) return { grade: 'A', message: '훌륭합니다!', color: '#22c55e' };
    if (percent >= 70) return { grade: 'B', message: '잘했습니다!', color: '#84cc16' };
    if (percent >= 60) return { grade: 'C', message: '좋습니다!', color: '#eab308' };
    if (percent >= 50) return { grade: 'D', message: '조금 더 노력하세요!', color: '#f97316' };
    return { grade: 'F', message: '다시 도전해보세요!', color: '#ef4444' };
  };

  const gradeInfo = getGrade(accuracy);

  const handleShare = async () => {
    const shareText = `Quiz Challenge 결과!

${gradeInfo.grade} 등급 - ${totalScore}점
정답률: ${accuracy}% (${correctAnswers}/${totalQuestions})
최대 콤보: ${longestStreak}
모드: ${modeInfo?.name}${selectedCategory ? ` - ${selectedCategory}` : ''}

나도 도전해보세요!`;

    try {
      await navigator.clipboard.writeText(shareText);
      setShareMessage('클립보드에 복사되었습니다!');
      setTimeout(() => setShareMessage(''), 2000);
    } catch {
      setShareMessage('복사에 실패했습니다.');
      setTimeout(() => setShareMessage(''), 2000);
    }
  };

  return (
    <div className="result-screen">
      <div className="result-content">
        <h1 className="result-title">퀴즈 완료!</h1>

        {/* 게임 모드 정보 */}
        <div className="mode-badge">
          <span className="mode-icon">{modeInfo?.icon}</span>
          <span className="mode-name">{modeInfo?.name}</span>
          {selectedCategory && (
            <span className="selected-category"> - {selectedCategory}</span>
          )}
        </div>

        {/* 점수 원형 */}
        <div className="score-circle" style={{ borderColor: gradeInfo.color }}>
          <div className="grade" style={{ color: gradeInfo.color }}>
            {gradeInfo.grade}
          </div>
          <div className="total-score">{totalScore}점</div>
          <div className="score-text">
            {correctAnswers} / {totalQuestions}
          </div>
        </div>

        <p className="grade-message" style={{ color: gradeInfo.color }}>
          {gradeInfo.message}
        </p>

        {/* 상세 통계 */}
        <div className="detailed-stats">
          <h3>상세 통계</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">✓</span>
              <span className="stat-value correct">{correctAnswers}</span>
              <span className="stat-label">정답</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">✗</span>
              <span className="stat-value incorrect">{totalQuestions - correctAnswers}</span>
              <span className="stat-label">오답</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">%</span>
              <span className="stat-value">{accuracy}%</span>
              <span className="stat-label">정답률</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⏱</span>
              <span className="stat-value">{averageResponseTime}초</span>
              <span className="stat-label">평균 응답</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🔥</span>
              <span className="stat-value streak">{longestStreak}</span>
              <span className="stat-label">최대 콤보</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">💡</span>
              <span className="stat-value">{hintsUsed}</span>
              <span className="stat-label">힌트 사용</span>
            </div>
          </div>
        </div>

        {/* 카테고리별 결과 */}
        {Object.keys(categoryStats).length > 0 && (
          <div className="category-results">
            <h3>카테고리별 결과</h3>
            <div className="category-list">
              {Object.entries(categoryStats).map(([category, stats]) => {
                const catPercent = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={category} className="category-item">
                    <div className="category-header">
                      <span className="category-name">{category}</span>
                      <span className="category-score">
                        {stats.correct}/{stats.total} ({catPercent}%)
                      </span>
                    </div>
                    <div className="category-bar">
                      <div
                        className="category-fill"
                        style={{
                          width: `${catPercent}%`,
                          backgroundColor: catPercent >= 70 ? '#10b981' :
                            catPercent >= 50 ? '#eab308' : '#ef4444'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 점수 구성 안내 */}
        <div className="score-info">
          <h3>점수 구성</h3>
          <ul>
            <li>기본 점수: 정답당 10점</li>
            <li>시간 보너스: 빠른 응답시 최대 +5점</li>
            <li>노힌트 보너스: 힌트 미사용시 +2점</li>
            <li>콤보 보너스: 연속 정답시 최대 +10점</li>
          </ul>
        </div>

        {/* 액션 버튼 */}
        <div className="result-actions">
          <button className="share-button" onClick={handleShare}>
            공유하기
          </button>
          <button className="restart-button" onClick={onRestart}>
            다시 도전하기
          </button>
          {onGoHome && (
            <button className="home-button" onClick={onGoHome}>
              홈으로
            </button>
          )}
        </div>

        {shareMessage && (
          <div className="share-message">{shareMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ResultScreen;

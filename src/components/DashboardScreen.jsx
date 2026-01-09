import { useState, useEffect } from 'react';
import { localDataManager } from '../utils/LocalDataManager';
import { categories } from '../data/questions';

const DashboardScreen = ({ onBack }) => {
  const [stats, setStats] = useState(null);
  const [recentGames, setRecentGames] = useState([]);

  useEffect(() => {
    setStats(localDataManager.getUserStats());
    setRecentGames(localDataManager.getRecentGames(5));
  }, []);

  if (!stats) {
    return <div className="loading">로딩 중...</div>;
  }

  const overallAccuracy = stats.totalQuestions > 0
    ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
    : 0;

  const avgScore = stats.totalGames > 0
    ? Math.round(stats.totalScore / stats.totalGames)
    : 0;

  // 최근 7일 점수 추이 데이터
  const getScoreChart = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayScores = stats.scoreHistory.filter(s => s.date === dateStr);
      const avgDayScore = dayScores.length > 0
        ? Math.round(dayScores.reduce((sum, s) => sum + s.score, 0) / dayScores.length)
        : 0;
      last7Days.push({
        date: date.toLocaleDateString('ko-KR', { weekday: 'short' }),
        score: avgDayScore
      });
    }
    return last7Days;
  };

  const scoreChart = getScoreChart();
  const maxScore = Math.max(...scoreChart.map(d => d.score), 1);

  return (
    <div className="dashboard-screen">
      <div className="dashboard-content">
        <button className="back-button" onClick={onBack}>
          ← 뒤로
        </button>

        <h1 className="title">내 통계</h1>

        {/* 메인 통계 카드 */}
        <div className="main-stats">
          <div className="main-stat-card highlight">
            <span className="stat-icon">🏆</span>
            <span className="stat-value">{stats.bestScore}</span>
            <span className="stat-label">최고 점수</span>
          </div>
          <div className="main-stat-card">
            <span className="stat-icon">🎮</span>
            <span className="stat-value">{stats.totalGames}</span>
            <span className="stat-label">총 게임</span>
          </div>
          <div className="main-stat-card">
            <span className="stat-icon">📊</span>
            <span className="stat-value">{overallAccuracy}%</span>
            <span className="stat-label">정답률</span>
          </div>
          <div className="main-stat-card">
            <span className="stat-icon">⭐</span>
            <span className="stat-value">{avgScore}</span>
            <span className="stat-label">평균 점수</span>
          </div>
        </div>

        {/* 성장 그래프 */}
        <div className="score-chart-section">
          <h3>최근 7일 점수 추이</h3>
          <div className="score-chart">
            {scoreChart.map((day, index) => (
              <div key={index} className="chart-bar-container">
                <div className="chart-bar-wrapper">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${(day.score / maxScore) * 100}%`,
                      opacity: day.score > 0 ? 1 : 0.3
                    }}
                  >
                    {day.score > 0 && (
                      <span className="chart-value">{day.score}</span>
                    )}
                  </div>
                </div>
                <span className="chart-label">{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 카테고리별 정답률 */}
        <div className="category-stats-section">
          <h3>카테고리별 정답률</h3>
          <div className="category-stats-list">
            {categories.map(category => {
              const catStats = stats.categoryStats[category];
              const accuracy = catStats && catStats.total > 0
                ? Math.round((catStats.correct / catStats.total) * 100)
                : 0;
              const total = catStats?.total || 0;

              return (
                <div key={category} className="category-stat-item">
                  <div className="category-stat-header">
                    <span className="category-stat-name">{category}</span>
                    <span className="category-stat-info">
                      {accuracy}% ({total}문제)
                    </span>
                  </div>
                  <div className="category-stat-bar">
                    <div
                      className="category-stat-fill"
                      style={{
                        width: `${accuracy}%`,
                        backgroundColor: accuracy >= 70 ? '#10b981' :
                          accuracy >= 50 ? '#eab308' : '#ef4444'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 추가 통계 */}
        <div className="extra-stats">
          <div className="extra-stat-row">
            <span className="extra-stat-label">🔥 최대 콤보</span>
            <span className="extra-stat-value">{stats.bestStreak}</span>
          </div>
          <div className="extra-stat-row">
            <span className="extra-stat-label">📝 총 문제 수</span>
            <span className="extra-stat-value">{stats.totalQuestions}</span>
          </div>
          <div className="extra-stat-row">
            <span className="extra-stat-label">✓ 총 정답 수</span>
            <span className="extra-stat-value">{stats.totalCorrect}</span>
          </div>
          <div className="extra-stat-row">
            <span className="extra-stat-label">💯 누적 점수</span>
            <span className="extra-stat-value">{stats.totalScore.toLocaleString()}</span>
          </div>
        </div>

        {/* 최근 게임 기록 */}
        {recentGames.length > 0 && (
          <div className="recent-games-section">
            <h3>최근 게임</h3>
            <div className="recent-games-list">
              {recentGames.map((game, index) => (
                <div key={game.id || index} className="recent-game-item">
                  <div className="recent-game-score">{game.totalScore}점</div>
                  <div className="recent-game-info">
                    <span className="recent-game-accuracy">{game.accuracy}%</span>
                    <span className="recent-game-date">{game.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;

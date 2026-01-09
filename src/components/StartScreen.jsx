import { useState, useEffect } from 'react';
import { categories } from '../data/questions';
import { localDataManager } from '../utils/LocalDataManager';

const StartScreen = ({ onStart, onDashboard, onLeaderboard, onSettings }) => {
  const [playerName, setPlayerName] = useState('플레이어');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const settings = localDataManager.getSettings();
    setPlayerName(settings.playerName || '플레이어');
    setStats(localDataManager.getUserStats());
  }, []);

  return (
    <div className="start-screen">
      <div className="start-content">
        <h1 className="title">Quiz Challenge</h1>
        <p className="subtitle">다양한 모드로 지식을 테스트해보세요!</p>

        {/* 플레이어 인사 */}
        <div className="player-greeting">
          <span className="greeting-emoji">👋</span>
          <span className="greeting-text">안녕하세요, <strong>{playerName}</strong>님!</span>
        </div>

        {/* 간단한 통계 */}
        {stats && stats.totalGames > 0 && (
          <div className="quick-stats">
            <div className="quick-stat">
              <span className="quick-stat-value">{stats.totalGames}</span>
              <span className="quick-stat-label">게임</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-value">{stats.bestScore}</span>
              <span className="quick-stat-label">최고점</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-value">
                {stats.totalQuestions > 0
                  ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
                  : 0}%
              </span>
              <span className="quick-stat-label">정답률</span>
            </div>
          </div>
        )}

        <div className="info-box">
          <h3>게임 특징</h3>
          <ul>
            <li>3가지 게임 모드 선택</li>
            <li>4개 카테고리: {categories.join(', ')}</li>
            <li>힌트 시스템 & 콤보 보너스</li>
            <li>상세한 결과 분석</li>
          </ul>
        </div>

        <button className="start-button" onClick={onStart}>
          게임 시작
        </button>

        {/* 네비게이션 버튼 */}
        <div className="nav-buttons">
          <button className="nav-button" onClick={onDashboard}>
            <span className="nav-icon">📊</span>
            <span className="nav-label">내 통계</span>
          </button>
          <button className="nav-button" onClick={onLeaderboard}>
            <span className="nav-icon">🏆</span>
            <span className="nav-label">리더보드</span>
          </button>
          <button className="nav-button" onClick={onSettings}>
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">설정</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;

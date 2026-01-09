import { useState, useEffect } from 'react';
import { localDataManager } from '../utils/LocalDataManager';
import { gameModeConfig } from '../utils/gameModes';

const LeaderboardScreen = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('allTime');
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    setLeaderboard(localDataManager.getLeaderboard());
  }, []);

  if (!leaderboard) {
    return <div className="loading">로딩 중...</div>;
  }

  const tabs = [
    { id: 'allTime', label: '전체', icon: '🏆' },
    { id: 'weekly', label: '주간', icon: '📅' },
    { id: 'daily', label: '오늘', icon: '📆' }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'daily':
        return leaderboard.daily || [];
      case 'weekly':
        return leaderboard.weekly || [];
      case 'allTime':
      default:
        return (leaderboard.allTime || []).slice(0, 10);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}`;
    }
  };

  const getModeLabel = (mode) => {
    return gameModeConfig[mode]?.name || mode;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const data = getCurrentData();

  return (
    <div className="leaderboard-screen">
      <div className="leaderboard-content">
        <button className="back-button" onClick={onBack}>
          ← 뒤로
        </button>

        <h1 className="title">리더보드</h1>

        {/* 탭 메뉴 */}
        <div className="leaderboard-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 순위 목록 */}
        <div className="rank-list">
          {data.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📊</span>
              <p>아직 기록이 없습니다</p>
              <p className="empty-hint">게임을 플레이하면 순위가 기록됩니다!</p>
            </div>
          ) : (
            data.map((entry, index) => (
              <div
                key={entry.id}
                className={`rank-item ${index < 3 ? `top-${index + 1}` : ''}`}
              >
                <div className="rank-position">
                  {getRankIcon(index + 1)}
                </div>
                <div className="rank-info">
                  <div className="rank-score">{entry.score}점</div>
                  <div className="rank-details">
                    <span className="rank-mode">{getModeLabel(entry.gameMode)}</span>
                    {entry.category && (
                      <span className="rank-category">· {entry.category}</span>
                    )}
                  </div>
                </div>
                <div className="rank-meta">
                  <div className="rank-accuracy">{entry.accuracy}%</div>
                  <div className="rank-date">{formatDate(entry.timestamp)}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 모드별 최고 기록 */}
        {Object.keys(leaderboard.byMode || {}).length > 0 && (
          <div className="mode-records">
            <h3>모드별 최고 기록</h3>
            <div className="mode-record-grid">
              {Object.entries(leaderboard.byMode).map(([mode, records]) => {
                if (!records || records.length === 0) return null;
                const best = records[0];
                return (
                  <div key={mode} className="mode-record-card">
                    <span className="mode-record-icon">
                      {gameModeConfig[mode]?.icon || '🎮'}
                    </span>
                    <span className="mode-record-name">
                      {getModeLabel(mode)}
                    </span>
                    <span className="mode-record-score">{best.score}점</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardScreen;

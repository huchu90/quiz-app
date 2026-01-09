import { GAME_MODES, gameModeConfig } from '../utils/gameModes';

const ModeSelectScreen = ({ onSelectMode, onBack }) => {
  const modes = Object.values(gameModeConfig);

  return (
    <div className="mode-select-screen">
      <div className="mode-select-content">
        <button className="back-button" onClick={onBack}>
          ← 뒤로
        </button>

        <h1 className="title">게임 모드 선택</h1>
        <p className="subtitle">원하는 모드를 선택하세요</p>

        <div className="mode-list">
          {modes.map((mode) => (
            <button
              key={mode.id}
              className="mode-card"
              onClick={() => onSelectMode(mode.id)}
            >
              <span className="mode-icon">{mode.icon}</span>
              <div className="mode-info">
                <h3 className="mode-name">{mode.name}</h3>
                <p className="mode-description">{mode.description}</p>
                <div className="mode-details">
                  <span className="detail-item">
                    문제: {mode.questions}개
                  </span>
                  {mode.timeLimit && (
                    <span className="detail-item time">
                      시간: {mode.timeLimit}초/문제
                    </span>
                  )}
                  <span className="detail-item">
                    힌트: {mode.hintsAllowed}회
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModeSelectScreen;

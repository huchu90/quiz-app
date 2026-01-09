import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { localDataManager } from '../utils/LocalDataManager';

const SettingsScreen = ({ onBack }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [playerName, setPlayerName] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    const settings = localDataManager.getSettings();
    setPlayerName(settings.playerName || '플레이어');
  }, []);

  const handleNameChange = (e) => {
    const name = e.target.value;
    setPlayerName(name);
    localDataManager.saveSettings({ playerName: name });
  };

  const handleClearData = () => {
    localDataManager.clearAllData();
    setShowConfirmClear(false);
    alert('모든 데이터가 삭제되었습니다.');
    window.location.reload();
  };

  const handleExportData = () => {
    const data = localDataManager.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (localDataManager.importData(data)) {
          alert('데이터를 성공적으로 가져왔습니다.');
          window.location.reload();
        } else {
          alert('데이터 가져오기에 실패했습니다.');
        }
      } catch {
        alert('올바른 형식의 파일이 아닙니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="settings-screen">
      <div className="settings-content">
        <button className="back-button" onClick={onBack}>
          ← 뒤로
        </button>

        <h1 className="title">설정</h1>

        {/* 플레이어 이름 */}
        <div className="settings-section">
          <h3>프로필</h3>
          <div className="setting-item">
            <label className="setting-label">플레이어 이름</label>
            <input
              type="text"
              className="setting-input"
              value={playerName}
              onChange={handleNameChange}
              placeholder="이름을 입력하세요"
              maxLength={20}
            />
          </div>
        </div>

        {/* 테마 설정 */}
        <div className="settings-section">
          <h3>테마</h3>
          <div className="setting-item toggle">
            <label className="setting-label">
              <span>다크 모드</span>
              <span className="setting-desc">어두운 테마를 사용합니다</span>
            </label>
            <button
              className={`toggle-switch ${darkMode ? 'active' : ''}`}
              onClick={toggleDarkMode}
            >
              <span className="toggle-slider" />
            </button>
          </div>
        </div>

        {/* 데이터 관리 */}
        <div className="settings-section">
          <h3>데이터 관리</h3>
          <div className="setting-item">
            <button className="setting-button" onClick={handleExportData}>
              📥 데이터 내보내기
            </button>
          </div>
          <div className="setting-item">
            <label className="setting-button import-label">
              📤 데이터 가져오기
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className="setting-item danger">
            {!showConfirmClear ? (
              <button
                className="setting-button danger"
                onClick={() => setShowConfirmClear(true)}
              >
                🗑️ 모든 데이터 삭제
              </button>
            ) : (
              <div className="confirm-clear">
                <p>정말 모든 데이터를 삭제하시겠습니까?</p>
                <div className="confirm-buttons">
                  <button
                    className="confirm-yes"
                    onClick={handleClearData}
                  >
                    삭제
                  </button>
                  <button
                    className="confirm-no"
                    onClick={() => setShowConfirmClear(false)}
                  >
                    취소
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 앱 정보 */}
        <div className="settings-section">
          <h3>정보</h3>
          <div className="app-info">
            <p>Quiz Challenge v2.0</p>
            <p className="app-info-desc">React로 만든 퀴즈 게임</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;

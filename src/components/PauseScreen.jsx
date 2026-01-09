const PauseScreen = ({ onResume, onQuit }) => {
  return (
    <div className="pause-overlay">
      <div className="pause-content">
        <h2 className="pause-title">일시정지</h2>

        <div className="pause-buttons">
          <button className="resume-button" onClick={onResume}>
            계속하기
          </button>
          <button className="quit-button" onClick={onQuit}>
            게임 종료
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseScreen;

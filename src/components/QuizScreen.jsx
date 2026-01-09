import { GAME_STATUS } from '../hooks/useQuiz';

const QuizScreen = ({
  question,
  currentIndex,
  totalQuestions,
  score,
  progress,
  selectedAnswer,
  isCorrect,
  gameStatus,
  timeLeft,
  hintsRemaining,
  hintUsed,
  eliminatedOptions,
  consecutiveCorrect,
  lastScoreBreakdown,
  modeConfig,
  onAnswer,
  onNext,
  onUseHint,
  onPause
}) => {
  const isFeedback = gameStatus === GAME_STATUS.FEEDBACK;
  const hasTimeLimit = modeConfig?.timeLimit !== null;

  const getOptionClass = (index) => {
    const isEliminated = eliminatedOptions.includes(index);

    if (isEliminated && !isFeedback) {
      return 'option eliminated';
    }

    if (!isFeedback) return 'option';

    if (index === question.correctAnswer) {
      return 'option correct';
    }
    if (index === selectedAnswer && !isCorrect) {
      return 'option incorrect';
    }
    return 'option disabled';
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      easy: '쉬움',
      medium: '보통',
      hard: '어려움'
    };
    return labels[difficulty] || difficulty;
  };

  const getTimerClass = () => {
    if (!hasTimeLimit) return 'timer';
    if (timeLeft <= 5) return 'timer danger';
    if (timeLeft <= 10) return 'timer warning';
    return 'timer';
  };

  const isTimedOut = selectedAnswer === -1;

  return (
    <div className="quiz-screen">
      {/* 상단 정보 바 */}
      <div className="quiz-header">
        <div className="progress-info">
          <span className="question-count">
            문제 {currentIndex + 1} / {totalQuestions}
          </span>
          <div className="header-right">
            {consecutiveCorrect > 0 && (
              <span className="combo-badge">
                {consecutiveCorrect} 콤보!
              </span>
            )}
            <span className="score">점수: {score}</span>
            <button className="pause-button" onClick={onPause}>
              ⏸
            </button>
          </div>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 타이머 & 힌트 바 */}
        <div className="game-controls">
          {hasTimeLimit && (
            <div className={getTimerClass()}>
              <span className="timer-icon">⏱</span>
              <span className="timer-value">{timeLeft}초</span>
            </div>
          )}
          <button
            className={`hint-button ${hintUsed || hintsRemaining === 0 ? 'disabled' : ''}`}
            onClick={onUseHint}
            disabled={isFeedback || hintUsed || hintsRemaining === 0}
          >
            💡 힌트 ({hintsRemaining})
          </button>
        </div>
      </div>

      {/* 문제 카드 */}
      <div className="question-card">
        <div className="question-meta">
          <span className={`category ${question.category}`}>
            {question.category}
          </span>
          <span className={`difficulty ${question.difficulty}`}>
            {getDifficultyLabel(question.difficulty)}
          </span>
        </div>

        <h2 className="question-text">{question.question}</h2>

        {/* 선택지 */}
        <div className="options">
          {question.options.map((option, index) => {
            const isEliminated = eliminatedOptions.includes(index);
            return (
              <button
                key={index}
                className={getOptionClass(index)}
                onClick={() => onAnswer(index)}
                disabled={isFeedback || isEliminated}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">
                  {isEliminated && !isFeedback ? '제거됨' : option}
                </span>
                {isFeedback && index === question.correctAnswer && (
                  <span className="option-icon correct-icon">✓</span>
                )}
                {isFeedback && index === selectedAnswer && !isCorrect && (
                  <span className="option-icon incorrect-icon">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* 피드백 영역 */}
        {isFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-header">
              {isTimedOut ? '시간 초과!' : (isCorrect ? '정답입니다!' : '오답입니다!')}
            </div>

            {/* 점수 상세 */}
            {lastScoreBreakdown && isCorrect && (
              <div className="score-breakdown">
                <div className="breakdown-item">
                  <span>기본 점수</span>
                  <span>+{lastScoreBreakdown.base}</span>
                </div>
                {lastScoreBreakdown.timeBonus > 0 && (
                  <div className="breakdown-item bonus">
                    <span>시간 보너스</span>
                    <span>+{lastScoreBreakdown.timeBonus}</span>
                  </div>
                )}
                {lastScoreBreakdown.noHintBonus > 0 && (
                  <div className="breakdown-item bonus">
                    <span>노힌트 보너스</span>
                    <span>+{lastScoreBreakdown.noHintBonus}</span>
                  </div>
                )}
                {lastScoreBreakdown.comboBonus > 0 && (
                  <div className="breakdown-item bonus combo">
                    <span>콤보 보너스</span>
                    <span>+{lastScoreBreakdown.comboBonus}</span>
                  </div>
                )}
                <div className="breakdown-total">
                  <span>획득 점수</span>
                  <span>+{lastScoreBreakdown.total}</span>
                </div>
              </div>
            )}

            <p className="explanation">{question.explanation}</p>
            <button className="next-button" onClick={onNext}>
              {currentIndex < totalQuestions - 1 ? '다음 문제' : '결과 보기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;

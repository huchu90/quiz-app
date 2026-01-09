import './App.css';
import { useQuiz, GAME_STATUS } from './hooks/useQuiz';
import StartScreen from './components/StartScreen';
import ModeSelectScreen from './components/ModeSelectScreen';
import CategorySelectScreen from './components/CategorySelectScreen';
import QuizScreen from './components/QuizScreen';
import PauseScreen from './components/PauseScreen';
import ResultScreen from './components/ResultScreen';
import DashboardScreen from './components/DashboardScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import SettingsScreen from './components/SettingsScreen';

function App() {
  const {
    // 게임 설정
    gameMode,
    selectedCategory,
    modeConfig,

    // 게임 상태
    gameStatus,
    currentQuestion,
    currentIndex,
    totalQuestions,
    score,
    selectedAnswer,
    isCorrect,
    progress,

    // 타이머
    timeLeft,

    // 힌트
    hintsRemaining,
    hintUsed,
    eliminatedOptions,

    // 콤보
    consecutiveCorrect,

    // 점수 상세
    lastScoreBreakdown,

    // 액션
    initGame,
    goToModeSelect,
    goToDashboard,
    goToLeaderboard,
    goToSettings,
    goToHome,
    selectGameMode,
    selectCategory,
    handleAnswer,
    nextQuestion,
    restartGame,
    useHint,
    pauseGame,
    resumeGame,
    getResults
  } = useQuiz();

  const renderScreen = () => {
    switch (gameStatus) {
      case GAME_STATUS.START:
        return (
          <StartScreen
            onStart={initGame}
            onDashboard={goToDashboard}
            onLeaderboard={goToLeaderboard}
            onSettings={goToSettings}
          />
        );

      case GAME_STATUS.MODE_SELECT:
        return (
          <ModeSelectScreen
            onSelectMode={selectGameMode}
            onBack={restartGame}
          />
        );

      case GAME_STATUS.CATEGORY_SELECT:
        return (
          <CategorySelectScreen
            onSelectCategory={selectCategory}
            onBack={goToModeSelect}
          />
        );

      case GAME_STATUS.PLAYING:
      case GAME_STATUS.FEEDBACK:
        return (
          <QuizScreen
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            score={score}
            progress={progress}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            gameStatus={gameStatus}
            timeLeft={timeLeft}
            hintsRemaining={hintsRemaining}
            hintUsed={hintUsed}
            eliminatedOptions={eliminatedOptions}
            consecutiveCorrect={consecutiveCorrect}
            lastScoreBreakdown={lastScoreBreakdown}
            modeConfig={modeConfig}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
            onUseHint={useHint}
            onPause={pauseGame}
          />
        );

      case GAME_STATUS.PAUSED:
        return (
          <>
            <QuizScreen
              question={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              score={score}
              progress={progress}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              gameStatus={GAME_STATUS.PLAYING}
              timeLeft={timeLeft}
              hintsRemaining={hintsRemaining}
              hintUsed={hintUsed}
              eliminatedOptions={eliminatedOptions}
              consecutiveCorrect={consecutiveCorrect}
              lastScoreBreakdown={lastScoreBreakdown}
              modeConfig={modeConfig}
              onAnswer={() => {}}
              onNext={() => {}}
              onUseHint={() => {}}
              onPause={() => {}}
            />
            <PauseScreen
              onResume={resumeGame}
              onQuit={restartGame}
            />
          </>
        );

      case GAME_STATUS.RESULT:
        return (
          <ResultScreen
            results={getResults()}
            onRestart={restartGame}
            onGoHome={goToHome}
          />
        );

      case GAME_STATUS.DASHBOARD:
        return <DashboardScreen onBack={goToHome} />;

      case GAME_STATUS.LEADERBOARD:
        return <LeaderboardScreen onBack={goToHome} />;

      case GAME_STATUS.SETTINGS:
        return <SettingsScreen onBack={goToHome} />;

      default:
        return (
          <StartScreen
            onStart={initGame}
            onDashboard={goToDashboard}
            onLeaderboard={goToLeaderboard}
            onSettings={goToSettings}
          />
        );
    }
  };

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
}

export default App;

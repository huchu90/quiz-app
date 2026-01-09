import { useState, useCallback, useEffect, useRef } from 'react';
import { questions, shuffleQuestions, getQuestionsByCategory } from '../data/questions';
import { scoreManager } from '../utils/ScoreManager';
import { GAME_MODES, getGameModeConfig } from '../utils/gameModes';
import { localDataManager } from '../utils/LocalDataManager';

// 게임 상태 상수
export const GAME_STATUS = {
  START: 'start',
  MODE_SELECT: 'mode_select',
  CATEGORY_SELECT: 'category_select',
  PLAYING: 'playing',
  PAUSED: 'paused',
  FEEDBACK: 'feedback',
  RESULT: 'result',
  DASHBOARD: 'dashboard',
  LEADERBOARD: 'leaderboard',
  SETTINGS: 'settings'
};

export const useQuiz = () => {
  // 게임 설정
  const [gameMode, setGameMode] = useState(GAME_MODES.FULL);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 게임 상태
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.START);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answers, setAnswers] = useState([]);

  // 타이머 관련
  const [timeLeft, setTimeLeft] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  // 힌트 관련
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [hintUsed, setHintUsed] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);

  // 콤보 관련
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // 점수 상세
  const [lastScoreBreakdown, setLastScoreBreakdown] = useState(null);
  const [totalResponseTime, setTotalResponseTime] = useState(0);

  // 현재 문제 및 진행률
  const currentQuestion = currentQuestions[currentIndex] || null;
  const totalQuestions = currentQuestions.length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const modeConfig = getGameModeConfig(gameMode);

  // 타이머 정리
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 타이머 시작
  const startTimer = useCallback(() => {
    clearTimer();
    const config = getGameModeConfig(gameMode);

    if (config.timeLimit) {
      setTimeLeft(config.timeLimit);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    setQuestionStartTime(Date.now());
  }, [gameMode, clearTimer]);

  // 시간 초과 처리
  useEffect(() => {
    if (timeLeft === 0 && gameStatus === GAME_STATUS.PLAYING) {
      // 시간 초과 - 오답 처리
      handleTimeout();
    }
  }, [timeLeft, gameStatus]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  // 시간 초과 처리 함수
  const handleTimeout = useCallback(() => {
    const elapsed = modeConfig.timeLimit || 0;
    setTimeSpent(elapsed);
    setTotalResponseTime(prev => prev + elapsed);

    setSelectedAnswer(-1); // 시간 초과 표시
    setIsCorrect(false);
    setConsecutiveCorrect(0);

    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer: -1,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: false,
      timeSpent: elapsed,
      hintUsed,
      timedOut: true
    }]);

    setLastScoreBreakdown({
      total: 0,
      base: 0,
      timeBonus: 0,
      noHintBonus: 0,
      comboBonus: 0,
      timedOut: true
    });

    setGameStatus(GAME_STATUS.FEEDBACK);
  }, [currentQuestion, hintUsed, modeConfig.timeLimit]);

  // 화면 이동 함수들
  const goToModeSelect = useCallback(() => {
    setGameStatus(GAME_STATUS.MODE_SELECT);
  }, []);

  const goToDashboard = useCallback(() => {
    setGameStatus(GAME_STATUS.DASHBOARD);
  }, []);

  const goToLeaderboard = useCallback(() => {
    setGameStatus(GAME_STATUS.LEADERBOARD);
  }, []);

  const goToSettings = useCallback(() => {
    setGameStatus(GAME_STATUS.SETTINGS);
  }, []);

  const goToHome = useCallback(() => {
    setGameStatus(GAME_STATUS.START);
  }, []);

  // 게임 모드 선택
  const selectGameMode = useCallback((mode) => {
    setGameMode(mode);
    if (mode === GAME_MODES.CATEGORY) {
      setGameStatus(GAME_STATUS.CATEGORY_SELECT);
    } else {
      initGameWithMode(mode, null);
    }
  }, []);

  // 카테고리 선택
  const selectCategory = useCallback((category) => {
    setSelectedCategory(category);
    initGameWithMode(GAME_MODES.CATEGORY, category);
  }, []);

  // 게임 초기화 (모드와 카테고리 적용)
  const initGameWithMode = useCallback((mode, category) => {
    const config = getGameModeConfig(mode);
    let questionsPool;

    if (mode === GAME_MODES.CATEGORY && category) {
      questionsPool = getQuestionsByCategory(category);
    } else if (mode === GAME_MODES.SPEED) {
      // 스피드 모드: 전체에서 20문제 랜덤
      questionsPool = shuffleQuestions(questions).slice(0, config.questions);
    } else {
      // 전체 모드: 40문제 전부
      questionsPool = shuffleQuestions(questions);
    }

    const finalQuestions = shuffleQuestions(questionsPool).slice(0, config.questions);

    setCurrentQuestions(finalQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setAnswers([]);
    setHintsRemaining(config.hintsAllowed);
    setHintUsed(false);
    setEliminatedOptions([]);
    setConsecutiveCorrect(0);
    setLongestStreak(0);
    setTimeLeft(config.timeLimit);
    setTotalResponseTime(0);
    setLastScoreBreakdown(null);
    setGameStatus(GAME_STATUS.PLAYING);

    // 타이머 시작
    if (config.timeLimit) {
      setTimeLeft(config.timeLimit);
    }
    setQuestionStartTime(Date.now());
  }, []);

  // 기본 게임 초기화 (하위 호환성)
  const initGame = useCallback(() => {
    goToModeSelect();
  }, [goToModeSelect]);

  // 힌트 사용
  const useHint = useCallback(() => {
    if (hintsRemaining <= 0 || hintUsed || gameStatus !== GAME_STATUS.PLAYING) return;
    if (!currentQuestion) return;

    // 오답 2개 제거
    const wrongOptions = currentQuestion.options
      .map((_, index) => index)
      .filter(index => index !== currentQuestion.correctAnswer && !eliminatedOptions.includes(index));

    const toEliminate = shuffleQuestions(wrongOptions).slice(0, 2);

    setEliminatedOptions(toEliminate);
    setHintUsed(true);
    setHintsRemaining(prev => prev - 1);
  }, [hintsRemaining, hintUsed, gameStatus, currentQuestion, eliminatedOptions]);

  // 일시정지
  const pauseGame = useCallback(() => {
    if (gameStatus === GAME_STATUS.PLAYING) {
      clearTimer();
      setGameStatus(GAME_STATUS.PAUSED);
    }
  }, [gameStatus, clearTimer]);

  // 게임 재개
  const resumeGame = useCallback(() => {
    if (gameStatus === GAME_STATUS.PAUSED) {
      setGameStatus(GAME_STATUS.PLAYING);
      // 스피드 모드인 경우 타이머 재시작 (남은 시간으로)
      if (modeConfig.timeLimit && timeLeft > 0) {
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearTimer();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
  }, [gameStatus, modeConfig.timeLimit, timeLeft, clearTimer]);

  // 답변 처리
  const handleAnswer = useCallback((answerIndex) => {
    if (selectedAnswer !== null || gameStatus !== GAME_STATUS.PLAYING) return;

    clearTimer();

    const elapsed = questionStartTime ? (Date.now() - questionStartTime) / 1000 : 0;
    setTimeSpent(elapsed);
    setTotalResponseTime(prev => prev + elapsed);

    const correct = answerIndex === currentQuestion.correctAnswer;
    const newConsecutive = correct ? consecutiveCorrect + 1 : 0;

    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setConsecutiveCorrect(newConsecutive);

    if (correct && newConsecutive > longestStreak) {
      setLongestStreak(newConsecutive);
    }

    // 점수 계산
    const breakdown = scoreManager.getScoreBreakdown(
      correct,
      elapsed,
      newConsecutive,
      hintUsed,
      modeConfig.timeLimit
    );

    setLastScoreBreakdown(breakdown);

    if (correct) {
      setScore(prev => prev + breakdown.total);
    }

    // 답변 기록 저장
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: correct,
      timeSpent: elapsed,
      hintUsed,
      scoreEarned: breakdown.total
    }]);

    setGameStatus(GAME_STATUS.FEEDBACK);
  }, [currentQuestion, selectedAnswer, gameStatus, questionStartTime, consecutiveCorrect, longestStreak, hintUsed, modeConfig.timeLimit, clearTimer]);

  // 다음 문제로 이동
  const nextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setHintUsed(false);
      setEliminatedOptions([]);
      setLastScoreBreakdown(null);
      setGameStatus(GAME_STATUS.PLAYING);

      // 타이머 리셋
      if (modeConfig.timeLimit) {
        setTimeLeft(modeConfig.timeLimit);
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearTimer();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
      setQuestionStartTime(Date.now());
    } else {
      // 게임 결과 저장
      const categoryStats = {};
      let correctCount = 0;
      answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        if (question) {
          if (!categoryStats[question.category]) {
            categoryStats[question.category] = { correct: 0, total: 0 };
          }
          categoryStats[question.category].total++;
          if (answer.isCorrect) {
            categoryStats[question.category].correct++;
            correctCount++;
          }
        }
      });

      const avgResponseTime = answers.length > 0
        ? totalResponseTime / answers.length
        : 0;

      const gameResult = {
        totalScore: score,
        correctAnswers: correctCount,
        totalQuestions,
        accuracy: totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0,
        categoryStats,
        averageResponseTime: Math.round(avgResponseTime * 10) / 10,
        longestStreak,
        gameMode,
        selectedCategory,
        hintsUsed: modeConfig.hintsAllowed - hintsRemaining
      };

      localDataManager.saveGameResult(gameResult);
      setGameStatus(GAME_STATUS.RESULT);
    }
  }, [currentIndex, totalQuestions, modeConfig.timeLimit, clearTimer, answers, score, totalResponseTime, longestStreak, gameMode, selectedCategory, modeConfig.hintsAllowed, hintsRemaining]);

  // 게임 재시작
  const restartGame = useCallback(() => {
    clearTimer();
    setGameStatus(GAME_STATUS.START);
    setGameMode(GAME_MODES.FULL);
    setSelectedCategory(null);
    setCurrentQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAnswers([]);
    setHintsRemaining(3);
    setHintUsed(false);
    setEliminatedOptions([]);
    setConsecutiveCorrect(0);
    setLongestStreak(0);
    setTimeLeft(null);
    setTotalResponseTime(0);
    setLastScoreBreakdown(null);
  }, [clearTimer]);

  // 결과 통계
  const getResults = useCallback(() => {
    const categoryStats = {};
    let correctCount = 0;

    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        if (!categoryStats[question.category]) {
          categoryStats[question.category] = { correct: 0, total: 0 };
        }
        categoryStats[question.category].total++;
        if (answer.isCorrect) {
          categoryStats[question.category].correct++;
          correctCount++;
        }
      }
    });

    const avgResponseTime = answers.length > 0
      ? totalResponseTime / answers.length
      : 0;

    return {
      totalScore: score,
      correctAnswers: correctCount,
      totalQuestions,
      accuracy: totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0,
      categoryStats,
      averageResponseTime: Math.round(avgResponseTime * 10) / 10,
      longestStreak,
      answers,
      gameMode,
      selectedCategory,
      hintsUsed: modeConfig.hintsAllowed - hintsRemaining
    };
  }, [score, totalQuestions, answers, totalResponseTime, longestStreak, gameMode, selectedCategory, modeConfig.hintsAllowed, hintsRemaining]);

  return {
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
    timeSpent,

    // 힌트
    hintsRemaining,
    hintUsed,
    eliminatedOptions,

    // 콤보
    consecutiveCorrect,
    longestStreak,

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
  };
};

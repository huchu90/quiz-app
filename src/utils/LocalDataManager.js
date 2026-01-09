// 로컬 스토리지 데이터 관리 클래스
class LocalDataManager {
  constructor() {
    this.KEYS = {
      GAME_HISTORY: 'quizApp_gameHistory',
      USER_STATS: 'quizApp_userStats',
      SETTINGS: 'quizApp_settings',
      LEADERBOARD: 'quizApp_leaderboard'
    };
  }

  // ===== 게임 기록 관리 =====

  // 게임 결과 저장
  saveGameResult(result) {
    const history = this.getGameHistory();
    const gameRecord = {
      id: Date.now(),
      ...result,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('ko-KR')
    };

    history.unshift(gameRecord); // 최신 기록을 앞에 추가

    // 최대 100개 기록만 보관
    if (history.length > 100) {
      history.pop();
    }

    localStorage.setItem(this.KEYS.GAME_HISTORY, JSON.stringify(history));

    // 리더보드 업데이트
    this.updateLeaderboard(gameRecord);

    // 통계 업데이트
    this.updateUserStats(result);

    return gameRecord;
  }

  // 게임 기록 조회
  getGameHistory() {
    try {
      const data = localStorage.getItem(this.KEYS.GAME_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // 최근 게임 기록 조회
  getRecentGames(count = 10) {
    return this.getGameHistory().slice(0, count);
  }

  // ===== 리더보드 관리 =====

  // 리더보드 업데이트
  updateLeaderboard(gameRecord) {
    const leaderboard = this.getLeaderboard();
    const entry = {
      id: gameRecord.id,
      score: gameRecord.totalScore,
      accuracy: gameRecord.accuracy,
      gameMode: gameRecord.gameMode,
      category: gameRecord.selectedCategory,
      timestamp: gameRecord.timestamp,
      date: gameRecord.date
    };

    // 전체 기록 추가
    leaderboard.allTime.push(entry);
    leaderboard.allTime.sort((a, b) => b.score - a.score);
    leaderboard.allTime = leaderboard.allTime.slice(0, 100); // 상위 100개만

    // 일간 기록 업데이트
    const today = new Date().toDateString();
    leaderboard.daily = leaderboard.daily.filter(
      e => new Date(e.timestamp).toDateString() === today
    );
    leaderboard.daily.push(entry);
    leaderboard.daily.sort((a, b) => b.score - a.score);
    leaderboard.daily = leaderboard.daily.slice(0, 10);

    // 주간 기록 업데이트
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    leaderboard.weekly = leaderboard.weekly.filter(
      e => new Date(e.timestamp) > oneWeekAgo
    );
    leaderboard.weekly.push(entry);
    leaderboard.weekly.sort((a, b) => b.score - a.score);
    leaderboard.weekly = leaderboard.weekly.slice(0, 10);

    // 모드별 기록 업데이트
    if (!leaderboard.byMode[gameRecord.gameMode]) {
      leaderboard.byMode[gameRecord.gameMode] = [];
    }
    leaderboard.byMode[gameRecord.gameMode].push(entry);
    leaderboard.byMode[gameRecord.gameMode].sort((a, b) => b.score - a.score);
    leaderboard.byMode[gameRecord.gameMode] =
      leaderboard.byMode[gameRecord.gameMode].slice(0, 10);

    // 카테고리별 기록 업데이트 (카테고리 모드인 경우)
    if (gameRecord.selectedCategory) {
      if (!leaderboard.byCategory[gameRecord.selectedCategory]) {
        leaderboard.byCategory[gameRecord.selectedCategory] = [];
      }
      leaderboard.byCategory[gameRecord.selectedCategory].push(entry);
      leaderboard.byCategory[gameRecord.selectedCategory].sort((a, b) => b.score - a.score);
      leaderboard.byCategory[gameRecord.selectedCategory] =
        leaderboard.byCategory[gameRecord.selectedCategory].slice(0, 10);
    }

    localStorage.setItem(this.KEYS.LEADERBOARD, JSON.stringify(leaderboard));
  }

  // 리더보드 조회
  getLeaderboard() {
    try {
      const data = localStorage.getItem(this.KEYS.LEADERBOARD);
      return data ? JSON.parse(data) : {
        daily: [],
        weekly: [],
        allTime: [],
        byMode: {},
        byCategory: {}
      };
    } catch {
      return {
        daily: [],
        weekly: [],
        allTime: [],
        byMode: {},
        byCategory: {}
      };
    }
  }

  // 최고 점수 조회
  getBestScore(gameMode = null, category = null) {
    const leaderboard = this.getLeaderboard();

    if (category && leaderboard.byCategory[category]?.length > 0) {
      return leaderboard.byCategory[category][0].score;
    }

    if (gameMode && leaderboard.byMode[gameMode]?.length > 0) {
      return leaderboard.byMode[gameMode][0].score;
    }

    if (leaderboard.allTime.length > 0) {
      return leaderboard.allTime[0].score;
    }

    return 0;
  }

  // ===== 사용자 통계 관리 =====

  // 통계 업데이트
  updateUserStats(result) {
    const stats = this.getUserStats();

    // 기본 통계 업데이트
    stats.totalGames++;
    stats.totalQuestions += result.totalQuestions;
    stats.totalCorrect += result.correctAnswers;
    stats.totalScore += result.totalScore;

    // 최고 기록 업데이트
    if (result.totalScore > stats.bestScore) {
      stats.bestScore = result.totalScore;
    }
    if (result.longestStreak > stats.bestStreak) {
      stats.bestStreak = result.longestStreak;
    }

    // 카테고리별 통계 업데이트
    if (result.categoryStats) {
      Object.entries(result.categoryStats).forEach(([category, data]) => {
        if (!stats.categoryStats[category]) {
          stats.categoryStats[category] = { correct: 0, total: 0 };
        }
        stats.categoryStats[category].correct += data.correct;
        stats.categoryStats[category].total += data.total;
      });
    }

    // 모드별 통계 업데이트
    if (!stats.modeStats[result.gameMode]) {
      stats.modeStats[result.gameMode] = { games: 0, totalScore: 0, bestScore: 0 };
    }
    stats.modeStats[result.gameMode].games++;
    stats.modeStats[result.gameMode].totalScore += result.totalScore;
    if (result.totalScore > stats.modeStats[result.gameMode].bestScore) {
      stats.modeStats[result.gameMode].bestScore = result.totalScore;
    }

    // 일별 플레이 기록
    const today = new Date().toISOString().split('T')[0];
    if (!stats.dailyPlays[today]) {
      stats.dailyPlays[today] = 0;
    }
    stats.dailyPlays[today]++;

    // 최근 7일 점수 추이
    stats.scoreHistory.push({
      date: today,
      score: result.totalScore,
      accuracy: result.accuracy
    });
    // 최근 30개만 유지
    if (stats.scoreHistory.length > 30) {
      stats.scoreHistory.shift();
    }

    stats.lastPlayed = new Date().toISOString();

    localStorage.setItem(this.KEYS.USER_STATS, JSON.stringify(stats));
  }

  // 사용자 통계 조회
  getUserStats() {
    try {
      const data = localStorage.getItem(this.KEYS.USER_STATS);
      return data ? JSON.parse(data) : {
        totalGames: 0,
        totalQuestions: 0,
        totalCorrect: 0,
        totalScore: 0,
        bestScore: 0,
        bestStreak: 0,
        categoryStats: {},
        modeStats: {},
        dailyPlays: {},
        scoreHistory: [],
        lastPlayed: null
      };
    } catch {
      return {
        totalGames: 0,
        totalQuestions: 0,
        totalCorrect: 0,
        totalScore: 0,
        bestScore: 0,
        bestStreak: 0,
        categoryStats: {},
        modeStats: {},
        dailyPlays: {},
        scoreHistory: [],
        lastPlayed: null
      };
    }
  }

  // 전체 정답률 계산
  getOverallAccuracy() {
    const stats = this.getUserStats();
    if (stats.totalQuestions === 0) return 0;
    return Math.round((stats.totalCorrect / stats.totalQuestions) * 100);
  }

  // 카테고리별 정답률 계산
  getCategoryAccuracy(category) {
    const stats = this.getUserStats();
    const catStats = stats.categoryStats[category];
    if (!catStats || catStats.total === 0) return 0;
    return Math.round((catStats.correct / catStats.total) * 100);
  }

  // ===== 설정 관리 =====

  // 설정 저장
  saveSettings(settings) {
    const currentSettings = this.getSettings();
    const newSettings = { ...currentSettings, ...settings };
    localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(newSettings));
    return newSettings;
  }

  // 설정 조회
  getSettings() {
    try {
      const data = localStorage.getItem(this.KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        darkMode: false,
        soundEnabled: true,
        playerName: '플레이어'
      };
    } catch {
      return {
        darkMode: false,
        soundEnabled: true,
        playerName: '플레이어'
      };
    }
  }

  // ===== 유틸리티 =====

  // 모든 데이터 삭제
  clearAllData() {
    Object.values(this.KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // 데이터 내보내기
  exportData() {
    return {
      gameHistory: this.getGameHistory(),
      leaderboard: this.getLeaderboard(),
      userStats: this.getUserStats(),
      settings: this.getSettings(),
      exportedAt: new Date().toISOString()
    };
  }

  // 데이터 가져오기
  importData(data) {
    try {
      if (data.gameHistory) {
        localStorage.setItem(this.KEYS.GAME_HISTORY, JSON.stringify(data.gameHistory));
      }
      if (data.leaderboard) {
        localStorage.setItem(this.KEYS.LEADERBOARD, JSON.stringify(data.leaderboard));
      }
      if (data.userStats) {
        localStorage.setItem(this.KEYS.USER_STATS, JSON.stringify(data.userStats));
      }
      if (data.settings) {
        localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(data.settings));
      }
      return true;
    } catch {
      return false;
    }
  }
}

export const localDataManager = new LocalDataManager();
export default LocalDataManager;

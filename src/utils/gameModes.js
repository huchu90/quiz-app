// 게임 모드 설정
export const GAME_MODES = {
  FULL: 'full',
  CATEGORY: 'category',
  SPEED: 'speed'
};

export const gameModeConfig = {
  [GAME_MODES.FULL]: {
    id: 'full',
    name: '전체 도전',
    description: '모든 카테고리에서 40문제에 도전하세요',
    questions: 40,
    timeLimit: null,  // 문제당 시간제한 없음
    hintsAllowed: 3,
    icon: '🏆'
  },
  [GAME_MODES.CATEGORY]: {
    id: 'category',
    name: '카테고리별 도전',
    description: '선택한 카테고리에서 10문제에 도전하세요',
    questions: 10,
    timeLimit: null,
    hintsAllowed: 2,
    icon: '📚'
  },
  [GAME_MODES.SPEED]: {
    id: 'speed',
    name: '스피드 퀴즈',
    description: '문제당 15초! 20문제에 빠르게 도전하세요',
    questions: 20,
    timeLimit: 15,  // 문제당 15초
    hintsAllowed: 1,
    icon: '⚡'
  }
};

export const getGameModeConfig = (mode) => {
  return gameModeConfig[mode] || gameModeConfig[GAME_MODES.FULL];
};

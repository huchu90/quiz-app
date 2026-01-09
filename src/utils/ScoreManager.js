// 점수 계산 및 관리 클래스
class ScoreManager {
  constructor() {
    this.baseScore = 10;
    this.timeBonusThreshold = 10; // 10초 이내 시간 보너스
    this.timeBonus = 3;
    this.noHintBonus = 2;
  }

  // 연속 정답 보너스 계산
  getConsecutiveBonus(consecutiveCorrect) {
    if (consecutiveCorrect < 2) return 0;
    if (consecutiveCorrect < 5) return 2;  // 2-4 연속: +2
    if (consecutiveCorrect < 10) return 5; // 5-9 연속: +5
    return 10; // 10+ 연속: +10
  }

  // 시간 보너스 계산 (빠를수록 높은 보너스)
  getTimeBonus(timeSpent, timeLimit) {
    if (timeLimit === null) {
      // 시간제한 없는 모드: 10초 이내면 보너스
      return timeSpent < this.timeBonusThreshold ? this.timeBonus : 0;
    }

    // 스피드 모드: 남은 시간 비율에 따른 보너스
    const remainingRatio = (timeLimit - timeSpent) / timeLimit;
    if (remainingRatio > 0.7) return 5;  // 70% 이상 남음
    if (remainingRatio > 0.5) return 3;  // 50% 이상 남음
    if (remainingRatio > 0.3) return 1;  // 30% 이상 남음
    return 0;
  }

  // 총 점수 계산
  calculateScore(isCorrect, timeSpent, consecutiveCorrect, hintUsed, timeLimit = null) {
    if (!isCorrect) return 0;

    let score = this.baseScore;

    // 시간 보너스
    score += this.getTimeBonus(timeSpent, timeLimit);

    // 노힌트 보너스
    if (!hintUsed) {
      score += this.noHintBonus;
    }

    // 연속 정답 보너스
    score += this.getConsecutiveBonus(consecutiveCorrect);

    return score;
  }

  // 점수 상세 내역 반환
  getScoreBreakdown(isCorrect, timeSpent, consecutiveCorrect, hintUsed, timeLimit = null) {
    if (!isCorrect) {
      return {
        total: 0,
        base: 0,
        timeBonus: 0,
        noHintBonus: 0,
        comboBonus: 0
      };
    }

    const timeBonus = this.getTimeBonus(timeSpent, timeLimit);
    const noHintBonus = hintUsed ? 0 : this.noHintBonus;
    const comboBonus = this.getConsecutiveBonus(consecutiveCorrect);

    return {
      total: this.baseScore + timeBonus + noHintBonus + comboBonus,
      base: this.baseScore,
      timeBonus,
      noHintBonus,
      comboBonus
    };
  }
}

export const scoreManager = new ScoreManager();
export default ScoreManager;

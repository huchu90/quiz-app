// 퀴즈 문제 데이터 - 4개 카테고리, 각 20문제씩 총 80문제

export const questions = [
  // ===== 한국사 (20문제) =====
  {
    id: 1,
    category: "한국사",
    difficulty: "easy",
    question: "조선을 건국한 왕은 누구인가?",
    options: ["이성계", "왕건", "이방원", "세종"],
    correctAnswer: 0,
    explanation: "이성계는 1392년 조선을 건국하고 태조가 되었습니다."
  },
  {
    id: 2,
    category: "한국사",
    difficulty: "easy",
    question: "한글을 창제한 왕은 누구인가?",
    options: ["태종", "세종대왕", "성종", "영조"],
    correctAnswer: 1,
    explanation: "세종대왕은 1443년 한글(훈민정음)을 창제했습니다."
  },
  {
    id: 3,
    category: "한국사",
    difficulty: "medium",
    question: "임진왜란이 일어난 연도는?",
    options: ["1492년", "1592년", "1692년", "1792년"],
    correctAnswer: 1,
    explanation: "임진왜란은 1592년에 일본의 침략으로 시작되었습니다."
  },
  {
    id: 4,
    category: "한국사",
    difficulty: "medium",
    question: "고려를 건국한 인물은?",
    options: ["궁예", "왕건", "견훤", "김유신"],
    correctAnswer: 1,
    explanation: "왕건은 918년 고려를 건국했습니다."
  },
  {
    id: 5,
    category: "한국사",
    difficulty: "medium",
    question: "3.1 운동이 일어난 연도는?",
    options: ["1910년", "1919년", "1945년", "1948년"],
    correctAnswer: 1,
    explanation: "3.1 운동은 1919년 3월 1일에 일어났습니다."
  },
  {
    id: 6,
    category: "한국사",
    difficulty: "hard",
    question: "조선시대 과거시험 중 문과 최종 시험의 이름은?",
    options: ["초시", "복시", "전시", "향시"],
    correctAnswer: 2,
    explanation: "전시는 임금 앞에서 치르는 문과의 최종 시험입니다."
  },
  {
    id: 7,
    category: "한국사",
    difficulty: "easy",
    question: "대한민국 임시정부가 수립된 도시는?",
    options: ["베이징", "상하이", "난징", "홍콩"],
    correctAnswer: 1,
    explanation: "대한민국 임시정부는 1919년 상하이에서 수립되었습니다."
  },
  {
    id: 8,
    category: "한국사",
    difficulty: "medium",
    question: "신라의 삼국통일이 완성된 연도는?",
    options: ["660년", "668년", "676년", "698년"],
    correctAnswer: 2,
    explanation: "신라는 676년 당나라 군대를 몰아내고 삼국통일을 완성했습니다."
  },
  {
    id: 9,
    category: "한국사",
    difficulty: "hard",
    question: "조선 후기 실학자 정약용이 저술한 책이 아닌 것은?",
    options: ["목민심서", "경세유표", "흠흠신서", "열하일기"],
    correctAnswer: 3,
    explanation: "열하일기는 박지원이 저술한 책입니다."
  },
  {
    id: 10,
    category: "한국사",
    difficulty: "medium",
    question: "을사늑약이 체결된 연도는?",
    options: ["1904년", "1905년", "1907년", "1910년"],
    correctAnswer: 1,
    explanation: "을사늑약(을사조약)은 1905년에 체결되었습니다."
  },
  {
    id: 41,
    category: "한국사",
    difficulty: "easy",
    question: "고구려를 건국한 인물은?",
    options: ["주몽", "온조", "박혁거세", "김수로"],
    correctAnswer: 0,
    explanation: "주몽은 기원전 37년 고구려를 건국했습니다."
  },
  {
    id: 42,
    category: "한국사",
    difficulty: "medium",
    question: "조선시대 신분제도에서 가장 낮은 계층은?",
    options: ["양반", "중인", "상민", "천민"],
    correctAnswer: 3,
    explanation: "천민은 조선시대 신분제도에서 가장 낮은 계층이었습니다."
  },
  {
    id: 43,
    category: "한국사",
    difficulty: "hard",
    question: "동학농민운동이 일어난 연도는?",
    options: ["1884년", "1894년", "1904년", "1914년"],
    correctAnswer: 1,
    explanation: "동학농민운동은 1894년에 일어났습니다."
  },
  {
    id: 44,
    category: "한국사",
    difficulty: "medium",
    question: "광개토대왕이 다스린 나라는?",
    options: ["고구려", "백제", "신라", "가야"],
    correctAnswer: 0,
    explanation: "광개토대왕은 고구려의 19대 왕으로 영토를 크게 확장했습니다."
  },
  {
    id: 45,
    category: "한국사",
    difficulty: "easy",
    question: "대한민국 광복절은 언제인가?",
    options: ["3월 1일", "8월 15일", "10월 3일", "10월 9일"],
    correctAnswer: 1,
    explanation: "광복절은 8월 15일로 1945년 일본으로부터 해방된 날입니다."
  },
  {
    id: 46,
    category: "한국사",
    difficulty: "hard",
    question: "조선시대 서원을 처음 세운 인물은?",
    options: ["이이", "이황", "주세붕", "조광조"],
    correctAnswer: 2,
    explanation: "주세붕은 1543년 백운동서원을 세워 서원의 시초를 열었습니다."
  },
  {
    id: 47,
    category: "한국사",
    difficulty: "medium",
    question: "한국전쟁이 발발한 연도는?",
    options: ["1948년", "1950년", "1953년", "1960년"],
    correctAnswer: 1,
    explanation: "한국전쟁은 1950년 6월 25일에 발발했습니다."
  },
  {
    id: 48,
    category: "한국사",
    difficulty: "easy",
    question: "백제의 마지막 왕은?",
    options: ["무령왕", "성왕", "의자왕", "근초고왕"],
    correctAnswer: 2,
    explanation: "의자왕은 백제의 마지막 왕으로 660년 나당연합군에 패했습니다."
  },
  {
    id: 49,
    category: "한국사",
    difficulty: "hard",
    question: "조선시대 목판 인쇄 지도인 대동여지도를 만든 인물은?",
    options: ["정약용", "김정호", "박지원", "이익"],
    correctAnswer: 1,
    explanation: "김정호는 1861년 대동여지도를 완성했습니다. 22첩으로 구성된 대형 지도입니다."
  },
  {
    id: 50,
    category: "한국사",
    difficulty: "medium",
    question: "고려시대 무신정변이 일어난 연도는?",
    options: ["1170년", "1270년", "1370년", "1470년"],
    correctAnswer: 0,
    explanation: "무신정변은 1170년에 일어나 무신정권이 시작되었습니다."
  },

  // ===== 과학 (20문제) =====
  {
    id: 11,
    category: "과학",
    difficulty: "easy",
    question: "물의 화학식은 무엇인가?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    correctAnswer: 0,
    explanation: "물은 수소 2개와 산소 1개로 이루어진 H2O입니다."
  },
  {
    id: 12,
    category: "과학",
    difficulty: "easy",
    question: "태양계에서 부피와 질량이 가장 큰 행성은?",
    options: ["토성", "목성", "천왕성", "해왕성"],
    correctAnswer: 1,
    explanation: "목성은 태양계에서 부피와 질량 모두 가장 큰 행성입니다."
  },
  {
    id: 13,
    category: "과학",
    difficulty: "medium",
    question: "빛의 속도는 초당 약 몇 km인가?",
    options: ["30만 km", "15만 km", "50만 km", "100만 km"],
    correctAnswer: 0,
    explanation: "빛의 속도는 초당 약 30만 km(299,792 km)입니다."
  },
  {
    id: 14,
    category: "과학",
    difficulty: "medium",
    question: "1953년 DNA 이중나선 구조 모델을 발표한 과학자는?",
    options: ["아인슈타인", "뉴턴", "왓슨과 크릭", "다윈"],
    correctAnswer: 2,
    explanation: "왓슨과 크릭은 1953년 DNA 이중나선 구조 모델을 발표했습니다. (로잘린드 프랭클린의 X선 데이터가 핵심 역할)"
  },
  {
    id: 15,
    category: "과학",
    difficulty: "easy",
    question: "지구의 유일한 자연 위성의 이름은?",
    options: ["태양", "화성", "달", "금성"],
    correctAnswer: 2,
    explanation: "달은 지구의 유일한 자연 위성입니다."
  },
  {
    id: 16,
    category: "과학",
    difficulty: "hard",
    question: "원소 주기율표에서 원자량이 가장 작은 원소는?",
    options: ["헬륨", "수소", "리튬", "탄소"],
    correctAnswer: 1,
    explanation: "수소는 원자번호 1번, 원자량 약 1.008로 가장 가벼운 원소입니다."
  },
  {
    id: 17,
    category: "과학",
    difficulty: "medium",
    question: "광합성에서 식물이 방출하는 기체는?",
    options: ["이산화탄소", "질소", "산소", "수소"],
    correctAnswer: 2,
    explanation: "식물은 광합성 과정에서 산소를 방출합니다."
  },
  {
    id: 18,
    category: "과학",
    difficulty: "hard",
    question: "상대성 이론을 발표한 과학자는?",
    options: ["뉴턴", "갈릴레오", "아인슈타인", "호킹"],
    correctAnswer: 2,
    explanation: "아인슈타인은 1905년 특수상대성이론을 발표했습니다."
  },
  {
    id: 19,
    category: "과학",
    difficulty: "medium",
    question: "인체에서 면적이 가장 큰 장기는?",
    options: ["심장", "간", "폐", "피부"],
    correctAnswer: 3,
    explanation: "피부는 약 1.5~2m²의 면적으로 인체에서 가장 큰 장기입니다."
  },
  {
    id: 20,
    category: "과학",
    difficulty: "easy",
    question: "철의 원소 기호는?",
    options: ["Fe", "Cu", "Ag", "Au"],
    correctAnswer: 0,
    explanation: "철의 원소 기호는 Fe(Ferrum)입니다."
  },
  {
    id: 51,
    category: "과학",
    difficulty: "easy",
    question: "인체에서 혈액을 순환시키는 장기는?",
    options: ["폐", "간", "심장", "신장"],
    correctAnswer: 2,
    explanation: "심장은 혈액을 온몸으로 순환시키는 펌프 역할을 합니다."
  },
  {
    id: 52,
    category: "과학",
    difficulty: "medium",
    question: "지구 대기에서 부피 기준 가장 많은 비율을 차지하는 기체는?",
    options: ["산소", "질소", "이산화탄소", "아르곤"],
    correctAnswer: 1,
    explanation: "질소는 대기 부피의 약 78%를 차지합니다."
  },
  {
    id: 53,
    category: "과학",
    difficulty: "hard",
    question: "블랙홀의 경계면을 무엇이라 하는가?",
    options: ["지평선", "사건의 지평선", "슈바르츠실트 반지름", "특이점"],
    correctAnswer: 1,
    explanation: "사건의 지평선은 빛조차 탈출할 수 없는 블랙홀의 경계입니다."
  },
  {
    id: 54,
    category: "과학",
    difficulty: "easy",
    question: "물이 끓는 온도는 몇 도인가? (기압 1기압 기준)",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctAnswer: 1,
    explanation: "물은 1기압에서 100°C에서 끓습니다."
  },
  {
    id: 55,
    category: "과학",
    difficulty: "medium",
    question: "뉴턴이 발견한 법칙이 아닌 것은?",
    options: ["만유인력의 법칙", "운동의 3법칙", "열역학 제2법칙", "작용-반작용 법칙"],
    correctAnswer: 2,
    explanation: "열역학 제2법칙은 뉴턴이 아닌 다른 과학자들이 발견했습니다."
  },
  {
    id: 56,
    category: "과학",
    difficulty: "hard",
    question: "자연선택에 의한 진화론을 주장한 과학자는?",
    options: ["멘델", "다윈", "파스퇴르", "코흐"],
    correctAnswer: 1,
    explanation: "찰스 다윈은 종의 기원에서 자연선택에 의한 진화론을 발표했습니다."
  },
  {
    id: 57,
    category: "과학",
    difficulty: "medium",
    question: "태양에서 지구까지 빛이 도달하는 시간은 약?",
    options: ["1분", "8분", "1시간", "1일"],
    correctAnswer: 1,
    explanation: "태양빛이 지구에 도달하는 데 약 8분 20초가 걸립니다."
  },
  {
    id: 58,
    category: "과학",
    difficulty: "easy",
    question: "소금의 화학식은?",
    options: ["H2O", "NaCl", "CO2", "CaCO3"],
    correctAnswer: 1,
    explanation: "소금(염화나트륨)의 화학식은 NaCl입니다."
  },
  {
    id: 59,
    category: "과학",
    difficulty: "hard",
    question: "양자역학의 불확정성 원리를 발표한 과학자는?",
    options: ["슈뢰딩거", "하이젠베르크", "보어", "플랑크"],
    correctAnswer: 1,
    explanation: "하이젠베르크는 1927년 불확정성 원리를 발표했습니다."
  },
  {
    id: 60,
    category: "과학",
    difficulty: "medium",
    question: "인체에서 적혈구가 만들어지는 곳은?",
    options: ["심장", "간", "골수", "비장"],
    correctAnswer: 2,
    explanation: "적혈구는 뼈 안의 골수에서 생성됩니다."
  },

  // ===== 지리 (20문제) =====
  {
    id: 21,
    category: "지리",
    difficulty: "easy",
    question: "해발 고도 기준 세계에서 가장 높은 산은?",
    options: ["K2", "에베레스트", "킬리만자로", "몽블랑"],
    correctAnswer: 1,
    explanation: "에베레스트는 해발 8,848.86m(2020년 측정)로 세계에서 가장 높은 산입니다."
  },
  {
    id: 22,
    category: "지리",
    difficulty: "easy",
    question: "세계에서 면적이 가장 큰 대륙은?",
    options: ["아프리카", "북아메리카", "아시아", "유럽"],
    correctAnswer: 2,
    explanation: "아시아는 약 4,458만 km²로 세계에서 면적이 가장 큰 대륙입니다."
  },
  {
    id: 23,
    category: "지리",
    difficulty: "medium",
    question: "나일강이 흐르는 대륙은?",
    options: ["아시아", "유럽", "아프리카", "남아메리카"],
    correctAnswer: 2,
    explanation: "나일강은 아프리카 대륙을 흐르며 전통적으로 세계에서 가장 긴 강으로 인정됩니다."
  },
  {
    id: 24,
    category: "지리",
    difficulty: "medium",
    question: "대한민국의 수도는?",
    options: ["부산", "서울", "인천", "대구"],
    correctAnswer: 1,
    explanation: "서울은 대한민국의 수도입니다."
  },
  {
    id: 25,
    category: "지리",
    difficulty: "hard",
    question: "면적 기준 세계에서 가장 작은 독립국은?",
    options: ["모나코", "바티칸", "산마리노", "리히텐슈타인"],
    correctAnswer: 1,
    explanation: "바티칸은 면적 0.44km²로 세계에서 가장 작은 독립국입니다."
  },
  {
    id: 26,
    category: "지리",
    difficulty: "easy",
    question: "일본의 수도는?",
    options: ["오사카", "교토", "도쿄", "나고야"],
    correctAnswer: 2,
    explanation: "도쿄는 일본의 수도입니다."
  },
  {
    id: 27,
    category: "지리",
    difficulty: "medium",
    question: "전통적으로 세계에서 가장 긴 강으로 인정받는 강은?",
    options: ["아마존강", "나일강", "양쯔강", "미시시피강"],
    correctAnswer: 1,
    explanation: "나일강은 약 6,650km로 전통적으로 가장 긴 강으로 인정됩니다. (아마존강도 측정 방식에 따라 더 길 수 있음)"
  },
  {
    id: 28,
    category: "지리",
    difficulty: "medium",
    question: "호주의 수도는?",
    options: ["시드니", "멜버른", "캔버라", "브리즈번"],
    correctAnswer: 2,
    explanation: "캔버라는 호주의 수도입니다. 시드니가 아닙니다."
  },
  {
    id: 29,
    category: "지리",
    difficulty: "hard",
    question: "면적 기준 세계에서 가장 큰 사막은? (한랭 사막 포함)",
    options: ["사하라 사막", "고비 사막", "남극 사막", "아라비아 사막"],
    correctAnswer: 2,
    explanation: "남극 사막은 약 1,400만 km²로 세계 최대의 사막입니다. (열대 사막 중에서는 사하라가 최대)"
  },
  {
    id: 30,
    category: "지리",
    difficulty: "easy",
    question: "태평양과 대서양을 연결하는 운하는?",
    options: ["수에즈 운하", "파나마 운하", "키엘 운하", "코린트 운하"],
    correctAnswer: 1,
    explanation: "파나마 운하는 태평양과 대서양을 연결합니다."
  },
  {
    id: 61,
    category: "지리",
    difficulty: "easy",
    question: "세계에서 면적이 가장 큰 바다(대양)는?",
    options: ["대서양", "인도양", "태평양", "북극해"],
    correctAnswer: 2,
    explanation: "태평양은 약 1억 6,500만 km²로 지구 표면의 약 1/3을 차지합니다."
  },
  {
    id: 62,
    category: "지리",
    difficulty: "medium",
    question: "영국의 수도는?",
    options: ["맨체스터", "리버풀", "런던", "에든버러"],
    correctAnswer: 2,
    explanation: "런던은 영국의 수도입니다."
  },
  {
    id: 63,
    category: "지리",
    difficulty: "hard",
    question: "최대 수심 기준 세계에서 가장 깊은 호수는?",
    options: ["카스피해", "바이칼 호수", "빅토리아 호수", "슈피리어 호수"],
    correctAnswer: 1,
    explanation: "바이칼 호수는 최대 수심 1,642m로 세계에서 가장 깊은 호수입니다."
  },
  {
    id: 64,
    category: "지리",
    difficulty: "easy",
    question: "이탈리아의 수도는?",
    options: ["밀라노", "베네치아", "로마", "피렌체"],
    correctAnswer: 2,
    explanation: "로마는 이탈리아의 수도입니다."
  },
  {
    id: 65,
    category: "지리",
    difficulty: "medium",
    question: "2023년 기준 세계에서 인구가 가장 많은 나라는?",
    options: ["미국", "인도", "중국", "인도네시아"],
    correctAnswer: 1,
    explanation: "인도는 2023년 기준 세계에서 인구가 가장 많은 나라입니다."
  },
  {
    id: 66,
    category: "지리",
    difficulty: "hard",
    question: "적도가 지나는 대륙이 아닌 것은?",
    options: ["아시아", "아프리카", "유럽", "남아메리카"],
    correctAnswer: 2,
    explanation: "유럽은 적도가 지나지 않습니다."
  },
  {
    id: 67,
    category: "지리",
    difficulty: "medium",
    question: "세계에서 면적이 가장 큰 나라는?",
    options: ["캐나다", "미국", "중국", "러시아"],
    correctAnswer: 3,
    explanation: "러시아는 약 1,710만 km²로 세계에서 면적이 가장 큰 나라입니다."
  },
  {
    id: 68,
    category: "지리",
    difficulty: "easy",
    question: "프랑스의 수도는?",
    options: ["마르세유", "리옹", "파리", "니스"],
    correctAnswer: 2,
    explanation: "파리는 프랑스의 수도입니다."
  },
  {
    id: 69,
    category: "지리",
    difficulty: "hard",
    question: "전통적으로 유럽과 아시아의 경계로 여겨지는 산맥은?",
    options: ["알프스 산맥", "히말라야 산맥", "우랄 산맥", "안데스 산맥"],
    correctAnswer: 2,
    explanation: "우랄 산맥은 전통적으로 유럽과 아시아의 경계로 여겨집니다."
  },
  {
    id: 70,
    category: "지리",
    difficulty: "medium",
    question: "해발 고도 기준 한반도에서 가장 높은 산은?",
    options: ["지리산", "설악산", "한라산", "백두산"],
    correctAnswer: 3,
    explanation: "백두산은 해발 2,744m로 한반도에서 가장 높은 산입니다."
  },

  // ===== 일반상식 (20문제) =====
  {
    id: 31,
    category: "일반상식",
    difficulty: "easy",
    question: "하계 올림픽은 몇 년마다 개최되는가?",
    options: ["2년", "3년", "4년", "5년"],
    correctAnswer: 2,
    explanation: "하계 올림픽은 4년마다 개최됩니다. (동계 올림픽도 4년 주기)"
  },
  {
    id: 32,
    category: "일반상식",
    difficulty: "easy",
    question: "축구 경기에서 필드에 출전하는 한 팀의 선수는 몇 명인가?",
    options: ["9명", "10명", "11명", "12명"],
    correctAnswer: 2,
    explanation: "축구 경기에서 한 팀은 필드에 11명의 선수가 출전합니다."
  },
  {
    id: 33,
    category: "일반상식",
    difficulty: "medium",
    question: "피아노의 흰 건반과 검은 건반의 총 개수는?",
    options: ["76개", "88개", "92개", "100개"],
    correctAnswer: 1,
    explanation: "표준 피아노는 88개의 건반을 가지고 있습니다."
  },
  {
    id: 34,
    category: "일반상식",
    difficulty: "easy",
    question: "한국에서 전통적으로 무지개는 몇 가지 색으로 구분하는가?",
    options: ["5가지", "6가지", "7가지", "8가지"],
    correctAnswer: 2,
    explanation: "한국에서는 무지개를 빨주노초파남보 7가지 색으로 구분합니다."
  },
  {
    id: 35,
    category: "일반상식",
    difficulty: "medium",
    question: "원어민 화자 수 기준 세계에서 가장 많이 사용되는 언어는?",
    options: ["영어", "스페인어", "중국어", "힌디어"],
    correctAnswer: 2,
    explanation: "중국어(만다린)는 약 9억 명 이상의 원어민 화자를 가진 언어입니다."
  },
  {
    id: 36,
    category: "일반상식",
    difficulty: "hard",
    question: "UN(국제연합)이 창설된 연도는?",
    options: ["1919년", "1939년", "1945년", "1950년"],
    correctAnswer: 2,
    explanation: "UN은 1945년 10월 24일에 창설되었습니다."
  },
  {
    id: 37,
    category: "일반상식",
    difficulty: "medium",
    question: "비틀즈가 결성된 나라는?",
    options: ["미국", "영국", "독일", "호주"],
    correctAnswer: 1,
    explanation: "비틀즈는 1960년 영국 리버풀에서 결성되었습니다."
  },
  {
    id: 38,
    category: "일반상식",
    difficulty: "easy",
    question: "대한민국의 국화(國花)는?",
    options: ["장미", "무궁화", "벚꽃", "국화"],
    correctAnswer: 1,
    explanation: "무궁화는 대한민국의 국화입니다."
  },
  {
    id: 39,
    category: "일반상식",
    difficulty: "hard",
    question: "노벨상을 제정한 알프레드 노벨의 국적은?",
    options: ["노르웨이", "덴마크", "스웨덴", "핀란드"],
    correctAnswer: 2,
    explanation: "알프레드 노벨은 스웨덴의 화학자이자 발명가입니다."
  },
  {
    id: 40,
    category: "일반상식",
    difficulty: "medium",
    question: "체스에서 상대 킹이 도망갈 수 없는 상태로 공격하여 게임을 끝내는 것은?",
    options: ["체크", "체크메이트", "스테일메이트", "캐슬링"],
    correctAnswer: 1,
    explanation: "체크메이트는 킹이 공격받고 있으며 피할 수 없는 상태로 게임이 종료됩니다."
  },
  {
    id: 71,
    category: "일반상식",
    difficulty: "easy",
    question: "1년은 몇 개월인가?",
    options: ["10개월", "11개월", "12개월", "13개월"],
    correctAnswer: 2,
    explanation: "1년은 12개월입니다."
  },
  {
    id: 72,
    category: "일반상식",
    difficulty: "medium",
    question: "모나리자를 그린 화가는?",
    options: ["피카소", "반 고흐", "레오나르도 다 빈치", "미켈란젤로"],
    correctAnswer: 2,
    explanation: "모나리자는 레오나르도 다 빈치가 그린 작품입니다."
  },
  {
    id: 73,
    category: "일반상식",
    difficulty: "hard",
    question: "컴퓨터 알고리즘을 최초로 작성하여 '최초의 프로그래머'로 널리 인정받는 인물은?",
    options: ["앨런 튜링", "에이다 러브레이스", "찰스 배비지", "존 폰 노이만"],
    correctAnswer: 1,
    explanation: "에이다 러브레이스는 1843년 찰스 배비지의 해석기관을 위한 알고리즘을 작성했습니다."
  },
  {
    id: 74,
    category: "일반상식",
    difficulty: "easy",
    question: "농구에서 코트에 출전하는 한 팀의 선수는 몇 명인가?",
    options: ["4명", "5명", "6명", "7명"],
    correctAnswer: 1,
    explanation: "농구 경기에서 한 팀은 코트에 5명의 선수가 출전합니다."
  },
  {
    id: 75,
    category: "일반상식",
    difficulty: "medium",
    question: "햄릿, 오셀로 등을 쓴 작가는?",
    options: ["괴테", "셰익스피어", "톨스토이", "헤밍웨이"],
    correctAnswer: 1,
    explanation: "윌리엄 셰익스피어는 햄릿, 오셀로, 맥베스 등 많은 명작을 남겼습니다."
  },
  {
    id: 76,
    category: "일반상식",
    difficulty: "hard",
    question: "인터넷의 전신인 ARPANET이 개발된 나라는?",
    options: ["영국", "미국", "일본", "독일"],
    correctAnswer: 1,
    explanation: "ARPANET은 1969년 미국 국방부에서 개발되었습니다."
  },
  {
    id: 77,
    category: "일반상식",
    difficulty: "easy",
    question: "타이타닉호가 침몰한 해는?",
    options: ["1902년", "1912년", "1922년", "1932년"],
    correctAnswer: 1,
    explanation: "타이타닉호는 1912년 4월 15일 첫 항해 중 침몰했습니다."
  },
  {
    id: 78,
    category: "일반상식",
    difficulty: "medium",
    question: "커피의 원산지로 알려진 나라는?",
    options: ["브라질", "콜롬비아", "에티오피아", "베트남"],
    correctAnswer: 2,
    explanation: "커피는 에티오피아에서 처음 발견된 것으로 알려져 있습니다."
  },
  {
    id: 79,
    category: "일반상식",
    difficulty: "hard",
    question: "세계 최초의 인공위성 이름은?",
    options: ["아폴로", "보이저", "스푸트니크", "허블"],
    correctAnswer: 2,
    explanation: "스푸트니크 1호는 1957년 소련이 발사한 세계 최초의 인공위성입니다."
  },
  {
    id: 80,
    category: "일반상식",
    difficulty: "medium",
    question: "세계보건기구(WHO)의 본부가 있는 도시는?",
    options: ["뉴욕", "파리", "제네바", "런던"],
    correctAnswer: 2,
    explanation: "WHO 본부는 스위스 제네바에 있습니다."
  }
];

// 카테고리 목록
export const categories = ["한국사", "과학", "지리", "일반상식"];

// 카테고리별 문제 필터링 함수
export const getQuestionsByCategory = (category) => {
  return questions.filter(q => q.category === category);
};

// 문제 섞기 함수
export const shuffleQuestions = (questionsArray) => {
  const shuffled = [...questionsArray];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

(function () {
  "use strict";

  const STARTER_PACK_VERSION = "2026-07-07";
  const STORAGE_KEYS = {
    cards: "droneMotorEnglish.cards.v1",
    progress: "droneMotorEnglish.progress.v1",
    records: "droneMotorEnglish.records.v1",
    settings: "droneMotorEnglish.settings.v1",
    packVersion: "droneMotorEnglish.starterPackVersion.v1"
  };

  const DEFAULT_SETTINGS = {
    dailyTargetCards: 10
  };

  const IMPORT_FIELD_KEYS = ["CARD", "CATEGORY", "KOREAN", "ENGLISH", "NOTE"];
  const TEMPLATE_PLACEHOLDERS = [
    "English sentence",
    "The English sentence I want to practice.",
    "Write the English sentence you want to practice.",
    "한국어 문장",
    "한국어로 내가 말하고 싶은 뜻",
    "한국어로 내가 고객에게 말하고 싶은 내용을 한 문장으로 적으세요."
  ];

  const STARTER_CARDS = [
    {
      id: "starter-performance-01",
      english: "Our motor is optimized for longer flight time.",
      korean: "이 모터는 더 긴 비행 시간을 위해 최적화되어 있습니다.",
      category: "Flight time"
    },
    {
      id: "starter-performance-02",
      english: "It delivers high thrust without wasting unnecessary power.",
      korean: "불필요한 전력 낭비 없이 높은 추력을 제공합니다.",
      category: "Performance and efficiency"
    },
    {
      id: "starter-efficiency-01",
      english: "The higher efficiency helps reduce battery consumption.",
      korean: "효율이 높아서 배터리 소모를 줄이는 데 도움이 됩니다.",
      category: "Performance and efficiency"
    },
    {
      id: "starter-efficiency-02",
      english: "This gives your drone more usable flight time in real operation.",
      korean: "실제 운용에서 드론의 실사용 비행 시간을 늘려줍니다.",
      category: "Flight time"
    },
    {
      id: "starter-heat-01",
      english: "The motor runs cooler under continuous load.",
      korean: "이 모터는 연속 부하 조건에서도 더 낮은 온도로 작동합니다.",
      category: "Heat and reliability"
    },
    {
      id: "starter-heat-02",
      english: "Lower heat means better reliability during long missions.",
      korean: "발열이 낮다는 것은 장시간 임무에서 더 높은 신뢰성을 의미합니다.",
      category: "Heat and reliability"
    },
    {
      id: "starter-reliability-01",
      english: "We designed this motor for stable performance in demanding conditions.",
      korean: "까다로운 조건에서도 안정적인 성능을 내도록 설계했습니다.",
      category: "Heat and reliability"
    },
    {
      id: "starter-reliability-02",
      english: "It is suitable for drones that need consistent output over time.",
      korean: "시간이 지나도 일정한 출력을 유지해야 하는 드론에 적합합니다.",
      category: "Heat and reliability"
    },
    {
      id: "starter-integration-01",
      english: "The motor can be integrated into your existing platform with minimal changes.",
      korean: "기존 플랫폼에 큰 변경 없이 적용할 수 있습니다.",
      category: "Integration and compatibility"
    },
    {
      id: "starter-integration-02",
      english: "We can support matching the motor with your propeller and ESC setup.",
      korean: "프로펠러와 ESC 구성에 맞춰 모터 매칭을 지원할 수 있습니다.",
      category: "Integration and compatibility"
    },
    {
      id: "starter-sales-01",
      english: "The key advantage is the balance between efficiency, thrust, and reliability.",
      korean: "핵심 장점은 효율, 추력, 신뢰성의 균형입니다.",
      category: "Sales pitch"
    },
    {
      id: "starter-sales-02",
      english: "This motor is a good fit for customers who need longer endurance.",
      korean: "더 긴 체공 시간이 필요한 고객에게 잘 맞는 모터입니다.",
      category: "Sales pitch"
    },
    {
      id: "starter-sales-03",
      english: "Compared with a standard motor, this model focuses more on efficiency.",
      korean: "일반 모터와 비교하면 이 모델은 효율에 더 초점을 맞췄습니다.",
      category: "Sales pitch"
    },
    {
      id: "starter-question-01",
      english: "Could you tell us your target payload and flight time?",
      korean: "목표 페이로드와 비행 시간을 알려주실 수 있을까요?",
      category: "Customer questions"
    },
    {
      id: "starter-question-02",
      english: "What propeller size are you currently using?",
      korean: "현재 사용 중인 프로펠러 크기는 어떻게 되나요?",
      category: "Customer questions"
    },
    {
      id: "starter-question-03",
      english: "Is your priority maximum thrust or better endurance?",
      korean: "우선순위가 최대 추력인가요, 아니면 더 긴 체공 시간인가요?",
      category: "Customer questions"
    },
    {
      id: "starter-answer-01",
      english: "Based on your requirements, we would recommend this winding option.",
      korean: "요구 조건을 기준으로 이 권선 옵션을 추천드립니다.",
      category: "Customer questions"
    },
    {
      id: "starter-answer-02",
      english: "We can provide test data for thrust, current, and efficiency.",
      korean: "추력, 전류, 효율에 대한 테스트 데이터를 제공할 수 있습니다.",
      category: "Performance and efficiency"
    },
    {
      id: "starter-meeting-01",
      english: "Let me explain why this motor is suitable for your drone platform.",
      korean: "이 모터가 귀사의 드론 플랫폼에 적합한 이유를 설명드리겠습니다.",
      category: "Sales pitch"
    },
    {
      id: "starter-meeting-02",
      english: "The main benefit is stable output during long-duration operation.",
      korean: "주요 장점은 장시간 운용 중에도 안정적인 출력을 제공한다는 점입니다.",
      category: "Sales pitch"
    },
    {
      id: "starter-meeting-03",
      english: "If needed, we can adjust the specification for your application.",
      korean: "필요하다면 귀사의 적용 분야에 맞게 사양을 조정할 수 있습니다.",
      category: "Integration and compatibility"
    },
    {
      id: "starter-objection-01",
      english: "The initial price may be higher, but the operating efficiency can reduce total cost.",
      korean: "초기 가격은 높을 수 있지만 운용 효율이 전체 비용을 줄일 수 있습니다.",
      category: "Sales pitch"
    },
    {
      id: "starter-objection-02",
      english: "We can start with a sample test before moving to production volume.",
      korean: "양산 물량으로 가기 전에 샘플 테스트부터 시작할 수 있습니다.",
      category: "Customer questions"
    },
    {
      id: "starter-closing-01",
      english: "After the test, we can review the data together and choose the best option.",
      korean: "테스트 후 데이터를 함께 검토하고 최적의 옵션을 선택할 수 있습니다.",
      category: "Sales pitch"
    },
    {
      id: "presentation-company-20260707-01",
      english: "Hello. My name is Sam from Namyang Nexmo in South Korea.",
      korean: "안녕하세요. 저는 한국 남양넥스모의 Sam입니다.",
      category: "Company introduction"
    },
    {
      id: "presentation-company-20260707-02",
      english: "I am in charge of motor design, and today I am going to introduce our New Business Team.",
      korean: "저는 모터 설계를 담당하고 있으며, 오늘은 저희 신사업팀을 소개드리겠습니다.",
      category: "Company introduction"
    },
    {
      id: "presentation-company-20260707-03",
      english: "Namyang Nexmo is a manufacturing company specializing in automotive components.",
      korean: "남양넥스모는 자동차 부품을 전문으로 하는 제조 회사입니다.",
      category: "Company introduction"
    },
    {
      id: "presentation-company-20260707-04",
      english: "We have extensive experience in steering columns, EPS parts, and brake systems.",
      korean: "저희는 스티어링 컬럼, EPS 부품, 브레이크 시스템 분야에서 풍부한 경험을 가지고 있습니다.",
      category: "Company capability"
    },
    {
      id: "presentation-company-20260707-05",
      english: "Based on this experience, we are expanding our business into the drone industry and future mobility solutions.",
      korean: "이러한 경험을 바탕으로 드론 산업과 미래 모빌리티 솔루션으로 사업을 확장하고 있습니다.",
      category: "Drone business"
    },
    {
      id: "presentation-product-20260707-01",
      english: "We develop and manufacture UAS propulsion motors, ESCs, and hybrid engines.",
      korean: "저희는 UAS 추진 모터, ESC, 하이브리드 엔진을 개발하고 제조합니다.",
      category: "Product lineup"
    },
    {
      id: "presentation-product-20260707-02",
      english: "Our products are designed for industrial and defense applications.",
      korean: "저희 제품은 산업용 및 방산용 적용 분야를 위해 설계되었습니다.",
      category: "Product lineup"
    },
    {
      id: "presentation-company-20260707-06",
      english: "Our company generates approximately 500 million U.S. dollars in annual revenue.",
      korean: "저희 회사는 연간 약 5억 달러의 매출을 기록하고 있습니다.",
      category: "Company capability"
    },
    {
      id: "presentation-company-20260707-07",
      english: "We have more than 1,550 employees worldwide.",
      korean: "저희는 전 세계에 1,550명 이상의 임직원을 보유하고 있습니다.",
      category: "Company capability"
    },
    {
      id: "presentation-company-20260707-08",
      english: "We operate manufacturing plants in five countries, including Mexico and Poland.",
      korean: "저희는 멕시코와 폴란드를 포함한 5개국에서 생산 공장을 운영하고 있습니다.",
      category: "Manufacturing and supply"
    },
    {
      id: "presentation-company-20260707-09",
      english: "We also have offices in the United States and Germany.",
      korean: "또한 미국과 독일에도 사무소를 두고 있습니다.",
      category: "Manufacturing and supply"
    },
    {
      id: "presentation-quality-20260707-01",
      english: "We are certified to IATF and ISO standards as well as TISAX.",
      korean: "저희는 IATF, ISO, TISAX 인증을 보유하고 있습니다.",
      category: "Quality and traceability"
    },
    {
      id: "presentation-quality-20260707-02",
      english: "These are safety-critical components, so quality and reliability are extremely important to us.",
      korean: "이 제품들은 안전과 직결되는 부품이기 때문에 품질과 신뢰성이 매우 중요합니다.",
      category: "Quality and traceability"
    },
    {
      id: "presentation-company-20260707-10",
      english: "Our company slogan is 'We Make Next Mobility.'",
      korean: "저희 회사의 슬로건은 'We Make Next Mobility'입니다.",
      category: "Company introduction"
    },
    {
      id: "presentation-company-20260707-11",
      english: "This reflects our commitment to people, safety, and technology.",
      korean: "이 슬로건은 사람, 안전, 기술에 대한 저희의 약속을 담고 있습니다.",
      category: "Company introduction"
    },
    {
      id: "presentation-history-20260707-01",
      english: "In the past, we developed motors for electric boats and submarines.",
      korean: "과거에는 전기 보트와 잠수함용 모터를 개발했습니다.",
      category: "Company capability"
    },
    {
      id: "presentation-history-20260707-02",
      english: "Today, we are focused on drone motors and propulsion systems.",
      korean: "현재는 드론 모터와 추진 시스템에 집중하고 있습니다.",
      category: "Drone business"
    },
    {
      id: "presentation-product-20260707-03",
      english: "We have developed 12 different types of motors, ranging from 130 watts to 11.5 kilowatts.",
      korean: "저희는 130와트부터 11.5킬로와트까지 12종의 모터를 개발했습니다.",
      category: "Product lineup"
    },
    {
      id: "presentation-product-20260707-04",
      english: "We also have six types of controllers, covering current ranges from 20 amps to 300 amps.",
      korean: "또한 20암페어부터 300암페어까지 대응하는 6종의 컨트롤러를 보유하고 있습니다.",
      category: "Product lineup"
    },
    {
      id: "presentation-manufacturing-20260707-01",
      english: "Namyang Nexmo has its own drone production line.",
      korean: "남양넥스모는 자체 드론 생산 라인을 보유하고 있습니다.",
      category: "Manufacturing and supply"
    },
    {
      id: "presentation-manufacturing-20260707-02",
      english: "Our production capacity is up to 150,000 units per year.",
      korean: "저희 생산 능력은 연간 최대 15만 대입니다.",
      category: "Manufacturing and supply"
    },
    {
      id: "presentation-quality-20260707-03",
      english: "We use a barcode system to ensure full product traceability.",
      korean: "저희는 바코드 시스템을 사용해 제품의 완전한 추적성을 확보합니다.",
      category: "Quality and traceability"
    },
    {
      id: "presentation-product-20260707-05",
      english: "Our hybrid engine system for multi-rotor and fixed-wing UAS platforms has completed basic performance verification.",
      korean: "멀티로터 및 고정익 UAS 플랫폼용 하이브리드 엔진 시스템은 기본 성능 검증을 완료했습니다.",
      category: "Product lineup"
    },
    {
      id: "presentation-product-20260707-06",
      english: "We are currently validating each key component.",
      korean: "현재 각 핵심 부품을 검증하고 있습니다.",
      category: "Product lineup"
    },
    {
      id: "presentation-application-20260707-01",
      english: "Namyang motors have been applied to many drone platforms and applications.",
      korean: "남양 모터는 다양한 드론 플랫폼과 적용 분야에 사용되어 왔습니다.",
      category: "Drone business"
    },
    {
      id: "presentation-application-20260707-02",
      english: "Through various development projects, we have received positive feedback from customers in Korea.",
      korean: "다양한 개발 프로젝트를 통해 국내 고객들로부터 긍정적인 피드백을 받았습니다.",
      category: "Customer proof"
    },
    {
      id: "presentation-custom-20260707-01",
      english: "We can develop and supply customized motors and ESCs based on customer requirements.",
      korean: "저희는 고객 요구 조건에 맞춰 맞춤형 모터와 ESC를 개발하고 공급할 수 있습니다.",
      category: "Customization"
    },
    {
      id: "presentation-supply-20260707-01",
      english: "We provide scalable manufacturing and a reliable supply chain with full traceability.",
      korean: "저희는 완전한 추적성을 갖춘 확장 가능한 제조 역량과 신뢰성 있는 공급망을 제공합니다.",
      category: "Manufacturing and supply"
    },
    {
      id: "presentation-supply-20260707-02",
      english: "This helps support critical drone programs with confidence, consistency, and speed.",
      korean: "이는 중요한 드론 프로그램을 신뢰성, 일관성, 속도 측면에서 지원하는 데 도움이 됩니다.",
      category: "Customer proof"
    },
    {
      id: "presentation-development-20260707-01",
      english: "We support the entire product development process, from design and optimization to manufacturing, testing, and validation.",
      korean: "저희는 설계와 최적화부터 제조, 시험, 검증까지 전체 제품 개발 과정을 지원합니다.",
      category: "Customization"
    },
    {
      id: "presentation-differentiator-20260707-01",
      english: "Our differentiator is stable mass production based on automotive-quality manufacturing systems.",
      korean: "저희의 차별점은 자동차 품질 수준의 제조 시스템을 기반으로 한 안정적인 양산 역량입니다.",
      category: "Sales pitch"
    },
    {
      id: "presentation-differentiator-20260707-02",
      english: "We also respond quickly to customer-specific requirements and market demands.",
      korean: "또한 고객별 요구 사항과 시장 수요에 빠르게 대응합니다.",
      category: "Customer questions"
    },
    {
      id: "presentation-closing-20260707-01",
      english: "If you have any questions, please feel free to contact us by email or phone.",
      korean: "궁금한 점이 있으시면 이메일이나 전화로 언제든지 연락해 주세요.",
      category: "Closing"
    }
  ].map(function (card) {
    return Object.assign({}, card, {
      source: "starter",
      createdAt: "2026-07-07T00:00:00.000Z",
      updatedAt: "2026-07-07T00:00:00.000Z"
    });
  });

  const state = {
    screen: "today",
    session: null,
    editingCardId: null,
    message: null,
    filterText: "",
    filterCategory: "all",
    filterStudyState: "active"
  };

  const main = document.getElementById("main");
  const todayLabel = document.getElementById("todayLabel");

  document.addEventListener("DOMContentLoaded", function () {
    seedStorage();
    todayLabel.textContent = formatDisplayDate(new Date());
    render();
  });

  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);

  function handleClick(event) {
    const actionButton = event.target.closest("[data-action]");
    const screenButton = event.target.closest("[data-screen]");

    if (screenButton) {
      setScreen(screenButton.dataset.screen);
      return;
    }

    if (!actionButton) {
      return;
    }

    const action = actionButton.dataset.action;
    const id = actionButton.dataset.id;

    if (action === "start-session") {
      startSession(false);
    }

    if (action === "restart-session") {
      startSession(true);
    }

    if (action === "next-stage") {
      movePracticeStage();
    }

    if (action === "mark-card") {
      markCurrentCard(actionButton.dataset.status);
    }

    if (action === "restore-card") {
      restoreCard(id);
    }

    if (action === "edit-card") {
      state.editingCardId = id;
      state.message = null;
      renderCards();
      focusMain();
    }

    if (action === "cancel-edit") {
      state.editingCardId = null;
      state.message = null;
      renderCards();
      focusMain();
    }

    if (action === "delete-card") {
      deleteCard(id);
    }
  }

  function handleSubmit(event) {
    if (event.target.id !== "cardForm") {
      return;
    }

    event.preventDefault();
    saveCardFromForm(event.target);
  }

  function handleInput(event) {
    if (event.target.id === "cardSearch") {
      state.filterText = event.target.value;
      renderCardListOnly();
    }
  }

  function handleChange(event) {
    if (event.target.id === "pptUpload") {
      const file = event.target.files && event.target.files[0];
      event.target.value = "";
      importCardsFromPptx(file);
      return;
    }

    if (event.target.id === "categoryFilter") {
      state.filterCategory = event.target.value;
      renderCardListOnly();
    }

    if (event.target.id === "studyStateFilter") {
      state.filterStudyState = event.target.value;
      renderCardListOnly();
    }
  }

  function setScreen(screen) {
    state.screen = screen;
    state.message = null;
    if (screen !== "cards") {
      state.editingCardId = null;
    }
    render();
    focusMain();
  }

  function render() {
    updateNav();

    if (state.screen === "today") {
      renderToday();
    } else if (state.screen === "practice") {
      renderPractice();
    } else if (state.screen === "cards") {
      renderCards();
    } else if (state.screen === "records") {
      renderRecords();
    } else if (state.screen === "complete") {
      renderComplete();
    }
  }

  function updateNav() {
    document.querySelectorAll(".nav-button").forEach(function (button) {
      const shouldActivate = button.dataset.screen === state.screen || (state.screen === "complete" && button.dataset.screen === "today");
      button.classList.toggle("is-active", shouldActivate);
    });
  }

  function renderToday() {
    const cards = getCards();
    const progress = getProgressMap();
    const settings = getSettings();
    const todayRecord = getTodayRecord();
    const reviewCount = countByStatus("review_again");
    const newCount = countByStatus("new");
    const practicedCount = todayRecord ? todayRecord.practicedCardIds.length : 0;
    const completed = Boolean(todayRecord && todayRecord.completed);
    const target = settings.dailyTargetCards;

    main.innerHTML = [
      '<section class="section">',
      '<div class="panel summary-panel">',
      '<p class="summary-title">오늘의 루틴</p>',
      '<h2>' + (completed ? "오늘 학습 완료" : "드론 모터 영어 30분") + '</h2>',
      '<p class="summary-copy">' + (completed ? "필요하면 같은 흐름으로 한 번 더 복습할 수 있습니다." : "다시 볼 표현을 먼저 잡고, 남는 시간에 새 표현을 익힙니다.") + '</p>',
      '<div class="action-row">',
      '<button class="button primary" type="button" data-action="' + (completed ? "restart-session" : "start-session") + '">',
      iconPlay() + '<span>' + (completed ? "다시 연습" : "오늘 시작") + '</span>',
      '</button>',
      '<button class="button ghost" type="button" data-screen="cards">' + iconCards() + '<span>카드 보기</span></button>',
      '</div>',
      '</div>',
      '<div class="stats-grid" aria-label="오늘 학습 상태">',
      statBlock(reviewCount, "다시 보기"),
      statBlock(newCount, "새 표현"),
      statBlock(practicedCount + "/" + target, "오늘 진행"),
      '</div>',
      cards.length ? renderTodayPreview(cards, progress) : renderEmptyCardsState(),
      '</section>'
    ].join("");
  }

  function renderTodayPreview(cards, progress) {
    const todayRecord = getTodayRecord();
    const includeToday = Boolean(todayRecord && todayRecord.completed);
    const nextCards = selectSessionCards(includeToday).slice(0, 3);

    if (!nextCards.length) {
      return [
        '<div class="empty-state">',
        '<strong>오늘 볼 카드가 없습니다.</strong>',
        '<p class="summary-copy">카드 화면에서 새 표현을 추가하면 바로 연습할 수 있습니다.</p>',
        '</div>'
      ].join("");
    }

    return [
      '<section class="section" aria-labelledby="nextCardsTitle">',
      '<h2 id="nextCardsTitle">다음에 볼 표현</h2>',
      '<div class="card-list">',
      nextCards.map(function (card) {
        const cardProgress = progress[card.id] || createDefaultProgress(card.id);
        return [
          '<article class="phrase-row">',
          '<span class="pill">' + escapeHtml(displayStatus(cardProgress.status)) + '</span>',
          '<p class="row-english">' + escapeHtml(card.english) + '</p>',
          '<p class="row-korean">' + escapeHtml(card.korean) + '</p>',
          '</article>'
        ].join("");
      }).join(""),
      '</div>',
      '</section>'
    ].join("");
  }

  function renderEmptyCardsState() {
    return [
      '<div class="empty-state">',
      '<strong>저장된 카드가 없습니다.</strong>',
      '<p class="summary-copy">기본 카드팩을 다시 불러오려면 브라우저 저장 데이터를 초기화한 뒤 앱을 다시 열어주세요.</p>',
      '</div>'
    ].join("");
  }

  function renderPractice() {
    if (!state.session || !state.session.cards.length) {
      renderToday();
      return;
    }

    const session = state.session;
    const card = session.cards[session.index];
    const total = session.cards.length;
    const step = session.index + 1;
    const stage = session.stage;
    const isEnglishStage = stage === "english";
    const isKoreanStage = stage === "korean";
    const isRevealStage = stage === "reveal";
    const stageTitle = isEnglishStage ? "따라 말하기" : isKoreanStage ? "한국어만 보고 말하기" : "정답 확인";

    main.innerHTML = [
      '<section class="practice-card" aria-labelledby="practiceTitle">',
      '<div class="practice-meta">',
      '<span>' + step + ' / ' + total + '</span>',
      '<span class="pill">' + escapeHtml(card.category) + '</span>',
      '</div>',
      '<div class="phrase-area">',
      '<p class="stage-label" id="practiceTitle">' + stageTitle + '</p>',
      isKoreanStage ? '<div class="hidden-answer">영어 문장은 잠시 가려두었습니다.</div>' : '<p class="english">' + escapeHtml(card.english) + '</p>',
      '<p class="korean">' + escapeHtml(card.korean) + '</p>',
      isRevealStage ? '<p class="message">방금 말한 문장과 비교해보세요.</p>' : '',
      isRevealStage && card.note ? '<p class="phrase-note"><strong>메모</strong>' + escapeHtml(card.note) + '</p>' : '',
      '</div>',
      renderPracticeActions(stage),
      '</section>'
    ].join("");
  }

  function renderPracticeActions(stage) {
    if (stage === "english") {
      return [
        '<div class="action-row">',
        '<button class="button primary" type="button" data-action="next-stage">' + iconNext() + '<span>한국어만 보기</span></button>',
        '</div>'
      ].join("");
    }

    if (stage === "korean") {
      return [
        '<div class="action-row">',
        '<button class="button blue" type="button" data-action="next-stage">' + iconEye() + '<span>정답 보기</span></button>',
        '</div>'
      ].join("");
    }

    return [
      '<div class="self-check" aria-label="셀프 체크">',
      '<button class="button primary" type="button" data-action="mark-card" data-status="memorized">' + iconCheck() + '<span>외움</span></button>',
      '<button class="button amber" type="button" data-action="mark-card" data-status="uncertain">' + iconQuestion() + '<span>애매함</span></button>',
      '<button class="button red" type="button" data-action="mark-card" data-status="review_again">' + iconLoop() + '<span>다시 보기</span></button>',
      '<button class="button ghost" type="button" data-action="mark-card" data-status="excluded">' + iconClose() + '<span>내 표현과 안 맞음</span></button>',
      '</div>'
    ].join("");
  }

  function renderComplete() {
    const record = getTodayRecord();
    const practiced = record ? record.practicedCardIds.length : 0;
    const reviewAgain = countByStatus("review_again");

    main.innerHTML = [
      '<section class="section">',
      '<div class="panel summary-panel">',
      '<p class="summary-title">완료</p>',
      '<h2>오늘 루틴을 끝냈습니다.</h2>',
      '<p class="summary-copy">짧게라도 매일 쌓이면 미팅에서 바로 꺼낼 문장이 생깁니다.</p>',
      '<div class="action-row">',
      '<button class="button primary" type="button" data-screen="records">' + iconChart() + '<span>기록 보기</span></button>',
      '<button class="button ghost" type="button" data-action="restart-session">' + iconLoop() + '<span>한 번 더</span></button>',
      '</div>',
      '</div>',
      '<div class="stats-grid">',
      statBlock(practiced, "연습한 표현"),
      statBlock(reviewAgain, "남은 다시 보기"),
      statBlock(getSettings().dailyTargetCards, "목표 카드"),
      '</div>',
      '</section>'
    ].join("");
  }

  function renderCards() {
    const editingCard = state.editingCardId ? getCards().find(function (card) {
      return card.id === state.editingCardId;
    }) : null;
    const categories = getCategories();

    main.innerHTML = [
      '<section class="section">',
      '<h2>카드 관리</h2>',
      state.message ? '<p class="message ' + (state.message.type === "error" ? "error" : "") + '">' + escapeHtml(state.message.text) + '</p>' : '',
      renderImportPanel(),
      '<form class="form-panel" id="cardForm">',
      '<input type="hidden" name="cardId" value="' + escapeAttribute(editingCard ? editingCard.id : "") + '">',
      '<div class="field">',
      '<label for="english">영어 문장</label>',
      '<textarea id="english" name="english" required>' + escapeHtml(editingCard ? editingCard.english : "") + '</textarea>',
      '</div>',
      '<div class="field">',
      '<label for="korean">한국어 뜻/상황</label>',
      '<textarea id="korean" name="korean" required>' + escapeHtml(editingCard ? editingCard.korean : "") + '</textarea>',
      '</div>',
      '<div class="field">',
      '<label for="category">카테고리</label>',
      '<input id="category" name="category" list="categoryOptions" value="' + escapeAttribute(editingCard ? editingCard.category : "Sales pitch") + '" required>',
      '<datalist id="categoryOptions">',
      categories.map(function (category) {
        return '<option value="' + escapeAttribute(category) + '"></option>';
      }).join(""),
      '</datalist>',
      '</div>',
      '<div class="field">',
      '<label for="note">메모 (선택)</label>',
      '<textarea id="note" name="note">' + escapeHtml(editingCard ? editingCard.note : "") + '</textarea>',
      '</div>',
      '<div class="action-row">',
      '<button class="button primary" type="submit">' + iconSave() + '<span>' + (editingCard ? "수정 저장" : "카드 추가") + '</span></button>',
      editingCard ? '<button class="button ghost" type="button" data-action="cancel-edit">' + iconClose() + '<span>취소</span></button>' : '',
      '</div>',
      '</form>',
      '<div class="toolbar">',
      '<input id="cardSearch" type="search" placeholder="문장 또는 뜻 검색" value="' + escapeAttribute(state.filterText) + '">',
      '<select id="categoryFilter" aria-label="카테고리 필터">',
      '<option value="all">전체 카테고리</option>',
      categories.map(function (category) {
        return '<option value="' + escapeAttribute(category) + '"' + (category === state.filterCategory ? " selected" : "") + '>' + escapeHtml(category) + '</option>';
      }).join(""),
      '</select>',
      '<select id="studyStateFilter" aria-label="학습 상태 필터">',
      '<option value="all"' + (state.filterStudyState === "all" ? " selected" : "") + '>전체</option>',
      '<option value="active"' + (state.filterStudyState === "active" ? " selected" : "") + '>학습 중</option>',
      '<option value="excluded"' + (state.filterStudyState === "excluded" ? " selected" : "") + '>제외됨</option>',
      '</select>',
      '</div>',
      '<div id="cardListMount">',
      renderCardList(),
      '</div>',
      '</section>'
    ].join("");
  }

  function renderImportPanel() {
    return [
      '<section class="form-panel import-panel" aria-labelledby="pptImportTitle">',
      '<div>',
      '<p class="summary-title">PPT 가져오기</p>',
      '<h3 id="pptImportTitle">양식에서 카드 만들기</h3>',
      '<p class="helper-text">[CARD] YES 슬라이드의 영어, 한국어, 카테고리를 새 카드로 추가합니다.</p>',
      '<a class="template-link" href="outputs/drone-motor-card-upload-template.pptx" download>양식 다운로드</a>',
      '</div>',
      '<label class="upload-box" for="pptUpload">',
      iconUpload(),
      '<span>PPTX 파일 선택</span>',
      '<small>방금 만든 카드 업로드 양식 사용</small>',
      '<input id="pptUpload" type="file" accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation">',
      '</label>',
      '</section>'
    ].join("");
  }

  function renderCardListOnly() {
    const mount = document.getElementById("cardListMount");
    if (mount) {
      mount.innerHTML = renderCardList();
    }
  }

  function renderCardList() {
    const cards = getFilteredCards();
    const progressMap = getProgressMap();

    if (!cards.length) {
      return '<div class="empty-state">조건에 맞는 카드가 없습니다.</div>';
    }

    return [
      '<div class="card-list">',
      cards.map(function (card) {
        const cardProgress = progressMap[card.id] || createDefaultProgress(card.id);
        const isExcluded = cardProgress.status === "excluded";
        return [
          '<article class="phrase-row' + (isExcluded ? " is-excluded" : "") + '">',
          '<span class="pill">' + escapeHtml(card.category) + '</span>',
          isExcluded ? '<span class="pill excluded-pill">제외됨</span>' : '',
          '<p class="row-english">' + escapeHtml(card.english) + '</p>',
          '<p class="row-korean">' + escapeHtml(card.korean) + '</p>',
          card.note ? '<p class="row-note">메모: ' + escapeHtml(card.note) + '</p>' : '',
          '<div class="row-actions">',
          isExcluded ? '<button class="button blue" type="button" data-action="restore-card" data-id="' + escapeAttribute(card.id) + '">' + iconLoop() + '<span>복원</span></button>' : '',
          '<button class="button ghost" type="button" data-action="edit-card" data-id="' + escapeAttribute(card.id) + '">' + iconEdit() + '<span>수정</span></button>',
          '<button class="button red" type="button" data-action="delete-card" data-id="' + escapeAttribute(card.id) + '">' + iconTrash() + '<span>삭제</span></button>',
          '</div>',
          '</article>'
        ].join("");
      }).join(""),
      '</div>'
    ].join("");
  }

  function renderRecords() {
    const records = getRecords().slice().sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
    const todayRecord = getTodayRecord();
    const practicedToday = todayRecord ? todayRecord.practicedCardIds.length : 0;
    const completedDays = records.filter(function (record) {
      return record.completed;
    }).length;

    main.innerHTML = [
      '<section class="section">',
      '<h2>학습 기록</h2>',
      '<div class="stats-grid">',
      statBlock(practicedToday, "오늘 연습"),
      statBlock(countByStatus("review_again"), "다시 보기"),
      statBlock(completedDays, "완료한 날"),
      '</div>',
      records.length ? renderRecordRows(records) : '<div class="empty-state">아직 저장된 기록이 없습니다.</div>',
      '</section>'
    ].join("");
  }

  function renderRecordRows(records) {
    return [
      '<div class="record-list">',
      records.slice(0, 14).map(function (record) {
        return [
          '<article class="record-row">',
          '<div>',
          '<strong>' + escapeHtml(record.date) + '</strong>',
          '<span>' + record.practicedCardIds.length + '개 연습 · 다시 보기 ' + record.reviewAgainCount + '개</span>',
          '</div>',
          '<span class="pill">' + (record.completed ? "완료" : "진행") + '</span>',
          '</article>'
        ].join("");
      }).join(""),
      '</div>'
    ].join("");
  }

  function startSession(force) {
    const selectedCards = selectSessionCards(force);

    if (!selectedCards.length) {
      const excludedCount = countByStatus("excluded");
      state.message = {
        type: "error",
        text: excludedCount
          ? "연습할 학습 중 카드가 없습니다. 제외됨에서 카드를 복원하거나 새 표현을 추가해 주세요."
          : "연습할 카드가 없습니다. 카드 화면에서 표현을 추가해 주세요."
      };
      state.filterStudyState = excludedCount ? "excluded" : "active";
      state.screen = "cards";
      render();
      return;
    }

    state.session = {
      cards: selectedCards,
      index: 0,
      stage: "english"
    };
    state.screen = "practice";
    state.message = null;
    render();
    focusMain();
  }

  function movePracticeStage() {
    if (!state.session) {
      return;
    }

    if (state.session.stage === "english") {
      state.session.stage = "korean";
    } else if (state.session.stage === "korean") {
      state.session.stage = "reveal";
    }

    renderPractice();
  }

  function markCurrentCard(status) {
    if (!state.session) {
      return;
    }

    const session = state.session;
    const card = session.cards[session.index];
    const isExcluded = status === "excluded";
    updateCardProgress(card.id, status, {
      countPractice: !isExcluded
    });

    if (!isExcluded) {
      updateTodayRecord(card.id, false);
    }

    if (session.index + 1 >= session.cards.length) {
      updateTodayRecord(isExcluded ? null : card.id, true);
      state.session = null;
      state.screen = "complete";
      render();
      focusMain();
      return;
    }

    session.index += 1;
    session.stage = "english";
    renderPractice();
  }

  function restoreCard(id) {
    updateCardProgress(id, "new", {
      countPractice: false,
      touchLastPracticed: false
    });
    state.message = {
      type: "info",
      text: "카드를 다시 학습에 포함했습니다."
    };
    renderCards();
  }

  function saveCardFromForm(form) {
    const formData = new FormData(form);
    const id = String(formData.get("cardId") || "").trim();
    const english = String(formData.get("english") || "").trim();
    const korean = String(formData.get("korean") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const note = String(formData.get("note") || "").trim();

    if (!english || !korean) {
      state.message = {
        type: "error",
        text: "영어 문장과 한국어 뜻을 모두 입력해 주세요."
      };
      renderCards();
      return;
    }

    const cards = getCards();
    const now = new Date().toISOString();

    if (id) {
      const nextCards = cards.map(function (card) {
        if (card.id !== id) {
          return card;
        }
        return Object.assign({}, card, {
          english: english,
          korean: korean,
          category: category || "General",
          note: note,
          updatedAt: now
        });
      });
      saveCards(nextCards);
      state.editingCardId = null;
      state.message = {
        type: "info",
        text: "카드를 수정했습니다."
      };
    } else {
      const newCard = {
        id: createId(),
        english: english,
        korean: korean,
        category: category || "General",
        note: note,
        source: "user",
        createdAt: now,
        updatedAt: now
      };
      saveCards(cards.concat(newCard));
      ensureProgressForCards();
      state.message = {
        type: "info",
        text: "새 카드를 추가했습니다."
      };
    }

    state.filterCategory = "all";
    renderCards();
    focusMain();
  }

  async function importCardsFromPptx(file) {
    if (!file) {
      return;
    }

    if (!isPptxFile(file)) {
      state.message = {
        type: "error",
        text: "PPTX 파일만 가져올 수 있습니다."
      };
      renderCards();
      return;
    }

    if (!window.JSZip) {
      state.message = {
        type: "error",
        text: "PPTX 리더를 불러오지 못했습니다. 페이지를 새로고침한 뒤 다시 시도해 주세요."
      };
      renderCards();
      return;
    }

    state.message = {
      type: "info",
      text: "PPT 파일을 읽는 중입니다."
    };
    renderCards();

    try {
      const parsed = await parseCardsFromPptx(file);
      const saved = saveImportedCards(parsed.cards);
      const skipped = parsed.skippedIncomplete + parsed.skippedPlaceholder;

      state.filterCategory = "all";
      state.filterStudyState = "active";
      state.message = {
        type: saved.added ? "info" : "error",
        text: buildImportMessage(saved.added, saved.duplicates, skipped)
      };
      renderCards();
      focusMain();
    } catch (error) {
      console.warn("Failed to import PPTX", error);
      state.message = {
        type: "error",
        text: "PPT 파일을 읽지 못했습니다. 카드 업로드 양식으로 저장한 PPTX인지 확인해 주세요."
      };
      renderCards();
    }
  }

  function isPptxFile(file) {
    return Boolean(file && /\.pptx$/i.test(file.name || ""));
  }

  async function parseCardsFromPptx(file) {
    const zip = await window.JSZip.loadAsync(await file.arrayBuffer());
    const slideNames = Object.keys(zip.files).filter(function (name) {
      return /^ppt\/slides\/slide\d+\.xml$/i.test(name);
    }).sort(function (a, b) {
      return getSlideNumber(a) - getSlideNumber(b);
    });

    const result = {
      cards: [],
      skippedIncomplete: 0,
      skippedPlaceholder: 0
    };

    for (const slideName of slideNames) {
      const slideFile = zip.file(slideName);
      if (!slideFile) {
        continue;
      }

      const fields = extractImportFieldsFromSlideXml(await slideFile.async("string"));
      if (!isImportCardEnabled(fields.card)) {
        continue;
      }

      const english = cleanImportedFieldValue(fields.english);
      const korean = cleanImportedFieldValue(fields.korean);
      if (!english || !korean) {
        result.skippedIncomplete += 1;
        continue;
      }

      if (isTemplatePlaceholderValue(english) || isTemplatePlaceholderValue(korean)) {
        result.skippedPlaceholder += 1;
        continue;
      }

      const rawCategory = cleanImportedFieldValue(fields.category);
      result.cards.push({
        english: english,
        korean: korean,
        category: isTemplateCategoryPlaceholder(rawCategory) ? "General" : rawCategory || "General",
        note: cleanImportedFieldValue(fields.note)
      });
    }

    return result;
  }

  function saveImportedCards(importedCards) {
    const currentCards = getCards();
    const existingKeys = new Set(currentCards.map(createCardContentKey));
    const importedKeys = new Set();
    const now = new Date().toISOString();
    let duplicates = 0;

    const newCards = importedCards.reduce(function (cards, card) {
      const key = createCardContentKey(card);
      if (!key || existingKeys.has(key) || importedKeys.has(key)) {
        duplicates += 1;
        return cards;
      }

      importedKeys.add(key);
      cards.push({
        id: createId(),
        english: card.english,
        korean: card.korean,
        category: card.category || "General",
        note: card.note || "",
        source: "user",
        createdAt: now,
        updatedAt: now
      });
      return cards;
    }, []);

    if (newCards.length) {
      saveCards(currentCards.concat(newCards));
      ensureProgressForCards();
    }

    return {
      added: newCards.length,
      duplicates: duplicates
    };
  }

  function buildImportMessage(added, duplicates, skipped) {
    if (added) {
      const details = [];
      if (duplicates) {
        details.push("중복 " + duplicates + "개");
      }
      if (skipped) {
        details.push("빈 양식 " + skipped + "개");
      }
      return "PPT에서 카드 " + added + "개를 추가했습니다." + (details.length ? " " + details.join(", ") + "는 건너뛰었습니다." : "");
    }

    if (duplicates) {
      return "새로 추가된 카드가 없습니다. 이미 있는 카드 " + duplicates + "개는 중복으로 건너뛰었습니다.";
    }

    return "가져올 카드가 없습니다. 작성한 슬라이드의 [CARD] 값이 YES인지, 영어와 한국어 문장이 입력됐는지 확인해 주세요.";
  }

  function extractImportFieldsFromSlideXml(xml) {
    return extractShapeTextsFromSlideXml(xml).reduce(function (fields, text) {
      const shapeFields = extractImportFields(text);
      Object.keys(shapeFields).forEach(function (key) {
        fields[key] = shapeFields[key];
      });
      return fields;
    }, {});
  }

  function extractShapeTextsFromSlideXml(xml) {
    const shapes = String(xml || "").match(/<p:sp\b[\s\S]*?<\/p:sp>/gi) || [];
    return shapes.map(extractTextFromShapeXml).filter(Boolean);
  }

  function extractTextFromShapeXml(shapeXml) {
    let text = "";
    const tokenPattern = /<a:t\b[^>]*>([\s\S]*?)<\/a:t>|<a:br\b[^>]*\/?>|<\/a:p>/gi;
    let match = tokenPattern.exec(shapeXml);

    while (match) {
      if (match[1] !== undefined) {
        text += decodeXmlEntities(match[1]);
      } else {
        text += "\n";
      }
      match = tokenPattern.exec(shapeXml);
    }

    return cleanImportedText(text);
  }

  function extractImportFields(text) {
    const fields = {};
    const markers = [];
    const markerPattern = new RegExp("\\[(" + IMPORT_FIELD_KEYS.join("|") + ")\\]", "gi");
    let match = markerPattern.exec(text);

    while (match) {
      markers.push({
        key: match[1].toLowerCase(),
        start: match.index,
        end: markerPattern.lastIndex
      });
      match = markerPattern.exec(text);
    }

    markers.forEach(function (marker, index) {
      const nextMarker = markers[index + 1];
      const rawValue = text.slice(marker.end, nextMarker ? nextMarker.start : text.length);
      const value = cleanImportedText(rawValue);
      if (value) {
        fields[marker.key] = value;
      }
    });

    return fields;
  }

  function isImportCardEnabled(value) {
    return cleanImportedFieldValue(value).toUpperCase() === "YES";
  }

  function isTemplatePlaceholderValue(value) {
    const normalized = normalizeForComparison(value);
    return TEMPLATE_PLACEHOLDERS.some(function (placeholder) {
      return normalized === normalizeForComparison(placeholder);
    });
  }

  function isTemplateCategoryPlaceholder(value) {
    return normalizeForComparison(value) === normalizeForComparison("여기에 카테고리 입력");
  }

  function createCardContentKey(card) {
    const english = normalizeForComparison(card.english);
    const korean = normalizeForComparison(card.korean);
    return english && korean ? english + "::" + korean : "";
  }

  function getSlideNumber(name) {
    const match = String(name).match(/slide(\d+)\.xml/i);
    return match ? Number(match[1]) : 0;
  }

  function decodeXmlEntities(value) {
    return String(value || "")
      .replace(/&#x([0-9a-f]+);/gi, function (_, code) {
        return String.fromCodePoint(parseInt(code, 16));
      })
      .replace(/&#(\d+);/g, function (_, code) {
        return String.fromCodePoint(parseInt(code, 10));
      })
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  }

  function cleanImportedText(value) {
    return String(value || "")
      .replace(/\u0000/g, "")
      .replace(/\r/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n[ \t]+/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function cleanImportedFieldValue(value) {
    return cleanImportedText(value)
      .split("\n")
      .map(function (line) {
        return line.trim();
      })
      .filter(Boolean)
      .join(" ");
  }

  function normalizeForComparison(value) {
    return cleanImportedFieldValue(value).toLowerCase().replace(/\s+/g, " ").trim();
  }

  function deleteCard(id) {
    const cards = getCards();
    const target = cards.find(function (card) {
      return card.id === id;
    });

    if (!target) {
      return;
    }

    const confirmed = window.confirm("이 카드를 삭제할까요?");
    if (!confirmed) {
      return;
    }

    saveCards(cards.filter(function (card) {
      return card.id !== id;
    }));

    const progress = getProgress().filter(function (item) {
      return item.cardId !== id;
    });
    saveProgress(progress);

    state.editingCardId = null;
    state.message = {
      type: "info",
      text: "카드를 삭제했습니다."
    };
    renderCards();
  }

  function selectSessionCards(includeToday) {
    const cards = getCards();
    const progressMap = getProgressMap();
    const settings = getSettings();
    const todayRecord = getTodayRecord();
    const practicedToday = includeToday || !todayRecord ? [] : todayRecord.practicedCardIds;
    const available = cards.filter(function (card) {
      const progress = progressMap[card.id] || createDefaultProgress(card.id);
      return progress.status !== "excluded" && !practicedToday.includes(card.id);
    });

    const byStatus = function (status) {
      return available.filter(function (card) {
        const progress = progressMap[card.id] || createDefaultProgress(card.id);
        return progress.status === status;
      }).sort(function (a, b) {
        return sortByPracticeNeed(a, b, progressMap);
      });
    };

    const selected = []
      .concat(byStatus("review_again"))
      .concat(byStatus("new"))
      .concat(byStatus("uncertain"))
      .concat(byStatus("memorized"));

    return dedupeCards(selected).slice(0, settings.dailyTargetCards);
  }

  function sortByPracticeNeed(a, b, progressMap) {
    const aProgress = progressMap[a.id] || createDefaultProgress(a.id);
    const bProgress = progressMap[b.id] || createDefaultProgress(b.id);
    const aLast = aProgress.lastPracticedAt || "";
    const bLast = bProgress.lastPracticedAt || "";

    if (aProgress.practiceCount !== bProgress.practiceCount) {
      return aProgress.practiceCount - bProgress.practiceCount;
    }

    return aLast.localeCompare(bLast);
  }

  function updateCardProgress(cardId, status, options) {
    const settings = Object.assign({
      countPractice: true,
      touchLastPracticed: true
    }, options || {});
    const progress = getProgress();
    const now = new Date().toISOString();
    const index = progress.findIndex(function (item) {
      return item.cardId === cardId;
    });

    if (index >= 0) {
      progress[index] = Object.assign({}, progress[index], {
        status: status,
        practiceCount: Number(progress[index].practiceCount || 0) + (settings.countPractice ? 1 : 0),
        lastPracticedAt: settings.touchLastPracticed ? now : progress[index].lastPracticedAt
      });
    } else {
      progress.push({
        cardId: cardId,
        status: status,
        practiceCount: settings.countPractice ? 1 : 0,
        lastPracticedAt: settings.touchLastPracticed ? now : undefined
      });
    }

    saveProgress(progress);
  }

  function updateTodayRecord(cardId, completed) {
    const records = getRecords();
    const date = todayKey();
    const index = records.findIndex(function (record) {
      return record.date === date;
    });
    const current = index >= 0 ? records[index] : {
      date: date,
      practicedCardIds: [],
      reviewAgainCount: 0,
      completed: false
    };
    const practiced = !cardId || current.practicedCardIds.includes(cardId)
      ? current.practicedCardIds
      : current.practicedCardIds.concat(cardId);

    const nextRecord = {
      date: date,
      practicedCardIds: practiced,
      reviewAgainCount: countByStatus("review_again"),
      completed: Boolean(current.completed || completed)
    };

    if (index >= 0) {
      records[index] = nextRecord;
    } else {
      records.push(nextRecord);
    }

    saveRecords(records);
  }

  function seedStorage() {
    const rawCards = readJSON(STORAGE_KEYS.cards, null);

    if (!Array.isArray(rawCards) || rawCards.length === 0) {
      saveCards(STARTER_CARDS);
      localStorage.setItem(STORAGE_KEYS.packVersion, STARTER_PACK_VERSION);
    } else if (localStorage.getItem(STORAGE_KEYS.packVersion) !== STARTER_PACK_VERSION) {
      const existingIds = new Set(rawCards.map(function (card) {
        return card.id;
      }));
      const missingStarterCards = STARTER_CARDS.filter(function (card) {
        return !existingIds.has(card.id);
      });
      saveCards(normalizeCards(rawCards).concat(missingStarterCards));
      localStorage.setItem(STORAGE_KEYS.packVersion, STARTER_PACK_VERSION);
    }

    if (!Array.isArray(readJSON(STORAGE_KEYS.records, null))) {
      saveRecords([]);
    }

    if (!isValidSettings(readJSON(STORAGE_KEYS.settings, null))) {
      saveSettings(DEFAULT_SETTINGS);
    }

    ensureProgressForCards();
  }

  function ensureProgressForCards() {
    const cards = getCards();
    const progress = getProgress();
    const existing = new Set(progress.map(function (item) {
      return item.cardId;
    }));
    const cardIds = new Set(cards.map(function (card) {
      return card.id;
    }));
    const nextProgress = progress.filter(function (item) {
      return cardIds.has(item.cardId);
    });

    cards.forEach(function (card) {
      if (!existing.has(card.id)) {
        nextProgress.push(createDefaultProgress(card.id));
      }
    });

    saveProgress(nextProgress);
  }

  function createDefaultProgress(cardId) {
    return {
      cardId: cardId,
      status: "new",
      practiceCount: 0
    };
  }

  function getCards() {
    const cards = readJSON(STORAGE_KEYS.cards, STARTER_CARDS);
    return normalizeCards(cards);
  }

  function saveCards(cards) {
    writeJSON(STORAGE_KEYS.cards, normalizeCards(cards));
  }

  function getProgress() {
    const progress = readJSON(STORAGE_KEYS.progress, []);
    if (!Array.isArray(progress)) {
      return [];
    }
    return progress.filter(function (item) {
      return item && typeof item.cardId === "string";
    }).map(function (item) {
      const status = ["new", "memorized", "uncertain", "review_again", "excluded"].includes(item.status) ? item.status : "new";
      return {
        cardId: item.cardId,
        status: status,
        practiceCount: Number(item.practiceCount || 0),
        lastPracticedAt: item.lastPracticedAt
      };
    });
  }

  function saveProgress(progress) {
    writeJSON(STORAGE_KEYS.progress, progress);
  }

  function getProgressMap() {
    return getProgress().reduce(function (map, item) {
      map[item.cardId] = item;
      return map;
    }, {});
  }

  function getRecords() {
    const records = readJSON(STORAGE_KEYS.records, []);
    if (!Array.isArray(records)) {
      return [];
    }
    return records.filter(function (record) {
      return record && typeof record.date === "string" && Array.isArray(record.practicedCardIds);
    }).map(function (record) {
      return {
        date: record.date,
        practicedCardIds: record.practicedCardIds,
        reviewAgainCount: Number(record.reviewAgainCount || 0),
        completed: Boolean(record.completed)
      };
    });
  }

  function saveRecords(records) {
    writeJSON(STORAGE_KEYS.records, records);
  }

  function getSettings() {
    const settings = readJSON(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
    return isValidSettings(settings) ? settings : DEFAULT_SETTINGS;
  }

  function saveSettings(settings) {
    writeJSON(STORAGE_KEYS.settings, settings);
  }

  function getTodayRecord() {
    const date = todayKey();
    return getRecords().find(function (record) {
      return record.date === date;
    });
  }

  function countByStatus(status) {
    return getProgress().filter(function (item) {
      return item.status === status;
    }).length;
  }

  function getCategories() {
    return Array.from(new Set(getCards().map(function (card) {
      return card.category || "General";
    }))).sort(function (a, b) {
      return a.localeCompare(b);
    });
  }

  function getFilteredCards() {
    const query = state.filterText.trim().toLowerCase();
    const progressMap = getProgressMap();
    return getCards().filter(function (card) {
      const progress = progressMap[card.id] || createDefaultProgress(card.id);
      const matchesText = !query || [card.english, card.korean, card.category, card.note].join(" ").toLowerCase().includes(query);
      const matchesCategory = state.filterCategory === "all" || card.category === state.filterCategory;
      const matchesStudyState = state.filterStudyState === "all"
        || (state.filterStudyState === "active" && progress.status !== "excluded")
        || (state.filterStudyState === "excluded" && progress.status === "excluded");
      return matchesText && matchesCategory && matchesStudyState;
    });
  }

  function displayStatus(status) {
    const labels = {
      new: "새 표현",
      memorized: "외움",
      uncertain: "애매함",
      review_again: "다시 보기",
      excluded: "제외됨"
    };
    return labels[status] || "새 표현";
  }

  function normalizeCards(cards) {
    if (!Array.isArray(cards)) {
      return [];
    }

    return cards.filter(function (card) {
      return card && String(card.english || "").trim() && String(card.korean || "").trim();
    }).map(function (card) {
      const now = new Date().toISOString();
      return {
        id: String(card.id || createId()),
        english: String(card.english).trim(),
        korean: String(card.korean).trim(),
        category: String(card.category || "General").trim(),
        note: String(card.note || "").trim(),
        source: card.source === "starter" ? "starter" : "user",
        createdAt: String(card.createdAt || now),
        updatedAt: String(card.updatedAt || now)
      };
    });
  }

  function isValidSettings(settings) {
    return Boolean(settings && Number(settings.dailyTargetCards) > 0);
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.warn("Failed to read storage", key, error);
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Failed to write storage", key, error);
      state.message = {
        type: "error",
        text: "브라우저 저장 공간에 기록하지 못했습니다."
      };
    }
  }

  function todayKey(date) {
    const source = date || new Date();
    const local = new Date(source.getTime() - source.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function formatDisplayDate(date) {
    return new Intl.DateTimeFormat("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "short"
    }).format(date);
  }

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "card-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
  }

  function dedupeCards(cards) {
    const seen = new Set();
    return cards.filter(function (card) {
      if (seen.has(card.id)) {
        return false;
      }
      seen.add(card.id);
      return true;
    });
  }

  function statBlock(value, label) {
    return '<div class="stat"><strong>' + escapeHtml(String(value)) + '</strong><span>' + escapeHtml(label) + '</span></div>';
  }

  function focusMain() {
    window.setTimeout(function () {
      main.focus();
    }, 0);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  function iconPlay() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7-11-7Z"></path></svg>';
  }

  function iconCards() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"></path><path d="M8 9h8M8 13h5"></path></svg>';
  }

  function iconNext() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>';
  }

  function iconEye() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg>';
  }

  function iconCheck() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"></path></svg>';
  }

  function iconQuestion() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 9a2.8 2.8 0 0 1 5.4 1.2c0 2-2.4 2.2-2.4 4"></path><path d="M12.5 18h.01"></path><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>';
  }

  function iconLoop() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2v5h-5"></path><path d="M7 22v-5h5"></path><path d="M19 9a7 7 0 0 0-11.9-3.7L5 7"></path><path d="M5 15a7 7 0 0 0 11.9 3.7L19 17"></path></svg>';
  }

  function iconChart() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V9M12 19V5M19 19v-7"></path><path d="M4 19.5h16"></path></svg>';
  }

  function iconSave() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M17 21v-8H7v8"></path><path d="M7 3v5h8"></path></svg>';
  }

  function iconUpload() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4"></path><path d="m7 9 5-5 5 5"></path><path d="M20 16.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.5"></path></svg>';
  }

  function iconClose() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
  }

  function iconEdit() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"></path></svg>';
  }

  function iconTrash() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5M14 11v5"></path></svg>';
  }
})();

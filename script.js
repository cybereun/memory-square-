const BASE_BOARD_SIZE = 2;
const BEST_LEVEL_STORAGE_KEY = "memory-match-best-level";
const EMOJI_POOL = [
  "🦊",
  "🐼",
  "🐸",
  "🦁",
  "🐳",
  "🦄",
  "🐙",
  "🦜",
  "🦖",
  "🐬",
  "🍓",
  "🍋",
  "🍕",
  "🧁",
  "🎈",
  "🎮",
  "🚀",
  "🎧",
  "📷",
  "🧩",
  "⭐",
  "🌈",
  "🔥",
  "⚡",
  "🌻",
  "🍀",
  "🎲",
  "🏀",
  "🎵",
  "🪐",
];

const elements = {
  board: document.querySelector("#board"),
  level: document.querySelector("#levelValue"),
  iq: document.querySelector("#iqValue"),
  timer: document.querySelector("#timerValue"),
  moves: document.querySelector("#movesValue"),
  best: document.querySelector("#bestValue"),
  status: document.querySelector("#statusMessage"),
  startButton: document.querySelector("#startButton"),
  restartButton: document.querySelector("#restartButton"),
};

const state = {
  level: 1,
  boardSize: BASE_BOARD_SIZE,
  bestLevel: loadBestLevel(),
  secondsLeft: getTimeLimitForLevel(1),
  moves: 0,
  matchedPairs: 0,
  targetMatches: 0,
  openCardIds: [],
  isBoardLocked: true,
  cards: [],
  timerId: null,
  previewTimeoutId: null,
  pendingActionTimeoutIds: [],
  audioContext: null,
};

elements.startButton.addEventListener("click", startFromLevelOne);
elements.restartButton.addEventListener("click", startFromLevelOne);
elements.board.addEventListener("click", handleBoardClick);

registerServiceWorker();
updateHud();
renderBoard();

function startFromLevelOne() {
  state.level = 1;
  startLevel();
}

function handleBoardClick(event) {
  const cardButton = event.target.closest(".memory-card");

  if (!cardButton) {
    return;
  }

  handleCardSelection(cardButton.dataset.cardId);
}

function startLevel() {
  const boardConfig = getBoardConfig(state.level);
  const timeLimit = getTimeLimitForLevel(state.level);

  clearScheduledActions();
  state.boardSize = boardConfig.size;
  state.secondsLeft = timeLimit;
  state.moves = 0;
  state.matchedPairs = 0;
  state.targetMatches = boardConfig.targetMatches;
  state.openCardIds = [];
  state.isBoardLocked = true;
  state.cards = buildDeck(boardConfig);

  updateBestLevel(state.level);
  updateHud();
  revealAllCards();
  renderBoard();
  showStatus(
    `${getBoardSizeLabel()} 보드입니다. ${getPreviewSecondsLabel()} 동안 그림을 외우세요.`,
    ""
  );

  state.previewTimeoutId = window.setTimeout(() => {
    hideAllCards();
    state.isBoardLocked = false;
    startTimer();
    showStatus("같은 그림 두 장을 찾아 모두 맞추세요.", "");
    renderBoard();
  }, getPreviewDuration());
}

function getBoardConfig(level) {
  const size = getBoardSizeForLevel(level);
  const totalCells = size * size;
  const pairCount = Math.floor(totalCells / 2);
  const bonusCount = totalCells % 2;

  return {
    size,
    totalCells,
    pairCount,
    bonusCount,
    targetMatches: pairCount + bonusCount,
  };
}

function getBoardSizeForLevel(level) {
  if (level <= 3) {
    return 2;
  }

  if (level <= 6) {
    return 3;
  }

  if (level <= 20) {
    return 4;
  }

  return 5 + Math.floor((level - 21) / 6);
}

function getBoardSizeLabel() {
  return `${state.boardSize}x${state.boardSize}`;
}

function buildDeck(boardConfig) {
  const cards = [];

  for (let pairIndex = 0; pairIndex < boardConfig.pairCount; pairIndex += 1) {
    const art = createPairArt(state.level, pairIndex);
    const pairId = `L${state.level}-P${pairIndex + 1}`;

    cards.push(createPairCard(`${pairId}-A`, pairId, art));
    cards.push(createPairCard(`${pairId}-B`, pairId, art));
  }

  if (boardConfig.bonusCount === 1) {
    cards.push(createBonusCard(`L${state.level}-BONUS`, createBonusArt(state.level)));
  }

  return shuffle(cards);
}

function createPairCard(id, pairId, art) {
  return createCard({
    id,
    pairId,
    type: "pair",
    emoji: art.emoji,
    label: art.label,
    gradient: art.gradient,
  });
}

function createBonusCard(id, art) {
  return createCard({
    id,
    pairId: id,
    type: "bonus",
    emoji: art.emoji,
    label: art.label,
    gradient: art.gradient,
  });
}

function createCard(config) {
  return {
    id: config.id,
    pairId: config.pairId,
    type: config.type,
    emoji: config.emoji,
    label: config.label,
    gradient: config.gradient,
    revealed: false,
    matched: false,
    celebrating: false,
  };
}

function createPairArt(level, pairIndex) {
  const sequence = (level - 1) * 17 + pairIndex;
  const emoji = EMOJI_POOL[sequence % EMOJI_POOL.length];
  const hue = (sequence * 47) % 360;
  const label = String(pairIndex + 1).padStart(2, "0");
  const gradient = `linear-gradient(150deg, hsl(${hue} 88% 74%), hsl(${(hue + 58) % 360} 85% 62%))`;

  return { emoji, label, gradient };
}

function createBonusArt(level) {
  const hue = (level * 61) % 360;

  return {
    emoji: "✨",
    label: "Bonus",
    gradient: `linear-gradient(150deg, hsl(${hue} 95% 78%), hsl(${(hue + 34) % 360} 88% 66%))`,
  };
}

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function renderBoard() {
  const fragment = document.createDocumentFragment();
  elements.board.innerHTML = "";
  elements.board.style.setProperty("--board-size", String(state.boardSize));

  if (!state.cards.length) {
    const emptyCard = document.createElement("div");
    emptyCard.className = "empty-state";
    emptyCard.textContent = "게임을 시작하면 카드가 여기에 표시됩니다.";
    elements.board.append(emptyCard);
    return;
  }

  state.cards.forEach((card) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = getCardClassName(card);
    button.dataset.cardId = card.id;
    button.setAttribute("aria-label", getCardAriaLabel(card));
    button.setAttribute("aria-disabled", String(isCardInactive(card)));

    const face = document.createElement("div");
    const isFrontVisible = card.revealed || card.matched;

    face.className = `memory-card-face ${isFrontVisible ? "card-front" : "card-back"}`;

    if (isFrontVisible) {
      face.style.background = card.gradient;
      face.innerHTML = `
        <span class="card-emoji">${card.emoji}</span>
        <span class="card-id">${card.label}</span>
      `;
    } else {
      face.innerHTML = `
        <span class="card-back-mark">?</span>
        <span class="card-back-text">memory</span>
      `;
    }

    button.append(face);
    fragment.append(button);
  });

  elements.board.append(fragment);
}

function getCardClassName(card) {
  const classNames = ["memory-card"];

  if (card.type === "bonus") {
    classNames.push("is-bonus");
  }

  if (card.revealed) {
    classNames.push("is-revealed");
  }

  if (card.matched) {
    classNames.push("is-matched");
  }

  if (card.celebrating) {
    classNames.push("is-celebrating");
  }

  if (isCardInactive(card)) {
    classNames.push("is-inactive");
  }

  return classNames.join(" ");
}

function getCardAriaLabel(card) {
  if (card.type === "bonus") {
    return card.matched || card.revealed ? "공개된 보너스 카드" : "뒤집힌 보너스 카드";
  }

  if (card.matched || card.revealed) {
    return `공개된 카드 ${card.label}`;
  }

  return "뒤집힌 카드";
}

function isCardInactive(card) {
  return state.isBoardLocked || card.matched;
}

function handleCardSelection(cardId) {
  if (state.isBoardLocked) {
    return;
  }

  const card = findCard(cardId);

  if (!card || card.matched || card.revealed) {
    return;
  }

  if (card.type === "bonus") {
    handleBonusCard(card.id);
    return;
  }

  revealCard(card.id);
  state.openCardIds = [...state.openCardIds, card.id];
  renderBoard();

  if (state.openCardIds.length < 2) {
    return;
  }

  state.moves += 1;
  updateHud();
  resolveTurn();
}

function handleBonusCard(cardId) {
  state.isBoardLocked = true;
  revealCard(cardId);
  renderBoard();

  scheduleAction(() => {
    completeMatch([cardId]);
    state.matchedPairs += 1;
    updateHud();
    renderBoard();

    if (isLevelCleared()) {
      handleLevelClear();
      return;
    }

    state.isBoardLocked = false;
    renderBoard();
  }, 320);
}

function resolveTurn() {
  state.isBoardLocked = true;

  const [firstCardId, secondCardId] = state.openCardIds;
  const firstCard = findCard(firstCardId);
  const secondCard = findCard(secondCardId);

  if (!firstCard || !secondCard) {
    resetTurn();
    state.isBoardLocked = false;
    renderBoard();
    return;
  }

  if (firstCard.pairId === secondCard.pairId) {
    scheduleAction(() => {
      completeMatch([firstCard.id, secondCard.id]);
      state.matchedPairs += 1;
      resetTurn();
      updateHud();
      renderBoard();

      if (isLevelCleared()) {
        handleLevelClear();
        return;
      }

      state.isBoardLocked = false;
      renderBoard();
    }, 420);
    return;
  }

  scheduleAction(() => {
    hideCard(firstCard.id);
    hideCard(secondCard.id);
    resetTurn();
    state.isBoardLocked = false;
    renderBoard();
  }, 860);
}

function completeMatch(cardIds) {
  cardIds.forEach((cardId) => {
    updateCard(cardId, (card) => ({
      ...card,
      matched: true,
      celebrating: true,
    }));
  });

  playMatchFeedback(cardIds.length === 1 ? "bonus" : "pair");
  scheduleAction(() => {
    cardIds.forEach(stopCelebration);
    renderBoard();
  }, 720);
}

function handleLevelClear() {
  clearInterval(state.timerId);
  state.timerId = null;
  state.isBoardLocked = true;
  showStatus(`레벨 ${state.level} 성공. 다음은 ${state.level + 1}레벨입니다.`, "success");

  scheduleAction(() => {
    state.level += 1;
    startLevel();
  }, 1200);
}

function handleGameOver() {
  clearScheduledActions();
  state.isBoardLocked = true;
  showStatus(
    `시간 초과입니다. 도달한 최고 레벨은 ${state.bestLevel}입니다. 다시 시작하세요.`,
    "danger"
  );
  renderBoard();
}

function startTimer() {
  clearInterval(state.timerId);
  state.timerId = window.setInterval(() => {
    state.secondsLeft -= 1;
    updateHud();

    if (state.secondsLeft > 0) {
      return;
    }

    state.secondsLeft = 0;
    updateHud();
    handleGameOver();
  }, 1000);
}

function resetTurn() {
  state.openCardIds = [];
}

function revealAllCards() {
  state.cards = state.cards.map((card) => ({ ...card, revealed: true }));
}

function hideAllCards() {
  state.cards = state.cards.map((card) =>
    card.matched ? card : { ...card, revealed: false }
  );
}

function revealCard(cardId) {
  updateCard(cardId, (card) => ({ ...card, revealed: true }));
}

function hideCard(cardId) {
  updateCard(cardId, (card) => ({ ...card, revealed: false }));
}

function updateCard(cardId, update) {
  state.cards = state.cards.map((card) =>
    card.id === cardId ? update(card) : card
  );
}

function stopCelebration(cardId) {
  updateCard(cardId, (card) => ({ ...card, celebrating: false }));
}

function findCard(cardId) {
  return state.cards.find((card) => card.id === cardId);
}

function isLevelCleared() {
  return state.matchedPairs === state.targetMatches;
}

function getPreviewDuration() {
  return Math.max(1800, 4200 - (state.level - 1) * 160);
}

function getTimeLimitForLevel(level) {
  if (level <= 20) {
    return 60;
  }

  if (level <= 40) {
    return 120;
  }

  return 180;
}

function getPreviewSecondsLabel() {
  return `${(getPreviewDuration() / 1000).toFixed(1)}초`;
}

function updateHud() {
  elements.level.textContent = String(state.level);
  elements.iq.textContent = String(getIqForLevel(state.level));
  elements.timer.textContent = `${state.secondsLeft}s`;
  elements.moves.textContent = String(state.moves);
  elements.best.textContent = String(state.bestLevel);
}

function getIqForLevel(level) {
  return 100 + (level - 1) * 3;
}

function showStatus(message, type) {
  elements.status.textContent = message;
  elements.status.className = "status-message";

  if (type) {
    elements.status.classList.add(type);
  }
}

function updateBestLevel(level) {
  if (level <= state.bestLevel) {
    return;
  }

  state.bestLevel = level;

  try {
    window.localStorage.setItem(BEST_LEVEL_STORAGE_KEY, String(level));
  } catch (error) {
    // localStorage may be blocked for local files or privacy settings.
  }
}

function loadBestLevel() {
  try {
    const savedLevel = Number(window.localStorage.getItem(BEST_LEVEL_STORAGE_KEY));

    if (Number.isFinite(savedLevel) && savedLevel >= 1) {
      return savedLevel;
    }
  } catch (error) {
    // localStorage may be blocked for local files or privacy settings.
  }

  return 1;
}

function scheduleAction(action, delay) {
  const timeoutId = window.setTimeout(() => {
    state.pendingActionTimeoutIds = state.pendingActionTimeoutIds.filter(
      (id) => id !== timeoutId
    );
    action();
  }, delay);

  state.pendingActionTimeoutIds.push(timeoutId);
}

function playMatchFeedback(type) {
  playMatchSound(type);
}

function playMatchSound(type) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  if (!state.audioContext) {
    state.audioContext = new AudioContextClass();
  }

  const audioContext = state.audioContext;

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  if (type === "bonus") {
    playTone(audioContext, 0, 659.25, 0.045, "triangle");
    playTone(audioContext, 0.08, 880.0, 0.04, "triangle");
    playTone(audioContext, 0.16, 987.77, 0.03, "sine");
    return;
  }

  playTone(audioContext, 0, 523.25, 0.04, "triangle");
  playTone(audioContext, 0.09, 659.25, 0.035, "triangle");
  playTone(audioContext, 0.18, 783.99, 0.03, "sine");
}

function playTone(audioContext, startOffset, frequency, gainValue, type) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const startTime = audioContext.currentTime + startOffset;
  const endTime = startTime + 0.2;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(gainValue, startTime + 0.03);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start(startTime);
  oscillator.stop(endTime);
}

function clearScheduledActions() {
  clearInterval(state.timerId);
  clearTimeout(state.previewTimeoutId);
  state.pendingActionTimeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
  state.timerId = null;
  state.previewTimeoutId = null;
  state.pendingActionTimeoutIds = [];
  state.openCardIds = [];
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

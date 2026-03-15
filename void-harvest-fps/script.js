const BEST_LEVEL_STORAGE_KEY = "void-harvest-best-level";
const FIRE_COOLDOWN = 0.18;
const PLAYER_RADIUS = 0.24;
const PLAYER_MOVE_SPEED = 2.7;
const PLAYER_SPRINT_MULTIPLIER = 1.65;
const PLAYER_AIR_SPRINT_MULTIPLIER = 1.22;
const PLAYER_JUMP_SPEED = 4.9;
const GRAVITY = 13.8;
const FOV = Math.PI / 3;
const WEAPON_RANGE = 8.5;
const LOOK_SENSITIVITY_X = 0.0022;
const LOOK_SENSITIVITY_Y = 0.24;
const MAX_LOOK_PITCH = 180;
const INTERMISSION_DURATION = 2;
const WALL_FOG_DISTANCE = 11.5;
const MINIMAP_SIZE = 146;
const MINIMAP_MARGIN = 18;
const SURGE_WARNING_DELAY = 18;
const SURGE_WARNING_DURATION = 2.4;
const TARGET_DELTA = 1 / 120;
const MAX_FRAME_DELTA = 0.05;
const ENEMY_COLORS = {
  crawler: "#7cf0b4",
  brute: "#ff8d57",
  spitter: "#d274ff",
  robot: "#78c7ff",
  beast: "#f6c46b",
  raptor: "#9bf26f",
  specter: "#d7f0ff",
};
const WEAPON_ORDER = ["plasma", "beam", "vulcan"];
const WEAPON_DEFINITIONS = {
  plasma: {
    id: "plasma",
    label: "PLASMA",
    displayName: "플라즈마 라이플",
    cooldown: 0.18,
    damage: 28,
    range: 8.5,
    automatic: false,
    maxHits: 1,
    spread: 0.007,
    recoil: 10,
    shake: 0.22,
    flashColor: "#99fbff",
    bodyColor: "#91f8ff",
  },
  beam: {
    id: "beam",
    label: "BEAM",
    displayName: "광선총",
    cooldown: 0.34,
    damage: 52,
    range: 12.5,
    automatic: false,
    maxHits: 2,
    spread: 0.0025,
    recoil: 7,
    shake: 0.16,
    flashColor: "#ffe67c",
    bodyColor: "#ffe67c",
  },
  vulcan: {
    id: "vulcan",
    label: "VULCAN",
    displayName: "발칸포",
    cooldown: 0.075,
    damage: 12,
    range: 9.3,
    automatic: true,
    maxHits: 1,
    spread: 0.02,
    recoil: 6,
    shake: 0.14,
    flashColor: "#ff9d57",
    bodyColor: "#ff9d57",
  },
};

const WORLD_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 2, 0, 0, 1, 1, 0, 0, 1, 0, 2, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 2, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 2, 0, 1, 0, 0, 1, 0, 2, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const SPAWN_POINTS = [
  { x: 1.8, y: 1.8 },
  { x: 4.5, y: 2.4 },
  { x: 11.5, y: 2.5 },
  { x: 13.3, y: 3.5 },
  { x: 7.7, y: 4.4 },
  { x: 10.6, y: 6.5 },
  { x: 3.7, y: 6.5 },
  { x: 12.2, y: 8.4 },
  { x: 4.4, y: 9.5 },
  { x: 11.3, y: 9.5 },
  { x: 7.7, y: 11.5 },
  { x: 2.3, y: 12.4 },
  { x: 12.4, y: 12.6 },
  { x: 14.2, y: 13.7 },
];

const ITEM_POINTS = [
  { x: 3.5, y: 2.8 },
  { x: 7.8, y: 4.8 },
  { x: 11.1, y: 3.2 },
  { x: 3.8, y: 8.7 },
  { x: 8.2, y: 8.1 },
  { x: 12.2, y: 8.9 },
  { x: 4.6, y: 12.1 },
  { x: 8.4, y: 11.8 },
  { x: 12.1, y: 12.2 },
];

const PICKUP_DEFINITIONS = {
  medkit: {
    type: "medkit",
    label: "MED",
    color: "#82f2a3",
    glow: "#97ffbf",
  },
  amplifier: {
    type: "amplifier",
    label: "DMG",
    color: "#ffcf68",
    glow: "#ffe7ab",
  },
  overdrive: {
    type: "overdrive",
    label: "RPM",
    color: "#7cd6ff",
    glow: "#a8ecff",
  },
};

const ENEMY_DEFINITIONS = {
  crawler: {
    maxHealth: 48,
    moveSpeed: 1.85,
    radius: 0.28,
    meleeRange: 0.82,
    meleeDamage: 9,
    attackCooldown: 0.92,
    spriteScale: 0.88,
  },
  brute: {
    maxHealth: 132,
    moveSpeed: 1.02,
    radius: 0.34,
    meleeRange: 0.96,
    meleeDamage: 18,
    attackCooldown: 1.35,
    spriteScale: 1.15,
  },
  spitter: {
    maxHealth: 74,
    moveSpeed: 1.16,
    radius: 0.3,
    meleeRange: 0.74,
    meleeDamage: 7,
    attackCooldown: 1.8,
    projectileSpeed: 3.4,
    projectileDamage: 12,
    preferredRange: 4.8,
    spriteScale: 0.92,
  },
  robot: {
    maxHealth: 108,
    moveSpeed: 1.08,
    radius: 0.31,
    meleeRange: 0.88,
    meleeDamage: 14,
    attackCooldown: 1.1,
    spriteScale: 1.02,
  },
  beast: {
    maxHealth: 82,
    moveSpeed: 1.62,
    radius: 0.29,
    meleeRange: 0.84,
    meleeDamage: 11,
    attackCooldown: 0.84,
    spriteScale: 0.96,
  },
  raptor: {
    maxHealth: 96,
    moveSpeed: 1.72,
    radius: 0.27,
    meleeRange: 0.9,
    meleeDamage: 13,
    attackCooldown: 0.88,
    spriteScale: 1.06,
  },
  specter: {
    maxHealth: 68,
    moveSpeed: 1.38,
    radius: 0.26,
    meleeRange: 0.78,
    meleeDamage: 10,
    attackCooldown: 0.78,
    spriteScale: 0.98,
  },
};

const elements = {
  canvas: document.querySelector("#gameCanvas"),
  overlay: document.querySelector("#overlayPanel"),
  startButton: document.querySelector("#startButton"),
  restartButton: document.querySelector("#restartButton"),
  status: document.querySelector("#statusMessage"),
  phase: document.querySelector("#phaseMessage"),
  level: document.querySelector("#levelValue"),
  health: document.querySelector("#healthValue"),
  kills: document.querySelector("#killsValue"),
  enemies: document.querySelector("#enemiesValue"),
  best: document.querySelector("#bestValue"),
  weapon: document.querySelector("#weaponValue"),
  damageOverlay: document.querySelector("#damageOverlay"),
};

const context = elements.canvas.getContext("2d");
const input = createInputState();
const audioEngine = createAudioEngine();
const gameState = createInitialGameState();

elements.startButton.addEventListener("click", startNewGame);
elements.restartButton.addEventListener("click", restartGame);
elements.canvas.addEventListener("click", handleCanvasClick);
window.addEventListener("resize", resizeCanvas);
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mouseup", handleMouseUp);
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("contextmenu", handleContextMenu);
document.addEventListener("pointerlockchange", handlePointerLockChange);
document.addEventListener("pointerlockerror", () => {
  updateStatus("포인터 잠금을 허용해야 FPS 조작이 가능합니다.", "danger");
});

resizeCanvas();
updateHud();
updatePhaseMessage("기지 내부에 괴물이 퍼졌습니다. 진입해서 생존하십시오.");
updateStatus("작전 시작 후 화면을 클릭하면 조준이 활성화됩니다.", "");
registerServiceWorker();
requestAnimationFrame(gameLoop);

function createInitialGameState() {
  return {
    phase: "idle",
    level: 1,
    bestLevel: loadBestLevel(),
    totalKills: 0,
    phaseTimer: 0,
    lastTimestamp: 0,
    accumulator: 0,
    waveElapsed: 0,
    surgePending: false,
    surgeTriggered: false,
    surgeCountdown: 0,
    waveQueue: [],
    currentWeaponId: "plasma",
    shotCooldown: 0,
    cameraKick: 0,
    muzzleFlash: 0,
    muzzleFlashColor: WEAPON_DEFINITIONS.plasma.flashColor,
    screenShake: 0,
    damageFlash: 0,
    hitFlash: 0,
    lightFlicker: 0,
    depthBuffer: [],
    player: createPlayerState(),
    enemies: [],
    projectiles: [],
    pickups: [],
    particles: [],
    shotTracers: [],
    nextEnemyId: 1,
  };
}

function createPlayerState() {
  return {
    x: 8,
    y: 8,
    z: 0,
    verticalVelocity: 0,
    angle: -Math.PI / 2,
    pitch: 0,
    health: 100,
    damageMultiplier: 1,
    fireRateMultiplier: 1,
    damageBoostTimer: 0,
    fireRateBoostTimer: 0,
    grounded: true,
  };
}

function createInputState() {
  return {
    keys: new Set(),
    lookX: 0,
    lookY: 0,
    pointerLocked: false,
    triggerHeld: false,
  };
}

function createAudioEngine() {
  return {
    context: null,
    noiseBuffer: null,
  };
}

function startNewGame() {
  audioResume();
  resetGameState();
  spawnWave(gameState.level);
  hideOverlay();
  updatePhaseMessage(`레벨 ${gameState.level}. 우주 기지 정화 작전을 시작합니다.`);
  updateStatus("좌클릭으로 플라즈마 라이플을 발사하십시오.", "");
  requestPointerLock();
}

function restartGame() {
  startNewGame();
}

function resetGameState() {
  gameState.phase = "playing";
  gameState.level = 1;
  gameState.totalKills = 0;
  gameState.phaseTimer = 0;
  gameState.waveElapsed = 0;
  gameState.surgePending = false;
  gameState.surgeTriggered = false;
  gameState.surgeCountdown = 0;
  gameState.waveQueue = [];
  gameState.currentWeaponId = "plasma";
  gameState.shotCooldown = 0;
  gameState.cameraKick = 0;
  gameState.muzzleFlash = 0;
  gameState.muzzleFlashColor = WEAPON_DEFINITIONS.plasma.flashColor;
  gameState.screenShake = 0;
  gameState.damageFlash = 0;
  gameState.hitFlash = 0;
  gameState.lightFlicker = 0;
  gameState.enemies = [];
  gameState.projectiles = [];
  gameState.pickups = [];
  gameState.particles = [];
  gameState.shotTracers = [];
  gameState.nextEnemyId = 1;
  input.triggerHeld = false;
  gameState.player = createPlayerState();
  updateHud();
}

function handleCanvasClick() {
  if (gameState.phase === "playing") {
    requestPointerLock();
  }
}

function handleKeyDown(event) {
  if (event.code === "Space") {
    event.preventDefault();

    if (gameState.phase === "playing") {
      tryJump();
    }
  }

  input.keys.add(event.code);
}

function handleKeyUp(event) {
  input.keys.delete(event.code);
}

function handleMouseDown(event) {
  if (gameState.phase !== "playing") {
    return;
  }

  if (event.button === 2) {
    event.preventDefault();
    cycleWeapon();
    return;
  }

  if (event.button !== 0) {
    return;
  }

  if (!input.pointerLocked) {
    requestPointerLock();
    return;
  }

  input.triggerHeld = true;
  fireWeapon();
}

function handleMouseUp(event) {
  if (event.button === 0) {
    input.triggerHeld = false;
  }
}

function handleContextMenu(event) {
  event.preventDefault();
}

function handleMouseMove(event) {
  if (!input.pointerLocked || gameState.phase !== "playing") {
    return;
  }

  input.lookX += event.movementX;
  input.lookY += event.movementY;
}

function handlePointerLockChange() {
  input.pointerLocked = document.pointerLockElement === elements.canvas;
}

function requestPointerLock() {
  if (document.pointerLockElement !== elements.canvas) {
    elements.canvas.requestPointerLock?.();
  }
}

function tryJump() {
  if (!gameState.player.grounded) {
    return;
  }

  gameState.player.grounded = false;
  gameState.player.verticalVelocity = PLAYER_JUMP_SPEED;
  playJumpSound();
}

function gameLoop(timestamp) {
  if (!gameState.lastTimestamp) {
    gameState.lastTimestamp = timestamp;
  }

  const elapsedSeconds = Math.min(
    (timestamp - gameState.lastTimestamp) / 1000,
    MAX_FRAME_DELTA
  );

  gameState.lastTimestamp = timestamp;
  gameState.accumulator += elapsedSeconds;

  while (gameState.accumulator >= TARGET_DELTA) {
    updateGame(TARGET_DELTA);
    gameState.accumulator -= TARGET_DELTA;
  }

  renderScene();
  requestAnimationFrame(gameLoop);
}

function updateGame(deltaTime) {
  gameState.shotCooldown = Math.max(0, gameState.shotCooldown - deltaTime);
  gameState.cameraKick = approach(gameState.cameraKick, 0, deltaTime * 11);
  gameState.muzzleFlash = Math.max(0, gameState.muzzleFlash - deltaTime * 7);
  gameState.screenShake = Math.max(0, gameState.screenShake - deltaTime * 3.5);
  gameState.damageFlash = Math.max(0, gameState.damageFlash - deltaTime * 1.8);
  gameState.hitFlash = Math.max(0, gameState.hitFlash - deltaTime * 4.2);
  gameState.lightFlicker += deltaTime;

  updateShotTracers(deltaTime);
  updateParticles(deltaTime);
  updateProjectiles(deltaTime);
  updateDeadEnemies(deltaTime);

  if (gameState.phase === "idle" || gameState.phase === "gameover") {
    updateDamageOverlay();
    return;
  }

  if (gameState.phase === "intermission") {
    gameState.phaseTimer -= deltaTime;

    if (gameState.phaseTimer <= 0) {
      gameState.level += 1;
      spawnWave(gameState.level);
      gameState.phase = "playing";
      updatePhaseMessage(`레벨 ${gameState.level}. 새로운 괴물 반응이 감지됩니다.`);
      updateStatus("웨이브가 시작되었습니다. 기지 핵심부를 사수하십시오.", "");
    }

    updateDamageOverlay();
    return;
  }

  gameState.waveElapsed += deltaTime;
  updateViewFromMouse(deltaTime);
  fireAutomaticWeapon();
  updatePlayer(deltaTime);
  updatePlayerBuffs(deltaTime);
  updateWavePressure(deltaTime);
  updateEnemies(deltaTime);
  updatePickups();
  updateDamageOverlay();
}

function fireAutomaticWeapon() {
  if (!input.triggerHeld) {
    return;
  }

  if (!getCurrentWeapon().automatic) {
    return;
  }

  fireWeapon();
}

function updatePlayerBuffs(deltaTime) {
  gameState.player.damageBoostTimer = Math.max(
    0,
    gameState.player.damageBoostTimer - deltaTime
  );
  gameState.player.fireRateBoostTimer = Math.max(
    0,
    gameState.player.fireRateBoostTimer - deltaTime
  );
  gameState.player.damageMultiplier =
    gameState.player.damageBoostTimer > 0 ? 1.45 : 1;
  gameState.player.fireRateMultiplier =
    gameState.player.fireRateBoostTimer > 0 ? 1.38 : 1;
}

function updateWavePressure(deltaTime) {
  if (!gameState.waveQueue.length || gameState.surgeTriggered) {
    return;
  }

  if (!gameState.surgePending && gameState.waveElapsed >= SURGE_WARNING_DELAY) {
    gameState.surgePending = true;
    gameState.surgeCountdown = SURGE_WARNING_DURATION;
    updatePhaseMessage("Warning. Hostile surge detected.");
    updateStatus("경고음과 함께 적 증원이 접근합니다.", "danger");
    playAlertSound();
  }

  if (!gameState.surgePending) {
    return;
  }

  gameState.surgeCountdown -= deltaTime;

  if (gameState.surgeCountdown > 0) {
    return;
  }

  deployWaveSurge();
}

function updateViewFromMouse(deltaTime) {
  gameState.player.angle = normalizeAngle(
    gameState.player.angle + input.lookX * LOOK_SENSITIVITY_X
  );
  gameState.player.pitch = clamp(
    gameState.player.pitch + input.lookY * LOOK_SENSITIVITY_Y,
    -MAX_LOOK_PITCH,
    MAX_LOOK_PITCH
  );
  input.lookX = 0;
  input.lookY = 0;
}

function updatePlayer(deltaTime) {
  const movement = getMovementVector();
  const sprintMultiplier = gameState.player.grounded
    ? PLAYER_SPRINT_MULTIPLIER
    : PLAYER_AIR_SPRINT_MULTIPLIER;
  const wantsSprint = input.keys.has("ShiftLeft") || input.keys.has("ShiftRight");
  const speed = PLAYER_MOVE_SPEED * (wantsSprint ? sprintMultiplier : 1);

  movePlayer(movement.x * speed * deltaTime, movement.y * speed * deltaTime);
  updatePlayerVerticalMotion(deltaTime);
}

function getMovementVector() {
  const forward = Number(input.keys.has("KeyW")) - Number(input.keys.has("KeyS"));
  const strafe = Number(input.keys.has("KeyD")) - Number(input.keys.has("KeyA"));

  if (!forward && !strafe) {
    return { x: 0, y: 0 };
  }

  const forwardX = Math.cos(gameState.player.angle);
  const forwardY = Math.sin(gameState.player.angle);
  const rightX = Math.cos(gameState.player.angle + Math.PI / 2);
  const rightY = Math.sin(gameState.player.angle + Math.PI / 2);
  const moveX = forwardX * forward + rightX * strafe;
  const moveY = forwardY * forward + rightY * strafe;
  const length = Math.hypot(moveX, moveY) || 1;

  return {
    x: moveX / length,
    y: moveY / length,
  };
}

function movePlayer(deltaX, deltaY) {
  tryMoveEntity(gameState.player, deltaX, deltaY, PLAYER_RADIUS);
}

function updatePlayerVerticalMotion(deltaTime) {
  gameState.player.verticalVelocity -= GRAVITY * deltaTime;
  gameState.player.z += gameState.player.verticalVelocity * deltaTime;

  if (gameState.player.z <= 0) {
    if (!gameState.player.grounded && gameState.player.verticalVelocity < -5) {
      spawnLandingDust();
    }

    gameState.player.z = 0;
    gameState.player.verticalVelocity = 0;
    gameState.player.grounded = true;
  }
}

function updateEnemies(deltaTime) {
  const livingEnemies = gameState.enemies.filter((enemy) => !enemy.dead);

  livingEnemies.forEach((enemy) => {
    const previousX = enemy.x;
    const previousY = enemy.y;

    enemy.attackCooldown = Math.max(0, enemy.attackCooldown - deltaTime);
    enemy.hitFlash = Math.max(0, enemy.hitFlash - deltaTime * 4);
    enemy.staggerTimer = Math.max(0, enemy.staggerTimer - deltaTime);

    if (enemy.staggerTimer > 0) {
      return;
    }

    updateEnemyBehavior(enemy, deltaTime);
    updateEnemyStuckState(enemy, previousX, previousY, deltaTime);
  });

  if (
    livingEnemies.length === 0 &&
    gameState.phase === "playing" &&
    (!gameState.waveQueue.length || gameState.waveElapsed < SURGE_WARNING_DELAY)
  ) {
    beginIntermission();
  }

  updateHud();
}

function updateEnemyStuckState(enemy, previousX, previousY, deltaTime) {
  const movedDistance = Math.hypot(enemy.x - previousX, enemy.y - previousY);
  const distanceToPlayer = Math.hypot(
    enemy.x - gameState.player.x,
    enemy.y - gameState.player.y
  );

  if (distanceToPlayer <= enemy.meleeRange + 0.2 || movedDistance > 0.01) {
    enemy.stuckTime = 0;
    return;
  }

  enemy.stuckTime += deltaTime;

  if (enemy.stuckTime < 1.6) {
    return;
  }

  const recoveryPoint = getRecoverySpawnPoint();

  if (!recoveryPoint) {
    enemy.stuckTime = 0.8;
    return;
  }

  enemy.x = recoveryPoint.x;
  enemy.y = recoveryPoint.y;
  enemy.stuckTime = 0;
}

function updateEnemyBehavior(enemy, deltaTime) {
  const dx = gameState.player.x - enemy.x;
  const dy = gameState.player.y - enemy.y;
  const distanceToPlayer = Math.hypot(dx, dy);
  const direction = distanceToPlayer
    ? { x: dx / distanceToPlayer, y: dy / distanceToPlayer }
    : { x: 0, y: 0 };

  if (enemy.type === "spitter") {
    updateSpitter(enemy, direction, distanceToPlayer, deltaTime);
    return;
  }

  if (distanceToPlayer <= enemy.meleeRange) {
    tryEnemyMelee(enemy);
    return;
  }

  moveEnemyTowardPoint(
    enemy,
    gameState.player.x,
    gameState.player.y,
    enemy.moveSpeed,
    deltaTime
  );
}

function updateSpitter(enemy, direction, distanceToPlayer, deltaTime) {
  const closeRange = enemy.preferredRange - 1.2;
  const farRange = enemy.preferredRange + 1.2;

  if (distanceToPlayer < closeRange) {
    moveEnemyAwayFromPoint(
      enemy,
      gameState.player.x,
      gameState.player.y,
      enemy.moveSpeed * 0.9,
      deltaTime
    );
  } else if (distanceToPlayer > farRange) {
    moveEnemyTowardPoint(
      enemy,
      gameState.player.x,
      gameState.player.y,
      enemy.moveSpeed,
      deltaTime
    );
  }

  if (distanceToPlayer <= enemy.preferredRange + 1.4 && hasLineOfSight(enemy)) {
    if (enemy.attackCooldown <= 0) {
      spawnAcidProjectile(enemy, direction);
      enemy.attackCooldown = enemy.baseAttackCooldown;
    }
    return;
  }

  if (distanceToPlayer <= enemy.meleeRange) {
    tryEnemyMelee(enemy);
  }
}

function moveEnemyTowardPoint(enemy, targetX, targetY, speed, deltaTime) {
  const targetAngle = Math.atan2(targetY - enemy.y, targetX - enemy.x);
  tryMoveWithSteering(enemy, targetAngle, speed, deltaTime);
}

function moveEnemyAwayFromPoint(enemy, targetX, targetY, speed, deltaTime) {
  const escapeAngle = Math.atan2(enemy.y - targetY, enemy.x - targetX);
  tryMoveWithSteering(enemy, escapeAngle, speed, deltaTime);
}

function tryMoveWithSteering(enemy, baseAngle, speed, deltaTime) {
  const steeringAngles = [0, 0.45, -0.45, 0.9, -0.9, 1.35, -1.35, Math.PI];

  for (const angleOffset of steeringAngles) {
    const moveAngle = baseAngle + angleOffset;
    const didMove = tryMoveEntity(
      enemy,
      Math.cos(moveAngle) * speed * deltaTime,
      Math.sin(moveAngle) * speed * deltaTime,
      enemy.radius
    );

    if (didMove) {
      return true;
    }
  }

  return false;
}

function tryEnemyMelee(enemy) {
  if (enemy.attackCooldown > 0) {
    return;
  }

  enemy.attackCooldown = enemy.baseAttackCooldown;
  damagePlayer(enemy.meleeDamage, enemy.type === "brute" ? 0.28 : 0.18);
}

function spawnAcidProjectile(enemy, direction) {
  gameState.projectiles.push({
    kind: "acid",
    x: enemy.x + direction.x * 0.45,
    y: enemy.y + direction.y * 0.45,
    z: 0.18,
    vx: direction.x * enemy.projectileSpeed,
    vy: direction.y * enemy.projectileSpeed,
    radius: 0.12,
    life: 2.8,
    damage: enemy.projectileDamage,
  });

  playSpitSound();
}

function updateProjectiles(deltaTime) {
  gameState.projectiles.forEach((projectile) => {
    projectile.x += projectile.vx * deltaTime;
    projectile.y += projectile.vy * deltaTime;
    projectile.life -= deltaTime;

    if (isWallAt(projectile.x, projectile.y)) {
      projectile.life = 0;
      spawnImpactBurst(projectile.x, projectile.y, "#9df3e6", 8, 0.2);
      return;
    }

    const distanceToPlayer = Math.hypot(
      projectile.x - gameState.player.x,
      projectile.y - gameState.player.y
    );

    if (distanceToPlayer <= PLAYER_RADIUS + projectile.radius) {
      projectile.life = 0;
      damagePlayer(projectile.damage, 0.22);
      spawnImpactBurst(projectile.x, projectile.y, "#9df3e6", 10, 0.22);
    }
  });

  gameState.projectiles = gameState.projectiles.filter(
    (projectile) => projectile.life > 0
  );
}

function updateParticles(deltaTime) {
  gameState.particles.forEach((particle) => {
    particle.life -= deltaTime;
    particle.x += particle.vx * deltaTime;
    particle.y += particle.vy * deltaTime;
    particle.z += particle.vz * deltaTime;
    particle.vz -= particle.gravity * deltaTime;
    particle.size = Math.max(0.01, particle.size - deltaTime * particle.shrinkRate);
  });

  gameState.particles = gameState.particles.filter((particle) => particle.life > 0);
}

function updateShotTracers(deltaTime) {
  gameState.shotTracers.forEach((tracer) => {
    tracer.life -= deltaTime;
  });

  gameState.shotTracers = gameState.shotTracers.filter((tracer) => tracer.life > 0);
}

function updateDeadEnemies(deltaTime) {
  gameState.enemies.forEach((enemy) => {
    if (enemy.dead) {
      enemy.deathTimer -= deltaTime;
    }
  });

  gameState.enemies = gameState.enemies.filter(
    (enemy) => !enemy.dead || enemy.deathTimer > 0
  );
}

function spawnWave(level) {
  gameState.enemies = [];
  gameState.projectiles = [];
  gameState.pickups = [];
  gameState.particles = [];
  gameState.shotTracers = [];
  gameState.waveElapsed = 0;
  gameState.surgePending = false;
  gameState.surgeTriggered = false;
  gameState.surgeCountdown = 0;
  gameState.waveQueue = [];

  const enemyCount = getEnemyCountForLevel(level);
  const wavePlan = buildWavePlan(level, enemyCount);
  const initialCount = Math.max(2, Math.ceil(enemyCount * 0.55));

  wavePlan.forEach((waveEntry, index) => {
    if (index < initialCount) {
      gameState.enemies.push(createEnemy(waveEntry.type, waveEntry.spawnPoint, index));
      return;
    }

    gameState.waveQueue.push(waveEntry);
  });

  spawnPickups(level);

  updateHud();
}

function buildWavePlan(level, enemyCount) {
  const spawnPool = getAvailableSpawnPoints();

  return Array.from({ length: enemyCount }, (_, index) => ({
    type: getEnemyTypeForLevel(level, index, enemyCount),
    spawnPoint: spawnPool[index % spawnPool.length],
  }));
}

function deployWaveSurge() {
  gameState.surgePending = false;
  gameState.surgeTriggered = true;

  gameState.waveQueue.forEach((waveEntry, index) => {
    gameState.enemies.push(
      createEnemy(waveEntry.type, waveEntry.spawnPoint, gameState.enemies.length + index)
    );
  });

  gameState.waveQueue = [];
  updatePhaseMessage("Enemy surge incoming. Brace for contact.");
  updateStatus("증원이 몰려옵니다. 포지션을 유지하십시오.", "danger");
  playAlertSound();
  updateHud();
}

function spawnPickups(level) {
  const cycle = ["medkit", "amplifier", "overdrive"];
  const pickupCount = Math.min(4, 2 + Math.floor(level / 4));

  for (let index = 0; index < pickupCount; index += 1) {
    const point = ITEM_POINTS[(level + index * 2) % ITEM_POINTS.length];
    const type = cycle[(level + index) % cycle.length];

    gameState.pickups.push({
      id: `pickup-${level}-${index}`,
      type,
      x: point.x,
      y: point.y,
      bob: Math.random() * Math.PI * 2,
      collected: false,
    });
  }
}

function updatePickups() {
  gameState.pickups.forEach((pickup) => {
    if (pickup.collected) {
      return;
    }

    pickup.bob += TARGET_DELTA * 3.6;

    const distanceToPlayer = Math.hypot(
      pickup.x - gameState.player.x,
      pickup.y - gameState.player.y
    );

    if (distanceToPlayer <= 0.58) {
      collectPickup(pickup);
    }
  });

  gameState.pickups = gameState.pickups.filter((pickup) => !pickup.collected);
}

function collectPickup(pickup) {
  pickup.collected = true;

  if (pickup.type === "medkit") {
    gameState.player.health = Math.min(100, gameState.player.health + 24);
    updateStatus("메디킷 확보. 생명력이 회복되었습니다.", "success");
  } else if (pickup.type === "amplifier") {
    gameState.player.damageBoostTimer = 16;
    updateStatus("파워 셀 확보. 화력이 상승했습니다.", "success");
  } else {
    gameState.player.fireRateBoostTimer = 14;
    updateStatus("오버드라이브 확보. 연사력이 상승했습니다.", "success");
  }

  updateHud();
  spawnImpactBurst(pickup.x, pickup.y, PICKUP_DEFINITIONS[pickup.type].glow, 10, 0.18);
  playPickupSound();
}

function createEnemy(type, spawnPoint, index) {
  const blueprint = ENEMY_DEFINITIONS[type];
  const angleOffset = (index % 3) * 0.18;

  return {
    id: gameState.nextEnemyId++,
    type,
    x: spawnPoint.x + Math.cos(angleOffset) * 0.12,
    y: spawnPoint.y + Math.sin(angleOffset) * 0.12,
    health: blueprint.maxHealth,
    maxHealth: blueprint.maxHealth,
    moveSpeed: blueprint.moveSpeed,
    radius: blueprint.radius,
    meleeRange: blueprint.meleeRange,
    meleeDamage: blueprint.meleeDamage,
    baseAttackCooldown: blueprint.attackCooldown,
    attackCooldown: 0.7 + index * 0.06,
    projectileSpeed: blueprint.projectileSpeed ?? 0,
    projectileDamage: blueprint.projectileDamage ?? 0,
    preferredRange: blueprint.preferredRange ?? 0,
    spriteScale: blueprint.spriteScale,
    dead: false,
    hitFlash: 0,
    staggerTimer: 0,
    stuckTime: 0,
    deathTimer: 0.32,
  };
}

function getEnemyCountForLevel(level) {
  return 4 + Math.floor((level - 1) / 3) * 2;
}

function getEnemyTypeForLevel(level, index, enemyCount) {
  if (level <= 3) {
    return index >= enemyCount - 1 && level >= 3 ? "brute" : "crawler";
  }

  if (level <= 6) {
    const pattern = ["crawler", "beast", "brute", "crawler", "robot", "beast"];
    return pattern[index % pattern.length];
  }

  if (level <= 9) {
    const pattern = ["raptor", "robot", "spitter", "beast", "brute", "crawler"];
    return pattern[index % pattern.length];
  }

  const pattern = ["robot", "raptor", "spitter", "specter", "beast", "brute"];
  return pattern[index % pattern.length];
}

function getAvailableSpawnPoints() {
  return SPAWN_POINTS.filter((spawnPoint) => isSpawnPointSafe(spawnPoint, 3.5));
}

function getRecoverySpawnPoint() {
  return SPAWN_POINTS
    .filter((spawnPoint) => {
      const distance = Math.hypot(
        spawnPoint.x - gameState.player.x,
        spawnPoint.y - gameState.player.y
      );
      const angleToSpawn = Math.atan2(
        spawnPoint.y - gameState.player.y,
        spawnPoint.x - gameState.player.x
      );
      const angleOffset = Math.abs(normalizeAngle(angleToSpawn - gameState.player.angle));

      return (
        distance >= 7.5 &&
        distance <= 11.5 &&
        angleOffset > FOV * 0.75 &&
        !hasLineOfSight({ x: spawnPoint.x, y: spawnPoint.y }) &&
        canOccupy(spawnPoint.x, spawnPoint.y, 0.32)
      );
    })
    .sort((left, right) => {
      const leftDistance = Math.hypot(left.x - gameState.player.x, left.y - gameState.player.y);
      const rightDistance = Math.hypot(
        right.x - gameState.player.x,
        right.y - gameState.player.y
      );

      return leftDistance - rightDistance;
    })[0];
}

function isSpawnPointSafe(spawnPoint, minimumDistance) {
  const distance = Math.hypot(
    spawnPoint.x - gameState.player.x,
    spawnPoint.y - gameState.player.y
  );

  return (
    distance >= minimumDistance &&
    !hasLineOfSight({ x: spawnPoint.x, y: spawnPoint.y }) &&
    canOccupy(spawnPoint.x, spawnPoint.y, 0.32)
  );
}

function beginIntermission() {
  gameState.phase = "intermission";
  gameState.phaseTimer = INTERMISSION_DURATION;
  updatePhaseMessage(`레벨 ${gameState.level} 정리 완료. 다음 웨이브를 준비합니다.`);
  updateStatus("2초 후 다음 구역 경보가 활성화됩니다.", "success");
  playWaveClearSound();
}

function getCurrentWeapon() {
  return WEAPON_DEFINITIONS[gameState.currentWeaponId];
}

function cycleWeapon() {
  const currentIndex = WEAPON_ORDER.indexOf(gameState.currentWeaponId);
  const nextWeaponId = WEAPON_ORDER[(currentIndex + 1) % WEAPON_ORDER.length];

  gameState.currentWeaponId = nextWeaponId;
  gameState.muzzleFlashColor = getCurrentWeapon().flashColor;
  updateHud();
  updateStatus(`${getCurrentWeapon().displayName} 장착 완료.`, "success");
}

function fireWeapon() {
  if (gameState.shotCooldown > 0) {
    return;
  }

  const weapon = getCurrentWeapon();
  const effectiveCooldown = weapon.cooldown / gameState.player.fireRateMultiplier;
  const effectiveDamage = weapon.damage * gameState.player.damageMultiplier;
  const shotAngle = gameState.player.angle + (Math.random() - 0.5) * weapon.spread;
  const wallHit = castRay(shotAngle);
  const enemyHits = getTargetedEnemies(shotAngle, wallHit.distance, weapon);
  const farthestImpact = enemyHits.length
    ? enemyHits[enemyHits.length - 1]
    : { x: wallHit.hitX, y: wallHit.hitY };

  gameState.shotCooldown = effectiveCooldown;
  gameState.muzzleFlash = 1;
  gameState.muzzleFlashColor = weapon.flashColor;
  gameState.cameraKick = weapon.recoil;
  gameState.screenShake = Math.min(0.46, gameState.screenShake + weapon.shake);
  playShotSound(weapon);

  if (enemyHits.length) {
    enemyHits.forEach((enemyHit) => {
      applyEnemyDamage(enemyHit.enemy, effectiveDamage);
    });
    addTracer(farthestImpact.x, farthestImpact.y, weapon.flashColor);
    return;
  }

  if (wallHit.distance <= weapon.range) {
    spawnImpactBurst(wallHit.hitX, wallHit.hitY, weapon.flashColor, 7, 0.2);
    addTracer(wallHit.hitX, wallHit.hitY, weapon.flashColor);
  }
}

function getTargetedEnemies(shotAngle, maxDistance, weapon) {
  return gameState.enemies
    .filter((enemy) => !enemy.dead)
    .map((enemy) => {
      const dx = enemy.x - gameState.player.x;
      const dy = enemy.y - gameState.player.y;
      const distance = Math.hypot(dx, dy);

      if (distance > weapon.range || distance > maxDistance + 0.15) {
        return null;
      }

      const targetAngle = Math.atan2(dy, dx);
      const angleOffset = Math.abs(normalizeAngle(targetAngle - shotAngle));
      const aimWindow = Math.atan2(enemy.radius * 1.35, distance) + 0.015;

      if (angleOffset > aimWindow || !hasLineOfSight(enemy)) {
        return null;
      }

      return {
        enemy,
        x: enemy.x,
        y: enemy.y,
        angleOffset,
        distance,
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      if (left.angleOffset === right.angleOffset) {
        return left.distance - right.distance;
      }

      return left.angleOffset - right.angleOffset;
    })
    .slice(0, weapon.maxHits);
}

function applyEnemyDamage(enemy, damage) {
  enemy.health = Math.max(0, enemy.health - damage);
  enemy.hitFlash = 1;
  enemy.staggerTimer = enemy.type === "brute" ? 0.08 : 0.12;
  gameState.hitFlash = 1;
  spawnImpactBurst(enemy.x, enemy.y, ENEMY_COLORS[enemy.type], 10, 0.25);
  playHitSound();

  if (enemy.health > 0) {
    return;
  }

  enemy.dead = true;
  enemy.deathTimer = 0.32;
  gameState.totalKills += 1;
  gameState.screenShake = Math.min(0.55, gameState.screenShake + 0.18);
  spawnDeathBurst(enemy.x, enemy.y, ENEMY_COLORS[enemy.type]);
  playEnemyDeathSound(enemy.type);
  updateHud();
}

function damagePlayer(amount, shakeStrength) {
  if (gameState.phase !== "playing") {
    return;
  }

  gameState.player.health = Math.max(0, gameState.player.health - amount);
  gameState.damageFlash = 1;
  gameState.screenShake = Math.min(0.7, gameState.screenShake + shakeStrength);
  gameState.player.pitch = clamp(
    gameState.player.pitch + 18,
    -MAX_LOOK_PITCH,
    MAX_LOOK_PITCH
  );
  updateHud();
  playDamageSound();

  if (gameState.player.health > 0) {
    updateStatus("피격 경고. 체력을 회복할 수단은 없습니다.", "danger");
    return;
  }

  handleGameOver();
}

function handleGameOver() {
  gameState.phase = "gameover";
  updateBestLevel(gameState.level);
  showOverlay();
  updatePhaseMessage(`작전 실패. 도달 레벨 ${gameState.level}`);
  updateStatus("괴물에게 제압되었습니다. 다시 투입하십시오.", "danger");
  document.exitPointerLock?.();
}

function updateDamageOverlay() {
  elements.damageOverlay.style.opacity = String(gameState.damageFlash * 0.72);
}

function addTracer(worldX, worldY, color) {
  gameState.shotTracers.push({
    x: worldX,
    y: worldY,
    life: 0.08,
    color,
  });
}

function spawnImpactBurst(x, y, color, count, spread) {
  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.6;
    const speed = 0.7 + Math.random() * 1.2;

    gameState.particles.push({
      x,
      y,
      z: 0.24 + Math.random() * 0.22,
      vx: Math.cos(angle) * speed * spread,
      vy: Math.sin(angle) * speed * spread,
      vz: 0.55 + Math.random() * 0.9,
      gravity: 2.8,
      life: 0.24 + Math.random() * 0.16,
      size: 0.08 + Math.random() * 0.06,
      shrinkRate: 0.18 + Math.random() * 0.2,
      color,
    });
  }
}

function spawnDeathBurst(x, y, color) {
  spawnImpactBurst(x, y, color, 18, 0.4);
}

function spawnLandingDust() {
  spawnImpactBurst(gameState.player.x, gameState.player.y, "#6bd2ff", 6, 0.15);
}

function castRay(angle) {
  const directionX = Math.cos(angle);
  const directionY = Math.sin(angle);
  let mapX = Math.floor(gameState.player.x);
  let mapY = Math.floor(gameState.player.y);
  const deltaDistanceX = Math.abs(1 / (directionX || 0.0001));
  const deltaDistanceY = Math.abs(1 / (directionY || 0.0001));
  let sideDistanceX;
  let sideDistanceY;
  let stepX;
  let stepY;
  let side = 0;

  if (directionX < 0) {
    stepX = -1;
    sideDistanceX = (gameState.player.x - mapX) * deltaDistanceX;
  } else {
    stepX = 1;
    sideDistanceX = (mapX + 1 - gameState.player.x) * deltaDistanceX;
  }

  if (directionY < 0) {
    stepY = -1;
    sideDistanceY = (gameState.player.y - mapY) * deltaDistanceY;
  } else {
    stepY = 1;
    sideDistanceY = (mapY + 1 - gameState.player.y) * deltaDistanceY;
  }

  let hitTile = 0;

  while (!hitTile) {
    if (sideDistanceX < sideDistanceY) {
      sideDistanceX += deltaDistanceX;
      mapX += stepX;
      side = 0;
    } else {
      sideDistanceY += deltaDistanceY;
      mapY += stepY;
      side = 1;
    }

    hitTile = WORLD_MAP[mapY]?.[mapX] ?? 1;
  }

  const distance =
    side === 0
      ? (mapX - gameState.player.x + (1 - stepX) / 2) / directionX
      : (mapY - gameState.player.y + (1 - stepY) / 2) / directionY;

  return {
    tile: hitTile,
    side,
    distance: Math.max(0.0001, distance),
    hitX: gameState.player.x + directionX * distance,
    hitY: gameState.player.y + directionY * distance,
  };
}

function renderScene() {
  const canvasWidth = elements.canvas.width;
  const canvasHeight = elements.canvas.height;
  const shake = getShakeOffset();
  const horizon = canvasHeight / 2 + gameState.player.pitch - gameState.player.z * 150;

  context.save();
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.translate(shake.x, shake.y);
  renderBackdrop(canvasWidth, canvasHeight, horizon);
  renderWalls(canvasWidth, canvasHeight, horizon);
  renderSprites(canvasWidth, canvasHeight, horizon);
  renderParticles(canvasWidth, horizon);
  renderTracers(canvasWidth, canvasHeight, horizon);
  renderWeapon(canvasWidth, canvasHeight);
  renderOverlayEffects(canvasWidth, canvasHeight);
  context.restore();
}

function renderBackdrop(canvasWidth, canvasHeight, horizon) {
  const flicker = 0.5 + Math.sin(gameState.lightFlicker * 3.4) * 0.12;
  const skyGradient = context.createLinearGradient(0, 0, 0, horizon);
  skyGradient.addColorStop(0, "#02060a");
  skyGradient.addColorStop(0.55, `rgba(6, 15, 26, ${0.96 * flicker})`);
  skyGradient.addColorStop(1, "#0d2030");
  context.fillStyle = skyGradient;
  context.fillRect(0, 0, canvasWidth, horizon);

  const floorGradient = context.createLinearGradient(0, horizon, 0, canvasHeight);
  floorGradient.addColorStop(0, "#09131c");
  floorGradient.addColorStop(1, "#020509");
  context.fillStyle = floorGradient;
  context.fillRect(0, horizon, canvasWidth, canvasHeight - horizon);

  context.strokeStyle = "rgba(100, 255, 255, 0.06)";
  context.lineWidth = 1;

  for (let line = 0; line < 10; line += 1) {
    const y = horizon + line * ((canvasHeight - horizon) / 10);
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvasWidth, y);
    context.stroke();
  }
}

function renderWalls(canvasWidth, canvasHeight, horizon) {
  const projectionPlane = canvasWidth / (2 * Math.tan(FOV / 2));

  for (let column = 0; column < canvasWidth; column += 1) {
    const cameraX = (column / canvasWidth) * 2 - 1;
    const rayAngle = gameState.player.angle + Math.atan(cameraX * Math.tan(FOV / 2));
    const ray = castRay(rayAngle);
    const correctedDistance = ray.distance * Math.cos(rayAngle - gameState.player.angle);
    const wallHeight = projectionPlane / correctedDistance;
    const startY = Math.floor(horizon - wallHeight / 2);
    const fog = clamp(correctedDistance / WALL_FOG_DISTANCE, 0, 1);

    gameState.depthBuffer[column] = correctedDistance;
    context.fillStyle = getWallColor(ray.tile, ray.side, fog);
    context.fillRect(column, startY, 1, wallHeight + 1);
  }
}

function getWallColor(tile, side, fog) {
  const palette =
    tile === 2
      ? { base: [110, 230, 255], shadow: [36, 88, 110] }
      : { base: [62, 106, 138], shadow: [24, 48, 64] };
  const brightness = side === 0 ? 1 : 0.72;
  const red = Math.round(
    palette.base[0] * brightness * (1 - fog) + palette.shadow[0] * fog
  );
  const green = Math.round(
    palette.base[1] * brightness * (1 - fog) + palette.shadow[1] * fog
  );
  const blue = Math.round(
    palette.base[2] * brightness * (1 - fog) + palette.shadow[2] * fog
  );

  return `rgb(${red} ${green} ${blue})`;
}

function renderSprites(canvasWidth, canvasHeight, horizon) {
  const projectionPlane = canvasWidth / (2 * Math.tan(FOV / 2));
  const sprites = [
    ...gameState.enemies.filter((enemy) => !enemy.dead),
    ...gameState.projectiles,
    ...gameState.pickups,
  ]
    .map((entry) => ({
      entry,
      distance: Math.hypot(entry.x - gameState.player.x, entry.y - gameState.player.y),
    }))
    .sort((left, right) => right.distance - left.distance);

  sprites.forEach(({ entry, distance }) => {
    const angleToSprite = Math.atan2(entry.y - gameState.player.y, entry.x - gameState.player.x);
    const relativeAngle = normalizeAngle(angleToSprite - gameState.player.angle);

    if (Math.abs(relativeAngle) > FOV * 0.75) {
      return;
    }

    const screenX = Math.tan(relativeAngle) * projectionPlane + canvasWidth / 2;
    const depthIndex = Math.round(screenX);

    if (depthIndex < 0 || depthIndex >= gameState.depthBuffer.length) {
      return;
    }

    if (gameState.depthBuffer[depthIndex] < distance - 0.15) {
      return;
    }

    if (entry.kind === "acid") {
      renderProjectile(entry, screenX, distance, horizon, projectionPlane);
      return;
    }

    if (entry.type && PICKUP_DEFINITIONS[entry.type]) {
      renderPickup(entry, screenX, distance, horizon, projectionPlane);
      return;
    }

    renderEnemy(entry, screenX, distance, horizon, projectionPlane);
  });
}

function renderEnemy(enemy, screenX, distance, horizon, projectionPlane) {
  const spriteHeight = (projectionPlane / distance) * enemy.spriteScale * 1.4;
  const spriteWidth = spriteHeight * getEnemyWidthRatio(enemy.type);
  const spriteBottom = horizon + spriteHeight * 0.36 - gameState.player.z * 18;
  const alpha = clamp(1 - distance / 14, 0.18, 1);

  context.save();
  context.globalAlpha = enemy.type === "specter" ? alpha * 0.78 : alpha;
  context.translate(screenX, spriteBottom);
  context.scale(spriteWidth / 120, spriteHeight / 120);
  context.shadowBlur = 24;
  context.shadowColor = enemy.hitFlash > 0 ? "#ffffff" : ENEMY_COLORS[enemy.type];
  drawEnemySprite(enemy.type, enemy.hitFlash);

  drawEnemyHealthBar(enemy, spriteWidth);
  context.restore();
}

function getEnemyWidthRatio(enemyType) {
  if (enemyType === "crawler" || enemyType === "raptor") {
    return 0.72;
  }

  if (enemyType === "specter") {
    return 0.78;
  }

  return 0.82;
}

function drawEnemySprite(enemyType, hitFlash) {
  if (enemyType === "crawler") {
    drawCrawler(hitFlash);
    return;
  }

  if (enemyType === "brute") {
    drawBrute(hitFlash);
    return;
  }

  if (enemyType === "spitter") {
    drawSpitter(hitFlash);
    return;
  }

  if (enemyType === "robot") {
    drawRobot(hitFlash);
    return;
  }

  if (enemyType === "beast") {
    drawBeast(hitFlash);
    return;
  }

  if (enemyType === "raptor") {
    drawRaptor(hitFlash);
    return;
  }

  drawSpecter(hitFlash);
}

function drawCrawler(hitFlash) {
  context.fillStyle = hitFlash > 0 ? "#ffffff" : ENEMY_COLORS.crawler;
  context.beginPath();
  context.ellipse(0, -24, 30, 20, 0, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.moveTo(-24, -6);
  context.lineTo(-48, 30);
  context.lineTo(-34, 30);
  context.lineTo(-12, 4);
  context.lineTo(12, 4);
  context.lineTo(34, 30);
  context.lineTo(48, 30);
  context.lineTo(24, -6);
  context.closePath();
  context.fill();
}

function drawBrute(hitFlash) {
  context.fillStyle = hitFlash > 0 ? "#ffffff" : ENEMY_COLORS.brute;
  context.fillRect(-32, -72, 64, 92);
  context.beginPath();
  context.arc(0, -88, 28, 0, Math.PI * 2);
  context.fill();
  context.fillRect(-54, -48, 22, 60);
  context.fillRect(32, -48, 22, 60);
}

function drawSpitter(hitFlash) {
  context.fillStyle = hitFlash > 0 ? "#ffffff" : ENEMY_COLORS.spitter;
  context.beginPath();
  context.arc(0, -62, 24, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.moveTo(-20, -46);
  context.lineTo(-42, 22);
  context.lineTo(42, 22);
  context.lineTo(20, -46);
  context.closePath();
  context.fill();
  context.fillStyle = hitFlash > 0 ? "#e8ffff" : "#cff7ff";
  context.beginPath();
  context.arc(0, -62, 8, 0, Math.PI * 2);
  context.fill();
}

function drawRobot(hitFlash) {
  const shellColor = hitFlash > 0 ? "#ffffff" : ENEMY_COLORS.robot;

  context.fillStyle = shellColor;
  context.fillRect(-30, -88, 60, 86);
  context.fillRect(-48, -44, 18, 56);
  context.fillRect(30, -44, 18, 56);
  context.fillRect(-26, -2, 18, 34);
  context.fillRect(8, -2, 18, 34);

  context.fillStyle = "#203347";
  context.fillRect(-24, -78, 48, 38);
  context.fillRect(-16, -36, 32, 10);

  context.strokeStyle = "#dff7ff";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(-10, -88);
  context.lineTo(-14, -104);
  context.moveTo(10, -88);
  context.lineTo(14, -104);
  context.stroke();

  context.fillStyle = "#d94d5f";
  context.fillRect(-18, -70, 12, 8);
  context.fillRect(6, -70, 12, 8);
  context.fillRect(-10, -54, 20, 4);

  context.fillStyle = "#89efff";
  context.fillRect(-18, -22, 36, 8);
}

function drawBeast(hitFlash) {
  const furColor = hitFlash > 0 ? "#ffffff" : ENEMY_COLORS.beast;

  context.fillStyle = furColor;
  context.beginPath();
  context.ellipse(0, -34, 34, 24, 0, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.moveTo(-40, -12);
  context.lineTo(-18, -58);
  context.lineTo(18, -58);
  context.lineTo(40, -12);
  context.lineTo(28, 24);
  context.lineTo(-28, 24);
  context.closePath();
  context.fill();

  context.fillStyle = "#432913";
  context.beginPath();
  context.moveTo(-12, -22);
  context.lineTo(0, -4);
  context.lineTo(12, -22);
  context.lineTo(0, -34);
  context.closePath();
  context.fill();

  context.fillStyle = "#fff8d6";
  context.beginPath();
  context.arc(-12, -36, 5, 0, Math.PI * 2);
  context.arc(12, -36, 5, 0, Math.PI * 2);
  context.fill();
}

function drawRaptor(hitFlash) {
  const skinColor = hitFlash > 0 ? "#ffffff" : ENEMY_COLORS.raptor;

  context.fillStyle = skinColor;
  context.beginPath();
  context.moveTo(-18, -22);
  context.lineTo(-8, -62);
  context.lineTo(34, -82);
  context.lineTo(52, -62);
  context.lineTo(12, -48);
  context.lineTo(24, -14);
  context.lineTo(-8, 20);
  context.lineTo(-26, 18);
  context.closePath();
  context.fill();

  context.beginPath();
  context.moveTo(-22, 14);
  context.lineTo(-42, 40);
  context.lineTo(-28, 42);
  context.lineTo(-8, 24);
  context.lineTo(12, 42);
  context.lineTo(26, 40);
  context.lineTo(10, 16);
  context.closePath();
  context.fill();

  context.fillStyle = "#f7fff2";
  context.beginPath();
  context.arc(26, -64, 4, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "#f7fff2";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(36, -54);
  context.lineTo(50, -46);
  context.stroke();
}

function drawSpecter(hitFlash) {
  const spiritColor = hitFlash > 0 ? "#ffffff" : ENEMY_COLORS.specter;

  context.fillStyle = spiritColor;
  context.beginPath();
  context.moveTo(-22, -84);
  context.quadraticCurveTo(-44, -56, -38, -8);
  context.quadraticCurveTo(-34, 22, -48, 42);
  context.quadraticCurveTo(-20, 26, -6, 44);
  context.quadraticCurveTo(0, 18, 10, 42);
  context.quadraticCurveTo(24, 22, 44, 42);
  context.quadraticCurveTo(34, 4, 38, -10);
  context.quadraticCurveTo(42, -56, 22, -84);
  context.closePath();
  context.fill();

  context.fillStyle = "#0b1320";
  context.beginPath();
  context.ellipse(-10, -40, 6, 12, 0, 0, Math.PI * 2);
  context.ellipse(10, -40, 6, 12, 0, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.arc(0, -10, 10, 0, Math.PI);
  context.strokeStyle = "#0b1320";
  context.lineWidth = 4;
  context.stroke();
}

function drawEnemyHealthBar(enemy, spriteWidth) {
  const healthRatio = enemy.health / enemy.maxHealth;

  context.fillStyle = "rgba(0, 0, 0, 0.65)";
  context.fillRect(-spriteWidth * 0.46, -110, spriteWidth * 0.92, 10);
  context.fillStyle = healthRatio > 0.5 ? "#8ef6b0" : "#ff9170";
  context.fillRect(-spriteWidth * 0.46, -110, spriteWidth * 0.92 * healthRatio, 10);
}

function renderProjectile(projectile, screenX, distance, horizon, projectionPlane) {
  const size = (projectionPlane / distance) * 0.18;

  context.save();
  context.globalAlpha = clamp(1 - distance / 12, 0.22, 0.95);
  context.shadowBlur = 24;
  context.shadowColor = "#9df3e6";
  context.fillStyle = "#c8fff4";
  context.beginPath();
  context.arc(screenX, horizon - size * 0.6, size, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function renderPickup(pickup, screenX, distance, horizon, projectionPlane) {
  const definition = PICKUP_DEFINITIONS[pickup.type];
  const bobOffset = Math.sin(pickup.bob) * 8;
  const size = (projectionPlane / distance) * 0.28;

  context.save();
  context.globalAlpha = clamp(1 - distance / 13, 0.28, 0.95);
  context.shadowBlur = 24;
  context.shadowColor = definition.glow;
  context.fillStyle = definition.color;
  context.beginPath();
  context.arc(screenX, horizon + 18 - bobOffset, size, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#08111a";
  context.font = `${Math.max(10, size * 1.2)}px 'Segoe UI'`;
  context.textAlign = "center";
  context.fillText(definition.label, screenX, horizon + 22 - bobOffset);
  context.restore();
}

function renderParticles(canvasWidth, horizon) {
  const projectionPlane = canvasWidth / (2 * Math.tan(FOV / 2));

  gameState.particles.forEach((particle) => {
    const dx = particle.x - gameState.player.x;
    const dy = particle.y - gameState.player.y;
    const distance = Math.hypot(dx, dy);
    const angle = normalizeAngle(Math.atan2(dy, dx) - gameState.player.angle);

    if (Math.abs(angle) > FOV * 0.75 || distance < 0.1) {
      return;
    }

    const screenX = Math.tan(angle) * projectionPlane + canvasWidth / 2;
    const depthIndex = Math.round(screenX);

    if (depthIndex < 0 || depthIndex >= gameState.depthBuffer.length) {
      return;
    }

    if (gameState.depthBuffer[depthIndex] < distance - 0.08) {
      return;
    }

    const size = (projectionPlane / distance) * particle.size;
    const screenY = horizon - (particle.z * projectionPlane) / distance;

    context.save();
    context.globalAlpha = clamp(particle.life * 2.2, 0, 1);
    context.shadowBlur = 18;
    context.shadowColor = particle.color;
    context.fillStyle = particle.color;
    context.beginPath();
    context.arc(screenX, screenY, size, 0, Math.PI * 2);
    context.fill();
    context.restore();
  });
}

function renderTracers(canvasWidth, canvasHeight, horizon) {
  const projectionPlane = canvasWidth / (2 * Math.tan(FOV / 2));

  gameState.shotTracers.forEach((tracer) => {
    const dx = tracer.x - gameState.player.x;
    const dy = tracer.y - gameState.player.y;
    const relativeAngle = normalizeAngle(Math.atan2(dy, dx) - gameState.player.angle);

    if (Math.abs(relativeAngle) > FOV * 0.8) {
      return;
    }

    const screenX = Math.tan(relativeAngle) * projectionPlane + canvasWidth / 2;

    context.save();
    context.globalAlpha = clamp(tracer.life / 0.08, 0, 1);
    context.strokeStyle = tracer.color;
    context.lineWidth = 3;
    context.shadowBlur = 20;
    context.shadowColor = tracer.color;
    context.beginPath();
    context.moveTo(canvasWidth / 2, canvasHeight * 0.76);
    context.lineTo(screenX, horizon);
    context.stroke();
    context.restore();
  });
}

function renderWeapon(canvasWidth, canvasHeight) {
  const recoil = gameState.cameraKick * 0.5;
  const currentWeapon = getCurrentWeapon();

  context.save();
  context.translate(canvasWidth / 2, canvasHeight);

  const bodyGradient = context.createLinearGradient(-120, -170, 120, 40);
  bodyGradient.addColorStop(0, "#1f3548");
  bodyGradient.addColorStop(1, "#0a1117");
  context.fillStyle = bodyGradient;
  context.beginPath();
  context.moveTo(-90, -18);
  context.lineTo(-24, -180 + recoil);
  context.lineTo(54, -174 + recoil);
  context.lineTo(104, -16);
  context.lineTo(44, 12);
  context.lineTo(-44, 12);
  context.closePath();
  context.fill();

  context.fillStyle = currentWeapon.bodyColor;
  context.fillRect(-18, -174 + recoil, 42, 28);
  context.fillStyle = "#15202a";
  context.fillRect(-12, -144 + recoil, 24, 72);

  if (gameState.muzzleFlash > 0) {
    context.globalAlpha = gameState.muzzleFlash;
    context.shadowBlur = 38;
    context.shadowColor = gameState.muzzleFlashColor;
    context.fillStyle = gameState.muzzleFlashColor;
    context.beginPath();
    context.moveTo(10, -176 + recoil);
    context.lineTo(110, -224 + recoil);
    context.lineTo(72, -164 + recoil);
    context.lineTo(118, -126 + recoil);
    context.closePath();
    context.fill();
  }

  context.restore();
}

function renderOverlayEffects(canvasWidth, canvasHeight) {
  renderMiniMap(canvasWidth, canvasHeight);

  if (gameState.hitFlash > 0) {
    context.save();
    context.globalAlpha = gameState.hitFlash * 0.18;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();
  }

  if (gameState.phase === "intermission") {
    renderCenterBanner(`NEXT WAVE ${gameState.level + 1}`);
  }

  if (gameState.surgePending) {
    renderCenterBanner("WARNING");
  }

  if (gameState.phase === "gameover") {
    renderCenterBanner("MISSION FAILED");
  }
}

function renderMiniMap(canvasWidth, canvasHeight) {
  const mapWidth = WORLD_MAP[0].length;
  const mapHeight = WORLD_MAP.length;
  const mapScale = MINIMAP_SIZE / Math.max(mapWidth, mapHeight);
  const originX = MINIMAP_MARGIN;
  const originY = MINIMAP_MARGIN;

  context.save();
  context.globalAlpha = 0.94;
  context.fillStyle = "rgba(4, 10, 16, 0.78)";
  context.fillRect(originX - 8, originY - 8, MINIMAP_SIZE + 16, MINIMAP_SIZE + 16);
  context.strokeStyle = "rgba(90, 242, 255, 0.42)";
  context.lineWidth = 2;
  context.strokeRect(originX - 8, originY - 8, MINIMAP_SIZE + 16, MINIMAP_SIZE + 16);

  for (let y = 0; y < mapHeight; y += 1) {
    for (let x = 0; x < mapWidth; x += 1) {
      context.fillStyle =
        WORLD_MAP[y][x] === 0 ? "rgba(13, 24, 34, 0.8)" : "rgba(104, 170, 208, 0.34)";
      context.fillRect(
        originX + x * mapScale,
        originY + y * mapScale,
        mapScale - 1,
        mapScale - 1
      );
    }
  }

  renderMiniMapPlayer(originX, originY, mapScale);
  renderMiniMapPickups(originX, originY, mapScale);
  renderMiniMapEnemies(originX, originY, mapScale);

  context.fillStyle = "rgba(240, 247, 255, 0.84)";
  context.font = "600 11px 'Segoe UI'";
  context.textAlign = "left";
  context.fillText("MOTION RADAR", originX, originY + MINIMAP_SIZE + 18);
  context.restore();
}

function renderMiniMapPlayer(originX, originY, mapScale) {
  const playerMapX = originX + gameState.player.x * mapScale;
  const playerMapY = originY + gameState.player.y * mapScale;
  const facingX = Math.cos(gameState.player.angle);
  const facingY = Math.sin(gameState.player.angle);

  context.save();
  context.translate(playerMapX, playerMapY);
  context.rotate(gameState.player.angle);
  context.fillStyle = "#8dfcff";
  context.beginPath();
  context.moveTo(7, 0);
  context.lineTo(-5, -4.5);
  context.lineTo(-3, 0);
  context.lineTo(-5, 4.5);
  context.closePath();
  context.fill();
  context.restore();

  context.strokeStyle = "rgba(141, 252, 255, 0.75)";
  context.lineWidth = 1.5;
  context.beginPath();
  context.moveTo(playerMapX, playerMapY);
  context.lineTo(playerMapX + facingX * 11, playerMapY + facingY * 11);
  context.stroke();
}

function renderMiniMapEnemies(originX, originY, mapScale) {
  const pulse = 0.5 + Math.sin(gameState.lightFlicker * 6) * 0.24;

  gameState.enemies
    .filter((enemy) => !enemy.dead)
    .forEach((enemy) => {
      const distanceToPlayer = Math.hypot(
        enemy.x - gameState.player.x,
        enemy.y - gameState.player.y
      );
      const enemyMapX = originX + enemy.x * mapScale;
      const enemyMapY = originY + enemy.y * mapScale;
      const isNearby = distanceToPlayer < 2.2;
      const radius = isNearby ? 4.4 : 3.1;

      context.save();
      context.globalAlpha = isNearby ? 0.78 + pulse * 0.18 : 0.68;
      context.fillStyle = "#ff495f";
      context.shadowBlur = 18;
      context.shadowColor = "#ff5f73";
      context.beginPath();
      context.arc(enemyMapX, enemyMapY, radius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    });
}

function renderMiniMapPickups(originX, originY, mapScale) {
  gameState.pickups.forEach((pickup) => {
    const definition = PICKUP_DEFINITIONS[pickup.type];
    const pickupMapX = originX + pickup.x * mapScale;
    const pickupMapY = originY + pickup.y * mapScale;

    context.save();
    context.fillStyle = definition.color;
    context.shadowBlur = 12;
    context.shadowColor = definition.glow;
    context.fillRect(pickupMapX - 2.5, pickupMapY - 2.5, 5, 5);
    context.restore();
  });
}

function renderCenterBanner(text) {
  context.save();
  context.globalAlpha = 0.94;
  context.fillStyle = "rgba(5, 12, 18, 0.72)";
  context.fillRect(
    elements.canvas.width / 2 - 220,
    elements.canvas.height / 2 - 52,
    440,
    104
  );
  context.strokeStyle = "rgba(90, 242, 255, 0.36)";
  context.lineWidth = 2;
  context.strokeRect(
    elements.canvas.width / 2 - 220,
    elements.canvas.height / 2 - 52,
    440,
    104
  );
  context.fillStyle = "#ecfbff";
  context.font = "700 38px 'Segoe UI'";
  context.textAlign = "center";
  context.fillText(text, elements.canvas.width / 2, elements.canvas.height / 2 + 12);
  context.restore();
}

function getShakeOffset() {
  if (gameState.screenShake <= 0) {
    return { x: 0, y: 0 };
  }

  const magnitude = gameState.screenShake * 14;
  return {
    x: (Math.random() - 0.5) * magnitude,
    y: (Math.random() - 0.5) * magnitude,
  };
}

function tryMoveEntity(entity, deltaX, deltaY, radius) {
  const nextX = entity.x + deltaX;
  const nextY = entity.y + deltaY;
  let moved = false;

  if (canOccupy(nextX, entity.y, radius, entity)) {
    entity.x = nextX;
    moved = true;
  }

  if (canOccupy(entity.x, nextY, radius, entity)) {
    entity.y = nextY;
    moved = true;
  }

  return moved;
}

function canOccupy(x, y, radius, entity = null) {
  const hitsWall = [
    { x: x - radius, y: y - radius },
    { x: x + radius, y: y - radius },
    { x: x - radius, y: y + radius },
    { x: x + radius, y: y + radius },
  ].some((point) => isWallAt(point.x, point.y));

  if (hitsWall) {
    return false;
  }

  if (!entity || entity === gameState.player) {
    return true;
  }

  return !gameState.enemies.some((enemy) => {
    if (enemy.dead || enemy.id === entity.id) {
      return false;
    }

    return Math.hypot(enemy.x - x, enemy.y - y) < enemy.radius + radius + 0.06;
  });
}

function isWallAt(x, y) {
  const tile = WORLD_MAP[Math.floor(y)]?.[Math.floor(x)];
  return tile !== 0;
}

function hasLineOfSight(target) {
  const dx = target.x - gameState.player.x;
  const dy = target.y - gameState.player.y;
  const steps = Math.ceil(Math.hypot(dx, dy) * 6);

  for (let index = 1; index < steps; index += 1) {
    const factor = index / steps;

    if (isWallAt(gameState.player.x + dx * factor, gameState.player.y + dy * factor)) {
      return false;
    }
  }

  return true;
}

function updateHud() {
  elements.level.textContent = String(gameState.level);
  elements.health.textContent = String(Math.max(0, Math.round(gameState.player.health)));
  elements.kills.textContent = String(gameState.totalKills);
  elements.enemies.textContent = String(
    gameState.enemies.filter((enemy) => !enemy.dead).length
  );
  elements.best.textContent = String(gameState.bestLevel);
  const weaponLabel = getCurrentWeapon().label;
  const boostTag =
    gameState.player.damageBoostTimer > 0 && gameState.player.fireRateBoostTimer > 0
      ? "++"
      : gameState.player.damageBoostTimer > 0
        ? "+DMG"
        : gameState.player.fireRateBoostTimer > 0
          ? "+RPM"
          : "";
  elements.weapon.textContent = `${weaponLabel}${boostTag}`;
}

function updatePhaseMessage(message) {
  elements.phase.textContent = message;
}

function updateStatus(message, type) {
  elements.status.textContent = message;
  elements.status.className = "status-message";

  if (type === "danger") {
    elements.status.classList.add("is-danger");
  }

  if (type === "success") {
    elements.status.classList.add("is-success");
  }
}

function showOverlay() {
  elements.overlay.classList.remove("is-hidden");
}

function hideOverlay() {
  elements.overlay.classList.add("is-hidden");
}

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const bounds = elements.canvas.getBoundingClientRect();
  elements.canvas.width = Math.max(640, Math.floor(bounds.width * pixelRatio));
  elements.canvas.height = Math.max(360, Math.floor(bounds.height * pixelRatio));
  context.imageSmoothingEnabled = true;
}

function normalizeAngle(angle) {
  let nextAngle = angle;

  while (nextAngle <= -Math.PI) {
    nextAngle += Math.PI * 2;
  }

  while (nextAngle > Math.PI) {
    nextAngle -= Math.PI * 2;
  }

  return nextAngle;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function approach(value, target, delta) {
  if (value < target) {
    return Math.min(value + delta, target);
  }

  return Math.max(value - delta, target);
}

function updateBestLevel(level) {
  if (level <= gameState.bestLevel) {
    return;
  }

  gameState.bestLevel = level;

  try {
    window.localStorage.setItem(BEST_LEVEL_STORAGE_KEY, String(level));
  } catch (error) {
    // Ignore local storage failures in constrained environments.
  }

  updateHud();
}

function loadBestLevel() {
  try {
    const storedValue = Number(window.localStorage.getItem(BEST_LEVEL_STORAGE_KEY));

    if (Number.isFinite(storedValue) && storedValue >= 1) {
      return storedValue;
    }
  } catch (error) {
    // Ignore local storage failures in constrained environments.
  }

  return 1;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

function audioResume() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  if (!audioEngine.context) {
    audioEngine.context = new AudioContextClass();
  }

  if (audioEngine.context.state === "suspended") {
    audioEngine.context.resume().catch(() => {});
  }
}

function playShotSound(weapon) {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  if (weapon.id === "beam") {
    playSynthTone(audioContext, {
      type: "triangle",
      startFrequency: 520,
      endFrequency: 1320,
      duration: 0.16,
      gain: 0.06,
    });
    playNoiseBurst(audioContext, 0.018, 0.05);
    return;
  }

  if (weapon.id === "vulcan") {
    playSynthTone(audioContext, {
      type: "square",
      startFrequency: 180,
      endFrequency: 110,
      duration: 0.08,
      gain: 0.045,
    });
    playNoiseBurst(audioContext, 0.04, 0.035);
    return;
  }

  playSynthTone(audioContext, {
    type: "sawtooth",
    startFrequency: 240,
    endFrequency: 80,
    duration: 0.11,
    gain: 0.075,
  });
  playNoiseBurst(audioContext, 0.06, 0.06);
}

function playHitSound() {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  playSynthTone(audioContext, {
    type: "triangle",
    startFrequency: 710,
    endFrequency: 440,
    duration: 0.07,
    gain: 0.03,
  });
}

function playDamageSound() {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  playSynthTone(audioContext, {
    type: "square",
    startFrequency: 160,
    endFrequency: 70,
    duration: 0.16,
    gain: 0.05,
  });
}

function playEnemyDeathSound(type) {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  playSynthTone(audioContext, {
    type: "sawtooth",
    startFrequency: 220,
    endFrequency: type === "brute" ? 58 : 92,
    duration: 0.18,
    gain: type === "brute" ? 0.08 : 0.05,
  });
}

function playWaveClearSound() {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  playSynthTone(audioContext, {
    type: "triangle",
    startFrequency: 420,
    endFrequency: 780,
    duration: 0.18,
    gain: 0.04,
  });
  playSynthTone(audioContext, {
    type: "triangle",
    startFrequency: 540,
    endFrequency: 980,
    duration: 0.14,
    gain: 0.04,
    startOffset: 0.08,
  });
}

function playAlertSound() {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  playSynthTone(audioContext, {
    type: "square",
    startFrequency: 880,
    endFrequency: 660,
    duration: 0.12,
    gain: 0.05,
  });
  playSynthTone(audioContext, {
    type: "square",
    startFrequency: 880,
    endFrequency: 660,
    duration: 0.12,
    gain: 0.05,
    startOffset: 0.18,
  });
}

function playPickupSound() {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  playSynthTone(audioContext, {
    type: "triangle",
    startFrequency: 520,
    endFrequency: 900,
    duration: 0.12,
    gain: 0.03,
  });
}

function playJumpSound() {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  playSynthTone(audioContext, {
    type: "triangle",
    startFrequency: 200,
    endFrequency: 340,
    duration: 0.1,
    gain: 0.025,
  });
}

function playSpitSound() {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  playNoiseBurst(audioContext, 0.03, 0.04);
  playSynthTone(audioContext, {
    type: "triangle",
    startFrequency: 360,
    endFrequency: 190,
    duration: 0.12,
    gain: 0.02,
  });
}

function getAudioContext() {
  audioResume();
  return audioEngine.context;
}

function playSynthTone(audioContext, config) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const startTime = audioContext.currentTime + (config.startOffset ?? 0);
  const endTime = startTime + config.duration;

  oscillator.type = config.type;
  oscillator.frequency.setValueAtTime(config.startFrequency, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(0.001, config.endFrequency),
    endTime
  );

  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(config.gain, startTime + 0.015);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start(startTime);
  oscillator.stop(endTime);
}

function playNoiseBurst(audioContext, gainValue, duration) {
  if (!audioEngine.noiseBuffer) {
    audioEngine.noiseBuffer = createNoiseBuffer(audioContext);
  }

  const noiseSource = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gainNode = audioContext.createGain();
  const startTime = audioContext.currentTime;
  const endTime = startTime + duration;

  noiseSource.buffer = audioEngine.noiseBuffer;
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1800, startTime);
  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(gainValue, startTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);

  noiseSource.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);
  noiseSource.start(startTime);
  noiseSource.stop(endTime);
}

function createNoiseBuffer(audioContext) {
  const buffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate * 0.2,
    audioContext.sampleRate
  );
  const output = buffer.getChannelData(0);

  for (let index = 0; index < output.length; index += 1) {
    output[index] = Math.random() * 2 - 1;
  }

  return buffer;
}

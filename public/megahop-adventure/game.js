(() => {
  const GAME_WIDTH = 1280;
  const GAME_HEIGHT = 720;
  const FIXED_DT = 1 / 60;
  const ANIM_FPS = 12;
  const GROUND_CONTACT_VISUAL_OFFSET = 6;
  const GOOGLE_SHEETS_URL =
    "https://script.google.com/macros/s/AKfycbx8t7O6ki0WybvEmRQnqqKHjQ6mwE2-AL1PE_0AESdE6c1hGgql6tV91HlfeblXEfAlOA/exec";

  const PLAYER_TUNE = {
    runSpeed: 320,
    accelGround: 2600,
    accelAir: 1700,
    decelGround: 3400,
    gravity: 1880,
    jumpVel: -640,
    jumpHoldTime: 0.17,
    shortHopCut: 0.56,
    coyote: 0.1,
    jumpBuffer: 0.1,
    maxFall: 1180,
    dashSpeed: 860,
    dashDuration: 0.18,
    dashAnticipation: 0.06,
    dashIFrame: 0.15,
  };

  const PALETTE = {
    sky: "#d2c6a5",
    sky2: "#c2b48d",
    hillA: "#9f9e73",
    hillB: "#88906b",
    hillC: "#6f7d65",
    ground: "#8f7d56",
    ink: "#13100d",
    cream: "#efe1bb",
    red: "#9b3428",
    pink: "#f497b5",
    blue: "#4a6c7e",
    green: "#5d7850",
    orange: "#c57537",
    white: "#f7eed5",
  };

  const MEGAHOP_IDLE_ROOT = "./assets/Megahop Sprites/Idle";
  const MEGAHOP_RUN_ROOT = "./assets/Megahop Sprites/Run";
  const MEGAHOP_RUNSHOOT_ROOT = "./assets/Megahop Sprites/Runshoot";
  const MEGAHOP_JUMP_ROOT = "./assets/Megahop Sprites/Jump";
  const MEGAHOP_DUCK_ROOT = "./assets/Megahop Sprites/Duck";
  const MEGAHOP_HIT_ROOT = "./assets/Megahop Sprites/Hit";
  const MEGAHOP_DASH_GROUND_ROOT = "./assets/Megahop Sprites/Dash/Ground";
  const MEGAHOP_DASH_AIR_ROOT = "./assets/Megahop Sprites/Dash/Air";
  const MEGAHOP_SHOOT_STRAIGHT_ROOT = "./assets/Megahop Sprites/Shoot/Straight";
  const PLAYER_SPRITE_BASE_HEIGHT = 155;
  const CUPHEAD_SPRITE_PATHS = {
    idle: [
      `${MEGAHOP_IDLE_ROOT}/megahop_idle_01.png`,
      `${MEGAHOP_IDLE_ROOT}/megahop_idle_02.png`,
      `${MEGAHOP_IDLE_ROOT}/megahop_idle_03.png`,
      `${MEGAHOP_IDLE_ROOT}/megahop_idle_04.png`,
      `${MEGAHOP_IDLE_ROOT}/megahop_idle_05.png`,
    ],
    run: [
      `${MEGAHOP_RUN_ROOT}/megahop_run_01.png`,
      `${MEGAHOP_RUN_ROOT}/megahop_run_02.png`,
      `${MEGAHOP_RUN_ROOT}/megahop_run_03.png`,
      `${MEGAHOP_RUN_ROOT}/megahop_run_04.png`,
      `${MEGAHOP_RUN_ROOT}/megahop_run_05.png`,
      `${MEGAHOP_RUN_ROOT}/megahop_run_06.png`,
      `${MEGAHOP_RUN_ROOT}/megahop_run_07.png`,
      `${MEGAHOP_RUN_ROOT}/megahop_run_08.png`,
      `${MEGAHOP_RUN_ROOT}/megahop_run_09.png`,
      `${MEGAHOP_RUN_ROOT}/megahop_run_10.png`,
    ],
    runShoot: [
      `${MEGAHOP_RUNSHOOT_ROOT}/megahop_runshoot_01.png`,
      `${MEGAHOP_RUNSHOOT_ROOT}/megahop_runshoot_02.png`,
      `${MEGAHOP_RUNSHOOT_ROOT}/megahop_runshoot_03.png`,
      `${MEGAHOP_RUNSHOOT_ROOT}/megahop_runshoot_04.png`,
      `${MEGAHOP_RUNSHOOT_ROOT}/megahop_runshoot_05.png`,
      `${MEGAHOP_RUNSHOOT_ROOT}/megahop_runshoot_06.png`,
      `${MEGAHOP_RUNSHOOT_ROOT}/megahop_runshoot_07.png`,
      `${MEGAHOP_RUNSHOOT_ROOT}/megahop_runshoot_08.png`,
      `${MEGAHOP_RUNSHOOT_ROOT}/megahop_runshoot_09.png`,
      `${MEGAHOP_RUNSHOOT_ROOT}/megahop_runshoot_10.png`,
    ],
    jump: [
      `${MEGAHOP_JUMP_ROOT}/megahop_jump_01.png`,
      `${MEGAHOP_JUMP_ROOT}/megahop_jump_02.png`,
      `${MEGAHOP_JUMP_ROOT}/megahop_jump_03.png`,
      `${MEGAHOP_JUMP_ROOT}/megahop_jump_04.png`,
      `${MEGAHOP_JUMP_ROOT}/megahop_jump_05.png`,
      `${MEGAHOP_JUMP_ROOT}/megahop_jump_06.png`,
    ],
    duck: [
      `${MEGAHOP_DUCK_ROOT}/megahop_duck_01.png`,
      `${MEGAHOP_DUCK_ROOT}/megahop_duck_02.png`,
      `${MEGAHOP_DUCK_ROOT}/megahop_duck_03.png`,
      `${MEGAHOP_DUCK_ROOT}/megahop_duck_04.png`,
      `${MEGAHOP_DUCK_ROOT}/megahop_duck_05.png`,
      `${MEGAHOP_DUCK_ROOT}/megahop_duck_06.png`,
      `${MEGAHOP_DUCK_ROOT}/megahop_duck_07.png`,
    ],
    dash: [
      `${MEGAHOP_DASH_GROUND_ROOT}/megahop_dash_ground_01.png`,
      `${MEGAHOP_DASH_GROUND_ROOT}/megahop_dash_ground_02.png`,
      `${MEGAHOP_DASH_GROUND_ROOT}/megahop_dash_ground_03.png`,
      `${MEGAHOP_DASH_GROUND_ROOT}/megahop_dash_ground_04.png`,
    ],
    dashAir: [
      `${MEGAHOP_DASH_AIR_ROOT}/megahop_dash_air_01.png`,
      `${MEGAHOP_DASH_AIR_ROOT}/megahop_dash_air_02.png`,
      `${MEGAHOP_DASH_AIR_ROOT}/megahop_dash_air_03.png`,
    ],
    shoot: [
      `${MEGAHOP_SHOOT_STRAIGHT_ROOT}/megahop_shoot_straight_01.png`,
      `${MEGAHOP_SHOOT_STRAIGHT_ROOT}/megahop_shoot_straight_02.png`,
      `${MEGAHOP_SHOOT_STRAIGHT_ROOT}/megahop_shoot_straight_03.png`,
    ],
    hit: [
      `${MEGAHOP_HIT_ROOT}/megahop_hit_01.png`,
      `${MEGAHOP_HIT_ROOT}/megahop_hit_02.png`,
      `${MEGAHOP_HIT_ROOT}/megahop_hit_03.png`,
    ],
    death: [],
  };
  const PEASHOOTER_ROOT = "./assets/Peashooter Sprites";
  const SPIKY_BULB_ROOT = "./assets/Spiky Bulb";
  const SPARK_NEEDLE_ROOT = "./assets/Spark Needle";
  const WIDE_SPRITE_PATHS = {
    basicBullet: sequencePaths(`${PEASHOOTER_ROOT}/bullet_loop/sprite_`, 12, 19, 3),
    basicSpawn: sequencePaths(`${PEASHOOTER_ROOT}/bullet_spawn/sprite_`, 1, 4, 3),
    basicHitSpark: sequencePaths(`${PEASHOOTER_ROOT}/bullet_death/sprite_`, 29, 32, 3),
    exLoop: sequencePaths(`${PEASHOOTER_ROOT}/EX_loop/sprite_`, 51, 58, 3),
    exDeath: sequencePaths(`${PEASHOOTER_ROOT}/EX_death/sprite_`, 65, 71, 3),
    enemySpiker: sequencePaths(`${SPIKY_BULB_ROOT}/pink_spiker_`, 1, 6),
    sparkNeedleBullet: sequencePaths(`${SPARK_NEEDLE_ROOT}/Bullet/Idle/crack_bullet_a_`, 1, 12),
    sparkNeedleHit: sequencePaths(`${SPARK_NEEDLE_ROOT}/Bullet/Death/crack_bullet_death_a_`, 1, 5),
  };
  const ENEMY_SPRITE_ROOT = "./assets/sprites/enemies";
  const ACORN_SPRITE_ROOT = "./assets/Acorn";
  const BOSS_SPRITE_ROOT = "./assets/Boss Sprites/Sal Spudder";
  const ENEMY_SPRITE_BASE_HEIGHT = 114;
  const ENEMY_SPRITE_PATHS = {
    idle: sequencePaths(`${ENEMY_SPRITE_ROOT}/Idle/mushroom_idle_`, 1, 5),
    attack: sequencePaths(`${ENEMY_SPRITE_ROOT}/Attack/mushroom_attack_`, 1, 15),
    popOut: sequencePaths(`${ENEMY_SPRITE_ROOT}/Pop Out/mushroom_popout_`, 1, 10),
    death: [`${ENEMY_SPRITE_ROOT}/Death/mushroom_death_a.png`],
    poisonPurple: sequencePaths(`${ENEMY_SPRITE_ROOT}/Poison Cloud/Purple/mushroom_poison_cloud_`, 1, 12),
    acornFly: sequencePaths(`${ACORN_SPRITE_ROOT}/Fly/acorn_fly_`, 1, 11),
    acornDrop: sequencePaths(`${ACORN_SPRITE_ROOT}/Drop/acorn_drop_`, 1, 3),
    acornFall: sequencePaths(`${ACORN_SPRITE_ROOT}/Fall/acorn_drop_`, 4, 17),
  };
  const BOSS_SPRITE_PATHS = {
    introEarth: sequencePaths(`${BOSS_SPRITE_ROOT}/Intro Earth/Intro_Earth_`, 1, 19, 3),
    introIdle: sequencePaths(`${BOSS_SPRITE_ROOT}/Intro Character and Idle/Intro_Character_and_Idle_`, 1, 20, 3),
    spit: sequencePaths(`${BOSS_SPRITE_ROOT}/Spit attack/Spit_attack_`, 1, 17, 3),
    death: sequencePaths(`${BOSS_SPRITE_ROOT}/Death/Death_`, 1, 9, 3),
    projectileDirt: sequencePaths(`${BOSS_SPRITE_ROOT}/Projectiles and Others/Dirt Spit/Projectiles_and_Others_`, 1, 8, 3),
    projectileWorm: sequencePaths(`${BOSS_SPRITE_ROOT}/Projectiles and Others/Worm Spit/Projectiles_and_Others_`, 9, 13, 3),
  };
  const PIERS_STAGE_ROOT = "./assets/stages/perilous_piers";
  const BOTANIC_PANIC_ROOT = "./assets/Botanic Panic";
  const BUTTERFLY_ROOT = "./assets/Butterfly Sprites";
  const OVERWORLD_ROOT = "./assets/Overworld";
  const PIERS_STAGE_PATHS = {
    bgSky: [`${BOTANIC_PANIC_ROOT}/sky-loop-02.png`],
    bgCloudSmall: [`${BOTANIC_PANIC_ROOT}/lv_2-1_clouds_5_cream_clouds.png`],
    bgCloudBig: [`${BOTANIC_PANIC_ROOT}/lv_2-1_clouds_6_cream_clouds.png`],
    bgCloudYellow: [`${BOTANIC_PANIC_ROOT}/lv_2-1_clouds_7_yellow_cloud.png`],
    bgHills: [`${BOTANIC_PANIC_ROOT}/far_hills_loop.png`],
    bgCity: [`${BOTANIC_PANIC_ROOT}/close-hills-loop.png`],
    overworldOcean: [`${OVERWORLD_ROOT}/ocean.png`],
    overworldMainIsland: [`${OVERWORLD_ROOT}/main_island.png`],
    overworldHead: [`${OVERWORLD_ROOT}/head_megahop.png`],
    bgOcean: [],
    bgWaterBase: [],
    waterAnim: [],
    dockLoop: [`${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_loop.png`],
    dockPlatforms: [
      `${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_platform_large.png`,
      `${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_platform_medium_0001.png`,
      `${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_platform_medium_0002.png`,
      `${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_platform_small.png`,
    ],
    stoneStepFirst: [`${PIERS_STAGE_ROOT}/MG/lv3-1_mg_stone_step_first.png`],
    stoneStepRepeat: [`${PIERS_STAGE_ROOT}/MG/lv3-1_mg_stone_step_repeat.png`],
    stoneStepLast: [`${PIERS_STAGE_ROOT}/MG/lv3-1_mg_stone_step_last.png`],
    stoneWallLoop: [`${BOTANIC_PANIC_ROOT}/mg_ground_loop.png`],
    stoneWallFinalEdge: [`${PIERS_STAGE_ROOT}/MG/lv3-1_mg_stone_wall_final_edge.png`],
    boxPlatform: [`${BOTANIC_PANIC_ROOT}/lv3-1_mg_box_platform_0001.png`],
    startWagon: [`${BOTANIC_PANIC_ROOT}/lv2-1_bg_outside_circus_wagon_vampyre.png`],
    groundBushes: [
      `${BOTANIC_PANIC_ROOT}/bush_01.png`,
      `${BOTANIC_PANIC_ROOT}/bush_02.png`,
      `${BOTANIC_PANIC_ROOT}/bush_03.png`,
    ],
    groundTrees: [
      "./assets/Trees Sprites/tree_01.png",
      "./assets/Trees Sprites/tree_02.png",
      "./assets/Trees Sprites/tree_03.png",
      "./assets/Trees Sprites/tree_04.png",
    ],
    goalFlag: [
      "./assets/Flag Sprites/Row_3/sprite_080.png",
      "./assets/Flag Sprites/Row_3/sprite_081.png",
      "./assets/Flag Sprites/Row_3/sprite_082.png",
      "./assets/Flag Sprites/Row_3/sprite_083.png",
      "./assets/Flag Sprites/Row_3/sprite_084.png",
      "./assets/Flag Sprites/Row_3/sprite_085.png",
      "./assets/Flag Sprites/Row_3/sprite_086.png",
      "./assets/Flag Sprites/Row_3/sprite_087.png",
      "./assets/Flag Sprites/Row_3/sprite_088.png",
      "./assets/Flag Sprites/Row_3/sprite_089.png",
      "./assets/Flag Sprites/Row_3/sprite_090.png",
      "./assets/Flag Sprites/Row_3/sprite_091.png",
      "./assets/Flag Sprites/Row_3/sprite_092.png",
      "./assets/Flag Sprites/Row_3/sprite_093.png",
      "./assets/Flag Sprites/Row_3/sprite_094.png",
      "./assets/Flag Sprites/Row_3/sprite_095.png",
      "./assets/Flag Sprites/Row_3/sprite_096.png",
      "./assets/Flag Sprites/Row_3/sprite_097.png",
    ],
    butterflyA: [
      `${BUTTERFLY_ROOT}/Butterfly A/sprite_018.png`,
      `${BUTTERFLY_ROOT}/Butterfly A/sprite_019.png`,
      `${BUTTERFLY_ROOT}/Butterfly A/sprite_020.png`,
      `${BUTTERFLY_ROOT}/Butterfly A/sprite_021.png`,
      `${BUTTERFLY_ROOT}/Butterfly A/sprite_022.png`,
      `${BUTTERFLY_ROOT}/Butterfly A/sprite_023.png`,
    ],
    butterflyB: [
      `${BUTTERFLY_ROOT}/Butterfly B/sprite_100.png`,
      `${BUTTERFLY_ROOT}/Butterfly B/sprite_101.png`,
      `${BUTTERFLY_ROOT}/Butterfly B/sprite_102.png`,
      `${BUTTERFLY_ROOT}/Butterfly B/sprite_103.png`,
      `${BUTTERFLY_ROOT}/Butterfly B/sprite_104.png`,
      `${BUTTERFLY_ROOT}/Butterfly B/sprite_105.png`,
    ],
    butterflyC: [
      `${BUTTERFLY_ROOT}/Butterfly C/sprite_198.png`,
      `${BUTTERFLY_ROOT}/Butterfly C/sprite_199.png`,
      `${BUTTERFLY_ROOT}/Butterfly C/sprite_200.png`,
      `${BUTTERFLY_ROOT}/Butterfly C/sprite_201.png`,
      `${BUTTERFLY_ROOT}/Butterfly C/sprite_202.png`,
      `${BUTTERFLY_ROOT}/Butterfly C/sprite_203.png`,
    ],
    beamFront: [
      `${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_front_beam_0001.png`,
      `${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_front_beam_0002.png`,
      `${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_front_beam_0003.png`,
      `${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_front_beam_0004.png`,
    ],
    beamBack: [
      `${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_back_beam_0001.png`,
      `${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_back_beam_0002.png`,
      `${PIERS_STAGE_ROOT}/MG/lv3-1_mg_dock_back_beam_0003.png`,
    ],
    algae: [],
    boats: [],
    fgStilts: [],
    fgBoxes: [],
    fgBeams: [],
  };

  const canvas = document.getElementById("game-canvas");
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: false });
  ctx.imageSmoothingEnabled = false;

  const sceneCanvas = document.createElement("canvas");
  sceneCanvas.width = GAME_WIDTH;
  sceneCanvas.height = GAME_HEIGHT;
  const sceneCtx = sceneCanvas.getContext("2d", { alpha: false });
  sceneCtx.imageSmoothingEnabled = false;

  const hudHp = document.getElementById("hud-hp");
  const hudEnergy = document.getElementById("hud-energy");
  const hudTimer = document.getElementById("hud-timer");
  const hudParry = document.getElementById("hud-parry");
  const hudDamage = document.getElementById("hud-damage");
  const hudGrade = document.getElementById("hud-grade");
  const hudHearts = Array.from(document.querySelectorAll(".hud-heart"));
  const hudMeterFill = document.querySelector(".hud-meter-fill");
  const mobileControls = document.getElementById("mobile-controls");
  const overlay = document.getElementById("overlay");
  const stageDecor = document.querySelector(".stage-decor");
  const decorButterflies = Array.from(document.querySelectorAll("[data-butterfly-set]"));

  const walletStatus = document.getElementById("wallet-status");
  const web3Status = document.getElementById("web3-status");
  const scoreBoard = document.getElementById("score-board");

  const skinSelect = document.getElementById("skin-select");
  const weaponSelect = document.getElementById("weapon-select");
  const fxSelect = document.getElementById("fx-select");
  const touchButtons = Array.from(document.querySelectorAll("[data-touch-control]"));

  const decorButterflyFrames = {
    a: [
      "./assets/Butterfly Sprites/Butterfly A/sprite_018.png",
      "./assets/Butterfly Sprites/Butterfly A/sprite_019.png",
      "./assets/Butterfly Sprites/Butterfly A/sprite_020.png",
      "./assets/Butterfly Sprites/Butterfly A/sprite_021.png",
      "./assets/Butterfly Sprites/Butterfly A/sprite_022.png",
      "./assets/Butterfly Sprites/Butterfly A/sprite_023.png",
    ],
    b: [
      "./assets/Butterfly Sprites/Butterfly B/sprite_100.png",
      "./assets/Butterfly Sprites/Butterfly B/sprite_101.png",
      "./assets/Butterfly Sprites/Butterfly B/sprite_102.png",
      "./assets/Butterfly Sprites/Butterfly B/sprite_103.png",
      "./assets/Butterfly Sprites/Butterfly B/sprite_104.png",
      "./assets/Butterfly Sprites/Butterfly B/sprite_105.png",
    ],
    c: [
      "./assets/Butterfly Sprites/Butterfly C/sprite_198.png",
      "./assets/Butterfly Sprites/Butterfly C/sprite_199.png",
      "./assets/Butterfly Sprites/Butterfly C/sprite_200.png",
      "./assets/Butterfly Sprites/Butterfly C/sprite_201.png",
      "./assets/Butterfly Sprites/Butterfly C/sprite_202.png",
      "./assets/Butterfly Sprites/Butterfly C/sprite_203.png",
    ],
  };

  initStageDecorButterflies();

  function initStageDecorButterflies() {
    for (const [index, butterfly] of decorButterflies.entries()) {
      const key = butterfly.getAttribute("data-butterfly-set");
      const frames = decorButterflyFrames[key] || decorButterflyFrames.a;
      let frameIndex = 0;
      butterfly.src = frames[0];
      window.setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length;
        butterfly.src = frames[frameIndex];
      }, 1000 / (8 + (index % 3)));
    }
  }

  function syncStageDecorVisibility() {
    if (!stageDecor) {
      return;
    }
    stageDecor.classList.toggle("is-hidden", game.scene !== "overworld");
  }

  const keyState = {
    left: false,
    right: false,
    down: false,
    jumpHeld: false,
    jumpPressed: false,
    jumpReleased: false,
    dashPressed: false,
    shootHeld: false,
    chargeHeld: false,
    chargePressed: false,
    chargeReleased: false,
    exPressed: false,
    enterPressed: false,
    retryPressed: false,
  };

  const levelState = {
    platforms: [],
    obstacles: [],
    enemies: [],
    airEnemies: [],
    boss: null,
    playerProjectiles: [],
    enemyProjectiles: [],
    pinkParries: [],
    muzzleFlashes: [],
    dustPuffs: [],
    hitSparks: [],
    butterflies: [],
    groundBushes: [],
    groundTrees: [],
    worldWidth: 3600,
    worldHeight: GAME_HEIGHT,
    goalX: 3300,
    waterHazard: false,
    waterKillY: 684,
  };

  const game = {
    scene: "overworld",
    stageTheme: "perilous-piers",
    previousScene: "runngun",
    simTime: 0,
    freezeTimer: 0,
    slowMoTimer: 0,
    animFrame: 0,
    filmFlicker: 0,
    camera: {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      shakeTime: 0,
      shakeDuration: 0,
      shakeMag: 0,
      shakeX: 0,
      shakeY: 0,
      jitterX: 0,
      jitterY: 0,
    },
    player: createPlayer(),
    stats: {
      timer: 0,
      parries: 0,
      damageTaken: 0,
      kills: 0,
      grade: "-",
      score: 0,
    },
    overworld: {
      nodes: [
        { id: "runngun", x: 470, y: 490, label: "Run & Gun" },
        { id: "boss", x: 735, y: 450, label: "Boss Arena" },
      ],
      selected: 0,
      markerX: 470,
      markerY: 490,
    },
    victory: {
      sceneType: "runngun",
      message: "",
      timer: 0,
    },
    death: {
      timer: 0,
    },
    hitStopCooldown: 0,
    cosmetics: {
      skin: "classic",
      weapon: "pea",
      fx: "dust",
    },
    social: {
      twitterUsername: "",
      leaderboard: [],
    },
    progress: {
      runGunCleared: false,
    },
    filmDust: createDustOverlay(70),
    rng: mulberry32(1930),
  };

  const grainCanvas = createGrainCanvas(196, 196);
  const GAME_FONT_FAMILY = "'CupheadHenriette', serif";
  const OVERWORLD_FONT_FAMILY = GAME_FONT_FAMILY;

  const audio = createAudioEngine();
  const playerSpriteBank = createPlayerSpriteBank();
  const projectileSpriteBank = createProjectileSpriteBank();
  const enemySpriteBank = createEnemySpriteBank();
  const bossSpriteBank = createBossSpriteBank();
  const stageSpriteBank = createStageSpriteBank();
  preloadPlayerSprites();
  preloadProjectileSprites();
  preloadEnemySprites();
  preloadBossSprites();
  preloadStageSprites();
  preloadOverworldFont();

  function preloadOverworldFont() {
    if (typeof window.FontFace !== "function" || !document.fonts) {
      return;
    }
    const font = new FontFace("CupheadHenriette", "url('./assets/Font/CupheadHenriette-A-merged.ttf')");
    font
      .load()
      .then((loadedFace) => {
        document.fonts.add(loadedFace);
      })
      .catch(() => {});
  }

  function createPlayer() {
    return {
      x: 140,
      y: 540,
      w: 54,
      h: 88,
      colliderW: 46,
      colliderH: 82,
      vx: 0,
      vy: 0,
      onGround: false,
      coyoteTimer: 0,
      jumpBufferTimer: 0,
      jumpHoldTimer: 0,
      dashAvailable: true,
      dashTimer: 0,
      dashAnticipation: 0,
      dashDir: 1,
      dashStartedOnGround: false,
      invulnTimer: 0,
      facing: 1,
      pendingFacing: 1,
      turnTimer: 0,
      duckBlend: 0,
      landingSquash: 0,
      recoilTimer: 0,
      hitFlashTimer: 0,
      chargeTimer: 0,
      shootCooldown: 0,
      hp: 3,
      maxHp: 3,
      energy: 0,
      maxEnergy: 5,
      wasGrounded: false,
      lastLandingSpeed: 0,
      maxCharge: 1.3,
    };
  }

  function createEnemy(x, y) {
    return {
      x,
      y,
      w: 74,
      h: 82,
      vx: 0,
      hp: 5,
      maxHp: 5,
      dir: Math.random() > 0.5 ? 1 : -1,
      homeX: x,
      state: "idle",
      stateTimer: 0.6 + Math.random() * 0.8,
      attackCooldown: 1 + Math.random() * 1,
      hitFlash: 0,
      shotCount: 0,
      dead: false,
      squash: 0,
      anticipation: 0,
      rubberPhase: Math.random() * Math.PI * 2,
    };
  }

  function createAcornEnemy(x, y) {
    return {
      x,
      y,
      baseY: y,
      w: 66,
      h: 66,
      vx: 0,
      vy: 0,
      state: "fly",
      stateTimer: 0,
      phase: Math.random() * Math.PI * 2,
      dir: Math.random() > 0.5 ? 1 : -1,
    };
  }

  function createBoss() {
    return {
      x: 1840,
      y: 620,
      w: 220,
      h: 220,
      hp: 180,
      maxHp: 180,
      state: "intro-earth",
      stateTimer: 1.15,
      stateDuration: 1.15,
      patternIndex: 0,
      hitFlash: 0,
      rubberPhase: 0,
      invulnTimer: 0,
      attackFired: false,
      facing: 1,
    };
  }

  function createDustOverlay(count) {
    const dust = [];
    for (let i = 0; i < count; i += 1) {
      dust.push({
        x: Math.random() * GAME_WIDTH,
        y: Math.random() * GAME_HEIGHT,
        r: 1 + Math.random() * 2,
        vx: 8 + Math.random() * 10,
        alpha: 0.12 + Math.random() * 0.22,
      });
    }
    return dust;
  }

  function createButterfly(worldX, worldY, setName, seedOffset = 0) {
    const dir = Math.random() > 0.5 ? 1 : -1;
    return {
      x: worldX,
      y: worldY,
      baseX: worldX,
      baseY: worldY,
      setName,
      dir,
      speed: 10 + Math.random() * 18,
      drift: 26 + Math.random() * 44,
      bobAmp: 8 + Math.random() * 12,
      bobSpeed: 1.2 + Math.random() * 1.3,
      flapOffset: Math.random() * 10 + seedOffset,
      turnTimer: 2.6 + Math.random() * 4.8,
      scale: 0.36 + Math.random() * 0.16,
    };
  }

  function populateAmbientButterflies() {
    levelState.butterflies = [];
    const sets = ["butterflyA", "butterflyB", "butterflyC"];
    const soloCount = 5;
    for (let i = 0; i < soloCount; i += 1) {
      const worldX = 220 + i * 760 + Math.random() * 160;
      const worldY = 180 + Math.random() * 230;
      const setName = sets[i % sets.length];
      levelState.butterflies.push(createButterfly(worldX, worldY, setName, i * 1.7));
    }

    const pairAnchors = [1380, 3180, 4720];
    for (let i = 0; i < pairAnchors.length; i += 1) {
      const setName = sets[(i + 1) % sets.length];
      const baseX = pairAnchors[i] + Math.random() * 80;
      const baseY = 210 + Math.random() * 190;
      levelState.butterflies.push(createButterfly(baseX, baseY, setName, 20 + i * 2.1));
      levelState.butterflies.push(createButterfly(baseX + 42 + Math.random() * 18, baseY + 10 + Math.random() * 16, setName, 30 + i * 2.6));
    }
  }

  function populateGroundBushes() {
    levelState.groundBushes = [];
    const bushCount = PIERS_STAGE_PATHS.groundBushes.length;
    if (!bushCount) {
      return;
    }

    let x = 210;
    let index = 0;
    while (x < levelState.worldWidth - 160) {
      const isCluster = index % 4 === 1 || index % 5 === 3;
      const baseY = 626 + (index % 3) * 2;
      const baseScale = 0.62 + (index % 3) * 0.08;
      levelState.groundBushes.push({
        x,
        y: baseY,
        frameIndex: index % bushCount,
        scale: baseScale,
        alpha: 0.92,
        swayAmp: 1.2 + (index % 3) * 0.35,
        swaySpeed: 0.9 + (index % 4) * 0.14,
        swayPhase: index * 0.8,
      });
      if (isCluster) {
        levelState.groundBushes.push({
          x: x + 54,
          y: baseY + 2,
          frameIndex: (index + 1) % bushCount,
          scale: baseScale * 0.88,
          alpha: 0.9,
          swayAmp: 1 + (index % 2) * 0.28,
          swaySpeed: 1.02 + (index % 3) * 0.12,
          swayPhase: index * 0.9 + 0.7,
        });
        if (index % 5 === 3) {
          levelState.groundBushes.push({
            x: x + 106,
            y: baseY + 3,
            frameIndex: (index + 2) % bushCount,
            scale: baseScale * 0.74,
            alpha: 0.86,
            swayAmp: 0.85 + (index % 2) * 0.2,
            swaySpeed: 1.1 + (index % 2) * 0.1,
            swayPhase: index * 1.1 + 1.3,
          });
        }
      }
      x += isCluster ? 390 + (index % 3) * 42 : 330 + (index % 4) * 52;
      index += 1;
    }
  }

  function populateGroundTrees() {
    levelState.groundTrees = [];
    const treeCount = PIERS_STAGE_PATHS.groundTrees.length;
    if (!treeCount || !levelState.groundBushes.length) {
      return;
    }

    let lastTreeX = -9999;
    for (let i = 0; i < levelState.groundBushes.length; i += 1) {
      const bush = levelState.groundBushes[i];
      if (i % 3 !== 0 && i % 5 !== 2) {
        continue;
      }
      const dir = i % 2 === 0 ? -1 : 1;
      const treeX = bush.x + dir * (112 + (i % 3) * 20);
      if (treeX - lastTreeX < 250) {
        continue;
      }
      levelState.groundTrees.push({
        x: treeX,
        y: 642 + (i % 2) * 2,
        frameIndex: i % treeCount,
        scale: 0.5 + (i % 2) * 0.03,
        alpha: 0.94,
        swayAmp: 1.4 + (i % 2) * 0.3,
        swaySpeed: 0.42 + (i % 3) * 0.08,
        swayPhase: i * 0.75,
      });
      lastTreeX = treeX;
    }
  }

  function createObstacleRectFromSpec(spec) {
    return {
      ...spec,
      x: spec.worldX + (spec.colliderOffsetX || 0) * spec.scale,
      y: spec.groundY - (spec.colliderHeight || spec.assetHeight) * spec.scale,
      w: (spec.colliderWidth || spec.assetWidth) * spec.scale,
      h: (spec.colliderHeight || spec.assetHeight) * spec.scale,
    };
  }

  function getBoxObstacleSpecs() {
    const assetWidth = 222;
    const assetHeight = 197;
    const scale = 0.56;
    const groundY = 634;
    const boxStride = 144;
    return [
      {
        kind: "box",
        worldX: 1140,
        groundY,
        scale,
        assetWidth,
        assetHeight,
      },
      {
        kind: "box",
        worldX: 2020,
        groundY,
        scale,
        assetWidth,
        assetHeight,
      },
      {
        kind: "box",
        worldX: 2020 + boxStride,
        groundY,
        scale,
        assetWidth,
        assetHeight,
      },
      {
        kind: "box",
        worldX: 4480,
        groundY,
        scale,
        assetWidth,
        assetHeight,
      },
    ];
  }

  function createGrainCanvas(w, h) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const g = c.getContext("2d");
    const image = g.createImageData(w, h);
    for (let i = 0; i < image.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      image.data[i] = v;
      image.data[i + 1] = v;
      image.data[i + 2] = v;
      image.data[i + 3] = 30 + Math.floor(Math.random() * 60);
    }
    g.putImageData(image, 0, 0);
    return c;
  }

  function sequencePaths(prefix, start, end, padDigits = 4, step = 1) {
    const out = [];
    for (let i = start; i <= end; i += step) {
      out.push(`${prefix}${String(i).padStart(padDigits, "0")}.png`);
    }
    return out;
  }

  function createPlayerSpriteBank() {
    return {
      ready: false,
      loaded: 0,
      failed: 0,
      total: 0,
      sets: {
        idle: [],
        run: [],
        runShoot: [],
        jump: [],
        duck: [],
        dash: [],
        shoot: [],
        hit: [],
        death: [],
      },
    };
  }

  function preloadPlayerSprites() {
    const entries = Object.entries(CUPHEAD_SPRITE_PATHS);
    playerSpriteBank.total = entries.reduce((sum, [, paths]) => sum + paths.length, 0);
    if (!playerSpriteBank.total) {
      return;
    }

    for (const [state, paths] of entries) {
      const frameList = [];
      playerSpriteBank.sets[state] = frameList;
      for (const src of paths) {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        img.addEventListener("load", () => {
          playerSpriteBank.loaded += 1;
          if (!playerSpriteBank.ready && playerSpriteBank.loaded >= Math.min(6, playerSpriteBank.total)) {
            playerSpriteBank.ready = true;
          }
        });
        img.addEventListener("error", () => {
          playerSpriteBank.failed += 1;
        });
        frameList.push(img);
      }
    }
  }

  function createProjectileSpriteBank() {
    return {
      ready: false,
      loaded: 0,
      failed: 0,
      total: 0,
      sets: {
        basicBullet: [],
        basicSpawn: [],
        basicHitSpark: [],
        exLoop: [],
        exDeath: [],
        enemySpiker: [],
        sparkNeedleBullet: [],
        sparkNeedleHit: [],
      },
    };
  }

  function preloadProjectileSprites() {
    const entries = Object.entries(WIDE_SPRITE_PATHS);
    projectileSpriteBank.total = entries.reduce((sum, [, paths]) => sum + paths.length, 0);
    if (!projectileSpriteBank.total) {
      return;
    }

    for (const [state, paths] of entries) {
      const frameList = [];
      projectileSpriteBank.sets[state] = frameList;
      for (const src of paths) {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        img.addEventListener("load", () => {
          projectileSpriteBank.loaded += 1;
          if (!projectileSpriteBank.ready && projectileSpriteBank.loaded >= Math.min(2, projectileSpriteBank.total)) {
            projectileSpriteBank.ready = true;
          }
        });
        img.addEventListener("error", () => {
          projectileSpriteBank.failed += 1;
        });
        frameList.push(img);
      }
    }
  }

  function createEnemySpriteBank() {
    return {
      ready: false,
      loaded: 0,
      failed: 0,
      total: 0,
      sets: {
        idle: [],
        attack: [],
        popOut: [],
        death: [],
        poisonPurple: [],
        acornFly: [],
        acornDrop: [],
        acornFall: [],
      },
      loadedSets: {
        idle: [],
        attack: [],
        popOut: [],
        death: [],
        poisonPurple: [],
        acornFly: [],
        acornDrop: [],
        acornFall: [],
      },
    };
  }

  function preloadEnemySprites() {
    const entries = Object.entries(ENEMY_SPRITE_PATHS);
    enemySpriteBank.total = entries.reduce((sum, [, paths]) => sum + paths.length, 0);
    if (!enemySpriteBank.total) {
      return;
    }

    for (const [state, paths] of entries) {
      const frameList = [];
      const loadedFrameList = [];
      enemySpriteBank.sets[state] = frameList;
      enemySpriteBank.loadedSets[state] = loadedFrameList;
      for (const src of paths) {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        img.addEventListener("load", () => {
          enemySpriteBank.loaded += 1;
          loadedFrameList.push(img);
          if (!enemySpriteBank.ready && enemySpriteBank.loaded >= Math.min(4, enemySpriteBank.total)) {
            enemySpriteBank.ready = true;
          }
        });
        img.addEventListener("error", () => {
          enemySpriteBank.failed += 1;
        });
        frameList.push(img);
      }
    }
  }

  function createBossSpriteBank() {
    return {
      ready: false,
      loaded: 0,
      failed: 0,
      total: 0,
      sets: {
        introEarth: [],
        introIdle: [],
        spit: [],
        death: [],
        projectileDirt: [],
        projectileWorm: [],
      },
      loadedSets: {
        introEarth: [],
        introIdle: [],
        spit: [],
        death: [],
        projectileDirt: [],
        projectileWorm: [],
      },
    };
  }

  function preloadBossSprites() {
    const entries = Object.entries(BOSS_SPRITE_PATHS);
    bossSpriteBank.total = entries.reduce((sum, [, paths]) => sum + paths.length, 0);
    if (!bossSpriteBank.total) {
      return;
    }

    for (const [state, paths] of entries) {
      const frameList = [];
      const loadedFrameList = [];
      bossSpriteBank.sets[state] = frameList;
      bossSpriteBank.loadedSets[state] = loadedFrameList;
      for (const src of paths) {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        img.addEventListener("load", () => {
          bossSpriteBank.loaded += 1;
          loadedFrameList.push(img);
          if (!bossSpriteBank.ready && bossSpriteBank.loaded >= Math.min(3, bossSpriteBank.total)) {
            bossSpriteBank.ready = true;
          }
        });
        img.addEventListener("error", () => {
          bossSpriteBank.failed += 1;
        });
        frameList.push(img);
      }
    }
  }

  function getLoadedBossFrames(setName) {
    return bossSpriteBank.loadedSets[setName] || [];
  }

  function createStageSpriteBank() {
    return {
      ready: false,
      loaded: 0,
      failed: 0,
      total: 0,
      sets: {
        bgSky: [],
        bgCloudSmall: [],
        bgCloudBig: [],
        bgCloudYellow: [],
        bgHills: [],
        bgCity: [],
        overworldOcean: [],
        overworldMainIsland: [],
        overworldHead: [],
        bgOcean: [],
        bgWaterBase: [],
        waterAnim: [],
        dockLoop: [],
        dockPlatforms: [],
        stoneStepFirst: [],
        stoneStepRepeat: [],
        stoneStepLast: [],
        stoneWallLoop: [],
        stoneWallFinalEdge: [],
        boxPlatform: [],
        startWagon: [],
        groundBushes: [],
        groundTrees: [],
        goalFlag: [],
        butterflyA: [],
        butterflyB: [],
        butterflyC: [],
        beamFront: [],
        beamBack: [],
        algae: [],
        boats: [],
        fgStilts: [],
        fgBoxes: [],
        fgBeams: [],
      },
      loadedSets: {
        bgSky: [],
        bgCloudSmall: [],
        bgCloudBig: [],
        bgCloudYellow: [],
        bgHills: [],
        bgCity: [],
        overworldOcean: [],
        overworldMainIsland: [],
        overworldHead: [],
        bgOcean: [],
        bgWaterBase: [],
        waterAnim: [],
        dockLoop: [],
        dockPlatforms: [],
        stoneStepFirst: [],
        stoneStepRepeat: [],
        stoneStepLast: [],
        stoneWallLoop: [],
        stoneWallFinalEdge: [],
        boxPlatform: [],
        startWagon: [],
        groundBushes: [],
        groundTrees: [],
        goalFlag: [],
        butterflyA: [],
        butterflyB: [],
        butterflyC: [],
        beamFront: [],
        beamBack: [],
        algae: [],
        boats: [],
        fgStilts: [],
        fgBoxes: [],
        fgBeams: [],
      },
    };
  }

  function preloadStageSprites() {
    const entries = Object.entries(PIERS_STAGE_PATHS);
    stageSpriteBank.total = entries.reduce((sum, [, paths]) => sum + paths.length, 0);
    if (!stageSpriteBank.total) {
      return;
    }

    for (const [key, paths] of entries) {
      const frameList = [];
      const loadedFrameList = [];
      stageSpriteBank.sets[key] = frameList;
      stageSpriteBank.loadedSets[key] = loadedFrameList;
      for (const src of paths) {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        img.addEventListener("load", () => {
          stageSpriteBank.loaded += 1;
          loadedFrameList.push(img);
          if (!stageSpriteBank.ready && stageSpriteBank.loaded >= Math.min(14, stageSpriteBank.total)) {
            stageSpriteBank.ready = true;
          }
        });
        img.addEventListener("error", () => {
          stageSpriteBank.failed += 1;
        });
        frameList.push(img);
      }
    }
  }

  function mulberry32(seed) {
    let t = seed >>> 0;
    return () => {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function moveToward(current, target, maxDelta) {
    if (current < target) {
      return Math.min(current + maxDelta, target);
    }
    return Math.max(current - maxDelta, target);
  }

  function wrapIndex(index, length) {
    if (!length) {
      return 0;
    }
    return ((index % length) + length) % length;
  }

  function rectOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function isGroundPlatform(platform) {
    return Boolean(platform && platform.style !== "ramp-step");
  }

  function findAdjacentGroundPlatform(index, direction) {
    for (let i = index + direction; i >= 0 && i < levelState.platforms.length; i += direction) {
      const candidate = levelState.platforms[i];
      if (isGroundPlatform(candidate)) {
        return candidate;
      }
    }
    return null;
  }

  function getPlatformGapFlags(index) {
    const platform = levelState.platforms[index];
    if (!isGroundPlatform(platform)) {
      return { hasGapBefore: false, hasGapAfter: false };
    }
    const prevPlatform = findAdjacentGroundPlatform(index, -1);
    const nextPlatform = findAdjacentGroundPlatform(index, 1);
    return {
      hasGapBefore: Boolean(prevPlatform && platform.x > prevPlatform.x + prevPlatform.w + 6),
      hasGapAfter: Boolean(nextPlatform && nextPlatform.x > platform.x + platform.w + 6),
    };
  }

  function getPlatformCollisionRect(platform, index) {
    if (!platform.oneWay || !isGroundPlatform(platform)) {
      return platform;
    }
    const { hasGapBefore, hasGapAfter } = getPlatformGapFlags(index);
    const trim = 26;
    const leftTrim = hasGapBefore ? trim : 0;
    const rightTrim = hasGapAfter ? trim : 0;
    return {
      x: platform.x + leftTrim,
      y: platform.y,
      w: Math.max(8, platform.w - leftTrim - rightTrim),
      h: platform.h,
    };
  }

  function getPlatformSupportY(index) {
    const platform = levelState.platforms[index];
    if (!platform) {
      return GAME_HEIGHT - 100;
    }
    const centerX = platform.x + platform.w * 0.5;
    let supportY = GAME_HEIGHT - 100;
    for (let i = 0; i < levelState.platforms.length; i += 1) {
      if (i === index) {
        continue;
      }
      const candidate = levelState.platforms[i];
      if (candidate.y <= platform.y) {
        continue;
      }
      if (centerX < candidate.x - 4 || centerX > candidate.x + candidate.w + 4) {
        continue;
      }
      supportY = Math.min(supportY, candidate.y);
    }
    return supportY;
  }

  function circleVsRect(circle, rect) {
    const cx = clamp(circle.x, rect.x, rect.x + rect.w);
    const cy = clamp(circle.y, rect.y, rect.y + rect.h);
    const dx = circle.x - cx;
    const dy = circle.y - cy;
    return dx * dx + dy * dy <= circle.r * circle.r;
  }

  function getPlayerRect(player, x = player.x, y = player.y) {
    const colliderW = player.colliderW || player.w;
    const colliderH = player.colliderH || player.h;
    return {
      x: x - colliderW * 0.5,
      y: y - colliderH,
      w: colliderW,
      h: colliderH,
    };
  }

  function formatTimer(seconds) {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    const ms = Math.floor((seconds % 1) * 100)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}.${ms}`;
  }

  function computeGrade() {
    const stats = game.stats;
    const timeScore = clamp(52 - stats.timer * 0.75, 0, 52);
    const parryScore = clamp(stats.parries * 5.5, 0, 22);
    const damagePenalty = stats.damageTaken * 16;
    const killBonus = clamp(stats.kills * 1.8, 0, 18);
    const raw = clamp(Math.round(timeScore + parryScore + killBonus - damagePenalty + 20), 0, 110);
    stats.score = raw;
    if (raw >= 98 && stats.damageTaken === 0) {
      return "A+";
    }
    if (raw >= 82) {
      return "A";
    }
    if (raw >= 62) {
      return "B";
    }
    return "C";
  }

  function resetRunStats() {
    game.stats.timer = 0;
    game.stats.parries = 0;
    game.stats.damageTaken = 0;
    game.stats.kills = 0;
    game.stats.grade = "-";
    game.stats.score = 0;
  }

  function loadOverworld() {
    game.scene = "overworld";
    game.camera.x = 0;
    game.camera.y = 0;
    game.camera.targetX = 0;
    game.camera.targetY = 0;
    game.overworld.selected = 0;
    game.overworld.markerX = game.overworld.nodes[0].x;
    game.overworld.markerY = game.overworld.nodes[0].y;
    game.freezeTimer = 0;
    game.slowMoTimer = 0;
  }

  function buildRunGunLevel() {
    levelState.worldWidth = 5600;
    levelState.worldHeight = GAME_HEIGHT;
    levelState.goalX = 5320;
    levelState.platforms = [
      { x: 0, y: 620, w: 5600, h: 24, oneWay: true },
    ];

    levelState.enemies = [
      createEnemy(620, 620),
      createEnemy(760, 620),
      createEnemy(1740, 620),
      createEnemy(2350, 620),
      createEnemy(3670, 620),
      createEnemy(4210, 620),
      createEnemy(4720, 620),
      createEnemy(5160, 620),
    ];
    levelState.airEnemies = [
      createAcornEnemy(1680, 352),
      createAcornEnemy(3240, 330),
      createAcornEnemy(4540, 334),
    ];

    levelState.waterHazard = false;
    levelState.waterKillY = 682;
    levelState.boss = null;
    levelState.obstacles = getBoxObstacleSpecs().map(createObstacleRectFromSpec);
    levelState.playerProjectiles = [];
    levelState.enemyProjectiles = [];
    levelState.muzzleFlashes = [];
    levelState.dustPuffs = [];
    levelState.hitSparks = [];
    levelState.pinkParries = [];
    populateGroundBushes();
    populateGroundTrees();
    populateAmbientButterflies();
  }

  function buildBossLevel() {
    levelState.worldWidth = 2500;
    levelState.worldHeight = GAME_HEIGHT;
    levelState.goalX = 2300;
    levelState.platforms = [
      // Keep boss arena floor consistent with Run & Gun lane.
      { x: 0, y: 620, w: levelState.worldWidth, h: 24, oneWay: true },
    ];

    levelState.enemies = [];
    levelState.airEnemies = [];
    levelState.boss = createBoss();
    levelState.obstacles = [];
    levelState.playerProjectiles = [];
    levelState.enemyProjectiles = [];
    levelState.pinkParries = [];
    levelState.muzzleFlashes = [];
    levelState.dustPuffs = [];
    levelState.hitSparks = [];
    populateGroundBushes();
    populateGroundTrees();
    populateAmbientButterflies();
    levelState.waterHazard = false;
    levelState.waterKillY = 9999;
  }

  function placeFreshPlayer(x) {
    game.player = createPlayer();
    game.player.x = x;
    game.player.y = 610;
    game.player.onGround = true;
  }

  function loadRunGun() {
    game.scene = "runngun";
    game.previousScene = "runngun";
    resetRunStats();
    placeFreshPlayer(140);
    buildRunGunLevel();
    game.camera.x = 0;
    game.camera.y = 0;
    game.camera.targetX = 0;
    game.camera.targetY = 0;
    game.freezeTimer = 0;
    game.slowMoTimer = 0;
  }

  function canEnterBossArena() {
    return Boolean(game.progress.runGunCleared);
  }

  function saveProgress() {
    try {
      localStorage.setItem("inkdash_progress", JSON.stringify(game.progress));
    } catch (_error) {}
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem("inkdash_progress");
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && typeof parsed.runGunCleared === "boolean") {
        game.progress.runGunCleared = parsed.runGunCleared;
      }
    } catch (_error) {
      game.progress.runGunCleared = false;
    }
  }

  function loadBossArena() {
    if (!canEnterBossArena()) {
      setWeb3Status("Boss Arena is locked. Clear Run & Gun first.");
      return false;
    }
    game.scene = "boss";
    game.previousScene = "boss";
    resetRunStats();
    placeFreshPlayer(180);
    buildBossLevel();
    game.camera.x = 0;
    game.camera.y = 0;
    game.camera.targetX = 0;
    game.camera.targetY = 0;
    game.freezeTimer = 0;
    game.slowMoTimer = 0;
    return true;
  }

  function enterDeathScene() {
    game.scene = "death";
    game.death.timer = 0;
    game.freezeTimer = 0;
    game.slowMoTimer = 0;
  }

  async function enterVictory(sceneType) {
    game.scene = "victory";
    game.victory.sceneType = sceneType;
    game.victory.timer = 0;
    game.stats.grade = computeGrade();
    game.stats.score = computeRunPoints();
    if (sceneType === "runngun") {
      game.progress.runGunCleared = true;
      saveProgress();
      setWeb3Status("Run & Gun cleared. Boss Arena unlocked.");
    }
    const baseMessage = sceneType === "boss" ? "BOSS DEFEATED" : "RUN & GUN CLEAR";
    game.victory.message = `${baseMessage} | Grade ${game.stats.grade} | ${game.stats.score} pts`;
    if (sceneType === "boss") {
      const entry = await pushBossLeaderboardEntry();
      if (entry) {
        game.victory.message = `${baseMessage} | Grade ${game.stats.grade} | ${entry.points} pts`;
      }
    }
  }

  function addCameraShake(duration, magnitude) {
    game.camera.shakeTime = Math.max(game.camera.shakeTime, duration);
    game.camera.shakeDuration = Math.max(game.camera.shakeDuration, duration);
    game.camera.shakeMag = Math.max(game.camera.shakeMag, magnitude);
  }

  function triggerHitStop(seconds, minInterval = 0.05) {
    if (game.hitStopCooldown > 0 || seconds <= 0) {
      return;
    }
    setFreeze(seconds);
    game.hitStopCooldown = Math.max(game.hitStopCooldown, minInterval);
  }

  function setFreeze(seconds) {
    game.freezeTimer = Math.max(game.freezeTimer, seconds);
  }

  function sceneWorldRect() {
    return {
      x: 0,
      y: 0,
      w: levelState.worldWidth,
      h: levelState.worldHeight,
    };
  }

  function handleKeyDown(e) {
    if (e.repeat) {
      if (e.code === "KeyJ") {
        keyState.shootHeld = true;
      }
      if (e.code === "KeyL") {
        keyState.chargeHeld = true;
      }
      return;
    }

    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        keyState.left = true;
        break;
      case "ArrowRight":
      case "KeyD":
        keyState.right = true;
        break;
      case "ArrowDown":
      case "KeyS":
        keyState.down = true;
        break;
      case "Space":
      case "KeyK":
        keyState.jumpHeld = true;
        keyState.jumpPressed = true;
        break;
      case "ShiftLeft":
      case "ShiftRight":
        keyState.dashPressed = true;
        break;
      case "KeyJ":
      case "KeyF":
        keyState.shootHeld = true;
        break;
      case "KeyL":
        keyState.chargeHeld = true;
        keyState.chargePressed = true;
        break;
      case "KeyE":
      case "KeyC":
        keyState.exPressed = true;
        break;
      case "Enter":
        keyState.enterPressed = true;
        break;
      case "KeyR":
        keyState.retryPressed = true;
        break;
      default:
        break;
    }
  }

  function handleKeyUp(e) {
    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        keyState.left = false;
        break;
      case "ArrowRight":
      case "KeyD":
        keyState.right = false;
        break;
      case "ArrowDown":
      case "KeyS":
        keyState.down = false;
        break;
      case "Space":
      case "KeyK":
        keyState.jumpHeld = false;
        keyState.jumpReleased = true;
        break;
      case "KeyJ":
      case "KeyF":
        keyState.shootHeld = false;
        break;
      case "KeyL":
        keyState.chargeHeld = false;
        keyState.chargeReleased = true;
        break;
      default:
        break;
    }
  }

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  canvas.addEventListener("pointerdown", () => {
    keyState.shootHeld = true;
    audio.ensureStarted();
  });
  window.addEventListener("pointerup", () => {
    keyState.shootHeld = false;
  });

  function setTouchControl(control, active) {
    switch (control) {
      case "left":
        keyState.left = active;
        if (active) {
          keyState.right = false;
        }
        break;
      case "right":
        keyState.right = active;
        if (active) {
          keyState.left = false;
        }
        break;
      case "duck":
        keyState.down = active;
        break;
      case "shoot":
        keyState.shootHeld = active;
        break;
      case "charge":
        keyState.chargeHeld = active;
        if (active) {
          keyState.chargePressed = true;
        } else {
          keyState.chargeReleased = true;
        }
        break;
      case "jump":
        keyState.jumpHeld = active;
        if (active) {
          keyState.jumpPressed = true;
        } else {
          keyState.jumpReleased = true;
        }
        break;
      case "dash":
        if (active) {
          keyState.dashPressed = true;
        }
        break;
      case "ex":
        if (active) {
          keyState.exPressed = true;
        }
        break;
      default:
        break;
    }
  }

  function bindTouchControls() {
    if (!mobileControls || !touchButtons.length) {
      return;
    }
    const releaseControls = () => {
      keyState.left = false;
      keyState.right = false;
      keyState.down = false;
      keyState.shootHeld = false;
      if (keyState.jumpHeld) {
        keyState.jumpHeld = false;
        keyState.jumpReleased = true;
      }
      if (keyState.chargeHeld) {
        keyState.chargeHeld = false;
        keyState.chargeReleased = true;
      }
      touchButtons.forEach((btn) => btn.classList.remove("is-active"));
    };

    const bindButton = (button) => {
      const control = button.dataset.touchControl;
      const press = (e) => {
        e.preventDefault();
        audio.ensureStarted();
        button.classList.add("is-active");
        setTouchControl(control, true);
      };
      const release = (e) => {
        e.preventDefault();
        button.classList.remove("is-active");
        setTouchControl(control, false);
      };
      button.addEventListener("pointerdown", press);
      button.addEventListener("pointerup", release);
      button.addEventListener("pointercancel", release);
      button.addEventListener("pointerleave", release);
    };

    touchButtons.forEach(bindButton);
    window.addEventListener("blur", releaseControls);
  }

  function consumeTransientInput() {
    keyState.jumpPressed = false;
    keyState.jumpReleased = false;
    keyState.dashPressed = false;
    keyState.chargePressed = false;
    keyState.chargeReleased = false;
    keyState.exPressed = false;
    keyState.enterPressed = false;
    keyState.retryPressed = false;
  }

  function createAudioEngine() {
    const state = {
      ctx: null,
      master: null,
      started: false,
      nextBeatTime: 0,
      beatIndex: 0,
      raf: 0,
      noise: null,
    };

    function ensureStarted() {
      if (state.started) {
        return;
      }
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) {
        return;
      }
      state.ctx = new AC();
      state.master = state.ctx.createGain();
      state.master.gain.value = 0.18;
      state.master.connect(state.ctx.destination);
      state.noise = createNoiseBuffer(state.ctx);
      state.started = true;
      state.nextBeatTime = state.ctx.currentTime + 0.05;
      loopJazz();
    }

    function createNoiseBuffer(audioCtx) {
      const len = audioCtx.sampleRate * 0.2;
      const buffer = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i += 1) {
        data[i] = Math.random() * 2 - 1;
      }
      return buffer;
    }

    function tone(freq, time, dur, type = "triangle", gain = 0.12) {
      if (!state.started) {
        return;
      }
      const osc = state.ctx.createOscillator();
      const g = state.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);
      g.gain.setValueAtTime(0.0001, time);
      g.gain.exponentialRampToValueAtTime(gain, time + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      osc.connect(g);
      g.connect(state.master);
      osc.start(time);
      osc.stop(time + dur + 0.02);
    }

    function snare(time, gain = 0.13) {
      if (!state.started || !state.noise) {
        return;
      }
      const src = state.ctx.createBufferSource();
      src.buffer = state.noise;
      const bp = state.ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.setValueAtTime(1800, time);
      const g = state.ctx.createGain();
      g.gain.setValueAtTime(gain, time);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);
      src.connect(bp);
      bp.connect(g);
      g.connect(state.master);
      src.start(time);
      src.stop(time + 0.1);
    }

    function loopJazz() {
      if (!state.started) {
        return;
      }
      const now = state.ctx.currentTime;
      while (state.nextBeatTime < now + 0.4) {
        const swing = state.beatIndex % 2 === 0 ? 0.24 : 0.16;
        const chord = [196, 247, 294, 370];
        const note = chord[state.beatIndex % chord.length];
        tone(note, state.nextBeatTime, 0.11, "sawtooth", 0.04);
        tone(note * 2, state.nextBeatTime + 0.01, 0.09, "square", 0.03);
        if (state.beatIndex % 2 === 0) {
          snare(state.nextBeatTime + 0.03, 0.07);
        }
        state.nextBeatTime += swing;
        state.beatIndex += 1;
      }
      state.raf = requestAnimationFrame(loopJazz);
    }

    function blip(freq, dur, gain = 0.07, type = "triangle") {
      if (!state.started) {
        return;
      }
      tone(freq, state.ctx.currentTime, dur, type, gain);
    }

    return {
      ensureStarted,
      playJump() {
        blip(360, 0.08, 0.08, "square");
      },
      playDashPrep() {
        blip(210, 0.06, 0.05, "triangle");
      },
      playDash() {
        blip(460, 0.08, 0.07, "square");
      },
      playShoot() {
        blip(600, 0.05, 0.055, "square");
      },
      playCharged() {
        blip(290, 0.15, 0.09, "sawtooth");
      },
      playEX() {
        blip(220, 0.2, 0.11, "sawtooth");
      },
      playParry() {
        blip(540, 0.12, 0.09, "triangle");
      },
      playHit() {
        blip(160, 0.1, 0.08, "square");
      },
      playEnemyHit() {
        blip(420, 0.06, 0.045, "triangle");
      },
      playSlam() {
        snare(state.ctx ? state.ctx.currentTime : 0, 0.15);
      },
    };
  }

  function initWeb3Events() {
    if (skinSelect) {
      skinSelect.addEventListener("change", () => {
        game.cosmetics.skin = skinSelect.value;
      });
      game.cosmetics.skin = skinSelect.value;
    }

    if (weaponSelect) {
      weaponSelect.addEventListener("change", () => {
        game.cosmetics.weapon = weaponSelect.value;
      });
      game.cosmetics.weapon = weaponSelect.value;
    }

    if (fxSelect) {
      fxSelect.addEventListener("change", () => {
        game.cosmetics.fx = fxSelect.value;
      });
      game.cosmetics.fx = fxSelect.value;
    }

    loadProgress();
    loadLeaderboard();
    refreshWalletUI();
  }

  function refreshWalletUI() {
    if (!walletStatus) {
      return;
    }
    if (game.social.twitterUsername) {
      walletStatus.textContent = `Twitter: @${game.social.twitterUsername}`;
    } else {
      walletStatus.textContent = "Twitter: not set";
    }
  }

  function setWeb3Status(message) {
    if (web3Status) {
      web3Status.textContent = `Status: ${message}`;
    }
  }

  function showTwitterPromptModal(defaultValue, errorMessage = "") {
    if (!overlay) {
      return Promise.resolve(window.prompt("Boss clear! Enter your Twitter username (@ allowed).", defaultValue));
    }

    return new Promise((resolve) => {
      overlay.classList.add("active");
      overlay.innerHTML = `
        <div class="twitter-modal-backdrop"></div>
        <div class="twitter-modal" role="dialog" aria-modal="true" aria-labelledby="twitter-modal-title">
          <h2 id="twitter-modal-title">Boss Cleared</h2>
          <p class="twitter-modal-subtitle">Enter your Twitter username to save your score.</p>
          <label for="twitter-username-input">Twitter username</label>
          <input id="twitter-username-input" type="text" maxlength="16" autocomplete="off" spellcheck="false" value="${escapeHtml(
            defaultValue || ""
          )}" placeholder="@username" />
          <p class="twitter-modal-error ${errorMessage ? "is-visible" : ""}">${escapeHtml(errorMessage || " ")}</p>
          <div class="twitter-modal-actions">
            <button class="twitter-btn twitter-btn-secondary" type="button" data-action="cancel">Cancel</button>
            <button class="twitter-btn twitter-btn-primary" type="button" data-action="save">Save Score</button>
          </div>
        </div>
      `;

      const input = overlay.querySelector("#twitter-username-input");
      const btnCancel = overlay.querySelector('[data-action="cancel"]');
      const btnSave = overlay.querySelector('[data-action="save"]');

      function close(value) {
        overlay.classList.remove("active");
        overlay.innerHTML = "";
        resolve(value);
      }

      if (btnCancel) {
        btnCancel.addEventListener("click", () => close(null));
      }

      if (btnSave && input) {
        btnSave.addEventListener("click", () => close(input.value || ""));
      }

      if (input) {
        input.focus();
        input.select();
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            close(input.value || "");
          } else if (event.key === "Escape") {
            event.preventDefault();
            close(null);
          }
        });
      }
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function loadLeaderboard() {
    try {
      const raw = localStorage.getItem("inkdash_twitter_board");
      game.social.leaderboard = raw ? JSON.parse(raw) : [];
    } catch (_error) {
      game.social.leaderboard = [];
    }
    renderLeaderboard();
  }

  function saveLeaderboard() {
    localStorage.setItem("inkdash_twitter_board", JSON.stringify(game.social.leaderboard));
    renderLeaderboard();
  }

  async function postGameScoreToSheets(entry) {
    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          source: "game",
          twitterHandle: entry.username,
          points: entry.points,
          grade: entry.grade,
          timer: entry.timer,
          parry: entry.parry,
          damage: entry.damage,
          playedAt: entry.at,
        }),
      });
      return true;
    } catch (error) {
      console.error("Failed to sync game score to Google Sheets:", error);
      return false;
    }
  }

  function sanitizeTwitterHandle(rawHandle) {
    if (typeof rawHandle !== "string") {
      return "";
    }
    const compact = rawHandle.trim().replace(/^@+/, "");
    if (!compact) {
      return "";
    }
    const matched = compact.match(/^[A-Za-z0-9_]{1,15}$/);
    return matched ? matched[0] : "";
  }

  async function askTwitterHandle() {
    let defaultValue = "";
    let errorMessage = "";

    while (true) {
      const input = await showTwitterPromptModal(defaultValue, errorMessage);
      if (input === null) {
        setWeb3Status("Score not saved: Twitter username was canceled.");
        return "";
      }
      const username = sanitizeTwitterHandle(input);
      if (username) {
        return username;
      }
      setWeb3Status("Invalid Twitter username.");
      errorMessage = "Use 1-15 characters: letters, numbers, underscore.";
      defaultValue = input;
    }
  }

  function computeRunPoints() {
    const raw =
      gradeScore(game.stats.grade) * 10 +
      game.stats.parries * 25 +
      game.stats.kills * 4 -
      game.stats.timer * 4 -
      game.stats.damageTaken * 120;
    return Math.max(0, Math.round(raw));
  }

  async function pushBossLeaderboardEntry() {
    const username = await askTwitterHandle();
    if (!username) {
      return null;
    }

    game.social.twitterUsername = username;
    refreshWalletUI();

    const normalized = username.toLowerCase();
    const entry = {
      username,
      usernameKey: normalized,
      points: game.stats.score,
      grade: game.stats.grade,
      timer: Number(game.stats.timer.toFixed(2)),
      parry: game.stats.parries,
      damage: game.stats.damageTaken,
      at: Date.now(),
    };

    const list = game.social.leaderboard.filter((item) => {
      const key = typeof item.usernameKey === "string" ? item.usernameKey : sanitizeTwitterHandle(item.username).toLowerCase();
      return key !== normalized;
    });
    list.push(entry);
    list.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      if (a.timer !== b.timer) {
        return a.timer - b.timer;
      }
      if (a.damage !== b.damage) {
        return a.damage - b.damage;
      }
      return a.at - b.at;
    });

    game.social.leaderboard = list.slice(0, 10);
    saveLeaderboard();
    const syncedToSheets = await postGameScoreToSheets(entry);
    setWeb3Status(
      syncedToSheets
        ? `Score saved: @${username} - ${entry.points} pts`
        : `Score saved locally: @${username} - ${entry.points} pts`
    );

    // Reset the per-run identity so next boss clear starts a fresh input session.
    game.social.twitterUsername = "";
    refreshWalletUI();
    return entry;
  }

  function gradeScore(grade) {
    if (grade === "A+") {
      return 120;
    }
    if (grade === "A") {
      return 96;
    }
    if (grade === "B") {
      return 72;
    }
    return 50;
  }

  function renderLeaderboard() {
    if (!scoreBoard) {
      return;
    }
    scoreBoard.innerHTML = "";
    if (!game.social.leaderboard.length) {
      const li = document.createElement("li");
      li.textContent = "No boss scores yet.";
      scoreBoard.appendChild(li);
      return;
    }

    for (const item of game.social.leaderboard) {
      const li = document.createElement("li");
      const topline = document.createElement("div");
      topline.className = "score-topline";

      const name = document.createElement("span");
      name.className = "score-name";
      name.textContent = `@${item.username}`;

      const points = document.createElement("span");
      points.className = "score-points";
      points.textContent = `${item.points} pts`;

      const meta = document.createElement("div");
      meta.className = "score-meta";
      meta.textContent = `${item.grade} · ${formatTimer(item.timer)}`;

      topline.append(name, points);
      li.append(topline, meta);
      scoreBoard.appendChild(li);
    }
  }

  function updateOverworld(dt) {
    const nodeCount = game.overworld.nodes.length;
    if (keyState.left) {
      game.overworld.selected = clamp(game.overworld.selected - 1, 0, nodeCount - 1);
      keyState.left = false;
    }
    if (keyState.right) {
      game.overworld.selected = clamp(game.overworld.selected + 1, 0, nodeCount - 1);
      keyState.right = false;
    }

    const selectedNode = game.overworld.nodes[game.overworld.selected];
    game.overworld.markerX = lerp(game.overworld.markerX, selectedNode.x, clamp(dt * 8, 0, 1));
    game.overworld.markerY = lerp(game.overworld.markerY, selectedNode.y, clamp(dt * 8, 0, 1));

    if (keyState.enterPressed || keyState.jumpPressed) {
      audio.ensureStarted();
      if (selectedNode.id === "runngun") {
        loadRunGun();
      } else {
        const entered = loadBossArena();
        if (!entered) {
          addCameraShake(0.18, 3.2);
        }
      }
    }
  }

  function attemptParry() {
    const player = game.player;
    const rect = getPlayerRect(player);

    for (let i = levelState.pinkParries.length - 1; i >= 0; i -= 1) {
      const parry = levelState.pinkParries[i];
      const hit = circleVsRect({ x: parry.x, y: parry.y, r: parry.r + 8 }, rect);
      if (hit) {
        levelState.pinkParries.splice(i, 1);
        onParrySuccess();
        return true;
      }
    }

    for (let i = levelState.enemyProjectiles.length - 1; i >= 0; i -= 1) {
      const proj = levelState.enemyProjectiles[i];
      if (!proj.parryable) {
        continue;
      }
      const hit = circleVsRect({ x: proj.x, y: proj.y, r: proj.r + 6 }, rect);
      if (hit) {
        levelState.enemyProjectiles.splice(i, 1);
        onParrySuccess();
        return true;
      }
    }

    return false;
  }

  function onParrySuccess() {
    const player = game.player;
    player.vy = PLAYER_TUNE.jumpVel * 0.95;
    player.onGround = false;
    player.energy = clamp(player.energy + 1, 0, player.maxEnergy);
    game.stats.parries += 1;
    game.slowMoTimer = Math.max(game.slowMoTimer, 0.1);
    addCameraShake(0.08, 3.4);
    audio.playParry();
  }

  function updatePlayer(dt) {
    const player = game.player;
    const colliderW = player.colliderW || player.w;
    const colliderH = player.colliderH || player.h;
    player.wasGrounded = player.onGround;
    player.invulnTimer = Math.max(0, player.invulnTimer - dt);
    player.recoilTimer = Math.max(0, player.recoilTimer - dt);
    player.hitFlashTimer = Math.max(0, player.hitFlashTimer - dt);
    player.landingSquash = Math.max(0, player.landingSquash - dt * 5.2);

    const moveInput = (keyState.left ? -1 : 0) + (keyState.right ? 1 : 0);

    if (player.onGround) {
      player.coyoteTimer = PLAYER_TUNE.coyote;
      player.dashAvailable = true;
    } else {
      player.coyoteTimer = Math.max(0, player.coyoteTimer - dt);
    }

    if (keyState.jumpPressed) {
      player.jumpBufferTimer = PLAYER_TUNE.jumpBuffer;
      if (!player.onGround) {
        attemptParry();
      }
    } else {
      player.jumpBufferTimer = Math.max(0, player.jumpBufferTimer - dt);
    }

    if (
      moveInput !== 0 &&
      moveInput !== player.facing &&
      player.onGround &&
      player.turnTimer <= 0 &&
      Math.abs(player.vx) > 80
    ) {
      player.turnTimer = 0.09;
      player.pendingFacing = moveInput;
    }

    if (player.turnTimer > 0) {
      player.turnTimer -= dt;
      if (player.turnTimer <= 0) {
        player.facing = player.pendingFacing;
      }
    }

    if (keyState.dashPressed && player.dashAvailable && player.dashTimer <= 0 && player.dashAnticipation <= 0) {
      player.dashAvailable = false;
      player.dashAnticipation = PLAYER_TUNE.dashAnticipation;
      player.dashDir = moveInput !== 0 ? moveInput : player.facing;
      player.dashStartedOnGround = player.onGround;
      player.invulnTimer = Math.max(player.invulnTimer, PLAYER_TUNE.dashIFrame);
      audio.playDashPrep();
    }

    if (player.dashAnticipation > 0) {
      player.dashAnticipation -= dt;
      player.vx *= 0.8;
      player.vy = Math.min(player.vy, 0);
      if (player.dashAnticipation <= 0) {
        player.dashTimer = PLAYER_TUNE.dashDuration;
        player.vx = player.dashDir * PLAYER_TUNE.dashSpeed;
        player.vy = 0;
        audio.playDash();
      }
    }

    if (player.dashTimer > 0) {
      player.dashTimer -= dt;
      player.vx = player.dashDir * PLAYER_TUNE.dashSpeed;
      player.vy = 0;
    } else {
      const accel = player.onGround ? PLAYER_TUNE.accelGround : PLAYER_TUNE.accelAir;
      if (moveInput !== 0) {
        player.vx = moveToward(player.vx, moveInput * PLAYER_TUNE.runSpeed, accel * dt);
        if (player.turnTimer <= 0) {
          player.facing = moveInput;
        }
      } else {
        player.vx = moveToward(player.vx, 0, PLAYER_TUNE.decelGround * dt);
      }

      if (player.jumpBufferTimer > 0 && player.coyoteTimer > 0) {
        player.vy = PLAYER_TUNE.jumpVel;
        player.jumpBufferTimer = 0;
        player.coyoteTimer = 0;
        player.onGround = false;
        player.jumpHoldTimer = 0;
        audio.playJump();
      }

      if (keyState.jumpHeld && player.vy < 0) {
        player.jumpHoldTimer += dt;
        if (player.jumpHoldTimer <= PLAYER_TUNE.jumpHoldTime) {
          player.vy += -PLAYER_TUNE.gravity * 0.42 * dt;
        }
      }

      if (keyState.jumpReleased && player.vy < 0) {
        player.vy *= PLAYER_TUNE.shortHopCut;
      }

      player.vy += PLAYER_TUNE.gravity * dt;
      player.vy = Math.min(player.vy, PLAYER_TUNE.maxFall);
    }

    player.duckBlend = moveToward(
      player.duckBlend,
      keyState.down && player.onGround && Math.abs(player.vx) < 140 ? 1 : 0,
      dt * 9
    );

    const oldX = player.x;
    const oldY = player.y;

    player.x += player.vx * dt;
    for (const platform of levelState.platforms) {
      if (platform.oneWay) {
        continue;
      }
      const horizontalRect = getPlayerRect(player);
      if (!rectOverlap(horizontalRect, platform)) {
        continue;
      }
      if (player.vx > 0) {
        player.x = platform.x - colliderW * 0.5;
      } else if (player.vx < 0) {
        player.x = platform.x + platform.w + colliderW * 0.5;
      }
      player.vx = 0;
    }
    for (const obstacle of levelState.obstacles) {
      const horizontalRect = getPlayerRect(player);
      if (!rectOverlap(horizontalRect, obstacle)) {
        continue;
      }
      if (player.vx > 0) {
        player.x = obstacle.x - colliderW * 0.5;
      } else if (player.vx < 0) {
        player.x = obstacle.x + obstacle.w + colliderW * 0.5;
      }
      player.vx = 0;
    }

    player.y += player.vy * dt;
    player.onGround = false;
    let landingSpeed = 0;

    for (let i = 0; i < levelState.platforms.length; i += 1) {
      const platform = levelState.platforms[i];
      const collisionPlatform = getPlatformCollisionRect(platform, i);
      const verticalRect = getPlayerRect(player);
      if (!rectOverlap(verticalRect, collisionPlatform)) {
        continue;
      }

      const prevBottom = oldY;
      const prevTop = oldY - colliderH;
      if (platform.oneWay) {
        if (player.vy >= 0 && prevBottom <= collisionPlatform.y + 4) {
          landingSpeed = Math.max(landingSpeed, player.vy);
          player.y = collisionPlatform.y;
          player.vy = 0;
          player.onGround = true;
        }
        continue;
      }
      if (player.vy >= 0 && prevBottom <= platform.y + 2) {
        landingSpeed = Math.max(landingSpeed, player.vy);
        player.y = platform.y;
        player.vy = 0;
        player.onGround = true;
      } else if (player.vy < 0 && prevTop >= platform.y + platform.h - 2) {
        player.y = platform.y + platform.h + colliderH;
        player.vy = 0;
      }
    }
    for (const obstacle of levelState.obstacles) {
      const verticalRect = getPlayerRect(player);
      if (!rectOverlap(verticalRect, obstacle)) {
        continue;
      }
      const prevBottom = oldY;
      const prevTop = oldY - colliderH;
      if (player.vy >= 0 && prevBottom <= obstacle.y + 2) {
        landingSpeed = Math.max(landingSpeed, player.vy);
        player.y = obstacle.y;
        player.vy = 0;
        player.onGround = true;
      } else if (player.vy < 0 && prevTop >= obstacle.y + obstacle.h - 2) {
        player.y = obstacle.y + obstacle.h + colliderH;
        player.vy = 0;
      }
    }

    const worldRect = sceneWorldRect();
    player.x = clamp(player.x, colliderW * 0.5, worldRect.w - colliderW * 0.5);

    if (!player.wasGrounded && player.onGround) {
      player.lastLandingSpeed = landingSpeed;
      const hardImpact = landingSpeed > 720;
      player.landingSquash = hardImpact ? 0.24 : 0.12;
      if (hardImpact) {
        addCameraShake(0.12, 4.8);
      }
    }

    if (levelState.waterHazard && player.y >= levelState.waterKillY) {
      player.hp = 0;
      player.vx = 0;
      player.vy = 0;
      addCameraShake(0.1, 3.5);
      enterDeathScene();
      return;
    }

    if (player.y > worldRect.h + 250) {
      damagePlayer(3, player.x - 20);
      return;
    }

    updatePlayerWeapons(dt);

    if (Math.abs(player.x - oldX) > 0.02 && player.onGround && Math.abs(player.vx) > 120) {
      emitDustPuff(player.x - player.facing * 8, player.y - 4, 0.12);
    }
  }

  function updatePlayerWeapons(dt) {
    const player = game.player;

    player.shootCooldown = Math.max(0, player.shootCooldown - dt);
    if (keyState.shootHeld && player.shootCooldown <= 0 && player.dashTimer <= 0 && player.dashAnticipation <= 0) {
      firePlayerShot("basic");
      player.shootCooldown = 0.105;
      player.recoilTimer = 0.08;
      audio.playShoot();
    }

    if (keyState.chargeHeld) {
      player.chargeTimer = clamp(player.chargeTimer + dt, 0, player.maxCharge);
    }

    if (keyState.chargeReleased) {
      if (player.chargeTimer >= 0.55) {
        firePlayerShot("charged");
        player.recoilTimer = 0.12;
        audio.playCharged();
      }
      player.chargeTimer = 0;
    }

    if (keyState.exPressed && player.energy >= 1) {
      player.energy -= 1;
      firePlayerShot("ex");
      player.recoilTimer = 0.16;
      addCameraShake(0.08, 2.8);
      audio.playEX();
    }
  }

  function firePlayerShot(kind) {
    const player = game.player;
    const dir = player.facing;
    const weapon = game.cosmetics.weapon;
    const isDucking = keyState.down && player.onGround && Math.abs(player.vx) < 130;

    // Lift shot origin to align better with Megahop's hand position.
    const baseX = player.x + dir * 36;
    const baseY = player.y - (isDucking ? 46 : 70);

    const spawn = (vx, vy, damage, radius, life, color, parryable = false, kindId = kind) => {
      levelState.playerProjectiles.push({
        x: baseX,
        y: baseY,
        vx,
        vy,
        r: radius,
        life,
        age: 0,
        damage,
        kind: kindId,
        color,
        seed: Math.floor(Math.random() * 1000),
        parryable,
      });
    };

    if (kind === "basic") {
      if (weapon === "spread") {
        spawn(dir * 560, -50, 1, 8, 0.95, PALETTE.white, false, "spread");
        spawn(dir * 520, 0, 1, 8, 0.95, PALETTE.white, false, "spread");
        spawn(dir * 560, 50, 1, 8, 0.95, PALETTE.white, false, "spread");
      } else if (weapon === "spark") {
        spawn(dir * 680, 0, 1, 7, 1.05, "#f0dd96", false, "spark");
      } else {
        spawn(dir * 620, 0, 1, 7, 1.05, PALETTE.white);
      }
    }

    if (kind === "charged") {
      spawn(dir * 510, 0, 5, 18, 1.6, "#f6d58b", false, "charged");
      playerEnergyGain(0.35);
    }

    if (kind === "ex") {
      spawn(dir * 760, 0, 8, 22, 1.2, "#a6f4f4", false, "ex");
      spawn(dir * 630, -120, 3, 11, 1.2, "#d8f5f5", false, "ex-child");
      spawn(dir * 630, 120, 3, 11, 1.2, "#d8f5f5", false, "ex-child");
    }

    levelState.muzzleFlashes.push({
      x: baseX,
      y: baseY,
      life: 0.07,
      maxLife: 0.07,
      r: 28,
      dir,
      frameSet: weapon === "spark" ? null : "basicSpawn",
      scale: weapon === "spark" ? 1 : 0.82,
    });
  }

  function playerEnergyGain(amount) {
    const player = game.player;
    player.energy = clamp(player.energy + amount, 0, player.maxEnergy);
  }

  function emitDustPuff(x, y, life = 0.2) {
    levelState.dustPuffs.push({
      x,
      y,
      vx: -30 + Math.random() * 60,
      vy: -40 + Math.random() * 20,
      life,
      maxLife: life,
      r: 8 + Math.random() * 8,
    });
  }

  function emitBasicHitSpark(x, y, dir = 1, intensity = 1, frameSet = "basicHitSpark") {
    levelState.hitSparks.push({
      x,
      y,
      dir: dir >= 0 ? 1 : -1,
      age: 0,
      life: 0.3,
      maxLife: 0.3,
      scale: 0.62 + intensity * 0.1,
      vx: dir * (18 + Math.random() * 16),
      vy: -10 + Math.random() * 20,
      frameSet,
    });
  }

  function getImpactPointOnRect(proj, rect) {
    return {
      x: clamp(proj.x + Math.sign(proj.vx || 1) * Math.min(proj.r * 0.7, 10), rect.x + rect.w * 0.2, rect.x + rect.w * 0.8),
      y: clamp(proj.y, rect.y + rect.h * 0.28, rect.y + rect.h * 0.72),
    };
  }

  function damagePlayer(amount, sourceX) {
    const player = game.player;
    if (player.invulnTimer > 0) {
      return;
    }

    player.hp -= amount;
    player.invulnTimer = 1;
    player.hitFlashTimer = 0.18;
    player.vx = sourceX < player.x ? 260 : -260;
    player.vy = -360;
    game.stats.damageTaken += amount;
    setFreeze(0.05);
    addCameraShake(0.09, 3.2);
    audio.playHit();

    if (player.hp <= 0) {
      player.hp = 0;
      enterDeathScene();
    }
  }

  function updateEnemies(dt) {
    for (let i = levelState.enemies.length - 1; i >= 0; i -= 1) {
      const enemy = levelState.enemies[i];
      enemy.hitFlash = Math.max(0, enemy.hitFlash - dt);
      enemy.rubberPhase += dt * 4;

      if (enemy.dead) {
        enemy.squash += dt * 2;
        if (enemy.squash > 1) {
          levelState.enemies.splice(i, 1);
        }
        continue;
      }

      enemy.attackCooldown -= dt;

      if (enemy.state === "idle") {
        const patrolTarget = enemy.homeX + Math.sin(game.simTime + enemy.rubberPhase) * 70;
        const dir = patrolTarget > enemy.x ? 1 : -1;
        enemy.vx = moveToward(enemy.vx, dir * 80, dt * 220);
        enemy.x += enemy.vx * dt;

        if (enemy.attackCooldown <= 0) {
          enemy.state = "anticipation";
          enemy.stateTimer = 0.42;
          enemy.anticipation = 1;
        }
      } else if (enemy.state === "anticipation") {
        enemy.stateTimer -= dt;
        enemy.anticipation = clamp(enemy.stateTimer / 0.42, 0, 1);
        if (enemy.stateTimer <= 0) {
          enemy.state = "attack";
          enemy.stateTimer = 0.2;
          enemy.shotCount += 1;
          const pink = enemy.shotCount % 3 === 0;
          const toPlayerX = game.player.x - enemy.x;
          const toPlayerY = game.player.y - 60 - enemy.y;
          const len = Math.hypot(toPlayerX, toPlayerY) || 1;
          const speed = pink ? 260 : 360;
          levelState.enemyProjectiles.push({
            x: enemy.x,
            y: enemy.y - 42,
            vx: (toPlayerX / len) * speed,
            vy: (toPlayerY / len) * speed,
            r: pink ? 15 : 12,
            life: 2.2,
            age: 0,
            damage: 1,
            parryable: pink,
            pink,
            kind: "blob",
          });
        }
      } else if (enemy.state === "attack") {
        enemy.stateTimer -= dt;
        if (enemy.stateTimer <= 0) {
          enemy.state = "recover";
          enemy.stateTimer = 0.35;
        }
      } else if (enemy.state === "recover") {
        enemy.stateTimer -= dt;
        if (enemy.stateTimer <= 0) {
          enemy.state = "idle";
          enemy.attackCooldown = 1.2 + Math.random() * 0.8;
        }
      }

      // Enemy should always face the player; this sprite set's native forward is mirrored.
      enemy.dir = game.player.x >= enemy.x ? -1 : 1;

      // Prevent ground enemies from clipping through solid step obstacles.
      const enemyRect = {
        x: enemy.x - enemy.w * 0.5,
        y: enemy.y - enemy.h,
        w: enemy.w,
        h: enemy.h,
      };
      for (const platform of levelState.platforms) {
        if (platform.oneWay) {
          continue;
        }
        if (!rectOverlap(enemyRect, platform)) {
          continue;
        }
        const platformCenter = platform.x + platform.w * 0.5;
        if (enemy.x <= platformCenter) {
          enemy.x = platform.x - enemy.w * 0.5 - 1;
        } else {
          enemy.x = platform.x + platform.w + enemy.w * 0.5 + 1;
        }
        enemy.vx = 0;
        enemyRect.x = enemy.x - enemy.w * 0.5;
      }
      for (const obstacle of levelState.obstacles) {
        if (!rectOverlap(enemyRect, obstacle)) {
          continue;
        }
        const obstacleCenter = obstacle.x + obstacle.w * 0.5;
        if (enemy.x <= obstacleCenter) {
          enemy.x = obstacle.x - enemy.w * 0.5 - 1;
        } else {
          enemy.x = obstacle.x + obstacle.w + enemy.w * 0.5 + 1;
        }
        enemy.vx = 0;
        enemyRect.x = enemy.x - enemy.w * 0.5;
      }

      const playerRect = getPlayerRect(game.player);
      if (rectOverlap(enemyRect, playerRect)) {
        damagePlayer(1, enemy.x);
      }
    }
  }

  function updateAcornEnemies(dt) {
    for (let i = levelState.airEnemies.length - 1; i >= 0; i -= 1) {
      const acorn = levelState.airEnemies[i];
      acorn.phase += dt * 2.8;

      if (acorn.state === "fly") {
        const toward = Math.sign(game.player.x - acorn.x);
        const targetVx = toward * 150;
        acorn.vx = moveToward(acorn.vx, targetVx, dt * 260);
        acorn.x += acorn.vx * dt;
        acorn.y = acorn.baseY + Math.sin(acorn.phase) * 16;
        acorn.dir = toward >= 0 ? -1 : 1;

        const closeToPlayer = Math.abs(game.player.x - acorn.x) < 170 && game.player.y - acorn.y > 80;
        if (closeToPlayer) {
          acorn.state = "drop";
          acorn.stateTimer = 0.1;
          acorn.vx *= 0.4;
        }
      } else if (acorn.state === "drop") {
        acorn.stateTimer -= dt;
        acorn.vx = moveToward(acorn.vx, 0, dt * 520);
        acorn.x += acorn.vx * dt;
        acorn.y = lerp(acorn.y, acorn.baseY + 24, clamp(dt * 12, 0, 1));
        if (acorn.stateTimer <= 0) {
          acorn.state = "fall";
          acorn.vy = 1020;
          acorn.vx = clamp((game.player.x - acorn.x) * 2.1, -260, 260);
        }
      } else {
        acorn.vy = Math.min(1360, acorn.vy + 2100 * dt);
        acorn.vx = moveToward(acorn.vx, 0, dt * 110);
        acorn.x += acorn.vx * dt;
        acorn.y += acorn.vy * dt;
      }

      const acornRect = {
        x: acorn.x - acorn.w * 0.42,
        y: acorn.y - acorn.h * 0.76,
        w: acorn.w * 0.84,
        h: acorn.h * 0.78,
      };
      if (rectOverlap(acornRect, getPlayerRect(game.player))) {
        damagePlayer(1, acorn.x);
        levelState.airEnemies.splice(i, 1);
        continue;
      }

      if (acorn.state === "fall") {
        if (levelState.waterHazard && acorn.y >= levelState.waterKillY) {
          levelState.airEnemies.splice(i, 1);
          continue;
        }
        let hitPlatform = false;
        for (const platform of levelState.platforms) {
          if (circleVsRect({ x: acorn.x, y: acorn.y, r: acorn.w * 0.22 }, platform)) {
            hitPlatform = true;
            break;
          }
        }
        if (hitPlatform || acorn.y > levelState.worldHeight + 120) {
          levelState.airEnemies.splice(i, 1);
        }
      }
    }
  }

  function setBossState(boss, state, duration) {
    boss.state = state;
    boss.stateDuration = Math.max(0.001, duration);
    boss.stateTimer = duration;
    boss.attackFired = false;
  }

  function updateBoss(dt) {
    const boss = levelState.boss;
    if (!boss) {
      return;
    }

    boss.hitFlash = Math.max(0, boss.hitFlash - dt);
    boss.invulnTimer = Math.max(0, boss.invulnTimer - dt);
    boss.rubberPhase += dt * 2.2;
    boss.facing = game.player.x < boss.x ? 1 : -1;

    if (boss.hp <= 0 && boss.state !== "dead") {
      setBossState(boss, "dead", 0.95);
      boss.invulnTimer = 99;
      levelState.enemyProjectiles = [];
      levelState.pinkParries = [];
    }

    if (boss.state === "dead") {
      boss.stateTimer -= dt;
      if (boss.stateTimer <= 0) {
        levelState.boss = null;
        enterVictory("boss");
      }
      return;
    }

    boss.stateTimer -= dt;

    if (boss.state === "intro-earth" && boss.stateTimer <= 0) {
      setBossState(boss, "intro", 1);
    } else if (boss.state === "intro" && boss.stateTimer <= 0) {
      setBossState(boss, "idle", 2.2);
    } else if (boss.state === "idle" && boss.stateTimer <= 0) {
      const pattern = boss.patternIndex % 3;
      boss.patternIndex += 1;
      if (pattern === 0) {
        setBossState(boss, "spit-dirt", 1.05);
      } else if (pattern === 1) {
        setBossState(boss, "spit-worm", 1.15);
      } else {
        setBossState(boss, "spit-sky", 1.18);
      }
    } else if (boss.state === "spit-dirt") {
      if (!boss.attackFired && boss.stateTimer <= boss.stateDuration * 0.5) {
        boss.attackFired = true;
        bossShootDirt();
      }
      if (boss.stateTimer <= 0) {
        setBossState(boss, "idle", 2.35 + Math.random() * 0.75);
      }
    } else if (boss.state === "spit-worm") {
      if (!boss.attackFired && boss.stateTimer <= boss.stateDuration * 0.56) {
        boss.attackFired = true;
        bossShootWorm();
      }
      if (boss.stateTimer <= 0) {
        setBossState(boss, "idle", 2.45 + Math.random() * 0.8);
      }
    } else if (boss.state === "spit-sky") {
      if (!boss.attackFired && boss.stateTimer <= boss.stateDuration * 0.54) {
        boss.attackFired = true;
        bossShootSkyDrop();
      }
      if (boss.stateTimer <= 0) {
        setBossState(boss, "idle", 2.5 + Math.random() * 0.9);
      }
    }

    const bossRect = {
      x: boss.x - boss.w * 0.42,
      y: boss.y - boss.h * 0.92,
      w: boss.w * 0.78,
      h: boss.h * 0.9,
    };
    const playerRect = getPlayerRect(game.player);
    if (rectOverlap(bossRect, playerRect)) {
      damagePlayer(1, boss.x);
    }
  }

  function bossShootDirt() {
    const boss = levelState.boss;
    if (!boss) {
      return;
    }

    const dir = game.player.x < boss.x ? -1 : 1;
    const variant = boss.patternIndex % 3;
    const angleSets = [
      [-0.58, -0.3, -0.08, 0.16, 0.38],
      [-0.72, -0.45, -0.2, 0.05, 0.26],
      [-0.42, -0.16, 0.08, 0.3, 0.5],
    ];
    const angles = angleSets[variant];
    const baseSpeed = 340 + variant * 14;
    for (let i = 0; i < angles.length; i += 1) {
      const a = angles[i] + (Math.random() - 0.5) * 0.04;
      const speed = baseSpeed + i * 12;
      const pink = i === 2;
      const mouthX = boss.x + dir * (84 + i * 4);
      const mouthY = boss.y - 136 + i * 3;
      levelState.enemyProjectiles.push({
        x: mouthX,
        y: mouthY,
        vx: dir * Math.cos(a) * speed,
        vy: Math.sin(a) * speed * 0.72 - 4,
        r: pink ? 12 : 13,
        life: 2.35,
        age: 0,
        damage: 1,
        parryable: pink,
        pink,
        gravity: 210,
        seed: Math.random() * 10,
        kind: "sal-dirt",
      });
    }
    audio.playShoot();
  }

  function bossShootWorm() {
    const boss = levelState.boss;
    if (!boss) {
      return;
    }
    const dir = game.player.x < boss.x ? -1 : 1;
    const variant = boss.patternIndex % 2;
    const wormCount = variant === 0 ? 4 : 3;
    const laneY = variant === 0 ? [602, 596, 586, 602] : [602, 588, 602];
    for (let i = 0; i < wormCount; i += 1) {
      const pink = i === Math.floor(wormCount / 2);
      const burstOffset = i % 2 === 0 ? 0 : 10;
      levelState.enemyProjectiles.push({
        x: boss.x + dir * (80 + i * 12 + burstOffset),
        y: laneY[i],
        vx: dir * (184 + i * 24),
        vy: 0,
        r: pink ? 13 : 14,
        life: 2.6 + i * 0.18,
        age: 0,
        damage: 1,
        parryable: pink,
        pink,
        gravity: 0,
        waveAmp: 6 + i * 2.4,
        waveSpeed: 7.4 + i * 0.95,
        baseY: laneY[i],
        seed: Math.random() * 10,
        kind: "sal-worm",
      });
    }
    audio.playShoot();
  }

  function bossShootSkyDrop() {
    const boss = levelState.boss;
    if (!boss) {
      return;
    }
    const rainCount = 6;
    const centerX = clamp(game.player.x + (Math.random() - 0.5) * 180, 260, levelState.worldWidth - 260);
    for (let i = 0; i < rainCount; i += 1) {
      const spread = (i - (rainCount - 1) * 0.5) * 72;
      const px = clamp(centerX + spread + (Math.random() - 0.5) * 26, 120, levelState.worldWidth - 120);
      const pink = i === 2;
      levelState.enemyProjectiles.push({
        x: px,
        y: 110 + Math.random() * 30,
        vx: (Math.random() - 0.5) * 36,
        vy: 160 + i * 14,
        r: pink ? 12 : 13,
        life: 3,
        age: 0,
        damage: 1,
        parryable: pink,
        pink,
        gravity: 260,
        seed: Math.random() * 10,
        kind: "sal-sky",
      });
    }
    audio.playShoot();
  }

  function updateProjectiles(dt) {
    for (let i = levelState.playerProjectiles.length - 1; i >= 0; i -= 1) {
      const proj = levelState.playerProjectiles[i];
      proj.life -= dt;
      proj.age += dt;
      proj.x += proj.vx * dt;
      proj.y += proj.vy * dt;
      if (proj.kind === "spark") {
        proj.y += Math.sin(proj.age * 24 + proj.seed) * 36 * dt;
      }

      let remove = proj.life <= 0;

      for (const platform of levelState.platforms) {
        if (circleVsRect(proj, platform)) {
          remove = true;
          break;
        }
      }
      if (!remove) {
        for (const obstacle of levelState.obstacles) {
          if (!circleVsRect(proj, obstacle)) {
            continue;
          }
          if (
            proj.kind === "basic" ||
            proj.kind === "spark" ||
            proj.kind === "charged" ||
            proj.kind === "ex" ||
            proj.kind === "ex-child"
          ) {
            const impact = getImpactPointOnRect(proj, obstacle);
            const sparkSet =
              proj.kind === "spark"
                ? "sparkNeedleHit"
                : proj.kind === "charged" || proj.kind === "ex" || proj.kind === "ex-child"
                  ? "exDeath"
                  : "basicHitSpark";
            emitBasicHitSpark(impact.x, impact.y, proj.vx, proj.damage, sparkSet);
          }
          remove = true;
          break;
        }
      }

      for (const enemy of levelState.enemies) {
        if (enemy.dead) {
          continue;
        }
        const enemyRect = {
          x: enemy.x - enemy.w * 0.5,
          y: enemy.y - enemy.h,
          w: enemy.w,
          h: enemy.h,
        };
        if (circleVsRect(proj, enemyRect)) {
          if (proj.kind === "basic" || proj.kind === "spark" || proj.kind === "charged" || proj.kind === "ex" || proj.kind === "ex-child") {
            const impact = getImpactPointOnRect(proj, enemyRect);
            const sparkSet =
              proj.kind === "spark"
                ? "sparkNeedleHit"
                : proj.kind === "charged" || proj.kind === "ex" || proj.kind === "ex-child"
                  ? "exDeath"
                  : "basicHitSpark";
            emitBasicHitSpark(impact.x, impact.y, proj.vx, proj.damage, sparkSet);
          }
          enemy.hp -= proj.damage;
          enemy.hitFlash = 0.1;
          audio.playEnemyHit();
          const lowImpact = proj.kind === "basic" || proj.kind === "spread" || proj.kind === "spark";
          triggerHitStop(lowImpact ? 0.01 : 0.032, lowImpact ? 0.08 : 0.045);
          if (enemy.hp <= 0) {
            enemy.dead = true;
            game.stats.kills += 1;
            addCameraShake(0.08, 2.5);
            playerEnergyGain(0.3);
          }
          remove = true;
          break;
        }
      }

      const boss = levelState.boss;
      if (!remove && boss) {
        const bossRect = {
          x: boss.x - boss.w * 0.5,
          y: boss.y - boss.h,
          w: boss.w,
          h: boss.h,
        };
        if (circleVsRect(proj, bossRect) && boss.invulnTimer <= 0) {
          if (proj.kind === "basic" || proj.kind === "spark" || proj.kind === "charged" || proj.kind === "ex" || proj.kind === "ex-child") {
            const impact = getImpactPointOnRect(proj, bossRect);
            const sparkSet =
              proj.kind === "spark"
                ? "sparkNeedleHit"
                : proj.kind === "charged" || proj.kind === "ex" || proj.kind === "ex-child"
                  ? "exDeath"
                  : "basicHitSpark";
            emitBasicHitSpark(impact.x, impact.y, proj.vx, proj.damage, sparkSet);
          }
          boss.hp -= proj.damage;
          boss.hitFlash = 0.12;
          const lowImpact = proj.kind === "basic" || proj.kind === "spread" || proj.kind === "spark";
          triggerHitStop(lowImpact ? 0.01 : 0.036, lowImpact ? 0.08 : 0.045);
          audio.playEnemyHit();
          playerEnergyGain(0.18);
          remove = true;
        }
      }

      if (remove) {
        levelState.playerProjectiles.splice(i, 1);
      }
    }

    for (let i = levelState.enemyProjectiles.length - 1; i >= 0; i -= 1) {
      const proj = levelState.enemyProjectiles[i];
      proj.life -= dt;
      proj.age += dt;
      if (proj.kind === "sal-worm") {
        proj.x += proj.vx * dt;
        const amp = typeof proj.waveAmp === "number" ? proj.waveAmp : 8;
        const speed = typeof proj.waveSpeed === "number" ? proj.waveSpeed : 6;
        const baseY = typeof proj.baseY === "number" ? proj.baseY : 602;
        proj.y = baseY + Math.sin(proj.age * speed + (proj.seed || 0)) * amp;
      } else {
        proj.x += proj.vx * dt;
        proj.y += proj.vy * dt;
        const projectileGravity = typeof proj.gravity === "number" ? proj.gravity : proj.kind === "slam-wave" ? 380 : 120;
        proj.vy += projectileGravity * dt;
      }
      if (proj.life <= 0) {
        levelState.enemyProjectiles.splice(i, 1);
        continue;
      }
      if (proj.kind === "sal-worm" && (proj.x < 20 || proj.x > levelState.worldWidth - 20)) {
        levelState.enemyProjectiles.splice(i, 1);
        continue;
      }

      const playerRect = getPlayerRect(game.player);
      if (circleVsRect(proj, playerRect)) {
        if (!(proj.parryable && game.player.invulnTimer <= 0 && game.player.dashTimer > 0)) {
          damagePlayer(proj.damage, proj.x);
          levelState.enemyProjectiles.splice(i, 1);
        }
        continue;
      }

      if (proj.kind !== "sal-worm") {
        for (const platform of levelState.platforms) {
          if (circleVsRect(proj, platform)) {
            levelState.enemyProjectiles.splice(i, 1);
            break;
          }
        }
        for (const obstacle of levelState.obstacles) {
          if (circleVsRect(proj, obstacle)) {
            levelState.enemyProjectiles.splice(i, 1);
            break;
          }
        }
      }
    }

    for (let i = levelState.pinkParries.length - 1; i >= 0; i -= 1) {
      const parry = levelState.pinkParries[i];
      parry.life -= dt;
      parry.phase += dt * 1.8;
      parry.x += parry.vx * dt;
      parry.y += Math.sin(parry.phase) * 22 * dt;
      if (parry.x < 40 || parry.x > levelState.worldWidth - 40) {
        parry.vx *= -1;
      }

      if (parry.life <= 0) {
        levelState.pinkParries.splice(i, 1);
      }
    }

    for (let i = levelState.muzzleFlashes.length - 1; i >= 0; i -= 1) {
      const flash = levelState.muzzleFlashes[i];
      flash.life -= dt;
      if (flash.life <= 0) {
        levelState.muzzleFlashes.splice(i, 1);
      }
    }

    for (let i = levelState.dustPuffs.length - 1; i >= 0; i -= 1) {
      const dust = levelState.dustPuffs[i];
      dust.life -= dt;
      dust.x += dust.vx * dt;
      dust.y += dust.vy * dt;
      dust.vy += 80 * dt;
      if (dust.life <= 0) {
        levelState.dustPuffs.splice(i, 1);
      }
    }

    for (let i = levelState.hitSparks.length - 1; i >= 0; i -= 1) {
      const spark = levelState.hitSparks[i];
      spark.life -= dt;
      spark.age += dt;
      spark.x += spark.vx * dt;
      spark.y += spark.vy * dt;
      spark.vy += 120 * dt;
      if (spark.life <= 0) {
        levelState.hitSparks.splice(i, 1);
      }
    }

    for (const butterfly of levelState.butterflies) {
      butterfly.turnTimer -= dt;
      if (butterfly.turnTimer <= 0) {
        butterfly.dir *= -1;
        butterfly.turnTimer = 2.6 + Math.random() * 4.8;
      }
      butterfly.baseX += butterfly.dir * butterfly.speed * dt;
      if (butterfly.baseX < 120) {
        butterfly.baseX = 120;
        butterfly.dir = 1;
      }
      if (butterfly.baseX > levelState.worldWidth - 120) {
        butterfly.baseX = levelState.worldWidth - 120;
        butterfly.dir = -1;
      }
      butterfly.x = butterfly.baseX + Math.sin(game.simTime * butterfly.bobSpeed + butterfly.flapOffset) * butterfly.drift;
      butterfly.y = butterfly.baseY + Math.cos(game.simTime * (butterfly.bobSpeed * 1.35) + butterfly.flapOffset) * butterfly.bobAmp;
    }
  }

  function updateGameplay(dt, type) {
    game.stats.timer += dt;
    updatePlayer(dt);
    updateProjectiles(dt);
    if (type === "runngun") {
      updateEnemies(dt);
      updateAcornEnemies(dt);
      if (game.player.x >= levelState.goalX) {
        enterVictory("runngun");
      }
    }

    if (type === "boss") {
      updateBoss(dt);
    }

    if (type === "runngun" && levelState.airEnemies.length < 3 && Math.random() < dt * 0.18) {
      levelState.airEnemies.push(createAcornEnemy(game.camera.x + GAME_WIDTH + 90 + Math.random() * 180, 290 + Math.random() * 90));
    }
  }

  function updateDeath(dt) {
    game.death.timer += dt;
    if (keyState.retryPressed || keyState.enterPressed) {
      if (game.previousScene === "boss") {
        loadBossArena();
      } else {
        loadRunGun();
      }
    }
  }

  function updateVictory(dt) {
    game.victory.timer += dt;
    if (keyState.enterPressed || keyState.retryPressed) {
      loadOverworld();
    }
  }

  function updateCamera(dt) {
    const camera = game.camera;

    if (game.scene === "runngun" || game.scene === "boss") {
      const player = game.player;
      let targetX = camera.targetX;
      const leftBound = camera.x + GAME_WIDTH * 0.35;
      const rightBound = camera.x + GAME_WIDTH * 0.65;
      if (player.x < leftBound) {
        targetX = player.x - GAME_WIDTH * 0.35;
      } else if (player.x > rightBound) {
        targetX = player.x - GAME_WIDTH * 0.65;
      }

      let targetY = camera.targetY;
      const topBound = camera.y + GAME_HEIGHT * 0.38;
      const botBound = camera.y + GAME_HEIGHT * 0.62;
      const focusY = player.y - 38;
      if (focusY < topBound) {
        targetY = focusY - GAME_HEIGHT * 0.38;
      } else if (focusY > botBound) {
        targetY = focusY - GAME_HEIGHT * 0.62;
      }

      targetX = clamp(targetX, 0, levelState.worldWidth - GAME_WIDTH);
      targetY = clamp(targetY, 0, levelState.worldHeight - GAME_HEIGHT);

      camera.targetX = targetX;
      camera.targetY = targetY;
    } else {
      camera.targetX = 0;
      camera.targetY = 0;
    }

    camera.x = lerp(camera.x, camera.targetX, clamp(dt * 8, 0, 1));
    camera.y = lerp(camera.y, camera.targetY, clamp(dt * 4.5, 0, 1));

    if (camera.shakeTime > 0) {
      camera.shakeTime -= dt;
      const damp = clamp(camera.shakeTime / Math.max(0.01, camera.shakeDuration), 0, 1);
      camera.shakeX = (Math.random() * 2 - 1) * camera.shakeMag * damp;
      camera.shakeY = (Math.random() * 2 - 1) * camera.shakeMag * damp;
      if (camera.shakeTime <= 0) {
        camera.shakeX = 0;
        camera.shakeY = 0;
      }
    }

    camera.jitterX = (Math.sin(game.simTime * 35.7) + Math.sin(game.simTime * 21.3)) * 0.22;
    camera.jitterY = Math.cos(game.simTime * 31.1) * 0.22;
  }

  function updateFilmDust(dt) {
    for (const dust of game.filmDust) {
      dust.x -= dust.vx * dt;
      if (dust.x < -10) {
        dust.x = GAME_WIDTH + 10;
        dust.y = Math.random() * GAME_HEIGHT;
      }
    }
  }

  function update(dt) {
    game.simTime += dt;
    game.animFrame = Math.floor(game.simTime * ANIM_FPS);
    game.filmFlicker = (Math.random() - 0.5) * 0.03;
    syncStageDecorVisibility();

    updateFilmDust(dt);
    game.hitStopCooldown = Math.max(0, game.hitStopCooldown - dt);

    if (game.freezeTimer > 0) {
      game.freezeTimer -= dt;
      updateCamera(dt * 0.2);
      consumeTransientInput();
      return;
    }

    const scaledDt = game.slowMoTimer > 0 ? dt * 0.35 : dt;
    game.slowMoTimer = Math.max(0, game.slowMoTimer - dt);

    if (game.scene === "overworld") {
      updateOverworld(scaledDt);
    } else if (game.scene === "runngun") {
      updateGameplay(scaledDt, "runngun");
    } else if (game.scene === "boss") {
      updateGameplay(scaledDt, "boss");
    } else if (game.scene === "death") {
      updateDeath(scaledDt);
    } else if (game.scene === "victory") {
      updateVictory(scaledDt);
    }

    updateCamera(scaledDt);
    updateHud();
    consumeTransientInput();
  }

  function worldToScreenX(x) {
    return x - game.camera.x + game.camera.shakeX;
  }

  function worldToScreenY(y) {
    return y - game.camera.y + game.camera.shakeY;
  }

  function boil(seed, amp = 1) {
    return Math.sin(seed * 12.13 + game.animFrame * 0.91) * amp;
  }

  function fillInkRect(g, x, y, w, h, fill, line = 4) {
    g.fillStyle = fill;
    g.fillRect(x, y, w, h);
    g.strokeStyle = PALETTE.ink;
    g.lineWidth = line;
    g.strokeRect(x + boil(x, 0.45), y + boil(y, 0.45), w, h);
  }

  function drawFarBackground(g) {
    g.fillStyle = PALETTE.sky;
    g.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    const horizon = 365;
    g.fillStyle = "rgba(222, 210, 170, 0.65)";
    g.fillRect(0, 0, GAME_WIDTH, horizon);

    const parallax = game.camera.x * 0.15;

    for (let i = -2; i < 8; i += 1) {
      const baseX = i * 260 - (parallax % 260);
      const hillY = 430 + Math.sin(i * 0.7 + game.simTime * 0.03) * 12;

      drawWatercolorHill(g, baseX, hillY, 340, 190, PALETTE.hillA, 0.7);
      drawWatercolorHill(g, baseX + 120, hillY + 28, 300, 170, PALETTE.hillB, 0.62);
      drawWatercolorHill(g, baseX + 220, hillY + 44, 300, 140, PALETTE.hillC, 0.58);
    }

    const cloudOffset = (game.simTime * 20 + game.camera.x * 0.08) % 1200;
    for (let i = -1; i < 5; i += 1) {
      const cx = i * 300 - cloudOffset * 0.25 + 120;
      const cy = 130 + Math.sin(i * 1.2 + game.simTime * 0.2) * 9;
      drawInkCloud(g, cx, cy, 90, "rgba(242, 236, 219, 0.55)");
    }
  }

  function drawWatercolorHill(g, x, y, w, h, color, alpha) {
    g.save();
    g.globalAlpha = alpha;
    g.fillStyle = color;
    g.beginPath();
    g.ellipse(x + w * 0.5, y + h * 0.5, w * 0.52 + boil(x, 3), h * 0.48 + boil(y, 2.2), 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }

  function drawInkCloud(g, x, y, size, color) {
    g.save();
    g.fillStyle = color;
    g.strokeStyle = PALETTE.ink;
    g.lineWidth = 2;
    g.beginPath();
    g.ellipse(x + boil(x, 1.2), y + boil(y, 1.2), size * 0.55, size * 0.3, 0, 0, Math.PI * 2);
    g.ellipse(x + size * 0.36, y + 8, size * 0.44, size * 0.28, 0, 0, Math.PI * 2);
    g.ellipse(x - size * 0.36, y + 8, size * 0.4, size * 0.24, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();
    g.restore();
  }

  function drawMidBackground(g) {
    const parallax = game.camera.x * 0.45;
    const start = Math.floor((parallax - 400) / 260) * 260;
    for (let x = start; x < start + GAME_WIDTH + 520; x += 260) {
      const sx = x - parallax;
      drawTree(g, sx + 80, 520, 1 + Math.sin((x + game.animFrame) * 0.02) * 0.03);
      drawTree(g, sx + 200, 548, 0.84);
    }

    for (let i = -2; i < 8; i += 1) {
      const walkerX = i * 180 - (game.camera.x * 0.58) % 1500;
      const y = 576 + Math.sin(i + game.simTime * 0.8) * 5;
      drawTinyWalker(g, walkerX, y, i);
    }
  }

  function drawTree(g, x, y, scale) {
    const blink = (Math.floor(game.simTime * 3 + x * 0.01) % 9) === 0;
    g.save();
    g.translate(x, y);
    g.scale(scale, scale);

    fillInkRect(g, -8, -84, 16, 84, "#6c5d3f", 3);
    g.fillStyle = "#637a57";
    g.strokeStyle = PALETTE.ink;
    g.lineWidth = 3;
    g.beginPath();
    g.ellipse(0, -102, 42 + boil(x, 2), 30 + boil(y, 2), 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    g.fillStyle = PALETTE.ink;
    g.beginPath();
    g.arc(-10, -106, 3, 0, Math.PI * 2);
    g.arc(10, -106, 3, 0, Math.PI * 2);
    g.fill();

    if (blink) {
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(-14, -106);
      g.lineTo(-6, -106);
      g.moveTo(6, -106);
      g.lineTo(14, -106);
      g.stroke();
    }

    g.restore();
  }

  function drawTinyWalker(g, x, y, id) {
    const phase = game.simTime * 5 + id * 0.7;
    const step = Math.sin(phase) * 4;
    g.save();
    g.translate(x, y);
    g.fillStyle = "#2d2a21";
    g.strokeStyle = PALETTE.ink;
    g.lineWidth = 2;
    g.beginPath();
    g.ellipse(0, -8, 10, 8, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    g.beginPath();
    g.moveTo(-4, -2);
    g.lineTo(-4 + step, 8);
    g.moveTo(4, -2);
    g.lineTo(4 - step, 8);
    g.stroke();
    g.restore();
  }

  function drawForeground(g) {
    const parallax = game.camera.x * 0.88;
    const start = Math.floor((parallax - 160) / 60) * 60;
    for (let x = start; x < start + GAME_WIDTH + 220; x += 24) {
      const sx = x - parallax;
      drawGrassBlade(g, sx, 620, (x * 0.03 + game.simTime * 2.4) % (Math.PI * 2));
    }

    const signPositions = [640, 2450, 3880];
    for (const worldX of signPositions) {
      const sx = worldToScreenX(worldX);
      if (sx < -180 || sx > GAME_WIDTH + 180) {
        continue;
      }
      drawSignboard(g, sx, worldToScreenY(560), worldX * 0.01);
    }

    for (const dust of levelState.dustPuffs) {
      g.save();
      g.globalAlpha = clamp(dust.life / dust.maxLife, 0, 1) * 0.4;
      g.fillStyle = "#c9b48e";
      g.beginPath();
      g.ellipse(worldToScreenX(dust.x), worldToScreenY(dust.y), dust.r, dust.r * 0.6, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }
  }

  function drawGrassBlade(g, x, y, phase) {
    const sway = Math.sin(phase) * 6;
    g.strokeStyle = "#32422d";
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(x, y);
    g.quadraticCurveTo(x + sway * 0.7, y - 12, x + sway, y - 28);
    g.stroke();
  }

  function drawSignboard(g, x, y, phase) {
    const sway = Math.sin(game.simTime * 2 + phase) * 5;
    g.save();
    g.translate(x, y);
    g.rotate((sway * Math.PI) / 180);

    fillInkRect(g, -8, -70, 16, 70, "#654f31", 3);
    fillInkRect(g, -62, -124, 124, 50, "#ead5aa", 4);

    g.fillStyle = PALETTE.ink;
    g.font = `15px ${GAME_FONT_FAMILY}`;
    g.textAlign = "center";
    g.fillText("INK ROAD", 0, -96);

    g.restore();
  }

  function drawPlatforms(g) {
    for (const platform of levelState.platforms) {
      const sx = worldToScreenX(platform.x);
      const sy = worldToScreenY(platform.y);
      if (sx > GAME_WIDTH || sx + platform.w < 0) {
        continue;
      }

      fillInkRect(g, sx, sy, platform.w, platform.h, PALETTE.ground, 4);
    }
  }

  function getLoadedEnemyFrames(setName) {
    return enemySpriteBank.loadedSets[setName] || [];
  }

  function getLoadedStageFrames(setName) {
    return stageSpriteBank.loadedSets[setName] || [];
  }

  function drawPiersLoopLayer(g, image, y, targetHeight, parallax = 0, speed = 0, alpha = 1) {
    if (!image || !image.complete || image.naturalWidth <= 0) {
      return;
    }
    const drawH = targetHeight;
    const drawW = image.naturalWidth * (drawH / image.naturalHeight);
    if (drawW <= 0 || drawH <= 0) {
      return;
    }
    const scroll = game.camera.x * parallax + game.simTime * speed;
    const offset = ((scroll % drawW) + drawW) % drawW;
    const startX = -offset - drawW;

    g.save();
    g.globalAlpha = alpha;
    for (let x = startX; x < GAME_WIDTH + drawW; x += drawW) {
      g.drawImage(image, x, y, drawW, drawH);
    }
    g.restore();
  }

  function drawPiersFarBackground(g) {
    const skyFrame = getLoadedStageFrames("bgSky")[0];
    const cloudSmallFrame = getLoadedStageFrames("bgCloudSmall")[0];
    const cloudBigFrame = getLoadedStageFrames("bgCloudBig")[0];
    const cloudYellowFrame = getLoadedStageFrames("bgCloudYellow")[0];
    const hillsFrame = getLoadedStageFrames("bgHills")[0];
    const closeHillsFrame = getLoadedStageFrames("bgCity")[0];

    g.fillStyle = "#d8d0ac";
    g.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    drawPiersLoopLayer(g, skyFrame, 0, 560, 0.015, 0, 1);
    drawPiersLoopLayer(g, cloudBigFrame, 152, 156, 0.032, 2.2, 0.72);
    drawPiersLoopLayer(g, cloudSmallFrame, 208, 118, 0.046, 3.3, 0.82);
    if (cloudYellowFrame && cloudYellowFrame.complete && cloudYellowFrame.naturalWidth > 0) {
      const cloudPositions = [
        { x: 120, y: 92, h: 92, alpha: 0.78 },
        { x: 900, y: 58, h: 82, alpha: 0.72 },
        { x: 1700, y: 102, h: 88, alpha: 0.76 },
      ];
      const drawScale = cloudPositions[0].h / cloudYellowFrame.naturalHeight;
      const drawWBase = cloudYellowFrame.naturalWidth * drawScale;
      const drift = (game.camera.x * 0.018 + game.simTime * 1.2) % (GAME_WIDTH + drawWBase);
      for (const cloud of cloudPositions) {
        const drawH = cloud.h;
        const drawW = cloudYellowFrame.naturalWidth * (drawH / cloudYellowFrame.naturalHeight);
        const sx = ((cloud.x - drift * 0.18) % (GAME_WIDTH + drawW * 2.1)) - drawW;
        g.save();
        g.globalAlpha = cloud.alpha;
        g.drawImage(cloudYellowFrame, sx, cloud.y, drawW, drawH);
        g.restore();
      }
    }
    drawPiersLoopLayer(g, hillsFrame, 430, 146, 0.09, 0, 0.98);
    drawPiersLoopLayer(g, closeHillsFrame, 472, 184, 0.14, 0, 1);

    // Blend the lower hill mass into the ground plane so there is no flat empty band.
    g.save();
    g.fillStyle = "#c5d3a1";
    g.fillRect(0, 632, GAME_WIDTH, 10);
    g.globalAlpha = 0.28;
    g.fillStyle = "#9db87d";
    g.fillRect(0, 624, GAME_WIDTH, 10);
    g.restore();
  }

  function drawPiersMidBackground(g) {
    const wagonFrame = getLoadedStageFrames("startWagon")[0];
    if (wagonFrame && wagonFrame.complete && wagonFrame.naturalWidth > 0) {
      const wagonScale = 0.52;
      const drawW = wagonFrame.naturalWidth * wagonScale;
      const drawH = wagonFrame.naturalHeight * wagonScale;
      const wagonWorldX = 120;
      const wagonGroundY = 624;
      const sx = worldToScreenX(wagonWorldX) - drawW * 0.5;
      const sy = worldToScreenY(wagonGroundY) - drawH;
      if (!(sx < -drawW || sx > GAME_WIDTH + drawW || sy > GAME_HEIGHT + drawH)) {
        g.save();
        g.globalAlpha = 0.98;
        g.drawImage(wagonFrame, sx, sy, drawW, drawH);
        g.restore();
      }
    }

    const treeFrames = getLoadedStageFrames("groundTrees");
    for (const tree of levelState.groundTrees) {
      const frame = treeFrames[tree.frameIndex] || treeFrames[0];
      if (!frame || !frame.complete || frame.naturalWidth <= 0) {
        continue;
      }
      const drawW = frame.naturalWidth * tree.scale;
      const drawH = frame.naturalHeight * tree.scale;
      const sx = worldToScreenX(tree.x) - drawW * 0.5;
      const sy = worldToScreenY(tree.y) - drawH;
      if (sx < -drawW || sx > GAME_WIDTH + drawW || sy > GAME_HEIGHT + drawH) {
        continue;
      }
      const sway = Math.sin(game.simTime * (tree.swaySpeed || 0.5) + (tree.swayPhase || 0)) * (tree.swayAmp || 1);
      const tilt = sway * 0.008;
      g.save();
      g.globalAlpha = tree.alpha;
      g.translate(sx + drawW * 0.5, sy + drawH);
      g.rotate(tilt);
      g.drawImage(frame, -drawW * 0.5 + sway, -drawH, drawW, drawH);
      g.restore();
    }

    const bushFrames = getLoadedStageFrames("groundBushes");
    for (const bush of levelState.groundBushes) {
      const frame = bushFrames[bush.frameIndex] || bushFrames[0];
      if (!frame || !frame.complete || frame.naturalWidth <= 0) {
        continue;
      }
      const drawW = frame.naturalWidth * bush.scale;
      const drawH = frame.naturalHeight * bush.scale;
      const sx = worldToScreenX(bush.x) - drawW * 0.5;
      const sy = worldToScreenY(bush.y) - drawH;
      if (sx < -drawW || sx > GAME_WIDTH + drawW || sy > GAME_HEIGHT + drawH) {
        continue;
      }
      const sway = Math.sin(game.simTime * (bush.swaySpeed || 1) + (bush.swayPhase || 0)) * (bush.swayAmp || 1);
      const tilt = sway * 0.015;
      g.save();
      g.globalAlpha = bush.alpha;
      g.translate(sx + drawW * 0.5, sy + drawH);
      g.rotate(tilt);
      g.drawImage(frame, -drawW * 0.5 + sway, -drawH, drawW, drawH);
      g.restore();
    }

    for (const butterfly of levelState.butterflies) {
      const frames = getLoadedStageFrames(butterfly.setName);
      if (!frames.length) {
        continue;
      }
      const frame = frames[Math.floor(game.simTime * ANIM_FPS * 1.3 + butterfly.flapOffset) % frames.length];
      if (!frame || !frame.complete || frame.naturalWidth <= 0) {
        continue;
      }
      const drawW = frame.naturalWidth * butterfly.scale;
      const drawH = frame.naturalHeight * butterfly.scale;
      const sx = worldToScreenX(butterfly.x) - drawW * 0.5;
      const sy = worldToScreenY(butterfly.y) - drawH * 0.5;
      if (sx < -drawW || sx > GAME_WIDTH + drawW || sy < -drawH || sy > GAME_HEIGHT + drawH) {
        continue;
      }
      g.save();
      g.globalAlpha = 0.9;
      g.translate(sx + drawW * 0.5, sy + drawH * 0.5);
      g.scale(butterfly.dir, 1);
      g.drawImage(frame, -drawW * 0.5, -drawH * 0.5, drawW, drawH);
      g.restore();
    }
  }

  function drawPiersPlatforms(g) {
    const platformFrames = getLoadedStageFrames("dockPlatforms");
    const dockLoopFrame = getLoadedStageFrames("dockLoop")[0];
    const beamBackFrames = getLoadedStageFrames("beamBack");
    const beamFrontFrames = getLoadedStageFrames("beamFront");
    const stoneFirstFrame = getLoadedStageFrames("stoneStepFirst")[0];
    const stoneRepeatFrame = getLoadedStageFrames("stoneStepRepeat")[0];
    const stoneLastFrame = getLoadedStageFrames("stoneStepLast")[0];
    const stoneWallLoopFrame = getLoadedStageFrames("stoneWallLoop")[0];
    const stoneWallFinalEdgeFrame = getLoadedStageFrames("stoneWallFinalEdge")[0];
    const boxPlatformFrame = getLoadedStageFrames("boxPlatform")[0];

    const hasStoneWallLoop = Boolean(
      stoneWallLoopFrame && stoneWallLoopFrame.complete && stoneWallLoopFrame.naturalWidth > 0
    );

    if (hasStoneWallLoop) {
      for (let i = 0; i < levelState.platforms.length; i += 1) {
        const platform = levelState.platforms[i];
        const sx = worldToScreenX(platform.x);
        const sy = worldToScreenY(platform.y);
        if (sx > GAME_WIDTH + 220 || sx + platform.w < -220) {
          continue;
        }
          const drawH = clamp(236 - (620 - platform.y) * 0.7, 164, 242);
        const scale = drawH / stoneWallLoopFrame.naturalHeight;
        const tileW = stoneWallLoopFrame.naturalWidth * scale;
        if (tileW <= 1) {
          continue;
        }

        const tileOffset = ((platform.x * 0.09) % tileW + tileW) % tileW;
        g.save();
        g.beginPath();
        g.rect(sx, sy - 12, platform.w, drawH);
        g.clip();
        for (let x = sx - tileOffset - tileW; x < sx + platform.w + tileW; x += tileW) {
          g.drawImage(stoneWallLoopFrame, x, sy - 12, tileW, drawH);
        }
        g.restore();
      }
      return;
    }

    const hasStoneStep = Boolean(
      (stoneFirstFrame && stoneFirstFrame.complete && stoneFirstFrame.naturalWidth > 0) ||
        (stoneRepeatFrame && stoneRepeatFrame.complete && stoneRepeatFrame.naturalWidth > 0) ||
        (stoneLastFrame && stoneLastFrame.complete && stoneLastFrame.naturalWidth > 0)
    );

    if (hasStoneStep) {
      const lastIdx = levelState.platforms.length - 1;
      for (let i = 0; i < levelState.platforms.length; i += 1) {
        const platform = levelState.platforms[i];
        const sx = worldToScreenX(platform.x);
        const sy = worldToScreenY(platform.y);
        if (sx > GAME_WIDTH + 180 || sx + platform.w < -180) {
          continue;
        }

        let frame = stoneRepeatFrame || stoneFirstFrame || stoneLastFrame;
        if (i === 0 && stoneFirstFrame) {
          frame = stoneFirstFrame;
        } else if (i === lastIdx && stoneLastFrame) {
          frame = stoneLastFrame;
        } else if ((i % 3 === 1) && stoneLastFrame) {
          frame = stoneLastFrame;
        }

        if (!frame || !frame.complete || frame.naturalWidth <= 0) {
          continue;
        }

        // Higher platforms use shallower depth to keep silhouette readable.
        const drawH = clamp(280 - (620 - platform.y) * 1.08, 184, 262);
        const edgePad = i === 0 || i === lastIdx ? 8 : 0;
        g.drawImage(frame, sx - edgePad, sy - 8, platform.w + edgePad * 2, drawH);
      }
      return;
    }

    if (!platformFrames.length && !dockLoopFrame) {
      drawPlatforms(g);
      return;
    }

    for (const platform of levelState.platforms) {
      const sx = worldToScreenX(platform.x);
      const sy = worldToScreenY(platform.y);
      if (sx > GAME_WIDTH + 320 || sx + platform.w < -320) {
        continue;
      }

      const isGroundDeck = platform.h >= 100;
      const deckHeight = isGroundDeck ? 106 : clamp(platform.h + 58, 62, 96);
      const deckTopY = sy - (isGroundDeck ? 18 : 13);

      if (dockLoopFrame) {
        const loopW = dockLoopFrame.naturalWidth * (deckHeight / dockLoopFrame.naturalHeight);
        const scroll = ((platform.x * 0.11 + game.simTime * 4) % loopW + loopW) % loopW;
        for (let x = sx - scroll - loopW; x < sx + platform.w + loopW; x += loopW) {
          g.drawImage(dockLoopFrame, x, deckTopY, loopW, deckHeight);
        }
      }

      if (!isGroundDeck && platformFrames.length) {
        let frame;
        if (platform.w >= 280 && platformFrames[0]) {
          frame = platformFrames[0];
        } else if (platform.w >= 230 && platformFrames.length >= 3) {
          frame = platformFrames[1 + (Math.floor(game.simTime * 2 + platform.x * 0.01) % 2)];
        } else {
          frame = platformFrames[platformFrames.length - 1];
        }

        if (frame && frame.complete && frame.naturalWidth > 0) {
          const tileW = frame.naturalWidth * (deckHeight / frame.naturalHeight);
          const tileOffset = ((platform.x * 0.06 + game.simTime * 2) % tileW + tileW) % tileW;
          for (let x = sx - tileOffset - tileW; x < sx + platform.w + tileW; x += tileW) {
            g.drawImage(frame, x, deckTopY - 2, tileW, deckHeight + 2);
          }
        }
      }

      const beamSpacing = isGroundDeck ? 190 : 150;
      const beamTop = sy + 26;
      const beamBottom = GAME_HEIGHT - 6;
      const beamHeight = Math.max(96, beamBottom - beamTop);

      if (beamBackFrames.length) {
        for (let bx = sx + 26; bx < sx + platform.w; bx += beamSpacing) {
          const frameIdx = wrapIndex(Math.floor((bx + platform.x) / 121), beamBackFrames.length);
          const frame = beamBackFrames[frameIdx];
          if (!frame || !frame.complete || frame.naturalWidth <= 0) {
            continue;
          }
          const drawW = frame.naturalWidth * (beamHeight / frame.naturalHeight) * 0.74;
          g.save();
          g.globalAlpha = 0.65;
          g.drawImage(frame, bx - drawW * 0.5, beamTop, drawW, beamHeight);
          g.restore();
        }
      }

      if (beamFrontFrames.length) {
        for (let bx = sx + 84; bx < sx + platform.w; bx += beamSpacing) {
          const frameIdx = wrapIndex(Math.floor((bx + platform.x) / 97), beamFrontFrames.length);
          const frame = beamFrontFrames[frameIdx];
          if (!frame || !frame.complete || frame.naturalWidth <= 0) {
            continue;
          }
          const drawW = frame.naturalWidth * (beamHeight / frame.naturalHeight) * 0.78;
          g.drawImage(frame, bx - drawW * 0.5, beamTop - 6, drawW, beamHeight + 10);
        }
      }
    }
  }

  function drawPiersForegroundWater(g) {}

  function drawPiersOverLandWater(g) {}

  function drawPiersObstacleProps(g) {
    const boxFrame = getLoadedStageFrames("boxPlatform")[0];
    if (!boxFrame || !boxFrame.complete || boxFrame.naturalWidth <= 0) {
      return;
    }

    for (const obstacle of levelState.obstacles) {
      if (obstacle.kind !== "box") {
        continue;
      }
      const drawW = obstacle.assetWidth * obstacle.scale;
      const drawH = obstacle.assetHeight * obstacle.scale;
      const sx = worldToScreenX(obstacle.worldX);
      const sy = worldToScreenY(obstacle.groundY) - drawH;
      if (sx < -drawW || sx > GAME_WIDTH + drawW || sy > GAME_HEIGHT + drawH) {
        continue;
      }
      g.drawImage(boxFrame, sx, sy, drawW, drawH);
    }
  }

  function drawPiersForeground(g) {
    for (const dust of levelState.dustPuffs) {
      g.save();
      g.globalAlpha = clamp(dust.life / dust.maxLife, 0, 1) * 0.26;
      g.fillStyle = "#c9b48e";
      g.beginPath();
      g.ellipse(worldToScreenX(dust.x), worldToScreenY(dust.y), dust.r, dust.r * 0.6, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }
  }

  function getPlayerColors() {
    if (game.cosmetics.skin === "sepia") {
      return {
        body: "#d9c49b",
        gloves: "#f8f2e2",
        shorts: "#6a4a35",
      };
    }
    if (game.cosmetics.skin === "mint") {
      return {
        body: "#b9ddc8",
        gloves: "#f7f1df",
        shorts: "#4d6f68",
      };
    }
    return {
      body: "#ece0be",
      gloves: "#f8f2e2",
      shorts: "#5f4e42",
    };
  }

  function drawPlayer(g) {
    if (!drawPlayerSprite(g)) {
      drawPlayerVector(g);
    }
  }

  function resolvePlayerSpriteState() {
    const p = game.player;

    if (game.scene === "death" || p.hp <= 0) {
      return { set: "death", mode: "oneshot", progress: clamp(game.death.timer / 1.15, 0, 1) };
    }
    if (p.hitFlashTimer > 0.01) {
      return {
        set: "hit",
        mode: "oneshot",
        progress: clamp(1 - p.hitFlashTimer / 0.18, 0, 1),
      };
    }
    if (p.dashTimer > 0 || p.dashAnticipation > 0) {
      const progress = p.dashTimer > 0 ? clamp(1 - p.dashTimer / PLAYER_TUNE.dashDuration, 0, 1) : 0;
      return { set: p.dashStartedOnGround ? "dash" : "dashAir", mode: "oneshot", progress };
    }
    if (!p.onGround) {
      return { set: "jump", mode: "loop", speed: 1.4 };
    }
    if (keyState.down && p.onGround && Math.abs(p.vx) < 130) {
      return { set: "duck", mode: "loop", speed: 1 };
    }
    if (p.chargeTimer > 0.55 && Math.abs(p.vx) < 45) {
      return { set: "shoot", mode: "loop", speed: 1 };
    }
    if (keyState.shootHeld) {
      if (Math.abs(p.vx) > 80) {
        return { set: "runShoot", mode: "loop", speed: 1.6 };
      }
      return { set: "shoot", mode: "loop", speed: 1 };
    }
    if (Math.abs(p.vx) > 80) {
      const speedBoost = clamp(Math.abs(p.vx) / PLAYER_TUNE.runSpeed, 0, 1) * 0.8;
      return { set: "run", mode: "loop", speed: 1.2 + speedBoost };
    }
    return { set: "idle", mode: "loop", speed: 1 };
  }

  function pickSpriteFrame(stateDesc) {
    const frames = playerSpriteBank.sets[stateDesc.set];
    if (!frames || !frames.length) {
      return null;
    }

    if (stateDesc.mode === "oneshot") {
      const idx = Math.min(frames.length - 1, Math.floor(stateDesc.progress * frames.length));
      return frames[idx];
    }

    const speed = stateDesc.speed || 1;
    const idx = Math.floor(game.simTime * ANIM_FPS * speed) % frames.length;
    return frames[idx];
  }

  function drawPlayerSprite(g) {
    if (!playerSpriteBank.ready) {
      return false;
    }

    const p = game.player;
    const stateDesc = resolvePlayerSpriteState();
    const frame = pickSpriteFrame(stateDesc);
    if (!frame || !frame.complete || frame.naturalWidth <= 0) {
      return false;
    }

    const sx = worldToScreenX(p.x);
    const sy = worldToScreenY(p.y);

    const breathing = Math.sin(game.simTime * 2.4) * 0.02;
    const landSquash = p.landingSquash * 0.45;
    const duckSquash = p.duckBlend * 0.2;
    const dashStretch = p.dashTimer > 0 ? 0.24 : p.dashAnticipation > 0 ? -0.16 : 0;
    const sxScale = 1 + landSquash + duckSquash + dashStretch;
    const syScale = 1 + breathing - landSquash - duckSquash - dashStretch * 0.7;

    let facing = p.facing;
    if (p.turnTimer > 0) {
      const turnBlend = clamp(1 - p.turnTimer / 0.09, 0, 1);
      facing = Math.sign(lerp(p.facing, p.pendingFacing, turnBlend) || p.facing);
    }

    const tintFilters = [];
    if (p.hitFlashTimer > 0) {
      tintFilters.push("brightness(1.75)");
    }
    if (game.cosmetics.skin === "sepia") {
      tintFilters.push("sepia(0.45)", "saturate(0.8)");
    } else if (game.cosmetics.skin === "mint") {
      tintFilters.push("hue-rotate(36deg)", "saturate(0.86)");
    }

    const baseScale = clamp((p.h / PLAYER_SPRITE_BASE_HEIGHT) * 1.18, 0.5, 0.86);
    const stateScale =
      stateDesc.set === "run" || stateDesc.set === "runShoot"
        ? 0.4
        : stateDesc.set === "dash" || stateDesc.set === "dashAir"
          ? 0.5
        : stateDesc.set === "duck"
          ? 0.43
        : stateDesc.set === "hit"
          ? 0.44
        : stateDesc.set === "idle" ||
            stateDesc.set === "shoot" ||
            stateDesc.set === "jump"
          ? 0.35
          : 1;
    const drawW = frame.naturalWidth * baseScale * stateScale;
    const drawH = frame.naturalHeight * baseScale * stateScale;
    const shootForwardOffset = stateDesc.set === "shoot" ? facing * 10 : 0;

    g.save();
    g.translate(sx + boil(p.x, 0.6) + shootForwardOffset, sy + boil(p.y, 0.6) + GROUND_CONTACT_VISUAL_OFFSET);
    g.scale(facing, 1);
    g.scale(sxScale, syScale);
    if (tintFilters.length) {
      g.filter = tintFilters.join(" ");
    }
    g.drawImage(frame, -drawW * 0.5, -drawH, drawW, drawH);
    g.filter = "none";
    g.restore();

    if (p.chargeTimer > 0.55) {
      g.save();
      g.strokeStyle = "#f0d87d";
      g.lineWidth = 3;
      g.beginPath();
      g.arc(sx, sy - p.h * 0.54, 42 + Math.sin(game.simTime * 18) * 2, 0, Math.PI * 2);
      g.stroke();
      g.restore();
    }

    if (p.dashAnticipation > 0) {
      drawDashAnticipation(g, sx, sy - 50);
    }

    return true;
  }

  function drawPlayerVector(g) {
    const p = game.player;
    const sx = worldToScreenX(p.x);
    const sy = worldToScreenY(p.y);
    const colors = getPlayerColors();

    const breathing = Math.sin(game.simTime * 2.4) * 0.02;
    const landSquash = p.landingSquash * 0.45;
    const duckSquash = p.duckBlend * 0.2;
    const dashStretch = p.dashTimer > 0 ? 0.24 : p.dashAnticipation > 0 ? -0.16 : 0;

    const sxScale = 1 + landSquash + duckSquash + dashStretch;
    const syScale = 1 + breathing - landSquash - duckSquash - dashStretch * 0.7;

    let facing = p.facing;
    if (p.turnTimer > 0) {
      const turnBlend = clamp(1 - p.turnTimer / 0.09, 0, 1);
      facing = Math.sign(lerp(p.facing, p.pendingFacing, turnBlend) || p.facing);
    }

    const flash = p.hitFlashTimer > 0 ? 1 : 0;

    g.save();
    g.translate(sx + boil(p.x, 0.6), sy + boil(p.y, 0.6) + GROUND_CONTACT_VISUAL_OFFSET);
    g.scale(facing, 1);
    g.scale(sxScale, syScale);

    if (flash) {
      g.globalAlpha = 0.92;
      g.fillStyle = PALETTE.white;
      g.beginPath();
      g.ellipse(0, -48, 28, 42, 0, 0, Math.PI * 2);
      g.fill();
      g.globalAlpha = 1;
    }

    g.strokeStyle = PALETTE.ink;
    g.lineWidth = 5;
    g.lineCap = "round";

    g.fillStyle = colors.body;
    g.beginPath();
    g.ellipse(0, -58, 26, 32, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    g.fillStyle = colors.body;
    g.beginPath();
    g.ellipse(0, -22, 22, 30, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    g.fillStyle = colors.shorts;
    g.beginPath();
    g.ellipse(0, -8, 21, 14, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    const runPhase = game.simTime * 12 * clamp(Math.abs(p.vx) / PLAYER_TUNE.runSpeed, 0, 1);
    const legSwing = Math.sin(runPhase) * 14;
    const armSwing = Math.sin(runPhase + Math.PI * 0.6) * 10;

    g.lineWidth = 6;
    g.beginPath();
    g.moveTo(-10, -8);
    g.quadraticCurveTo(-8 + legSwing * 0.2, 8, -14 + legSwing * 0.5, 24);
    g.moveTo(10, -8);
    g.quadraticCurveTo(8 - legSwing * 0.2, 10, 14 - legSwing * 0.5, 26);
    g.stroke();

    g.beginPath();
    g.moveTo(-20, -40);
    g.quadraticCurveTo(-28, -28 + armSwing * 0.2, -38, -18 + armSwing * 0.45);
    g.moveTo(20, -40);
    g.quadraticCurveTo(30, -30 - armSwing * 0.2, 40, -12 - armSwing * 0.4);
    g.stroke();

    g.fillStyle = colors.gloves;
    g.beginPath();
    g.ellipse(-39, -18 + armSwing * 0.45, 8, 8, 0, 0, Math.PI * 2);
    g.ellipse(40, -12 - armSwing * 0.4, 8, 8, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    g.fillStyle = PALETTE.ink;
    g.beginPath();
    g.arc(-9, -62, 3.5, 0, Math.PI * 2);
    g.arc(8, -62, 3.5, 0, Math.PI * 2);
    g.fill();

    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(-8, -50);
    g.quadraticCurveTo(0, -45 + Math.sin(game.simTime * 6) * 1.2, 8, -50);
    g.stroke();

    if (p.chargeTimer > 0.55) {
      g.strokeStyle = "#f0d87d";
      g.lineWidth = 3;
      g.beginPath();
      g.arc(0, -44, 42 + Math.sin(game.simTime * 18) * 2, 0, Math.PI * 2);
      g.stroke();
      g.strokeStyle = PALETTE.ink;
    }

    g.restore();

    if (p.dashAnticipation > 0) {
      drawDashAnticipation(g, sx, sy - 50);
    }
  }

  function drawDashAnticipation(g, x, y) {
    const t = clamp(game.player.dashAnticipation / PLAYER_TUNE.dashAnticipation, 0, 1);
    g.save();
    g.globalAlpha = 0.25 + t * 0.35;
    g.strokeStyle = PALETTE.ink;
    g.lineWidth = 4;
    g.beginPath();
    g.arc(x, y, 38 + (1 - t) * 6, 0, Math.PI * 2);
    g.stroke();
    g.restore();
  }

  function pickEnemySpriteFrame(enemy) {
    const idleFrames = getLoadedEnemyFrames("idle");
    const attackFrames = getLoadedEnemyFrames("attack");
    const popOutFrames = getLoadedEnemyFrames("popOut");
    const deathFrames = getLoadedEnemyFrames("death");

    if (enemy.dead && deathFrames.length) {
      return deathFrames[Math.min(deathFrames.length - 1, Math.floor(enemy.squash * deathFrames.length))];
    }

    if (enemy.state === "anticipation" && popOutFrames.length) {
      const progress = clamp(1 - enemy.anticipation, 0, 0.999);
      return popOutFrames[Math.floor(progress * popOutFrames.length)];
    }

    if ((enemy.state === "attack" || enemy.state === "recover") && attackFrames.length) {
      if (enemy.state === "attack") {
        const progress = clamp(1 - enemy.stateTimer / 0.2, 0, 0.999);
        return attackFrames[Math.floor(progress * attackFrames.length)];
      }
      const reverse = clamp(enemy.stateTimer / 0.35, 0, 0.999);
      const revIdx = Math.floor((1 - reverse) * attackFrames.length);
      return attackFrames[Math.min(attackFrames.length - 1, revIdx)];
    }

    if (idleFrames.length) {
      const idx = wrapIndex(Math.floor(game.simTime * ANIM_FPS * 0.8 + enemy.rubberPhase * 3), idleFrames.length);
      return idleFrames[idx];
    }

    return null;
  }

  function drawEnemySprite(g, enemy, sx, sy) {
    if (!enemySpriteBank.ready) {
      return false;
    }

    const frame = pickEnemySpriteFrame(enemy);
    if (!frame || !frame.complete || frame.naturalWidth <= 0) {
      return false;
    }

    const baseScale = clamp((enemy.h / ENEMY_SPRITE_BASE_HEIGHT) * 1.22, 0.58, 1.02);
    const drawW = frame.naturalWidth * baseScale;
    const drawH = frame.naturalHeight * baseScale;

    g.save();
    // Keep enemy anchored to the platform so it does not appear floating.
    g.translate(sx, sy);
    g.scale(enemy.dir, 1);
    if (enemy.dead) {
      g.globalAlpha = clamp(1 - enemy.squash, 0, 1);
    }
    if (enemy.hitFlash > 0) {
      g.filter = "brightness(1.8) contrast(1.08)";
    }
    g.drawImage(frame, -drawW * 0.5, -drawH, drawW, drawH);
    g.filter = "none";

    if (enemy.state === "anticipation") {
      g.strokeStyle = PALETTE.red;
      g.lineWidth = 3;
      g.beginPath();
      g.arc(0, -drawH * 0.52, 40 + Math.sin(game.simTime * 22) * 2, 0, Math.PI * 2);
      g.stroke();
    }

    const cloudFrames = getLoadedEnemyFrames("poisonPurple");
    if (
      cloudFrames.length &&
      !enemy.dead &&
      (enemy.state === "anticipation" || enemy.state === "attack" || enemy.state === "recover")
    ) {
      const cloud = cloudFrames[wrapIndex(Math.floor(game.simTime * ANIM_FPS * 1.1 + enemy.rubberPhase * 2), cloudFrames.length)];
      if (cloud && cloud.complete && cloud.naturalWidth > 0) {
        const puffScale = baseScale * 0.54;
        const puffW = cloud.naturalWidth * puffScale;
        const puffH = cloud.naturalHeight * puffScale;
        g.save();
        g.globalAlpha = 0.72;
        g.drawImage(cloud, -puffW * 0.5 + 6, -drawH * 0.68, puffW, puffH);
        g.restore();
      }
    }
    g.restore();
    return true;
  }

  function drawEnemyVector(g, enemy, sx, sy) {
    const flash = enemy.hitFlash > 0;

    g.save();
    // Keep fallback enemy renderer grounded as well.
    g.translate(sx, sy);
    g.scale(enemy.dir, 1);
    g.strokeStyle = PALETTE.ink;
    g.lineWidth = 5;
    g.fillStyle = flash ? PALETTE.white : "#d4b272";

    g.beginPath();
    g.ellipse(0, -45, 32, 36, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    g.fillStyle = flash ? PALETTE.white : "#9e2f26";
    g.beginPath();
    g.ellipse(0, -10, 26, 24, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    g.lineWidth = 6;
    g.beginPath();
    g.moveTo(-18, -12);
    g.quadraticCurveTo(-30, 6, -26, 26);
    g.moveTo(18, -12);
    g.quadraticCurveTo(30, 6, 26, 26);
    g.stroke();

    g.fillStyle = PALETTE.ink;
    g.beginPath();
    g.arc(-10, -50, 4, 0, Math.PI * 2);
    g.arc(10, -50, 4, 0, Math.PI * 2);
    g.fill();

    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(-11, -35);
    g.quadraticCurveTo(0, -30 + Math.sin(game.simTime * 5) * 2, 11, -35);
    g.stroke();

    if (enemy.state === "anticipation") {
      g.strokeStyle = PALETTE.red;
      g.lineWidth = 3;
      g.beginPath();
      g.arc(0, -48, 46 + Math.sin(game.simTime * 22) * 2, 0, Math.PI * 2);
      g.stroke();
    }

    if (enemy.dead) {
      g.globalAlpha = clamp(1 - enemy.squash, 0, 1);
    }

    g.restore();
  }

  function drawEnemies(g) {
    for (const enemy of levelState.enemies) {
      const sx = worldToScreenX(enemy.x);
      const sy = worldToScreenY(enemy.y) + GROUND_CONTACT_VISUAL_OFFSET;
      if (sx < -120 || sx > GAME_WIDTH + 120) {
        continue;
      }
      if (!drawEnemySprite(g, enemy, sx, sy)) {
        drawEnemyVector(g, enemy, sx, sy);
      }
    }
  }

  function pickAcornFrame(acorn) {
    const flyFrames = getLoadedEnemyFrames("acornFly");
    const dropFrames = getLoadedEnemyFrames("acornDrop");
    const fallFrames = getLoadedEnemyFrames("acornFall");

    if (acorn.state === "fly" && flyFrames.length) {
      const idx = Math.floor(game.simTime * ANIM_FPS * 1.3 + acorn.phase * 2.2) % flyFrames.length;
      return flyFrames[idx];
    }
    if (acorn.state === "drop" && dropFrames.length) {
      const idx = Math.floor((0.1 - acorn.stateTimer) * ANIM_FPS * 3);
      return dropFrames[clamp(idx, 0, dropFrames.length - 1)];
    }
    if (fallFrames.length) {
      const idx = Math.floor(game.simTime * ANIM_FPS * 1.8) % fallFrames.length;
      return fallFrames[idx];
    }
    return null;
  }

  function drawAcornEnemies(g) {
    for (const acorn of levelState.airEnemies) {
      const sx = worldToScreenX(acorn.x);
      const sy = worldToScreenY(acorn.y);
      if (sx < -120 || sx > GAME_WIDTH + 120 || sy < -120 || sy > GAME_HEIGHT + 140) {
        continue;
      }

      const frame = pickAcornFrame(acorn);
      if (frame && frame.complete && frame.naturalWidth > 0) {
        const scale = clamp((acorn.h / frame.naturalHeight) * 1.02, 0.55, 1.2);
        const drawW = frame.naturalWidth * scale;
        const drawH = frame.naturalHeight * scale;
        g.save();
        g.translate(sx, sy);
        g.scale(acorn.dir, 1);
        g.drawImage(frame, -drawW * 0.5, -drawH * 0.64, drawW, drawH);
        g.restore();
      } else {
        g.save();
        g.translate(sx, sy);
        g.scale(acorn.dir, 1);
        g.strokeStyle = PALETTE.ink;
        g.fillStyle = PALETTE.pink;
        g.lineWidth = 3;
        g.beginPath();
        g.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
        g.fill();
        g.stroke();
        g.restore();
      }
    }
  }

  function pickBossFrame(boss) {
    if (boss.state === "intro-earth") {
      const frames = getLoadedBossFrames("introEarth");
      if (!frames.length) {
        return null;
      }
      const progress = 1 - clamp(boss.stateTimer / boss.stateDuration, 0, 1);
      const idx = clamp(Math.floor(progress * frames.length), 0, frames.length - 1);
      return frames[idx];
    }
    if (boss.state === "intro") {
      const frames = getLoadedBossFrames("introIdle");
      if (!frames.length) {
        return null;
      }
      const progress = 1 - clamp(boss.stateTimer / boss.stateDuration, 0, 1);
      const idx = clamp(Math.floor(progress * Math.max(1, frames.length * 0.65)), 0, frames.length - 1);
      return frames[idx];
    }
    if (boss.state === "spit-dirt" || boss.state === "spit-worm" || boss.state === "spit-sky") {
      const frames = getLoadedBossFrames("spit");
      if (!frames.length) {
        return null;
      }
      const progress = 1 - clamp(boss.stateTimer / boss.stateDuration, 0, 1);
      const idx = clamp(Math.floor(progress * frames.length), 0, frames.length - 1);
      return frames[idx];
    }
    if (boss.state === "dead") {
      const frames = getLoadedBossFrames("death");
      if (!frames.length) {
        return null;
      }
      const progress = 1 - clamp(boss.stateTimer / boss.stateDuration, 0, 1);
      const idx = clamp(Math.floor(progress * frames.length), 0, frames.length - 1);
      return frames[idx];
    }

    const idleFrames = getLoadedBossFrames("introIdle");
    if (!idleFrames.length) {
      return null;
    }
    const start = Math.max(0, idleFrames.length - 8);
    const idx = start + (Math.floor(game.simTime * ANIM_FPS * 0.8) % (idleFrames.length - start));
    return idleFrames[idx];
  }

  function drawBossVectorFallback(g, boss, sx, sy) {
    g.save();
    g.translate(sx, sy);

    g.strokeStyle = PALETTE.ink;
    g.lineWidth = 6;
    g.fillStyle = boss.hitFlash > 0 ? PALETTE.white : "#d1a267";

    g.beginPath();
    g.ellipse(0, -150, 90, 88, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    g.fillStyle = boss.hitFlash > 0 ? PALETTE.white : "#7f2d22";
    g.beginPath();
    g.ellipse(0, -58, 112, 94, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    const armSwing = Math.sin(game.simTime * 3 + boss.rubberPhase) * 16;
    g.lineWidth = 8;
    g.beginPath();
    g.moveTo(-80, -100);
    g.quadraticCurveTo(-170, -90 + armSwing, -166, -12 + armSwing * 0.4);
    g.moveTo(80, -100);
    g.quadraticCurveTo(170, -90 - armSwing, 166, -12 - armSwing * 0.4);
    g.stroke();

    g.fillStyle = PALETTE.ink;
    g.beginPath();
    g.arc(-26, -160, 7, 0, Math.PI * 2);
    g.arc(26, -160, 7, 0, Math.PI * 2);
    g.fill();

    g.lineWidth = 4;
    g.beginPath();
    g.moveTo(-35, -130);
    g.quadraticCurveTo(0, -105 + Math.sin(game.simTime * 4) * 3, 35, -130);
    g.stroke();

    g.restore();
  }

  function drawBoss(g) {
    const boss = levelState.boss;
    if (!boss) {
      return;
    }

    const sx = worldToScreenX(boss.x);
    const sy = worldToScreenY(boss.y);
    const frame = pickBossFrame(boss);

    if (frame && frame.complete && frame.naturalWidth > 0) {
      const isSpitState = boss.state === "spit-dirt" || boss.state === "spit-worm" || boss.state === "spit-sky";
      const bob = isSpitState ? Math.sin(game.simTime * 18) * 3 : Math.sin(game.simTime * 4 + boss.rubberPhase) * 2;
      const scale = clamp((boss.h / frame.naturalHeight) * 1.22, 0.65, 1.9);
      const drawW = frame.naturalWidth * scale;
      const drawH = frame.naturalHeight * scale;
      g.save();
      g.translate(sx, sy + bob);
      g.scale(boss.facing < 0 ? -1 : 1, 1);
      if (boss.hitFlash > 0) {
        g.filter = "brightness(1.35) saturate(0.9)";
      }
      g.drawImage(frame, -drawW * 0.48, -drawH + 6, drawW, drawH);
      g.filter = "none";
      g.restore();
    } else {
      drawBossVectorFallback(g, boss, sx, sy);
    }

    drawBossHpBar(g, boss);
  }

  function drawBossHpBar(g, boss) {
    const barW = 450;
    const barH = 22;
    const x = (GAME_WIDTH - barW) * 0.5;
    const y = 26;

    g.fillStyle = "rgba(12, 10, 9, 0.62)";
    g.fillRect(x - 5, y - 5, barW + 10, barH + 10);
    g.strokeStyle = PALETTE.ink;
    g.lineWidth = 4;
    g.strokeRect(x, y, barW, barH);

    g.fillStyle = "#7c1f1a";
    g.fillRect(x + 3, y + 3, (barW - 6) * (boss.hp / boss.maxHp), barH - 6);

    g.fillStyle = PALETTE.white;
    g.font = `16px ${GAME_FONT_FAMILY}`;
    g.textAlign = "center";
    g.fillText("BOSS", x + barW * 0.5, y + 17);
  }

  function drawWideBasicBulletSprite(g, proj) {
    if (!projectileSpriteBank.ready) {
      return false;
    }
    const isSpark = proj.kind === "spark";
    const isBasic = proj.kind === "basic";
    const isExFamily = proj.kind === "charged" || proj.kind === "ex" || proj.kind === "ex-child";
    if (!isBasic && !isSpark && !isExFamily) {
      return false;
    }

    const frames = isSpark
      ? projectileSpriteBank.sets.sparkNeedleBullet
      : isExFamily
        ? projectileSpriteBank.sets.exLoop
        : projectileSpriteBank.sets.basicBullet;
    if (!frames || !frames.length) {
      return false;
    }
    const frameIdx = Math.floor(proj.age * ANIM_FPS * (isSpark ? 1.8 : isExFamily ? 1.7 : 2.2)) % frames.length;
    const frame = frames[frameIdx];
    if (!frame || !frame.complete || frame.naturalWidth <= 0) {
      return false;
    }

    const sx = worldToScreenX(proj.x);
    const sy = worldToScreenY(proj.y);
    const dir = proj.vx >= 0 ? 1 : -1;
    const scale = isSpark ? 0.66 : isExFamily ? (proj.kind === "charged" ? 0.74 : proj.kind === "ex" ? 0.88 : 0.62) : 0.72;
    const drawW = frame.naturalWidth * scale;
    const drawH = frame.naturalHeight * scale;

    g.save();
    g.translate(sx, sy);
    g.scale(dir, 1);
    g.drawImage(frame, -drawW * 0.5, -drawH * 0.56, drawW, drawH);
    g.restore();
    return true;
  }

  function drawWideHitSparkSprite(g, spark) {
    if (!projectileSpriteBank.ready) {
      return false;
    }
    const preferredSet = spark.frameSet || "basicHitSpark";
    const frames = projectileSpriteBank.sets[preferredSet] || projectileSpriteBank.sets.basicHitSpark;
    if (!frames || !frames.length) {
      return false;
    }
    const progress = clamp(spark.age / spark.maxLife, 0, 0.999);
    const frameIdx = Math.min(frames.length - 1, Math.floor(progress * frames.length));
    const frame = frames[frameIdx];
    if (!frame || !frame.complete || frame.naturalWidth <= 0) {
      return false;
    }

    const sx = worldToScreenX(spark.x);
    const sy = worldToScreenY(spark.y);
    const drawW = frame.naturalWidth * spark.scale;
    const drawH = frame.naturalHeight * spark.scale;
    const lifePct = clamp(spark.life / spark.maxLife, 0, 1);

    g.save();
    g.globalAlpha = lifePct;
    g.translate(sx, sy);
    g.scale(spark.dir, 1);
    g.drawImage(frame, -drawW * 0.5, -drawH * 0.5, drawW, drawH);
    g.restore();
    return true;
  }

  function drawBasicSpawnSprite(g, flash) {
    if (!projectileSpriteBank.ready || flash.frameSet !== "basicSpawn") {
      return false;
    }
    const frames = projectileSpriteBank.sets.basicSpawn;
    if (!frames || !frames.length) {
      return false;
    }
    const progress = clamp(1 - flash.life / (flash.maxLife || 0.07), 0, 0.999);
    const frameIdx = Math.min(frames.length - 1, Math.floor(progress * frames.length));
    const frame = frames[frameIdx];
    if (!frame || !frame.complete || frame.naturalWidth <= 0) {
      return false;
    }

    const sx = worldToScreenX(flash.x);
    const sy = worldToScreenY(flash.y);
    const drawW = frame.naturalWidth * (flash.scale || 0.82);
    const drawH = frame.naturalHeight * (flash.scale || 0.82);
    const alpha = clamp(flash.life / (flash.maxLife || 0.07), 0, 1);

    g.save();
    g.globalAlpha = alpha;
    g.translate(sx, sy);
    g.scale(flash.dir, 1);
    g.drawImage(frame, -drawW * 0.36, -drawH * 0.56, drawW, drawH);
    g.restore();
    return true;
  }

  function drawBossProjectileSprite(g, proj) {
    if (proj.kind !== "sal-dirt" && proj.kind !== "sal-worm" && proj.kind !== "sal-sky") {
      return false;
    }
    const frames =
      proj.kind === "sal-worm"
        ? getLoadedBossFrames("projectileWorm")
        : getLoadedBossFrames("projectileDirt");
    if (!bossSpriteBank.ready || !frames.length) {
      return false;
    }
    const frameIdx = Math.floor(proj.age * ANIM_FPS * 2.1 + (proj.seed || 0)) % frames.length;
    const frame = frames[frameIdx];
    if (!frame || !frame.complete || frame.naturalWidth <= 0) {
      return false;
    }

    const sx = worldToScreenX(proj.x);
    const sy = worldToScreenY(proj.y);
    const scale = clamp((proj.r * 2.9) / Math.max(1, frame.naturalWidth), 0.5, 1.1);
    const drawW = frame.naturalWidth * scale;
    const drawH = frame.naturalHeight * scale;
    const rotation = proj.kind === "sal-worm" ? 0 : Math.atan2(proj.vy, proj.vx);

    g.save();
    g.translate(sx, sy);
    g.rotate(rotation);
    if (proj.pink) {
      g.filter = "hue-rotate(22deg) saturate(1.4)";
    } else {
      g.filter = proj.kind === "sal-worm" ? "hue-rotate(6deg) saturate(1.04)" : "hue-rotate(-22deg) saturate(0.85)";
    }
    g.drawImage(frame, -drawW * 0.5, -drawH * 0.5, drawW, drawH);
    g.filter = "none";
    g.restore();
    return true;
  }

  function drawEnemySpikerProjectileSprite(g, proj) {
    if (proj.kind !== "blob" && proj.kind !== "slam-wave" && proj.kind !== "spread-shot") {
      return false;
    }
    if (!projectileSpriteBank.ready) {
      return false;
    }
    const frames = projectileSpriteBank.sets.enemySpiker;
    if (!frames || !frames.length) {
      return false;
    }
    const frameIdx = Math.floor(proj.age * ANIM_FPS * 1.7 + Math.abs(proj.vx) * 0.01) % frames.length;
    const frame = frames[frameIdx];
    if (!frame || !frame.complete || frame.naturalWidth <= 0) {
      return false;
    }

    const sx = worldToScreenX(proj.x);
    const sy = worldToScreenY(proj.y);
    const scale = clamp((proj.r * 3.2) / frame.naturalWidth, 0.4, 0.92);
    const drawW = frame.naturalWidth * scale;
    const drawH = frame.naturalHeight * scale;

    g.save();
    g.translate(sx, sy);
    if (proj.vx < 0) {
      g.scale(-1, 1);
    }
    g.save();
    g.globalAlpha = 0.26;
    g.fillStyle = "#13100d";
    g.beginPath();
    g.ellipse(0, 0, drawW * 0.42, drawH * 0.36, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
    if (!proj.pink) {
      g.filter = "hue-rotate(-26deg) saturate(0.82) brightness(0.92)";
    }
    g.drawImage(frame, -drawW * 0.5, -drawH * 0.52, drawW, drawH);
    g.filter = "none";
    g.restore();
    return true;
  }

  function drawProjectiles(g) {
    for (const proj of levelState.playerProjectiles) {
      if (drawWideBasicBulletSprite(g, proj)) {
        continue;
      }
      const sx = worldToScreenX(proj.x);
      const sy = worldToScreenY(proj.y);
      const frame = Math.floor(proj.age * 24 + proj.seed) % 3;
      g.save();
      g.translate(sx, sy);
      g.strokeStyle = PALETTE.ink;
      g.lineWidth = 3;
      g.fillStyle = proj.color;

      if (frame === 0) {
        g.beginPath();
        g.ellipse(0, 0, proj.r, proj.r * 0.65, 0, 0, Math.PI * 2);
        g.fill();
        g.stroke();
      } else if (frame === 1) {
        g.beginPath();
        g.moveTo(-proj.r, -proj.r * 0.4);
        g.lineTo(proj.r * 1.4, 0);
        g.lineTo(-proj.r, proj.r * 0.4);
        g.closePath();
        g.fill();
        g.stroke();
      } else {
        g.beginPath();
        g.ellipse(0, 0, proj.r * 0.72, proj.r, 0, 0, Math.PI * 2);
        g.fill();
        g.stroke();
      }
      g.restore();
    }

    for (const proj of levelState.enemyProjectiles) {
      if (drawBossProjectileSprite(g, proj)) {
        continue;
      }
      if (drawEnemySpikerProjectileSprite(g, proj)) {
        continue;
      }
      const sx = worldToScreenX(proj.x);
      const sy = worldToScreenY(proj.y);
      g.save();
      g.translate(sx, sy);
      g.strokeStyle = PALETTE.ink;
      g.lineWidth = 3;
      g.fillStyle = proj.pink ? PALETTE.pink : "#f0b071";

      g.beginPath();
      g.ellipse(0, 0, proj.r, proj.r * 0.86, 0, 0, Math.PI * 2);
      g.fill();
      g.stroke();
      g.restore();
    }

    for (const spark of levelState.hitSparks) {
      if (drawWideHitSparkSprite(g, spark)) {
        continue;
      }
      const sx = worldToScreenX(spark.x);
      const sy = worldToScreenY(spark.y);
      const lifePct = clamp(spark.life / spark.maxLife, 0, 1);
      g.save();
      g.globalAlpha = lifePct;
      g.translate(sx, sy);
      g.strokeStyle = PALETTE.ink;
      g.lineWidth = 2;
      g.fillStyle = "#f6d36a";
      g.beginPath();
      g.moveTo(0, -12);
      g.lineTo(5, -4);
      g.lineTo(14, -2);
      g.lineTo(6, 3);
      g.lineTo(8, 12);
      g.lineTo(0, 7);
      g.lineTo(-8, 12);
      g.lineTo(-6, 3);
      g.lineTo(-14, -2);
      g.lineTo(-5, -4);
      g.closePath();
      g.fill();
      g.stroke();
      g.restore();
    }

    for (const parry of levelState.pinkParries) {
      const sx = worldToScreenX(parry.x);
      const sy = worldToScreenY(parry.y);
      g.save();
      g.translate(sx, sy);
      g.strokeStyle = PALETTE.ink;
      g.lineWidth = 3;
      g.fillStyle = PALETTE.pink;
      const pulse = 1 + Math.sin(parry.phase * 4 + game.simTime * 12) * 0.08;
      g.scale(pulse, pulse);
      g.beginPath();
      g.moveTo(0, -parry.r);
      g.bezierCurveTo(parry.r, -parry.r, parry.r + 2, 0, 0, parry.r);
      g.bezierCurveTo(-parry.r - 2, 0, -parry.r, -parry.r, 0, -parry.r);
      g.fill();
      g.stroke();
      g.restore();
    }

    for (const flash of levelState.muzzleFlashes) {
      if (drawBasicSpawnSprite(g, flash)) {
        continue;
      }
      const sx = worldToScreenX(flash.x);
      const sy = worldToScreenY(flash.y);
      const lifePct = clamp(flash.life / 0.07, 0, 1);
      g.save();
      g.translate(sx, sy);
      g.scale(flash.dir, 1);
      g.globalAlpha = lifePct;
      g.strokeStyle = PALETTE.ink;
      g.lineWidth = 2;
      g.fillStyle = "#f8e6b5";

      g.beginPath();
      g.moveTo(0, -8);
      g.lineTo(16, -2);
      g.lineTo(26, -8);
      g.lineTo(20, 0);
      g.lineTo(26, 8);
      g.lineTo(16, 2);
      g.lineTo(0, 8);
      g.lineTo(8, 0);
      g.closePath();
      g.fill();
      g.stroke();
      g.restore();
    }
  }

  function drawOverworld(g) {
    drawOverworldAssetBackground(g);
    const runNode = game.overworld.nodes[0];
    const bossNode = game.overworld.nodes[1];
    const bossLocked = !canEnterBossArena();
    g.save();
    g.lineCap = "round";
    g.strokeStyle = "rgba(241, 232, 204, 0.56)";
    g.lineWidth = 12;
    g.beginPath();
    g.moveTo(runNode.x - 130, runNode.y + 44);
    g.quadraticCurveTo(runNode.x - 72, runNode.y + 12, runNode.x, runNode.y);
    g.quadraticCurveTo((runNode.x + bossNode.x) * 0.5, runNode.y - 32, bossNode.x, bossNode.y);
    g.quadraticCurveTo(bossNode.x + 72, bossNode.y - 4, bossNode.x + 128, bossNode.y + 6);
    g.stroke();
    g.strokeStyle = "rgba(20, 17, 13, 0.94)";
    g.lineWidth = 6;
    g.stroke();
    g.restore();

    for (let i = 0; i < game.overworld.nodes.length; i += 1) {
      const node = game.overworld.nodes[i];
      const selected = i === game.overworld.selected;
      const isLockedBossNode = node.id === "boss" && bossLocked;
      g.fillStyle = selected ? "#c4703d" : isLockedBossNode ? "#7c7768" : "#9a8b68";
      g.strokeStyle = PALETTE.ink;
      g.lineWidth = 4;
      g.beginPath();
      g.ellipse(node.x, node.y, selected ? 38 : 30, selected ? 28 : 24, 0, 0, Math.PI * 2);
      g.fill();
      g.stroke();

      const labelY = node.y - 54;
      g.font = `22px ${OVERWORLD_FONT_FAMILY}`;
      const labelWidth = g.measureText(node.label).width + 24 + (isLockedBossNode ? 32 : 0);
      const labelHeight = 32;
      const labelTop = labelY - 24;
      g.save();
      g.fillStyle = "rgba(239, 230, 207, 0.78)";
      g.strokeStyle = "rgba(20, 17, 13, 0.25)";
      g.lineWidth = 1.5;
      g.beginPath();
      g.roundRect(node.x - labelWidth * 0.5, labelTop, labelWidth, labelHeight, 10);
      g.fill();
      g.stroke();
      g.restore();

      g.fillStyle = "rgba(20, 17, 13, 0.95)";
      g.textAlign = "center";
      g.fillText(node.label, isLockedBossNode ? node.x - 14 : node.x, labelY);

      if (isLockedBossNode) {
        drawBossLockIcon(g, node.x + labelWidth * 0.5 - 18, labelY - 5);
      }
    }

    g.save();
    g.translate(game.overworld.markerX, game.overworld.markerY - 54 + Math.sin(game.simTime * 6) * 4);
    const overworldHead = getLoadedStageFrames("overworldHead")[0];
    if (overworldHead && overworldHead.complete && overworldHead.naturalWidth > 0) {
      const drawW = 58;
      const drawH = (overworldHead.naturalHeight / overworldHead.naturalWidth) * drawW;
      g.drawImage(overworldHead, -drawW * 0.5, -drawH * 0.56, drawW, drawH);
    } else {
      g.strokeStyle = PALETTE.ink;
      g.fillStyle = "#f2e4c4";
      g.lineWidth = 4;
      g.beginPath();
      g.ellipse(0, 0, 20, 26, 0, 0, Math.PI * 2);
      g.fill();
      g.stroke();
      g.fillStyle = PALETTE.ink;
      g.beginPath();
      g.arc(-7, -4, 3, 0, Math.PI * 2);
      g.arc(7, -4, 3, 0, Math.PI * 2);
      g.fill();
    }
    g.restore();

    const textPanelX = GAME_WIDTH * 0.5 - 282;
    const textPanelY = 22;
    const textPanelW = 564;
    const textPanelH = 132;
    g.save();
    g.fillStyle = "rgba(240, 232, 210, 0.84)";
    g.strokeStyle = "rgba(20, 17, 13, 0.7)";
    g.lineWidth = 2;
    g.beginPath();
    g.roundRect(textPanelX, textPanelY, textPanelW, textPanelH, 12);
    g.fill();
    g.stroke();
    g.restore();

    g.save();
    g.shadowColor = "rgba(255, 250, 236, 0.45)";
    g.shadowBlur = 3;
    g.fillStyle = "rgba(20, 17, 13, 0.97)";
    g.font = `42px ${OVERWORLD_FONT_FAMILY}`;
    g.textAlign = "center";
    g.fillText("WORLD MAP", GAME_WIDTH * 0.5, 80);

    g.shadowBlur = 2;
    g.font = `24px ${OVERWORLD_FONT_FAMILY}`;
    g.fillText("Arrow Left/Right + Enter", GAME_WIDTH * 0.5, 110);
    g.font = `16px ${OVERWORLD_FONT_FAMILY}`;
    if (canEnterBossArena()) {
      g.fillText("Clear Boss Arena to submit Twitter username + points.", GAME_WIDTH * 0.5, 132);
    } else {
      g.fillText("Clear Run & Gun first to unlock Boss Arena.", GAME_WIDTH * 0.5, 132);
    }
    g.restore();
  }

  function drawBossLockIcon(g, x, y) {
    g.save();
    g.translate(x, y);
    g.strokeStyle = PALETTE.ink;
    g.fillStyle = "#efe2c2";
    g.lineWidth = 2.2;

    g.beginPath();
    g.arc(0, -6, 6.5, Math.PI, 0);
    g.stroke();

    g.beginPath();
    g.roundRect(-8, -6, 16, 13, 4);
    g.fill();
    g.stroke();

    g.beginPath();
    g.fillStyle = "#2a241d";
    g.arc(0, 0, 1.8, 0, Math.PI * 2);
    g.fill();
    g.fillRect(-1, 0, 2, 4);
    g.restore();
  }

  function drawOverworldAssetBackground(g) {
    const oceanFrame = getLoadedStageFrames("overworldOcean")[0];
    const islandFrame = getLoadedStageFrames("overworldMainIsland")[0];
    const margin = 18;

    g.fillStyle = "#78a9c7";
    g.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    if (oceanFrame && oceanFrame.complete && oceanFrame.naturalWidth > 0) {
      // Use cover scaling so the ocean fully spans the overworld viewport.
      const oceanScale = Math.max(GAME_WIDTH / oceanFrame.naturalWidth, GAME_HEIGHT / oceanFrame.naturalHeight) * 1.06;
      const oceanW = oceanFrame.naturalWidth * oceanScale;
      const oceanH = oceanFrame.naturalHeight * oceanScale;
      const oceanX = (GAME_WIDTH - oceanW) * 0.5;
      const oceanY = (GAME_HEIGHT - oceanH) * 0.5;
      g.drawImage(oceanFrame, oceanX, oceanY, oceanW, oceanH);
    } else {
      g.save();
      g.fillStyle = "#6ea2c0";
      g.fillRect(0, GAME_HEIGHT * 0.45, GAME_WIDTH, GAME_HEIGHT * 0.55);
      g.restore();
    }

    if (islandFrame && islandFrame.complete && islandFrame.naturalWidth > 0) {
      const islandScale = Math.min(
        (GAME_WIDTH - margin * 2) / islandFrame.naturalWidth,
        (GAME_HEIGHT - margin * 2) / islandFrame.naturalHeight
      );
      const islandW = islandFrame.naturalWidth * islandScale;
      const islandH = islandFrame.naturalHeight * islandScale;
      const islandX = (GAME_WIDTH - islandW) * 0.5;
      const islandY = (GAME_HEIGHT - islandH) * 0.5;
      g.drawImage(islandFrame, islandX, islandY, islandW, islandH);
    }
  }

  function drawGameplay(g) {
    if (game.stageTheme === "perilous-piers") {
      drawPiersFarBackground(g);
      drawPiersMidBackground(g);
      drawPiersForegroundWater(g);
      drawPiersPlatforms(g);
      drawPiersOverLandWater(g);
      drawPiersObstacleProps(g);
    } else {
      drawFarBackground(g);
      drawMidBackground(g);
      drawPlatforms(g);
    }
    drawEnemies(g);
    drawAcornEnemies(g);
    drawBoss(g);
    drawProjectiles(g);
    drawPlayer(g);
    if (game.stageTheme === "perilous-piers") {
      drawPiersForeground(g);
    } else {
      drawForeground(g);
    }

    if (game.scene === "runngun") {
      drawGoalMarker(g);
    }
  }

  function drawGoalMarker(g) {
    const x = worldToScreenX(levelState.goalX);
    const y = worldToScreenY(610);
    if (x < -100 || x > GAME_WIDTH + 100) {
      return;
    }

    const flagFrames = getLoadedStageFrames("goalFlag");
    if (flagFrames.length) {
      const frameIndex = Math.floor(game.simTime * ANIM_FPS * 0.7) % flagFrames.length;
      const frame = flagFrames[frameIndex];
      if (frame && frame.complete && frame.naturalWidth > 0) {
        const drawScale = 0.82;
        const drawW = frame.naturalWidth * drawScale;
        const drawH = frame.naturalHeight * drawScale;
        const poleAnchorX = 10 * drawScale;
        const sx = x - poleAnchorX;
        const sy = y - drawH + 20;

        g.save();
        g.drawImage(frame, sx, sy, drawW, drawH);
        g.restore();
        return;
      }
    }

    g.save();
    g.strokeStyle = PALETTE.ink;
    g.lineWidth = 5;
    g.fillStyle = "#d6c39b";
    g.beginPath();
    g.rect(x - 14, y - 220, 28, 220);
    g.fill();
    g.stroke();

    g.fillStyle = "#8a1f1f";
    g.beginPath();
    g.moveTo(x + 14, y - 214);
    g.lineTo(x + 120, y - 172 + Math.sin(game.simTime * 7) * 4);
    g.lineTo(x + 14, y - 132);
    g.closePath();
    g.fill();
    g.stroke();
    g.restore();
  }

  function drawDeathScreen(g) {
    drawGameplay(g);
    g.save();
    g.fillStyle = "rgba(17, 12, 9, 0.58)";
    g.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    g.fillStyle = PALETTE.white;
    g.textAlign = "center";
    g.font = `64px ${GAME_FONT_FAMILY}`;
    g.fillText("YOU DIED", GAME_WIDTH * 0.5, GAME_HEIGHT * 0.46);
    g.font = `24px ${GAME_FONT_FAMILY}`;
    g.fillText("Press R or Enter to Retry Instantly", GAME_WIDTH * 0.5, GAME_HEIGHT * 0.56);
    g.restore();
  }

  function drawVictoryScreen(g) {
    drawGameplay(g);
    g.save();
    g.fillStyle = "rgba(16, 12, 9, 0.58)";
    g.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    g.fillStyle = PALETTE.white;
    g.textAlign = "center";
    g.font = `58px ${GAME_FONT_FAMILY}`;
    g.fillText(game.victory.message, GAME_WIDTH * 0.5, 248);

    g.font = `26px ${GAME_FONT_FAMILY}`;
    g.fillText(`Time ${formatTimer(game.stats.timer)}`, GAME_WIDTH * 0.5, 322);
    g.fillText(`Parry ${game.stats.parries} | Damage ${game.stats.damageTaken}`, GAME_WIDTH * 0.5, 362);
    g.fillText(`Score ${game.stats.score}`, GAME_WIDTH * 0.5, 402);

    g.font = `22px ${GAME_FONT_FAMILY}`;
    g.fillText("Press Enter to Return World Map", GAME_WIDTH * 0.5, 468);
    g.restore();
  }

  function renderScene() {
    sceneCtx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    if (game.scene === "overworld") {
      drawOverworld(sceneCtx);
    } else if (game.scene === "runngun" || game.scene === "boss") {
      drawGameplay(sceneCtx);
    } else if (game.scene === "death") {
      drawDeathScreen(sceneCtx);
    } else if (game.scene === "victory") {
      drawVictoryScreen(sceneCtx);
    }
  }

  function applyFilmPass() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    const jitterX = game.camera.jitterX;
    const jitterY = game.camera.jitterY;

    ctx.globalAlpha = 1;
    ctx.filter = "none";
    ctx.drawImage(sceneCanvas, jitterX, jitterY);

    ctx.globalAlpha = 0.06;
    ctx.filter = "hue-rotate(-12deg)";
    ctx.drawImage(sceneCanvas, jitterX + 1, jitterY);

    ctx.globalAlpha = 0.05;
    ctx.filter = "hue-rotate(14deg)";
    ctx.drawImage(sceneCanvas, jitterX - 1, jitterY);

    ctx.filter = "none";
    ctx.globalAlpha = 0.11;
    const grainShiftX = Math.floor((game.simTime * 35) % grainCanvas.width);
    const grainShiftY = Math.floor((game.simTime * 22) % grainCanvas.height);

    for (let y = -grainCanvas.height; y < GAME_HEIGHT + grainCanvas.height; y += grainCanvas.height) {
      for (let x = -grainCanvas.width; x < GAME_WIDTH + grainCanvas.width; x += grainCanvas.width) {
        ctx.drawImage(grainCanvas, x + grainShiftX, y + grainShiftY);
      }
    }

    ctx.globalAlpha = 0.15;
    ctx.fillStyle = "#f2e9d2";
    for (const dust of game.filmDust) {
      ctx.beginPath();
      ctx.ellipse(dust.x, dust.y, dust.r, dust.r * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    const vignette = ctx.createRadialGradient(
      GAME_WIDTH * 0.5,
      GAME_HEIGHT * 0.45,
      GAME_HEIGHT * 0.25,
      GAME_WIDTH * 0.5,
      GAME_HEIGHT * 0.48,
      GAME_HEIGHT * 0.78
    );
    vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignette.addColorStop(1, "rgba(0, 0, 0, 0.34)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    if (game.filmFlicker > 0) {
      ctx.fillStyle = `rgba(255, 248, 228, ${game.filmFlicker.toFixed(3)})`;
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    } else if (game.filmFlicker < 0) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.abs(game.filmFlicker).toFixed(3)})`;
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
  }

  function render() {
    renderScene();
    applyFilmPass();
  }

  function updateHud() {
    if (hudHp) {
      hudHp.textContent = `${game.player.hp}/${game.player.maxHp}`;
    }
    if (hudEnergy) {
      hudEnergy.textContent = game.player.energy.toFixed(1);
    }
    if (hudMeterFill) {
      const energyRatio = clamp(game.player.energy / Math.max(1, game.player.maxEnergy), 0, 1);
      hudMeterFill.style.width = `${energyRatio * 100}%`;
    }
    if (hudHearts.length) {
      hudHearts.forEach((heart, index) => {
        heart.classList.toggle("is-empty", index >= game.player.hp);
      });
    }
    if (hudTimer) {
      hudTimer.textContent = formatTimer(game.stats.timer);
    }
    if (hudParry) {
      hudParry.textContent = `${game.stats.parries}`;
    }
    if (hudDamage) {
      hudDamage.textContent = `${game.stats.damageTaken}`;
    }
    if (hudGrade) {
      hudGrade.textContent = game.stats.grade;
      hudGrade.dataset.grade = game.stats.grade || "-";
    }
  }

  function buildRenderGameToTextPayload() {
    const player = game.player;
    const enemies = levelState.enemies.slice(0, 12).map((enemy) => ({
      x: Number(enemy.x.toFixed(1)),
      y: Number(enemy.y.toFixed(1)),
      hp: enemy.hp,
      state: enemy.state,
    }));
    const airEnemies = levelState.airEnemies.slice(0, 12).map((enemy) => ({
      x: Number(enemy.x.toFixed(1)),
      y: Number(enemy.y.toFixed(1)),
      state: enemy.state,
      vx: Number(enemy.vx.toFixed(1)),
      vy: Number(enemy.vy.toFixed(1)),
    }));

    const pink = levelState.pinkParries.slice(0, 12).map((item) => ({
      x: Number(item.x.toFixed(1)),
      y: Number(item.y.toFixed(1)),
      r: item.r,
    }));

    const enemyShots = levelState.enemyProjectiles.slice(0, 12).map((proj) => ({
      x: Number(proj.x.toFixed(1)),
      y: Number(proj.y.toFixed(1)),
      vx: Number(proj.vx.toFixed(1)),
      vy: Number(proj.vy.toFixed(1)),
      pink: !!proj.pink,
      kind: proj.kind || "unknown",
    }));

    const payload = {
      coordinateSystem: "origin top-left, x right+, y down+; player y denotes feet position.",
      mode: game.scene,
      timer: Number(game.stats.timer.toFixed(2)),
      player: {
        x: Number(player.x.toFixed(1)),
        y: Number(player.y.toFixed(1)),
        vx: Number(player.vx.toFixed(1)),
        vy: Number(player.vy.toFixed(1)),
        hp: player.hp,
        energy: Number(player.energy.toFixed(2)),
        dashAvailable: player.dashAvailable,
        onGround: player.onGround,
        facing: player.facing,
      },
      camera: {
        x: Number(game.camera.x.toFixed(1)),
        y: Number(game.camera.y.toFixed(1)),
      },
      stats: {
        parry: game.stats.parries,
        damageTaken: game.stats.damageTaken,
        kills: game.stats.kills,
        grade: game.stats.grade,
        bossUnlocked: canEnterBossArena(),
        stageTheme: game.stageTheme,
        stageReady: stageSpriteBank.ready,
        stageLoaded: stageSpriteBank.loaded,
        stageFailed: stageSpriteBank.failed,
        spriteReady: playerSpriteBank.ready,
        spriteLoaded: playerSpriteBank.loaded,
        spriteFailed: playerSpriteBank.failed,
        enemySpriteReady: enemySpriteBank.ready,
        enemySpriteLoaded: enemySpriteBank.loaded,
        enemySpriteFailed: enemySpriteBank.failed,
        bossSpriteReady: bossSpriteBank.ready,
        bossSpriteLoaded: bossSpriteBank.loaded,
        bossSpriteFailed: bossSpriteBank.failed,
        basicFxReady: projectileSpriteBank.ready,
        basicFxLoaded: projectileSpriteBank.loaded,
        basicFxFailed: projectileSpriteBank.failed,
      },
      world: {
        width: levelState.worldWidth,
        goalX: levelState.goalX,
        platformCount: levelState.platforms.length,
        hitSparkCount: levelState.hitSparks.length,
        waterHazard: levelState.waterHazard,
        waterKillY: levelState.waterKillY,
      },
      enemies,
      airEnemies,
      butterflies: levelState.butterflies.slice(0, 6).map((b) => ({
        x: Number(b.x.toFixed(1)),
        y: Number(b.y.toFixed(1)),
        set: b.setName,
      })),
      pinkParries: pink,
      enemyProjectiles: enemyShots,
      boss: levelState.boss
        ? {
            hp: levelState.boss.hp,
            maxHp: levelState.boss.maxHp,
            state: levelState.boss.state,
            x: Number(levelState.boss.x.toFixed(1)),
            y: Number(levelState.boss.y.toFixed(1)),
          }
        : null,
    };

    return JSON.stringify(payload);
  }

  window.render_game_to_text = buildRenderGameToTextPayload;

  window.advanceTime = (ms) => {
    const safeMs = Math.max(0, ms || 0);
    const steps = Math.max(1, Math.round(safeMs / (1000 / 60)));
    const dt = safeMs / 1000 / steps;
    for (let i = 0; i < steps; i += 1) {
      update(dt || FIXED_DT);
    }
    render();
  };

  let lastTs = performance.now();
  let accumulator = 0;

  function loop(ts) {
    const frameDt = Math.min(0.05, (ts - lastTs) / 1000);
    lastTs = ts;
    accumulator += frameDt;

    while (accumulator >= FIXED_DT) {
      update(FIXED_DT);
      accumulator -= FIXED_DT;
    }

    render();
    requestAnimationFrame(loop);
  }

  initWeb3Events();
  bindTouchControls();
  loadOverworld();
  updateHud();
  requestAnimationFrame(loop);
})();

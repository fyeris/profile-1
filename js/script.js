// --- フォーム送信処理 ---
function handleSubmit(event) {
    event.preventDefault();
    const successBox = document.getElementById('successMessage');
    successBox.classList.remove('hidden');
    
    // 紙吹雪演出
    createConfetti();

    event.target.reset();
    setTimeout(() => {
        successBox.classList.add('hidden');
    }, 5000);
}

// --- 画面クリック時ポップエフェクト ---
const emojiList = ['✨', '⚡', '💖', '🎮', '🚀', '⭐', '🔥', '🎉'];
document.addEventListener('click', (e) => {
    const particle = document.createElement('div');
    particle.className = 'click-particle';
    particle.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
});

// --- おみくじ機能 ---
const fortuneBtn = document.getElementById('fortuneBtn');
const fortunes = [
    '超大吉 🌟 : 今日打ち込むコードはバグゼロ！',
    '大吉 🎯 : アイデアが爆発する一日になる！',
    '中吉 🎉 : 素敵なWebデザインに出会えるかも！',
    '小吉 ☕ : おいしいコーヒーを飲むと作業効率UP！',
    '吉 🎮 : ゲームで連勝できる運気！'
];

if (fortuneBtn) {
    fortuneBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        alert(`【fyeris おみくじ結果】\n\n${randomFortune}`);
    });
}

// --- プロフィール画像ダブルクリック時の隠し要素 ---
const profileContainer = document.getElementById('profileContainer');
if (profileContainer) {
    profileContainer.addEventListener('dblclick', () => {
        alert('🎉 隠しコマンド発見！ fyerisのレベルが 99 から 999 に上がった！');
    });
}

// --- バグ退治ミニゲーム ---
const startGameBtn = document.getElementById('startGameBtn');
const gameArea = document.getElementById('gameArea');
const gameScore = document.getElementById('gameScore');
const gameTimer = document.getElementById('gameTimer');
const scoreVal = document.getElementById('scoreVal');
const timerVal = document.getElementById('timerVal');

let score = 0;
let timeLeft = 10;
let gameInterval;

if (startGameBtn) {
    startGameBtn.addEventListener('click', startGame);
}

function startGame(e) {
    if (e) e.stopPropagation();
    score = 0;
    timeLeft = 10;
    scoreVal.textContent = score;
    timerVal.textContent = timeLeft;

    startGameBtn.classList.add('hidden');
    gameScore.classList.remove('hidden');
    gameTimer.classList.remove('hidden');

    spawnBug();

    gameInterval = setInterval(() => {
        timeLeft--;
        timerVal.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function spawnBug() {
    const oldBug = document.getElementById('activeBug');
    if (oldBug) oldBug.remove();

    if (timeLeft <= 0) return;

    const bug = document.createElement('div');
    bug.id = 'activeBug';
    bug.innerText = '👾';
    bug.className = 'absolute text-3xl cursor-pointer select-none transition-transform hover:scale-125 active:scale-95';

    const maxX = gameArea.clientWidth - 40;
    const maxY = gameArea.clientHeight - 40;
    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    bug.style.left = `${randomX}px`;
    bug.style.top = `${randomY}px`;

    bug.addEventListener('click', (e) => {
        e.stopPropagation();
        score++;
        scoreVal.textContent = score;
        spawnBug();
    });

    gameArea.appendChild(bug);
}

function endGame() {
    clearInterval(gameInterval);
    const activeBug = document.getElementById('activeBug');
    if (activeBug) activeBug.remove();

    alert(`⏰ タイムアップ！\n退治したバグの数: ${score}匹`);

    startGameBtn.classList.remove('hidden');
    startGameBtn.innerText = 'もう一度プレイ 🔄';
    gameScore.classList.add('hidden');
    gameTimer.classList.add('hidden');
}

// 紙吹雪エフェクト
function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'click-particle';
        confetti.innerText = ['🎉', '✨', '🎊', '⭐️'][Math.floor(Math.random() * 4)];
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.top = `${window.innerHeight - 100}px`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 1000);
    }
}
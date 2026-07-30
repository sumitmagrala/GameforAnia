/* ==========================================================================
   BOMNIA GIRLFRIEND DAY (AUG 1ST) - INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Audio System (Synthesized Web Audio API - Zero External Dependencies) ---
    class SoundEngine {
        constructor() {
            this.ctx = null;
            this.enabled = true;
            this.bgOsc = null;
            this.bgPlaying = false;
        }

        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            }
        }

        playClick() {
            if (!this.enabled) return;
            this.init();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        }

        playFanfare() {
            if (!this.enabled) return;
            this.init();
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.1);
                gain.gain.setValueAtTime(0.3, this.ctx.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.1 + 0.3);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + i * 0.1);
                osc.stop(this.ctx.currentTime + i * 0.1 + 0.3);
            });
        }

        playBuzzer() {
            if (!this.enabled) return;
            this.init();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(90, this.ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.2);
        }

        playTick() {
            if (!this.enabled) return;
            this.init();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.03);
        }
    }

    const sound = new SoundEngine();

    // Audio Toggle Handler
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    audioToggle.addEventListener('click', () => {
        sound.enabled = !sound.enabled;
        if (sound.enabled) {
            audioIcon.className = 'fa-solid fa-volume-high';
            sound.playClick();
        } else {
            audioIcon.className = 'fa-solid fa-volume-xmark';
        }
    });

    // Theme Switcher Handler
    const themeToggle = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-text');
    let currentTheme = 'sweet';

    themeToggle.addEventListener('click', () => {
        sound.playClick();
        if (currentTheme === 'sweet') {
            document.body.className = 'theme-drama';
            themeText.textContent = 'Romance Mode';
            currentTheme = 'drama';
        } else {
            document.body.className = 'theme-sweet';
            themeText.textContent = 'Drama Mode';
            currentTheme = 'sweet';
        }
    });

    // --- 2. Background Particle Engine ---
    const bgCanvas = document.getElementById('bg-particles');
    const bgCtx = bgCanvas.getContext('2d');
    let particles = [];

    function resizeBgCanvas() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeBgCanvas);
    resizeBgCanvas();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * bgCanvas.width;
            this.y = bgCanvas.height + Math.random() * 50;
            this.size = Math.random() * 12 + 8;
            this.speedY = Math.random() * 1.2 + 0.4;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.type = Math.random() > 0.4 ? '💖' : (Math.random() > 0.5 ? '✨' : '🌸');
        }
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            if (this.y < -30) this.reset();
        }
        draw() {
            bgCtx.globalAlpha = this.opacity;
            bgCtx.font = `${this.size}px sans-serif`;
            bgCtx.fillText(this.type, this.x, this.y);
        }
    }

    for (let i = 0; i < 35; i++) {
        particles.push(new Particle());
    }

    function animateBgParticles() {
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateBgParticles);
    }
    animateBgParticles();

    // --- 3. Sarcastic Love Quote Generator ---
    const quotes = [
        "I love you more than you love overthinking things at 2:00 AM.",
        "You're my favorite headache and my absolute favorite person in the universe.",
        "I'd still love you even if you turned into a worm... but please stay human.",
        "My love for you is like my morning coffee: strong, essential, and slightly chaotic.",
        "You are 100% right. (This statement is legally binding for August 1st).",
        "I love how we can sit together in silence and both be judging everyone else.",
        "You're the only person I'd share my last boba pearl with.",
        "If being cute was a crime, you'd be serving a life sentence with no bail."
    ];

    const quoteDisplay = document.getElementById('quote-display');
    const nextQuoteBtn = document.getElementById('next-quote-btn');

    nextQuoteBtn.addEventListener('click', () => {
        sound.playClick();
        quoteDisplay.style.opacity = '0';
        setTimeout(() => {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteDisplay.textContent = `"${randomQuote}"`;
            quoteDisplay.style.opacity = '1';
        }, 200);
    });

    // --- 4. GAME 1: Decision Simulator (Elusive Button) ---
    const btnBomniaRight = document.getElementById('btn-bomnia-right');
    const btnBfRight = document.getElementById('btn-bf-right');
    const decisionFeedback = document.getElementById('decision-feedback');

    const sarcasticToasts = [
        "ERROR 404: Option scientifically impossible!",
        "Nice try! Laws of physics reject this selection.",
        "Girlfriend Law Article 1: Bomnia is never wrong.",
        "Warning: Clicking this will trigger immediate hangry mode!",
        "Button self-destructed due to sheer inaccuracy."
    ];

    let dodgeCount = 0;

    btnBfRight.addEventListener('mouseover', moveElusiveButton);
    btnBfRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveElusiveButton();
    });

    function moveElusiveButton() {
        sound.playBuzzer();
        dodgeCount++;
        const container = btnBfRight.parentElement;
        const rect = container.getBoundingClientRect();
        
        const maxX = rect.width - btnBfRight.offsetWidth - 20;
        const maxY = rect.height - btnBfRight.offsetHeight - 20;

        const randomX = Math.max(10, Math.floor(Math.random() * maxX));
        const randomY = Math.max(10, Math.floor(Math.random() * maxY));

        btnBfRight.style.position = 'absolute';
        btnBfRight.style.left = `${randomX}px`;
        btnBfRight.style.top = `${randomY}px`;
        btnBfRight.style.transform = `scale(${Math.max(0.6, 1 - dodgeCount * 0.08)})`;

        const toast = sarcasticToasts[Math.floor(Math.random() * sarcasticToasts.length)];
        decisionFeedback.className = 'feedback-msg warning';
        decisionFeedback.textContent = `🤡 Dodge #${dodgeCount}: ${toast}`;
        decisionFeedback.classList.remove('hidden');
    }

    btnBomniaRight.addEventListener('click', () => {
        sound.playFanfare();
        triggerConfetti();
        decisionFeedback.className = 'feedback-msg success';
        decisionFeedback.innerHTML = `👑 <strong>CORRECT!</strong> You have chosen wisely. Bomnia is awarded 1000 Love Points!`;
        decisionFeedback.classList.remove('hidden');
        btnBfRight.style.position = 'static';
        btnBfRight.style.transform = 'scale(1)';
        dodgeCount = 0;
    });

    // --- 5. GAME 2: Feed The Hangry Bomnia Arcade Canvas Game ---
    const canvas = document.getElementById('hangry-canvas');
    const ctx = canvas.getContext('2d');
    const startHangryBtn = document.getElementById('start-hangry-btn');
    const arcadeOverlay = document.getElementById('arcade-start-overlay');
    const scoreDisplay = document.getElementById('game-score');
    const statusDisplay = document.getElementById('game-status');
    const timerDisplay = document.getElementById('game-timer');

    let gameRunning = false;
    let score = 0;
    let timeLeft = 30;
    let gameInterval = null;
    let timerInterval = null;

    const basket = {
        x: canvas.width / 2 - 40,
        y: canvas.height - 50,
        width: 80,
        height: 35,
        speed: 8
    };

    let items = [];
    const itemTypes = [
        { emoji: '🧋', pts: 10, type: 'good' },
        { emoji: '🍕', pts: 10, type: 'good' },
        { emoji: '🍫', pts: 10, type: 'good' },
        { emoji: '💐', pts: 15, type: 'good' },
        { emoji: '📱', pts: -15, type: 'bad', name: 'Left on read' },
        { emoji: '🐌', pts: -15, type: 'bad', name: 'Slow wifi' },
        { emoji: '🥱', pts: -10, type: 'bad', name: 'Bad joke' }
    ];

    // Controls
    let keys = {};
    window.addEventListener('keydown', e => keys[e.key] = true);
    window.addEventListener('keyup', e => keys[e.key] = false);

    canvas.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        basket.x = (e.clientX - rect.left) * (canvas.width / rect.width) - basket.width / 2;
    });

    canvas.addEventListener('touchmove', e => {
        const rect = canvas.getBoundingClientRect();
        if (e.touches.length > 0) {
            basket.x = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width) - basket.width / 2;
        }
    });

    startHangryBtn.addEventListener('click', startArcadeGame);

    function startArcadeGame() {
        sound.playClick();
        arcadeOverlay.classList.add('hidden');
        score = 0;
        timeLeft = 30;
        items = [];
        gameRunning = true;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        statusDisplay.textContent = "Status: Hangry Meter Safe 😊";

        clearInterval(gameInterval);
        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                endArcadeGame();
            }
        }, 1000);

        requestAnimationFrame(updateArcadeGame);
    }

    function spawnItem() {
        if (Math.random() < 0.05) {
            const itemDef = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            items.push({
                x: Math.random() * (canvas.width - 30),
                y: -30,
                speed: Math.random() * 2 + 2,
                ...itemDef
            });
        }
    }

    function updateArcadeGame() {
        if (!gameRunning) return;

        // Move basket with keys
        if (keys['ArrowLeft'] && basket.x > 0) basket.x -= basket.speed;
        if (keys['ArrowRight'] && basket.x < canvas.width - basket.width) basket.x += basket.speed;

        // Keep inside bounds
        basket.x = Math.max(0, Math.min(canvas.width - basket.width, basket.x));

        spawnItem();

        // Clear canvas
        ctx.fillStyle = '#110515';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Basket / Bomnia Receiver
        ctx.fillStyle = '#ff4d8d';
        ctx.beginPath();
        ctx.roundRect(basket.x, basket.y, basket.width, basket.height, 12);
        ctx.fill();
        ctx.font = '20px sans-serif';
        ctx.fillText('👑 Bomnia', basket.x + 5, basket.y + 24);

        // Update & Draw Items
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];
            item.y += item.speed;

            ctx.font = '26px sans-serif';
            ctx.fillText(item.emoji, item.x, item.y);

            // Collision check
            if (
                item.y >= basket.y - 10 &&
                item.y <= basket.y + basket.height &&
                item.x >= basket.x - 20 &&
                item.x <= basket.x + basket.width
            ) {
                score += item.pts;
                score = Math.max(0, score);
                scoreDisplay.textContent = score;

                if (item.type === 'good') sound.playTick();
                else sound.playBuzzer();

                // Update Status Text
                if (score < 30) statusDisplay.textContent = "Status: HANGRY DANGER ZONE 🚨";
                else if (score < 100) statusDisplay.textContent = "Status: Moderately Happy & Safe 😊";
                else statusDisplay.textContent = "Status: Queen Fully Satisfied! 👑";

                items.splice(i, 1);
            } else if (item.y > canvas.height + 30) {
                items.splice(i, 1);
            }
        }

        requestAnimationFrame(updateArcadeGame);
    }

    function endArcadeGame() {
        gameRunning = false;
        clearInterval(timerInterval);
        sound.playFanfare();
        triggerConfetti();

        arcadeOverlay.classList.remove('hidden');
        arcadeOverlay.querySelector('h3').textContent = `Game Over! Final Score: ${score} Pts`;
        arcadeOverlay.querySelector('p').innerHTML = score > 100
            ? `👑 <strong>Legendary Girlfriend Caregiver!</strong> Bomnia is 100% fed & happy!`
            : `🧋 Good effort! But Bomnia requires another boba refill immediately!`;
        startHangryBtn.textContent = 'Play Again';
    }

    // --- 6. GAME 3: Relationship Quiz ---
    const quizQuestions = [
        {
            question: "1. When Bomnia says 'I don't care, you pick where we eat', what does she actually mean?",
            options: [
                "A) Feel free to pick any restaurant in the city.",
                "B) Name 10 places so I can reject 9 of them with extreme prejudice.",
                "C) I only want a single fry from your plate."
            ],
            correct: 1
        },
        {
            question: "2. What is the protocol when Bomnia responds with 'I'm fine.'?",
            options: [
                "A) Everything is 100% fine, go play video games.",
                "B) You have 3 seconds to recall every mistake made since 2021.",
                "C) Nod calmly and do nothing."
            ],
            correct: 1
        },
        {
            question: "3. What is Bomnia's official relationship superpower?",
            options: [
                "A) Remembering exact quotes from an argument 9 months ago.",
                "B) Teleporting to the fridge at midnight.",
                "C) Spotting cute dogs from 200 meters away."
            ],
            correct: 0
        },
        {
            question: "4. Who is officially the cutest person on Earth on August 1st?",
            options: [
                "A) Bomnia 💖",
                "B) Also Bomnia 👑",
                "C) Still Bomnia ✨"
            ],
            correct: 0
        }
    ];

    let currentQuizStep = 0;
    let quizScore = 0;
    const quizStepContent = document.getElementById('quiz-step-content');
    const quizBar = document.getElementById('quiz-bar');
    const quizResult = document.getElementById('quiz-result');
    const quizContainer = document.getElementById('quiz-container');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    function renderQuizStep() {
        if (currentQuizStep >= quizQuestions.length) {
            showQuizResults();
            return;
        }

        const q = quizQuestions[currentQuizStep];
        quizBar.style.width = `${((currentQuizStep + 1) / quizQuestions.length) * 100}%`;

        let html = `<h3 class="quiz-q-title">${q.question}</h3><div class="quiz-options">`;
        q.options.forEach((opt, idx) => {
            html += `<button class="quiz-option-btn" data-idx="${idx}">${opt}</button>`;
        });
        html += `</div>`;

        quizStepContent.innerHTML = html;

        document.querySelectorAll('.quiz-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedIdx = parseInt(e.currentTarget.getAttribute('data-idx'));
                if (selectedIdx === q.correct || q.question.includes("cutest person")) {
                    sound.playFanfare();
                    e.currentTarget.classList.add('selected-correct');
                    quizScore += 25;
                } else {
                    sound.playBuzzer();
                    e.currentTarget.classList.add('selected-wrong');
                }

                setTimeout(() => {
                    currentQuizStep++;
                    renderQuizStep();
                }, 700);
            });
        });
    }

    function showQuizResults() {
        quizContainer.classList.add('hidden');
        quizResult.classList.remove('hidden');
        document.getElementById('quiz-rank-desc').innerHTML = `
            Score: <strong>${quizScore}/100</strong><br>
            Rank: 👑 <strong>Grandmaster of Bomnia's Heart</strong><br>
            <em>"You possess extraordinary knowledge of Bomnia's moods and preferences!"</em>
        `;
        triggerConfetti();
    }

    restartQuizBtn.addEventListener('click', () => {
        sound.playClick();
        currentQuizStep = 0;
        quizScore = 0;
        quizResult.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        renderQuizStep();
    });

    renderQuizStep();

    // --- 7. GAME 4: Wheel of Privileges Canvas ---
    const wheelCanvas = document.getElementById('wheel-canvas');
    const wheelCtx = wheelCanvas.getContext('2d');
    const spinBtn = document.getElementById('spin-wheel-btn');
    const claimedList = document.getElementById('claimed-coupons-list');
    const voucherModal = document.getElementById('voucher-modal');
    const closeModal = document.getElementById('close-modal');
    const claimNowBtn = document.getElementById('claim-now-btn');
    const voucherTitle = document.getElementById('voucher-title');

    const prizes = [
        "🧋 Unlimited Boba Pass",
        "🎬 Movie Choice (No Veto)",
        "💆 20-Min Back Rub",
        "🍕 Favorite Dinner Order",
        "🎟️ 1 Free 'You Were Right' Pass",
        "👑 1 Day Zero Argument Rights"
    ];

    const colors = ["#ff4d8d", "#9d4edd", "#ffb703", "#2ec4b6", "#e63946", "#3a86ef"];
    let startAngle = 0;
    const arc = Math.PI / (prizes.length / 2);
    let isSpinning = false;

    function drawWheel() {
        wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
        const outsideRadius = 180;
        const textRadius = 120;
        const insideRadius = 40;

        for (let i = 0; i < prizes.length; i++) {
            const angle = startAngle + i * arc;
            wheelCtx.fillStyle = colors[i % colors.length];

            wheelCtx.beginPath();
            wheelCtx.arc(200, 200, outsideRadius, angle, angle + arc, false);
            wheelCtx.arc(200, 200, insideRadius, angle + arc, angle, true);
            wheelCtx.fill();

            wheelCtx.save();
            wheelCtx.fillStyle = "#ffffff";
            wheelCtx.translate(200 + Math.cos(angle + arc / 2) * textRadius, 200 + Math.sin(angle + arc / 2) * textRadius);
            wheelCtx.rotate(angle + arc / 2 + Math.PI / 2);
            const text = prizes[i];
            wheelCtx.font = 'bold 12px sans-serif';
            wheelCtx.fillText(text, -wheelCtx.measureText(text).width / 2, 0);
            wheelCtx.restore();
        }
    }
    drawWheel();

    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        sound.playClick();
        isSpinning = true;
        
        let spinTime = 0;
        const spinTimeTotal = Math.random() * 3000 + 4000;
        let spinAngleStart = Math.random() * 10 + 10;

        function rotateWheel() {
            spinTime += 30;
            if (spinTime >= spinTimeTotal) {
                stopRotateWheel();
                return;
            }
            const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
            startAngle += (spinAngle * Math.PI / 180);
            drawWheel();
            if (Math.floor(spinTime) % 150 === 0) sound.playTick();
            requestAnimationFrame(rotateWheel);
        }
        rotateWheel();
    });

    function easeOut(t, b, c, d) {
        const ts = (t /= d) * t;
        const tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }

    let winningPrize = "";

    function stopRotateWheel() {
        isSpinning = false;
        const degrees = startAngle * 180 / Math.PI + 90;
        const arcd = arc * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        winningPrize = prizes[index];

        sound.playFanfare();
        triggerConfetti();

        // Open Voucher Modal
        voucherTitle.textContent = winningPrize;
        voucherModal.classList.remove('hidden');
    }

    closeModal.addEventListener('click', () => voucherModal.classList.add('hidden'));

    claimNowBtn.addEventListener('click', () => {
        sound.playClick();
        voucherModal.classList.add('hidden');
        addClaimedCoupon(winningPrize);
    });

    function addClaimedCoupon(prize) {
        const emptyMsg = claimedList.querySelector('.empty-msg');
        if (emptyMsg) emptyMsg.remove();

        const item = document.createElement('div');
        item.className = 'claimed-item';
        item.innerHTML = `<span>${prize}</span> <i class="fa-solid fa-circle-check" style="color: var(--accent-gold);"></i>`;
        claimedList.appendChild(item);
    }

    // --- 8. Flip Cards Interactivity ---
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', () => {
            sound.playClick();
            card.classList.toggle('flipped');
        });
    });

    // --- 9. Interactive Envelope & Letter ---
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => {
        sound.playFanfare();
        envelope.classList.toggle('open');
        if (envelope.classList.contains('open')) {
            triggerConfetti();
        }
    });

    // --- 10. Confetti & Share Utilities ---
    const confettiBtn = document.getElementById('confetti-btn');
    confettiBtn.addEventListener('click', () => {
        sound.playFanfare();
        triggerConfetti();
    });

    function triggerConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    const copyLinkBtn = document.getElementById('copy-link-btn');
    const copyNote = document.getElementById('copy-note');
    copyLinkBtn.addEventListener('click', () => {
        sound.playClick();
        navigator.clipboard.writeText(window.location.href).then(() => {
            copyNote.textContent = "✨ Link copied to clipboard! Share the love!";
            setTimeout(() => copyNote.textContent = "", 3000);
        }).catch(() => {
            copyNote.textContent = "💖 Happy Girlfriend Day, Bomnia!";
        });
    });
});

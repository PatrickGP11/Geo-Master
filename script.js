const game = {
    // Dados
    allCountries: [],
    gameQueue: [], // A fila embaralhada para a partida atual

    // Estado
    score: 0,
    streak: 0,
    currentIndex: 0,
    timerInterval: null,
    timePerRound: 10, // 10 segundos por bandeira

    // Elementos
    elements: {
        screens: document.querySelectorAll('.screen'),
        flagImg: document.getElementById('flag-image'),
        optionsGrid: document.getElementById('options-grid'),
        timerBar: document.getElementById('timer-bar'),
        scoreDisplay: document.getElementById('score'),
        streakDisplay: document.getElementById('streak-display'),
        finalScore: document.getElementById('final-score'),
        rankingList: document.getElementById('high-scores-list')
    },

    init: async function () {
        try {
            // Pega NOME, BANDEIRA e CODIGO (cca3) e TRANSLATIONS
            const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca3,translations');
            const data = await res.json();

            this.allCountries = data;

            document.getElementById('loading-screen').classList.remove('active');
            this.showScreen('menu-screen');
        } catch (e) {
            alert('Erro ao carregar os países. Verifique a internet.');
        }
    },

    // Algoritmo de Embaralhamento (Fisher-Yates)
    shuffleArray: function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    getCountryName: function (country) {
        if (country.translations && country.translations.por) {
            return country.translations.por.common;
        }
        return country.name.common;
    },

    showScreen: function (id) {
        this.elements.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    startGame: function () {
        // Reinicia estado
        this.score = 0;
        this.streak = 0;
        this.currentIndex = 0;

        // Cria uma cópia da lista de todos os países e embaralha ela inteira
        // Isso garante que não repita até acabar TODOS os países do mundo
        this.gameQueue = this.shuffleArray([...this.allCountries]);

        this.updateUI();
        this.showScreen('game-screen');
        this.nextQuestion();
    },

    nextQuestion: function () {
        // Se o jogador é um deus e acertou TODOS os países do mundo (acabou o array)
        if (this.currentIndex >= this.gameQueue.length) {
            this.gameOver("Você zerou o mundo! Incrível!");
            return;
        }

        const correctCountry = this.gameQueue[this.currentIndex];

        // Setup Visual
        this.elements.flagImg.src = correctCountry.flags.svg;
        this.elements.optionsGrid.innerHTML = '';

        // Gera Opções: 1 Correta + 5 Erradas (Dificuldade Alta)
        let options = [correctCountry];
        while (options.length < 6) {
            const random = this.allCountries[Math.floor(Math.random() * this.allCountries.length)];
            // Garante que a opção errada não seja igual à correta nem duplicada
            if (!options.includes(random) && random.cca3 !== correctCountry.cca3) {
                options.push(random);
            }
        }

        // Embaralha as opções na tela
        options.sort(() => Math.random() - 0.5);

        // Renderiza Botões
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = this.getCountryName(opt);
            btn.onclick = (e) => this.checkAnswer(opt, correctCountry, e.target);
            this.elements.optionsGrid.appendChild(btn);
        });

        this.startTimer();
    },

    startTimer: function () {
        clearInterval(this.timerInterval);
        let remaining = this.timePerRound * 1000; // ms
        const total = remaining;

        this.elements.timerBar.style.width = '100%';
        this.elements.timerBar.style.backgroundColor = '#00b894';

        this.timerInterval = setInterval(() => {
            remaining -= 50;
            const pct = (remaining / total) * 100;
            this.elements.timerBar.style.width = `${pct}%`;

            // Cor muda pra vermelho quando está acabando
            if (pct < 30) this.elements.timerBar.style.backgroundColor = '#d63031';

            if (remaining <= 0) {
                clearInterval(this.timerInterval);
                this.gameOver(); // Tempo acabou = Morte
            }
        }, 50);
    },

    checkAnswer: function (selected, correct, btn) {
        clearInterval(this.timerInterval);

        // Trava tudo
        const allBtns = document.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.style.pointerEvents = 'none');

        if (selected.cca3 === correct.cca3) {
            // ACERTOU
            btn.classList.add('correct');
            this.score += 10;
            this.streak++;
            this.currentIndex++; // Avança no array embaralhado
            this.updateUI();

            setTimeout(() => this.nextQuestion(), 800);
        } else {
            // ERROU = FIM DE JOGO
            btn.classList.add('wrong');
            // Mostra a correta
            const correctName = this.getCountryName(correct);
            allBtns.forEach(b => {
                if (b.textContent === correctName) b.classList.add('correct');
            });

            setTimeout(() => this.gameOver(), 1500);
        }
    },

    updateUI: function () {
        this.elements.scoreDisplay.textContent = this.score;
        this.elements.streakDisplay.textContent = this.streak;
    },

    gameOver: function (msg) {
        clearInterval(this.timerInterval);

        document.getElementById('end-title').textContent = msg || "Você Errou!";
        if (msg) document.getElementById('end-title').style.color = "#00b894";
        else document.getElementById('end-title').style.color = "#d63031";

        this.elements.finalScore.textContent = this.score;

        this.saveHighScore(this.score);
        this.renderRanking();
        this.showScreen('ranking-screen');
    },

    // --- Lógica de Ranking (LocalStorage) ---
    saveHighScore: function (score) {
        if (score === 0) return;

        let highScores = JSON.parse(localStorage.getItem('geoMasterRank')) || [];
        const date = new Date().toLocaleDateString('pt-BR');

        highScores.push({ score: score, date: date });

        // Ordena do maior para o menor
        highScores.sort((a, b) => b.score - a.score);

        // Mantém apenas os top 5
        highScores = highScores.slice(0, 5);

        localStorage.setItem('geoMasterRank', JSON.stringify(highScores));
    },

    renderRanking: function () {
        const list = this.elements.rankingList;
        list.innerHTML = '';

        const highScores = JSON.parse(localStorage.getItem('geoMasterRank')) || [];

        if (highScores.length === 0) {
            list.innerHTML = '<li style="justify-content:center;">Sem recordes ainda</li>';
            return;
        }

        highScores.forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>#${index + 1} - ${entry.date}</span>
                <span>${entry.score} pts</span>
            `;
            list.appendChild(li);
        });
    },

    showRanking: function () {
        this.renderRanking();
        document.getElementById('end-title').textContent = "Ranking";
        document.getElementById('end-title').style.color = "white";
        document.querySelector('.current-result').style.display = 'none';
        this.showScreen('ranking-screen');

        // Restaura display caso venha do Game Over depois
        setTimeout(() => {
            document.querySelector('.current-result').style.display = 'block';
        }, 100);
    },

    showMenu: function () {
        this.showScreen('menu-screen');
    }
};

game.init();
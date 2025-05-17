const levelTitles = [
    "Novice Prompter", "Prompt Apprentice", "Adept Scripter", 
    "Prompt Architect", "LLM Whisperer", "Master Prompt Engineer"
];

let currentQuestionIndex = 0;
let score = 0;
let level = 1;

const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const feedbackTextEl = document.getElementById('feedback-text');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const levelTitleEl = document.getElementById('level-title');
const progressBarEl = document.getElementById('progress-bar');
const nextQuestionBtn = document.getElementById('next-question-btn');
const restartGameBtn = document.getElementById('restart-game-btn');
const aiCoreVizEl = document.getElementById('ai-core-visualization');
const aiStatusEl = document.getElementById('ai-status');

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionTextEl.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}: ${currentQuestion.question}`;
        optionsContainerEl.innerHTML = '';
        feedbackTextEl.textContent = '';
        aiStatusEl.textContent = 'Awaiting Input...';
        aiCoreVizEl.className = 'ai-core-thinking';


        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => selectAnswer(index);
            optionsContainerEl.appendChild(button);
        });
        nextQuestionBtn.style.display = 'none';
    } else {
        endGame();
    }
    updateProgress();
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsContainerEl.getElementsByTagName('button');

    for (let button of buttons) {
        button.disabled = true; // Disable all buttons after an answer
    }

    if (selectedIndex === currentQuestion.answer) {
        score++;
        feedbackTextEl.textContent = "Correct! Well done, Prompt Engineer!";
        feedbackTextEl.style.color = "#28a745";
        buttons[selectedIndex].classList.add('correct');
        aiCoreVizEl.className = 'ai-core-correct';
        aiStatusEl.textContent = 'Affirmative!';
    } else {
        feedbackTextEl.textContent = `Incorrect. The correct answer was: "${currentQuestion.options[currentQuestion.answer]}". Explanation: ${currentQuestion.explanation}`;
        feedbackTextEl.style.color = "#dc3545";
        buttons[selectedIndex].classList.add('incorrect');
        buttons[currentQuestion.answer].classList.add('correct'); // Highlight correct answer
        aiCoreVizEl.className = 'ai-core-incorrect';
        aiStatusEl.textContent = 'Error Detected!';
    }

    scoreEl.textContent = score;
    updateLevel();
    updateProgress();
    
    if (currentQuestionIndex < questions.length -1) {
        nextQuestionBtn.style.display = 'block';
    } else {
        endGame(); // Or show a "Finish" button
    }
}

function updateLevel() {
    // Simple leveling: one level per 2 correct answers, max level based on titles
    const newLevel = Math.min(levelTitles.length, Math.floor(score / 2) + 1);
    if (newLevel > level) {
        level = newLevel;
        feedbackTextEl.textContent += ` You've leveled up to ${levelTitles[level-1]}!`;
    }
    levelEl.textContent = level;
    levelTitleEl.textContent = levelTitles[level-1];
}

function updateProgress() {
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progressBarEl.style.width = progressPercentage + '%';
    // progressBarEl.textContent = Math.round(progressPercentage) + '%'; // Optional: show text on bar
}


function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    questionTextEl.textContent = "Quest Complete, Master Prompt Engineer!";
    optionsContainerEl.innerHTML = `<p>Your final score is ${score} out of ${questions.length}.</p>`;
    feedbackTextEl.textContent = `You\'ve reached Level ${level}: ${levelTitles[level-1]}!`;
    nextQuestionBtn.style.display = 'none';
    restartGameBtn.style.display = 'block';
    progressBarEl.style.width = '100%';
    // progressBarEl.textContent = '100%';
    aiStatusEl.textContent = 'Campaign Finished.';
    aiCoreVizEl.className = ''; // Reset to default visual state (idle blue)

    if (score === questions.length) {
        aiCoreVizEl.className = 'ai-core-correct'; // Override for flawless victory
         feedbackTextEl.textContent += " Flawless victory! You are a true Master of Prompts!";
    }
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    level = 1;
    scoreEl.textContent = score;
    levelEl.textContent = level;
    levelTitleEl.textContent = levelTitles[0];
    restartGameBtn.style.display = 'none';
    loadQuestion();
}

nextQuestionBtn.onclick = nextQuestion;
restartGameBtn.onclick = restartGame;

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});

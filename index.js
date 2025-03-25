var questionsArr = [
    { question: 'Which of these U.S. states does NOT border Canada?',
      answer: 'Indiana',
      options: [
        'Alaska',
        'Indiana',
        'Maine',
        'Minnesota',
      ]
    },

    { question: 'Which of these cities does NOT border the Great Lakes?',
      answer: 'Pittsburgh',
      options: [
        'Chicago',
        'Cleveland',
        'Pittsburgh',
        'Toronto',
      ]
    },

    { question: 'Which of these mountain ranges is NOT in Europe?',
      answer: 'Atlas Mountains',
      options: [
        'The Alps',
        'Atlas Mountains',
        'Carpathian Mountains',
        'The Pyrenees',
      ]
    },

    { question: 'Which of these countries was NEVER part of the British Empire?',
      answer: 'Thailand',
      options: [
        'Ireland',
        'Kenya',
        'New Zealand',
        'Thailand',
      ]
    },
    
    { question: 'Which one of these cities is NOT in the Southern Hemisphere?',
      answer: 'Colombo',
      options: [
        'Brasilia',
        'Brisbane',
        'Colombo',
        'Johannesburg',
      ]
    },
]

//Make the start quiz button//
const startQuizButton = document.createElement('button');
startQuizButton.id = 'start-quiz';
startQuizButton.textContent = 'Start Quiz!';

const quizDiv = document.getElementById('quiz');
quizDiv.appendChild(startQuizButton);

let currentQuestionIndex = 0;
let correctAnswers = 0;
let timerIntervalId;
let timeLeft = 30;


//Display the current question//
function displayCurrentQuestion() {
  const currentQuestion = questionsArr[currentQuestionIndex];

  //Make the question element//
  const questionElement = document.createElement('p');
  questionElement.textContent = currentQuestion.question;
  quizDiv.appendChild(questionElement);

  //Make the options element//
  const optionsElement = document.createElement('div');
  currentQuestion.options.forEach(option => {
  const button = document.createElement('button');
  button.textContent = option;
  button.addEventListener('click', () => {
    if (button.textContent === currentQuestion.answer) {
      correctAnswers++
    }
  clearInterval(timerIntervalId);
  displayNextQuestion();
  });
  optionsElement.appendChild(button);
  });
  quizDiv.appendChild(optionsElement);

  //Make the timer element//
  const timerElement = document.createElement('p');
  timerElement.textContent = timeLeft;
  quizDiv.appendChild(timerElement);
}


//Start the timer//
function startTimer() {
    timerIntervalId = setInterval(() => {
    timeLeft--;
    const timerElement = quizDiv.querySelector('p:last-child');
    timerElement.textContent = timeLeft;
    if (timeLeft === 0) {
    clearInterval(timerIntervalId);
    displayNextQuestion();
    }
    }, 1000); // 1000ms = 1s
}

//Display the next question//
function displayNextQuestion() {
    currentQuestionIndex++;
    timeLeft = 30;
    quizDiv.innerHTML = ''; // Clear the current question
    if (currentQuestionIndex < questionsArr.length) {
    displayCurrentQuestion();
    startTimer();
    } else {
        const scoreElement = displayScore();
        quizDiv.appendChild(scoreElement);
        const startQuizButton = document.createElement('button');
        startQuizButton.id = 'start-quiz';
        startQuizButton.textContent = 'Start Quiz!';
        quizDiv.appendChild(startQuizButton);   
    }
}

//Start the quiz game when hitting the start quiz button//
document.getElementById('start-quiz').addEventListener('click', () => {
  quizDiv.innerHTML = ''; //Clear the previous score and start quiz button//
  currentQuestionIndex = 0;
  correctAnswers = 0;
  displayCurrentQuestion();
  startTimer(); 
});    

//Calculate and display the score//
function displayScore() {
  const score = Math.round((correctAnswers / questionsArr.length) * 100);
  const scoreElement = document.createElement('p');
  scoreElement.textContent = score + "%";
  quizDiv.appendChild(scoreElement);
  localStorage.setItem('previous-score', score);
  return scoreElement;
}

//Retrieve the previous score from localStorage//
const previousScore = localStorage.getItem('previous-score');
if (previousScore) {
  const scoreElement = document.createElement('p');
  scoreElement.textContent = previousScore + "%";
  quizDiv.appendChild(scoreElement);
}
    



  











// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question: "Power Flow analysis is supported for",
      answers: {
        a: "Frequency control",
        b: "System planning",
        c: "Stability studies",
        d: "Fault control"
      },
      correctAnswer: "b"
    },
    {
      question: "For load flow analysis, the quantities specified at load bus is",
      answers: {
        a: "P and |V|",
        b: "P and Q",
        c: "P and Q",
        d: "Q and |V|"
      },
      correctAnswer: "b"
    },
    {
      question: "In load flow study, the load at the bus is denoted as",
      answers: {
        a: "A voltage dependent impedance at bus",
        b: "Constant real and reactive powers drawn from bus",
        c: "Constant impedance connected at bus",
        d: "Constant current drawn from the bus"
      },
      correctAnswer: "b"
    },
    {
      question: "While conducting power flow analysis, for the slack bus, specified quantities of the swing bus are",
      answers: {
        a: "Real power injected and reactive power injected",
        b: "Voltage magnitude and voltage phase angle",
        c: "Real power injected and voltage magnitude",
        d: "Real power injected and voltage phase angle"
      },
      correctAnswer: "c"
    },
    {
      question: "It is required to develop mathematical model for power flow analysis. It is true that",
      answers: {
        a: "both the network equations and bus power equations are non-linear",
        b: "both the network equations and bus power equations are linear",
        c: "network equations are linear and bus power equations are non-linear",
        d: "network equations are non-linear and bus power equations are linear"
      },
      correctAnswer: "c"
    }//Dont add comma here
    ];

// ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


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
      question: "Choose the right one",
      answers: {
        a: "K<sub>sg</sub> X K<sub>t</sub> is = 1",
        b: "K<sub>sg</sub> X K<sub>t</sub> is = 0",
        c: "K<sub>sg</sub> X K<sub>t</sub> is = ∞",
        d: "K<sub>sg</sub> X K<sub>t</sub> is any value"
      },
      correctAnswer: "a"
    },
    {
      question: "Most of the Rewarm units have generator rate around",
      answers: {
        a: "3%",
        b: "10%",
        c: "0%",
        d: "∞"
      },
      correctAnswer: "a"
    },
    {
      question: "Zero steady state error can be accomplished by by means of PI controller",
      answers: {
        a: "True",
        b: "False"
      },
      correctAnswer: "a"
    },
    {
      question: "In essential AGC of a assumed control area, the error frequency",
      answers: {
        a: "Area control error",
        b: "Volume control error",
        c: "Nonlinear control error",
        d: "Optimal control error"
      },
      correctAnswer: "a"
    },
    {
      question: "The impulse function Laplace transform of an is",
      answers: {
        a: "Zero",
        b: "One",
        c: "∞",
        d: "Undefined"
      },
      correctAnswer: "b"
    } //Dont add comma here
  ];

// ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();

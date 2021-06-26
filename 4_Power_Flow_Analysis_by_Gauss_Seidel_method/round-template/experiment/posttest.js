
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
          <input type="checkbox" name="question${questionNumber}" value="${letter}"/>

          ${letter} :
          ${currentQuestion.answers[letter]}
        </label>
        <br/>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div><br>` 
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
    alert(`${numCorrect} out of ${myQuestions.length} is correct`);
    resultsContainer.innerHTML = `
    <div class="alert alert-primary center" role="alert">
    ${numCorrect} out of ${myQuestions.length} is correct
    <div>`;
  }

  const quizContainer = document.getElementById("quiz1");
  const resultsContainer = document.getElementById("results1");
  const submitButton = document.getElementById("submit1");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question: "At bus k in a power system, per unit values of the bus voltage and the bus currents are V<sub>k</sub> = 1.1 and I<sub>k</sub> = 0.8  p.u. Then, the per unit value of complex power entering bus k is",
      answers: {
        a: "0.88",
        b: "0.89",
        c: "0.82",
        d: "0.90"
      },
      correctAnswer: "a"
    },
    {
      question: "The Jacobian matrix computed for NR power flow problem of a 14-bus system is of size 21 x 21. The number of load buses in this power system is",
      answers: {
        a: "7",
        b: "8",
        c: "5",
        d: "6"
      },
      correctAnswer: "b"
    },
    {
      question: "A 14-bus power system has one slack bus and 5 voltage controlled buses. The Jacobian matrix required for NR power flow problem is of size",
      answers: {
        a: "8 x 8",
        b: "16 x 16",
        c: "18 x 18",
        d: "21 x 21"
      },
      correctAnswer: "d"
    },
    {
      question: "For exact load flow controls on large power systems, the suitable method is",
      answers: {
        a: "NR method",
        b: "GS method",
        c: "Decoupled method",
        d: "FLDR"
      },
      correctAnswer: "a"
    },
    {
      question: "The variables specified in Load bus is",
      answers: {
        a: "|V|,&#8706;",
        b: " P, Q",
        c: " P, |V|",
        d: "Q, |V|"
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

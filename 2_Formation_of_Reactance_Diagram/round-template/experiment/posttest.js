
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
      question: "What is the main purpose of the reactance diagram?",
      answers: {
        a: "Load flow analysis",
        b: "Fault analysis",
        c: "Calculation of rating of alternators",
        d: "Calculation of rating of transformers"
      },
      correctAnswer: "b"
    },
    {
      question: "The representation of impedance diagram after omitting all resistances, static loads, capacitance of the transmission lines and magnetizing circuit of the transformer is known as?",
      answers: {
        a: "Single line diagram",
        b: "Resistance diagram",
        c: "Reactance diagram",
        d: "Static loads diagram"
      },
      correctAnswer: "c"
    },
    {
      question: "A three phase delta-star transformer with rating 100KVA, 11kv/400V has its primary and secondary leakage reactance as 12 Ω / ph and 0.05 Ω / ph respectively. The total leakage reactance of transformer refers to secondary side is",
      answers: {
        a: "0.0411 Ω/ph",
        b: "0.0659 Ω/ph",
        c: "0.0659 Ω/ph",
        d: "45.646 Ω/ph"
      },
      correctAnswer: "b"
    },
    {
      question: "If the reactance of the line is varied and resistance is kept constant, the maximum steady state power that could be transmitted over the line would be greater when ",
      answers: {
        a: "X = R / &#8730;3",
        b: "X = 3R",
        c: "X = &#8730;3R",
        d: "X = R/3"
      },
      correctAnswer: "c"
    },
    {
      question: "Which are correct for the reactance diagram?",
      answers: {
        a: "The neutral reactance are neglected",
        b: "Static loads are neglected",
        c: "The capacitance of the transmission lines is neglected",
        d: "Only a and c",
        e: "All of these"
      },
      correctAnswer: "e"
    } //Dont add comma here
  ];

// ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();

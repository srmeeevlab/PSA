
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
      question: "When the integral controlled is employed in the primary ALFC, the static frequency drop due to step load change become ______ and the system frequency will be______",
      answers: {
        a: "constant, constant",
        b: "zero, high",
        c: "nominal, constant",
        d: "zero, constant"
      },
      correctAnswer: "d"
    },
    {
      question: "If the power system neither infinite nor finite, the following changes may valid",
      answers: {
        a: "power changer setting and pilot valve",
        b: "frequency and steam valve",
        c: "speed changer setting and frequency",
        d: "speed governor and frequency"
      },
      correctAnswer: "c"
    },
    {
      question: "Two synchronous generators are working in parallel. Their capacities are 200 MW and 400 MW with droop characteristics of 4% and 5% from no load to full load respectively. At full load condition, the synchronous machines are operating in 50 Hz. What is the power generation of 4% regulated machine when a load of 450 MW?",
      answers: {
        a: "192.3077 MW",
        b: "142.3077 MW",
        c: "307.6923 MW",
        d: "277.8421 MW"
      },
      correctAnswer: "b"
    },
    {
      question: "For the above Q.no.3,  What is the operated frequency of power system when the  load of 450 MW?",
      answers: {
        a: "48.0769 Hz",
        b: "50.5769 Hz",
        c: "51.5769 Hz",
        d: "48.5769 Hz"
      },
      correctAnswer: "b"
    },
    {
      question: "A single-area power system has the following data: R = 4 Hz/p.u, D = 0.1 p.u. MW/Hz, TP = 10 s and gain of the Power system, KP = 75 Hz/p.u. MW.  What is the value of ARFC and the static frequency error when the load variation  of 2%?",
      answers: {
        a: "0.5 p.u MW/Hz, -0.0571 Hz",
        b: "0.4 p.u MW/Hz, 0.0571 Hz",
        c: "0.5 p.u MW/Hz, 0.0571 Hz",
        d: "0.35 p.u MW/Hz, -0.571 Hz"
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

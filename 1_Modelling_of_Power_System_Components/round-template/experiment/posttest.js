
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
    resultsContainer.innerHTML = `<div class="alert alert-primary center" role="alert">
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
      question: "The impedance of a component is 0.30 p.u . If the base kV and MVA are halved, then the new per unit impedance will be",
      answers: {
        a: "0.30",
        b: "0.60",
        c: "0.0030",
        d: "0.0060"
      },
      correctAnswer: "b"
    },
    {
      question: "For an alternator in a 3-phase system, base MVA and current are 100 and 2886 A respectively. The Base voltage is",
      answers: {
        a: "20 kV",
        b: "60 kV",
        c: "22 kV",
        d: "72 kV"
      },
      correctAnswer: "a"
    },
    {
      question: "Which one of the following are correct?",
      answers: {
        a: "Static load is represented as power injection in short circuit analysis",
        b: "Static load is neglected in short circuit analysis",
        c: "Static load is represented as current injection in short circuit analysis",
        d: "Static load is represented as power absorption in short circuit analysis"
      },
      correctAnswer: "b"
    },
    {
      question: "A 50 kW 3-phase Y connected load is fed by a 200 KVA transformer with voltage rating 11 kV/400 V through a feeder. The length and the impedance of the feeder are 0.5 km and 0.1+j 0.2 Ω/km respectively. The p.u impedance of the feeder will be",
      answers: {
        a: "0.0625 +j 0.125 p.u",
        b: "0.125+j 0.0625 p.u",
        c: "0.0125+j0.625 p.u",
        d: "0.625 + j0.0125 p.u"
      },
      correctAnswer: "a"
    },
    {
      question: "The synchronous motor having a rating of 100 kVA, 13.2 kV and a reactance of 75 Ω / ph? What will be the p.u impedance?",
      answers: {
        a: "0.043 p.u",
        b: "0.057 p.u",
        c: "0.036 p.u",
        d: "0.298 p.u"
      },
      correctAnswer: "a"
    } //Dont add comma here
  ];

// ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();

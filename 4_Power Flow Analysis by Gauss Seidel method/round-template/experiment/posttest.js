
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
      question: "Power flow solution is",
      answers: {
        a: "steady state solution at normal operating conditions",
        b: "transient solution at normal operating conditions",
        c: "steady state solution at no load condition",
        d: "transient solution at no load condition"
      },
      correctAnswer: "a"
    },
    {
      question: "While conducting power flow analysis, for a generator bus, unknown quantities are ",
      answers: {
        a: "Voltage magnitude and voltage phase angle ",
        b: "Real power injected and reactive power injected",
        c: "Real power injected and voltage magnitude",
        d: "Reactive power injected and voltage phase angle"
      },
      correctAnswer: "d"
    },
    {
      question: "At the end of power flow calculation, power flow S<sub>12</sub>  is obtained as (0.888 – j 0.086) p.u If the line loss in the line 1-2 is (0.014 – j 0.024) p.u then power flow S<sub>21</sub> is",
      answers: {
        a: "(0.902 – j 0.11) p.u",
        b: "(0.874 – j 0.062) p.u",
        c: " (- 0.902 + j 0.11) p.u",
        d: "(-0.874 + j 0.062) p.u"
      },
      correctAnswer: "d"
    },
    {
      question: "In Gauss-Seidel technique of power flow solution, the number of iterations may be compact if the rectification in voltage at each bus in multiplied by",
      answers: {
        a: "Gauss Constant",
        b: "Acceleration constant",
        c: "Blocking constant",
        d: " Deceleration constant"
      },
      correctAnswer: "b"
    },
    {
      question: "In the flow studies PV bus is treated as PQ when",
      answers: {
        a: "Phase angle become high",
        b: "Reactive power goes beyond",
        c: "Voltage at the bus becomes high",
        d: "All of the above"
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

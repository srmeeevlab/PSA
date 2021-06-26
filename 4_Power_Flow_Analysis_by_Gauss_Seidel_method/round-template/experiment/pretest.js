
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

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question: "The variables specified in slack bus is",
      answers: {
        a: "a. |V|,&#8706;",
        b: "P, Q",
        c: "P, |V|",
        d: "Q, |V|"
      },
      correctAnswer: "a"
    },
    {
      question: "In a power flow analysis, the reference bus is known as",
      answers: {
        a: "PV buses",
        b: " PQ buses",
        c: "Slack buses",
        d: "Load bus"
      },
      correctAnswer: "c"
    },
    {
      question: "In a four-bus power system, bus 1 is the slack bus, buses 2 and 3 are load buses and bus 4 is a  generator bus. When power flow analysis is carried out by N.R. method, Jacobian matrix will be of size",
      answers: {
        a: "3 x 3",
        b: "4 x 4",
        c: "5 x 5",
        d: "5 x 6"
      },
      correctAnswer: "c"
    },
    {
      question: "In a four-bus power system, bus 1 is the slack bus. The Jacobian matrix used in N.R. method is of size 5 x 5. This power system",
      answers: {
        a: "has 4 number of load buses",
        b: "has 3 number of load buses",
        c: "has 2 number of load buses",
        d: "has one load bus"
      },
      correctAnswer: "c"
    }, 
    {
      question: "A 7-bus power system has one slack bus and 3 generator buses. The Jacobian matrix required for NR power flow problem is of size",
      answers: {
        a: "12 x 12",
        b: "18 x 18",
        c: "9 x 9",
        d: "21 x 21"
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

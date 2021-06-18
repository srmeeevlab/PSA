
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
      question: "All India installed capacity of power stations is about",
      answers: {
        a: "330 x 10<sup>3</sup> MW",
        b: "130 x 10<sup>3</sup> MW",
        c: "330 x 10<sup>4</sup> MW",
        d: "130 x 10<sup>4 MW"
      },
      correctAnswer: "a"
    },
    {
      question: "Transient reactance is applicable to",
      answers: {
        a: "Transmission line",
        b: "Synchronous generator",
        c: "Transformer",
        d: "Load"
      },
      correctAnswer: "b"
    },
    {
      question: "The per unit impedances of transmission line in 3 phase system is designed by",
      answers: {
        a: "(Z* MVA<sub>b</sub>)/(KV<sub>b</sub>)<sup>2</sup>",
        b: "(1000* KV<sub>b</sub>) / &#8730;3 I<sub>b</sub>",
        c: "(Z* (KV)<sup>2</sup>) / MVA<sub>b</sub>",
        d: "(Z* MVA<sub>b</sub>) / &#8730;3 I<sub>b</sub>"
      },
      correctAnswer: "a"
    },
    {
      question: "The equivalent circuit for the synchronous motor is<br><img src=\"./images/Pre_Q4.png\"\/>",
      answers: {
        a: "Option b",
        b: "Option c",
        c: "Option a",
        d: "Option d"
      },
      correctAnswer: "a"
    },
    {
      question: "A 3-phase 100 MVA, 10 kV synchronous - generator has winding reactance of 1.0 Ω. Its per-unit reactance is",
      answers: {
        a: "0.01",
        b: "0.1",
        c: "1.0",
        d: "10"
      },
      correctAnswer: "c"
    } //Dont add comma here
  ];

// ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();

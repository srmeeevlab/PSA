
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
      question: "Generally, P–F and Q–V for ________ variation and it is ________ type",
      answers: {
        a: "Dynamic, not coupled",
        b: "Static, coupled",
        c: "Static, not coupled",
        d: "Dynamic, coupled"
      },
      correctAnswer: "c"
    },
    {
      question: "A 50 Hz, 4 pole alternators at 20 MVA, 15.75 kV and H=4 kW sec/kVA. What is the kinetic energy stored in the rotor at Ns?",
      answers: {
        a: "80kJ",
        b: "80MJ",
        c: "100MJ",
        d: "90kJ"
      },
      correctAnswer: "b"
    },
    {
      question: "The basic purpose of load frequency control is:",
      answers: {
        a: "to maintain frequency of the power system for variations in real power demand",
        b: "to maintain voltage of the power system for variations in load demand",
        c: "to maintain both terminal voltage and frequency for imbalance between in real-power and demand",
        d: "to maintain both terminal voltage and frequency of the power system due to reactive-power imbalalnce"
      },
      correctAnswer: "a"
    },
    {
      question: "The following one denotes the imbalance between real-power generation and load demand :",
      answers: {
        a: "load current",
        b: "Change in terminal voltage",
        c: "Frequency error",
        d: "Change in load"
      },
      correctAnswer: "c"
    },
    {
      question: "The regulation constant of the speed governor in a single area is 0.025 Hz/MW and its D is 2 MW/Hz. The AFRC is",
      answers: {
        a: "50",
        b: "42",
        c: "2.025",
        d: "0.525"
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

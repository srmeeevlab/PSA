
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
      question: "While computing the bus admittance matrix of a power system network, value of the half line charging admittance of the line 4-7",
      answers: {
        a: "will affect the values of Y47 and Y74 alone",
        b: "will affect the values of Y44 and Y77 alone",
        c: "will affect the values of Y47, Y74, Y44 and Y77 alone",
        d: "will not affect any of the elements of the bus admittance matrix"
      },
      correctAnswer: "c"
    },
    {
      question: "The value of off-diagonal elements in Ybus is",
      answers: {
        a: "which is linked between bus i and bus j with negative sign",
        b: "which is linked between bus i and bus j with positive sign",
        c: "sum of admittance connected at bus i",
        d: "sum of admittance connected at bus j"
      },
      correctAnswer: "a"
    },
    {
      question: "Which of the following matrix is used for load flow studies?",
      answers: {
        a: "Y bus matrix",
        b: "Z bus matrix",
        c: "Unit matrix",
        d: "null matrix"
      },
      correctAnswer: "a"
    },
    {
      question: "In the bus admittance matrix of a transformer-transmission network, the p.u. value of element Y33 = - j20.  A capacitor of impedance of p.u. value – j2 is now included between bus 3 and the ground. Now the p.u. value of element Y33 becomes",
      answers: {
        a: "-j18",
        b: "-j19.5",
        c: "-j20.5",
        d: "-j22"
      },
      correctAnswer: "b"
    },
    {
      question: "A three-bus power system network is shown below, where the diagonal of Ybus matrix are:<br>Y11 = -j12 p.u, Y22 = -j15 p.u, Y33 = -j7 p.u. The p.u. values of the line reactance p, q and r shown in the network are<br><img src=\"../Power System Simulation lab/3_Formation of Bus admittance Matrix (without mutual coupling)/experiment/images/Post_Q5.png\"\/>",
      answers: {
        a: "p = -0.2, q = -0.1, r = -0.5",
        b: "p = 0.2, q = 0.1, r = 0.5",       
        c: "p = -5, q = -10, r = -2",
        d: "p = 5, q = 10, r = 2"
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

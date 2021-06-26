
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
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz1");
  const resultsContainer = document.getElementById("results1");
  const submitButton = document.getElementById("submit1");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question: "The benefit of the FDLF as compared to the NR technique is",
      answers: {
        a: "number of iterations are less",
        b: "accuracy is more",
        c: "reduced memory requirements in storing the Jacobian elements",
        d: "all of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "In a load flow solution a PV bus is changed as a PQ bus when",
      answers: {
        a: "Voltage limit is violated",
        b: "Active power limit is violated",
        c: "Phase angle is high",
        d: "Reactive power limit is violated"
      },
      correctAnswer: "d"
    },
    {
      question: "For what studies are the FDLF method used?",
      answers: {
        a: "Optimisation studies",
        b: "Multiple load flow studies",
        c: "Small size systems",
        d: "Both (a) and (b)"
      },
      correctAnswer: "d"
    },
    {
      question: "Line data of a 2-bus network are:<br><table><thead><tr><th>Element number</th><th>From bus</th><th>To bus</th><th>Impedance</th></tr></thead><tbody><tr><td>1</td><td>0</td><td>1</td><td>j 0.1</td></tr><tr><td>2</td><td>1</td><td>2</td><td>j 0.2</td></tr></tbody></table><br>Its Z<sub>bus</sub> matrix is",
      answers: {
        a: "<img src=\"../Power System Simulation lab/6_Power Flow Analysis by Fast Decoupled Power Flow method/experiment/images/Post_A4_A.png\"\/>",
        b: "<img src=\"../Power System Simulation lab/6_Power Flow Analysis by Fast Decoupled Power Flow method/experiment/images/Post_A4_B.png\"\/>",
        c: "<img src=\"../Power System Simulation lab/6_Power Flow Analysis by Fast Decoupled Power Flow method/experiment/images/Post_A4_C.png\"\/>",
        d: "<img src=\"../Power System Simulation lab/6_Power Flow Analysis by Fast Decoupled Power Flow method/experiment/images/Post_A4_D.png\"\/>"
      },
      correctAnswer: "b"
    },
    {
      question: "The bus admittance matrix of a 3-bus power system with bus 1 as slack bus is<br><img src=\"../Power System Simulation lab/6_Power Flow Analysis by Fast Decoupled Power Flow method/experiment/images/Post_Q5.png\"\/><br>The matrix B' is",
      answers: {
        a: "<img src=\"../Power System Simulation lab/6_Power Flow Analysis by Fast Decoupled Power Flow method/experiment/images/Post_A5_A.png\"\/>",
        b: "<img src=\"../Power System Simulation lab/6_Power Flow Analysis by Fast Decoupled Power Flow method/experiment/images/Post_A5_B.png\"\/>",
        c: "<img src=\"../Power System Simulation lab/6_Power Flow Analysis by Fast Decoupled Power Flow method/experiment/images/Post_A5_C.png\"\/>",
        d: "<img src=\"../Power System Simulation lab/6_Power Flow Analysis by Fast Decoupled Power Flow method/experiment/images/Post_A5_D.png\"\/>"
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

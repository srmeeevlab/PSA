
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
      question: "To arrive at p.u impedance illustration of a overall power system",
      answers: {
        a: "Base MVA of different components will be different",
        b: "Base MVA of different components will be same while base voltages depend on transformer voltage ratios",
        c: "Base MVA and base voltages of different components will be different",
        d: "Base MVA and base voltages of different components will be same"
      },
      correctAnswer: "b"
    },
    {
      question: "What is the equation to compute the (kV)<sub>B</sub> on the LT section?",
      answers: {
        a: "(kV)<sub>B</sub> on HT section * (HT voltage rating) / (LT voltage rating)",
        b: "(kV)<sub>B</sub> on LT section * (HT voltage rating) / (LT voltage rating)",
        c: "(kV)<sub>B</sub> on HT section * (LT voltage rating) / (HT voltage rating)",
        d: "(kV)<sub>B</sub> on LT section * (LT voltage rating) / (HT voltage rating)"
      },
      correctAnswer: "c"
    },
    {
      question: "Corresponding to a load power of (P<sub>L</sub> + jQ<sub>L</sub>) p.u. and a load voltage of V<sub>L</sub> p.u., the per unit load impedance is",
      answers: {
        a: "P<sub>L</sub> - jQ<sub>L</sub> / |V|<sup>2</sup>",
        b: "P<sub>L</sub> + jQ<sub>L</sub> / |V|<sup>2</sup>",
        c: "|V|<sup>2</sup> / P<sub>L</sub> + jQ<sub>L</sub>",
        d: "|V|<sup>2</sup> / P<sub>L</sub> - jQ<sub>L</sub>"
      },
      correctAnswer: "d"
    },
    {
      question: "Which one of the following plays dominant role in the representation of synchronous generator?",
      answers: {
        a: "Leakage reactance of armature winding",
        b: " Reactance due to armature reaction",
        c: "Leakage reactance of field winding",
        d: "Resistance of the armature winding"
      },
      correctAnswer: "b"
    },
    {
      question: "The number of regional loading dispatching centers in India is",
      answers: {
        a: "4",
        b: "29",
        c: "5",
        d: "30"
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

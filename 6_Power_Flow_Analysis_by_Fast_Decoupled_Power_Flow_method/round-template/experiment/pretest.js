
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

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question: "Fast decoupled power flow model is developed for a 14-bus power system that has 9 P-Q buses and 4 P-V buses. Matrix B’ will be of size",
      answers: {
        a: "4 x 4",
        b: "5 x 5",
        c: "9 x 9",
        d: "13 x 13"
      },
      correctAnswer: "c"
    },
    {
      question: "The power balance equation in power flow studies will be",
      answers: {
        a: "Power consumed by PV bus = power generated by load bus+ system losses accounted by slack bus",
        b: "Power generated by PV bus = power consumed by load bus+ system losses accounted by slack bus",
        c: "Power generated by load bus = power consumed by PV bus",
        d: "Power generated by PV bus = power consumed by load bus"
      },
      correctAnswer: "b"
    },
    {
      question: "The solution of load flow by means of FDLF method is",
      answers: {
        a: "[(Δ P) / E] = [B' ] [Δ δ]",
        b: "[(Δ Q) / E] = [B'' ] [Δ E]",
        c: "[(Δ P) / E] = [B'' ] [Δ δ]",
        d: "Both (a) and (b)"
      },
      correctAnswer: "d"
    },
    {
      question: "While carrying out fast decoupled power flow analysis at every iteration two sets of linear equations are to be solved. One set is",
      answers: {
        a: "B'&#916;δ = &#916;P/|V|",
        b: "B'&#916;|V| = &#916;P/|V|",
        c: "B'&#916;δ = &#916;Q/|V|",
        d: "B'&#916;|V| = &#916;Q/|V|"
      },
      correctAnswer: "a"
    },
    {
      question: "While carrying out fast decoupled power flow analysis at every iteration two sets of linear equations are to be solved. One set is",
      answers: {
        a: "B' &Delta;&delta;=&Delta;P / |V| and B'' &Delta;|V|=&Delta;Q / |V|",
        b: "B' &Delta;&delta; = &Delta;P and B'' &Delta;|V| = &Delta;Q",
        c: "B' &Delta;&delta; = &Delta;P / |V| and B'' &Delta;|V| = &Delta;Q",
        d: "B' &Delta;&delta; = &Delta;P and B'' &Delta;|V| = &Delta;Q / |V|"
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

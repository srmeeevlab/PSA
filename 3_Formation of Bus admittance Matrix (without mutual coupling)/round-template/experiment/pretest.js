
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
      question: "A network has 7 elements connected across 5 buses. Its primitive admittance matrix has the dimension of",
      answers: {
        a: "5 x 5",
        b: "5 x 7",
        c: "7 x 5",
        d: "7 x 7"
      },
      correctAnswer: "d"
    },
    {
      question: "For a three-bus power network, the bus admittance matrix is<br>Y<sub>11</sub> = -j10<br>Y<sub>12</sub> = -j10<br>Y<sub>13</sub> =  j2<br>Y<sub>21</sub> =  j8<br>Y<sub>22</sub> =  j2<br>Y<sub>23</sub> = -j15<br>Y<sub>31</sub> =  j12<br>Y<sub>32</sub> =  j8<br>Y<sub>33</sub> = -j20<br>Which one of the following is correct?",
      answers: {
        a: "There is a shunt element at bus 1 alone",
        b: "There is a shunt element at bus 2 alone",
        c: "There is a shunt element at bus 3 alone",
        d: "There are shunt elements at buses 1 and 3"
      },
      correctAnswer: "b"
    },
    {
      question: "In an off-nominal transformer with off nominal setting a and bus k as the tap side and bus m as the load side, the two diagonal elements in the bus admittance representation are",
      answers: {
        a: "y and (y/a<sup>2</sup>) corresponding to buses k and m respectively",
        b: "(y/a) and – y corresponding to buses k and m respectively",
        c: "– y and (y/a) corresponding to buses k and m respectively",
        d: "(y/a<sup>2</sup>) and y corresponding to buses k and m respectively"
      },
      correctAnswer: "d"
    },
    {
      question: "For n bus power system, the size of Ybus matrix is ",
      answers: {
        a: "(n-1)×(n-1)",
        b: "(n-2)×(n-2)",
        c: "n×n",
        d: "(n-1)×(n-2)"
      },
      correctAnswer: "c"
    },
    {
      question: "Bus admittance matrix of a network without mutual coupling is computed. The orientation of element 3-4 is changed. In the new bus admittance matrix",
      answers: {
        a: "value of element Y<sub>33</sub> will change",
        b: "value of element Y<sub>44</sub> will change",
        c: "value of element Y<sub>34</sub> will change",
        d: "values remain unchanged"
      },
      correctAnswer: "d"
    } //Dont add comma here
  ];

// ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();

const boxQuestion = document.querySelector("#box-question")
const nextBtn = document.getElementById("next-question");
const title = document.getElementById("title");
const options = document.getElementById("options");
const displayLength = document.getElementById("length");

let currQuiz = 0;
let score = 0;

function nextQuestion(data) {
  if (currQuiz < data.length - 1 ) {
    currQuiz++;
    console.log(currQuiz)
  } else {
    nextBtn.disabled = true;
  }
}

function check(i, data) {
  if(i === data.correctAnswer) {
    score++
  }
}

const displayQuestion = (quiz) => {
  return`
  <h2>${quiz[currQuiz].question}</h2>
  `
}

const displayOptions = (option) => {
  return`
    <button onclick="e => check(e)">${option}</button>
  `
};


function updateQuestion(data,optionCard) {
  const randomOption = [data[currQuiz].correctAnswer, ...data[currQuiz].incorrectAnswers].sort(() => Math.random() - 0.5);

  title.innerHTML = displayQuestion(data);
  randomOption.forEach(option => optionCard += displayOptions(option));
  options.innerHTML = optionCard;

  displayLength.innerHTML = `1 / ${currQuiz + 1}`
}

async function getQuizzes() {
  try {
    let optionCard = "";
    let req = await fetch("https://the-trivia-api.com/api/questions?limit=5");
    let resp = await req.json();
    
    // const randomOption = [resp[currQuiz].correctAnswer, ...resp[currQuiz].incorrectAnswers].sort(() => Math.random() - 0.5);
    // title.innerHTML = displayQuestion(resp);
    // randomOption.forEach(option => optionCard += displayOptions(option));
    // options.innerHTML = optionCard;

    updateQuestion(resp, optionCard)
    
    nextBtn.addEventListener("click", () => {
      nextQuestion(resp);
      updateQuestion(resp, optionCard)
    });


    console.log(resp)
  } catch(err) {
    console.log("ayam!")
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  await getQuizzes()
})  
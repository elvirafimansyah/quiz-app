const boxQuestion = document.querySelector("#box-question")
const nextBtn = document.getElementById("next-question");
const prevBtn = document.getElementById("prev-question");
const title = document.getElementById("title");
const options = document.getElementById("options");
const displayLength = document.getElementById("length");
const displayScore = document.getElementById("score");


console.log(options)

let currQuiz = 0;
let score = 0;

function nextQuestion(data) {
  if (currQuiz < data.length - 1) {
    currQuiz++;
    console.log(currQuiz)
  }
}




const displayQuestion = (quiz) => {
  return `
  <h2>${quiz[currQuiz].question}</h2>
  `
}

const displayOptions = (option, index) => {
  return `
    <li>
      <input type="radio" id="${option}" name="option" value="${option}" class="hidden peer opp" required>
      <label for="${option}"
        class="inline-flex justify-between items-center w-96 p-5 m-2 text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
        <div class="block">
          <div class="w-full text-lg font-semibold">${option}</div>
        </div>
      </label>
    </li>
  `
}

function updateQuestion(data, optionCard) {
  const randomOption = [data[currQuiz].correctAnswer, ...data[currQuiz].incorrectAnswers].sort(() => Math.random() - 0.5);

  title.innerHTML = displayQuestion(data);
  randomOption.forEach((option, i) => optionCard += displayOptions(option, i));
  options.innerHTML = optionCard;


  const eOption = document.querySelectorAll(".opp");

  eOption.forEach((e) => {
    e.addEventListener("click", e => {
      const value = e.target.value;
      if (data[currQuiz].correctAnswer === value) {
        score++;
        displayScore.innerHTML = score;

      }
    });
  })

  displayLength.innerHTML = `${currQuiz + 1} / ${data.length}`

}

async function getQuizzes() {
  let optionCard = "";
  let req = await fetch("https://the-trivia-api.com/api/questions?limit=5");
  let resp = await req.json();

  updateQuestion(resp, optionCard)

  nextBtn.addEventListener("click", () => {
    nextQuestion(resp);
    updateQuestion(resp, optionCard)
  });


  console.log(resp)

}

document.addEventListener("DOMContentLoaded", async () => {
  await getQuizzes()
})


//add
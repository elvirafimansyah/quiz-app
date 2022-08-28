const boxQuestion = document.querySelector("#box-question")
const nextBtn = document.getElementById("next-question");
const prevBtn = document.getElementById("prev-question");
const title = document.getElementById("title");
const options = document.getElementById("options");
const displayLength = document.getElementById("length");


console.log(options)

let currQuiz = 0;
let score = 0;
let resp;
let optionCard = "";
let req;

function check(select, element) {
  console.log(select);
  console.log(element);
  if(select == resp[currQuiz].correctAnswer) {
    score++
  }
}


const displayOptions = (option, data) => {
  return`
      <li>
        <input type="radio" id="${option}" name="option" value="${option}" class="hidden peer"required onclick="check(this.value,this)">
        <label for="${option}"
          class="inline-flex justify-between items-center w-96 p-5 m-2 text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
          <div class="block">
            <div class="w-full text-lg font-semibold">${option}</div>
          </div>
        </label>  
      </li>
  `
};

const displayQuestion = (quiz) => {
  return`
    <h2>${quiz[currQuiz].question}</h2>
  `
}

function updateQuestion(data, optionCard) {
  const randomOption = [data[currQuiz].correctAnswer, ...data[currQuiz].incorrectAnswers].sort(() => Math.random() - 0.5);


  title.innerHTML = displayQuestion(data);
  randomOption.forEach((option, i) => optionCard += displayOptions(option, data));
  options.innerHTML = optionCard;

  displayLength.innerHTML = `${currQuiz + 1} / ${data.length}`
}

async function getQuizzes() {
    req = await fetch("https://the-trivia-api.com/api/questions?limit=5");
    resp = await req.json();
    
    
    
    updateQuestion(resp, optionCard)
    
    nextBtn.addEventListener("click", () => {
       if (currQuiz < resp.length - 1 ) {
        currQuiz++;
        console.log(currQuiz)
      }
      updateQuestion(resp, optionCard)
    });

    prevBtn.addEventListener("click", () => {
      currQuiz--;
      updateQuestion(resp, optionCard)
    });

    console.log(resp)
}


document.addEventListener("DOMContentLoaded", async () => {
  await getQuizzes()
})  
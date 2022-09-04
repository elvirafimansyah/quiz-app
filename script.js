// Home Section
const sectionQuiz = document.getElementById("quiz");
const sectionHome = document.getElementById("home"); 
const category = document.getElementById('select-category');
const diffucult = document.getElementById("select-difficulty");
// Quiz Section
const boxQuestion = document.querySelector("#box-question")
const nextBtn = document.getElementById("next-question");
const submitBtn = document.getElementById("submit-btn");
const quitBtn = document.getElementById("quit-btn");
const title = document.getElementById("title");
const options = document.getElementById("options");
const displayLength = document.getElementById("length");
const displayScore = document.getElementById("score");

// Home Function
// * category
const categories_data = [
  {
    name: "Arts & Literature",
    category: "arts_and_literature"
  },
  {
    name: "Film & TV",
    category: "film_and_tv"
  },
  {
    name: "Food & Drink",
    category: "food_and_drink"
  },
  {
    name: "General Knowledge",
    category: "general_knowledge"
  },
  {
    name: "Geography",
    category: "geography"
  }, 
  {
    name: "History",
    category: "history"
  },
  {
    name: "Music",
    category: "music"
  },
  {
    name: "Science",
    category: "science"
  },
  {
    name: "Society & Culture",
    category: "society_and_culture"
  },
  {
    name: "Sport & Leisure",
    category: "sport_and_leisure"
  },
]

const categoryOptions = (data) => {
  return `
    <option value="${data.category}" >${data.name}</option>
  `
}

function showCategory() {
  let categoryE = "";
  categories_data.forEach(data => categoryE += categoryOptions(data));
  category.innerHTML += categoryE;
}


// *diffuculty
const diff_list = ["easy", "medium", "hard"];
const difOptionUI = (data) => {
  return`
    <option value="${data}" >${data.charAt(0).toUpperCase()}${data.substr(1).toLowerCase()}</option>
  `
}

let diffE = "";
diff_list.forEach((list) => diffE += difOptionUI(list));
diffucult.innerHTML += diffE;


category.addEventListener("click", async e => {
  let currOptionCategory = category.options[category.selectedIndex].value;
  category.dataset.value =  currOptionCategory; 
})
diffucult.addEventListener("click", e => {
  let currOptionDiff = diffucult.options[diffucult.selectedIndex].value;
  diffucult.dataset.value = currOptionDiff;
});


//*play 
const playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", async () => {
  sectionQuiz.classList.remove("hidden");
  sectionHome.classList.add("hidden");

  let categoryValues = category.dataset.value;
  let diffucultValues = diffucult.dataset.value;

  if (categoryValues && diffucultValues !== "") {
    await getQuizzes(diffucultValues, categoryValues)
  } else {
    nextBtn.classList.add("hidden");
    submitBtn.classList.add("hidden");
    displayScore.classList.add("hidden");

  }

})

// Quiz Function

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


function updateQuestion(data, optionCard) {
  const randomOption = [data[currQuiz].correctAnswer, ...data[currQuiz].incorrectAnswers].sort(() => Math.random() - 0.5);

  title.innerHTML = displayQuestion(data);
  randomOption.forEach((option, i) => optionCard += displayOptions(option, i));
  options.innerHTML = optionCard;


  const eOption = document.querySelectorAll(".radio-option");

  eOption.forEach((e) => {
    e.addEventListener("click", e => {
      const value = e.target.value;
      if (data[currQuiz].correctAnswer === value) {
        score++;
        e.disabled = true;
        displayScore.innerHTML = score;
      }
    });
  })

  displayLength.innerHTML = `${currQuiz + 1} / ${data.length}`
}


async function getQuizzes(diffucult="", category="") {
  let optionCard = "";
  let req = await fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=5&difficulty=${diffucult}`);
  let resp = await req.json();

  updateQuestion(resp, optionCard)

  nextBtn.addEventListener("click", () => {
    nextQuestion(resp);
    updateQuestion(resp, optionCard)
  });

  console.log(resp)
}

document.addEventListener("DOMContentLoaded", async () => {
  showCategory()
 
})

function quit() {
  window.location.reload()

}

const displayOptions = (option, index) => {
  return `
    <li>
      <input type="radio" id="${option}" name="option" value="${option}" class="hidden peer radio-option" required>
      <label for="${option}"
        class="inline-flex justify-between items-center w-96 p-5 m-2 text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
        <div class="block">
          <div class="w-full text-lg font-semibold">${option}</div>
        </div>
      </label>
    </li>
  `
}


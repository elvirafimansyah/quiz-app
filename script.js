// Name Section
const sectionName = document.getElementById("name") 
const inputName = document.getElementById("input-name");
const submitNameBtn = document.getElementById("submit-name");
const displayName = document.getElementById("text-name");
const preview = document.getElementById("preview-profile");
const inputProfile = document.getElementById("input-profile");
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
const profileName = document.getElementById("profile-name")
const profileImage = document.querySelectorAll("#profile-img");
const displayCategory = document.getElementById("display-category");
const displayDiffuculty = document.getElementById("display-diffuculty");
// Score Section
const sectionScore = document.getElementById("end");

// Name Function
submitNameBtn.addEventListener('click', () => {
  let name = inputName.value;
  name = name.split(" ")              // Memenggal nama menggunakan spasi
    .map(nama =>
      nama.charAt(0).toUpperCase() +
      nama.slice(1))                 // Ganti huruf besar kata-kata pertama
    .join(" "); 
  sectionHome.classList.remove("hidden");
  sectionName.classList.add("hidden");
  displayName.innerHTML = `
    <div class="flex">
      <img src="${preview.src}" class="w-10 h-10 rounded-full"/> &nbsp; 
      <h3>${name}</h3> 
    </div>
  `;    

  profileName.innerHTML = name + `&nbsp`;
  for(let i =0; i < profileImage.length; i++) {
    profileImage[i].src = preview.src;
  } 

})


function previewProfile(image) {
  if(image.target.files.length > 0) {
    let src = URL.createObjectURL(image.target.files[0]);
    preview.src = src;
    preview.style.width = '100px';
  }
}


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
    <option value="${data.category}" data-name="${data.name}">${data.name}</option>
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


category.addEventListener("click", async () => {
  let currOptionCategory = category.options[category.selectedIndex].value;
  const currOptionNameCategory = category.options[category.selectedIndex].dataset.name;
  category.dataset.value =  currOptionNameCategory;
  displayCategory.innerHTML = currOptionNameCategory;
})
diffucult.addEventListener("click", () => {
  let currOptionDiff = diffucult.options[diffucult.selectedIndex].value;
  diffucult.dataset.value = currOptionDiff;
  displayDiffuculty.innerHTML = currOptionDiff;
});


//*play 
const playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", async () => {
  sectionQuiz.classList.remove("hidden");
  sectionHome.classList.add("hidden");

  let categoryValues = category.dataset.value;
  let diffucultValues = diffucult.dataset.value;

  // displayCategory.innerHTML = category.options[category.selectedIndex].value;

  if (categoryValues && diffucultValues !== "") {
    await getQuizzes(diffucultValues, categoryValues)
  } else {
    nextBtn.classList.add("hidden");
    submitBtn.classList.add("hidden");
    displayScore.classList.add("hidden");
    quitBtn.innerText = "try again"
  }

})

// Quiz Function

let currQuiz = 0;
let score = 0;

function nextQuestion(data) {
  if (currQuiz < data.length - 1) {
    currQuiz++;
    console.log(currQuiz)
    if(currQuiz === 4) {
      console.log("yey!");
      nextBtn.classList.add("hidden");
      submitBtn.classList.remove("hidden");
    }
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

  displayLength.innerHTML = `Question ${currQuiz + 1} / ${data.length}`
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

submitBtn.addEventListener("click", () => {
  sectionQuiz.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", async () => {
  showCategory()
  inputName.focus();
})

function quit() {
  window.location.reload()

}

const displayOptions = (option, index) => {
  return `
    <li>
      <input type="radio" id="${option}" name="option" value="${option}" class="hidden peer radio-option" required>
      <label for="${option}"
        class="inline-flex justify-between  items-center w-96 p-5 m-2 text-white bg-glass-2 rounded-lg border border-gray-200 cursor-pointer peer-checked:border-red-400 peer-checked:text-red-400 hover:text-red-400 hover:bg-gray-100">
        <div class="block">
          <div class="w-full text-lg font-semibold">${option}</div>
        </div>
      </label>
    </li>
  `
}
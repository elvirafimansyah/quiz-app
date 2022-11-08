// Navbar Section
const signOutBtn = document.getElementById("signout-btn");
const contEditName = document.querySelector("#edit-name");
// Name Section
const sectionName = document.getElementById("name")
const inputName = document.getElementById("input-name");
const submitNameBtn = document.getElementById("submit-name");
const displayName = document.querySelectorAll("#text-name");
const preview = document.getElementById("preview-profile");
const inputProfile = document.getElementById("input-profile");
const formName = document.getElementById("form-name");
// Home Section
const sectionQuiz = document.getElementById("quiz");
const sectionHome = document.getElementById("home");
const category = document.getElementById('select-category');
const diffucult = document.getElementById("select-difficulty");
const limit = document.getElementById("input-limit");
const formPlay = document.getElementById("formPlay")
// Quiz Section
const boxQuestion = document.querySelector("#box-question")
const nextBtn = document.getElementById("next-question");
const submitBtn = document.getElementById("submit-btn");
const quitBtn = document.getElementById("quit-btn");
const title = document.getElementById("title");
const options = document.getElementById("options");
const displayLength = document.getElementById("length");
const displayScore = document.getElementById("score");
const profileName = document.querySelectorAll("#profile-name")
const profileImage = document.querySelectorAll("#profile-img");
const displayCategory = document.getElementById("display-category");
const displayDiffuculty = document.getElementById("display-diffuculty");
const modalText = document.getElementById("popup-text")
// Score Section
const sectionScore = document.getElementById("end");
const scoreName = document.querySelector("#score-name");
const shareBtn = document.getElementById("share-btn");
const correctBar = document.getElementById("progress-correct");
const displayCorrect = document.getElementById("display-correct");
const displayIncorrect = document.getElementById('display-incorrect');
const playAgainBtn = document.getElementById('playagain-btn');
// footer
const footer = document.querySelector("footer")

// Music Function
const musicBtn = document.getElementById("music-btn");
musicBtn.addEventListener("click", () => {
  const musicAudio = document.getElementById("music-audio");
  const musicIcon = document.getElementById("music-icon")
  if (musicAudio.paused) {
    musicAudio.play();
    musicIcon.src = "src/img/volume.png"
  } else {
    musicAudio.pause();
    musicIcon.src = "src/img/volume-mute.png"
  }
})

// Profile Image
document.getElementById("profile").addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    localStorage.setItem("src", reader.result)
    preview.src = reader.result;
    preview.style.width = '100px';
  })
  reader.readAsDataURL(this.files[0])
})

function genereteURL(name) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var idLength = 5;
  var id = "";
  for (var i = 0; i <= idLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    id += chars.substring(randomNumber, randomNumber + 1);
  }
  const params = new URLSearchParams(location.search);
  params.set(`name`, `${name}`)
  params.set(`id`, `${id}`)
  window.history.replaceState({}, '', location.pathname + '?' + params + '?result_score');
}

submitNameBtn.addEventListener('click', () => {
  let name = inputName.value;
  name = name.split(" ")              // Memenggal nama menggunakan spasi
    .map(nama =>
      nama.charAt(0).toUpperCase() +
      nama.slice(1))                 // Ganti huruf besar kata-kata pertama
    .join(" ");

  localStorage.setItem("name", name);
  showName()  

  // edit name

  sectionHome.classList.remove("hidden");
  sectionName.classList.add("hidden");
  
  genereteURL(name)
})

// // Home Function
// // * category
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

let categoryE = "";
categories_data.forEach(data => categoryE += categoryOptions(data));
category.innerHTML += categoryE;


// *diffuculty
const diff_list = ["easy", "medium", "hard"];
const difOptionUI = (data) => {
  return `
    <option value="${data}" >${data.charAt(0).toUpperCase()}${data.substr(1).toLowerCase()}</option>
  `
}

let diffE = "";
diff_list.forEach((list) => diffE += difOptionUI(list));
diffucult.innerHTML += diffE;


category.addEventListener("click", async () => {
  let currOptionCategory = category.options[category.selectedIndex].value;
  const currOptionNameCategory = category.options[category.selectedIndex].dataset.name;
  category.dataset.value = currOptionCategory;
  displayCategory.innerHTML = currOptionNameCategory;
})
diffucult.addEventListener("click", () => {
  let currOptionDiff = diffucult.options[diffucult.selectedIndex].value;
  diffucult.dataset.value = currOptionDiff;
  displayDiffuculty.innerHTML = currOptionDiff;
});


// //*play 
const playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", async () => {
  sectionQuiz.classList.remove("hidden");
  sectionHome.classList.add("hidden");
  footer.classList.remove("fixed")
  let categoryValues = category.dataset.value;
  let diffucultValues = diffucult.dataset.value;
  let limitValues = limit.value;

  if (categoryValues && diffucultValues !== "" && limitValues <= 20 && limitValues > 1) {
    await getQuizzes(diffucultValues, categoryValues, limitValues)
  } else {
    nextBtn.classList.add("hidden");
    submitBtn.classList.add("hidden");
    displayScore.classList.add("hidden");
    quitBtn.innerText = "Try Again";
    modalText.innerText = "Are you sure you want to try again?";
    footer.classList.add("fixed")
    options.innerHTML = `<div class="p-4 mb-4 text-md lg:text-xl text-red-700 bg-red-100 rounded-lg" role="alert">
      <span class="font-medium">Please try again!</span> Category, Diffuculty, Limit must be filled out. 
    </div>
    <div class="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg " role="alert">
      <span class="font-medium">Limit Values must be less than 20 and more than 1</span> 
    </div>
    `

    category.value = "";
    diffucult.value = "";
    limit.value = ""
  }
})

// Quiz Function
let currQuiz = 0;
let score = 0;

function nextQuestion(data) {
  if (currQuiz < data.length - 1) {
    currQuiz++;
  }
  if (currQuiz === data.length - 1) {
    console.log("yey!");
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  }
}


const displayQuestion = (quiz) => {
  return `
  <h2>${quiz[currQuiz].question}</h2>
  `
}


function updateQuestion(data, optionCard, amount) {
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
      }
    });
  })

  displayLength.innerHTML = `${currQuiz + 1} / ${amount}`;
}

async function getQuizzes(diffucult = "", category = "", limit) {
  let optionCard = "";
  let req = await fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=${limit}&difficulty=${diffucult}`);
  let resp = await req.json();

  updateQuestion(resp, optionCard, resp.length)

  nextBtn.addEventListener("click", () => {
    nextQuestion(resp);
    updateQuestion(resp, optionCard, resp.length)
  });

  submitBtn.addEventListener("click", () => {
    sectionQuiz.classList.add("hidden");
    sectionScore.classList.remove("hidden")
    //save data
    let percentScore = ((score / resp.length) * 100).toFixed(0)
    let incorrectScore = resp.length - score

    const objectResult = addResult(
      percentScore,
      score,
      incorrectScore,
      new Date().toLocaleString()
    )

    displayResultElement(objectResult)
  });
}

const scoreResult = JSON.parse(localStorage.getItem("data_result")) || [];

function addResult(score, correct, incorrect, createAt, total) {
  scoreResult.push({
    score,
    correct,
    incorrect,
    createAt,
    total
  })

  localStorage.setItem("data_result", JSON.stringify(scoreResult))

  return { score, correct, incorrect, createAt, total }
}

function displayResultElement({ score, correct, incorrect }) {
  correctBar.style.width = `${score}% `
  displayScore.innerHTML = `${score}%`;
  displayCorrect.textContent = correct;
  displayIncorrect.innerHTML = `${incorrect}`
}

scoreResult.forEach(displayResultElement)

function showName() {
  for (let i = 0; i < displayName.length; i++) {
    displayName[i].innerHTML = `
        <div class="flex">
          <img src="${localStorage.getItem("src")}" class="w-10 h-10 rounded-full"/> &nbsp; 
          <h3>${localStorage.getItem("name")}</h3> 
        </div>
      `;
  }

  profileImage.forEach(image => {
    image.src = localStorage.getItem("src");
  })

  profileName.forEach(name =>{
    name.innerHTML = localStorage.getItem("name") + `&nbsp`;
  })

  // Edit Name
  // Container Button edit & ok

  const content = document.createElement("div");
  content.classList.add("flex", "items-center")
  // button edit
  const edit = document.createElement("button");
  edit.classList.add("bg-salmon", "p-2", "rounded-md", "mr-2");
  edit.setAttribute("title", "edit name")
  edit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
  </svg>`
  // button ok
  const ok = document.createElement("button");
  ok.innerHTML = "OK"
  ok.classList.add("bg-blue-500", "px-2", "py-1.5", "rounded-md", "mr-2","hidden", "text-white");
  // button cancel
  const cancel = document.createElement("button");
  cancel.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
  </svg>`;
  cancel.classList.add("bg-red-500", "p-2", "rounded-md", "hidden")  
  // element content insert edit dan okay element 
  content.appendChild(edit)
  content.appendChild(ok)
  content.appendChild(cancel)
  contEditName.innerHTML = `
  <input type="text" class="border-none outline-none appearance-none cursor-intial pointer-events-none p-0  focus:outline-none focus:border-none select-none w-2/3 font-medium mr-2" style=":focus: outline-none " value="${localStorage.getItem("name")}" readonly>
  `
  // element contEditName insert content
  contEditName.appendChild(content)

  edit.addEventListener("click", () => {
    const input = contEditName.querySelector("input");
    input.removeAttribute("readonly")
    input.focus()
    input.classList.remove("pointer-events-none")
    ok.classList.remove('hidden')
    cancel.classList.remove("hidden")
    input.addEventListener('blur', (e) => {
      input.setAttribute('readonly', true);
      const currentName = e.target.value;
      ok.addEventListener("click", () => {
        if (currentName !== "") {
          localStorage.setItem('name', currentName);
          showName()
        } else {
          showName()
        }
      })
      cancel.addEventListener('click', () => {
        showName()
      });
    }) 
  })
};

document.addEventListener('DOMContentLoaded', function () {
  inputName.focus();
  if (localStorage.getItem("name") || localStorage.getItem("src")) {
    showName()
  } else {
    sectionName.classList.toggle("hidden");
    sectionHome.classList.add('hidden')
  }
});

function saveScoreResult() {
  if (localStorage.getItem("data_result")) {
    sectionHome.classList.add("hidden");
    footer.classList.remove("fixed")
  } else {
    sectionScore.classList.add("hidden");
  }
}

saveScoreResult()

function quit() {
  window.location.reload()
}

const backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", () => {
  localStorage.clear()
  sectionName.classList.remove("hidden")
  window.location.reload()
});

playAgainBtn.addEventListener("click", () => {
  sectionScore.classList.add("hidden");
  sectionHome.classList.remove("hidden");
  footer.classList.add("fixed")
  category.value = "";
  diffucult.value = "";
  limit.value = ""
})

let click = 0;
const capture = document.querySelector(".end");
const result = document.querySelector(".result");
function convert() {
  click++
  html2canvas(capture).then(function (canvas) {
    if (click === 1) {
      result.append(canvas)
    }
    let cvs = document.querySelector("canvas");
    let dataURI = cvs.toDataURL("image/jpeg");
    let downloadLink = document.querySelector(".result>a");
    downloadLink.href = dataURI;
    downloadLink.download = "score.jpg";
    console.log(dataURI);
  });
  result.style.display = "block";
}



// Signout
signOutBtn.onclick = () => {
  localStorage.clear()
  quit()
}

const displayOptions = (option, index) => {
  return `
    <li>
      <input type="radio" id="${option}" name="option" value="${option}" class="hidden peer radio-option" required>
      <label for="${option}"
        class="inline-flex justify-between items-center w-96 p-5 m-2 text-white bg-glass-2 rounded-lg border border-gray-200 cursor-pointer peer-checked:border-red-400 peer-checked:text-red-400 hover:text-red-400 hover:bg-gray-100">
        <div class="block">
          <div class="w-full text-smmd:text-lg font-semibold word-break">${option}</div>
        </div>
      </label>
    </li>
  `
}



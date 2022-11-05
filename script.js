// Navbar Section
const signOutBtn = document.getElementById("signout-btn");
// Name Section
const sectionName = document.getElementById("name")
const inputName = document.getElementById("input-name");
const submitNameBtn = document.getElementById("submit-name");
const displayName = document.getElementById("text-name");
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
const profileName = document.getElementById("profile-name")
const profileImage = document.querySelectorAll("#profile-img");
const displayCategory = document.getElementById("display-category");
const displayDiffuculty = document.getElementById("display-diffuculty");
const modalText = document.getElementById("popup-text")
// Score Section
const sectionScore = document.getElementById("end");
const scoreName = document.querySelectorAll("#score-name");
const shareBtn = document.getElementById("share-btn");
const correctBar = document.getElementById("progress-correct");
const displayCorrect = document.getElementById("display-correct");
const displayIncorrect = document.getElementById('display-incorrect');
const playAgainBtn = document.getElementById('playagain-btn');

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
document.getElementById("profile").addEventListener("change", function(){
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    console.log(reader.result)
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

// shareBtn.addEventListener("click", async () => {
//   const shareData = {
//     title: `${window.document.title}`,
//     url: `${window.document.location.href}`
//   }
//   try {
//     await navigator.share(shareData);
//     console.log("berhasil")
//   } catch (err) {
//     console.error("error")
//   }
// })


submitNameBtn.addEventListener('click', () => {
  let name = inputName.value;
  name = name.split(" ")              // Memenggal nama menggunakan spasi
    .map(nama =>
      nama.charAt(0).toUpperCase() +
      nama.slice(1))                 // Ganti huruf besar kata-kata pertama
    .join(" ");

  localStorage.setItem("name", name);
  showName()

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

  let categoryValues = category.dataset.value;
  let diffucultValues = diffucult.dataset.value;
  let limitValues = limit.value;

  if (categoryValues && diffucultValues !== "") {
    await getQuizzes(diffucultValues, categoryValues, limitValues)
  } else {
    nextBtn.classList.add("hidden");
    submitBtn.classList.add("hidden");
    displayScore.classList.add("hidden");
    quitBtn.innerText = "try again";
    modalText.innerText = "Are you sure you want to try again?"
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
      incorrectScore
    )
  
    displayResultElement(objectResult)
  });
}

const scoreResult = JSON.parse(localStorage.getItem("data_result")) || [];

function addResult(score, correct, incorrect) {
  scoreResult.push({
    score,
    correct,
    incorrect
  })

  localStorage.setItem("data_result", JSON.stringify(scoreResult))

  return { score, correct, incorrect }
}

function displayResultElement({ score, correct, incorrect }) {
  correctBar.style.width = `${score}% `
  displayScore.innerHTML = `${score}%`;
  displayCorrect.textContent = correct;
  displayIncorrect.innerHTML = `${incorrect}`
}

scoreResult.forEach(displayResultElement)

function showName() {
  displayName.innerHTML = `
      <div class="flex">
        <img src="${localStorage.getItem("src")}" class="w-10 h-10 rounded-full"/> &nbsp; 
        <h3>${localStorage.getItem("name")}</h3> 
      </div>
    `;

  for (let i = 0; i < profileImage.length; i++) {
    profileImage[i].src = localStorage.getItem("src");
  }
  profileName.innerHTML = localStorage.getItem("name") + `&nbsp`;
  
  scoreName.forEach(name => {
    name.innerHTML = localStorage.getItem("name")
  })
};

document.addEventListener('DOMContentLoaded', function () {
  inputName.focus();
  if (localStorage.getItem("name") || localStorage.getItem("src")) {
    showName()
  } else if (!localStorage.getItem("name") ) {
    sectionName.classList.remove("hidden");
    sectionHome.classList.add('hidden')
  } 
});

if (localStorage.getItem("data_result")) {
  sectionHome.classList.add("hidden")
  console.log("sementara!")
} else {
  sectionScore.classList.add("hidden");
}

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
})



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
        class="inline-flex justify-between  items-center w-96 p-5 m-2 text-white bg-glass-2 rounded-lg border border-gray-200 cursor-pointer peer-checked:border-red-400 peer-checked:text-red-400 hover:text-red-400 hover:bg-gray-100">
        <div class="block">
          <div class="w-full text-lg font-semibold">${option}</div>
        </div>
      </label>
    </li>
  `
}

// setUpDownloadPageAsImage();

// function setUpDownloadPageAsImage() {
//   shareBtn.addEventListener("click", function () {
//     html2canvas(document.body).then(function (canvas) {
//       console.log(canvas);
//       simulateDownloadImageClick(canvas.toDataURL(), 'file-name.png');
//     });
//   });
// }

// function simulateDownloadImageClick(uri, filename) {
//   var link = document.createElement('a');
//   if (typeof link.download !== 'string') {
//     window.open(uri);
//   } else {
//     link.href = uri;
//     link.download = filename;
//     accountForFirefox(clickLink, link);
//   }
// }

// function clickLink(link) {
//   link.click();
// }

// function accountForFirefox(click) { // wrapper function
//   let link = arguments[1];
//   document.body.appendChild(link);
//   click(link);
//   document.body.removeChild(link);
// }




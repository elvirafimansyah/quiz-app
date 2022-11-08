const profileName = document.querySelector("#profile-name")
const profileImage = document.querySelectorAll("#profile-img");
const signOutBtn = document.getElementById("signout-btn");
const contEditName = document.querySelector("#edit-name");
const username = document.getElementById("username")
const tbody = document.getElementById("tbody");
const footer = document.querySelector('footer')

function showName() {
  profileImage.forEach(img => {
    img.src = localStorage.getItem("src");
  })

  profileName.innerHTML = localStorage.getItem("name") + `&nbsp`;
  username.innerHTML = 
    localStorage.getItem("name") +  `&nbsp; 
    <span class="inline-flex items-center p-1 mr-2 text-sm font-semibold text-white bg-salmon rounded-full ">
      <svg aria-hidden="true" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
      <span class="sr-only">Icon description</span>
    </span>
  `

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
  ok.classList.add("bg-blue-500", "px-2", "py-1.5", "rounded-md", "mr-2", "hidden", "text-white");
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
}

signOutBtn.onclick = () => {
  localStorage.clear()
  window.location.reload()
  window.location.href = "/"
}

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem("name") || localStorage.getItem("src")) {
    showName()
  } else {
    window.location.href = "/"
  }
});

// Table
// display recent match from localstorage data
const dataObjects = localStorage.getItem("data_result");
const obj = JSON.parse(dataObjects)
let ex =""
obj.forEach(data => ex += `  
  <tr class="bg-white border-b ">
    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
      ${data.score}
    </th>
    <td class="py-4 px-6">
      ${data.correct}
    </td>
    <td class="py-4 px-6">
      ${data.incorrect}
    </td>
    <td class="py-4 px-6">
      ${data.createAt}
    </td>
  </tr>
`)
tbody.innerHTML = ex;


//total Data
let scoreObj = [];
let totalScore = 0;
obj.forEach(e => {
  scoreObj.push(Number(e.score))
})
for (var i = 0; i < scoreObj.length; i++) {
  totalScore += scoreObj[i];
  localStorage.setItem("total", totalScore)
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("total")) {
    // display html total
    tbody.innerHTML += `
      <tr class="bg-gray-100 border-b ">
        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
        Total Score
        </th>
        <td class="py-4 px-6">
        </td>
        <td class="py-4 px-6">
        </td>
        <td class="py-4 px-6">
          ${localStorage.getItem("total")}
        </td>
      </tr>
    `
    // Display Points
    const points = document.getElementById('points');
    points.innerHTML = localStorage.getItem("total") + `&nbsp;<span class="text-sm text-red-200">XP</span>`
  } else if (obj.length > 3) {
    footer.classList.remove("fixed")
  }
})

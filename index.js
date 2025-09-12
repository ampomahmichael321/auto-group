const closeBtn = document.querySelector(".close-button");
const menuBtn = document.querySelector(".menu");
const textArea = document.getElementById("list");
const checkbox = document.getElementById("checkbox");
const submitBtn = document.getElementById("submit");
const copyBtn = document.querySelector(".copy-btn");
const downloadBtn = document.querySelector(".download-btn");
let itemsArr = [];
let itemsStr = "";
let shuffleOption = "";
const ol = document.getElementById("ol");
const groupSizeInput = document.getElementById("group-size");
let groupSize = "";
let html = "";
let shuffledArr = [];

//Event listeners for the menu button and close button
menuBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);

//Hide and show the menu when the menu button is clicked
function toggleMenu() {
  if (document.querySelector(".hidden-menu").style.display === "flex") {
    document.querySelector(".hidden-menu").style.display = "none";
  } else {
    document.querySelector(".hidden-menu").style.display = "flex";
  }
}

function getValues() {
  itemsStr = textArea.value.trim();
  groupSize = groupSizeInput.value;
  //Check if the checkbox is checked
  if (checkbox.checked) {
    shuffleOption = "shuffle";
  } else {
    shuffleOption = "no-shuffle";
  }
  console.log(itemsStr + "\n" + shuffleOption + " " + groupSize);
}

function toArr(string) {
  itemsArr = string.split("\n");
  shuffledArr = _.shuffle(itemsArr);
  if (shuffleOption == "shuffle") {
    itemsArr = shuffledArr;
  }
}

function createGroups(arr) {
  html = "";
  //Loop over the itemsArr
  for (let i = 0; i < arr.length; i++) {
    ol.innerHTML += `
                <div class="group">`;
    /*dd the an h1 tag for the first item in each group. The first item in each group is the one that leaves a remainder of 1 
        when divided by groupSize*/
    if ((i + 1) % groupSize == 1 || i == 0) {
      html += `
                <div class="group">
                 <h2> Group ${Math.floor(i / groupSize) + 1} </h2>
                 <li> ${arr[i]} </li>
                `;
    } else if ((i + 1) % groupSize != 0) {
      html += `
                 <li> ${arr[i]} </li>
                
    `;
    } else {
      html += `
            <li> ${arr[i]} </li>
            </div>
            <br> 
            `;
    }
  }
  ol.innerHTML = html;
}

function clear() {
  textArea.value = "";
  ol.innerHTML = "";
}

function displayBtn(btnName) {
  if (ol.innerText != "") {
    btnName.style.display = "block";
  } else {
    btnName.style.display = "none";
  }
}
//Add Event listener to the download button to download the groups as a PDF file
//Using html2pdf library to convert the HTML to PDF
function copyGroups() {
  const groups = document.querySelector("#ol").innerText;
  navigator.clipboard
    .writeText(groups)
    .then(() => {
      alert("Groups copied to clipboard!");
    })
    .catch((err) => {
      alert("Failed to copy. Please try again.");
    });
}

submitBtn.addEventListener("click", (e) => {
  if (textArea.value.trim() === "") {
    alert("Please enter some items to group.");
    return;
  }
  e.preventDefault();
  getValues();
  toArr(itemsStr);
  createGroups(itemsArr);
  displayBtn(copyBtn);
  displayBtn(downloadBtn);

  ol.scrollIntoView({
    behaviour: "smooth",
  });
});

copyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  copyGroups();
});

//Allow users to copy the groups and also download it as pdf file if they want

//Use the html2pdf library to convert the HTML to PDF
downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const element = document.getElementById("ol");
  html2pdf()
    .set({
      margin: 1,
      filename: "groups.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .from(element)
    .save();
});

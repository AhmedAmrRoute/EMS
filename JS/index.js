// =================== \/\/ ** Global Variables**\/\/===================

var indexOfEmployeeToUpdate = -1;
var SelectedImagePathName = "";
var selectedSearchField = "";
// =================== \/\/ ** Emplyees Array  And Local Storage**\/\/===================

var emplyees = [];
var JSONData = localStorage.getItem("emplyees");
if (JSONData != null) {
  emplyees = JSON.parse(JSONData);
}

// =================== \/\/ ** Elements **\/\/===================

var emplyeesContainer = document.getElementById("Emplyees");
var createBtn = document.getElementById("CreateBtn");
var btnCloseModal = document.querySelector(".btn-close");
var userIcon = document.querySelector("#UserIcon");
var userPhoto = document.querySelector("#UserPhoto");
var updateBtn = document.querySelector("#UpdateBtn");
var IntialaBtn = document.querySelector("#IntialaBtn");
var searchSelection = document.getElementById("Selection-search");
var searchInput = document.getElementById("searchInput");

// =================== \/\/ ** HTML Inputs **\/\/===================

var profileImageInput = document.getElementById("profileImageInput");
var nameInput = document.getElementById("Name");
var ageInput = document.getElementById("Age");
var phoneInput = document.getElementById("Phone");
var cityInput = document.getElementById("City");
var emailInput = document.getElementById("Email");
var startDateInput = document.getElementById("StartDate");
var reader = new FileReader();
// =================== \/\/ ** Elements **\/\/===================
createBtn.addEventListener("click", function () {
  if (!validateForm()) {
    return;
  }
  var newEmployee = {
    name: nameInput.value,
    age: ageInput.value,
    phone: phoneInput.value,
    city: cityInput.value,
    email: emailInput.value,
    startDate: startDateInput.value,
    imagePathName: SelectedImagePathName,
    id: `EMP-${emplyees.length}`,
  };
  console.log(newEmployee);
  emplyees.push(newEmployee);
  updateLocalStorage();
  closeModal();
  clearInputs();
  display(emplyees);
});
profileImageInput.addEventListener("input", function (e) {
  var file = profileImageInput.files[0];
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    SelectedImagePathName = e.target.result;
    userPhoto.setAttribute("src", SelectedImagePathName);
  };
});
// =================== \/\/ ** validation **\/\/===================
nameInput.addEventListener("input", function (e) {
  if (e.target.value.length < 3) {
    nameInput.classList.add("is-invalid");
  } else {
    nameInput.classList.replace("is-invalid", "is-valid");
  }
});
ageInput.addEventListener("input", function (e) {
  if (Number(e.target.value) < 18 || e.target.value > 65) {
    ageInput.classList.add("is-invalid");
  } else {
    ageInput.classList.replace("is-invalid", "is-valid");
  }
});
phoneInput.addEventListener("input", function (e) {
  var Regex = /^01[1205][0-9]{8}$/;
  if (!Regex.test(e.target.value)) {
    phoneInput.classList.add("is-invalid");
  } else {
    phoneInput.classList.replace("is-invalid", "is-valid");
  }
});
cityInput.addEventListener("input", function (e) {
  var Regex = /^(cairo|alex|giza)$/i;
  if (!Regex.test(e.target.value)) {
    cityInput.classList.add("is-invalid");
  } else {
    cityInput.classList.replace("is-invalid", "is-valid");
  }
});
emailInput.addEventListener("input", function (e) {
  var Regex = /^[a-zA-Z][a-zA-Z0-9\.]{3,20}@(gmail\.com|yahoo\.net)$/;
  if (!Regex.test(e.target.value)) {
    emailInput.classList.add("is-invalid");
  } else {
    emailInput.classList.replace("is-invalid", "is-valid");
  }
});
startDateInput.addEventListener("input", function (e) {
  if (!e.target.value) {
    startDateInput.classList.add("is-invalid");
  } else {
    startDateInput.classList.replace("is-invalid", "is-valid");
  }
});
// =================== \/\/ ** Helpers **\/\/===================
function display(array) {
  var employeesHTML = "";
  for (let index = 0; index < array.length; index++) {
    employeesHTML += ` <tr style="line-height: 3;" title='EMP-${array[index].name}-${array[index].email}'>
  <!-- <th>Profile Image</th> -->
  <td width="100px"><img
  src="${array[index].imagePathName}"
  class="img-fluid" width="100px"
  height="100px" alt></td>
  <td>${array[index].name}</td>
  <td>${array[index].age}</td>
  <td>${array[index].city}</td>
  <td>${array[index].email}</td>
  <td>${array[index].phone}</td>
  <td>${array[index].startDate}</td>
  <td>
  <button class="btn btn-danger"
  id="DeleteBtn" onclick = "deleteUser('${array[index].id}')">Delete</button></td>
  <td>
  <button class="btn btn-primary" data-bs-toggle="modal"
  data-bs-target="#exampleModal"
  id="updateUserBtn" onclick = "showUpdateForm('${array[index].id}')">Update</button>
  </td>
  </tr>`;
  }
  emplyeesContainer.innerHTML = employeesHTML;
}

function deleteUser(id) {
  const index = emplyees.findIndex(function (emp) {
    return emp.id === id;
  });
  emplyees.splice(index, 1);
  updateLocalStorage();
}

function showUpdateForm(id) {
  const index = emplyees.findIndex(function (emp) {
    return emp.id === id;
  });
  nameInput.value = emplyees[index].name;
  ageInput.value = emplyees[index].age;
  phoneInput.value = emplyees[index].phone;
  emailInput.value = emplyees[index].email;
  startDateInput.value = emplyees[index].startDate;
  cityInput.value = emplyees[index].city;
  userPhoto.setAttribute("src", emplyees[index].imagePathName);
  updateBtn.style.display = "block";
  createBtn.style.display = "none";
  indexOfEmployeeToUpdate = index;
}

function updateLocalStorage() {
  localStorage.setItem("emplyees", JSON.stringify(emplyees));
  display(emplyees);
}

function updateUser() {
  if (!validateForm()) {
    return;
  }
  var id = emplyees[indexOfEmployeeToUpdate].id;
  var pathName = SelectedImagePathName || emplyees[indexOfEmployeeToUpdate].imagePathName;
  emplyees[indexOfEmployeeToUpdate] = {
    id: id,
    name: nameInput.value,
    age: ageInput.value,
    phone: phoneInput.value,
    city: cityInput.value,
    email: emailInput.value,
    startDate: startDateInput.value,
    imagePathName: pathName,
  };
  updateLocalStorage();
  display(emplyees);
  updateBtn.style.display = "none";
  createBtn.style.display = "block";
  clearInputs();
  closeModal();
}

function closeModal() {
  document.querySelector("button.btn-close").click();
}

function clearInputs() {
  nameInput.value = "";
  nameInput.classList.remove("is-valid");
  nameInput.classList.remove("is-invalid");

  ageInput.value = "";
  ageInput.classList.remove("is-valid");
  ageInput.classList.remove("is-invalid");

  phoneInput.value = "";
  phoneInput.classList.remove("is-valid");
  phoneInput.classList.remove("is-invalid");

  emailInput.value = "";
  emailInput.classList.remove("is-valid");
  emailInput.classList.remove("is-invalid");

  startDateInput.value = "";
  startDateInput.classList.remove("is-valid");
  startDateInput.classList.remove("is-invalid");

  cityInput.value = "";
  cityInput.classList.remove("is-valid");
  cityInput.classList.remove("is-invalid");
  profileImageInput.parentElement.classList.remove("invalidimage");

  userPhoto.setAttribute("src", "https://placehold.co/600x400");
}
function validateForm() {
  var result = true;
  var Regex = "";
  if (nameInput.value.length < 3) {
    nameInput.classList.add("is-invalid");
    result = false;
  }
  if (Number(ageInput.value) < 18 || ageInput.value > 65) {
    ageInput.classList.add("is-invalid");
    result = false;
  }
  Regex = /^01[1205][0-9]{8}$/;
  if (!Regex.test(phoneInput.value)) {
    phoneInput.classList.add("is-invalid");
    result = false;
  }
  Regex = /^[a-zA-Z][a-zA-Z0-9\.]{3,20}@(gmail\.com|yahoo\.net)$/;
  if (!Regex.test(emailInput.value)) {
    emailInput.classList.add("is-invalid");
    result = false;
  }
  Regex = /^(cairo|alex|giza)$/i;
  if (!Regex.test(cityInput.value)) {
    cityInput.classList.add("is-invalid");
    result = false;
  }
  if (!startDateInput.value) {
    startDateInput.classList.add("is-invalid");
    result = false;
  }
  if (!profileImageInput.files[0]) {
    profileImageInput.parentElement.classList.add("invalidimage");
    result = false;
  }
  return result;
}
document.querySelector("button.btn-close").addEventListener("click", function () {
  clearInputs();
  updateBtn.style.display = "none";
  createBtn.style.display = "block";
});

searchSelection.addEventListener("change", function (e) {
  selectedSearchField = e.target.value;
  searchInput.removeAttribute("disabled");
});

searchInput.addEventListener("input", function (e) {
  const result = [];
  for (let index = 0; index < emplyees.length; index++) {
    if (emplyees[index][selectedSearchField].toLowerCase().includes(e.target.value.toLowerCase())) {
      result.push(emplyees[index]);
    }
  }
  display(result);
});

display(emplyees);

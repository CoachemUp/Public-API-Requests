let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture, email, location, phone, dob &noinfo &nat=US`;
const gallery = document.getElementById('gallery');
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// fetch data from API 
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));

function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it 
    let employeeHTML = '';


    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let state = employee.location.state;
        let picture = employee.picture;
        // template literals make this so much cleaner!
        employeeHTML += ` 
            <div class="card" data-index="${index}"> 
                <div class="card-img-container">
                    <img class="card-img" src="${picture.medium}" alt="profile picture">
                </div>
               
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
                    <p class="card-text">${email}</p> 
                    <p class="card-text cap">${city}, ${state}</p> 
                </div>
            </div>
            `;
    });
gallery.insertAdjacentHTML('beforeend', employeeHTML)
}
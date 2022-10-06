let employees = [];
const gallery = document.getElementById('gallery');
// fetch data from API 
fetch(`https://randomuser.me/api/?results=12&nat=us`)
    .then(res => res.json())
    .then(data => {
        employees = data.results;
    })
    .then(() =>
        displayEmployees(employees));



function displayEmployees() {
    let employeeHTML = '';
    employees.forEach((data, index) => {
        employeeHTML += `
        <div class="card" data-index="${index}"> 
                <div class="card-img-container">
                    <img class="card-img" src="${data.picture.medium}" alt="profile picture">
                </div>
               
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                    <p class="card-text">${data.email}</p> 
                    <p class="card-text cap">${data.location.city}, ${data.location.state}</p> 
                </div>
            </div>
            `;
    });
    gallery.insertAdjacentHTML('beforeend', employeeHTML);

    gallery.addEventListener('click', e => {
        if (e.target !== gallery) {
            const card = e.target.closest(".card");
            const index = card.getAttribute('data-index');
            displayModal(index);
        }
    });
}




function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
    let date = new Date(dob.date);
    let modalContainer =
        `<div class='modal-container'data-backdrop="static" >
            <div class="modal"  >
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${city}</p>
                    <hr>
                    <p class="modal-text">${phone}</p>
                    <p class="modal-text"> ${street.number} ${street.name}, ${city}, ${state}, ${postcode}</p>
                    <p class="modal-text">Birthday:  ${((date.getMonth()) < 10 ? '0' : '') + (date.getMonth() + 1)}/${(date.getDate() < 10 ? '0' : '') + (date.getDate())}/${(date.getFullYear())}</p>
                </div>
            </div>
        </div>`;

    gallery.insertAdjacentHTML('beforeend', modalContainer);

    const modal = document.querySelector('.modal-container');
    modal.addEventListener('click', (e) => {
        if (e.target.matches('modal-close-btn') || !e.target.closest('modal')) {
            modal.remove();
        }
    });

}








const getUsers = (e) => {
  e.preventDefault();

  const usersNumber = document.querySelector('[name = "users-number"]').value;
  const usersGender = document.querySelector('[name = "gender"]').value;
  const url = `https://randomuser.me/api/?results=${usersNumber}&gender=${usersGender === "both" ? "male,female" : usersGender}`;
  console.log(url);

  fetch(url) //obietnica - oczekujący (pending)
    // obietnica - rozstrzygnieta (spełnione | odrzucone)
    //wykonuje się then - pozytywnie
    .then(response => {
      // console.log(response);
      if (response.status !== 200) {
        throw Error("To nie jest odpowedź 200")
      } else {
        return response.json() //Fetch API = json() z body wyodrębnia json i parsuje na obiekt
      }
    })
    .then(json => showUsers(json.results))
    //wykonuje gdy rozstrzygnięcie - odrzucona
    .catch(err => console.log(err))
}

const showUsers = (users) => {
  const resultArea = document.querySelector('.user-list');
  resultArea.textContent = "";
  users.forEach(user => {
    const item = document.createElement('div');
    item.className = 'user';
    item.innerHTML = `
    <div class="user__name">
      <h4>${user.name.title.toUpperCase()} ${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}</h4>
    </div>
    <div class="user__location">${user.location.city}, ${user.location.country}</div><br>
    <img class="user__image" src=${user.picture.medium}>
    <hr>
    
    `
    resultArea.appendChild(item);
  })
}
document.querySelector('.generator').addEventListener('submit', getUsers);

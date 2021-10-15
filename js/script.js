const API_URL = "https://reqres.in/api/users?page=1";
const API_URL_PAGE = "https://reqres.in/api/users?page=";
const TEAM = document.getElementById('team');
const BUTTON = document.querySelector('.pagination');

class User {
    constructor(avatar, email, first_name, last_name) {
        this.avatar = avatar;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
    }

    afficheUser () {
        TEAM.innerHTML +=  `
        <p>${this.avatar}</p>
        <p>${this.email}</p>
        <p>${this.first_name}</p>
        <p>${this.last_name}</p>
        <hr/>
        `;
    }
}

BUTTON.addEventListener('click', function (event) {
    const NUM_PAGE = BUTTON.value;
    getUsers(API_URL_PAGE+NUM_PAGE);
});

function getUsers(api){
    fetch(api)
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then(responsFormat => {
        console.log(responsFormat);
        const NB_PAR_PAGE = responsFormat.per_page;
    
        for(i=0;i<NB_PAR_PAGE;i++){
            const AVATAR = responsFormat.data[i].avatar;
            const EMAIL = responsFormat.data[i].email;
            const FIRST_NAME = responsFormat.data[i].first_name;
            const LAST_NAME = responsFormat.data[i].last_name;

            const people = new User(AVATAR,EMAIL,FIRST_NAME,LAST_NAME);
            people.afficheUser();

        }
    })
    .catch(err => {
        console.error(err);
    });
}

getUsers(API_URL);
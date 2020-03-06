//1. Variables
//1.1 Main button/ Generate button
const btnGenerate = document.querySelector('#btnGenerate');
//1.1 avatar display
const displayAvatar = document.querySelector('#user-avatar');
//1.2 User Info
const displayUserInfo = document.querySelector('#userInfo');
//1.3 Login box
const displayLogin = document.querySelector('#login');
//1.4 Display GithubAccount
const displayGithubAccount = document.querySelector('#github-account');
//1.5 display repositories
const displayRepositories = document.querySelector('#repositories');
//1.6 Display languages
const displayLanguages = document.querySelector('#languages');
// 1.7 Repos List
const reposList = document.querySelector('#repos-list');
// 1.8 Languages List
const languagesList = document.querySelector('#languages-list');
//1.10 Username variable - changable
let username = document.querySelector('#username');
//1.11 form with searcher
const searchForm = document.querySelector('#searcher');
//2. Functions
// 2.1 Main
const generate = () => {
    if (username.value) {
        getAvatar();
        getUserData();
        getRepos();
        getLangAverage()
    } else {
        alert('Enter user Github login!');
    }
};
// 2.2 Get Repos
const getRepos = async() => {
        reposList.innerHTML = '';
        //Public repositories of user search
        const url = `https://api.github.com/users/${username.value}/repos?q=type:all`;

        // fetching the data variable
        const response = await fetch(url);
        // result variable jason parse response
        const result = await response.json()
            //creating array from with specified data from results
        let result1 = result.map(el => el.name)
        let result2 = result.map(el => el.html_url);
        // repositories label
        displayRepositories.innerHTML = `<span>Repositories: <span>`;
        //Displaying list of repositories
        for (let i = 0; i < result1.length; i++) {
            reposList.innerHTML += `<li>${result1[i]}<br><a href="${result2[i]}">${result2[i]}</a></li>`;
        }


    }
    // 2.3 Get Avatar
const getAvatar = async() => {
        displayAvatar.innerHTML = '';

        const url = `https://api.github.com/search/users?q=user:${username.value}`;

        const response = await fetch(url);

        const result = await response.json()

        result.items.forEach(item => {

            displayAvatar.innerHTML += `<img src="${item.avatar_url}" alt="${item.login} width="50px" height="50px"/>`;
        });
    }
    // 2.4 Get userLogin
const getUserData = async() => {
        //clearing field
        displayGithubAccount.innerHTML = '';
        const url = `https://api.github.com/users/${username.value}`;

        const response = await fetch(url);

        const result = await response.json();

        displayLogin.innerHTML = `<span>Username: </span>`;
        displayLogin.innerHTML += `<ul><li>${result.login}</li></ul>`
            // Github account display
        displayGithubAccount.innerHTML = `<span>Github Account: </span>`
        displayGithubAccount.innerHTML += `<ul><li><a href="${result.html_url}" target="_blank">${result.html_url}</a></li></ul>`
    }
    //2.5 Get languages
const getLangAverage = async() => {
        //clearing field
        languagesList.innerHTML = '';
        const url = `https://api.github.com/users/${username.value}/repos`;

        const response = await fetch(url);

        const result = await response.json();
        // languages calculation
        let count = {};
        result.map(el => count[el.language] = (count[el.language] || 0) + 1);
        // extracting languages names
        const language = Object.keys(count).join(',');
        // extracting languages values
        const langValues = Object.values(count);
        //creatihg array with keywords
        const langArray = language.split(',');
        // Creating an array of percentage usage of languages
        let langPercentage = Array.from(langValues, el => Math.round((el / result.length) * 100) + '%');

        // languages display
        displayLanguages.innerHTML = `<span>Languages:</span>`

        for (let i = 0; i < (langArray.length); i++) {
            languagesList.innerHTML += `<li>${langArray[i] === 'null' ? 'No Data' : langArray[i]}: ${langPercentage[i]}</li>`;
        }
    }
    //3. EventListeners
    //3.1 Main/Generate button
btnGenerate.addEventListener('click', generate);
// // disarm the username searcher form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
})
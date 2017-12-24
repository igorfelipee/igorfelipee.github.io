const URL = new Request("https://api.github.com/users/igorfelipee");

const checkInfosInStorage = (url) => {
  if(sessionStorage.getItem('info') != null) {
     renderInfosInPage();
  }else {
    getRepos(url);
    setInterval( () => {
      renderInfosInPage();
    }, 100)
  }
};

const getRepos = (url) => {
        fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log('Storing in Session');
          sessionStorage.setItem('info', JSON.stringify(data));
        });
};

const renderParticles = async () => {
  await particlesJS.load('particles-js', 'particles.json', () => {
    console.log('callback - particles.js config loaded');
  });
};

const renderInfosInPage = () => {
  let ss = sessionStorage.getItem('info');
  var infos = JSON.parse(ss);

  document.getElementById('pic').src = infos.avatar_url;
  document.getElementById('name').innerHTML = infos.name;
  document.getElementById('desc').innerHTML = infos.bio;
  document.getElementById('repos').innerHTML = infos.public_repos;
  document.getElementById('followers').innerHTML = infos.followers;
};

const serviceWorkerInit = () => {
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./sw.js')
           .then( () => { console.log('Service Worker Registered'); });
  }
};

(() => {
  serviceWorkerInit();
  checkInfosInStorage(URL);
  renderParticles();
})();

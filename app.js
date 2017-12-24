const URL = new Request("https://api.github.com/users/igorfelipee");

const checkInfosInStorage = (url) => {
  sessionStorage.getItem('info') != null ? console.log('Já existe ') : getRepos(url)
};

const getRepos = async (url) => {
  await fetch(url)
        .then(async (response) => {
          return await response.json();
        })
        .then(async (data) => {
          console.log('Storing in Session');
          sessionStorage.setItem('info', JSON.stringify(data));
        });
};

const renderParticles = async () => {
  await particlesJS.load('particles-js', 'particles.json', function() {
    console.log('callback - particles.js config loaded');
  });
};

const renderInfosInPage = () => {

  let ss = sessionStorage.getItem('info');
  var infos = JSON.parse(ss);

  document.getElementById('pic').src = infos.avatar_url;
  document.getElementById('name').innerHTML = infos.name;
  document.getElementById('desc').innerHTML = infos.bio;

};

(() => {
  checkInfosInStorage(URL);
  renderParticles();
  renderInfosInPage();
})();

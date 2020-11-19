((document, navigator,window) => {

    const SERVER_HOST = 'http://localhost:5000'

    var scope = {
      scope: './'
    };
    
    const $ = document.querySelector.bind(document)

     // A simple session manager based on a random string stored in the localStorage
  const getSession = () => {
    let session = localStorage.getItem('session');
    if (!session) {
      session = `${Date.now()}-${Math.random()}`
      localStorage.setItem('session', session)
    }
    return session
    
  }
// Add the session parameter to an URL.
const addSession = url => `${url}?session=${getSession()}`

window.onload = async function getServerLoads() {
  const serverSession = await fetch(addSession(`${SERVER_HOST}/server-loads`))
  return serverSession.json()
};


    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {     
              console.log(`Service Worker registered! Scope: ${registration.scope}`);
            })
            .catch(err => {
              console.log(`Service Worker registration failed: ${err}`);
            });
           
        });
      }



      function image(num) {
        for (i=1; i<num+1; i++) {
          var img = document.createElement("img");
          var imgPath = img.src = "images/"+ i +".jpg";
          var row = document.getElementById("row");
          row.appendChild(img);
          console.log('img path', imgPath)
        }
       
      }
      image(3);
      

})(document, navigator, window)
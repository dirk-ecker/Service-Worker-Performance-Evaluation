((document, navigator) => {

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {     
              console.log(`Service Worker registered! Scope: ${registration.scope}`);
            })
            .catch(err => {
              console.log(`Service Worker registration failed: ${err}`);
            });
            // navigator.serviceWorker.ready.then(enableUI)
        });
        if (navigator && navigator.connection) {
          // console.log(navigator.connection);
        };
      }

      function image(num) {
        for (i=1; i<num+1; i++) {
          var img = document.createElement("img");
          img.src = "images/"+ i +".jpg";
          var row = document.getElementById("row");
          row.appendChild(img);
        }
      }
      image(3);

      $('img').onload = () => {
        console.log('img onload', src) 
      }
     

})(document, navigator)
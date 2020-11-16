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
            navigator.serviceWorker.ready.then(enableUI)
        });
        if (navigator && navigator.connection) {
          console.log(navigator.connection);
        };
      }

    const $ = document.querySelector.bind(document)
    $('#image-selector').onchange = () => {
        const imgUrl = $('select').value;
        if (imgUrl) {
            $('img').src = imgUrl
        }
    };
    const enableUI = async () => {
        $('#image-selector').disabled = false
      }

})(document, navigator)
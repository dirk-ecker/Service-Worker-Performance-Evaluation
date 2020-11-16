((document) => {

    const $ = document.querySelector.bind(document)
    $('#image-selector').onchange = () => {
        const imgUrl = $('select').value;
        if (imgUrl) {
            $('img').src = imgUrl
        }
    };

    $('#image-selector').disabled = false;

})(document)
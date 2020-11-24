(async (document) => {


  const image = num => {
    for (let i=1; i<num+1; i++) {
      const img = document.createElement("img")
      const imgPath = img.src = "images/"+ i +".jpg"
      const row = document.getElementById("row")
      row.appendChild(img)
      console.log('img path', imgPath)
    }
  }
  image(10)

})(document)

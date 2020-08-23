console.log('Main.JS is loaded')



weatherForm = document.querySelector('form')
search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let searchValue = search.value;

    fetch(`/weather?address=${searchValue}`).
        then(response => response.json().
            then(data => {
                // let imageEle = document.createElement('img')
                document.getElementById('location-details').textContent = data.description
                // imageEle.setAttribute('src', data.image)
                // document.getElementById('location-details').appendChild(imageEle)            
            }))
            
               
})

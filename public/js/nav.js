const createNav = () => {
    let nav = document.querySelector('.navbar')
    nav.innerHTML = `
        <div class="nav">
            <a href="/">
                <img src="../img/dark-logo.png" class="brand-logo" id="logo" alt="">
            </a>
            <div class="nav-items">
                <div class="search" data-search_bar-id="search_bar">
                    <input type="text" class="search-box" placeholder="Search brand, product...">
                    <button class="search-btn" data-search_btn-id="search_btn">Search</button>
<!--                onclick="window.location.href = '/search'"-->
                </div>
                
                <a href="#"><img src="../img/user.png" alt=""></a>
                <a href="/cart"><img src="../img/cart.png" alt=""></a>
            </div>
        </div>
        <ul class="link-container">
            <li class="link-item"><a href="/" class="link">home</a></li>
            <li class="link-item"><a href="/women" class="link">women</a></li>
            <li class="link-item"><a href="/men" class="link">men</a></li>
            <li class="link-item"><a href="/shoes" class="link">shoes</a></li>
            <li class="link-item"><a href="/accessories" class="link">accessories</a></li>
            <li class="link-item"><a href="#footer-about" class="link">About</a></li>
        </ul>     
    `;
}

createNav();

//get search Box and search button
const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');

//change searchBtn color if search is not empty
searchBox.addEventListener('input', () => {
    if(searchBox.value.length) {
        searchBtn.style.background = '#383838';
        searchBtn.style.transition = '.7s';
    } else {
        searchBtn.style.background = 'none';
        searchBtn.style.transition = '.7s'
    }
})

//listen for click --> open search page and input search value to the search url end-point
searchBtn.addEventListener('click', () => {
    if(searchBox.value.length) {
        location.href = `/search/${searchBox.value}`;
    }
})

//listen for enter --> open search page and input search value to the search url end-point
searchBox.addEventListener('keypress', function(event) {
    if(searchBox.value.length && event.keyCode === 13) {
        location.href = `/search/${searchBox.value}`
    }
})



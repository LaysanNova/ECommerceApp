const createNav = () => {
    let nav = document.querySelector('.navbar')
    nav.innerHTML = `
        <div class="nav">
            <a href="/" id="logo">
                <img src="../img/dark-logo.png" class="brand-logo" alt="">
            </a>
            <div class="nav-items">
                <div class="search">
                    <input type="text" class="search-box" placeholder="search brand, product">
                    <button class="search-btn" onclick="window.location.href = '/search'">search</button>
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
            <li class="link-item"><a href="/#footer-about" class="link">About</a></li>
        </ul>
    `;
}

createNav();

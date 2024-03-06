const firebaseConfig = {
    apiKey: "AIzaSyBwTJ6FBvOVX4K-X9JRV--XZ4Hf7CB5sTQ",
    authDomain: "appl-655b1.firebaseapp.com",
    databaseURL: "https://appl-655b1-default-rtdb.firebaseio.com",
    projectId: "appl-655b1",
    storageBucket: "appl-655b1.appspot.com",
    messagingSenderId: "913353026515",
    appId: "1:913353026515:web:efff79e2e152619c499d26"
};

firebase.initializeApp(firebaseConfig);
const realDBSearch = firebase.database();
const products = realDBSearch.ref("products");

//console.log(firebase);
function cleanTags(tags) {
    tags = tags.trim().toLowerCase();
    const arrTags = tags.split(" ");
    arrTags.forEach((tag) => {
        const index = arrTags.indexOf(tag);
        tag = tag.replaceAll(/[^0-9A-Za-z_\u0400-\u04FF]/gi, '').replaceAll(/\s+/g, ' ');
        arrTags[index] = tag;
    })
    return arrTags;
}

let youMayAlsoLikeResult = [];
let womenResult = [];
let menResult = [];
let shoesResult = [];
let accessoriesResult = [];
let womenSection = document.getElementById('womenResults');
let menSection = document.getElementById('menResults');
let shoesSection = document.getElementById('shoesResults');
let accessoriesSection = document.getElementById('accessoriesResults');

function loadData() {
    products.on("value", function (snapshot) {
        if (!snapshot.exists()) {
            console.log("No products found");
        } else {
            snapshot.forEach(function (element) {
                let data = element.val();
                data.id = element.key.toString().replace("+ ", "").trim();
                console.log(data.id);

                getCategoryProducts(data, '1');
                getCategoryProducts(data, '2');
                getCategoryProducts(data, '3');
                getCategoryProducts(data, '4');
                getCategoryProducts(data, '5');
            })
        }
        if(womenSection) {
            createResultCards(womenResult)
        } else if(menSection) {
            createResultCards(menResult)
        } else if(shoesSection) {
            createResultCards(shoesResult)
        } else if(accessoriesSection) {
            createResultCards(accessoriesResult)
        }

        createProductSlider('Accessories', 'product-accessories', accessoriesResult);
        createProductSlider('Shoes', 'product-shoes', shoesResult);
        createProductSlider('You may like', 'product-you-may-also-like', youMayAlsoLikeResult);
    });
}

function getCategoryProducts(data, category) {
    let itemCategories = data.category.toString().replaceAll(",", "");

    if (itemCategories.includes(category)) {
        switch (category) {
            case '1' : return youMayAlsoLikeResult.push(data);
            case '2' : return womenResult.push(data);
            case '3' : return menResult.push(data);
            case '4' : return shoesResult.push(data);
            case '5' : return accessoriesResult.push(data);
        }
    }
}

function getProductById(data, id) {
    // data.forEach((item) => {
        let itemId = data.id.toString().replaceAll("+ ", "");
        if (itemId === id) {
            //setting up texts
            const name =  document.querySelector('.product-brand');
            const shortDes = document.querySelector('.product-short-des');
            const des = document.querySelector('.des');

            name.innerHTML = data.name
            shortDes.innerHTML = data.shortDes;
            des.innerHTML = data.des;

            // pricing
            const sellPrice = document.querySelector('.product-price');
            const actualPrice = document.querySelector('.product-actual-price');
            const discount = document.querySelector('.product-discount');

            let $$;
            sellPrice.innerHTML = `$${data.sellPrice}`;
            actualPrice.innerHTML = `$${data.actualPrice}`;
            discount.innerHTML = `( ${Math.round(Number(data.discount))}% off )`;

            setData(data);

            // wishlist and cart btn
            const wishlistBtn = document.querySelector('.wishlist-btn');
            // wishlistBtn.addEventListener('click', () => {
            //     wishlistBtn.innerHTML = add_product_to_cart_or_wishlist('wishlist', data);
            // })

            const cartBtn = document.querySelector('.cart-btn');
            // cartBtn.addEventListener('click', () => {
            //     cartBtn.innerHTML = add_product_to_cart_or_wishlist('cart', data);
            // })
        }
    // })
}

const createProductCard = (result) => {
    return `
         <div class="product-card" onclick="location.href='/product/${result.id}'">
             <div class="product-image">
                 <img src="${result.images[0]}" class="product-thumb" alt="">
             </div>
             <div class="product-info">
                <!-- <p class="product-name">${result.id}</p> -->
                 <p class="product-name">${result.name}</p>
                 <span class="actual-price">$${result.actualPrice}</span>
                 <span class="price">$${result.sellPrice}</span>
 <!--                <span class="price">$${result.id}</span>    >-->
             </div>
         </div>
    `;
}

const createSearchResultCards = (searchResult, parent) => {
    let start = '<div class="product-search-container">';
    let middle = '';
    let end = '</div>';

    for(let i = 0; i < searchResult.length; i++){
        if(searchResult[i].id !== decodeURI(location.pathname.split('/').pop())){
            middle += createProductCard(searchResult[i]);
        }
    }
    if(parent){
        let cardContainer = document.querySelector(parent);
        cardContainer.innerHTML = start + middle + end;
    } else{
        return start + middle + end;
    }
}

const createResultCards = (result) => {
    let start = '<div class="category-container">';
    let middle = '';
    let end = '</div>';

    for(let i = 0; i < result.length; i++){
        if(result[i]){
            middle += createProductCard(result[i]);
        }
    }
    if(parent){
        let cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = start + middle + end;
    } else{
        return start + middle + end;
    }
}
const createProductSlider = (categoryTitle, categoryParent, categoryResult) => {

    const start = `
        <h2 class="section-heading">${categoryTitle}</h2>
        <button class="pre-btn"><img src="../img/arrow.png" alt=""></button>
        <button class="nxt-btn"><img src="../img/arrow.png" alt=""></button>
        <div class="product-container">
    `;
    let middle = '';
    const end = '</div>';

    console.log("l = ", categoryResult.length);

    for(let i = 0; i < categoryResult.length; i++){
        console.log("categoryResult[i] = ", categoryResult[i]);
        console.log("categoryResult[i].id = ", categoryResult[i].id);
        middle += createProductCard(categoryResult[i]);
    }
    console.log(middle);

    let slideContainer = document.querySelector(`.product.${categoryParent}`);
    if(slideContainer){
        slideContainer.innerHTML = start + middle + end;
        console.log("slideContainer  class = ", slideContainer.getAttribute("class"));
        console.log("code = ", slideContainer.innerHTML);
    } else{
        return start + middle + end;
    }
     setupSlidingEffect();
}

const setupSlidingEffect = () => {

    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];

    productContainers.forEach((item,i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })
};

const firebaseConfig = {
    apiKey: "AIzaSyBwTJ6FBvOVX4K-X9JRV--XZ4Hf7CB5sTQ",
    authDomain: "appl-655b1.firebaseapp.com",
    databaseURL: "https://appl-655b1-default-rtdb.firebaseio.com",
    projectId: "appl-655b1",
    storageBucket: "appl-655b1.appspot.com",
    messagingSenderId: "913353026515",
    appId: "1:913353026515:web:efff79e2e152619c499d26"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyCB-JoobxE4Jkyq-HWgfkZFWszZhjTFfXs",
//     authDomain: "ajshop-be1e0.firebaseapp.com",
//     databaseURL: "https://ajshop-be1e0-default-rtdb.firebaseio.com",
//     projectId: "ajshop-be1e0",
//     storageBucket: "ajshop-be1e0.appspot.com",
//     messagingSenderId: "136800496353",
//     appId: "1:136800496353:web:b8972f32172498b3bbe5a0"
// };

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

let inDemandResult = [];
let womenResult = [];
let menResult = [];
let shoesResult = [];
let accessoriesResult = [];

function loadData() {
    console.log("!!!!!!!!!!!!!!!!!!!");
    products.on("value", function (snapshot) {
        if (!snapshot.exists()) {
            console.log("No products found");
        } else {
            snapshot.forEach(function (element) {
                let data = element.val();
                data.id = element.key.toString().replace("-", "").trim();
                console.log(data.id);

                getCategoryProducts(data, '1');
                getCategoryProducts(data, '2');
                getCategoryProducts(data, '3');
                getCategoryProducts(data, '4');
                getCategoryProducts(data, '5');
            })
        }
    });
}

function getCategoryProducts(data, category) {
    let itemCategories = data.category.toString().replaceAll(",", "");

    if (itemCategories.includes(category)) {
        switch (category) {
            case '1' : return inDemandResult.push(data);
            case '2' : return womenResult.push(data);
            case '3' : return menResult.push(data);
            case '4' : return shoesResult.push(data);
            case '5' : return accessoriesResult.push(data);
        }
    }
}

const createProductCard = (result) => {
    return `
         <div class="product-card" onclick="location.href='/product/${result.id}'">
             <div class="product-image">
                 <img src="${result.images[0]}" class="product-thumb" alt="">
<!--                 <img src = "../img/AJShop/bag-icon.png" class = "bag-quick" alt = "" >-->
             </div>
             <div class="product-info">
                 <p class="product-name">${result.name}</p>
                 <p class="product-name">${result.id}</p>

                 <span class="actual-price">$${result.actualPrice}</span>
                 <span class="price">$${result.sellPrice}</span>
             </div>
         </div>
    `;
}

const createSearchResultCards = (searchResult, parent) => {
    let start = '<div class="product-container">';
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

const createInDemandProductSlider = () => {
    console.log("!!!!!!!!!!********************!!!!!!!!!!!!!!!!!")
    const start = `
        <h2 class="heading">In-Demand</h2>
        <button class="pre-btn"><img src="../img/arrow.png" alt=""></button>
        <button class="nxt-btn"><img src="../img/arrow.png" alt=""></button>
        <div class="product-container">
    `;
    let middle = '';
    const end = '</div>';

    console.log("l = ", inDemandResult.length);

    for(let i = 0; i < inDemandResult.length; i++){
        // console.log("inDemandResult[i] = ", inDemandResult[i]);
        // console.log("inDemandResult[i].id = ", inDemandResult[i].id);
        middle += createProductCard(inDemandResult[i]);
    }
    // console.log(middle);

    let slideContainer = document.querySelector('.product.product-indemand');
    if(slideContainer){
        slideContainer.innerHTML = start + middle + end;
        console.log("slideContainer  class = ", slideContainer.getAttribute("class"));
        console.log("code = ", slideContainer.innerHTML);
    } else{
        return start + middle + end;
    }
    // setupSlidingEffect();
}

// const createProductSlider = (results, parent, title) => {
//     const start = `
//         <h2 class="section-heading">${title}</h2>
//         <button class="pre-btn"><img src="img/arrow.png" alt=""></button>
//         <button class="nxt-btn"><img src="img/arrow.png" alt=""></button>
//         <div class="product-container">
//     `;
//     let middle = '';
//     const end = '</div>';
//
//     console.log("l = ", results.length);
//
//     for(let i = 0; i < results.length; i++){
//         console.log("results[i] = ", result);
//         console.log("results[i].id = ", result.id);
//     }
//
//     if(parent){
//         let slideContainer = document.querySelector(`.product${parent}`);
//         slideContainer.innerHTML = start + middle + end;
//         console.log("slideContainer  class = ", slideContainer.getAttribute("class"));
//         console.log("code = ", slideContainer.innerHTML);
//         // let cardContainer = document.querySelector(parent);
//         // cardContainer.innerHTML = start + middle + end;
//     } else{
//         return start + middle + end;
//     }
//
//     const productContainers = [...document.querySelectorAll('.product-container')];
//     const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
//     const preBtn = [...document.querySelectorAll('.pre-btn')];
//
//     productContainers.forEach((item, i) => {
//         let containerDimensions = item.getBoundingClientRect()
//         let containerWidth = containerDimensions.width;
//
//         nxtBtn[i].addEventListener('click', () => {
//             item.scrollLeft += containerWidth;
//         })
//
//         preBtn[i].addEventListener('click', () => {
//             item.scrollLeft -= containerWidth;
//         })
//     })
// }
let searchResult = [];
let inDemandResult1 = [];

products.on("value", function (snapshot) {
    if (!snapshot.exists()) {
        console.log("No products found");
    } else {
        snapshot.forEach(function (element) {
            let data = element.val();
            data.id = element.key.toString().replace("-", "").trim();
            console.log(data.id);

            searchResult = getSearchResult(data);

            console.log(searchResult);
            //inDemandResult1 = getCategoryProducts(data, '1');

            createSearchResultCards(searchResult, '.card-container');

        })

        createInDemandProductSlider();
    }
})

// products.on("value", function (snapshot) {
//     if (!snapshot.exists()) {
//         console.log("No products found");
//     } else {
//         snapshot.forEach(function (element) {
//             let data = element.val();
//             data.id = element.key.toString().replace("-", "").trim();
//             console.log(data);
//
//             getSearchResult(data);
//             console.log("searchResult = ", searchResult);
//
//             createProductCards(searchResult, '.card-container');
//         })
//     }
// })
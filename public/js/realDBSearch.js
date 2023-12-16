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

products.on("value", function (snapshot) {
    if (!snapshot.exists()) {
        console.log("No products found");
    } else {
        snapshot.forEach(function (element) {
            let data = element.val();
            data.id = element.key.toString().replace("-", "").trim();
            console.log(data);

            getSearchResult(data);
            console.log("searchResult = ", searchResult);

            createProductCards(searchResult, '.card-container');
        })
    }
})
const searchKey = decodeURI(location.pathname.split('/').pop());

const searchSpanElement = document.querySelector('#search-key');

searchSpanElement.innerHTML = searchKey;
document.title = " Search Result for " + searchKey.toUpperCase();

let keyWords = searchKey;
keyWords = cleanKeyWords(keyWords);
console.log("keyWords = ", keyWords);

function cleanKeyWords(string) {
    return string.trim().toLowerCase()
        .replace(/[^0-9A-Za-z_\u0400-\u04FF]/gi, ' ')
        .replace(/\s+/g, ' ')
        .split(" ");
}

let result = [];
let tempResult = "";

function getSearchResult(data) {

    if(keyWords.length) {
        const id = data.id;
        let tags = data.tags.toString() + data.name.toString() + data.shortDes.toString();

        tags = cleanTags(tags);

        keyWords.forEach((keyWord) => {
            if(keyWord.length > 2) {
                tags.forEach((tag) => {
                    if (tag.includes(keyWord)) {
                        if (!tempResult.includes(id)) {
                            tempResult += id + " ";
                            result.push(data);
                        }
                    }
                })
            }
        })

        return result;
    }
}
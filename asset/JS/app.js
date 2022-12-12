if (localStorage.getItem("basket") == null) {
    localStorage.setItem("basket", JSON.stringify([]));
}
let addBasketAll = document.querySelectorAll(".addBasket")
for (let addBasket of addBasketAll) {
    addBasket.addEventListener('click', function (e) {
        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]));
        }
        e.preventDefault();
        let basket = JSON.parse(localStorage.getItem("basket"));
        let name = this.parentElement.firstElementChild.innerText;
        let price = this.parentElement.firstElementChild.nextElementSibling.innerText;
        let src = this.parentElement.previousElementSibling.getAttribute("src");
        let data_id = this.parentElement.parentElement.getAttribute("data-id");
        addBasket.classList.add('disabled');
        addBasket.textContent = 'In Cart';
        let existingProduct = basket.find(p => p.Id == data_id);
        if (existingProduct === undefined) {
            basket.push({
                Id: data_id,
                Name: name,
                Src: src,
                Price: price,
                Count: 1
            })
        } else {
            existingProduct.Count += 1;
        }
        localStorage.setItem("basket", JSON.stringify(basket));
        cardCount();
    })
}
function cardCount() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    document.getElementById("CardCount").innerText = basket.length;
}
cardCount();
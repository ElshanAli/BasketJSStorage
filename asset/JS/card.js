function ShowAlert() {
    let basket = JSON.parse(localStorage.getItem('basket'));
    if (basket.length === 0) {
        document.getElementById('Alert').classList.remove('d-none')
        document.getElementById('AllProductBody').classList.add('d-none')
        document.getElementById('Total').classList.add('d-none')
    } else {
        document.getElementById('Alert').classList.add('d-none')
        let list = '';
        basket.forEach((p, index) => {
            list += `
              <tr>
              <td>
              ${index + 1}
              </td>
              <td>
                <img src="${p.Src}" alt="">
              </td>
              <td>
              ${p.Price}
              </td>
              <td>
              ${p.Name}
              </td>
              <td>
              <div class="buttons-increament-and-decreament">
              <i onclick="decreament(${p.Id})" class="bi bi-dash-lg"></i>
              <div id="${p.Id}" class="quantity">0</div>
              <i onclick="increament(${p.Id})" class="bi bi-plus-lg"></i>
            </div>
             
              </td>
             
              <td>
               <button class=" mt-3 w-50 btn btn-danger" onclick="removeProduct(event, ${p.Id})">
                <i class="fa-solid fa-trash-can btnDelete"></i>
                </button>
              </td>
            </tr>
  
              `
        });

        let totall = '';
        basket.forEach(() => {
            totall = `
        <tr>
        <td class="total-amount">
  
        </td>
        </tr>
        `
        });
        document.getElementById('tbody').innerHTML = list
        document.getElementById('ttotal').innerHTML = totall
    }
}


let increament = (PrId) => {

    let basket = JSON.parse(localStorage.getItem('basket'));
    basket = basket.map((p)=>{
        return p;
    })
    console.log(basket);
    let search = basket.find(pr => pr.Id == PrId);

    if (search == undefined) {

        console.log(search);
    }



};
let decreament = (Id) => {
    console.log(Id);
};
let update = () => {};




ShowAlert();

function removeProduct(event, productId) {
    // button click olunanda getsin tr yeni parenti tapsin ve silsin
    event.target.closest('tr').remove()
    let basket = JSON.parse(localStorage.getItem('basket'));
    let productIndex = basket.findIndex(pr => pr.Id == productId);
    basket.splice(productIndex, 1);
    localStorage.setItem("basket", JSON.stringify(basket));
    ShowAlert();
    cardCount();
    updateCartTotal();
}

function updateCartTotal() {
    let basket = JSON.parse(localStorage.getItem('basket'));
    var total = 0;
    for (var i = 0; i < basket.length; i++) {
        var cartRow = basket[i];
        var priceElement = cartRow.Price;
        var quantityElement = cartRow.Count;
        var prices = parseFloat(priceElement.replace('$', ''));
        total = total + (prices * quantityElement);
        total = Math.round(total * 100) / 100;
        document.querySelector('.total-amount').innerText = total + '$';
    }
    localStorage.setItem("basket", JSON.stringify(basket));
}
updateCartTotal();
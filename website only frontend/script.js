let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 4;

loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.box-container .box')];
    for (let i = currentItem; i < currentItem + 4; i++) {
        if (boxes[i]) {
            boxes[i].style.display = 'inline-block';
        }
    }
    currentItem += 4;

    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// cart
const cart = document.getElementById('cart');
const elements1 = document.getElementById('list-1');
const list = document.querySelector('#list-cart tbody');
const emptyCartBtn = document.getElementById('empty-cart');

chargeEventListeners();

function chargeEventListeners() {
    elements1.addEventListener('click', buyElement);
    cart.addEventListener('click', deleteElement);
    emptyCartBtn.addEventListener('click', emptyCart);
}

function buyElement(e) {
    e.preventDefault();

    if (e.target.classList.contains('add-to-cart')) {
        const element = e.target.parentElement.parentElement;
        readDataElement(element);
    }
}

function readDataElement(element) {
    const infoElement = {
        image: element.querySelector('img').src,
        title: element.querySelector('h3').textContent,
        price: element.querySelector('.price').textContent,
        id: element.querySelector('a').getAttribute('data-id')
    }
    insertCart(infoElement);
}

function insertCart(element) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${element.image}" width="100"></td>
        <td>${element.title}</td>
        <td>${element.price}</td>
        <td><a href="#" class="delete" data-id="${element.id}">X</a></td>
    `;
    list.appendChild(row);
}

function deleteElement(e) {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
    }
}

function emptyCart() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    return false;
}

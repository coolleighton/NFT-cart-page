import nftArray from "./data.js";
const itemsArea = document.getElementById("section-container")
const cartArea = document.getElementById("cart-items")
const totalPriceArea = document.getElementById("total-price")
const totalDiv = document.getElementById("total-div")
const paymentPopup = document.getElementById("payment-popup")

let cartHtmlObjArray = []
let totalPrice = 0

document.addEventListener("click", function(e) {

    if (e.target.dataset.button) {
        handleAddButton(e.target.dataset.button)
    }

    else if (e.target.dataset.button2) {
        handleDelButton(e.target.dataset.button2)
    }

    else if (e.target.id === "close-btn") {
        handleCloseBtn(e)
    }

    else if (e.target.id === "proceed-btn") {
        handleProceedBtn()
    }

    else if (e.target.id === "pay-btn") {
        handlePayBtn(e)
    }
})

function handleAddButton(itemId) {

    const targetObject = nftArray.filter(function(item){
        return item.id === itemId
    })[0]
 
    if (!targetObject.addedToCart) {
        totalPrice += targetObject.price
        targetObject.addedToCart = !targetObject.addedToCart
        totalPriceArea.innerHTML = totalPrice
        renderCart()
    }

    document.getElementById("thankyou-note").classList.add("hidden")
    totalDiv.classList.remove("hidden")

}

function handleDelButton(itemId) {

    const targetObject = nftArray.filter(function(item){
        return item.id === itemId
    })[0]
 
    if (targetObject.addedToCart) {
        totalPrice -= targetObject.price
        targetObject.addedToCart = !targetObject.addedToCart
        totalPriceArea.innerHTML = totalPrice
        renderCart()
    }

    if (totalPrice === 0) {
        totalDiv.classList.add("hidden")
    }
}

function handleCloseBtn(e) {
    e.preventDefault();
    paymentPopup.classList.add("hidden")
}

function handleProceedBtn() {
    paymentPopup.classList.remove("hidden")
}

function handlePayBtn(e) {
    e.preventDefault();
    paymentPopup.classList.add("hidden")
    totalDiv.classList.add("hidden")
    document.getElementById("thankyou-note").classList.remove("hidden")

    let userNameInput = document.getElementById("user-name-input")
    document.getElementById("user-name").innerHTML = userNameInput.value
}

function renderCart() {

    cartHtmlObjArray = nftArray.filter(function(item){

        return item.addedToCart === true

    })

    let cartHtml = ""

    cartHtmlObjArray.forEach(function(item){

        cartHtml += 
        `
        <div class="cart-item">
            <div class="cart-item-name">
                <p>${item.name}</p>
            </div>
        <p>£${item.price}</p>
        </div>
        `
    })

    cartArea.innerHTML = cartHtml

}

function getItemHtml() {

    let ItemHtml = ""

    nftArray.forEach(function(item){
    
    ItemHtml +=`
        <div  class="item-div">
            <img src="${item.image}">
            <div class="item-desc">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><span>£${item.price}</span></p>
            </div>
            <button data-button="${item.id}">+</button>
            <button class="remove-btn" data-button2="${item.id}">-</button>
        </div>
    `
    })
    return ItemHtml
}

function renderItems() {

    itemsArea.innerHTML = getItemHtml()
}

renderItems()
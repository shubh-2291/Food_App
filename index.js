import { foodItem } from "./fooditem.js";

let quickNaviagte = [];
const displayItem = () => {
    let biryaniElem = document.getElementById("biryani");
    let chickenElem = document.getElementById("chicken");
    let paneerElem = document.getElementById("paneer");
    let vegetableElem = document.getElementById("vegetable");
    let chineseElem = document.getElementById("chinese");
    let southIndianElem = document.getElementById("south-indian");

    let catList = [biryaniElem, chickenElem, paneerElem, vegetableElem, chineseElem, southIndianElem];

    let biryaniData = foodItem.filter(each => each.category == "biryani");
    let chickenData = foodItem.filter(each => each.category == "chicken");
    let paneerData = foodItem.filter(each => each.category == "paneer");
    let vegData = foodItem.filter(each => each.category == "vegetable");
    let chineseData = foodItem.filter(each => each.category == "chinese");
    let southIndianData = foodItem.filter(each => each.category == "south indian");

    let categorizedData = [biryaniData, chickenData, paneerData, vegData, chineseData, southIndianData];

    for (let each of categorizedData) {
        quickNaviagte.push(each[0]);
    };

    categorizedData.forEach((foodCategory, idx) => {
        foodCategory.map(eachItem => {

            let itemCard = document.createElement("div");
            itemCard.setAttribute("id", "item-card");

            let cardTop = document.createElement("div");
            cardTop.setAttribute("id", "card-top");

            let star = document.createElement("i");
            star.setAttribute("class", "fa fa-star");
            star.setAttribute("id", "rating");
            star.innerText = " " + eachItem.rating

            let heart = document.createElement("i");
            heart.setAttribute("class", "fa fa-heart-o add-to-cart");
            heart.setAttribute("id", eachItem.id);

            cardTop.appendChild(star);
            cardTop.appendChild(heart);

            let img = document.createElement("img");
            img.src = eachItem.img;

            let itemName = document.createElement("p");
            itemName.setAttribute("id", "item-name")
            itemName.innerText = eachItem.name;

            let itemPrice = document.createElement("p");
            itemPrice.setAttribute("id", "item-price");
            itemPrice.innerText = `Price : $ ${eachItem.price}`;

            const itemCardColor = ["#fddde2", "#dcf3f3", "#d9fdbc", "#fddde2", "#dcf3f3", "#d9fdbc"];

            itemCard.appendChild(cardTop);
            itemCard.appendChild(img);
            itemCard.appendChild(itemName);
            itemCard.appendChild(itemPrice);
            itemCard.setAttribute("style", `background-color:${itemCardColor[idx]}`)

            catList[idx].appendChild(itemCard);
        })
    })
}

const selectTaste = () => {
    let categoryList = document.getElementById("category-list");

    quickNaviagte.forEach(each => {
        let listCard = document.createElement("div");
        listCard.setAttribute("class", "list-card");

        let listImg = document.createElement("img");
        listImg.src = each.img;

        let listName = document.createElement("a");
        listName.setAttribute("class", "list-name");
        listName.innerText = each.category;
        listName.setAttribute("href", `#${each.category}`);

        listCard.appendChild(listImg);
        listCard.appendChild(listName);

        categoryList.appendChild(listCard);
    })
}

displayItem();
selectTaste();

let cartData = [];

const addToCart = (event) => {
    let itemToadd = event.srcElement.parentNode.nextSibling.nextSibling.innerText;
    let itemObj = foodItem.find(each => each.name == itemToadd);
    let index = cartData.indexOf(itemObj);

    if (index == -1) {
        document.getElementById(itemObj.id).classList.add("toggle-heart");
        cartData.push(itemObj);
    } else if (index > -1) {
        alert("it's already added");
    }
    // console.log(itemToadd);
    console.log(cartData);

    document.getElementById("cart-plus").innerText = " " + cartData.length + ' Items';
    totalAmount();
    cartItems();
}

const totalAmount = () => {
    let sum = 0;
    cartData.map(each => sum += each.price);
    document.getElementById("total-items").innerText = `Total Item : ${cartData.length}`;
    document.getElementById("total-price").innerText = `Total Price : $ ${sum}`;
}

const cartItems = () => {

    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""

    cartData.map(each => {
        let tableRow = document.createElement("tr");
        let rowData1 = document.createElement("td");
        let img = document.createElement("img");
        img.src = each.img;
        rowData1.appendChild(img);

        let rowData2 = document.createElement("td");
        rowData2.innerText = each.name;

        let rowData3 = document.createElement("td");
        let btn1 = document.createElement("button");
        btn1.setAttribute("class", "decrease-item");
        btn1.innerText = "-";

        let span = document.createElement("span");
        span.innerText = each.quantity;

        let btn2 = document.createElement("button");
        btn2.setAttribute("class", "increase-item");
        btn2.innerText = "+";

        rowData3.appendChild(btn1);
        rowData3.appendChild(span);
        rowData3.appendChild(btn2);

        let rowData4 = document.createElement("td");
        rowData4.innerText = `$ ${each.price}`;

        tableRow.appendChild(rowData1);
        tableRow.appendChild(rowData2);
        tableRow.appendChild(rowData3);
        tableRow.appendChild(rowData4);

        tableBody.appendChild(tableRow);
    })

    document.querySelectorAll(".decrease-item").forEach(item => item.addEventListener("click", decrementItem));

    document.querySelectorAll(".increase-item").forEach(item => item.addEventListener("click", incrementItem));

}

var currPrice = 0;
const incrementItem = (event) => {
    let itemToInc = event.srcElement.parentNode.previousSibling.innerText;

    let incObj = cartData.find(element => element.name == itemToInc);
    incObj.quantity += 1;

    currPrice = (incObj.price * incObj.quantity - incObj.price * (incObj.quantity - 1)) / (incObj.quantity - 1);
    incObj.price = currPrice * incObj.quantity;

    totalAmount();
    cartItems();
}

const decrementItem = (event) => {
    let itemToDec = event.srcElement.parentNode.previousSibling.innerText;
    let decObj = cartData.find(element => element.name == itemToDec);

    let index = cartData.indexOf(decObj);

    if (decObj.quantity > 1) {
        currPrice = (decObj.price * decObj.quantity - decObj.price * (decObj.quantity - 1)) / (decObj.quantity);
        decObj.quantity -= 1;
        decObj.price = currPrice * decObj.quantity;
    } else {
        document.getElementById(decObj.id).classList.remove('toggle-heart');
        cartData.splice(index, 1);
        document.getElementById("cart-plus").innerText = ` ${cartData.length} Items`;

        let flag = true;
        if (cartData.length < 1 && flag) {
            document.getElementById("food-items").classList.toggle("food-items");
            document.getElementById("category-list").classList.toggle("food-items");
            document.getElementById("cart-page").classList.toggle("cart-toggle");
            document.getElementById("checkout").classList.toggle("cart-toggle");
            flag = false;
            alert("currently no item in cart!");
            // console.log(flag);

        }
    }
    totalAmount()
    cartItems()
}

document.getElementById("add-address").addEventListener("click", addAddress);

function addAddress(){
    var address = prompt("Enter your address");
    if(address){
        document.getElementById("add-address").innerText = ` ${address}`
    }else{
        alert("Address not added");
    }
}

document.getElementById("cart-plus").addEventListener("click", cartToggle);

function cartToggle(){
    if(cartData.length > 0){
        document.getElementById("food-items").classList.toggle("food-items");
        document.getElementById("category-list").classList.toggle("food-items");
        document.getElementById("food-items").classList.toggle("remove-food-items");
        document.getElementById("category-list").classList.toggle("remove-food-items");
        document.getElementById("cart-page").classList.toggle("cart-toggle");
        document.getElementById("checkout").classList.toggle("cart-toggle");
    }else{
        alert("No items");
    }
}

const addEvents = () => {
    document.querySelectorAll(".add-to-cart").forEach(each => {
        each.addEventListener("click", addToCart)
    });

    document.querySelectorAll(".cart-btn").forEach(items => {
        items.addEventListener("click", () => {
            cartData = []
            alert("Order placed successfully");
            window.location.reload();
        })
    })
}

addEvents();
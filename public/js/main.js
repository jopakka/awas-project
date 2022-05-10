"use strict";
(async () => {
  const productList = document.querySelector("#productList");
  const buttonCreateProduct = document.querySelector("#createProduct");

  // Creates form for user input to create product
  const createProductForm = () => {

  };

  // Clears product listing and calls createProductContent();
  const loadContent = () => {
    console.log("loadcontent");
    productList.innerHTML = "";
    createProductContent();
  };

  // Creates Product content via DOM 
  const createProductContent = () => {
    console.log("createproductcontent");

    const productDiv = document.createElement("div");
    productDiv.classList.add("productContent");

    const productTitle = document.createElement("h3");
    const productDescription = document.createElement("p");

    productTitle.innerHTML = "new product title";
    productDescription.innerHTML = "new product description";

    productDiv.appendChild(productTitle);
    productDiv.appendChild(productDescription);

    const productCard = document.createElement("div");
    productCard.classList.add("productCard");

    productCard.appendChild(productDiv);

    productList.appendChild(productCard);
  };

  loadContent();

  buttonCreateProduct.addEventListener("click", (event) => {
    event.preventDefault();
    createProductForm()
    createProductContent();
  });
})();

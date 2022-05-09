"use strict";
() => {
  const productList = document.querySelector("#productList");
  console.log('do i exist?');

  loadContent();

  const loadContent = () => {
    // clear ul
    console.log("loadcontent");
    productList.innerHTML = "";
    createProductContent();
  };

  const createProductContent = () => {
    console.log("createproductcontent");
    const prdouctCard = document.createElement("card");
    const productTitle = document.createElement("h3");
    productTitle.innerHTML = "new product title";

    prdouctCard.appendChild(productTitle);

    productList.appendChild(prdouctCard);
  };
};

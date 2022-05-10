"use strict";

(async () => {
  const productList = document.querySelector("#productList");
  const createProductFormList = document.querySelector(
    "#createProductFormList"
  );
  const buttonCreateProduct = document.querySelector("#createProduct");

  // Creates form for user input to create product
  const createProductForm = () => {
    console.log("createProductForm");

    // if the form already exists, then ...
    if (document.querySelector("#createProductForm")) {
      console.log("createProductForm exists");
      // delete product form
      document.querySelector("#createProductForm").remove();
    } 

    // if the form doesn't exist, then ...
    else {
      console.log("createProductForm does not exist");
      // create product form

      // container for form
      const createProductContainer = document.createElement("div");
      createProductContainer.setAttribute("id", "createProductForm");

      // actual form
      const createProductFormContainer = document.createElement("form");
      createProductFormContainer.setAttribute(
        "id",
        "createProductFormContainer"
      );

      // title label
      const createProductFormLabelTitle = document.createElement("label");
      createProductFormLabelTitle.innerHTML = "Product Title";

      // title input
      const createProductFormInputTitle = document.createElement("input");
      createProductFormInputTitle.setAttribute("type", "text");
      createProductFormInputTitle.setAttribute(
        "name",
        "createProductFormTitle"
      );

      // description label
      const createProductFormLabelDescription = document.createElement("label");
      createProductFormLabelDescription.innerHTML = "Product Description";

      // description input
      const createProductFormInputDescription = document.createElement("input");
      createProductFormInputDescription.setAttribute("type", "text");
      createProductFormInputDescription.setAttribute(
        "name",
        "createProductFormDescription"
      );

      // submit form button (or technically input)
      const createProductFormInputSubmit = document.createElement("input");
      createProductFormInputSubmit.setAttribute("type", "submit");
      createProductFormInputSubmit.setAttribute("value", "submit");

      createProductFormLabelTitle.appendChild(createProductFormInputTitle);
      createProductFormLabelDescription.appendChild(
        createProductFormInputDescription
      );

      createProductFormContainer.appendChild(createProductFormLabelTitle);
      createProductFormContainer.appendChild(createProductFormLabelDescription);
      createProductFormContainer.appendChild(createProductFormInputSubmit);

      createProductContainer.appendChild(createProductFormContainer);
      createProductFormList.appendChild(createProductContainer);

      // click listener for submitting form
      createProductFormInputSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("submitted product");
        const title = createProductFormInputTitle.value;
        const description = createProductFormInputDescription.value;
        document.querySelector("#createProductForm").remove();
        loadContent(title, description);
      });
    }
  };

  // Clears product listing and calls createProductContent();
  const loadContent = (title, description) => {
    console.log("loadcontent", title, description);
    // productList.innerHTML = "";
    createProductContent(title, description);
  };

  // Creates Product content via DOM
  const createProductContent = (title, description) => {
    console.log("createproductcontent");

    const productContainer = document.createElement("div");
    productContainer.classList.add("productContent");

    const productTitle = document.createElement("h3");
    productTitle.classList.add("productTitle");
    const productDescription = document.createElement("article");
    productDescription.classList.add("productDescription")

    productTitle.innerHTML = title;
    productDescription.innerHTML = description;

    productContainer.appendChild(productTitle);
    productContainer.appendChild(productDescription);

    const productCard = document.createElement("div");
    productCard.classList.add("productCard");

    productCard.appendChild(productContainer);

    productList.appendChild(productCard);
  };

  loadContent();

  buttonCreateProduct.addEventListener("click", (event) => {
    event.preventDefault();
    createProductForm();
    //createProductContent();
  });
})();

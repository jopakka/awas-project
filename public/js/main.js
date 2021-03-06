"use strict";

(async () => {
  const productList = document.querySelector("#productList");
  const createProductFormList = document.querySelector(
    "#createProductFormList"
  );
  const buttonCreateProduct = document.querySelector("#createProduct");

  const getCookie = (name) => {
    try {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        .split("=")[1];
    } catch (e) {
      return null;
    }
  };

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
      createProductFormInputSubmit.addEventListener("click", async (event) => {
        event.preventDefault();

        const title = createProductFormInputTitle.value;
        const description = createProductFormInputDescription.value;

        const body = {
          title,
          description,
        };
        try {
          const response = await fetch("http://localhost:3000/product", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          if (response.status !== 200) {
            console.log("create product error: ", response.statusText);
          } else {
            console.log("success: ", response.statusText);
          }
        } catch (e) {
          console.error("create product error", e.message);
        }

        console.log("submitted product");
        document.querySelector("#createProductForm").remove();
        loadContent();
      });
    }
  };

  // Clears product listing and calls createProductContent();
  const loadContent = async () => {
    console.log("loadcontent");
    productList.innerHTML = "";
    try {
      console.log("try get1");
      const response = await fetch("http://localhost:3000/getAllProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("try get2");
      if (response.status !== 200) {
        console.log("get all products error: ", response.statusText);
      } else {
        const json = await response.json();
        console.log("try get3");
        console.log("success: ", json);
        json.forEach((e) => {
          console.log("loadcontent e:", e);
          createProductContent(
            e.ProductName,
            e.ProductDescription,
            e.UserId,
            e.id
          );
        });
      }
    } catch (error) {
      console.error("loadcontent error: ", error.message);
    }
  };

  // Creates Product content via DOM
  const createProductContent = (title, description, userId, productId) => {
    console.log("createproductcontent");

    const productContainer = document.createElement("div");
    productContainer.classList.add("productContent");

    const productTitle = document.createElement("h3");
    productTitle.classList.add("productTitle");
    const productDescription = document.createElement("article");
    productDescription.classList.add("productDescription");

    productTitle.innerHTML = title;
    productDescription.innerHTML = description;

    productContainer.appendChild(productTitle);
    productContainer.appendChild(productDescription);

    const isAdmin = getCookie("admin");
    const currentUserId = getCookie("userId");

    console.log('product user id: ', userId, "current user id: ", currentUserId, "is admin?: ", isAdmin);

    if (Number(userId) === Number(currentUserId) || isAdmin === "true") {
      console.log('here');
      const buttonDeleteProduct = document.createElement("button");
      buttonDeleteProduct.setAttribute("id", "buttonDeleteProduct");
      buttonDeleteProduct.innerHTML = "delete";
      productContainer.appendChild(buttonDeleteProduct);

      buttonDeleteProduct.addEventListener("click", async (event) => {
        event.preventDefault();
        console.log("clicked delete product, productId: ", productId);

        const body = {
          id: productId,
        };

        try {
          console.log("delete1");
          const response = await fetch("http://localhost:3000/deleteProductById", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
    
          console.log("delete2");
          if (response.status !== 200) {
            console.log("delete product error: ", response.statusText);
          } else {
            const json = await response.json();
            console.log("delete3");
            console.log("delete success: ", json);

            loadContent();
          }
        } catch (error) {
          console.error("delete product error: ", error.message);
        }
      });
    }

    const productCard = document.createElement("div");
    productCard.classList.add("productCard");

    productCard.appendChild(productContainer);

    productList.appendChild(productCard);
  };

  loadContent();

  buttonCreateProduct.addEventListener("click", async (event) => {
    event.preventDefault();
    createProductForm();
  });
})();

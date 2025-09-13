
let allCategoryContainer = document.querySelector(".all-category");
let mobileAllCategoryContainer = document.querySelector(".mobile-all-category");
let categoryBtn = document.querySelector(".category-btn");

const loadCategory = async () => {
  loadingSpinner(true, allCategoryContainer);
  let categoriesUrl = "https://openapi.programming-hero.com/api/categories";

  let response = await fetch(categoriesUrl);
  let data = await response.json();
  displayCategory(data.categories);
};

const displayCategory = (categories) => {
  loadingSpinner(false);
  let categoryList = categories
    .map((category) => {
      return `
        <li onclick="loadCategoryItem(${category.id})" id="${category.id}" class="category-${category.id} category cursor-pointer bg-gray-200 md:bg-transparent hover:bg-[#15803D] hover:text-white py-2 px-3 rounded-sm">
            ${category.category_name}
        </li>
    `;
    })
    .join(" ");

  const allTreesItem = ` 
      <li onclick="loadCategoryItem('plants')" id="plants" class="category-plants category cursor-pointer bg-gray-200 md:bg-transparent hover:bg-[#15803D] hover:text-white py-2 px-3 rounded-sm">
          All Trees
      </li>`;

  allCategoryContainer.innerHTML = categoryList;
  allCategoryContainer.insertAdjacentHTML("afterbegin", allTreesItem);
  mobileAllCategoryContainer.innerHTML = categoryList;
  mobileAllCategoryContainer.insertAdjacentHTML("afterbegin", allTreesItem);
};
// For Small Device
categoryBtn.addEventListener("click", () => {
  document.querySelector(".arrow-down").classList.toggle("rotate-180");
  mobileAllCategoryContainer.classList.toggle("min-h-[0px]");
  mobileAllCategoryContainer.classList.toggle("max-h-[250px]");
});

let cardContainer = document.querySelector(".card-container");

const loadCategoryItem = async (id) => {
  console.log(id);
  loadingSpinner(true, cardContainer);
  let categoryItemUrl =
    id === "plants"
      ? `https://openapi.programming-hero.com/api/${id}`
      : `https://openapi.programming-hero.com/api/category/${id}`;
  let response = await fetch(categoryItemUrl);
  let data = await response.json();
  displayCategoryItem(data.plants);
  addActiveClass(`category-${id}`);
};

const displayCategoryItem = (categoryItems) => {
  loadingSpinner(false);
  cardContainer.innerHTML = categoryItems
    .map((item) => {
      return `
            <div class="card-item flex flex-col justify-between p-3 bg-white rounded-md shadow-md overflow-hidden">
             <div class="w-full h-full max-h-[230px] md:max-h-[206px] object-cover overflow-hidden"> 
                <img class="w-full h-full bg-cover object-cover rounded-md" src="${item.image}" alt="" />
              </div>

              <h2 onclick="loadDetails(${item.id})" class="font-bold mb-3 mt-3 cursor-pointer">${item.name}</h2>
              <p class="text-sm text-[#1F2937]/80 mb-3">
                ${item.description}
              </p>

              <div class="flex justify-between items-center">
                <span
                  class="text-[#15803D] bg-[#DCFCE7] py-2 px-3 rounded-[35px]"
                  >${item.category}</span
                >
                <span class="font-medium">$${item.price}</span>
              </div>

              <button
                onclick="addToCart('${item.name}', ${item.price}, '${item.id}')"
                class="add-cart-btn btn bg-[#15803D] text-white rounded-3xl w-full py-3 mt-3"
              >
                Add to Card
              </button>
            </div>
        `;
    })
    .join(" ");
};

const removeActiveClass = () => {
  let allCategory = document.querySelectorAll(".category");
  allCategory.forEach((category) => {
    category.classList.remove("bg-[#15803D]", "text-white");
    category.classList.add("bg-gray-200", "md:bg-transparent");
  });
};

const addActiveClass = (className) => {
  removeActiveClass();

  let clickedItem = document.querySelectorAll(`.${className}`);
  clickedItem.forEach((clicked) => {
    clicked.classList.remove("bg-gray-200", "md:bg-transparent");
    clicked.classList.add("bg-[#15803D]", "text-white");
  });
};

loadCategory();
loadCategoryItem("plants");

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
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const itemFilter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

(function () {
  // Event listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearButton.addEventListener("click", clearItems);
  document.addEventListener("DOMContentLoaded", displayItems);
})();

// displaying items from local storage
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

// Add items to list item
function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add a new item");
    return;
  }

  //check if app state is in edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkItemExists(newItem)) {
      alert("That item already exists");
      return;
    }
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
}

function addItemToDOM(item) {
  // create a new item
  const listItem = document.createElement("li");
  const itemText = document.createTextNode(item);
  const deleteBtn = createButton("remove-item btn-link text-red");

  listItem.appendChild(itemText);
  listItem.appendChild(deleteBtn);
  itemList.appendChild(listItem);
}

// creates button with an icon and returns it
function createButton(classNames) {
  const button = document.createElement("button");
  const deleteIcon = createIcon("fa-solid fa-xmark");
  button.setAttribute("class", classNames);
  button.appendChild(deleteIcon);
  return button;
}

//creates an icon and returns it
function createIcon(classNames) {
  const icon = document.createElement("i");
  icon.setAttribute("class", classNames);
  return icon;
}

// adds an Item to localStorage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// returns all items from localStorage
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.nodeName.toLowerCase() === "li") {
    setItemToEdit(e.target);
  }
}

function checkItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

// sets the app state to edit mode
function setItemToEdit(item) {
  isEditMode = true;

  itemList.querySelectorAll("li").forEach((li) => {
    li.classList.remove("edit-mode");
  });

  formBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update Item`;
  formBtn.style.backgroundColor = "#228B22";
  item.classList.add("edit-mode");
  itemInput.value = item.textContent;
}

// delete Item from list item
function removeItem(item) {
  if (confirm("Are you sure?")) {
    item.remove();

    // remove from localStorage
    removeItemFromStorage(item.textContent);
    checkUI();
  }
}

// remove Item from localStorage
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //Reset localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// clear and removes all list items  from UI and localStorage
function clearItems() {
  if (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
    clearItems();
  }
  // clear localStorage
  localStorage.removeItem("items");
  checkUI();
}

// toogles the visibility of filter input and clear button if a list item exists or not
function checkUI() {
  itemInput.value = "";
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    itemFilter.style.display = "none";
    clearButton.style.display = "none";
    itemFilter.removeEventListener("input", filterItems);
  } else {
    itemFilter.style.display = "block";
    clearButton.style.display = "block";
    itemFilter.addEventListener("input", filterItems);
  }

  formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
  formBtn.style.color = "#333";
  isEditMode = false;
}

checkUI();

// display list items based of the filter input value
function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    if (item.firstChild.textContent.toLowerCase().includes(text)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const itemFilter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear");

// Event listeners
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);
document.addEventListener("DOMContentLoaded", displayItems);

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

function createButton(classNames) {
  const button = document.createElement("button");
  const deleteIcon = createIcon("fa-solid fa-xmark");
  button.setAttribute("class", classNames);
  button.appendChild(deleteIcon);
  return button;
}

function createIcon(classNames) {
  const icon = document.createElement("i");
  icon.setAttribute("class", classNames);
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

// delete Item from list item
function removeItem(e) {
  const target = e.target;
  if (target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

// clear all list items
function clearItems() {
  if (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
    clearItems();
  }
  checkUI();
}

// toogles the visibility of filter input and clear button if a list item exists or not
function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    itemFilter.style.display = "none";
    clearButton.style.display = "none";
    itemFilter.removeEventListener("input", filterItems);
    return;
  }
  itemFilter.style.display = "block";
  clearButton.style.display = "block";
  itemFilter.addEventListener("input", filterItems);
}

checkUI();

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

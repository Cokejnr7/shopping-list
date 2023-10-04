const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const itemFilter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear");

// Event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);

// Add items to list item
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add a new item");
    return;
  }

  // create a new item
  const listItem = document.createElement("li");
  const itemText = document.createTextNode(newItem);
  const deleteBtn = createButton("remove-item btn-link text-red");

  listItem.appendChild(itemText);
  listItem.appendChild(deleteBtn);
  itemList.appendChild(listItem);

  checkUI();

  itemInput.value = "";
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

function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    itemFilter.style.display = "none";
    clearButton.style.display = "none";
    return;
  }
  itemFilter.style.display = "block";
  clearButton.style.display = "block";
}

checkUI();

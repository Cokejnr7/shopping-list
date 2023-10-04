const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

// Event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);

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
    target.parentElement.parentElement.remove();
  }
}

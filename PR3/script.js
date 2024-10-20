const addItemButton = document.getElementById('add-btn');
const inputField = document.getElementById('new-item');
const shoppingList = document.getElementById('shopping-list');

function createListItem(itemText) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = itemText;
    li.appendChild(span);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        if (confirm('Are you sure you want to delete this item?')) {
            shoppingList.removeChild(li);
        }
    };
    li.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
        const newText = prompt('Edit the item:', span.textContent);
        if (newText) {
            span.textContent = newText;
        }
    };
    li.appendChild(editButton);

    return li;
}

addItemButton.onclick = function () {
    const newItemText = inputField.value.trim();
    if (newItemText) {
        const newItem = createListItem(newItemText);
        shoppingList.appendChild(newItem);
        inputField.value = '';
        inputField.focus();
    }
};
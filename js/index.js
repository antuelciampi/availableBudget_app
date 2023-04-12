let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("valor-gastos");
const balanceValue = document.getElementById("balance-total");
const list = document.getElementById("list");
let tempAmount = 0;

// Funciones presupuesto

totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    // Error
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        // Setear presupuesto
        amount.innerHTML = tempAmount;
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        // Limpiar
        totalAmount.value = "";
    }
});

// Crear lista y botones

const listCreator = (gastosNombre, gastosValor) => {
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content", "flex-space");
    subListContent.style.borderLeftColor="black"
    list.appendChild(subListContent);
    subListContent.innerHTML = `<p class="product">${gastosNombre}</p><p class="amount">${gastosValor}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.color = "black"
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.color = "black"
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(subListContent);
};


// Modificar elementos de la lista

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }

    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

// Agregar función gastos

checkAmountButton.addEventListener("click", () => {
    // Vacío
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    // Activar botones
    disableButtons(false);
    let expenditure = parseInt(userAmount.value);
    // Gasto total (existente + nuevo)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    // Total = presupuesto - gasto total
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    //Crear lista
    listCreator(productTitle.value, userAmount.value);
    //Limpiar
    productTitle.value = "";
    userAmount.value = "";
});

// Desactivar función editar y borrar

const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};
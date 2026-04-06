let inventory = [];
let recipe = [];

// ===== Inventory =====
function addItem() {
	let name = document.getElementById("itemName").value.trim();
	let qty = parseFloat(document.getElementById("itemQty").value);
	let cost = parseFloat(document.getElementById("itemCost").value);

	if (!name || isNaN(qty) || isNaN(cost)) {
		alert("Please fill out all fields with valid numbers.");
		return;
	}

	inventory.push({ name, qty, cost });
	renderInventory();
	updateRecipeDropdown();

	// Clear inputs
	document.getElementById("itemName").value = "";
	document.getElementById("itemQty").value = "";
	document.getElementById("itemCost").value = "";
	document.getElementById("itemName").focus();
}

function renderInventory() {
	let container = document.getElementById("inventory");
	container.innerHTML = "";

	inventory.forEach((item, index) => {
		container.innerHTML += `
			<div>
				<span>${item.name} - ${item.qty} ($${item.cost.toFixed(2)})</span>
				<button onclick="removeFromInventory(${index})">X</button>
			</div>
		`;
	});
}

function removeFromInventory(index) {
	inventory.splice(index, 1);
	renderInventory();
	updateRecipeDropdown();
}

// ===== Recipe =====
function addToRecipe() {
	let name = document.getElementById("recipeItem").value;
	let qtyUsed = parseFloat(document.getElementById("recipeQty").value);

	if (!name || isNaN(qtyUsed)) {
		alert("Enter valid name and quantity");
		return;
	}

	let item = inventory.find(i => i.name === name);
	if (!item) return;

	recipe.push({
		name: item.name,
		qtyUsed: qtyUsed,
		costPerUnit: item.cost,
		total: qtyUsed * item.cost
	});

	renderRecipe();

	// Clear inputs
	document.getElementById("recipeItem").value = "";
	document.getElementById("recipeQty").value = "";
	document.getElementById("recipeItem").focus();
}

function renderRecipe() {
	let container = document.getElementById("recipe");
	container.innerHTML = "";

	let total = 0;
	recipe.forEach((item, index) => {
		total += item.total;

		container.innerHTML += `
			<div>
				<span>${item.name} - ${item.qtyUsed} → $${item.total.toFixed(2)}</span>
				<button onclick="removeFromRecipe(${index})">X</button>
			</div>
		`;
	});

	document.getElementById("totalCost").innerText = "Total: $" + total.toFixed(2);
}

function removeFromRecipe(index) {
	recipe.splice(index, 1);
	renderRecipe();

	// Optional: clear recipe inputs
	document.getElementById("recipeItem").value = "";
	document.getElementById("recipeQty").value = "";
	document.getElementById("recipeItem").focus();
}

// ===== Dropdown =====
function updateRecipeDropdown() {
	let dropdown = document.getElementById("recipeItem");
	dropdown.innerHTML = '<option value="">Select an item</option>';

	inventory.forEach(item => {
		let option = document.createElement("option");
		option.value = item.name;
		option.text = item.name;
		dropdown.appendChild(option);
	});
}
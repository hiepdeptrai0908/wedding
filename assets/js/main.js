const headerTitleNameEl = document.querySelector(".header__title--name");
const headerFormInputName = document.querySelector(".header__form-input--name");

headerFormInputName.addEventListener("input", (e) => {
    let valueInput = e.target.value;
    e.target.value = capitalizeFirstLetter(valueInput);
    headerTitleNameEl.innerHTML = e.target.value;
});

function capitalizeFirstLetter(str) {
    if (str.length === 0) return str;
    return str
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
}

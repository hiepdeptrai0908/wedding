// Animated AOS
AOS.init({
    animatedClassName: "aos-animate",
});

// Elements
const headerElements = {
    titleName: document.querySelector(".header__title--name"),
    form: document.querySelector(".header__form"),
    formValidName: document.querySelector(".header__form-valid--name"),
    formInputName: document.querySelector(".header__form-input--name"),
    formInputRelation: document.querySelector(".header__form-input--relation"),
    formBtn: document.querySelector(".header__form-btn"),
    submitText: document.querySelector(".header__submit-text"),
};

const otherElements = {
    appMusic: document.querySelector(".app-music"),
};

const userInfo = {
    name: "",
    relation: "",
    phoneNumber: "",
};

// Header
// Nhập lấy giá trị ô input hiển thị ra ngoài
headerElements.formInputName.addEventListener("input", (e) => {
    let valueInput = e.target.value;
    if (valueInput.trim()) {
        headerElements.formValidName.hidden = true;
    }
    e.target.value = customFunctions.capitalizeFirstLetter(valueInput);
    headerElements.titleName.innerHTML = e.target.value;
});

// Lấy thông tin người dùng khi bấm button
headerElements.formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!headerElements.formInputName.value) {
        headerElements.formValidName.hidden = false;
        headerElements.formInputName.focus();
        return;
    }
    userInfo.name = headerElements.formInputName.value;
    userInfo.relation = headerElements.formInputRelation.value;
    headerElements.form.classList.add(
        "animate__animated",
        "animate__fadeOutLeft"
    );

    if (userInfo.name) {
        const honorific = customFunctions.getHonorific(userInfo.name);
        headerElements.submitText.innerHTML = `Cảm ơn <span class="primary-color">
        ${userInfo.name}</span> đã ghé xem thiệp cưới
        ${
            honorific
                ? ` của 
                <span class="primary-color">${honorific}</span>`
                : ""
        }</br>
        <button class="btn header__update-name-btn">SỬA LẠI TÊN</button>
        `;
        headerElements.submitText.style.display = "block";
        headerElements.submitText.classList.remove(
            "animate__animated",
            "animate__fadeOutRight"
        );
        headerElements.submitText.classList.add(
            "animate__animated",
            "animate__fadeInRight",
            "animate__delay-1s"
        );

        const headerUpdateNameBtnEl = document.querySelector(
            ".header__update-name-btn"
        );

        // Khi ấn vào botton sửa lại tên
        headerUpdateNameBtnEl.addEventListener("click", () => {
            userInfo.name && otherElements.appMusic.pause();
            headerElements.submitText.classList.remove(
                "animate__animated",
                "animate__fadeInRight",
                "animate__delay-1s"
            );

            headerElements.submitText.classList.add(
                "animate__animated",
                "animate__fadeOutRight"
            );

            headerElements.form.classList.remove(
                "animate__animated",
                "animate__fadeOutLeft"
            );
            headerElements.form.classList.add(
                "animate__animated",
                "animate__fadeInLeft"
            );
            headerElements.formInputName.focus();
        });
    }
    userInfo.name && otherElements.appMusic.play();
});

// Các hàm tiện ích
const customFunctions = {
    // Tự động viết hoa chữ cái đầu tiên mỗi từ
    capitalizeFirstLetter: (string) => {
        if (string.length === 0) return string;
        return string
            .split(" ")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
    },
    // Logic xác định xưng hô
    getHonorific: (name) => {
        let honorific = "";
        if (name.startsWith("Anh") || name.startsWith("Chị")) {
            honorific = "chúng em"; // Nếu tên bắt đầu bằng "Chị", "Cô", "Dì", "Bà", "Ngoại", "Mẹ" gọi là "em"
        }
        if (
            name.startsWith("Cô") ||
            name.startsWith("Chú") ||
            name.startsWith("Dì") ||
            name.startsWith("Dượng") ||
            name.startsWith("Ông") ||
            name.startsWith("Bà") ||
            name.startsWith("Mẹ") ||
            name.startsWith("Cha") ||
            name.startsWith("Bố") ||
            name.startsWith("Ngoại") ||
            name.startsWith("Cố") ||
            name.startsWith("Thím") ||
            name.startsWith("Cậu") ||
            name.startsWith("Mợ") ||
            name.startsWith("Mự") ||
            name.startsWith("Bác") ||
            name.startsWith("Hai")
        ) {
            honorific = "chúng con"; // Nếu tên bắt đầu bằng "Anh", "Chú", "Chú", "Bác", "Dượng", "Ông" gọi là "chị"
        }
        if (name.startsWith("Em")) {
            honorific = "anh chị"; // Nếu tên bắt đầu bằng "Em", gọi là "anh chị"
        }
        if (name.startsWith("Bạn")) {
            honorific = "tớ"; // Nếu tên bắt đầu bằng "Bạn", gọi là "tớ"
        }
        return honorific; // Trả về honorific
    },
};

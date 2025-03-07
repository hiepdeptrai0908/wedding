// Animated AOS
AOS.init({
    animatedClassName: "aos-animate",

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1000, // values from 0 to 3000, with step 50ms
    easing: "ease-in", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom",
});

const settings = {
    countdownDate: new Date("March 20, 2025 17:30:00").getTime(), // Ngày cưới
    stk: "102601090897", // Số tài khoản
};

// Elements
const headerElements = {
    titleName: document.querySelector(".header__title--name"),
    form: document.querySelector(".header__form"),
    formValidName: document.querySelector(".header__form-valid--name"),
    formInputName: document.querySelector(".header__form-input--name"),
    formInputRelation: document.querySelector(".header__form-input--relation"),
    formBtn: document.querySelector(".header__form-btn"),
    submitText: document.querySelector(".header__submit-text"),
    arrowUp: document.querySelector(".header__arrow-up"),
};

const userInfo = {
    name: "",
    relation: "",
    phoneNumber: "",
};

const infoDayElements = {
    infoDay: document.querySelector(".info-days"),
};

const captionElements = {
    caption: document.querySelector(".caption"),
    nameItem: document.querySelector(".caption__name-item"),
};

const otherElements = {
    appMusic: document.querySelector(".app-music"),
};

// Section elements
const sectionElements = {
    section1: document.querySelector(".section1"),
    section2: document.querySelector(".section2"),
    section3: document.querySelector(".section3"),
    section4: document.querySelector(".section4"),
    section5: document.querySelector(".section5"),
    section6: document.querySelector(".section6"),
    section7: document.querySelector(".section7"),
    bgImg: document.querySelector(".bg-img"),
    title: document.querySelector(".title"),
};

// Section 1 Elements
const section1Elements = {
    heading: document.querySelector(".section1 .heading"),
    desc: document.querySelector(".section1 .desc"),
};

// Section 5 elements
const section5Elements = {
    giftBtn: document.querySelector(".gift-btn"),
    acceptOption: document.querySelector(".options"),
    wishInput: document.querySelector("#wish"),
    acceptBtn: document.querySelector(".info-accept-btn"),
};

// Section 6 elements
const section6Elements = {
    closeBtn: document.querySelector(".close-btn"),
    section6: document.querySelector(".section6"),
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
        headerElements.submitText.innerHTML = `Cảm ơn <span class="color-pink">
        ${userInfo.name}</span> đã ghé xem thiệp cưới
        ${
            honorific
                ? ` của 
                <span class="color-pink">${honorific}</span>`
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

        // Show
        customFunctions.showElement(headerElements.arrowUp);
        customFunctions.showElement(sectionElements.section1);
        customFunctions.showElement(sectionElements.section2);
        customFunctions.showElement(sectionElements.section3);
        customFunctions.showElement(sectionElements.section4);
        customFunctions.showElement(sectionElements.section5);
        customFunctions.showElement(sectionElements.section7);
        customFunctions.showElement(sectionElements.bgImg);
        customFunctions.showElement(sectionElements.title);

        const headerUpdateNameBtnEl = document.querySelector(
            ".header__update-name-btn"
        );

        // Khi ấn vào botton sửa lại tên
        headerUpdateNameBtnEl.addEventListener("click", () => {
            userInfo.name && otherElements.appMusic.pause();

            // Text
            headerElements.submitText.classList.remove(
                "animate__animated",
                "animate__fadeInRight",
                "animate__delay-1s"
            );

            headerElements.submitText.classList.add(
                "animate__animated",
                "animate__fadeOutRight"
            );

            // Form
            headerElements.form.classList.remove(
                "animate__animated",
                "animate__fadeOutLeft"
            );
            headerElements.form.classList.add(
                "animate__animated",
                "animate__fadeInLeft"
            );

            // Hide
            customFunctions.hideElement(headerElements.arrowUp);
            customFunctions.hideElement(sectionElements.section1);
            customFunctions.hideElement(sectionElements.section2);
            customFunctions.hideElement(sectionElements.section3);
            customFunctions.hideElement(sectionElements.section4);
            customFunctions.hideElement(sectionElements.section5);
            customFunctions.hideElement(sectionElements.section7);
            customFunctions.hideElement(sectionElements.bgImg);
            customFunctions.hideElement(sectionElements.title);

            headerElements.formInputName.focus();
        });

        section1Elements.desc.innerHTML = `
            <p data-aos="fade-up">
                * Trân trọng kính mời ${userInfo.name} và gia đình đến tham dự lễ
                cưới của ${honorific}.
            </p>
            <p data-aos="fade-up">
                * Lời mời online này thay cho tấm thiệp hồng trao
                tay, mong ${userInfo.name} và gia đình sẽ chung vui cùng ${honorific} trong ngày đặc biệt này.</p>
            `;

        section5Elements.wishInput.value = `${userInfo.name} chúc hai vợ chồng trăm năm hạnh phúc.`;

        fetch("https://staff-333-api.herokuapp.com/api/wedding/view-wedding", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name: userInfo.name,
                relation: userInfo.relation, // Nếu cần gửi thêm quan hệ
            }),
        });
    }

    userInfo.name && otherElements.appMusic.play();
});

section5Elements.wishInput.value = `Chúc hai vợ chồng trăm năm hạnh phúc.`;
// Gửi lời chúc
document.addEventListener("DOMContentLoaded", function () {
    const confirmButton = section5Elements.acceptBtn;

    confirmButton.addEventListener("click", function () {
        const selectOption = section5Elements.acceptOption.value.trim();
        const wishMessage = section5Elements.wishInput.value.trim();
        const userName = userInfo.name.trim(); // Lấy tên người dùng từ input

        // Kiểm tra dữ liệu đầu vào
        if (!selectOption) {
            alert("Vui lòng chọn câu trả lời!");
            return;
        }
        // if (!userName) {
        //     alert("Vui lòng nhập tên của bạn!");
        //     return;
        // }

        const confirmSend = confirm(
            "Bạn có chắc chắn muốn gửi xác nhận không?"
        );
        if (!confirmSend) {
            return;
        }

        showLoadingModal();
        const requestData = {
            user_name: userName || "Không tên",
            attendance: selectOption,
            relation: userInfo.relation,
            wish: wishMessage || "Chúc mừng hạnh phúc!",
        };

        fetch(
            "https://staff-333-api.herokuapp.com/api/wedding/accept-wedding",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Lỗi từ server: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                alert("Gửi lời xác nhận thành công!");
            })
            .catch((error) => {
                alert("Đã xảy ra lỗi! Vui lòng thử lại.");
                console.error("Lỗi:", error);
            })
            .finally(() => {
                hideLoadingModal();
            });
    });
});

// Đóng modal
function handleCloseModal() {
    section6Elements.section6.style.display = "none";
}

// Mở modal
function handleOpenModal() {
    section6Elements.section6.style.display = "flex";
}

// Tải ảnh và sao chép số tài khoản
document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.querySelector(".download-img");
    const copyBtn = document.querySelector(".copy-img");
    const bankImg = document.querySelector(".bank-img");

    // Chức năng tải ảnh
    downloadBtn.addEventListener("click", function () {
        const imgSrc = bankImg.src;
        const link = document.createElement("a");
        link.href = imgSrc;
        link.download = "bank.png"; // Đổi tên file khi tải xuống
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Chức năng sao chép STK (giả sử STK hiển thị trong thuộc tính data-stk)
    copyBtn.addEventListener("click", function () {
        navigator.clipboard
            .writeText(settings.stk)
            .then(() => {
                alert("Đã sao chép số tài khoản.");
            })
            .catch((err) => {
                console.error("Lỗi khi sao chép");
            });
    });
    // Đóng mở modal
    section5Elements.giftBtn.addEventListener("click", handleOpenModal);
    section6Elements.closeBtn.addEventListener("click", handleCloseModal);
});

// Các hàm tiện ích
const customFunctions = {
    // Tự động viết hoa chữ cái đầu tiên của mỗi từ
    capitalizeFirstLetter: (string) => {
        return string
            .split(" ")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
    },

    // Hiển thị phần tử
    showElement: (element) => {
        if (element) element.style.display = "flex";
    },

    // Ẩn phần tử
    hideElement: (element) => {
        if (element) element.style.display = "none";
    },

    // Xác định cách xưng hô dựa vào tên
    getHonorific: (name) => {
        if (!name) return ""; // Nếu không có tên, trả về chuỗi rỗng

        const honorificGroups = {
            "chúng em": ["Anh", "Chị"],
            "chúng con": [
                "Cô",
                "Chú",
                "Dì",
                "Dượng",
                "Ông",
                "Bà",
                "Mẹ",
                "Cha",
                "Bố",
                "Ngoại",
                "Cố",
                "Thím",
                "Cậu",
                "Mợ",
                "Mự",
                "Bác",
                "Hai",
            ],
            "anh chị": ["Em", "Bé"],
            "chúng mình": ["Bạn"],
        };

        for (const [honorific, prefixes] of Object.entries(honorificGroups)) {
            if (prefixes.some((prefix) => name.startsWith(prefix))) {
                return honorific;
            }
        }

        return ""; // Trả về chuỗi rỗng nếu không tìm thấy
    },

    // Đếm ngược đến một ngày cụ thể
    countdown: (targetDate) => {
        const countdownDate = new Date(targetDate).getTime();
        if (isNaN(countdownDate)) {
            console.error("Ngày đếm ngược không hợp lệ!");
            return;
        }

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            const timeElements = document.querySelectorAll(".time");

            if (distance <= 0) {
                clearInterval(interval);
                timeElements.forEach((el) => (el.textContent = "00"));
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timeElements[0].textContent = days.toString().padStart(2, "0");
            timeElements[1].textContent = hours.toString().padStart(2, "0");
            timeElements[2].textContent = minutes.toString().padStart(2, "0");
            timeElements[3].textContent = seconds.toString().padStart(2, "0");
        }

        updateCountdown(); // Cập nhật ngay khi trang tải
        const interval = setInterval(updateCountdown, 1000);
    },
};

// Chạy đếm ngược đến ngày 20/03/2025
customFunctions.countdown(settings.countdownDate);

// Scroll events
let scrollValue = window.scrollY;
window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // Kiểm tra người dùng cuộn lên hay xuống
    if (currentScroll < scrollValue) {
        customFunctions.showElement(headerElements.arrowUp);
    } else {
        customFunctions.hideElement(headerElements.arrowUp);
    }
    scrollValue = currentScroll;
});

// lướt ảnh tự động
document.addEventListener("DOMContentLoaded", function () {
    const listImgsElements = document.querySelectorAll(".list-imgs"); // Lựa chọn tất cả các list-imgs
    listImgsElements.forEach((listImgs) => {
        const images = listImgs.querySelectorAll(".img"); // Lấy tất cả các ảnh trong mỗi list-imgs
        let currentIndex = 0;
        let autoScrollInterval;
        let isUserScrolling = false;
        let scrollTimeout;
        const intervalTime = 1500; // Thời gian giữa mỗi lần cuộn (ms)

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (!isUserScrolling) {
                    currentIndex++;

                    // Khi đến cuối, quay lại đầu
                    if (currentIndex >= images.length) {
                        currentIndex = 0;
                    }

                    scrollToImage(currentIndex);
                }
            }, intervalTime);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        function scrollToImage(index) {
            if (images[index]) {
                listImgs.scrollTo({
                    left: images[index].offsetLeft - listImgs.offsetLeft - 20, // Trừ đi 20px
                    behavior: "smooth",
                });
            }
        }

        // Khi người dùng cuộn, dừng tự động cuộn
        listImgs.addEventListener("scroll", function () {
            isUserScrolling = true;
            stopAutoScroll();

            // Tiếp tục sau 2 giây nếu không có cuộn tiếp theo
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
                startAutoScroll();
            }, intervalTime);
        });

        // Bắt đầu tự động cuộn khi trang tải xong
        startAutoScroll();
    });
});

// Hàm hiện modal loading
function showLoadingModal() {
    const loadingModal = document.getElementById("loadingModal");
    loadingModal.style.display = "flex";
}

// Hàm để ẩn modal loading
function hideLoadingModal() {
    const loadingModal = document.getElementById("loadingModal");
    loadingModal.style.display = "none";
}

/**
 * GiftBox — Конструктор подарунка та Адмін панель
 * Повна реалізація клієнтської частини та адміністрування каталогу подарунків
 */

// 1. Початковий каталог подарунків за замовчуванням
const DEFAULT_GIFTS = [
    {
        id: 1,
        title: "Солодкий набір",
        emoji: "🍫",
        price: 350,
        tier: "budget", // budget (<500), medium (500-1000), premium (1000+)
        recipients: ["all"],
        events: ["all"],
        description: "Крафтовий шоколад ручної роботи та асорті смачних цукерок.",
        image: "",
        active: true
    },
    {
        id: 2,
        title: "Ароматична свічка",
        emoji: "🕯️",
        price: 280,
        tier: "budget",
        recipients: ["мами", "подруги", "дівчини", "сестри", "бабусі"],
        events: ["all"],
        description: "Натуральна соєва свічка з ніжним ароматом ванілі та лаванди.",
        image: "",
        active: true
    },
    {
        id: 3,
        title: "Листівка з теплими побажаннями",
        emoji: "💌",
        price: 90,
        tier: "budget",
        recipients: ["all"],
        events: ["all"],
        description: "Дизайнерська листівка з душевним текстом та каліграфією.",
        image: "",
        active: true
    },
    {
        id: 4,
        title: "Термокружка для кави та чаю",
        emoji: "☕",
        price: 450,
        tier: "budget",
        recipients: ["тата", "друга", "хлопця", "брата", "дідуся"],
        events: ["all"],
        description: "Зручна та герметична термочашка, що тримає тепло до 6 годин.",
        image: "",
        active: true
    },
    {
        id: 5,
        title: "Подарунковий бокс сюрпризів",
        emoji: "🎁",
        price: 750,
        tier: "medium",
        recipients: ["all"],
        events: ["all"],
        description: "Стильно оформлений подарунковий бокс із приємними сувенірами.",
        image: "",
        active: true
    },
    {
        id: 6,
        title: "Улюблені солодощі та горіхи",
        emoji: "🍬",
        price: 300,
        tier: "medium",
        recipients: ["all"],
        events: ["all"],
        description: "Асорті добірних горіхів у шоколаді та карамелі.",
        image: "",
        active: true
    },
    {
        id: 7,
        title: "Колекційний набір чаю та кави",
        emoji: "🫖",
        price: 680,
        tier: "medium",
        recipients: ["мами", "тата", "бабусі", "дідуся", "подруги"],
        events: ["all"],
        description: "Добірні сорти високогірного чаю та свіжообсмаженої арабіки.",
        image: "",
        active: true
    },
    {
        id: 8,
        title: "Шкіряний аксесуар / гаманець",
        emoji: "👛",
        price: 920,
        tier: "medium",
        recipients: ["тата", "хлопця", "брата", "дідуся", "друга"],
        events: ["all"],
        description: "Стильний гаманець з натуральної шкіри з відділеннями для карток.",
        image: "",
        active: true
    },
    {
        id: 9,
        title: "Затишний теплий плед",
        emoji: "🧣",
        price: 850,
        tier: "medium",
        recipients: ["бабусі", "дідуся", "мами", "сестри"],
        events: ["all"],
        description: "М'який та приємний на дотик вовняний плед для домашнього затишку.",
        image: "",
        active: true
    },
    {
        id: 10,
        title: "Преміальний подарунковий набір",
        emoji: "✨",
        price: 1500,
        tier: "premium",
        recipients: ["all"],
        events: ["all"],
        description: "Ексклюзивний набір преміум-класу у дерев'яному боксі.",
        image: "",
        active: true
    },
    {
        id: 11,
        title: "Букет свіжих квітів",
        emoji: "💐",
        price: 1200,
        tier: "premium",
        recipients: ["мами", "подруги", "дівчини", "сестри", "бабусі"],
        events: ["Дня народження", "8 Березня", "річниці", "випускного"],
        description: "Авторська флористична композиція зі свіжих сезонних квітів.",
        image: "",
        active: true
    },
    {
        id: 12,
        title: "Бездротові Bluetooth-навушники",
        emoji: "🎧",
        price: 1850,
        tier: "premium",
        recipients: ["брата", "сестри", "друга", "хлопця", "дівчини"],
        events: ["all"],
        description: "Якісний чистий звук, шумозаглушення та до 24 годин роботи.",
        image: "",
        active: true
    },
    {
        id: 13,
        title: "Набір для СПА та догляду",
        emoji: "🧴",
        price: 1100,
        tier: "premium",
        recipients: ["мами", "дівчини", "сестри", "подруги"],
        events: ["all"],
        description: "Органічна косметика, натуральні скраби, олії та піна для ванни.",
        image: "",
        active: true
    }
];

const STORAGE_KEY = "giftbox_catalog_v2";

// 2. Керування сховищем подарунків (localStorage)
function getGifts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error("Помилка читання localStorage:", e);
    }
    // Якщо сховище пусте — зберігаємо початкові дані
    saveGifts(DEFAULT_GIFTS);
    return DEFAULT_GIFTS;
}

function saveGifts(gifts) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
    } catch (e) {
        console.error("Помилка збереження localStorage:", e);
    }
    updateGiftsCountBadge();
}

function resetToDefaultGifts() {
    if (confirm("Ви дійсно бажаєте скинути всі подарунки до стандартного каталогу? Ваші зміни буде видалено.")) {
        saveGifts(DEFAULT_GIFTS);
        renderAdminGifts();
        showToast("Каталог відновлено до початкового стану", "info");
    }
}

// 3. Допоміжні функції для категорій та значків
function getTierLabel(tier) {
    switch (tier) {
        case "budget": return "До 500 ₴";
        case "medium": return "500 - 1000 ₴";
        case "premium": return "1000+ ₴";
        default: return "Каталог";
    }
}

function getTierClass(tier) {
    switch (tier) {
        case "budget": return "badge-budget";
        case "medium": return "badge-medium";
        case "premium": return "badge-premium";
        default: return "badge-budget";
    }
}

// 4. Ініціалізація DOM елементів
document.addEventListener("DOMContentLoaded", () => {
    // Елементи конструктора
    const createBtn = document.getElementById("createBtn");
    const result = document.getElementById("result");
    const error = document.getElementById("error");
    const recipientSelect = document.getElementById("recipient");
    const eventSelect = document.getElementById("event");
    const budgetInput = document.getElementById("budget");

    // Елементи вкладок
    const tabConstructor = document.getElementById("tabConstructor");
    const tabAdmin = document.getElementById("tabAdmin");
    const viewConstructor = document.getElementById("viewConstructor");
    const viewAdmin = document.getElementById("viewAdmin");
    const mainContainer = document.querySelector(".container");

    // Елементи адмінки
    const adminGiftsList = document.getElementById("adminGiftsList");
    const adminSearchInput = document.getElementById("adminSearchInput");
    const adminTierFilter = document.getElementById("adminTierFilter");
    const addNewGiftBtn = document.getElementById("addNewGiftBtn");
    const resetDefaultsBtn = document.getElementById("resetDefaultsBtn");

    // Елементи модального вікна
    const giftModal = document.getElementById("giftModal");
    const giftEditForm = document.getElementById("giftEditForm");
    const modalTitle = document.getElementById("modalTitle");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const cancelModalBtn = document.getElementById("cancelModalBtn");
    const modalGiftId = document.getElementById("modalGiftId");
    const modalGiftTitle = document.getElementById("modalGiftTitle");
    const modalGiftEmoji = document.getElementById("modalGiftEmoji");
    const modalGiftPrice = document.getElementById("modalGiftPrice");
    const modalGiftTier = document.getElementById("modalGiftTier");
    const modalGiftDesc = document.getElementById("modalGiftDesc");
    const modalGiftImage = document.getElementById("modalGiftImage");
    const modalGiftActive = document.getElementById("modalGiftActive");
    const modalImagePreview = document.getElementById("modalImagePreview");

    // Лічильники
    updateGiftsCountBadge();

    // =========================================================================
    // Вкладки (Tabs Switching)
    // =========================================================================
    function switchTab(tabName) {
        if (tabName === "admin") {
            tabConstructor.classList.remove("active");
            tabConstructor.setAttribute("aria-selected", "false");
            tabAdmin.classList.add("active");
            tabAdmin.setAttribute("aria-selected", "true");

            viewConstructor.classList.remove("active");
            viewAdmin.classList.add("active");
            mainContainer.classList.add("admin-expanded");

            renderAdminGifts();
        } else {
            tabAdmin.classList.remove("active");
            tabAdmin.setAttribute("aria-selected", "false");
            tabConstructor.classList.add("active");
            tabConstructor.setAttribute("aria-selected", "true");

            viewAdmin.classList.remove("active");
            viewConstructor.classList.add("active");
            mainContainer.classList.remove("admin-expanded");
        }
    }

    tabConstructor.addEventListener("click", () => switchTab("constructor"));
    tabAdmin.addEventListener("click", () => switchTab("admin"));

    // =========================================================================
    // ЛОГІКА КОНСТРУКТОРА ПОДАРУНКІВ
    // =========================================================================
    createBtn.addEventListener("click", function () {
        const recipient = recipientSelect.value;
        const event = eventSelect.value;
        const budget = parseFloat(budgetInput.value);

        error.textContent = "";

        if (!recipient || !event || !budget || budget <= 0) {
            error.textContent = "⚠️ Заповніть усі поля коректно.";
            result.style.display = "none";
            return;
        }

        // Отримуємо актуальні активні подарунки
        const allGifts = getGifts().filter(g => g.active !== false);

        // Фільтруємо подарунки, що підходять під бюджет, отримувача та подію
        let matchingGifts = allGifts.filter(g => {
            const matchesBudget = g.price <= budget;
            const matchesRecipient = g.recipients.includes("all") || g.recipients.includes(recipient);
            const matchesEvent = g.events.includes("all") || g.events.includes(event);
            return matchesBudget && matchesRecipient && matchesEvent;
        });

        // Якщо за точними критеріями замало — додаємо подарунки для "всіх" у цьому бюджеті
        if (matchingGifts.length < 2) {
            const fallbackGifts = allGifts.filter(g => {
                const tierMatches = (budget < 500 && g.tier === "budget") ||
                                    (budget >= 500 && budget < 1000 && (g.tier === "budget" || g.tier === "medium")) ||
                                    (budget >= 1000);
                return tierMatches && !matchingGifts.some(m => m.id === g.id);
            });
            matchingGifts = [...matchingGifts, ...fallbackGifts];
        }

        // Якщо все одно порожньо (наприклад, всі видалені), беремо будь-які доступні
        if (matchingGifts.length === 0) {
            matchingGifts = allGifts.slice(0, 3);
        }

        // Сортуємо: спершу за релевантністю та ціною, щоб вписатись у бюджет
        matchingGifts.sort((a, b) => b.price - a.price);

        // Обираємо набір елементів, що сумарно найкраще підходять під бюджет
        let selectedItems = [];
        let runningTotal = 0;

        for (const item of matchingGifts) {
            if (runningTotal + item.price <= budget || selectedItems.length < 2) {
                selectedItems.push(item);
                runningTotal += item.price;
            }
            if (selectedItems.length >= 4) break;
        }

        if (selectedItems.length === 0) {
            selectedItems = matchingGifts.slice(0, 3);
            runningTotal = selectedItems.reduce((acc, cur) => acc + cur.price, 0);
        }

        // Формуємо красивий HTML перелік подарунка
        let giftHtml = selectedItems.map(item => `
            <p>
                <span class="gift-item-details">
                    <span>${item.emoji || "🎁"} <strong>${escapeHtml(item.title)}</strong></span>
                    <small style="color: #7c6f82; font-size: 0.82rem;">${escapeHtml(item.description)}</small>
                </span>
                <span class="gift-item-price">${item.price} ₴</span>
            </p>
        `).join("");

        result.innerHTML = `
            <h2>🎁 Ваш персональний подарунок</h2>
            <p><strong>Для:</strong> ${escapeHtml(recipient)}</p>
            <p><strong>Подія:</strong> ${escapeHtml(event)}</p>
            <p><strong>Ваш бюджет:</strong> ${budget} ₴</p>
            <p><strong>Орієнтовна вартість комплекту:</strong> ${runningTotal} ₴</p>
            <div class="gift">
                <strong>Що входить у подарунок:</strong>
                ${giftHtml}
            </div>
            <button type="button" onclick="resetForm()">Зібрати інший подарунок</button>
        `;

        result.style.display = "block";
        result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    // =========================================================================
    // АДМІН ПАНЕЛЬ: РЕНДЕРИНГ ТА КЕРУВАННЯ
    // =========================================================================
    window.renderAdminGifts = function () {
        const gifts = getGifts();
        const searchQuery = (adminSearchInput.value || "").trim().toLowerCase();
        const filterTier = adminTierFilter.value;

        // Оновлюємо статистику
        const totalCount = gifts.length;
        const budgetCount = gifts.filter(g => g.tier === "budget").length;
        const mediumCount = gifts.filter(g => g.tier === "medium").length;
        const premiumCount = gifts.filter(g => g.tier === "premium").length;

        document.getElementById("statTotal").textContent = totalCount;
        document.getElementById("statBudget").textContent = budgetCount;
        document.getElementById("statMedium").textContent = mediumCount;
        document.getElementById("statPremium").textContent = premiumCount;

        // Фільтрація
        const filteredGifts = gifts.filter(gift => {
            const matchesSearch = !searchQuery ||
                gift.title.toLowerCase().includes(searchQuery) ||
                (gift.description && gift.description.toLowerCase().includes(searchQuery));
            const matchesTier = !filterTier || gift.tier === filterTier;
            return matchesSearch && matchesTier;
        });

        if (filteredGifts.length === 0) {
            adminGiftsList.innerHTML = `
                <div class="admin-empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3 style="font-size: 1.2rem; color: #4a3e56; margin-bottom: 6px;">Подарунків не знайдено</h3>
                    <p style="color: #7c6f82; font-size: 0.95rem;">Спробуйте змінити пошуковий запит або додайте новий подарунок.</p>
                </div>
            `;
            return;
        }

        adminGiftsList.innerHTML = filteredGifts.map(gift => {
            const recipientsText = gift.recipients.includes("all")
                ? '<span class="meta-pill">Для всіх</span>'
                : gift.recipients.map(r => `<span class="meta-pill">${escapeHtml(r)}</span>`).join(" ");

            const eventsText = gift.events.includes("all")
                ? '<span class="meta-pill">Всі події</span>'
                : gift.events.map(ev => `<span class="meta-pill">${escapeHtml(ev)}</span>`).join(" ");

            const avatarContent = gift.image
                ? `<img src="${escapeHtml(gift.image)}" alt="${escapeHtml(gift.title)}" onerror="this.onerror=null; this.parentElement.innerHTML='${gift.emoji || "🎁"}';">`
                : (gift.emoji || "🎁");

            return `
                <div class="gift-card-admin ${gift.active === false ? 'inactive' : ''}" data-id="${gift.id}">
                    <div>
                        <div class="gift-card-top">
                            <div class="gift-avatar">${avatarContent}</div>
                            <div class="gift-badges">
                                <span class="badge-tier ${getTierClass(gift.tier)}">${getTierLabel(gift.tier)}</span>
                            </div>
                        </div>

                        <h3 class="gift-card-title">${escapeHtml(gift.title)}</h3>
                        <div class="gift-card-price">${gift.price} ₴ <span>/ вартість</span></div>
                        <p class="gift-card-desc">${escapeHtml(gift.description || "Без опису")}</p>

                        <div class="gift-meta-section">
                            <div class="meta-row">
                                <span class="meta-label">Для кого:</span>
                                <div>${recipientsText}</div>
                            </div>
                            <div class="meta-row">
                                <span class="meta-label">Події:</span>
                                <div>${eventsText}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="gift-card-actions">
                            <label class="status-toggle" title="Увімкнути/Вимкнути у конструкторі">
                                <input type="checkbox" onchange="toggleGiftActive(${gift.id}, this.checked)" ${gift.active !== false ? 'checked' : ''}>
                                <span>${gift.active !== false ? 'Активний' : 'Вимкнено'}</span>
                            </label>

                            <button type="button" class="btn-card-edit" onclick="openEditGiftModal(${gift.id})">
                                ✏️ Редагувати
                            </button>
                            <button type="button" class="btn-card-delete" title="Видалити подарунок" onclick="deleteGift(${gift.id})">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    };

    // Пошук та фільтри
    adminSearchInput.addEventListener("input", renderAdminGifts);
    adminTierFilter.addEventListener("change", renderAdminGifts);
    resetDefaultsBtn.addEventListener("click", resetToDefaultGifts);

    // =========================================================================
    // МОДАЛЬНЕ ВІКНО РЕДАГУВАННЯ / СТВОРЕННЯ
    // =========================================================================
    function openModal() {
        giftModal.classList.add("open");
        document.body.style.overflow = "hidden";
        const modalBody = giftModal.querySelector(".modal-body");
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
    }

    function closeModal() {
        giftModal.classList.remove("open");
        document.body.style.overflow = "";
    }

    closeModalBtn.addEventListener("click", closeModal);
    cancelModalBtn.addEventListener("click", closeModal);

    giftModal.addEventListener("click", (e) => {
        if (e.target === giftModal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && giftModal.classList.contains("open")) {
            closeModal();
        }
    });

    // Додати новий подарунок
    addNewGiftBtn.addEventListener("click", () => {
        modalTitle.innerHTML = "➕ Додати новий подарунок";
        modalGiftId.value = "";
        modalGiftTitle.value = "";
        modalGiftEmoji.value = "🎁";
        modalGiftPrice.value = "500";
        modalGiftTier.value = "medium";
        modalGiftDesc.value = "";
        modalGiftImage.value = "";
        modalGiftActive.checked = true;
        updateModalImagePreview("");

        // Скидаємо чекбокси
        setModalCheckboxes("recipientCheck", ["all"]);
        setModalCheckboxes("eventCheck", ["all"]);

        openModal();
    });

    // Редагувати подарунок
    window.openEditGiftModal = function (id) {
        const gifts = getGifts();
        const gift = gifts.find(g => g.id === id);
        if (!gift) return;

        modalTitle.innerHTML = `✏️ Редагувати: «${escapeHtml(gift.title)}»`;
        modalGiftId.value = gift.id;
        modalGiftTitle.value = gift.title || "";
        modalGiftEmoji.value = gift.emoji || "🎁";
        modalGiftPrice.value = gift.price || 0;
        modalGiftTier.value = gift.tier || "medium";
        modalGiftDesc.value = gift.description || "";
        modalGiftImage.value = gift.image || "";
        modalGiftActive.checked = gift.active !== false;

        updateModalImagePreview(gift.image);

        setModalCheckboxes("recipientCheck", gift.recipients || ["all"]);
        setModalCheckboxes("eventCheck", gift.events || ["all"]);

        openModal();
    };

    // Live preview зображення
    modalGiftImage.addEventListener("input", (e) => {
        updateModalImagePreview(e.target.value);
    });

    function updateModalImagePreview(url) {
        if (url && url.trim().startsWith("http")) {
            modalImagePreview.innerHTML = `<img src="${escapeHtml(url)}" alt="Preview" onerror="this.parentElement.innerHTML='📷';">`;
        } else {
            modalImagePreview.innerHTML = `<span style="font-size: 1.5rem;">${modalGiftEmoji.value || "🎁"}</span>`;
        }
    }

    // Emoji picker buttons
    document.querySelectorAll(".emoji-chip-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            modalGiftEmoji.value = btn.dataset.emoji;
            updateModalImagePreview(modalGiftImage.value);
        });
    });

    // Допоміжні функції для чекбоксів модального вікна
    function setModalCheckboxes(name, values) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
        checkboxes.forEach(cb => {
            cb.checked = values.includes(cb.value);
        });
    }

    function getSelectedCheckboxes(name) {
        const checked = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
        if (checked.length === 0) return ["all"];
        // Якщо вибрано окремі значення поряд з "all", прибираємо "all" або навпаки
        if (checked.includes("all") && checked.length > 1) {
            return checked.filter(v => v !== "all");
        }
        return checked;
    }

    // Автоматичне керування взаємовиключенням чекбокса "all"
    document.querySelectorAll('input[name="recipientCheck"]').forEach(cb => {
        cb.addEventListener("change", function () {
            if (this.value === "all" && this.checked) {
                document.querySelectorAll('input[name="recipientCheck"]').forEach(other => {
                    if (other.value !== "all") other.checked = false;
                });
            } else if (this.value !== "all" && this.checked) {
                const allCb = document.querySelector('input[name="recipientCheck"][value="all"]');
                if (allCb) allCb.checked = false;
            }
        });
    });

    document.querySelectorAll('input[name="eventCheck"]').forEach(cb => {
        cb.addEventListener("change", function () {
            if (this.value === "all" && this.checked) {
                document.querySelectorAll('input[name="eventCheck"]').forEach(other => {
                    if (other.value !== "all") other.checked = false;
                });
            } else if (this.value !== "all" && this.checked) {
                const allCb = document.querySelector('input[name="eventCheck"][value="all"]');
                if (allCb) allCb.checked = false;
            }
        });
    });

    // Автоматичне підлаштування категорії при введенні ціни
    modalGiftPrice.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
            if (val < 500) modalGiftTier.value = "budget";
            else if (val <= 1000) modalGiftTier.value = "medium";
            else modalGiftTier.value = "premium";
        }
    });

    // Збереження форми подарунка
    giftEditForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = modalGiftTitle.value.trim();
        const price = parseFloat(modalGiftPrice.value);

        if (!title) {
            alert("Будь ласка, введіть назву подарунка.");
            return;
        }

        if (isNaN(price) || price <= 0) {
            alert("Вкажіть коректну ціну (більше 0 ₴).");
            return;
        }

        const idVal = modalGiftId.value;
        const gifts = getGifts();

        const giftData = {
            title: title,
            emoji: modalGiftEmoji.value.trim() || "🎁",
            price: price,
            tier: modalGiftTier.value,
            recipients: getSelectedCheckboxes("recipientCheck"),
            events: getSelectedCheckboxes("eventCheck"),
            description: modalGiftDesc.value.trim(),
            image: modalGiftImage.value.trim(),
            active: modalGiftActive.checked
        };

        if (idVal) {
            // Редагування існуючого
            const id = parseInt(idVal, 10);
            const index = gifts.findIndex(g => g.id === id);
            if (index !== -1) {
                gifts[index] = { ...gifts[index], ...giftData };
                saveGifts(gifts);
                showToast(`Подарунок «${title}» успішно оновлено!`, "success");
            }
        } else {
            // Створення нового
            const newId = gifts.length > 0 ? Math.max(...gifts.map(g => g.id || 0)) + 1 : 1;
            gifts.unshift({ id: newId, ...giftData });
            saveGifts(gifts);
            showToast(`Новий подарунок «${title}» додано!`, "success");
        }

        closeModal();
        renderAdminGifts();
    });

    // Швидке перемикання активності картки в адмінці
    window.toggleGiftActive = function (id, isActive) {
        const gifts = getGifts();
        const gift = gifts.find(g => g.id === id);
        if (gift) {
            gift.active = isActive;
            saveGifts(gifts);
            renderAdminGifts();
            showToast(isActive ? `«${gift.title}» активовано` : `«${gift.title}» вимкнено`, "info");
        }
    };

    // Видалення подарунка
    window.deleteGift = function (id) {
        const gifts = getGifts();
        const gift = gifts.find(g => g.id === id);
        if (!gift) return;

        if (confirm(`Ви впевнені, що бажаєте видалити «${gift.title}» з каталогу?`)) {
            const updated = gifts.filter(g => g.id !== id);
            saveGifts(updated);
            renderAdminGifts();
            showToast(`Подарунок «${gift.title}» видалено`, "danger");
        }
    };
});

// 5. Оновлення лічильника подарунків у бейджі вкладки
function updateGiftsCountBadge() {
    const badge = document.getElementById("giftsCountBadge");
    if (badge) {
        const gifts = getGifts();
        badge.textContent = gifts.length;
    }
}

// 6. Скидання форми в конструкторі (для сумісності з оригінальним resetForm)
function resetForm() {
    const recipient = document.getElementById("recipient");
    const event = document.getElementById("event");
    const budget = document.getElementById("budget");
    const result = document.getElementById("result");
    const error = document.getElementById("error");

    if (recipient) recipient.value = "";
    if (event) event.value = "";
    if (budget) budget.value = "";
    if (result) result.style.display = "none";
    if (error) error.textContent = "";
}

// 7. Повідомлення (Toast)
function showToast(message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "danger") icon = "🗑️";

    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(15px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// 8. Безпечне екранування тексту
function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

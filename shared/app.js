const storageKey = `unit-price-calculator-deals-${window.APP_VARIANT||"v1"}`;
    const productMetaKey = `unit-price-calculator-product-meta-${window.APP_VARIANT||"v1"}`;
    const form = document.getElementById("dealForm");
    const productMetaForm = document.getElementById("productMetaForm");
    const historyForm = document.getElementById("historyForm");
    const productNameInput = document.getElementById("productName");
    const unitInput = document.getElementById("unit");
    const sourceList = document.getElementById("sourceList");
    const errorText = document.getElementById("errorText");
    const productTabs = document.getElementById("productTabs");
    const tableArea = document.getElementById("tableArea");
    const cartArea = document.getElementById("cartArea");
    const currentProduct = document.getElementById("currentProduct");
    const dealCount = document.getElementById("dealCount");
    const bestPrice = document.getElementById("bestPrice");
    const spreadPrice = document.getElementById("spreadPrice");
    const selectedTotal = document.getElementById("selectedTotal");
    const inventoryTotal = document.getElementById("inventoryTotal");
    const usageDuration = document.getElementById("usageDuration");
    const usableUntil = document.getElementById("usableUntil");
    const expiryDistance = document.getElementById("expiryDistance");
    const detailTitle = document.getElementById("detailTitle");
    const usageAmount = document.getElementById("usageAmount");
    const inventoryAmount = document.getElementById("inventoryAmount");
    const tagPrimary = document.getElementById("tagPrimary");
    const tagSecondary = document.getElementById("tagSecondary");
    const usagePeriod = document.getElementById("usagePeriod");
    const expiryPreset = document.getElementById("expiryPreset");
    const expiryInput = document.getElementById("expiryInput");
    const productMetaHint = document.getElementById("productMetaHint");
    const historyDate = document.getElementById("historyDate");
    const historyPrice = document.getElementById("historyPrice");
    const historyAmount = document.getElementById("historyAmount");
    const historyChannel = document.getElementById("historyChannel");
    const historyArea = document.getElementById("historyArea");
    const addSource = document.getElementById("addSource");
    const fillExample = document.getElementById("fillExample");
    const clearProduct = document.getElementById("clearProduct");
    const exportCsv = document.getElementById("exportCsv");
    const productFilter = document.getElementById("productFilter");
    const selectedFilter = document.getElementById("selectedFilter");
    const channelFilter = document.getElementById("channelFilter");
    const channelOptions = document.getElementById("channelOptions");
    const productOptions = document.getElementById("productOptions");
    const tagPrimaryOptions = document.getElementById("tagPrimaryOptions");
    const tagSecondaryOptions = document.getElementById("tagSecondaryOptions");
    const inventoryPrimaryFilter = document.getElementById("inventoryPrimaryFilter");
    const inventorySecondaryFilter = document.getElementById("inventorySecondaryFilter");
    const inventoryProductFilter = document.getElementById("inventoryProductFilter");
    const inventoryArea = document.getElementById("inventoryArea");
    const localeKey = `unit-price-calculator-locale-${window.APP_VARIANT||"v1"}`;
    let savedLocale = "";
    try { savedLocale = localStorage.getItem(localeKey) || ""; } catch {}
    let currentLocale = (window.APP_BILINGUAL ? savedLocale : "") || window.APP_LOCALE || document.documentElement.dataset.locale || document.documentElement.lang || "zh-CN";
    currentLocale = String(currentLocale).toLowerCase().startsWith("en") ? "en" : "zh";
    const i18n = {
      zh: {
        defaultUnit: "最小单位",
        defaultChannels: ["旗舰店", "淘宝百亿补贴", "拼多多", "李佳琦直播间", "京东", "抖音", "官方旗舰店"],
        defaultSourceRows: ["旗舰店", "淘宝百亿补贴", "拼多多"],
        allPrimary: "全部一级",
        allSecondary: "全部二级",
        channelPlatform: "渠道/平台",
        baseAmount: "正装含量",
        bonusAmount: "赠送含量",
        totalPrice: "总价",
        note: "备注",
        notePlaceholder: "满减 / 赠品 / 组合装",
        addNote: "添加备注",
        deleteChannel: "删除此渠道",
        noProducts: "暂无产品",
        unselected: "未选择",
        everyDay: "每天",
        everyWeek: "每周",
        everyMonth: "每月",
        year: "年",
        month: "个月",
        week: "周",
        underWeek: "不足1周",
        monthUnit: "月",
        detailSuffix: "详情",
        productDetail: "产品详情",
        notInCart: "未勾选购物车",
        chooseProductFirst: "请先添加或选择一个产品。",
        noHistoryTitle: "暂无历史低价",
        noHistoryBody: "记录时间、价格、含量后，会自动计算历史单价。",
        time: "时间",
        channel: "渠道",
        price: "价格",
        amount: "含量",
        unitPrice: "单价",
        action: "操作",
        delete: "删除",
        noInventoryTitle: "暂无库存",
        noInventoryBody: "在产品详情里填写当前库存并保存后，会自动进入这里。",
        primaryCategory: "一级分类",
        secondaryCategory: "二级分类",
        product: "产品",
        inventory: "库存",
        usableTime: "可用时间",
        usableUntil: "可用到",
        productNameRequired: "请填写产品名称。",
        sourceRequired: "请至少填写一个渠道/平台。",
        rowChannelRequired: (n) => `第 ${n} 行请填写渠道/平台。`,
        rowBaseRequired: (n) => `第 ${n} 行正装含量需要大于 0。`,
        rowBonusRequired: (n) => `第 ${n} 行赠送含量不能小于 0。`,
        rowPriceRequired: (n) => `第 ${n} 行总价需要大于 0。`,
        productRequired: "请先选择或填写一个产品名称。",
        usageRequired: "使用量需要大于 0。",
        inventoryRequired: "当前库存不能小于 0。",
        expiryRequired: "保质期请填写年月，例如 2026-08，或填写 6个月。",
        historyDateRequired: "请填写历史购买时间。",
        historyPriceRequired: "历史价格需要大于 0。",
        historyAmountRequired: "历史含量需要大于 0。",
        exampleProduct: "示例产品",
        exampleNote: "含赠品",
        dailyUse: "日用",
        shampoo: "洗发水",
        exportEmpty: "当前产品没有可导出的渠道/平台信息。",
        exportName: "单位价格",
        csvHeaders: ["产品", "渠道/平台", "备注", "正装含量", "赠送含量", "单位", "总含量", "总价", "单位价格", "购物车选中", "添加时间"],
        yes: "是",
        no: "否",
        unnamedChannel: "未命名渠道",
        historyRecord: "历史记录",
        noPriceTitle: "先录入渠道/平台",
        noPriceBody: "同一产品可以一次添加多个渠道，例如旗舰店、京东、代购、线下店。",
        lowest: "最低",
        higherBy: (n) => `贵${n}元`,
        cart: "购物车",
        rank: "排名",
        totalAmount: "总含量",
        comparison: "比较",
        addToCart: "加入购物车",
        editProduct: "修改所属产品",
        allProducts: "全部产品",
        productNameEmpty: "产品名称不能为空。",
        cartEmptyTitle: "购物车暂无匹配记录",
        cartEmptyBody: "勾选比价表里的渠道后，可在这里按产品、选中状态或平台名称筛选。",
        selected: "已选中",
        notSelected: "未选中",
        selectedHeader: "选中",
        status: "状态"
      },
      en: {
        defaultUnit: "unit",
        defaultChannels: ["Flagship Store", "Taobao Subsidy", "Pinduoduo", "LJQ Live", "JD", "Douyin", "Official Store"],
        defaultSourceRows: ["Flagship Store", "Taobao Subsidy", "Pinduoduo"],
        allPrimary: "All L1",
        allSecondary: "All L2",
        channelPlatform: "Channel",
        baseAmount: "Base amount",
        bonusAmount: "Bonus amount",
        totalPrice: "Total price",
        note: "Note",
        notePlaceholder: "discount / gift / bundle",
        addNote: "Add note",
        deleteChannel: "Delete channel",
        noProducts: "No products",
        unselected: "Not selected",
        everyDay: "per day",
        everyWeek: "per week",
        everyMonth: "per month",
        year: "y",
        month: "mo",
        week: "w",
        underWeek: "under 1w",
        monthUnit: "",
        detailSuffix: " details",
        productDetail: "Product details",
        notInCart: "No cart selection",
        chooseProductFirst: "Add or select a product first.",
        noHistoryTitle: "No historical lows",
        noHistoryBody: "Add date, price, and amount to calculate historical unit price.",
        time: "Date",
        channel: "Channel",
        price: "Price",
        amount: "Amount",
        unitPrice: "Unit price",
        action: "Action",
        delete: "Delete",
        noInventoryTitle: "No inventory",
        noInventoryBody: "Save current inventory in product details and it will appear here.",
        primaryCategory: "L1 category",
        secondaryCategory: "L2 category",
        product: "Product",
        inventory: "Inventory",
        usableTime: "Runway",
        usableUntil: "Usable until",
        productNameRequired: "Please enter a product name.",
        sourceRequired: "Please fill in at least one channel.",
        rowChannelRequired: (n) => `Row ${n}: please choose a channel.`,
        rowBaseRequired: (n) => `Row ${n}: base amount must be greater than 0.`,
        rowBonusRequired: (n) => `Row ${n}: bonus amount cannot be below 0.`,
        rowPriceRequired: (n) => `Row ${n}: total price must be greater than 0.`,
        productRequired: "Please select or enter a product name first.",
        usageRequired: "Usage must be greater than 0.",
        inventoryRequired: "Current inventory cannot be below 0.",
        expiryRequired: "Enter expiry as a year-month, e.g. 2026-08, or as 6 months.",
        historyDateRequired: "Please enter the historical purchase date.",
        historyPriceRequired: "Historical price must be greater than 0.",
        historyAmountRequired: "Historical amount must be greater than 0.",
        exampleProduct: "Example product",
        exampleNote: "includes gift",
        dailyUse: "Daily",
        shampoo: "Shampoo",
        exportEmpty: "Current product has no channel data to export.",
        exportName: "unit-price",
        csvHeaders: ["Product", "Channel", "Note", "Base amount", "Bonus amount", "Unit", "Total amount", "Total price", "Unit price", "Selected in cart", "Created at"],
        yes: "Yes",
        no: "No",
        unnamedChannel: "Unnamed channel",
        historyRecord: "Historical record",
        noPriceTitle: "Add a channel first",
        noPriceBody: "You can add multiple channels for the same product, such as flagship store, JD, proxy purchase, or offline store.",
        lowest: "Lowest",
        higherBy: (n) => `+¥${n}`,
        cart: "Cart",
        rank: "Rank",
        totalAmount: "Total amount",
        comparison: "Compare",
        addToCart: "Add to cart",
        editProduct: "Edit product",
        allProducts: "All products",
        productNameEmpty: "Product name cannot be empty.",
        cartEmptyTitle: "No matching cart records",
        cartEmptyBody: "Select channels in the price table, then filter here by product, selection status, or channel name.",
        selected: "Selected",
        notSelected: "Unselected",
        selectedHeader: "Selected",
        status: "Status"
      }
    };
    const t = (key, ...args) => {
      const value = i18n[currentLocale]?.[key] ?? i18n.zh[key] ?? key;
      return typeof value === "function" ? value(...args) : value;
    };
    window.setUnitPriceLocale = (locale) => {
      const nextLocale = String(locale || "").toLowerCase().startsWith("en") ? "en" : "zh";
      try { localStorage.setItem(localeKey, nextLocale); } catch {}
      window.location.reload();
    };
    const defaultUnit = t("defaultUnit");
    const defaultChannels = t("defaultChannels");
    const defaultSourceRows = t("defaultSourceRows");

    let deals = normalizeDeals(loadDeals());
    let productMeta = loadProductMeta();
    let activeProduct = getProducts()[0] || "";

    function loadDeals() {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
        return Array.isArray(saved) ? saved : [];
      } catch {
        return [];
      }
    }

    function normalizeDeals(savedDeals) {
      return savedDeals.map((deal) => ({
        ...deal,
        channel: deal.channel || deal.name || "",
        note: deal.note || "",
        unit: deal.unit || defaultUnit,
        createdAt: deal.createdAt || "",
        selected: Boolean(deal.selected)
      }));
    }

    function saveDeals() {
      localStorage.setItem(storageKey, JSON.stringify(deals));
    }

    function loadProductMeta() {
      try {
        const saved = JSON.parse(localStorage.getItem(productMetaKey) || "{}");
        return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
      } catch {
        return {};
      }
    }

    function saveProductMeta() {
      localStorage.setItem(productMetaKey, JSON.stringify(productMeta));
    }

    function toNumber(value) {
      const normalized = String(value || "").replace(",", ".").trim();
      return Number(normalized);
    }

    function money(value) {
      return Number(value).toLocaleString("zh-CN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    function plainMoney(value) {
      return Number(value).toLocaleString("zh-CN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    function compactNumber(value) {
      return Number(value).toLocaleString("zh-CN", {
        maximumFractionDigits: 2
      });
    }

    function csvNumber(value) {
      return Number(value).toFixed(2);
    }

    function getProducts() {
      return [...new Set([...deals.map((deal) => deal.product), ...Object.keys(productMeta)])].filter(Boolean);
    }

    function getActiveDeals() {
      return deals
        .filter((deal) => deal.product === activeProduct)
        .sort((a, b) => a.unitPrice - b.unitPrice);
    }

    function getChannelOptions() {
      const savedChannels = deals.map((deal) => deal.channel).filter(Boolean);
      const historyChannels = Object.values(productMeta).flatMap((meta) => (
        (meta.history || []).map((item) => item.channel).filter(Boolean)
      ));
      return [...new Set([...defaultChannels, ...savedChannels, ...historyChannels])];
    }

    function renderChannelOptions() {
      channelOptions.innerHTML = getChannelOptions()
        .map((channel) => `<option value="${escapeHtml(channel)}"></option>`)
        .join("");
    }

    function renderProductOptions(products = getProducts()) {
      productOptions.innerHTML = products
        .map((product) => `<option value="${escapeHtml(product)}"></option>`)
        .join("");
    }

    function getTagValues(level) {
      return [...new Set(Object.values(productMeta)
        .map((meta) => meta?.tags?.[level])
        .filter(Boolean))];
    }

    function parseTagInput(primary, secondary) {
      const first = primary.trim();
      const second = secondary.trim();
      const shorthand = first.match(/^#?([^/]+)\/(.+)$/);
      if (!shorthand) {
        return { primary: first.replace(/^#/, ""), secondary: second.replace(/^#/, "") };
      }
      return {
        primary: shorthand[1].trim().replace(/^#/, ""),
        secondary: shorthand[2].trim().replace(/^#/, "")
      };
    }

    function renderTagOptions() {
      tagPrimaryOptions.innerHTML = getTagValues("primary")
        .map((tag) => `<option value="${escapeHtml(tag)}"></option>`)
        .join("");
      tagSecondaryOptions.innerHTML = getTagValues("secondary")
        .map((tag) => `<option value="${escapeHtml(tag)}"></option>`)
        .join("");
    }

    function renderInventoryFilters() {
      const previousPrimary = inventoryPrimaryFilter.value || "all";
      const previousSecondary = inventorySecondaryFilter.value || "all";
      const primaryOptions = getTagValues("primary");
      const secondaryOptions = getTagValues("secondary");

      inventoryPrimaryFilter.innerHTML = `<option value="all">${t("allPrimary")}</option>${primaryOptions.map((tag) => (
        `<option value="${escapeHtml(tag)}">${escapeHtml(tag)}</option>`
      )).join("")}`;
      inventorySecondaryFilter.innerHTML = `<option value="all">${t("allSecondary")}</option>${secondaryOptions.map((tag) => (
        `<option value="${escapeHtml(tag)}">${escapeHtml(tag)}</option>`
      )).join("")}`;

      if ([...inventoryPrimaryFilter.options].some((option) => option.value === previousPrimary)) {
        inventoryPrimaryFilter.value = previousPrimary;
      }
      if ([...inventorySecondaryFilter.options].some((option) => option.value === previousSecondary)) {
        inventorySecondaryFilter.value = previousSecondary;
      }
    }

    function createSourceRow(values = {}) {
      const row = document.createElement("div");
      row.className = "source-row";
      const selectedChannel = values.channel || defaultChannels[0] || "";
      const channelChoices = [...new Set([selectedChannel, ...getChannelOptions()])].filter(Boolean);
      row.innerHTML = `
        <div class="field">
          <label>${t("channelPlatform")}</label>
          <select data-field="channel" aria-label="${t("channelPlatform")}">
            ${channelChoices.map((channel) => (
              `<option value="${escapeHtml(channel)}" ${channel === selectedChannel ? "selected" : ""}>${escapeHtml(channel)}</option>`
            )).join("")}
          </select>
        </div>
        <div class="field">
          <label>${t("baseAmount")}</label>
          <input data-field="baseAmount" inputmode="decimal" placeholder="100" value="${escapeHtml(values.baseAmount || "")}">
        </div>
        <div class="field">
          <label>${t("bonusAmount")}</label>
          <input data-field="bonusAmount" inputmode="decimal" placeholder="60" value="${escapeHtml(values.bonusAmount || "")}">
        </div>
        <div class="field">
          <label>${t("totalPrice")}</label>
          <input data-field="totalPrice" inputmode="decimal" placeholder="316" value="${escapeHtml(values.totalPrice || "")}">
        </div>
        <button class="note-toggle ${values.note ? "active" : ""}" type="button" title="${t("addNote")}">*</button>
        <button class="remove-source" type="button" title="${t("deleteChannel")}">×</button>
        <div class="field source-note ${values.note ? "" : "hidden"}">
          <label>${t("note")}</label>
          <input data-field="note" placeholder="${t("notePlaceholder")}" value="${escapeHtml(values.note || "")}">
        </div>
      `;

      const noteToggle = row.querySelector(".note-toggle");
      const noteWrap = row.querySelector(".source-note");
      const noteInput = row.querySelector('[data-field="note"]');
      noteToggle.addEventListener("click", () => {
        noteWrap.classList.toggle("hidden");
        if (!noteWrap.classList.contains("hidden")) {
          noteInput.focus();
        }
      });
      noteInput.addEventListener("input", () => {
        noteToggle.classList.toggle("active", Boolean(noteInput.value.trim()));
      });
      row.querySelectorAll("[data-field]").forEach((input) => {
        input.addEventListener("input", () => maybeAppendSourceRow(row));
        input.addEventListener("change", () => maybeAppendSourceRow(row));
      });

      row.querySelector(".remove-source").addEventListener("click", () => {
        if (sourceList.children.length === 1) {
          row.querySelectorAll("input").forEach((input) => {
            input.value = "";
          });
          noteWrap.classList.add("hidden");
          noteToggle.classList.remove("active");
          return;
        }
        row.remove();
      });

      sourceList.appendChild(row);
      return row;
    }

    function rowHasAnyValue(row) {
      return [...row.querySelectorAll("[data-field]")].some((input) => (
        input.dataset.field !== "channel" && input.value.trim()
      ));
    }

    function maybeAppendSourceRow(row) {
      if (row !== sourceList.lastElementChild || !rowHasAnyValue(row)) return;
      createSourceRow();
    }

    function resetSourceRows() {
      sourceList.innerHTML = "";
      defaultSourceRows.forEach((channel) => createSourceRow({ channel }));
    }

    function readSourceRows() {
      return [...sourceList.querySelectorAll(".source-row")].map((row, index) => {
        const field = (name) => row.querySelector(`[data-field="${name}"]`).value.trim();
        const channel = field("channel");
        const baseAmountRaw = field("baseAmount");
        const bonusAmountRaw = field("bonusAmount");
        const totalPriceRaw = field("totalPrice");
        const note = field("note");
        return {
          index,
          channel,
          note,
          baseAmountRaw,
          bonusAmountRaw,
          totalPriceRaw,
          baseAmount: toNumber(baseAmountRaw),
          bonusAmount: toNumber(bonusAmountRaw || 0),
          totalPrice: toNumber(totalPriceRaw)
        };
      });
    }

    function setActiveProduct(product) {
      activeProduct = product;
      productNameInput.value = product || "";
      render();
    }

    function renderTabs(products) {
      productTabs.innerHTML = "";

      if (!products.length) {
        const emptyTab = document.createElement("button");
        emptyTab.className = "tab active";
        emptyTab.type = "button";
        emptyTab.textContent = t("noProducts");
        productTabs.appendChild(emptyTab);
        return;
      }

      products.forEach((product) => {
        const tab = document.createElement("button");
        tab.className = `tab${product === activeProduct ? " active" : ""}`;
        tab.type = "button";
        tab.textContent = product;
        tab.addEventListener("click", () => setActiveProduct(product));
        productTabs.appendChild(tab);
      });
    }

    function renderSummary(rows) {
      currentProduct.textContent = activeProduct || t("unselected");
      dealCount.textContent = String(rows.length);

      if (!rows.length) {
        bestPrice.textContent = "-";
        spreadPrice.textContent = "-";
        return;
      }

      const best = rows[0];
      const worst = rows[rows.length - 1];
      const unit = getActiveUnit();
      bestPrice.textContent = `¥${money(best.unitPrice)} / ${unit}`;
      spreadPrice.textContent = rows.length > 1 ? `¥${money(worst.unitPrice - best.unitPrice)} / ${unit}` : "-";
    }

    function getActiveMeta() {
      if (!activeProduct) return { history: [] };
      return {
        usageAmount: "",
        inventoryAmount: "",
        usagePeriod: "day",
        expiryDate: "",
        tags: { primary: "", secondary: "" },
        unit: unitInput.value || defaultUnit,
        history: [],
        ...(productMeta[activeProduct] || {})
      };
    }

    function getActiveUnit(rows = getActiveDeals()) {
      return rows[0]?.unit || getActiveMeta().unit || unitInput.value || defaultUnit;
    }

    function getSelectedPurchaseRows() {
      return deals.filter((deal) => deal.product === activeProduct && deal.selected);
    }

    function getSelectedPurchaseTotal() {
      return getSelectedPurchaseRows().reduce((sum, deal) => sum + deal.baseAmount + deal.bonusAmount, 0);
    }

    function periodText(period) {
      if (period === "week") return t("everyWeek");
      if (period === "month") return t("everyMonth");
      return t("everyDay");
    }

    function dailyUsage(amount, period) {
      if (!Number.isFinite(amount) || amount <= 0) return 0;
      if (period === "week") return amount / 7;
      if (period === "month") return amount / 30.4375;
      return amount;
    }

    function formatDuration(days) {
      if (!Number.isFinite(days) || days <= 0) return "-";
      let remainingDays = Math.round(days);
      const years = Math.floor(remainingDays / 364);
      remainingDays -= years * 364;
      const totalWeeks = Math.floor(remainingDays / 7);
      remainingDays -= totalWeeks * 7;
      const months = Math.floor(totalWeeks / 4);
      const weeks = totalWeeks % 4;

      const parts = [];
      if (years) parts.push(`${years}${t("year")}`);
      if (months) parts.push(`${months}${t("month")}`);
      if (weeks) parts.push(`${weeks}${t("week")}`);
      return parts.join("") || t("underWeek");
    }

    function formatUseUntilDate(totalAmount, perDay) {
      if (!Number.isFinite(totalAmount) || totalAmount <= 0 || !Number.isFinite(perDay) || perDay <= 0) return "-";
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(totalAmount / perDay));
      return currentLocale === "en"
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
        : `${date.getFullYear()}年${date.getMonth() + 1}月`;
    }

    function renderUnitLabels(unit) {
      document.querySelectorAll("[data-unit-label]").forEach((label) => {
        label.textContent = unit || defaultUnit;
      });
    }

    function addMonths(date, months) {
      const result = new Date(date.getFullYear(), date.getMonth() + months + 1, 0);
      result.setHours(23, 59, 59, 999);
      return result;
    }

    function formatYearMonth(date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    }

    function parseExpiryInput(value) {
      const raw = String(value || "").trim();
      if (!raw) return { value: "", label: "" };

      const relative = raw.match(/^(\d+(?:\.\d+)?)\s*(个)?月$/);
      if (relative) {
        const months = Number(relative[1]);
        if (!Number.isFinite(months) || months <= 0) return null;
        const expiry = addMonths(new Date(), Math.round(months));
        const label = formatYearMonth(expiry);
        return { value: label, label };
      }

      const yearMonth = raw.match(/^(\d{4})\s*(?:-|\/|年|\.)\s*(\d{1,2})\s*月?$/);
      if (yearMonth) {
        const year = Number(yearMonth[1]);
        const month = Number(yearMonth[2]);
        if (month < 1 || month > 12) return null;
        const label = `${year}-${String(month).padStart(2, "0")}`;
        return { value: label, label };
      }

      const fullDate = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      if (fullDate) {
        const year = Number(fullDate[1]);
        const month = Number(fullDate[2]);
        if (month < 1 || month > 12) return null;
        const label = `${year}-${String(month).padStart(2, "0")}`;
        return { value: label, label };
      }

      return null;
    }

    function expiryToDate(value) {
      const parsed = parseExpiryInput(value);
      if (!parsed?.value) return null;
      const [year, month] = parsed.value.split("-").map(Number);
      return new Date(year, month, 0, 23, 59, 59, 999);
    }

    function formatExpiryMonth(dateValue) {
      if (!dateValue) return "-";
      const parsed = parseExpiryInput(dateValue);
      return parsed?.value || "-";
    }

    function renderProductDetail(rows) {
      const meta = getActiveMeta();
      const unit = getActiveUnit(rows);
      const selectedRows = getSelectedPurchaseRows();
      const selectedAmount = getSelectedPurchaseTotal();
      const usage = toNumber(meta.usageAmount);
      const inventory = toNumber(meta.inventoryAmount);
      const perDay = dailyUsage(usage, meta.usagePeriod);

      usageAmount.value = meta.usageAmount || "";
      inventoryAmount.value = meta.inventoryAmount || "";
      tagPrimary.value = meta.tags?.primary || "";
      tagSecondary.value = meta.tags?.secondary || "";
      usagePeriod.value = meta.usagePeriod || "day";
      expiryPreset.value = "";
      expiryInput.value = meta.expiryDate || "";
      unitInput.value = unit;
      renderUnitLabels(unit);
      detailTitle.textContent = activeProduct ? `${activeProduct}${t("detailSuffix")}` : t("productDetail");

      selectedTotal.textContent = selectedRows.length ? `${compactNumber(selectedAmount)} ${unit}` : t("notInCart");
      inventoryTotal.textContent = Number.isFinite(inventory) && inventory > 0 ? `${compactNumber(inventory)} ${unit}` : "-";
      usageDuration.textContent = selectedRows.length && perDay > 0 ? formatDuration(selectedAmount / perDay) : "-";
      usableUntil.textContent = perDay > 0 ? formatUseUntilDate((Number.isFinite(inventory) ? inventory : 0) + selectedAmount, perDay) : "-";
      expiryDistance.textContent = formatExpiryMonth(meta.expiryDate);
      productMetaHint.textContent = activeProduct
        ? `${activeProduct}：${meta.usageAmount || "-"} ${unit}/${periodText(meta.usagePeriod || "day")}`
        : t("chooseProductFirst");

      renderHistory(meta.history || [], unit);
    }

    function renderHistory(history, unit) {
      const rows = [...history].sort((a, b) => a.unitPrice - b.unitPrice);

      if (!rows.length) {
        historyArea.innerHTML = `
          <div class="empty">
            <strong>${t("noHistoryTitle")}</strong>
            ${t("noHistoryBody")}
          </div>
        `;
        return;
      }

      const body = rows.map((item, index) => `
        <tr class="${index === 0 ? "best" : ""}">
          <td>${escapeHtml(item.date || "-")}</td>
          <td>${escapeHtml(item.channel || "-")}</td>
          <td>¥${plainMoney(item.price)}</td>
          <td>${compactNumber(item.amount)} ${item.unit || unit}</td>
          <td class="price">¥${money(item.unitPrice)} / ${item.unit || unit}</td>
          <td><button class="delete-btn" type="button" data-history-id="${item.id}" title="${t("delete")}">×</button></td>
        </tr>
      `).join("");

      historyArea.innerHTML = `
        <div class="table-wrap">
          <table class="mini-table">
            <thead>
              <tr>
                <th>${t("time")}</th>
                <th>${t("channel")}</th>
                <th>${t("price")}</th>
                <th>${t("amount")}</th>
                <th>${t("unitPrice")}</th>
                <th>${t("action")}</th>
              </tr>
            </thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      `;

      historyArea.querySelectorAll("[data-history-id]").forEach((button) => {
        button.addEventListener("click", () => {
          const meta = getActiveMeta();
          productMeta[activeProduct] = {
            ...meta,
            history: (meta.history || []).filter((item) => item.id !== button.dataset.historyId)
          };
          saveProductMeta();
          render();
        });
      });
    }

    function getInventoryRows() {
      const primaryValue = inventoryPrimaryFilter.value || "all";
      const secondaryValue = inventorySecondaryFilter.value || "all";
      const keyword = inventoryProductFilter.value.trim().toLowerCase();

      return Object.entries(productMeta)
        .map(([product, meta]) => {
          const amount = toNumber(meta.inventoryAmount);
          return {
            product,
            amount,
            unit: meta.unit || defaultUnit,
            usageAmount: toNumber(meta.usageAmount),
            usagePeriod: meta.usagePeriod || "day",
            tags: meta.tags || { primary: "", secondary: "" }
          };
        })
        .filter((row) => Number.isFinite(row.amount) && row.amount > 0)
        .filter((row) => primaryValue === "all" || row.tags.primary === primaryValue)
        .filter((row) => secondaryValue === "all" || row.tags.secondary === secondaryValue)
        .filter((row) => !keyword || row.product.toLowerCase().includes(keyword))
        .sort((a, b) => {
          const primaryCompare = (a.tags.primary || "").localeCompare(b.tags.primary || "", "zh-CN");
          if (primaryCompare) return primaryCompare;
          const secondaryCompare = (a.tags.secondary || "").localeCompare(b.tags.secondary || "", "zh-CN");
          if (secondaryCompare) return secondaryCompare;
          return a.product.localeCompare(b.product, "zh-CN");
        });
    }

    function renderInventoryBoard() {
      const rows = getInventoryRows();

      if (!rows.length) {
        inventoryArea.innerHTML = `
          <div class="empty">
            <strong>${t("noInventoryTitle")}</strong>
            ${t("noInventoryBody")}
          </div>
        `;
        return;
      }

      const body = rows.map((row) => {
        const perDay = dailyUsage(row.usageAmount, row.usagePeriod);
        return `
          <tr>
            <td>${escapeHtml(row.tags.primary || "-")}</td>
            <td>${escapeHtml(row.tags.secondary || "-")}</td>
            <td>${escapeHtml(row.product)}</td>
            <td>${compactNumber(row.amount)} ${row.unit}</td>
            <td>${perDay > 0 ? formatDuration(row.amount / perDay) : "-"}</td>
            <td>${perDay > 0 ? formatUseUntilDate(row.amount, perDay) : "-"}</td>
          </tr>
        `;
      }).join("");

      inventoryArea.innerHTML = `
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${t("primaryCategory")}</th>
                <th>${t("secondaryCategory")}</th>
                <th>${t("product")}</th>
                <th>${t("inventory")}</th>
                <th>${t("usableTime")}</th>
                <th>${t("usableUntil")}</th>
              </tr>
            </thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      `;
    }

    function toggleDealSelected(id, selected) {
      deals = deals.map((deal) => deal.id === id ? { ...deal, selected } : deal);
      saveDeals();
      render();
    }

    function deleteDeal(id) {
      deals = deals.filter((deal) => deal.id !== id);
      const products = getProducts();
      if (!products.includes(activeProduct)) {
        activeProduct = products[0] || "";
      }
      saveDeals();
      render();
    }

    function updateDealProduct(id, product) {
      const nextProduct = product.trim();
      if (!nextProduct) {
        errorText.textContent = t("productNameEmpty");
        render();
        return;
      }

      const deal = deals.find((item) => item.id === id);
      if (!deal || deal.product === nextProduct) return;

      deals = deals.map((item) => item.id === id ? { ...item, product: nextProduct } : item);
      productMeta[nextProduct] = {
        ...(productMeta[nextProduct] || { history: [] }),
        unit: deal.unit || getActiveUnit()
      };
      saveDeals();
      saveProductMeta();
      render();
    }

    function formatDateTime(value) {
      if (!value) return "-";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return escapeHtml(value);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    }

    function getActivePriceRows() {
      const meta = getActiveMeta();
      const unit = getActiveUnit();
      const liveRows = getActiveDeals().map((deal) => ({
        ...deal,
        rowType: "live",
        amountText: `${plainMoney(deal.baseAmount)} + ${plainMoney(deal.bonusAmount)} ${deal.unit || unit}`,
        note: deal.note || "",
        totalAmount: deal.baseAmount + deal.bonusAmount,
        displayDate: formatDateTime(deal.createdAt),
        rawDate: deal.createdAt || ""
      }));
      const historyRows = (meta.history || []).map((item) => ({
        id: item.id,
        rowType: "history",
        product: activeProduct,
        channel: item.channel || t("historyRecord"),
        baseAmount: item.amount,
        bonusAmount: 0,
        totalAmount: item.amount,
        totalPrice: item.price,
        unit: item.unit || unit,
        unitPrice: item.unitPrice,
        selected: false,
        note: "",
        amountText: `${compactNumber(item.amount)} ${item.unit || unit}`,
        displayDate: item.date || "-",
        rawDate: item.date || "",
        historyId: item.id
      }));

      return [...liveRows, ...historyRows].sort((a, b) => a.unitPrice - b.unitPrice);
    }

    function renderTable(rows) {
      if (!rows.length) {
        tableArea.innerHTML = `
          <div class="empty">
            <strong>${t("noPriceTitle")}</strong>
            ${t("noPriceBody")}
          </div>
        `;
        return;
      }

      const body = rows.map((deal, index) => {
        const totalAmount = deal.totalAmount ?? deal.baseAmount + deal.bonusAmount;
        const comparisonAmount = Math.max(0, (deal.unitPrice - rows[0].unitPrice) * deal.baseAmount);
        const saveText = index === 0 ? t("lowest") : t("higherBy", plainMoney(comparisonAmount));
        const channel = deal.channel || t("unnamedChannel");
        const unit = deal.unit || getActiveUnit();
        const isHistory = deal.rowType === "history";
        return `
          <tr class="${index === 0 ? "best" : ""}">
            <td>${isHistory ? `<span class="tag">${t("historyRecord")}</span>` : `<input class="select-check" type="checkbox" data-select-id="${deal.id}" ${deal.selected ? "checked" : ""} title="${t("addToCart")}">`}</td>
            <td><span class="rank">${index + 1}</span></td>
            <td>${isHistory ? escapeHtml(deal.product || activeProduct) : `<input class="product-edit" data-product-id="${deal.id}" list="productOptions" value="${escapeHtml(deal.product || "")}" title="${t("editProduct")}">`}</td>
            <td><span class="channel-name">${escapeHtml(channel)}</span></td>
            <td>${deal.amountText || `${plainMoney(deal.baseAmount)} + ${plainMoney(deal.bonusAmount)} ${unit}`}</td>
            <td>${plainMoney(totalAmount)} ${unit}</td>
            <td>¥${plainMoney(deal.totalPrice)}</td>
            <td class="price">¥${money(deal.unitPrice)} / ${unit}</td>
            <td>${escapeHtml(deal.note || "")}</td>
            <td>${escapeHtml(deal.displayDate || "-")}</td>
            <td><span class="tag">${saveText}</span></td>
            <td><button class="delete-btn" type="button" ${isHistory ? `data-history-delete-id="${deal.historyId}"` : `data-id="${deal.id}"`} title="${t("delete")}">×</button></td>
          </tr>
        `;
      }).join("");

      tableArea.innerHTML = `
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${t("cart")}</th>
                <th>${t("rank")}</th>
                <th>${t("product")}</th>
                <th>${t("channelPlatform")}</th>
                <th>${t("amount")}</th>
                <th>${t("totalAmount")}</th>
                <th>${t("totalPrice")}</th>
                <th>${t("unitPrice")}</th>
                <th>${t("note")}</th>
                <th>${t("time")}</th>
                <th>${t("comparison")}</th>
                <th>${t("action")}</th>
              </tr>
            </thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      `;

      tableArea.querySelectorAll("[data-select-id]").forEach((input) => {
        input.addEventListener("change", () => toggleDealSelected(input.dataset.selectId, input.checked));
      });

      tableArea.querySelectorAll("[data-product-id]").forEach((input) => {
        input.addEventListener("change", () => updateDealProduct(input.dataset.productId, input.value));
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            input.blur();
          }
        });
      });

      tableArea.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
          if (button.dataset.historyDeleteId) {
            const meta = getActiveMeta();
            productMeta[activeProduct] = {
              ...meta,
              history: (meta.history || []).filter((item) => item.id !== button.dataset.historyDeleteId)
            };
            saveProductMeta();
            render();
            return;
          }
          deleteDeal(button.dataset.id);
        });
      });
    }

    function renderCartFilters(products) {
      const previous = productFilter.value || "all";
      productFilter.innerHTML = `<option value="all">${t("allProducts")}</option>${products.map((product) => (
        `<option value="${escapeHtml(product)}">${escapeHtml(product)}</option>`
      )).join("")}`;

      if ([...productFilter.options].some((option) => option.value === previous)) {
        productFilter.value = previous;
      }
    }

    function getCartRows() {
      const productValue = productFilter.value || "all";
      const selectedValue = selectedFilter.value || "all";
      const keyword = channelFilter.value.trim().toLowerCase();

      return deals
        .filter((deal) => productValue === "all" || deal.product === productValue)
        .filter((deal) => selectedValue === "all" || (selectedValue === "selected" ? deal.selected : !deal.selected))
        .filter((deal) => {
          if (!keyword) return true;
          return `${deal.product} ${deal.channel || ""}`.toLowerCase().includes(keyword);
        })
        .sort((a, b) => {
          if (a.selected !== b.selected) return a.selected ? -1 : 1;
          if (a.product !== b.product) return a.product.localeCompare(b.product, "zh-CN");
          return a.unitPrice - b.unitPrice;
        });
    }

    function renderCart() {
      const rows = getCartRows();

      if (!rows.length) {
        cartArea.innerHTML = `
          <div class="empty">
            <strong>${t("cartEmptyTitle")}</strong>
            ${t("cartEmptyBody")}
          </div>
        `;
        return;
      }

      const body = rows.map((deal) => {
        const totalAmount = deal.baseAmount + deal.bonusAmount;
        const unit = deal.unit || defaultUnit;
        return `
          <tr>
            <td><input class="select-check" type="checkbox" data-cart-select-id="${deal.id}" ${deal.selected ? "checked" : ""}></td>
            <td>${escapeHtml(deal.product)}</td>
            <td><span class="channel-name">${escapeHtml(deal.channel || t("unnamedChannel"))}</span></td>
            <td>${plainMoney(totalAmount)} ${unit}</td>
            <td>¥${plainMoney(deal.totalPrice)}</td>
            <td class="price">¥${money(deal.unitPrice)} / ${unit}</td>
            <td><span class="cart-state ${deal.selected ? "selected" : ""}">${deal.selected ? t("selected") : t("notSelected")}</span></td>
            <td><button class="delete-btn" type="button" data-cart-delete-id="${deal.id}" title="${t("delete")}">×</button></td>
          </tr>
        `;
      }).join("");

      cartArea.innerHTML = `
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${t("selectedHeader")}</th>
                <th>${t("product")}</th>
                <th>${t("channelPlatform")}</th>
                <th>${t("totalAmount")}</th>
                <th>${t("totalPrice")}</th>
                <th>${t("unitPrice")}</th>
                <th>${t("status")}</th>
                <th>${t("action")}</th>
              </tr>
            </thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      `;

      cartArea.querySelectorAll("[data-cart-select-id]").forEach((input) => {
        input.addEventListener("change", () => toggleDealSelected(input.dataset.cartSelectId, input.checked));
      });

      cartArea.querySelectorAll("[data-cart-delete-id]").forEach((button) => {
        button.addEventListener("click", () => deleteDeal(button.dataset.cartDeleteId));
      });
    }

    function render() {
      const products = getProducts();
      if (!activeProduct && products.length) {
        activeProduct = products[0];
      }

      renderTabs(products);
      renderCartFilters(products);
      renderChannelOptions();
      renderProductOptions(products);
      renderTagOptions();
      renderInventoryFilters();
      const rows = getActiveDeals();
      const priceRows = getActivePriceRows();
      renderSummary(priceRows);
      renderProductDetail(rows);
      renderInventoryBoard();
      renderTable(priceRows);
      renderCart();
    }

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      errorText.textContent = "";

      const product = productNameInput.value.trim();
      const unit = unitInput.value || defaultUnit;
      const sourceRows = readSourceRows();

      if (!product) {
        errorText.textContent = t("productNameRequired");
        return;
      }

      const filledRows = sourceRows.filter((row) => (
        row.baseAmountRaw || row.bonusAmountRaw || row.totalPriceRaw || row.note
      ));

      if (!filledRows.length) {
        errorText.textContent = t("sourceRequired");
        return;
      }

      for (const row of filledRows) {
        if (!row.channel) {
          errorText.textContent = t("rowChannelRequired", row.index + 1);
          return;
        }

        if (!Number.isFinite(row.baseAmount) || row.baseAmount <= 0) {
          errorText.textContent = t("rowBaseRequired", row.index + 1);
          return;
        }

        if (!Number.isFinite(row.bonusAmount) || row.bonusAmount < 0) {
          errorText.textContent = t("rowBonusRequired", row.index + 1);
          return;
        }

        if (!Number.isFinite(row.totalPrice) || row.totalPrice <= 0) {
          errorText.textContent = t("rowPriceRequired", row.index + 1);
          return;
        }
      }

      const nextDeals = filledRows.map((row) => {
        const totalAmount = row.baseAmount + row.bonusAmount;
        return {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        product,
          channel: row.channel,
          note: row.note,
          baseAmount: row.baseAmount,
          bonusAmount: row.bonusAmount,
          totalPrice: row.totalPrice,
        unit,
          unitPrice: row.totalPrice / totalAmount,
          selected: false,
        createdAt: new Date().toISOString()
        };
      });

      deals.push(...nextDeals);
      productMeta[product] = {
        ...(productMeta[product] || { history: [] }),
        unit
      };

      activeProduct = product;
      saveDeals();
      saveProductMeta();
      render();
      document.getElementById("pricePanel")?.setAttribute("open", "");
      resetSourceRows();
      sourceList.querySelector("[data-field='channel']").focus();
    });

    productMetaForm.addEventListener("submit", (event) => {
      event.preventDefault();
      errorText.textContent = "";

      const product = activeProduct || productNameInput.value.trim();
      const amount = usageAmount.value.trim();
      const amountValue = toNumber(amount);
      const inventory = inventoryAmount.value.trim();
      const inventoryValue = toNumber(inventory);
      const parsedExpiry = parseExpiryInput(expiryInput.value);
      const parsedTags = parseTagInput(tagPrimary.value, tagSecondary.value);

      if (!product) {
        errorText.textContent = t("productRequired");
        return;
      }

      if (amount && (!Number.isFinite(amountValue) || amountValue <= 0)) {
        errorText.textContent = t("usageRequired");
        return;
      }

      if (inventory && (!Number.isFinite(inventoryValue) || inventoryValue < 0)) {
        errorText.textContent = t("inventoryRequired");
        return;
      }

      if (expiryInput.value.trim() && !parsedExpiry) {
        errorText.textContent = t("expiryRequired");
        return;
      }

      productMeta[product] = {
        ...getActiveMeta(),
        usageAmount: amount,
        inventoryAmount: inventory,
        tags: parsedTags,
        usagePeriod: usagePeriod.value,
        expiryDate: parsedExpiry?.value || "",
        unit: unitInput.value || getActiveUnit()
      };
      activeProduct = product;
      productNameInput.value = product;
      saveProductMeta();
      render();
    });

    historyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      errorText.textContent = "";

      const product = activeProduct || productNameInput.value.trim();
      const date = historyDate.value;
      const price = toNumber(historyPrice.value);
      const amount = toNumber(historyAmount.value);

      if (!product) {
        errorText.textContent = t("productRequired");
        return;
      }

      if (!date) {
        errorText.textContent = t("historyDateRequired");
        return;
      }

      if (!Number.isFinite(price) || price <= 0) {
        errorText.textContent = t("historyPriceRequired");
        return;
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        errorText.textContent = t("historyAmountRequired");
        return;
      }

      const meta = product === activeProduct ? getActiveMeta() : (productMeta[product] || { history: [] });
      const channel = historyChannel.value.trim();
      const unit = unitInput.value || getActiveUnit();
      productMeta[product] = {
        ...meta,
        unit,
        history: [
          ...(meta.history || []),
          {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            date,
            price,
            amount,
            channel,
            unit,
            unitPrice: price / amount,
            addedAt: new Date().toISOString()
          }
        ]
      };
      activeProduct = product;
      productNameInput.value = product;
      saveProductMeta();
      historyDate.value = "";
      historyPrice.value = "";
      historyAmount.value = "";
      historyChannel.value = "";
      render();
    });

    addSource.addEventListener("click", () => {
      createSourceRow().querySelector("[data-field='channel']").focus();
    });

    fillExample.addEventListener("click", () => {
      productNameInput.value = t("exampleProduct");
      unitInput.value = "ml";
      sourceList.innerHTML = "";
      createSourceRow({ channel: defaultChannels[0], baseAmount: "100", bonusAmount: "60", totalPrice: "316", note: t("exampleNote") });
      createSourceRow({ channel: defaultChannels[1], baseAmount: "100", bonusAmount: "30", totalPrice: "298" });
      createSourceRow({ channel: defaultChannels[2], baseAmount: "160", bonusAmount: "20", totalPrice: "349" });
      usageAmount.value = "1";
      inventoryAmount.value = "20";
      tagPrimary.value = t("dailyUse");
      tagSecondary.value = t("shampoo");
      usagePeriod.value = "day";
      expiryInput.value = "6个月";
      errorText.textContent = "";
      sourceList.querySelector("[data-field='totalPrice']").focus();
    });

    clearProduct.addEventListener("click", () => {
      if (!activeProduct) return;
      delete productMeta[activeProduct];
      deals = deals.filter((deal) => deal.product !== activeProduct);
      activeProduct = getProducts()[0] || "";
      saveDeals();
      saveProductMeta();
      render();
    });

    exportCsv.addEventListener("click", () => {
      const rows = getActiveDeals();
      if (!rows.length) {
        errorText.textContent = t("exportEmpty");
        return;
      }

      const header = t("csvHeaders");
      const csvRows = rows.map((deal) => [
        deal.product,
        deal.channel || t("unnamedChannel"),
        deal.note || "",
        csvNumber(deal.baseAmount),
        csvNumber(deal.bonusAmount),
        deal.unit || defaultUnit,
        csvNumber(deal.baseAmount + deal.bonusAmount),
        csvNumber(deal.totalPrice),
        csvNumber(deal.unitPrice),
        deal.selected ? t("yes") : t("no"),
        deal.createdAt || ""
      ]);
      const csv = [header, ...csvRows]
        .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
        .join("\n");
      const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${activeProduct}-${t("exportName")}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    });

    productFilter.addEventListener("change", renderCart);
    selectedFilter.addEventListener("change", renderCart);
    channelFilter.addEventListener("input", renderCart);
    inventoryPrimaryFilter.addEventListener("change", renderInventoryBoard);
    inventorySecondaryFilter.addEventListener("change", renderInventoryBoard);
    inventoryProductFilter.addEventListener("input", renderInventoryBoard);
    unitInput.addEventListener("change", () => renderUnitLabels(unitInput.value || defaultUnit));
    tagPrimary.addEventListener("change", () => {
      const parsed = parseTagInput(tagPrimary.value, tagSecondary.value);
      if (parsed.primary !== tagPrimary.value || parsed.secondary !== tagSecondary.value) {
        tagPrimary.value = parsed.primary;
        tagSecondary.value = parsed.secondary;
      }
    });
    expiryPreset.addEventListener("change", () => {
      if (expiryPreset.value) {
        expiryInput.value = expiryPreset.value;
      }
    });

    resetSourceRows();
    render();

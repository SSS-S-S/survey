// === script.js (修正版) ===

document.addEventListener("DOMContentLoaded", () => {
    console.log("JS 已載入，準備綁定事件..."); // 開發者工具應該要看到這行

    // --- 1. 換頁功能 ---
    const nextPageEL = document.querySelectorAll(".next");
    const backPageEL = document.querySelectorAll(".back");

    nextPageEL.forEach(e => {
        e.addEventListener("click", () => {
            const currentPage = Number(e.getAttribute("data-current-page"));
            const currentPageE = document.getElementById(`page-${currentPage}`);
            const targetPageE = document.getElementById(`page-${currentPage + 1}`);
            
            if (targetPageE && currentPageE) {
                currentPageE.classList.add("invisible");
                targetPageE.classList.remove("invisible");
                window.scrollTo(0, 0);
            }
        });
    });

    backPageEL.forEach(e => {
        e.addEventListener("click", () => {
            const currentPage = Number(e.getAttribute("data-current-page"));
            const currentPageE = document.getElementById(`page-${currentPage}`);
            const targetPageE = document.getElementById(`page-${currentPage - 1}`);
            
            if (targetPageE && currentPageE) {
                currentPageE.classList.add("invisible");
                targetPageE.classList.remove("invisible");
                window.scrollTo(0, 0);
            }
        });
    });

    // --- 2. 表單提交功能 (Fetch) ---
    const form = document.getElementById('surveyForm');

    if (form) {
        console.log("找到表單，已綁定監聽器"); // 開發者工具應該要看到這行
        form.addEventListener('submit', function(e) {
            // 這裡很重要：如果有 target="iframe_redirect"，
            // 就算這裡 e.preventDefault() 失敗，頁面也不會白掉。
            // 但我們要盡量讓這裡成功執行。
            
            // (A) 阻止表單原本的提交
            e.preventDefault(); 
            console.log("攔截到提交事件，開始 Fetch...");

            // (B) 鎖定按鈕
            const submitBtn = document.querySelector('button[type="submit"]');
            if(submitBtn) {
                submitBtn.innerText = "資料傳送中...";
                submitBtn.disabled = true;
            }

            // (C) 準備資料
            const formData = new FormData(form);
            const actionUrl = form.getAttribute('action');

            // (D) 發送 Fetch
            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' 
            }).then(() => {
                // (E) 成功
                console.log("Fetch 發送成功");
                alert("表單已成功送出！感謝您的填寫。");
                window.location.reload(); 
            }).catch((error) => {
                // (F) 失敗
                console.error('Error:', error);
                alert("發送失敗，請檢查網路連線。");
                if(submitBtn) {
                    submitBtn.innerText = "提交";
                    submitBtn.disabled = false;
                }
            });
        });
    } else {
        console.error("錯誤：找不到 id 為 surveyForm 的表單！");
    }
});
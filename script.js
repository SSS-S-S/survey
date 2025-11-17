document.addEventListener("DOMContentLoaded", () => {

    // 換頁
    const nextButtons = document.querySelectorAll(".next");
    const backButtons = document.querySelectorAll(".back");

    nextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const current = Number(btn.dataset.currentPage);
            document.getElementById(`page-${current}`).classList.add("invisible");
            document.getElementById(`page-${current + 1}`).classList.remove("invisible");
            window.scrollTo(0, 0);
        });
    });

    backButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const current = Number(btn.dataset.currentPage);
            document.getElementById(`page-${current}`).classList.add("invisible");
            document.getElementById(`page-${current - 1}`).classList.remove("invisible");
            window.scrollTo(0, 0);
        });
    });

    // 表單送出
    const form = document.getElementById("surveyForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        // 轉成 URLSearchParams（後端要用這格式送給 Google）
        const params = new URLSearchParams();
        for (const [key, value] of formData) {
            params.append(key, value);
        }

        // 送給 Vercel API
        await fetch("/api/submit", {
            method: "POST",
            body: params
        });

        alert("已成功提交！");
        window.location.reload();
    });

});

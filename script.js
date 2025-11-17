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

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
    
        const formData = new FormData(form);
    
        const params = new URLSearchParams();
        for (const [key, value] of formData) {
            params.append(key, value);
        }
    
        fetch("/api/submit", {
            method: "POST",
            body: params
        })
        .then(() => {
            alert("表單已成功送出！");
            window.location.reload();
        })
        .catch((error) => {
            alert("發送失敗");
            console.error(error);
        });
    });
});


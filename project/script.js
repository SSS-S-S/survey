const blockArea = document.getElementById("block-area");

function createBlock({ title, color, inputs }) {
    block.draggable = true;

    block.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("block", JSON.stringify({
            title,
            color,
            inputs
        }));
    });
  
    const block = document.createElement("div");
        block.className = "block";
        block.style.background = color;

    const titleEl = document.createElement("span");
        titleEl.className = "block-title";
        titleEl.textContent = title;
        block.appendChild(titleEl);

    inputs.forEach(input => {
        if (input.type === "text") {
            const inputEl = document.createElement("input");
            inputEl.className = "block-input";
            inputEl.placeholder = input.placeholder || "";
            block.appendChild(inputEl);
        }
    });

    return block;
}

function test() {
    blockArea.appendChild(
    createBlock({
        title: "設定文字",
        color: "#ffd86b",
        inputs: [
        { type: "text", placeholder: "輸入文字" }
        ]
    })
    );
}

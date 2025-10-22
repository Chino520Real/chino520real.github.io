// heart.js - scatter hearts on click
document.addEventListener("click", function (e) {
    const heartCount = 8; // 每次点击生成多少个
    for (let i = 0; i < heartCount; i++) {
        createHeart(e.clientX, e.clientY);
    }
});

function createHeart(x, y) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);

    // 随机方向和距离（四周散开）
    const angle = Math.random() * 2 * Math.PI;
    const distance = 40 + Math.random() * 30; // 飞行距离（像素）
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    anime({
        targets: heart,
        translateX: dx,
        translateY: dy,
        scale: [1, 0.6],
        opacity: [1, 0],
        duration: 800 + Math.random() * 300,
          easing: "easeOutCubic",
          complete: () => heart.remove(),
    });
}

// 💖 样式：更小的爱心 + 柔和颜色
const style = document.createElement("style");
style.innerHTML = `
.heart {
    position: fixed;
    width: 8px;
    height: 8px;
    background: #ff5c8d;
    transform: rotate(45deg);
    pointer-events: none;
    z-index: 9999;
}
.heart::before,
.heart::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #ff5c8d;
    border-radius: 50%;
}
.heart::before {
    top: -4px;
    left: 0;
}
.heart::after {
    left: 4px;
    top: 0;
}`;
document.head.appendChild(style);

// heart.js - click hearts effect
document.addEventListener("click", function (e) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    document.body.appendChild(heart);

    anime({
        targets: heart,
        translateY: -100,
        opacity: [1, 0],
        scale: [1, 1.8],
        duration: 1000,
        easing: "easeOutExpo",
        complete: () => heart.remove(),
    });
});

// minimal heart style
const style = document.createElement("style");
style.innerHTML = `
.heart {
    position: fixed;
    width: 12px;
    height: 12px;
    background: #ff5c8d;
    transform: rotate(45deg);
    pointer-events: none;
    z-index: 9999;
}
.heart::before,
.heart::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background: #ff5c8d;
    border-radius: 50%;
}
.heart::before {
    top: -6px;
    left: 0;
}
.heart::after {
    left: 6px;
    top: 0;
}`;
document.head.appendChild(style);

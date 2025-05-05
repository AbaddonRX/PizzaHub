document.addEventListener("scroll", function () {
    const homeSection = document.querySelector(".home");
    const scrollPosition = window.scrollY;
    homeSection.style.backgroundPositionY = `${scrollPosition * 0.01}px`;
});
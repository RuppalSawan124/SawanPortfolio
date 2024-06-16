// JavaScript for parallax effect on scroll down from Section 1
window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let section1Height = document.querySelector('.section1').offsetHeight;
    let section2 = document.querySelector('.section2');

    if (scrollPosition > section1Height) {
        // Calculate translation for parallax effect
        let translateX = (scrollPosition - section1Height) * 0.4;

        // Apply translation to left and right sections
        section2.style.transform = `translateX(${translateX}px)`;
    } else {
        // Reset translation when above Section 2
        section2.style.transform = 'translateX(0)';
    }
});

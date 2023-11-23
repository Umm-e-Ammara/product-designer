const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#point").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}

circleMouseFollower();


function firstPageAnimation(){
    let tl = gsap.timeline();
    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration:1.5,
        ease:Expo.easeInOut
    })
    .to(".boundingelem",{
        y: 0,
        duration:2,
        ease:Expo.easeInOut,
        stagger:.2,
        delay:-1
    })
    .from("#homefooter",{
        y: '-10',
        opacity: 0,
        duration:1.5,
        ease:Expo.easeInOut,
        delay:-1
    })

}
firstPageAnimation();
let timeout;
function mouseMovement(){
    // define default scale value
    let xscale = 1
    let yscale = 1

    let xprev = 0
    let yprev = 0

    window.addEventListener("mousemove", function(dets){
        this.clearTimeout(timeout);
        let xdiff = dets.clientX - xprev;
        let ydiff = dets.clientY - yprev;
    
        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);
        setTimeout(() => {
            timeout = document.querySelector("#point").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`

        }, 100);
    })
}
mouseMovement();
document.querySelectorAll(".elem").forEach(function(elem){
    let rotate = 0;
    let diffrot = 0;
    elem.addEventListener("mousemove",function(dets){
        let diff = dets.clientY - elem.getBoundingClientRect().top
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top: diff,
            left:dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot* 0.5)
        });
    });
});
document.querySelectorAll(".elem").forEach(function(elem){
    let rotate = 0;
    let diffrot = 0;
    elem.addEventListener("mouseleave",function(dets){
        let diff = dets.clientY - elem.getBoundingClientRect().top
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            duration:.5
        });
    });
});

//  On Page Load
//  1. Setup Stage and Frame

window.addEventListener("load", function () {

    let stage = document.querySelector('.stage');
    let frame =  document.querySelector('.frame');    
    
    // // identify elements
    playerBody = document.querySelector("#svg-radio-body");
    spk1 = document.querySelector("#stereo-l");
    spk2 = document.querySelector("#stereo-r");
    playerBody.style.animationPlayState = 'paused';
    

});


function toggleAnimation(){ 

    if(playerBody.style.animationPlayState == 'paused'){        
        playAnimation() 
    }else{
        pauseAnimation()
    }
}


function   pauseAnimation() {
        const nodes = document.querySelectorAll('.parallax-layer');
        nodes.forEach(e => e.style.animationPlayState = 'paused');

        this.playerBody.style.animationPlayState = 'paused';
        // // Turn off speakers 
            spk1.style.animationPlayState = 'paused';
            spk2.style.animationPlayState = 'paused';
        this.easeInOutAnimation(-10);

    
    }

    function    playAnimation() {
        const nodes = document.querySelectorAll('.parallax-layer');
        nodes.forEach(e => e.style.animationPlayState = 'running');
        this.playerBody.style.animationPlayState = 'running';
        
         
        // // Turn ON speakers 
         spk1.style.animationPlayState = 'running';
         spk2.style.animationPlayState = 'running';

    
    }

    function   easeInOutAnimation(distanceInPx) {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        let i = parallaxLayers.length;
        parallaxLayers.forEach(element => {
            element.style.transform = `translateX(${distanceInPx / i}px)`;
        element.style.transition = "1s transform ease-out";
        i--;
    });
}
window.addEventListener("load", function () {
    if(!headphones){
        headphones = document.querySelector("#boombox").contentDocument.querySelector("#svg-radio-body");
    }
    headphones.style.animationPlayState = 'paused';

    headphones.addEventListener('click',() =>{
   
        if(headphones.style.animationPlayState == 'paused'){
            play();
            headphones.style.animationPlayState = 'running';
        }else{
            pause();
            headphones.style.animationPlayState = 'paused';
        }
    
       
    });
    


    function toggleAudio() {

        console.log('toggle asked for');
        // 1. Build an AudioContext()
        // for legacy browsers
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        // get the audio element
        const audioElement = document.getElementById("audioTrack");
        
        // audioContext.close();    
        const track = '';

        
        
        // pass it into the audio context
        if (track === undefined) {
            const track = audioContext.createMediaElementSource(audioElement);
            track.connect(audioContext.destination);
        }


        // Check if context is in suspended state (autoplay policy)
        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        // if(playButton){
        // Play or pause track depending on state
        if (headphones.style.animationPlayState == 'running') {
            fadeIn(audioElement, 1, 1, 1000, 50);
            audioElement.play();
            // playButton.dataset.playing = "true";
        } else {
            headphones.style.animationPlayState = 'running';
            // audioElement.pause();
            fadeOut(audioElement, 1, 0, 500, 50);
            // playButton.dataset.playing = "false";
        }
        // }
    }

    function fadeIn(audioElement, maxVol, startDelay, fadeInTime, steps) {
        let i = 0;
        let interval = fadeInTime / steps;
        setTimeout(function () {
            let intervalId = setInterval(function () {
                let volume = (maxVol / steps) * i;
                audioElement.volume = volume;
                // console.log(volume);
                if (++i >= steps)
                    clearInterval(intervalId);
            }, interval);
        }, startDelay);
    }

    function fadeOut(audioElement, maxVol, startDelay, fadeInTime, steps) {
        let i = 0;
        let interval = fadeInTime / steps;
        setTimeout(function () {
            let intervalId = setInterval(function () {
                let volume = 0.02 * i;
                audioElement.volume = 1 - volume;
                // console.log(audioElement.volume);
                if (++i >= steps)
                    clearInterval(intervalId);
                if (audioElement.volume < 0.1)
                    audioElement.pause();
            }, interval);
        }, startDelay);
    }



    function pause() {
        console.log('ran pause ||');
        nodes = document.querySelectorAll('.parallax-layer');
        nodes.forEach(e => e.style.animationPlayState = 'paused');

        headphones.style.animationPlayState = 'paused';
        console.log(headphones.style.animationPlayState);
        toggleAudio();


        // Slowly Bring parallax to stop
        easeInOutPauseScroll(10);
    }

    function play() {
        console.log('ran play >>');
        nodes = document.querySelectorAll('.parallax-layer');
        nodes.forEach(e => e.style.animationPlayState = 'running');
        headphones.style.animationPlayState = 'running';
        
        toggleAudio();


        // Slowly Bring parallax to start
        easeInOutPauseScroll(-10);

    }
    function easeInOutPauseScroll(distanceInPx) {
        let parallaxLayers = document.querySelectorAll('.parallax-layer');
        let i = parallaxLayers.length;
        parallaxLayers.forEach(element => {
            element.style.transform = `translateX(${distanceInPx / i}px)`;
            element.style.transition = "1s transform ease-out";
            i--;
        });
    }


    // do something here ...
}, false);





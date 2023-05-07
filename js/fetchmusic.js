
let trackURL;
window.addEventListener("load", function () {

     if(!headphones){
        headphones = document.querySelector("#boombox").contentDocument.querySelector("#svg-radio-body");
    }
    headphones.style.animationPlayState = 'paused';
});

const fetchfromAPI = async () => {

    // Disable Form Submit Btn - Hide Previous Results
    document.querySelector('.results').style.opacity = 0;    
    document.querySelector('#searchSubmitBtn').disabled = true;

    let q = document.querySelector('#searchBox').value;
    const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=' + q;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e79dc6833amsh354d9532279c802p126193jsnc081b287c295',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();

        resultJSON = JSON.parse(result);
        if(resultJSON.data && resultJSON.data.length>1){

            const resultList = document.querySelector('.results ul');
            
            //Wipe previous results
            resultList.innerHTML = "";

            // Show top 5 tracks
            let limit = 5;
            resultJSON.data.forEach(track => {
                if(limit>0){
                    var node = document.createElement('li');
                    node.onclick = () => loadTrackURL(track.preview,true);
                    node.innerHTML = `"${track.title}" by ${track.artist.name} on Album - ${track.album.title}`;
                    resultList.appendChild(node);
                    limit--;
                }
            });
            
            // First Track MP3 : console.log(resultJSON.data[0].preview);                
            trackURL = resultJSON.data[0].preview;

            // Show Search Results Div
            document.querySelector('.results').style.opacity = 1;
            
        
        }else{
            document.querySelector('#txt-area').value = resultJSON.error.message;
            // console.log(resultJSON.error.message);    
            document.querySelector('.results').style.opacity = 0; 
        }
    } catch (error) {
        console.error(error);
        document.querySelector('.results').style.opacity = 0; 
    }

    document.querySelector('#searchSubmitBtn').disabled = false;

}


// Play Track 
function loadTrackURL(URL,startPlay) {     
        
    const context = new AudioContext();
    const playButton = document.querySelector('#play');
    const stopButton = document.querySelector('#stop');
        
    let yodelBuffer;

    window.fetch(URL)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
        playButton.disabled = false;
        yodelBuffer = audioBuffer;
        if(startPlay){
            console.log('starting Play');
            play(yodelBuffer);
        }
        });
        
    playButton.onclick = () => play(yodelBuffer);   

    function play(audioBuffer) {
        stopButton.disabled = false;
        playButton.disabled = true;
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        source.start();            
        stopButton.onclick = () => stop(source);
        playAnimation();

        source.addEventListener(
            "ended",
            () => {
                stopButton.disabled = true;
                playButton.disabled = false;
                pauseAnimation(); 
            },
            false
          );
    }

    function stop(source){
        stopButton.disabled = true;
        playButton.disabled = false;
        source.stop();
        pauseAnimation(); 
    }
};



// Play Pause ANIMATION 

function pauseAnimation() {
    console.log('ran pause ||');
    nodes = document.querySelectorAll('.parallax-layer');
    nodes.forEach(e => e.style.animationPlayState = 'paused');

    headphones.style.animationPlayState = 'paused';
    console.log(headphones.style.animationPlayState);
    
    // Slowly Bring parallax to stop
    easeInOutAnimation(10);

    //Any Additional Animation from file
    if(additionalAnimation){
        additionalAnimation();
    }
}

function playAnimation() {
    console.log('ran play >>');
    nodes = document.querySelectorAll('.parallax-layer');
    nodes.forEach(e => e.style.animationPlayState = 'running');
    headphones.style.animationPlayState = 'running';
    
    // Slowly Bring parallax to start
    easeInOutAnimation(-10);

    //Any Additional Animation from file
    if(additionalAnimation){
        additionalAnimation();
    }

}
function easeInOutAnimation(distanceInPx) {
    let parallaxLayers = document.querySelectorAll('.parallax-layer');
    let i = parallaxLayers.length;
    parallaxLayers.forEach(element => {
        element.style.transform = `translateX(${distanceInPx / i}px)`;
        element.style.transition = "1s transform ease-out";
        i--;
    });
}
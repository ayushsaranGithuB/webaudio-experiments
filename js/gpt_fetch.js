class MusicPlayer {
    constructor() {
        this.trackURL = null;
        this.headphones = document.querySelector("#boombox").contentDocument.querySelector("#svg-radio-body");
        this.playButton = document.querySelector('#play');
        this.stopButton = document.querySelector('#stop');
        this.context = new AudioContext();
        this.resultList = document.querySelector('.results ul');

        this.headphones.style.animationPlayState = 'paused';
        this.playButton.disabled = true;
        this.stopButton.disabled = true;

        window.addEventListener("load", () => {
            this.headphones.style.animationPlayState = 'paused';
        });
    }

    initialize() {
        document.querySelector('#searchSubmitBtn').addEventListener('click', () => this.fetchFromAPI());        
        document.querySelector('.formfetch form').addEventListener('submit', (e) => this.fetchFromAPI());
    }

    async fetchFromAPI() {
        document.querySelector('#searchSubmitBtn').disabled =true;
        const searchBox = document.querySelector('#searchBox');
        const query = searchBox.value;
        const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=' + query;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e79dc6833amsh354d9532279c802p126193jsnc081b287c295',
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            if (result.data && result.data.length > 1) {
                this.resultList.innerHTML = "";
                const tracks = result.data.slice(0, 5);

                tracks.forEach(track => {
                    const li = document.createElement('li');
                    li.innerHTML = `"${track.title}" by ${track.artist.name} on Album - ${track.album.title}`;
                    li.addEventListener('click', () => this.loadTrackURL(track.preview, true));
                    this.resultList.appendChild(li);
                });

                this.trackURL = tracks[0].preview;
                document.querySelector('.results').style.opacity = 1;
            } else {
                document.querySelector('#txt-area').value = result.error.message;
                document.querySelector('.results').style.opacity = 0;
            }
        } catch (error) {
            console.error(error);
            document.querySelector('.results').style.opacity = 0;
        }
        
        document.querySelector('#searchSubmitBtn').disabled = false;

        searchBox.value = '';
    }

    loadTrackURL(URL, startPlay) {
        window.fetch(URL)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this.playButton.disabled = false;
                this.yodelBuffer = audioBuffer;
                if (startPlay) {
                    this.play();
                }
            });

        this.playButton.onclick = () => this.play();

        this.stopButton.onclick = () => {
            this.stop();
            this.stopButton.disabled = true;
            this.playButton.disabled = false;
            this.pauseAnimation();
        };
    }

    play() {
        this.stopButton.disabled = false;
        this.playButton.disabled = true;
        const source = this.context.createBufferSource();
        source.buffer = this.yodelBuffer;
        source.connect(this.context.destination);
        source.start();
        this.source = source;
        this.playAnimation();

        source.addEventListener(
            "ended",
            () => {
                this.stop();
                this.stopButton.disabled = true;
                this.playButton.disabled = false;
                this.pauseAnimation();
            },
            false
        );
    }

    stop() {
        if (this.source) {
            this.source.stop();
            this.source = null;
        }
    }

    pauseAnimation() {
        const nodes = document.querySelectorAll('.parallax-layer');
        nodes.forEach(e => e.style.animationPlayState = 'paused');

        this.headphones.style.animationPlayState = 'paused';

        this.easeInOutAnimation(10);

      additionalAnimation();
       
    }

    playAnimation() {
        const nodes = document.querySelectorAll('.parallax-layer');
        nodes.forEach(e => e.style.animationPlayState = 'running');
        this.headphones.style.animationPlayState = 'running';
        this.easeInOutAnimation(-10);

            additionalAnimation();
       
    }

    easeInOutAnimation(distanceInPx) {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        let i = parallaxLayers.length;
        parallaxLayers.forEach(element => {
            element.style.transform = `translateX(${distanceInPx / i}px)`;
        element.style.transition = "1s transform ease-out";
        i--;
    });
}
}


window.addEventListener("load", () => {
    const musicPlayer = new MusicPlayer();
    musicPlayer.initialize();
});


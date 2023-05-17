var list = [
    '../music/aesthetics-138637.mp3',
    'https://example.com/world.mp3',
    'https://example.com/music.mp3'
]


function autoplay(i, list) {
    var sound = new Howl({
        src: [list[i]],
        preload: true,
        onend: function () {
            if ((i + 1) == list.length) {
                autoplay(0, list)
            } else {
                autoplay(i + 1, list)
            }
        }
    })
    sound.play();
}

autoplay(0, list)
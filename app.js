const STATIC_ROOT = 'https://s3-us-west-1.amazonaws.com/liddiard/';
const SCENES = [
  {
    name: 'Campfire at night',
    sounds: [
      {
        filename: 'campfire.mp3',
        pos: [0, 0, 5],
        volume: 1
      },
      {
        filename: 'crickets_1.mp3',
        pos: [1, 0, 0],
        volume: 1
      },
      {
        filename: 'crickets_2.mp3',
        pos: [-1, 0, 0],
        volume: 1
      },
      {
        filename: 'creek.mp3',
        pos: [-50, 0, -100],
        volume: 1
      }
    ]
  }
]
const SCENE = SCENES[0];

SCENE.sounds.forEach(s => {
  const sound = new Howl({
    src: [STATIC_ROOT+s.filename],
    pos: s.pos,
    volume: s.volume,
    autoplay: true,
    loop: true
  });
  // initialize panner w/ default values
  sound.pannerAttr({});
});

function handleOrientation(event) {
  // https://github.com/goldfire/howler.js/blob/master/examples/3d/js/player.js#L43
  // https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
  const x = degreesToRadians(event.beta);
  const y = degreesToRadians(event.gamma);
  const z = degreesToRadians(event.alpha);
  Howler.orientation(Math.sin(z), 0, Math.cos(z), 0, 1, 0);
}
window.addEventListener('deviceorientation', handleOrientation);

sound.play();

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

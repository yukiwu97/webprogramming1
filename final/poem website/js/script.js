/*
Shamelessly but lovingly stole:
Fireflies: https://codepen.io/Io_oTI/pen/maLjyr 
*/

var option = {
  selector: "#fireflies",
  radius: 2,
  color: "rgba(236, 236, 255, 1)",
  count: 25,
  speed: 1,
};

(function fireflies() {
  var canvas = document.querySelector(option.selector),
    ctx = canvas.getContext('2d'),
    fireflies = [];
  window.addEventListener('resize', function () {
    initCanvas();
  });

  function initCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function initAnimation() {
    initCanvas();
    fireflyCreate();
    draw();
  }

  function rand(max, min) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
  }

  function change_opacity(color, opacity) {
    var col = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\S+)\)$/)
    return 'rgba(' + col[1] + ', ' + col[2] + ', ' + col[3] + ', ' + opacity + ')'
  }

  function firefly() {
    var opacity = Number(rand(1, 0.1));
    this.x = Math.floor(rand(canvas.width, option.radius));
    this.y = Math.floor(rand(canvas.height, option.radius));
    this.radius = rand(option.radius + 0.5, option.radius - 0.5);
    this.color = change_opacity(option.color, opacity);
    this.speed = rand(option.speed, -option.speed) + 0.1;
    this.angle = rand(360, 0);
    this.radian = 2 * Math.PI / 360 * rand(360, 0);
    this.flare = opacity > 0.5 ? true : false;
    this.rate = rand(0.05, 0.01);
    this.opacity = opacity
    this.shadowBlur = 10;
    this.shadowColor = option.color
  }
  firefly.prototype.fly = function () {
    // var radian = 2 * Math.PI / 360 * this.angle;
    // this.radian += .1;
    this.speed = rand(option.speed, 0.01);
    this.x += Math.sin(this.radian) * this.speed;
    this.y += Math.cos(this.radian) * this.speed;
    if (this.x < 0) {
      this.x += canvas.width;
    } else if (this.x > canvas.width) {
      this.x -= canvas.width;
    }
    if (this.y < 0) {
      this.y += canvas.height;
    } else if (this.y > canvas.height) {
      this.y -= canvas.height;
    }
  }
  firefly.prototype.flicker = function () {
    if (this.opacity >= 1) {
      this.flare = false
    } else if (this.opacity <= 0.1) {
      this.flare = true
    }
    if (this.flare) {
      this.opacity += this.rate
    } else {
      this.opacity -= this.rate
    }
    this.color = change_opacity(this.color, this.opacity.toFixed(2));
  }

  function fireflyCreate() {
    for (var i = 0; i < option.count; i++) {
      fireflies.push(new firefly());
    }
  }

  function fireflyUpdate() {
    for (var i = 0; i < fireflies.length; i++) {
      fireflies[i].fly();
      fireflies[i].flicker();
    }
  }

  function fireflyDraw() {
    for (var i = 0; i < fireflies.length; i++) {
      ctx.beginPath();
      ctx.arc(fireflies[i].x, fireflies[i].y, fireflies[i].radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.shadowColor = "white";
      ctx.shadowBlur = 10;
      ctx.fillStyle = fireflies[i].color;
      ctx.fill();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireflyUpdate();
    fireflyDraw();
    window.requestAnimationFrame(draw);
  }
  initAnimation();
})();


if ( Modernizr.smil ) {
  /* set HTML5 content */
} else {
  /* set IE/Edge/Flash content */
}
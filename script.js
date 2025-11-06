window.onload = function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  var x = 250;
  var y = 150;
  var coinx = Math.random() * (600 - 50);
  var coiny = Math.random() * (400 - 50);
  var t = Date.now();
  let speed = 300;
  let dir = 0;
  let score = 0;

  // Botones
  let up = document.getElementById('up');
  let down = document.getElementById('down');
  let left = document.getElementById('left');
  let right = document.getElementById('right');

  // Eventos
  const press = d => dir = d;
  const release = () => dir = 0;
  [up, down, left, right].forEach(btn => {
    btn.onmousedown = () => press(btn.id === 'up' ? 4 : btn.id === 'down' ? 3 : btn.id === 'left' ? 2 : 1);
    btn.onmouseup = release;
    btn.ontouchstart = btn.onmousedown;
    btn.ontouchend = release;
  });

  // Función principal
  function draw() {
    var timePassed = (Date.now() - t) / 1000;
    t = Date.now();

    // Fondo oscuro del canvas
    context.fillStyle = "rgba(0, 0, 0, 0.3)";
    context.fillRect(0, 0, 600, 400);

    // Puntaje
    context.font = '20px "Press Start 2P", cursive';
    context.fillStyle = '#fff';
    context.fillText("Puntaje: " + score, 20, 30);

    // Personaje principal
    context.beginPath();
    context.fillStyle = "#00ffcc";
    context.shadowColor = "#00ffff";
    context.shadowBlur = 20;
    context.fillRect(x, y, 60, 60);
    context.shadowBlur = 0;

    // Moneda dorada
    context.beginPath();
    context.arc(coinx + 25, coiny + 25, 20, 0, 2 * Math.PI);
    let grad = context.createRadialGradient(coinx + 25, coiny + 25, 5, coinx + 25, coiny + 25, 20);
    grad.addColorStop(0, "#fff8b5");
    grad.addColorStop(1, "#e3b228");
    context.fillStyle = grad;
    context.fill();

    // Movimiento
    if (dir == 1 && x + 60 < 600) x += speed * timePassed;
    if (dir == 2 && x > 0) x -= speed * timePassed;
    if (dir == 3 && y + 60 < 400) y += speed * timePassed;
    if (dir == 4 && y > 0) y -= speed * timePassed;

    // Colisión con la moneda
    if (coinx <= x + 60 && x <= coinx + 50 && coiny <= y + 60 && y <= coiny + 50) {
      score++;
      coinx = Math.random() * (600 - 50);
      coiny = Math.random() * (400 - 50);

      // Efecto visual
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          context.beginPath();
          context.arc(coinx + Math.random() * 50, coiny + Math.random() * 50, 3, 0, 2 * Math.PI);
          context.fillStyle = "gold";
          context.fill();
        }, i * 30);
      }
    }

    window.requestAnimationFrame(draw);
  }

  draw();
};
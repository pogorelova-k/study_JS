'strict';

const canvas = document.getElementById('canvas').getContext('2d'),
    radius = 55;

const circles = [
    {
        // blue
        color: '#0885c2',
        x: 1.5 * radius,
        y: 2 * radius,
        isTop: true
    },
    {
        // black
        color: 'black',
        x: 4 * radius,
        y: 2 * radius,
        isTop: true
    },
    {
        // red
        color: '#ed334e',
        x: 6.5 * radius,
        y: 2 * radius,
        isTop: true
    },
    {
        // yellow
        color: '#fbb132',
        x: 2.75 * radius,
        y: 3 * radius,
        isTop: false
    },
    {
        // green
        color: '#1c8b3c',
        x: 5.25 * radius,
        y: 3 * radius,
        isTop: false
    }
];

const angle = (degress = 360) => (Math.PI / 180) * degress;

function drawArc(canvas, color, x, y, start, end) {

    canvas.lineWidth = 10;
    canvas.strokeStyle = color;

    canvas.beginPath();
    canvas.arc(x, y, radius, start, end, false);
    canvas.stroke();
}

circles.forEach(circle => {
    drawArc(canvas, circle.color, circle.x, circle.y, 0, angle(360));
});

drawArc(canvas, circles[0].color, circles[0].x, circles[0].y, angle(-90), angle(45));

drawArc(canvas, circles[1].color, circles[1].x, circles[1].y, angle(-45), angle(45));
drawArc(canvas, circles[1].color, circles[1].x, circles[1].y, angle(90), angle(115));

drawArc(canvas, circles[2].color, circles[2].x, circles[2].y, angle(90), angle(125));


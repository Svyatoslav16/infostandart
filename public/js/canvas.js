let canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = 500;

let ctx = canvas.getContext('2d');
// ctx.transform(1, 0, 0, -1, 0, canvas.height)
ctx.fillStyle = "black";
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(45, 30);
ctx.lineTo(45, 450);
ctx.lineTo(470, 450);
ctx.stroke();


// Цикл для отображения значений по Y 
for(let i = 0; i < 11; i++) {
    let yH = i * 40 + 50;
    ctx.fillText((10 - i) * 10, 10, yH + 3);
    ctx.beginPath();
    ctx.moveTo(30, yH);
    ctx.lineTo(35, yH);
    ctx.stroke();
}
 
// Массив с меткам месяцев
let labels = ["JAN", "FEB", "MAR", "APR", "MAY"]; 
 
// Выводим меток
for(let i = 0; i < 5; i++) { 
    ctx.fillText(labels[i], 70 + i *90, 475);
}

// // Объявляем массив данных графика
// let data = [ 10, 53, 39, 54, 21 ]; 
 
// // Назначаем зелёный цвет для графика
// ctx.fillStyle = "green"; 

// // Цикл для отрисовки графиков
// for(let i = 0; i < data.length; i++) { 
//     let dp = data[i]; 
//     ctx.fillRect(40 + i*90, 260-dp*4 , 50, dp*4); 
// }
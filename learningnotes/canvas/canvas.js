var canvas = document.getElementById("demo");
canvas.width = 800;
canvas.height = 800;
// 操作2d图形，3d图形参数为"webgl"
var context = canvas.getContext("2d");

// 绘制网格线
var gap = 20;

for (var x = 1; x < canvas.width / gap; x++) {
  context.strokeStyle = "lightgray";
  // if(x == canvas.width/gap/2) {
  //   context.strokeStyle = "#000";
  // }
  context.beginPath();
  context.moveTo(x * gap, 0);
  context.lineTo(x * gap, canvas.height);
  context.stroke();
}

for (var y = 1; y < canvas.height / gap; y++) {
  context.strokeStyle = "lightgray";
  // if(y == canvas.height/gap/2) {
  //   context.strokeStyle = "#000";
  // }
  context.beginPath();
  context.moveTo(0, y * gap);
  context.lineTo(canvas.width, y * gap);
  context.stroke();
}


// 绘制矩形
context.beginPath();
context.lineWidth = 5;
context.strokeStyle = "#000";
// 描边矩形
context.strokeRect(0, 0, canvas.width, canvas.height);
// 填充矩形
// context.fillRect(0, 0, canvas.width, canvas.height);
// 擦除矩形
// context.clearRect(0, 0, canvas.width/4, canvas.height/4);

//圆心坐标
var PosX = canvas.width / 2;
var PosY = canvas.height / 2;
// 圆弧半径
var Radius = 200;

// 绘制文字
// 创建渐变
var textSize = getTextSize("https://www.webserv.cn","20px");
var textX = canvas.width - gap/2 - textSize.width;
var textY = canvas.height - gap/2 - textSize.height;
var gradient=context.createLinearGradient(textX, textY, textX+textSize.width, textY);
gradient.addColorStop("0", "purple");
gradient.addColorStop("0.5", "orange");
gradient.addColorStop("1.0", "blue");
context.font = "20px Georgia";
// 文字水平方向上对齐方式
context.textAlign = "right";
// 文字垂直方向上对齐方式
// context.textBaseline = "alphabetic";
// 用渐变填色
context.fillStyle = gradient;
context.clearRect(textX, textY, textSize.width, textSize.height);
// 填充文字
context.fillText("https://www.webserv.cn", canvas.width - gap, canvas.height - gap);
// 描边文字
// context.strokeText("www.webserv.cn", canvas.width - gap, canvas.height - gap);

// 绘制饼状图
var data = [{ "color": "red", "class": "PHP", "radian": 0.35 }, { "color": "green", "class": "Java", "radian": 0.2 }, { "color": "blue", "class": "C++", "radian": 0.3 }, { "color": "gray", "class": "C", "radian": 0.15 }];
var beginRadian = endRadian = 0;
data.forEach(function (value) {
  // console.log(index + ": "+ JSON.stringify(value));
  var lineX = lineY = 0;
  var textRadian = 0;
  var offText = 50;
  // 设置填充色
  context.fillStyle = value.color;
  // 设置字体
  context.font = "20px Georgia";
  // 设置文字垂直对齐方式
  context.textBaseline = "middle";
  // 根据数据比例来计算扇形结束时弧度
  endRadian = beginRadian + value.radian*2*Math.PI;

  context.beginPath();
  context.moveTo(PosX, PosY);
  // 设定圆弧形状
  context.arc(PosX, PosY, Radius, beginRadian, endRadian);
  // 填充圆弧
  context.fill();

  context.beginPath();
  // 设置引线颜色
  context.strokeStyle = value.color;
  // 设置引线线宽
  context.lineWidth = 2;

  // 计算文字偏移的弧度
  textRadian = beginRadian + 1/2*value.radian*2*Math.PI;
  // 计算斜引线的起始点坐标，三角函数
  lineX = PosX + Radius * Math.cos(textRadian);
  lineY = PosY + Radius * Math.sin(textRadian);
  context.moveTo(lineX, lineY);

  // 计算斜引线终点坐标，即直引线的起始点坐标，三角函数
  lineX = PosX + (Radius+offText)*Math.cos(textRadian);
  lineY = PosX + (Radius+offText)*Math.sin(textRadian);
  context.lineTo(lineX, lineY);

  // 判断文字所在区域，并计算直引线终点坐标，即文字起始点坐标。左半区域时，设置文字水平对齐为右对齐；右半区域时设置文字水平对齐为左对齐
  if(textRadian >= Math.PI*1/2 && textRadian <= Math.PI*3/2) {
    lineX -= offText
    context.textAlign = "right";
  }
  else {
    lineX += offText;
    context.textAlign = "left";
  }
  context.lineTo(lineX, lineY);

  // 绘制引线
  context.stroke();
  // 填充文字
  context.fillText(value.class, lineX, lineY);

  // 当前扇形结束时弧度为下个扇形起始弧度
  beginRadian = endRadian;
});


// 绘制圆弧
context.beginPath();
context.fillStyle = "#F00";
context.strokeStyle = "#000";
context.lineWidth = 2;
// 设定圆弧形状
context.arc(PosX, PosY, Radius, 0, 2 * Math.PI);
// 描边圆弧
context.stroke();

// 绘制图片
var portrait = new Image();
portrait.src = "/media/images/self.jpg";
context.beginPath();
context.drawImage(portrait, gap, gap, 100, 100);

var character = new Image();
character.src = "/media/images/canvas_1.png";
var characterX = characterY = sWidth = sHeight = 0;
var step = 8;
var i = 0;
sWidth = character.width / step;
sHeight = character.height / step;
context.beginPath();
characterX = textX + (textSize.width-sWidth)/2;
characterY = textY - sHeight;
var line = 0;
context.save();
// context.translate();
context.scale(0.5, 0.5);
setInterval(function() {
  i %= step;
  context.clearRect(characterX+sWidth/2-gap*3, characterY+sHeight/2-gap*3, gap * 6, gap * 6);
  context.drawImage(character, sWidth*i, sHeight*line, sWidth, sHeight, characterX, characterY, sWidth, sHeight);
  i++;
}, 1000/step);
context.restore();
// context.clearRect(characterX, characterY, sWidth, sHeight);
// console.log("width: " + sWidth + ", height: " + sHeight);

// 获取字符串在屏幕显示的尺寸
function getTextSize(string, fontSize = "16px") {
  var span = document.createElement("span");
  var textSize = {};
  textSize.width = span.offsetWidth;
  textSize.height = span.offsetHeight;
  span.style.fontSize = fontSize;
  span.style.visibility = "hidden";
  span.innerText = string;
  document.body.appendChild(span);
  textSize.width = span.offsetWidth - textSize.width;
  textSize.height = span.offsetHeight - textSize.height;
  span.parentNode.removeChild(span);
  return textSize;
}
// console.log(getTextSize("www.webserv.cn", "20px"));

// var json = '{"color": "red", "class": "PHP", "radian": 0.4}';
// console.log(JSON.parse(json));

var video = document.createElement("video");
video.src = "/media/videos/mov_bbb.mp4";
context.beginPath();
context.drawImage(video, 0, 0, 100, 100);
document.querySelectorAll("input").forEach(function(btn) {
  btn.onclick = function() {
    if(this.value == "Play") {
      video.play();
    }
    if(this.value == "Pause") {
      video.pause();
    }
  };
});

window.addEventListener('keydown', function (e) {
  // console.log(e);
  line = e.key;
}, false);

video.addEventListener('play', function () {
  var i = window.setInterval(function () { context.drawImage(video, 0, 0, 270, 135) }, 1000 / 144);
}, false);
video.addEventListener('pause', function () { window.clearInterval(i); }, false);
video.addEventListener('ended', function () { clearInterval(i); }, false);

console.log("width: " + canvas.width + "px, height: " + canvas.height + "px");
// console.log(Math.ceil(context.measureText("https://www.webserv.cn").width));
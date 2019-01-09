/*
 * @Author: zhangye
 * @Date:   2018-04-10 17:28:34
 * @Version:   1.0
 * @Last Modified by:   zhangye
 * @Last Modified time: 2018-04-13 14:09:53
 */
// animation.js 
// 粒子总数 
var COUNT = 500; // 重力 
var G = -0.1; // 摩擦力 
var F = -0.04;

var objects = [];

function init() {
	var docfrag = document.createDocumentFragment();
	var circle = $('.main');
    for (var i = 0; i < COUNT; i++) {
        var d = Math.random() * 2 * Math.PI;
        var v = Math.random() * 5;
        var vx = v * Math.cos(d);
		var vy = v * Math.sin(d);
        objects.push({
			x:250,
			y:250,
			vx:vx,
			vy:vy
		});
        var element = document.createElement('div');
        element.id= 'circle-' + i ;
        element.className = "circle";
        docfrag.appendChild(element);
        element = null;
    }
    circle.html(docfrag);;
}

function updateCircle() {
    for (var i = 0; i < COUNT; i++) {
    	var $obj = $('#circle-' + i);
        var x = objects[i].x;
        var y = objects[i].y;
        var vx = objects[i].vx;
		var vy = objects[i].vy;
        if (Math.abs(vx) < 1e-9) vx = 0; // 速度分量改变 
        v = Math.sqrt(vx * vx + vy * vy);
       	vx += F * vx / v;
		vy += F * vy / v + G;
		x += vx;
		y += vy;
        objects[i].x = x;
        objects[i].y = y;
        objects[i].vx = vx;
        objects[i].vy = vy;
        $obj.css({ 'top': 400 - objects[i].y, 'left': objects[i].x });
    }
}
var interval = null;

function showAnimation() {
    if (interval) clearInterval(interval);
    $('.main').html('');
    init();
    interval = setInterval(updateCircle, 1000 / 60);
}
var 
w=window,
b=document.body,
c=b.children[0],
a=c.getContext("2d"),
p=2*Math.PI,
ww,
wh,
n=800;
b.style.margin="0";
c.style.display="block";
function push(f,p) {
  q.push(function() {f(p);});
  q.push(w.onresize);
}
function to(f,i) {setTimeout(f,i);}
function drawDot(color){
  a.fillStyle='#'+color;
  a.beginPath();
  a.arc(ww/2,wh/2,50,0,p,true);
  a.closePath();
  a.fill();
}
w.onresize=function(){
  ww=c.width=w.innerWidth;
  wh=c.height=w.innerHeight;
  a.fillRect(0,0,c.width,c.height);
};
(clock=function(h,m,t){
  w.onresize();
  q=[];
  t=new Date;
  h=t.getHours()%12;
  m=~~(t.getMinutes()/5);
  while(h--){push(drawDot,'e00');}
  while(m--){push(drawDot,'0e0');}
  q.forEach(function (e,i) {to(e,i*n);});
  to(clock,q.length*n+3*n);
})();

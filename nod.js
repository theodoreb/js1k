var 
w=window,
b=document.body,
c=b.children[0],
a=c.getContext("2d"),
p=2*Math.PI,
ww=w.innerWidth,
wh=w.innerHeight,
interval=800,
red='e00',
green='0e0',
queue = (function (q,pos) {
  q=[],pos=0;
  return {
    push: function (f,p) {
      q.push(function() {f(p);});
      q.push(w.onresize);
    },
    process: function() {
      q.forEach(function (e, i) {to(e,i*interval);});
      to(restart,q.length*interval+3*interval);
    },
    clear:function () {
      q=[];
    }
  };
}());
b.style.margin="0";
c.style.display="block";
function to(f,i) {setTimeout(f,i);}
function drawDot(color){
  a.fillStyle='#'+color;
  a.beginPath();
  a.arc(ww/2,wh/2,50,0,p,true);
  a.closePath();
  a.fill();
}
function restart() {w.onresize();queue.clear();clock();}
(w.onresize=function(){
  ww=c.width=w.innerWidth;
  wh=c.height=w.innerHeight;
  a.fillRect(0,0,c.width,c.height);
})();
(clock=function(h,m,t){
  t=new Date;
  h=t.getHours()%12;
  m=~~(t.getMinutes()/5);
  while(h--){queue.push(drawDot,red);}
  while(m--){queue.push(drawDot,green);}
  queue.process();
})();

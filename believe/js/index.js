window.onload=function(){
    /*滚动条滚动，*/
    search();

    //轮播图
    banner();

    //倒计时
    downTime();
}
/*搜索框滚动*/
function search(){
  
    var header_box=document.querySelector(".jd_header_box");
    var banner=document.querySelector(".jd_banner");
    var h=banner.offsetHeight;
    
    window.onscroll=function(){
        var opacity=0;
        
        var top=document.body.scrollTop;
        if(top<h){
             opacity=top/h*0.85;
        }else{
            opacity=0.85;
        }
         
        header_box.style.background="rgba(201,21,35,"+opacity+")";
    }
}

function　banner(){
     
        var banner=document.querySelector(".jd_banner");
        
        var imageBox=banner.querySelector("ul:first-child");

        var pointsBox=banner.querySelector("ul:last-child");
       
        var  w=banner.offsetWidth;
              var pointlis=pointsBox.querySelectorAll("li");

       
        var index=1;

        var addTransition=function(){
            imageBox.style.transition="all 0.2s";
            imageBox.style.webkitTransition="all 0.2s";
        };

        var removeTransition=function(){
            imageBox.style.transition="none";
            imageBox.style.webkitTransition="none";
        }

      
        var addTranslate=function(w){
            imageBox.style.transform="translateX("+w+"px)";
            imageBox.style.webkitTransform="translateX("+w+"px)";
        }


          var timer=setInterval(function(){
               index++;
               
               addTransition();
              
               addTranslate(-index*w);
          },1000);
        
         itcast.transitoinEnd(imageBox,function(){
            if(index<=0){
                index=8;
                removeTransition();
                addTranslate(-index * w);
            }
            else if(index>=9){
                index=1;
                removeTransition();
                addTranslate(-index * w);
            }
           
            setPoint(index);
         });
      
        var setPoint=function(index){
                for(var i=0;i<pointlis.length;i++){
                    
                    pointlis[i].classList.remove("now");
                }
               
                console.log(index);
               pointlis[index-1].classList.add("now");
        };
       

       var startX=0;

       var moveX=0;

       var distinceX=0;

       var isMove=false;





        //触屏开始
        imageBox.addEventListener("touchstart",function(event){
                console.log("start");
               
                clearInterval(timer);
               
              
                 startX=event.touches[0].clientX;
                 console.log(event.touches[0].clientX);

        });
        //移动
        imageBox.addEventListener("touchmove",function(event){
                console.log("move");
               
                isMove=true;
                
                moveX=event.touches[0].clientX;
               
                distinceX=moveX-startX;  
                
                var current=(-index*w)+distinceX;
                
                removeTransition();
                addTranslate(current);



        })
        //触屏离开
        imageBox.addEventListener("touchend",function(){
                 console.log("end")
    if(isMove && Math.abs(distinceX)>w/3){
                       
                        if(distinceX>0){
                                index--;
                        }else{
                                index++;
                        }

                         //吸附回去
                         addTransition();
                         addTranslate(-index*w);
                 }else{
                        
                        addTransition();
                        addTranslate(-index*w);
                 }

                    timer=setInterval(function(){
                    index++;
                    addTransition();
                    addTranslate(-index*w);
                },1000);
        })
}
    function downTime(){
            var timeinfo=60*60*15;
            var spans=document.querySelectorAll(".sk_time>span");
            setInterval(function(){
             if(timeinfo<=0){
                return;
                }
                timeinfo--;
                var h=Math.floor(timeinfo/3600);
                var m=Math.floor(timeinfo%3600/60);
                var s=timeinfo%60;

                spans[0].innerHTML=Math.floor(h/10);
                spans[1].innerHTML=h%10;

                
                spans[3].innerHTML=Math.floor(m/10);
                spans[4].innerHTML=m%10;

                
                spans[6].innerHTML=Math.floor(s/10);
                spans[7].innerHTML=s%10;
            },1000);

}
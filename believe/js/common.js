var itcast={
    transitoinEnd:function(dom,fn){
        if(dom && typeof dom ==='object'){
            dom.addEventListener("webkitTransitionEnd",function(){
                fn && fn();
            });

            dom.addEventListener("transitionEnd",function(){
                    fn && fn();
            })
        }
    }

}





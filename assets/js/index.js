$(document).ready(function(){$(".waves-container").height($(".waves").height()),$(window).on("resize",function(){$(".waves-container").height($(".waves").height())});const e=new ScrollMagic.Controller,n=["-20%","-3%","-8%"];$(".waves").each(function(a){const o=TweenMax.to($(this),.5,{x:n[a],ease:Linear.easeIn});new ScrollMagic.Scene({triggerElement:".waves-dyn-height",reverse:!0,duration:"100%"}).triggerHook("onEnter").setTween(o).addTo(e)});$(window).width();const a=2;for(let e=0;e<a;e++)$(".impacts-background-gallery .slide").clone().appendTo(".impacts-background-gallery");for(let e of document.getElementsByClassName("sponsors-carousel"))for(let n=0;n<a;n++)e.innerHTML+=e.innerHTML;$(".ambassadors-container").css({"min-height":$(".ambassadors-background").height()}),$(".modal").on("hidden.bs.modal",function(){$(this).find("iframe").attr("src",$(this).find("iframe").attr("src"))})});
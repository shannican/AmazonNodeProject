var flag = 0;
document.querySelector("#btn").addEventListener("click",function(){
  if(flag===0){
    document.querySelector("#container").style.height="54vh";
    document.querySelector("#form .txt1").style.opacity="1";
    document.querySelector("#form .txt2").style.opacity="1";
    document.querySelector("#btn #icon-arrow").style.opacity="1";
    document.querySelector("#btn #icon").style.opacity="0";
    flag=1;
  }else if(flag===1){
    document.querySelector("#container").style.height="47vh";
    document.querySelector("#form .txt1").style.opacity="0";
    document.querySelector("#form .txt2").style.opacity="0";
    document.querySelector("#btn #icon-arrow").style.opacity="0";
    document.querySelector("#btn #icon").style.opacity="1";
    flag=0;
  }
})
document.querySelector("#pp").addEventListener("click",function(){
    console.log('hhehehe')
    document.querySelector("#pp-input").click();
})
document.querySelector("#pp-input").addEventListener("change", function(){
document.querySelector("#prof").submit();
});

document.querySelector("#search-input").addEventListener("keydown",(data)=>{
    if(data.keyCode === 13){
        console.log("hehe")
        window.location.href = `/search/${document.querySelector("#search-input").value}`
    }
})
// flag=0;
// document.querySelector("#profile-pic").addEventListener("click",function(){
//     if(flag===0){
//         document.querySelector("#option").style.opacity="1";
//         flag=1;
//     }else{
//         document.querySelector("#option").style.opacity="0";
//         flag=0;
//     }
// })

var i = 1
setInterval(()=>{
    if(i === 5){
        document.querySelector("#img1").style.opacity="0"
        document.querySelector("#img2").style.opacity="0"
        document.querySelector("#img3").style.opacity="0"
        document.querySelector("#img4").style.opacity="0"
        i = 1
    }
    console.log(i)
    document.querySelector(`#img${i}`).style.opacity="1"
    if(i>1){
        document.querySelector(`#img${i-1}`).style.opacity="0"
    }
    i++
},1500)
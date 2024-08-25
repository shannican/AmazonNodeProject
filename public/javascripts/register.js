function nameTitle(){
    document.querySelector("#title").addEventListener("input",(data)=>{
        document.querySelector("#titlecount").innerHTML = 20-(document.querySelector("#title").value.length)
        if(document.querySelector("#title").value.length>20){
            document.querySelector("#low1 #ltitle").innerHTML = "Ooops! This title is getting long. Try trimming it down."
            document.querySelector("#low1").style.color = "red"
        }
        else{       
            document.querySelector("#low1 #ltitle").innerHTML = "your first 20 character is what usually show up in the feeds"
            document.querySelector("#low1").style.color = "rgb(150, 150, 150)"
        }
    })
    document.querySelector("#title").addEventListener("focusout",(data)=>{
        document.querySelector("#low1").style.opacity = 0
    })
    document.querySelector("#title").addEventListener("focusin",(data)=>{
        document.querySelector("#low1").style.opacity = 1
    })
}

function LastNameTitle(){
    document.querySelector("#lastName-Tittle").addEventListener("input",(data)=>{
        document.querySelector("#titlecount2").innerHTML = 10-(document.querySelector("#lastName-Tittle").value.length)
        if(document.querySelector("#lastName-Tittle").value.length>10){
            document.querySelector("#low2 #tittle").innerHTML = "Ooops! This title is getting long. Try trimming it down."
            document.querySelector("#low2").style.color = "red"
        }
        else{       
            document.querySelector("#low2 #tittle").innerHTML = "your first 10 character is what usually show up in the feeds"
            document.querySelector("#low2").style.color = "rgb(150, 150, 150)"
        }
    })
    document.querySelector("#lastName-Tittle").addEventListener("focusout",(data)=>{
        document.querySelector("#low2").style.opacity = 0
    })
    document.querySelector("#lastName-Tittle").addEventListener("focusin",(data)=>{
        document.querySelector("#low2").style.opacity = 1
    })
}


function numberTitle(){
    document.querySelector("#mob-title").addEventListener("input",(data)=>{
        document.querySelector("#mob-titlecount").innerHTML = 10-(document.querySelector("#mob-title").value.length)
        if(document.querySelector("#mob-title").value.length>10){
            document.querySelector("#low3 #numbertitle").innerHTML = "Ooops! This title is getting long. Try trimming it down."
            document.querySelector("#low3").style.color = "red"
        }
        else{       
            document.querySelector("#low3 #numbertitle").innerHTML = "fill only 10 digits number"
            document.querySelector("#low3").style.color = "rgb(150, 150, 150)"
        }
    })
    document.querySelector("#mob-title").addEventListener("focusout",(data)=>{
        document.querySelector("#low3").style.opacity = 0
    })
    document.querySelector("#mob-title").addEventListener("focusin",(data)=>{
        document.querySelector("#low3").style.opacity = 1
    })
}

document.querySelector("#email-title").addEventListener("focusout",(data)=>{
    document.querySelector("#low4").style.opacity = 0
})
document.querySelector("#email-title").addEventListener("focusin",(data)=>{
    document.querySelector("#low4").style.opacity = 1
})

numberTitle()
nameTitle()
LastNameTitle()
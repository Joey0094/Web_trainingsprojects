window.onload = function() {
    let curIndex = 0;
    let imgClassList = ["p7", "p6", "p5", "p4", "p3", "p2", "p1"]
    const imgList = document.querySelectorAll(".mainBox .imgBox a");
    const mainBox = document.querySelector(".mainBox");
    const btnL = document.querySelector(".mainBox .btnL");
    const btnR = document.querySelector(".mainBox .btnR");
    const btnCList = document.querySelectorAll(".mainBox .btnC span");
    const imgCount = imgList.length;
    let intervalID;

    btnL.onclick = function() {
        nextPage(false)
    }
    btnR.onclick = function() {
        nextPage(true)
    }

    intervalID = setInterval(function() {
        nextPage(true)
    }, 3000)
    mainBox.onmouseout = function() {
        intervalID = setInterval(function() {
            nextPage(true)
        }, 3000)
    }
    mainBox.onmouseover = function() {
        clearInterval(intervalID)
    }

    for(let i = 0; i < imgCount; i++) {
        btnCList[i].onclick = function() {
            nextPage(i)
        }
    }

    function nextPage(arg) {
        if(typeof arg === "boolean") {
            if(!arg) {
                let temp = imgClassList[0]
                for(let i = 0; i < imgCount - 1; i++) {
                    imgClassList[i] = imgClassList[i + 1]
                    imgList[i].setAttribute("class", imgClassList[i])
                }
                imgClassList[imgCount - 1] = temp
                imgList[imgCount - 1].setAttribute("class", imgClassList[imgCount - 1])
                curIndex--
            } else {
                let temp = imgClassList[imgCount - 1]
                for(let i = imgCount - 1; i > 0; i--) {
                    imgClassList[i] = imgClassList[i - 1]
                    imgList[i].setAttribute("class", imgClassList[i])
                }
                imgClassList[0] = temp
                imgList[0].setAttribute("class", imgClassList[0])
                curIndex++
            }
        } else if(typeof arg === "number") {
            let offset = arg - curIndex
            if(offset > 0) {
                for(let i = 0; i < offset; i++) nextPage(true)
                curIndex = arg
            } else {
                for(let i = 0; i < -offset; i++) nextPage(false)
                curIndex = arg
            }
        } else {
            return
        }
        if(curIndex === imgCount) {
            curIndex = 0
        } else if(curIndex === -1) {
            curIndex = imgCount - 1
        }
        updateBtnC()
    }

    function updateBtnC() {
        for(let i = 0; i < imgCount; i++) {
            if(i === curIndex) {
                btnCList[i].setAttribute("class", "selected")
            } else {
                btnCList[i].setAttribute("class", "")
            }
        }
    }
}

;
window.onload = function() {
    var mainBox = document.getElementById("mainBox")
    var imgBox = document.getElementsByClassName("imgBox")
    var btnCs = document.querySelectorAll(".btnC li")
    var btnL = document.getElementsByClassName("btnL")
    var btnR = document.getElementsByClassName("btnR")
    var currentIndex = 0
    var intervalID1, intervalID2
    var moving = false // 判断图片是否在移动

    showHidden()
    continueChange()

    btnL[0].onclick = function() {
        if(!moving) nextPage(false) // 输入 false 向前翻一张图片
    }
    btnR[0].onclick = function() {
        if(!moving) nextPage(true) // 输入 true 向后翻一张图片
    }

    for(let i = 0; i < btnCs.length; i++) {
        btnCs[i].onclick = function() {
            nextPage(i)
        }
    }

    /*
    functions are below
     */
    function showHidden() {
        mainBox.onmouseover = function() {
            btnL[0].style.display = "block"
            btnR[0].style.display = "block"
            clearInterval(intervalID1)
        }
        mainBox.onmouseout = function() {
            btnL[0].style.display = "none"
            btnR[0].style.display = "none"
            continueChange()
        }
    }

    function nextPage(arg) {
        var current = imgBox[0].offsetLeft
        var target
        if(typeof arg === "boolean") {
            if (arg === false) {
                target = current + 902
                currentIndex--
                slowMove(current, target, 1000 * 10 / Math.abs(target - current))
            } else {
                target = current - 902
                currentIndex++
                slowMove(current, target, 1000 * 10 / Math.abs(target - current))
            }
        } else if(typeof arg === "number") {
            target = current - (arg - currentIndex) * 902
            currentIndex = arg
            slowMove(current, target, 1000 * 10 / Math.abs(target - current))
        } else {
            return
        }
    }

    function slowMove(current, target, interval) {
        moving = true
        intervalID2 = setInterval(function() {
            if(target - current > 0) {
                current += 10
                if(current < target) {
                    imgBox[0].style.left = current + "px"
                } else {
                    imgBox[0].style.left = target + "px"
                    current = target
                }
            } else if(target - current < 0) {
                current -= 10
                if(current > target) {
                    imgBox[0].style.left = current + "px"
                } else {
                    imgBox[0].style.left = target + "px"
                    current = target
                }
            } else {
                clearInterval(intervalID2)
                if(currentIndex === 5) {
                    currentIndex = 0
                    imgBox[0].style.left = - (currentIndex + 1) * 902 + "px"
                } else if(currentIndex === -1) {
                    currentIndex = 4
                    imgBox[0].style.left = - (currentIndex + 1) * 902 + "px"
                }
                updateBtn()
                moving = false
            }
        }, interval)
    }

    function updateBtn() {
        for(let i = 0; i < btnCs.length; i++) {
            if(i === currentIndex) {
                btnCs[i].style.background = "red"
            } else {
                btnCs[i].style.background = "#333333"
            }
        }
    }

    function continueChange() {
        intervalID1 = setInterval(function() {
            nextPage(true)
        }, 3000)
    }
}
// Question mark visibility
//  Question mark variable

const questionMark = document.querySelector('#userSearch');
// 1.Visibility function
const blinkingMark = () => {
        questionMark.classList.toggle('notvisible');
    }
    // 1a. Visibility interval
setInterval(blinkingMark, 500);
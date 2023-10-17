// 1 Task swap text of blocks 4 & 5
let block4 = document.getElementById('bl4');
let block5 = document.getElementById('bl5');

const swapButton = document.getElementById('swapButton');

swapButton.addEventListener('click', function(event) {
    event.preventDefault();

    const tempText = block4.innerText;
    block4.innerText = block5.innerText;
    block5.innerText = tempText;
});

// 2 Task calculate Area of triangle and output the result in block 3
const aside = 12,
    bside = 22,
    cside = 13;

function findAreaOfTriangle(a, b, c) {
    let s = (a + b + c) / 2;
    return s;
}

let result = findAreaOfTriangle(aside, bside, cside);
let resultElement = document.getElementById('result');

resultElement.textContent = "Area of Triangle(with sides of 12 22 13): " + result;

// 3 Task get 10 numbers from form, input by dialoge window and save to cookies. 
let form = document.getElementById("myForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let inputValues = document.getElementById("inputValues").value;
        let numbers = inputValues.split(" ").map(function(num) {
            return parseFloat(num);
        });

        let maxNum = Math.max.apply(null, numbers);
        let countMaxNums = numbers.reduce(function(count, num) {
            return num === maxNum ? count + 1 : count;
        }, 0);

        document.cookie = "maxNum=" + maxNum;
        document.cookie = "countMaxNums=" + countMaxNums;

        window.location.reload();
    });

    function getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    function deleteAllCookies() {
        const cookies = document.cookie.split(";");
    
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    window.onload = function() {
        let maxNum = getCookie("maxNum");
        let countMaxNums = getCookie("countMaxNums");

        if (maxNum && countMaxNums) {
            window.alert("Max num from cookies: " + maxNum + "\nNumber of max nums from cookies: " + countMaxNums);
            window.alert("Cookies deleted. Click OK to reload the page.");
            deleteAllCookies();
        }
    };
    
// 4 Task choose text boldness by checking the box and scrolling widnow and saving to localStorage
let textToModify = document.getElementById('textToModify');
let boldCheckbox = document.getElementById('boldText');

let fontWeight = localStorage.getItem('fontWeight');

if (fontWeight === 'bold') {
    textToModify.style.fontWeight = 'bold';
}
boldCheckbox.checked = false;

window.addEventListener('scroll', function() {
    if (boldCheckbox.checked) {
        let scrollPosition = window.scrollY;

        if (scrollPosition > 0) {
            textToModify.style.fontWeight = 'normal';
        } else {
            textToModify.style.fontWeight = 'bold';
        }

        localStorage.setItem('fontWeight', textToModify.style.fontWeight);
    }
});

// 5
let mid_elems = document.querySelector('.mid')

document.addEventListener('DOMContentLoaded', function(event){
    try{
    let listData = JSON.parse(localStorage.getItem('listData'));
    for (const list of listData){
        let elem = document.querySelector(`#${list.id}`)
        elem.appendChild(createList(list.rows, list.text))
    }
    }catch(err){
        console.log('list storage is empty')
    }
});

for (const mid_elem of mid_elems.children){
    mid_elem.addEventListener('mouseup', function(event) {
        let selectedText = window.getSelection().toString().trim();
        if (selectedText !== '') {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let rect = range.getBoundingClientRect();
            
            let inputForm = document.createElement('div');
            inputForm.innerHTML = `
            <label for="rowCount">Amount of rows:</label>
            <input type="number" id="rowCount" name="rowCount" min="1" required><br>
            <label for="listText">Rows text:</label>
            <input type="text" id="listText" name="listText" required><br>
            <button id="createListButton">Create list</button>
            `;
    
            inputForm.style.position = 'absolute';
            inputForm.style.top = rect.bottom + 'px';
            inputForm.style.left = rect.left + 'px';
            inputForm.style.backgroundColor = 'white'; 
            inputForm.style.padding = '10px';
            
            document.body.appendChild(inputForm);
                

            let createListButton = document.getElementById('createListButton');
            createListButton.addEventListener('click', function() {
                let rowCount = document.getElementById('rowCount').value;
                let listText = document.getElementById('listText').value;

                let ul = createList(rowCount, listText);
                ul.style.top = rect.bottom + 20 + 'px'; 
                ul.style.left = rect.left + 'px';
                event.target.appendChild(ul);
                inputForm.remove();
                let listData = localStorage.getItem('listData') ? JSON.parse(localStorage.getItem('listData')) : [];
                listData.push({rows: rowCount, text: listText, id: mid_elem.id});
                localStorage.setItem('listData', JSON.stringify(listData))
            });
        }
    });
}

function createList(rowCount, listText) {
    var ul = document.createElement('ul');
    ul.style.listStyleType = 'none'; 
    ul.style.color = 'black'; 

    for (var i = 0; i < rowCount; i++) {
        var li = document.createElement('li');
        li.textContent = listText;
        if (i % 2 === 0) {
            li.style.backgroundColor = 'white'; 
        } else {
            li.style.backgroundColor = 'black'; 
            li.style.color = 'white'; 
        }
        ul.appendChild(li);
    }

    return ul;
}
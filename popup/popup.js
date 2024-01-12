// Assuming you have a div with id 'button-flex' in your HTML
var buttonContainer = document.getElementById('button-flex');

// Creating 5 buttons
for (let i = 1; i <= 5; i++) {
    let button = document.createElement('button');
    button.textContent = i;

    // You can add any additional attributes or styles to the buttons if needed
    button.className = 'button';
    button.onclick = async () => {
        // get the current tab
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        // send a message to the content script
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: SelectAll,
            args: [i]
        }).then((result) => console.log("DONE? ", result))
    };

    // Appending the button to the container
    buttonContainer.appendChild(button);
}

function SelectAll(star) {
    // initialize the input variable
    let input = undefined, emoji = undefined

    for (let questionNo = 1; questionNo < 99; questionNo++) {
        // finding radio input with value 5
        input = document.getElementById(`${star}mark${questionNo}`)
        // img#tick_img_3mark1
        emoji = document.getElementById(`tick_img_${star}mark${questionNo}`)
        // console.log('input: ', input)

        if (input) {
            input.checked = true
            emoji.click()
            // console.log(`😎 Checked ${star}mark${questionNo}`)
        } else {
            // Seleting Complete
            // console.log('💣 Done!')
            return true
        }
    }
    return false
}


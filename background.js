// background.js

function translate(info)
{
    var searchstring = info.selectionText;
    let sourceLang;
    let targetLang;
    
    // get user's saved options from chrome's storage
    chrome.storage.sync.get({
        sourceLang: 'en',
        targetLang: 'es'
      }, function(items) {
        // set the language variables for use with http request
        sourceLang = items.sourceLang;
        targetLang = items.targetLang;

        var data = null;

        // create HttpRequest
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            // on response
	        if (this.readyState === this.DONE) {
	    	    alert(extractContent(this.response));
	        }
        });

        // set headers and send translation request
        xhr.open("GET", "https://microsoft-azure-translation-v1.p.rapidapi.com/translate?from=" + sourceLang + "&to=" + targetLang + "&text=" + searchstring);
        xhr.setRequestHeader("x-rapidapi-host", "microsoft-azure-translation-v1.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "a479028c71msh30e13e71ff449b7p1c9242jsna854634c27c4");
        xhr.setRequestHeader("accept", "application/json");

        xhr.send(data);
    });
}

function extractContent(responseString) {
    var span = document.createElement('span');
    span.style.visibility = false;
    span.innerHTML = responseString;
    return span.textContent || span.innerText;
};

chrome.contextMenus.create({title: "Translate", contexts:["selection"], onclick: translate});

// add options for changing languages
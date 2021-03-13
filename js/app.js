console.log(`PostMan Clone`);
//Utility Function to get DOM element from string 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//Initialize no of parameters
let addedParamCount = 0;

//Hide The parameterBox Initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

//If the user clicks on params box,hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

//If the user clicks on json box,hide the paramas box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//If the user Add more custom parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    //Params will created more custom components
    let params = document.getElementById('params');
    //String is manipulating the exact parameteBox
    let string = `
             <div class="form-row my-2">
              <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                <div class=" col-md-4">
              <input type="text" class="form-control" id="parameterKey  ${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} key">
             </div>
              <br>
               <div class=" col-md-4">
                <input type="text" class="form-control" id="parameterValue  ${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} value">
               </div>
            <button class="btn btn-primary deleteParam"> - </button>
           </div>  `;
    //Convert the element string to DOM node and it will return a DOM element
    let paramElement = getElementFromString(string);
    //Appending params to paramElement
    params.appendChild(paramElement);
    //Add a EventListener to remove the parameter on clicking  (-) button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // alert('Delete this item');
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})

//If the user Clicks the submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    //Show plese wait in the responce box to request patience form the user
    // document.getElementById('responseJsonText').value = "Please wait......Fetching Responce";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";


    //fetch all the value user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    //if user has used params option insted of json,collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            //cheking for some parameters when they are deleted
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    // console.log('URL is ', url);
    // console.log('requestType is ', requestType);
    // console.log('contentType is ', contentType);
    // console.log('data is ', data);

    // if the request type is get, invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                //  document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    } else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });

    }


})
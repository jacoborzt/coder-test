document.body.onload = scanBarCode;

function scanBarCode(){
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#camera'),
        },
        decoder: {
            readers: [
                "ean_reader",
                /*
                "code_128_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader",
                "i2of5_reader"
                */
            ]
        }
    }, function(err) {
        if (err) {
            console.log(`Error: ${err}`);
            loadMessage('error', err);
            return;
        }
        console.log("Initialization finished.\nReady to start");
        loadMessage('success', 'Initialization finished. Ready to start');
        Quagga.start();
    });

    Quagga.onDetected(function(data) {
        console.log(data.codeResult);
        loadMessage('success', `Detected barcode: ${data.codeResult.code}`);
        Quagga.stop();
    });
}

function loadMessage(type, context){
    let message = document.createElement("nav");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");

    let remove = () => document.getElementById('message').remove();

    message.id = "message"
    message.classList.add(type);
    type = type[0].toUpperCase() + type.slice(1);
    message.onclick = remove;
    message.onload = setTimeout(remove, 5000)
    
    p.appendChild(document.createTextNode(context));
    h3.appendChild(document.createTextNode(type));
    message.appendChild(h3);
    message.appendChild(p);
    document.querySelector('#main-content').appendChild(message);
}


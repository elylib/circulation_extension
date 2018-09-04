function attachBarcodeListeners() {
    var patronInput = document.getElementsByClassName('barcodeinput barcoderecieved-patron')[0];
    patronInput.addEventListener('keydown', function (e) {
        var code = e.which;
        if (code === 31 || code === 13 || code === 188 || code === 186) {
            patronInput.value = scrubBarcode(patronInput);
        }
    });

    document.querySelector('.patron-barcode-input .barcode-submit').addEventListener('click', function () {
        patronInput.value = scrubBarcode(patronInput);
    });
}

function scrubBarcode(patronInput) {
    var scrubbedBarcode = patronInput.value.replace(/[;?]/g, '');
    if (scrubbedBarcode.length > 9) {
        scrubbedBarcode = scrubbedBarcode.slice(0, 9)
    }
    return scrubbedBarcode;
}

if (window.location.href.indexOf('wms/cmnd/circ') !== -1) {
    var interval = setInterval(function () {
        if (document.getElementsByClassName('barcodeinput barcoderecieved-patron').length > 0) {
            clearInterval(interval);
            attachBarcodeListeners();
        }
    }, 100);
}
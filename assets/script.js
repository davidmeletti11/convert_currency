  //http://docs.awesomeapi.com.br/

const moedas = 'USD-BRL'

const getDolar = async () => {
    const result = await fetch(`https://economia.awesomeapi.com.br/json/last/${moedas}`, {
        method: 'GET',
        headers:  {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    })
    const json = await result.json()
    const dolar = json.USDBRL['bid']
    return dolar
}

let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");

usdInput.addEventListener("keyup", () => {
    convert("usd-to-brl")
});

brlInput.addEventListener("keyup", () => {
    convert("brl-to-usd")
});

usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput.value)
})

brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput.value)
})

usdInput.value = "1000,00";
convert("usd-to-brl");

// Funções
function formatCurrency(value) {
    let fixedValue = fixValue(value);
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };
    let formatter = new Intl.NumberFormat("pt-BR", options);
    return formatter.format(fixedValue);
}

function fixValue(value) {
    value = value.replace(/[^\d,.-]/g, '');
    let fixedValue = value.replace(",", ".");
    let floatValue = parseFloat(fixedValue);

    if (isNaN(floatValue)) {
        floatValue = 0;
    }
    return floatValue;
}

async function convert(type) {
    const dolar = await getDolar()
    if (type == "usd-to-brl") {
        let fixedValue = fixValue(usdInput.value)
        let result = fixedValue * dolar
        result = result.toFixed(2)

        brlInput.value = formatCurrency(result)
    }

    if (type == "brl-to-usd") {
        let fixedValue = fixValue(brlInput.value)
        let result = fixedValue / dolar
        result = result.toFixed(2)

        usdInput.value = formatCurrency(result)
    }
}
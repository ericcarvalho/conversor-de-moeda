// Substitua pela sua chave de API
const apiKey = "191393e4cc63d5d0422f8a6d";

// 1. Mapa de símbolos customizados
const customSymbols = {
    USD: "US$", // Dólar Americano
    CAD: "CA$", // Dólar Canadense
    AUD: "AU$", // Dólar Australiano
    BRL: "R$",  // Real Brasileiro
    EUR: "€",   // Euro
    GBP: "£",   // Libra Esterlina
    JPY: "¥",   // Iene
    CHF: "CHF"  // Franco Suíço
};

// 2. Função utilitária para formatar moeda
function formatCurrency(value, currencyCode, locale = "en-US") {
    const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode
    }).format(value);

    if (customSymbols[currencyCode]) {
        return formatted.replace(/[^0-9.,\s]+/, customSymbols[currencyCode]);
    }

    return formatted;
}

// 3. Seu código principal vem depois
const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const currencySelectToConvert = document.querySelector(".currency-select-to-convert");

// Mapa de locais recomendados por moeda
const currencyLocales = {
    USD: "en-US", // Dólar Americano
    EUR: "de-DE", // Euro (Alemanha)
    GBP: "en-GB", // Libra Esterlina (Reino Unido)
    JPY: "ja-JP", // Iene Japonês
    CHF: "de-CH", // Franco Suíço (Suíça)
    AUD: "en-AU", // Dólar Australiano
    CAD: "en-CA", // Dólar Canadense
    BRL: "pt-BR"  // Real Brasileiro
};

// Função que busca taxa de câmbio
async function getExchangeRate(base, target) {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${base}/${target}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === "success") {
        return data.conversion_rate;
    } else {
        throw new Error("Erro ao buscar a cotação");
    }
}

// Função principal de conversão
async function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value;
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");

    try {
        const moedaOrigem = currencySelectToConvert.value; // moeda do input de cima
        const moedaDestino = currencySelect.value;         // moeda do input de baixo

        if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
            alert("Por favor, insira um valor numérico positivo.");
            return;
        }

        if (moedaDestino === moedaOrigem) {
            alert("Por favor, selecione moedas diferentes para conversão.");
            return;
        }

        // busca taxa de câmbio direta
        const taxaConversao = await getExchangeRate(moedaOrigem, moedaDestino);

        // calcula valor convertido
        const valorConvertido = inputCurrencyValue * taxaConversao;

        // escolhe locale adequado
        const locale = currencyLocales[moedaDestino] || "en-US";

        // exibe resultado formatado
        currencyValueConverted.innerHTML = formatCurrency(valorConvertido, moedaDestino, locale);

        currencyValueToConvert.innerHTML = formatCurrency(inputCurrencyValue, moedaOrigem, currencyLocales[moedaOrigem] || "en-US");

    } catch (error) {
        console.error(error);
    }
}


    // Função para trocar nome e imagem da moeda
    function changeCurrency() {
        const currencyName = document.getElementById("currency-name");
        const currenyImage = document.querySelector(".currency-img");
        const currencyNameToConvert = document.getElementById("currency-name-to-convert");
        const currenyImageToConvert = document.querySelector(".currency-img-to-convert");

        const currencyInfo = {
            USD: { name: "Dólar Americano", img: "./assets/bandeiraUSA.png" },
            EUR: { name: "Euro", img: "./assets/euroLogo.png" },
            GBP: { name: "Libra Esterlina", img: "./assets/libraLogo.png" },
            JPY: { name: "Iene Japonês", img: "./assets/ieneLogo.png" },
            AUD: { name: "Dólar Australiano", img: "./assets/australiaLogo.png" },
            CAD: { name: "Dólar Canadense", img: "./assets/canadaLogo.png" },
            CHF: { name: "Franco Suíço", img: "./assets/suicaLogo.png" },
            BRL: { name: "Real Brasileiro", img: "./assets/bandeiraBrasil.png" }
        };

        const selected = currencySelect.value;
        const selectedToConvert = currencySelectToConvert.value;

        if (currencyInfo[selected]) {
            currencyName.innerHTML = currencyInfo[selected].name;
            currenyImage.src = currencyInfo[selected].img;
        }

        if (currencyInfo[selectedToConvert]) {
            currencyNameToConvert.innerHTML = currencyInfo[selectedToConvert].name;
            currenyImageToConvert.src = currencyInfo[selectedToConvert].img;
        }

        convertValues();
    }

    // Eventos
    currencySelect.addEventListener("change", changeCurrency);
    currencySelectToConvert.addEventListener("change", changeCurrency);

    convertButton.addEventListener("click", convertValues);
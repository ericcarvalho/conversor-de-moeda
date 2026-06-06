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
        const moedaDestino = currencySelect.value; // pega o código ISO da moeda
        const taxaConversao = await getExchangeRate(moedaDestino, "BRL");

        // valor convertido (quanto BRL equivale em moedaDestino)
        const valorConvertido = inputCurrencyValue / taxaConversao;

        // escolhe locale adequado ou usa en-US como fallback
        const locale = currencyLocales[moedaDestino] || "en-US";

        // exibe resultado formatado com símbolos customizados (US$, CA$, AU$ etc.)
        currencyValueConverted.innerHTML = formatCurrency(valorConvertido, moedaDestino, locale);

        currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue);

    } catch (error) {
        console.error(error);
    }
}


    // Função para trocar nome e imagem da moeda
    function changeCurrency() {
        const currencyName = document.getElementById("currency-name");
        const currenyImage = document.querySelector(".currency-img");

        const currencyInfo = {
            USD: { name: "Dólar Americano", img: "./assets/bandeiraUSA.png" },
            EUR: { name: "Euro", img: "./assets/euroLogo.png" },
            GBP: { name: "Libra Esterlina", img: "./assets/libraLogo.png" },
            JPY: { name: "Iene Japonês", img: "./assets/ieneLogo.png" },
            AUD: { name: "Dólar Australiano", img: "./assets/australiaLogo.png" },
            CAD: { name: "Dólar Canadense", img: "./assets/canadaLogo.png" },
            CHF: { name: "Franco Suíço", img: "./assets/suicaLogo.png" },
            BRL: { name: "Real Brasileiro", img: "./assets/brasilLogo.png" }
        };

        const selected = currencySelect.value;

        if (currencyInfo[selected]) {
            currencyName.innerHTML = currencyInfo[selected].name;
            currenyImage.src = currencyInfo[selected].img;
        }

        convertValues();
    }

    // Eventos
    currencySelect.addEventListener("change", changeCurrency);
    convertButton.addEventListener("click", convertValues);
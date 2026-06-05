/*fazer a lógica aos pouco passo a passo
1o testar o evento do botão "Onclick"
2o criar a função de conversão
mapear o valor do input
mapear o local onde vai aparecer o valor convertido
fazer a conta de conversão
exibir o valor convertido no local mapeado

*/

const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");


function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value;
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");

    const dollarToday = 5.25;
    const euroToday = 6.02;


    if (currencySelect.value == "dolar") {

        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dollarToday);

    }

    if (currencySelect.value == "euro") {

        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday);
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);


}

function changeCurrency() {
   const currencyName = document.getElementById("currency-name");
   const currenyImage = document.querySelector(".currency-img");

   if (currencySelect.value == "dolar"){
    currencyName.innerHTML = "Dólar Americano";
    currenyImage.src = "./assets/bandeiraUSA.png";
   }
   if (currencySelect.value == "euro"){
    currencyName.innerHTML = "Euro";
    currenyImage.src = "./assets/euroLogo.png";

   }
   
convertValues();

}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);

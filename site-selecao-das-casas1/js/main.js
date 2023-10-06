const MODEL_URL = "https://teachablemachine.withgoogle.com/models/Cp7Qrexi7/";
let model, labelContainer, numeroDeClasses;

window.onload = async () => {
    await init();
};

async function init() {
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    numeroDeClasses = model.getTotalClasses();
    // numeroDeClasses é o numero total de classes do modelo
    // numeroDeClasses vai virar numeroDeClasses
    labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < numeroDeClasses; i++) {
    //     labelContainer.appendChild(document.createElement("div"));
    // }

    document.getElementById("input").addEventListener('change', carregarImagem);
}

function carregarImagem() {
    let image = document.getElementById("input").files[0];
    let img = document.createElement("img");
    img.src = URL.createObjectURL(image);
    img.onload = async () => {
        img.width = 200;
        img.height = 200;
        // img-container -> img-container
        document.getElementById("img-container").innerHTML = '';
        document.getElementById("img-container").appendChild(img);
        
        Previsao(img);
    };
}

async function Previsao(img) {
    labelContainer.innerHTML = '';

    const prediction = await model.predict(img);
    console.log(prediction)
    let maxProbability = -1;
    let maxClass = null;
    for (let i = 0; i < numeroDeClasses; i++) {
     
        if(prediction[i].className === "homem "){
            const numberBar0 = prediction[i].probability * 100
            console.log(numberBar0)
            const numberBar0Txt = String(numberBar0); 
            const bar0 = document.getElementById("bar-fill-0")           
            const prob0 = document.getElementById('prob0')

            bar0.style.width = numberBar0Txt + "%";
            prob0.innerHTML = numberBar0.toFixed(2) + "%"

        }
        if(prediction[i].className === "mulher"){
            const numberBar1 = prediction[i].probability * 100
            const numberBar1Txt = String(numberBar1);
            const prob1 = document.getElementById('prob1') 
            const bar1 = document.getElementById("bar-fill-1")
           
            bar1.style.width = numberBar1Txt + "%";
            prob1.innerHTML = numberBar1.toFixed(2) + "%"
            
        }
        
        if (prediction[i].probability > maxProbability) {
            //maxProbality quer dizer a maxima probabilidades
            maxProbability = prediction[i].probability;
            //maxClass quer dizer o nome da classe com maxima probabilidade
            maxClass = prediction[i].className;
        }
    }
        // colocar fora do for (switch/case)
        const imgCasa = document.getElementById('img-casa')
        const linkCasa = document.getElementById('link-casa')
        switch(maxClass){
            
            case "homem ":
                

                linkCasa.href = "https://amandahogwarts.netlify.app/grifinoria"
                imgCasa.src = "./images/grifinoria.png"
                content = document.querySelector('.content')
                content.style.backgroundColor = '#A60311'
                content.style.backgroundImage = "url(./images/brilhoVermelho.gif)" 
                break
            
            case "mulher":

                linkCasa.href = "https://amandahogwarts.netlify.app/lufa-lufa"
                imgCasa.src = "./images/lufa-lufa.png"
                content = document.querySelector('.content')
                content.style.backgroundColor = '#D9A404'
                content.style.backgroundImage = "url(./images/brilhoPreto.gif)" 
                break
        }
        
    const resultDiv = document.createElement("div");
    resultDiv.innerHTML = `<strong>Resultado Final: ${maxClass} (${(maxProbability * 100).toFixed(2)}%)</strong>`;
    labelContainer.appendChild(resultDiv);
    ocultar = document.querySelector('.ocultar')
    ocultar.style.display = "none"
    resultDiv.style.display = "flex"
    resultDiv.style.flexDirection = "column"
    resultDiv.style.alignItems = "center"
    colors = document.querySelector('.colors')
    colors.style.display = "none"
    main = document.querySelector('main')
    main.style.gridTemplateColumns = "100% 0%"
    
   
    // const linkElement = document.createElement("a");
    // linkElement.textContent = "Conheca mais sobre sua casa";
    // resultDiv.appendChild(linkElement);

    // if (maxClass === "Corvinal") {
    //     linkElement.href = "https://amandahogwarts.netlify.app/corvinal";
    //     linkElement.style.color = '#034C8C'
    // } else if (maxClass === "Grifinória") {
    //     linkElement.href = "https://amandahogwarts.netlify.app/grifinoria";
    //     linkElement.style.color = '#A60311'
    // } else if (maxClass === "Sonserina") {
    //     linkElement.href = "https://amandahogwarts.netlify.app/sonserina";
    //     linkElement.style.color = '#04590A'
    // } else if (maxClass === "Lufa-Lufa") {
    //     linkElement.href = "https://amandahogwarts.netlify.app/lufa-lufa";
    //     linkElement.style.color = '#D9A404'
    // }
  
 }

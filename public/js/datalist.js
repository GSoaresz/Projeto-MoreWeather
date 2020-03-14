const url = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios";
let vetFetchIBGE = [];
fetch(url)
    .then((res) => res.json())
    .then((json) =>cidade_nome(json))


const cidade_nome = function(dado) {
    for(let i = 0; i < dado.length; i++) {
        vetFetchIBGE.push([dado[i].nome, dado[i].microrregiao.mesorregiao.UF.sigla, dado[i].id]);
    }
    list(vetFetchIBGE);
}
const list = function(vetFetchIBGE) {
    const datalist = document.querySelector('datalist');
    for(let i = 0; i < vetFetchIBGE.length; i++) {
        const option = document.createElement('option');
        option.value = vetFetchIBGE[i][2];
        option.innerText = `${vetFetchIBGE[i][0]} - ${vetFetchIBGE[i][1]}`;
        datalist.append(option);
    }
}

ibge.addEventListener('change', function() {
    fetch(url+`/${ibge.value}`)
    .then((res) => res.json())
    .then((json) =>{ 
        state.value = json.microrregiao.mesorregiao.UF.sigla;
        cityName.value = json.nome;
    })

})
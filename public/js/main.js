const form = document.querySelector('form');
const tbody = document.querySelector('tbody#listCounties');
const inputIBGE = document.querySelector('input#ibge');
const inputName = document.querySelector('input#cityName');
const inputState = document.querySelector('input#state');
const txtNote = document.querySelector('textarea#note');
const tagCityName = document.querySelector('p#tagCityName');

window.addEventListener('load', function (e) {
    e.preventDefault();

    if (localStorage.getItem("Counties") === null) {
        localStorage.setItem("Counties", "[]");
    } else {
        localData = JSON.parse(localStorage.getItem("Counties"));
        for (let i = 0; i < localData.length; i++) {
            listStorage(
                JSON.parse(localData[i]).ibge,
                JSON.parse(localData[i]).name,
                JSON.parse(localData[i]).state,
                JSON.parse(localData[i]).note
            );            
        }
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (typeof (Storage) !== 'undefined') {
        if (localStorage.hasOwnProperty("Counties")) {
            dataStorage = JSON.parse(localStorage.getItem("Counties"));
        }
        vetAll = '{"ibge":"'+inputIBGE.value+'", "name":"'+inputName.value+'", "state":"'+inputState.value+'", "note":"'+txtNote.value+'"}';
        dataStorage = JSON.parse(localStorage.getItem("Counties"));
        dataStorage.push(vetAll);
        localStorage.setItem("Counties", JSON.stringify(dataStorage));
    }

    listStorage(inputIBGE ,inputName, inputState, txtNote);
    M.toast({html: 'Municipio cadastrado!'});
});

tbody.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.type === 'submit') {
        removeCounties(e.target.parentNode.parentNode.querySelector(".cityName").textContent);
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        M.toast({ html: 'Municipio removido!' });
    }
});

const listStorage = function (i, n, s, txt) {
    let ibge, name, state, note;
    
    if ((typeof i == 'string')
    &&(typeof n == 'string')
    && (typeof s == 'string')
    && (typeof txt == 'string'))
    {
        ibge = i;
        name = n;
        state = s;
        note = txt;
    } else {
        ibge = i.value;
        name = n.value;
        state = s.value;
        note = txt.value;
    }
    const tdIBGE = `<td>${ibge}</td>`
    const tdName = `<td class="cityName">${name}</td>`;
    const tdState = `<td>${state}</td>`;
    const tdNote = `<td class="obs">${note}</td>`;
    const btnDelete = `<td><button class="btn orange darken-3 tooltipped" data-tooltip="Excluir">Exlcuir</button></td>`;
    const btnDetails = `<td><a href="#modal1" class="modal-trigger" id="porra1">
    <i class="material-icons">cloud</i>
    </a></td>`;
    const row = `<tr>${tdIBGE}${tdName}${tdState}${btnDetails}${tdNote}${btnDelete}</tr>`;

    tbody.innerHTML += row;
}
const removeCounties = function (name){
    vetStorage = JSON.parse(localStorage.getItem("Counties"));
    for(let i=0; i < vetStorage.length; i++){
        if( JSON.parse(vetStorage[i]).name === name) {
            
            vetStorage.splice(vetStorage[i], 1);
            localStorage.setItem("Counties", JSON.stringify(vetStorage));
        }
    }
}
// Página música

// Função assíncrona que retorna o json
async function selecionarMusica() {
    try {
        const response = await fetch("arquivos/musicas.json");
        return response.json();
    } catch (err) {
        alert("Não foi possível acessar a música");
        console.error(err);
    }
}

function atualizarPagina(musicasJSON) {
    // Pega os elementos que precisa mudar
    const $nomeMusica = document.querySelector(".titulo-musica");
    const $nomeAutor = document.querySelector(".autor-musica");
    const $capaMusica = document.querySelector(".capa-musica");

    const obj = musicasJSON[nomeMusica];

    // Coloca o nome nos 
    $nomeMusica.innerHTML = obj.nome;
    $nomeAutor.innerHTML = obj.artista;
    $capaMusica.src = "assets/" + obj.src;
    document.querySelector("title").innerHTML = obj.nome + " - Harmony Dream";

    let album = obj.album === null ? "" : ` do álbum ${obj.album}`;
    $capaMusica.alt = "Capa da música " + obj.nome + album;
}

// Pega os parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
let nomeMusica = urlParams.get("musica");
if (nomeMusica) {
    selecionarMusica()
        .then((json) => atualizarPagina(json));
}

// Página Login

// Função de pegar dados da API de países
async function selecionarPaises() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        return response.json();
    } catch (err) {
        console.log("Não foi possível acessar os países");
    }
}

function atualizarDatalist(jsonPaises) {
    const $datalist = document.querySelector("datalist");
    jsonPaises.sort((a,b) => {
        if (a.name.common < b.name.common) {
            return -1;
        } else {
            return true;
        }
    })
    console.log(jsonPaises)
    jsonPaises.forEach((pais) => {
        let nomePais = pais.name.common;
        const $option = document.createElement("option");
        $option.value = $option.textContent = nomePais;
        $datalist.appendChild($option);
    });
}

// Verifica se está na página de login
if (document.title === "Harmony Dream - Login") {
    selecionarPaises()
        .then((jsonPaises) => atualizarDatalist(jsonPaises));

    // Faz com que não possa adicionar letras no input de CPF e coloca . e - nos locais necessários
    const inpCPF = document.querySelector("#cpf");
    inpCPF.addEventListener("keypress", (e) => {
        if (e.key.match("[0-9]")) {
            let valor = inpCPF.value;
            if (valor.length === 10 && valor.match("[0-9]{10}")) {
                valor = valor.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/,"-");
            }
            inpCPF.value = valor;
        } else {
            e.preventDefault();
        }
    })
    
    // Faz com que ao clicar enter envie o formulário
    window.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            document.querySelector("button.button-form").click();
        }
    })

    // Faz você poder ver sua senha ao clicar no botão
    const btnPassword = document.querySelector(".btn-password");
    btnPassword.addEventListener("click", (e) => {
        const inpPassword = document.querySelector("#password");
        if (inpPassword.type === "password") {
            inpPassword.type = "text";
        } else {
            inpPassword.type = "password";
        }
    })

    // Faz com que a pessoa precise ter 13 anos ou vai fazer nesse ano para logar
    const inpData = document.querySelector("#birthday");
    inpData.max = (new Date().getFullYear() - 13) + "-12-31";
}

// Função para validação do formulário
(function () {
    'use strict'
    
    const forms = document.querySelectorAll('.needs-validation')
    
    forms.forEach( form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            
            form.classList.add('was-validated')
        }, false)
    })
})()

// Página de Perfil

async function selecionarContas() {
    try {
        let nomeConta = urlParams.get("perfil");
        const response = await fetch("arquivos/contas.json");
        const jsonContas = await response.json();
        atualizarPerfil(jsonContas, nomeConta ?? "ds-luqi");
    } catch (err) {
        alert("Não foi possível acessar a conta");
        console.error(err);
    }
}

function atualizarPerfil(jsonContas, nomeConta) {
    const $imgPerfil = document.querySelector(".img-conta");
    const $nomeConta = document.querySelector(".nome-conta");
    const $pInformações = document.querySelectorAll(".informacoes-conta");

    const obj = jsonContas[nomeConta];
    $imgPerfil.src = "assets/" + obj.src;
    $nomeConta.textContent = obj.nome;
    $pInformações[0].textContent = obj.seguidores + " Seguidores";
    $pInformações[1].textContent = obj.seguindo + " Seguindo";
    $pInformações[2].textContent = obj.playlists + " Playlists";
}

if (document.title === "Harmony Dream - Perfil") {
    selecionarContas();
}
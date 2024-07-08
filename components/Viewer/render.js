/*
Declaração de funções
*/
function setName(name) {
	document.querySelector('#localItem').textContent = name;
}

function clearItens() {
	let elementos = document.querySelectorAll(".itemDinamico");
	for (let i = elementos.length - 1; i >= 0; i--) {
		elementos[i].parentNode.removeChild(elementos[i]);
	}
}

function setLoad(status) {
	let loader = document.getElementById("loader");
	let divLoad = document.getElementById("caixaLoad");
	if (status) { //Se não for para aparecer o loading
		loader.style.cssText = "display: none;";
		divLoad.style.cssText = "display: none";
	} else {
		loader.style.cssText = "display: block;";
		divLoad.style.cssText = "display: block";
	}
}


function geraElementos(lista) { // Carrega elementos da pasta (itens dentro da pasta)
	/*
	O funcionamento se dá na seguinte forma:
	1. Muda o layout do div que vai conter os itens para grid;
	2. Cria uma div para conter os elementos (classe "divItens" e ID do item que vai 'guardar');
	3. Gera a imagem do tipo de item, e o nome do item;
	4. Adiciona o evento que se a DIV ou algum conteúdo dentro dela for clicada, carrega o ID.
	*/
	let divViewer = document.getElementById("itens");
	if (lista.length >= 1) {
		divViewer.className = '';
		divViewer.classList.add("itensGrid");
		lista.forEach(item => {
			
			let caixaItem = document.createElement("div");
			caixaItem.classList.add("divItens", "itemDinamico");
			caixaItem.id = item.ID;
			caixaItem.tabIndex = 0;
			divViewer.append(caixaItem);

			let imgItem = document.createElement("img");
			imgItem.classList.add("iconeItens", "itemDinamico");
			imgItem.id = "Icone" + item.ID;

			switch (item.Tipo) {
				case "application/vnd.google-apps.folder":
					imgItem.src = "assets/img/iconPasta.png";
					break;
				case "application/pdf":
					imgItem.src = "assets/img/iconPDF.png";
					break;
				case "application/vnd.google-apps.form":
					imgItem.src = "assets/img/iconForms.png";
					break;
				default:
					imgItem.src = "assets/img/iconGeral.png"
					break;
			}
			
			document.getElementById(item.ID).append(imgItem);

			let caixaNome = document.createElement("div");
			caixaNome.classList.add("divNome", "itemDinamico");
			caixaNome.id = "Texto" + item.ID;
			caixaNome.textContent = item.Nome;
			document.getElementById(item.ID).append(caixaNome);

			caixaItem.addEventListener("click", function (evento) {
				if (evento.target === caixaItem || caixaItem.contains(evento.target)) {
				setLoad();
				listaPastas.push({
					"ID": caixaItem.id,
					"Nome": item.Nome,
					"Tipo": item.Tipo,
					"Link": item.Link
				});
				getDataAPI(elementoLista().ID);
				}
			});
		});
		setLoad(1);
	} else {
		let aviso = document.createElement("div");
		aviso.classList.add("divVazio", "itemDinamico");
		divViewer.append(aviso);

		let imgAviso = document.createElement("img");
		aviso.classList.add("itemDinamico");
		imgAviso.src = "assets/img/alerta.svg";
		imgAviso.id = "imgVazio";
		aviso.append(imgAviso);

		let txtAviso = document.createElement("div");
		txtAviso.classList.add("itemDinamico");
		txtAviso.style.fontFamily = "Lato, sans-serif";
		txtAviso.textContent = "Opa! Parece que aqui está vazio!";
		aviso.append(txtAviso);
		setLoad(1);
	}
}

function carregaIframe(ID) { //Abre o arquivo em iframe
	setLoad(1);
	let divViewer = document.getElementById("itens");
	divViewer.className = '';
	divViewer.classList.add("itensFlex");

	let iframe = document.createElement("iframe");
	iframe.classList.add("iframeView");
	iframe.classList.add("itemDinamico");
	iframe.id = "iframe";
	iframe.src = `https://drive.google.com/file/d/${ID}/preview`

	document.getElementById("itens").append(iframe);
}

/*
Procedimentos com o script
*/

if (leituraURL()[0] !== undefined && leituraURL()[0] !== rootID) { // Se tiver algo na URL
	getDataURL(leituraURL()[0]).then(infos => {
		listaPastas.push({
		"ID": leituraURL()[0],
		"Nome": infos.Nome,
		"Tipo": infos.Tipo
	});

	if (infos.Tipo === "application/vnd.google-apps.folder") {
		getDataAPI(leituraURL()[0]);
	} else {
		carregaIframe(leituraURL()[0]);
	}
	})
	
} else {
	getDataAPI(elementoLista().ID); //Chama a API
}



document.addEventListener("readAPI", function() {
	document.getElementById("botaoBaixar").style.display = "block";

	if (elementoLista().ID !== rootID) {
		atualizaURL(elementoLista().ID);
	}

	switch (elementoLista().Tipo) {
		case "application/vnd.google-apps.folder":
			clearItens();
			setName(elementoLista().Nome);
			document.getElementById("botaoBaixar").style.display = "none";
			geraElementos(dadosAPI);
			break;
		case "application/pdf":
			clearItens();
			setName(elementoLista().Nome);
			carregaIframe(elementoLista().ID);
			break;
		default:
			document.getElementById("botaoBaixar").style.display = "none";
			let url = elementoLista().Link;
			voltarAnterior(1);
			let link = window.open(url, "_blank");
			link.focus();
			setLoad(1);
			break;
	}
})

window.addEventListener('popstate', function() {
	voltarAnterior();
})
function leituraURL1(retorno) {
	let params = new URLSearchParams(window.location.search);

	let idURL = params.get('id') || idPadrao;
	if (retorno === true) {
		return idURL;
	} else {
		carregaID(idURL);
	}
}

function atualizaURL(id) {

	let elementos = document.querySelectorAll(".itemDinamico");
	for (let i = elementos.length - 1; i >= 0; i--) {
		elementos[i].parentNode.removeChild(elementos[i]);
	}

	let params = new URLSearchParams(window.location.search);
	params.set('id', id);
	window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
	leituraURL();
}

function leituraURL() {
	let chaves = [];

	let params = new URLSearchParams(window.location.search);

	if (params.get("id") === null) {
		return chaves;
	} else {
		chaves.push(params.get("id"));
		return chaves;
	}

}
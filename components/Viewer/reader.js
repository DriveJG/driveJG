var rootID = "1TPPPmbdMsTsSyfwVXAQjO4exgHiFsF58";

var listaPastas = [{
	"ID": rootID,
	"Nome": "Materiais de estudos - JG",
	"Tipo": "application/vnd.google-apps.folder"
}];

function elementoLista() {
	return listaPastas[listaPastas.length - 1];
}

function voltarAnterior(status) {
	if (listaPastas.length > 2) {
		setLoad();
		listaPastas.pop();
		if (status === undefined) {
			getDataAPI(elementoLista().ID);
		}
	} else {
		if (listaPastas.length === 2) {
			atualizaURL(undefined);
			listaPastas = [listaPastas[0]];
			setLoad();
			getDataAPI(elementoLista().ID);
		}
	}
}


function voltarRaiz() {
	if (listaPastas.length > 1) {
		atualizaURL(undefined);
		listaPastas = [listaPastas[0]];
		setLoad();
		getDataAPI(elementoLista().ID);
	}
}

function downloadFile() {
	let id = elementoLista().ID
	window.location.href = "https://drive.google.com/uc?export=download&id=" + id;
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

function atualizaURL(id) {
	let params = new URLSearchParams(window.location.search);
	if (id !== undefined) {
		params.set('id', id);
		window.history.pushState({}, '', window.location.pathname + '?' + params.toString());
	} else {
		params.delete('id');
		window.history.pushState({}, '', window.location.pathname);
	}
}
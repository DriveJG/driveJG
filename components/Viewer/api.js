const API_KEY = "AIzaSyCuDwPkoi51Djgw875w4-_dX03MJTu-waM";

let dadosAPI = {};

async function getDataAPI(itemID) {
	try {
		const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${itemID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,webViewLink,shortcutDetails)&orderBy=folder,name`);
		const data = await response.json();

		const pastas = [];
		const outrosItens = [];

		for (const file of data.files) {
			switch (file.mimeType) {
				case "application/vnd.google-apps.folder":
					pastas.push(file);
					break;
				
					case "application/vnd.google-apps.shortcut":

					let objAtalho = {
						"id": file.shortcutDetails.targetId,
						"name": file.name,
						"mimeType": file.shortcutDetails.targetMimeType
					};

					if (objAtalho.mimeType === "application/vnd.google-apps.folder") {
						pastas.push(objAtalho);
					} else {
						outrosItens.push(objAtalho);
					}
					break;

				default:
					outrosItens.push(file);
					break;
			}
		}

		pastas.sort((a, b) => compareFolderNames(a.name, b.name));

		outrosItens.sort((a, b) => a.name.localeCompare(b.name));

		const arquivos = pastas.concat(outrosItens).map(file => ({
			"ID": file.id,
			"Nome": file.name,
			"Tipo": file.mimeType,
			"Link": file.webViewLink
		}));

		dadosAPI = arquivos;

		let eventAPI = new Event("readAPI");
		document.dispatchEvent(eventAPI);

	} catch (error) {
		console.error("Erro ao obter os dados da API:", error);
	}
}

// Função de comparação personalizada para ordenar os nomes das pastas
function compareFolderNames(nameA, nameB) {
	const regex = /(\d+)/; // Expressão regular para encontrar o primeiro número
	const matchA = nameA.match(regex); // Encontra o primeiro número no nome da pasta A
	const matchB = nameB.match(regex); // Encontra o primeiro número no nome da pasta B

	// Se uma pasta tiver um número e a outra não, o número vem primeiro
	if (matchA && !matchB) {
		return -1;
	}
	if (!matchA && matchB) {
		return 1;
	}

	// Se ambas as pastas tiverem um número, compara esses números
	if (matchA && matchB) {
		const numA = parseInt(matchA[0]);
		const numB = parseInt(matchB[0]);
		if (numA !== numB) {
			return numA - numB;
		}
	}

	// Caso contrário, compara os nomes das pastas como strings
	return nameA.localeCompare(nameB);
}


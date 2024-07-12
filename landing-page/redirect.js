var objID = {
    "cont": "1DB2iyDYvLV0mOislICIMnfG95zfOTdlb",
    "livros": "1kEa4ZhU5Q0d7_DNYHSsOVmHsHhXtJDxh",
    "enem": "1jgtX8Oe_fuf3OykG1_466bVxN73bidfg",
    "uece": "1YQwZVaQm3VK-tGm5qyG0rzlMv17tUMTj",
    "olimpiada": "1wCQzZBYNZWGBhJ1Djeaue0h0eoBtIzFR",
    "folhas": "1di3lE6lizgMHZwP8X9jjmuZieosNPljO",
    "simulados": "1JVWc9m64C_fNxQVOXNz8c_YVwTbMWL_Q",
    "livrosExt": "1KHbM2FG092L0-Cr2WbHkERZqbEL0DfoR",
    "provas": "1j0Koy-Z5xDLkc3YI89XSWoXI0HHjycUM"
}

function redirecionar(id) {
    if (objID[id] !== undefined) { //Se tiver na lista
        window.location.href = "https://drivejg.github.io/driveJG/?id=" + objID[id];
    } else {
        window.location.href = "https://drivejg.github.io/driveJG/"
    }
}
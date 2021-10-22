async function GetPhase()
{
    var id = parseInt(document.getElementById("dk").value);
    var requestURL = "https://api.via-dolorosa.ru/rc/26971/status";
    let response = await fetch(requestURL);
    if (response.ok) {
        let json = await response.text();
        var dk = JSON.parse(json);
        console.log(dk["current_phase_id"]);
    }
    else {
        console.log("Ошибка HTTP " + response.status);
    }
}
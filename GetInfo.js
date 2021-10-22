async function GetPhase()
{
    var phase;
    var status;
    var id = parseInt(document.getElementById("dk").value);
    var requestURL = "https://api.via-dolorosa.ru/rc/" + id.toString() + "/status";
    let response = await fetch(requestURL);
    if (response.ok) {
        let json = await response.text();
        var dk = JSON.parse(json);
        phase = dk["current_phase_id"];
        status = dk["status"];
    }
    else {
        console.log("Ошибка HTTP " + response.status);
    }
    document.getElementById("status").value = status;
    document.getElementById("phase").value = phase;
}
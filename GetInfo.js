// Получает инфу по программе
async function GetInfo(id) {
    var requestURL = `https://api.via-dolorosa.ru/rc/${id.toString()}/full_info`;
    try {
    let response = await fetch(requestURL);
    if (response.ok) {
        let json = await response.text();
        var rc = JSON.parse(json);
        document.getElementById("start" + id).value = rc["program_created_at"];
        document.getElementById("end" + id).value = rc["changed_time_at"];
        var cycleTime = parseInt(rc["t_cycle"]);
        document.getElementById("cycleTime" + id).value = cycleTime.toString();
        document.getElementById("phases" + id).value = "1";
    }
    else {
        console.log("Ошибка HTTP " + response.status);
    }
    } catch {
    document.getElementById("start" + id).value = "Нет доступа к контроллеру";
    document.getElementById("end" + id).value = "Нет доступа к контроллеру";
    document.getElementById("cycleTime" + id).value = "Нет доступа к контроллеру";
    document.getElementById("phases" + id).value = "Нет доступа к контроллеру";
    }
    GetPhase(id);
}

// Выводит значения фазы и статуса ДК
async function GetPhase(id)
{
    var phase;
    var status;
    var requestURL = "https://api.via-dolorosa.ru/rc/" + id.toString() + "/status";
    try {
        let response = await fetch(requestURL);
        if (response.ok) {
            let commits = await response.json();
            phase = commits['current_phase_id'].toString();
            status = commits['status'].toString();
            if (parseInt(document.getElementById("phases" + id).value) < parseInt(phase))
                document.getElementById("phases" + id).value = phase;
            document.getElementById("status" + id).value = "статус - " + status;
            document.getElementById("phase" + id).value = "фаза - " + phase;
        }
        else {
            console.log("Ошибка HTTP " + response.status);
        }
        
    } catch{
        document.getElementById("status" + id).value = "Нет доступа к контроллеру";
        document.getElementById("phase" + id).value = "Нет доступа к контроллеру";
    }
}
async function SetProgramm(id) {
    document.getElementById("button" + id).value = "Не удалось открыть файл";
}
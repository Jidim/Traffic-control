// Получает инфу по программе
async function GetInfo(id) {
    var requestURL = `https://api.via-dolorosa.ru/rc/${id.toString()}/full_info`;
    try {
    let response = await fetch(requestURL);
    if (response.ok) {
        let json = await response.json();
       var problem = document.getElementById("problems" + id);
        if (json["mode"] != json["real_mode"])
            problem.value = "Несоответствие модов";
        if (json["program_id"] != json["real_program_id"])
            problem.value = "Несоответствие программ";
        document.getElementById("start" + id).value = json["program_created_at"];
        document.getElementById("end" + id).value = json["changed_time_at"];
        var cycleTime = parseInt(json["t_cycle"]);
        document.getElementById("cycleTime" + id).value = cycleTime.toString();
        if (document.getElementById("time" + id.toString()).value == "")
            PhaseTime(id);
    }
    else {
        console.log("Ошибка HTTP " + response.status);
    }
    } catch {
        document.getElementById("problems" + id).value = "Невозможно подключиться к full_info"
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
            var problem = document.getElementById("problems" + id);
            phase = commits['current_phase_id'].toString();
            status = commits['status'].toString();
            if (status != "OK")
                problem.value = "Неправильный статус";
            if (parseInt(document.getElementById("phases" + id).value) < parseInt(phase))
                document.getElementById("phases" + id).value = phase;
            document.getElementById("status" + id).value = "статус - " + status;
            document.getElementById("phase" + id).value = "фаза - " + phase;
        }
        else {
            console.log("Ошибка HTTP " + response.status);
        }
        
    } catch{
        document.getElementById("problems" + id).value = "Невозможно подключиться к status";
        document.getElementById("status" + id).value = "Нет доступа к контроллеру";
        document.getElementById("phase" + id).value = "Нет доступа к контроллеру";
    }
}
async function SetProgramm(id) {
    document.getElementById("button" + id).value = "Не удалось открыть файл";
}

async function PhaseTime(id) {
    var rc = document.getElementById("cycleTime" + id.toString());
    var times = [];
    for (var i = 0; i <parseInt(document.getElementById("phases" + id.toString())); i++)
        times.push();
    for (var i = 0; i < parseInt(rc.value); i++) {
        GetPhase(id);
        var phase = document.getElementById("phase" + id.toString());
        if (phase > times.length)
            for (var i = 0; i < phase - times.length; i++)
                times.push();
        times[phase-1]++;
        setTimeout(function () {}, parseInt(rc.value)*10+1);
    }
    console.log(times);
}
function SaveInfo() {

}
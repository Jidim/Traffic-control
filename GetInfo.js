// Получает инфу по программе
async function GetInfo() {
    var id = parseInt(document.getElementById("dk").value);
    var requestURL = "https://api.via-dolorosa.ru/rc/" + id.toString() + "/full_info";
    let response = await fetch(requestURL);
    if (response.ok) {
        let json = await response.text();
        var rc = JSON.parse(json);
        document.getElementById("start").value = rc["program_created_at"];
        document.getElementById("end").value = rc["changed_time_at"];
        var cycleTime = parseInt(rc["t_cycle"]);
        document.getElementById("cycleTime").value = cycleTime.toString();
    }
    else {
        console.log("Ошибка HTTP " + response.status);
    }
    document.getElementById("phases").value = "1";
    var arr = [];
    var sum = 0;
    var time = cycleTime;
    while (time < 100)
    time += time;

    // while (sum < cycleTime) {
    //     GetPhase();
    //     var phase = parseInt(document.getElementById("phase").value);
    //     if (phase > arr.length)
    //         for (var i = 0; i < phase - arr.length; i++)
    //             arr.push(0);
    //     arr[phase - 1]++;
    //     sum = 0;
    //     for (var i = 0; i < arr.length; i++)
    //         sum += arr[i];
    //     setTimeout(time+1);
    // }
    //if (arr != null) {
    //document.getElementById(phasesTime).value = arr.toString();
    //}
    //console.log(arr);
    setInterval(GetPhase, 100);
}

// Выводит значения фазы и статуса ДК
async function GetPhase()
{
    var phase;
    var status;
    var id = parseInt(document.getElementById("dk").value);
    var requestURL = "https://api.via-dolorosa.ru/rc/" + id.toString() + "/status";
    let response = await fetch(requestURL);
    if (response.ok) {
        let commits = await response.json();
        phase = commits['current_phase_id'].toString();
        status = commits['status'].toString();
    }
    else {
        console.log("Ошибка HTTP " + response.status);
    }
    if (parseInt(document.getElementById("phases").value) < parseInt(phase))
        document.getElementById("phases").value = phase;
    document.getElementById("status").value = "статус - " + status;
    document.getElementById("phase").value = "фаза - " + phase;
    
}
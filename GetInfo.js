// Получает инфу по программе
async function GetInfo(id) {
    var requestURL = `https://api.via-dolorosa.ru/rc/${id.toString()}/full_info`;
    try {
    let response = await fetch(requestURL);
    if (response.ok) {
        let json = await response.json();
       var problem = document.getElementById("problems" + id);
       // Обработка возможных ошибок работы ДК
        if (json["mode"] != json["real_mode"])
            problem.value = "Несоответствие модов";
        if (json["program_id"] != json["real_program_id"])
            problem.value = "Несоответствие программ";

        document.getElementById("start" + id).value = json["program_created_at"];
        document.getElementById("end" + id).value = json["changed_time_at"];
        var cycleTime = parseInt(json["t_cycle"]);
        document.getElementById("cycleTime" + id).value = cycleTime.toString();
        // var time = document.getElementById("time" + id.toString()).value;
        // if (time == ''){
        //     document.getElementById("time" + id.toString()).value = "1";
        // }
        // else {
        //     // var line;
        //     // var times = (time.toString()).split(" ");
        //     // var cur = [];
        //     // for (var i = 0; i < times.lenght; i++)
        //     //     cur.push(parseInt(times[i]));
        //     // for (var i = 0; i < cur.length; i++)
        //     //      line += cur[i].toString() + " ";
        //     //      document.getElementById("time" + id.toString()).value = line;
        //     console.log("Yes");
        // }
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
            // Обработка статуса ДК
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
// Установка программы для ДК, пока жесткошовная
async function SetProgramm(id) {
    var path = document.getElementById("path" + id.toString().value);
    let file = path.files[0];
    var buffer;
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        buffer += reader;
    }
    var json = JSON.parse(buffer);
    var data = JSON.stringify(json);
    let xhr = new XMLHttpRequest();
    var url = "https://api.via-dolorosa.ru/rc/"+id.toString()+"/custom_phase_program";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}
// Сохранение информации о порграмме на ДК
function save_content_to_file(id)
{
    let encoder = new TextEncoder();
    var line = document.getElementById("time" + id.toString).value;
    let content = encoder.encode(line);
    with(document){
     ir=createElement('iframe');
     ir.id='ifr';
     ir.location='about.blank';
     ir.style.display='none';
     body.appendChild(ir);
      with(getElementById('ifr').contentWindow.document){
           open("text/plain", "replace");
           charset = "utf-8";
           write(content);
           close();
           document.charset = "utf-8";
           execCommand('SaveAs', false, id+'.txt');
       }
       body.removeChild(ir);
     }
}
var getJSON = function (url, id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response, id);
        } else {
            callback(status, xhr.response, id);
        }
    };
    xhr.send();
};

var i = 1;                  //  set your counter to 1

function myLoop() {         //  create a loop function
    // setTimeout(function () {   //  call a 3s setTimeout when the loop is called
    //     featchData(i)   //  your code here
    //     i++;                    //  increment the counter
    //     if (i <= 1) {           //  if the counter < 10, call the loop function
    featchData();             //  ..  again which will trigger another 
    //     }                       //  ..  setTimeout()
    // }, 4000)
}

function featchData() {
    getJSON("Surah_2_Al Baqara.json", i,
        function (err, data, id) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {

                const json = Object.values(data);
                //console.log(json);
                var surah = 2;

                for (var i = 0, ln = json.length; i < ln; i++) {
                    setTimeout(function (y) {
                        var index = y;
                        var ayat = json[y];

                      
                        var newJson = [];

                        var ar = ayat.w.split("|");
                        var en = ayat.e.split("//");
                        var bn = ayat.m.split("//");

                        var mainArabic = "";

                        ar.forEach((v, i) => {
                            var obj = {
                                "bengali": bn[i],
                                "english": en[i],
                                "en_t": v.split("./")[1],
                                "arabic": v.split("./")[0].split("/")[1],
                                "ar_mp3": "https://words.audios.quranwbw.com/" + surah + "/" + padZero(surah) + "_" + padZero(index + 1) + "_" + padZero(i + 1) + ".mp3"
                            }
                            mainArabic = mainArabic + (i > 0 ? " " : "") + obj.arabic;
                            newJson.push(obj);
                        });

                        console.log("new", newJson);

                        var mainAyat = {
                            "ayat_mp3": "https://everyayah.com/data/Alafasy_128kbps/" + padZero(surah) + padZero(index + 1) + ".mp3",
                            "arabic": mainArabic,
                            "bengali": ayat.fm,
                            "english": ayat.fme,
                            "wbw": newJson
                        }

                        saveData(mainAyat, 'Surah_' + padZero(surah) + padZero(index + 1) + '.json');

                    }, i * 500, i); // we're passing x
                }


                // json.forEach((ayat, index) => {
                //     setInterval(function () {
                //         //if (index == 0) {


                //     }, 2000);
                //     // solo.forEach(so => {
                //     //     var asolo = so.split("./");
                //     //     asolo.forEach(aso => {
                //     //         var main = aso.split("/")[0];
                //     //     });
                //     // });
                //     //}
                // });

                //console.log(data1);
                // arabic.forEach((aya, index) => {
                //     aya.m = bengali[index];
                //     aya.fm = total_Men.chapter[index].text;
                //     aya.e = english[index];
                //     //aya.a = arabic[index];
                //     aya.fme = total_Meaning_en.chapter[index].text;
                // });

                //console.log(id);
                //saveData(arabic, 'Surah_' + id + "_" + surah_names_transliteration[id] + '.json');

            }
        });
}

function padZero(number) {
    return number.toString().padStart(3, '0');
}

function saveData(data, fileName) {
    //setTimeout(() => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var json = JSON.stringify(data),
        blob = new Blob([json], { type: "octet/stream" }),
        url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    //}, 2000);
}
const conferenceTrackManagement = function conferenceTrackManagement() {

    var fs = require("fs");
    var text = fs.readFileSync("./text.txt").toString('utf-8');
    var textByLine = text.split("\n");

    const numberRegex = /[0-9]/g,
        morningTimeLimit = 180,
        eveningTimeLimit = 240;



    var inputTextArray = textByLine,
        inputObj1, inputObj2,
        talksArray = [];
    // replace min with blank space
    // for (var i = 0; i < textByLine.length; i++) {
    //     textByLine[i] = textByLine[i].replace("min", " ");
    // }

    for (var i = 0; i < inputTextArray.length; i++) {
        inputObj1 = inputTextArray[i].split(numberRegex);

        inputObj2 = inputTextArray[i].split(" ");
        for (var j = 0; j < inputObj2.length; j++) {
            if (numberRegex.test(inputObj2[j])) {

                talksArray.push({
                    name: inputTextArray[i],
                    time: parseInt(inputObj2[j])
                });
            }
        }
    }
    // console.log("talksArray =", talksArray);

    // sorting
    talksArray.sort(function (a, b) {
        return b.time - a.time;
    });

    selectTalks(talksArray, morningTimeLimit, eveningTimeLimit);
}

function selectTalks(talksArray, morningTimeLimit, eveningTimeLimit) {

    var morningTime = morningTimeLimit,
        eveningTime = eveningTimeLimit,
        talksArray1 = talksArray,
        j = talksArray.length,
        k = 0;
    // morningtimer = {
    //     hour: 9,
    //     min: 00
    // },
    // eveningtimer = {
    //     hour: 1,
    //     min: 00
    // };

    while (j > 0) {
        var morningTime = morningTimeLimit,
            eveningTime = eveningTimeLimit,
            talksArr = talksArray1,
            counter = 0,
            morningtimer = {
                hour: 9,
                min: 00
            },
            eveningtimer = {
                hour: 1,
                min: 00
            };;
        k++;
        console.log(" ");
        console.log("Track ", k);

        console.log(" ");
        console.log("morning talks");
        for (var i = 0; i < talksArr.length; i++) {
            if (talksArr[i].time < morningTime) {
                morningTime = morningTime - talksArr[i].time;
                morningtimer.min + talksArr[i].time;
                
                switch (morningtimer.min) {
                    case (morningtimer.min > 60 || morningtimer.min < 119):
                        morningtimer.hour++;
                        morningtimer.min = morningtimer.min - 60;
                        break;

                    case (morningtimer.min > 120 || morningtimer.min < 179):
                        morningtimer.hour++;
                        morningtimer.min = morningtimer.min - 120;
                        break;
                }

                console.log(talksArr[i].name);
                counter++;
                j--;
            }
        }

        talksArray1.splice(0, counter);
        counter = 0;

        console.log(" ");
        console.log("evening talks");
        console.log(" ");
        for (var i = 0; i < talksArr.length; i++) {
            if (talksArr[i].time < eveningTime) {
                eveningTime = eveningTime - talksArr[i].time;
                console.log(talksArr[i].name);
                counter++;
                j--;
            }
        }
        talksArray1.splice(0, counter);
    }
}


conferenceTrackManagement();
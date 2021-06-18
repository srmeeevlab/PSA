const questionArray = [
    [{
        question:"What is tolerance for the operating system frequency of power system network?",
        answer:{
            a:"­± 0.5 Hz",
            b:"± 0.5 %"
        },
        correctAnswer:"a",
        reason:{
            a:"Practically, regulation of operating power system nominal frequency at 50 Hz or 60 Hz is not possible since the real power demand is varying instantly due to customer needs. Since the change in real power is directly proportional to frequency.",
            b:"Practically, regulation of operating power system nominal frequency at 50 Hz or 60 Hz is not possible since the real power demand is varying instantly due to customer needs. Since the change in real power is directly proportional to frequency."
        }
    },
    {
        question:"Why should we regulate constant frequency?",
        answer:{
            a:"To minimize the system reactive losses",
            b:"Need for synchronous operation of various units in the power system network"
        },
        correctAnswer:"b",
        reason:{
            a:"Constant frequency is to be maintained for the following functions:<br>All the electrical equipments are designed for rated frequency.<br>All the AC motors should be given constant frequency supply so as to maintain the speed constant.<br>n continuous process industry, it affects the operation of the process itself.",
            b:"Constant frequency is to be maintained for the following functions:<br>All the electrical equipments are designed for rated frequency.<br>All the AC motors should be given constant frequency supply so as to maintain the speed constant.<br>n continuous process industry, it affects the operation of the process itself."
        },
        end:true
    }],
    [{
        question:"The speed regulation parameter R of a control area is 0.025 Hz/MW and load frequency constant D is 2 MW/Hz. The a frequency response characteristic (AFRC) is",
        answer:{
            a:"2.025 MW/Hz",
            b:"42 MW/Hz"
        },
        correctAnswer:"b",
        reason:{
            a:"ΔP<sub>D</sub> = -(D+1/R) = 2+1/0.025 = 42 MW/Hz",
            b:"ΔP<sub>D</sub> = -(D+1/R) = 2+1/0.025 = 42 MW/Hz"
        }
    },
    {
        question:"For a synchronous generator connected to an infinite bus through a transmission line, how are the change of voltage (ΔV) and the change of frequency (Δf) related to the active power (P) and the reactive power (Q),  did they interactive ?",
        answer:{
            a:"ΔV is proportional to P and Δf to Q, YES",
            b:"ΔV is proportional to Q and Δf to P, NO"
        },
        correctAnswer:"b",
        reason:{
            a:"The active power P is mainly dependent on the internal angle δ and is independent of bus voltage magnitude |V|. The bus voltage is dependent on machine excitation and hence on reactive power Q and is independent of the machine angle δ. The change in the machine angle δ is caused by a momentary change in the generator speed and hence the frequency. Therefore, the load frequency and excitation voltage controls are non-interactive for small changes and can be modeled and analyzed independently.",
            b:"The active power P is mainly dependent on the internal angle δ and is independent of bus voltage magnitude |V|. The bus voltage is dependent on machine excitation and hence on reactive power Q and is independent of the machine angle δ. The change in the machine angle δ is caused by a momentary change in the generator speed and hence the frequency. Therefore, the load frequency and excitation voltage controls are non-interactive for small changes and can be modeled and analyzed independently."
        },
        end:true
    }]
];
let tries = 0;
let shown = false;
const helpModalEl = document.getElementById('helpModal');
const helpModal = new bootstrap.Modal(helpModalEl);
const questionModalEl = document.getElementById('questionModal');
const questionModal = new bootstrap.Modal(questionModalEl);
let train = true;
const ctx = document.getElementById("dynamicResponse").getContext("2d");
const data = {
    labels:[],
    datasets:[{
        label:"",
        data:[],
        fill:false,
        borderColor:"rgba(162, 10, 10, 1)"
    }]
};
const config = {
    type:"line",
    data: data,
    options: {
        animations:true,
        plugins:{
            title:{
                display:true,
                text:getLabel.titleLabel(),
                font:{
                    weight:"bolder",
                    size:"30%%"
                }
            },
            legend:{
                display:false
            }
        },
        elements:{
            point:{
                radius:0
            }
        },
        scales: {
            x:{
                display:true,
                title: {
                    display:true,
                    text:"Time (s)",
                    font:{
                        weight:"bolder",
                        size : "25%"
                    }
                },
                ticks:{
                    beginAtZero: true,
                    callback: function(value){
                        return(graph.data.labels[value].toFixed(3));
                    }
                }
            },
            y:{
                display:true,
                title: {
                    display:true,
                    text:getLabel.yAxis(),
                    font:{
                        weight:"bolder",
                        size : "20%"
                    }
                },
                ticks:{
                    font:{
                        style:"bolder"
                    }
                }
            }
        }
    }
}
const graph = new Chart(ctx,config);
function questionUser(questionData,arrayIndex,questionIndex){
    document.getElementById("nextQuestion").hidden = false;
    document.getElementById("nextQuestion").disabled = true;
    if(questionData.end){
        document.getElementById("nextQuestion").hidden = true;
    }
    document.getElementById("question").innerHTML = questionData.question;
    document.getElementById("question").setAttribute("data-ans",questionData.correctAnswer);
    document.getElementById("question").setAttribute("data-ai",arrayIndex);
    document.getElementById("question").setAttribute("data-qi",questionIndex);
    document.getElementById("answer_a_label").innerHTML = questionData.answer.a;
    document.getElementById("answer_b_label").innerHTML = questionData.answer.b;
}
function verifyInteractive(){
    const q = document.getElementById("question");
    const options = document.getElementsByName("answer");
    const ans = q.getAttribute("data-ans");
    const arrayIndex = parseInt(q.getAttribute("data-ai"));
    const questionIndex = parseInt(q.getAttribute("data-qi"));
    const currentQuestion = questionArray[arrayIndex][questionIndex];
    let i;
    for(i=0;i<options.length;i++)
        if(options[i].checked){
            let str = "";
            if(options[i].value===ans){
                document.getElementById("nextQuestion").disabled = false;
                str = "You were right!<br>";
            }
            else{
                document.getElementById("nextQuestion").disabled = true;
                str = "This should not be selected<br>";
            }
            if(currentQuestion.reason[options[i].value] !== "")
                str = str+`Explanation: ${currentQuestion.reason[options[i].value]}`;
            document.getElementById("comments").innerHTML = str;
        }
}
function next(start=false,arrayIndex = -1){
    let questionIndex = 0,i;
    const q = document.getElementById("question");
    document.getElementById("comments").textContent = "";
    const options = document.getElementsByName("answer");
    for(i=0;i<options.length;i++)options[i].checked = false;
    if(!start){
        arrayIndex = parseInt(q.getAttribute("data-ai"));
        questionIndex = parseInt(q.getAttribute("data-qi"))+1;
    }
    const question = questionArray[arrayIndex][questionIndex];
    questionUser(question,arrayIndex,questionIndex);
    questionModal.show();
}
function userAnswerCheck(){
    const frequency = parseFloat(document.getElementById("frequency").value);
    const frequencyError = parseFloat(document.getElementById("frequencyError").value);
    const ansFrequency = getValue();
    const ansFrequencyError = ansFrequency-getFNom();
    const ret = {
        status:true,
        code:0,
        frequency:ansFrequency,
        frequencyError:ansFrequencyError
    }
    if(!AnswerInRange(frequency,ansFrequency)){
        ret.status = false;
        ret.code = 1;
    }
    if(!AnswerInRange(frequencyError,ansFrequencyError)){
        ret.status = false;
        ret.code = 2;
    }
    return ret;
}
function AnswerInRange(calculated,actual){
    const lower =  actual - 0.01;
    const upper =  actual + 0.01;
    if(calculated>=lower&& calculated <= upper){
        return true;
    }
    return false;
}
function updateValues(){
    if(checkRangeCaller()){
        try{
            assign();
            calculate();
            const UAC = userAnswerCheck();
            if(UAC.status){
                if(!shown){
                    alert("Verified! The answers were within the permisible error range of 1%");
                }
                tries = 0;
                shown = false;
                next(true,1);
                if(Number(document.getElementById("startTime").value) > Number(document.getElementById("endTime").value)){
                    document.getElementById("endTime").value = document.getElementById("startTime").value;
                    alert("Start time cannot be less than end time, setting endtime = start time");
                }
                simulator.timeStep = document.getElementById("timeStep").value;
                simulator.startTime = document.getElementById("startTime").value;
                simulator.endTime = document.getElementById("endTime").value;
                updateSvg();
                plotGraph(getValue());
            }else if(UAC.code === 1){
                tries+=1;
                alert("The calculated steady state frequency is incorrect or not in the permisible error range of 1%.");
            }else if(UAC.code === 2){
                tries+=1;
                alert("The calculated steady state frequency error is incorrect or not in the permisible error range of 1%.");
            }
            if(!UAC.status && tries>=3){
                let decision;
                decision = confirm(`You have got it wrong ${tries} times, Would you like to look at the answers?`);
                if(decision){
                    document.getElementById("frequency").value = parseFloat(UAC.frequency.toFixed(3));
                    document.getElementById("frequencyError").value = parseFloat(UAC.frequencyError.toFixed(3));    
                    shown = true;
                    updateValues();
                }
            }
        }catch(err){
            alert("Something went wrong! Error has been logged in console.");
            console.log(err);
        }
    }else console.log("Validation Error Encountered");
}
function plotGraph(ssValue){
    let t;
    ssValue = ssValue.toFixed(4)
    let ssError = (ssValue-getFNom()).toFixed(4) + getUnit();
    ssValue = ssValue + getUnit();
    const x=[],y=[];
    if(simulator.auto==false){
        for(t=Number(simulator.startTime);t<=Number(simulator.endTime);t+=Number(simulator.timeStep)){
            x.push(dynamicResponse(t));
            y.push(t);
        }    
    }else{
        const tLimit = 0 + 100000*0.001;
        t=0;
        x.push(dynamicResponse(t));
        y.push(t);
        t+=0.001;
        x.push(dynamicResponse(t));
        y.push(t);
        for(t=0.002;x[x.length-1] !== x[x.length-2] && t<=tLimit;t+=0.001){
            x.push(dynamicResponse(t));
            y.push(t);
        }
        if(t>=tLimit){
            alert("No steady state detected till "+tLimit+" s. Please wait for the graph to load.");
            ssValue = "NA";
            ssError = "NA";
        }
    }
    document.getElementById("ssValueLabel").textContent = getLabel.valueLabel();
    document.getElementById("ssErrorLabel").textContent = getLabel.errorLabel();
    document.getElementById("ssValue").textContent = ssValue;
    document.getElementById("ssError").textContent = ssError;
    graph.data.labels = y;
    graph.data.datasets[0].data = x;
    graph.update();
}
function toggleAuto(){
    simulator.auto = !simulator.auto;
    disableInputs(!simulator.auto);
}
function disableInputs(bool){
    const inputs = document.getElementsByClassName("control");
    let i;
    for(i=0;i<inputs.length;i+=1)inputs[i].disabled = simulator.auto
}
function checkRangeCaller(){
    const els = document.querySelectorAll("input");
    let status,i;
    let exception = {auto:null,answer_a:null,answer_b:null};
    for(i=0;i<els.length;i+=1){
        if(!(els[i].id in exception)){
            status = checkRange(els[i]);
            if(!status)break;
        }
    }
    return status;
}
function checkRange(el){
    const value = parseFloat(el.value,10);
    const label =  el.parentNode.querySelector("label");
    if(!value && value!==0){
        alert(label.textContent+", Cannot be empty/Word.");
        return false;
    };
    if(el.min){
        if(Number(el.min)>value){
            alert(label.textContent+", Value should be greater than or equal to"+el.min+".");
            return false;
        }
    }
    if(el.max){
        if(Number(el.max)<value){
            alert(label.textContent+", Value should be lesser than or equal to"+el.max+".");
            return false;
        }
    }
    if(el.step && el.step!=="any"){
        if(value%Number(el.step) !== 0){
            alert(label.textContent+", Value should be a integer multiple of "+el.step+".");
            return false;
        }
    }
    return true;
}
function startup(){
    document.getElementById("year").innerHTML = new Date().getFullYear();
    if(screen.width <= 650)alert("Turn into landscape/use a wider display for better experience.");
    simulator.auto = document.getElementById("auto").checked;
    disableInputs(!simulator.auto);
    if(train)
        helpModal.show();
    else{
        helpModalEl.parentNode.removeChild(helpModalEl);
        const helpTrigger = document.getElementById("info");
        helpTrigger.parentNode.removeChild(helpTrigger);
    }
    next(true,0);
}
startup();
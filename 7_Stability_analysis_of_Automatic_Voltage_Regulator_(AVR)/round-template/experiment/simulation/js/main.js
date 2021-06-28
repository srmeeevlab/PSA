const questionArray = [
    [{
        question:"Open loop gain of the AVR is",
        answer:{
            a:"1/K",
            b:"K<sub>A</sub>K<sub>e</sub>K<sub>F</sub>"
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
        }
    },
    {
        question:"The location of the poles in the AVR system depends on",
        answer:{
            a:"Time constants of amplifier, exciter and generator",
            b:"Open loop gain of AVR and time constants of amplifier, exciter and generator"
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
        },
        end:true
    }],
    [{
        question:"The Time response of the AVR system mainly depends on",
        answer:{
            a:"eigenvalues",
            b:"Gain"
        },
        correctAnswer:"a",
        reason:{
            a:"",
            b:""
        }
    },
    {
        question:"Permissible power system bus voltage variation is ",
        answer:{
            a:"±2%",
            b:"± 5%"
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
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
let amplifier = {}, exiter={}, generator={},simulation={
    stability:"null"
};
const sqrt = Math.sqrt;
const pow = Math.pow;
const int = parseInt;
const float = parseFloat;
const Complex = math.complex;
function round(c){
    c.re = parseFloat(c.re.toFixed(4));
    c.im = parseFloat(c.im.toFixed(4));
    if(c.re === 0){
        c.re = 0;
    }else if(c.im === 0){
        c.im = 0;
    }
    return(c);
}
const ctx = document.getElementById("dynamicResponse").getContext("2d");
const data = {
    datasets:[{
        label:"",
        data:[],
        fill:false
    }]
};
const config = {
    type:"scatter",
    data: data,
    options: {
        animations:true,
        plugins:{
            title:{
                display:true,
                text:["Eigenvalues plot of"," the AVR"],
                font:{
                    weight:"bolder",
                    size:"30%"
                }
            },
            legend:{
                display:false
            }
        },
        elements:{
            point:{
                pointStyle : "crossRot",
                borderColor:"rgba(162, 10, 10, 1)",
                borderWidth:3,
                radius: 10
            }
        },
        scales: {
            x:{
                title:{
                    display:true,
                    text:["Real axis"],
                    font:{
                        weight:"bold",
                        size:"20%"
                    }
                }
            },
            y:{
                title:{
                    display:true,
                    text:["Imaginary","axis"],
                    font:{
                        weight:"bold",
                        size:"20%"
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
    const voltage = parseFloat(document.getElementById("voltage").value);
    const voltageError = parseFloat(document.getElementById("voltageError").value);
    const ansVoltage = calculate();
    const ansVoltageError = 1-ansVoltage;
    const ret = {
        status:true,
        code:0,
        voltage:ansVoltage,
        voltageError:ansVoltageError
    }
    if(!AnswerInRange(voltage,ansVoltage)){
        ret.status = false;
        ret.code = 1;
    }
    if(!AnswerInRange(voltageError,ansVoltageError)){
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
            clear();
            amplifier.gain = float(document.getElementById("amplifierGain").value);
            amplifier.timeConstant = float(document.getElementById("amplifierTime").value);
            generator.gain = float(document.getElementById("generatorGain").value);
            generator.timeConstant = float(document.getElementById("generatorTime").value);
            exiter.gain = float(document.getElementById("exiterGain").value);
            exiter.timeConstant = float(document.getElementById("exiterTime").value);
            simulation.magnitude = float(document.getElementById("magnitude").value)/100;
            const UAC = userAnswerCheck()
            if(UAC.status){
                if(!shown){
                    alert("Verified! The answers were within the permisible error range of 1%");
                }
                tries = 0;
                shown = false;
                next(true,1);
                updateSvg();
                const xVal = plotGraph(calculate())
                postQuestion();
            }else if(UAC.code === 1){
                tries+=1;
                alert("The calculated steady state voltage is incorrect or not in the permisible error range of 1%.");
            }else if(UAC.code === 2){
                alert("The calculated steady state voltage error is incorrect or not in the permisible error range of 1%.");
                tries+=1;
            }
            if(!UAC.status && tries>=3){
                let decision;
                decision = confirm(`You have got it wrong ${tries} times, Would you like to look at the answers?`);
                if(decision){
                    document.getElementById("voltage").value = parseFloat(UAC.voltage.toFixed(3));
                    document.getElementById("voltageError").value = parseFloat(UAC.voltageError.toFixed(3));    
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
function clear(){
    amplifier = {};
    exiter={};
    generator={};
    simulation={
        stability:"null"
    };
    graph.data.datasets[0].data = [];
    graph.update();
    document.getElementById("ssVoltage").innerHTML = "";
    document.getElementById("ssError").innerHTML = "";
}
function postQuestion(){
    document.getElementById("postQuestion").hidden = false;
}
function verify(){
    if(simulation.stability === "null")
        alert("Simulate the experiment first.");
    else{
        const t = document.getElementById("observTrue").checked;
        const f = document.getElementById("observFalse").checked;
        if(t===f)alert("You have to choose one option.");
        else{
            if(simulation.stability && t===true)alert("Correct Answer !");
            else if(!simulation.stability && f===true)alert("Correct Answer !");
            else if(simulation.stability && t===false)alert("Incorrect Answer, all the roots lie on the negative side of the real axis, so the system is stable.");
            else if(!simulation.stability && f===false)alert(`Incorrect Answer, The root ${simulation.unStablePoint} lie on the positive side of the real axis, so the system is unstable.`);
        }
    }
}
function calculate(){
    const k = amplifier.gain * exiter.gain * generator.gain;
    const steadyStateError = simulation.magnitude * k/(1+k);
    return(steadyStateError);
}
function updateSvg(){
    document.getElementById("ka").textContent = Number(amplifier.gain).toFixed(4);
    document.getElementById("ke").textContent = Number(exiter.gain).toFixed(4);
    document.getElementById("kf").textContent = Number(generator.gain).toFixed(4);
    document.getElementById("ta").textContent = `1+${Number(amplifier.timeConstant).toFixed(2)}s`;
    document.getElementById("te").textContent = `1+${Number(exiter.timeConstant).toFixed(2)}s`;
    document.getElementById("tdo").textContent = `1+${Number(generator.timeConstant).toFixed(2)}s`;
}
function plotGraph(ssVoltage){
    let t;
    ssVoltage = ssVoltage.toFixed(4)
    let ssError = (1-ssVoltage).toFixed(4)+" V" ;
    ssVoltage = ssVoltage+" V";
    const res = calculateEigen();
    const x = res[0] , y = res[1];
    graph.options.scales = {
        x:{
            title:{
                display:true,
                text:["Real axis"],
                font:{
                    weight:"bold",
                    size:"20%"
                }
            },
            min:res[2][0],
            max:res[3][0]
        },
        y:{
            title:{
                display:true,
                text:["Imaginary","axis"],
                font:{
                    weight:"bold",
                    size:"20%"
                },
            },
            min:res[2][1],
            max:res[3][1]
        }
    };
    document.getElementById("ssVoltage").textContent = "Steady State Voltage : "+ssVoltage;
    document.getElementById("ssError").textContent = "Steady State Voltage Error : "+ssError;
    for(i=0;i<x.length;i++){
        graph.data.datasets[0].data.push({
            x:x[i],
            y:y[i]
        });
    }
    graph.update();
    const stabilityInfo = checkStability(x); 
    simulation.stability = stabilityInfo[0];
    if(!stabilityInfo[0])
        simulation.unStablePoint = new Complex(x[stabilityInfo[1]],y[stabilityInfo[1]]).toString();
}
function checkStability(x){
    for(i=0;i<x.length;i++)
        if(x[i]>0)
            return [false,i];
    return [true];
}
function checkRangeCaller(){
    const els = document.querySelectorAll("input");
    let status,i;
    exception = {observTrue:"null",observFalse:"null",answer_a:"null",answer_b:"null"};
    for(i=0;i<els.length;i+=1){
        if(!(els[i].id in exception)){
            status = checkRange(els[i]);
            if(!status)break;
        }
    }
    return status;
}
function calculateEigen(){
    const Ta = amplifier.timeConstant; 
    const Te = exiter.timeConstant;
    const Tdop = generator.timeConstant;
    const Ka = amplifier.gain;
    const Ke = exiter.gain;
    const Kdop = generator.gain;

    const k1 = Ta * Te * Tdop;
    const k2 = Tdop * Ta + Te * Ta + Te * Tdop;
    const k3 = Ta + Tdop + Te;
    const k = Ka * Kdop * Ke;
    const k4 =1+k;
    const k5 = k* simulation.magnitude;


    const Q = round(new Complex ((3*k1*k3 - k2*k2)/(9*k1*k1)))
    const R = round(new Complex((9*k1*k2*k3 - 27*k1*k1*k4 - 2*k2*k2*k2)/(54*k1*k1*k1)));
    const S = round(round(R.add(((Q.pow(3)).add(R.pow(2))).sqrt())).pow(1/3));
    const T = round(round(R.sub(((Q.pow(3)).add(R.pow(2))).sqrt())).pow(1/3));


    const x0 = new Complex(0);
    const x1 = round((S.add(T)).sub(new Complex(k2).div(new Complex(3*k1))));
    const x2 = round((new Complex(-1).mul(S.add(T)).div(2)).sub(new Complex(k2/(3*k1))).add(new Complex(0,1*0.5).mul(new Complex(3).sqrt().mul(S.sub(T)))));
    const x3 = round((new Complex(-1).mul(S.add(T)).div(2)).sub(new Complex(k2/(3*k1))).add(new Complex(0,-1*0.5).mul(new Complex(3).sqrt().mul(S.sub(T)))));
    let dic = {};
    dic[x0.re] = x0.im;
    dic[x1.re] = x1.im;
    dic[x2.re] = x2.im;
    dic[x3.re] = x3.im;
    const minX = parseInt(Math.min(...Object.keys(dic)));
    const minY = parseInt(Math.min(...Object.values(dic)));
    const maxX = parseInt(Math.max(...Object.keys(dic)));
    const maxY = parseInt(Math.max(...Object.values(dic)));
    const min = [minX - (minX%10) -20 , minY - (minY%10) -20];
    const max = [maxX + 20 - (maxX%10), maxY +20 - (maxY%10) ];
    const xAxis = Object.keys(dic).map(parseFloat).sort((a,b)=>a-b);
    let yAxis = [];
    for(i=0;i<xAxis.length;i++){
        yAxis[i] = dic[xAxis[i]];
    }
    return([xAxis,yAxis,min,max]);
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
    if(screen.width <= 650)alert("Turn into landscape/use a wider display for better experience.");
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
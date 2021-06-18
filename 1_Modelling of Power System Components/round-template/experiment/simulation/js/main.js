const questionArray = [
    [{
        question:"Whether Synchronous Generator is self-starting or not?",
        answer:{
            a:"Yes",
            b:"No"
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
        },
        end:true
    }],
    [{
        question:"Can a motor be used as a Generator?",
        answer:{
            a:"Yes",
            b:"No"
        },
        correctAnswer:"a",
        reason:{
            a:"",
            b:""
        },
        end:true
    }],
    [{
        question:"Transmission line is",
        answer:{
            a:"Lumped",
            b:"Distributed"
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
        },
        end:true
    }],[{
        question:"Per unit reactance referred to either side of a Transformer is different.",
        answer:{
            a:"True",
            b:"False"
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
        },
        end:true
    }],[{
        question:"Voltages have same range in per unit in all parts of the system from EHV system to distribution and utilization. Is this an advantage of PER UNIT",
        answer:{
            a:"Yes",
            b:"No"
        },
        correctAnswer:"a",
        reason:{
            a:"",
            b:""
        },
        end:true
    }],[{
        question:"Ferranti effect can be reduced by which of the following component?",
        answer:{
            a:"Shunt Capacitor",
            b:"Shunt Reactor"
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
        },
        end:true
    }],[{
        question:"In order to improve power factor of a distribution system, the synchronous capacitors are installed at the",
        answer:{
            a:"receiving end",
            b:"sending end"
        },
        correctAnswer:"a",
        reason:{
            a:"",
            b:""
        },
        end:true
    }]
];
const helpModalEl = document.getElementById('helpModal');
const helpModal = new bootstrap.Modal(helpModalEl);
const questionModalEl = document.getElementById('questionModal');
const questionModal = new bootstrap.Modal(questionModalEl);
let train = true;
let current = document.getElementById("syncMach").parentNode;
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
function select(){
    const value = document.getElementById("selector").value;
    const img = document.getElementById("symbol");
    document.getElementById("result").innerHTML="";
    document.getElementById("transHide").hidden = false;
    switch (value) {
        case "G":
            {
                hideSection(false,true,true,true,true,true);
                img.setAttribute("src","./images/generator.png");
                img.setAttribute("alt","generator symbol");
                current = document.getElementById("syncMach");
                next(true,0);
            }
            break
        case "M":
            {
                hideSection(false,true,true,true,true,true);
                img.setAttribute("src","./images/motor.png");
                img.setAttribute("alt","motor symbol");
                current = document.getElementById("syncMach");
                next(true,1);
            }
            break;
        case "TM":
            {
                document.getElementById("transHide").hidden = true;
                hideSection(true,true,false,true,true,true);
                img.setAttribute("src","./images/transformer.png");
                img.setAttribute("alt","transformer symbol");
                current = document.getElementById("transformer");
                next(true,2);
            }
            break;
        case "TL":
            {
                hideSection(true,false,true,true,true,true);
                img.setAttribute("src","./images/rl.png");
                img.setAttribute("alt","transmission line symbol");
                current = document.getElementById("transmissionLine");
                next(true,3);
            }
            break
        case "L":
            {
                hideSection(true,true,true,false,true,true);
                img.setAttribute("src","./images/load.png");
                img.setAttribute("alt","load symbol");
                current = document.getElementById("load");
                next(true,4);
            }
            break;
        case "SI":
            {
                hideSection(true,true,true,true,false,true);
                img.setAttribute("src","./images/iShunt.png");
                img.setAttribute("alt","Shunt inductance symbol");
                current = document.getElementById("shunt-inductance");
                next(true,5);
            }
            break;
        case "SC":
            {
                hideSection(true,true,true,true,true,false);
                img.setAttribute("src","./images/cShunt.png");
                img.setAttribute("alt","Shunt capacitance symbol");
                current = document.getElementById("shunt-capacitance");
                next(true,6);
            }
            break;
        default:
            break;
    }
}

function getResult(){
    if(checkRangeCaller()){
        try{
            document.getElementById("result").innerHTML="";
            const value = document.getElementById("selector").value;
            let comp = undefined;
            const mvaB = new Complex({
                re:Number(document.getElementById("mvab").value)
            });
            const kvB = new Complex({
                re:Number(document.getElementById("kvb").value)
            });
            const res = ["<strong>Formula/e used:</strong><br>Z<sub>pu</sub> = Z<sub>actual</sub>&#247;Z<sub>base</sub> = ( Z<sub>actual</sub>&#215;MVA<sub>base</sub> )&#247; kV<sub>base</sub><sup>2</sup> p.u"];
            switch (value) {
                case "G":
                case "M":
                    {
                        const z = new Complex({
                            re:Number(document.getElementById("impSyncReal").value),
                            im:Number(document.getElementById("impSyncImg").value)
                        }); 
                        comp = new syncMach({
                            mvaB:mvaB,
                            kvB:kvB,
                            z:z
                        });
                        const calculatedAnswer = new Complex({
                            re:Number(document.getElementById("impSyncAnsReal").value),
                            im:Number(document.getElementById("impSyncAnsImg").value)
                        });
                        let message,reply;
                        if(AnswerInRange(calculatedAnswer,comp.pu)){
                            message = "Your Solution is correct, Do you want look at the step wise solution ?";
                        }else{
                            message = "The calculated per unit is incorrect, Only 1% error is permisible, Do you want look at the step wise solution ?";
                        }
                        reply = confirm(message);
                        if(reply){
                            const arr = [`<strong>Calculation:</strong><br>Z<sub>pu</sub> =  (${comp.z.stringifyRect()})&#215;(${comp.mvaB.stringifyRect()}) &#247;(${comp.kvB.stringifyRect()})<sup>2</sup> p.u`,
                                        `<em><strong>Z<sub>pu</sub> = ${comp.pu.stringifyRect()} p.u</strong></em>`];
                            appendResults([...res,...arr]);
                        }
                    }
                    break;
                case "TM":
                    {
                        const zp = new Complex({
                            re:Number(document.getElementById("impPrReal").value),
                            im:Number(document.getElementById("impPrImg").value)
                        });
                        const zs = new Complex({
                            re:Number(document.getElementById("impScReal").value),
                            im:Number(document.getElementById("impScImg").value)
                        }); 
                        const kvBS= new Complex({
                            re:Number(document.getElementById("kvbs").value)
                        });
                        const kvBP = new Complex({
                            re:Number(document.getElementById("kvbp").value)
                        });
                        comp = new transformer({
                            mvaB:mvaB,
                            kvB:kvBP,
                            zp:zp,
                            zs:zs,
                            kvBS:kvBS
                        });
                        const calculatedAnswerPrimary = new Complex({
                            re:Number(document.getElementById("impPrAnsReal").value),
                            im:Number(document.getElementById("impPrAnsImg").value)
                        });
                        const calculatedAnswerSecondary = new Complex({
                            re:Number(document.getElementById("impScAnsReal").value),
                            im:Number(document.getElementById("impScAnsImg").value)
                        });
                        let message,reply;
                        if(AnswerInRange(calculatedAnswerPrimary,comp.pu) && AnswerInRange(calculatedAnswerSecondary,comp.puS)){
                            message = "Your Solution is correct, Do you want look at the step wise solution ?";
                        }else{
                            message = "The calculated per unit is incorrect, Only 1% error is permisible, Do you want look at the step wise solution ?";
                        }
                        reply = confirm(message);
                        if(reply){
                            const arr = ['Turns Ratio, k = kV<sub>p,base</sub> &#247; kV<sub>s,base</sub>',
                                    'Z<sub>p,actual</sub> = Z<sub>p</sub>+(Z<sub>s</sub>&#215;k<sup>2</sup>) &ohm; (Referred Primary)',
                                    'Z<sub>s,actual</sub> = Z<sub>s</sub>+(Z<sub>p</sub>&#247;k<sup>2</sup>) &ohm; (Referred Secondary)',
                                    `<strong>General Calculation:</strong><br>Turns Ratio k = ${comp.kvB.mod()} &#247; ${comp.kvBS.mod()}`,
                                    `Turns Ratio k = ${comp.n}`,
                                    `<strong>Calculation (Primary Side):</strong><br>Z<sub>p,actual</sub> = (${comp.zp.stringifyRect()})+((${comp.zs.stringifyRect()})&#215;${comp.n*comp.n}) &ohm;`,
                                    `Z<sub>pu,p</sub> =  (${comp.z.stringifyRect()})&#215;(${comp.mvaB.stringifyRect()}) &#247;(${comp.kvB.stringifyRect()})<sup>2</sup> p.u`,
                                    `<em><strong>Z<sub>pu,p</sub> = ${comp.pu.stringifyRect()} p.u</strong></em>`,
                                    `<strong>Calculation (Secondary Side):</strong><br>Z<sub>s,actual</sub> = (${comp.zs.stringifyRect()})+((${comp.zp.stringifyRect()})&#247;${comp.n*comp.n}) &ohm;`,
                                    `Z<sub>pu,s</sub> =  (${comp.zsT.stringifyRect()})&#215;(${comp.mvaBS.stringifyRect()}) &#247;(${comp.kvBS.stringifyRect()})<sup>2</sup> p.u`,
                                    `<em><strong>Z<sub>pu,s</sub> = ${comp.puS.stringifyRect()} p.u</strong></em>`];
                            appendResults([...res,...arr]);
                        }
                    }
                    break;
                case "TL":
                    {
                        const zpkm = new Complex({
                            re:Number(document.getElementById("impTLReal").value),
                            im:Number(document.getElementById("impTLImg").value)
                        }); 
                        comp = new trnxLine({
                            mvaB:mvaB,
                            kvB:kvB,
                            zpkm:zpkm,
                            dist:Number(document.getElementById("TLlen").value)
                        });
                        const calculatedAnswer = new Complex({
                            re:Number(document.getElementById("impTLAnsReal").value),
                            im:Number(document.getElementById("impTLAnsImg").value)
                        });
                        let message,reply;
                        if(AnswerInRange(calculatedAnswer,comp.pu)){
                            message = "Your Solution is correct, Do you want look at the step wise solution ?";
                        }else{
                            message = "The calculated per unit is incorrect, Only 1% error is permisible, Do you want look at the step wise solution ?";
                        }
                        reply = confirm(message);
                        if(reply){
                            const arr = ['Z<sub>actual</sub> = Z<sub>per Km</sub>&#215;Distance &ohm;',
                                        `<strong>Calculation</strong>:<br>Z<sub>actual</sub> = ${comp.zpkm.stringifyRect()}&#215;${comp.dist} = ${comp.z.stringifyRect()} p.u`,
                                        `Z<sub>pu</sub> =  (${comp.z.stringifyRect()})&#215;(${comp.mvaB.stringifyRect()}) &#247;(${comp.kvB.stringifyRect()})<sup>2</sup> p.u`,
                                        `<em><strong>Z<sub>pu</sub> = ${comp.pu.stringifyRect()} p.u</strong></em>`];
                            appendResults([...res,...arr]);
                        }
                    }
                    break
                case "L":
                    {
                        comp = new load({
                            mvaB:mvaB,
                            kvB:kvB,
                            vl:Number(document.getElementById("vl").value),
                            pl:Number(document.getElementById("pl").value),
                            pf:Number(document.getElementById("pf").value)
                        });
                        const calculatedAnswer = new Complex({
                            re:Number(document.getElementById("impLAnsReal").value),
                            im:Number(document.getElementById("impLAnsImg").value)
                        });
                        let message,reply;
                        if(AnswerInRange(calculatedAnswer,comp.pu)){
                            message = "Your Solution is correct, Do you want look at the step wise solution ?";
                        }else{
                            message = "The calculated per unit is incorrect, Only 1% error is permisible, Do you want look at the step wise solution ?";
                        }
                        reply = confirm(message);
                        if(reply){
                            const arr = ['Z<sub>actual</sub> = |V<sub>L</sub>|<sup>2</sup>&#247;(P<sub>L</sub>-jQ<sub>L</sub>) &ohm;',
                                        'P<sub>L</sub> = S&#215cos(&theta;) MW','Q<sub>L</sub> = S&#215sin(&theta;) MVAR',
                                        `<strong>Calculation:</strong><br>S = ${comp.pl}&#247;${comp.pf} = ${comp.s.toFixed(3)} MVA`,
                                        `Q<sub>L</sub> = ${comp.s}&#215sin(${comp.theta.toFixed(3)}) = ${comp.ql.toFixed(3)} MVAR`,
                                        `Z<sub>actual</sub> = ${comp.vl}<sup>2</sup>&#247;(${comp.sComplex.stringifyRect()}) &ohm;`,
                                        `Z<sub>pu</sub> =  (${comp.z.stringifyRect()})&#215;(${comp.mvaB.stringifyRect()}) &#247;(${comp.kvB.stringifyRect()})<sup>2</sup> p.u`,
                                        `<em><strong>Z<sub>pu</sub> = ${comp.pu.stringifyRect()} p.u</strong></em>`];
                            appendResults([...res,...arr]);
                        } 
                    }
                    break;
                case"SI":{
                    comp = new shunt({
                        mvaB:mvaB,
                        kvB:kvB,
                        vl:Number(document.getElementById("vlL").value),
                        ql:Number(document.getElementById("ql").value)
                    });
                    const calculatedAnswer = new Complex({
                        re:Number(document.getElementById("impShLAnsReal").value),
                        im:Number(document.getElementById("impShLAnsImg").value)
                    });
                    let message,reply;
                    if(AnswerInRange(calculatedAnswer,comp.pu)){
                        message = "Your Solution is correct, Do you want look at the step wise solution ?";
                    }else{
                        message = "The calculated per unit is incorrect, Only 1% error is permisible, Do you want look at the step wise solution ?";
                    }
                    reply = confirm(message);
                    if(reply){
                        const arr = ['Z<sub>actual</sub> = |V<sub>L</sub>|<sup>2</sup>&#247;Q<sub>shunt element</sub> &ohm;',
                                    `<strong>Calculation:</strong><br>Z<sub>actual</sub> = ${comp.vl}<sup>2</sup>&#247;${comp.ql} &ohm;`,
                                    `Z<sub>actual</sub> = ${comp.vl*comp.vl/comp.ql}&ohm;`,
                                    `Z<sub>pu</sub> =  (${comp.z.mod()})&#215;(${comp.mvaB.mod()})&#247;(${comp.kvB.mod()})<sup>2</sup> p.u`,
                                    `<em><strong>Z<sub>pu</sub> = ${comp.pu.stringifyRect()} p.u</strong></em>`];
                        appendResults([...res,...arr]);
                    }
                }
                break;
                case "SC":
                    {
                        comp = new shunt({
                            mvaB:mvaB,
                            kvB:kvB,
                            vl:Number(document.getElementById("vlC").value),
                            ql:Number(document.getElementById("ql").value)
                        });
                        const calculatedAnswer = new Complex({
                            re:Number(document.getElementById("impShCAnsReal").value),
                            im:Number(document.getElementById("impShCAnsImg").value)
                        });
                        let message,reply;
                        if(AnswerInRange(calculatedAnswer,comp.pu)){
                            message = "Your Solution is correct, Do you want look at the step wise solution ?";
                        }else{
                            message = "The calculated per unit is incorrect, Only 1% error is permisible, Do you want look at the step wise solution ?";
                        }
                        reply = confirm(message);
                        if(reply){
                            const arr = ['Z<sub>actual</sub> = |V<sub>C</sub>|<sup>2</sup>&#247;Q<sub>shunt element</sub> &ohm;',
                                        `<strong>Calculation:</strong><br>Z<sub>actual</sub> = ${comp.vl}<sup>2</sup>&#247;${comp.ql} &ohm;`,
                                        `Z<sub>actual</sub> = ${comp.vl*comp.vl/comp.ql}&ohm;`,
                                        `Z<sub>pu</sub> =  (${comp.z.mod()})&#215;(${comp.mvaB.mod()})&#247;(${comp.kvB.mod()})<sup>2</sup> p.u`,
                                        `<em><strong>Z<sub>pu</sub> = ${comp.pu.stringifyRect()} p.u</strong></em>`];
                            appendResults([...res,...arr]);
                        }
                    }
                    break;
                default:
                    break;
            }
            window.scrollTo(0,document.body.scrollHeight);
        }catch(err){
            alert("Something went wrong! Error has been logged in console.");
            console.log(err);
        }
    }else console.log("Validation Error");
}
function hideSection(sm,tl,tm,l,si,sc){
    document.getElementById("syncMach").hidden = sm;
    document.getElementById("transmissionLine").hidden = tl;
    document.getElementById("transformer").hidden = tm;
    document.getElementById("load").hidden = l;
    document.getElementById("shunt-inductance").hidden =si;
    document.getElementById("shunt-capacitance").hidden =sc;
}
function appendResults(arr){
    for(i=0;i<arr.length;i++){
        const para = document.createElement("p");
        para.innerHTML = arr[i];
        document.getElementById("result").appendChild(para);
    }
}
function checkRangeCaller(){
    let els = current.querySelectorAll("input");
    const defaultValues = document.getElementsByClassName("default");
    els = [...els, ...defaultValues];
    if(current === document.getElementById("transformer"))els.length -= 1;
    let status;
    let exception = document.getElementById("auto");
    for(i=0;i<els.length;i+=1){
        if(els[i] !== exception){
            status = checkRange(els[i]);
            if(!status)break;
        }
    }
    return status;
}
function checkRange(el){
    const value = parseFloat(el.value,10);
    const label =  el.parentNode.querySelector("label[for='"+el.id+"']");
    if(!value && value!==0){
        alert(label.textContent+", Cannot be empty/Word.");
        return false;
    };
    if(el.min){
        if(Number(el.min)>value){
            alert(label.textContent+", Value should be greater than or equal to "+el.min+".");
            return false;
        }
    }
    if(el.max){
        if(Number(el.max)<value){
            alert(label.textContent+", value should be lesser than or equal to "+el.max+".");
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
function AnswerInRange(calculated,actual){
    const lower =  actual.sub(new Complex({re:0.01,im:0.01}));
    const upper =  actual.add(new Complex({re:0.01,im:0.01}));
    if(calculated.re>=lower.re && calculated.re <= upper.re){
        if(calculated.im>=lower.im && calculated.im <= upper.im){
            return true;
        }
    }
    return false;
}
function startup(){     
    document.getElementById("year").innerHTML = new Date().getFullYear();
    const complexTemplate = document.getElementById("complexInput");
    const parent = document.getElementsByClassName("complexInput");
    for(i=0;i<parent.length;i++){
        const parms = JSON.parse(parent[i].getAttribute("data-parms"));
        e = complexTemplate.content.cloneNode(true);
        parent[i].appendChild(e);
        parent[i].setAttribute("id",parms.id);
        const elements = parent[i].firstElementChild.children;
        elements[0].textContent = parms.label;
        elements[1].setAttribute("for",parms.id+"Real");
        elements[1].textContent = "real value of "+parms.label;
        elements[2].setAttribute("id",parms.id+"Real");
        elements[4].setAttribute("for",parms.id+"Img");
        elements[4].textContent = "Imaginary value of "+parms.label;
        elements[5].setAttribute("id",parms.id+"Img");
        elements[6].textContent = parms.unit; 
    }
    select();
    if(train)
        helpModal.show();
    else{
        helpModalEl.parentNode.removeChild(helpModalEl);
        const helpTrigger = document.getElementById("info");
        helpTrigger.parentNode.removeChild(helpTrigger);
    }
}
startup();
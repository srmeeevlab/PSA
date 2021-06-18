const questionArray = [
    [{
        question:"Bus Admittance Matrix is going to help in",
        answer:{
            a:"Load Flow Analysis",
            b:"Short Circuit Analysis"
        },
        correctAnswer:"a",
        reason:{
            a:"",
            b:""
        }
    },
    {
        question:"Zbus matrix and Ybus matrix are same?",
        answer:{
            a:"Yes",
            b:"No"
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
        }
    },
    {
        question:"Ybus is a sparse matrix?",
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
        question:"LCA is abbreviated as",
        answer:{
            a:"Half line Charging Admittance",
            b:"Line Charging Admittance"
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
        },
    },
    {
        question:"Presence of Off nominal Transformer Ratio will effect the Calculation of Ybus",
        answer:{
            a:"True",
            b:"False"
        },
        correctAnswer:"a",
        reason:{
            a:"",
            b:""
        },
        end:true
    }
    ],
    [{
        question:"Using Direct Inspection method we can find the ",
        answer:{
            a:"Ybus",
            b:"Zbus"
        },
        correctAnswer:"a",
        reason:{
            a:"",
            b:""
        },
    },
    {
        question:"Which needs less memory and calculation will be faster for all practical purposes?",
        answer:{
            a:"Zbus",
            b:"Ybus"
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
        },
        end:true
    }]
];
let compid = 1,showStep=1;
const helpModalEl = document.getElementById('helpModal');
const helpModal = new bootstrap.Modal(helpModalEl);
const questionModalEl = document.getElementById('questionModal');
const questionModal = new bootstrap.Modal(questionModalEl);
let train = true;
function _n(a){
    return Number(a);
}
function _t(a,n=4){
    return _n(a.toFixed(n));
}
function _pC(c){
    const reT = _t(c.re);
    const imT = _t(c.im);
    let res = String(reT);
    if(imT>0)res+=" + j ";
    else res+=" - j ";
    res+=String(Math.abs(imT));
    return(res);
}
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
function calculate(){
    if(checkRangeCaller()){
        try{
            next(true,2);
            const compMatrix = makeComponentMatrix();
            const yBus = generateYBus(compMatrix);
            clearResult();
            let i,j,res = [];
            document.getElementById("resultHead").innerHTML += "<th scope:'col'>BUS No.</th>";
            for(i=0;i<yBus.length;i++){
                document.getElementById("resultHead").innerHTML += `<th scope:'col'>${i+1}</th>`;
            }
            for(i=0;i<yBus.length;i+=1){
                res.push(`<tr><th scope:'col'>${i+1}</th>`);
                for(j=0;j<yBus.length;j++){
                    res[i] = res[i]+`<td>${_pC(yBus[i][j])}</td>`;
                }
                res[i] = res[i]+"</tr>";
            }
            for(i=0;i<res.length;i+=1){
                document.getElementById("result").innerHTML = document.getElementById("result").innerHTML + res[i];  
            }
            showStep+=1;
            hideSection(["sectionThree"],[false]);
            disableSection("sectionTwo",true);
            window.scrollTo(0,document.body.scrollHeight);
        }catch(err){
            alert("Something went wrong! Error has been logged in console.");
            console.log(err);
        }
    }
}
function clearResult(){
    compid = 1;
    document.getElementById("resultWrapper").innerHTML = '<table class="table table-warning table-bordered table-striped" style="border: black;"><thead><tr id="resultHead"></tr></thead><tbody id="result"></tbody></table>';
}
function generateYBus(compMatrix){
    let n,m;
    const nt = [],no = [],r = [],x = [],bc = [],a = [],z=[];
    for(n=0;n<compMatrix.length;n+=1){
        nt.push(compMatrix[n].nt);
        no.push(compMatrix[n].no);
        r.push(compMatrix[n].r);
        x.push(compMatrix[n].x);
        bc.push(compMatrix[n].bon2);
        a.push(compMatrix[n].code);
        z.push(new Complex(r[n],x[n]));
    }
    const nbr = _n(nt.length), nbus = Math.max(...nt,...no),y=[];
    for(n=0;n<nbr;n+=1){
        y.push(z[n].inverse());
        if (a[n] <=0) a[n] = 1;
    }
    const yBus = [];
    for(n=0;n<nbus;n++){
        let y = [];
        for(m=0;m<nbus;m++)y.push(new Complex(0));
        yBus.push(y);
    }
    for(n=0;n<nbr;n+=1){
        yBus[nt[n]-1][no[n]-1] = yBus[nt[n]-1][no[n]-1].sub(y[n].div(new Complex(a[n])));
        yBus[no[n]-1][nt[n]-1] = yBus[nt[n]-1][no[n]-1];
    }
    for(n=0;n<nbus;n+=1){
        for(m=0;m<nbr;m+=1){
            if(nt[m] == n+1)yBus[n][n] =yBus[n][n].add(y[m].div(new Complex (a[m]*a[m]))).add(new Complex(bc[m]));
            else if(no[m] == n+1)yBus[n][n] = yBus[n][n].add(y[m]).add(new Complex(bc[m])); 
        }
    }
    return yBus;
}
function makeComponentMatrix(){
    const tlRows = document.getElementsByClassName("compDetTl");
    const tmRows = document.getElementsByClassName("compDetTm");
    let i;
    const compMatrix = [];
    for(i=0;i<tlRows.length;i+=1){
        const data = {
            nt:_n(tlRows[i].querySelector("#id-s-bus-line-"+(i+1)).value),
            no:_n(tlRows[i].querySelector("#id-r-bus-line-"+(i+1)).value),
            r:_n(tlRows[i].querySelector("#r-line-"+(i+1)).value),
            x:_n(tlRows[i].querySelector("#x-line-"+(i+1)).value),
            bon2:_n(tlRows[i].querySelector("#hcla-line-"+(i+1)).value),
            code:1,
            number:_n(tlRows[i].querySelector("#id-line-"+(i+1)).value)
        }
        compMatrix.push(data);
    }
    for(i=0;i<tmRows.length;i+=1){
        const data = {
            nt:_n(tmRows[i].querySelector("#id-t-bus-tformer-"+(i+1)).value),
            no:_n(tmRows[i].querySelector("#id-nt-bus-tformer-"+(i+1)).value),
            r:_n(tmRows[i].querySelector("#r-tformer-"+(i+1)).value),
            x:_n(tmRows[i].querySelector("#x-tformer-"+(i+1)).value),
            bon2:0,
            code:_n(tmRows[i].querySelector("#a-tformer-"+(i+1)).value),
            number:_n(tmRows[i].querySelector("#id-tformer-"+(i+1)).value)
        }
        compMatrix.push(data);
    }
    return compMatrix;
}
function generateRow(source,count,destination){
    const genTemp = document.getElementsByTagName("template")[0];
    const a = genTemp.content.querySelector(source);
    const tot = Number(document.getElementById(count).value);
    let i,j;
    for(i=0;i<tot;i+=1){
        const el = document.importNode(a,true);
        const labels = el.querySelectorAll("label");
        el.setAttribute("id",el.getAttribute("id")+"-"+String(i+1));
        for(j=0;j<labels.length;j+=1){
            const id = labels[j].getAttribute("for");
            const idNew = id+"-"+String(i+1);
            labels[j].setAttribute("for",idNew);
            const input = el.querySelector("#"+id);
            switch (id) {
                case "id-bus-pv":{
                    input.value = busid;
                    busid+=1;
                    input.disabled = true;
                    break;
                }
                case "id-bus-pq":{
                    input.value = busid;
                    busid+=1;
                    input.disabled = true;
                    break;
                }
                case "id-line":{
                    input.value = compid;
                    compid+=1;
                    input.disabled = true;
                    break;
                }
                case "id-tformer":{
                    input.value = compid;
                    compid+=1;
                    input.disabled = true;
                    break;
                }
                default:
                    break;
            }
            input.setAttribute("id",idNew);
            document.getElementById(destination).appendChild(el);
        }
    }
}
function back(){
    showStep-=1;
    if(showStep<=0)showStep = 1;
    else if(showStep>=4)showStep =2;
    if(showStep == 1){
        const arr = ["tlMatrix","tmMatrix"];
        busid = 1;compid = 1;
        let i;
        for(i=0;i<arr.length;i+=1)document.getElementById(arr[i]).textContent = "";
        hideSection(["sectionTwo","sectionThree","controls"],[true,true,true]);
        disableSection("sectionOne",false);
    }
    else if(showStep == 2){
        hideSection(["sectionThree"],[true]);
        disableSection("sectionTwo",false);
        disableDefault();
    }
}
function startExp(){
    if(checkRangeCaller()){
        next(true,1);
        disableSection("sectionOne",true);
        showStep+=1;
        hideSection(["sectionTwo","controls"],[false,false]);
        generateRow("#tlRow","tlTot","tlMatrix");
        generateRow("#tmRow","tmTot","tmMatrix");   
    }
    else console.log("Validation Error");
}
function disableSection(sectionId,bool){
    const inputs = document.querySelectorAll("#"+sectionId+" input");
    const buttons = document.querySelectorAll("#"+sectionId+" button");
    let i;
    for(i=0;i<inputs.length;i++)inputs[i].disabled = bool;
    for(i=0;i<buttons.length;i++)buttons[i].disabled = bool;
}
function hideSection(sectionId,bool){
    sectionId.forEach(function(section,index){
        const el = document.getElementById(section);
        el.hidden = bool[index];
    });
}
function disableDefault(){
    const el = document.getElementsByClassName("disableDefault");
    let i;
    for(i=0;i<el.length;i+=1)el[i].querySelector("input").disabled = true;
}
function checkRangeCaller(){
    let els;
    if(showStep==1){
        els = document.getElementById("sectionOne").querySelectorAll("input");
    }
    else 
        els = document.getElementById("sectionTwo").querySelectorAll("input");
    let status,i;
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
    const label =  el.parentNode.querySelector("label");
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
            alert(label.textContent+", Value should be lesser than or equal to "+el.max+".");
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
    hideSection(["sectionTwo","sectionThree","controls"],[true,true,true]);
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

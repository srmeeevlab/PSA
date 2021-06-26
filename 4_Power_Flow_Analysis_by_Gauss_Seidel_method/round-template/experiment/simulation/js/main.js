const questionArray = [
    [{
        question:"Gauss Siedel method is ",
        answer:{
            a:"Iterative",
            b:"Non iterative"
        },
        correctAnswer:"a",
        reason:{
            a:"",
            b:""
        }
    },
    {
        question:"Gauss Siedel method is used to solve ",
        answer:{
            a:"Non Linear Power System Network",
            b:"Linear Power System Network"
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
        },
        end:true
    }],
    [{
        question:"PV bus is treated as a PQ bus when Reactive power limit is violated",
        answer:{
            a:"True",
            b:"False"
        },
        correctAnswer:"a",
        reason:{
            a:"",
            b:""
        }
    },
    {
        question:"If Voltage Phase angle and Reactive Power are not known then that Bus is called as",
        answer:{
            a:"PQ bus",
            b:"Voltage Controlled Bus "
        },
        correctAnswer:"b",
        reason:{
            a:"",
            b:""
        }
    },
    {
        question:"If PV bus is having V=1p.u and ∂=0 then it may be called as Slack bus",
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
    }],
    [{
        question:"Keeping More iterations will leads to more Accurate Power Flow Analysis but Takes too much time",
        answer:{
            a:"True",
            b:"False"
        },
        correctAnswer:"a",
        reason:{
            a:"",
            b:""
        }
    },
    {
        question:"The Quantities defined at the Reference bus are",
        answer:{
            a:"V and ∂",
            b:"Q and ∂"
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

let busid = 1;compid = 1;
let showStep = 1;
const pow = Math.pow;
function _tr(a,n=4){
    const powOfTen = Math.pow(10,n);
    return Math.round((a + Number.EPSILON) * powOfTen) / powOfTen
}
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
function updateNoOfBus(){
    const noOfBus = document.getElementById("pvTot");
    const slack = document.getElementById("slack");
    if(slack.value > noOfBus.value)slack.value = noOfBus.value;
    document.getElementById("slack").setAttribute("max",noOfBus.value);
}
function checkValid(e){
    const noOfBus = Number(document.getElementById("busTot").value);
    const pvTot = document.getElementById("pvTot");
    const pqTot = document.getElementById("pqTot");
    const currentTotal = Number(pvTot.value) + Number(pqTot.value);
    if(currentTotal<noOfBus);
    else if(currentTotal > noOfBus && e)e.target.value=Number(e.target.value)-(currentTotal-noOfBus);
    else if(Number(pqTot.value)>=Number(pvTot.value)){
        pqTot.value=Number(pqTot.value)-(currentTotal-noOfBus);
    }
    else pvTot.value=Number(Number(pvTot.value))-(currentTotal-noOfBus);
}
function calculate(){
    if(checkRangeCaller()){
        try{
            next(true,2);
            const busMatrix = makeBusMatrix();
            const compMatrix = makeComponentMatrix();
            clearResultYbus();
            const [yBus,nt,no,a,y,bc] = generateYBus(compMatrix);
            let yload=0,deltad=[],i,k;
            const maxiter = _n(document.getElementById("iter").value);
            const accuracy = _n(document.getElementById("tol").value);
            const accel = _n(document.getElementById("acc").value);
            const basemva = _n(document.getElementById("mvab").value);
            const nbr = _n(compMatrix.length);
            const nbus = _n(busMatrix.length);
            const kb = [] ,vm = [] ,delta = [], pd = [], qd = [],pg = [], qg = [],
            qmin = [],qmax = [],qsh = [], v=[],p=[],q=[],s=[],dv=[];
            for(k=0;k<nbus;k+=1){
                const n = k;
                kb[n] = busMatrix[k].code;
                vm[n] = busMatrix[k].vMag;
                delta[n] = busMatrix[k].delta;
                pd[n] = busMatrix[k].mwD;
                qd[n] = busMatrix[k].mvarD;
                pg[n] = busMatrix[k].mwG;
                qg[n] = busMatrix[k].mvarG;
                qmin[n] = busMatrix[k].qMin;
                qmax[n] = busMatrix[k].qMax;
                qsh[n] = busMatrix[k].mvarStatic;
                if(vm[n]<=0){
                    vm[n] = 1.0;
                    v[n] = new Complex(1);
                }else{
                    delta[n] = Math.PI*delta[n]/180;
                    v[n] = new Complex(vm[n]).mul(new Complex(Math.cos(delta[n]),Math.sin(delta[n])));
                    p[n] = (pg[n]-pd[n])/basemva;
                    q[n] = (qg[n]-qd[n] + qsh[n])/basemva;
                    s[n] = new Complex(p[n],q[n]);
                }
                dv[n]=0;
            }
            let num = 0,acurBus =0,converge =1;
            const vc = [],sc=[];
            for(k=0;k<nbus;k+=1){
                vc.push(new Complex());
                sc.push(new Complex());
            }
            let iter=0;
            maxerror = 10;
            const dq = [];
            const dp = [];
            while(maxerror >= accuracy && iter<maxiter){
                iter = iter+1;
                for(i=0;i<nbus;i+=1){
                    let yv = new Complex(0,0);
                    for(l=0;l<nbr;l+=1){
                        if(nt[l]-1 === i){
                            k=no[l]-1;
                            yv = yv.add(yBus[i][k].mul(v[k]));
                        }
                        else if(no[l]-1 === i){
                            k=nt[l]-1;
                            yv = yv.add(yBus[i][k].mul(v[k]));
                        }
                    }
                    sc[i] = v[i].conjugate().mul((yBus[i][i].mul(v[i]).add(yv)));
                    sc[i] = sc[i].conjugate();
                    dp[i] = p[i] - sc[i].re;
                    dq[i] =q[i] - sc[i].im;
                    if(kb[i]===1){
                        s[i] = sc[i];
                        p[i] = sc[i].re;
                        q[i] = sc[i].im;
                        dp[i] = 0;
                        dq[i] = 0;
                        vc[i] = v[i];
                    }
                    else if(kb[i] === 2){
                        q[i] = sc[i].im;
                        s[i] = new Complex(p[i],q[i]);
                        if(qmax[i] != 0){
                            const qgc = q[i]*basemva + qd[i] - qsh[i];
                            if(Math.abs(dq[i])<=0.005 && iter >= 10){
                                if(dv[i]<=0.045){
                                    if(qgc < qmin[i]){
                                        vm[i] = vm[i] - 0.005;
                                        dv[i] = dv[i] + 0.005;                        
                                    }
                                    else if(qgc>qmax[i]){
                                        vm[i] = vm[i] - 0.005;
                                        dv[i] = dv[i] + 0.005;
                                    }
                                }
                            }
                        }
                    }
                    if(kb[i] != 1){
                        vc[i] = ((s[i].conjugate().div(v[i].conjugate())).sub(yv)).div(yBus[i][i]);
                    }
                    if(kb[i] === 0){
                        v[i] = v[i].add(vc[i].sub(v[i]));
                    }
                    else if(kb[i] === 2){
                        const vci = vc[i].im;
                        const vcr = Math.sqrt((vm[i]*vm[i])-(vci*vci));
                        vc[i] = new Complex(vcr,vci);
                        v[i] = v[i].add(new Complex(accel).mul(vc[i].sub(v[i])));
                    }
                }
                maxerror = Math.max(Math.max(...dp),Math.max(...dq));
                if(iter == maxiter && maxerror > accuracy){
                    alert(`Warning: Did not converge after ${iter} iiterations`); 
                    converge = 0;
                }
            }
            let tempTitle;
            if (converge != 1){
                tempTitle = "<tr><th class='res-title' colspan = '7'>Iterative Solution did not Converge</th></tr>";
            }
            else{
                tempTitle = "<tr><th class='res-title' colspan = '7'>Power Flow Solution by Gauss-Siedel Method</th></tr>";
            }
            k=-1;
            let pgg = [];
            for(i=0;i<nbus;i+=1){
                vm[i] = v[i].abs();
                deltad[i] = (v[i].arg())*180/Math.PI;
                if(kb[i] == 1){
                    s[i] = new Complex(p[i],q[i]);
                    pg[i] = p[i]*basemva +pd[i];
                    qg[i] = q[i]*basemva + qd[i] - qsh[i];
                    k+=1;
                    pgg[k] = pg[i];
                }
                else if(kb[i] === 2){
                    k +=1;
                    pgg[k] = pg[i];
                    s[i] = new Complex(p[i],q[i]);
                    qg[i] = q[i]*basemva + qd[i] - qsh[i];
                }
                yload[i] = new Complex(pd[i],qsh[i]-qd[i]).div(new Complex(basemva*pow(vm[i],2)));
            }
            const sum = function(a,b){return a+b};
            const pgt = pg.reduce(sum,0),
            qgt = qg.reduce(sum,0),
            pdt = pd.reduce(sum,0),
            qdt = qd.reduce(sum,0),
            qsht = qsh.reduce(sum,0);
            for(i=0;i<busMatrix.length;i+=1){
                busMatrix[i].vMag = vm[i];
                busMatrix[i].delta = deltad[i];
            }  
    
            //Result:
            displayYbus(yBus);
            let table = "<table class='table table-warning table-bordered table-striped' style='border: black;'><thead>";
            let row = [
                tempTitle,
                `<tr><th class='res-title' colspan = '7'>Maximum Power Mismatch = ${maxerror}</th></tr>`,
                `<tr><th class='res-title' colspan = '7'>No. of Iterations = ${iter}</th></tr>`,
                "<tr><th class='res-title' scope='col'>Bus</th><th class='res-title' scope='col'>Voltage</th><th class='res-title' scope='col'>Angle</th><th class='res-title' scope='col' colspan='2'>Load</th><th class='res-title' scope='col' colspan='2'>Generation</th></tr>",
                "<tr><th class='res-title' scope='col'>No.</th><th class='res-title' scope='col'>Mag.</th><th class='res-title' scope='col'>Degree</th><th class='res-title' scope='col'>MW</th><th class='res-title' scope='col'>Mvar</th><th class='res-title' scope='col'>MW</th><th class='res-title' scope='col'>Mvar</th></tr>"
            ];
            for(i=0;i<row.length;i++)table+=row[i];
            table+="</thead><tbody>";
            row = []
            for(i=0;i<nbus;i++){
                row.push(`<tr><th scope="row">${i+1}</th><td>${_tr(vm[i])}</td><td>${_tr(deltad[i])}</td><td>${_tr(pd[i])}</td><td>${_tr(qd[i])}</td><td>${_tr(pg[i])}</td><td>${_tr(qg[i])}</td></tr>`);
            }
            row.push(`<tr><th scope="row">Total</th><td></td><td></td><td>${_tr(pdt)}</td><td>${_tr(qdt)}</td><td>${_tr(pgt)}</td><td>${_tr(qgt)}</td></tr>`);
            for(i=0;i<row.length;i+=1)table+=row[i];
            table += "</tbody></table>";
            document.getElementById("result-one").innerHTML = table;
    
            table = "<table class='table table-warning table-bordered table-striped' style='border: black;'><thead>";
            row = [
                "<tr><th class='res-title' colspan = '8'>Line Flow and Losses</th></tr>",
                "<tr><th class='res-title' scope='col' colspan ='2'>Line</th><th class='res-title' scope='col' colspan='3'>Power at bus & line flow</th><th class='res-title' scope='col' colspan='2'>Line loss</th><th class='res-title' scope='col'>Transformer</th>",
                "<tr><th class='res-title' scope='col'>from</th><th class='res-title' scope='col'>to</th><th class='res-title' scope='col'>MW</th><th class='res-title' scope='col'>Mvar</th><th class='res-title' scope='col'>MVA</th><th class='res-title' scope='col'>MW</th><th class='res-title' scope='col'>Mvar</th><th class='res-title' scope='col'>tap</th></tr>"
            ];
            for(i=0;i<row.length;i++)table+=row[i];
            table+="</thead><tbody>";
            row = []
            let busprt;
            let aC, In,Ik,Snk,Skn,SL,SLT=new Complex();
            for(i=0;i<nbus;i+=1){
                busprt = 0;
                for(l=0;l<nbr;l+=1){
                    if(busprt === 0){
                        row.push(`<tr><th scope="row">${i+1}</th><td></td><td>${_tr(p[i]*basemva)}</td><td>${_tr(q[i]*basemva)}</td><td>${_tr((new Complex(basemva).mul(s[i])).abs())}<td></td><td></td><td></td>`); 
                        busprt = 1;
                    }
                    if(nt[l] == i+1){
                        k = no[l]-1;
                        aC = new Complex(a[l]);
                        In = ((v[i].sub(aC.mul(v[k]))).mul(y[l].div(aC.pow(2)))).add((new Complex(bc[l])).div((aC.pow(2)).mul(v[i])));
                        Ik = ((v[k].sub(v[i].div(aC))).mul(y[l])).add((new Complex(bc[l])).mul(v[k]));
                        Snk = v[i].mul(In.conjugate().mul(new Complex(basemva)));
                        Skn = v[k].mul(Ik.conjugate().mul(new Complex(basemva)));
                        SL = Snk.add(Skn);
                        SLT = SLT.add(SL);
                    }
                    else if(no[l] === i+1){
                        k =nt[l]-1;
                        aC = new Complex(a[l]);
                        In = ((v[i].sub(v[k].div(aC))).mul(y[l])).add((new Complex(bc[l])).mul(v[i]));
                        Ik = ((v[k].sub(aC.mul(v[i]))).mul(y[l].div(aC.pow(2)))).add((new Complex(bc[l])).div((aC.pow(2)).mul(v[k])));
                        Snk = v[i].mul(In.conjugate().mul(new Complex(basemva)));
                        Skn = v[k].mul(Ik.conjugate().mul(new Complex(basemva)));
                        SL = Snk.add(Skn);
                        SLT = SLT.add(SL);
                    }
                    if(nt[l] === i+1 || no[l] === i+1){
                        row.push(`<tr><th scope="row"></th><td>${k+1}</td><td>${_tr(Snk.re)}</td><td>${_tr(Snk.im)}</td><td>${_tr(Snk.abs())}<td>${_tr(SL.re)}</td>`);
                        if(nt[l] === i+1 && a[l] != 1){
                            row.push(`<td>${_tr(SL.im)}</td><td>${_tr(a[l])}</td></tr>`);
                        }
                        else{
                            row.push(`<td>${_tr(SL.im)}</td><td></td></tr>`);
                        } 
                    }
                } 
            }
            SLT = SLT.div(new Complex(2));
            row.push(`<tr><th scope="row">Total loss</th><td></td><td></td><td></td><td></td><td>${_tr(SLT.re)}</td><td>${_tr(SLT.im)}</td><td></td>`); 
            for(i=0;i<row.length;i++)table+=row[i];
            table += "</tbody></table>";
            document.getElementById("result-two").innerHTML = table;
            showStep+=1;
            hideSection(["sectionThree"],[false]);
            disableSection("sectionTwo",true);
            window.scrollTo(0,document.body.scrollHeight);
        }catch(error){
            alert("Something went wrong plese ensure the following:\n1) You have one more PV bus apart from slack\n2) Check whether all the buses are mentioned at least onece in the component data");
            console.log(error);
        }
    }else console.log("Validation Error");
}
function displayYbus(yBus){
    let i,j,res = [];
    document.getElementById("resultHead").innerHTML += "<th scope='col'>BUS No.</th>";
    for(i=0;i<yBus.length;i++){
        document.getElementById("resultHead").innerHTML += `<th scope='col'>${i+1}</th>`;
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
}
function toggleCheck(){
    document.getElementById("result-ybus").hidden = !document.getElementById("isYbusRequired").checked;
}
function clearResultYbus(){
    compid = 1;
    document.getElementById("result-ybus").innerHTML = `<table class='table table-warning table-bordered table-striped' style='border: black;'><thead><tr id="resultHead"></tr></thead><tbody id="result"></tbody></table>`;
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
    return [yBus,nt,no,a,y,bc];
}
function makeBusMatrix(){
    const pvRows = document.getElementsByClassName("busDetPv");
    const pqRows = document.getElementsByClassName("busDetPq");
    let i;
    const busMatrix = [];
    const slack = document.getElementById("slack").value;
    for(i=0;i<pvRows.length;i+=1){
        let code = 2,pvDel=0;
        if(_n(slack) === _n(pvRows[i].querySelector("#id-bus-pv-"+(i+1)).value)){
            code = 1;
            pvDel = _n(document.getElementById("vdel-bus-pv-"+(i+1)).value);
        }
        const data = {
            number :_n(pvRows[i].querySelector("#id-bus-pv-"+(i+1)).value),
            code :code,
            vMag :_n(pvRows[i].querySelector("#vmag-bus-pv-"+(i+1)).value),
            delta :pvDel,
            mwD :0,
            mvarD :_n(pvRows[i].querySelector("#preact-d-bus-pv-"+(i+1)).value),
            mwG :_n(pvRows[i].querySelector("#pact-g-bus-pv-"+(i+1)).value),
            mvarG :0,
            qMin :_n(pvRows[i].querySelector("#preact-g-l-bus-pv-"+(i+1)).value),
            qMax :_n(pvRows[i].querySelector("#preact-g-u-bus-pv-"+(i+1)).value),
            mvarStatic :0
        }
        busMatrix.push(data);
    }
    for(i=0;i<pqRows.length;i+=1){
        const data = {
            number :_n(pqRows[i].querySelector("#id-bus-pq-"+(i+1)).value),
            code :0,
            vMag :_n(pqRows[i].querySelector("#vmag-bus-pq-"+(i+1)).value),
            delta :_n(pqRows[i].querySelector("#vdel-bus-pq-"+(i+1)).value),
            mwD :_n(pqRows[i].querySelector("#pact-d-bus-pq-"+(i+1)).value),
            mvarD :_n(pqRows[i].querySelector("#preact-d-bus-pq-"+(i+1)).value),
            mwG :0,
            mvarG :0,
            qMin :0,
            qMax :0,
            mvarStatic :0
        }
        busMatrix.push(data);
    }
    return busMatrix;
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
        const slackId = _n(document.getElementById("slack").value);
        if(source == "#pvRow" && i+1 == slackId){
            const b = genTemp.content.querySelector("#slackDel");
            const vDelSlack = document.importNode(b,true);
            el.insertBefore(vDelSlack,el.children[6]);
        }
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
function disableDefault(){
    const el = document.getElementsByClassName("disableDefault");
    let i;
    for(i=0;i<el.length;i+=1)el[i].querySelector("input").disabled = true;
}
function startExp(){
    if(checkRangeCaller()){
        next(true,1);
        disableSection("sectionOne",true);
        showStep+=1;
        hideSection(["sectionTwo","controls"],[false,false]);
        generateRow("#pvRow","pvTot","pvMatrix");
        generateRow("#pqRow","pqTot","pqMatrix");
        generateRow("#tlRow","tlTot","tlMatrix");
        generateRow("#tmRow","tmTot","tmMatrix");
    }else console.log("Validation Error");
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
function back(){
    showStep-=1;
    if(showStep<=0)showStep = 1;
    else if(showStep>=4)showStep =2;
    if(showStep == 1){
        const arr = ["pvMatrix","pqMatrix","tlMatrix","tmMatrix"];
        busid = 1;compid = 1;
        let i;
        for(i=0;i<arr.length;i+=1)document.getElementById(arr[i]).textContent = "";
        hideSection(["sectionTwo","sectionThree","controls"],[true,true,true]);
        disableSection("sectionOne",false);
    }
    else if(showStep == 2){
        hideSection(["sectionThree"],[true]);
        disableSection("sectionTwo",false);
        document.getElementById("result-ybus").hidden = true;
        document.getElementById("isYbusRequired").checked = false;
        disableDefault();
    }
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
    updateNoOfBus();
    checkValid();
    document.getElementById("isYbusRequired").checked = false;
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
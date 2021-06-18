const simulator={};
let ptr,fnom,rpu,h,tt,tg,dpl,kt,kg,r,ddpl,dfno,b,bpu,kp,tp,s,dplpu,dfstat_dnom,dfstat_num,fss,ssError,frequency,rk,rkp1;
function assign(){
    ptr = parseFloat(document.getElementById("ptr").value);
    fnom = parseFloat(document.getElementById("fnom").value);
    rpu = parseFloat(document.getElementById("rpu").value);
    h = parseFloat(document.getElementById("h").value);
    tt = parseFloat(document.getElementById("tt").value);
    tg = parseFloat(document.getElementById("tg").value);
    dpl = parseFloat(document.getElementById("dpl").value);
}
function calculate(){
    kt = 1;
    kg = 1;
    r = rpu*fnom;
    ddpl = 0.8*ptr/100;
    dfno = fnom/100;
    b = ddpl/dfno;
    bpu = b/ptr;
    kp = 1/bpu;
    tp = 2*h/(bpu*fnom);
    s = 0;
    dplpu = dpl/ptr;
    dfstat_num = (kp/(1+s*tp))*dplpu;
    dfstat_dnom = 1+kp/(r*(1+s*tp)*(1+s*tg)*(1+s*tt));
    fss=dfstat_num/dfstat_dnom;
    ssError = fss;
    frequency = fnom-fss;
    rk = r*kp/(r+kp);
    rkp1 = r+kp/(r*tp);
}
function dynamicResponse(time){
    const result = (-rk*(1-Math.exp(-time*rkp1))*dplpu).toFixed(4);
    return(result)
}
function updateSvg(){
    document.getElementById("kgSvg").textContent = kg.toFixed(4);
    document.getElementById("kpSvg").textContent = kp.toFixed(4);
    document.getElementById("ktSvg").textContent = kt.toFixed(4);
    document.getElementById("rSvg").textContent = r.toFixed(4);
    document.getElementById("ttSvg").textContent = `1+${tt.toFixed(2)}s`;
    document.getElementById("tgSvg").textContent = `1+${tg.toFixed(2)}s`;
    document.getElementById("tpSvg").textContent = `1+${tp.toFixed(2)}s`;
}
function getError(){
    return ssError;
}
function getValue(){
    return frequency;
}
function getUnit(){
    return " Hz";
}
function getFNom(){
    return fnom;
}
const getLabel = {
    yAxis : function () {   
        return "Δf (Hz)";
    },
    valueLabel : function () {
        return "Steady state frequency: ";
    },
    errorLabel : function () {
        return "Steady state frequency error: ";
    },
    titleLabel : function() {
        return ["Dynamic Response of","Primary ALFC"];
    }
}
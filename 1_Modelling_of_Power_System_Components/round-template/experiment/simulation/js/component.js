class component{
    constructor(parms){
        this.mvaB = parms.mvaB;
        this.kvB = parms.kvB;
        this.z  = parms.z;
        this.calculatePU();
    }
    calculatePU(){
        this.pu = this.z.mul(this.mvaB).divBy(this.kvB.pow(2));
    }
}
class syncMach extends component{
    constructor(parms){
        super(parms);
    } 
}
class trnxLine extends component{
    constructor(parms){
        parms.z = parms.zpkm.mul(new Complex({re:parms.dist}));
        super(parms);
        this.z = parms.z;
        this.dist = parms.dist;
        this.zpkm = parms.zpkm;
    }
}
class transformer extends component{
    constructor(parms){
        parms.n = parms.kvB.mod()/parms.kvBS.mod();
        parms.n = Number(parms.n.toFixed(3));
        parms.z = parms.zp.add((parms.zs.mul(new Complex({re:parms.n}).pow(2))));
        parms.zsT = parms.zs.add((parms.zp.mul(new Complex({re:parms.n}).pow(-2))));
        super(parms);
        this.n = parms.n;
        this.zs = parms.zs;
        this.mvaBS = parms.mvaB;
        this.kvBS = parms.kvBS;
        this.zsT = parms.zsT;
        this.zp = parms.zp;
        this.calculatePUS();
    }  
    calculatePUS() {
        this.puS = this.zsT.mul(this.mvaBS).divBy(this.kvBS.pow(2));
    }
}
class load extends component{
    constructor(parms){
        const mod = new Complex({re:parms.vl*parms.vl});
        const theta = Math.acos(parms.pf);
        const s = parms.pl/parms.pf;
        const ql = s*Math.sin(theta);
        const sComplex = new Complex({re:parms.pl,im:-ql});
        parms.z = mod.divBy(sComplex);
        super(parms);
        this.ql = ql;
        this.vl = parms.vl;
        this.pf = parms.pf;
        this.theta = theta;
        this.pl = parms.pl;
        this.sComplex = sComplex;
        this.s = s;
    }
}
class shunt extends component{
    constructor(parms){
        parms.z = new Complex({
            re:parms.vl*parms.vl/parms.ql});
        super(parms);
        this.ql = parms.ql;
        this.vl = parms.vl;
    }
}
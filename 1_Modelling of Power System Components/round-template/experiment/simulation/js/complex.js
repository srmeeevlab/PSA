class Complex{
    constructor(parms){
        this.re = parms.re || 0,
        this.im = parms.im || 0,
        this.r = this.mod()
        this.theta = this.arg()
    }
    cmpl(){//Complement
        return new Complex({
            re:this.re,
            im:-this.im
        });
    }
    mod(){//Modulo
        if(!this.r)
            return Math.sqrt((this.re*this.re)+(this.im*this.im));
        else
            return this.r;
    }
    arg(){
        if(!this.theta){
            let angle = Math.atan(this.im/this.re);
            if(this.re<0 && this.im>=0)
                return Math.PI + angle;
            else if(this.re<0 && this.im<0)
                return angle-Math.PI;
            else if(this.re>0 && this.im<0)
                return -angle;
            else
                return angle;
        }
        else
            return this.theta;
    }
    argDeg(){
        return radToDeg(this.theta);
    }
    //Arithmatic Operations
    mul(b){//Multiply
        const real = (this.re*b.re)-(this.im*b.im);
        const imaginary = (this.re*b.im)+(this.im*b.re);
        return new Complex({
            re:real,
            im:imaginary
        });
    }
    divBy(b){//Divide
        const res = this.mul(b.cmpl());
        const sq = b.re*b.re + b.im*b.im;
        res.re /= sq;
        res.im /= sq;
        return res; 
    }
    add(b){//Add
        return new Complex({
            re: this.re + b.re,
            im: this.im + b.im
        });
    }
    sub(b){//Subtract
        return new Complex({
            re: this.re - b.re,
            im: this.im - b.im
        });
    }

    //Extra
    pow(n){//Power
        if(n>0)
            return this.mul(this.pow(n-1));
        else if(n===0)
            return new Complex({re:1});
        else if(n<0)
            return new Complex({re:1}).divBy(this.pow(-n));
        
    }
    polar(){//Polar Coordinates
        return {
            r:this.r,
            theta:this.theta
        }
    }
    rect(){//Rectangular Coordinates
        return{
            re:this.re,
            im:this.im
        }
    }
    stringifyRect(){
        if(this.im<0){
            return this.re.toFixed(3) + "-j" + -this.im.toFixed(3);
        }
        else if(this.im>=0){
            return this.re.toFixed(3) + "+j"+ this.im.toFixed(3);
        }
    }
    stringifyPolar(){
        return this.r.toFixed(3) + "<" + this.theta.toFixed(3);
    }
    fromPolar(pol){//Complex from polar
        this.re = pol.r*Math.cos(pol.theta);
        this.im = pol.r*Math.sin(pol.theta);
        this.r = pol.r;
        this.theta = pol.theta;
        return this;
    }
}

//General Functions

function degToRadians(deg){
    return deg*Math.PI/180;
}
function radToDeg(rad){
    return rad*180/Math.PI;
}
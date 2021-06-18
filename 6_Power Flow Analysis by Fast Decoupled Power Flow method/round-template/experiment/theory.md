### INTRODUCTION<br>
#### Power flow analysis is the fundamental study to perform for both planning and operational phases of a power system. 
#### The load flow analysis is carried out to analyze the steady state operation of the power system which involves the determination of the bus voltages, bus angles, real power, reactive power and the power flows for any given power system network [4]. 
#### Power flow analysis helps us to analyze the following:
1. For the continuous monitoring of the current status of the power system.
2. For planning and extending the existing power system to meet the increasing demand of the electrical network.
#### The power flow solution is also used to determine the initial conditions of the power system when the transient behavior is to be analyzed.
#### The FDLF analysis is a fast and accurate method for obtaining power flow solution. 
<br>

### CONCEPT<br>
#### The power flow problem is framed as a set of non-linear algebraic equations. These equations can further be solved by an iterative algorithm by approximating the solution. 
#### The iteration is repeated till the convergence criteria is satisfied. 
#### This decoupling method is a fast, simple and reliable algorithm. The faster computations are a result of sparsity feature of admittance matrix which minimizes the computer memory requirements. It is as accurate as the N-R method.
#### The main advantage in using FDLF method for power flow is that, it has short computation time for large power system which is achieved by reduced size of Jacobian matrix of the Newton Raphson method of power flow analysis [6]. 
#### The input for load flow problem are line parameters and bus data. And the output will be the parameters (Magnitude of Voltage, Phase angle of Voltage, Real Power and Reactive Power) associated with each bus depending on its nature.




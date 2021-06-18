### INTRODUCTION<br>
#### Power flow analysis is the fundamental study to perform for both planning and operational phases of a power system. 
#### The load flow analysis is carried out to analyze the steady state operation of the power system which involves the determination of the bus voltages, bus angles, real power, reactive power and the power flows for any given power system network [4]. 
#### Power flow analysis helps us to analyze the following:
1. For the continuous monitoring of the current status of the power system.
2. For planning and extending the existing power system to meet the increasing demand of the electrical network.
#### The load flow solution is also used to know the initial conditions of the system when the transient behavior of the system is to be studied.

<br>

### CONCEPT<br>
#### The load flow or power flow analysis can be carried out by the following methods: 
1. Gauss-Seidel method
2. Newton-Raphson method 
3. Fast-decoupled method
#### The power flow problem is framed as a set of non-linear algebraic equations. These equations can further be solved by an iterative algorithm by approximating the solution. 
#### The iteration is repeated till the convergence criteria is satisfied. The Newton Raphson method takes less iteration for the convergence compared to Gauss Seidel method. 
#### The demerits of using the Newton Raphson method for power flow is that, it takes more memory requirement but the results are accurate [6].
#### The input for load flow problem are line parameters and bus data. And the output will be the parameters (Magnitude of Voltage, Phase angle of Voltage, Real Power and Reactive Power) associated with each bus depending on its nature.
#### The main advantage in using Newton Raphson is that it has quadratic convergence characteristics. Hence the convergence is very fast. 

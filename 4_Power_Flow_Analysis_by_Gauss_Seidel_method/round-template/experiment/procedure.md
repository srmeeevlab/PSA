1. After going through the theory and pretest, click the "Simulation" tab<br>
2. The user has to enter the Network and line parameters.
    * Number of buses
    * Number of PV buses (including slack bus)
    * Number of PQ buses
    * Number of transmission lines
    * Number of transformers
    * Id of slack bus
    * Maximum number of iterations
    * Convergence tolerance
    * Base MVA
    * Acceleration factor

    ![Procedure 2, Explanation image](images/Exp4_Step1.png)
3. Click Next button.
![Procedure 3, Explanation image](images/Exp4_Step2.png)
4. Enter the values in the following section
    1. PV bus data
        * Id number of the bus
        * Active power generated
        * Reactive power demand
        * Upper limit of reactive power generation
        * Lower limit of reactive power generation
        * Voltage magnitude in p.u.
        * Angle of voltage in degree

        ![Procedure 4.1, Explanation image](images/Exp4_Step3.png)
    2. PQ bus data
        * Id number of the bus
        * Active power demand
        * Reactive power demand
        * Assumed voltage magnitude in p.u
        * Angle of voltage

        ![Procedure 4.2, Explanation image](images/Exp4_Step4.png)
    3. Transmission line data
        * Id number of the line
        * Id number of the sending end bus
        * Id number of the receiving end bus
        * Resistance of the line in per unit
        * Reactance of the line in per unit
        * Half line charging susceptance in per unit
        
        ![Procedure 4.3, Explanation image](images/Exp4_Step5.png)
    4. Transformer data
        * Id number of the transformer
        * Id number of the tap side bus
        * Id number of the receiving end bus
        * Resistance of the line in per unit
        * Reactance of the line in per unit
        * Off nominal tap ratio in per unit
        
        ![Procedure 4.4, Explanation image](images/Exp4_Step6.png)
5. Click on Run power flow analysis.
![Procedure 5, Explanation image](images/Exp4_Step7.png)
6. To display Ybus click the Display Ybus, note down the result.
![Procedure 6,Explanation image](images/Exp4_Step8.png)
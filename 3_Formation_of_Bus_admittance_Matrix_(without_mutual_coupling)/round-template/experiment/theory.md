### INTRODUCTION<br>
#### The bus admittance matrix contains information about the transmission system in terms of admittance values. 
#### It is also represented as Ybus, and it is the N x N matrix, where N is equal to the number of buses in the given network. 
#### The bus admittance matrix is useful for load flow analysis of a Power System.

<br>

### CONCEPT<br>
#### The advantages of the bus admittance matrix are as follows [5]:
1. The bus admittance matrix computed with the help of direct inspection method is very easy for the user and the user can also do the modification when required.
2. The bus admittance matrix is symmetrical matrix.
3. The bus admittance matrix is the sparse matrix and that’s why the computer memory requirement is less.

#### For a 3 bus power system network, the Y bus is represented as  
![Experiment 3, Ybus Equation](images/Exp3_Eqn1.png)
#### The above Y bus matrix of a power system network containing three buses, where the leading diagonal elements i.e., y11, y22, y33 are called as self-admittance. 
#### All the off diagonal elements i.e., y12, y13, y21, y23, y31, y32 are called as mutual-admittance. 

#### The following rules to be followed for the formation of the bus admittance matrix [6]:
1. The diagonal elements Yii equals the sum of the admittances directly connected to the bus i.
2. The off diagonal element Yij equals the negative of the admittances connected between buses i and j. If there is no element between the buses i and j then Yij equals to zero.



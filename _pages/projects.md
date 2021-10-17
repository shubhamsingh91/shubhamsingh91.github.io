---
layout: page
title: projects
permalink: /projects/
description: 
nav: true
horizontal: true
---

## 1. Analytical Partial Derivatives of Rigid Body Systems

<div id="qr" style="display:inline-block; min-width:2.2cm; height:7cm; align: center;vertical-align: middle;" >
    <div class="row">
        <div class="column">
            <img src="/assets/img/DDP_images/arxiv1.png" style="height:6cm;" class="center">
             <figcaption>  CPU Runtime for Floating Base Robots</figcaption>
        </div>
        <div class="column">
            <img src="/assets/img/DDP_images/arxiv2.png" style="height:6cm;" class="center">
             <figcaption>  CPU Runtime for serial/branched chains</figcaption>
        </div>
    </div>
</div>

<div style="display:flex">
     <div style="flex:1;padding-right:5px;">
         <img src="/assets/img/DDP_images/arxiv1.png" style="height:6cm;" class="center">
             <figcaption>  CPU Runtime for Floating Base Robots</figcaption>     </div>
     <div style="flex:1;padding-left:5px;">
        <img src="/assets/img/DDP_images/arxiv2.png" style="height:6cm;" class="center">
           <figcaption>  CPU Runtime for serial/branched chains</figcaption>     </div>
</div>

<div style="display:inline-block;vertical-align: middle;">

 An essential need for many model-based robot control algorithms is the ability to quickly and accurately compute partial derivatives of the equations of motion. State of the art approaches to this problem often use analytical methods based on the chain rule applied to existing dynamics algorithms. Although these methods are an improvement over finite differences in terms of accuracy, they are not always the most efficient. In this paper, we contribute new closed-form expressions for the first-order partial derivatives of inverse dynamics, leading to a recursive algorithm. The algorithm is benchmarked against chain-rule approaches in Fortran and against an existing algorithm from the Pinocchio library in C++. Tests consider computing the partial derivatives of inverse and forward dynamics for robots ranging from kinematic chains to humanoids and quadrupeds. Compared to the previous open-source Pinocchio implementation, our new analytical results uncover a key computational restructuring that enables efficiency gains. Speedups of up to 1.4x are reported for calculating the partial derivatives of inverse dynamics for the 50-dof Talos humanoid.
</div>

 [Code](https://github.com/shubhamsingh91/pinocchio) , [Paper](https://arxiv.org/abs/2105.05102)
 
<br>
<br>

## 2. Differential Dynamic Programming for Rigid Body Systems
<div id="qr" style="display:inline-block; min-width:2.2cm; height:6cm; align: center;vertical-align: middle;" >
    <div class="row">
        <div class="column">
            <img src="/assets/img/DDP_images/cartpole.gif" style="height:5cm;">
            <figcaption>Cart-Pole System</figcaption>
        </div>
        <div class="column">
            <img src="/assets/img/DDP_images/pendu1.gif" style="height:5cm;">
            <figcaption>Underactuated Pendu-bot control using DDP </figcaption>
        </div>
        <div class="column">
            <img src="/assets/img/DDP_images/pendu2.gif" style="height:5cm;">
        </div>
    </div>
</div>
<div style="display:inline-block;vertical-align: middle;">

 Multi Shooting Differential Dynamic Programming [MDDP](https://www.sciencedirect.com/science/article/pii/S0094576519314705)
 algorithm is benchmarked for legged robotic models like the underactuated pendubot and the cart-pole system. Experiments are done to adjust the MDDP tuning parameters and safeguard settings for the feedback matrices B, C, and D. It was found that the safeguarding multipliers are sensitive to the problem type, and can range from 0.1 to 100,000.

</div>


<br>
<br>

## 3. TOWR for Urban Environments



<div id="qr" style="display:inline-block; min-width:2.2cm; height:7cm; align: center;vertical-align: middle;" >
    <div class="row">
        <div class="column">
            <img src="/assets/img/TOWR_images/turns.gif" style="height:6cm;">
        </div>
    </div>
</div>
<div style="display:inline-block;vertical-align: middle;">

This project is aimed at simulating the behavior of quadrupeds to move in urban environments (hallways, buildings, turns, etc.) The popular TOWR (Trajectory Optimizer for Walking Robots) library is used to implement obstacle avoidance constrained motion for quadrupeds. A number of constraints are implemented on the COM and legs of the quadruped to avoid cylindrical obstacles, make sharp turns, and reach a target. Depending on the target and obstacle positions, the quadruped chooses an optimal trajectory to reach in a given time. The entire coding framework is based on the IPOPT framework written in C++.

</div>

[Code](https://github.com/shubhamsingh91/ASE_389proj) ,      [Slides](https://docs.google.com/presentation/d/1Kq6bykrTViuv7eVQTOppSFoD8zX2M3X8gUIvukkM-2Q/edit#slide=id.p1)
<br>
<br>

## 4. Trust Region Method Based on Cholesky Decomposition


Second-order optimization methods often use the Levenberg-Marquardt method to decide the step length. To improve the step length selection criteria, in this project, a trust region method based on Cholesky Decomposition used for second-order optimization algorithms is implemented. In the end, suggestions on the method are mentioned to use it for high degree-of-freedom systems like legged robots. This method is key in accelerating the use of the full second-order method for optimization-based robotics.

[Slides](https://utexas.app.box.com/s/bccafh8wlntmo6qg7zzdijjgbtiy2qn7)
<br>
<br>


## 5. Collaborative Air Autonomy- System of Systems



<div id="qr" style="display:inline-block; min-width:2.2cm; height:7cm; align: center;vertical-align: middle;" >
    <div class="row">
        <div class="column">
            <img src="/assets/img/DDP_images/sos.png" style="height:6cm;">
              <figcaption>ABM Simulation Space </figcaption>
        </div>
    </div>
</div>
<div style="display:inline-block;vertical-align: middle;">

The implementation of a collaborative air autonomy system of systems (SoS) on the Hoosier National Forest in Southern Indiana provides an effective means to combat fire threats. This study explores how to utilize air autonomy systems (UAVs) and ground-based systems (lookout towers and ground support vehicles) to detect forest fires more efficiently than isolated constituent systems. In order to support this analysis, an SoS was created through definition, abstraction, and implementation phases, including a research question motivated by the operational context, status quo, and barriers. The agent-based modeling (ABM) method was chosen to simulate the start and spreading of a forest fire and how the proposed systems take action against the fires. Before building the ABM of the targeted SoS, a paper model was developed to represent the real-world situation. The model was used to translate real-world behaviors into a MATLAB program. From the simulation, the two hypotheses formed were tested and a trade-space analysis was completed contrasting the response time. Performance Index) to the cost of implementation for the suggested architecture. This trade study revealed that the best balance between cost and performance was a system based on multiple watchtowers with medium ranges with UAV speed improvements as a primary investment.

</div>

 [Slides](https://utexas.app.box.com/file/868204735145?s=cwhaqp1qgtnvobqoxv54cpnjwg433s58)
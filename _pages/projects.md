---
layout: page
title: projects
permalink: /projects/
description: Under Construction!
nav: true
horizontal: true
---

## 1. Analytical Partial Derivatives of Rigid Body Systems
        some description here.


## 2. Differential Dynamic Programming for Rigid Body Systems
<div id="qr" style="display:inline-block; min-width:2.2cm; height:7cm; align: center;vertical-align: middle;" >
    <div class="row">
        <div class="column">
            <img src="/assets/img/DDP_images/cartpole.gif" style="height:5cm;">
        </div>
        <div class="column">
            <img src="/assets/img/DDP_images/pendu1.gif" style="height:5cm;">
        </div>
        <div class="column">
            <img src="/assets/img/DDP_images/pendu2.gif" style="height:5cm;">
        </div>
    </div>
</div>
<div style="display:inline-block;vertical-align: middle;">

Multi Shooting Differential Dynamic Programming [MDDP](https://www.sciencedirect.com/science/article/pii/S0094576519314705)
 algorithm is benchmarked for legged robotic models like the underactuated pendubot and the cart-pole system. Experiments are done to adjust the MDDP tuning parameters and safeguard settings for the feedback matrices B,C, and D. It was found that the safeguarding multipliers are sensitive to the problem type, and can range from 0.1 to 100,000.
 
</div>




## 3. TOWR for Urban Environments



<div id="qr" style="display:inline-block; min-width:2.2cm; height:7cm; align: center;vertical-align: middle;" >
    <div class="row">
        <div class="column">
            <img src="/assets/img/TOWR_images/turns.gif" style="height:6cm;">
        </div>
        <div class="column">
            <img src="/assets/img/TOWR_images/probb2.gif" style="height:6cm;">
        </div>
    </div>
</div>
<div style="display:inline-block;vertical-align: middle;">

This project is aimed at simulating the behavior of quadrupeds to move in urban environments (hallways, buildings, turns, etc.) The popular TOWR (Trajectory Optimizer for Walking Robots) library is used to implement obstacle avoidance constrained motion for quadrupeds. A number of constraints are implemented on the COM and legs of the quadruped to avoid cylindrical obstacles, make sharp turns, and reach a target. Depending on the target and obstacle positions, the quadruped chooses an optimal trajectory to reach in a given time. The entire coding framework is based on the IPOPT framework written in C++.

</div>

[Code](https://github.com/shubhamsingh91/ASE_389proj) ,      [Slides](https://docs.google.com/presentation/d/1Kq6bykrTViuv7eVQTOppSFoD8zX2M3X8gUIvukkM-2Q/edit#slide=id.p1)

## 4. Trust Region Method Based on Cholesky Decomposition


Second-order optimization methods often use the Levenberg-Marquardt method to decide the step length. To improve the step length selection criteria, in this project, a trust region method based on Cholesky Decomposition used for second-order optimization algorithms is implemented. In the end, suggestions on the method are mentioned to use it for high degree-of-freedom systems like legged robots. This method is key in accelerating the use of the full second-order method for optimization-based robotics.

[Slides](https://utexas.app.box.com/s/bccafh8wlntmo6qg7zzdijjgbtiy2qn7)
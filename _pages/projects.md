---
layout: page
title: projects
permalink: /projects/
description:
nav: true
nav_order: 2
---

## Deployment case studies

### 1. Apollo humanoid release integration

**Context:** [Apollo](https://apptronik.com/apollo) is Apptronik's general-purpose humanoid robot platform. My work sits in the legged controls stack, where controller behavior has to survive the transition from simulation and subsystem tests to an integrated robot operating under release pressure.

**My role:** I worked on whole-body MPC controller integration, state estimation, whole-body motion planning, teleoperation-related validation, and on-robot hardware debugging across the integrated stack.

**Deployment constraints:** Release work required fast iteration across software, hardware, application engineering, and systems teams. The main challenge was not only whether the controller worked in isolation, but whether the robot behavior remained valid when perception, teleop, hardware, and demo workflows were exercised together.

**Outcome:** Supported public-release integration and live demo readiness by validating controller behavior on hardware, debugging integration issues in real time, and helping de-risk customer-facing robot demonstrations.

**Stack:** Whole-body MPC, state estimation, C++, CasADi/codegen, robot hardware validation, Git.

<br>

### 2. Moonwalkers product deployment at Shift Robotics

**Context:** Moonwalkers are robotic mobility devices shipped to end users by [Shift Robotics](https://shiftrobotics.io/products/moonwalkers). The control software has to feel intuitive to first-time users while remaining reliable on deployed hardware.

<div class="text-center">
  <img src="/assets/img/moonwalkers-deployment.jpeg" alt="Shubham at a Moonwalkers deployment demo" class="img-fluid rounded z-depth-1" style="max-height: 520px;">
  <figcaption>Moonwalkers deployment demo at CES 2024.</figcaption>
</div>

<br>

**My role:** I owned gait control and sensing software in [Shift OS](https://shiftrobotics.io/blogs/blog/shiftos-2-0), including calibration/training workflows and gait sensing improvements driven by user feedback.

**Deployment constraints:** The product had to work across different users, walking styles, environments, demo conditions, and hardware units. Field feedback mattered because small sensing or calibration issues directly affected user trust.

**Outcome:** Shipped user-facing control improvements documented in the [Shift OS 2.0 release notes](https://help.shiftrobotics.io/en-US/shiftos-20-release-notes-401579), improved gait sensing intuitiveness through field testing, supported live demos at CES 2024 and university campuses, and helped troubleshoot deployed hardware/software issues in real time.

**Stack:** Classical control, estimation, sensor fusion, biomechanics, embedded systems, C/C++, Python, hardware troubleshooting.

<br>

### 3. Contact-aware MPC hardware validation at Flexiv Robotics

**Context:** During my internship at Flexiv Robotics, I worked on validating a contact-aware MPC force controller for a 7-DoF manipulator.

**My role:** I bridged simulation and hardware validation, connecting PyBullet-based development to a real robot control workflow through LCM communication.

**Deployment constraints:** Contact-rich manipulation required validating controller behavior beyond simulation, with attention to timing, force response, and consistency between the model and hardware behavior.

**Outcome:** Validated the controller across simulation and hardware, helping close the gap between algorithm development and robot execution.

**Stack:** MPC, trajectory optimization, PyBullet, LCM, C++, Python.

<br>

## Research and technical projects

## 1. Analytical Second-Order Derivatives vs. CasADi for Whole-Body MPC (2026)


<div style="display:flex">
     <div style="flex:1;padding-right:5px;">
         <img src="/assets/img/rbdso_runtime.png" style="height:7.5cm;" class="center">
             <figcaption> Per-call cost on the B2+Z1 whole body (n<sub>v</sub>=25): the analytical Pinocchio binding matches or beats compiled CasADi on the <i>same</i> quantity — 1.9× (first-order) and 1.2× (second-order), with no <code>ca.Callback</code> </figcaption>
    </div>
</div>

<br>

<div style="display:inline-block;vertical-align: middle;">

A whole-body MPC tick is dominated by dynamics derivatives: on a Unitree B2+Z1 (quadruped + 6-DoF arm; n<sub>q</sub>=26 / n<sub>v</sub>=25) the 14-node Fatrop OCP solves in ≈59 ms, ≈80% of it spent on derivatives. I compared the two ways to get them — CasADi auto-diff + code generation vs the closed-form analytical RBD algorithm — using Molnar et&nbsp;al.'s whole-body MPC — the <i>same model, RNEA formulation, and code</i> — swapping only the derivative backend, on the <i>same quantity</i> (the full second-order tensors, validated to 1e−15) and at the same Python-binding level (no <code>ca.Callback</code>).
<br><br>
The analytical backend is faster per call <b>and</b> far lighter to build: it generates no C, compiles nothing, and needs no compiler memory, while CasADi needs 8.83&nbsp;MB of generated C and 1.40&nbsp;GB of peak RAM for a single second-order function (and OOMs at 32&nbsp;GB for heavier models). The method is our analytical second-order RBD derivatives algorithm (paper below); wiring it into the live solver — a compiled, non-callback integration — is the remaining step.
 <br>
   <br>
  Skills used: C++, Python, Pinocchio, CasADi, Whole-Body MPC, Rigid-Body Dynamics, Spatial Vector Algebra
</div>

<div style="display:flex">
     <div style="flex:1;">
        <img src="/assets/img/rbdso_wall.png" style="height:5.5cm;" class="center">
           <figcaption> Offline build cost of the second-order derivatives: analytical pays zero, while CasADi needs 8.83 MB of generated C, ≈63 s of compilation, and 1.40 GB of peak RAM (OOM at 32 GB for heavier models) </figcaption>
     </div>
</div>

Measured, analytical vs CasADi (B2+Z1, n<sub>v</sub>=25), same quantity:

| quantity | CasADi | analytical |
|:--|:--:|:--:|
| 2nd-order derivative, per call | 150 µs | **129 µs** |
| 1st-order derivative, per call | 49 µs | **26 µs** |
| offline build, 2nd-order | 8.83 MB C, 1.4 GB RAM | **0** |

<div style="display:flex; align-items:center; gap:14px; margin-top:6px;">
  <a href="/assets/pdf/rbdso_wbmpc_benchmark.pdf"><img src="/assets/img/rbdso_paper.png" style="height:6.5cm; border:1px solid #ccc;"></a>
  <figcaption> 2-page technical note (PDF): the full methodology, the measurement traps avoided, results, and references. </figcaption>
</div>

 **MPC** (Molnar et&nbsp;al., RA-L): [paper](https://arxiv.org/abs/2511.19709) · [code](https://github.com/lukasmolnar/wb-mpc-locoman)  —  **Analytical derivatives** (Singh et&nbsp;al.): [paper](https://arxiv.org/abs/2307.12606) · [pinocchio fork](https://github.com/shubhamsingh91/pinocchio)  —  [Technical note (PDF)](/assets/pdf/rbdso_wbmpc_benchmark.pdf)

<br>
<br>

## 2. Second-Order DDP via the modRNEA contraction (2026)


<div style="display:flex">
     <div style="flex:1;padding-right:5px;">
         <img src="/assets/img/soddp_panda.gif" style="height:7cm;" class="center">
             <figcaption> SO-DDP solving a reach on the 7-DoF Franka Panda (rendered in PyBullet) </figcaption>
    </div>
     <div style="flex:1;padding-left:5px;">
        <img src="/assets/img/soddp_conv.png" style="height:7cm;" class="center">
           <figcaption> Local convergence: SO-DDP is super-linear / quadratic, while first-order FDDP is linear (a straight line on the semilog axis) </figcaption>
     </div>
</div>

<br>

<div style="display:inline-block;vertical-align: middle;">

<b>The problem.</b> Trajectory optimization is posed as a discrete optimal control problem (OCP): over a horizon of T steps, pick the joint torques that minimize a sum of running costs plus a terminal cost, subject to the robot's nonlinear forward dynamics. For a reaching task the running cost regularizes the state and the controls, while the terminal cost drives the end-effector to a target. Differential Dynamic Programming (DDP) solves this by alternating a backward Riccati-like sweep, which builds a local feedback policy, with a forward rollout.
<br><br>
<b>First vs. second order.</b> The backward sweep needs the value-function Hessian, which contains the second derivative of the dynamics, F<sub>xx</sub>, contracted with the value gradient. The standard solvers (iLQR / FDDP) <i>drop</i> this term &mdash; the Gauss&ndash;Newton approximation &mdash; so they are first-order and converge linearly. Keeping it gives full second-order DDP, which converges <i>quadratically</i> near the optimum; but forming F<sub>xx</sub> is an O(n&sup3;) third-order tensor at every knot, long considered too expensive.
<br><br>
<b>The modRNEA contraction.</b> DDP only needs the Hessian <i>contracted with the value gradient</i> (a costate), not the full tensor. The modified-RNEA second-order algorithm computes this costate-contracted directional derivative in O(n&sup2;), with no 3D tensor. I ported it onto Pinocchio 3.2 (finite-difference verified to ~1e-6) and built a second-order solver (SolverSODDP) in Crocoddyl that injects the contracted Hessian blocks directly into the backward pass.
<br><br>
<b>Quasi-Newton amortization.</b> Even at O(n&sup2;), recomputing the second-order term every iteration costs roughly twice a first-order iteration. The quasi-Newton scheme (Singh et al., Humanoids 2023) recomputes it only every <i>p</i> iterations (here p = 5) and reuses the cached blocks in between, cutting the per-iteration overhead to about +25% while preserving the convergence benefit.
<br><br>
<b>Results.</b> Benchmarked on a 7-DoF iiwa reach (the same solver runs on the Franka Panda shown above). SO-DDP reaches the <i>same</i> optimum as FDDP but converges quadratically: to a 1e-12 stopping tolerance, FDDP needs 57 iterations while SO-DDP needs 22 (full) or 25 (quasi-Newton), running 1.6&ndash;1.85&times; faster in wall-clock &mdash; with the advantage widening as the problem is solved more tightly. The second-order benefit is largest on ill-conditioned problems, where the Gauss&ndash;Newton model is poorest.
 <br>
   <br>
  Skills used: C++, Pinocchio, Crocoddyl, Differential Dynamic Programming, Spatial Vector Algebra
</div>

<div style="display:flex">
     <div style="flex:1;">
        <img src="/assets/img/soddp_iters_runtime.png" style="height:6.5cm;" class="center">
           <figcaption> Iterations and wall-clock vs. stopping tolerance (7-DoF iiwa): SO-DDP and its quasi-Newton variant both beat first-order FDDP, and the gap widens at tighter tolerances </figcaption>
     </div>
</div>

 [Code](https://github.com/shubhamsingh91/pinocchio)

<br>
<br>


## 3. Operational Space Control for a 7-DOF Franka Panda Arm (2026)


<div style="display:flex">
     <div style="flex:1;padding-right:5px;">
         <img src="/assets/img/osc_demo.gif" style="height:7cm;" class="center">
             <figcaption> OSC task-space tracking with null-space posture control</figcaption>
    </div>
</div>

<br>

<div style="display:inline-block;vertical-align: middle;">

A from-scratch implementation of Khatib's Operational Space Control (OSC) formulation for a 7-DOF Franka Panda arm in PyBullet. The controller features task-space PD control with feedforward acceleration, a damped pseudo-inverse for singularity robustness, and null-space posture control to prevent elbow drift. A minimum-jerk trajectory generator provides smooth reference tracking. The system mirrors a real robot control stack with a multi-rate loop: 1 kHz for OSC torque computation and physics, 200 Hz for trajectory updates, and 5 Hz for goal input. Dynamics (mass matrix, Coriolis, Jacobians) are computed via Pinocchio.
 <br>
   <br>
  Skills used: Python, PyBullet, Pinocchio, Operational Space Control, Trajectory Optimization
</div>

 [Code](https://github.com/shubhamsingh91/osc_control)

<br>
<br>

## 4. Multi-Shooting DDP optimization for a for a 7-DoF Quadruped using Quasi-Newton (2020-2023)


<div style="display:flex">
     <div style="flex:1;padding-right:5px;">
         <img src="/assets/img/DDP_images/9phase.gif" style="height:7cm;" class="center">
             <figcaption> 9-phase Double-Gait trajectory for a 7-DoF planar quadruped</figcaption>
    </div>
     <div style="flex:1;padding-left:5px;">
        <img src="/assets/img/DDP_images/torque9phase.gif" style="height:7cm;" class="center">
           <figcaption>  Torque history for the 9-phase trajectory</figcaption>
     </div>
</div>

<br>

<div style="display:inline-block;vertical-align: middle;">

Differential Dynamic Programming (DDP) is a popular technique used to generate motion for dynamic-legged robots in the recent past. However, in most cases, only the first-order partial derivatives of the underlying dynamics are used, resulting in the iLQR approach. Neglecting the second-order terms often slows down the convergence rate compared to full DDP. Multi-Shooting is another popular technique to improve robustness, especially if the dynamics are highly non-linear. In this work, we consider Multi-Shooting DDP for trajectory optimization of a bounding gait for a simplified quadruped model. As the main contribution, we develop Second-Order analytical partial derivatives of the rigid-body contact dynamics, extending our previous results for fixed/floating base models with multi-DoF joints. Finally, we show the benefits of a novel Quasi-Newton method for approximating second-order derivatives of the dynamics, leading to order-of-magnitude speedups in the
convergence compared to the full DDP method.
 <br>
   <br>
  Skills used: C++, Fortran, Optimization, Spatial Vector Algebra
</div>

 [Code](https://github.com/shubhamsingh91/spatial_v2_extended) , [Paper](https://arxiv.org/abs/2307.12606)

<br>
<br>

## 5. Analytical Partial Derivatives of Rigid Body Systems (2020-2023)


<div style="display:flex">
     <div style="flex:1;padding-right:5px;">
         <img src="/assets/img/DDP_images/arxiv1.png" style="height:7cm;" class="center">
             <figcaption>  CPU Runtime for Floating Base Robots</figcaption>
    </div>
     <div style="flex:1;padding-left:5px;">
        <img src="/assets/img/DDP_images/arxiv2.png" style="height:7cm;" class="center">
           <figcaption>  CPU Runtime for serial/branched chains</figcaption>
     </div>
</div>
<br>

<div style="display:inline-block;vertical-align: middle;">

 An essential need for many model-based robot control algorithms is the ability to quickly and accurately compute partial derivatives of the equations of motion. State of the art approaches to this problem often use analytical methods based on the chain rule applied to existing dynamics algorithms. Although these methods are an improvement over finite differences in terms of accuracy, they are not always the most efficient. In this paper, we contribute new closed-form expressions for the first-order partial derivatives of inverse dynamics, leading to a recursive algorithm. The algorithm is benchmarked against chain-rule approaches in Fortran and against an existing algorithm from the Pinocchio library in C++. Tests consider computing the partial derivatives of inverse and forward dynamics for robots ranging from kinematic chains to humanoids and quadrupeds. Compared to the previous open-source Pinocchio implementation, our new analytical results uncover a key computational restructuring that enables efficiency gains. Speedups of up to 1.4x are reported for calculating the partial derivatives of inverse dynamics for the 50-dof Talos humanoid.
 <br>
   <br>
  Skills used: C++, Fortran, Optimization, Spatial Vector Algebra
</div>

 [Code](https://github.com/shubhamsingh91/pinocchio) , [Paper](https://arxiv.org/abs/2105.05102)

<br>
<br>

## 6. Differential Dynamic Programming for Rigid Body Systems (2018-2023)


<div style="display:flex">
     <div style="flex:1;padding-right:5px;">
            <img src="/assets/img/DDP_images/cartpole.gif" style="height:5cm;">
            <figcaption>Cart-Pole System</figcaption>
      </div>
     <div style="flex:1;padding-left:5px;">
            <img src="/assets/img/DDP_images/pendu1.gif" style="height:5cm;">
            <figcaption>Pendu-bot control (with only &tau; <sub>1</sub>) using DDP </figcaption>
      </div>
   <div style="flex:1;padding-left:5px;">
            <img src="/assets/img/DDP_images/pendu2.gif" style="height:5cm;">
            <figcaption>Pendu-bot control (with only &tau; <sub>2</sub>) using DDP </figcaption>
      </div>
</div>
<br>

<div style="display:inline-block;vertical-align: middle;">

 <a href="https://www.sciencedirect.com/science/article/pii/S0094576519314705"> Multi Shooting Differential Dynamic Programming [MDDP]</a> algorithm is benchmarked for legged robotic models like the underactuated pendubot and the cart-pole system. Experiments are done to adjust the MDDP tuning parameters and safeguard settings for the feedback matrices B, C, and D. It is found that the safeguarding multipliers are sensitive to the problem type, and can range from 0.1 to 100,000.
 <br>
 <br>
  Skills used: Fortran, Optimization
</div>


<br>
<br>

## 7. TOWR for Urban Environments (Jan-May 2021)


<div style="display:flex">
     <div style="flex:1;padding-right:5px;">
            <img src="/assets/img/TOWR_images/turns.gif" style="height:6cm;">
            <figcaption>Modified Terrain for Right Turn</figcaption>
      </div>
</div>

<br>

<div style="display:inline-block;vertical-align: middle;">

This project is aimed at simulating the behavior of quadrupeds to move in urban environments (hallways, buildings, turns, etc.) The popular <a href="https://github.com/ethz-adrl/ifopt">TOWR (Trajectory Optimizer for Walking Robots) library</a> is used to implement obstacle avoidance constrained motion for quadrupeds. A number of constraints are implemented on the COM and legs of the quadruped to avoid cylindrical obstacles, make sharp turns, and reach a target. Depending on the target and obstacle positions, the quadruped chooses an optimal trajectory to reach in a given time. The entire coding framework is based on the IPOPT framework written in C++.
 <br>
 <br>
  Skills used: C++, ROS, Optimization, IPOPT
</div>

[Code](https://github.com/shubhamsingh91/ASE_389proj) ,      [Slides](https://docs.google.com/presentation/d/1Kq6bykrTViuv7eVQTOppSFoD8zX2M3X8gUIvukkM-2Q/edit#slide=id.p1)
<br>
<br>

## 8. Trust Region Method Based on Cholesky Decomposition (Aug-Dec 2019)


Second-order optimization methods often use the Levenberg-Marquardt method to decide the step length. To improve the step length selection criteria, in this project, a trust region method based on Cholesky Decomposition used for second-order optimization algorithms is implemented. In the end, suggestions on the method are mentioned to use it for high degree-of-freedom systems like legged robots. This method is key in accelerating the use of the full second-order method for optimization-based robotics.
 <br>
 <br>
  Skills used: MATLAB, Optimization
  <br>
[Slides](https://utexas.app.box.com/s/bccafh8wlntmo6qg7zzdijjgbtiy2qn7)

<br>
<br>

## 9. Methods of Orbit Determination (Jan-May 2018)


The problem of determining the future state of a satellite based on a set of observations is formulated and analyzed. Under the effect of various forces, the orbit of the satellite is estimated for 6 days using an Extended Kalman Filter formulation and is propagated for another day to report the state information in the ECI coordinate frame at the ∆V1 epoch. A high fidelity gravity model (20x20 non-spherical model) along with lunar, solar perturbations, solar radiation pressure, etc. are included for propagating the orbit and develop the analytical expressions required in the estimation process.
 <br>
 <br>
  Skills used: MATLAB, Estimation, Navigation, Astrodynamics
  <br>
[Slides](https://utexas.app.box.com/file/868200772898?s=d2t6fiko0hhd11p4xg2piptrtow1c7w9)
<br>
<br>



## 10. Collaborative Air Autonomy- System of Systems (Aug-Dec 2015)

<div style="display:flex">
     <div style="flex:1;padding-right:5px;">
            <img src="/assets/img/DDP_images/sos.png" style="height:8cm;" >
              <figcaption>ABM Simulation Space </figcaption>
      </div>
</div>
<br>


<div style="display:inline-block;vertical-align: middle;">

The implementation of a collaborative air autonomy system of systems (SoS) on the Hoosier National Forest in Southern Indiana provides an effective means to combat fire threats. This study explores how to utilize air autonomy systems (UAVs) and ground-based systems (lookout towers and ground support vehicles) to detect forest fires more efficiently than isolated constituent systems. In order to support this analysis, an SoS was created through definition, abstraction, and implementation phases, including a research question motivated by the operational context, status quo, and barriers. The agent-based modeling (ABM) method was chosen to simulate the start and spreading of a forest fire and how the proposed systems take action against the fires. Before building the ABM of the targeted SoS, a paper model was developed to represent the real-world situation. The model was used to translate real-world behaviors into a MATLAB program. From the simulation, the two hypotheses formed were tested and a trade-space analysis was completed contrasting the response time. Performance Index) to the cost of implementation for the suggested architecture. This trade study revealed that the best balance between cost and performance was a system based on multiple watchtowers with medium ranges with UAV speed improvements as a primary investment.
 <br>
  <br>
  Skills used: MATLAB, Agent Based Modeling, Systems-of-systems
</div>

 [Slides](https://utexas.app.box.com/file/868204735145?s=cwhaqp1qgtnvobqoxv54cpnjwg433s58)

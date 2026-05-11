---
layout: page
permalink: /sim_diff_bench/
title: diff-sim benchmark
description: A live, reproducible benchmark of 8 differentiable rigid-body simulators (May 2026).
nav: true
nav_order: 4
---

A unified benchmark of **eight** differentiable rigid-body simulators behind a single
process-agnostic adapter contract — comparing forward dynamics, per-step Jacobians,
rollout-cost gradients, learning curves, and usability across the field.

> Source: [github.com/shubhamsingh91/sim_diff](https://github.com/shubhamsingh91/sim_diff)
> &nbsp;·&nbsp;
> Latest report: [report.pdf](/assets/pdf/sim_diff_bench_report.pdf)
> &nbsp;·&nbsp;
> Targeted venue: ICRA 2027.

---

## What's actually being simulated?

All five experiments use one of two robot bodies, chosen to isolate "is the gradient
correct?" from "is contact correct?" The simulations below are produced by Pinocchio's
analytical forward dynamics (the primary RBD ground truth in our methodology); every
adapter is then asked to reproduce the *gradient* of the same rollout cost and is
benchmarked against finite-difference reference.

### Scenario A — Franka Panda under random torques (Exp 1, 2, 5)

A 7-DoF Franka Panda arm starting from the home configuration, with small random
torques applied for 50 steps at $\Delta t = 10^{-3}$ s. We compare each adapter's
gradient $\partial J / \partial u$ against central-difference FD, measure step /
rollout / gradient wall-clock, and time the import + first-step path.

<div style="display:flex; justify-content:center;">
  <img src="/assets/img/sim_diff_bench/demo_panda_random_torques.gif"
       alt="Franka Panda demo rollout" style="max-width:90%; height:auto;"/>
</div>
<div class="caption" style="text-align:center;">
  Exp1 / Exp2 / Exp5 scenario — the Panda arm motion the gradient benchmark is built around.
</div>

### Scenario B — Parametric chain robot (Exp 3, 4)

A planar $N$-link revolute kinematic chain, $N \in \{3, 6, 12, 24, 48\}$. Used for
the scaling sweep (Exp 3) and for the learning experiment (Exp 4 on $N=3$). Same
torques scale, same dynamics, just more DoFs.

<div style="display:flex; justify-content:center;">
  <img src="/assets/img/sim_diff_bench/demo_chain_random_torques.gif"
       alt="3-DoF chain demo rollout" style="max-width:75%; height:auto;"/>
</div>
<div class="caption" style="text-align:center;">
  Exp3 scenario — chain_3 under random torques. The scaling sweep runs the same
  setup at 6, 12, 24, 48 DoFs.
</div>

### Scenario C — SHAC vs untrained policy on chain_3 (Exp 4)

Same 3-DoF chain, started from a non-trivial pose, controlled by a tanh-MLP policy.
Quadratic cost target is the upright zero state with damped velocity. **Left:** the
untrained random policy lets the chain swing freely. **Right:** after 80 SHAC
iterations (gradient-based, using each adapter's `jacobian_step`), the policy drives
the chain back toward the origin within the horizon.

<div style="display:flex; flex-wrap:wrap; gap:1em; justify-content:center;">
  <div style="flex:1; min-width:280px; max-width:48%;">
    <img src="/assets/img/sim_diff_bench/demo_shac_initial.gif"
         alt="Untrained policy rollout" style="width:100%;"/>
    <div class="caption" style="text-align:center;">
      Untrained policy — initial cost $J \approx 113$.
    </div>
  </div>
  <div style="flex:1; min-width:280px; max-width:48%;">
    <img src="/assets/img/sim_diff_bench/demo_shac_trained.gif"
         alt="SHAC-trained policy rollout" style="width:100%;"/>
    <div class="caption" style="text-align:center;">
      After 80 SHAC iters — final cost $J \approx 13$ (≈9× reduction).
    </div>
  </div>
</div>

---

## Headline results

The figures below are produced by `scripts/run_phase1.py` and live at
`results/phase1/figures/` in the repo. They are updated automatically by each
`./scripts/reproduce.sh` run; the ones below are the most recent autonomous-coding
snapshot.

### Exp 1 — gradient correctness vs central FD on Panda

<div style="display:flex; justify-content:center;">
  <img src="/assets/img/sim_diff_bench/exp1_gradient_correctness.png"
       alt="Exp1 gradient correctness" style="max-width:80%; height:auto;"/>
</div>

Three adapters (Drake AutoDiffXd, JaxSim `jax.grad`, Pinocchio analytical) agree
with FD to one part in $10^{7}$; cosine similarity rounds to 1.0000. MJX cosine
similarity is $-0.13$ on the same problem — a documented sm_120 (RTX 5060) XLA
compile pathology, not an MJX-the-library bug. Newton's gradient is correct on
the chain robot (0.5% rel error vs FD at $\epsilon = 10^{-2}$) but breaks on the
Panda (cosine sim $= 0$, rel error $\sim 10^{30}$) — looks like tape-state
contamination across the FD reference's $\sim 45$ perturbations.

### Exp 2 — wall-clock per call on Panda

<div style="display:flex; gap:1em; justify-content:center; flex-wrap:wrap;">
  <img src="/assets/img/sim_diff_bench/exp2_step_timing.png"
       alt="Exp2 step timing" style="max-width:48%; height:auto;"/>
  <img src="/assets/img/sim_diff_bench/exp2_gradient_timing.png"
       alt="Exp2 gradient timing" style="max-width:48%; height:auto;"/>
</div>

Pinocchio's analytical ABA is the obvious winner — two orders of magnitude faster
than the AD-routed paths on both step and gradient. Drake's `AutoDiffXd` pays a
$2\times$ step-time tax for AD support but is still $50\times$ faster than JaxSim's
JAX-compiled-Python step at this size.

### Exp 3 — scaling with chain DoF count

<div style="display:flex; gap:1em; justify-content:center; flex-wrap:wrap;">
  <img src="/assets/img/sim_diff_bench/exp3_step_scaling_drake_vs_genesis_vs_jaxsim_vs_newton_vs_pinocchio_vs_tds.png"
       alt="Exp3 step scaling" style="max-width:48%; height:auto;"/>
  <img src="/assets/img/sim_diff_bench/exp3_gradient_scaling_drake_vs_genesis_vs_jaxsim_vs_newton_vs_pinocchio_vs_tds.png"
       alt="Exp3 gradient scaling" style="max-width:48%; height:auto;"/>
</div>

Pinocchio's step exponent $b \approx 0.46$ confirms ABA's empirical near-linear cost
in $N$ on small chains. Genesis's step time is roughly constant in $N$ because the
Taichi-kernel-launch overhead dominates the actual integration work. TDS shows mild
super-linear scaling.

### Exp 4 — SHAC (gradient-based) vs CEM (gradient-free)

<div style="display:flex; gap:1em; justify-content:center; flex-wrap:wrap;">
  <img src="/assets/img/sim_diff_bench/exp4_shac_cost_reduction.png"
       alt="Exp4 SHAC cost reduction" style="max-width:48%; height:auto;"/>
  <img src="/assets/img/sim_diff_bench/exp4_cem_cost_reduction.png"
       alt="Exp4 CEM cost reduction" style="max-width:48%; height:auto;"/>
</div>

SHAC's cost-reduction ratio agrees to four digits across three gradient-capable
adapters (Drake, JaxSim, Pinocchio) — confirming the simulator gradient is being
delivered and used identically. CEM is the gradient-free baseline; its slower
reduction is the regime where the gradient advantage becomes visible.

### Exp 5 — usability snapshot

<div style="display:flex; justify-content:center;">
  <img src="/assets/img/sim_diff_bench/exp5_usability.png"
       alt="Exp5 usability" style="max-width:80%; height:auto;"/>
</div>

---

## Adapter matrix (status snapshot)

| Adapter | Forward | Gradient | AD Direction | Notes |
|---|---|---|---|---|
| pinocchio | ok | ok (analytical) | --- | Primary RBD ground truth; fastest (~16 µs/step on Panda); Exp1 cosine = 1.0000 |
| drake | ok | ok (AutoDiffXd) | forward | discrete-time + manual semi-implicit Euler; Exp1 cosine = 1.0000 |
| mjx | ok | failed (jacfwd) | forward | Exp1 cosine sim ≈ −0.13 on Panda (sm_120 XLA compile pathology) |
| jaxsim | ok | ok (jax.grad) | reverse | URDF preprocessor injects jaxsim_base_link anchor; Exp1 cosine = 1.0000 |
| brax | ok | partial (jax.grad) | reverse | MjSpec round-trip; menagerie Panda Exp1/2/5 fail (upstream vmap mismatch); Exp4 SHAC works on chain_3 |
| newton | ok | partial (warp.Tape) | reverse | warp.sim's successor; CPU-pinned (sm_120 GPU path immature); 0.5% rel err on chain, but Exp1 cosine = 0 on Panda (tape contamination, fix tracked) |
| genesis | ok | --- | --- | Gradients via checkpoint API; not exposed through our pure-function contract |
| tds | ok | --- | --- | pip wheel ships double-typed instantiation; CppAD bindings absent |

Phase 3 added floating-base SE(3) support for Pinocchio (with tangent-space Jacobians via `pin.dIntegrate`), a Newton gravity-sign correction, MJX native batched rollouts via `jax.vmap`, and a unified spring-damper drop-and-rest analytic reference for cross-adapter contact validation.

---

## Findings the bench surfaces

1. **MJX on sm_120 (Blackwell)** — `jit_rollout_cost` takes ~60 minutes of XLA
   compilation on the RTX 5060 and produces a gradient with cosine similarity
   $-0.13$ vs FD. Reproducible, isolated, and worth its own paragraph in the paper.
2. **Brax pipeline vs menagerie Panda** — Brax's `generalized.pipeline.init`
   raises `vmap got inconsistent sizes` on the Panda MJCF. Chain models compile
   fine; upstream Brax (deprecated) is unlikely to be fixed.
3. **"Differentiable" simulators whose differentiability isn't reachable from
   Python** — Genesis exposes gradients through a checkpoint-style API that
   doesn't compose with our pure-function `gradient_rollout_cost` contract.
   TDS's pip wheel only ships the plain-`double` instantiation; the CppAD bindings
   exist in-tree but aren't wired into Python. Both are real findings about the
   gap between *labelled* and *practically usable* AD.
4. **Newton gravity sign** — Newton stores gravity as a *signed* scalar along its
   `up_vector`. Passing the positive vector norm (the obvious thing) flipped
   gravity skyward. Caught by the cross-adapter pendulum agreement test.
5. **Newton gradient correct on chain, broken on Panda** — same `warp.Tape`
   code path reproduces FD to 0.5 % relative error on the 3-DoF chain
   ($\epsilon = 10^{-2}$, FP32 noise floor at smaller $\epsilon$) but produces a
   cosine similarity of exactly 0 (i.e. orthogonal noise) on the Panda Exp1.
   Reproducible, isolated to the Panda-sized rollout. Likely tape-state
   contamination across the FD reference's $\sim 45$ perturbations; a
   per-perturbation fresh tape is the obvious next thing to try.

---

## Reproducibility

```bash
git clone https://github.com/shubhamsingh91/sim_diff
cd sim_diff
DOCKER_BUILDKIT=0 docker build -t simdiff-bench:dev -f docker/Dockerfile .
./scripts/reproduce.sh                # writes results/phase1/{exp*.json,figures/*.png,SUMMARY.md}
```

First run ~30 min (clones robot-description repos, builds JIT caches). Subsequent
runs hit the persistent `.cache/` mount and warm JIT caches → ~5 min for the
non-mjx adapters.

To run a single adapter:

```bash
docker run --rm --gpus all -v "$PWD:/workspace" -w /workspace \
    simdiff-bench:dev \
    python scripts/run_phase1.py --output-dir results/phase1 --adapter pinocchio
```

The full source tree, plan, and per-phase status are tracked in
[the repository](https://github.com/shubhamsingh91/sim_diff) (private during
review; tag `phase-3-sprint` marks the state behind the figures above).

---
layout: page
title: TrackerBench
permalink: /trackerbench/
description: A neutral stress-degradation benchmark for released humanoid whole-body motion-tracking policies — do nominal rankings survive shoves, payloads, sensor noise, and latency?
nav: true
nav_order: 6
---

> **Exploratory research, in progress (July 2026).** This page is a live research log. Everything
> below comes from a **pre-registered probe**: kill criteria and thresholds were frozen *before*
> any data was collected, and instrument amendments were logged before the affected data existed.
> Simulation-only (MuJoCo sim2sim), two policy families so far — read as an existence proof, not a
> benchmark release.

<p style="margin-top:-4px;"><a href="/assets/pdf/trackerbench_findings.pdf"><b>📄 Findings report (PDF)</b></a> — <i>TrackerBench: Stress-Testing Released Humanoid Motion-Tracking Policies — probe findings, 2026-07-05.</i></p>

## TL;DR

Humanoid whole-body tracking policies (GMT, TWIST, SONIC, BeyondMimic, …) are ranked by **nominal
tracking precision** — MPJPE under ideal conditions. TrackerBench asks whether that ranking
survives contact with reality's disturbances: **shoves, payload, sensor noise, actuation latency**.

First result, from ~1,120 paired rollouts on a simulated Unitree G1 (two released policies, eight
motions, identical seeded perturbations for both policies in every cell):

- **GMT tracks more precisely than TWIST on all 8 motions** (1.4–2.9 cm vs 1.7–4.1 cm MPJPE) —
  by today's metrics, GMT is simply "better."
- **Under stress the ranking inverts:** in **33 cells** the nominally-worse TWIST survives
  significantly longer — carrying **16 kg** of torso payload through a walk where GMT falls almost
  immediately (survival 1.00 vs 0.15), and walking through **16×** sensor noise that ends GMT.
- **But neither policy is uniformly tougher:** GMT out-survives TWIST under actuation latency and
  some pushes (14 reverse cells). Robustness is **axis-specific** — a single scalar "robustness
  score" would hide exactly the structure that matters.
- The crossovers are **protocol-stable**: identical under two different failure definitions
  (zero flips), seed test–retest agreement 0.88, and measured relative to each policy's own
  re-hosted nominal (controlling the re-hosting confound).

**Takeaway: nominal precision does not predict stress robustness.** The single number every
tracking paper reports hides which policy breaks under what — which is precisely what a deployment
cares about.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/trackerbench/fig1_degradation.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
Stress-degradation curves (median over 8 motions, bands = IQR). Payload and observation-noise
panels show the rank crossover — TWIST (red) holds where GMT (blue) collapses; the latency panel
shows the reverse. Both policies receive identical seeded perturbations in every cell.
</div>

<div class="row mt-3">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/trackerbench/fig3_gaps.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/trackerbench/fig2_nominal.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
Left: paired per-cell survival gaps (blue = nominally-worse TWIST survives longer). Right: nominal
MPJPE — GMT wins on every clip, which is what makes the stress inversion a genuine rank crossover.
</div>

## How it's tested

Each released policy runs on its **authors' own** MuJoCo deploy stack (model, PD gains, observation
pipeline verbatim; the policy is a black box). The harness then injects four frozen stress axes —
pushes (50–400 N), torso payload (2–24 kg), proprioceptive noise (1–16× base), action latency
(20–100 ms) — with randomness seeded per cell so every policy faces the *same* shove directions and
noise draws. Failure is scored post-hoc under **two** termination rules (fell; fell-or-diverged),
and degradation is measured against each policy's own nominal run. Pre-registered gates guard the
two ways this could lie: *no reordering anywhere* (benchmark adds nothing) and *protocol artifact*
(the "signal" is the harness, not the policies). Both kill gates failed to fire.

## Research log

- **2026-07-05 — probe verdict: SURVIVE.** GMT + TWIST, 8 shared clips, 1,120 paired cells.
  33 rank-crossover cells stable under both failure rules; fingerprints axis-specific; instrument
  gates (re-host fidelity d=0.000, axis dynamic range 4/4, seed stability 0.86) all passed.
- **2026-07-04 — probe opened.** Kill criteria frozen before data. One instrument amendment logged
  pre-data: world-frame root error is meaningless for heading-free trackers (GMT discards yaw) —
  divergence is scored in the root frame instead. GMT envelope measured: survives 200 N shoves,
  12 kg payload, 8× noise without a single failure — far tougher than nominal numbers suggest.
- **Next:** third general family (OpenTrack re-host in progress; BeyondMimic blocked — no public
  checkpoint), PBHC/KungfuBot as a per-motion specialist family, terrain + reference-corruption
  axes, neutral clip set, then a public leaderboard.

*Working notes and the full pre-registration live in the project repo; this page tracks headline
results as they land.*

---
layout: page
title: TrackerBench
permalink: /trackerbench/
description: A stress-degradation benchmark for released humanoid motion-tracking policies — paired perturbations, two failure rules, and vulnerability fingerprints that nominal metrics cannot see.
published: false   # PRIVATE — unpublished pending review before release (2026-07-05)
nav: false
nav_order: 6
---

> **Preliminary report (July 2026), simulation-only.** Four policy families integrated so far;
> more in progress. Results below are from ~1,700 paired rollouts on the Unitree G1 in MuJoCo.

<p style="margin-top:-4px;"><a href="/assets/pdf/trackerbench_findings.pdf"><b>📄 Paper-style report (PDF)</b></a> — <i>TrackerBench: Stress-Testing Released Humanoid Motion-Tracking Policies.</i></p>

## What TrackerBench measures

Humanoid tracking policies are ranked by nominal precision — MPJPE under ideal conditions.
TrackerBench measures what deployment actually stresses: each **released checkpoint**, running on
its authors' own simulation deploy stack, is subjected to four perturbation axes with severities
spanning in-distribution to far beyond:

- **Pushes** — horizontal pelvis force $$F \in \{50\ldots400\}$$ N, 0.2 s pulses every 2 s, seeded random directions;
- **Payload** — torso mass $$m \in \{2\ldots24\}$$ kg with consistent inertia scaling $$\mathbf{I}' = \mathbf{I}(1+m/m_0)$$;
- **Observation noise** — Gaussian noise on the policy's proprioceptive inputs only, $$\tilde{o}_c = o_c + \mathcal{N}(0,(\lambda\sigma_c)^2)$$, $$\lambda \in \{1\ldots16\}$$;
- **Action latency** — the control target computed at step $$j$$ applied at step $$j+k$$, $$k \in \{1,2,3,5\}$$ (20–100 ms).

Every stochastic draw is a deterministic function of the evaluation cell (clip, axis, severity,
seed) — **never of the policy** — so all policies face identical shoves and noise, and comparisons
are paired.

## Metrics

**Root-frame tracking error.** With body positions $$x_b$$ and pelvis rotations $$R$$ in rollout
($$a$$) and reference ($$r$$):

$$ e(t) = \frac{1}{|\mathcal{B}|}\sum_{b}\left\| R^{a\top}(x^a_b - x^a_{\text{root}}) - R^{r\top}(x^r_b - x^r_{\text{root}}) \right\|_2 $$

measured in the root frame because several policies are heading-free (no world yaw in their
observations), so world-frame error grows unboundedly even under perfect tracking. MPJPE is the
time-average of $$e(t)$$.

**Two failure rules, one rollout.** Rule A (fall): $$t_A = \inf\{t: z_{\text{pelvis}} < 0.35\,\text{m}\}$$.
Rule B (fall **or** divergence): $$t_B = \min(t_A,\ \inf\{t: e(t) > 0.35\,\text{m}\})$$. Headline
claims must hold under both — a guard against the failure definition driving the result.

**Survival fraction.** $$S = \mathrm{clip}\!\big((t_{\text{fail}} - t_0)/(T - t_0),\,0,\,1\big)$$ —
the fraction of the scored window completed before failure. Degradation is always relative to the
same policy's own unperturbed baseline, removing re-hosting fidelity as a confound.

**Rank crossovers.** For policies $$P, Q$$ with paired per-seed gaps $$d_s = S^P_s - S^Q_s$$, a
cell is a crossover if the *nominally worse* policy wins with
$$\mathrm{median}_s\, d_s > 2\hat{\sigma}(d_s)$$ under **both** rules. Stability is reported as
seed test–retest sign agreement.

## Methods compared

| Policy | Type | DoF | Nominal MPJPE (cm) |
|---|---|---|---|
| **GMT** (arXiv 2506.14770) | generalist | 23 | 1.39 – 2.85 |
| **TWIST** (CoRL 2025) | generalist (teleop) | 23 | 1.67 – 4.12 |
| **PBHC / KungfuBot** (NeurIPS 2025) | per-motion specialist | 23 | 2.28 – 2.63 (own clips) |
| **OpenTrack** (arXiv 2509.13833) | generalist | 29 | excluded — see below |

SONIC, Humanoid-GPT, and Any2Track are being integrated.

## Analysis

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/trackerbench/fig1_degradation.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
Degradation curves (median over 8 shared clips, bands IQR, rule A). Payload and observation noise
reverse the nominal ordering; latency preserves it.
</div>

**Nominal precision does not predict robustness.** GMT tracks better than TWIST on all eight
clips, yet in 33 stress cells TWIST survives significantly longer — through 16 kg payloads that
drop GMT within seconds ($$\Delta S = 0.85$$, zero seed variance) and 16× sensor noise that ends
GMT's rollouts. All 33 crossovers are identical under both failure rules; test–retest agreement is
0.883. Fourteen reverse cells (latency, some pushes) show neither policy dominates.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/trackerbench/fig4_fingerprints.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
Vulnerability fingerprints — the severity at which each family's median survival crosses ½, per
axis. Three families, three failure geometries.
</div>

**Specialists trade robustness for precision.** PBHC tracks extreme kung-fu at 2.3 cm but its push
tolerance collapses at 100 N (survival 1.00 → 0.23) — an order of magnitude below the generalists —
and it degrades at 8× noise, while carrying payload cleanly through 8 kg.

**"Generalist" scope is bounded by the retargeting pipeline.** OpenTrack re-hosts with
bit-identical fidelity and tracks its own reference clips at 11–16 mm — yet falls, unperturbed, on
5 of 8 shared clips of ordinary walking and dancing that came from a different retargeting
pipeline. Its generalization is bounded by its training pipeline's retargeting distribution: a
failure mode invisible to own-clips evaluation, surfaced only by a neutral cross-pipeline
benchmark. Per the pre-registered admission rule it is excluded from head-to-head scoring and
reported as a finding.

## Limitations

Two generalists in the head-to-head so far; sim-to-sim only; the shared clip set originates from
GMT's release (which biases *against* the observed crossovers); three seeds per cell support the
paired sign statistics reported here, and the public release will raise seed counts and adopt
restricted-mean-survival-time aggregation.

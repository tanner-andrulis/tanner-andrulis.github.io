---
layout: ../../layouts/Post.astro
title: "Fast and Fusiest: An Optimal Fusion-Aware Mapper for Accelerator Design"
authors: Tanner Andrulis, Michael Gilbert, Vivienne Sze, Joel S. Emer
venue: Under submission
date: 2026-02-16
categories: [Publications, Mapping, Tools]
links:
  Preprint: https://arxiv.org/abs/2602.15166
---

A low-latency and energy-efficient tensor algebra accelerator design must optimize how data
movement and operations are scheduled (*i.e.*, mapped) in the accelerator architecture. A key
mapping optimization is fusion, meaning holding data on-chip between computation steps in
the workload, which has been shown to reduce energy and latency by reducing expensive
off-chip data movement. However, the optimal fusion choice depends on the workload and
workload shape, and a mapper, which searches for the optimal mapping, can improve energy and
latency significantly. However, prior mappers cannot find optimal mappings with fusion
(*i.e.*, fused mappings) in a feasible runtime because the number of fused mappings to search
increases exponentially with the number of computation steps in the workload.

In this paper, we introduce the Fast and Fusiest Mapper (FFM), a mapper to quickly find
optimal mappings in a comprehensive fused mapspace for tensor algebra workloads. FFM shrinks
the search space by pruning subsets of mappings (*i.e.*, partial mappings) that are shown to
never be a part of optimal mappings, quickly eliminating all suboptimal mappings containing
those partial mappings. Then FFM joins partial mappings to construct optimal fused mappings.
Using FFM, we demonstrate an energy-delay-product (EDP) reduction by up to 1.8× compared to
TransFusion, a state-of-the-art accelerator with hand-optimized fusion. Moreover, we show
that FFM finds mappings orders of magnitude faster (&gt;10,000×) than prior automated mappers
TileFlow and SET, and given the same runtime, reduces EDP by &gt;2×.

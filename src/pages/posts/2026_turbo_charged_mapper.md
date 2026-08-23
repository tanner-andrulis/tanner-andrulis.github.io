---
layout: ../../layouts/Post.astro
title: "The Turbo-Charged Mapper: Fast and Optimal Mapping for Energy-efficient and Low-latency Accelerator Design"
authors: Michael Gilbert, Tanner Andrulis, Vivienne Sze, Joel S. Emer
venue: MICRO 2026
date: 2026-02-16
categories: [Publications, Mapping, Tools]
links:
  Paper: https://arxiv.org/abs/2602.15172
---

The energy and latency of an accelerator running a deep neural network (DNN) depend on how
the computation and data movement are scheduled in the accelerator (*i.e.*, mapping), and
picking an optimal mapping is essential to achieve high-performance accelerators. However,
it is challenging to find mappings that maximize accelerator performance. The space of
mappings is large, and prior works cannot guarantee finding optimal mappings because they
use heuristics or metaheuristics to narrow the search space.

To address this challenge, we propose the Turbo-Charged Mapper (TCM), a fast mapper that
finds optimal mappings. The key to our approach is that we define a new mapping concept
called dataplacement, which, like the prior concept of dataflow, allows for clear analysis
and comparison of mappings. Through it, we identify opportunities to prune redundant and
suboptimal mappings, reducing search space by up to 32 orders of magnitude
(10<sup>37</sup> → 10<sup>5</sup>).

TCM leverages these insights to perform full mapspace searches, making it the first mapper
that can find optimal mappings in feasible runtime. Compared to prior mappers, TCM improves
accelerator energy-delay-product by 1.2&ndash;6.5× while simultaneously reducing mapping
search time by 1000× (5 hours → 17 seconds).

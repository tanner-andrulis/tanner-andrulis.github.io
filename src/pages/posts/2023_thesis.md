---
layout: ../../layouts/Post.astro
title: Efficient, Accurate, and Flexible PIM Inference through Adaptable Low-Resolution Arithmetic!
authors: Tanner Andrulis
venue: MIT Master's Thesis
date: 2023-07-01
categories: [Publications, Compute-In-Memory, Architectures]
links:
  Thesis: https://dspace.mit.edu/handle/1721.1/151461
  Code: https://github.com/mit-emze/raella
  Slides: /posts/2023_thesis/talk.pdf
---

**Master's thesis based on the RAELLA paper.**

Processing-In-Memory (PIM) accelerators have the potential to efficiently run Deep Neural
Network (DNN) inference by reducing costly data movement and by using resistive RAM (ReRAM)
for efficient analog compute. Unfortunately, overall PIM accelerator efficiency and
throughput are limited by area/energy-intensive analog-to-digital converters (ADCs).
Furthermore, existing accelerators that reduce ADC area/energy do so by changing DNN weights
or by using low-resolution ADCs that reduce output fidelity. These approaches harm DNN
accuracy and/or require costly DNN retraining to compensate.

To address these issues, this thesis explores tradeoffs around ADC area/energy and develops
optimizations that can reduce ADC area/energy without retraining DNNs. We use these
optimizations to develop a new PIM accelerator, RAELLA, which can adapt the architecture to
each DNN. RAELLA lowers the resolution of computed analog values by encoding weights to
produce near-zero analog values, adaptively slicing weights for each DNN layer, and
dynamically slicing inputs through speculation and recovery. Low-resolution analog values
allow RAELLA to both use efficient low-resolution ADCs and maintain accuracy without
retraining, all while computing with fewer ADC converts.

Compared to other low-accuracy-loss PIM accelerators, RAELLA increases energy efficiency by
up to 4.9x and throughput by up to 3.3x. Compared to PIM accelerators that cause accuracy
loss and retrain DNNs to recover, RAELLA achieves similar efficiency and throughput without
expensive DNN retraining.

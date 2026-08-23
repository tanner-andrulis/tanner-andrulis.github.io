---
layout: ../../layouts/Post.astro
title: "RAELLA: Reforming the Arithmetic for Efficient, Low-Resolution, and Low-Loss Analog PIM: No Retraining Required!"
authors: Tanner Andrulis, Joel S. Emer, Vivienne Sze
venue: ISCA 2023
date: 2023-06-17
categories: [Publications, Compute-In-Memory, Architectures]
links:
  Paper: https://doi.org/10.1145/3579371.3589062
  Code: https://github.com/mit-emze/raella
  Slides: /posts/2023_raella/talk.pdf
video: https://www.youtube.com/embed/4rsoZGnNFjQ
---

Processing-In-Memory (PIM) accelerators have the potential to efficiently run Deep Neural
Network (DNN) inference by reducing costly data movement and by using resistive RAM (ReRAM)
for efficient analog compute. Unfortunately, overall PIM accelerator efficiency is limited
by energy-intensive analog-to-digital converters (ADCs). Furthermore, existing accelerators
that reduce ADC cost do so by changing DNN weights or by using low-resolution ADCs that
reduce output fidelity. These strategies harm DNN accuracy and/or require costly DNN
retraining to compensate.

To address these issues, we propose the RAELLA architecture. RAELLA adapts the architecture
to each DNN; it lowers the resolution of computed analog values by encoding weights to
produce near-zero analog values, adaptively slicing weights for each DNN layer, and
dynamically slicing inputs through speculation and recovery. Low-resolution analog values
allow RAELLA to both use efficient low-resolution ADCs and maintain accuracy without
retraining, all while computing with fewer ADC converts.

Compared to other low-accuracy-loss PIM accelerators, RAELLA increases energy efficiency by
up to 4.9× and throughput by up to 3.3×. Compared to PIM accelerators that cause accuracy
loss and retrain DNNs to recover, RAELLA achieves similar efficiency and throughput without
expensive DNN retraining.

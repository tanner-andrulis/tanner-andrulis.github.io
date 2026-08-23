---
layout: ../../layouts/Post.astro
title: Modeling Analog-Digital-Converter Energy and Area for Compute-In-Memory Accelerator Design
authors: Tanner Andrulis, Ruicong Chen, Hae-Seung Lee, Joel S. Emer, Vivienne Sze
venue: arXiv preprint
date: 2024-04-09
categories: [Publications, Compute-In-Memory, Tools]
links:
  Paper: https://arxiv.org/abs/2404.06553
  Code: https://github.com/accelergy-project/accelergy-adc-plug-in
---

Analog Compute-in-Memory (CiM) accelerators use analog-digital converters (ADCs) to read
the analog values that they compute. ADCs can consume significant energy and area, so
architecture-level ADC decisions such as ADC resolution or number of ADCs can significantly
impact overall CiM accelerator energy and area. Therefore, modeling how architecture-level
decisions affect ADC energy and area is critical for performing architecture-level design
space exploration of CiM accelerators.

This work presents an open-source architecture-level model to estimate ADC energy and area.
To enable fast design space exploration, the model uses only architecture-level attributes
while abstracting circuit-level details. Our model enables researchers to quickly and
easily model key architecture-level tradeoffs in accelerators that use ADCs.

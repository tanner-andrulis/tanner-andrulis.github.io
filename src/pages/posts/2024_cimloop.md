---
layout: ../../layouts/Post.astro
title: "CiMLoop: A Flexible, Accurate, and Fast Compute-In-Memory Modeling Tool"
authors: Tanner Andrulis, Joel S. Emer, Vivienne Sze
venue: ISPASS 2024
date: 2024-05-07
award: ISPASS 2024 Best Paper Award Winner
categories: [Publications, Compute-In-Memory, Tools]
links:
  Paper: https://arxiv.org/abs/2405.07259
  Code: https://github.com/mit-emze/cimloop
  Slides: /posts/2024_cimloop/talk.pdf
  Website: https://emze.csail.mit.edu/cimloop
---

Compute-In-Memory (CiM) is a promising solution to accelerate Deep Neural Networks (DNNs)
as it can avoid energy-intensive DNN weight movement and use memory arrays to perform
low-energy, high-density computations. These benefits have inspired research across the
CiM stack, but CiM research often focuses on only one level of the stack (*i.e.*, devices,
circuits, architecture, workload, or mapping) or only one design point (*e.g.*, one
fabricated chip). There is a need for a full-stack modeling tool to evaluate design
decisions in the context of full systems (e.g., see how a circuit impacts system energy)
and to perform rapid early-stage exploration of the CiM co-design space.

To address this need, we propose CiMLoop: an open-source tool to model diverse CiM systems
and explore decisions across the CiM stack. CiMLoop introduces **(1)** a flexible
specification that lets users describe, model, and map workloads to both circuits and
architecture, **(2)** an accurate energy model that captures the interaction between DNN
operand values, hardware data representations, and analog/digital values propagated by
circuits, and **(3)** a fast statistical model that can explore the design space
orders-of-magnitude more quickly than other high-accuracy models.

Using CiMLoop, researchers can evaluate design choices at different levels of the CiM
stack, co-design across all levels, fairly compare different implementations, and rapidly
explore the design space.

---
layout: ../../layouts/Post.astro
title: Architectural Evaluation of Processing-In-Memory Systems
authors: Tanner Andrulis, Joel S. Emer, Vivienne Sze
venue: ASPLOS YArch Workshop 2022
date: 2022-03-01
categories: [Talks, Compute-In-Memory, Architectures]
links:
  Workshop: https://web.mit.edu/yarch2022/
---

Presented at the 4th Young Architect Workshop (YArch'22), co-located with ASPLOS 2022.

Processing-In-Memory (PIM) accelerators move compute into memory to cut the high data
movement costs of deep neural networks, but research has largely evaluated devices,
circuits, and architecture in isolation. This talk covered early work on evaluating PIM at
the architecture level, so that an innovation at any level of the stack can be assessed in
the context of a full accelerator. That direction led to
[CiMLoop](/posts/2024_cimloop/).

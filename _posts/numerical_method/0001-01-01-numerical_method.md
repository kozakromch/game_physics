---
title: 1. Численные методы
author: Роман Козак
credential: { Петров Степан }
category: pages
layout: post
disqus: true
---

<script src = "{{site.baseurl}}/assets/scripts/libs/p5.min.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/libs/p5.scribble.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/libs/math.js"></script>

<script src = "{{site.baseurl}}/assets/scripts/common/base_vis.js"> </script>
<script src = "{{site.baseurl}}/assets/scripts/common/sc_grid.js"> </script>
<script src = "{{site.baseurl}}/assets/scripts/common/energy.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/common/main_vis.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/common/color_scheme.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/common/common_vis.js"></script>

<script src = "{{site.baseurl}}/assets/scripts/numerical_method/spring.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/numerical_method/canon.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/numerical_method/3_body.js"></script>

{% include_relative numerical_method/intro.md %}

{% include_relative numerical_method/base_words.md %}

{% include_relative numerical_method/model_problem.md %}

{% include_relative numerical_method/numerical_euler.md %}

{% include_relative numerical_method/symplectic_method.md %}

{% include_relative numerical_method/RK.md %}

{% include_relative numerical_method/summary.md %}

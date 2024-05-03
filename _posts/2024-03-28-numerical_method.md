---
title: Численные методы
author: Роман Козак
credential: {Петров Степан}
category: Jekyll
layout: post
---

<script src = "{{site.baseurl}}/assets/scripts/p5.min.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/math.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/common/base_vis.js"> </script>
<script src = "{{site.baseurl}}/assets/scripts/common/energy.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/common/main_vis.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/numerical_method/spring.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/numerical_method/canon.js"></script>



{% include_relative numerical_method/intro.md %}

{% include_relative numerical_method/model_problem.md %}

{% include_relative numerical_method/numerical_euler.md %}

{% include_relative numerical_method/symplectic_method.md %}

{% include_relative numerical_method/RK.md %}

{% include_relative numerical_method/summary.md %}



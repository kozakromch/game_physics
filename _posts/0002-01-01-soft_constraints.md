---
title: Мягкие ограничения
author: Роман Козак
credential:
category: pages
layout: post
---

<script src = "{{site.baseurl}}/assets/scripts/libs/p5.min.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/libs/p5.scribble.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/libs/math.js"></script>

<script src = "{{site.baseurl}}/assets/scripts/common/base_vis.js"> </script>
<script src = "{{site.baseurl}}/assets/scripts/common/sc_grid.js"> </script>
<script src = "{{site.baseurl}}/assets/scripts/common/main_vis.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/common/color_scheme.js"></script>
<script src = "{{site.baseurl}}/assets/scripts/common/common_vis.js"></script>


<script src = "{{site.baseurl}}/assets/scripts/soft_constraints/soft_ball.js"></script>

## Мягкие ограничения (Soft Constraints)

Часто в играх нужно каким-то образом ограничить движение физических объектов. 
Например, мы хотим сделать рэгдолл, который включается когда персонаж умирает.
Его тело должно быть связано в определенных местах, чтобы оно не разлеталось на части. Каждая часть тела не должна проходить сквозь другие части тела и сквозь стены. Колени не должны сгибаться в обратную сторону.
Мы хотим чтобы плащ героя был связан с его телом, но при этом мог развеваться на ветру.
Или чтобы резиновый шарик не разрушался. 

{% include /templates/include_sketch.html path="soft_constraints/sketch/soft_ball_sketch.js" base_name="soft_ball_sketch" %}

Идейно и не совсем точно, мы можем разделить наши ограничения на жесткие и мягкие.
Это разделение нестрогое и зависит от контекста. Но интуиция здесь достаточно простая. Если мы при симуляции допускаем нарушение ограничения, то это мягкое ограничение, если не допускаем, то жесткое.
Вот например симуляция резиного шарика. Между точками шарика есть мягкие ограничения на расстояние. Визуально очень хорошо что мы допускаем нарушение длины. В рэгдолле же мы не хотим допускать нарушение длины связей между костями. Будет выглядеть странно, если рука персонажа растянется и будет висеть на нитке.

В этот раз я хочу рассказать о том как реализованы мягкие ограничения в Jolt, Box2D и ODE.

Слайды от создателя Box2D Erin Catto : [Soft Constraints](https://box2d.org/files/ErinCatto_SoftConstraints_GDC2011.pdf)


Во первых









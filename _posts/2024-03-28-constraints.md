---
title: Ограничения
author: Роман Козак
credential: { Петров Степан }
category: Jekyll
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


<script src = "{{site.baseurl}}/assets/scripts/constraints/soft_ball.js"></script>

## Ограничения (Constraints)

Часто в играх нужно каким-то образом ограничить движение физических объектов. 
Например, мы хотим сделать рэгдолл, который включается когда персонаж умирает.
Его тело должно быть связано в определенных местах, чтобы оно не разлеталось на части. Каждая часть тела не должна проходить сквозь другие части тела и сквозь стены. Колени не должны сгибаться в обратную сторону.
Мы хотим чтобы плащ героя был связан с его телом, но при этом мог развеваться на ветру.
Или чтобы резиновый шарик не разрушался. 

{% include /templates/include_sketch.html path="constraints/sketch/soft_ball_sketch.js" base_name="soft_ball_sketch" %}


Пока что мы рассматривали только свободное движение объектов. 

Глобально есть два подхода, как можно добавить ограничения:

1. Использовать обобщенные координаты.
2. Добавить уравнения связей и решать их вместе с уравнениями движения.

### Обобщенные координаты





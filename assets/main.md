---
layout: home
title: Главная
permalink: /
---

<div class="container">
  <div class="row">
    <div class="col-sm">
    {% 
    include /templates/home_ref.html 
    path='/numerical_method/phase_space_spring.excalidraw.png' 
    ref='pages/0001-01-01-numerical_method.html'
    name='Численные методы'
    %}
    </div>
    <div class="col-sm">
    {%
    include /templates/home_ref.html
    path='/hard_constraints/main.excalidraw.png'
    ref='pages/0002-01-01-hard_constraints.html'
    name='Жесткие ограничения'
    %}
    </div>
    <div class="col-sm">
    {%
    include /templates/home_ref.html 
    path='/soft_constraints/main.excalidraw.png' 
    ref='pages/0003-01-01-soft_constraints.html'
    name='Мягкие ограничения'
    %}      
    </div>
  </div>
</div>
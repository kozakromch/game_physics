---
layout: home
title: Главная
permalink: /
---
<h3>Математика</h3>

<div class="container">
  <div class="row">
    <div class="col">
    {% 
    include /templates/home_ref.html 
    path='/numerical_method/phase_space_spring.excalidraw.png' 
    ref='pages/0001-01-01-numerical_method.html'
    name='Численные методы'
    %}
    </div>
  </div>
</div>

<h3>Ограничения</h3>
  
<div class="container">
  <div class="row">
    <div class="col">
    {%
    include /templates/home_ref.html
    path='/constraints/main.excalidraw.png'
    ref='pages/0002-01-01-constraints.html'
    name='Ограничения'
    %}
    </div>
    <div class="col">
    {%
    include /templates/home_ref.html
    path='/hitman/main.excalidraw.png'
    ref='pages/0003-01-01-hitman.html'
    name='Метод Hitman 47'
    %}
    </div>
    <div class="col">
    {%
    include /templates/home_ref.html 
    path='/soft_constraints/main.excalidraw.png' 
    ref='pages/0007-01-01-soft_constraints.html'
    name='Мягкие ограничения'
    %}      
    </div>
  </div>
</div>
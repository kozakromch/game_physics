</div>

## Симплектические методы

<div>

Если прочитать определение в википедии симплектических методов, то можно очень сильно удивиться от количества умных слов. Но на самом деле все просто. Симплектические методы это методы численного интегрирования, которые сохраняют объем в фазовом пространстве. Т.е. если мы возьмем кусочек фазового пространства, то он будет оставаться таким же кусочком фазового пространства. Сейчас покажу на примерах.

Вот так выглядит фазовое пространство для пушки
{% include /templates/include_sketch.html path="numerical_method/sketch/forward_phase_canon.js" base_name="forward_phase_canon" %}
{% include /templates/include_sketch.html path="numerical_method/sketch/symplectic_phase_canon.js" base_name="symplectic_phase_canon" %}
</div>

### Semi-implicit Euler

<div>


{% include /templates/include_sketch.html path="numerical_method/sketch/symplectic_euler_canon.js" base_name="symplectic_euler_canon" %}
{% include /templates/include_sketch.html path="numerical_method/sketch/symplectic_euler_spring.js" base_name="symplectic_euler_spring" %}



</div>

### Метод Верле

<div>




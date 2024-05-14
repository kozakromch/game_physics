
## Необходимые знания

<div>

Помимо основных знаний о дифференциальных уравнениях, для понимания методов численного интегрирования необходимо знать что такое фазовое пространство. 
Если посмотреть на формальное определение фазового пространства, то можно запутаться в терминах.

</div>
> "фазовое пространство -- это пространство, четной размерности, 
>координатами в котором являются обычные пространственные координаты (или обобщённые координаты) частиц системы и их импульсы"
{: .blockquote}
<div>

Нам же достаточно понимать малую часть от этого -- для одномерной системы, например пружинки которая может колебаться по одной оси, фазовое пространство -- это просто график, где на одной оси у нас координата, а на другой скорость и точка на этом графике -- это состояние системы.

{% include /templates/image.html path='/numerical_method/phase_space_spring.excalidraw.png' %}

Если же пружинка может колебаться в двух направлениях, то фазовое пространство будет четырехмерным -- импульсы и координаты по двум направлениям.


Еще очень полезно и приятно рисовать векторные поля на фазовом пространстве. Векторное поле -- это набор векторов, каждый из которых показывает направление и скорость изменения в каждой точке фазового пространства.
Вот так будет выглядеть фазовое пространство для пружинки:


{% include /templates/image.html path='/numerical_method/phase_trajectory.excalidraw.png' %}

</div>
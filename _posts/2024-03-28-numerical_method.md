---
title: Численные методы
author: Роман Козак
credential: {Петров Степан}
# date: 2019-04-27
category: Jekyll
layout: post
---

<script src="{{site.baseurl}}/assets/scripts/p5.min.js"></script>
<script src ="{{site.baseurl}}/assets/scripts/math.js"></script>
 <meta name="viewport" content="width=device-width, initial-scale=1">
<div>
В прошлой лекции мы попытались решить уравнения движения аналитически. Поскольку некоторые уравнения были не разрешимы, то мы их линеаризовывали. Однако многие эффекты терялись поскольку были нелинейными. 
Поскольку аналитически решить все уравнения невозможно, то мы перейдем к численным методам.

Посмотрим на уравнение в общем виде
\begin{equation}
    \dot{x} = f(x)
\end{equation}
и мы пытались получить из него решение вида
\begin{equation}
    x = F(t) + C
\end{equation}
подставив в которое начальные коодинаты мы могли найти положение в любой момент времени.
Теперь же мы будем искать траекторию, т.е. из начальной координаты $x_0$ численно находим положение в следующий момент времени $x_1$, из него аналогично $x_2$ и т.д. Где раньше мы находили все фазовые траектории, теперь мы будем находить только одну, и ту приближенно.

</div>

### Модельная задача

<div>

Для того чтобы анализировать методы численного решения уравнений движения, рассмотрим простую модельную задачу. Пусть у нас есть пружинка с коэффициентом жесткости $k$, массой $m$ и начальным смещением $x_0$, а так же вязким трением с коэффициентом $d$.
К уже обсужденным закону Гука ($F(x) = -k \cdot x$) и второму закону Ньютона ($\Sigma \vec{F} = m \cdot \vec{a}$) добавится закон вязкого трения:
\begin{equation}
    \vec{F} = -c \cdot \vec{V}
\end{equation}
\input{pics/Scheme.tex}
Введем новые обозначения:
\begin{equation}
    \begin{split}
        d = \frac{c}{2 \sqrt{km}},\\
        \omega_0 = \sqrt{\frac{k}{m}}
    \end{split}
\end{equation}
Подставляя всё это во второй закон Ньютона, получим
\begin{equation}
    \ddot{x} + 2d\omega_0\dot{x} + \omega_0^2 x = 0
\end{equation}
Как и ранее, запишем вектор

\begin{equation}
    z =
     \begin{bmatrix}     1 & x & x^2 \\     1 & y & y^2 \\     1 & z & z^2 \\     \end{bmatrix} 
\end{equation}
Тогда уравнение перепишем в виде
\begin{equation}
    \dot{z} =
    \begin{bmatrix}
        0 & 1 \\
        -\omega_0^2 & -2d\omega_0 \\
    \end{bmatrix}
    \cdot z = A \cdot z
\end{equation}

Для такой системы известно аналитическое решение. А еще известно что полная энергия системы должна сохраняться. 

</div>

## Методы Эйлера

### Прямой метод Эйлера
<div>
Воспользуемся следующим приближением:
\begin{equation}
    \dot{x} = \frac{dx}{dt} = \lim_{\Delta t\rightarrow 0} \frac{x(t + \Delta t) -x(t)}{\Delta t} \approx \frac{x(t + \Delta t) -x(t)}{\Delta t},
\end{equation}
Если заменить $\approx$ на $=$, пронумеровать положения в узлах и подставить в начальное уравнение, то получится
\begin{equation}
    \begin{split}
        \dot{x_k} = \frac{x_{k+1} -x_k}{\Delta t} = f(x_k),\\
        x_{k+1} = x_k + \dot{x_k}\Delta t = x_k + f(x_k)\Delta t
    \end{split}
\end{equation}
Такие схемы называются явными, т.к. зная $x_k$, можно вычислить $f(x_k)$ и посчитать $x_{k+1}$.

</div>

#### Анализ точности

<div>

Посмотрим на ошибку метода Эйлера. Пусть у нас есть точное решение $x(t)$ и приближенное $x_k$. Тогда
\begin{equation}
    x(t + \Delta t) = x(t) + \dot{x}(t)\Delta t + \frac{\ddot{x}(t)\Delta t^2}{2} + \ldots
\end{equation}
\begin{equation}
    x_{k+1} = x_k + \dot{x_k}\Delta t
\end{equation}
Тогда
\begin{equation}
    x(t + \Delta t) - x_{k+1} = \frac{\ddot{x}(t)\Delta t^2}{2} + \ldots
\end{equation}
Таким образом, локальная ошибка метода Эйлера пропорциональна квадрату шага по времени.
Глобальная ошибка же пропорциональна числу шагов по времени умноженному на локальную ошибку. 
Таким образом, ошибка метода Эйлера пропорциональна шагу по времени.

</div>

#### Анализ устойчивости

<div>

Посмотрим на устойчивость метода Эйлера. Пусть у нас есть уравнение
\begin{equation}
    \dot{y} = \lambda y
\end{equation}
Тогда
\begin{equation}
    y_{k+1} = (1 + \Delta t \cdot \lambda)\cdot y_k
\end{equation}
Для устойчивости решения необходимо
\begin{equation}
    |1 + \Delta t \cdot \lambda| < 1
\end{equation}
Таким образом, зона устойчивости метода Эйлера - круг радиусом 1 с центром в $-1$.

</div>

#### Пример

<div>
Попробуем решить уравнение движения пружинки с помощью явного метода Эйлера.
Подставляя на место $\dot{z}$ обсужденное выше приближенное значение, получим следующие равенства для явной$(1)$ схемы:
\begin{equation}
    z_{k+1} = (I + A\cdot\Delta t)\cdot z_k = F\cdot z_k\qquad
\end{equation}
По индукции, получим
\begin{equation}
    z_k = F^k\cdot z_0\qquad
\end{equation}

<div class="mx-auto clear-both rounded overflow-hidden border " style="max-width: 500px;">
<div class="text-center" id="forward_euler_cn_id">
<figure>
<canvas id="forward_euler_canvas_id"> </canvas>
</figure>
<script src="{{site.baseurl}}/assets/scripts/numerical_method/forward_euler.js"></script>
</div>
<button type="button" class="btn btn-sm" data-bs-toggle="button" id="forward_euler_stop_button_id">Stop</button>
<button type="button" class="btn btn-sm" id="forward_euler_reset_button_id">Reset</button>
</div>

Как видно из симуляции энергия системы быстро увеличивается, что говорит о неустойчивости метода Эйлера.

</div>

### Обратный метод Эйлера

<div>
Построим аналогично неявную схему:
\begin{equation}
    \begin{split}
        \dot{x} \approx \frac{x(t) - x(t - \Delta t)}{\Delta t},\\
        \dot{x_k} = \frac{x_k - x_{k-1}}{\Delta t} = f(x_k),\\
        x_{k+1} = x_k + \dot{x_{k+1}}\Delta t = x_k + f(x_{k+1})\Delta t
    \end{split}
\end{equation}
Мы получили неявную схему. 
Такая схема сложнее явной, т.к. в ней нельзя напрямую вычислить следующее положение по предыдущему. Придется или преобразовывать $f(x_{k+1})$, или итеративно подбирать наилучший $x_{k+1}$. 

Зачем тогда вообще пользоваться неявным методом? Дело в том, что прямой метод "вкачивает" в систему энергию, что в конкретных случаях может быть опасно. Обратный метод, в свою очередь, энергию "выкачивает". Он тоже не дает точного приближения, но система с меньшей энергией в среднем более стабильна, за счет чего неявная схема зачастую выигрывает против явной.

</div>

#### Анализ устойчивости

<div>
\input{pics/stable_zone_fwd.tex}
Когда обсуждались аналитические решения, было показано, что для устойчивости решения
\begin{equation}
    \dot{y}=A\cdot y
\end{equation}
достаточно условия
\begin{equation}
    Re(eig(A)) < 0.
\end{equation}
Попробуем найти аналогичные условия для явного и неявного методов Эйлера.
Для явного метода, переходя к собственным векторам, получим
\begin{equation}
    y_{k+1} = (1 + \Delta t \cdot \lambda)\cdot y_k
\end{equation}
Для устойчивости решения необходимо
\begin{equation}
    |1 + \Delta t \cdot \lambda| < 1
\end{equation}
Заметим, что меньшие значения $\lambda$ и $\Delta t$ имеют больший шанс попадания в зону стабильности.

\input{pics/stable_zone_bwd.tex}
Для неявного метода, переходя к собственным векторам, получим
\begin{equation}
    y_{k+1} = (1 - \Delta t \cdot \lambda)^{-1}\cdot y_k
\end{equation}
Для устойчивости решения необходимо
\begin{equation}
    |(1 - \Delta t \cdot \lambda)^{-1}| < 1 \Leftrightarrow |1 - \Delta t \cdot \lambda| > 1
\end{equation}
Сразу можно заметить, что зона устойчивости для неявного метода больше, чем у явного; однако при некоторых собственных значений уменьшение временного шага ухудшает стабильность,\\чего для явного метода не наблюдалось.

</div>

#### Пример

<div>

Подставляя на место $\dot{z}$ обсужденное выше приближенное значение, получим следующие равенствo для неявной$(2)$ схем:
\begin{equation}
    z_{k+1} = (I - A\cdot\Delta t)^{-1}\cdot z_k = B\cdot z_k\qquad (2)
\end{equation}
По индукции, получим
\begin{equation}
    z_k = B^k\cdot z_0\qquad (2)
\end{equation}



Как видно из симуляции энергия
</div>

## Методы Рунге-Кутты

<div>

</div>

### Метод Рунге-Кутты второго порядка

<div>


RK2

</div>

Возможно это нужно в отдельную страницу. 
Методы которые предназначены для решения динамических систем
### Метод Эйлера-Кромера

<div>



</div>


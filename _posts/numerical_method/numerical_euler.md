</div>

## Методы Эйлера

### Прямой метод Эйлера
<div>
Самый простой метод, который можно придумать для численного интегрирования можно получить вот так
Воспользуемся следующим приближением:
\begin{equation}
    \dot{x} = \frac{dx}{dt} = \lim_{\Delta t\rightarrow 0} \frac{x(t + \Delta t) -x(t)}{\Delta t} \approx \frac{x(t + \Delta t) -x(t)}{\Delta t},
\end{equation}
Если заменить $\approx$ на $=$, пронумеровать положения в узлах и подставить в начальное уравнение, то получится
\begin{equation}
    \begin{split}
        &\dot{x_k} = \frac{x_{k+1} -x_k}{\Delta t} = f(x_k),\\
        &x_{k+1} = x_k + \dot{x_k}\Delta t = x_k + f(x_k)\Delta t
    \end{split}
\end{equation}
Такие схемы называются явными, т.к. зная $x_k$, можно вычислить $f(x_k)$ и посчитать $x_{k+1}$.

</div>

### Обратный метод Эйлера

<div>
Если немного поменять наше приближение и сделать его таким:
\begin{equation}
    \dot{x} = \frac{dx}{dt} = \lim_{\Delta t\rightarrow 0} \frac{x(t) -x(t - \Delta t)}{\Delta t} \approx \frac{x(t) -x(t - \Delta t)}{\Delta t},
\end{equation}
пронумеровать и тп то получится вот такая схема:
\begin{equation}
    \begin{split}
        &\dot{x_k} = \frac{x_{k} -x_{k-1}}{\Delta t} = f(x_k),\\
        &x_{k-1} = x_k - \dot{x_k}\Delta t = x_k - f(x_k)\Delta t
    \end{split}
\end{equation}
Такие схемы называются неявными, т.к. зная $x_k$, нужно решить уравнение $f(x_{k-1}) = \dot{x_k}$ для нахождения $x_{k-1}$. Звучит как достаточно сложная схема, но и у нее есть свои плюсы.

</div>

#### Симуляция

</div>

#### Анализ устойчивости

<div>
\input{pics/stable_zone_fwd.tex}


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
Сразу можно заметить, что зона устойчивости для неявного метода больше, чем у явного; однако при некоторых собственных значениях уменьшение временного шага ухудшает стабильность,\\чего для явного метода не наблюдалось.


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

{% include /templates/include_sketch.html script_path="/assets/scripts/numerical_method/forward_euler_spring.js" base_name="forward_euler_spring" %}
Как видно из симуляции энергия системы быстро увеличивается, что говорит о неустойчивости метода Эйлера.



Подставляя на место $\dot{z}$ обсужденное выше приближенное значение, получим следующие равенствo для неявной$(2)$ схем:
\begin{equation}
    z_{k+1} = (I - A\cdot\Delta t)^{-1}\cdot z_k = B\cdot z_k\qquad (2)
\end{equation}
По индукции, получим
\begin{equation}
    z_k = B^k\cdot z_0\qquad (2)
\end{equation}

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


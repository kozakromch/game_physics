

## Модельные задача

<div>
Для того чтобы анализировать численные методы возьмем простые задачи, 
которые достаточно часто встречаются в играх и для которых известно аналитическое решение. Для того чтобы решить систему численно, нужно переписать уравнение в виде системы уравнений первого порядка.

</div>

### Стрельба из пушки

<div>
{% include /templates/image.html path='/numerical_method/canon.excalidraw.svg' %}

Тело массой $m$ вылетает из пушки с начальной скоростью $v_0$ под углом $\alpha$ к горизонту. Тогда уравнение движения примет вид
\begin{equation}
    \begin{split}
        \ddot{x} = 0,\\
        \ddot{y} = -g,
    \end{split}
\end{equation}
где $g$ - ускорение свободного падения. Перепишем уравнение в виде
\begin{equation}
    \begin{split}
        \dot{x} = v_x,\\
        \dot{v_x} = 0,\\
        \dot{y} = v_y,\\
        \dot{v_y} = -g.
    \end{split}
\end{equation}
Аналогично
\begin{equation}
    z =
     \begin{bmatrix}     x \\     v_x \\     y \\     v_y \\     \end{bmatrix}
\end{equation}
Тогда уравнение перепишем в виде
\begin{equation}
    \dot{z} =
    \begin{bmatrix}
        0 & 1 & 0 & 0 \\
        0 & 0 & 0 & 0 \\
        0 & 0 & 0 & 1 \\
        0 & 0 & 0 & 0 \\
    \end{bmatrix}
    \cdot z = A \cdot z
\end{equation}

И аналитическое решение для этой задачи известно
\begin{equation}
    \begin{split}
        &x(t) = v_0 t \cos(\alpha),\\
        &y(t) = v_0 t \sin(\alpha) - \frac{1}{2}gt^2.
    \end{split}
\end{equation}

</div>

### Пружинка

<div>

Пусть у нас есть пружинка с коэффициентом жесткости $k$, массой $m$ и начальным смещением $x_0$
\begin{equation}
    \begin{split}
        \ddot{x} = -\frac{k}{m}x,\\
    \end{split}
\end{equation}
Тогда уравнение движения примет вид
\begin{equation}
    \begin{split}
        \dot{x} = v,\\
        \dot{v} = -\frac{k}{m}x.
    \end{split}
\end{equation}
Аналогично
\begin{equation}
    z =
     \begin{bmatrix}     x \\     v \\     \end{bmatrix}
\end{equation}
Тогда уравнение перепишем в виде
\begin{equation}
    \dot{z} =
    \begin{bmatrix}
        0 & 1 \\
        -\frac{k}{m} & 0 \\
    \end{bmatrix}
    \cdot z = A \cdot z
\end{equation}


И аналитическое решение для этой задачи известно
\begin{equation}
    x(t) = (A\cos(\omega t) + B\sin(\omega t)),
\end{equation}

{% include /templates/include_sketch.html path="numerical_method/analitical_spring.js" base_name="analitical_spring" %}


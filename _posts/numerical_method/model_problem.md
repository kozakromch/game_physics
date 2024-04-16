
</div>

## Модельные задача

<div>
Для того чтобы анализировать численные методы возьмем 3 простые задачи, для которых известно аналитическое решение. 
Стрельба из пушки с сопротивлением воздуха, пружинка с демпингом и вращение планеты вокруг звезды.

</div>

### Стрельба из пушки

<div>

Тело массой $m$ вылетает из пушки с начальной скоростью $v_0$ под углом $\alpha$ к горизонту. Сила сопротивления воздуха пропорциональна квадрату скорости тела и направлена против движения. У такой системы уравнение движения:
\begin{equation}
    \begin{split}
        \ddot{x} = -\frac{c}{m} \dot{x} \sqrt{\dot{x}^2 + \dot{y}^2},\\
        \ddot{y} = -g - \frac{c}{m} \dot{y} \sqrt{\dot{x}^2 + \dot{y}^2},
    \end{split}
\end{equation}
где $c$ - коэффициент сопротивления воздуха, $g$ - ускорение свободного падения. Чтобы привести это уравнение к дифуру первой степени можно переписать в таком виде:
\begin{equation}
    \begin{split}
        \dot{x} = v_x,\\
        \dot{v_x} = -\frac{c}{m} v_x \sqrt{v_x^2 + v_y^2},\\
        \dot{y} = v_y,\\
        \dot{v_y} = -g - \frac{c}{m} v_y \sqrt{v_x^2 + v_y^2}.
    \end{split}
\end{equation}
Чтобы еще больше упростить запись подставим вектор:
\begin{equation}
    z =
     \begin{bmatrix}     x \\     v_x \\     y \\     v_y \\     \end{bmatrix}
\end{equation}
Тогда уравнение будет выглядеть 
\begin{equation}
    \dot{z} =
    \begin{bmatrix}
        0 & 1 & 0 & 0 \\
        0 & -\frac{c}{m} \sqrt{v_x^2 + v_y^2} & 0 & 0 \\
        0 & 0 & 0 & 1 \\
        0 & 0 & -\frac{c}{m} \sqrt{v_x^2 + v_y^2} & -g \\
    \end{bmatrix}
    \cdot z = A \cdot z
\end{equation}

И аналитическое решение для этой задачи:
\begin{equation}
    \begin{split}
        &x(t) = \frac{m}{c} \ln \left( \frac{m v_0 \sin(\alpha) + c}{m v_0 \sin(\alpha)} \right),\\
        &y(t) = \frac{m}{c} \ln \left( \frac{m v_0 \cos(\alpha) + c}{m v_0 \cos(\alpha)} \right) - \frac{m}{c} \ln \left( \frac{m v_0 \cos(\alpha) + c}{c} \right) - \frac{g}{c} t.
    \end{split}
\end{equation}


</div>

### Пружинка с дэмпингом

<div>

Пусть у нас есть пружинка с коэффициентом жесткости $k$, массой $m$ и начальным смещением $x_0$, а так же вязким трением с коэффициентом $d$.
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

Такое уравнение можно решить с помощью sympy
</div>
```python
x = sp.Function('x'); t, w, d = sp.symbols('t omega0 d')
eq = sp.Eq(x(t).diff(t, t) + 2*d*w*x(t).diff(t) + (w**2)*x(t), 0)
sp.dsolve(eq, x(t)).simplify()
```
<div>
\begin{equation}
x{\left(t \right)} = \left(C_{1} e^{\omega_{0} t \sqrt{d^{2} - 1}} + C_{2} e^{- \omega_{0} t \sqrt{d^{2} - 1}}\right) e^{- d \omega_{0} t}
\end{equation}
Где $C_1$ - начальное смещение, $C_2$ - начальная скорость.

Для такой системы известно аналитическое решение
\begin{equation}
    x(t) = e^{-d\omega_0 t} \left( x_0 \cos(\omega t) + \frac{v_0 + d\omega_0 x_0}{\omega} \sin(\omega t) \right)
\end{equation}
где $\omega = \sqrt{\omega_0^2 - d^2}$.


\begin{equation}
    z = \begin{bmatrix} x \\ \dot{x} \end{bmatrix}
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



</div>

### Вращение планеты вокруг звезды

<div>

Пусть у нас есть планета массой $m$ и радиусом $r$ вращающаяся вокруг звезды массой $M$ и радиусом $R$. Пусть планета находится на расстоянии $d$ от звезды. Тогда уравнение движения примет вид
\begin{equation}
    \begin{split}
        \ddot{x} = -\frac{GM}{d^2} \frac{x}{d},\\
        \ddot{y} = -\frac{GM}{d^2} \frac{y}{d},
    \end{split}
\end{equation}
где $G$ - гравитационная постоянная. Перепишем уравнение в виде
\begin{equation}
    \begin{split}
        \dot{x} = v_x,\\
        \dot{v_x} = -\frac{GM}{d^2} \frac{x}{d},\\
        \dot{y} = v_y,\\
        \dot{v_y} = -\frac{GM}{d^2} \frac{y}{d}.
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
        -\frac{GM}{d^2} \frac{1}{d} & 0 & 0 & 0 \\
        0 & 0 & 0 & 1 \\
        0 & 0 & -\frac{GM}{d^2} \frac{1}{d} & 0 \\
    \end{bmatrix}
    \cdot z = A \cdot z
\end{equation}

И аналитическое решение для этой задачи известно
\begin{equation}
    \begin{split}
        &x(t) = d \cos(\sqrt{\frac{GM}{d^3}} t),\\
        &y(t) = d \sin(\sqrt{\frac{GM}{d^3}} t).
    \end{split}
\end{equation}

Нужны картинки для всего этого и симуляции

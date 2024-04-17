# %%
#  \ddot{x} = -\frac{c}{m} \dot{x} \sqrt{\dot{x}^2 + \dot{y}^2},\\
        # \ddot{y} = -g - \frac{c}{m} \dot{y} \sqrt{\dot{x}^2 + \dot{y}^2},
import sympy as sp
x = sp.Function('x')
y = sp.Function('y')
t, v0, theta, c, m, g = sp.symbols('t v0 theta c m g')
eq1 = sp.Eq(x(t).diff(t, t), -c/m * x(t).diff(t) * sp.sqrt(x(t).diff(t)**2 + y(t).diff(t)**2))
eq2 = sp.Eq(y(t).diff(t, t), -g - c/m * y(t).diff(t) * sp.sqrt(x(t).diff(t)**2 + y(t).diff(t)**2))
sol = sp.dsolve([eq1, eq2], [x(t), y(t)])
sol
# %%


#    \cdot z = A \cdot z

#   \begin{bmatrix}
#         0 & 1 & 0 & 0 \\
#         0 & -\frac{c}{m} \sqrt{v_x^2 + v_y^2} & 0 & 0 \\
#         0 & 0 & 0 & 1 \\
#         0 & 0 & -\frac{c}{m} \sqrt{v_x^2 + v_y^2} & -g \\
#     \end{bmatrix}

#   z =
    #  \begin{bmatrix}     x \\     v_x \\     y \\     v_y \\     \end

# %%
v_x = sp.Function('v_x')
v_y = sp.Function('v_y')
z = sp.Matrix([x(t), v_x(t), y(t), v_y(t)])
A = sp.Matrix([[0, 1, 0, 0], [0, -c/m * sp.sqrt(z[1]**2 + z[3]**2), 0, 0], [0, 0, 0, 1], [0, 0, -c/m * sp.sqrt(z[1]**2 + z[3]**2), -g]])
sol = sp.dsolve(z.diff(t) - A*z)

# %%

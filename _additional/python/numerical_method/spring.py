# %%
import sympy as sp
x = sp.Function('x'); t, w, d = sp.symbols('t omega0 d')
eq = sp.Eq(x(t).diff(t, t) + 2*d*w*x(t).diff(t) + (w**2)*x(t), 0)
sol = sp.dsolve(eq, x(t)).simplify()
sp.latex(sol)
# %%
from manim import *


class Manim2DVideos(Scene):
    def construct(self):
        circle = Circle(radius=2)
        self.add(circle)

        dot = Dot(circle.point_from_proportion(0))
        self.add(dot)

        line = Line(circle.get_center(), dot.get_center())
        self.add(line)

        def update_dot(mob, alpha):
            mob.move_to(circle.point_from_proportion(alpha))
            return mob

        def update_line(mob):
            mob.become(Line(circle.get_center(), dot.get_center()))
            return mob

        self.play(UpdateFromAlphaFunc(dot, update_dot),
                  UpdateFromFunc(line, update_line),
                  rate_func=rate_functions.linear, run_time=5)
        self.wait(1)


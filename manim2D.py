from manim import *

class Manim2DVideos(Scene):
    def construct(self):
        circle = Circle(radius=2, color=BLUE)
        label = MathTex(r"r = 2", color=WHITE).next_to(circle, RIGHT)

        self.add(circle, label)
        self.wait(1)

        square = Square(side_length=4, color=GREEN).move_to(circle.get_center())
        self.play(Create(square), rate_func=rate_functions.ease_in_out_sine)
        self.wait(1)

        group = VGroup(circle, square)
        self.play(group.animate.shift(UP * 2), rate_func=rate_functions.ease_in_out_sine)
        self.wait(1)

        self.play(FadeOut(group), rate_func=rate_functions.ease_in_out_sine)
        self.wait(1)

        dot = Dot(point=ORIGIN, color=RED)
        dot_label = MathTex(r"(0, 0)", color=WHITE).next_to(dot, DOWN)
        self.play(Create(dot), Write(dot_label), rate_func=rate_functions.ease_in_out_sine)
        self.wait(1)

        self.play(dot.animate.move_to(RIGHT * 3 + UP * 1), dot_label.animate.next_to(dot, DOWN), rate_func=rate_functions.ease_in_out_sine)
        self.wait(1)

        self.play(FadeOut(dot, dot_label), rate_func=rate_functions.ease_in_out_sine)
        self.wait(1)

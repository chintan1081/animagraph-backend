from manim import *

class Manim2DVideos(Scene):
    def construct(self):
        square = Square(side_length=3)
        circle = Circle(radius=1.5)
        circle.move_to(square.get_center())

        square_label = MathTex("\\text{Square}")
        circle_label = MathTex("\\text{Circle}")

        square_label.next_to(square, UP)
        circle_label.next_to(circle, UP)

        self.add(square, square_label)

        self.play(
            Transform(square, circle),
            Transform(square_label, circle_label),
            run_time=3,
            rate_func=rate_functions.ease_in_out_sine
        )

        self.wait(2)

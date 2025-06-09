from manim import *

class Manim2DVideos(Scene):
    def construct(self):
        polygon = RegularPolygon(n=6, start_angle=PI / 6, color=BLUE, fill_opacity=0.5)
        label = MathTex(r"\text{Regular Hexagon}", color=WHITE).next_to(polygon, UP)
        rotation_center = Dot(color=RED).move_to(polygon.get_center())
        rotation_center_label = MathTex(r"\text{Rotation Center}", color=RED).next_to(rotation_center, DOWN)

        self.add(polygon, label, rotation_center, rotation_center_label)

        self.play(
            Rotate(
                polygon, angle=2 * PI, about_point=rotation_center.get_center(), rate_func=rate_functions.ease_in_out_sine,
            ),
            run_time=5,
        )
        self.wait(1)

        group = VGroup(polygon, label, rotation_center, rotation_center_label)
        self.play(
            group.animate.shift(LEFT * 3),
            run_time=2,
            rate_func=rate_functions.ease_in_out_sine
        )
        
        square = Square(side_length=2, color=GREEN, fill_opacity=0.5).next_to(group, RIGHT, buff=1)
        square_label = MathTex(r"\text{Square}", color=WHITE).next_to(square, UP)
        
        self.play(Create(square), Write(square_label), run_time=2, rate_func=rate_functions.ease_in_out_sine)
        
        self.play(
            Rotate(
                square, angle=-2 * PI, about_point=square.get_center(), rate_func=rate_functions.ease_in_out_sine,
            ),
            run_time=3,
        )

        self.wait(2)

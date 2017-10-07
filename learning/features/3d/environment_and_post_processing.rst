.. _doc_environment_and_post_processing:

Environment and Post-Processing
===============================

Godot 3 provides a redesigned WorldEnvironment node, as well as a brand new post-processing system with many available effects, right out of the box.

Background
----------

- **Clear Color** uses the default clear color defined by the project. The background will be a constant color.
- **Custom Color** is like Clear Color, but with a custom color value.
- **Sky** lets you define a panorama sky (a 360 degree sphere texture) or a procedural sky (a simple sky featuring a gradient and an optional sun).
- **Color+Sky** lets you define a sky (as above), but uses a constant color value for drawing the background. The sky will only be used for reflections.

Note that **Clear Color** and **Custom Color** perform better than other options, and should be used if the viewport never displays any skies (such as in top-down games, for example) and sky reflections are not important. If sky reflections are important to have, then **Color+Sky** should be used, which doesn't perform as well as **Clear Color**, but still performs better than **Sky**.

Ambient Light
-------------

The ambient light is a special kind of light that is emitted _everywhere_, including in areas not lit by any other means (such as directional or omni lights). A **Sky Contribution** factor can be set, which will tint the ambient light using the sky's dominant color. The ambient light value should not be too high, to avoid making the scene look bland.

Fog
---

Fog, just as in real life, makes distant objects fade away into an uniform color. There are two kinds of fog in Godot:

- **Depth Fog:** This one applies based on the distance from the camera.
- **Height Fog:** This one applies to any objects below (or above) a certain height, regardless of the distance from the camera.

Both of these fog types can have their curve tweaked, making their transition more or less sharp.

Two properties can be tweaked to make the fog effect more interesting:

- **Sun Amount** makes use of the Sun Color property of the fog. When looking towards a directional light (usually a sun), the color of the fog will be changed, simulating the sunlight passing through the fog.
- **Transmit Enabled** enables light transmittance, which makes strong omnidirectional or spot lights "stand out" from the fog, as is sometimes seen in real life in wet, foggy conditions.

Screen-Space Reflections
------------------------

Screen-space reflections (SSR) generates real-time reflections for materials. They adapt to real-time situations (moving geometry or camera, for example), but are not as correct as reflection probes. They are also noticeably slower, and should be avoided on mobile platforms.

Screen-Space Ambient Occlusion
------------------------------

Screen-space ambient occlusion (SSAO) is a post-processing effect used to simulate `ambient occlusion <https://en.wikipedia.org/wiki/Ambient_occlusion>`_. It does not look as good as baked ambient occlusion (and has an higher performance cost), but unlike baked AO, it works well with moving objects.

Glow
----

Up to eight levels (stages) of glow can be enabled. However, beware of performance implications: the higher the number of enabled levels is, the more demanding the glow effect will be.

To improve the look of the glow effect, bicubic upscaling can be enabled, which reduces the "jagged" look sometimes displayed by bloom effects, especially at higher intensities.

Adjustments
-----------

The Adjustments setting allows for tweaking brightness, contrast and saturation of the final rendering. It also allows for specifying a color correction gradient, which can be useful for enhancing the mood of a game (such as using cold or warm colors for the overall rendering of a scene).

Note that brightness adjustments, unlike tweaking the exposure, do not affect the rendering of the glow effect. This makes it a good candidate for letting the user adjust the game's brightness (for example, in case it is too dark on their monitor).

# Diamond Kata

Motivated by the reading of "The Pragmatic Programmer (20th Anniversary Edition)",  I am trying to experiment with _Property-Based Testing_.

I think that the post [Diamond kata with FsCheck](https://blog.ploeh.dk/2015/01/10/diamond-kata-with-fscheck/) by Mark Seemann could be a good start, but I want to use C# in place of F#.

Let's see what happens...

## Conclusions

Maybe I had to should have read the complete blog post before the start because I think that I did not do it as progressively as I could, I did not take enough advantage of testing the properties.

I did it considering the capacity of dealing with each letter (`A`, `B`, etc.) as a feature. So, I started with `A` (tests, and ugly implementation), `B` (tests, and ugly implementation), and with `C` I had the same problem as Mark and Seb.

Here, maybe I had to start from the beginning in order to take advantage of the properties, it would be nice considering each property as a feature as Mark did:

1. First and last rows contain A
2. All rows must have a symmetric contour
3. Rows must contain the correct letters, in the correct order (without paying attention to the spaces)
4. Diamond is as wide as it's high
5. All rows except top and bottom have two identical letters
6. Lower left space is a triangle
7. Figure is symmetric around the horizontal axis

In place of that, I did it in the following order:

1. Support `A` and `B`
2. First and last rows contain `A`
3. All rows must have a symmetric contour
4. All lines have the same length
5. All lines have the same length on its leading and trailing spaces
6. The first and the last letter in a line is the same
7. Figure is symmetric around the horizontal axis

But, at that moment I had only support for `A` and `B`, and the same problem with the rest, but in the course, I learned to parse the lines and started to understand the logic to generate the diamond, so I could complete the kata in an only atomical step when I tried to meet Mark's 3rd step: _"Rows must contain the correct letters, in the correct order"_ but in my case I payed attention to the spaces because I had already mature that.

It was a nice experience, I learned what a _property_ is and I will try to use the concept of properties and testing properties (with or without a _Property-Based Testing_ framework) in further opportunities.

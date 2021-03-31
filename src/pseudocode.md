Puzzle Slider
1.) -4x4 grid
    - 1 open square
    - solve the puzzle (Win Condition)
    - certain amount of allowed moves, depending on the tile, Middle pieces can move 4 ways, outside pieces, can move up to 3, and corner can move 2.
    - data structure []
    - Randomize button (Simulates clicks, and makes true moves thats not considered impossible moves)
        Row 0       1       2       3
        ------------------------------------
Col 0   |        |        |       |        |    
        |        |        |       |        |
        ------------------------------------
    1   |        |        |       |        |    
        |        |        |       |        |
        ------------------------------------
    2   |        |        |       |        |    
        |        |        |       |        |
        ------------------------------------
    3   |        |        |       |   \/   |    
        |        |        |       |   /\   |
        ------------------------------------              

2.) React Hierarchy

react
  |
Board
  |
tile



                     /------- Manage Array Position?
data structure ------
                     \------- Manage Object property?

tiles [{Id      (Properties)         }]
        Current Pos
        Win Post

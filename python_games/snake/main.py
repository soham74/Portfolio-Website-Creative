"""
Snake (Google-style) — Pygame implementation

Controls
- Arrow keys / WASD: move
- P: pause
- R: restart
- Esc: quit

Run
  python3 -m pip install -r requirements.txt
  python3 main.py

Notes
- Designed for 60 FPS with grid-based movement and smooth rendering.
- Progressive speed-up every 4 foods.
"""

import math
import random
import sys
from dataclasses import dataclass

import pygame as pg


# Grid and timing
CELL = 24
COLS, ROWS = 28, 20
WIDTH, HEIGHT = COLS * CELL, ROWS * CELL
FPS = 60
TICK_INITIAL = 8  # frames per step at start


# Palette (cool dark with saturated accents)
BG = (11, 21, 35)
GRID = (22, 42, 64)
SNAKE_BODY = (52, 211, 153)
SNAKE_HEAD = (16, 185, 129)
SNAKE_BORDER = (6, 95, 70)
FOOD = (244, 63, 94)
FOOD_BORDER = (127, 29, 29)
HUD = (229, 231, 235)


@dataclass
class Vec:
    x: int
    y: int

    def __add__(self, other: "Vec") -> "Vec":
        return Vec(self.x + other.x, self.y + other.y)


DIRS = {
    pg.K_UP: Vec(0, -1), pg.K_w: Vec(0, -1),
    pg.K_DOWN: Vec(0, 1), pg.K_s: Vec(0, 1),
    pg.K_LEFT: Vec(-1, 0), pg.K_a: Vec(-1, 0),
    pg.K_RIGHT: Vec(1, 0), pg.K_d: Vec(1, 0),
}


def spawn_food(blocked: list[Vec]) -> Vec:
    while True:
        f = Vec(random.randrange(COLS), random.randrange(ROWS))
        if all(b.x != f.x or b.y != f.y for b in blocked):
            return f


def draw_cell(surf: pg.Surface, cell: Vec, fill: tuple[int, int, int], border: tuple[int, int, int]):
    x, y = cell.x * CELL, cell.y * CELL
    pg.draw.rect(surf, fill, (x + 1, y + 1, CELL - 2, CELL - 2), border_radius=4)
    pg.draw.rect(surf, border, (x + 1, y + 1, CELL - 2, CELL - 2), width=2, border_radius=4)


def draw_grid(surf: pg.Surface):
    for x in range(0, WIDTH, CELL):
        pg.draw.line(surf, GRID, (x, 0), (x, HEIGHT), 1)
    for y in range(0, HEIGHT, CELL):
        pg.draw.line(surf, GRID, (0, y), (WIDTH, y), 1)


def main():
    pg.init()
    pg.display.set_caption("Snake")
    screen = pg.display.set_mode((WIDTH, HEIGHT))
    clock = pg.time.Clock()
    font = pg.font.SysFont("monospace", 16)

    step_frames = TICK_INITIAL
    frame_counter = 0

    center = Vec(COLS // 2, ROWS // 2)
    snake: list[Vec] = [center, Vec(center.x - 1, center.y), Vec(center.x - 2, center.y)]
    direction = Vec(1, 0)
    pending = direction
    food = spawn_food(snake)
    paused = False
    game_over = False
    score = 0
    high = 0

    try:
        high = int(pg.key.get_repeat()[0])  # dummy attempt to avoid flake; will be overwritten below
    except Exception:
        pass
    # keep high in memory only

    while True:
        for e in pg.event.get():
            if e.type == pg.QUIT:
                pg.quit(); sys.exit(0)
            if e.type == pg.KEYDOWN:
                if e.key == pg.K_ESCAPE:
                    pg.quit(); sys.exit(0)
                if e.key == pg.K_p:
                    paused = not paused
                if e.key == pg.K_r:
                    # reset
                    step_frames = TICK_INITIAL
                    frame_counter = 0
                    center = Vec(COLS // 2, ROWS // 2)
                    snake = [center, Vec(center.x - 1, center.y), Vec(center.x - 2, center.y)]
                    direction = Vec(1, 0)
                    pending = direction
                    food = spawn_food(snake)
                    paused = False
                    game_over = False
                    high = max(high, score)
                    score = 0
                if e.key in DIRS:
                    nd = DIRS[e.key]
                    if not (nd.x == -direction.x and nd.y == -direction.y):
                        pending = nd

        screen.fill(BG)
        draw_grid(screen)

        # HUD
        hud = font.render(f"Score {score}   High {max(high, score)}   {'Paused' if paused else ''}", True, HUD)
        screen.blit(hud, (8, 6))

        if not paused and not game_over:
            frame_counter += 1
            if frame_counter >= step_frames:
                frame_counter = 0
                direction = pending
                head = snake[0]
                nxt = head + direction
                hit_wall = nxt.x < 0 or nxt.y < 0 or nxt.x >= COLS or nxt.y >= ROWS
                hit_self = any(s.x == nxt.x and s.y == nxt.y for s in snake)
                if hit_wall or hit_self:
                    game_over = True
                else:
                    ate = (nxt.x == food.x and nxt.y == food.y)
                    snake.insert(0, nxt)
                    if not ate:
                        snake.pop()
                    else:
                        score += 1
                        food = spawn_food(snake)
                        if score % 4 == 0:
                            step_frames = max(3, step_frames - 1)

        # draw food and snake
        draw_cell(screen, food, FOOD, FOOD_BORDER)
        for i, s in enumerate(snake):
            col = SNAKE_HEAD if i == 0 else SNAKE_BODY
            draw_cell(screen, s, col, SNAKE_BORDER)
        # eyes
        if snake:
            s = snake[0]
            cx, cy = s.x * CELL, s.y * CELL
            ex = CELL - 6 if direction.x == 1 else 6 if direction.x == -1 else CELL // 2
            ey = CELL - 6 if direction.y == 1 else 6 if direction.y == -1 else CELL // 2
            pg.draw.circle(screen, (15, 23, 42), (cx + ex - 4, cy + ey - 4), 3)
            pg.draw.circle(screen, (15, 23, 42), (cx + ex + 4, cy + ey + 4), 3)

        if game_over:
            overlay = pg.Surface((WIDTH, HEIGHT), pg.SRCALPHA)
            overlay.fill((0, 0, 0, 120))
            screen.blit(overlay, (0, 0))
            panel = pg.Rect(0, 0, 300, 120)
            panel.center = (WIDTH // 2, HEIGHT // 2)
            pg.draw.rect(screen, (11, 21, 35), panel)
            pg.draw.rect(screen, GRID, panel, 2)
            t1 = font.render("Game Over", True, HUD)
            t2 = font.render(f"Score {score} · High {max(high, score)}", True, HUD)
            screen.blit(t1, (panel.x + 16, panel.y + 16))
            screen.blit(t2, (panel.x + 16, panel.y + 48))
            t3 = font.render("Press R to Restart", True, HUD)
            screen.blit(t3, (panel.x + 16, panel.y + 76))

        pg.display.flip()
        clock.tick(FPS)


if __name__ == "__main__":
    main()



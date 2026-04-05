import { useEffect, useRef } from 'react';

const TILE_SIZE = 30; // Size of the grid tiles
const SNAKE_LENGTH = 5;
const IDLE_TIMEOUT = 5000; // 5 seconds until auto-pilot
const MOVE_INTERVAL = 120; // ms per movement step

export default function SnakeBackground() {
  const canvasRef = useRef(null);
  
  // Ref container for game state avoids React continuous re-renders for a fast game loop
  const gameState = useRef({
    snake: [],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: { x: 10, y: 10 },
    lastMove: 0,
    lastInteraction: Date.now(),
    width: 0,
    height: 0,
    cols: 0,
    rows: 0,
    isTouch: typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      gameState.current.width = canvas.width;
      gameState.current.height = canvas.height;
      gameState.current.cols = Math.floor(canvas.width / TILE_SIZE);
      gameState.current.rows = Math.floor(canvas.height / TILE_SIZE);

      if (gameState.current.snake.length === 0) {
        initGame();
      }
    };

    const initGame = () => {
      const state = gameState.current;
      state.snake = [];
      const startX = Math.floor(state.cols / 2);
      const startY = Math.floor(state.rows / 2);
      for (let i = 0; i < SNAKE_LENGTH; i++) {
        state.snake.push({ x: startX - i, y: startY });
      }
      placeFood();
    };

    const placeFood = () => {
      const state = gameState.current;
      if (state.cols === 0 || state.rows === 0) return;
      state.food = {
        x: Math.floor(Math.random() * (state.cols - 2)) + 1,
        y: Math.floor(Math.random() * (state.rows - 2)) + 1,
        spawnTime: Date.now() // Track when this apple was created
      };
    };

    const handleKeyDown = (e) => {
      // Don't intercept unless we're scrolled down into About section (heuristically if visible)
      const rect = canvas.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      const state = gameState.current;
      const { x, y } = state.direction;
      let handled = false;
      
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          if (y !== 1) state.nextDirection = { x: 0, y: -1 };
          handled = true;
          break;
        case 's':
        case 'arrowdown':
          if (y !== -1) state.nextDirection = { x: 0, y: 1 };
          handled = true;
          break;
        case 'a':
        case 'arrowleft':
          if (x !== 1) state.nextDirection = { x: -1, y: 0 };
          handled = true;
          break;
        case 'd':
        case 'arrowright':
          if (x !== -1) state.nextDirection = { x: 1, y: 0 };
          handled = true;
          break;
      }
      
      if (handled) {
        state.lastInteraction = Date.now();
        // optionally: e.preventDefault() to stop page scrolling with arrows, 
        // but user might want to scroll. We'll let default happen unless it's WASD.
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    handleResize();

    let animationFrameId;

    const runAutoPilot = () => {
      const state = gameState.current;
      const head = state.snake[0];
      const food = state.food;
      
      let targetedX = 0;
      let targetedY = 0;

      // Extremely simple auto-pilot AI
      if (head.x < food.x && state.direction.x !== -1) targetedX = 1;
      else if (head.x > food.x && state.direction.x !== 1) targetedX = -1;

      if (head.y < food.y && state.direction.y !== -1) targetedY = 1;
      else if (head.y > food.y && state.direction.y !== 1) targetedY = -1;

      // Prefer to clear X difference first if allowed, otherwise Y
      if (targetedX !== 0 && state.direction.x === 0) {
        state.nextDirection = { x: targetedX, y: 0 };
      } else if (targetedY !== 0 && state.direction.y === 0) {
        state.nextDirection = { x: 0, y: targetedY };
      } else if (targetedX !== 0) {
        state.nextDirection = { x: targetedX, y: 0 };
      }
    };

    const moveSnake = () => {
      const state = gameState.current;
      const head = { ...state.snake[0] };
      
      // On touch devices, if no interaction yet, force auto-pilot instantly
      if (state.isTouch && Date.now() - state.lastInteraction > 0) {
        state.lastInteraction = 0; // effectively forces auto-pilot forever
      }

      head.x += state.direction.x;
      head.y += state.direction.y;

      // Wrap around bounds
      if (head.x < 0) head.x = state.cols - 1;
      if (head.x >= state.cols) head.x = 0;
      if (head.y < 0) head.y = state.rows - 1;
      if (head.y >= state.rows) head.y = 0;

      state.snake.unshift(head);

      // Eat food
      if (head.x === state.food.x && head.y === state.food.y) {
        placeFood();
      }
      // Always pop, meaning snake never grows!
      state.snake.pop();
    };

    const draw = () => {
      const state = gameState.current;
      ctx.clearRect(0, 0, state.width, state.height);

      const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
      
      const snakeColor = isLightMode ? 'rgba(249, 115, 22, 0.4)' : 'rgba(0, 163, 255, 0.4)';
      const snakeHeadColor = isLightMode ? 'rgba(249, 115, 22, 0.8)' : 'rgba(0, 163, 255, 0.9)';
      const foodColor = isLightMode ? 'rgba(230, 50, 50, 0.95)' : 'rgba(108, 29, 232, 0.9)';
      const gridColor = isLightMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.03)';

      // Draw Grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < state.width; x += TILE_SIZE) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, state.height);
      }
      for (let y = 0; y < state.height; y += TILE_SIZE) {
        ctx.moveTo(0, y);
        ctx.lineTo(state.width, y);
      }
      ctx.stroke();

      // Draw Head Glow
      if (state.snake.length > 0) {
        const head = state.snake[0];
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = snakeHeadColor;
        ctx.shadowColor = snakeHeadColor;
        ctx.shadowBlur = 20;
        ctx.fillRect(head.x * TILE_SIZE, head.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        ctx.restore();
      }

      // Draw Snake Body
      state.snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? snakeHeadColor : snakeColor;
        ctx.fillRect(
          segment.x * TILE_SIZE + 2, 
          segment.y * TILE_SIZE + 2, 
          TILE_SIZE - 4, 
          TILE_SIZE - 4
        );
      });

      // Draw Apple (pulsing)
      ctx.save();
      ctx.fillStyle = foodColor;
      ctx.shadowColor = foodColor;
      ctx.shadowBlur = 10 + Math.sin(Date.now() / 250) * 8; // gentle pulse
      ctx.beginPath();
      ctx.arc(
        state.food.x * TILE_SIZE + TILE_SIZE/2, 
        state.food.y * TILE_SIZE + TILE_SIZE/2, 
        TILE_SIZE/2 - 4, 
        0, 
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();
    };

    const gameLoop = (timestamp) => {
      const state = gameState.current;

      if (timestamp - state.lastMove > MOVE_INTERVAL) {
        state.lastMove = timestamp;

        // Auto-pilot trigger
        if (Date.now() - state.lastInteraction > IDLE_TIMEOUT) {
          runAutoPilot();
        }

        // Apple timeout reset: if not caught in 10 seconds, move it!
        if (state.food.spawnTime && Date.now() - state.food.spawnTime > 10000) {
          placeFood();
        }

        state.direction = state.nextDirection;
        moveSnake();
      }

      draw();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', 
        opacity: isTouch ? 0.6 : 0.9, // Lower opacity on mobile for better text contrast
        zIndex: 0
      }} 
    />
  );
}

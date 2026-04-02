# PixiJS v8 — Quick Reference per Implementation

## Import
```js
import { Application, Graphics, Text, Container, TextStyle, Rectangle } from 'pixi.js';
```

## Setup Base
```js
const app = new Application();
await app.init({ width: window.innerWidth, height: window.innerHeight, background: '#fafafa' });
document.getElementById('canvas-root').appendChild(app.canvas);

const stage = app.stage; // Container principale
```

## Griglia
```js
const grid = new Graphics();
// Disegna linee verticali e orizzontali
// Ricorda: PixiJS v8 usa async init, non new Application(width, height)
```

## Testo
```js
const style = new TextStyle({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fill: '#333',
  align: 'center',
});
const text = new Text({ text: 'Hello', style });
```

## Container (per raggruppare)
```js
const group = new Container();
group.x = 100;
group.y = 100;
stage.addChild(group);
```

## Interazione
```js
// PixiJS v8 event system
container.eventMode = 'static';
container.hitArea = new Rectangle(-w/2, -h/2, w, h);
container.on('pointerdown', onDragStart);
container.on('pointermove', onDragMove);
container.on('pointerup', onDragEnd);
container.on('pointerover', onHover);
container.cursor = 'pointer';
```

## Zoom & Pan
```js
// Pan: muovere un container padre
// Zoom: stage.scale.set(s) + stage.position per centrare
app.canvas.addEventListener('wheel', (e) => {
  const scale = e.deltaY > 0 ? 0.9 : 1.1;
  // Applicare zoom centrato sul cursore
});
```

## Nota Importante
- PixiJS v8 è ESM-only — tutto è async
- Graphics.roundRect prende un singolo radius (non array)
- Non usare @pixi/react — PixiJS vanilla con Application
- Il canvas va montato via DOM in useEffect

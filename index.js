import { Application, Sprite, Graphics, Container } from './pixi.js';
import * as PIXI from 'pixi.js'; // Import everything if needed

// Constants for aspect ratio and mask size
const ASPECT_RATIO = 0.70836591;
const MASK_RADIUS = 125;
const MASK_OFFSET = 100;

// Initialize mouse position
let mouseX = 0;
let mouseY = 0;

// Event listener for mouse movement
document.addEventListener('pointermove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Asynchronous IIFE to handle asset loading and initialization
(async () => {
  // Create PixiJS application
  const app = new Application({ resizeTo: window }); // resizeTo: window handles resizing automatically
  document.getElementById('canvas').appendChild(app.canvas);

  // Load spritesheet
  try {
    const sheet = await PIXI.Assets.load("assets/Scaledspritesheetdata.json");

    // Create sprites
    const background = new Sprite(sheet.textures["aircraft-kindle-000"]);
    const xRay = new Sprite(sheet.textures["aircraft-kindle-Xray"]);
    const scope = new Sprite(sheet.textures["ClassicScope"]);

    // Set initial sizes (important for correct initial display)
    resizeSprites(background, xRay);  // Helper function (see below)

    // Add background to the stage
    app.stage.addChild(background);

    // Create mask
    const mask = new Graphics();
    mask.beginFill();
    mask.drawCircle(MASK_RADIUS, MASK_RADIUS, MASK_RADIUS); // Circle at 0,0 within the Graphics
    mask.endFill();

    // Create mask container and add X-ray and mask to it
    const maskContainer = new Container();
    maskContainer.mask = mask;
    maskContainer.addChild(mask);  // Mask needs to be a child of the container
    maskContainer.addChild(xRay);

    // Add mask container and scope to the stage (scope on top)
    app.stage.addChild(maskContainer);
    app.stage.addChild(scope);

    // Center scope and mask initially
    centerScopeAndMask(scope, mask); // Helper function (see below)

    // Resize event listener
    window.addEventListener('resize', () => {
      resizeSprites(background, xRay);
      centerScopeAndMask(scope, mask);
    });

    // Ticker for mouse tracking
    app.ticker.add(() => {
      mask.position.set(mouseX - MASK_OFFSET, mouseY - MASK_OFFSET);
      scope.position.set(mouseX - MASK_OFFSET, mouseY - MASK_OFFSET);
    });

  } catch (error) {
    console.error("Error loading assets:", error);
    // Handle error, e.g., display a message to the user
  }
})();


// Helper function to resize sprites based on window dimensions
function resizeSprites(background, xRay) {
  const windowWidth = window.innerWidth;
  const windowHeight = windowWidth * ASPECT_RATIO;
  background.width = windowWidth;
  background.height = windowHeight;
  xRay.width = windowWidth;
  xRay.height = windowHeight;
}

// Helper function to center scope and mask
function centerScopeAndMask(scope, mask) {
  const windowWidth = window.innerWidth;
  const windowHeight = windowWidth * ASPECT_RATIO;
  scope.position.set(windowWidth / 2 - MASK_OFFSET, windowHeight / 2 - MASK_OFFSET);
  mask.position.set(windowWidth / 2 - MASK_OFFSET, windowHeight / 2 - MASK_OFFSET);
}
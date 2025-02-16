let Xposition = 0;
let Yposition = 0;



document.addEventListener('pointermove', (e)=> {
  Xposition= e.clientX;
  Yposition= e.clientY;
})

let windowWidth = window.innerWidth;
let windowHeight = windowWidth * 0.70836591; // preserve aspect ratio of textures

// Create the application helper and add its render target to the page
//
// let app = new PIXI.Application({width: windowWidth, height: windowHeight - 4});
let app = new PIXI.Application();
app.init()
globalThis.__PIXI_APP__ = app;
// document.body.appendChild(app.view);
document.getElementById('canvas').appendChild(app.view);
app.resizeTo = document.getElementById('canvas');

// Asset loading from spritesheet
const sheet = await PIXI.Assets.load("assets/Scaledspritesheetdata.json");

// Create background Sprite from sheet loaded line above
let background = new PIXI.Sprite(sheet.textures["aircraft-kindle-000"]);
background.width = windowWidth; // seting actual window size 
background.height = windowHeight; // seting actual window size 

//Create Xray overlay Sprite
let xRay = new PIXI.Sprite(sheet.textures["aircraft-kindle-Xray"]);
xRay.width = windowWidth; // seting actual window size 
xRay.height = windowHeight; // seting actual window size 

//Create Scope  Sprite
let scope = new PIXI.Sprite(sheet.textures["ClassicScope"]);

//Add background area to show
app.stage.addChild(background);

// Create a mask object to define our mask
let mask = new PIXI.Graphics();
// Add the mask geometry and empty fill
mask.beginFill();
mask.drawCircle(125,125,125);
mask.endFill();

// Add container that will hold our masked content
let maskContainer = new PIXI.Container();

// Add container to show
app.stage.addChild(maskContainer);
// Set the mask to use our graphics object from above
maskContainer.mask = mask;
// Add the mask as a child, so that the mask is positioned relative to its parent
maskContainer.addChild(mask);

// Add the Xray layer as a child, so that is positioned relative to its parent
maskContainer.addChild(xRay);

// Add scope layer here to show above mask
app.stage.addChild(scope);

// Che
window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;
  windowHeight = windowWidth * 0.70836591;
  
  app.view.width = windowWidth;
  app.view.height = windowHeight - 4 ;
  
  background.width = windowWidth;
  background.height = windowHeight;
  xRay.width = windowWidth;
  xRay.height = windowHeight;
  maskContainer.width = windowWidth;
  maskContainer.height = windowHeight;
  
  app.resize()
})

// Add a ticker callback to scroll the text up and down
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  
  mask.position.set(Xposition - 100,Yposition - 100 )
  scope.position.set(Xposition - 100,Yposition - 100 )
});



(function(){var root=this;var PIXI=PIXI||{};PIXI.WEBGL_RENDERER=0;PIXI.CANVAS_RENDERER=1;PIXI.VERSION="v1.5.2";PIXI.blendModes={NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16};PIXI.scaleModes={DEFAULT:0,LINEAR:0,NEAREST:1};PIXI.INTERACTION_FREQUENCY=30;PIXI.AUTO_PREVENT_DEFAULT=true;PIXI.RAD_TO_DEG=180/Math.PI;PIXI.DEG_TO_RAD=Math.PI/180;PIXI.Point=function(x,y)
{this.x=x||0;this.y=y||0;};PIXI.Point.prototype.clone=function()
{return new PIXI.Point(this.x,this.y);};PIXI.Point.prototype.constructor=PIXI.Point;PIXI.Point.prototype.set=function(x,y)
{this.x=x||0;this.y=y||((y!==0)?this.x:0);};PIXI.Rectangle=function(x,y,width,height)
{this.x=x||0;this.y=y||0;this.width=width||0;this.height=height||0;};PIXI.Rectangle.prototype.clone=function()
{return new PIXI.Rectangle(this.x,this.y,this.width,this.height);};PIXI.Rectangle.prototype.contains=function(x,y)
{if(this.width<=0||this.height<=0)
return false;var x1=this.x;if(x>=x1&&x<=x1+this.width)
{var y1=this.y;if(y>=y1&&y<=y1+this.height)
{return true;}}
return false;};PIXI.Rectangle.prototype.constructor=PIXI.Rectangle;PIXI.EmptyRectangle=new PIXI.Rectangle(0,0,0,0);PIXI.Polygon=function(points)
{if(!(points instanceof Array))
points=Array.prototype.slice.call(arguments);if(typeof points[0]==='number'){var p=[];for(var i=0,il=points.length;i<il;i+=2){p.push(new PIXI.Point(points[i],points[i+1]));}
points=p;}
this.points=points;};PIXI.Polygon.prototype.clone=function()
{var points=[];for(var i=0;i<this.points.length;i++){points.push(this.points[i].clone());}
return new PIXI.Polygon(points);};PIXI.Polygon.prototype.contains=function(x,y)
{var inside=false;for(var i=0,j=this.points.length-1;i<this.points.length;j=i++){var xi=this.points[i].x,yi=this.points[i].y,xj=this.points[j].x,yj=this.points[j].y,intersect=((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi);if(intersect)inside=!inside;}
return inside;};PIXI.Polygon.prototype.constructor=PIXI.Polygon;PIXI.Circle=function(x,y,radius)
{this.x=x||0;this.y=y||0;this.radius=radius||0;};PIXI.Circle.prototype.clone=function()
{return new PIXI.Circle(this.x,this.y,this.radius);};PIXI.Circle.prototype.contains=function(x,y)
{if(this.radius<=0)
return false;var dx=(this.x-x),dy=(this.y-y),r2=this.radius*this.radius;dx*=dx;dy*=dy;return(dx+dy<=r2);};PIXI.Circle.prototype.constructor=PIXI.Circle;PIXI.Ellipse=function(x,y,width,height)
{this.x=x||0;this.y=y||0;this.width=width||0;this.height=height||0;};PIXI.Ellipse.prototype.clone=function()
{return new PIXI.Ellipse(this.x,this.y,this.width,this.height);};PIXI.Ellipse.prototype.contains=function(x,y)
{if(this.width<=0||this.height<=0)
return false;var normx=((x-this.x)/this.width),normy=((y-this.y)/this.height);normx*=normx;normy*=normy;return(normx+normy<=1);};PIXI.Ellipse.prototype.getBounds=function()
{return new PIXI.Rectangle(this.x,this.y,this.width,this.height);};PIXI.Ellipse.prototype.constructor=PIXI.Ellipse;PIXI.determineMatrixArrayType=function(){return(typeof Float32Array!=='undefined')?Float32Array:Array;};PIXI.Matrix2=PIXI.determineMatrixArrayType();PIXI.Matrix=function()
{this.a=1;this.b=0;this.c=0;this.d=1;this.tx=0;this.ty=0;};PIXI.Matrix.prototype.fromArray=function(array)
{this.a=array[0];this.b=array[1];this.c=array[3];this.d=array[4];this.tx=array[2];this.ty=array[5];};PIXI.Matrix.prototype.toArray=function(transpose)
{if(!this.array)this.array=new Float32Array(9);var array=this.array;if(transpose)
{this.array[0]=this.a;this.array[1]=this.c;this.array[2]=0;this.array[3]=this.b;this.array[4]=this.d;this.array[5]=0;this.array[6]=this.tx;this.array[7]=this.ty;this.array[8]=1;}
else
{this.array[0]=this.a;this.array[1]=this.b;this.array[2]=this.tx;this.array[3]=this.c;this.array[4]=this.d;this.array[5]=this.ty;this.array[6]=0;this.array[7]=0;this.array[8]=1;}
return array;};PIXI.identityMatrix=new PIXI.Matrix();PIXI.DisplayObject=function()
{this.position=new PIXI.Point();this.scale=new PIXI.Point(1,1);this.pivot=new PIXI.Point(0,0);this.rotation=0;this.alpha=1;this.visible=true;this.hitArea=null;this.buttonMode=false;this.renderable=false;this.parent=null;this.stage=null;this.worldAlpha=1;this._interactive=false;this.defaultCursor='pointer';this.worldTransform=new PIXI.Matrix();this.color=[];this.dynamic=true;this._sr=0;this._cr=1;this.filterArea=null;this._bounds=new PIXI.Rectangle(0,0,1,1);this._currentBounds=null;this._mask=null;this._cacheAsBitmap=false;this._cacheIsDirty=false;};PIXI.DisplayObject.prototype.constructor=PIXI.DisplayObject;PIXI.DisplayObject.prototype.setInteractive=function(interactive)
{this.interactive=interactive;};Object.defineProperty(PIXI.DisplayObject.prototype,'interactive',{get:function(){return this._interactive;},set:function(value){this._interactive=value;if(this.stage)this.stage.dirty=true;}});Object.defineProperty(PIXI.DisplayObject.prototype,'worldVisible',{get:function(){var item=this;do
{if(!item.visible)return false;item=item.parent;}
while(item);return true;}});Object.defineProperty(PIXI.DisplayObject.prototype,'mask',{get:function(){return this._mask;},set:function(value){if(this._mask)this._mask.isMask=false;this._mask=value;if(this._mask)this._mask.isMask=true;}});Object.defineProperty(PIXI.DisplayObject.prototype,'filters',{get:function(){return this._filters;},set:function(value){if(value)
{var passes=[];for(var i=0;i<value.length;i++)
{var filterPasses=value[i].passes;for(var j=0;j<filterPasses.length;j++)
{passes.push(filterPasses[j]);}}
this._filterBlock={target:this,filterPasses:passes};}
this._filters=value;}});Object.defineProperty(PIXI.DisplayObject.prototype,'cacheAsBitmap',{get:function(){return this._cacheAsBitmap;},set:function(value){if(this._cacheAsBitmap===value)return;if(value)
{this._generateCachedSprite();}
else
{this._destroyCachedSprite();}
this._cacheAsBitmap=value;}});PIXI.DisplayObject.prototype.updateTransform=function()
{if(this.rotation!==this.rotationCache)
{this.rotationCache=this.rotation;this._sr=Math.sin(this.rotation);this._cr=Math.cos(this.rotation);}
var parentTransform=this.parent.worldTransform;var worldTransform=this.worldTransform;var px=this.pivot.x;var py=this.pivot.y;var a00=this._cr*this.scale.x,a01=-this._sr*this.scale.y,a10=this._sr*this.scale.x,a11=this._cr*this.scale.y,a02=this.position.x-a00*px-py*a01,a12=this.position.y-a11*py-px*a10,b00=parentTransform.a,b01=parentTransform.b,b10=parentTransform.c,b11=parentTransform.d;worldTransform.a=b00*a00+b01*a10;worldTransform.b=b00*a01+b01*a11;worldTransform.tx=b00*a02+b01*a12+parentTransform.tx;worldTransform.c=b10*a00+b11*a10;worldTransform.d=b10*a01+b11*a11;worldTransform.ty=b10*a02+b11*a12+parentTransform.ty;this.worldAlpha=this.alpha*this.parent.worldAlpha;};PIXI.DisplayObject.prototype.getBounds=function(matrix)
{matrix=matrix;return PIXI.EmptyRectangle;};PIXI.DisplayObject.prototype.getLocalBounds=function()
{return this.getBounds(PIXI.identityMatrix);};PIXI.DisplayObject.prototype.setStageReference=function(stage)
{this.stage=stage;if(this._interactive)this.stage.dirty=true;};PIXI.DisplayObject.prototype.generateTexture=function(renderer)
{var bounds=this.getLocalBounds();var renderTexture=new PIXI.RenderTexture(bounds.width|0,bounds.height|0,renderer);renderTexture.render(this,new PIXI.Point(-bounds.x,-bounds.y));return renderTexture;};PIXI.DisplayObject.prototype.updateCache=function()
{this._generateCachedSprite();};PIXI.DisplayObject.prototype._renderCachedSprite=function(renderSession)
{if(renderSession.gl)
{PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite,renderSession);}
else
{PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite,renderSession);}};PIXI.DisplayObject.prototype._generateCachedSprite=function()
{this._cacheAsBitmap=false;var bounds=this.getLocalBounds();if(!this._cachedSprite)
{var renderTexture=new PIXI.RenderTexture(bounds.width|0,bounds.height|0);this._cachedSprite=new PIXI.Sprite(renderTexture);this._cachedSprite.worldTransform=this.worldTransform;}
else
{this._cachedSprite.texture.resize(bounds.width|0,bounds.height|0);}
var tempFilters=this._filters;this._filters=null;this._cachedSprite.filters=tempFilters;this._cachedSprite.texture.render(this,new PIXI.Point(-bounds.x,-bounds.y));this._cachedSprite.anchor.x=-(bounds.x/bounds.width);this._cachedSprite.anchor.y=-(bounds.y/bounds.height);this._filters=tempFilters;this._cacheAsBitmap=true;};PIXI.DisplayObject.prototype._destroyCachedSprite=function()
{if(!this._cachedSprite)return;this._cachedSprite.texture.destroy(true);this._cachedSprite=null;};PIXI.DisplayObject.prototype._renderWebGL=function(renderSession)
{renderSession=renderSession;};PIXI.DisplayObject.prototype._renderCanvas=function(renderSession)
{renderSession=renderSession;};Object.defineProperty(PIXI.DisplayObject.prototype,'x',{get:function(){return this.position.x;},set:function(value){this.position.x=value;}});Object.defineProperty(PIXI.DisplayObject.prototype,'y',{get:function(){return this.position.y;},set:function(value){this.position.y=value;}});PIXI.DisplayObjectContainer=function()
{PIXI.DisplayObject.call(this);this.children=[];};PIXI.DisplayObjectContainer.prototype=Object.create(PIXI.DisplayObject.prototype);PIXI.DisplayObjectContainer.prototype.constructor=PIXI.DisplayObjectContainer;PIXI.DisplayObjectContainer.prototype.addChild=function(child)
{this.addChildAt(child,this.children.length);};PIXI.DisplayObjectContainer.prototype.addChildAt=function(child,index)
{if(index>=0&&index<=this.children.length)
{if(child.parent)
{child.parent.removeChild(child);}
child.parent=this;this.children.splice(index,0,child);if(this.stage)child.setStageReference(this.stage);}
else
{throw new Error(child+' The index '+index+' supplied is out of bounds '+this.children.length);}};PIXI.DisplayObjectContainer.prototype.swapChildren=function(child,child2)
{if(child===child2){return;}
var index1=this.children.indexOf(child);var index2=this.children.indexOf(child2);if(index1<0||index2<0){throw new Error('swapChildren: Both the supplied DisplayObjects must be a child of the caller.');}
this.children[index1]=child2;this.children[index2]=child;};PIXI.DisplayObjectContainer.prototype.getChildAt=function(index)
{if(index>=0&&index<this.children.length)
{return this.children[index];}
else
{throw new Error('Supplied index does not exist in the child list, or the supplied DisplayObject must be a child of the caller');}};PIXI.DisplayObjectContainer.prototype.removeChild=function(child)
{return this.removeChildAt(this.children.indexOf(child));};PIXI.DisplayObjectContainer.prototype.removeChildAt=function(index)
{var child=this.getChildAt(index);if(this.stage)
child.removeStageReference();child.parent=undefined;this.children.splice(index,1);return child;};PIXI.DisplayObjectContainer.prototype.removeChildren=function(beginIndex,endIndex)
{var begin=beginIndex||0;var end=typeof endIndex==='number'?endIndex:this.children.length;var range=end-begin;if(range>0&&range<=end)
{var removed=this.children.splice(begin,range);for(var i=0;i<removed.length;i++){var child=removed[i];if(this.stage)
child.removeStageReference();child.parent=undefined;}
return removed;}
else
{throw new Error('Range Error, numeric values are outside the acceptable range');}};PIXI.DisplayObjectContainer.prototype.updateTransform=function()
{if(!this.visible)return;PIXI.DisplayObject.prototype.updateTransform.call(this);if(this._cacheAsBitmap)return;for(var i=0,j=this.children.length;i<j;i++)
{this.children[i].updateTransform();}};PIXI.DisplayObjectContainer.prototype.getBounds=function(matrix)
{if(this.children.length===0)return PIXI.EmptyRectangle;if(matrix)
{var matrixCache=this.worldTransform;this.worldTransform=matrix;this.updateTransform();this.worldTransform=matrixCache;}
var minX=Infinity;var minY=Infinity;var maxX=-Infinity;var maxY=-Infinity;var childBounds;var childMaxX;var childMaxY;var childVisible=false;for(var i=0,j=this.children.length;i<j;i++)
{var child=this.children[i];if(!child.visible)continue;childVisible=true;childBounds=this.children[i].getBounds(matrix);minX=minX<childBounds.x?minX:childBounds.x;minY=minY<childBounds.y?minY:childBounds.y;childMaxX=childBounds.width+childBounds.x;childMaxY=childBounds.height+childBounds.y;maxX=maxX>childMaxX?maxX:childMaxX;maxY=maxY>childMaxY?maxY:childMaxY;}
if(!childVisible)
return PIXI.EmptyRectangle;var bounds=this._bounds;bounds.x=minX;bounds.y=minY;bounds.width=maxX-minX;bounds.height=maxY-minY;return bounds;};PIXI.DisplayObjectContainer.prototype.getLocalBounds=function()
{var matrixCache=this.worldTransform;this.worldTransform=PIXI.identityMatrix;for(var i=0,j=this.children.length;i<j;i++)
{this.children[i].updateTransform();}
var bounds=this.getBounds();this.worldTransform=matrixCache;return bounds;};PIXI.DisplayObjectContainer.prototype.setStageReference=function(stage)
{this.stage=stage;if(this._interactive)this.stage.dirty=true;for(var i=0,j=this.children.length;i<j;i++)
{var child=this.children[i];child.setStageReference(stage);}};PIXI.DisplayObjectContainer.prototype.removeStageReference=function()
{for(var i=0,j=this.children.length;i<j;i++)
{var child=this.children[i];child.removeStageReference();}
if(this._interactive)this.stage.dirty=true;this.stage=null;};PIXI.DisplayObjectContainer.prototype._renderWebGL=function(renderSession)
{if(!this.visible||this.alpha<=0)return;if(this._cacheAsBitmap)
{this._renderCachedSprite(renderSession);return;}
var i,j;if(this._mask||this._filters)
{if(this._mask)
{renderSession.spriteBatch.stop();renderSession.maskManager.pushMask(this.mask,renderSession);renderSession.spriteBatch.start();}
if(this._filters)
{renderSession.spriteBatch.flush();renderSession.filterManager.pushFilter(this._filterBlock);}
for(i=0,j=this.children.length;i<j;i++)
{this.children[i]._renderWebGL(renderSession);}
renderSession.spriteBatch.stop();if(this._filters)renderSession.filterManager.popFilter();if(this._mask)renderSession.maskManager.popMask(renderSession);renderSession.spriteBatch.start();}
else
{for(i=0,j=this.children.length;i<j;i++)
{this.children[i]._renderWebGL(renderSession);}}};PIXI.DisplayObjectContainer.prototype._renderCanvas=function(renderSession)
{if(this.visible===false||this.alpha===0)return;if(this._cacheAsBitmap)
{this._renderCachedSprite(renderSession);return;}
if(this._mask)
{renderSession.maskManager.pushMask(this._mask,renderSession.context);}
for(var i=0,j=this.children.length;i<j;i++)
{var child=this.children[i];child._renderCanvas(renderSession);}
if(this._mask)
{renderSession.maskManager.popMask(renderSession.context);}};PIXI.Sprite=function(texture)
{PIXI.DisplayObjectContainer.call(this);this.anchor=new PIXI.Point();this.texture=texture;this._width=0;this._height=0;this.tint=0xFFFFFF;this.blendMode=PIXI.blendModes.NORMAL;if(texture.baseTexture.hasLoaded)
{this.onTextureUpdate();}
else
{this.onTextureUpdateBind=this.onTextureUpdate.bind(this);this.texture.addEventListener('update',this.onTextureUpdateBind);}
this.renderable=true;};PIXI.Sprite.prototype=Object.create(PIXI.DisplayObjectContainer.prototype);PIXI.Sprite.prototype.constructor=PIXI.Sprite;Object.defineProperty(PIXI.Sprite.prototype,'width',{get:function(){return this.scale.x*this.texture.frame.width;},set:function(value){this.scale.x=value/this.texture.frame.width;this._width=value;}});Object.defineProperty(PIXI.Sprite.prototype,'height',{get:function(){return this.scale.y*this.texture.frame.height;},set:function(value){this.scale.y=value/this.texture.frame.height;this._height=value;}});PIXI.Sprite.prototype.setTexture=function(texture)
{if(this.texture.baseTexture!==texture.baseTexture)
{this.textureChange=true;this.texture=texture;}
else
{this.texture=texture;}
this.cachedTint=0xFFFFFF;this.updateFrame=true;};PIXI.Sprite.prototype.onTextureUpdate=function()
{if(this._width)this.scale.x=this._width/this.texture.frame.width;if(this._height)this.scale.y=this._height/this.texture.frame.height;this.updateFrame=true;};PIXI.Sprite.prototype.getBounds=function(matrix)
{var width=this.texture.frame.width;var height=this.texture.frame.height;var w0=width*(1-this.anchor.x);var w1=width*-this.anchor.x;var h0=height*(1-this.anchor.y);var h1=height*-this.anchor.y;var worldTransform=matrix||this.worldTransform;var a=worldTransform.a;var b=worldTransform.c;var c=worldTransform.b;var d=worldTransform.d;var tx=worldTransform.tx;var ty=worldTransform.ty;var x1=a*w1+c*h1+tx;var y1=d*h1+b*w1+ty;var x2=a*w0+c*h1+tx;var y2=d*h1+b*w0+ty;var x3=a*w0+c*h0+tx;var y3=d*h0+b*w0+ty;var x4=a*w1+c*h0+tx;var y4=d*h0+b*w1+ty;var maxX=-Infinity;var maxY=-Infinity;var minX=Infinity;var minY=Infinity;minX=x1<minX?x1:minX;minX=x2<minX?x2:minX;minX=x3<minX?x3:minX;minX=x4<minX?x4:minX;minY=y1<minY?y1:minY;minY=y2<minY?y2:minY;minY=y3<minY?y3:minY;minY=y4<minY?y4:minY;maxX=x1>maxX?x1:maxX;maxX=x2>maxX?x2:maxX;maxX=x3>maxX?x3:maxX;maxX=x4>maxX?x4:maxX;maxY=y1>maxY?y1:maxY;maxY=y2>maxY?y2:maxY;maxY=y3>maxY?y3:maxY;maxY=y4>maxY?y4:maxY;var bounds=this._bounds;bounds.x=minX;bounds.width=maxX-minX;bounds.y=minY;bounds.height=maxY-minY;this._currentBounds=bounds;return bounds;};PIXI.Sprite.prototype._renderWebGL=function(renderSession)
{if(!this.visible||this.alpha<=0)return;var i,j;if(this._mask||this._filters)
{var spriteBatch=renderSession.spriteBatch;if(this._mask)
{spriteBatch.stop();renderSession.maskManager.pushMask(this.mask,renderSession);spriteBatch.start();}
if(this._filters)
{spriteBatch.flush();renderSession.filterManager.pushFilter(this._filterBlock);}
spriteBatch.render(this);for(i=0,j=this.children.length;i<j;i++)
{this.children[i]._renderWebGL(renderSession);}
spriteBatch.stop();if(this._filters)renderSession.filterManager.popFilter();if(this._mask)renderSession.maskManager.popMask(renderSession);spriteBatch.start();}
else
{renderSession.spriteBatch.render(this);for(i=0,j=this.children.length;i<j;i++)
{this.children[i]._renderWebGL(renderSession);}}};PIXI.Sprite.prototype._renderCanvas=function(renderSession)
{if(this.visible===false||this.alpha===0)return;var frame=this.texture.frame;var context=renderSession.context;var texture=this.texture;if(this.blendMode!==renderSession.currentBlendMode)
{renderSession.currentBlendMode=this.blendMode;context.globalCompositeOperation=PIXI.blendModesCanvas[renderSession.currentBlendMode];}
if(this._mask)
{renderSession.maskManager.pushMask(this._mask,renderSession.context);}
if(frame&&frame.width&&frame.height&&texture.baseTexture.source)
{context.globalAlpha=this.worldAlpha;var transform=this.worldTransform;if(renderSession.roundPixels)
{context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx|0,transform.ty|0);}
else
{context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty);}
if(renderSession.smoothProperty&&renderSession.scaleMode!==this.texture.baseTexture.scaleMode){renderSession.scaleMode=this.texture.baseTexture.scaleMode;context[renderSession.smoothProperty]=(renderSession.scaleMode===PIXI.scaleModes.LINEAR);}
if(this.tint!==0xFFFFFF)
{if(this.cachedTint!==this.tint)
{if(!texture.baseTexture.hasLoaded)return;this.cachedTint=this.tint;this.tintedTexture=PIXI.CanvasTinter.getTintedTexture(this,this.tint);}
context.drawImage(this.tintedTexture,0,0,frame.width,frame.height,(this.anchor.x)*-frame.width,(this.anchor.y)*-frame.height,frame.width,frame.height);}
else
{if(texture.trim)
{var trim=texture.trim;context.drawImage(this.texture.baseTexture.source,frame.x,frame.y,frame.width,frame.height,trim.x-this.anchor.x*trim.width,trim.y-this.anchor.y*trim.height,frame.width,frame.height);}
else
{context.drawImage(this.texture.baseTexture.source,frame.x,frame.y,frame.width,frame.height,(this.anchor.x)*-frame.width,(this.anchor.y)*-frame.height,frame.width,frame.height);}}}
for(var i=0,j=this.children.length;i<j;i++)
{var child=this.children[i];child._renderCanvas(renderSession);}
if(this._mask)
{renderSession.maskManager.popMask(renderSession.context);}};PIXI.Sprite.fromFrame=function(frameId)
{var texture=PIXI.TextureCache[frameId];if(!texture)throw new Error('The frameId "'+frameId+'" does not exist in the texture cache'+this);return new PIXI.Sprite(texture);};PIXI.Sprite.fromImage=function(imageId,crossorigin,scaleMode)
{var texture=PIXI.Texture.fromImage(imageId,crossorigin,scaleMode);return new PIXI.Sprite(texture);};PIXI.SpriteBatch=function(texture)
{PIXI.DisplayObjectContainer.call(this);this.textureThing=texture;this.ready=false;};PIXI.SpriteBatch.prototype=Object.create(PIXI.DisplayObjectContainer.prototype);PIXI.SpriteBatch.constructor=PIXI.SpriteBatch;PIXI.SpriteBatch.prototype.initWebGL=function(gl)
{this.fastSpriteBatch=new PIXI.WebGLFastSpriteBatch(gl);this.ready=true;};PIXI.SpriteBatch.prototype.updateTransform=function()
{PIXI.DisplayObject.prototype.updateTransform.call(this);};PIXI.SpriteBatch.prototype._renderWebGL=function(renderSession)
{if(!this.visible||this.alpha<=0||!this.children.length)return;if(!this.ready)this.initWebGL(renderSession.gl);renderSession.spriteBatch.stop();renderSession.shaderManager.activateShader(renderSession.shaderManager.fastShader);this.fastSpriteBatch.begin(this,renderSession);this.fastSpriteBatch.render(this);renderSession.shaderManager.activateShader(renderSession.shaderManager.defaultShader);renderSession.spriteBatch.start();};PIXI.SpriteBatch.prototype._renderCanvas=function(renderSession)
{var context=renderSession.context;context.globalAlpha=this.worldAlpha;PIXI.DisplayObject.prototype.updateTransform.call(this);var transform=this.worldTransform;var isRotated=true;for(var i=0;i<this.children.length;i++){var child=this.children[i];if(!child.visible)continue;var texture=child.texture;var frame=texture.frame;context.globalAlpha=this.worldAlpha*child.alpha;if(child.rotation%(Math.PI*2)===0)
{if(isRotated)
{context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty);isRotated=false;}
context.drawImage(texture.baseTexture.source,frame.x,frame.y,frame.width,frame.height,((child.anchor.x)*(-frame.width*child.scale.x)+child.position.x+0.5)|0,((child.anchor.y)*(-frame.height*child.scale.y)+child.position.y+0.5)|0,frame.width*child.scale.x,frame.height*child.scale.y);}
else
{if(!isRotated)isRotated=true;PIXI.DisplayObject.prototype.updateTransform.call(child);var childTransform=child.worldTransform;if(renderSession.roundPixels)
{context.setTransform(childTransform.a,childTransform.c,childTransform.b,childTransform.d,childTransform.tx|0,childTransform.ty|0);}
else
{context.setTransform(childTransform.a,childTransform.c,childTransform.b,childTransform.d,childTransform.tx,childTransform.ty);}
context.drawImage(texture.baseTexture.source,frame.x,frame.y,frame.width,frame.height,((child.anchor.x)*(-frame.width)+0.5)|0,((child.anchor.y)*(-frame.height)+0.5)|0,frame.width,frame.height);}}};PIXI.AbstractFilter=function(fragmentSrc,uniforms)
{this.passes=[this];this.shaders=[];this.dirty=true;this.padding=0;this.uniforms=uniforms||{};this.fragmentSrc=fragmentSrc||[];};PIXI.FilterBlock=function()
{this.visible=true;this.renderable=true;};PIXI.Text=function(text,style)
{this.canvas=document.createElement('canvas');this.context=this.canvas.getContext('2d');PIXI.Sprite.call(this,PIXI.Texture.fromCanvas(this.canvas));this.setText(text);this.setStyle(style);this.updateText();this.dirty=false;};PIXI.Text.prototype=Object.create(PIXI.Sprite.prototype);PIXI.Text.prototype.constructor=PIXI.Text;PIXI.Text.prototype.setStyle=function(style)
{style=style||{};style.font=style.font||'bold 20pt Arial';style.fill=style.fill||'black';style.align=style.align||'left';style.stroke=style.stroke||'black';style.strokeThickness=style.strokeThickness||0;style.wordWrap=style.wordWrap||false;style.wordWrapWidth=style.wordWrapWidth||100;style.wordWrapWidth=style.wordWrapWidth||100;style.dropShadow=style.dropShadow||false;style.dropShadowAngle=style.dropShadowAngle||Math.PI/6;style.dropShadowDistance=style.dropShadowDistance||4;style.dropShadowColor=style.dropShadowColor||'black';this.style=style;this.dirty=true;};PIXI.Text.prototype.setText=function(text)
{this.text=text.toString()||' ';this.dirty=true;};PIXI.Text.prototype.updateText=function()
{this.context.font=this.style.font;var outputText=this.text;if(this.style.wordWrap)outputText=this.wordWrap(this.text);var lines=outputText.split(/(?:\r\n|\r|\n)/);var lineWidths=[];var maxLineWidth=0;for(var i=0;i<lines.length;i++)
{var lineWidth=this.context.measureText(lines[i]).width;lineWidths[i]=lineWidth;maxLineWidth=Math.max(maxLineWidth,lineWidth);}
var width=maxLineWidth+this.style.strokeThickness;if(this.style.dropShadow)width+=this.style.dropShadowDistance;this.canvas.width=width+this.context.lineWidth;var lineHeight=this.determineFontHeight('font: '+this.style.font+';')+this.style.strokeThickness;var height=lineHeight*lines.length;if(this.style.dropShadow)height+=this.style.dropShadowDistance;this.canvas.height=height;if(navigator.isCocoonJS)this.context.clearRect(0,0,this.canvas.width,this.canvas.height);this.context.font=this.style.font;this.context.strokeStyle=this.style.stroke;this.context.lineWidth=this.style.strokeThickness;this.context.textBaseline='top';var linePositionX;var linePositionY;if(this.style.dropShadow)
{this.context.fillStyle=this.style.dropShadowColor;var xShadowOffset=Math.sin(this.style.dropShadowAngle)*this.style.dropShadowDistance;var yShadowOffset=Math.cos(this.style.dropShadowAngle)*this.style.dropShadowDistance;for(i=0;i<lines.length;i++)
{linePositionX=this.style.strokeThickness/2;linePositionY=this.style.strokeThickness/2+i*lineHeight;if(this.style.align==='right')
{linePositionX+=maxLineWidth-lineWidths[i];}
else if(this.style.align==='center')
{linePositionX+=(maxLineWidth-lineWidths[i])/2;}
if(this.style.fill)
{this.context.fillText(lines[i],linePositionX+xShadowOffset,linePositionY+yShadowOffset);}}}
this.context.fillStyle=this.style.fill;for(i=0;i<lines.length;i++)
{linePositionX=this.style.strokeThickness/2;linePositionY=this.style.strokeThickness/2+i*lineHeight;if(this.style.align==='right')
{linePositionX+=maxLineWidth-lineWidths[i];}
else if(this.style.align==='center')
{linePositionX+=(maxLineWidth-lineWidths[i])/2;}
if(this.style.stroke&&this.style.strokeThickness)
{this.context.strokeText(lines[i],linePositionX,linePositionY);}
if(this.style.fill)
{this.context.fillText(lines[i],linePositionX,linePositionY);}}
this.updateTexture();};PIXI.Text.prototype.updateTexture=function()
{this.texture.baseTexture.width=this.canvas.width;this.texture.baseTexture.height=this.canvas.height;this.texture.frame.width=this.canvas.width;this.texture.frame.height=this.canvas.height;this._width=this.canvas.width;this._height=this.canvas.height;this.requiresUpdate=true;};PIXI.Text.prototype._renderWebGL=function(renderSession)
{if(this.requiresUpdate)
{this.requiresUpdate=false;PIXI.updateWebGLTexture(this.texture.baseTexture,renderSession.gl);}
PIXI.Sprite.prototype._renderWebGL.call(this,renderSession);};PIXI.Text.prototype.updateTransform=function()
{if(this.dirty)
{this.updateText();this.dirty=false;}
PIXI.Sprite.prototype.updateTransform.call(this);};PIXI.Text.prototype.determineFontHeight=function(fontStyle)
{var result=PIXI.Text.heightCache[fontStyle];if(!result)
{var body=document.getElementsByTagName('body')[0];var dummy=document.createElement('div');var dummyText=document.createTextNode('M');dummy.appendChild(dummyText);dummy.setAttribute('style',fontStyle+';position:absolute;top:0;left:0');body.appendChild(dummy);result=dummy.offsetHeight;PIXI.Text.heightCache[fontStyle]=result;body.removeChild(dummy);}
return result;};PIXI.Text.prototype.wordWrap=function(text)
{var result='';var lines=text.split('\n');for(var i=0;i<lines.length;i++)
{var spaceLeft=this.style.wordWrapWidth;var words=lines[i].split(' ');for(var j=0;j<words.length;j++)
{var wordWidth=this.context.measureText(words[j]).width;var wordWidthWithSpace=wordWidth+this.context.measureText(' ').width;if(j===0||wordWidthWithSpace>spaceLeft)
{if(j>0)
{result+='\n';}
result+=words[j];spaceLeft=this.style.wordWrapWidth-wordWidth;}
else
{spaceLeft-=wordWidthWithSpace;result+=' '+words[j];}}
if(i<lines.length-1)
{result+='\n';}}
return result;};PIXI.Text.prototype.destroy=function(destroyTexture)
{if(destroyTexture)
{this.texture.destroy();}};PIXI.Text.heightCache={};PIXI.BitmapText=function(text,style)
{PIXI.DisplayObjectContainer.call(this);this._pool=[];this.setText(text);this.setStyle(style);this.updateText();this.dirty=false;};PIXI.BitmapText.prototype=Object.create(PIXI.DisplayObjectContainer.prototype);PIXI.BitmapText.prototype.constructor=PIXI.BitmapText;PIXI.BitmapText.prototype.setText=function(text)
{this.text=text||' ';this.dirty=true;};PIXI.BitmapText.prototype.setStyle=function(style)
{style=style||{};style.align=style.align||'left';this.style=style;var font=style.font.split(' ');this.fontName=font[font.length-1];this.fontSize=font.length>=2?parseInt(font[font.length-2],10):PIXI.BitmapText.fonts[this.fontName].size;this.dirty=true;this.tint=style.tint;};PIXI.BitmapText.prototype.updateText=function()
{var data=PIXI.BitmapText.fonts[this.fontName];var pos=new PIXI.Point();var prevCharCode=null;var chars=[];var maxLineWidth=0;var lineWidths=[];var line=0;var scale=this.fontSize/data.size;for(var i=0;i<this.text.length;i++)
{var charCode=this.text.charCodeAt(i);if(/(?:\r\n|\r|\n)/.test(this.text.charAt(i)))
{lineWidths.push(pos.x);maxLineWidth=Math.max(maxLineWidth,pos.x);line++;pos.x=0;pos.y+=data.lineHeight;prevCharCode=null;continue;}
var charData=data.chars[charCode];if(!charData)continue;if(prevCharCode&&charData[prevCharCode])
{pos.x+=charData.kerning[prevCharCode];}
chars.push({texture:charData.texture,line:line,charCode:charCode,position:new PIXI.Point(pos.x+charData.xOffset,pos.y+charData.yOffset)});pos.x+=charData.xAdvance;prevCharCode=charCode;}
lineWidths.push(pos.x);maxLineWidth=Math.max(maxLineWidth,pos.x);var lineAlignOffsets=[];for(i=0;i<=line;i++)
{var alignOffset=0;if(this.style.align==='right')
{alignOffset=maxLineWidth-lineWidths[i];}
else if(this.style.align==='center')
{alignOffset=(maxLineWidth-lineWidths[i])/2;}
lineAlignOffsets.push(alignOffset);}
var lenChildren=this.children.length;var lenChars=chars.length;var tint=this.tint||0xFFFFFF;for(i=0;i<lenChars;i++)
{var c=i<lenChildren?this.children[i]:this._pool.pop();if(c)c.setTexture(chars[i].texture);else c=new PIXI.Sprite(chars[i].texture);c.position.x=(chars[i].position.x+lineAlignOffsets[chars[i].line])*scale;c.position.y=chars[i].position.y*scale;c.scale.x=c.scale.y=scale;c.tint=tint;if(!c.parent)this.addChild(c);}
while(this.children.length>lenChars)
{var child=this.getChildAt(this.children.length-1);this._pool.push(child);this.removeChild(child);}
this.textWidth=maxLineWidth*scale;this.textHeight=(pos.y+data.lineHeight)*scale;};PIXI.BitmapText.prototype.updateTransform=function()
{if(this.dirty)
{this.updateText();this.dirty=false;}
PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);};PIXI.BitmapText.fonts={};PIXI.Stage=function(backgroundColor)
{PIXI.DisplayObjectContainer.call(this);this.worldTransform=new PIXI.Matrix();this.interactive=true;this.interactionManager=new PIXI.InteractionManager(this);this.dirty=true;this.stage=this;this.stage.hitArea=new PIXI.Rectangle(0,0,100000,100000);this.setBackgroundColor(backgroundColor);};PIXI.Stage.prototype=Object.create(PIXI.DisplayObjectContainer.prototype);PIXI.Stage.prototype.constructor=PIXI.Stage;PIXI.Stage.prototype.setInteractionDelegate=function(domElement)
{this.interactionManager.setTargetDomElement(domElement);};PIXI.Stage.prototype.updateTransform=function()
{this.worldAlpha=1;for(var i=0,j=this.children.length;i<j;i++)
{this.children[i].updateTransform();}
if(this.dirty)
{this.dirty=false;this.interactionManager.dirty=true;}
if(this.interactive)this.interactionManager.update();};PIXI.Stage.prototype.setBackgroundColor=function(backgroundColor)
{this.backgroundColor=backgroundColor||0x000000;this.backgroundColorSplit=PIXI.hex2rgb(this.backgroundColor);var hex=this.backgroundColor.toString(16);hex='000000'.substr(0,6-hex.length)+hex;this.backgroundColorString='#'+hex;};PIXI.Stage.prototype.getMousePosition=function()
{return this.interactionManager.mouse.global;};var lastTime=0;var vendors=['ms','moz','webkit','o'];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame']||window[vendors[x]+'CancelRequestAnimationFrame'];}
if(!window.requestAnimationFrame){window.requestAnimationFrame=function(callback){var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall);},timeToCall);lastTime=currTime+timeToCall;return id;};}
if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(id){clearTimeout(id);};}
window.requestAnimFrame=window.requestAnimationFrame;PIXI.hex2rgb=function(hex){return[(hex>>16&0xFF)/255,(hex>>8&0xFF)/255,(hex&0xFF)/255];};PIXI.rgb2hex=function(rgb){return((rgb[0]*255<<16)+(rgb[1]*255<<8)+rgb[2]*255);};if(typeof Function.prototype.bind!=='function'){Function.prototype.bind=(function(){var slice=Array.prototype.slice;return function(thisArg){var target=this,boundArgs=slice.call(arguments,1);if(typeof target!=='function')throw new TypeError();function bound(){var args=boundArgs.concat(slice.call(arguments));target.apply(this instanceof bound?this:thisArg,args);}
bound.prototype=(function F(proto){if(proto)F.prototype=proto;if(!(this instanceof F))return new F();})(target.prototype);return bound;};})();}
PIXI.AjaxRequest=function()
{var activexmodes=['Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.3.0','Microsoft.XMLHTTP'];if(window.ActiveXObject)
{for(var i=0;i<activexmodes.length;i++)
{try{return new window.ActiveXObject(activexmodes[i]);}
catch(e){}}}
else if(window.XMLHttpRequest)
{return new window.XMLHttpRequest();}
else
{return false;}};PIXI.canUseNewCanvasBlendModes=function()
{var canvas=document.createElement('canvas');canvas.width=1;canvas.height=1;var context=canvas.getContext('2d');context.fillStyle='#000';context.fillRect(0,0,1,1);context.globalCompositeOperation='multiply';context.fillStyle='#fff';context.fillRect(0,0,1,1);return context.getImageData(0,0,1,1).data[0]===0;};PIXI.getNextPowerOfTwo=function(number)
{if(number>0&&(number&(number-1))===0)
return number;else
{var result=1;while(result<number)result<<=1;return result;}};PIXI.EventTarget=function(){var listeners={};this.addEventListener=this.on=function(type,listener){if(listeners[type]===undefined){listeners[type]=[];}
if(listeners[type].indexOf(listener)===-1){listeners[type].push(listener);}};this.dispatchEvent=this.emit=function(event){if(!listeners[event.type]||!listeners[event.type].length){return;}
for(var i=0,l=listeners[event.type].length;i<l;i++){listeners[event.type][i](event);}};this.removeEventListener=this.off=function(type,listener){var index=listeners[type].indexOf(listener);if(index!==-1){listeners[type].splice(index,1);}};this.removeAllEventListeners=function(type){var a=listeners[type];if(a)
a.length=0;};};PIXI.PolyK={};PIXI.PolyK.Triangulate=function(p)
{var sign=true;var n=p.length>>1;if(n<3)return[];var tgs=[];var avl=[];for(var i=0;i<n;i++)avl.push(i);i=0;var al=n;while(al>3)
{var i0=avl[(i+0)%al];var i1=avl[(i+1)%al];var i2=avl[(i+2)%al];var ax=p[2*i0],ay=p[2*i0+1];var bx=p[2*i1],by=p[2*i1+1];var cx=p[2*i2],cy=p[2*i2+1];var earFound=false;if(PIXI.PolyK._convex(ax,ay,bx,by,cx,cy,sign))
{earFound=true;for(var j=0;j<al;j++)
{var vi=avl[j];if(vi===i0||vi===i1||vi===i2)continue;if(PIXI.PolyK._PointInTriangle(p[2*vi],p[2*vi+1],ax,ay,bx,by,cx,cy)){earFound=false;break;}}}
if(earFound)
{tgs.push(i0,i1,i2);avl.splice((i+1)%al,1);al--;i=0;}
else if(i++>3*al)
{if(sign)
{tgs=[];avl=[];for(i=0;i<n;i++)avl.push(i);i=0;al=n;sign=false;}
else
{window.console.log("PIXI Warning: shape too complex to fill");return[];}}}
tgs.push(avl[0],avl[1],avl[2]);return tgs;};PIXI.PolyK._PointInTriangle=function(px,py,ax,ay,bx,by,cx,cy)
{var v0x=cx-ax;var v0y=cy-ay;var v1x=bx-ax;var v1y=by-ay;var v2x=px-ax;var v2y=py-ay;var dot00=v0x*v0x+v0y*v0y;var dot01=v0x*v1x+v0y*v1y;var dot02=v0x*v2x+v0y*v2y;var dot11=v1x*v1x+v1y*v1y;var dot12=v1x*v2x+v1y*v2y;var invDenom=1/(dot00*dot11-dot01*dot01);var u=(dot11*dot02-dot01*dot12)*invDenom;var v=(dot00*dot12-dot01*dot02)*invDenom;return(u>=0)&&(v>=0)&&(u+v<1);};PIXI.PolyK._convex=function(ax,ay,bx,by,cx,cy,sign)
{return((ay-by)*(cx-bx)+(bx-ax)*(cy-by)>=0)===sign;};PIXI.initDefaultShaders=function()
{};PIXI.CompileVertexShader=function(gl,shaderSrc)
{return PIXI._CompileShader(gl,shaderSrc,gl.VERTEX_SHADER);};PIXI.CompileFragmentShader=function(gl,shaderSrc)
{return PIXI._CompileShader(gl,shaderSrc,gl.FRAGMENT_SHADER);};PIXI._CompileShader=function(gl,shaderSrc,shaderType)
{var src=shaderSrc.join("\n");var shader=gl.createShader(shaderType);gl.shaderSource(shader,src);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){window.console.log(gl.getShaderInfoLog(shader));return null;}
return shader;};PIXI.compileProgram=function(gl,vertexSrc,fragmentSrc)
{var fragmentShader=PIXI.CompileFragmentShader(gl,fragmentSrc);var vertexShader=PIXI.CompileVertexShader(gl,vertexSrc);var shaderProgram=gl.createProgram();gl.attachShader(shaderProgram,vertexShader);gl.attachShader(shaderProgram,fragmentShader);gl.linkProgram(shaderProgram);if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)){window.console.log("Could not initialise shaders");}
return shaderProgram;};PIXI.PixiShader=function(gl)
{this.gl=gl;this.program=null;this.fragmentSrc=['precision lowp float;','varying vec2 vTextureCoord;','varying vec4 vColor;','uniform sampler2D uSampler;','void main(void) {','   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;','}'];this.textureCount=0;this.attributes=[];this.init();};PIXI.PixiShader.prototype.init=function()
{var gl=this.gl;var program=PIXI.compileProgram(gl,this.vertexSrc||PIXI.PixiShader.defaultVertexSrc,this.fragmentSrc);gl.useProgram(program);this.uSampler=gl.getUniformLocation(program,'uSampler');this.projectionVector=gl.getUniformLocation(program,'projectionVector');this.offsetVector=gl.getUniformLocation(program,'offsetVector');this.dimensions=gl.getUniformLocation(program,'dimensions');this.aVertexPosition=gl.getAttribLocation(program,'aVertexPosition');this.aTextureCoord=gl.getAttribLocation(program,'aTextureCoord');this.colorAttribute=gl.getAttribLocation(program,'aColor');if(this.colorAttribute===-1)
{this.colorAttribute=2;}
this.attributes=[this.aVertexPosition,this.aTextureCoord,this.colorAttribute];for(var key in this.uniforms)
{this.uniforms[key].uniformLocation=gl.getUniformLocation(program,key);}
this.initUniforms();this.program=program;};PIXI.PixiShader.prototype.initUniforms=function()
{this.textureCount=1;var gl=this.gl;var uniform;for(var key in this.uniforms)
{uniform=this.uniforms[key];var type=uniform.type;if(type==='sampler2D')
{uniform._init=false;if(uniform.value!==null)
{this.initSampler2D(uniform);}}
else if(type==='mat2'||type==='mat3'||type==='mat4')
{uniform.glMatrix=true;uniform.glValueLength=1;if(type==='mat2')
{uniform.glFunc=gl.uniformMatrix2fv;}
else if(type==='mat3')
{uniform.glFunc=gl.uniformMatrix3fv;}
else if(type==='mat4')
{uniform.glFunc=gl.uniformMatrix4fv;}}
else
{uniform.glFunc=gl['uniform'+type];if(type==='2f'||type==='2i')
{uniform.glValueLength=2;}
else if(type==='3f'||type==='3i')
{uniform.glValueLength=3;}
else if(type==='4f'||type==='4i')
{uniform.glValueLength=4;}
else
{uniform.glValueLength=1;}}}};PIXI.PixiShader.prototype.initSampler2D=function(uniform)
{if(!uniform.value||!uniform.value.baseTexture||!uniform.value.baseTexture.hasLoaded)
{return;}
var gl=this.gl;gl.activeTexture(gl['TEXTURE'+this.textureCount]);gl.bindTexture(gl.TEXTURE_2D,uniform.value.baseTexture._glTextures[gl.id]);if(uniform.textureData)
{var data=uniform.textureData;var magFilter=(data.magFilter)?data.magFilter:gl.LINEAR;var minFilter=(data.minFilter)?data.minFilter:gl.LINEAR;var wrapS=(data.wrapS)?data.wrapS:gl.CLAMP_TO_EDGE;var wrapT=(data.wrapT)?data.wrapT:gl.CLAMP_TO_EDGE;var format=(data.luminance)?gl.LUMINANCE:gl.RGBA;if(data.repeat)
{wrapS=gl.REPEAT;wrapT=gl.REPEAT;}
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,!!data.flipY);if(data.width)
{var width=(data.width)?data.width:512;var height=(data.height)?data.height:2;var border=(data.border)?data.border:0;gl.texImage2D(gl.TEXTURE_2D,0,format,width,height,border,format,gl.UNSIGNED_BYTE,null);}
else
{gl.texImage2D(gl.TEXTURE_2D,0,format,gl.RGBA,gl.UNSIGNED_BYTE,uniform.value.baseTexture.source);}
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,magFilter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,minFilter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,wrapS);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,wrapT);}
gl.uniform1i(uniform.uniformLocation,this.textureCount);uniform._init=true;this.textureCount++;};PIXI.PixiShader.prototype.syncUniforms=function()
{this.textureCount=1;var uniform;var gl=this.gl;for(var key in this.uniforms)
{uniform=this.uniforms[key];if(uniform.glValueLength===1)
{if(uniform.glMatrix===true)
{uniform.glFunc.call(gl,uniform.uniformLocation,uniform.transpose,uniform.value);}
else
{uniform.glFunc.call(gl,uniform.uniformLocation,uniform.value);}}
else if(uniform.glValueLength===2)
{uniform.glFunc.call(gl,uniform.uniformLocation,uniform.value.x,uniform.value.y);}
else if(uniform.glValueLength===3)
{uniform.glFunc.call(gl,uniform.uniformLocation,uniform.value.x,uniform.value.y,uniform.value.z);}
else if(uniform.glValueLength===4)
{uniform.glFunc.call(gl,uniform.uniformLocation,uniform.value.x,uniform.value.y,uniform.value.z,uniform.value.w);}
else if(uniform.type==='sampler2D')
{if(uniform._init)
{gl.activeTexture(gl['TEXTURE'+this.textureCount]);gl.bindTexture(gl.TEXTURE_2D,uniform.value.baseTexture._glTextures[gl.id]||PIXI.createWebGLTexture(uniform.value.baseTexture,gl));gl.uniform1i(uniform.uniformLocation,this.textureCount);this.textureCount++;}
else
{this.initSampler2D(uniform);}}}};PIXI.PixiShader.prototype.destroy=function()
{this.gl.deleteProgram(this.program);this.uniforms=null;this.gl=null;this.attributes=null;};PIXI.PixiShader.defaultVertexSrc=['attribute vec2 aVertexPosition;','attribute vec2 aTextureCoord;','attribute vec2 aColor;','uniform vec2 projectionVector;','uniform vec2 offsetVector;','varying vec2 vTextureCoord;','varying vec4 vColor;','const vec2 center = vec2(-1.0, 1.0);','void main(void) {','   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);','   vTextureCoord = aTextureCoord;','   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;','   vColor = vec4(color * aColor.x, aColor.x);','}'];PIXI.PixiFastShader=function(gl)
{this.gl=gl;this.program=null;this.fragmentSrc=['precision lowp float;','varying vec2 vTextureCoord;','varying float vColor;','uniform sampler2D uSampler;','void main(void) {','   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;','}'];this.vertexSrc=['attribute vec2 aVertexPosition;','attribute vec2 aPositionCoord;','attribute vec2 aScale;','attribute float aRotation;','attribute vec2 aTextureCoord;','attribute float aColor;','uniform vec2 projectionVector;','uniform vec2 offsetVector;','uniform mat3 uMatrix;','varying vec2 vTextureCoord;','varying float vColor;','const vec2 center = vec2(-1.0, 1.0);','void main(void) {','   vec2 v;','   vec2 sv = aVertexPosition * aScale;','   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);','   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);','   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;','   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);','   vTextureCoord = aTextureCoord;','   vColor = aColor;','}'];this.textureCount=0;this.init();};PIXI.PixiFastShader.prototype.init=function()
{var gl=this.gl;var program=PIXI.compileProgram(gl,this.vertexSrc,this.fragmentSrc);gl.useProgram(program);this.uSampler=gl.getUniformLocation(program,'uSampler');this.projectionVector=gl.getUniformLocation(program,'projectionVector');this.offsetVector=gl.getUniformLocation(program,'offsetVector');this.dimensions=gl.getUniformLocation(program,'dimensions');this.uMatrix=gl.getUniformLocation(program,'uMatrix');this.aVertexPosition=gl.getAttribLocation(program,'aVertexPosition');this.aPositionCoord=gl.getAttribLocation(program,'aPositionCoord');this.aScale=gl.getAttribLocation(program,'aScale');this.aRotation=gl.getAttribLocation(program,'aRotation');this.aTextureCoord=gl.getAttribLocation(program,'aTextureCoord');this.colorAttribute=gl.getAttribLocation(program,'aColor');if(this.colorAttribute===-1)
{this.colorAttribute=2;}
this.attributes=[this.aVertexPosition,this.aPositionCoord,this.aScale,this.aRotation,this.aTextureCoord,this.colorAttribute];this.program=program;};PIXI.PixiFastShader.prototype.destroy=function()
{this.gl.deleteProgram(this.program);this.uniforms=null;this.gl=null;this.attributes=null;};PIXI.StripShader=function()
{this.program=null;this.fragmentSrc=['precision mediump float;','varying vec2 vTextureCoord;','varying float vColor;','uniform float alpha;','uniform sampler2D uSampler;','void main(void) {','   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));','   gl_FragColor = gl_FragColor * alpha;','}'];this.vertexSrc=['attribute vec2 aVertexPosition;','attribute vec2 aTextureCoord;','attribute float aColor;','uniform mat3 translationMatrix;','uniform vec2 projectionVector;','varying vec2 vTextureCoord;','uniform vec2 offsetVector;','varying float vColor;','void main(void) {','   vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);','   v -= offsetVector.xyx;','   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / projectionVector.y + 1.0 , 0.0, 1.0);','   vTextureCoord = aTextureCoord;','   vColor = aColor;','}'];};PIXI.StripShader.prototype.init=function()
{var gl=PIXI.gl;var program=PIXI.compileProgram(gl,this.vertexSrc,this.fragmentSrc);gl.useProgram(program);this.uSampler=gl.getUniformLocation(program,'uSampler');this.projectionVector=gl.getUniformLocation(program,'projectionVector');this.offsetVector=gl.getUniformLocation(program,'offsetVector');this.colorAttribute=gl.getAttribLocation(program,'aColor');this.aVertexPosition=gl.getAttribLocation(program,'aVertexPosition');this.aTextureCoord=gl.getAttribLocation(program,'aTextureCoord');this.translationMatrix=gl.getUniformLocation(program,'translationMatrix');this.alpha=gl.getUniformLocation(program,'alpha');this.program=program;};PIXI.PrimitiveShader=function(gl)
{this.gl=gl;this.program=null;this.fragmentSrc=['precision mediump float;','varying vec4 vColor;','void main(void) {','   gl_FragColor = vColor;','}'];this.vertexSrc=['attribute vec2 aVertexPosition;','attribute vec4 aColor;','uniform mat3 translationMatrix;','uniform vec2 projectionVector;','uniform vec2 offsetVector;','uniform float alpha;','uniform vec3 tint;','varying vec4 vColor;','void main(void) {','   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);','   v -= offsetVector.xyx;','   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);','   vColor = aColor * vec4(tint * alpha, alpha);','}'];this.init();};PIXI.PrimitiveShader.prototype.init=function()
{var gl=this.gl;var program=PIXI.compileProgram(gl,this.vertexSrc,this.fragmentSrc);gl.useProgram(program);this.projectionVector=gl.getUniformLocation(program,'projectionVector');this.offsetVector=gl.getUniformLocation(program,'offsetVector');this.tintColor=gl.getUniformLocation(program,'tint');this.aVertexPosition=gl.getAttribLocation(program,'aVertexPosition');this.colorAttribute=gl.getAttribLocation(program,'aColor');this.attributes=[this.aVertexPosition,this.colorAttribute];this.translationMatrix=gl.getUniformLocation(program,'translationMatrix');this.alpha=gl.getUniformLocation(program,'alpha');this.program=program;};PIXI.PrimitiveShader.prototype.destroy=function()
{this.gl.deleteProgram(this.program);this.uniforms=null;this.gl=null;this.attribute=null;};PIXI.WebGLGraphics=function()
{};PIXI.WebGLGraphics.renderGraphics=function(graphics,renderSession)
{var gl=renderSession.gl;var projection=renderSession.projection,offset=renderSession.offset,shader=renderSession.shaderManager.primitiveShader;if(!graphics._webGL[gl.id])graphics._webGL[gl.id]={points:[],indices:[],lastIndex:0,buffer:gl.createBuffer(),indexBuffer:gl.createBuffer()};var webGL=graphics._webGL[gl.id];if(graphics.dirty)
{graphics.dirty=false;if(graphics.clearDirty)
{graphics.clearDirty=false;webGL.lastIndex=0;webGL.points=[];webGL.indices=[];}
PIXI.WebGLGraphics.updateGraphics(graphics,gl);}
renderSession.shaderManager.activatePrimitiveShader();gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.uniformMatrix3fv(shader.translationMatrix,false,graphics.worldTransform.toArray(true));gl.uniform2f(shader.projectionVector,projection.x,-projection.y);gl.uniform2f(shader.offsetVector,-offset.x,-offset.y);gl.uniform3fv(shader.tintColor,PIXI.hex2rgb(graphics.tint));gl.uniform1f(shader.alpha,graphics.worldAlpha);gl.bindBuffer(gl.ARRAY_BUFFER,webGL.buffer);gl.vertexAttribPointer(shader.aVertexPosition,2,gl.FLOAT,false,4*6,0);gl.vertexAttribPointer(shader.colorAttribute,4,gl.FLOAT,false,4*6,2*4);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,webGL.indexBuffer);gl.drawElements(gl.TRIANGLE_STRIP,webGL.indices.length,gl.UNSIGNED_SHORT,0);renderSession.shaderManager.deactivatePrimitiveShader();};PIXI.WebGLGraphics.updateGraphics=function(graphics,gl)
{var webGL=graphics._webGL[gl.id];for(var i=webGL.lastIndex;i<graphics.graphicsData.length;i++)
{var data=graphics.graphicsData[i];if(data.type===PIXI.Graphics.POLY)
{if(data.fill)
{if(data.points.length>3)
PIXI.WebGLGraphics.buildPoly(data,webGL);}
if(data.lineWidth>0)
{PIXI.WebGLGraphics.buildLine(data,webGL);}}
else if(data.type===PIXI.Graphics.RECT)
{PIXI.WebGLGraphics.buildRectangle(data,webGL);}
else if(data.type===PIXI.Graphics.CIRC||data.type===PIXI.Graphics.ELIP)
{PIXI.WebGLGraphics.buildCircle(data,webGL);}}
webGL.lastIndex=graphics.graphicsData.length;webGL.glPoints=new Float32Array(webGL.points);gl.bindBuffer(gl.ARRAY_BUFFER,webGL.buffer);gl.bufferData(gl.ARRAY_BUFFER,webGL.glPoints,gl.STATIC_DRAW);webGL.glIndicies=new Uint16Array(webGL.indices);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,webGL.indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,webGL.glIndicies,gl.STATIC_DRAW);};PIXI.WebGLGraphics.buildRectangle=function(graphicsData,webGLData)
{var rectData=graphicsData.points;var x=rectData[0];var y=rectData[1];var width=rectData[2];var height=rectData[3];if(graphicsData.fill)
{var color=PIXI.hex2rgb(graphicsData.fillColor);var alpha=graphicsData.fillAlpha;var r=color[0]*alpha;var g=color[1]*alpha;var b=color[2]*alpha;var verts=webGLData.points;var indices=webGLData.indices;var vertPos=verts.length/6;verts.push(x,y);verts.push(r,g,b,alpha);verts.push(x+width,y);verts.push(r,g,b,alpha);verts.push(x,y+height);verts.push(r,g,b,alpha);verts.push(x+width,y+height);verts.push(r,g,b,alpha);indices.push(vertPos,vertPos,vertPos+1,vertPos+2,vertPos+3,vertPos+3);}
if(graphicsData.lineWidth)
{var tempPoints=graphicsData.points;graphicsData.points=[x,y,x+width,y,x+width,y+height,x,y+height,x,y];PIXI.WebGLGraphics.buildLine(graphicsData,webGLData);graphicsData.points=tempPoints;}};PIXI.WebGLGraphics.buildCircle=function(graphicsData,webGLData)
{var rectData=graphicsData.points;var x=rectData[0];var y=rectData[1];var width=rectData[2];var height=rectData[3];var totalSegs=40;var seg=(Math.PI*2)/totalSegs;var i=0;if(graphicsData.fill)
{var color=PIXI.hex2rgb(graphicsData.fillColor);var alpha=graphicsData.fillAlpha;var r=color[0]*alpha;var g=color[1]*alpha;var b=color[2]*alpha;var verts=webGLData.points;var indices=webGLData.indices;var vecPos=verts.length/6;indices.push(vecPos);for(i=0;i<totalSegs+1;i++)
{verts.push(x,y,r,g,b,alpha);verts.push(x+Math.sin(seg*i)*width,y+Math.cos(seg*i)*height,r,g,b,alpha);indices.push(vecPos++,vecPos++);}
indices.push(vecPos-1);}
if(graphicsData.lineWidth)
{var tempPoints=graphicsData.points;graphicsData.points=[];for(i=0;i<totalSegs+1;i++)
{graphicsData.points.push(x+Math.sin(seg*i)*width,y+Math.cos(seg*i)*height);}
PIXI.WebGLGraphics.buildLine(graphicsData,webGLData);graphicsData.points=tempPoints;}};PIXI.WebGLGraphics.buildLine=function(graphicsData,webGLData)
{var i=0;var points=graphicsData.points;if(points.length===0)return;if(graphicsData.lineWidth%2)
{for(i=0;i<points.length;i++){points[i]+=0.5;}}
var firstPoint=new PIXI.Point(points[0],points[1]);var lastPoint=new PIXI.Point(points[points.length-2],points[points.length-1]);if(firstPoint.x===lastPoint.x&&firstPoint.y===lastPoint.y)
{points.pop();points.pop();lastPoint=new PIXI.Point(points[points.length-2],points[points.length-1]);var midPointX=lastPoint.x+(firstPoint.x-lastPoint.x)*0.5;var midPointY=lastPoint.y+(firstPoint.y-lastPoint.y)*0.5;points.unshift(midPointX,midPointY);points.push(midPointX,midPointY);}
var verts=webGLData.points;var indices=webGLData.indices;var length=points.length/2;var indexCount=points.length;var indexStart=verts.length/6;var width=graphicsData.lineWidth/2;var color=PIXI.hex2rgb(graphicsData.lineColor);var alpha=graphicsData.lineAlpha;var r=color[0]*alpha;var g=color[1]*alpha;var b=color[2]*alpha;var px,py,p1x,p1y,p2x,p2y,p3x,p3y;var perpx,perpy,perp2x,perp2y,perp3x,perp3y;var a1,b1,c1,a2,b2,c2;var denom,pdist,dist;p1x=points[0];p1y=points[1];p2x=points[2];p2y=points[3];perpx=-(p1y-p2y);perpy=p1x-p2x;dist=Math.sqrt(perpx*perpx+perpy*perpy);perpx/=dist;perpy/=dist;perpx*=width;perpy*=width;verts.push(p1x-perpx,p1y-perpy,r,g,b,alpha);verts.push(p1x+perpx,p1y+perpy,r,g,b,alpha);for(i=1;i<length-1;i++)
{p1x=points[(i-1)*2];p1y=points[(i-1)*2+1];p2x=points[(i)*2];p2y=points[(i)*2+1];p3x=points[(i+1)*2];p3y=points[(i+1)*2+1];perpx=-(p1y-p2y);perpy=p1x-p2x;dist=Math.sqrt(perpx*perpx+perpy*perpy);perpx/=dist;perpy/=dist;perpx*=width;perpy*=width;perp2x=-(p2y-p3y);perp2y=p2x-p3x;dist=Math.sqrt(perp2x*perp2x+perp2y*perp2y);perp2x/=dist;perp2y/=dist;perp2x*=width;perp2y*=width;a1=(-perpy+p1y)-(-perpy+p2y);b1=(-perpx+p2x)-(-perpx+p1x);c1=(-perpx+p1x)*(-perpy+p2y)-(-perpx+p2x)*(-perpy+p1y);a2=(-perp2y+p3y)-(-perp2y+p2y);b2=(-perp2x+p2x)-(-perp2x+p3x);c2=(-perp2x+p3x)*(-perp2y+p2y)-(-perp2x+p2x)*(-perp2y+p3y);denom=a1*b2-a2*b1;if(Math.abs(denom)<0.1)
{denom+=10.1;verts.push(p2x-perpx,p2y-perpy,r,g,b,alpha);verts.push(p2x+perpx,p2y+perpy,r,g,b,alpha);continue;}
px=(b1*c2-b2*c1)/denom;py=(a2*c1-a1*c2)/denom;pdist=(px-p2x)*(px-p2x)+(py-p2y)+(py-p2y);if(pdist>140*140)
{perp3x=perpx-perp2x;perp3y=perpy-perp2y;dist=Math.sqrt(perp3x*perp3x+perp3y*perp3y);perp3x/=dist;perp3y/=dist;perp3x*=width;perp3y*=width;verts.push(p2x-perp3x,p2y-perp3y);verts.push(r,g,b,alpha);verts.push(p2x+perp3x,p2y+perp3y);verts.push(r,g,b,alpha);verts.push(p2x-perp3x,p2y-perp3y);verts.push(r,g,b,alpha);indexCount++;}
else
{verts.push(px,py);verts.push(r,g,b,alpha);verts.push(p2x-(px-p2x),p2y-(py-p2y));verts.push(r,g,b,alpha);}}
p1x=points[(length-2)*2];p1y=points[(length-2)*2+1];p2x=points[(length-1)*2];p2y=points[(length-1)*2+1];perpx=-(p1y-p2y);perpy=p1x-p2x;dist=Math.sqrt(perpx*perpx+perpy*perpy);perpx/=dist;perpy/=dist;perpx*=width;perpy*=width;verts.push(p2x-perpx,p2y-perpy);verts.push(r,g,b,alpha);verts.push(p2x+perpx,p2y+perpy);verts.push(r,g,b,alpha);indices.push(indexStart);for(i=0;i<indexCount;i++)
{indices.push(indexStart++);}
indices.push(indexStart-1);};PIXI.WebGLGraphics.buildPoly=function(graphicsData,webGLData)
{var points=graphicsData.points;if(points.length<6)return;var verts=webGLData.points;var indices=webGLData.indices;var length=points.length/2;var color=PIXI.hex2rgb(graphicsData.fillColor);var alpha=graphicsData.fillAlpha;var r=color[0]*alpha;var g=color[1]*alpha;var b=color[2]*alpha;var triangles=PIXI.PolyK.Triangulate(points);var vertPos=verts.length/6;var i=0;for(i=0;i<triangles.length;i+=3)
{indices.push(triangles[i]+vertPos);indices.push(triangles[i]+vertPos);indices.push(triangles[i+1]+vertPos);indices.push(triangles[i+2]+vertPos);indices.push(triangles[i+2]+vertPos);}
for(i=0;i<length;i++)
{verts.push(points[i*2],points[i*2+1],r,g,b,alpha);}};PIXI.glContexts=[];PIXI.WebGLRenderer=function(width,height,view,transparent,antialias)
{if(!PIXI.defaultRenderer)PIXI.defaultRenderer=this;this.type=PIXI.WEBGL_RENDERER;this.transparent=!!transparent;this.width=width||800;this.height=height||600;this.view=view||document.createElement('canvas');this.view.width=this.width;this.view.height=this.height;this.contextLost=this.handleContextLost.bind(this);this.contextRestoredLost=this.handleContextRestored.bind(this);this.view.addEventListener('webglcontextlost',this.contextLost,false);this.view.addEventListener('webglcontextrestored',this.contextRestoredLost,false);this.options={alpha:this.transparent,antialias:!!antialias,premultipliedAlpha:!!transparent,stencil:true};try{this.gl=this.view.getContext('experimental-webgl',this.options);}catch(e){try{this.gl=this.view.getContext('webgl',this.options);}catch(e2){throw new Error(' This browser does not support webGL. Try using the canvas renderer'+this);}}
var gl=this.gl;this.glContextId=gl.id=PIXI.WebGLRenderer.glContextId++;PIXI.glContexts[this.glContextId]=gl;if(!PIXI.blendModesWebGL)
{PIXI.blendModesWebGL=[];PIXI.blendModesWebGL[PIXI.blendModes.NORMAL]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.ADD]=[gl.SRC_ALPHA,gl.DST_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.MULTIPLY]=[gl.DST_COLOR,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.SCREEN]=[gl.SRC_ALPHA,gl.ONE];PIXI.blendModesWebGL[PIXI.blendModes.OVERLAY]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.DARKEN]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.LIGHTEN]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.COLOR_DODGE]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.COLOR_BURN]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.HARD_LIGHT]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.SOFT_LIGHT]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.DIFFERENCE]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.EXCLUSION]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.HUE]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.SATURATION]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.COLOR]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];PIXI.blendModesWebGL[PIXI.blendModes.LUMINOSITY]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];}
this.projection=new PIXI.Point();this.projection.x=this.width/2;this.projection.y=-this.height/2;this.offset=new PIXI.Point(0,0);this.resize(this.width,this.height);this.contextLost=false;this.shaderManager=new PIXI.WebGLShaderManager(gl);this.spriteBatch=new PIXI.WebGLSpriteBatch(gl);this.maskManager=new PIXI.WebGLMaskManager(gl);this.filterManager=new PIXI.WebGLFilterManager(gl,this.transparent);this.renderSession={};this.renderSession.gl=this.gl;this.renderSession.drawCount=0;this.renderSession.shaderManager=this.shaderManager;this.renderSession.maskManager=this.maskManager;this.renderSession.filterManager=this.filterManager;this.renderSession.spriteBatch=this.spriteBatch;this.renderSession.renderer=this;gl.useProgram(this.shaderManager.defaultShader.program);gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.enable(gl.BLEND);gl.colorMask(true,true,true,this.transparent);};PIXI.WebGLRenderer.prototype.constructor=PIXI.WebGLRenderer;PIXI.WebGLRenderer.prototype.render=function(stage)
{if(this.contextLost)return;if(this.__stage!==stage)
{if(stage.interactive)stage.interactionManager.removeEvents();this.__stage=stage;}
PIXI.WebGLRenderer.updateTextures();stage.updateTransform();if(stage._interactive)
{if(!stage._interactiveEventsAdded)
{stage._interactiveEventsAdded=true;stage.interactionManager.setTarget(this);}}
var gl=this.gl;gl.viewport(0,0,this.width,this.height);gl.bindFramebuffer(gl.FRAMEBUFFER,null);if(this.transparent)
{gl.clearColor(0,0,0,0);}
else
{gl.clearColor(stage.backgroundColorSplit[0],stage.backgroundColorSplit[1],stage.backgroundColorSplit[2],1);}
gl.clear(gl.COLOR_BUFFER_BIT);this.renderDisplayObject(stage,this.projection);if(stage.interactive)
{if(!stage._interactiveEventsAdded)
{stage._interactiveEventsAdded=true;stage.interactionManager.setTarget(this);}}
else
{if(stage._interactiveEventsAdded)
{stage._interactiveEventsAdded=false;stage.interactionManager.setTarget(this);}}};PIXI.WebGLRenderer.prototype.renderDisplayObject=function(displayObject,projection,buffer)
{this.renderSession.drawCount=0;this.renderSession.currentBlendMode=9999;this.renderSession.projection=projection;this.renderSession.offset=this.offset;this.spriteBatch.begin(this.renderSession);this.filterManager.begin(this.renderSession,buffer);displayObject._renderWebGL(this.renderSession);this.spriteBatch.end();};PIXI.WebGLRenderer.updateTextures=function()
{var i=0;for(i=0;i<PIXI.Texture.frameUpdates.length;i++)
PIXI.WebGLRenderer.updateTextureFrame(PIXI.Texture.frameUpdates[i]);for(i=0;i<PIXI.texturesToDestroy.length;i++)
PIXI.WebGLRenderer.destroyTexture(PIXI.texturesToDestroy[i]);PIXI.texturesToUpdate.length=0;PIXI.texturesToDestroy.length=0;PIXI.Texture.frameUpdates.length=0;};PIXI.WebGLRenderer.destroyTexture=function(texture)
{for(var i=texture._glTextures.length-1;i>=0;i--)
{var glTexture=texture._glTextures[i];var gl=PIXI.glContexts[i];if(gl&&glTexture)
{gl.deleteTexture(glTexture);}}
texture._glTextures.length=0;};PIXI.WebGLRenderer.updateTextureFrame=function(texture)
{texture.updateFrame=false;texture._updateWebGLuvs();};PIXI.WebGLRenderer.prototype.resize=function(width,height)
{this.width=width;this.height=height;this.view.width=width;this.view.height=height;this.gl.viewport(0,0,this.width,this.height);this.projection.x=this.width/2;this.projection.y=-this.height/2;};PIXI.createWebGLTexture=function(texture,gl)
{if(texture.hasLoaded)
{texture._glTextures[gl.id]=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture._glTextures[gl.id]);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,texture.source);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,texture.scaleMode===PIXI.scaleModes.LINEAR?gl.LINEAR:gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,texture.scaleMode===PIXI.scaleModes.LINEAR?gl.LINEAR:gl.NEAREST);if(!texture._powerOf2)
{gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);}
else
{gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);}
gl.bindTexture(gl.TEXTURE_2D,null);}
return texture._glTextures[gl.id];};PIXI.updateWebGLTexture=function(texture,gl)
{if(texture._glTextures[gl.id])
{gl.bindTexture(gl.TEXTURE_2D,texture._glTextures[gl.id]);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,texture.source);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,texture.scaleMode===PIXI.scaleModes.LINEAR?gl.LINEAR:gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,texture.scaleMode===PIXI.scaleModes.LINEAR?gl.LINEAR:gl.NEAREST);if(!texture._powerOf2)
{gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);}
else
{gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);}
gl.bindTexture(gl.TEXTURE_2D,null);}};PIXI.WebGLRenderer.prototype.handleContextLost=function(event)
{event.preventDefault();this.contextLost=true;};PIXI.WebGLRenderer.prototype.handleContextRestored=function()
{try{this.gl=this.view.getContext('experimental-webgl',this.options);}catch(e){try{this.gl=this.view.getContext('webgl',this.options);}catch(e2){throw new Error(' This browser does not support webGL. Try using the canvas renderer'+this);}}
var gl=this.gl;gl.id=PIXI.WebGLRenderer.glContextId++;this.shaderManager.setContext(gl);this.spriteBatch.setContext(gl);this.maskManager.setContext(gl);this.filterManager.setContext(gl);this.renderSession.gl=this.gl;gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.enable(gl.BLEND);gl.colorMask(true,true,true,this.transparent);this.gl.viewport(0,0,this.width,this.height);for(var key in PIXI.TextureCache)
{var texture=PIXI.TextureCache[key].baseTexture;texture._glTextures=[];}
this.contextLost=false;};PIXI.WebGLRenderer.prototype.destroy=function()
{this.view.removeEventListener('webglcontextlost',this.contextLost);this.view.removeEventListener('webglcontextrestored',this.contextRestoredLost);PIXI.glContexts[this.glContextId]=null;this.projection=null;this.offset=null;this.shaderManager.destroy();this.spriteBatch.destroy();this.maskManager.destroy();this.filterManager.destroy();this.shaderManager=null;this.spriteBatch=null;this.maskManager=null;this.filterManager=null;this.gl=null;this.renderSession=null;};PIXI.WebGLRenderer.glContextId=0;PIXI.WebGLMaskManager=function(gl)
{this.maskStack=[];this.maskPosition=0;this.setContext(gl);};PIXI.WebGLMaskManager.prototype.setContext=function(gl)
{this.gl=gl;};PIXI.WebGLMaskManager.prototype.pushMask=function(maskData,renderSession)
{var gl=this.gl;if(this.maskStack.length===0)
{gl.enable(gl.STENCIL_TEST);gl.stencilFunc(gl.ALWAYS,1,1);}
this.maskStack.push(maskData);gl.colorMask(false,false,false,false);gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);PIXI.WebGLGraphics.renderGraphics(maskData,renderSession);gl.colorMask(true,true,true,true);gl.stencilFunc(gl.NOTEQUAL,0,this.maskStack.length);gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);};PIXI.WebGLMaskManager.prototype.popMask=function(renderSession)
{var gl=this.gl;var maskData=this.maskStack.pop();if(maskData)
{gl.colorMask(false,false,false,false);gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);PIXI.WebGLGraphics.renderGraphics(maskData,renderSession);gl.colorMask(true,true,true,true);gl.stencilFunc(gl.NOTEQUAL,0,this.maskStack.length);gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);}
if(this.maskStack.length===0)gl.disable(gl.STENCIL_TEST);};PIXI.WebGLMaskManager.prototype.destroy=function()
{this.maskStack=null;this.gl=null;};PIXI.WebGLShaderManager=function(gl)
{this.maxAttibs=10;this.attribState=[];this.tempAttribState=[];for(var i=0;i<this.maxAttibs;i++){this.attribState[i]=false;}
this.setContext(gl);};PIXI.WebGLShaderManager.prototype.setContext=function(gl)
{this.gl=gl;this.primitiveShader=new PIXI.PrimitiveShader(gl);this.defaultShader=new PIXI.PixiShader(gl);this.fastShader=new PIXI.PixiFastShader(gl);this.activateShader(this.defaultShader);};PIXI.WebGLShaderManager.prototype.setAttribs=function(attribs)
{var i;for(i=0;i<this.tempAttribState.length;i++)
{this.tempAttribState[i]=false;}
for(i=0;i<attribs.length;i++)
{var attribId=attribs[i];this.tempAttribState[attribId]=true;}
var gl=this.gl;for(i=0;i<this.attribState.length;i++)
{if(this.attribState[i]!==this.tempAttribState[i])
{this.attribState[i]=this.tempAttribState[i];if(this.tempAttribState[i])
{gl.enableVertexAttribArray(i);}
else
{gl.disableVertexAttribArray(i);}}}};PIXI.WebGLShaderManager.prototype.activateShader=function(shader)
{this.currentShader=shader;this.gl.useProgram(shader.program);this.setAttribs(shader.attributes);};PIXI.WebGLShaderManager.prototype.activatePrimitiveShader=function()
{var gl=this.gl;gl.useProgram(this.primitiveShader.program);this.setAttribs(this.primitiveShader.attributes);};PIXI.WebGLShaderManager.prototype.deactivatePrimitiveShader=function()
{var gl=this.gl;gl.useProgram(this.defaultShader.program);this.setAttribs(this.defaultShader.attributes);};PIXI.WebGLShaderManager.prototype.destroy=function()
{this.attribState=null;this.tempAttribState=null;this.primitiveShader.destroy();this.defaultShader.destroy();this.fastShader.destroy();this.gl=null;};PIXI.WebGLSpriteBatch=function(gl)
{this.vertSize=6;this.size=2000;var numVerts=this.size*4*this.vertSize;var numIndices=this.size*6;this.vertices=new Float32Array(numVerts);this.indices=new Uint16Array(numIndices);this.lastIndexCount=0;for(var i=0,j=0;i<numIndices;i+=6,j+=4)
{this.indices[i+0]=j+0;this.indices[i+1]=j+1;this.indices[i+2]=j+2;this.indices[i+3]=j+0;this.indices[i+4]=j+2;this.indices[i+5]=j+3;}
this.drawing=false;this.currentBatchSize=0;this.currentBaseTexture=null;this.setContext(gl);};PIXI.WebGLSpriteBatch.prototype.setContext=function(gl)
{this.gl=gl;this.vertexBuffer=gl.createBuffer();this.indexBuffer=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.indices,gl.STATIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,this.vertices,gl.DYNAMIC_DRAW);this.currentBlendMode=99999;};PIXI.WebGLSpriteBatch.prototype.begin=function(renderSession)
{this.renderSession=renderSession;this.shader=this.renderSession.shaderManager.defaultShader;this.start();};PIXI.WebGLSpriteBatch.prototype.end=function()
{this.flush();};PIXI.WebGLSpriteBatch.prototype.render=function(sprite)
{var texture=sprite.texture;if(texture.baseTexture!==this.currentBaseTexture||this.currentBatchSize>=this.size)
{this.flush();this.currentBaseTexture=texture.baseTexture;}
if(sprite.blendMode!==this.currentBlendMode)
{this.setBlendMode(sprite.blendMode);}
var uvs=sprite._uvs||sprite.texture._uvs;if(!uvs)return;var alpha=sprite.worldAlpha;var tint=sprite.tint;var verticies=this.vertices;var aX=sprite.anchor.x;var aY=sprite.anchor.y;var w0,w1,h0,h1;if(sprite.texture.trim)
{var trim=sprite.texture.trim;w1=trim.x-aX*trim.width;w0=w1+texture.frame.width;h1=trim.y-aY*trim.height;h0=h1+texture.frame.height;}
else
{w0=(texture.frame.width)*(1-aX);w1=(texture.frame.width)*-aX;h0=texture.frame.height*(1-aY);h1=texture.frame.height*-aY;}
var index=this.currentBatchSize*4*this.vertSize;var worldTransform=sprite.worldTransform;var a=worldTransform.a;var b=worldTransform.c;var c=worldTransform.b;var d=worldTransform.d;var tx=worldTransform.tx;var ty=worldTransform.ty;verticies[index++]=a*w1+c*h1+tx;verticies[index++]=d*h1+b*w1+ty;verticies[index++]=uvs.x0;verticies[index++]=uvs.y0;verticies[index++]=alpha;verticies[index++]=tint;verticies[index++]=a*w0+c*h1+tx;verticies[index++]=d*h1+b*w0+ty;verticies[index++]=uvs.x1;verticies[index++]=uvs.y1;verticies[index++]=alpha;verticies[index++]=tint;verticies[index++]=a*w0+c*h0+tx;verticies[index++]=d*h0+b*w0+ty;verticies[index++]=uvs.x2;verticies[index++]=uvs.y2;verticies[index++]=alpha;verticies[index++]=tint;verticies[index++]=a*w1+c*h0+tx;verticies[index++]=d*h0+b*w1+ty;verticies[index++]=uvs.x3;verticies[index++]=uvs.y3;verticies[index++]=alpha;verticies[index++]=tint;this.currentBatchSize++;};PIXI.WebGLSpriteBatch.prototype.renderTilingSprite=function(tilingSprite)
{var texture=tilingSprite.tilingTexture;if(texture.baseTexture!==this.currentBaseTexture||this.currentBatchSize>=this.size)
{this.flush();this.currentBaseTexture=texture.baseTexture;}
if(tilingSprite.blendMode!==this.currentBlendMode)
{this.setBlendMode(tilingSprite.blendMode);}
if(!tilingSprite._uvs)tilingSprite._uvs=new PIXI.TextureUvs();var uvs=tilingSprite._uvs;tilingSprite.tilePosition.x%=texture.baseTexture.width*tilingSprite.tileScaleOffset.x;tilingSprite.tilePosition.y%=texture.baseTexture.height*tilingSprite.tileScaleOffset.y;var offsetX=tilingSprite.tilePosition.x/(texture.baseTexture.width*tilingSprite.tileScaleOffset.x);var offsetY=tilingSprite.tilePosition.y/(texture.baseTexture.height*tilingSprite.tileScaleOffset.y);var scaleX=(tilingSprite.width/texture.baseTexture.width)/(tilingSprite.tileScale.x*tilingSprite.tileScaleOffset.x);var scaleY=(tilingSprite.height/texture.baseTexture.height)/(tilingSprite.tileScale.y*tilingSprite.tileScaleOffset.y);uvs.x0=0-offsetX;uvs.y0=0-offsetY;uvs.x1=(1*scaleX)-offsetX;uvs.y1=0-offsetY;uvs.x2=(1*scaleX)-offsetX;uvs.y2=(1*scaleY)-offsetY;uvs.x3=0-offsetX;uvs.y3=(1*scaleY)-offsetY;var alpha=tilingSprite.worldAlpha;var tint=tilingSprite.tint;var verticies=this.vertices;var width=tilingSprite.width;var height=tilingSprite.height;var aX=tilingSprite.anchor.x;var aY=tilingSprite.anchor.y;var w0=width*(1-aX);var w1=width*-aX;var h0=height*(1-aY);var h1=height*-aY;var index=this.currentBatchSize*4*this.vertSize;var worldTransform=tilingSprite.worldTransform;var a=worldTransform.a;var b=worldTransform.c;var c=worldTransform.b;var d=worldTransform.d;var tx=worldTransform.tx;var ty=worldTransform.ty;verticies[index++]=a*w1+c*h1+tx;verticies[index++]=d*h1+b*w1+ty;verticies[index++]=uvs.x0;verticies[index++]=uvs.y0;verticies[index++]=alpha;verticies[index++]=tint;verticies[index++]=a*w0+c*h1+tx;verticies[index++]=d*h1+b*w0+ty;verticies[index++]=uvs.x1;verticies[index++]=uvs.y1;verticies[index++]=alpha;verticies[index++]=tint;verticies[index++]=a*w0+c*h0+tx;verticies[index++]=d*h0+b*w0+ty;verticies[index++]=uvs.x2;verticies[index++]=uvs.y2;verticies[index++]=alpha;verticies[index++]=tint;verticies[index++]=a*w1+c*h0+tx;verticies[index++]=d*h0+b*w1+ty;verticies[index++]=uvs.x3;verticies[index++]=uvs.y3;verticies[index++]=alpha;verticies[index++]=tint;this.currentBatchSize++;};PIXI.WebGLSpriteBatch.prototype.flush=function()
{if(this.currentBatchSize===0)return;var gl=this.gl;gl.bindTexture(gl.TEXTURE_2D,this.currentBaseTexture._glTextures[gl.id]||PIXI.createWebGLTexture(this.currentBaseTexture,gl));if(this.currentBatchSize>(this.size*0.5))
{gl.bufferSubData(gl.ARRAY_BUFFER,0,this.vertices);}
else
{var view=this.vertices.subarray(0,this.currentBatchSize*4*this.vertSize);gl.bufferSubData(gl.ARRAY_BUFFER,0,view);}
gl.drawElements(gl.TRIANGLES,this.currentBatchSize*6,gl.UNSIGNED_SHORT,0);this.currentBatchSize=0;this.renderSession.drawCount++;};PIXI.WebGLSpriteBatch.prototype.stop=function()
{this.flush();};PIXI.WebGLSpriteBatch.prototype.start=function()
{var gl=this.gl;gl.activeTexture(gl.TEXTURE0);gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var projection=this.renderSession.projection;gl.uniform2f(this.shader.projectionVector,projection.x,projection.y);var stride=this.vertSize*4;gl.vertexAttribPointer(this.shader.aVertexPosition,2,gl.FLOAT,false,stride,0);gl.vertexAttribPointer(this.shader.aTextureCoord,2,gl.FLOAT,false,stride,2*4);gl.vertexAttribPointer(this.shader.colorAttribute,2,gl.FLOAT,false,stride,4*4);if(this.currentBlendMode!==PIXI.blendModes.NORMAL)
{this.setBlendMode(PIXI.blendModes.NORMAL);}};PIXI.WebGLSpriteBatch.prototype.setBlendMode=function(blendMode)
{this.flush();this.currentBlendMode=blendMode;var blendModeWebGL=PIXI.blendModesWebGL[this.currentBlendMode];this.gl.blendFunc(blendModeWebGL[0],blendModeWebGL[1]);};PIXI.WebGLSpriteBatch.prototype.destroy=function()
{this.vertices=null;this.indices=null;this.gl.deleteBuffer(this.vertexBuffer);this.gl.deleteBuffer(this.indexBuffer);this.currentBaseTexture=null;this.gl=null;};PIXI.WebGLFastSpriteBatch=function(gl)
{this.vertSize=10;this.maxSize=6000;this.size=this.maxSize;var numVerts=this.size*4*this.vertSize;var numIndices=this.maxSize*6;this.vertices=new Float32Array(numVerts);this.indices=new Uint16Array(numIndices);this.vertexBuffer=null;this.indexBuffer=null;this.lastIndexCount=0;for(var i=0,j=0;i<numIndices;i+=6,j+=4)
{this.indices[i+0]=j+0;this.indices[i+1]=j+1;this.indices[i+2]=j+2;this.indices[i+3]=j+0;this.indices[i+4]=j+2;this.indices[i+5]=j+3;}
this.drawing=false;this.currentBatchSize=0;this.currentBaseTexture=null;this.currentBlendMode=0;this.renderSession=null;this.shader=null;this.matrix=null;this.setContext(gl);};PIXI.WebGLFastSpriteBatch.prototype.setContext=function(gl)
{this.gl=gl;this.vertexBuffer=gl.createBuffer();this.indexBuffer=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.indices,gl.STATIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,this.vertices,gl.DYNAMIC_DRAW);this.currentBlendMode=99999;};PIXI.WebGLFastSpriteBatch.prototype.begin=function(spriteBatch,renderSession)
{this.renderSession=renderSession;this.shader=this.renderSession.shaderManager.fastShader;this.matrix=spriteBatch.worldTransform.toArray(true);this.start();};PIXI.WebGLFastSpriteBatch.prototype.end=function()
{this.flush();};PIXI.WebGLFastSpriteBatch.prototype.render=function(spriteBatch)
{var children=spriteBatch.children;var sprite=children[0];if(!sprite.texture._uvs)return;this.currentBaseTexture=sprite.texture.baseTexture;if(sprite.blendMode!==this.currentBlendMode)
{this.setBlendMode(sprite.blendMode);}
for(var i=0,j=children.length;i<j;i++)
{this.renderSprite(children[i]);}
this.flush();};PIXI.WebGLFastSpriteBatch.prototype.renderSprite=function(sprite)
{if(!sprite.visible)return;if(sprite.texture.baseTexture!==this.currentBaseTexture)
{this.flush();this.currentBaseTexture=sprite.texture.baseTexture;if(!sprite.texture._uvs)return;}
var uvs,verticies=this.vertices,width,height,w0,w1,h0,h1,index;uvs=sprite.texture._uvs;width=sprite.texture.frame.width;height=sprite.texture.frame.height;if(sprite.texture.trim)
{var trim=sprite.texture.trim;w1=trim.x-sprite.anchor.x*trim.width;w0=w1+sprite.texture.frame.width;h1=trim.y-sprite.anchor.y*trim.height;h0=h1+sprite.texture.frame.height;}
else
{w0=(sprite.texture.frame.width)*(1-sprite.anchor.x);w1=(sprite.texture.frame.width)*-sprite.anchor.x;h0=sprite.texture.frame.height*(1-sprite.anchor.y);h1=sprite.texture.frame.height*-sprite.anchor.y;}
index=this.currentBatchSize*4*this.vertSize;verticies[index++]=w1;verticies[index++]=h1;verticies[index++]=sprite.position.x;verticies[index++]=sprite.position.y;verticies[index++]=sprite.scale.x;verticies[index++]=sprite.scale.y;verticies[index++]=sprite.rotation;verticies[index++]=uvs.x0;verticies[index++]=uvs.y1;verticies[index++]=sprite.alpha;verticies[index++]=w0;verticies[index++]=h1;verticies[index++]=sprite.position.x;verticies[index++]=sprite.position.y;verticies[index++]=sprite.scale.x;verticies[index++]=sprite.scale.y;verticies[index++]=sprite.rotation;verticies[index++]=uvs.x1;verticies[index++]=uvs.y1;verticies[index++]=sprite.alpha;verticies[index++]=w0;verticies[index++]=h0;verticies[index++]=sprite.position.x;verticies[index++]=sprite.position.y;verticies[index++]=sprite.scale.x;verticies[index++]=sprite.scale.y;verticies[index++]=sprite.rotation;verticies[index++]=uvs.x2;verticies[index++]=uvs.y2;verticies[index++]=sprite.alpha;verticies[index++]=w1;verticies[index++]=h0;verticies[index++]=sprite.position.x;verticies[index++]=sprite.position.y;verticies[index++]=sprite.scale.x;verticies[index++]=sprite.scale.y;verticies[index++]=sprite.rotation;verticies[index++]=uvs.x3;verticies[index++]=uvs.y3;verticies[index++]=sprite.alpha;this.currentBatchSize++;if(this.currentBatchSize>=this.size)
{this.flush();}};PIXI.WebGLFastSpriteBatch.prototype.flush=function()
{if(this.currentBatchSize===0)return;var gl=this.gl;if(!this.currentBaseTexture._glTextures[gl.id])PIXI.createWebGLTexture(this.currentBaseTexture,gl);gl.bindTexture(gl.TEXTURE_2D,this.currentBaseTexture._glTextures[gl.id]);if(this.currentBatchSize>(this.size*0.5))
{gl.bufferSubData(gl.ARRAY_BUFFER,0,this.vertices);}
else
{var view=this.vertices.subarray(0,this.currentBatchSize*4*this.vertSize);gl.bufferSubData(gl.ARRAY_BUFFER,0,view);}
gl.drawElements(gl.TRIANGLES,this.currentBatchSize*6,gl.UNSIGNED_SHORT,0);this.currentBatchSize=0;this.renderSession.drawCount++;};PIXI.WebGLFastSpriteBatch.prototype.stop=function()
{this.flush();};PIXI.WebGLFastSpriteBatch.prototype.start=function()
{var gl=this.gl;gl.activeTexture(gl.TEXTURE0);gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var projection=this.renderSession.projection;gl.uniform2f(this.shader.projectionVector,projection.x,projection.y);gl.uniformMatrix3fv(this.shader.uMatrix,false,this.matrix);var stride=this.vertSize*4;gl.vertexAttribPointer(this.shader.aVertexPosition,2,gl.FLOAT,false,stride,0);gl.vertexAttribPointer(this.shader.aPositionCoord,2,gl.FLOAT,false,stride,2*4);gl.vertexAttribPointer(this.shader.aScale,2,gl.FLOAT,false,stride,4*4);gl.vertexAttribPointer(this.shader.aRotation,1,gl.FLOAT,false,stride,6*4);gl.vertexAttribPointer(this.shader.aTextureCoord,2,gl.FLOAT,false,stride,7*4);gl.vertexAttribPointer(this.shader.colorAttribute,1,gl.FLOAT,false,stride,9*4);if(this.currentBlendMode!==PIXI.blendModes.NORMAL)
{this.setBlendMode(PIXI.blendModes.NORMAL);}};PIXI.WebGLFastSpriteBatch.prototype.setBlendMode=function(blendMode)
{this.flush();this.currentBlendMode=blendMode;var blendModeWebGL=PIXI.blendModesWebGL[this.currentBlendMode];this.gl.blendFunc(blendModeWebGL[0],blendModeWebGL[1]);};PIXI.WebGLFilterManager=function(gl,transparent)
{this.transparent=transparent;this.filterStack=[];this.offsetX=0;this.offsetY=0;this.setContext(gl);};PIXI.WebGLFilterManager.prototype.setContext=function(gl)
{this.gl=gl;this.texturePool=[];this.initShaderBuffers();};PIXI.WebGLFilterManager.prototype.begin=function(renderSession,buffer)
{this.renderSession=renderSession;this.defaultShader=renderSession.shaderManager.defaultShader;var projection=this.renderSession.projection;this.width=projection.x*2;this.height=-projection.y*2;this.buffer=buffer;};PIXI.WebGLFilterManager.prototype.pushFilter=function(filterBlock)
{var gl=this.gl;var projection=this.renderSession.projection;var offset=this.renderSession.offset;filterBlock._filterArea=filterBlock.target.filterArea||filterBlock.target.getBounds();this.filterStack.push(filterBlock);var filter=filterBlock.filterPasses[0];this.offsetX+=filterBlock._filterArea.x;this.offsetY+=filterBlock._filterArea.y;var texture=this.texturePool.pop();if(!texture)
{texture=new PIXI.FilterTexture(this.gl,this.width,this.height);}
else
{texture.resize(this.width,this.height);}
gl.bindTexture(gl.TEXTURE_2D,texture.texture);var filterArea=filterBlock._filterArea;var padding=filter.padding;filterArea.x-=padding;filterArea.y-=padding;filterArea.width+=padding*2;filterArea.height+=padding*2;if(filterArea.x<0)filterArea.x=0;if(filterArea.width>this.width)filterArea.width=this.width;if(filterArea.y<0)filterArea.y=0;if(filterArea.height>this.height)filterArea.height=this.height;gl.bindFramebuffer(gl.FRAMEBUFFER,texture.frameBuffer);gl.viewport(0,0,filterArea.width,filterArea.height);projection.x=filterArea.width/2;projection.y=-filterArea.height/2;offset.x=-filterArea.x;offset.y=-filterArea.y;gl.uniform2f(this.defaultShader.projectionVector,filterArea.width/2,-filterArea.height/2);gl.uniform2f(this.defaultShader.offsetVector,-filterArea.x,-filterArea.y);gl.colorMask(true,true,true,true);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);filterBlock._glFilterTexture=texture;};PIXI.WebGLFilterManager.prototype.popFilter=function()
{var gl=this.gl;var filterBlock=this.filterStack.pop();var filterArea=filterBlock._filterArea;var texture=filterBlock._glFilterTexture;var projection=this.renderSession.projection;var offset=this.renderSession.offset;if(filterBlock.filterPasses.length>1)
{gl.viewport(0,0,filterArea.width,filterArea.height);gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);this.vertexArray[0]=0;this.vertexArray[1]=filterArea.height;this.vertexArray[2]=filterArea.width;this.vertexArray[3]=filterArea.height;this.vertexArray[4]=0;this.vertexArray[5]=0;this.vertexArray[6]=filterArea.width;this.vertexArray[7]=0;gl.bufferSubData(gl.ARRAY_BUFFER,0,this.vertexArray);gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);this.uvArray[2]=filterArea.width/this.width;this.uvArray[5]=filterArea.height/this.height;this.uvArray[6]=filterArea.width/this.width;this.uvArray[7]=filterArea.height/this.height;gl.bufferSubData(gl.ARRAY_BUFFER,0,this.uvArray);var inputTexture=texture;var outputTexture=this.texturePool.pop();if(!outputTexture)outputTexture=new PIXI.FilterTexture(this.gl,this.width,this.height);outputTexture.resize(this.width,this.height);gl.bindFramebuffer(gl.FRAMEBUFFER,outputTexture.frameBuffer);gl.clear(gl.COLOR_BUFFER_BIT);gl.disable(gl.BLEND);for(var i=0;i<filterBlock.filterPasses.length-1;i++)
{var filterPass=filterBlock.filterPasses[i];gl.bindFramebuffer(gl.FRAMEBUFFER,outputTexture.frameBuffer);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,inputTexture.texture);this.applyFilterPass(filterPass,filterArea,filterArea.width,filterArea.height);var temp=inputTexture;inputTexture=outputTexture;outputTexture=temp;}
gl.enable(gl.BLEND);texture=inputTexture;this.texturePool.push(outputTexture);}
var filter=filterBlock.filterPasses[filterBlock.filterPasses.length-1];this.offsetX-=filterArea.x;this.offsetY-=filterArea.y;var sizeX=this.width;var sizeY=this.height;var offsetX=0;var offsetY=0;var buffer=this.buffer;if(this.filterStack.length===0)
{gl.colorMask(true,true,true,true);}
else
{var currentFilter=this.filterStack[this.filterStack.length-1];filterArea=currentFilter._filterArea;sizeX=filterArea.width;sizeY=filterArea.height;offsetX=filterArea.x;offsetY=filterArea.y;buffer=currentFilter._glFilterTexture.frameBuffer;}
projection.x=sizeX/2;projection.y=-sizeY/2;offset.x=offsetX;offset.y=offsetY;filterArea=filterBlock._filterArea;var x=filterArea.x-offsetX;var y=filterArea.y-offsetY;gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);this.vertexArray[0]=x;this.vertexArray[1]=y+filterArea.height;this.vertexArray[2]=x+filterArea.width;this.vertexArray[3]=y+filterArea.height;this.vertexArray[4]=x;this.vertexArray[5]=y;this.vertexArray[6]=x+filterArea.width;this.vertexArray[7]=y;gl.bufferSubData(gl.ARRAY_BUFFER,0,this.vertexArray);gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);this.uvArray[2]=filterArea.width/this.width;this.uvArray[5]=filterArea.height/this.height;this.uvArray[6]=filterArea.width/this.width;this.uvArray[7]=filterArea.height/this.height;gl.bufferSubData(gl.ARRAY_BUFFER,0,this.uvArray);gl.viewport(0,0,sizeX,sizeY);gl.bindFramebuffer(gl.FRAMEBUFFER,buffer);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture.texture);this.applyFilterPass(filter,filterArea,sizeX,sizeY);gl.useProgram(this.defaultShader.program);gl.uniform2f(this.defaultShader.projectionVector,sizeX/2,-sizeY/2);gl.uniform2f(this.defaultShader.offsetVector,-offsetX,-offsetY);this.texturePool.push(texture);filterBlock._glFilterTexture=null;};PIXI.WebGLFilterManager.prototype.applyFilterPass=function(filter,filterArea,width,height)
{var gl=this.gl;var shader=filter.shaders[gl.id];if(!shader)
{shader=new PIXI.PixiShader(gl);shader.fragmentSrc=filter.fragmentSrc;shader.uniforms=filter.uniforms;shader.init();filter.shaders[gl.id]=shader;}
gl.useProgram(shader.program);gl.uniform2f(shader.projectionVector,width/2,-height/2);gl.uniform2f(shader.offsetVector,0,0);if(filter.uniforms.dimensions)
{filter.uniforms.dimensions.value[0]=this.width;filter.uniforms.dimensions.value[1]=this.height;filter.uniforms.dimensions.value[2]=this.vertexArray[0];filter.uniforms.dimensions.value[3]=this.vertexArray[5];}
shader.syncUniforms();gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);gl.vertexAttribPointer(shader.aVertexPosition,2,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);gl.vertexAttribPointer(shader.aTextureCoord,2,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,this.colorBuffer);gl.vertexAttribPointer(shader.colorAttribute,2,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0);this.renderSession.drawCount++;};PIXI.WebGLFilterManager.prototype.initShaderBuffers=function()
{var gl=this.gl;this.vertexBuffer=gl.createBuffer();this.uvBuffer=gl.createBuffer();this.colorBuffer=gl.createBuffer();this.indexBuffer=gl.createBuffer();this.vertexArray=new Float32Array([0.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0]);gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,this.vertexArray,gl.STATIC_DRAW);this.uvArray=new Float32Array([0.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0]);gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);gl.bufferData(gl.ARRAY_BUFFER,this.uvArray,gl.STATIC_DRAW);this.colorArray=new Float32Array([1.0,0xFFFFFF,1.0,0xFFFFFF,1.0,0xFFFFFF,1.0,0xFFFFFF]);gl.bindBuffer(gl.ARRAY_BUFFER,this.colorBuffer);gl.bufferData(gl.ARRAY_BUFFER,this.colorArray,gl.STATIC_DRAW);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,1,3,2]),gl.STATIC_DRAW);};PIXI.WebGLFilterManager.prototype.destroy=function()
{var gl=this.gl;this.filterStack=null;this.offsetX=0;this.offsetY=0;for(var i=0;i<this.texturePool.length;i++){this.texturePool.destroy();}
this.texturePool=null;gl.deleteBuffer(this.vertexBuffer);gl.deleteBuffer(this.uvBuffer);gl.deleteBuffer(this.colorBuffer);gl.deleteBuffer(this.indexBuffer);};PIXI.FilterTexture=function(gl,width,height,scaleMode)
{this.gl=gl;this.frameBuffer=gl.createFramebuffer();this.texture=gl.createTexture();scaleMode=scaleMode||PIXI.scaleModes.DEFAULT;gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,scaleMode===PIXI.scaleModes.LINEAR?gl.LINEAR:gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,scaleMode===PIXI.scaleModes.LINEAR?gl.LINEAR:gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.bindFramebuffer(gl.FRAMEBUFFER,this.framebuffer);gl.bindFramebuffer(gl.FRAMEBUFFER,this.frameBuffer);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.texture,0);this.renderBuffer=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,this.renderBuffer);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_STENCIL_ATTACHMENT,gl.RENDERBUFFER,this.renderBuffer);this.resize(width,height);};PIXI.FilterTexture.prototype.clear=function()
{var gl=this.gl;gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);};PIXI.FilterTexture.prototype.resize=function(width,height)
{if(this.width===width&&this.height===height)return;this.width=width;this.height=height;var gl=this.gl;gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,width,height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);gl.bindRenderbuffer(gl.RENDERBUFFER,this.renderBuffer);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_STENCIL,width,height);};PIXI.FilterTexture.prototype.destroy=function()
{var gl=this.gl;gl.deleteFramebuffer(this.frameBuffer);gl.deleteTexture(this.texture);this.frameBuffer=null;this.texture=null;};PIXI.CanvasMaskManager=function()
{};PIXI.CanvasMaskManager.prototype.pushMask=function(maskData,context)
{context.save();var cacheAlpha=maskData.alpha;var transform=maskData.worldTransform;context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty);PIXI.CanvasGraphics.renderGraphicsMask(maskData,context);context.clip();maskData.worldAlpha=cacheAlpha;};PIXI.CanvasMaskManager.prototype.popMask=function(context)
{context.restore();};PIXI.CanvasTinter=function()
{};PIXI.CanvasTinter.getTintedTexture=function(sprite,color)
{var texture=sprite.texture;color=PIXI.CanvasTinter.roundColor(color);var stringColor="#"+("00000"+(color|0).toString(16)).substr(-6);texture.tintCache=texture.tintCache||{};if(texture.tintCache[stringColor])return texture.tintCache[stringColor];var canvas=PIXI.CanvasTinter.canvas||document.createElement("canvas");PIXI.CanvasTinter.tintMethod(texture,color,canvas);if(PIXI.CanvasTinter.convertTintToImage)
{var tintImage=new Image();tintImage.src=canvas.toDataURL();texture.tintCache[stringColor]=tintImage;}
else
{texture.tintCache[stringColor]=canvas;PIXI.CanvasTinter.canvas=null;}
return canvas;};PIXI.CanvasTinter.tintWithMultiply=function(texture,color,canvas)
{var context=canvas.getContext("2d");var frame=texture.frame;canvas.width=frame.width;canvas.height=frame.height;context.fillStyle="#"+("00000"+(color|0).toString(16)).substr(-6);context.fillRect(0,0,frame.width,frame.height);context.globalCompositeOperation="multiply";context.drawImage(texture.baseTexture.source,frame.x,frame.y,frame.width,frame.height,0,0,frame.width,frame.height);context.globalCompositeOperation="destination-atop";context.drawImage(texture.baseTexture.source,frame.x,frame.y,frame.width,frame.height,0,0,frame.width,frame.height);};PIXI.CanvasTinter.tintWithOverlay=function(texture,color,canvas)
{var context=canvas.getContext("2d");var frame=texture.frame;canvas.width=frame.width;canvas.height=frame.height;context.globalCompositeOperation="copy";context.fillStyle="#"+("00000"+(color|0).toString(16)).substr(-6);context.fillRect(0,0,frame.width,frame.height);context.globalCompositeOperation="destination-atop";context.drawImage(texture.baseTexture.source,frame.x,frame.y,frame.width,frame.height,0,0,frame.width,frame.height);};PIXI.CanvasTinter.tintWithPerPixel=function(texture,color,canvas)
{var context=canvas.getContext("2d");var frame=texture.frame;canvas.width=frame.width;canvas.height=frame.height;context.globalCompositeOperation="copy";context.drawImage(texture.baseTexture.source,frame.x,frame.y,frame.width,frame.height,0,0,frame.width,frame.height);var rgbValues=PIXI.hex2rgb(color);var r=rgbValues[0],g=rgbValues[1],b=rgbValues[2];var pixelData=context.getImageData(0,0,frame.width,frame.height);var pixels=pixelData.data;for(var i=0;i<pixels.length;i+=4)
{pixels[i+0]*=r;pixels[i+1]*=g;pixels[i+2]*=b;}
context.putImageData(pixelData,0,0);};PIXI.CanvasTinter.roundColor=function(color)
{var step=PIXI.CanvasTinter.cacheStepsPerColorChannel;var rgbValues=PIXI.hex2rgb(color);rgbValues[0]=Math.min(255,(rgbValues[0]/step)*step);rgbValues[1]=Math.min(255,(rgbValues[1]/step)*step);rgbValues[2]=Math.min(255,(rgbValues[2]/step)*step);return PIXI.rgb2hex(rgbValues);};PIXI.CanvasTinter.cacheStepsPerColorChannel=8;PIXI.CanvasTinter.convertTintToImage=false;PIXI.CanvasTinter.canUseMultiply=PIXI.canUseNewCanvasBlendModes();PIXI.CanvasTinter.tintMethod=PIXI.CanvasTinter.canUseMultiply?PIXI.CanvasTinter.tintWithMultiply:PIXI.CanvasTinter.tintWithPerPixel;PIXI.CanvasRenderer=function(width,height,view,transparent)
{PIXI.defaultRenderer=PIXI.defaultRenderer||this;this.type=PIXI.CANVAS_RENDERER;this.clearBeforeRender=true;this.roundPixels=false;this.transparent=!!transparent;if(!PIXI.blendModesCanvas)
{PIXI.blendModesCanvas=[];if(PIXI.canUseNewCanvasBlendModes())
{PIXI.blendModesCanvas[PIXI.blendModes.NORMAL]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.ADD]="lighter";PIXI.blendModesCanvas[PIXI.blendModes.MULTIPLY]="multiply";PIXI.blendModesCanvas[PIXI.blendModes.SCREEN]="screen";PIXI.blendModesCanvas[PIXI.blendModes.OVERLAY]="overlay";PIXI.blendModesCanvas[PIXI.blendModes.DARKEN]="darken";PIXI.blendModesCanvas[PIXI.blendModes.LIGHTEN]="lighten";PIXI.blendModesCanvas[PIXI.blendModes.COLOR_DODGE]="color-dodge";PIXI.blendModesCanvas[PIXI.blendModes.COLOR_BURN]="color-burn";PIXI.blendModesCanvas[PIXI.blendModes.HARD_LIGHT]="hard-light";PIXI.blendModesCanvas[PIXI.blendModes.SOFT_LIGHT]="soft-light";PIXI.blendModesCanvas[PIXI.blendModes.DIFFERENCE]="difference";PIXI.blendModesCanvas[PIXI.blendModes.EXCLUSION]="exclusion";PIXI.blendModesCanvas[PIXI.blendModes.HUE]="hue";PIXI.blendModesCanvas[PIXI.blendModes.SATURATION]="saturation";PIXI.blendModesCanvas[PIXI.blendModes.COLOR]="color";PIXI.blendModesCanvas[PIXI.blendModes.LUMINOSITY]="luminosity";}
else
{PIXI.blendModesCanvas[PIXI.blendModes.NORMAL]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.ADD]="lighter";PIXI.blendModesCanvas[PIXI.blendModes.MULTIPLY]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.SCREEN]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.OVERLAY]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.DARKEN]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.LIGHTEN]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.COLOR_DODGE]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.COLOR_BURN]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.HARD_LIGHT]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.SOFT_LIGHT]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.DIFFERENCE]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.EXCLUSION]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.HUE]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.SATURATION]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.COLOR]="source-over";PIXI.blendModesCanvas[PIXI.blendModes.LUMINOSITY]="source-over";}}
this.width=width||800;this.height=height||600;this.view=view||document.createElement("canvas");this.context=this.view.getContext("2d",{alpha:this.transparent});this.refresh=true;this.view.width=this.width;this.view.height=this.height;this.count=0;this.maskManager=new PIXI.CanvasMaskManager();this.renderSession={context:this.context,maskManager:this.maskManager,scaleMode:null,smoothProperty:null};if("imageSmoothingEnabled"in this.context)
this.renderSession.smoothProperty="imageSmoothingEnabled";else if("webkitImageSmoothingEnabled"in this.context)
this.renderSession.smoothProperty="webkitImageSmoothingEnabled";else if("mozImageSmoothingEnabled"in this.context)
this.renderSession.smoothProperty="mozImageSmoothingEnabled";else if("oImageSmoothingEnabled"in this.context)
this.renderSession.smoothProperty="oImageSmoothingEnabled";};PIXI.CanvasRenderer.prototype.constructor=PIXI.CanvasRenderer;PIXI.CanvasRenderer.prototype.render=function(stage)
{PIXI.texturesToUpdate.length=0;PIXI.texturesToDestroy.length=0;stage.updateTransform();this.context.setTransform(1,0,0,1,0,0);this.context.globalAlpha=1;if(!this.transparent&&this.clearBeforeRender)
{this.context.fillStyle=stage.backgroundColorString;this.context.fillRect(0,0,this.width,this.height);}
else if(this.transparent&&this.clearBeforeRender)
{this.context.clearRect(0,0,this.width,this.height);}
this.renderDisplayObject(stage);if(stage.interactive)
{if(!stage._interactiveEventsAdded)
{stage._interactiveEventsAdded=true;stage.interactionManager.setTarget(this);}}
if(PIXI.Texture.frameUpdates.length>0)
{PIXI.Texture.frameUpdates.length=0;}};PIXI.CanvasRenderer.prototype.resize=function(width,height)
{this.width=width;this.height=height;this.view.width=width;this.view.height=height;};PIXI.CanvasRenderer.prototype.renderDisplayObject=function(displayObject,context)
{this.renderSession.context=context||this.context;displayObject._renderCanvas(this.renderSession);};PIXI.CanvasRenderer.prototype.renderStripFlat=function(strip)
{var context=this.context;var verticies=strip.verticies;var length=verticies.length/2;this.count++;context.beginPath();for(var i=1;i<length-2;i++)
{var index=i*2;var x0=verticies[index],x1=verticies[index+2],x2=verticies[index+4];var y0=verticies[index+1],y1=verticies[index+3],y2=verticies[index+5];context.moveTo(x0,y0);context.lineTo(x1,y1);context.lineTo(x2,y2);}
context.fillStyle="#FF0000";context.fill();context.closePath();};PIXI.CanvasRenderer.prototype.renderStrip=function(strip)
{var context=this.context;var verticies=strip.verticies;var uvs=strip.uvs;var length=verticies.length/2;this.count++;for(var i=1;i<length-2;i++)
{var index=i*2;var x0=verticies[index],x1=verticies[index+2],x2=verticies[index+4];var y0=verticies[index+1],y1=verticies[index+3],y2=verticies[index+5];var u0=uvs[index]*strip.texture.width,u1=uvs[index+2]*strip.texture.width,u2=uvs[index+4]*strip.texture.width;var v0=uvs[index+1]*strip.texture.height,v1=uvs[index+3]*strip.texture.height,v2=uvs[index+5]*strip.texture.height;context.save();context.beginPath();context.moveTo(x0,y0);context.lineTo(x1,y1);context.lineTo(x2,y2);context.closePath();context.clip();var delta=u0*v1+v0*u2+u1*v2-v1*u2-v0*u1-u0*v2;var deltaA=x0*v1+v0*x2+x1*v2-v1*x2-v0*x1-x0*v2;var deltaB=u0*x1+x0*u2+u1*x2-x1*u2-x0*u1-u0*x2;var deltaC=u0*v1*x2+v0*x1*u2+x0*u1*v2-x0*v1*u2-v0*u1*x2-u0*x1*v2;var deltaD=y0*v1+v0*y2+y1*v2-v1*y2-v0*y1-y0*v2;var deltaE=u0*y1+y0*u2+u1*y2-y1*u2-y0*u1-u0*y2;var deltaF=u0*v1*y2+v0*y1*u2+y0*u1*v2-y0*v1*u2-v0*u1*y2-u0*y1*v2;context.transform(deltaA/delta,deltaD/delta,deltaB/delta,deltaE/delta,deltaC/delta,deltaF/delta);context.drawImage(strip.texture.baseTexture.source,0,0);context.restore();}};PIXI.CanvasBuffer=function(width,height)
{this.width=width;this.height=height;this.canvas=document.createElement("canvas");this.context=this.canvas.getContext("2d");this.canvas.width=width;this.canvas.height=height;};PIXI.CanvasBuffer.prototype.clear=function()
{this.context.clearRect(0,0,this.width,this.height);};PIXI.CanvasBuffer.prototype.resize=function(width,height)
{this.width=this.canvas.width=width;this.height=this.canvas.height=height;};PIXI.CanvasGraphics=function()
{};PIXI.CanvasGraphics.renderGraphics=function(graphics,context)
{var worldAlpha=graphics.worldAlpha;var color='';for(var i=0;i<graphics.graphicsData.length;i++)
{var data=graphics.graphicsData[i];var points=data.points;context.strokeStyle=color='#'+('00000'+(data.lineColor|0).toString(16)).substr(-6);context.lineWidth=data.lineWidth;if(data.type===PIXI.Graphics.POLY)
{context.beginPath();context.moveTo(points[0],points[1]);for(var j=1;j<points.length/2;j++)
{context.lineTo(points[j*2],points[j*2+1]);}
if(points[0]===points[points.length-2]&&points[1]===points[points.length-1])
{context.closePath();}
if(data.fill)
{context.globalAlpha=data.fillAlpha*worldAlpha;context.fillStyle=color='#'+('00000'+(data.fillColor|0).toString(16)).substr(-6);context.fill();}
if(data.lineWidth)
{context.globalAlpha=data.lineAlpha*worldAlpha;context.stroke();}}
else if(data.type===PIXI.Graphics.RECT)
{if(data.fillColor||data.fillColor===0)
{context.globalAlpha=data.fillAlpha*worldAlpha;context.fillStyle=color='#'+('00000'+(data.fillColor|0).toString(16)).substr(-6);context.fillRect(points[0],points[1],points[2],points[3]);}
if(data.lineWidth)
{context.globalAlpha=data.lineAlpha*worldAlpha;context.strokeRect(points[0],points[1],points[2],points[3]);}}
else if(data.type===PIXI.Graphics.CIRC)
{context.beginPath();context.arc(points[0],points[1],points[2],0,2*Math.PI);context.closePath();if(data.fill)
{context.globalAlpha=data.fillAlpha*worldAlpha;context.fillStyle=color='#'+('00000'+(data.fillColor|0).toString(16)).substr(-6);context.fill();}
if(data.lineWidth)
{context.globalAlpha=data.lineAlpha*worldAlpha;context.stroke();}}
else if(data.type===PIXI.Graphics.ELIP)
{var ellipseData=data.points;var w=ellipseData[2]*2;var h=ellipseData[3]*2;var x=ellipseData[0]-w/2;var y=ellipseData[1]-h/2;context.beginPath();var kappa=0.5522848,ox=(w/2)*kappa,oy=(h/2)*kappa,xe=x+w,ye=y+h,xm=x+w/2,ym=y+h/2;context.moveTo(x,ym);context.bezierCurveTo(x,ym-oy,xm-ox,y,xm,y);context.bezierCurveTo(xm+ox,y,xe,ym-oy,xe,ym);context.bezierCurveTo(xe,ym+oy,xm+ox,ye,xm,ye);context.bezierCurveTo(xm-ox,ye,x,ym+oy,x,ym);context.closePath();if(data.fill)
{context.globalAlpha=data.fillAlpha*worldAlpha;context.fillStyle=color='#'+('00000'+(data.fillColor|0).toString(16)).substr(-6);context.fill();}
if(data.lineWidth)
{context.globalAlpha=data.lineAlpha*worldAlpha;context.stroke();}}}};PIXI.CanvasGraphics.renderGraphicsMask=function(graphics,context)
{var len=graphics.graphicsData.length;if(len===0)return;if(len>1)
{len=1;window.console.log('Pixi.js warning: masks in canvas can only mask using the first path in the graphics object');}
for(var i=0;i<1;i++)
{var data=graphics.graphicsData[i];var points=data.points;if(data.type===PIXI.Graphics.POLY)
{context.beginPath();context.moveTo(points[0],points[1]);for(var j=1;j<points.length/2;j++)
{context.lineTo(points[j*2],points[j*2+1]);}
if(points[0]===points[points.length-2]&&points[1]===points[points.length-1])
{context.closePath();}}
else if(data.type===PIXI.Graphics.RECT)
{context.beginPath();context.rect(points[0],points[1],points[2],points[3]);context.closePath();}
else if(data.type===PIXI.Graphics.CIRC)
{context.beginPath();context.arc(points[0],points[1],points[2],0,2*Math.PI);context.closePath();}
else if(data.type===PIXI.Graphics.ELIP)
{var ellipseData=data.points;var w=ellipseData[2]*2;var h=ellipseData[3]*2;var x=ellipseData[0]-w/2;var y=ellipseData[1]-h/2;context.beginPath();var kappa=0.5522848,ox=(w/2)*kappa,oy=(h/2)*kappa,xe=x+w,ye=y+h,xm=x+w/2,ym=y+h/2;context.moveTo(x,ym);context.bezierCurveTo(x,ym-oy,xm-ox,y,xm,y);context.bezierCurveTo(xm+ox,y,xe,ym-oy,xe,ym);context.bezierCurveTo(xe,ym+oy,xm+ox,ye,xm,ye);context.bezierCurveTo(xm-ox,ye,x,ym+oy,x,ym);context.closePath();}}};PIXI.Graphics=function()
{PIXI.DisplayObjectContainer.call(this);this.renderable=true;this.fillAlpha=1;this.lineWidth=0;this.lineColor="black";this.graphicsData=[];this.tint=0xFFFFFF;this.blendMode=PIXI.blendModes.NORMAL;this.currentPath={points:[]};this._webGL=[];this.isMask=false;this.bounds=null;this.boundsPadding=10;};PIXI.Graphics.prototype=Object.create(PIXI.DisplayObjectContainer.prototype);PIXI.Graphics.prototype.constructor=PIXI.Graphics;Object.defineProperty(PIXI.Graphics.prototype,"cacheAsBitmap",{get:function(){return this._cacheAsBitmap;},set:function(value){this._cacheAsBitmap=value;if(this._cacheAsBitmap)
{this._generateCachedSprite();}
else
{this.destroyCachedSprite();this.dirty=true;}}});PIXI.Graphics.prototype.lineStyle=function(lineWidth,color,alpha)
{if(!this.currentPath.points.length)this.graphicsData.pop();this.lineWidth=lineWidth||0;this.lineColor=color||0;this.lineAlpha=(arguments.length<3)?1:alpha;this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[],type:PIXI.Graphics.POLY};this.graphicsData.push(this.currentPath);return this;};PIXI.Graphics.prototype.moveTo=function(x,y)
{if(!this.currentPath.points.length)this.graphicsData.pop();this.currentPath=this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[],type:PIXI.Graphics.POLY};this.currentPath.points.push(x,y);this.graphicsData.push(this.currentPath);return this;};PIXI.Graphics.prototype.lineTo=function(x,y)
{this.currentPath.points.push(x,y);this.dirty=true;return this;};PIXI.Graphics.prototype.beginFill=function(color,alpha)
{this.filling=true;this.fillColor=color||0;this.fillAlpha=(arguments.length<2)?1:alpha;return this;};PIXI.Graphics.prototype.endFill=function()
{this.filling=false;this.fillColor=null;this.fillAlpha=1;return this;};PIXI.Graphics.prototype.drawRect=function(x,y,width,height)
{if(!this.currentPath.points.length)this.graphicsData.pop();this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[x,y,width,height],type:PIXI.Graphics.RECT};this.graphicsData.push(this.currentPath);this.dirty=true;return this;};PIXI.Graphics.prototype.drawCircle=function(x,y,radius)
{if(!this.currentPath.points.length)this.graphicsData.pop();this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[x,y,radius,radius],type:PIXI.Graphics.CIRC};this.graphicsData.push(this.currentPath);this.dirty=true;return this;};PIXI.Graphics.prototype.drawEllipse=function(x,y,width,height)
{if(!this.currentPath.points.length)this.graphicsData.pop();this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[x,y,width,height],type:PIXI.Graphics.ELIP};this.graphicsData.push(this.currentPath);this.dirty=true;return this;};PIXI.Graphics.prototype.clear=function()
{this.lineWidth=0;this.filling=false;this.dirty=true;this.clearDirty=true;this.graphicsData=[];this.bounds=null;return this;};PIXI.Graphics.prototype.generateTexture=function()
{var bounds=this.getBounds();var canvasBuffer=new PIXI.CanvasBuffer(bounds.width,bounds.height);var texture=PIXI.Texture.fromCanvas(canvasBuffer.canvas);canvasBuffer.context.translate(-bounds.x,-bounds.y);PIXI.CanvasGraphics.renderGraphics(this,canvasBuffer.context);return texture;};PIXI.Graphics.prototype._renderWebGL=function(renderSession)
{if(this.visible===false||this.alpha===0||this.isMask===true)return;if(this._cacheAsBitmap)
{if(this.dirty)
{this._generateCachedSprite();PIXI.updateWebGLTexture(this._cachedSprite.texture.baseTexture,renderSession.gl);this.dirty=false;}
this._cachedSprite.alpha=this.alpha;PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite,renderSession);return;}
else
{renderSession.spriteBatch.stop();if(this._mask)renderSession.maskManager.pushMask(this.mask,renderSession);if(this._filters)renderSession.filterManager.pushFilter(this._filterBlock);if(this.blendMode!==renderSession.spriteBatch.currentBlendMode)
{renderSession.spriteBatch.currentBlendMode=this.blendMode;var blendModeWebGL=PIXI.blendModesWebGL[renderSession.spriteBatch.currentBlendMode];renderSession.spriteBatch.gl.blendFunc(blendModeWebGL[0],blendModeWebGL[1]);}
PIXI.WebGLGraphics.renderGraphics(this,renderSession);if(this.children.length)
{renderSession.spriteBatch.start();for(var i=0,j=this.children.length;i<j;i++)
{this.children[i]._renderWebGL(renderSession);}
renderSession.spriteBatch.stop();}
if(this._filters)renderSession.filterManager.popFilter();if(this._mask)renderSession.maskManager.popMask(renderSession);renderSession.drawCount++;renderSession.spriteBatch.start();}};PIXI.Graphics.prototype._renderCanvas=function(renderSession)
{if(this.visible===false||this.alpha===0||this.isMask===true)return;var context=renderSession.context;var transform=this.worldTransform;if(this.blendMode!==renderSession.currentBlendMode)
{renderSession.currentBlendMode=this.blendMode;context.globalCompositeOperation=PIXI.blendModesCanvas[renderSession.currentBlendMode];}
context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty);PIXI.CanvasGraphics.renderGraphics(this,context);for(var i=0,j=this.children.length;i<j;i++)
{this.children[i]._renderCanvas(renderSession);}};PIXI.Graphics.prototype.getBounds=function(matrix)
{if(!this.bounds)this.updateBounds();var w0=this.bounds.x;var w1=this.bounds.width+this.bounds.x;var h0=this.bounds.y;var h1=this.bounds.height+this.bounds.y;var worldTransform=matrix||this.worldTransform;var a=worldTransform.a;var b=worldTransform.c;var c=worldTransform.b;var d=worldTransform.d;var tx=worldTransform.tx;var ty=worldTransform.ty;var x1=a*w1+c*h1+tx;var y1=d*h1+b*w1+ty;var x2=a*w0+c*h1+tx;var y2=d*h1+b*w0+ty;var x3=a*w0+c*h0+tx;var y3=d*h0+b*w0+ty;var x4=a*w1+c*h0+tx;var y4=d*h0+b*w1+ty;var maxX=x1;var maxY=y1;var minX=x1;var minY=y1;minX=x2<minX?x2:minX;minX=x3<minX?x3:minX;minX=x4<minX?x4:minX;minY=y2<minY?y2:minY;minY=y3<minY?y3:minY;minY=y4<minY?y4:minY;maxX=x2>maxX?x2:maxX;maxX=x3>maxX?x3:maxX;maxX=x4>maxX?x4:maxX;maxY=y2>maxY?y2:maxY;maxY=y3>maxY?y3:maxY;maxY=y4>maxY?y4:maxY;var bounds=this._bounds;bounds.x=minX;bounds.width=maxX-minX;bounds.y=minY;bounds.height=maxY-minY;return bounds;};PIXI.Graphics.prototype.updateBounds=function()
{var minX=Infinity;var maxX=-Infinity;var minY=Infinity;var maxY=-Infinity;var points,x,y,w,h;for(var i=0;i<this.graphicsData.length;i++){var data=this.graphicsData[i];var type=data.type;var lineWidth=data.lineWidth;points=data.points;if(type===PIXI.Graphics.RECT)
{x=points[0]-lineWidth/2;y=points[1]-lineWidth/2;w=points[2]+lineWidth;h=points[3]+lineWidth;minX=x<minX?x:minX;maxX=x+w>maxX?x+w:maxX;minY=y<minY?x:minY;maxY=y+h>maxY?y+h:maxY;}
else if(type===PIXI.Graphics.CIRC||type===PIXI.Graphics.ELIP)
{x=points[0];y=points[1];w=points[2]+lineWidth/2;h=points[3]+lineWidth/2;minX=x-w<minX?x-w:minX;maxX=x+w>maxX?x+w:maxX;minY=y-h<minY?y-h:minY;maxY=y+h>maxY?y+h:maxY;}
else
{for(var j=0;j<points.length;j+=2)
{x=points[j];y=points[j+1];minX=x-lineWidth<minX?x-lineWidth:minX;maxX=x+lineWidth>maxX?x+lineWidth:maxX;minY=y-lineWidth<minY?y-lineWidth:minY;maxY=y+lineWidth>maxY?y+lineWidth:maxY;}}}
var padding=this.boundsPadding;this.bounds=new PIXI.Rectangle(minX-padding,minY-padding,(maxX-minX)+padding*2,(maxY-minY)+padding*2);};PIXI.Graphics.prototype._generateCachedSprite=function()
{var bounds=this.getLocalBounds();if(!this._cachedSprite)
{var canvasBuffer=new PIXI.CanvasBuffer(bounds.width,bounds.height);var texture=PIXI.Texture.fromCanvas(canvasBuffer.canvas);this._cachedSprite=new PIXI.Sprite(texture);this._cachedSprite.buffer=canvasBuffer;this._cachedSprite.worldTransform=this.worldTransform;}
else
{this._cachedSprite.buffer.resize(bounds.width,bounds.height);}
this._cachedSprite.anchor.x=-(bounds.x/bounds.width);this._cachedSprite.anchor.y=-(bounds.y/bounds.height);this._cachedSprite.buffer.context.translate(-bounds.x,-bounds.y);PIXI.CanvasGraphics.renderGraphics(this,this._cachedSprite.buffer.context);this._cachedSprite.alpha=this.alpha;};PIXI.Graphics.prototype.destroyCachedSprite=function()
{this._cachedSprite.texture.destroy(true);this._cachedSprite=null;};PIXI.Graphics.POLY=0;PIXI.Graphics.RECT=1;PIXI.Graphics.CIRC=2;PIXI.Graphics.ELIP=3;PIXI.TilingSprite=function(texture,width,height)
{PIXI.Sprite.call(this,texture);this.width=width||100;this.height=height||100;this.tileScale=new PIXI.Point(1,1);this.tileScaleOffset=new PIXI.Point(1,1);this.tilePosition=new PIXI.Point(0,0);this.renderable=true;this.tint=0xFFFFFF;this.blendMode=PIXI.blendModes.NORMAL;};PIXI.TilingSprite.prototype=Object.create(PIXI.Sprite.prototype);PIXI.TilingSprite.prototype.constructor=PIXI.TilingSprite;Object.defineProperty(PIXI.TilingSprite.prototype,'width',{get:function(){return this._width;},set:function(value){this._width=value;}});Object.defineProperty(PIXI.TilingSprite.prototype,'height',{get:function(){return this._height;},set:function(value){this._height=value;}});PIXI.TilingSprite.prototype.onTextureUpdate=function()
{this.updateFrame=true;};PIXI.TilingSprite.prototype.setTexture=function(texture)
{if(this.texture===texture)return;this.texture=texture;this.refreshTexture=true;this.cachedTint=0xFFFFFF;};PIXI.TilingSprite.prototype._renderWebGL=function(renderSession)
{if(this.visible===false||this.alpha===0)return;var i,j;if(this.mask)
{renderSession.spriteBatch.stop();renderSession.maskManager.pushMask(this.mask,renderSession);renderSession.spriteBatch.start();}
if(this.filters)
{renderSession.spriteBatch.flush();renderSession.filterManager.pushFilter(this._filterBlock);}
if(!this.tilingTexture||this.refreshTexture)
{this.generateTilingTexture(true);if(this.tilingTexture&&this.tilingTexture.needsUpdate)
{PIXI.updateWebGLTexture(this.tilingTexture.baseTexture,renderSession.gl);this.tilingTexture.needsUpdate=false;}}
else renderSession.spriteBatch.renderTilingSprite(this);for(i=0,j=this.children.length;i<j;i++)
{this.children[i]._renderWebGL(renderSession);}
renderSession.spriteBatch.stop();if(this.filters)renderSession.filterManager.popFilter();if(this.mask)renderSession.maskManager.popMask(renderSession);renderSession.spriteBatch.start();};PIXI.TilingSprite.prototype._renderCanvas=function(renderSession)
{if(this.visible===false||this.alpha===0)return;var context=renderSession.context;if(this._mask)
{renderSession.maskManager.pushMask(this._mask,context);}
context.globalAlpha=this.worldAlpha;var transform=this.worldTransform;context.setTransform(transform.a,transform.c,transform.b,transform.d,transform.tx,transform.ty);if(!this.__tilePattern||this.refreshTexture)
{this.generateTilingTexture(false);if(this.tilingTexture)
{this.__tilePattern=context.createPattern(this.tilingTexture.baseTexture.source,'repeat');}
else
{return;}}
if(this.blendMode!==renderSession.currentBlendMode)
{renderSession.currentBlendMode=this.blendMode;context.globalCompositeOperation=PIXI.blendModesCanvas[renderSession.currentBlendMode];}
context.beginPath();var tilePosition=this.tilePosition;var tileScale=this.tileScale;tilePosition.x%=this.tilingTexture.baseTexture.width;tilePosition.y%=this.tilingTexture.baseTexture.height;context.scale(tileScale.x,tileScale.y);context.translate(tilePosition.x,tilePosition.y);context.fillStyle=this.__tilePattern;context.fillRect(-tilePosition.x+(this.anchor.x*-this._width),-tilePosition.y+(this.anchor.y*-this._height),this._width/tileScale.x,this._height/tileScale.y);context.scale(1/tileScale.x,1/tileScale.y);context.translate(-tilePosition.x,-tilePosition.y);context.closePath();if(this._mask)
{renderSession.maskManager.popMask(renderSession.context);}};PIXI.TilingSprite.prototype.getBounds=function()
{var width=this._width;var height=this._height;var w0=width*(1-this.anchor.x);var w1=width*-this.anchor.x;var h0=height*(1-this.anchor.y);var h1=height*-this.anchor.y;var worldTransform=this.worldTransform;var a=worldTransform.a;var b=worldTransform.c;var c=worldTransform.b;var d=worldTransform.d;var tx=worldTransform.tx;var ty=worldTransform.ty;var x1=a*w1+c*h1+tx;var y1=d*h1+b*w1+ty;var x2=a*w0+c*h1+tx;var y2=d*h1+b*w0+ty;var x3=a*w0+c*h0+tx;var y3=d*h0+b*w0+ty;var x4=a*w1+c*h0+tx;var y4=d*h0+b*w1+ty;var maxX=-Infinity;var maxY=-Infinity;var minX=Infinity;var minY=Infinity;minX=x1<minX?x1:minX;minX=x2<minX?x2:minX;minX=x3<minX?x3:minX;minX=x4<minX?x4:minX;minY=y1<minY?y1:minY;minY=y2<minY?y2:minY;minY=y3<minY?y3:minY;minY=y4<minY?y4:minY;maxX=x1>maxX?x1:maxX;maxX=x2>maxX?x2:maxX;maxX=x3>maxX?x3:maxX;maxX=x4>maxX?x4:maxX;maxY=y1>maxY?y1:maxY;maxY=y2>maxY?y2:maxY;maxY=y3>maxY?y3:maxY;maxY=y4>maxY?y4:maxY;var bounds=this._bounds;bounds.x=minX;bounds.width=maxX-minX;bounds.y=minY;bounds.height=maxY-minY;this._currentBounds=bounds;return bounds;};PIXI.TilingSprite.prototype.generateTilingTexture=function(forcePowerOfTwo)
{var texture=this.texture;if(!texture.baseTexture.hasLoaded)return;var baseTexture=texture.baseTexture;var frame=texture.frame;var targetWidth,targetHeight;var isFrame=frame.width!==baseTexture.width||frame.height!==baseTexture.height;var newTextureRequired=false;if(!forcePowerOfTwo)
{if(isFrame)
{targetWidth=frame.width;targetHeight=frame.height;newTextureRequired=true;}}
else
{targetWidth=PIXI.getNextPowerOfTwo(frame.width);targetHeight=PIXI.getNextPowerOfTwo(frame.height);if(frame.width!==targetWidth&&frame.height!==targetHeight)newTextureRequired=true;}
if(newTextureRequired)
{var canvasBuffer;if(this.tilingTexture&&this.tilingTexture.isTiling)
{canvasBuffer=this.tilingTexture.canvasBuffer;canvasBuffer.resize(targetWidth,targetHeight);this.tilingTexture.baseTexture.width=targetWidth;this.tilingTexture.baseTexture.height=targetHeight;this.tilingTexture.needsUpdate=true;}
else
{canvasBuffer=new PIXI.CanvasBuffer(targetWidth,targetHeight);this.tilingTexture=PIXI.Texture.fromCanvas(canvasBuffer.canvas);this.tilingTexture.canvasBuffer=canvasBuffer;this.tilingTexture.isTiling=true;}
canvasBuffer.context.drawImage(texture.baseTexture.source,frame.x,frame.y,frame.width,frame.height,0,0,targetWidth,targetHeight);this.tileScaleOffset.x=frame.width/targetWidth;this.tileScaleOffset.y=frame.height/targetHeight;}
else
{if(this.tilingTexture&&this.tilingTexture.isTiling)
{this.tilingTexture.destroy(true);}
this.tileScaleOffset.x=1;this.tileScaleOffset.y=1;this.tilingTexture=texture;}
this.refreshTexture=false;this.tilingTexture.baseTexture._powerOf2=true;};PIXI.BaseTextureCache={};PIXI.texturesToUpdate=[];PIXI.texturesToDestroy=[];PIXI.BaseTextureCacheIdGenerator=0;PIXI.BaseTexture=function(source,scaleMode)
{PIXI.EventTarget.call(this);this.width=100;this.height=100;this.scaleMode=scaleMode||PIXI.scaleModes.DEFAULT;this.hasLoaded=false;this.source=source;this.id=PIXI.BaseTextureCacheIdGenerator++;this._glTextures=[];if(!source)return;if((this.source.complete||this.source.getContext)&&this.source.width&&this.source.height)
{this.hasLoaded=true;this.width=this.source.width;this.height=this.source.height;PIXI.texturesToUpdate.push(this);}
else
{var scope=this;this.source.onload=function(){scope.hasLoaded=true;scope.width=scope.source.width;scope.height=scope.source.height;PIXI.texturesToUpdate.push(scope);scope.dispatchEvent({type:'loaded',content:scope});};}
this.imageUrl=null;this._powerOf2=false;};PIXI.BaseTexture.prototype.constructor=PIXI.BaseTexture;PIXI.BaseTexture.prototype.destroy=function()
{if(this.imageUrl)
{delete PIXI.BaseTextureCache[this.imageUrl];this.imageUrl=null;this.source.src=null;}
this.source=null;PIXI.texturesToDestroy.push(this);};PIXI.BaseTexture.prototype.updateSourceImage=function(newSrc)
{this.hasLoaded=false;this.source.src=null;this.source.src=newSrc;};PIXI.BaseTexture.fromImage=function(imageUrl,crossorigin,scaleMode)
{var baseTexture=PIXI.BaseTextureCache[imageUrl];if(crossorigin===undefined&&imageUrl.indexOf('data:')===-1)crossorigin=true;if(!baseTexture)
{var image=new Image();if(crossorigin)
{image.crossOrigin='';}
image.src=imageUrl;baseTexture=new PIXI.BaseTexture(image,scaleMode);baseTexture.imageUrl=imageUrl;PIXI.BaseTextureCache[imageUrl]=baseTexture;}
return baseTexture;};PIXI.BaseTexture.fromCanvas=function(canvas,scaleMode)
{if(!canvas._pixiId)
{canvas._pixiId='canvas_'+PIXI.TextureCacheIdGenerator++;}
var baseTexture=PIXI.BaseTextureCache[canvas._pixiId];if(!baseTexture)
{baseTexture=new PIXI.BaseTexture(canvas,scaleMode);PIXI.BaseTextureCache[canvas._pixiId]=baseTexture;}
return baseTexture;};PIXI.TextureCache={};PIXI.FrameCache={};PIXI.TextureCacheIdGenerator=0;PIXI.Texture=function(baseTexture,frame)
{PIXI.EventTarget.call(this);if(!frame)
{this.noFrame=true;frame=new PIXI.Rectangle(0,0,1,1);}
if(baseTexture instanceof PIXI.Texture)
baseTexture=baseTexture.baseTexture;this.baseTexture=baseTexture;this.frame=frame;this.trim=null;this.scope=this;this._uvs=null;if(baseTexture.hasLoaded)
{if(this.noFrame)frame=new PIXI.Rectangle(0,0,baseTexture.width,baseTexture.height);this.setFrame(frame);}
else
{var scope=this;baseTexture.addEventListener('loaded',function(){scope.onBaseTextureLoaded();});}};PIXI.Texture.prototype.constructor=PIXI.Texture;PIXI.Texture.prototype.onBaseTextureLoaded=function()
{var baseTexture=this.baseTexture;baseTexture.removeEventListener('loaded',this.onLoaded);if(this.noFrame)this.frame=new PIXI.Rectangle(0,0,baseTexture.width,baseTexture.height);this.setFrame(this.frame);this.scope.dispatchEvent({type:'update',content:this});};PIXI.Texture.prototype.destroy=function(destroyBase)
{if(destroyBase)this.baseTexture.destroy();};PIXI.Texture.prototype.setFrame=function(frame)
{this.frame=frame;this.width=frame.width;this.height=frame.height;if(frame.x+frame.width>this.baseTexture.width||frame.y+frame.height>this.baseTexture.height)
{throw new Error('Texture Error: frame does not fit inside the base Texture dimensions '+this);}
this.updateFrame=true;PIXI.Texture.frameUpdates.push(this);};PIXI.Texture.prototype._updateWebGLuvs=function()
{if(!this._uvs)this._uvs=new PIXI.TextureUvs();var frame=this.frame;var tw=this.baseTexture.width;var th=this.baseTexture.height;this._uvs.x0=frame.x/tw;this._uvs.y0=frame.y/th;this._uvs.x1=(frame.x+frame.width)/tw;this._uvs.y1=frame.y/th;this._uvs.x2=(frame.x+frame.width)/tw;this._uvs.y2=(frame.y+frame.height)/th;this._uvs.x3=frame.x/tw;this._uvs.y3=(frame.y+frame.height)/th;};PIXI.Texture.fromImage=function(imageUrl,crossorigin,scaleMode)
{var texture=PIXI.TextureCache[imageUrl];if(!texture)
{texture=new PIXI.Texture(PIXI.BaseTexture.fromImage(imageUrl,crossorigin,scaleMode));PIXI.TextureCache[imageUrl]=texture;}
return texture;};PIXI.Texture.fromFrame=function(frameId)
{var texture=PIXI.TextureCache[frameId];if(!texture)throw new Error('The frameId "'+frameId+'" does not exist in the texture cache ');return texture;};PIXI.Texture.fromCanvas=function(canvas,scaleMode)
{var baseTexture=PIXI.BaseTexture.fromCanvas(canvas,scaleMode);return new PIXI.Texture(baseTexture);};PIXI.Texture.addTextureToCache=function(texture,id)
{PIXI.TextureCache[id]=texture;};PIXI.Texture.removeTextureFromCache=function(id)
{var texture=PIXI.TextureCache[id];delete PIXI.TextureCache[id];delete PIXI.BaseTextureCache[id];return texture;};PIXI.Texture.frameUpdates=[];PIXI.TextureUvs=function()
{this.x0=0;this.y0=0;this.x1=0;this.y1=0;this.x2=0;this.y2=0;this.x3=0;this.y4=0;};PIXI.RenderTexture=function(width,height,renderer,scaleMode)
{PIXI.EventTarget.call(this);this.width=width||100;this.height=height||100;this.frame=new PIXI.Rectangle(0,0,this.width,this.height);this.baseTexture=new PIXI.BaseTexture();this.baseTexture.width=this.width;this.baseTexture.height=this.height;this.baseTexture._glTextures=[];this.baseTexture.scaleMode=scaleMode||PIXI.scaleModes.DEFAULT;this.baseTexture.hasLoaded=true;this.renderer=renderer||PIXI.defaultRenderer;if(this.renderer.type===PIXI.WEBGL_RENDERER)
{var gl=this.renderer.gl;this.textureBuffer=new PIXI.FilterTexture(gl,this.width,this.height,this.baseTexture.scaleMode);this.baseTexture._glTextures[gl.id]=this.textureBuffer.texture;this.render=this.renderWebGL;this.projection=new PIXI.Point(this.width/2,-this.height/2);}
else
{this.render=this.renderCanvas;this.textureBuffer=new PIXI.CanvasBuffer(this.width,this.height);this.baseTexture.source=this.textureBuffer.canvas;}
PIXI.Texture.frameUpdates.push(this);};PIXI.RenderTexture.prototype=Object.create(PIXI.Texture.prototype);PIXI.RenderTexture.prototype.constructor=PIXI.RenderTexture;PIXI.RenderTexture.prototype.resize=function(width,height)
{this.width=width;this.height=height;this.frame.width=this.width;this.frame.height=this.height;if(this.renderer.type===PIXI.WEBGL_RENDERER)
{this.projection.x=this.width/2;this.projection.y=-this.height/2;var gl=this.renderer.gl;gl.bindTexture(gl.TEXTURE_2D,this.baseTexture._glTextures[gl.id]);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,this.width,this.height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);}
else
{this.textureBuffer.resize(this.width,this.height);}
PIXI.Texture.frameUpdates.push(this);};PIXI.RenderTexture.prototype.renderWebGL=function(displayObject,position,clear)
{var gl=this.renderer.gl;gl.colorMask(true,true,true,true);gl.viewport(0,0,this.width,this.height);gl.bindFramebuffer(gl.FRAMEBUFFER,this.textureBuffer.frameBuffer);if(clear)this.textureBuffer.clear();var children=displayObject.children;var originalWorldTransform=displayObject.worldTransform;displayObject.worldTransform=PIXI.RenderTexture.tempMatrix;displayObject.worldTransform.d=-1;displayObject.worldTransform.ty=this.projection.y*-2;if(position)
{displayObject.worldTransform.tx=position.x;displayObject.worldTransform.ty-=position.y;}
for(var i=0,j=children.length;i<j;i++)
{children[i].updateTransform();}
PIXI.WebGLRenderer.updateTextures();this.renderer.renderDisplayObject(displayObject,this.projection,this.textureBuffer.frameBuffer);displayObject.worldTransform=originalWorldTransform;};PIXI.RenderTexture.prototype.renderCanvas=function(displayObject,position,clear)
{var children=displayObject.children;var originalWorldTransform=displayObject.worldTransform;displayObject.worldTransform=PIXI.RenderTexture.tempMatrix;if(position)
{displayObject.worldTransform.tx=position.x;displayObject.worldTransform.ty=position.y;}
for(var i=0,j=children.length;i<j;i++)
{children[i].updateTransform();}
if(clear)this.textureBuffer.clear();var context=this.textureBuffer.context;this.renderer.renderDisplayObject(displayObject,context);context.setTransform(1,0,0,1,0,0);displayObject.worldTransform=originalWorldTransform;};PIXI.RenderTexture.tempMatrix=new PIXI.Matrix();if(typeof exports!=='undefined'){if(typeof module!=='undefined'&&module.exports){exports=module.exports=PIXI;}
exports.PIXI=PIXI;}else if(typeof define!=='undefined'&&define.amd){define('PIXI',(function(){return root.PIXI=PIXI;})());}else{root.PIXI=PIXI;}}).call(this);(function(){var root=this;var Phaser=Phaser||{VERSION:'2.0.4',GAMES:[],AUTO:0,CANVAS:1,WEBGL:2,HEADLESS:3,NONE:0,LEFT:1,RIGHT:2,UP:3,DOWN:4,SPRITE:0,BUTTON:1,IMAGE:2,GRAPHICS:3,TEXT:4,TILESPRITE:5,BITMAPTEXT:6,GROUP:7,RENDERTEXTURE:8,TILEMAP:9,TILEMAPLAYER:10,EMITTER:11,POLYGON:12,BITMAPDATA:13,CANVAS_FILTER:14,WEBGL_FILTER:15,ELLIPSE:16,SPRITEBATCH:17,RETROFONT:18,blendModes:{NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16},scaleModes:{DEFAULT:0,LINEAR:0,NEAREST:1}};PIXI.InteractionManager=function(){};Phaser.Utils={parseDimension:function(size,dimension){var f=0;var px=0;if(typeof size==='string')
{if(size.substr(-1)==='%')
{f=parseInt(size,10)/100;if(dimension===0)
{px=window.innerWidth*f;}
else
{px=window.innerHeight*f;}}
else
{px=parseInt(size,10);}}
else
{px=size;}
return px;},shuffle:function(array){for(var i=array.length-1;i>0;i--)
{var j=Math.floor(Math.random()*(i+1));var temp=array[i];array[i]=array[j];array[j]=temp;}
return array;},pad:function(str,len,pad,dir){if(typeof(len)=="undefined"){var len=0;}
if(typeof(pad)=="undefined"){var pad=' ';}
if(typeof(dir)=="undefined"){var dir=3;}
var padlen=0;if(len+1>=str.length)
{switch(dir)
{case 1:str=new Array(len+1-str.length).join(pad)+str;break;case 3:var right=Math.ceil((padlen=len-str.length)/2);var left=padlen-right;str=new Array(left+1).join(pad)+str+new Array(right+1).join(pad);break;default:str=str+new Array(len+1-str.length).join(pad);break;}}
return str;},isPlainObject:function(obj){if(typeof(obj)!=="object"||obj.nodeType||obj===obj.window)
{return false;}
try{if(obj.constructor&&!({}).hasOwnProperty.call(obj.constructor.prototype,"isPrototypeOf"))
{return false;}}catch(e){return false;}
return true;},extend:function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;if(typeof target==="boolean")
{deep=target;target=arguments[1]||{};i=2;}
if(length===i)
{target=this;--i;}
for(;i<length;i++)
{if((options=arguments[i])!=null)
{for(name in options)
{src=target[name];copy=options[name];if(target===copy)
{continue;}
if(deep&&copy&&(Phaser.Utils.isPlainObject(copy)||(copyIsArray=Array.isArray(copy))))
{if(copyIsArray)
{copyIsArray=false;clone=src&&Array.isArray(src)?src:[];}
else
{clone=src&&Phaser.Utils.isPlainObject(src)?src:{};}
target[name]=Phaser.Utils.extend(deep,clone,copy);}
else if(copy!==undefined)
{target[name]=copy;}}}}
return target;}};if(typeof Function.prototype.bind!='function'){Function.prototype.bind=(function(){var slice=Array.prototype.slice;return function(thisArg){var target=this,boundArgs=slice.call(arguments,1);if(typeof target!='function')
{throw new TypeError();}
function bound(){var args=boundArgs.concat(slice.call(arguments));target.apply(this instanceof bound?this:thisArg,args);}
bound.prototype=(function F(proto){if(proto)
{F.prototype=proto;}
if(!(this instanceof F))
{return new F;}})(target.prototype);return bound;};})();}
if(!Array.isArray)
{Array.isArray=function(arg)
{return Object.prototype.toString.call(arg)=='[object Array]';};}
if(!Array.prototype.forEach)
{Array.prototype.forEach=function(fun)
{"use strict";if(this===void 0||this===null)
{throw new TypeError();}
var t=Object(this);var len=t.length>>>0;if(typeof fun!=="function")
{throw new TypeError();}
var thisArg=arguments.length>=2?arguments[1]:void 0;for(var i=0;i<len;i++)
{if(i in t)
{fun.call(thisArg,t[i],i,t);}}};}
if(typeof window.Uint32Array!=="function")
{var CheapArray=function(type)
{var proto=new Array();window[type]=function(arg){if(typeof(arg)==="number")
{Array.call(this,arg);this.length=arg;for(var i=0;i<this.length;i++)
{this[i]=0;}}
else
{Array.call(this,arg.length);this.length=arg.length;for(var i=0;i<this.length;i++)
{this[i]=arg[i];}}};window[type].prototype=proto;window[type].constructor=window[type];};CheapArray('Uint32Array');CheapArray('Int16Array');}
if(!window.console)
{window.console={};window.console.log=window.console.assert=function(){};window.console.warn=window.console.assert=function(){};}
Phaser.Circle=function(x,y,diameter){x=x||0;y=y||0;diameter=diameter||0;this.x=x;this.y=y;this._diameter=diameter;if(diameter>0)
{this._radius=diameter*0.5;}
else
{this._radius=0;}};Phaser.Circle.prototype={circumference:function(){return 2*(Math.PI*this._radius);},setTo:function(x,y,diameter){this.x=x;this.y=y;this._diameter=diameter;this._radius=diameter*0.5;return this;},copyFrom:function(source){return this.setTo(source.x,source.y,source.diameter);},copyTo:function(dest){dest.x=this.x;dest.y=this.y;dest.diameter=this._diameter;return dest;},distance:function(dest,round){if(typeof round==="undefined"){round=false;}
if(round)
{return Phaser.Math.distanceRounded(this.x,this.y,dest.x,dest.y);}
else
{return Phaser.Math.distance(this.x,this.y,dest.x,dest.y);}},clone:function(out){if(typeof out==="undefined")
{out=new Phaser.Circle(this.x,this.y,this.diameter);}
else
{out.setTo(this.x,this.y,this.diameter);}
return out;},contains:function(x,y){return Phaser.Circle.contains(this,x,y);},circumferencePoint:function(angle,asDegrees,out){return Phaser.Circle.circumferencePoint(this,angle,asDegrees,out);},offset:function(dx,dy){this.x+=dx;this.y+=dy;return this;},offsetPoint:function(point){return this.offset(point.x,point.y);},toString:function(){return"[{Phaser.Circle (x="+this.x+" y="+this.y+" diameter="+this.diameter+" radius="+this.radius+")}]";}};Phaser.Circle.prototype.constructor=Phaser.Circle;Object.defineProperty(Phaser.Circle.prototype,"diameter",{get:function(){return this._diameter;},set:function(value){if(value>0)
{this._diameter=value;this._radius=value*0.5;}}});Object.defineProperty(Phaser.Circle.prototype,"radius",{get:function(){return this._radius;},set:function(value){if(value>0)
{this._radius=value;this._diameter=value*2;}}});Object.defineProperty(Phaser.Circle.prototype,"left",{get:function(){return this.x-this._radius;},set:function(value){if(value>this.x)
{this._radius=0;this._diameter=0;}
else
{this.radius=this.x-value;}}});Object.defineProperty(Phaser.Circle.prototype,"right",{get:function(){return this.x+this._radius;},set:function(value){if(value<this.x)
{this._radius=0;this._diameter=0;}
else
{this.radius=value-this.x;}}});Object.defineProperty(Phaser.Circle.prototype,"top",{get:function(){return this.y-this._radius;},set:function(value){if(value>this.y)
{this._radius=0;this._diameter=0;}
else
{this.radius=this.y-value;}}});Object.defineProperty(Phaser.Circle.prototype,"bottom",{get:function(){return this.y+this._radius;},set:function(value){if(value<this.y)
{this._radius=0;this._diameter=0;}
else
{this.radius=value-this.y;}}});Object.defineProperty(Phaser.Circle.prototype,"area",{get:function(){if(this._radius>0)
{return Math.PI*this._radius*this._radius;}
else
{return 0;}}});Object.defineProperty(Phaser.Circle.prototype,"empty",{get:function(){return(this._diameter===0);},set:function(value){if(value===true)
{this.setTo(0,0,0);}}});Phaser.Circle.contains=function(a,x,y){if(a.radius>0&&x>=a.left&&x<=a.right&&y>=a.top&&y<=a.bottom)
{var dx=(a.x-x)*(a.x-x);var dy=(a.y-y)*(a.y-y);return(dx+dy)<=(a.radius*a.radius);}
else
{return false;}};Phaser.Circle.equals=function(a,b){return(a.x==b.x&&a.y==b.y&&a.diameter==b.diameter);};Phaser.Circle.intersects=function(a,b){return(Phaser.Math.distance(a.x,a.y,b.x,b.y)<=(a.radius+b.radius));};Phaser.Circle.circumferencePoint=function(a,angle,asDegrees,out){if(typeof asDegrees==="undefined"){asDegrees=false;}
if(typeof out==="undefined"){out=new Phaser.Point();}
if(asDegrees===true)
{angle=Phaser.Math.degToRad(angle);}
out.x=a.x+a.radius*Math.cos(angle);out.y=a.y+a.radius*Math.sin(angle);return out;};Phaser.Circle.intersectsRectangle=function(c,r){var cx=Math.abs(c.x-r.x-r.halfWidth);var xDist=r.halfWidth+c.radius;if(cx>xDist)
{return false;}
var cy=Math.abs(c.y-r.y-r.halfHeight);var yDist=r.halfHeight+c.radius;if(cy>yDist)
{return false;}
if(cx<=r.halfWidth||cy<=r.halfHeight)
{return true;}
var xCornerDist=cx-r.halfWidth;var yCornerDist=cy-r.halfHeight;var xCornerDistSq=xCornerDist*xCornerDist;var yCornerDistSq=yCornerDist*yCornerDist;var maxCornerDistSq=c.radius*c.radius;return xCornerDistSq+yCornerDistSq<=maxCornerDistSq;};PIXI.Circle=Phaser.Circle;Phaser.Point=function(x,y){x=x||0;y=y||0;this.x=x;this.y=y;};Phaser.Point.prototype={copyFrom:function(source){return this.setTo(source.x,source.y);},invert:function(){return this.setTo(this.y,this.x);},setTo:function(x,y){this.x=x||0;this.y=y||((y!==0)?this.x:0);return this;},set:function(x,y){this.x=x||0;this.y=y||((y!==0)?this.x:0);return this;},add:function(x,y){this.x+=x;this.y+=y;return this;},subtract:function(x,y){this.x-=x;this.y-=y;return this;},multiply:function(x,y){this.x*=x;this.y*=y;return this;},divide:function(x,y){this.x/=x;this.y/=y;return this;},clampX:function(min,max){this.x=Phaser.Math.clamp(this.x,min,max);return this;},clampY:function(min,max){this.y=Phaser.Math.clamp(this.y,min,max);return this;},clamp:function(min,max){this.x=Phaser.Math.clamp(this.x,min,max);this.y=Phaser.Math.clamp(this.y,min,max);return this;},clone:function(output){if(typeof output==="undefined")
{output=new Phaser.Point(this.x,this.y);}
else
{output.setTo(this.x,this.y);}
return output;},copyTo:function(dest){dest.x=this.x;dest.y=this.y;return dest;},distance:function(dest,round){return Phaser.Point.distance(this,dest,round);},equals:function(a){return(a.x===this.x&&a.y===this.y);},angle:function(a){return Math.atan2(this.x*a.y-this.y*a.x,this.x*a.x+this.y*a.y);},angleSq:function(a){return this.subtract(a).angle(a.subtract(this));},rotate:function(x,y,angle,asDegrees,distance){return Phaser.Point.rotate(this,x,y,angle,asDegrees,distance);},getMagnitude:function(){return Math.sqrt((this.x*this.x)+(this.y*this.y));},getMagnitudeSq:function(){return(this.x*this.x)+(this.y*this.y);},setMagnitude:function(magnitude){return this.normalize().multiply(magnitude,magnitude);},normalize:function(){if(!this.isZero())
{var m=this.getMagnitude();this.x/=m;this.y/=m;}
return this;},isZero:function(){return(this.x===0&&this.y===0);},dot:function(a){return((this.x*a.x)+(this.y*a.y));},cross:function(a){return((this.x*a.y)-(this.y*a.x));},perp:function(){return this.setTo(-this.y,this.x);},rperp:function(){return this.setTo(this.y,-this.x);},normalRightHand:function(){return this.setTo(this.y*-1,this.x);},toString:function(){return'[{Point (x='+this.x+' y='+this.y+')}]';}};Phaser.Point.prototype.constructor=Phaser.Point;Phaser.Point.add=function(a,b,out){if(typeof out==="undefined"){out=new Phaser.Point();}
out.x=a.x+b.x;out.y=a.y+b.y;return out;};Phaser.Point.subtract=function(a,b,out){if(typeof out==="undefined"){out=new Phaser.Point();}
out.x=a.x-b.x;out.y=a.y-b.y;return out;};Phaser.Point.multiply=function(a,b,out){if(typeof out==="undefined"){out=new Phaser.Point();}
out.x=a.x*b.x;out.y=a.y*b.y;return out;};Phaser.Point.divide=function(a,b,out){if(typeof out==="undefined"){out=new Phaser.Point();}
out.x=a.x/b.x;out.y=a.y/b.y;return out;};Phaser.Point.equals=function(a,b){return(a.x===b.x&&a.y===b.y);};Phaser.Point.angle=function(a,b){return Math.atan2(a.x*b.y-a.y*b.x,a.x*b.x+a.y*b.y);};Phaser.Point.angleSq=function(a,b){return a.subtract(b).angle(b.subtract(a));};Phaser.Point.negative=function(a,out){if(typeof out==="undefined"){out=new Phaser.Point();}
return out.setTo(-a.x,-a.y);};Phaser.Point.multiplyAdd=function(a,b,s,out){if(typeof out==="undefined"){out=new Phaser.Point();}
return out.setTo(a.x+b.x*s,a.y+b.y*s);};Phaser.Point.interpolate=function(a,b,f,out){if(typeof out==="undefined"){out=new Phaser.Point();}
return out.setTo(a.x+(b.x-a.x)*f,a.y+(b.y-a.y)*f);};Phaser.Point.perp=function(a,out){if(typeof out==="undefined"){out=new Phaser.Point();}
return out.setTo(-a.y,a.x);};Phaser.Point.rperp=function(a,out){if(typeof out==="undefined"){out=new Phaser.Point();}
return out.setTo(a.y,-a.x);};Phaser.Point.distance=function(a,b,round){if(typeof round==="undefined"){round=false;}
if(round)
{return Phaser.Math.distanceRounded(a.x,a.y,b.x,b.y);}
else
{return Phaser.Math.distance(a.x,a.y,b.x,b.y);}};Phaser.Point.project=function(a,b,out){if(typeof out==="undefined"){out=new Phaser.Point();}
var amt=a.dot(b)/b.getMagnitudeSq();if(amt!==0)
{out.setTo(amt*b.x,amt*b.y);}
return out;};Phaser.Point.projectUnit=function(a,b,out){if(typeof out==="undefined"){out=new Phaser.Point();}
var amt=a.dot(b);if(amt!==0)
{out.setTo(amt*b.x,amt*b.y);}
return out;};Phaser.Point.normalRightHand=function(a,out){if(typeof out==="undefined"){out=new Phaser.Point();}
return out.setTo(a.y*-1,a.x);};Phaser.Point.normalize=function(a,out){if(typeof out==="undefined"){out=new Phaser.Point();}
var m=a.getMagnitude();if(m!==0)
{out.setTo(a.x/m,a.y/m);}
return out;};Phaser.Point.rotate=function(a,x,y,angle,asDegrees,distance){asDegrees=asDegrees||false;distance=distance||null;if(asDegrees)
{angle=Phaser.Math.degToRad(angle);}
if(distance===null)
{distance=Math.sqrt(((x-a.x)*(x-a.x))+((y-a.y)*(y-a.y)));}
return a.setTo(x+distance*Math.cos(angle),y+distance*Math.sin(angle));};Phaser.Point.centroid=function(points,out){if(typeof out==="undefined"){out=new Phaser.Point();}
if(Object.prototype.toString.call(points)!=='[object Array]')
{throw new Error("Phaser.Point. Parameter 'points' must be an array");}
var pointslength=points.length;if(pointslength<1)
{throw new Error("Phaser.Point. Parameter 'points' array must not be empty");}
if(pointslength===1)
{out.copyFrom(points[0]);return out;}
for(var i=0;i<pointslength;i++)
{Phaser.Point.add(out,points[i],out);}
out.divide(pointslength,pointslength);return out;};PIXI.Point=Phaser.Point;Phaser.Rectangle=function(x,y,width,height){x=x||0;y=y||0;width=width||0;height=height||0;this.x=x;this.y=y;this.width=width;this.height=height;};Phaser.Rectangle.prototype={offset:function(dx,dy){this.x+=dx;this.y+=dy;return this;},offsetPoint:function(point){return this.offset(point.x,point.y);},setTo:function(x,y,width,height){this.x=x;this.y=y;this.width=width;this.height=height;return this;},floor:function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);},floorAll:function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);this.width=Math.floor(this.width);this.height=Math.floor(this.height);},copyFrom:function(source){return this.setTo(source.x,source.y,source.width,source.height);},copyTo:function(dest){dest.x=this.x;dest.y=this.y;dest.width=this.width;dest.height=this.height;return dest;},inflate:function(dx,dy){return Phaser.Rectangle.inflate(this,dx,dy);},size:function(output){return Phaser.Rectangle.size(this,output);},clone:function(output){return Phaser.Rectangle.clone(this,output);},contains:function(x,y){return Phaser.Rectangle.contains(this,x,y);},containsRect:function(b){return Phaser.Rectangle.containsRect(this,b);},equals:function(b){return Phaser.Rectangle.equals(this,b);},intersection:function(b,out){return Phaser.Rectangle.intersection(this,b,out);},intersects:function(b,tolerance){return Phaser.Rectangle.intersects(this,b,tolerance);},intersectsRaw:function(left,right,top,bottom,tolerance){return Phaser.Rectangle.intersectsRaw(this,left,right,top,bottom,tolerance);},union:function(b,out){return Phaser.Rectangle.union(this,b,out);},toString:function(){return"[{Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+" empty="+this.empty+")}]";}};Object.defineProperty(Phaser.Rectangle.prototype,"halfWidth",{get:function(){return Math.round(this.width/2);}});Object.defineProperty(Phaser.Rectangle.prototype,"halfHeight",{get:function(){return Math.round(this.height/2);}});Object.defineProperty(Phaser.Rectangle.prototype,"bottom",{get:function(){return this.y+this.height;},set:function(value){if(value<=this.y){this.height=0;}else{this.height=(this.y-value);}}});Object.defineProperty(Phaser.Rectangle.prototype,"bottomRight",{get:function(){return new Phaser.Point(this.right,this.bottom);},set:function(value){this.right=value.x;this.bottom=value.y;}});Object.defineProperty(Phaser.Rectangle.prototype,"left",{get:function(){return this.x;},set:function(value){if(value>=this.right){this.width=0;}else{this.width=this.right-value;}
this.x=value;}});Object.defineProperty(Phaser.Rectangle.prototype,"right",{get:function(){return this.x+this.width;},set:function(value){if(value<=this.x){this.width=0;}else{this.width=this.x+value;}}});Object.defineProperty(Phaser.Rectangle.prototype,"volume",{get:function(){return this.width*this.height;}});Object.defineProperty(Phaser.Rectangle.prototype,"perimeter",{get:function(){return(this.width*2)+(this.height*2);}});Object.defineProperty(Phaser.Rectangle.prototype,"centerX",{get:function(){return this.x+this.halfWidth;},set:function(value){this.x=value-this.halfWidth;}});Object.defineProperty(Phaser.Rectangle.prototype,"centerY",{get:function(){return this.y+this.halfHeight;},set:function(value){this.y=value-this.halfHeight;}});Object.defineProperty(Phaser.Rectangle.prototype,"top",{get:function(){return this.y;},set:function(value){if(value>=this.bottom){this.height=0;this.y=value;}else{this.height=(this.bottom-value);}}});Object.defineProperty(Phaser.Rectangle.prototype,"topLeft",{get:function(){return new Phaser.Point(this.x,this.y);},set:function(value){this.x=value.x;this.y=value.y;}});Object.defineProperty(Phaser.Rectangle.prototype,"empty",{get:function(){return(!this.width||!this.height);},set:function(value){if(value===true)
{this.setTo(0,0,0,0);}}});Phaser.Rectangle.prototype.constructor=Phaser.Rectangle;Phaser.Rectangle.inflate=function(a,dx,dy){a.x-=dx;a.width+=2*dx;a.y-=dy;a.height+=2*dy;return a;};Phaser.Rectangle.inflatePoint=function(a,point){return Phaser.Rectangle.inflate(a,point.x,point.y);};Phaser.Rectangle.size=function(a,output){if(typeof output==="undefined")
{output=new Phaser.Point(a.width,a.height);}
else
{output.setTo(a.width,a.height);}
return output;};Phaser.Rectangle.clone=function(a,output){if(typeof output==="undefined")
{output=new Phaser.Rectangle(a.x,a.y,a.width,a.height);}
else
{output.setTo(a.x,a.y,a.width,a.height);}
return output;};Phaser.Rectangle.contains=function(a,x,y){if(a.width<=0||a.height<=0)
{return false;}
return(x>=a.x&&x<=a.right&&y>=a.y&&y<=a.bottom);};Phaser.Rectangle.containsRaw=function(rx,ry,rw,rh,x,y){return(x>=rx&&x<=(rx+rw)&&y>=ry&&y<=(ry+rh));};Phaser.Rectangle.containsPoint=function(a,point){return Phaser.Rectangle.contains(a,point.x,point.y);};Phaser.Rectangle.containsRect=function(a,b){if(a.volume>b.volume)
{return false;}
return(a.x>=b.x&&a.y>=b.y&&a.right<=b.right&&a.bottom<=b.bottom);};Phaser.Rectangle.equals=function(a,b){return(a.x==b.x&&a.y==b.y&&a.width==b.width&&a.height==b.height);};Phaser.Rectangle.intersection=function(a,b,output){if(typeof output==="undefined")
{output=new Phaser.Rectangle();}
if(Phaser.Rectangle.intersects(a,b))
{output.x=Math.max(a.x,b.x);output.y=Math.max(a.y,b.y);output.width=Math.min(a.right,b.right)-output.x;output.height=Math.min(a.bottom,b.bottom)-output.y;}
return output;};Phaser.Rectangle.intersects=function(a,b){if(a.width<=0||a.height<=0||b.width<=0||b.height<=0)
{return false;}
return!(a.right<b.x||a.bottom<b.y||a.x>b.right||a.y>b.bottom);};Phaser.Rectangle.intersectsRaw=function(a,left,right,top,bottom,tolerance){if(typeof tolerance==="undefined"){tolerance=0;}
return!(left>a.right+tolerance||right<a.left-tolerance||top>a.bottom+tolerance||bottom<a.top-tolerance);};Phaser.Rectangle.union=function(a,b,output){if(typeof output==="undefined")
{output=new Phaser.Rectangle();}
return output.setTo(Math.min(a.x,b.x),Math.min(a.y,b.y),Math.max(a.right,b.right)-Math.min(a.left,b.left),Math.max(a.bottom,b.bottom)-Math.min(a.top,b.top));};PIXI.Rectangle=Phaser.Rectangle;PIXI.EmptyRectangle=new Phaser.Rectangle(0,0,0,0);Phaser.Line=function(x1,y1,x2,y2){x1=x1||0;y1=y1||0;x2=x2||0;y2=y2||0;this.start=new Phaser.Point(x1,y1);this.end=new Phaser.Point(x2,y2);};Phaser.Line.prototype={setTo:function(x1,y1,x2,y2){this.start.setTo(x1,y1);this.end.setTo(x2,y2);return this;},fromSprite:function(startSprite,endSprite,useCenter){if(typeof useCenter==='undefined'){useCenter=false;}
if(useCenter)
{return this.setTo(startSprite.center.x,startSprite.center.y,endSprite.center.x,endSprite.center.y);}
else
{return this.setTo(startSprite.x,startSprite.y,endSprite.x,endSprite.y);}},intersects:function(line,asSegment,result){return Phaser.Line.intersectsPoints(this.start,this.end,line.start,line.end,asSegment,result);},pointOnLine:function(x,y){return((x-this.start.x)*(this.end.y-this.end.y)===(this.end.x-this.start.x)*(y-this.end.y));},pointOnSegment:function(x,y){var xMin=Math.min(this.start.x,this.end.x);var xMax=Math.max(this.start.x,this.end.x);var yMin=Math.min(this.start.y,this.end.y);var yMax=Math.max(this.start.y,this.end.y);return(this.pointOnLine(x,y)&&(x>=xMin&&x<=xMax)&&(y>=yMin&&y<=yMax));},coordinatesOnLine:function(stepRate,results){if(typeof stepRate==='undefined'){stepRate=1;}
if(typeof results==='undefined'){results=[];}
var x1=Math.round(this.start.x);var y1=Math.round(this.start.y);var x2=Math.round(this.end.x);var y2=Math.round(this.end.y);var dx=Math.abs(x2-x1);var dy=Math.abs(y2-y1);var sx=(x1<x2)?1:-1;var sy=(y1<y2)?1:-1;var err=dx-dy;results.push([x1,y1]);var i=1;while(!((x1==x2)&&(y1==y2)))
{var e2=err<<1;if(e2>-dy)
{err-=dy;x1+=sx;}
if(e2<dx)
{err+=dx;y1+=sy;}
if(i%stepRate===0)
{results.push([x1,y1]);}
i++;}
return results;}};Object.defineProperty(Phaser.Line.prototype,"length",{get:function(){return Math.sqrt((this.end.x-this.start.x)*(this.end.x-this.start.x)+(this.end.y-this.start.y)*(this.end.y-this.start.y));}});Object.defineProperty(Phaser.Line.prototype,"angle",{get:function(){return Math.atan2(this.end.y-this.start.y,this.end.x-this.start.x);}});Object.defineProperty(Phaser.Line.prototype,"slope",{get:function(){return(this.end.y-this.start.y)/(this.end.x-this.start.x);}});Object.defineProperty(Phaser.Line.prototype,"perpSlope",{get:function(){return-((this.end.x-this.start.x)/(this.end.y-this.start.y));}});Object.defineProperty(Phaser.Line.prototype,"x",{get:function(){return Math.min(this.start.x,this.end.x);}});Object.defineProperty(Phaser.Line.prototype,"y",{get:function(){return Math.min(this.start.y,this.end.y);}});Object.defineProperty(Phaser.Line.prototype,"left",{get:function(){return Math.min(this.start.x,this.end.x);}});Object.defineProperty(Phaser.Line.prototype,"right",{get:function(){return Math.max(this.start.x,this.end.x);}});Object.defineProperty(Phaser.Line.prototype,"top",{get:function(){return Math.min(this.start.y,this.end.y);}});Object.defineProperty(Phaser.Line.prototype,"bottom",{get:function(){return Math.max(this.start.y,this.end.y);}});Object.defineProperty(Phaser.Line.prototype,"width",{get:function(){return Math.abs(this.start.x-this.end.x);}});Object.defineProperty(Phaser.Line.prototype,"height",{get:function(){return Math.abs(this.start.y-this.end.y);}});Phaser.Line.intersectsPoints=function(a,b,e,f,asSegment,result){if(typeof asSegment==='undefined'){asSegment=true;}
if(typeof result==='undefined'){result=new Phaser.Point();}
var a1=b.y-a.y;var a2=f.y-e.y;var b1=a.x-b.x;var b2=e.x-f.x;var c1=(b.x*a.y)-(a.x*b.y);var c2=(f.x*e.y)-(e.x*f.y);var denom=(a1*b2)-(a2*b1);if(denom===0)
{return null;}
result.x=((b1*c2)-(b2*c1))/denom;result.y=((a2*c1)-(a1*c2))/denom;if(asSegment)
{if(Math.pow((result.x-b.x)+(result.y-b.y),2)>Math.pow((a.x-b.x)+(a.y-b.y),2))
{return null;}
if(Math.pow((result.x-a.x)+(result.y-a.y),2)>Math.pow((a.x-b.x)+(a.y-b.y),2))
{return null;}
if(Math.pow((result.x-f.x)+(result.y-f.y),2)>Math.pow((e.x-f.x)+(e.y-f.y),2))
{return null;}
if(Math.pow((result.x-e.x)+(result.y-e.y),2)>Math.pow((e.x-f.x)+(e.y-f.y),2))
{return null;}}
return result;};Phaser.Line.intersects=function(a,b,asSegment,result){return Phaser.Line.intersectsPoints(a.start,a.end,b.start,b.end,asSegment,result);};Phaser.Ellipse=function(x,y,width,height){this.type=Phaser.ELLIPSE;x=x||0;y=y||0;width=width||0;height=height||0;this.x=x;this.y=y;this.width=width;this.height=height;};Phaser.Ellipse.prototype={setTo:function(x,y,width,height){this.x=x;this.y=y;this.width=width;this.height=height;return this;},copyFrom:function(source){return this.setTo(source.x,source.y,source.width,source.height);},copyTo:function(dest){dest.x=this.x;dest.y=this.y;dest.width=this.width;dest.height=this.height;return dest;},clone:function(out){if(typeof out==="undefined")
{out=new Phaser.Ellipse(this.x,this.y,this.width,this.height);}
else
{out.setTo(this.x,this.y,this.width,this.height);}
return out;},contains:function(x,y){return Phaser.Ellipse.contains(this,x,y);},toString:function(){return"[{Phaser.Ellipse (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")}]";}};Phaser.Ellipse.prototype.constructor=Phaser.Ellipse;Object.defineProperty(Phaser.Ellipse.prototype,"left",{get:function(){return this.x;},set:function(value){this.x=value;}});Object.defineProperty(Phaser.Ellipse.prototype,"right",{get:function(){return this.x+this.width;},set:function(value){if(value<this.x)
{this.width=0;}
else
{this.width=this.x+value;}}});Object.defineProperty(Phaser.Ellipse.prototype,"top",{get:function(){return this.y;},set:function(value){this.y=value;}});Object.defineProperty(Phaser.Ellipse.prototype,"bottom",{get:function(){return this.y+this.height;},set:function(value){if(value<this.y)
{this.height=0;}
else
{this.height=this.y+value;}}});Object.defineProperty(Phaser.Ellipse.prototype,"empty",{get:function(){return(this.width===0||this.height===0);},set:function(value){if(value===true)
{this.setTo(0,0,0,0);}}});Phaser.Ellipse.contains=function(a,x,y){if(a.width<=0||a.height<=0)
{return false;}
var normx=((x-a.x)/a.width)-0.5;var normy=((y-a.y)/a.height)-0.5;normx*=normx;normy*=normy;return(normx+normy<0.25);};Phaser.Ellipse.prototype.getBounds=function(){return new Phaser.Rectangle(this.x,this.y,this.width,this.height);};PIXI.Ellipse=Phaser.Ellipse;Phaser.Polygon=function(points){this.type=Phaser.POLYGON;if(!(points instanceof Array))
{points=Array.prototype.slice.call(arguments);}
if(typeof points[0]==='number')
{var p=[];for(var i=0,len=points.length;i<len;i+=2)
{p.push(new Phaser.Point(points[i],points[i+1]));}
points=p;}
this.points=points;};Phaser.Polygon.prototype={clone:function(){var points=[];for(var i=0;i<this.points.length;i++)
{points.push(this.points[i].clone());}
return new Phaser.Polygon(points);},contains:function(x,y){var inside=false;for(var i=0,j=this.points.length-1;i<this.points.length;j=i++)
{var xi=this.points[i].x;var yi=this.points[i].y;var xj=this.points[j].x;var yj=this.points[j].y;var intersect=((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi);if(intersect)
{inside=!inside;}}
return inside;}};Phaser.Polygon.prototype.constructor=Phaser.Polygon;PIXI.Polygon=Phaser.Polygon;Phaser.Camera=function(game,id,x,y,width,height){this.game=game;this.world=game.world;this.id=0;this.view=new Phaser.Rectangle(x,y,width,height);this.screenView=new Phaser.Rectangle(x,y,width,height);this.bounds=new Phaser.Rectangle(x,y,width,height);this.deadzone=null;this.visible=true;this.atLimit={x:false,y:false};this.target=null;this._edge=0;this.displayObject=null;this.scale=null;};Phaser.Camera.FOLLOW_LOCKON=0;Phaser.Camera.FOLLOW_PLATFORMER=1;Phaser.Camera.FOLLOW_TOPDOWN=2;Phaser.Camera.FOLLOW_TOPDOWN_TIGHT=3;Phaser.Camera.prototype={follow:function(target,style){if(typeof style==="undefined"){style=Phaser.Camera.FOLLOW_LOCKON;}
this.target=target;var helper;switch(style){case Phaser.Camera.FOLLOW_PLATFORMER:var w=this.width/8;var h=this.height/3;this.deadzone=new Phaser.Rectangle((this.width-w)/2,(this.height-h)/2-h*0.25,w,h);break;case Phaser.Camera.FOLLOW_TOPDOWN:helper=Math.max(this.width,this.height)/4;this.deadzone=new Phaser.Rectangle((this.width-helper)/2,(this.height-helper)/2,helper,helper);break;case Phaser.Camera.FOLLOW_TOPDOWN_TIGHT:helper=Math.max(this.width,this.height)/8;this.deadzone=new Phaser.Rectangle((this.width-helper)/2,(this.height-helper)/2,helper,helper);break;case Phaser.Camera.FOLLOW_LOCKON:this.deadzone=null;break;default:this.deadzone=null;break;}},unfollow:function(){this.target=null;},focusOn:function(displayObject){this.setPosition(Math.round(displayObject.x-this.view.halfWidth),Math.round(displayObject.y-this.view.halfHeight));},focusOnXY:function(x,y){this.setPosition(Math.round(x-this.view.halfWidth),Math.round(y-this.view.halfHeight));},update:function(){if(this.target)
{this.updateTarget();}
if(this.bounds)
{this.checkBounds();}
this.displayObject.position.x=-this.view.x;this.displayObject.position.y=-this.view.y;},updateTarget:function(){if(this.deadzone)
{this._edge=this.target.x-this.deadzone.x;if(this.view.x>this._edge)
{this.view.x=this._edge;}
this._edge=this.target.x+this.target.width-this.deadzone.x-this.deadzone.width;if(this.view.x<this._edge)
{this.view.x=this._edge;}
this._edge=this.target.y-this.deadzone.y;if(this.view.y>this._edge)
{this.view.y=this._edge;}
this._edge=this.target.y+this.target.height-this.deadzone.y-this.deadzone.height;if(this.view.y<this._edge)
{this.view.y=this._edge;}}
else
{this.focusOnXY(this.target.x,this.target.y);}},setBoundsToWorld:function(){this.bounds.setTo(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height);},checkBounds:function(){this.atLimit.x=false;this.atLimit.y=false;if(this.view.x<=this.bounds.x)
{this.atLimit.x=true;this.view.x=this.bounds.x;}
if(this.view.right>=this.bounds.right)
{this.atLimit.x=true;this.view.x=this.bounds.right-this.width;}
if(this.view.y<=this.bounds.top)
{this.atLimit.y=true;this.view.y=this.bounds.top;}
if(this.view.bottom>=this.bounds.bottom)
{this.atLimit.y=true;this.view.y=this.bounds.bottom-this.height;}
this.view.floor();},setPosition:function(x,y){this.view.x=x;this.view.y=y;if(this.bounds)
{this.checkBounds();}},setSize:function(width,height){this.view.width=width;this.view.height=height;},reset:function(){this.target=null;this.view.x=0;this.view.y=0;}};Phaser.Camera.prototype.constructor=Phaser.Camera;Object.defineProperty(Phaser.Camera.prototype,"x",{get:function(){return this.view.x;},set:function(value){this.view.x=value;if(this.bounds)
{this.checkBounds();}}});Object.defineProperty(Phaser.Camera.prototype,"y",{get:function(){return this.view.y;},set:function(value){this.view.y=value;if(this.bounds)
{this.checkBounds();}}});Object.defineProperty(Phaser.Camera.prototype,"width",{get:function(){return this.view.width;},set:function(value){this.view.width=value;}});Object.defineProperty(Phaser.Camera.prototype,"height",{get:function(){return this.view.height;},set:function(value){this.view.height=value;}});Phaser.State=function(){this.game=null;this.add=null;this.make=null;this.camera=null;this.cache=null;this.input=null;this.load=null;this.math=null;this.sound=null;this.scale=null;this.stage=null;this.time=null;this.tweens=null;this.world=null;this.particles=null;this.physics=null;this.rnd=null;};Phaser.State.prototype={preload:function(){},loadUpdate:function(){},loadRender:function(){},create:function(){},update:function(){},render:function(){},paused:function(){},pauseUpdate:function(){},shutdown:function(){}};Phaser.State.prototype.constructor=Phaser.State;Phaser.StateManager=function(game,pendingState){this.game=game;this.states={};this._pendingState=null;if(typeof pendingState!=='undefined'&&pendingState!==null)
{this._pendingState=pendingState;}
this._clearWorld=false;this._clearCache=false;this._created=false;this._args=[];this.current='';this.onInitCallback=null;this.onPreloadCallback=null;this.onCreateCallback=null;this.onUpdateCallback=null;this.onRenderCallback=null;this.onPreRenderCallback=null;this.onLoadUpdateCallback=null;this.onLoadRenderCallback=null;this.onPausedCallback=null;this.onResumedCallback=null;this.onPauseUpdateCallback=null;this.onShutDownCallback=null;};Phaser.StateManager.prototype={boot:function(){this.game.onPause.add(this.pause,this);this.game.onResume.add(this.resume,this);this.game.load.onLoadComplete.add(this.loadComplete,this);if(this._pendingState!==null)
{if(typeof this._pendingState==='string')
{this.start(this._pendingState,false,false);}
else
{this.add('default',this._pendingState,true);}}},add:function(key,state,autoStart){if(typeof autoStart==="undefined"){autoStart=false;}
var newState;if(state instanceof Phaser.State)
{newState=state;}
else if(typeof state==='object')
{newState=state;newState.game=this.game;}
else if(typeof state==='function')
{newState=new state(this.game);}
this.states[key]=newState;if(autoStart)
{if(this.game.isBooted)
{this.start(key);}
else
{this._pendingState=key;}}
return newState;},remove:function(key){if(this.current===key)
{this.callbackContext=null;this.onInitCallback=null;this.onShutDownCallback=null;this.onPreloadCallback=null;this.onLoadRenderCallback=null;this.onLoadUpdateCallback=null;this.onCreateCallback=null;this.onUpdateCallback=null;this.onRenderCallback=null;this.onPausedCallback=null;this.onResumedCallback=null;this.onPauseUpdateCallback=null;}
delete this.states[key];},start:function(key,clearWorld,clearCache){if(typeof clearWorld==="undefined"){clearWorld=true;}
if(typeof clearCache==="undefined"){clearCache=false;}
if(this.checkState(key))
{this._pendingState=key;this._clearWorld=clearWorld;this._clearCache=clearCache;if(arguments.length>3)
{this._args=Array.prototype.splice.call(arguments,3);}}},restart:function(clearWorld,clearCache){if(typeof clearWorld==="undefined"){clearWorld=true;}
if(typeof clearCache==="undefined"){clearCache=false;}
this._pendingState=this.current;this._clearWorld=clearWorld;this._clearCache=clearCache;if(arguments.length>2)
{this._args=Array.prototype.splice.call(arguments,2);}},dummy:function(){},preUpdate:function(){if(this._pendingState&&this.game.isBooted)
{if(this.current)
{this.onShutDownCallback.call(this.callbackContext,this.game);this.game.tweens.removeAll();this.game.camera.reset();this.game.input.reset(true);this.game.physics.clear();this.game.time.removeAll();if(this._clearWorld)
{this.game.world.shutdown();if(this._clearCache===true)
{this.game.cache.destroy();}}}
this.setCurrentState(this._pendingState);if(this.onPreloadCallback)
{this.game.load.reset();this.onPreloadCallback.call(this.callbackContext,this.game);if(this.game.load.totalQueuedFiles()===0)
{this.loadComplete();}
else
{this.game.load.start();}}
else
{this.loadComplete();}
if(this.current===this._pendingState)
{this._pendingState=null;}}},checkState:function(key){if(this.states[key])
{var valid=false;if(this.states[key]['preload']){valid=true;}
if(this.states[key]['create']){valid=true;}
if(this.states[key]['update']){valid=true;}
if(this.states[key]['render']){valid=true;}
if(valid===false)
{console.warn("Invalid Phaser State object given. Must contain at least a one of the required functions: preload, create, update or render");return false;}
return true;}
else
{console.warn("Phaser.StateManager - No state found with the key: "+key);return false;}},link:function(key){this.states[key].game=this.game;this.states[key].add=this.game.add;this.states[key].make=this.game.make;this.states[key].camera=this.game.camera;this.states[key].cache=this.game.cache;this.states[key].input=this.game.input;this.states[key].load=this.game.load;this.states[key].math=this.game.math;this.states[key].sound=this.game.sound;this.states[key].scale=this.game.scale;this.states[key].state=this;this.states[key].stage=this.game.stage;this.states[key].time=this.game.time;this.states[key].tweens=this.game.tweens;this.states[key].world=this.game.world;this.states[key].particles=this.game.particles;this.states[key].rnd=this.game.rnd;this.states[key].physics=this.game.physics;},setCurrentState:function(key){this.callbackContext=this.states[key];this.link(key);this.onInitCallback=this.states[key]['init']||this.dummy;this.onPreloadCallback=this.states[key]['preload']||null;this.onLoadRenderCallback=this.states[key]['loadRender']||null;this.onLoadUpdateCallback=this.states[key]['loadUpdate']||null;this.onCreateCallback=this.states[key]['create']||null;this.onUpdateCallback=this.states[key]['update']||null;this.onPreRenderCallback=this.states[key]['preRender']||null;this.onRenderCallback=this.states[key]['render']||null;this.onPausedCallback=this.states[key]['paused']||null;this.onResumedCallback=this.states[key]['resumed']||null;this.onPauseUpdateCallback=this.states[key]['pauseUpdate']||null;this.onShutDownCallback=this.states[key]['shutdown']||this.dummy;this.current=key;this._created=false;this.onInitCallback.apply(this.callbackContext,this._args);this._args=[];},getCurrentState:function(){return this.states[this.current];},loadComplete:function(){if(this._created===false&&this.onCreateCallback)
{this._created=true;this.onCreateCallback.call(this.callbackContext,this.game);}
else
{this._created=true;}},pause:function(){if(this._created&&this.onPausedCallback)
{this.onPausedCallback.call(this.callbackContext,this.game);}},resume:function(){if(this._created&&this.onResumedCallback)
{this.onResumedCallback.call(this.callbackContext,this.game);}},update:function(){if(this._created&&this.onUpdateCallback)
{this.onUpdateCallback.call(this.callbackContext,this.game);}
else
{if(this.onLoadUpdateCallback)
{this.onLoadUpdateCallback.call(this.callbackContext,this.game);}}},pauseUpdate:function(){if(this._created&&this.onPauseUpdateCallback)
{this.onPauseUpdateCallback.call(this.callbackContext,this.game);}
else
{if(this.onLoadUpdateCallback)
{this.onLoadUpdateCallback.call(this.callbackContext,this.game);}}},preRender:function(){if(this.onPreRenderCallback)
{this.onPreRenderCallback.call(this.callbackContext,this.game);}},render:function(){if(this._created&&this.onRenderCallback)
{if(this.game.renderType===Phaser.CANVAS)
{this.game.context.save();this.game.context.setTransform(1,0,0,1,0,0);}
this.onRenderCallback.call(this.callbackContext,this.game);if(this.game.renderType===Phaser.CANVAS)
{this.game.context.restore();}}
else
{if(this.onLoadRenderCallback)
{this.onLoadRenderCallback.call(this.callbackContext,this.game);}}},destroy:function(){this.callbackContext=null;this.onInitCallback=null;this.onShutDownCallback=null;this.onPreloadCallback=null;this.onLoadRenderCallback=null;this.onLoadUpdateCallback=null;this.onCreateCallback=null;this.onUpdateCallback=null;this.onRenderCallback=null;this.onPausedCallback=null;this.onResumedCallback=null;this.onPauseUpdateCallback=null;this.game=null;this.states={};this._pendingState=null;}};Phaser.StateManager.prototype.constructor=Phaser.StateManager;Phaser.LinkedList=function(){this.next=null;this.prev=null;this.first=null;this.last=null;this.total=0;};Phaser.LinkedList.prototype={add:function(child){if(this.total===0&&this.first===null&&this.last===null)
{this.first=child;this.last=child;this.next=child;child.prev=this;this.total++;return child;}
this.last.next=child;child.prev=this.last;this.last=child;this.total++;return child;},reset:function(){this.first=null;this.last=null;this.next=null;this.prev=null;this.total=0;},remove:function(child){if(this.total===1)
{this.reset();child.next=child.prev=null;return;}
if(child===this.first)
{this.first=this.first.next;}
else if(child===this.last)
{this.last=this.last.prev;}
if(child.prev)
{child.prev.next=child.next;}
if(child.next)
{child.next.prev=child.prev;}
child.next=child.prev=null;if(this.first===null)
{this.last=null;}
this.total--;},callAll:function(callback){if(!this.first||!this.last)
{return;}
var entity=this.first;do
{if(entity&&entity[callback])
{entity[callback].call(entity);}
entity=entity.next;}
while(entity!=this.last.next);}};Phaser.LinkedList.prototype.constructor=Phaser.LinkedList;Phaser.ArrayList=function(){this.total=0;this.position=0;this.list=[];};Phaser.ArrayList.prototype={add:function(child){if(!this.exists(child))
{this.list.push(child);this.total++;}
return child;},getIndex:function(child){return this.list.indexOf(child);},exists:function(child){return(this.list.indexOf(child)>-1);},reset:function(){this.list.length=0;this.total=0;},remove:function(child){var idx=this.list.indexOf(child);if(idx>-1)
{this.list.splice(idx,1);this.total--;return child;}},callAll:function(callback){var args=Array.prototype.splice.call(arguments,1);var i=this.list.length;while(i--)
{if(this.list[i]&&this.list[i][callback])
{this.list[i][callback].apply(this.list[i],args);}}}};Object.defineProperty(Phaser.ArrayList.prototype,"first",{get:function(){this.position=0;if(this.total>0)
{return this.list[0];}
else
{return null;}}});Object.defineProperty(Phaser.ArrayList.prototype,"next",{get:function(){if(this.position<this.total)
{this.position++;return this.list[this.position];}
else
{return null;}}});Phaser.ArrayList.prototype.constructor=Phaser.ArrayList;Phaser.Signal=function(){this._bindings=[];this._prevParams=null;var self=this;this.dispatch=function(){Phaser.Signal.prototype.dispatch.apply(self,arguments);};};Phaser.Signal.prototype={memorize:false,_shouldPropagate:true,active:true,validateListener:function(listener,fnName){if(typeof listener!=='function'){throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}',fnName));}},_registerListener:function(listener,isOnce,listenerContext,priority){var prevIndex=this._indexOfListener(listener,listenerContext),binding;if(prevIndex!==-1){binding=this._bindings[prevIndex];if(binding.isOnce()!==isOnce){throw new Error('You cannot add'+(isOnce?'':'Once')+'() then add'+(!isOnce?'':'Once')+'() the same listener without removing the relationship first.');}}else{binding=new Phaser.SignalBinding(this,listener,isOnce,listenerContext,priority);this._addBinding(binding);}
if(this.memorize&&this._prevParams){binding.execute(this._prevParams);}
return binding;},_addBinding:function(binding){var n=this._bindings.length;do{--n;}while(this._bindings[n]&&binding._priority<=this._bindings[n]._priority);this._bindings.splice(n+1,0,binding);},_indexOfListener:function(listener,context){var n=this._bindings.length,cur;while(n--){cur=this._bindings[n];if(cur._listener===listener&&cur.context===context){return n;}}
return-1;},has:function(listener,context){return this._indexOfListener(listener,context)!==-1;},add:function(listener,listenerContext,priority){this.validateListener(listener,'add');return this._registerListener(listener,false,listenerContext,priority);},addOnce:function(listener,listenerContext,priority){this.validateListener(listener,'addOnce');return this._registerListener(listener,true,listenerContext,priority);},remove:function(listener,context){this.validateListener(listener,'remove');var i=this._indexOfListener(listener,context);if(i!==-1)
{this._bindings[i]._destroy();this._bindings.splice(i,1);}
return listener;},removeAll:function(){var n=this._bindings.length;while(n--){this._bindings[n]._destroy();}
this._bindings.length=0;},getNumListeners:function(){return this._bindings.length;},halt:function(){this._shouldPropagate=false;},dispatch:function(){if(!this.active)
{return;}
var paramsArr=Array.prototype.slice.call(arguments);var n=this._bindings.length;var bindings;if(this.memorize)
{this._prevParams=paramsArr;}
if(!n)
{return;}
bindings=this._bindings.slice();this._shouldPropagate=true;do{n--;}while(bindings[n]&&this._shouldPropagate&&bindings[n].execute(paramsArr)!==false);},forget:function(){this._prevParams=null;},dispose:function(){this.removeAll();delete this._bindings;delete this._prevParams;},toString:function(){return'[Phaser.Signal active:'+this.active+' numListeners:'+this.getNumListeners()+']';}};Phaser.Signal.prototype.constructor=Phaser.Signal;Phaser.SignalBinding=function(signal,listener,isOnce,listenerContext,priority){this._listener=listener;this._isOnce=isOnce;this.context=listenerContext;this._signal=signal;this._priority=priority||0;};Phaser.SignalBinding.prototype={active:true,params:null,execute:function(paramsArr){var handlerReturn,params;if(this.active&&!!this._listener)
{params=this.params?this.params.concat(paramsArr):paramsArr;handlerReturn=this._listener.apply(this.context,params);if(this._isOnce)
{this.detach();}}
return handlerReturn;},detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null;},isBound:function(){return(!!this._signal&&!!this._listener);},isOnce:function(){return this._isOnce;},getListener:function(){return this._listener;},getSignal:function(){return this._signal;},_destroy:function(){delete this._signal;delete this._listener;delete this.context;},toString:function(){return'[Phaser.SignalBinding isOnce:'+this._isOnce+', isBound:'+this.isBound()+', active:'+this.active+']';}};Phaser.SignalBinding.prototype.constructor=Phaser.SignalBinding;Phaser.Filter=function(game,uniforms,fragmentSrc){this.game=game;this.type=Phaser.WEBGL_FILTER;this.passes=[this];this.shaders=[];this.dirty=true;this.padding=0;this.uniforms={time:{type:'1f',value:0},resolution:{type:'2f',value:{x:256,y:256}},mouse:{type:'2f',value:{x:0.0,y:0.0}}};this.fragmentSrc=fragmentSrc||[];};Phaser.Filter.prototype={init:function(){},setResolution:function(width,height){this.uniforms.resolution.value.x=width;this.uniforms.resolution.value.y=height;},update:function(pointer){if(typeof pointer!=='undefined')
{if(pointer.x>0)
{this.uniforms.mouse.x=pointer.x.toFixed(2);}
if(pointer.y>0)
{this.uniforms.mouse.y=pointer.y.toFixed(2);}}
this.uniforms.time.value=this.game.time.totalElapsedSeconds();},destroy:function(){this.game=null;}};Phaser.Filter.prototype.constructor=Phaser.Filter;Object.defineProperty(Phaser.Filter.prototype,'width',{get:function(){return this.uniforms.resolution.value.x;},set:function(value){this.uniforms.resolution.value.x=value;}});Object.defineProperty(Phaser.Filter.prototype,'height',{get:function(){return this.uniforms.resolution.value.y;},set:function(value){this.uniforms.resolution.value.y=value;}});Phaser.Plugin=function(game,parent){if(typeof parent==='undefined'){parent=null;}
this.game=game;this.parent=parent;this.active=false;this.visible=false;this.hasPreUpdate=false;this.hasUpdate=false;this.hasPostUpdate=false;this.hasRender=false;this.hasPostRender=false;};Phaser.Plugin.prototype={preUpdate:function(){},update:function(){},render:function(){},postRender:function(){},destroy:function(){this.game=null;this.parent=null;this.active=false;this.visible=false;}};Phaser.Plugin.prototype.constructor=Phaser.Plugin;Phaser.PluginManager=function(game){this.game=game;this.plugins=[];this._len=0;this._i=0;};Phaser.PluginManager.prototype={add:function(plugin){var result=false;if(typeof plugin==='function')
{plugin=new plugin(this.game,this._parent);}
else
{plugin.game=this.game;plugin.parent=this;}
if(typeof plugin['preUpdate']==='function')
{plugin.hasPreUpdate=true;result=true;}
if(typeof plugin['update']==='function')
{plugin.hasUpdate=true;result=true;}
if(typeof plugin['postUpdate']==='function')
{plugin.hasPostUpdate=true;result=true;}
if(typeof plugin['render']==='function')
{plugin.hasRender=true;result=true;}
if(typeof plugin['postRender']==='function')
{plugin.hasPostRender=true;result=true;}
if(result)
{if(plugin.hasPreUpdate||plugin.hasUpdate||plugin.hasPostUpdate)
{plugin.active=true;}
if(plugin.hasRender||plugin.hasPostRender)
{plugin.visible=true;}
this._len=this.plugins.push(plugin);if(typeof plugin['init']==='function')
{plugin.init();}
return plugin;}
else
{return null;}},remove:function(plugin){this._i=this._len;while(this._i--)
{if(this.plugins[this._i]===plugin)
{plugin.destroy();this.plugins.splice(this._i,1);this._len--;return;}}},removeAll:function(){this._i=this._len;while(this._i--)
{this.plugins[this._i].destroy();}
this.plugins.length=0;this._len=0;},preUpdate:function(){this._i=this._len;while(this._i--)
{if(this.plugins[this._i].active&&this.plugins[this._i].hasPreUpdate)
{this.plugins[this._i].preUpdate();}}},update:function(){this._i=this._len;while(this._i--)
{if(this.plugins[this._i].active&&this.plugins[this._i].hasUpdate)
{this.plugins[this._i].update();}}},postUpdate:function(){this._i=this._len;while(this._i--)
{if(this.plugins[this._i].active&&this.plugins[this._i].hasPostUpdate)
{this.plugins[this._i].postUpdate();}}},render:function(){this._i=this._len;while(this._i--)
{if(this.plugins[this._i].visible&&this.plugins[this._i].hasRender)
{this.plugins[this._i].render();}}},postRender:function(){this._i=this._len;while(this._i--)
{if(this.plugins[this._i].visible&&this.plugins[this._i].hasPostRender)
{this.plugins[this._i].postRender();}}},destroy:function(){this.removeAll();this.game=null;}};Phaser.PluginManager.prototype.constructor=Phaser.PluginManager;Phaser.Stage=function(game,width,height){this.game=game;this.offset=new Phaser.Point();PIXI.Stage.call(this,0x000000,false);this.name='_stage_root';this.interactive=false;this.disableVisibilityChange=false;this.checkOffsetInterval=2500;this.exists=true;this.currentRenderOrderID=0;this._hiddenVar='hidden';this._nextOffsetCheck=0;this._backgroundColor=0x000000;if(game.config)
{this.parseConfig(game.config);}
else
{this.game.canvas=Phaser.Canvas.create(width,height);this.game.canvas.style['-webkit-full-screen']='width: 100%; height: 100%';}};Phaser.Stage.prototype=Object.create(PIXI.Stage.prototype);Phaser.Stage.prototype.constructor=Phaser.Stage;Phaser.Stage.prototype.preUpdate=function(){this.currentRenderOrderID=0;var len=this.children.length;for(var i=0;i<len;i++)
{this.children[i].preUpdate();}};Phaser.Stage.prototype.update=function(){var i=this.children.length;while(i--)
{this.children[i].update();}};Phaser.Stage.prototype.postUpdate=function(){if(this.game.world.camera.target)
{this.game.world.camera.target.postUpdate();this.game.world.camera.update();var i=this.children.length;while(i--)
{if(this.children[i]!==this.game.world.camera.target)
{this.children[i].postUpdate();}}}
else
{this.game.world.camera.update();var i=this.children.length;while(i--)
{this.children[i].postUpdate();}}
if(this.checkOffsetInterval!==false)
{if(this.game.time.now>this._nextOffsetCheck)
{Phaser.Canvas.getOffset(this.game.canvas,this.offset);this._nextOffsetCheck=this.game.time.now+this.checkOffsetInterval;}}};Phaser.Stage.prototype.parseConfig=function(config){if(config['canvasID'])
{this.game.canvas=Phaser.Canvas.create(this.game.width,this.game.height,config['canvasID']);}
else
{this.game.canvas=Phaser.Canvas.create(this.game.width,this.game.height);}
if(config['canvasStyle'])
{this.game.canvas.stlye=config['canvasStyle'];}
else
{this.game.canvas.style['-webkit-full-screen']='width: 100%; height: 100%';}
if(config['checkOffsetInterval'])
{this.checkOffsetInterval=config['checkOffsetInterval'];}
if(config['disableVisibilityChange'])
{this.disableVisibilityChange=config['disableVisibilityChange'];}
if(config['fullScreenScaleMode'])
{this.fullScreenScaleMode=config['fullScreenScaleMode'];}
if(config['scaleMode'])
{this.scaleMode=config['scaleMode'];}
if(config['backgroundColor'])
{this.backgroundColor=config['backgroundColor'];}};Phaser.Stage.prototype.boot=function(){Phaser.Canvas.getOffset(this.game.canvas,this.offset);this.bounds=new Phaser.Rectangle(this.offset.x,this.offset.y,this.game.width,this.game.height);var _this=this;this._onChange=function(event){return _this.visibilityChange(event);};Phaser.Canvas.setUserSelect(this.game.canvas,'none');Phaser.Canvas.setTouchAction(this.game.canvas,'none');this.checkVisibility();};Phaser.Stage.prototype.checkVisibility=function(){if(document.webkitHidden!==undefined)
{this._hiddenVar='webkitvisibilitychange';}
else if(document.mozHidden!==undefined)
{this._hiddenVar='mozvisibilitychange';}
else if(document.msHidden!==undefined)
{this._hiddenVar='msvisibilitychange';}
else if(document.hidden!==undefined)
{this._hiddenVar='visibilitychange';}
else
{this._hiddenVar=null;}
if(this._hiddenVar)
{document.addEventListener(this._hiddenVar,this._onChange,false);}
window.onpagehide=this._onChange;window.onpageshow=this._onChange;window.onblur=this._onChange;window.onfocus=this._onChange;};Phaser.Stage.prototype.visibilityChange=function(event){if(this.disableVisibilityChange)
{return;}
if(event.type==='pagehide'||event.type==='blur'||event.type==='pageshow'||event.type==='focus')
{if(event.type==='pagehide'||event.type==='blur')
{this.game.focusLoss(event);}
else if(event.type==='pageshow'||event.type==='focus')
{this.game.focusGain(event);}
return;}
if(document.hidden||document.mozHidden||document.msHidden||document.webkitHidden)
{this.game.gamePaused(event);}
else
{this.game.gameResumed(event);}};Phaser.Stage.prototype.setBackgroundColor=function(backgroundColor)
{this._backgroundColor=backgroundColor||0x000000;this.backgroundColorSplit=PIXI.hex2rgb(this.backgroundColor);var hex=this._backgroundColor.toString(16);hex='000000'.substr(0,6-hex.length)+hex;this.backgroundColorString='#'+hex;};Object.defineProperty(Phaser.Stage.prototype,"backgroundColor",{get:function(){return this._backgroundColor;},set:function(color){this._backgroundColor=color;if(this.game.transparent===false)
{if(typeof color==='string')
{color=Phaser.Color.hexToRGB(color);}
this.setBackgroundColor(color);}}});Object.defineProperty(Phaser.Stage.prototype,"smoothed",{get:function(){return!PIXI.scaleModes.LINEAR;},set:function(value){if(value)
{PIXI.scaleModes.LINEAR=0;}
else
{PIXI.scaleModes.LINEAR=1;}}});Phaser.Group=function(game,parent,name,addToStage,enableBody,physicsBodyType){if(typeof addToStage==='undefined'){addToStage=false;}
if(typeof enableBody==='undefined'){enableBody=false;}
if(typeof physicsBodyType==='undefined'){physicsBodyType=Phaser.Physics.ARCADE;}
this.game=game;if(typeof parent==='undefined')
{parent=game.world;}
this.name=name||'group';PIXI.DisplayObjectContainer.call(this);if(addToStage)
{this.game.stage.addChild(this);}
else
{if(parent)
{parent.addChild(this);}}
this.z=0;this.type=Phaser.GROUP;this.alive=true;this.exists=true;this.classType=Phaser.Sprite;this.scale=new Phaser.Point(1,1);this.cursor=null;this.cameraOffset=new Phaser.Point();this.enableBody=enableBody;this.enableBodyDebug=false;this.physicsBodyType=physicsBodyType;this._sortProperty='z';this._cache=[0,0,0,0,1,0,1,0,0,0];};Phaser.Group.prototype=Object.create(PIXI.DisplayObjectContainer.prototype);Phaser.Group.prototype.constructor=Phaser.Group;Phaser.Group.RETURN_NONE=0;Phaser.Group.RETURN_TOTAL=1;Phaser.Group.RETURN_CHILD=2;Phaser.Group.SORT_ASCENDING=-1;Phaser.Group.SORT_DESCENDING=1;Phaser.Group.prototype.add=function(child){if(child.parent!==this)
{if(this.enableBody)
{this.game.physics.enable(child,this.physicsBodyType);}
this.addChild(child);child.z=this.children.length;if(child.events)
{child.events.onAddedToGroup.dispatch(child,this);}
if(this.cursor===null)
{this.cursor=child;}}
return child;};Phaser.Group.prototype.addAt=function(child,index){if(child.parent!==this)
{if(this.enableBody)
{this.game.physics.enable(child,this.physicsBodyType);}
this.addChildAt(child,index);this.updateZ();if(child.events)
{child.events.onAddedToGroup.dispatch(child,this);}
if(this.cursor===null)
{this.cursor=child;}}
return child;};Phaser.Group.prototype.getAt=function(index){if(index<0||index>=this.children.length)
{return-1;}
else
{return this.getChildAt(index);}};Phaser.Group.prototype.create=function(x,y,key,frame,exists){if(typeof exists==='undefined'){exists=true;}
var child=new this.classType(this.game,x,y,key,frame);if(this.enableBody)
{this.game.physics.enable(child,this.physicsBodyType);}
child.exists=exists;child.visible=exists;child.alive=exists;this.addChild(child);child.z=this.children.length;if(child.events)
{child.events.onAddedToGroup.dispatch(child,this);}
if(this.cursor===null)
{this.cursor=child;}
return child;};Phaser.Group.prototype.createMultiple=function(quantity,key,frame,exists){if(typeof exists==='undefined'){exists=false;}
for(var i=0;i<quantity;i++)
{this.create(0,0,key,frame,exists);}};Phaser.Group.prototype.updateZ=function(){var i=this.children.length;while(i--)
{this.children[i].z=i;}};Phaser.Group.prototype.resetCursor=function(index){if(typeof index==='undefined'){index=0;}
if(index>this.children.length-1)
{index=0;}
if(this.cursor)
{this._cache[8]=index;this.cursor=this.children[this._cache[8]];return this.cursor;}};Phaser.Group.prototype.next=function(){if(this.cursor)
{if(this._cache[8]>=this.children.length-1)
{this._cache[8]=0;}
else
{this._cache[8]++;}
this.cursor=this.children[this._cache[8]];return this.cursor;}};Phaser.Group.prototype.previous=function(){if(this.cursor)
{if(this._cache[8]===0)
{this._cache[8]=this.children.length-1;}
else
{this._cache[8]--;}
this.cursor=this.children[this._cache[8]];return this.cursor;}};Phaser.Group.prototype.swap=function(child1,child2){var result=this.swapChildren(child1,child2);if(result)
{this.updateZ();}
return result;};Phaser.Group.prototype.bringToTop=function(child){if(child.parent===this&&this.getIndex(child)<this.children.length)
{this.remove(child);this.add(child);}
return child;};Phaser.Group.prototype.sendToBack=function(child){if(child.parent===this&&this.getIndex(child)>0)
{this.remove(child);this.addAt(child,0);}
return child;};Phaser.Group.prototype.moveUp=function(child){if(child.parent===this&&this.getIndex(child)<this.children.length-1)
{var a=this.getIndex(child);var b=this.getAt(a+1);if(b)
{this.swap(child,b);}}
return child;};Phaser.Group.prototype.moveDown=function(child){if(child.parent===this&&this.getIndex(child)>0)
{var a=this.getIndex(child);var b=this.getAt(a-1);if(b)
{this.swap(child,b);}}
return child;};Phaser.Group.prototype.xy=function(index,x,y){if(index<0||index>this.children.length)
{return-1;}
else
{this.getChildAt(index).x=x;this.getChildAt(index).y=y;}};Phaser.Group.prototype.reverse=function(){this.children.reverse();this.updateZ();};Phaser.Group.prototype.getIndex=function(child){return this.children.indexOf(child);};Phaser.Group.prototype.replace=function(oldChild,newChild){var index=this.getIndex(oldChild);if(index!==-1)
{if(newChild.parent!==undefined)
{newChild.events.onRemovedFromGroup.dispatch(newChild,this);newChild.parent.removeChild(newChild);if(newChild.parent instanceof Phaser.Group)
{newChild.parent.updateZ();}}
var temp=oldChild;this.remove(temp);this.addAt(newChild,index);return temp;}};Phaser.Group.prototype.setProperty=function(child,key,value,operation){operation=operation||0;var len=key.length;if(len===1&&child.hasOwnProperty(key[0]))
{if(operation===0){child[key[0]]=value;}
else if(operation==1){child[key[0]]+=value;}
else if(operation==2){child[key[0]]-=value;}
else if(operation==3){child[key[0]]*=value;}
else if(operation==4){child[key[0]]/=value;}}
else if(len===2&&child.hasOwnProperty(key[0])&&child[key[0]].hasOwnProperty(key[1]))
{if(operation===0){child[key[0]][key[1]]=value;}
else if(operation==1){child[key[0]][key[1]]+=value;}
else if(operation==2){child[key[0]][key[1]]-=value;}
else if(operation==3){child[key[0]][key[1]]*=value;}
else if(operation==4){child[key[0]][key[1]]/=value;}}
else if(len===3&&child.hasOwnProperty(key[0])&&child[key[0]].hasOwnProperty(key[1])&&child[key[0]][key[1]].hasOwnProperty(key[2]))
{if(operation===0){child[key[0]][key[1]][key[2]]=value;}
else if(operation==1){child[key[0]][key[1]][key[2]]+=value;}
else if(operation==2){child[key[0]][key[1]][key[2]]-=value;}
else if(operation==3){child[key[0]][key[1]][key[2]]*=value;}
else if(operation==4){child[key[0]][key[1]][key[2]]/=value;}}
else if(len===4&&child.hasOwnProperty(key[0])&&child[key[0]].hasOwnProperty(key[1])&&child[key[0]][key[1]].hasOwnProperty(key[2])&&child[key[0]][key[1]][key[2]].hasOwnProperty(key[3]))
{if(operation===0){child[key[0]][key[1]][key[2]][key[3]]=value;}
else if(operation==1){child[key[0]][key[1]][key[2]][key[3]]+=value;}
else if(operation==2){child[key[0]][key[1]][key[2]][key[3]]-=value;}
else if(operation==3){child[key[0]][key[1]][key[2]][key[3]]*=value;}
else if(operation==4){child[key[0]][key[1]][key[2]][key[3]]/=value;}}};Phaser.Group.prototype.set=function(child,key,value,checkAlive,checkVisible,operation){key=key.split('.');if(typeof checkAlive==='undefined'){checkAlive=false;}
if(typeof checkVisible==='undefined'){checkVisible=false;}
if((checkAlive===false||(checkAlive&&child.alive))&&(checkVisible===false||(checkVisible&&child.visible)))
{this.setProperty(child,key,value,operation);}};Phaser.Group.prototype.setAll=function(key,value,checkAlive,checkVisible,operation){key=key.split('.');if(typeof checkAlive==='undefined'){checkAlive=false;}
if(typeof checkVisible==='undefined'){checkVisible=false;}
operation=operation||0;for(var i=0,len=this.children.length;i<len;i++)
{if((!checkAlive||(checkAlive&&this.children[i].alive))&&(!checkVisible||(checkVisible&&this.children[i].visible)))
{this.setProperty(this.children[i],key,value,operation);}}};Phaser.Group.prototype.setAllChildren=function(key,value,checkAlive,checkVisible,operation){if(typeof checkAlive==='undefined'){checkAlive=false;}
if(typeof checkVisible==='undefined'){checkVisible=false;}
operation=operation||0;for(var i=0,len=this.children.length;i<len;i++)
{if((!checkAlive||(checkAlive&&this.children[i].alive))&&(!checkVisible||(checkVisible&&this.children[i].visible)))
{if(this.children[i]instanceof Phaser.Group)
{this.children[i].setAllChildren(key,value,checkAlive,checkVisible,operation);}
else
{this.setProperty(this.children[i],key.split('.'),value,operation);}}}};Phaser.Group.prototype.addAll=function(property,amount,checkAlive,checkVisible){this.setAll(property,amount,checkAlive,checkVisible,1);};Phaser.Group.prototype.subAll=function(property,amount,checkAlive,checkVisible){this.setAll(property,amount,checkAlive,checkVisible,2);};Phaser.Group.prototype.multiplyAll=function(property,amount,checkAlive,checkVisible){this.setAll(property,amount,checkAlive,checkVisible,3);};Phaser.Group.prototype.divideAll=function(property,amount,checkAlive,checkVisible){this.setAll(property,amount,checkAlive,checkVisible,4);};Phaser.Group.prototype.callAllExists=function(callback,existsValue){var args=Array.prototype.splice.call(arguments,2);for(var i=0,len=this.children.length;i<len;i++)
{if(this.children[i].exists===existsValue&&this.children[i][callback])
{this.children[i][callback].apply(this.children[i],args);}}};Phaser.Group.prototype.callbackFromArray=function(child,callback,length){if(length==1)
{if(child[callback[0]])
{return child[callback[0]];}}
else if(length==2)
{if(child[callback[0]][callback[1]])
{return child[callback[0]][callback[1]];}}
else if(length==3)
{if(child[callback[0]][callback[1]][callback[2]])
{return child[callback[0]][callback[1]][callback[2]];}}
else if(length==4)
{if(child[callback[0]][callback[1]][callback[2]][callback[3]])
{return child[callback[0]][callback[1]][callback[2]][callback[3]];}}
else
{if(child[callback])
{return child[callback];}}
return false;};Phaser.Group.prototype.callAll=function(method,context){if(typeof method==='undefined')
{return;}
method=method.split('.');var methodLength=method.length;if(typeof context==='undefined'||context===null||context==='')
{context=null;}
else
{if(typeof context==='string')
{context=context.split('.');var contextLength=context.length;}}
var args=Array.prototype.splice.call(arguments,2);var callback=null;var callbackContext=null;for(var i=0,len=this.children.length;i<len;i++)
{callback=this.callbackFromArray(this.children[i],method,methodLength);if(context&&callback)
{callbackContext=this.callbackFromArray(this.children[i],context,contextLength);if(callback)
{callback.apply(callbackContext,args);}}
else if(callback)
{callback.apply(this.children[i],args);}}};Phaser.Group.prototype.preUpdate=function(){if(!this.exists||!this.parent.exists)
{this.renderOrderID=-1;return false;}
var i=this.children.length;while(i--)
{this.children[i].preUpdate();}
return true;};Phaser.Group.prototype.update=function(){var i=this.children.length;while(i--)
{this.children[i].update();}};Phaser.Group.prototype.postUpdate=function(){if(this._cache[7]===1)
{this.x=this.game.camera.view.x+this.cameraOffset.x;this.y=this.game.camera.view.y+this.cameraOffset.y;}
var i=this.children.length;while(i--)
{this.children[i].postUpdate();}};Phaser.Group.prototype.forEach=function(callback,callbackContext,checkExists){if(typeof checkExists==='undefined'){checkExists=false;}
var args=Array.prototype.splice.call(arguments,3);args.unshift(null);for(var i=0,len=this.children.length;i<len;i++)
{if(!checkExists||(checkExists&&this.children[i].exists))
{args[0]=this.children[i];callback.apply(callbackContext,args);}}};Phaser.Group.prototype.forEachExists=function(callback,callbackContext){var args=Array.prototype.splice.call(arguments,2);args.unshift(null);this.iterate('exists',true,Phaser.Group.RETURN_TOTAL,callback,callbackContext,args);};Phaser.Group.prototype.forEachAlive=function(callback,callbackContext){var args=Array.prototype.splice.call(arguments,2);args.unshift(null);this.iterate('alive',true,Phaser.Group.RETURN_TOTAL,callback,callbackContext,args);};Phaser.Group.prototype.forEachDead=function(callback,callbackContext){var args=Array.prototype.splice.call(arguments,2);args.unshift(null);this.iterate('alive',false,Phaser.Group.RETURN_TOTAL,callback,callbackContext,args);};Phaser.Group.prototype.sort=function(index,order){if(this.children.length<2)
{return;}
if(typeof index==='undefined'){index='z';}
if(typeof order==='undefined'){order=Phaser.Group.SORT_ASCENDING;}
this._sortProperty=index;if(order===Phaser.Group.SORT_ASCENDING)
{this.children.sort(this.ascendingSortHandler.bind(this));}
else
{this.children.sort(this.descendingSortHandler.bind(this));}
this.updateZ();};Phaser.Group.prototype.customSort=function(sortHandler,context){if(this.children.length<2)
{return;}
this.children.sort(sortHandler.bind(context));this.updateZ();};Phaser.Group.prototype.ascendingSortHandler=function(a,b){if(a[this._sortProperty]<b[this._sortProperty])
{return-1;}
else if(a[this._sortProperty]>b[this._sortProperty])
{return 1;}
else
{if(a.z<b.z)
{return-1;}
else
{return 1;}}};Phaser.Group.prototype.descendingSortHandler=function(a,b){if(a[this._sortProperty]<b[this._sortProperty])
{return 1;}
else if(a[this._sortProperty]>b[this._sortProperty])
{return-1;}
else
{return 0;}};Phaser.Group.prototype.iterate=function(key,value,returnType,callback,callbackContext,args){if(returnType===Phaser.Group.RETURN_TOTAL&&this.children.length===0)
{return 0;}
if(typeof callback==='undefined')
{callback=false;}
var total=0;for(var i=0,len=this.children.length;i<len;i++)
{if(this.children[i][key]===value)
{total++;if(callback)
{args[0]=this.children[i];callback.apply(callbackContext,args);}
if(returnType===Phaser.Group.RETURN_CHILD)
{return this.children[i];}}}
if(returnType===Phaser.Group.RETURN_TOTAL)
{return total;}
else if(returnType===Phaser.Group.RETURN_CHILD)
{return null;}};Phaser.Group.prototype.getFirstExists=function(state){if(typeof state!=='boolean')
{state=true;}
return this.iterate('exists',state,Phaser.Group.RETURN_CHILD);};Phaser.Group.prototype.getFirstAlive=function(){return this.iterate('alive',true,Phaser.Group.RETURN_CHILD);};Phaser.Group.prototype.getFirstDead=function(){return this.iterate('alive',false,Phaser.Group.RETURN_CHILD);};Phaser.Group.prototype.getTop=function(){if(this.children.length>0)
{return this.children[this.children.length-1];}};Phaser.Group.prototype.getBottom=function(){if(this.children.length>0)
{return this.children[0];}};Phaser.Group.prototype.countLiving=function(){return this.iterate('alive',true,Phaser.Group.RETURN_TOTAL);};Phaser.Group.prototype.countDead=function(){return this.iterate('alive',false,Phaser.Group.RETURN_TOTAL);};Phaser.Group.prototype.getRandom=function(startIndex,length){if(this.children.length===0)
{return null;}
startIndex=startIndex||0;length=length||this.children.length;return this.game.math.getRandom(this.children,startIndex,length);};Phaser.Group.prototype.remove=function(child,destroy){if(typeof destroy==='undefined'){destroy=false;}
if(this.children.length===0||this.children.indexOf(child)===-1)
{return false;}
if(child.events&&!child.destroyPhase)
{child.events.onRemovedFromGroup.dispatch(child,this);}
var removed=this.removeChild(child);this.updateZ();if(this.cursor===child)
{this.next();}
if(destroy&&removed)
{removed.destroy(true);}
return true;};Phaser.Group.prototype.removeAll=function(destroy){if(typeof destroy==='undefined'){destroy=false;}
if(this.children.length===0)
{return;}
do
{if(this.children[0].events)
{this.children[0].events.onRemovedFromGroup.dispatch(this.children[0],this);}
var removed=this.removeChild(this.children[0]);if(destroy&&removed)
{removed.destroy(true);}}
while(this.children.length>0);this.cursor=null;};Phaser.Group.prototype.removeBetween=function(startIndex,endIndex,destroy){if(typeof endIndex==='undefined'){endIndex=this.children.length;}
if(typeof destroy==='undefined'){destroy=false;}
if(this.children.length===0)
{return;}
if(startIndex>endIndex||startIndex<0||endIndex>this.children.length)
{return false;}
var i=endIndex;while(i>=startIndex)
{if(this.children[i].events)
{this.children[i].events.onRemovedFromGroup.dispatch(this.children[i],this);}
var removed=this.removeChild(this.children[i]);if(destroy&&removed)
{removed.destroy(true);}
if(this.cursor===this.children[i])
{this.cursor=null;}
i--;}
this.updateZ();};Phaser.Group.prototype.destroy=function(destroyChildren,soft){if(this.game===null){return;}
if(typeof destroyChildren==='undefined'){destroyChildren=true;}
if(typeof soft==='undefined'){soft=false;}
this.removeAll(destroyChildren);this.cursor=null;if(!soft)
{if(this.parent)
{this.parent.removeChild(this);}
this.game=null;this.exists=false;}};Object.defineProperty(Phaser.Group.prototype,"total",{get:function(){return this.iterate('exists',true,Phaser.Group.RETURN_TOTAL);}});Object.defineProperty(Phaser.Group.prototype,"length",{get:function(){return this.children.length;}});Object.defineProperty(Phaser.Group.prototype,"angle",{get:function(){return Phaser.Math.radToDeg(this.rotation);},set:function(value){this.rotation=Phaser.Math.degToRad(value);}});Object.defineProperty(Phaser.Group.prototype,"fixedToCamera",{get:function(){return!!this._cache[7];},set:function(value){if(value)
{this._cache[7]=1;this.cameraOffset.set(this.x,this.y);}
else
{this._cache[7]=0;}}});Phaser.World=function(game){Phaser.Group.call(this,game,null,'__world',false);this.bounds=new Phaser.Rectangle(0,0,game.width,game.height);this.camera=null;};Phaser.World.prototype=Object.create(Phaser.Group.prototype);Phaser.World.prototype.constructor=Phaser.World;Phaser.World.prototype.boot=function(){this.camera=new Phaser.Camera(this.game,0,0,0,this.game.width,this.game.height);this.camera.displayObject=this;this.camera.scale=this.scale;this.game.camera=this.camera;this.game.stage.addChild(this);};Phaser.World.prototype.setBounds=function(x,y,width,height){if(width<this.game.width)
{width=this.game.width;}
if(height<this.game.height)
{height=this.game.height;}
this.bounds.setTo(x,y,width,height);if(this.camera.bounds)
{this.camera.bounds.setTo(x,y,width,height);}
this.game.physics.setBoundsToWorld();};Phaser.World.prototype.shutdown=function(){this.destroy(true,true);};Phaser.World.prototype.wrap=function(sprite,padding,useBounds){if(typeof padding==='undefined'){padding=0;}
if(typeof useBounds==='undefined'){useBounds=false;}
if(!useBounds)
{if(sprite.x+padding<this.bounds.x)
{sprite.x=this.bounds.right+padding;}
else if(sprite.x-padding>this.bounds.right)
{sprite.x=this.bounds.left-padding;}
if(sprite.y+padding<this.bounds.top)
{sprite.y=this.bounds.bottom+padding;}
else if(sprite.y-padding>this.bounds.bottom)
{sprite.y=this.bounds.top-padding;}}
else
{sprite.getBounds();if(sprite._currentBounds.right<this.bounds.x)
{sprite.x=this.bounds.right;}
else if(sprite._currentBounds.x>this.bounds.right)
{sprite.x=this.bounds.left;}
if(sprite._currentBounds.bottom<this.bounds.top)
{sprite.y=this.bounds.bottom;}
else if(sprite._currentBounds.top>this.bounds.bottom)
{sprite.y=this.bounds.top;}}};Object.defineProperty(Phaser.World.prototype,"width",{get:function(){return this.bounds.width;},set:function(value){this.bounds.width=value;}});Object.defineProperty(Phaser.World.prototype,"height",{get:function(){return this.bounds.height;},set:function(value){this.bounds.height=value;}});Object.defineProperty(Phaser.World.prototype,"centerX",{get:function(){return this.bounds.halfWidth;}});Object.defineProperty(Phaser.World.prototype,"centerY",{get:function(){return this.bounds.halfHeight;}});Object.defineProperty(Phaser.World.prototype,"randomX",{get:function(){if(this.bounds.x<0)
{return this.game.rnd.integerInRange(this.bounds.x,(this.bounds.width-Math.abs(this.bounds.x)));}
else
{return this.game.rnd.integerInRange(this.bounds.x,this.bounds.width);}}});Object.defineProperty(Phaser.World.prototype,"randomY",{get:function(){if(this.bounds.y<0)
{return this.game.rnd.integerInRange(this.bounds.y,(this.bounds.height-Math.abs(this.bounds.y)));}
else
{return this.game.rnd.integerInRange(this.bounds.y,this.bounds.height);}}});Phaser.ScaleManager=function(game,width,height){this.game=game;this.width=width;this.height=height;this.minWidth=null;this.maxWidth=null;this.minHeight=null;this.maxHeight=null;this.forceLandscape=false;this.forcePortrait=false;this.incorrectOrientation=false;this.pageAlignHorizontally=false;this.pageAlignVertically=false;this.maxIterations=5;this.orientationSprite=null;this.enterLandscape=new Phaser.Signal();this.enterPortrait=new Phaser.Signal();this.enterIncorrectOrientation=new Phaser.Signal();this.leaveIncorrectOrientation=new Phaser.Signal();this.hasResized=new Phaser.Signal();this.fullScreenTarget=this.game.canvas;this.enterFullScreen=new Phaser.Signal();this.leaveFullScreen=new Phaser.Signal();this.orientation=0;if(window['orientation'])
{this.orientation=window['orientation'];}
else
{if(window.outerWidth>window.outerHeight)
{this.orientation=90;}}
this.scaleFactor=new Phaser.Point(1,1);this.scaleFactorInversed=new Phaser.Point(1,1);this.margin=new Phaser.Point(0,0);this.aspectRatio=0;this.sourceAspectRatio=width/height;this.event=null;this.scaleMode=Phaser.ScaleManager.NO_SCALE;this.fullScreenScaleMode=Phaser.ScaleManager.NO_SCALE;this._startHeight=0;this._width=0;this._height=0;this._check=null;var _this=this;window.addEventListener('orientationchange',function(event){return _this.checkOrientation(event);},false);window.addEventListener('resize',function(event){return _this.checkResize(event);},false);document.addEventListener('webkitfullscreenchange',function(event){return _this.fullScreenChange(event);},false);document.addEventListener('mozfullscreenchange',function(event){return _this.fullScreenChange(event);},false);document.addEventListener('fullscreenchange',function(event){return _this.fullScreenChange(event);},false);};Phaser.ScaleManager.EXACT_FIT=0;Phaser.ScaleManager.NO_SCALE=1;Phaser.ScaleManager.SHOW_ALL=2;Phaser.ScaleManager.prototype={startFullScreen:function(antialias){if(this.isFullScreen||!this.game.device.fullscreen)
{return;}
if(typeof antialias!=='undefined'&&this.game.renderType===Phaser.CANVAS)
{this.game.stage.smoothed=antialias;}
this._width=this.width;this._height=this.height;if(this.game.device.fullscreenKeyboard)
{this.fullScreenTarget[this.game.device.requestFullscreen](Element.ALLOW_KEYBOARD_INPUT);}
else
{this.fullScreenTarget[this.game.device.requestFullscreen]();}},stopFullScreen:function(){this.fullScreenTarget[this.game.device.cancelFullscreen]();},fullScreenChange:function(event){this.event=event;if(this.isFullScreen)
{if(this.fullScreenScaleMode===Phaser.ScaleManager.EXACT_FIT)
{this.fullScreenTarget.style['width']='100%';this.fullScreenTarget.style['height']='100%';this.width=window.outerWidth;this.height=window.outerHeight;this.game.input.scale.setTo(this.game.width/this.width,this.game.height/this.height);this.aspectRatio=this.width/this.height;this.scaleFactor.x=this.game.width/this.width;this.scaleFactor.y=this.game.height/this.height;this.checkResize();}
else if(this.fullScreenScaleMode===Phaser.ScaleManager.SHOW_ALL)
{this.setShowAll();this.refresh();}
this.enterFullScreen.dispatch(this.width,this.height);}
else
{this.fullScreenTarget.style['width']=this.game.width+'px';this.fullScreenTarget.style['height']=this.game.height+'px';this.width=this._width;this.height=this._height;this.game.input.scale.setTo(this.game.width/this.width,this.game.height/this.height);this.aspectRatio=this.width/this.height;this.scaleFactor.x=this.game.width/this.width;this.scaleFactor.y=this.game.height/this.height;this.leaveFullScreen.dispatch(this.width,this.height);}},forceOrientation:function(forceLandscape,forcePortrait,orientationImage){if(typeof forcePortrait==='undefined'){forcePortrait=false;}
this.forceLandscape=forceLandscape;this.forcePortrait=forcePortrait;if(typeof orientationImage!=='undefined')
{if(orientationImage===null||this.game.cache.checkImageKey(orientationImage)===false)
{orientationImage='__default';}
this.orientationSprite=new Phaser.Image(this.game,this.game.width/2,this.game.height/2,PIXI.TextureCache[orientationImage]);this.orientationSprite.anchor.set(0.5);this.checkOrientationState();if(this.incorrectOrientation)
{this.orientationSprite.visible=true;this.game.world.visible=false;}
else
{this.orientationSprite.visible=false;this.game.world.visible=true;}
this.game.stage.addChild(this.orientationSprite);}},checkOrientationState:function(){if(this.incorrectOrientation)
{if((this.forceLandscape&&window.innerWidth>window.innerHeight)||(this.forcePortrait&&window.innerHeight>window.innerWidth))
{this.incorrectOrientation=false;this.leaveIncorrectOrientation.dispatch();if(this.orientationSprite)
{this.orientationSprite.visible=false;this.game.world.visible=true;}
if(this.scaleMode!==Phaser.ScaleManager.NO_SCALE)
{this.refresh();}}}
else
{if((this.forceLandscape&&window.innerWidth<window.innerHeight)||(this.forcePortrait&&window.innerHeight<window.innerWidth))
{this.incorrectOrientation=true;this.enterIncorrectOrientation.dispatch();if(this.orientationSprite&&this.orientationSprite.visible===false)
{this.orientationSprite.visible=true;this.game.world.visible=false;}
if(this.scaleMode!==Phaser.ScaleManager.NO_SCALE)
{this.refresh();}}}},checkOrientation:function(event){this.event=event;this.orientation=window['orientation'];if(this.isLandscape)
{this.enterLandscape.dispatch(this.orientation,true,false);}
else
{this.enterPortrait.dispatch(this.orientation,false,true);}
if(this.scaleMode!==Phaser.ScaleManager.NO_SCALE)
{this.refresh();}},checkResize:function(event){this.event=event;if(window.outerWidth>window.outerHeight)
{this.orientation=90;}
else
{this.orientation=0;}
if(this.isLandscape)
{this.enterLandscape.dispatch(this.orientation,true,false);}
else
{this.enterPortrait.dispatch(this.orientation,false,true);}
if(this.scaleMode!==Phaser.ScaleManager.NO_SCALE)
{this.refresh();}
this.checkOrientationState();},refresh:function(){if(!this.game.device.iPad&&!this.game.device.webApp&&!this.game.device.desktop)
{if(this.game.device.android&&!this.game.device.chrome)
{window.scrollTo(0,1);}
else
{window.scrollTo(0,0);}}
if(this._check===null&&this.maxIterations>0)
{this._iterations=this.maxIterations;var _this=this;this._check=window.setInterval(function(){return _this.setScreenSize();},10);this.setScreenSize();}},setScreenSize:function(force){if(typeof force==='undefined')
{force=false;}
if(!this.game.device.iPad&&!this.game.device.webApp&&!this.game.device.desktop)
{if(this.game.device.android&&!this.game.device.chrome)
{window.scrollTo(0,1);}
else
{window.scrollTo(0,0);}}
this._iterations--;if(force||window.innerHeight>this._startHeight||this._iterations<0)
{document.documentElement['style'].minHeight=window.innerHeight+'px';if(this.incorrectOrientation)
{this.setMaximum();}
else if(!this.isFullScreen)
{if(this.scaleMode===Phaser.ScaleManager.EXACT_FIT)
{this.setExactFit();}
else if(this.scaleMode===Phaser.ScaleManager.SHOW_ALL)
{this.setShowAll();}}
else
{if(this.fullScreenScaleMode===Phaser.ScaleManager.EXACT_FIT)
{this.setExactFit();}
else if(this.fullScreenScaleMode===Phaser.ScaleManager.SHOW_ALL)
{this.setShowAll();}}
this.setSize();clearInterval(this._check);this._check=null;}},setSize:function(){if(!this.incorrectOrientation)
{if(this.maxWidth&&this.width>this.maxWidth)
{this.width=this.maxWidth;}
if(this.maxHeight&&this.height>this.maxHeight)
{this.height=this.maxHeight;}
if(this.minWidth&&this.width<this.minWidth)
{this.width=this.minWidth;}
if(this.minHeight&&this.height<this.minHeight)
{this.height=this.minHeight;}}
this.game.canvas.style.width=this.width+'px';this.game.canvas.style.height=this.height+'px';this.game.input.scale.setTo(this.game.width/this.width,this.game.height/this.height);if(this.pageAlignHorizontally)
{if(this.width<window.innerWidth&&!this.incorrectOrientation)
{this.margin.x=Math.round((window.innerWidth-this.width)/2);this.game.canvas.style.marginLeft=this.margin.x+'px';}
else
{this.margin.x=0;this.game.canvas.style.marginLeft='0px';}}
if(this.pageAlignVertically)
{if(this.height<window.innerHeight&&!this.incorrectOrientation)
{this.margin.y=Math.round((window.innerHeight-this.height)/2);this.game.canvas.style.marginTop=this.margin.y+'px';}
else
{this.margin.y=0;this.game.canvas.style.marginTop='0px';}}
Phaser.Canvas.getOffset(this.game.canvas,this.game.stage.offset);this.aspectRatio=this.width/this.height;this.scaleFactor.x=this.game.width/this.width;this.scaleFactor.y=this.game.height/this.height;this.scaleFactorInversed.x=this.width/this.game.width;this.scaleFactorInversed.y=this.height/this.game.height;this.hasResized.dispatch(this.width,this.height);this.checkOrientationState();},setMaximum:function(){this.width=window.innerWidth;this.height=window.innerHeight;},setShowAll:function(){var multiplier=Math.min((window.innerHeight/this.game.height),(window.innerWidth/this.game.width));this.width=Math.round(this.game.width*multiplier);this.height=Math.round(this.game.height*multiplier);},setExactFit:function(){var availableWidth=window.innerWidth;var availableHeight=window.innerHeight;if(this.maxWidth&&availableWidth>this.maxWidth)
{this.width=this.maxWidth;}
else
{this.width=availableWidth;}
if(this.maxHeight&&availableHeight>this.maxHeight)
{this.height=this.maxHeight;}
else
{this.height=availableHeight;}}};Phaser.ScaleManager.prototype.constructor=Phaser.ScaleManager;Object.defineProperty(Phaser.ScaleManager.prototype,"isFullScreen",{get:function(){return(document['fullscreenElement']||document['mozFullScreenElement']||document['webkitFullscreenElement']);}});Object.defineProperty(Phaser.ScaleManager.prototype,"isPortrait",{get:function(){return(this.orientation===0||this.orientation===180);}});Object.defineProperty(Phaser.ScaleManager.prototype,"isLandscape",{get:function(){return(this.orientation===90||this.orientation===-90);}});Phaser.Game=function(width,height,renderer,parent,state,transparent,antialias,physicsConfig){this.id=Phaser.GAMES.push(this)-1;this.config=null;this.physicsConfig=physicsConfig;this.parent='';this.width=800;this.height=600;this.transparent=false;this.antialias=true;this.renderer=null;this.renderType=Phaser.AUTO;this.state=null;this.isBooted=false;this.isRunning=false;this.raf=null;this.add=null;this.make=null;this.cache=null;this.input=null;this.load=null;this.math=null;this.net=null;this.scale=null;this.sound=null;this.stage=null;this.time=null;this.tweens=null;this.world=null;this.physics=null;this.rnd=null;this.device=null;this.camera=null;this.canvas=null;this.context=null;this.debug=null;this.particles=null;this.stepping=false;this.pendingStep=false;this.stepCount=0;this.onPause=null;this.onResume=null;this.onBlur=null;this.onFocus=null;this._paused=false;this._codePaused=false;if(arguments.length===1&&typeof arguments[0]==='object')
{this.parseConfig(arguments[0]);}
else
{if(typeof width!=='undefined')
{this.width=width;}
if(typeof height!=='undefined')
{this.height=height;}
if(typeof renderer!=='undefined')
{this.renderer=renderer;this.renderType=renderer;}
if(typeof parent!=='undefined')
{this.parent=parent;}
if(typeof transparent!=='undefined')
{this.transparent=transparent;}
if(typeof antialias!=='undefined')
{this.antialias=antialias;}
this.rnd=new Phaser.RandomDataGenerator([(Date.now()*Math.random()).toString()]);this.state=new Phaser.StateManager(this,state);}
var _this=this;this._onBoot=function(){return _this.boot();};if(document.readyState==='complete'||document.readyState==='interactive')
{window.setTimeout(this._onBoot,0);}
else
{document.addEventListener('DOMContentLoaded',this._onBoot,false);window.addEventListener('load',this._onBoot,false);}
return this;};Phaser.Game.prototype={parseConfig:function(config){this.config=config;if(config['width'])
{this.width=Phaser.Utils.parseDimension(config['width'],0);}
if(config['height'])
{this.height=Phaser.Utils.parseDimension(config['height'],1);}
if(config['renderer'])
{this.renderer=config['renderer'];this.renderType=config['renderer'];}
if(config['parent'])
{this.parent=config['parent'];}
if(config['transparent'])
{this.transparent=config['transparent'];}
if(config['antialias'])
{this.antialias=config['antialias'];}
if(config['physicsConfig'])
{this.physicsConfig=config['physicsConfig'];}
var seed=[(Date.now()*Math.random()).toString()];if(config['seed'])
{seed=config['seed'];}
this.rnd=new Phaser.RandomDataGenerator(seed);var state=null;if(config['state'])
{state=config['state'];}
this.state=new Phaser.StateManager(this,state);},boot:function(){if(this.isBooted)
{return;}
if(!document.body)
{window.setTimeout(this._onBoot,20);}
else
{document.removeEventListener('DOMContentLoaded',this._onBoot);window.removeEventListener('load',this._onBoot);this.onPause=new Phaser.Signal();this.onResume=new Phaser.Signal();this.onBlur=new Phaser.Signal();this.onFocus=new Phaser.Signal();this.isBooted=true;this.device=new Phaser.Device(this);this.math=Phaser.Math;this.stage=new Phaser.Stage(this,this.width,this.height);this.scale=new Phaser.ScaleManager(this,this.width,this.height);this.setUpRenderer();this.device.checkFullScreenSupport();this.world=new Phaser.World(this);this.add=new Phaser.GameObjectFactory(this);this.make=new Phaser.GameObjectCreator(this);this.cache=new Phaser.Cache(this);this.load=new Phaser.Loader(this);this.time=new Phaser.Time(this);this.tweens=new Phaser.TweenManager(this);this.input=new Phaser.Input(this);this.sound=new Phaser.SoundManager(this);this.physics=new Phaser.Physics(this,this.physicsConfig);this.particles=new Phaser.Particles(this);this.plugins=new Phaser.PluginManager(this);this.net=new Phaser.Net(this);this.debug=new Phaser.Utils.Debug(this);this.scratch=new Phaser.BitmapData(this,'__root',1024,1024);this.time.boot();this.stage.boot();this.world.boot();this.input.boot();this.sound.boot();this.state.boot();this.debug.boot();this.showDebugHeader();this.isRunning=true;if(this.config&&this.config['forceSetTimeOut'])
{this.raf=new Phaser.RequestAnimationFrame(this,this.config['forceSetTimeOut']);}
else
{this.raf=new Phaser.RequestAnimationFrame(this,false);}
this.raf.start();}},showDebugHeader:function(){var v=Phaser.VERSION;var r='Canvas';var a='HTML Audio';var c=1;if(this.renderType===Phaser.WEBGL)
{r='WebGL';c++;}
else if(this.renderType==Phaser.HEADLESS)
{r='Headless';}
if(this.device.webAudio)
{a='WebAudio';c++;}
if(this.device.chrome)
{var args=['%c %c %c Phaser v'+v+' - '+r+' - '+a+'  %c %c '+' http://phaser.io  %c %c ♥%c♥%c♥ ','background: #0cf300','background: #00bc17','color: #ffffff; background: #00711f;','background: #00bc17','background: #0cf300','background: #00bc17'];for(var i=0;i<3;i++)
{if(i<c)
{args.push('color: #ff2424; background: #fff');}
else
{args.push('color: #959595; background: #fff');}}
console.log.apply(console,args);}
else if(window['console'])
{console.log('Phaser v'+v+' - Renderer: '+r+' - Audio: '+a+' - http://phaser.io');}},setUpRenderer:function(){if(this.device.trident)
{this.renderType=Phaser.CANVAS;}
if(this.renderType===Phaser.HEADLESS||this.renderType===Phaser.CANVAS||(this.renderType===Phaser.AUTO&&this.device.webGL===false))
{if(this.device.canvas)
{if(this.renderType===Phaser.AUTO)
{this.renderType=Phaser.CANVAS;}
this.renderer=new PIXI.CanvasRenderer(this.width,this.height,this.canvas,this.transparent);this.context=this.renderer.context;}
else
{throw new Error('Phaser.Game - cannot create Canvas or WebGL context, aborting.');}}
else
{this.renderType=Phaser.WEBGL;this.renderer=new PIXI.WebGLRenderer(this.width,this.height,this.canvas,this.transparent,this.antialias);this.context=null;}
if(this.renderType!==Phaser.HEADLESS)
{this.stage.smoothed=this.antialias;Phaser.Canvas.addToDOM(this.canvas,this.parent,true);Phaser.Canvas.setTouchAction(this.canvas);}},update:function(time){this.time.update(time);if(!this._paused&&!this.pendingStep)
{if(this.stepping)
{this.pendingStep=true;}
this.debug.preUpdate();this.physics.preUpdate();this.state.preUpdate();this.plugins.preUpdate();this.stage.preUpdate();this.state.update();this.stage.update();this.tweens.update();this.sound.update();this.input.update();this.physics.update();this.particles.update();this.plugins.update();this.stage.postUpdate();this.plugins.postUpdate();}
else
{this.state.pauseUpdate();this.debug.preUpdate();}
if(this.renderType!=Phaser.HEADLESS)
{this.renderer.render(this.stage);this.plugins.render();this.state.render();this.plugins.postRender();}},enableStep:function(){this.stepping=true;this.pendingStep=false;this.stepCount=0;},disableStep:function(){this.stepping=false;this.pendingStep=false;},step:function(){this.pendingStep=false;this.stepCount++;},destroy:function(){this.raf.stop();this.input.destroy();this.state.destroy();this.physics.destroy();this.state=null;this.cache=null;this.input=null;this.load=null;this.sound=null;this.stage=null;this.time=null;this.world=null;this.isBooted=false;},gamePaused:function(event){if(!this._paused)
{this._paused=true;this.time.gamePaused();this.sound.setMute();this.onPause.dispatch(event);}},gameResumed:function(event){if(this._paused&&!this._codePaused)
{this._paused=false;this.time.gameResumed();this.input.reset();this.sound.unsetMute();this.onResume.dispatch(event);}},focusLoss:function(event){this.onBlur.dispatch(event);this.gamePaused(event);},focusGain:function(event){this.onFocus.dispatch(event);this.gameResumed(event);}};Phaser.Game.prototype.constructor=Phaser.Game;Object.defineProperty(Phaser.Game.prototype,"paused",{get:function(){return this._paused;},set:function(value){if(value===true)
{if(this._paused===false)
{this._paused=true;this._codePaused=true;this.sound.setMute();this.time.gamePaused();this.onPause.dispatch(this);}}
else
{if(this._paused)
{this._paused=false;this._codePaused=false;this.input.reset();this.sound.unsetMute();this.time.gameResumed();this.onResume.dispatch(this);}}}});Phaser.Input=function(game){this.game=game;this.hitCanvas=null;this.hitContext=null;this.moveCallback=null;this.moveCallbackContext=this;this.pollRate=0;this.disabled=false;this.multiInputOverride=Phaser.Input.MOUSE_TOUCH_COMBINE;this.position=null;this.speed=null;this.circle=null;this.scale=null;this.maxPointers=10;this.currentPointers=0;this.tapRate=200;this.doubleTapRate=300;this.holdRate=2000;this.justPressedRate=200;this.justReleasedRate=200;this.recordPointerHistory=false;this.recordRate=100;this.recordLimit=100;this.pointer1=null;this.pointer2=null;this.pointer3=null;this.pointer4=null;this.pointer5=null;this.pointer6=null;this.pointer7=null;this.pointer8=null;this.pointer9=null;this.pointer10=null;this.activePointer=null;this.mousePointer=null;this.mouse=null;this.keyboard=null;this.touch=null;this.mspointer=null;this.gamepad=null;this.resetLocked=false;this.onDown=null;this.onUp=null;this.onTap=null;this.onHold=null;this.interactiveItems=new Phaser.ArrayList();this._localPoint=new Phaser.Point();this._pollCounter=0;this._oldPosition=null;this._x=0;this._y=0;};Phaser.Input.MOUSE_OVERRIDES_TOUCH=0;Phaser.Input.TOUCH_OVERRIDES_MOUSE=1;Phaser.Input.MOUSE_TOUCH_COMBINE=2;Phaser.Input.prototype={boot:function(){this.mousePointer=new Phaser.Pointer(this.game,0);this.pointer1=new Phaser.Pointer(this.game,1);this.pointer2=new Phaser.Pointer(this.game,2);this.mouse=new Phaser.Mouse(this.game);this.keyboard=new Phaser.Keyboard(this.game);this.touch=new Phaser.Touch(this.game);this.mspointer=new Phaser.MSPointer(this.game);this.gamepad=new Phaser.Gamepad(this.game);this.onDown=new Phaser.Signal();this.onUp=new Phaser.Signal();this.onTap=new Phaser.Signal();this.onHold=new Phaser.Signal();this.scale=new Phaser.Point(1,1);this.speed=new Phaser.Point();this.position=new Phaser.Point();this._oldPosition=new Phaser.Point();this.circle=new Phaser.Circle(0,0,44);this.activePointer=this.mousePointer;this.currentPointers=0;this.hitCanvas=document.createElement('canvas');this.hitCanvas.width=1;this.hitCanvas.height=1;this.hitContext=this.hitCanvas.getContext('2d');this.mouse.start();this.keyboard.start();this.touch.start();this.mspointer.start();this.mousePointer.active=true;},destroy:function(){this.mouse.stop();this.keyboard.stop();this.touch.stop();this.mspointer.stop();this.gamepad.stop();this.moveCallback=null;},setMoveCallback:function(callback,callbackContext){this.moveCallback=callback;this.moveCallbackContext=callbackContext;},addPointer:function(){var next=0;for(var i=10;i>0;i--)
{if(this['pointer'+i]===null)
{next=i;}}
if(next===0)
{console.warn("You can only have 10 Pointer objects");return null;}
else
{this['pointer'+next]=new Phaser.Pointer(this.game,next);return this['pointer'+next];}},update:function(){this.keyboard.update();if(this.pollRate>0&&this._pollCounter<this.pollRate)
{this._pollCounter++;return;}
this.speed.x=this.position.x-this._oldPosition.x;this.speed.y=this.position.y-this._oldPosition.y;this._oldPosition.copyFrom(this.position);this.mousePointer.update();if(this.gamepad.active){this.gamepad.update();}
this.pointer1.update();this.pointer2.update();if(this.pointer3){this.pointer3.update();}
if(this.pointer4){this.pointer4.update();}
if(this.pointer5){this.pointer5.update();}
if(this.pointer6){this.pointer6.update();}
if(this.pointer7){this.pointer7.update();}
if(this.pointer8){this.pointer8.update();}
if(this.pointer9){this.pointer9.update();}
if(this.pointer10){this.pointer10.update();}
this._pollCounter=0;},reset:function(hard){if(!this.game.isBooted||this.resetLocked)
{return;}
if(typeof hard==='undefined'){hard=false;}
this.keyboard.reset(hard);this.mousePointer.reset();this.gamepad.reset();for(var i=1;i<=10;i++)
{if(this['pointer'+i])
{this['pointer'+i].reset();}}
this.currentPointers=0;if(this.game.canvas.style.cursor!=='none')
{this.game.canvas.style.cursor='inherit';}
if(hard)
{this.onDown.dispose();this.onUp.dispose();this.onTap.dispose();this.onHold.dispose();this.onDown=new Phaser.Signal();this.onUp=new Phaser.Signal();this.onTap=new Phaser.Signal();this.onHold=new Phaser.Signal();}
this._pollCounter=0;},resetSpeed:function(x,y){this._oldPosition.setTo(x,y);this.speed.setTo(0,0);},startPointer:function(event){if(this.maxPointers<10&&this.totalActivePointers==this.maxPointers)
{return null;}
if(this.pointer1.active===false)
{return this.pointer1.start(event);}
else if(this.pointer2.active===false)
{return this.pointer2.start(event);}
else
{for(var i=3;i<=10;i++)
{if(this['pointer'+i]&&this['pointer'+i].active===false)
{return this['pointer'+i].start(event);}}}
return null;},updatePointer:function(event){if(this.pointer1.active&&this.pointer1.identifier==event.identifier)
{return this.pointer1.move(event);}
else if(this.pointer2.active&&this.pointer2.identifier==event.identifier)
{return this.pointer2.move(event);}
else
{for(var i=3;i<=10;i++)
{if(this['pointer'+i]&&this['pointer'+i].active&&this['pointer'+i].identifier==event.identifier)
{return this['pointer'+i].move(event);}}}
return null;},stopPointer:function(event){if(this.pointer1.active&&this.pointer1.identifier==event.identifier)
{return this.pointer1.stop(event);}
else if(this.pointer2.active&&this.pointer2.identifier==event.identifier)
{return this.pointer2.stop(event);}
else
{for(var i=3;i<=10;i++)
{if(this['pointer'+i]&&this['pointer'+i].active&&this['pointer'+i].identifier==event.identifier)
{return this['pointer'+i].stop(event);}}}
return null;},getPointer:function(state){state=state||false;if(this.pointer1.active==state)
{return this.pointer1;}
else if(this.pointer2.active==state)
{return this.pointer2;}
else
{for(var i=3;i<=10;i++)
{if(this['pointer'+i]&&this['pointer'+i].active==state)
{return this['pointer'+i];}}}
return null;},getPointerFromIdentifier:function(identifier){if(this.pointer1.identifier==identifier)
{return this.pointer1;}
else if(this.pointer2.identifier==identifier)
{return this.pointer2;}
else
{for(var i=3;i<=10;i++)
{if(this['pointer'+i]&&this['pointer'+i].identifier==identifier)
{return this['pointer'+i];}}}
return null;},getLocalPosition:function(displayObject,pointer,output){if(typeof output==='undefined'){output=new Phaser.Point();}
var wt=displayObject.worldTransform;var id=1/(wt.a*wt.d+wt.b*-wt.c);return output.setTo(wt.d*id*pointer.x+-wt.b*id*pointer.y+(wt.ty*wt.b-wt.tx*wt.d)*id,wt.a*id*pointer.y+-wt.c*id*pointer.x+(-wt.ty*wt.a+wt.tx*wt.c)*id);},hitTest:function(displayObject,pointer,localPoint){if(!displayObject.worldVisible)
{return false;}
this.getLocalPosition(displayObject,pointer,this._localPoint);localPoint.copyFrom(this._localPoint);if(displayObject.hitArea&&displayObject.hitArea.contains)
{if(displayObject.hitArea.contains(this._localPoint.x,this._localPoint.y))
{return true;}
return false;}
else if(displayObject instanceof Phaser.TileSprite)
{var width=displayObject.width;var height=displayObject.height;var x1=-width*displayObject.anchor.x;if(this._localPoint.x>x1&&this._localPoint.x<x1+width)
{var y1=-height*displayObject.anchor.y;if(this._localPoint.y>y1&&this._localPoint.y<y1+height)
{return true;}}}
else if(displayObject instanceof PIXI.Sprite)
{var width=displayObject.texture.frame.width;var height=displayObject.texture.frame.height;var x1=-width*displayObject.anchor.x;if(this._localPoint.x>x1&&this._localPoint.x<x1+width)
{var y1=-height*displayObject.anchor.y;if(this._localPoint.y>y1&&this._localPoint.y<y1+height)
{return true;}}}
for(var i=0,len=displayObject.children.length;i<len;i++)
{if(this.hitTest(displayObject.children[i],pointer,localPoint))
{return true;}}
return false;}};Phaser.Input.prototype.constructor=Phaser.Input;Object.defineProperty(Phaser.Input.prototype,"x",{get:function(){return this._x;},set:function(value){this._x=Math.floor(value);}});Object.defineProperty(Phaser.Input.prototype,"y",{get:function(){return this._y;},set:function(value){this._y=Math.floor(value);}});Object.defineProperty(Phaser.Input.prototype,"pollLocked",{get:function(){return(this.pollRate>0&&this._pollCounter<this.pollRate);}});Object.defineProperty(Phaser.Input.prototype,"totalInactivePointers",{get:function(){return 10-this.currentPointers;}});Object.defineProperty(Phaser.Input.prototype,"totalActivePointers",{get:function(){this.currentPointers=0;for(var i=1;i<=10;i++)
{if(this['pointer'+i]&&this['pointer'+i].active)
{this.currentPointers++;}}
return this.currentPointers;}});Object.defineProperty(Phaser.Input.prototype,"worldX",{get:function(){return this.game.camera.view.x+this.x;}});Object.defineProperty(Phaser.Input.prototype,"worldY",{get:function(){return this.game.camera.view.y+this.y;}});Phaser.Key=function(game,keycode){this.game=game;this.enabled=true;this.event=null;this.isDown=false;this.isUp=true;this.altKey=false;this.ctrlKey=false;this.shiftKey=false;this.timeDown=0;this.duration=0;this.timeUp=-2500;this.repeats=0;this.keyCode=keycode;this.onDown=new Phaser.Signal();this.onHoldCallback=null;this.onHoldContext=null;this.onUp=new Phaser.Signal();};Phaser.Key.prototype={update:function(){if(!this.enabled){return;}
if(this.isDown)
{this.duration=this.game.time.now-this.timeDown;this.repeats++;if(this.onHoldCallback)
{this.onHoldCallback.call(this.onHoldContext,this);}}},processKeyDown:function(event){if(!this.enabled){return;}
this.event=event;if(this.isDown)
{return;}
this.altKey=event.altKey;this.ctrlKey=event.ctrlKey;this.shiftKey=event.shiftKey;this.isDown=true;this.isUp=false;this.timeDown=this.game.time.now;this.duration=0;this.repeats=0;this.onDown.dispatch(this);},processKeyUp:function(event){if(!this.enabled){return;}
this.event=event;if(this.isUp)
{return;}
this.isDown=false;this.isUp=true;this.timeUp=this.game.time.now;this.duration=this.game.time.now-this.timeDown;this.onUp.dispatch(this);},reset:function(hard){if(typeof hard==='undefined'){hard=true;}
this.isDown=false;this.isUp=true;this.timeUp=this.game.time.now;this.duration=this.game.time.now-this.timeDown;this.enabled=true;if(hard)
{this.onDown.removeAll();this.onUp.removeAll();this.onHoldCallback=null;this.onHoldContext=null;}},justPressed:function(duration){if(typeof duration==="undefined"){duration=2500;}
return(this.isDown&&this.duration<duration);},justReleased:function(duration){if(typeof duration==="undefined"){duration=2500;}
return(!this.isDown&&((this.game.time.now-this.timeUp)<duration));}};Phaser.Key.prototype.constructor=Phaser.Key;Phaser.Keyboard=function(game){this.game=game;this.disabled=false;this.event=null;this.callbackContext=this;this.onDownCallback=null;this.onUpCallback=null;this._keys=[];this._capture=[];this._onKeyDown=null;this._onKeyUp=null;this._i=0;};Phaser.Keyboard.prototype={addCallbacks:function(context,onDown,onUp){this.callbackContext=context;this.onDownCallback=onDown;if(typeof onUp!=='undefined')
{this.onUpCallback=onUp;}},addKey:function(keycode){if(!this._keys[keycode])
{this._keys[keycode]=new Phaser.Key(this.game,keycode);this.addKeyCapture(keycode);}
return this._keys[keycode];},removeKey:function(keycode){if(this._keys[keycode])
{this._keys[keycode]=null;this.removeKeyCapture(keycode);}},createCursorKeys:function(){return{up:this.addKey(Phaser.Keyboard.UP),down:this.addKey(Phaser.Keyboard.DOWN),left:this.addKey(Phaser.Keyboard.LEFT),right:this.addKey(Phaser.Keyboard.RIGHT)};},start:function(){if(this._onKeyDown!==null)
{return;}
var _this=this;this._onKeyDown=function(event){return _this.processKeyDown(event);};this._onKeyUp=function(event){return _this.processKeyUp(event);};window.addEventListener('keydown',this._onKeyDown,false);window.addEventListener('keyup',this._onKeyUp,false);},stop:function(){window.removeEventListener('keydown',this._onKeyDown);window.removeEventListener('keyup',this._onKeyUp);this._onKeyDown=null;this._onKeyUp=null;},destroy:function(){this.stop();this.clearCaptures();this._keys.length=0;this._i=0;},addKeyCapture:function(keycode){if(typeof keycode==='object')
{for(var key in keycode)
{this._capture[keycode[key]]=true;}}
else
{this._capture[keycode]=true;}},removeKeyCapture:function(keycode){delete this._capture[keycode];},clearCaptures:function(){this._capture={};},update:function(){this._i=this._keys.length;while(this._i--)
{if(this._keys[this._i])
{this._keys[this._i].update();}}},processKeyDown:function(event){this.event=event;if(this.game.input.disabled||this.disabled)
{return;}
if(this._capture[event.keyCode])
{event.preventDefault();}
if(this.onDownCallback)
{this.onDownCallback.call(this.callbackContext,event);}
if(!this._keys[event.keyCode])
{this._keys[event.keyCode]=new Phaser.Key(this.game,event.keyCode);}
this._keys[event.keyCode].processKeyDown(event);},processKeyUp:function(event){this.event=event;if(this.game.input.disabled||this.disabled)
{return;}
if(this._capture[event.keyCode])
{event.preventDefault();}
if(this.onUpCallback)
{this.onUpCallback.call(this.callbackContext,event);}
if(!this._keys[event.keyCode])
{this._keys[event.keyCode]=new Phaser.Key(this.game,event.keyCode);}
this._keys[event.keyCode].processKeyUp(event);},reset:function(hard){if(typeof hard==='undefined'){hard=true;}
this.event=null;var i=this._keys.length;while(i--)
{if(this._keys[i])
{this._keys[i].reset(hard);}}},justPressed:function(keycode,duration){if(this._keys[keycode])
{return this._keys[keycode].justPressed(duration);}
else
{return false;}},justReleased:function(keycode,duration){if(this._keys[keycode])
{return this._keys[keycode].justReleased(duration);}
else
{return false;}},isDown:function(keycode){if(this._keys[keycode])
{return this._keys[keycode].isDown;}
return false;}};Phaser.Keyboard.prototype.constructor=Phaser.Keyboard;Phaser.Keyboard.A="A".charCodeAt(0);Phaser.Keyboard.B="B".charCodeAt(0);Phaser.Keyboard.C="C".charCodeAt(0);Phaser.Keyboard.D="D".charCodeAt(0);Phaser.Keyboard.E="E".charCodeAt(0);Phaser.Keyboard.F="F".charCodeAt(0);Phaser.Keyboard.G="G".charCodeAt(0);Phaser.Keyboard.H="H".charCodeAt(0);Phaser.Keyboard.I="I".charCodeAt(0);Phaser.Keyboard.J="J".charCodeAt(0);Phaser.Keyboard.K="K".charCodeAt(0);Phaser.Keyboard.L="L".charCodeAt(0);Phaser.Keyboard.M="M".charCodeAt(0);Phaser.Keyboard.N="N".charCodeAt(0);Phaser.Keyboard.O="O".charCodeAt(0);Phaser.Keyboard.P="P".charCodeAt(0);Phaser.Keyboard.Q="Q".charCodeAt(0);Phaser.Keyboard.R="R".charCodeAt(0);Phaser.Keyboard.S="S".charCodeAt(0);Phaser.Keyboard.T="T".charCodeAt(0);Phaser.Keyboard.U="U".charCodeAt(0);Phaser.Keyboard.V="V".charCodeAt(0);Phaser.Keyboard.W="W".charCodeAt(0);Phaser.Keyboard.X="X".charCodeAt(0);Phaser.Keyboard.Y="Y".charCodeAt(0);Phaser.Keyboard.Z="Z".charCodeAt(0);Phaser.Keyboard.ZERO="0".charCodeAt(0);Phaser.Keyboard.ONE="1".charCodeAt(0);Phaser.Keyboard.TWO="2".charCodeAt(0);Phaser.Keyboard.THREE="3".charCodeAt(0);Phaser.Keyboard.FOUR="4".charCodeAt(0);Phaser.Keyboard.FIVE="5".charCodeAt(0);Phaser.Keyboard.SIX="6".charCodeAt(0);Phaser.Keyboard.SEVEN="7".charCodeAt(0);Phaser.Keyboard.EIGHT="8".charCodeAt(0);Phaser.Keyboard.NINE="9".charCodeAt(0);Phaser.Keyboard.NUMPAD_0=96;Phaser.Keyboard.NUMPAD_1=97;Phaser.Keyboard.NUMPAD_2=98;Phaser.Keyboard.NUMPAD_3=99;Phaser.Keyboard.NUMPAD_4=100;Phaser.Keyboard.NUMPAD_5=101;Phaser.Keyboard.NUMPAD_6=102;Phaser.Keyboard.NUMPAD_7=103;Phaser.Keyboard.NUMPAD_8=104;Phaser.Keyboard.NUMPAD_9=105;Phaser.Keyboard.NUMPAD_MULTIPLY=106;Phaser.Keyboard.NUMPAD_ADD=107;Phaser.Keyboard.NUMPAD_ENTER=108;Phaser.Keyboard.NUMPAD_SUBTRACT=109;Phaser.Keyboard.NUMPAD_DECIMAL=110;Phaser.Keyboard.NUMPAD_DIVIDE=111;Phaser.Keyboard.F1=112;Phaser.Keyboard.F2=113;Phaser.Keyboard.F3=114;Phaser.Keyboard.F4=115;Phaser.Keyboard.F5=116;Phaser.Keyboard.F6=117;Phaser.Keyboard.F7=118;Phaser.Keyboard.F8=119;Phaser.Keyboard.F9=120;Phaser.Keyboard.F10=121;Phaser.Keyboard.F11=122;Phaser.Keyboard.F12=123;Phaser.Keyboard.F13=124;Phaser.Keyboard.F14=125;Phaser.Keyboard.F15=126;Phaser.Keyboard.COLON=186;Phaser.Keyboard.EQUALS=187;Phaser.Keyboard.UNDERSCORE=189;Phaser.Keyboard.QUESTION_MARK=191;Phaser.Keyboard.TILDE=192;Phaser.Keyboard.OPEN_BRACKET=219;Phaser.Keyboard.BACKWARD_SLASH=220;Phaser.Keyboard.CLOSED_BRACKET=221;Phaser.Keyboard.QUOTES=222;Phaser.Keyboard.BACKSPACE=8;Phaser.Keyboard.TAB=9;Phaser.Keyboard.CLEAR=12;Phaser.Keyboard.ENTER=13;Phaser.Keyboard.SHIFT=16;Phaser.Keyboard.CONTROL=17;Phaser.Keyboard.ALT=18;Phaser.Keyboard.CAPS_LOCK=20;Phaser.Keyboard.ESC=27;Phaser.Keyboard.SPACEBAR=32;Phaser.Keyboard.PAGE_UP=33;Phaser.Keyboard.PAGE_DOWN=34;Phaser.Keyboard.END=35;Phaser.Keyboard.HOME=36;Phaser.Keyboard.LEFT=37;Phaser.Keyboard.UP=38;Phaser.Keyboard.RIGHT=39;Phaser.Keyboard.DOWN=40;Phaser.Keyboard.INSERT=45;Phaser.Keyboard.DELETE=46;Phaser.Keyboard.HELP=47;Phaser.Keyboard.NUM_LOCK=144;Phaser.Mouse=function(game){this.game=game;this.callbackContext=this.game;this.mouseDownCallback=null;this.mouseMoveCallback=null;this.mouseUpCallback=null;this.capture=false;this.button=-1;this.disabled=false;this.locked=false;this.pointerLock=new Phaser.Signal();this.event=null;this._onMouseDown=null;this._onMouseMove=null;this._onMouseUp=null;};Phaser.Mouse.NO_BUTTON=-1;Phaser.Mouse.LEFT_BUTTON=0;Phaser.Mouse.MIDDLE_BUTTON=1;Phaser.Mouse.RIGHT_BUTTON=2;Phaser.Mouse.prototype={start:function(){if(this.game.device.android&&this.game.device.chrome===false)
{return;}
if(this._onMouseDown!==null)
{return;}
var _this=this;this._onMouseDown=function(event){return _this.onMouseDown(event);};this._onMouseMove=function(event){return _this.onMouseMove(event);};this._onMouseUp=function(event){return _this.onMouseUp(event);};this.game.canvas.addEventListener('mousedown',this._onMouseDown,true);this.game.canvas.addEventListener('mousemove',this._onMouseMove,true);this.game.canvas.addEventListener('mouseup',this._onMouseUp,true);},onMouseDown:function(event){this.event=event;if(this.capture)
{event.preventDefault();}
this.button=event.button;if(this.mouseDownCallback)
{this.mouseDownCallback.call(this.callbackContext,event);}
if(this.game.input.disabled||this.disabled)
{return;}
event['identifier']=0;this.game.input.mousePointer.start(event);},onMouseMove:function(event){this.event=event;if(this.capture)
{event.preventDefault();}
if(this.mouseMoveCallback)
{this.mouseMoveCallback.call(this.callbackContext,event);}
if(this.game.input.disabled||this.disabled)
{return;}
event['identifier']=0;this.game.input.mousePointer.move(event);},onMouseUp:function(event){this.event=event;if(this.capture)
{event.preventDefault();}
this.button=Phaser.Mouse.NO_BUTTON;if(this.mouseUpCallback)
{this.mouseUpCallback.call(this.callbackContext,event);}
if(this.game.input.disabled||this.disabled)
{return;}
event['identifier']=0;this.game.input.mousePointer.stop(event);},requestPointerLock:function(){if(this.game.device.pointerLock)
{var element=this.game.canvas;element.requestPointerLock=element.requestPointerLock||element.mozRequestPointerLock||element.webkitRequestPointerLock;element.requestPointerLock();var _this=this;this._pointerLockChange=function(event){return _this.pointerLockChange(event);};document.addEventListener('pointerlockchange',this._pointerLockChange,true);document.addEventListener('mozpointerlockchange',this._pointerLockChange,true);document.addEventListener('webkitpointerlockchange',this._pointerLockChange,true);}},pointerLockChange:function(event){var element=this.game.canvas;if(document.pointerLockElement===element||document.mozPointerLockElement===element||document.webkitPointerLockElement===element)
{this.locked=true;this.pointerLock.dispatch(true,event);}
else
{this.locked=false;this.pointerLock.dispatch(false,event);}},releasePointerLock:function(){document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock||document.webkitExitPointerLock;document.exitPointerLock();document.removeEventListener('pointerlockchange',this._pointerLockChange,true);document.removeEventListener('mozpointerlockchange',this._pointerLockChange,true);document.removeEventListener('webkitpointerlockchange',this._pointerLockChange,true);},stop:function(){this.game.canvas.removeEventListener('mousedown',this._onMouseDown,true);this.game.canvas.removeEventListener('mousemove',this._onMouseMove,true);this.game.canvas.removeEventListener('mouseup',this._onMouseUp,true);}};Phaser.Mouse.prototype.constructor=Phaser.Mouse;Phaser.MSPointer=function(game){this.game=game;this.callbackContext=this.game;this.disabled=false;this._onMSPointerDown=null;this._onMSPointerMove=null;this._onMSPointerUp=null;};Phaser.MSPointer.prototype={start:function(){if(this._onMSPointerDown!==null)
{return;}
var _this=this;if(this.game.device.mspointer===true)
{this._onMSPointerDown=function(event){return _this.onPointerDown(event);};this._onMSPointerMove=function(event){return _this.onPointerMove(event);};this._onMSPointerUp=function(event){return _this.onPointerUp(event);};this.game.renderer.view.addEventListener('MSPointerDown',this._onMSPointerDown,false);this.game.renderer.view.addEventListener('MSPointerMove',this._onMSPointerMove,false);this.game.renderer.view.addEventListener('MSPointerUp',this._onMSPointerUp,false);this.game.renderer.view.addEventListener('pointerDown',this._onMSPointerDown,false);this.game.renderer.view.addEventListener('pointerMove',this._onMSPointerMove,false);this.game.renderer.view.addEventListener('pointerUp',this._onMSPointerUp,false);this.game.renderer.view.style['-ms-content-zooming']='none';this.game.renderer.view.style['-ms-touch-action']='none';}},onPointerDown:function(event){if(this.game.input.disabled||this.disabled)
{return;}
event.preventDefault();event.identifier=event.pointerId;this.game.input.startPointer(event);},onPointerMove:function(event){if(this.game.input.disabled||this.disabled)
{return;}
event.preventDefault();event.identifier=event.pointerId;this.game.input.updatePointer(event);},onPointerUp:function(event){if(this.game.input.disabled||this.disabled)
{return;}
event.preventDefault();event.identifier=event.pointerId;this.game.input.stopPointer(event);},stop:function(){this.game.canvas.removeEventListener('MSPointerDown',this._onMSPointerDown);this.game.canvas.removeEventListener('MSPointerMove',this._onMSPointerMove);this.game.canvas.removeEventListener('MSPointerUp',this._onMSPointerUp);this.game.canvas.removeEventListener('pointerDown',this._onMSPointerDown);this.game.canvas.removeEventListener('pointerMove',this._onMSPointerMove);this.game.canvas.removeEventListener('pointerUp',this._onMSPointerUp);}};Phaser.MSPointer.prototype.constructor=Phaser.MSPointer;Phaser.Pointer=function(game,id){this.game=game;this.id=id;this._holdSent=false;this._history=[];this._nextDrop=0;this._stateReset=false;this.withinGame=false;this.clientX=-1;this.clientY=-1;this.pageX=-1;this.pageY=-1;this.screenX=-1;this.screenY=-1;this.x=-1;this.y=-1;this.isMouse=false;this.isDown=false;this.isUp=true;this.timeDown=0;this.timeUp=0;this.previousTapTime=0;this.totalTouches=0;this.msSinceLastClick=Number.MAX_VALUE;this.targetObject=null;this.active=false;this.position=new Phaser.Point();this.positionDown=new Phaser.Point();this.positionUp=new Phaser.Point();this.circle=new Phaser.Circle(0,0,44);if(id===0)
{this.isMouse=true;}};Phaser.Pointer.prototype={start:function(event){this.identifier=event.identifier;this.target=event.target;if(typeof event.button!=='undefined')
{this.button=event.button;}
this._history=[];this.active=true;this.withinGame=true;this.isDown=true;this.isUp=false;this.msSinceLastClick=this.game.time.now-this.timeDown;this.timeDown=this.game.time.now;this._holdSent=false;this.move(event,true);this.positionDown.setTo(this.x,this.y);if(this.game.input.multiInputOverride===Phaser.Input.MOUSE_OVERRIDES_TOUCH||this.game.input.multiInputOverride===Phaser.Input.MOUSE_TOUCH_COMBINE||(this.game.input.multiInputOverride===Phaser.Input.TOUCH_OVERRIDES_MOUSE&&this.game.input.currentPointers===0))
{this.game.input.x=this.x;this.game.input.y=this.y;this.game.input.position.setTo(this.x,this.y);this.game.input.onDown.dispatch(this,event);this.game.input.resetSpeed(this.x,this.y);}
this._stateReset=false;this.totalTouches++;if(!this.isMouse)
{this.game.input.currentPointers++;}
if(this.targetObject!==null)
{this.targetObject._touchedHandler(this);}
return this;},update:function(){if(this.active)
{if(this._holdSent===false&&this.duration>=this.game.input.holdRate)
{if(this.game.input.multiInputOverride==Phaser.Input.MOUSE_OVERRIDES_TOUCH||this.game.input.multiInputOverride==Phaser.Input.MOUSE_TOUCH_COMBINE||(this.game.input.multiInputOverride==Phaser.Input.TOUCH_OVERRIDES_MOUSE&&this.game.input.currentPointers===0))
{this.game.input.onHold.dispatch(this);}
this._holdSent=true;}
if(this.game.input.recordPointerHistory&&this.game.time.now>=this._nextDrop)
{this._nextDrop=this.game.time.now+this.game.input.recordRate;this._history.push({x:this.position.x,y:this.position.y});if(this._history.length>this.game.input.recordLimit)
{this._history.shift();}}}},move:function(event,fromClick){if(this.game.input.pollLocked)
{return;}
if(typeof fromClick==='undefined'){fromClick=false;}
if(typeof event.button!=='undefined')
{this.button=event.button;}
this.clientX=event.clientX;this.clientY=event.clientY;this.pageX=event.pageX;this.pageY=event.pageY;this.screenX=event.screenX;this.screenY=event.screenY;this.x=(this.pageX-this.game.stage.offset.x)*this.game.input.scale.x;this.y=(this.pageY-this.game.stage.offset.y)*this.game.input.scale.y;this.position.setTo(this.x,this.y);this.circle.x=this.x;this.circle.y=this.y;if(this.game.input.multiInputOverride==Phaser.Input.MOUSE_OVERRIDES_TOUCH||this.game.input.multiInputOverride==Phaser.Input.MOUSE_TOUCH_COMBINE||(this.game.input.multiInputOverride==Phaser.Input.TOUCH_OVERRIDES_MOUSE&&this.game.input.currentPointers===0))
{this.game.input.activePointer=this;this.game.input.x=this.x;this.game.input.y=this.y;this.game.input.position.setTo(this.game.input.x,this.game.input.y);this.game.input.circle.x=this.game.input.x;this.game.input.circle.y=this.game.input.y;}
if(this.game.paused)
{return this;}
if(this.game.input.moveCallback)
{this.game.input.moveCallback.call(this.game.input.moveCallbackContext,this,this.x,this.y);}
if(this.targetObject!==null&&this.targetObject.isDragged===true)
{if(this.targetObject.update(this)===false)
{this.targetObject=null;}
return this;}
this._highestRenderOrderID=Number.MAX_SAFE_INTEGER;this._highestRenderObject=null;this._highestInputPriorityID=-1;if(this.game.input.interactiveItems.total>0)
{var currentNode=this.game.input.interactiveItems.first;do
{if(currentNode&&currentNode.validForInput(this._highestInputPriorityID,this._highestRenderOrderID))
{if((!fromClick&&currentNode.checkPointerOver(this))||(fromClick&&currentNode.checkPointerDown(this)))
{this._highestRenderOrderID=currentNode.sprite._cache[3];this._highestInputPriorityID=currentNode.priorityID;this._highestRenderObject=currentNode;}}
currentNode=this.game.input.interactiveItems.next;}
while(currentNode!==null);}
if(this._highestRenderObject===null)
{if(this.targetObject)
{this.targetObject._pointerOutHandler(this);this.targetObject=null;}}
else
{if(this.targetObject===null)
{this.targetObject=this._highestRenderObject;this._highestRenderObject._pointerOverHandler(this);}
else
{if(this.targetObject===this._highestRenderObject)
{if(this._highestRenderObject.update(this)===false)
{this.targetObject=null;}}
else
{this.targetObject._pointerOutHandler(this);this.targetObject=this._highestRenderObject;this.targetObject._pointerOverHandler(this);}}}
return this;},leave:function(event){this.withinGame=false;this.move(event,false);},stop:function(event){if(this._stateReset)
{event.preventDefault();return;}
this.timeUp=this.game.time.now;if(this.game.input.multiInputOverride==Phaser.Input.MOUSE_OVERRIDES_TOUCH||this.game.input.multiInputOverride==Phaser.Input.MOUSE_TOUCH_COMBINE||(this.game.input.multiInputOverride==Phaser.Input.TOUCH_OVERRIDES_MOUSE&&this.game.input.currentPointers===0))
{this.game.input.onUp.dispatch(this,event);if(this.duration>=0&&this.duration<=this.game.input.tapRate)
{if(this.timeUp-this.previousTapTime<this.game.input.doubleTapRate)
{this.game.input.onTap.dispatch(this,true);}
else
{this.game.input.onTap.dispatch(this,false);}
this.previousTapTime=this.timeUp;}}
if(this.id>0)
{this.active=false;}
this.withinGame=false;this.isDown=false;this.isUp=true;this.positionUp.setTo(this.x,this.y);if(this.isMouse===false)
{this.game.input.currentPointers--;}
this.game.input.interactiveItems.callAll('_releasedHandler',this);this.targetObject=null;return this;},justPressed:function(duration){duration=duration||this.game.input.justPressedRate;return(this.isDown===true&&(this.timeDown+duration)>this.game.time.now);},justReleased:function(duration){duration=duration||this.game.input.justReleasedRate;return(this.isUp===true&&(this.timeUp+duration)>this.game.time.now);},reset:function(){if(this.isMouse===false)
{this.active=false;}
this.identifier=null;this.isDown=false;this.isUp=true;this.totalTouches=0;this._holdSent=false;this._history.length=0;this._stateReset=true;if(this.targetObject)
{this.targetObject._releasedHandler(this);}
this.targetObject=null;}};Phaser.Pointer.prototype.constructor=Phaser.Pointer;Object.defineProperty(Phaser.Pointer.prototype,"duration",{get:function(){if(this.isUp)
{return-1;}
return this.game.time.now-this.timeDown;}});Object.defineProperty(Phaser.Pointer.prototype,"worldX",{get:function(){return this.game.world.camera.x+this.x;}});Object.defineProperty(Phaser.Pointer.prototype,"worldY",{get:function(){return this.game.world.camera.y+this.y;}});Phaser.Touch=function(game){this.game=game;this.disabled=false;this.callbackContext=this.game;this.touchStartCallback=null;this.touchMoveCallback=null;this.touchEndCallback=null;this.touchEnterCallback=null;this.touchLeaveCallback=null;this.touchCancelCallback=null;this.preventDefault=true;this.event=null;this._onTouchStart=null;this._onTouchMove=null;this._onTouchEnd=null;this._onTouchEnter=null;this._onTouchLeave=null;this._onTouchCancel=null;this._onTouchMove=null;};Phaser.Touch.prototype={start:function(){if(this._onTouchStart!==null)
{return;}
var _this=this;if(this.game.device.touch)
{this._onTouchStart=function(event){return _this.onTouchStart(event);};this._onTouchMove=function(event){return _this.onTouchMove(event);};this._onTouchEnd=function(event){return _this.onTouchEnd(event);};this._onTouchEnter=function(event){return _this.onTouchEnter(event);};this._onTouchLeave=function(event){return _this.onTouchLeave(event);};this._onTouchCancel=function(event){return _this.onTouchCancel(event);};this.game.canvas.addEventListener('touchstart',this._onTouchStart,false);this.game.canvas.addEventListener('touchmove',this._onTouchMove,false);this.game.canvas.addEventListener('touchend',this._onTouchEnd,false);this.game.canvas.addEventListener('touchenter',this._onTouchEnter,false);this.game.canvas.addEventListener('touchleave',this._onTouchLeave,false);this.game.canvas.addEventListener('touchcancel',this._onTouchCancel,false);}},consumeDocumentTouches:function(){this._documentTouchMove=function(event){event.preventDefault();};document.addEventListener('touchmove',this._documentTouchMove,false);},onTouchStart:function(event){this.event=event;if(this.touchStartCallback)
{this.touchStartCallback.call(this.callbackContext,event);}
if(this.game.input.disabled||this.disabled)
{return;}
if(this.preventDefault)
{event.preventDefault();}
for(var i=0;i<event.changedTouches.length;i++)
{this.game.input.startPointer(event.changedTouches[i]);}},onTouchCancel:function(event){this.event=event;if(this.touchCancelCallback)
{this.touchCancelCallback.call(this.callbackContext,event);}
if(this.game.input.disabled||this.disabled)
{return;}
if(this.preventDefault)
{event.preventDefault();}
for(var i=0;i<event.changedTouches.length;i++)
{this.game.input.stopPointer(event.changedTouches[i]);}},onTouchEnter:function(event){this.event=event;if(this.touchEnterCallback)
{this.touchEnterCallback.call(this.callbackContext,event);}
if(this.game.input.disabled||this.disabled)
{return;}
if(this.preventDefault)
{event.preventDefault();}},onTouchLeave:function(event){this.event=event;if(this.touchLeaveCallback)
{this.touchLeaveCallback.call(this.callbackContext,event);}
if(this.preventDefault)
{event.preventDefault();}},onTouchMove:function(event){this.event=event;if(this.touchMoveCallback)
{this.touchMoveCallback.call(this.callbackContext,event);}
if(this.preventDefault)
{event.preventDefault();}
for(var i=0;i<event.changedTouches.length;i++)
{this.game.input.updatePointer(event.changedTouches[i]);}},onTouchEnd:function(event){this.event=event;if(this.touchEndCallback)
{this.touchEndCallback.call(this.callbackContext,event);}
if(this.preventDefault)
{event.preventDefault();}
for(var i=0;i<event.changedTouches.length;i++)
{this.game.input.stopPointer(event.changedTouches[i]);}},stop:function(){if(this.game.device.touch)
{this.game.canvas.removeEventListener('touchstart',this._onTouchStart);this.game.canvas.removeEventListener('touchmove',this._onTouchMove);this.game.canvas.removeEventListener('touchend',this._onTouchEnd);this.game.canvas.removeEventListener('touchenter',this._onTouchEnter);this.game.canvas.removeEventListener('touchleave',this._onTouchLeave);this.game.canvas.removeEventListener('touchcancel',this._onTouchCancel);}}};Phaser.Touch.prototype.constructor=Phaser.Touch;Phaser.Gamepad=function(game){this.game=game;this._gamepads=[new Phaser.SinglePad(game,this),new Phaser.SinglePad(game,this),new Phaser.SinglePad(game,this),new Phaser.SinglePad(game,this)];this._gamepadIndexMap={};this._rawPads=[];this._active=false;this.disabled=false;this._gamepadSupportAvailable=!!navigator.webkitGetGamepads||!!navigator.webkitGamepads||(navigator.userAgent.indexOf('Firefox/')!=-1)||!!navigator.getGamepads;this._prevRawGamepadTypes=[];this._prevTimestamps=[];this.callbackContext=this;this.onConnectCallback=null;this.onDisconnectCallback=null;this.onDownCallback=null;this.onUpCallback=null;this.onAxisCallback=null;this.onFloatCallback=null;this._ongamepadconnected=null;this._gamepaddisconnected=null;};Phaser.Gamepad.prototype={addCallbacks:function(context,callbacks){if(typeof callbacks!=='undefined')
{this.onConnectCallback=(typeof callbacks.onConnect==='function')?callbacks.onConnect:this.onConnectCallback;this.onDisconnectCallback=(typeof callbacks.onDisconnect==='function')?callbacks.onDisconnect:this.onDisconnectCallback;this.onDownCallback=(typeof callbacks.onDown==='function')?callbacks.onDown:this.onDownCallback;this.onUpCallback=(typeof callbacks.onUp==='function')?callbacks.onUp:this.onUpCallback;this.onAxisCallback=(typeof callbacks.onAxis==='function')?callbacks.onAxis:this.onAxisCallback;this.onFloatCallback=(typeof callbacks.onFloat==='function')?callbacks.onFloat:this.onFloatCallback;}},start:function(){if(this._active)
{return;}
this._active=true;var _this=this;this._ongamepadconnected=function(event){var newPad=event.gamepad;_this._rawPads.push(newPad);_this._gamepads[newPad.index].connect(newPad);};window.addEventListener('gamepadconnected',this._ongamepadconnected,false);this._ongamepaddisconnected=function(event){var removedPad=event.gamepad;for(var i in _this._rawPads)
{if(_this._rawPads[i].index===removedPad.index)
{_this._rawPads.splice(i,1);}}
_this._gamepads[removedPad.index].disconnect();};window.addEventListener('gamepaddisconnected',this._ongamepaddisconnected,false);},update:function(){this._pollGamepads();for(var i=0;i<this._gamepads.length;i++)
{if(this._gamepads[i]._connected)
{this._gamepads[i].pollStatus();}}},_pollGamepads:function(){var rawGamepads=navigator.getGamepads||(navigator.webkitGetGamepads&&navigator.webkitGetGamepads())||navigator.webkitGamepads;if(rawGamepads)
{this._rawPads=[];var gamepadsChanged=false;for(var i=0;i<rawGamepads.length;i++)
{if(typeof rawGamepads[i]!==this._prevRawGamepadTypes[i])
{gamepadsChanged=true;this._prevRawGamepadTypes[i]=typeof rawGamepads[i];}
if(rawGamepads[i])
{this._rawPads.push(rawGamepads[i]);}
if(i===3)
{break;}}
if(gamepadsChanged)
{var validConnections={rawIndices:{},padIndices:{}};var singlePad;for(var j=0;j<this._gamepads.length;j++)
{singlePad=this._gamepads[j];if(singlePad.connected)
{for(var k=0;k<this._rawPads.length;k++)
{if(this._rawPads[k].index===singlePad.index)
{validConnections.rawIndices[singlePad.index]=true;validConnections.padIndices[j]=true;}}}}
for(var l=0;l<this._gamepads.length;l++)
{singlePad=this._gamepads[l];if(validConnections.padIndices[l])
{continue;}
if(this._rawPads.length<1)
{singlePad.disconnect();}
for(var m=0;m<this._rawPads.length;m++)
{if(validConnections.padIndices[l])
{break;}
var rawPad=this._rawPads[m];if(rawPad)
{if(validConnections.rawIndices[rawPad.index])
{singlePad.disconnect();continue;}
else
{singlePad.connect(rawPad);validConnections.rawIndices[rawPad.index]=true;validConnections.padIndices[l]=true;}}
else
{singlePad.disconnect();}}}}}},setDeadZones:function(value){for(var i=0;i<this._gamepads.length;i++)
{this._gamepads[i].deadZone=value;}},stop:function(){this._active=false;window.removeEventListener('gamepadconnected',this._ongamepadconnected);window.removeEventListener('gamepaddisconnected',this._ongamepaddisconnected);},reset:function(){this.update();for(var i=0;i<this._gamepads.length;i++)
{this._gamepads[i].reset();}},justPressed:function(buttonCode,duration){for(var i=0;i<this._gamepads.length;i++)
{if(this._gamepads[i].justPressed(buttonCode,duration)===true)
{return true;}}
return false;},justReleased:function(buttonCode,duration){for(var i=0;i<this._gamepads.length;i++)
{if(this._gamepads[i].justReleased(buttonCode,duration)===true)
{return true;}}
return false;},isDown:function(buttonCode){for(var i=0;i<this._gamepads.length;i++)
{if(this._gamepads[i].isDown(buttonCode)===true)
{return true;}}
return false;}};Phaser.Gamepad.prototype.constructor=Phaser.Gamepad;Object.defineProperty(Phaser.Gamepad.prototype,"active",{get:function(){return this._active;}});Object.defineProperty(Phaser.Gamepad.prototype,"supported",{get:function(){return this._gamepadSupportAvailable;}});Object.defineProperty(Phaser.Gamepad.prototype,"padsConnected",{get:function(){return this._rawPads.length;}});Object.defineProperty(Phaser.Gamepad.prototype,"pad1",{get:function(){return this._gamepads[0];}});Object.defineProperty(Phaser.Gamepad.prototype,"pad2",{get:function(){return this._gamepads[1];}});Object.defineProperty(Phaser.Gamepad.prototype,"pad3",{get:function(){return this._gamepads[2];}});Object.defineProperty(Phaser.Gamepad.prototype,"pad4",{get:function(){return this._gamepads[3];}});Phaser.Gamepad.BUTTON_0=0;Phaser.Gamepad.BUTTON_1=1;Phaser.Gamepad.BUTTON_2=2;Phaser.Gamepad.BUTTON_3=3;Phaser.Gamepad.BUTTON_4=4;Phaser.Gamepad.BUTTON_5=5;Phaser.Gamepad.BUTTON_6=6;Phaser.Gamepad.BUTTON_7=7;Phaser.Gamepad.BUTTON_8=8;Phaser.Gamepad.BUTTON_9=9;Phaser.Gamepad.BUTTON_10=10;Phaser.Gamepad.BUTTON_11=11;Phaser.Gamepad.BUTTON_12=12;Phaser.Gamepad.BUTTON_13=13;Phaser.Gamepad.BUTTON_14=14;Phaser.Gamepad.BUTTON_15=15;Phaser.Gamepad.AXIS_0=0;Phaser.Gamepad.AXIS_1=1;Phaser.Gamepad.AXIS_2=2;Phaser.Gamepad.AXIS_3=3;Phaser.Gamepad.AXIS_4=4;Phaser.Gamepad.AXIS_5=5;Phaser.Gamepad.AXIS_6=6;Phaser.Gamepad.AXIS_7=7;Phaser.Gamepad.AXIS_8=8;Phaser.Gamepad.AXIS_9=9;Phaser.Gamepad.XBOX360_A=0;Phaser.Gamepad.XBOX360_B=1;Phaser.Gamepad.XBOX360_X=2;Phaser.Gamepad.XBOX360_Y=3;Phaser.Gamepad.XBOX360_LEFT_BUMPER=4;Phaser.Gamepad.XBOX360_RIGHT_BUMPER=5;Phaser.Gamepad.XBOX360_LEFT_TRIGGER=6;Phaser.Gamepad.XBOX360_RIGHT_TRIGGER=7;Phaser.Gamepad.XBOX360_BACK=8;Phaser.Gamepad.XBOX360_START=9;Phaser.Gamepad.XBOX360_STICK_LEFT_BUTTON=10;Phaser.Gamepad.XBOX360_STICK_RIGHT_BUTTON=11;Phaser.Gamepad.XBOX360_DPAD_LEFT=14;Phaser.Gamepad.XBOX360_DPAD_RIGHT=15;Phaser.Gamepad.XBOX360_DPAD_UP=12;Phaser.Gamepad.XBOX360_DPAD_DOWN=13;Phaser.Gamepad.XBOX360_STICK_LEFT_X=0;Phaser.Gamepad.XBOX360_STICK_LEFT_Y=1;Phaser.Gamepad.XBOX360_STICK_RIGHT_X=2;Phaser.Gamepad.XBOX360_STICK_RIGHT_Y=3;Phaser.SinglePad=function(game,padParent){this.game=game;this._padParent=padParent;this._index=null;this._rawPad=null;this._connected=false;this._prevTimestamp=null;this._rawButtons=[];this._buttons=[];this._axes=[];this._hotkeys=[];this.callbackContext=this;this.onConnectCallback=null;this.onDisconnectCallback=null;this.onDownCallback=null;this.onUpCallback=null;this.onAxisCallback=null;this.onFloatCallback=null;this.deadZone=0.26;};Phaser.SinglePad.prototype={addCallbacks:function(context,callbacks){if(typeof callbacks!=='undefined')
{this.onConnectCallback=(typeof callbacks.onConnect==='function')?callbacks.onConnect:this.onConnectCallback;this.onDisconnectCallback=(typeof callbacks.onDisconnect==='function')?callbacks.onDisconnect:this.onDisconnectCallback;this.onDownCallback=(typeof callbacks.onDown==='function')?callbacks.onDown:this.onDownCallback;this.onUpCallback=(typeof callbacks.onUp==='function')?callbacks.onUp:this.onUpCallback;this.onAxisCallback=(typeof callbacks.onAxis==='function')?callbacks.onAxis:this.onAxisCallback;this.onFloatCallback=(typeof callbacks.onFloat==='function')?callbacks.onFloat:this.onFloatCallback;}},addButton:function(buttonCode){this._hotkeys[buttonCode]=new Phaser.GamepadButton(this.game,buttonCode);return this._hotkeys[buttonCode];},pollStatus:function(){if(this._rawPad.timestamp&&(this._rawPad.timestamp==this._prevTimestamp))
{return;}
for(var i=0;i<this._rawPad.buttons.length;i+=1)
{var buttonValue=this._rawPad.buttons[i];if(this._rawButtons[i]!==buttonValue)
{if(buttonValue===1)
{this.processButtonDown(i,buttonValue);}
else if(buttonValue===0)
{this.processButtonUp(i,buttonValue);}
else
{this.processButtonFloat(i,buttonValue);}
this._rawButtons[i]=buttonValue;}}
var axes=this._rawPad.axes;for(var j=0;j<axes.length;j+=1)
{var axis=axes[j];if(axis>0&&axis>this.deadZone||axis<0&&axis<-this.deadZone)
{this.processAxisChange({axis:j,value:axis});}
else
{this.processAxisChange({axis:j,value:0});}}
this._prevTimestamp=this._rawPad.timestamp;},connect:function(rawPad){var triggerCallback=!this._connected;this._index=rawPad.index;this._connected=true;this._rawPad=rawPad;this._rawButtons=rawPad.buttons;this._axes=rawPad.axes;if(triggerCallback&&this._padParent.onConnectCallback)
{this._padParent.onConnectCallback.call(this._padParent.callbackContext,this._index);}
if(triggerCallback&&this.onConnectCallback)
{this.onConnectCallback.call(this.callbackContext);}},disconnect:function(){var triggerCallback=this._connected;this._connected=false;this._rawPad=undefined;this._rawButtons=[];this._buttons=[];var disconnectingIndex=this._index;this._index=null;if(triggerCallback&&this._padParent.onDisconnectCallback)
{this._padParent.onDisconnectCallback.call(this._padParent.callbackContext,disconnectingIndex);}
if(triggerCallback&&this.onDisconnectCallback)
{this.onDisconnectCallback.call(this.callbackContext);}},processAxisChange:function(axisState){if(this.game.input.disabled||this.game.input.gamepad.disabled)
{return;}
if(this._axes[axisState.axis]===axisState.value)
{return;}
this._axes[axisState.axis]=axisState.value;if(this._padParent.onAxisCallback)
{this._padParent.onAxisCallback.call(this._padParent.callbackContext,axisState,this._index);}
if(this.onAxisCallback)
{this.onAxisCallback.call(this.callbackContext,axisState);}},processButtonDown:function(buttonCode,value){if(this.game.input.disabled||this.game.input.gamepad.disabled)
{return;}
if(this._padParent.onDownCallback)
{this._padParent.onDownCallback.call(this._padParent.callbackContext,buttonCode,value,this._index);}
if(this.onDownCallback)
{this.onDownCallback.call(this.callbackContext,buttonCode,value);}
if(this._buttons[buttonCode]&&this._buttons[buttonCode].isDown)
{this._buttons[buttonCode].duration=this.game.time.now-this._buttons[buttonCode].timeDown;}
else
{if(!this._buttons[buttonCode])
{this._buttons[buttonCode]={isDown:true,timeDown:this.game.time.now,timeUp:0,duration:0,value:value};}
else
{this._buttons[buttonCode].isDown=true;this._buttons[buttonCode].timeDown=this.game.time.now;this._buttons[buttonCode].duration=0;this._buttons[buttonCode].value=value;}}
if(this._hotkeys[buttonCode])
{this._hotkeys[buttonCode].processButtonDown(value);}},processButtonUp:function(buttonCode,value){if(this.game.input.disabled||this.game.input.gamepad.disabled)
{return;}
if(this._padParent.onUpCallback)
{this._padParent.onUpCallback.call(this._padParent.callbackContext,buttonCode,value,this._index);}
if(this.onUpCallback)
{this.onUpCallback.call(this.callbackContext,buttonCode,value);}
if(this._hotkeys[buttonCode])
{this._hotkeys[buttonCode].processButtonUp(value);}
if(this._buttons[buttonCode])
{this._buttons[buttonCode].isDown=false;this._buttons[buttonCode].timeUp=this.game.time.now;this._buttons[buttonCode].value=value;}
else
{this._buttons[buttonCode]={isDown:false,timeDown:this.game.time.now,timeUp:this.game.time.now,duration:0,value:value};}},processButtonFloat:function(buttonCode,value){if(this.game.input.disabled||this.game.input.gamepad.disabled)
{return;}
if(this._padParent.onFloatCallback)
{this._padParent.onFloatCallback.call(this._padParent.callbackContext,buttonCode,value,this._index);}
if(this.onFloatCallback)
{this.onFloatCallback.call(this.callbackContext,buttonCode,value);}
if(!this._buttons[buttonCode])
{this._buttons[buttonCode]={value:value};}
else
{this._buttons[buttonCode].value=value;}
if(this._hotkeys[buttonCode])
{this._hotkeys[buttonCode].processButtonFloat(value);}},axis:function(axisCode){if(this._axes[axisCode])
{return this._axes[axisCode];}
return false;},isDown:function(buttonCode){if(this._buttons[buttonCode])
{return this._buttons[buttonCode].isDown;}
return false;},justReleased:function(buttonCode,duration){if(typeof duration==="undefined"){duration=250;}
return(this._buttons[buttonCode]&&this._buttons[buttonCode].isDown===false&&(this.game.time.now-this._buttons[buttonCode].timeUp<duration));},justPressed:function(buttonCode,duration){if(typeof duration==="undefined"){duration=250;}
return(this._buttons[buttonCode]&&this._buttons[buttonCode].isDown&&this._buttons[buttonCode].duration<duration);},buttonValue:function(buttonCode){if(this._buttons[buttonCode])
{return this._buttons[buttonCode].value;}
return false;},reset:function(){for(var i=0;i<this._buttons.length;i++)
{this._buttons[i]=0;}
for(var j=0;j<this._axes.length;j++)
{this._axes[j]=0;}}};Phaser.SinglePad.prototype.constructor=Phaser.SinglePad;Object.defineProperty(Phaser.SinglePad.prototype,"connected",{get:function(){return this._connected;}});Object.defineProperty(Phaser.SinglePad.prototype,"index",{get:function(){return this._index;}});Phaser.GamepadButton=function(game,buttoncode){this.game=game;this.isDown=false;this.isUp=true;this.timeDown=0;this.duration=0;this.timeUp=0;this.repeats=0;this.value=0;this.buttonCode=buttoncode;this.onDown=new Phaser.Signal();this.onUp=new Phaser.Signal();this.onFloat=new Phaser.Signal();};Phaser.GamepadButton.prototype={processButtonDown:function(value){if(this.isDown)
{this.duration=this.game.time.now-this.timeDown;this.repeats++;}
else
{this.isDown=true;this.isUp=false;this.timeDown=this.game.time.now;this.duration=0;this.repeats=0;this.value=value;this.onDown.dispatch(this,value);}},processButtonUp:function(value){this.isDown=false;this.isUp=true;this.timeUp=this.game.time.now;this.value=value;this.onUp.dispatch(this,value);},processButtonFloat:function(value){this.value=value;this.onFloat.dispatch(this,value);},justPressed:function(duration){if(typeof duration==="undefined"){duration=250;}
return(this.isDown&&this.duration<duration);},justReleased:function(duration){if(typeof duration==="undefined"){duration=250;}
return(this.isDown===false&&(this.game.time.now-this.timeUp<duration));}};Phaser.GamepadButton.prototype.constructor=Phaser.GamepadButton;Phaser.InputHandler=function(sprite){this.sprite=sprite;this.game=sprite.game;this.enabled=false;this.priorityID=0;this.useHandCursor=false;this._setHandCursor=false;this.isDragged=false;this.allowHorizontalDrag=true;this.allowVerticalDrag=true;this.bringToTop=false;this.snapOffset=null;this.snapOnDrag=false;this.snapOnRelease=false;this.snapX=0;this.snapY=0;this.snapOffsetX=0;this.snapOffsetY=0;this.pixelPerfectOver=false;this.pixelPerfectClick=false;this.pixelPerfectAlpha=255;this.draggable=false;this.boundsRect=null;this.boundsSprite=null;this.consumePointerEvent=false;this._wasEnabled=false;this._tempPoint=new Phaser.Point();this._pointerData=[];this._pointerData.push({id:0,x:0,y:0,isDown:false,isUp:false,isOver:false,isOut:false,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:false});};Phaser.InputHandler.prototype={start:function(priority,useHandCursor){priority=priority||0;if(typeof useHandCursor==='undefined'){useHandCursor=false;}
if(this.enabled===false)
{this.game.input.interactiveItems.add(this);this.useHandCursor=useHandCursor;this.priorityID=priority;for(var i=0;i<10;i++)
{this._pointerData[i]={id:i,x:0,y:0,isDown:false,isUp:false,isOver:false,isOut:false,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:false};}
this.snapOffset=new Phaser.Point();this.enabled=true;this._wasEnabled=true;if(this.sprite.events&&this.sprite.events.onInputOver===null)
{this.sprite.events.onInputOver=new Phaser.Signal();this.sprite.events.onInputOut=new Phaser.Signal();this.sprite.events.onInputDown=new Phaser.Signal();this.sprite.events.onInputUp=new Phaser.Signal();this.sprite.events.onDragStart=new Phaser.Signal();this.sprite.events.onDragStop=new Phaser.Signal();}}
this.sprite.events.onAddedToGroup.add(this.addedToGroup,this);this.sprite.events.onRemovedFromGroup.add(this.removedFromGroup,this);return this.sprite;},addedToGroup:function(){if(this._wasEnabled&&!this.enabled)
{this.start();}},removedFromGroup:function(){if(this.enabled)
{this._wasEnabled=true;this.stop();}
else
{this._wasEnabled=false;}},reset:function(){this.enabled=false;for(var i=0;i<10;i++)
{this._pointerData[i]={id:i,x:0,y:0,isDown:false,isUp:false,isOver:false,isOut:false,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:false};}},stop:function(){if(this.enabled===false)
{return;}
else
{this.enabled=false;this.game.input.interactiveItems.remove(this);}},destroy:function(){if(this.sprite)
{if(this._setHandCursor)
{this.game.canvas.style.cursor="default";this._setHandCursor=false;}
this.enabled=false;this.game.input.interactiveItems.remove(this);this._pointerData.length=0;this.boundsRect=null;this.boundsSprite=null;this.sprite=null;}},validForInput:function(highestID,highestRenderID){if(this.sprite.scale.x===0||this.sprite.scale.y===0)
{return false;}
if(this.pixelPerfectClick||this.pixelPerfectOver)
{return true;}
if(this.priorityID>highestID||(this.priorityID===highestID&&this.sprite._cache[3]<highestRenderID))
{return true;}
return false;},pointerX:function(pointer){pointer=pointer||0;return this._pointerData[pointer].x;},pointerY:function(pointer){pointer=pointer||0;return this._pointerData[pointer].y;},pointerDown:function(pointer){pointer=pointer||0;return this._pointerData[pointer].isDown;},pointerUp:function(pointer){pointer=pointer||0;return this._pointerData[pointer].isUp;},pointerTimeDown:function(pointer){pointer=pointer||0;return this._pointerData[pointer].timeDown;},pointerTimeUp:function(pointer){pointer=pointer||0;return this._pointerData[pointer].timeUp;},pointerOver:function(index){if(this.enabled)
{if(typeof index==='undefined')
{for(var i=0;i<10;i++)
{if(this._pointerData[i].isOver)
{return true;}}}
else
{return this._pointerData[index].isOver;}}
return false;},pointerOut:function(index){if(this.enabled)
{if(typeof index==='undefined')
{for(var i=0;i<10;i++)
{if(this._pointerData[i].isOut)
{return true;}}}
else
{return this._pointerData[index].isOut;}}
return false;},pointerTimeOver:function(pointer){pointer=pointer||0;return this._pointerData[pointer].timeOver;},pointerTimeOut:function(pointer){pointer=pointer||0;return this._pointerData[pointer].timeOut;},pointerDragged:function(pointer){pointer=pointer||0;return this._pointerData[pointer].isDragged;},checkPointerDown:function(pointer){if(!this.enabled||!this.sprite||!this.sprite.parent||!this.sprite.visible||!this.sprite.parent.visible)
{return false;}
if(this.game.input.hitTest(this.sprite,pointer,this._tempPoint))
{if(this.pixelPerfectClick)
{return this.checkPixel(this._tempPoint.x,this._tempPoint.y);}
else
{return true;}}
return false;},checkPointerOver:function(pointer){if(!this.enabled||!this.sprite||!this.sprite.parent||!this.sprite.visible||!this.sprite.parent.visible)
{return false;}
if(this.game.input.hitTest(this.sprite,pointer,this._tempPoint))
{if(this.pixelPerfectOver)
{return this.checkPixel(this._tempPoint.x,this._tempPoint.y);}
else
{return true;}}
return false;},checkPixel:function(x,y,pointer){if(this.sprite.texture.baseTexture.source)
{this.game.input.hitContext.clearRect(0,0,1,1);if(x===null&&y===null)
{this.game.input.getLocalPosition(this.sprite,pointer,this._tempPoint);var x=this._tempPoint.x;var y=this._tempPoint.y;}
if(this.sprite.anchor.x!==0)
{x-=-this.sprite.texture.frame.width*this.sprite.anchor.x;}
if(this.sprite.anchor.y!==0)
{y-=-this.sprite.texture.frame.height*this.sprite.anchor.y;}
x+=this.sprite.texture.frame.x;y+=this.sprite.texture.frame.y;this.game.input.hitContext.drawImage(this.sprite.texture.baseTexture.source,x,y,1,1,0,0,1,1);var rgb=this.game.input.hitContext.getImageData(0,0,1,1);if(rgb.data[3]>=this.pixelPerfectAlpha)
{return true;}}
return false;},update:function(pointer){if(this.sprite===null||this.sprite.parent===undefined)
{return;}
if(!this.enabled||!this.sprite.visible||!this.sprite.parent.visible)
{this._pointerOutHandler(pointer);return false;}
if(this.draggable&&this._draggedPointerID==pointer.id)
{return this.updateDrag(pointer);}
else if(this._pointerData[pointer.id].isOver===true)
{if(this.checkPointerOver(pointer))
{this._pointerData[pointer.id].x=pointer.x-this.sprite.x;this._pointerData[pointer.id].y=pointer.y-this.sprite.y;return true;}
else
{this._pointerOutHandler(pointer);return false;}}},_pointerOverHandler:function(pointer){if(this.sprite===null)
{return;}
if(this._pointerData[pointer.id].isOver===false)
{this._pointerData[pointer.id].isOver=true;this._pointerData[pointer.id].isOut=false;this._pointerData[pointer.id].timeOver=this.game.time.now;this._pointerData[pointer.id].x=pointer.x-this.sprite.x;this._pointerData[pointer.id].y=pointer.y-this.sprite.y;if(this.useHandCursor&&this._pointerData[pointer.id].isDragged===false)
{this.game.canvas.style.cursor="pointer";this._setHandCursor=true;}
if(this.sprite&&this.sprite.events)
{this.sprite.events.onInputOver.dispatch(this.sprite,pointer);}}},_pointerOutHandler:function(pointer){if(this.sprite===null)
{return;}
this._pointerData[pointer.id].isOver=false;this._pointerData[pointer.id].isOut=true;this._pointerData[pointer.id].timeOut=this.game.time.now;if(this.useHandCursor&&this._pointerData[pointer.id].isDragged===false)
{this.game.canvas.style.cursor="default";this._setHandCursor=false;}
if(this.sprite&&this.sprite.events)
{this.sprite.events.onInputOut.dispatch(this.sprite,pointer);}},_touchedHandler:function(pointer){if(this.sprite===null)
{return;}
if(this._pointerData[pointer.id].isDown===false&&this._pointerData[pointer.id].isOver===true)
{if(this.pixelPerfectClick&&!this.checkPixel(null,null,pointer))
{return;}
this._pointerData[pointer.id].isDown=true;this._pointerData[pointer.id].isUp=false;this._pointerData[pointer.id].timeDown=this.game.time.now;if(this.sprite&&this.sprite.events)
{this.sprite.events.onInputDown.dispatch(this.sprite,pointer);}
if(this.draggable&&this.isDragged===false)
{this.startDrag(pointer);}
if(this.bringToTop)
{this.sprite.bringToTop();}}
return this.consumePointerEvent;},_releasedHandler:function(pointer){if(this.sprite===null)
{return;}
if(this._pointerData[pointer.id].isDown&&pointer.isUp)
{this._pointerData[pointer.id].isDown=false;this._pointerData[pointer.id].isUp=true;this._pointerData[pointer.id].timeUp=this.game.time.now;this._pointerData[pointer.id].downDuration=this._pointerData[pointer.id].timeUp-this._pointerData[pointer.id].timeDown;if(this.checkPointerOver(pointer))
{if(this.sprite&&this.sprite.events)
{this.sprite.events.onInputUp.dispatch(this.sprite,pointer,true);}}
else
{if(this.sprite&&this.sprite.events)
{this.sprite.events.onInputUp.dispatch(this.sprite,pointer,false);}
if(this.useHandCursor)
{this.game.canvas.style.cursor="default";this._setHandCursor=false;}}
if(this.draggable&&this.isDragged&&this._draggedPointerID==pointer.id)
{this.stopDrag(pointer);}}},updateDrag:function(pointer){if(pointer.isUp)
{this.stopDrag(pointer);return false;}
if(this.sprite.fixedToCamera)
{if(this.allowHorizontalDrag)
{this.sprite.cameraOffset.x=pointer.x+this._dragPoint.x+this.dragOffset.x;}
if(this.allowVerticalDrag)
{this.sprite.cameraOffset.y=pointer.y+this._dragPoint.y+this.dragOffset.y;}
if(this.boundsRect)
{this.checkBoundsRect();}
if(this.boundsSprite)
{this.checkBoundsSprite();}
if(this.snapOnDrag)
{this.sprite.cameraOffset.x=Math.round((this.sprite.cameraOffset.x-(this.snapOffsetX%this.snapX))/this.snapX)*this.snapX+(this.snapOffsetX%this.snapX);this.sprite.cameraOffset.y=Math.round((this.sprite.cameraOffset.y-(this.snapOffsetY%this.snapY))/this.snapY)*this.snapY+(this.snapOffsetY%this.snapY);}}
else
{if(this.allowHorizontalDrag)
{this.sprite.x=pointer.x+this._dragPoint.x+this.dragOffset.x;}
if(this.allowVerticalDrag)
{this.sprite.y=pointer.y+this._dragPoint.y+this.dragOffset.y;}
if(this.boundsRect)
{this.checkBoundsRect();}
if(this.boundsSprite)
{this.checkBoundsSprite();}
if(this.snapOnDrag)
{this.sprite.x=Math.round((this.sprite.x-(this.snapOffsetX%this.snapX))/this.snapX)*this.snapX+(this.snapOffsetX%this.snapX);this.sprite.y=Math.round((this.sprite.y-(this.snapOffsetY%this.snapY))/this.snapY)*this.snapY+(this.snapOffsetY%this.snapY);}}
return true;},justOver:function(pointer,delay){pointer=pointer||0;delay=delay||500;return(this._pointerData[pointer].isOver&&this.overDuration(pointer)<delay);},justOut:function(pointer,delay){pointer=pointer||0;delay=delay||500;return(this._pointerData[pointer].isOut&&(this.game.time.now-this._pointerData[pointer].timeOut<delay));},justPressed:function(pointer,delay){pointer=pointer||0;delay=delay||500;return(this._pointerData[pointer].isDown&&this.downDuration(pointer)<delay);},justReleased:function(pointer,delay){pointer=pointer||0;delay=delay||500;return(this._pointerData[pointer].isUp&&(this.game.time.now-this._pointerData[pointer].timeUp<delay));},overDuration:function(pointer){pointer=pointer||0;if(this._pointerData[pointer].isOver)
{return this.game.time.now-this._pointerData[pointer].timeOver;}
return-1;},downDuration:function(pointer){pointer=pointer||0;if(this._pointerData[pointer].isDown)
{return this.game.time.now-this._pointerData[pointer].timeDown;}
return-1;},enableDrag:function(lockCenter,bringToTop,pixelPerfect,alphaThreshold,boundsRect,boundsSprite){if(typeof lockCenter=='undefined'){lockCenter=false;}
if(typeof bringToTop=='undefined'){bringToTop=false;}
if(typeof pixelPerfect=='undefined'){pixelPerfect=false;}
if(typeof alphaThreshold=='undefined'){alphaThreshold=255;}
if(typeof boundsRect=='undefined'){boundsRect=null;}
if(typeof boundsSprite=='undefined'){boundsSprite=null;}
this._dragPoint=new Phaser.Point();this.draggable=true;this.bringToTop=bringToTop;this.dragOffset=new Phaser.Point();this.dragFromCenter=lockCenter;this.pixelPerfect=pixelPerfect;this.pixelPerfectAlpha=alphaThreshold;if(boundsRect)
{this.boundsRect=boundsRect;}
if(boundsSprite)
{this.boundsSprite=boundsSprite;}},disableDrag:function(){if(this._pointerData)
{for(var i=0;i<10;i++)
{this._pointerData[i].isDragged=false;}}
this.draggable=false;this.isDragged=false;this._draggedPointerID=-1;},startDrag:function(pointer){this.isDragged=true;this._draggedPointerID=pointer.id;this._pointerData[pointer.id].isDragged=true;if(this.sprite.fixedToCamera)
{if(this.dragFromCenter)
{this.sprite.centerOn(pointer.x,pointer.y);this._dragPoint.setTo(this.sprite.cameraOffset.x-pointer.x,this.sprite.cameraOffset.y-pointer.y);}
else
{this._dragPoint.setTo(this.sprite.cameraOffset.x-pointer.x,this.sprite.cameraOffset.y-pointer.y);}}
else
{if(this.dragFromCenter)
{var bounds=this.sprite.getBounds();this.sprite.x=pointer.x+(this.sprite.x-bounds.centerX);this.sprite.y=pointer.y+(this.sprite.y-bounds.centerY);this._dragPoint.setTo(this.sprite.x-pointer.x,this.sprite.y-pointer.y);}
else
{this._dragPoint.setTo(this.sprite.x-pointer.x,this.sprite.y-pointer.y);}}
this.updateDrag(pointer);if(this.bringToTop)
{this.sprite.bringToTop();}
this.sprite.events.onDragStart.dispatch(this.sprite,pointer);},stopDrag:function(pointer){this.isDragged=false;this._draggedPointerID=-1;this._pointerData[pointer.id].isDragged=false;if(this.snapOnRelease)
{if(this.sprite.fixedToCamera)
{this.sprite.cameraOffset.x=Math.round((this.sprite.cameraOffset.x-(this.snapOffsetX%this.snapX))/this.snapX)*this.snapX+(this.snapOffsetX%this.snapX);this.sprite.cameraOffset.y=Math.round((this.sprite.cameraOffset.y-(this.snapOffsetY%this.snapY))/this.snapY)*this.snapY+(this.snapOffsetY%this.snapY);}
else
{this.sprite.x=Math.round((this.sprite.x-(this.snapOffsetX%this.snapX))/this.snapX)*this.snapX+(this.snapOffsetX%this.snapX);this.sprite.y=Math.round((this.sprite.y-(this.snapOffsetY%this.snapY))/this.snapY)*this.snapY+(this.snapOffsetY%this.snapY);}}
this.sprite.events.onDragStop.dispatch(this.sprite,pointer);if(this.checkPointerOver(pointer)===false)
{this._pointerOutHandler(pointer);}},setDragLock:function(allowHorizontal,allowVertical){if(typeof allowHorizontal=='undefined'){allowHorizontal=true;}
if(typeof allowVertical=='undefined'){allowVertical=true;}
this.allowHorizontalDrag=allowHorizontal;this.allowVerticalDrag=allowVertical;},enableSnap:function(snapX,snapY,onDrag,onRelease,snapOffsetX,snapOffsetY){if(typeof onDrag=='undefined'){onDrag=true;}
if(typeof onRelease=='undefined'){onRelease=false;}
if(typeof snapOffsetX=='undefined'){snapOffsetX=0;}
if(typeof snapOffsetY=='undefined'){snapOffsetY=0;}
this.snapX=snapX;this.snapY=snapY;this.snapOffsetX=snapOffsetX;this.snapOffsetY=snapOffsetY;this.snapOnDrag=onDrag;this.snapOnRelease=onRelease;},disableSnap:function(){this.snapOnDrag=false;this.snapOnRelease=false;},checkBoundsRect:function(){if(this.sprite.fixedToCamera)
{if(this.sprite.cameraOffset.x<this.boundsRect.left)
{this.sprite.cameraOffset.x=this.boundsRect.cameraOffset.x;}
else if((this.sprite.cameraOffset.x+this.sprite.width)>this.boundsRect.right)
{this.sprite.cameraOffset.x=this.boundsRect.right-this.sprite.width;}
if(this.sprite.cameraOffset.y<this.boundsRect.top)
{this.sprite.cameraOffset.y=this.boundsRect.top;}
else if((this.sprite.cameraOffset.y+this.sprite.height)>this.boundsRect.bottom)
{this.sprite.cameraOffset.y=this.boundsRect.bottom-this.sprite.height;}}
else
{if(this.sprite.x<this.boundsRect.left)
{this.sprite.x=this.boundsRect.x;}
else if((this.sprite.x+this.sprite.width)>this.boundsRect.right)
{this.sprite.x=this.boundsRect.right-this.sprite.width;}
if(this.sprite.y<this.boundsRect.top)
{this.sprite.y=this.boundsRect.top;}
else if((this.sprite.y+this.sprite.height)>this.boundsRect.bottom)
{this.sprite.y=this.boundsRect.bottom-this.sprite.height;}}},checkBoundsSprite:function(){if(this.sprite.fixedToCamera&&this.boundsSprite.fixedToCamera)
{if(this.sprite.cameraOffset.x<this.boundsSprite.camerOffset.x)
{this.sprite.cameraOffset.x=this.boundsSprite.camerOffset.x;}
else if((this.sprite.cameraOffset.x+this.sprite.width)>(this.boundsSprite.camerOffset.x+this.boundsSprite.width))
{this.sprite.cameraOffset.x=(this.boundsSprite.camerOffset.x+this.boundsSprite.width)-this.sprite.width;}
if(this.sprite.cameraOffset.y<this.boundsSprite.camerOffset.y)
{this.sprite.cameraOffset.y=this.boundsSprite.camerOffset.y;}
else if((this.sprite.cameraOffset.y+this.sprite.height)>(this.boundsSprite.camerOffset.y+this.boundsSprite.height))
{this.sprite.cameraOffset.y=(this.boundsSprite.camerOffset.y+this.boundsSprite.height)-this.sprite.height;}}
else
{if(this.sprite.x<this.boundsSprite.x)
{this.sprite.x=this.boundsSprite.x;}
else if((this.sprite.x+this.sprite.width)>(this.boundsSprite.x+this.boundsSprite.width))
{this.sprite.x=(this.boundsSprite.x+this.boundsSprite.width)-this.sprite.width;}
if(this.sprite.y<this.boundsSprite.y)
{this.sprite.y=this.boundsSprite.y;}
else if((this.sprite.y+this.sprite.height)>(this.boundsSprite.y+this.boundsSprite.height))
{this.sprite.y=(this.boundsSprite.y+this.boundsSprite.height)-this.sprite.height;}}}};Phaser.InputHandler.prototype.constructor=Phaser.InputHandler;Phaser.Events=function(sprite){this.parent=sprite;this.onAddedToGroup=new Phaser.Signal();this.onRemovedFromGroup=new Phaser.Signal();this.onKilled=new Phaser.Signal();this.onRevived=new Phaser.Signal();this.onOutOfBounds=new Phaser.Signal();this.onEnterBounds=new Phaser.Signal();this.onInputOver=null;this.onInputOut=null;this.onInputDown=null;this.onInputUp=null;this.onDragStart=null;this.onDragStop=null;this.onAnimationStart=null;this.onAnimationComplete=null;this.onAnimationLoop=null;};Phaser.Events.prototype={destroy:function(){this.parent=null;this.onAddedToGroup.dispose();this.onRemovedFromGroup.dispose();this.onKilled.dispose();this.onRevived.dispose();this.onOutOfBounds.dispose();if(this.onInputOver)
{this.onInputOver.dispose();this.onInputOut.dispose();this.onInputDown.dispose();this.onInputUp.dispose();this.onDragStart.dispose();this.onDragStop.dispose();}
if(this.onAnimationStart)
{this.onAnimationStart.dispose();this.onAnimationComplete.dispose();this.onAnimationLoop.dispose();}}};Phaser.Events.prototype.constructor=Phaser.Events;Phaser.GameObjectFactory=function(game){this.game=game;this.world=this.game.world;};Phaser.GameObjectFactory.prototype={existing:function(object){return this.world.add(object);},image:function(x,y,key,frame,group){if(typeof group==='undefined'){group=this.world;}
return group.add(new Phaser.Image(this.game,x,y,key,frame));},sprite:function(x,y,key,frame,group){if(typeof group==='undefined'){group=this.world;}
return group.create(x,y,key,frame);},tween:function(obj){return this.game.tweens.create(obj);},group:function(parent,name,addToStage,enableBody,physicsBodyType){return new Phaser.Group(this.game,parent,name,addToStage,enableBody,physicsBodyType);},physicsGroup:function(physicsBodyType,parent,name,addToStage){return new Phaser.Group(this.game,parent,name,addToStage,true,physicsBodyType);},spriteBatch:function(parent,name,addToStage){if(typeof name==='undefined'){name='group';}
if(typeof addToStage==='undefined'){addToStage=false;}
return new Phaser.SpriteBatch(this.game,parent,name,addToStage);},audio:function(key,volume,loop,connect){return this.game.sound.add(key,volume,loop,connect);},sound:function(key,volume,loop,connect){return this.game.sound.add(key,volume,loop,connect);},tileSprite:function(x,y,width,height,key,frame,group){if(typeof group==='undefined'){group=this.world;}
return group.add(new Phaser.TileSprite(this.game,x,y,width,height,key,frame));},text:function(x,y,text,style,group){if(typeof group==='undefined'){group=this.world;}
return group.add(new Phaser.Text(this.game,x,y,text,style));},button:function(x,y,key,callback,callbackContext,overFrame,outFrame,downFrame,upFrame,group){if(typeof group==='undefined'){group=this.world;}
return group.add(new Phaser.Button(this.game,x,y,key,callback,callbackContext,overFrame,outFrame,downFrame,upFrame));},graphics:function(x,y,group){if(typeof group==='undefined'){group=this.world;}
return group.add(new Phaser.Graphics(this.game,x,y));},emitter:function(x,y,maxParticles){return this.game.particles.add(new Phaser.Particles.Arcade.Emitter(this.game,x,y,maxParticles));},retroFont:function(font,characterWidth,characterHeight,chars,charsPerRow,xSpacing,ySpacing,xOffset,yOffset){return new Phaser.RetroFont(this.game,font,characterWidth,characterHeight,chars,charsPerRow,xSpacing,ySpacing,xOffset,yOffset);},bitmapText:function(x,y,font,text,size,group){if(typeof group==='undefined'){group=this.world;}
return group.add(new Phaser.BitmapText(this.game,x,y,font,text,size));},tilemap:function(key,tileWidth,tileHeight,width,height){return new Phaser.Tilemap(this.game,key,tileWidth,tileHeight,width,height);},renderTexture:function(width,height,key,addToCache){if(typeof key==='undefined'||key===''){key=this.game.rnd.uuid();}
if(typeof addToCache==='undefined'){addToCache=false;}
var texture=new Phaser.RenderTexture(this.game,width,height,key);if(addToCache)
{this.game.cache.addRenderTexture(key,texture);}
return texture;},bitmapData:function(width,height,key,addToCache){if(typeof addToCache==='undefined'){addToCache=false;}
if(typeof key==='undefined'||key===''){key=this.game.rnd.uuid();}
var texture=new Phaser.BitmapData(this.game,key,width,height);if(addToCache)
{this.game.cache.addBitmapData(key,texture);}
return texture;},filter:function(filter){var args=Array.prototype.splice.call(arguments,1);var filter=new Phaser.Filter[filter](this.game);filter.init.apply(filter,args);return filter;}};Phaser.GameObjectFactory.prototype.constructor=Phaser.GameObjectFactory;Phaser.GameObjectCreator=function(game){this.game=game;this.world=this.game.world;};Phaser.GameObjectCreator.prototype={image:function(x,y,key,frame){return new Phaser.Image(this.game,x,y,key,frame);},sprite:function(x,y,key,frame){return new Phaser.Sprite(this.game,x,y,key,frame);},tween:function(obj){return new Phaser.Tween(obj,this.game);},group:function(parent,name,addToStage,enableBody,physicsBodyType){return new Phaser.Group(this.game,null,name,addToStage,enableBody,physicsBodyType);},spriteBatch:function(parent,name,addToStage){if(typeof name==='undefined'){name='group';}
if(typeof addToStage==='undefined'){addToStage=false;}
return new Phaser.SpriteBatch(this.game,parent,name,addToStage);},audio:function(key,volume,loop,connect){return this.game.sound.add(key,volume,loop,connect);},sound:function(key,volume,loop,connect){return this.game.sound.add(key,volume,loop,connect);},tileSprite:function(x,y,width,height,key,frame){return new Phaser.TileSprite(this.game,x,y,width,height,key,frame);},text:function(x,y,text,style){return new Phaser.Text(this.game,x,y,text,style);},button:function(x,y,key,callback,callbackContext,overFrame,outFrame,downFrame,upFrame){return new Phaser.Button(this.game,x,y,key,callback,callbackContext,overFrame,outFrame,downFrame,upFrame);},graphics:function(x,y){return new Phaser.Graphics(this.game,x,y);},emitter:function(x,y,maxParticles){return new Phaser.Particles.Arcade.Emitter(this.game,x,y,maxParticles);},retroFont:function(font,characterWidth,characterHeight,chars,charsPerRow,xSpacing,ySpacing,xOffset,yOffset){return new Phaser.RetroFont(this.game,font,characterWidth,characterHeight,chars,charsPerRow,xSpacing,ySpacing,xOffset,yOffset);},bitmapText:function(x,y,font,text,size){return new Phaser.BitmapText(this.game,x,y,font,text,size);},tilemap:function(key,tileWidth,tileHeight,width,height){return new Phaser.Tilemap(this.game,key,tileWidth,tileHeight,width,height);},renderTexture:function(width,height,key,addToCache){if(typeof key==='undefined'||key===''){key=this.game.rnd.uuid();}
if(typeof addToCache==='undefined'){addToCache=false;}
var texture=new Phaser.RenderTexture(this.game,width,height,key);if(addToCache)
{this.game.cache.addRenderTexture(key,texture);}
return texture;},bitmapData:function(width,height,key,addToCache){if(typeof addToCache==='undefined'){addToCache=false;}
if(typeof key==='undefined'||key===''){key=this.game.rnd.uuid();}
var texture=new Phaser.BitmapData(this.game,key,width,height);if(addToCache)
{this.game.cache.addBitmapData(key,texture);}
return texture;},filter:function(filter){var args=Array.prototype.splice.call(arguments,1);var filter=new Phaser.Filter[filter](this.game);filter.init.apply(filter,args);return filter;}};Phaser.GameObjectCreator.prototype.constructor=Phaser.GameObjectCreator;Phaser.BitmapData=function(game,key,width,height){if(typeof width==='undefined'){width=100;}
if(typeof height==='undefined'){height=100;}
this.game=game;this.key=key;this.width=width;this.height=height;this.canvas=Phaser.Canvas.create(width,height,'',true);this.context=this.canvas.getContext('2d');this.ctx=this.context;this.imageData=this.context.getImageData(0,0,width,height);this.data=this.imageData.data;this.pixels=null;if(this.imageData.data.buffer)
{this.buffer=this.imageData.data.buffer;this.pixels=new Uint32Array(this.buffer);}
else
{if(window['ArrayBuffer'])
{this.buffer=new ArrayBuffer(this.imageData.data.length);this.pixels=new Uint32Array(this.buffer);}
else
{this.pixels=this.imageData.data;}}
this.baseTexture=new PIXI.BaseTexture(this.canvas);this.texture=new PIXI.Texture(this.baseTexture);this.textureFrame=new Phaser.Frame(0,0,0,width,height,'bitmapData',game.rnd.uuid());this.type=Phaser.BITMAPDATA;this.disableTextureUpload=false;this.dirty=false;this.cls=this.clear;this.update=this.refreshBuffer;this._tempR=0;this._tempG=0;this._tempB=0;};Phaser.BitmapData.prototype={add:function(object){if(Array.isArray(object))
{for(var i=0;i<object.length;i++)
{if(object[i]['loadTexture'])
{object[i].loadTexture(this);}}}
else
{object.loadTexture(this);}},clear:function(){this.context.clearRect(0,0,this.width,this.height);this.dirty=true;},fill:function(r,g,b,a){if(typeof a==='undefined'){a=1;}
this.context.fillStyle='rgba('+r+','+g+','+b+','+a+')';this.context.fillRect(0,0,this.width,this.height);this.dirty=true;},resize:function(width,height){if(width!==this.width||height!==this.height)
{this.width=width;this.height=height;this.canvas.width=width;this.canvas.height=height;this.textureFrame.width=width;this.textureFrame.height=height;this.refreshBuffer();}
this.dirty=true;},refreshBuffer:function(x,y,width,height){if(typeof x==='undefined'){x=0;}
if(typeof y==='undefined'){y=0;}
if(typeof width==='undefined'){width=this.width;}
if(typeof height==='undefined'){height=this.height;}
this.imageData=this.context.getImageData(x,y,width,height);this.data=this.imageData.data;if(this.imageData.data.buffer)
{this.buffer=this.imageData.data.buffer;this.pixels=new Uint32Array(this.buffer);}
else
{if(window['ArrayBuffer'])
{this.buffer=new ArrayBuffer(this.imageData.data.length);this.pixels=new Uint32Array(this.buffer);}
else
{this.pixels=this.imageData.data;}}},processPixelRGB:function(callback,callbackContext,x,y,width,height){if(typeof x==='undefined'){x=0;}
if(typeof y==='undefined'){y=0;}
if(typeof width==='undefined'){width=this.width;}
if(typeof height==='undefined'){height=this.height;}
var w=x+width;var h=y+height;var pixel=Phaser.Color.createColor();var result={r:0,g:0,b:0,a:0};var dirty=false;for(var ty=y;ty<h;ty++)
{for(var tx=x;tx<w;tx++)
{Phaser.Color.unpackPixel(this.getPixel32(tx,ty),pixel);result=callback.call(callbackContext,pixel,tx,ty);if(result!==false&&result!==null)
{this.setPixel32(tx,ty,result.r,result.g,result.b,result.a,false);dirty=true;}}}
if(dirty)
{this.context.putImageData(this.imageData,0,0);this.dirty=true;}},processPixel:function(callback,callbackContext,x,y,width,height){if(typeof x==='undefined'){x=0;}
if(typeof y==='undefined'){y=0;}
if(typeof width==='undefined'){width=this.width;}
if(typeof height==='undefined'){height=this.height;}
var w=x+width;var h=y+height;var pixel=0;var result=0;var dirty=false;for(var ty=y;ty<h;ty++)
{for(var tx=x;tx<w;tx++)
{pixel=this.getPixel32(tx,ty);result=callback.call(callbackContext,pixel,tx,ty);if(result!==pixel)
{this.pixels[ty*this.width+tx]=result;dirty=true;}}}
if(dirty)
{this.context.putImageData(this.imageData,0,0);this.dirty=true;}},replaceRGB:function(r1,g1,b1,a1,r2,g2,b2,a2,region){var sx=0;var sy=0;var w=this.width;var h=this.height;var source=Phaser.Color.packPixel(r1,g1,b1,a1);if(region!==undefined&&region instanceof Phaser.Rectangle)
{sx=region.x;sy=region.y;w=region.width;h=region.height;}
for(var y=0;y<h;y++)
{for(var x=0;x<w;x++)
{if(this.getPixel32(sx+x,sy+y)===source)
{this.setPixel32(sx+x,sy+y,r2,g2,b2,a2,false);}}}
this.context.putImageData(this.imageData,0,0);this.dirty=true;},setHSL:function(h,s,l,region){if(typeof h==='undefined'||h===null){h=false;}
if(typeof s==='undefined'||s===null){s=false;}
if(typeof l==='undefined'||l===null){l=false;}
if(!h&&!s&&!l)
{return;}
if(typeof region==='undefined')
{region=new Phaser.Rectangle(0,0,this.width,this.height);}
var pixel=Phaser.Color.createColor();for(var y=region.y;y<region.bottom;y++)
{for(var x=region.x;x<region.right;x++)
{Phaser.Color.unpackPixel(this.getPixel32(x,y),pixel,true);if(h)
{pixel.h=h;}
if(s)
{pixel.s=s;}
if(l)
{pixel.l=l;}
Phaser.Color.HSLtoRGB(pixel.h,pixel.s,pixel.l,pixel);this.setPixel32(x,y,pixel.r,pixel.g,pixel.b,pixel.a,false);}}
this.context.putImageData(this.imageData,0,0);this.dirty=true;},shiftHSL:function(h,s,l,region){if(typeof h==='undefined'||h===null){h=false;}
if(typeof s==='undefined'||s===null){s=false;}
if(typeof l==='undefined'||l===null){l=false;}
if(!h&&!s&&!l)
{return;}
if(typeof region==='undefined')
{region=new Phaser.Rectangle(0,0,this.width,this.height);}
var pixel=Phaser.Color.createColor();for(var y=region.y;y<region.bottom;y++)
{for(var x=region.x;x<region.right;x++)
{Phaser.Color.unpackPixel(this.getPixel32(x,y),pixel,true);if(h)
{pixel.h=this.game.math.wrap(pixel.h+h,0,1);}
if(s)
{pixel.s=this.game.math.limitValue(pixel.s+s,0,1);}
if(l)
{pixel.l=this.game.math.limitValue(pixel.l+l,0,1);}
Phaser.Color.HSLtoRGB(pixel.h,pixel.s,pixel.l,pixel);this.setPixel32(x,y,pixel.r,pixel.g,pixel.b,pixel.a,false);}}
this.context.putImageData(this.imageData,0,0);this.dirty=true;},setPixel32:function(x,y,red,green,blue,alpha,immediate){if(typeof immediate==='undefined'){immediate=true;}
if(x>=0&&x<=this.width&&y>=0&&y<=this.height)
{if(Phaser.Device.LITTLE_ENDIAN)
{this.pixels[y*this.width+x]=(alpha<<24)|(blue<<16)|(green<<8)|red;}
else
{this.pixels[y*this.width+x]=(red<<24)|(green<<16)|(blue<<8)|alpha;}
if(immediate)
{this.context.putImageData(this.imageData,0,0);this.dirty=true;}}},setPixel:function(x,y,red,green,blue,immediate){this.setPixel32(x,y,red,green,blue,255,immediate);},getPixel:function(x,y,out){if(!out)
{out=Phaser.Color.createColor();}
var index=~~(x+(y*this.width));index*=4;if(this.data[index])
{out.r=this.data[index];out.g=this.data[++index];out.b=this.data[++index];out.a=this.data[++index];}
return out;},getPixel32:function(x,y){if(x>=0&&x<=this.width&&y>=0&&y<=this.height)
{return this.pixels[y*this.width+x];}},getPixelRGB:function(x,y,out,hsl,hsv){return Phaser.Color.unpackPixel(this.getPixel32(x,y),out,hsl,hsv);},getPixels:function(rect){return this.context.getImageData(rect.x,rect.y,rect.width,rect.height);},copyPixels:function(source,area,destX,destY){if(typeof source==='string')
{source=this.game.cache.getImage(source);}
if(source)
{this.context.drawImage(source,area.x,area.y,area.width,area.height,destX,destY,area.width,area.height);}
this.dirty=true;},draw:function(source,x,y){if(typeof x==='undefined'){x=0;}
if(typeof y==='undefined'){y=0;}
if(typeof source==='string')
{source=this.game.cache.getImage(source);}
if(source)
{this.context.drawImage(source,0,0,source.width,source.height,x,y,source.width,source.height);}
this.dirty=true;},drawSprite:function(sprite,x,y){if(typeof x==='undefined'){x=0;}
if(typeof y==='undefined'){y=0;}
var frame=sprite.texture.frame;this.context.drawImage(sprite.texture.baseTexture.source,frame.x,frame.y,frame.width,frame.height,x,y,frame.width,frame.height);this.dirty=true;},alphaMask:function(source,mask){var temp=this.context.globalCompositeOperation;if(typeof mask==='string')
{mask=this.game.cache.getImage(mask);}
if(mask)
{this.context.drawImage(mask,0,0);}
this.context.globalCompositeOperation='source-atop';if(typeof source==='string')
{source=this.game.cache.getImage(source);}
if(source)
{this.context.drawImage(source,0,0);}
this.context.globalCompositeOperation=temp;this.dirty=true;},extract:function(destination,r,g,b,a){if(typeof a==='undefined'){a=255;}
this.processPixelRGB(function(pixel,x,y){if(pixel.r===r&&pixel.g===g&&pixel.b===b)
{destination.setPixel32(x,y,r,g,b,a,false);}
return false;},this);destination.context.putImageData(destination.imageData,0,0);destination.dirty=true;return destination;},circle:function(x,y,radius,fillStyle){if(typeof fillStyle!=='undefined')
{this.context.fillStyle=fillStyle;}
this.context.beginPath();this.context.arc(x,y,radius,0,Math.PI*2,false);this.context.closePath();this.context.fill();},render:function(){if(!this.disableTextureUpload&&this.game.renderType===Phaser.WEBGL&&this.dirty)
{PIXI.updateWebGLTexture(this.baseTexture,this.game.renderer.gl);this.dirty=false;}}};Phaser.BitmapData.prototype.constructor=Phaser.BitmapData;Phaser.Sprite=function(game,x,y,key,frame){x=x||0;y=y||0;key=key||null;frame=frame||null;this.game=game;this.name='';this.type=Phaser.SPRITE;this.z=0;this.events=new Phaser.Events(this);this.animations=new Phaser.AnimationManager(this);this.key=key;this._frame=0;this._frameName='';PIXI.Sprite.call(this,PIXI.TextureCache['__default']);this.loadTexture(key,frame);this.position.set(x,y);this.world=new Phaser.Point(x,y);this.autoCull=false;this.input=null;this.body=null;this.health=1;this.lifespan=0;this.checkWorldBounds=false;this.outOfBoundsKill=false;this.debug=false;this.cameraOffset=new Phaser.Point();this._cache=[0,0,0,0,1,0,1,0,0];this._bounds=new Phaser.Rectangle();};Phaser.Sprite.prototype=Object.create(PIXI.Sprite.prototype);Phaser.Sprite.prototype.constructor=Phaser.Sprite;Phaser.Sprite.prototype.preUpdate=function(){if(this._cache[4]===1&&this.exists)
{this.world.setTo(this.parent.position.x+this.position.x,this.parent.position.y+this.position.y);this.worldTransform.tx=this.world.x;this.worldTransform.ty=this.world.y;this._cache[0]=this.world.x;this._cache[1]=this.world.y;this._cache[2]=this.rotation;if(this.body)
{this.body.preUpdate();}
this._cache[4]=0;return false;}
this._cache[0]=this.world.x;this._cache[1]=this.world.y;this._cache[2]=this.rotation;if(!this.exists||!this.parent.exists)
{this._cache[3]=-1;return false;}
if(this.lifespan>0)
{this.lifespan-=this.game.time.elapsed;if(this.lifespan<=0)
{this.kill();return false;}}
if(this.autoCull||this.checkWorldBounds)
{this._bounds.copyFrom(this.getBounds());}
if(this.autoCull)
{this.renderable=this.game.world.camera.screenView.intersects(this._bounds);}
if(this.checkWorldBounds)
{if(this._cache[5]===1&&this.game.world.bounds.intersects(this._bounds))
{this._cache[5]=0;this.events.onEnterBounds.dispatch(this);}
else if(this._cache[5]===0&&!this.game.world.bounds.intersects(this._bounds))
{this._cache[5]=1;this.events.onOutOfBounds.dispatch(this);if(this.outOfBoundsKill)
{this.kill();return false;}}}
this.world.setTo(this.game.camera.x+this.worldTransform.tx,this.game.camera.y+this.worldTransform.ty);if(this.visible)
{this._cache[3]=this.game.stage.currentRenderOrderID++;}
this.animations.update();if(this.body)
{this.body.preUpdate();}
for(var i=0,len=this.children.length;i<len;i++)
{this.children[i].preUpdate();}
return true;};Phaser.Sprite.prototype.update=function(){};Phaser.Sprite.prototype.postUpdate=function(){if(this.key instanceof Phaser.BitmapData)
{this.key.render();}
if(this.exists&&this.body)
{this.body.postUpdate();}
if(this._cache[7]===1)
{this.position.x=(this.game.camera.view.x+this.cameraOffset.x)/this.game.camera.scale.x;this.position.y=(this.game.camera.view.y+this.cameraOffset.y)/this.game.camera.scale.y;}
for(var i=0,len=this.children.length;i<len;i++)
{this.children[i].postUpdate();}};Phaser.Sprite.prototype.loadTexture=function(key,frame){frame=frame||0;if(key instanceof Phaser.RenderTexture)
{this.key=key.key;this.setTexture(key);return;}
else if(key instanceof Phaser.BitmapData)
{this.key=key;this.setTexture(key.texture);return;}
else if(key instanceof PIXI.Texture)
{this.key=key;this.setTexture(key);return;}
else
{if(key===null||typeof key==='undefined')
{this.key='__default';this.setTexture(PIXI.TextureCache[this.key]);return;}
else if(typeof key==='string'&&!this.game.cache.checkImageKey(key))
{this.key='__missing';this.setTexture(PIXI.TextureCache[this.key]);return;}
if(this.game.cache.isSpriteSheet(key))
{this.key=key;this.animations.loadFrameData(this.game.cache.getFrameData(key));if(typeof frame==='string')
{this.frameName=frame;}
else
{this.frame=frame;}}
else
{this.key=key;this.setTexture(PIXI.TextureCache[key]);return;}}};Phaser.Sprite.prototype.crop=function(rect){if(typeof rect==='undefined'||rect===null)
{if(this.texture.hasOwnProperty('sourceWidth'))
{this.texture.setFrame(new Phaser.Rectangle(0,0,this.texture.sourceWidth,this.texture.sourceHeight));}}
else
{if(this.texture instanceof PIXI.Texture)
{var local={};Phaser.Utils.extend(true,local,this.texture);local.sourceWidth=local.width;local.sourceHeight=local.height;local.frame=rect;local.width=rect.width;local.height=rect.height;this.texture=local;this.texture.updateFrame=true;PIXI.Texture.frameUpdates.push(this.texture);}
else
{this.texture.setFrame(rect);}}};Phaser.Sprite.prototype.revive=function(health){if(typeof health==='undefined'){health=1;}
this.alive=true;this.exists=true;this.visible=true;this.health=health;if(this.events)
{this.events.onRevived.dispatch(this);}
return this;};Phaser.Sprite.prototype.kill=function(){this.alive=false;this.exists=false;this.visible=false;if(this.events)
{this.events.onKilled.dispatch(this);}
return this;};Phaser.Sprite.prototype.destroy=function(destroyChildren){if(this.game===null||this._cache[8]===1){return;}
if(typeof destroyChildren==='undefined'){destroyChildren=true;}
this._cache[8]=1;if(this.parent)
{if(this.parent instanceof Phaser.Group)
{this.parent.remove(this);}
else
{this.parent.removeChild(this);}}
if(this.input)
{this.input.destroy();}
if(this.animations)
{this.animations.destroy();}
if(this.body)
{this.body.destroy();}
if(this.events)
{this.events.destroy();}
var i=this.children.length;if(destroyChildren)
{while(i--)
{this.children[i].destroy(destroyChildren);}}
else
{while(i--)
{this.removeChild(this.children[i]);}}
this.alive=false;this.exists=false;this.visible=false;this.filters=null;this.mask=null;this.game=null;this._cache[8]=0;};Phaser.Sprite.prototype.damage=function(amount){if(this.alive)
{this.health-=amount;if(this.health<=0)
{this.kill();}}
return this;};Phaser.Sprite.prototype.reset=function(x,y,health){if(typeof health==='undefined'){health=1;}
this.world.setTo(x,y);this.position.x=x;this.position.y=y;this.alive=true;this.exists=true;this.visible=true;this.renderable=true;this._outOfBoundsFired=false;this.health=health;if(this.body)
{this.body.reset(x,y,false,false);}
this._cache[4]=1;return this;};Phaser.Sprite.prototype.bringToTop=function(){if(this.parent)
{this.parent.bringToTop(this);}
return this;};Phaser.Sprite.prototype.play=function(name,frameRate,loop,killOnComplete){if(this.animations)
{return this.animations.play(name,frameRate,loop,killOnComplete);}};Phaser.Sprite.prototype.overlap=function(displayObject){return Phaser.Rectangle.intersects(this.getBounds(),displayObject.getBounds());};Object.defineProperty(Phaser.Sprite.prototype,"angle",{get:function(){return Phaser.Math.wrapAngle(Phaser.Math.radToDeg(this.rotation));},set:function(value){this.rotation=Phaser.Math.degToRad(Phaser.Math.wrapAngle(value));}});Object.defineProperty(Phaser.Sprite.prototype,"deltaX",{get:function(){return this.world.x-this._cache[0];}});Object.defineProperty(Phaser.Sprite.prototype,"deltaY",{get:function(){return this.world.y-this._cache[1];}});Object.defineProperty(Phaser.Sprite.prototype,"deltaZ",{get:function(){return this.rotation-this._cache[2];}});Object.defineProperty(Phaser.Sprite.prototype,"inWorld",{get:function(){return this.game.world.bounds.intersects(this.getBounds());}});Object.defineProperty(Phaser.Sprite.prototype,"inCamera",{get:function(){return this.game.world.camera.screenView.intersects(this.getBounds());}});Object.defineProperty(Phaser.Sprite.prototype,"frame",{get:function(){return this.animations.frame;},set:function(value){this.animations.frame=value;}});Object.defineProperty(Phaser.Sprite.prototype,"frameName",{get:function(){return this.animations.frameName;},set:function(value){this.animations.frameName=value;}});Object.defineProperty(Phaser.Sprite.prototype,"renderOrderID",{get:function(){return this._cache[3];}});Object.defineProperty(Phaser.Sprite.prototype,"inputEnabled",{get:function(){return(this.input&&this.input.enabled);},set:function(value){if(value)
{if(this.input===null)
{this.input=new Phaser.InputHandler(this);this.input.start();}
else if(this.input&&!this.input.enabled)
{this.input.start();}}
else
{if(this.input&&this.input.enabled)
{this.input.stop();}}}});Object.defineProperty(Phaser.Sprite.prototype,"exists",{get:function(){return!!this._cache[6];},set:function(value){if(value)
{this._cache[6]=1;if(this.body&&this.body.type===Phaser.Physics.P2JS)
{this.body.addToWorld();}
this.visible=true;}
else
{this._cache[6]=0;if(this.body&&this.body.type===Phaser.Physics.P2JS)
{this.body.removeFromWorld();}
this.visible=false;}}});Object.defineProperty(Phaser.Sprite.prototype,"fixedToCamera",{get:function(){return!!this._cache[7];},set:function(value){if(value)
{this._cache[7]=1;this.cameraOffset.set(this.x,this.y);}
else
{this._cache[7]=0;}}});Object.defineProperty(Phaser.Sprite.prototype,"smoothed",{get:function(){return!this.texture.baseTexture.scaleMode;},set:function(value){if(value)
{if(this.texture)
{this.texture.baseTexture.scaleMode=0;}}
else
{if(this.texture)
{this.texture.baseTexture.scaleMode=1;}}}});Object.defineProperty(Phaser.Sprite.prototype,"x",{get:function(){return this.position.x;},set:function(value){this.position.x=value;if(this.body&&this.body.type===Phaser.Physics.ARCADE&&this.body.phase===2)
{this.body._reset=1;}}});Object.defineProperty(Phaser.Sprite.prototype,"y",{get:function(){return this.position.y;},set:function(value){this.position.y=value;if(this.body&&this.body.type===Phaser.Physics.ARCADE&&this.body.phase===2)
{this.body._reset=1;}}});Object.defineProperty(Phaser.Sprite.prototype,"destroyPhase",{get:function(){return!!this._cache[8];}});Phaser.Image=function(game,x,y,key,frame){x=x||0;y=y||0;key=key||null;frame=frame||null;this.game=game;this.exists=true;this.name='';this.type=Phaser.IMAGE;this.z=0;this.events=new Phaser.Events(this);this.key=key;this._frame=0;this._frameName='';PIXI.Sprite.call(this,PIXI.TextureCache['__default']);this.loadTexture(key,frame);this.position.set(x,y);this.world=new Phaser.Point(x,y);this.autoCull=false;this.input=null;this.cameraOffset=new Phaser.Point();this._cache=[0,0,0,0,1,0,1,0,0];};Phaser.Image.prototype=Object.create(PIXI.Sprite.prototype);Phaser.Image.prototype.constructor=Phaser.Image;Phaser.Image.prototype.preUpdate=function(){this._cache[0]=this.world.x;this._cache[1]=this.world.y;this._cache[2]=this.rotation;if(!this.exists||!this.parent.exists)
{this._cache[3]=-1;return false;}
if(this.autoCull)
{this.renderable=this.game.world.camera.screenView.intersects(this.getBounds());}
this.world.setTo(this.game.camera.x+this.worldTransform[2],this.game.camera.y+this.worldTransform[5]);if(this.visible)
{this._cache[3]=this.game.stage.currentRenderOrderID++;}
for(var i=0,len=this.children.length;i<len;i++)
{this.children[i].preUpdate();}
return true;};Phaser.Image.prototype.update=function(){};Phaser.Image.prototype.postUpdate=function(){if(this.key instanceof Phaser.BitmapData)
{this.key.render();}
if(this._cache[7]===1)
{this.position.x=(this.game.camera.view.x+this.cameraOffset.x)/this.game.camera.scale.x;this.position.y=(this.game.camera.view.y+this.cameraOffset.y)/this.game.camera.scale.y;}
for(var i=0,len=this.children.length;i<len;i++)
{this.children[i].postUpdate();}};Phaser.Image.prototype.loadTexture=function(key,frame){frame=frame||0;if(key instanceof Phaser.RenderTexture)
{this.key=key.key;this.setTexture(key);return;}
else if(key instanceof Phaser.BitmapData)
{this.key=key;this.setTexture(key.texture);return;}
else if(key instanceof PIXI.Texture)
{this.key=key;this.setTexture(key);return;}
else
{if(key===null||typeof key==='undefined')
{this.key='__default';this.setTexture(PIXI.TextureCache[this.key]);return;}
else if(typeof key==='string'&&!this.game.cache.checkImageKey(key))
{this.key='__missing';this.setTexture(PIXI.TextureCache[this.key]);return;}
if(this.game.cache.isSpriteSheet(key))
{this.key=key;var frameData=this.game.cache.getFrameData(key);if(typeof frame==='string')
{this._frame=0;this._frameName=frame;this.setTexture(PIXI.TextureCache[frameData.getFrameByName(frame).uuid]);return;}
else
{this._frame=frame;this._frameName='';this.setTexture(PIXI.TextureCache[frameData.getFrame(frame).uuid]);return;}}
else
{this.key=key;this.setTexture(PIXI.TextureCache[key]);return;}}};Phaser.Image.prototype.crop=function(rect){if(typeof rect==='undefined'||rect===null)
{if(this.texture.hasOwnProperty('sourceWidth'))
{this.texture.setFrame(new Phaser.Rectangle(0,0,this.texture.sourceWidth,this.texture.sourceHeight));}}
else
{if(this.texture instanceof PIXI.Texture)
{var local={};Phaser.Utils.extend(true,local,this.texture);local.sourceWidth=local.width;local.sourceHeight=local.height;local.frame=rect;local.width=rect.width;local.height=rect.height;this.texture=local;this.texture.updateFrame=true;PIXI.Texture.frameUpdates.push(this.texture);}
else
{this.texture.setFrame(rect);}}};Phaser.Image.prototype.revive=function(){this.alive=true;this.exists=true;this.visible=true;if(this.events)
{this.events.onRevived.dispatch(this);}
return this;};Phaser.Image.prototype.kill=function(){this.alive=false;this.exists=false;this.visible=false;if(this.events)
{this.events.onKilled.dispatch(this);}
return this;};Phaser.Image.prototype.destroy=function(destroyChildren){if(this.game===null||this.destroyPhase){return;}
if(typeof destroyChildren==='undefined'){destroyChildren=true;}
this._cache[8]=1;if(this.parent)
{if(this.parent instanceof Phaser.Group)
{this.parent.remove(this);}
else
{this.parent.removeChild(this);}}
if(this.events)
{this.events.destroy();}
if(this.input)
{this.input.destroy();}
var i=this.children.length;if(destroyChildren)
{while(i--)
{this.children[i].destroy(destroyChildren);}}
else
{while(i--)
{this.removeChild(this.children[i]);}}
this.alive=false;this.exists=false;this.visible=false;this.filters=null;this.mask=null;this.game=null;this._cache[8]=0;};Phaser.Image.prototype.reset=function(x,y){this.world.setTo(x,y);this.position.x=x;this.position.y=y;this.alive=true;this.exists=true;this.visible=true;this.renderable=true;return this;};Phaser.Image.prototype.bringToTop=function(){if(this.parent)
{this.parent.bringToTop(this);}
return this;};Object.defineProperty(Phaser.Image.prototype,"angle",{get:function(){return Phaser.Math.wrapAngle(Phaser.Math.radToDeg(this.rotation));},set:function(value){this.rotation=Phaser.Math.degToRad(Phaser.Math.wrapAngle(value));}});Object.defineProperty(Phaser.Image.prototype,"deltaX",{get:function(){return this.world.x-this._cache[0];}});Object.defineProperty(Phaser.Image.prototype,"deltaY",{get:function(){return this.world.y-this._cache[1];}});Object.defineProperty(Phaser.Image.prototype,"deltaZ",{get:function(){return this.rotation-this._cache[2];}});Object.defineProperty(Phaser.Image.prototype,"inWorld",{get:function(){return this.game.world.bounds.intersects(this.getBounds());}});Object.defineProperty(Phaser.Image.prototype,"inCamera",{get:function(){return this.game.world.camera.screenView.intersects(this.getBounds());}});Object.defineProperty(Phaser.Image.prototype,"frame",{get:function(){return this._frame;},set:function(value){if(value!==this.frame&&this.game.cache.isSpriteSheet(this.key))
{var frameData=this.game.cache.getFrameData(this.key);if(frameData&&value<frameData.total&&frameData.getFrame(value))
{this.setTexture(PIXI.TextureCache[frameData.getFrame(value).uuid]);this._frame=value;}}}});Object.defineProperty(Phaser.Image.prototype,"frameName",{get:function(){return this._frameName;},set:function(value){if(value!==this.frameName&&this.game.cache.isSpriteSheet(this.key))
{var frameData=this.game.cache.getFrameData(this.key);if(frameData&&frameData.getFrameByName(value))
{this.setTexture(PIXI.TextureCache[frameData.getFrameByName(value).uuid]);this._frameName=value;}}}});Object.defineProperty(Phaser.Image.prototype,"renderOrderID",{get:function(){return this._cache[3];}});Object.defineProperty(Phaser.Image.prototype,"inputEnabled",{get:function(){return(this.input&&this.input.enabled);},set:function(value){if(value)
{if(this.input===null)
{this.input=new Phaser.InputHandler(this);this.input.start();}
else if(this.input&&!this.input.enabled)
{this.input.start();}}
else
{if(this.input&&this.input.enabled)
{this.input.stop();}}}});Object.defineProperty(Phaser.Image.prototype,"fixedToCamera",{get:function(){return!!this._cache[7];},set:function(value){if(value)
{this._cache[7]=1;this.cameraOffset.set(this.x,this.y);}
else
{this._cache[7]=0;}}});Object.defineProperty(Phaser.Image.prototype,"smoothed",{get:function(){return!this.texture.baseTexture.scaleMode;},set:function(value){if(value)
{if(this.texture)
{this.texture.baseTexture.scaleMode=0;}}
else
{if(this.texture)
{this.texture.baseTexture.scaleMode=1;}}}});Object.defineProperty(Phaser.Image.prototype,"destroyPhase",{get:function(){return!!this._cache[8];}});Phaser.TileSprite=function(game,x,y,width,height,key,frame){x=x||0;y=y||0;width=width||256;height=height||256;key=key||null;frame=frame||null;this.game=game;this.name='';this.type=Phaser.TILESPRITE;this.z=0;this.events=new Phaser.Events(this);this.animations=new Phaser.AnimationManager(this);this.key=key;this._frame=0;this._frameName='';this._scroll=new Phaser.Point();PIXI.TilingSprite.call(this,PIXI.TextureCache['__default'],width,height);this.loadTexture(key,frame);this.position.set(x,y);this.input=null;this.world=new Phaser.Point(x,y);this.autoCull=false;this.checkWorldBounds=false;this.cameraOffset=new Phaser.Point();this.body=null;this._cache=[0,0,0,0,1,0,1,0,0];};Phaser.TileSprite.prototype=Object.create(PIXI.TilingSprite.prototype);Phaser.TileSprite.prototype.constructor=Phaser.TileSprite;Phaser.TileSprite.prototype.preUpdate=function(){if(this._cache[4]===1&&this.exists)
{this.world.setTo(this.parent.position.x+this.position.x,this.parent.position.y+this.position.y);this.worldTransform.tx=this.world.x;this.worldTransform.ty=this.world.y;this._cache[0]=this.world.x;this._cache[1]=this.world.y;this._cache[2]=this.rotation;if(this.body)
{this.body.preUpdate();}
this._cache[4]=0;return false;}
this._cache[0]=this.world.x;this._cache[1]=this.world.y;this._cache[2]=this.rotation;if(!this.exists||!this.parent.exists)
{this._cache[3]=-1;return false;}
if(this.autoCull||this.checkWorldBounds)
{this._bounds.copyFrom(this.getBounds());}
if(this.autoCull)
{this.renderable=this.game.world.camera.screenView.intersects(this._bounds);}
if(this.checkWorldBounds)
{if(this._cache[5]===1&&this.game.world.bounds.intersects(this._bounds))
{this._cache[5]=0;this.events.onEnterBounds.dispatch(this);}
else if(this._cache[5]===0&&!this.game.world.bounds.intersects(this._bounds))
{this._cache[5]=1;this.events.onOutOfBounds.dispatch(this);}}
this.world.setTo(this.game.camera.x+this.worldTransform.tx,this.game.camera.y+this.worldTransform.ty);if(this.visible)
{this._cache[3]=this.game.stage.currentRenderOrderID++;}
this.animations.update();if(this._scroll.x!==0)
{this.tilePosition.x+=this._scroll.x*this.game.time.physicsElapsed;}
if(this._scroll.y!==0)
{this.tilePosition.y+=this._scroll.y*this.game.time.physicsElapsed;}
if(this.body)
{this.body.preUpdate();}
for(var i=0,len=this.children.length;i<len;i++)
{this.children[i].preUpdate();}
return true;};Phaser.TileSprite.prototype.update=function(){};Phaser.TileSprite.prototype.postUpdate=function(){if(this.exists&&this.body)
{this.body.postUpdate();}
if(this._cache[7]===1)
{this.position.x=this.game.camera.view.x+this.cameraOffset.x;this.position.y=this.game.camera.view.y+this.cameraOffset.y;}
for(var i=0,len=this.children.length;i<len;i++)
{this.children[i].postUpdate();}};Phaser.TileSprite.prototype.autoScroll=function(x,y){this._scroll.set(x,y);};Phaser.TileSprite.prototype.stopScroll=function(){this._scroll.set(0,0);};Phaser.TileSprite.prototype.loadTexture=function(key,frame){frame=frame||0;if(key instanceof Phaser.RenderTexture)
{this.key=key.key;this.setTexture(key);return;}
else if(key instanceof Phaser.BitmapData)
{this.key=key;this.setTexture(key.texture);return;}
else if(key instanceof PIXI.Texture)
{this.key=key;this.setTexture(key);return;}
else
{if(key===null||typeof key==='undefined')
{this.key='__default';this.setTexture(PIXI.TextureCache[this.key]);return;}
else if(typeof key==='string'&&!this.game.cache.checkImageKey(key))
{this.key='__missing';this.setTexture(PIXI.TextureCache[this.key]);return;}
if(this.game.cache.isSpriteSheet(key))
{this.key=key;this.animations.loadFrameData(this.game.cache.getFrameData(key));if(typeof frame==='string')
{this.frameName=frame;}
else
{this.frame=frame;}}
else
{this.key=key;this.setTexture(PIXI.TextureCache[key]);return;}}};Phaser.TileSprite.prototype.destroy=function(destroyChildren){if(this.game===null||this.destroyPhase){return;}
if(typeof destroyChildren==='undefined'){destroyChildren=true;}
this._cache[8]=1;if(this.filters)
{this.filters=null;}
if(this.parent)
{if(this.parent instanceof Phaser.Group)
{this.parent.remove(this);}
else
{this.parent.removeChild(this);}}
this.animations.destroy();this.events.destroy();var i=this.children.length;if(destroyChildren)
{while(i--)
{this.children[i].destroy(destroyChildren);}}
else
{while(i--)
{this.removeChild(this.children[i]);}}
this.exists=false;this.visible=false;this.filters=null;this.mask=null;this.game=null;this._cache[8]=0;};Phaser.TileSprite.prototype.play=function(name,frameRate,loop,killOnComplete){return this.animations.play(name,frameRate,loop,killOnComplete);};Phaser.TileSprite.prototype.reset=function(x,y){this.world.setTo(x,y);this.position.x=x;this.position.y=y;this.alive=true;this.exists=true;this.visible=true;this.renderable=true;this._outOfBoundsFired=false;this.tilePosition.x=0;this.tilePosition.y=0;if(this.body)
{this.body.reset(x,y,false,false);}
this._cache[4]=1;return this;};Object.defineProperty(Phaser.TileSprite.prototype,"angle",{get:function(){return Phaser.Math.wrapAngle(Phaser.Math.radToDeg(this.rotation));},set:function(value){this.rotation=Phaser.Math.degToRad(Phaser.Math.wrapAngle(value));}});Object.defineProperty(Phaser.TileSprite.prototype,"frame",{get:function(){return this.animations.frame;},set:function(value){if(value!==this.animations.frame)
{this.animations.frame=value;}}});Object.defineProperty(Phaser.TileSprite.prototype,"frameName",{get:function(){return this.animations.frameName;},set:function(value){if(value!==this.animations.frameName)
{this.animations.frameName=value;}}});Object.defineProperty(Phaser.TileSprite.prototype,"fixedToCamera",{get:function(){return!!this._cache[7];},set:function(value){if(value)
{this._cache[7]=1;this.cameraOffset.set(this.x,this.y);}
else
{this._cache[7]=0;}}});Object.defineProperty(Phaser.TileSprite.prototype,"exists",{get:function(){return!!this._cache[6];},set:function(value){if(value)
{this._cache[6]=1;if(this.body&&this.body.type===Phaser.Physics.P2JS)
{this.body.addToWorld();}
this.visible=true;}
else
{this._cache[6]=0;if(this.body&&this.body.type===Phaser.Physics.P2JS)
{this.body.safeRemove=true;}
this.visible=false;}}});Object.defineProperty(Phaser.TileSprite.prototype,"inputEnabled",{get:function(){return(this.input&&this.input.enabled);},set:function(value){if(value)
{if(this.input===null)
{this.input=new Phaser.InputHandler(this);this.input.start();}
else if(this.input&&!this.input.enabled)
{this.input.start();}}
else
{if(this.input&&this.input.enabled)
{this.input.stop();}}}});Object.defineProperty(Phaser.TileSprite.prototype,"x",{get:function(){return this.position.x;},set:function(value){this.position.x=value;if(this.body&&this.body.type===Phaser.Physics.ARCADE&&this.body.phase===2)
{this.body._reset=1;}}});Object.defineProperty(Phaser.TileSprite.prototype,"y",{get:function(){return this.position.y;},set:function(value){this.position.y=value;if(this.body&&this.body.type===Phaser.Physics.ARCADE&&this.body.phase===2)
{this.body._reset=1;}}});Object.defineProperty(Phaser.TileSprite.prototype,"destroyPhase",{get:function(){return!!this._cache[8];}});Phaser.Text=function(game,x,y,text,style){x=x||0;y=y||0;text=text||' ';style=style||{};if(text.length===0)
{text=' ';}
else
{text=text.toString();}
this.game=game;this.exists=true;this.name='';this.type=Phaser.TEXT;this.z=0;this.world=new Phaser.Point(x,y);this._text=text;this._font='';this._fontSize=32;this._fontWeight='normal';this._lineSpacing=0;this.events=new Phaser.Events(this);this.input=null;this.cameraOffset=new Phaser.Point();this.setStyle(style);PIXI.Text.call(this,text,this.style);this.position.set(x,y);this._cache=[0,0,0,0,1,0,1,0,0];};Phaser.Text.prototype=Object.create(PIXI.Text.prototype);Phaser.Text.prototype.constructor=Phaser.Text;Phaser.Text.prototype.preUpdate=function(){this._cache[0]=this.world.x;this._cache[1]=this.world.y;this._cache[2]=this.rotation;if(!this.exists||!this.parent.exists)
{this.renderOrderID=-1;return false;}
if(this.autoCull)
{this.renderable=this.game.world.camera.screenView.intersects(this.getBounds());}
this.world.setTo(this.game.camera.x+this.worldTransform[2],this.game.camera.y+this.worldTransform[5]);if(this.visible)
{this._cache[3]=this.game.stage.currentRenderOrderID++;}
for(var i=0,len=this.children.length;i<len;i++)
{this.children[i].preUpdate();}
return true;};Phaser.Text.prototype.update=function(){};Phaser.Text.prototype.postUpdate=function(){if(this._cache[7]===1)
{this.position.x=(this.game.camera.view.x+this.cameraOffset.x)/this.game.camera.scale.x;this.position.y=(this.game.camera.view.y+this.cameraOffset.y)/this.game.camera.scale.y;}
for(var i=0,len=this.children.length;i<len;i++)
{this.children[i].postUpdate();}};Phaser.Text.prototype.destroy=function(destroyChildren){if(this.game===null||this.destroyPhase){return;}
if(typeof destroyChildren==='undefined'){destroyChildren=true;}
this._cache[8]=1;if(this.parent)
{if(this.parent instanceof Phaser.Group)
{this.parent.remove(this);}
else
{this.parent.removeChild(this);}}
this.texture.destroy();if(this.canvas.parentNode)
{this.canvas.parentNode.removeChild(this.canvas);}
else
{this.canvas=null;this.context=null;}
var i=this.children.length;if(destroyChildren)
{while(i--)
{this.children[i].destroy(destroyChildren);}}
else
{while(i--)
{this.removeChild(this.children[i]);}}
this.exists=false;this.visible=false;this.filters=null;this.mask=null;this.game=null;this._cache[8]=0;};Phaser.Text.prototype.setShadow=function(x,y,color,blur){this.style.shadowOffsetX=x||0;this.style.shadowOffsetY=y||0;this.style.shadowColor=color||'rgba(0,0,0,0)';this.style.shadowBlur=blur||0;this.dirty=true;};Phaser.Text.prototype.setStyle=function(style){style=style||{};style.font=style.font||'bold 20pt Arial';style.fill=style.fill||'black';style.align=style.align||'left';style.stroke=style.stroke||'black';style.strokeThickness=style.strokeThickness||0;style.wordWrap=style.wordWrap||false;style.wordWrapWidth=style.wordWrapWidth||100;style.shadowOffsetX=style.shadowOffsetX||0;style.shadowOffsetY=style.shadowOffsetY||0;style.shadowColor=style.shadowColor||'rgba(0,0,0,0)';style.shadowBlur=style.shadowBlur||0;this.style=style;this.dirty=true;};Phaser.Text.prototype.updateText=function(){this.context.font=this.style.font;var outputText=this.text;if(this.style.wordWrap)
{outputText=this.runWordWrap(this.text);}
var lines=outputText.split(/(?:\r\n|\r|\n)/);var lineWidths=[];var maxLineWidth=0;for(var i=0;i<lines.length;i++)
{var lineWidth=this.context.measureText(lines[i]).width;lineWidths[i]=lineWidth;maxLineWidth=Math.max(maxLineWidth,lineWidth);}
this.canvas.width=maxLineWidth+this.style.strokeThickness;var lineHeight=this.determineFontHeight('font: '+this.style.font+';')+this.style.strokeThickness+this._lineSpacing+this.style.shadowOffsetY;this.canvas.height=lineHeight*lines.length;if(navigator.isCocoonJS)
{this.context.clearRect(0,0,this.canvas.width,this.canvas.height);}
this.context.fillStyle=this.style.fill;this.context.font=this.style.font;this.context.strokeStyle=this.style.stroke;this.context.lineWidth=this.style.strokeThickness;this.context.shadowOffsetX=this.style.shadowOffsetX;this.context.shadowOffsetY=this.style.shadowOffsetY;this.context.shadowColor=this.style.shadowColor;this.context.shadowBlur=this.style.shadowBlur;this.context.textBaseline='top';this.context.lineCap='round';this.context.lineJoin='round';for(i=0;i<lines.length;i++)
{var linePosition=new PIXI.Point(this.style.strokeThickness/2,this.style.strokeThickness/2+i*lineHeight);if(this.style.align==='right')
{linePosition.x+=maxLineWidth-lineWidths[i];}
else if(this.style.align==='center')
{linePosition.x+=(maxLineWidth-lineWidths[i])/2;}
linePosition.y+=this._lineSpacing;if(this.style.stroke&&this.style.strokeThickness)
{this.context.strokeText(lines[i],linePosition.x,linePosition.y);}
if(this.style.fill)
{this.context.fillText(lines[i],linePosition.x,linePosition.y);}}
this.updateTexture();};Phaser.Text.prototype.runWordWrap=function(text){var result='';var lines=text.split('\n');for(var i=0;i<lines.length;i++)
{var spaceLeft=this.style.wordWrapWidth;var words=lines[i].split(' ');for(var j=0;j<words.length;j++)
{var wordWidth=this.context.measureText(words[j]).width;var wordWidthWithSpace=wordWidth+this.context.measureText(' ').width;if(wordWidthWithSpace>spaceLeft)
{if(j>0)
{result+='\n';}
result+=words[j]+' ';spaceLeft=this.style.wordWrapWidth-wordWidth;}
else
{spaceLeft-=wordWidthWithSpace;result+=words[j]+' ';}}
if(i<lines.length-1)
{result+='\n';}}
return result;};Object.defineProperty(Phaser.Text.prototype,'angle',{get:function(){return Phaser.Math.radToDeg(this.rotation);},set:function(value){this.rotation=Phaser.Math.degToRad(value);}});Object.defineProperty(Phaser.Text.prototype,'text',{get:function(){return this._text;},set:function(value){if(value!==this._text)
{this._text=value.toString()||' ';this.dirty=true;this.updateTransform();}}});Object.defineProperty(Phaser.Text.prototype,'font',{get:function(){return this._font;},set:function(value){if(value!==this._font)
{this._font=value.trim();this.style.font=this._fontWeight+' '+this._fontSize+"px '"+this._font+"'";this.dirty=true;this.updateTransform();}}});Object.defineProperty(Phaser.Text.prototype,'fontSize',{get:function(){return this._fontSize;},set:function(value){value=parseInt(value,10);if(value!==this._fontSize)
{this._fontSize=value;this.style.font=this._fontWeight+' '+this._fontSize+"px '"+this._font+"'";this.dirty=true;this.updateTransform();}}});Object.defineProperty(Phaser.Text.prototype,'fontWeight',{get:function(){return this._fontWeight;},set:function(value){if(value!==this._fontWeight)
{this._fontWeight=value;this.style.font=this._fontWeight+' '+this._fontSize+"px '"+this._font+"'";this.dirty=true;this.updateTransform();}}});Object.defineProperty(Phaser.Text.prototype,'fill',{get:function(){return this.style.fill;},set:function(value){if(value!==this.style.fill)
{this.style.fill=value;this.dirty=true;}}});Object.defineProperty(Phaser.Text.prototype,'align',{get:function(){return this.style.align;},set:function(value){if(value!==this.style.align)
{this.style.align=value;this.dirty=true;}}});Object.defineProperty(Phaser.Text.prototype,'stroke',{get:function(){return this.style.stroke;},set:function(value){if(value!==this.style.stroke)
{this.style.stroke=value;this.dirty=true;}}});Object.defineProperty(Phaser.Text.prototype,'strokeThickness',{get:function(){return this.style.strokeThickness;},set:function(value){if(value!==this.style.strokeThickness)
{this.style.strokeThickness=value;this.dirty=true;}}});Object.defineProperty(Phaser.Text.prototype,'wordWrap',{get:function(){return this.style.wordWrap;},set:function(value){if(value!==this.style.wordWrap)
{this.style.wordWrap=value;this.dirty=true;}}});Object.defineProperty(Phaser.Text.prototype,'wordWrapWidth',{get:function(){return this.style.wordWrapWidth;},set:function(value){if(value!==this.style.wordWrapWidth)
{this.style.wordWrapWidth=value;this.dirty=true;}}});Object.defineProperty(Phaser.Text.prototype,'lineSpacing',{get:function(){return this._lineSpacing;},set:function(value){if(value!==this._lineSpacing)
{this._lineSpacing=parseFloat(value);this.dirty=true;this.updateTransform();}}});Object.defineProperty(Phaser.Text.prototype,'shadowOffsetX',{get:function(){return this.style.shadowOffsetX;},set:function(value){if(value!==this.style.shadowOffsetX)
{this.style.shadowOffsetX=value;this.dirty=true;}}});Object.defineProperty(Phaser.Text.prototype,'shadowOffsetY',{get:function(){return this.style.shadowOffsetY;},set:function(value){if(value!==this.style.shadowOffsetY)
{this.style.shadowOffsetY=value;this.dirty=true;}}});Object.defineProperty(Phaser.Text.prototype,'shadowColor',{get:function(){return this.style.shadowColor;},set:function(value){if(value!==this.style.shadowColor)
{this.style.shadowColor=value;this.dirty=true;}}});Object.defineProperty(Phaser.Text.prototype,'shadowBlur',{get:function(){return this.style.shadowBlur;},set:function(value){if(value!==this.style.shadowBlur)
{this.style.shadowBlur=value;this.dirty=true;}}});Object.defineProperty(Phaser.Text.prototype,"inputEnabled",{get:function(){return(this.input&&this.input.enabled);},set:function(value){if(value)
{if(this.input===null)
{this.input=new Phaser.InputHandler(this);this.input.start();}
else if(this.input&&!this.input.enabled)
{this.input.start();}}
else
{if(this.input&&this.input.enabled)
{this.input.stop();}}}});Object.defineProperty(Phaser.Text.prototype,"fixedToCamera",{get:function(){return!!this._cache[7];},set:function(value){if(value)
{this._cache[7]=1;this.cameraOffset.set(this.x,this.y);}
else
{this._cache[7]=0;}}});Object.defineProperty(Phaser.Text.prototype,"destroyPhase",{get:function(){return!!this._cache[8];}});Phaser.BitmapText=function(game,x,y,font,text,size){x=x||0;y=y||0;font=font||'';text=text||'';size=size||32;this.game=game;this.exists=true;this.name='';this.type=Phaser.BITMAPTEXT;this.z=0;this.world=new Phaser.Point(x,y);this._text=text;this._font=font;this._fontSize=size;this._align='left';this._tint=0xFFFFFF;this.events=new Phaser.Events(this);this.input=null;this.cameraOffset=new Phaser.Point();PIXI.BitmapText.call(this,text);this.position.set(x,y);this._cache=[0,0,0,0,1,0,1,0,0];};Phaser.BitmapText.prototype=Object.create(PIXI.BitmapText.prototype);Phaser.BitmapText.prototype.constructor=Phaser.BitmapText;Phaser.BitmapText.prototype.setStyle=function(){this.style={align:this._align};this.fontName=this._font;this.fontSize=this._fontSize;this.dirty=true;};Phaser.BitmapText.prototype.preUpdate=function(){this._cache[0]=this.world.x;this._cache[1]=this.world.y;this._cache[2]=this.rotation;if(!this.exists||!this.parent.exists)
{this.renderOrderID=-1;return false;}
if(this.autoCull)
{this.renderable=this.game.world.camera.screenView.intersects(this.getBounds());}
this.world.setTo(this.game.camera.x+this.worldTransform[2],this.game.camera.y+this.worldTransform[5]);if(this.visible)
{this._cache[3]=this.game.stage.currentRenderOrderID++;}
return true;};Phaser.BitmapText.prototype.update=function(){};Phaser.BitmapText.prototype.postUpdate=function(){if(this._cache[7]===1)
{this.position.x=(this.game.camera.view.x+this.cameraOffset.x)/this.game.camera.scale.x;this.position.y=(this.game.camera.view.y+this.cameraOffset.y)/this.game.camera.scale.y;}};Phaser.BitmapText.prototype.destroy=function(destroyChildren){if(this.game===null||this.destroyPhase){return;}
if(typeof destroyChildren==='undefined'){destroyChildren=true;}
this._cache[8]=1;if(this.parent)
{if(this.parent instanceof Phaser.Group)
{this.parent.remove(this);}
else
{this.parent.removeChild(this);}}
var i=this.children.length;if(destroyChildren)
{while(i--)
{if(this.children[i].destroy)
{this.children[i].destroy(destroyChildren);}
else
{this.removeChild(this.children[i]);}}}
else
{while(i--)
{this.removeChild(this.children[i]);}}
this.exists=false;this.visible=false;this.filters=null;this.mask=null;this.game=null;this._cache[8]=0;};Object.defineProperty(Phaser.BitmapText.prototype,'align',{get:function(){return this._align;},set:function(value){if(value!==this._align)
{this._align=value;this.setStyle();}}});Object.defineProperty(Phaser.BitmapText.prototype,'tint',{get:function(){return this._tint;},set:function(value){if(value!==this._tint)
{this._tint=value;this.dirty=true;}}});Object.defineProperty(Phaser.BitmapText.prototype,'angle',{get:function(){return Phaser.Math.radToDeg(this.rotation);},set:function(value){this.rotation=Phaser.Math.degToRad(value);}});Object.defineProperty(Phaser.BitmapText.prototype,'font',{get:function(){return this._font;},set:function(value){if(value!==this._font)
{this._font=value.trim();this.style.font=this._fontSize+"px '"+this._font+"'";this.dirty=true;}}});Object.defineProperty(Phaser.BitmapText.prototype,'fontSize',{get:function(){return this._fontSize;},set:function(value){value=parseInt(value,10);if(value!==this._fontSize)
{this._fontSize=value;this.style.font=this._fontSize+"px '"+this._font+"'";this.dirty=true;}}});Object.defineProperty(Phaser.BitmapText.prototype,'text',{get:function(){return this._text;},set:function(value){if(value!==this._text)
{this._text=value.toString()||' ';this.dirty=true;}}});Object.defineProperty(Phaser.BitmapText.prototype,"inputEnabled",{get:function(){return(this.input&&this.input.enabled);},set:function(value){if(value)
{if(this.input===null)
{this.input=new Phaser.InputHandler(this);this.input.start();}
else if(this.input&&!this.input.enabled)
{this.input.start();}}
else
{if(this.input&&this.input.enabled)
{this.input.stop();}}}});Object.defineProperty(Phaser.BitmapText.prototype,"fixedToCamera",{get:function(){return!!this._cache[7];},set:function(value){if(value)
{this._cache[7]=1;this.cameraOffset.set(this.x,this.y);}
else
{this._cache[7]=0;}}});Object.defineProperty(Phaser.BitmapText.prototype,"destroyPhase",{get:function(){return!!this._cache[8];}});Phaser.Button=function(game,x,y,key,callback,callbackContext,overFrame,outFrame,downFrame,upFrame){x=x||0;y=y||0;key=key||null;callback=callback||null;callbackContext=callbackContext||this;Phaser.Image.call(this,game,x,y,key,outFrame);this.type=Phaser.BUTTON;this._onOverFrameName=null;this._onOutFrameName=null;this._onDownFrameName=null;this._onUpFrameName=null;this._onOverFrameID=null;this._onOutFrameID=null;this._onDownFrameID=null;this._onUpFrameID=null;this.onOverSound=null;this.onOutSound=null;this.onDownSound=null;this.onUpSound=null;this.onOverSoundMarker='';this.onOutSoundMarker='';this.onDownSoundMarker='';this.onUpSoundMarker='';this.onInputOver=new Phaser.Signal();this.onInputOut=new Phaser.Signal();this.onInputDown=new Phaser.Signal();this.onInputUp=new Phaser.Signal();this.freezeFrames=false;this.forceOut=false;this.inputEnabled=true;this.input.start(0,true);this.setFrames(overFrame,outFrame,downFrame,upFrame);if(callback!==null)
{this.onInputUp.add(callback,callbackContext);}
this.events.onInputOver.add(this.onInputOverHandler,this);this.events.onInputOut.add(this.onInputOutHandler,this);this.events.onInputDown.add(this.onInputDownHandler,this);this.events.onInputUp.add(this.onInputUpHandler,this);};Phaser.Button.prototype=Object.create(Phaser.Image.prototype);Phaser.Button.prototype.constructor=Phaser.Button;Phaser.Button.prototype.clearFrames=function(){this._onOverFrameName=null;this._onOverFrameID=null;this._onOutFrameName=null;this._onOutFrameID=null;this._onDownFrameName=null;this._onDownFrameID=null;this._onUpFrameName=null;this._onUpFrameID=null;};Phaser.Button.prototype.setFrames=function(overFrame,outFrame,downFrame,upFrame){this.clearFrames();if(overFrame!==null)
{if(typeof overFrame==='string')
{this._onOverFrameName=overFrame;if(this.input.pointerOver())
{this.frameName=overFrame;}}
else
{this._onOverFrameID=overFrame;if(this.input.pointerOver())
{this.frame=overFrame;}}}
if(outFrame!==null)
{if(typeof outFrame==='string')
{this._onOutFrameName=outFrame;if(this.input.pointerOver()===false)
{this.frameName=outFrame;}}
else
{this._onOutFrameID=outFrame;if(this.input.pointerOver()===false)
{this.frame=outFrame;}}}
if(downFrame!==null)
{if(typeof downFrame==='string')
{this._onDownFrameName=downFrame;if(this.input.pointerDown())
{this.frameName=downFrame;}}
else
{this._onDownFrameID=downFrame;if(this.input.pointerDown())
{this.frame=downFrame;}}}
if(upFrame!==null)
{if(typeof upFrame==='string')
{this._onUpFrameName=upFrame;if(this.input.pointerUp())
{this.frameName=upFrame;}}
else
{this._onUpFrameID=upFrame;if(this.input.pointerUp())
{this.frame=upFrame;}}}};Phaser.Button.prototype.setSounds=function(overSound,overMarker,downSound,downMarker,outSound,outMarker,upSound,upMarker){this.setOverSound(overSound,overMarker);this.setOutSound(outSound,outMarker);this.setDownSound(downSound,downMarker);this.setUpSound(upSound,upMarker);};Phaser.Button.prototype.setOverSound=function(sound,marker){this.onOverSound=null;this.onOverSoundMarker='';if(sound instanceof Phaser.Sound)
{this.onOverSound=sound;}
if(typeof marker==='string')
{this.onOverSoundMarker=marker;}};Phaser.Button.prototype.setOutSound=function(sound,marker){this.onOutSound=null;this.onOutSoundMarker='';if(sound instanceof Phaser.Sound)
{this.onOutSound=sound;}
if(typeof marker==='string')
{this.onOutSoundMarker=marker;}};Phaser.Button.prototype.setDownSound=function(sound,marker){this.onDownSound=null;this.onDownSoundMarker='';if(sound instanceof Phaser.Sound)
{this.onDownSound=sound;}
if(typeof marker==='string')
{this.onDownSoundMarker=marker;}};Phaser.Button.prototype.setUpSound=function(sound,marker){this.onUpSound=null;this.onUpSoundMarker='';if(sound instanceof Phaser.Sound)
{this.onUpSound=sound;}
if(typeof marker==='string')
{this.onUpSoundMarker=marker;}};Phaser.Button.prototype.onInputOverHandler=function(sprite,pointer){if(this.freezeFrames===false)
{this.setState(1);}
if(this.onOverSound)
{this.onOverSound.play(this.onOverSoundMarker);}
if(this.onInputOver)
{this.onInputOver.dispatch(this,pointer);}};Phaser.Button.prototype.onInputOutHandler=function(sprite,pointer){if(this.freezeFrames===false)
{this.setState(2);}
if(this.onOutSound)
{this.onOutSound.play(this.onOutSoundMarker);}
if(this.onInputOut)
{this.onInputOut.dispatch(this,pointer);}};Phaser.Button.prototype.onInputDownHandler=function(sprite,pointer){if(this.freezeFrames===false)
{this.setState(3);}
if(this.onDownSound)
{this.onDownSound.play(this.onDownSoundMarker);}
if(this.onInputDown)
{this.onInputDown.dispatch(this,pointer);}};Phaser.Button.prototype.onInputUpHandler=function(sprite,pointer,isOver){if(this.onUpSound)
{this.onUpSound.play(this.onUpSoundMarker);}
if(this.onInputUp)
{this.onInputUp.dispatch(this,pointer,isOver);}
if(this.freezeFrames)
{return;}
if(this.forceOut)
{this.setState(2);}
else
{if(this._onUpFrameName!==null||this._onUpFrameID!==null)
{this.setState(4);}
else
{if(isOver)
{this.setState(1);}
else
{this.setState(2);}}}};Phaser.Button.prototype.setState=function(newState){if(newState===1)
{if(this._onOverFrameName!=null)
{this.frameName=this._onOverFrameName;}
else if(this._onOverFrameID!=null)
{this.frame=this._onOverFrameID;}}
else if(newState===2)
{if(this._onOutFrameName!=null)
{this.frameName=this._onOutFrameName;}
else if(this._onOutFrameID!=null)
{this.frame=this._onOutFrameID;}}
else if(newState===3)
{if(this._onDownFrameName!=null)
{this.frameName=this._onDownFrameName;}
else if(this._onDownFrameID!=null)
{this.frame=this._onDownFrameID;}}
else if(newState===4)
{if(this._onUpFrameName!=null)
{this.frameName=this._onUpFrameName;}
else if(this._onUpFrameID!=null)
{this.frame=this._onUpFrameID;}}};Phaser.Graphics=function(game,x,y){x=x||0;y=y||0;this.game=game;this.exists=true;this.name='';this.type=Phaser.GRAPHICS;this.z=0;this.world=new Phaser.Point(x,y);this.cameraOffset=new Phaser.Point();PIXI.Graphics.call(this);this.position.set(x,y);this._cache=[0,0,0,0,1,0,1,0,0];};Phaser.Graphics.prototype=Object.create(PIXI.Graphics.prototype);Phaser.Graphics.prototype.constructor=Phaser.Graphics;Phaser.Graphics.prototype.preUpdate=function(){this._cache[0]=this.world.x;this._cache[1]=this.world.y;this._cache[2]=this.rotation;if(!this.exists||!this.parent.exists)
{this.renderOrderID=-1;return false;}
if(this.autoCull)
{this.renderable=this.game.world.camera.screenView.intersects(this.getBounds());}
this.world.setTo(this.game.camera.x+this.worldTransform[2],this.game.camera.y+this.worldTransform[5]);if(this.visible)
{this._cache[3]=this.game.stage.currentRenderOrderID++;}
return true;};Phaser.Graphics.prototype.update=function(){};Phaser.Graphics.prototype.postUpdate=function(){if(this._cache[7]===1)
{this.position.x=(this.game.camera.view.x+this.cameraOffset.x)/this.game.camera.scale.x;this.position.y=(this.game.camera.view.y+this.cameraOffset.y)/this.game.camera.scale.y;}};Phaser.Graphics.prototype.destroy=function(destroyChildren){if(this.game===null||this.destroyPhase){return;}
if(typeof destroyChildren==='undefined'){destroyChildren=true;}
this._cache[8]=1;this.clear();if(this.parent)
{if(this.parent instanceof Phaser.Group)
{this.parent.remove(this);}
else
{this.parent.removeChild(this);}}
var i=this.children.length;if(destroyChildren)
{while(i--)
{this.children[i].destroy(destroyChildren);}}
else
{while(i--)
{this.removeChild(this.children[i]);}}
this.exists=false;this.visible=false;this.game=null;this._cache[8]=0;};Phaser.Graphics.prototype.drawPolygon=function(poly){this.moveTo(poly.points[0].x,poly.points[0].y);for(var i=1;i<poly.points.length;i+=1)
{this.lineTo(poly.points[i].x,poly.points[i].y);}
this.lineTo(poly.points[0].x,poly.points[0].y);};Object.defineProperty(Phaser.Graphics.prototype,'angle',{get:function(){return Phaser.Math.radToDeg(this.rotation);},set:function(value){this.rotation=Phaser.Math.degToRad(value);}});Object.defineProperty(Phaser.Graphics.prototype,"fixedToCamera",{get:function(){return!!this._cache[7];},set:function(value){if(value)
{this._cache[7]=1;this.cameraOffset.set(this.x,this.y);}
else
{this._cache[7]=0;}}});Object.defineProperty(Phaser.Graphics.prototype,"destroyPhase",{get:function(){return!!this._cache[8];}});Phaser.RenderTexture=function(game,width,height,key){this.game=game;this.key=key;this.type=Phaser.RENDERTEXTURE;this._temp=new Phaser.Point();PIXI.RenderTexture.call(this,width,height);};Phaser.RenderTexture.prototype=Object.create(PIXI.RenderTexture.prototype);Phaser.RenderTexture.prototype.constructor=Phaser.RenderTexture;Phaser.RenderTexture.prototype.renderXY=function(displayObject,x,y,clear){this._temp.set(x,y);this.render(displayObject,this._temp,clear);};Phaser.SpriteBatch=function(game,parent,name,addToStage){PIXI.SpriteBatch.call(this);Phaser.Group.call(this,game,parent,name,addToStage);this.type=Phaser.SPRITEBATCH;};Phaser.SpriteBatch.prototype=Phaser.Utils.extend(true,Phaser.SpriteBatch.prototype,Phaser.Group.prototype,PIXI.SpriteBatch.prototype);Phaser.SpriteBatch.prototype.constructor=Phaser.SpriteBatch;Phaser.RetroFont=function(game,key,characterWidth,characterHeight,chars,charsPerRow,xSpacing,ySpacing,xOffset,yOffset){this.characterWidth=characterWidth;this.characterHeight=characterHeight;this.characterSpacingX=xSpacing||0;this.characterSpacingY=ySpacing||0;this.characterPerRow=charsPerRow;this.offsetX=xOffset||0;this.offsetY=yOffset||0;this.align="left";this.multiLine=false;this.autoUpperCase=true;this.customSpacingX=0;this.customSpacingY=0;this.fixedWidth=0;this.fontSet=game.cache.getImage(key);this._text='';this.grabData=[];var currentX=this.offsetX;var currentY=this.offsetY;var r=0;var data=new Phaser.FrameData();for(var c=0;c<chars.length;c++)
{var uuid=game.rnd.uuid();var frame=data.addFrame(new Phaser.Frame(c,currentX,currentY,this.characterWidth,this.characterHeight,'',uuid));this.grabData[chars.charCodeAt(c)]=frame.index;PIXI.TextureCache[uuid]=new PIXI.Texture(PIXI.BaseTextureCache[key],{x:currentX,y:currentY,width:this.characterWidth,height:this.characterHeight});r++;if(r==this.characterPerRow)
{r=0;currentX=this.offsetX;currentY+=this.characterHeight+this.characterSpacingY;}
else
{currentX+=this.characterWidth+this.characterSpacingX;}}
game.cache.updateFrameData(key,data);this.stamp=new Phaser.Image(game,0,0,key,0);Phaser.RenderTexture.call(this,game);this.type=Phaser.RETROFONT;};Phaser.RetroFont.prototype=Object.create(Phaser.RenderTexture.prototype);Phaser.RetroFont.prototype.constructor=Phaser.RetroFont;Phaser.RetroFont.ALIGN_LEFT="left";Phaser.RetroFont.ALIGN_RIGHT="right";Phaser.RetroFont.ALIGN_CENTER="center";Phaser.RetroFont.TEXT_SET1=" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";Phaser.RetroFont.TEXT_SET2=" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ";Phaser.RetroFont.TEXT_SET3="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";Phaser.RetroFont.TEXT_SET4="ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789";Phaser.RetroFont.TEXT_SET5="ABCDEFGHIJKLMNOPQRSTUVWXYZ.,/() '!?-*:0123456789";Phaser.RetroFont.TEXT_SET6="ABCDEFGHIJKLMNOPQRSTUVWXYZ!?:;0123456789\"(),-.' ";Phaser.RetroFont.TEXT_SET7="AGMSY+:4BHNTZ!;5CIOU.?06DJPV,(17EKQW\")28FLRX-'39";Phaser.RetroFont.TEXT_SET8="0123456789 .ABCDEFGHIJKLMNOPQRSTUVWXYZ";Phaser.RetroFont.TEXT_SET9="ABCDEFGHIJKLMNOPQRSTUVWXYZ()-0123456789.:,'\"?!";Phaser.RetroFont.TEXT_SET10="ABCDEFGHIJKLMNOPQRSTUVWXYZ";Phaser.RetroFont.TEXT_SET11="ABCDEFGHIJKLMNOPQRSTUVWXYZ.,\"-+!?()':;0123456789";Phaser.RetroFont.prototype.setFixedWidth=function(width,lineAlignment){if(typeof lineAlignment==='undefined'){lineAlignment='left';}
this.fixedWidth=width;this.align=lineAlignment;};Phaser.RetroFont.prototype.setText=function(content,multiLine,characterSpacing,lineSpacing,lineAlignment,allowLowerCase){this.multiLine=multiLine||false;this.customSpacingX=characterSpacing||0;this.customSpacingY=lineSpacing||0;this.align=lineAlignment||'left';if(allowLowerCase)
{this.autoUpperCase=false;}
else
{this.autoUpperCase=true;}
if(content.length>0)
{this.text=content;}};Phaser.RetroFont.prototype.resize=function(width,height){this.width=width;this.height=height;this.frame.width=this.width;this.frame.height=this.height;this.baseTexture.width=this.width;this.baseTexture.height=this.height;if(this.renderer.type===PIXI.WEBGL_RENDERER)
{this.projection.x=this.width/2;this.projection.y=-this.height/2;var gl=this.renderer.gl;gl.bindTexture(gl.TEXTURE_2D,this.baseTexture._glTextures[gl.id]);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,this.width,this.height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);}
else
{this.textureBuffer.resize(this.width,this.height);}
PIXI.Texture.frameUpdates.push(this);};Phaser.RetroFont.prototype.buildRetroFontText=function(){var cx=0;var cy=0;if(this.multiLine)
{var lines=this._text.split("\n");if(this.fixedWidth>0)
{this.resize(this.fixedWidth,(lines.length*(this.characterHeight+this.customSpacingY))-this.customSpacingY);}
else
{this.resize(this.getLongestLine()*(this.characterWidth+this.customSpacingX),(lines.length*(this.characterHeight+this.customSpacingY))-this.customSpacingY);}
this.textureBuffer.clear();for(var i=0;i<lines.length;i++)
{switch(this.align)
{case Phaser.RetroFont.ALIGN_LEFT:cx=0;break;case Phaser.RetroFont.ALIGN_RIGHT:cx=this.width-(lines[i].length*(this.characterWidth+this.customSpacingX));break;case Phaser.RetroFont.ALIGN_CENTER:cx=(this.width/2)-((lines[i].length*(this.characterWidth+this.customSpacingX))/2);cx+=this.customSpacingX/2;break;}
if(cx<0)
{cx=0;}
this.pasteLine(lines[i],cx,cy,this.customSpacingX);cy+=this.characterHeight+this.customSpacingY;}}
else
{if(this.fixedWidth>0)
{this.resize(this.fixedWidth,this.characterHeight);}
else
{this.resize(this._text.length*(this.characterWidth+this.customSpacingX),this.characterHeight);}
this.textureBuffer.clear();switch(this.align)
{case Phaser.RetroFont.ALIGN_LEFT:cx=0;break;case Phaser.RetroFont.ALIGN_RIGHT:cx=this.width-(this._text.length*(this.characterWidth+this.customSpacingX));break;case Phaser.RetroFont.ALIGN_CENTER:cx=(this.width/2)-((this._text.length*(this.characterWidth+this.customSpacingX))/2);cx+=this.customSpacingX/2;break;}
this.pasteLine(this._text,cx,0,this.customSpacingX);}};Phaser.RetroFont.prototype.pasteLine=function(line,x,y,customSpacingX){var p=new Phaser.Point();for(var c=0;c<line.length;c++)
{if(line.charAt(c)==" ")
{x+=this.characterWidth+customSpacingX;}
else
{if(this.grabData[line.charCodeAt(c)]>=0)
{this.stamp.frame=this.grabData[line.charCodeAt(c)];p.set(x,y);this.render(this.stamp,p,false);x+=this.characterWidth+customSpacingX;if(x>this.width)
{break;}}}}};Phaser.RetroFont.prototype.getLongestLine=function(){var longestLine=0;if(this._text.length>0)
{var lines=this._text.split("\n");for(var i=0;i<lines.length;i++)
{if(lines[i].length>longestLine)
{longestLine=lines[i].length;}}}
return longestLine;};Phaser.RetroFont.prototype.removeUnsupportedCharacters=function(stripCR){var newString="";for(var c=0;c<this._text.length;c++)
{var aChar=this._text[c];var code=aChar.charCodeAt(0);if(this.grabData[code]>=0||(!stripCR&&aChar==="\n"))
{newString=newString.concat(aChar);}}
return newString;};Object.defineProperty(Phaser.RetroFont.prototype,"text",{get:function(){return this._text;},set:function(value){var newText;if(this.autoUpperCase)
{newText=value.toUpperCase();}
else
{newText=value;}
if(newText!==this._text)
{this._text=newText;this.removeUnsupportedCharacters(this.multiLine);this.buildRetroFontText();}}});Phaser.Particle=function(game,x,y,key,frame){Phaser.Sprite.call(this,game,x,y,key,frame);this.autoScale=false;this.scaleData=null;this._s=0;this.autoAlpha=false;this.alphaData=null;this._a=0;};Phaser.Particle.prototype=Object.create(Phaser.Sprite.prototype);Phaser.Particle.prototype.constructor=Phaser.Particle;Phaser.Particle.prototype.update=function(){if(this.autoScale)
{this._s--;if(this._s)
{this.scale.set(this.scaleData[this._s].x,this.scaleData[this._s].y);}
else
{this.autoScale=false;}}
if(this.autoAlpha)
{this._a--;if(this._a)
{this.alpha=this.alphaData[this._a].v;}
else
{this.autoAlpha=false;}}};Phaser.Particle.prototype.onEmit=function(){};Phaser.Particle.prototype.setAlphaData=function(data){this.alphaData=data;this._a=data.length-1;this.alpha=this.alphaData[this._a].v;this.autoAlpha=true;};Phaser.Particle.prototype.setScaleData=function(data){this.scaleData=data;this._s=data.length-1;this.scale.set(this.scaleData[this._s].x,this.scaleData[this._s].y);this.autoScale=true;};Phaser.Particle.prototype.reset=function(x,y,health){if(typeof health==='undefined'){health=1;}
this.world.setTo(x,y);this.position.x=x;this.position.y=y;this.alive=true;this.exists=true;this.visible=true;this.renderable=true;this._outOfBoundsFired=false;this.health=health;if(this.body)
{this.body.reset(x,y,false,false);}
this._cache[4]=1;this.alpha=1;this.scale.set(1);this.autoScale=false;this.autoAlpha=false;return this;};Phaser.Canvas={create:function(width,height,id,noCocoon){if(typeof noCocoon==='undefined'){noCocoon=false;}
width=width||256;height=height||256;if(noCocoon)
{var canvas=document.createElement('canvas');}
else
{var canvas=document.createElement(navigator.isCocoonJS?'screencanvas':'canvas');}
if(typeof id==='string'&&id!=='')
{canvas.id=id;}
canvas.width=width;canvas.height=height;canvas.style.display='block';return canvas;},getOffset:function(element,point){point=point||new Phaser.Point();var box=element.getBoundingClientRect();var clientTop=element.clientTop||document.body.clientTop||0;var clientLeft=element.clientLeft||document.body.clientLeft||0;var scrollTop=0;var scrollLeft=0;if(document.compatMode==='CSS1Compat')
{scrollTop=window.pageYOffset||document.documentElement.scrollTop||element.scrollTop||0;scrollLeft=window.pageXOffset||document.documentElement.scrollLeft||element.scrollLeft||0;}
else
{scrollTop=window.pageYOffset||document.body.scrollTop||element.scrollTop||0;scrollLeft=window.pageXOffset||document.body.scrollLeft||element.scrollLeft||0;}
point.x=box.left+scrollLeft-clientLeft;point.y=box.top+scrollTop-clientTop;return point;},getAspectRatio:function(canvas){return canvas.width/canvas.height;},setBackgroundColor:function(canvas,color){color=color||'rgb(0,0,0)';canvas.style.backgroundColor=color;return canvas;},setTouchAction:function(canvas,value){value=value||'none';canvas.style.msTouchAction=value;canvas.style['ms-touch-action']=value;canvas.style['touch-action']=value;return canvas;},setUserSelect:function(canvas,value){value=value||'none';canvas.style['-webkit-touch-callout']=value;canvas.style['-webkit-user-select']=value;canvas.style['-khtml-user-select']=value;canvas.style['-moz-user-select']=value;canvas.style['-ms-user-select']=value;canvas.style['user-select']=value;canvas.style['-webkit-tap-highlight-color']='rgba(0, 0, 0, 0)';return canvas;},addToDOM:function(canvas,parent,overflowHidden){var target;if(typeof overflowHidden==='undefined'){overflowHidden=true;}
if(parent)
{if(typeof parent==='string')
{target=document.getElementById(parent);}
else if(typeof parent==='object'&&parent.nodeType===1)
{target=parent;}}
if(!target)
{target=document.body;}
if(overflowHidden&&target.style)
{target.style.overflow='hidden';}
target.appendChild(canvas);return canvas;},setTransform:function(context,translateX,translateY,scaleX,scaleY,skewX,skewY){context.setTransform(scaleX,skewX,skewY,scaleY,translateX,translateY);return context;},setSmoothingEnabled:function(context,value){context['imageSmoothingEnabled']=value;context['mozImageSmoothingEnabled']=value;context['oImageSmoothingEnabled']=value;context['webkitImageSmoothingEnabled']=value;context['msImageSmoothingEnabled']=value;return context;},setImageRenderingCrisp:function(canvas){canvas.style['image-rendering']='optimizeSpeed';canvas.style['image-rendering']='crisp-edges';canvas.style['image-rendering']='-moz-crisp-edges';canvas.style['image-rendering']='-webkit-optimize-contrast';canvas.style['image-rendering']='optimize-contrast';canvas.style.msInterpolationMode='nearest-neighbor';return canvas;},setImageRenderingBicubic:function(canvas){canvas.style['image-rendering']='auto';canvas.style.msInterpolationMode='bicubic';return canvas;}};Phaser.Device=function(game){this.game=game;this.desktop=false;this.iOS=false;this.cocoonJS=false;this.ejecta=false;this.crosswalk=false;this.android=false;this.chromeOS=false;this.linux=false;this.macOS=false;this.windows=false;this.windowsPhone=false;this.canvas=false;this.file=false;this.fileSystem=false;this.localStorage=false;this.webGL=false;this.worker=false;this.touch=false;this.mspointer=false;this.css3D=false;this.pointerLock=false;this.typedArray=false;this.vibration=false;this.getUserMedia=false;this.quirksMode=false;this.arora=false;this.chrome=false;this.epiphany=false;this.firefox=false;this.ie=false;this.ieVersion=0;this.trident=false;this.tridentVersion=0;this.mobileSafari=false;this.midori=false;this.opera=false;this.safari=false;this.webApp=false;this.silk=false;this.audioData=false;this.webAudio=false;this.ogg=false;this.opus=false;this.mp3=false;this.wav=false;this.m4a=false;this.webm=false;this.iPhone=false;this.iPhone4=false;this.iPad=false;this.pixelRatio=0;this.littleEndian=false;this.support32bit=false;this.fullscreen=false;this.requestFullscreen='';this.cancelFullscreen='';this.fullscreenKeyboard=false;this._checkAudio();this._checkBrowser();this._checkCSS3D();this._checkDevice();this._checkFeatures();this._checkOS();};Phaser.Device.LITTLE_ENDIAN=false;Phaser.Device.prototype={_checkOS:function(){var ua=navigator.userAgent;if(/Android/.test(ua))
{this.android=true;}
else if(/CrOS/.test(ua))
{this.chromeOS=true;}
else if(/iP[ao]d|iPhone/i.test(ua))
{this.iOS=true;}
else if(/Linux/.test(ua))
{this.linux=true;}
else if(/Mac OS/.test(ua))
{this.macOS=true;}
else if(/Windows/.test(ua))
{this.windows=true;if(/Windows Phone/i.test(ua))
{this.windowsPhone=true;}}
if(this.windows||this.macOS||(this.linux&&this.silk===false))
{this.desktop=true;}
if(this.windowsPhone||((/Windows NT/i.test(ua))&&(/Touch/i.test(ua))))
{this.desktop=false;}},_checkFeatures:function(){this.canvas=!!window['CanvasRenderingContext2D']||this.cocoonJS;try{this.localStorage=!!localStorage.getItem;}catch(error){this.localStorage=false;}
this.file=!!window['File']&&!!window['FileReader']&&!!window['FileList']&&!!window['Blob'];this.fileSystem=!!window['requestFileSystem'];this.webGL=(function(){try{var canvas=document.createElement('canvas');return!!window.WebGLRenderingContext&&(canvas.getContext('webgl')||canvas.getContext('experimental-webgl'));}catch(e){return false;}})();if(this.webGL===null||this.webGL===false)
{this.webGL=false;}
else
{this.webGL=true;}
this.worker=!!window['Worker'];if('ontouchstart'in document.documentElement||(window.navigator.maxTouchPoints&&window.navigator.maxTouchPoints>1))
{this.touch=true;}
if(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)
{this.mspointer=true;}
this.pointerLock='pointerLockElement'in document||'mozPointerLockElement'in document||'webkitPointerLockElement'in document;this.quirksMode=(document.compatMode==='CSS1Compat')?false:true;this.getUserMedia=!!(navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia);},checkFullScreenSupport:function(){var fs=['requestFullscreen','requestFullScreen','webkitRequestFullscreen','webkitRequestFullScreen','msRequestFullscreen','msRequestFullScreen','mozRequestFullScreen','mozRequestFullscreen'];for(var i=0;i<fs.length;i++)
{if(this.game.canvas[fs[i]])
{this.fullscreen=true;this.requestFullscreen=fs[i];}}
var cfs=['cancelFullScreen','exitFullscreen','webkitCancelFullScreen','webkitExitFullscreen','msCancelFullScreen','msExitFullscreen','mozCancelFullScreen','mozExitFullscreen'];if(this.fullscreen)
{for(var i=0;i<cfs.length;i++)
{if(this.game.canvas[cfs[i]])
{this.cancelFullscreen=cfs[i];}}}
if(window['Element']&&Element['ALLOW_KEYBOARD_INPUT'])
{this.fullscreenKeyboard=true;}},_checkBrowser:function(){var ua=navigator.userAgent;if(/Arora/.test(ua))
{this.arora=true;}
else if(/Chrome/.test(ua))
{this.chrome=true;}
else if(/Epiphany/.test(ua))
{this.epiphany=true;}
else if(/Firefox/.test(ua))
{this.firefox=true;}
else if(/Mobile Safari/.test(ua))
{this.mobileSafari=true;}
else if(/MSIE (\d+\.\d+);/.test(ua))
{this.ie=true;this.ieVersion=parseInt(RegExp.$1,10);}
else if(/Midori/.test(ua))
{this.midori=true;}
else if(/Opera/.test(ua))
{this.opera=true;}
else if(/Safari/.test(ua))
{this.safari=true;}
else if(/Silk/.test(ua))
{this.silk=true;}
else if(/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(ua))
{this.ie=true;this.trident=true;this.tridentVersion=parseInt(RegExp.$1,10);this.ieVersion=parseInt(RegExp.$3,10);}
if(navigator['standalone'])
{this.webApp=true;}
if(navigator['isCocoonJS'])
{this.cocoonJS=true;}
if(typeof window.ejecta!=="undefined")
{this.ejecta=true;}
if(/Crosswalk/.test(ua))
{this.crosswalk=true;}},_checkAudio:function(){this.audioData=!!(window['Audio']);this.webAudio=!!(window['webkitAudioContext']||window['AudioContext']);var audioElement=document.createElement('audio');var result=false;try{if(result=!!audioElement.canPlayType){if(audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'')){this.ogg=true;}
if(audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,'')){this.opus=true;}
if(audioElement.canPlayType('audio/mpeg;').replace(/^no$/,'')){this.mp3=true;}
if(audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/,'')){this.wav=true;}
if(audioElement.canPlayType('audio/x-m4a;')||audioElement.canPlayType('audio/aac;').replace(/^no$/,'')){this.m4a=true;}
if(audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,'')){this.webm=true;}}}catch(e){}},_checkDevice:function(){this.pixelRatio=window['devicePixelRatio']||1;this.iPhone=navigator.userAgent.toLowerCase().indexOf('iphone')!=-1;this.iPhone4=(this.pixelRatio==2&&this.iPhone);this.iPad=navigator.userAgent.toLowerCase().indexOf('ipad')!=-1;if(typeof Int8Array!=='undefined')
{this.typedArray=true;}
else
{this.typedArray=false;}
if(typeof ArrayBuffer!=='undefined'&&typeof Uint8Array!=='undefined'&&typeof Uint32Array!=='undefined')
{this.littleEndian=this._checkIsLittleEndian();Phaser.Device.LITTLE_ENDIAN=this.littleEndian;}
this.support32bit=(typeof ArrayBuffer!=="undefined"&&typeof Uint8ClampedArray!=="undefined"&&typeof Int32Array!=="undefined"&&this.littleEndian!==null&&this._checkIsUint8ClampedImageData());navigator.vibrate=navigator.vibrate||navigator.webkitVibrate||navigator.mozVibrate||navigator.msVibrate;if(navigator.vibrate)
{this.vibration=true;}},_checkIsLittleEndian:function(){var a=new ArrayBuffer(4);var b=new Uint8Array(a);var c=new Uint32Array(a);b[0]=0xa1;b[1]=0xb2;b[2]=0xc3;b[3]=0xd4;if(c[0]==0xd4c3b2a1)
{return true;}
if(c[0]==0xa1b2c3d4)
{return false;}
else
{return null;}},_checkIsUint8ClampedImageData:function(){if(typeof Uint8ClampedArray==="undefined")
{return false;}
var elem=document.createElement('canvas');var ctx=elem.getContext('2d');if(!ctx)
{return false;}
var image=ctx.createImageData(1,1);return image.data instanceof Uint8ClampedArray;},_checkCSS3D:function(){var el=document.createElement('p');var has3d;var transforms={'webkitTransform':'-webkit-transform','OTransform':'-o-transform','msTransform':'-ms-transform','MozTransform':'-moz-transform','transform':'transform'};document.body.insertBefore(el,null);for(var t in transforms)
{if(el.style[t]!==undefined)
{el.style[t]="translate3d(1px,1px,1px)";has3d=window.getComputedStyle(el).getPropertyValue(transforms[t]);}}
document.body.removeChild(el);this.css3D=(has3d!==undefined&&has3d.length>0&&has3d!=="none");},canPlayAudio:function(type){if(type=='mp3'&&this.mp3)
{return true;}
else if(type=='ogg'&&(this.ogg||this.opus))
{return true;}
else if(type=='m4a'&&this.m4a)
{return true;}
else if(type=='wav'&&this.wav)
{return true;}
else if(type=='webm'&&this.webm)
{return true;}
return false;},isConsoleOpen:function(){if(window.console&&window.console['firebug'])
{return true;}
if(window.console)
{console.profile();console.profileEnd();if(console.clear)
{console.clear();}
if(console['profiles'])
{return console['profiles'].length>0;}}
return false;}};Phaser.Device.prototype.constructor=Phaser.Device;Phaser.RequestAnimationFrame=function(game,forceSetTimeOut){if(typeof forceSetTimeOut==='undefined'){forceSetTimeOut=false;}
this.game=game;this.isRunning=false;this.forceSetTimeOut=forceSetTimeOut;var vendors=['ms','moz','webkit','o'];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;x++)
{window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame'];}
this._isSetTimeOut=false;this._onLoop=null;this._timeOutID=null;};Phaser.RequestAnimationFrame.prototype={start:function(){this.isRunning=true;var _this=this;if(!window.requestAnimationFrame||this.forceSetTimeOut)
{this._isSetTimeOut=true;this._onLoop=function(){return _this.updateSetTimeout();};this._timeOutID=window.setTimeout(this._onLoop,0);}
else
{this._isSetTimeOut=false;this._onLoop=function(time){return _this.updateRAF(time);};this._timeOutID=window.requestAnimationFrame(this._onLoop);}},updateRAF:function(){this.game.update(Date.now());this._timeOutID=window.requestAnimationFrame(this._onLoop);},updateSetTimeout:function(){this.game.update(Date.now());this._timeOutID=window.setTimeout(this._onLoop,this.game.time.timeToCall);},stop:function(){if(this._isSetTimeOut)
{clearTimeout(this._timeOutID);}
else
{window.cancelAnimationFrame(this._timeOutID);}
this.isRunning=false;},isSetTimeOut:function(){return this._isSetTimeOut;},isRAF:function(){return(this._isSetTimeOut===false);}};Phaser.RequestAnimationFrame.prototype.constructor=Phaser.RequestAnimationFrame;Phaser.Math={PI2:Math.PI*2,fuzzyEqual:function(a,b,epsilon){if(typeof epsilon==="undefined"){epsilon=0.0001;}
return Math.abs(a-b)<epsilon;},fuzzyLessThan:function(a,b,epsilon){if(typeof epsilon==="undefined"){epsilon=0.0001;}
return a<b+epsilon;},fuzzyGreaterThan:function(a,b,epsilon){if(typeof epsilon==="undefined"){epsilon=0.0001;}
return a>b-epsilon;},fuzzyCeil:function(val,epsilon){if(typeof epsilon==="undefined"){epsilon=0.0001;}
return Math.ceil(val-epsilon);},fuzzyFloor:function(val,epsilon){if(typeof epsilon==="undefined"){epsilon=0.0001;}
return Math.floor(val+epsilon);},average:function(){var args=[];for(var _i=0;_i<(arguments.length-0);_i++){args[_i]=arguments[_i+0];}
var avg=0;for(var i=0;i<args.length;i++){avg+=args[i];}
return avg/args.length;},truncate:function(n){return(n>0)?Math.floor(n):Math.ceil(n);},shear:function(n){return n%1;},snapTo:function(input,gap,start){if(typeof start==="undefined"){start=0;}
if(gap===0){return input;}
input-=start;input=gap*Math.round(input/gap);return start+input;},snapToFloor:function(input,gap,start){if(typeof start==="undefined"){start=0;}
if(gap===0){return input;}
input-=start;input=gap*Math.floor(input/gap);return start+input;},snapToCeil:function(input,gap,start){if(typeof start==="undefined"){start=0;}
if(gap===0){return input;}
input-=start;input=gap*Math.ceil(input/gap);return start+input;},snapToInArray:function(input,arr,sort){if(typeof sort==="undefined"){sort=true;}
if(sort){arr.sort();}
if(input<arr[0]){return arr[0];}
var i=1;while(arr[i]<input){i++;}
var low=arr[i-1];var high=(i<arr.length)?arr[i]:Number.POSITIVE_INFINITY;return((high-input)<=(input-low))?high:low;},roundTo:function(value,place,base){if(typeof place==="undefined"){place=0;}
if(typeof base==="undefined"){base=10;}
var p=Math.pow(base,-place);return Math.round(value*p)/p;},floorTo:function(value,place,base){if(typeof place==="undefined"){place=0;}
if(typeof base==="undefined"){base=10;}
var p=Math.pow(base,-place);return Math.floor(value*p)/p;},ceilTo:function(value,place,base){if(typeof place==="undefined"){place=0;}
if(typeof base==="undefined"){base=10;}
var p=Math.pow(base,-place);return Math.ceil(value*p)/p;},interpolateFloat:function(a,b,weight){return(b-a)*weight+a;},angleBetween:function(x1,y1,x2,y2){return Math.atan2(y2-y1,x2-x1);},angleBetweenPoints:function(point1,point2){return Math.atan2(point2.y-point1.y,point2.x-point1.x);},reverseAngle:function(angleRad){return this.normalizeAngle(angleRad+Math.PI,true);},normalizeAngle:function(angleRad){angleRad=angleRad%(2*Math.PI);return angleRad>=0?angleRad:angleRad+2*Math.PI;},normalizeLatitude:function(lat){return Math.max(-90,Math.min(90,lat));},normalizeLongitude:function(lng){if(lng%360==180)
{return 180;}
lng=lng%360;return lng<-180?lng+360:lng>180?lng-360:lng;},nearestAngleBetween:function(a1,a2,radians){if(typeof radians==="undefined"){radians=true;}
var rd=(radians)?Math.PI:180;a1=this.normalizeAngle(a1,radians);a2=this.normalizeAngle(a2,radians);if(a1<-rd/2&&a2>rd/2)
{a1+=rd*2;}
if(a2<-rd/2&&a1>rd/2)
{a2+=rd*2;}
return a2-a1;},interpolateAngles:function(a1,a2,weight,radians,ease){if(typeof radians==="undefined"){radians=true;}
if(typeof ease==="undefined"){ease=null;}
a1=this.normalizeAngle(a1,radians);a2=this.normalizeAngleToAnother(a2,a1,radians);return(typeof ease==='function')?ease(weight,a1,a2-a1,1):this.interpolateFloat(a1,a2,weight);},chanceRoll:function(chance){if(typeof chance==="undefined"){chance=50;}
if(chance<=0)
{return false;}
else if(chance>=100)
{return true;}
else
{if(Math.random()*100>=chance)
{return false;}
else
{return true;}}},numberArray:function(min,max){var result=[];for(var i=min;i<=max;i++)
{result.push(i);}
return result;},maxAdd:function(value,amount,max){value+=amount;if(value>max)
{value=max;}
return value;},minSub:function(value,amount,min){value-=amount;if(value<min)
{value=min;}
return value;},wrap:function(value,min,max){var range=max-min;if(range<=0)
{return 0;}
var result=(value-min)%range;if(result<0)
{result+=range;}
return result+min;},wrapValue:function(value,amount,max){var diff;value=Math.abs(value);amount=Math.abs(amount);max=Math.abs(max);diff=(value+amount)%max;return diff;},limitValue:function(value,min,max){return value<min?min:value>max?max:value;},randomSign:function(){return(Math.random()>0.5)?1:-1;},isOdd:function(n){return(n&1);},isEven:function(n){if(n&1)
{return false;}
else
{return true;}},min:function(){if(arguments.length===1&&typeof arguments[0]==='object')
{var data=arguments[0];}
else
{var data=arguments;}
for(var i=1,min=0,len=data.length;i<len;i++)
{if(data[i]<data[min])
{min=i;}}
return data[min];},max:function(){if(arguments.length===1&&typeof arguments[0]==='object')
{var data=arguments[0];}
else
{var data=arguments;}
for(var i=1,max=0,len=data.length;i<len;i++)
{if(data[i]>data[max])
{max=i;}}
return data[max];},minProperty:function(property){if(arguments.length===2&&typeof arguments[1]==='object')
{var data=arguments[1];}
else
{var data=arguments.slice(1);}
for(var i=1,min=0,len=data.length;i<len;i++)
{if(data[i][property]<data[min][property])
{min=i;}}
return data[min][property];},maxProperty:function(property){if(arguments.length===2&&typeof arguments[1]==='object')
{var data=arguments[1];}
else
{var data=arguments.slice(1);}
for(var i=1,max=0,len=data.length;i<len;i++)
{if(data[i][property]>data[max][property])
{max=i;}}
return data[max][property];},wrapAngle:function(angle,radians){var radianFactor=(radians)?Math.PI/180:1;return this.wrap(angle,-180*radianFactor,180*radianFactor);},angleLimit:function(angle,min,max){var result=angle;if(angle>max)
{result=max;}
else if(angle<min)
{result=min;}
return result;},linearInterpolation:function(v,k){var m=v.length-1;var f=m*k;var i=Math.floor(f);if(k<0)
{return this.linear(v[0],v[1],f);}
if(k>1)
{return this.linear(v[m],v[m-1],m-f);}
return this.linear(v[i],v[i+1>m?m:i+1],f-i);},bezierInterpolation:function(v,k){var b=0;var n=v.length-1;for(var i=0;i<=n;i++)
{b+=Math.pow(1-k,n-i)*Math.pow(k,i)*v[i]*this.bernstein(n,i);}
return b;},catmullRomInterpolation:function(v,k){var m=v.length-1;var f=m*k;var i=Math.floor(f);if(v[0]===v[m])
{if(k<0)
{i=Math.floor(f=m*(1+k));}
return this.catmullRom(v[(i-1+m)%m],v[i],v[(i+1)%m],v[(i+2)%m],f-i);}
else
{if(k<0)
{return v[0]-(this.catmullRom(v[0],v[0],v[1],v[1],-f)-v[0]);}
if(k>1)
{return v[m]-(this.catmullRom(v[m],v[m],v[m-1],v[m-1],f-m)-v[m]);}
return this.catmullRom(v[i?i-1:0],v[i],v[m<i+1?m:i+1],v[m<i+2?m:i+2],f-i);}},linear:function(p0,p1,t){return(p1-p0)*t+p0;},bernstein:function(n,i){return this.factorial(n)/this.factorial(i)/this.factorial(n-i);},catmullRom:function(p0,p1,p2,p3,t){var v0=(p2-p0)*0.5,v1=(p3-p1)*0.5,t2=t*t,t3=t*t2;return(2*p1-2*p2+v0+v1)*t3+(-3*p1+3*p2-2*v0-v1)*t2+v0*t+p1;},difference:function(a,b){return Math.abs(a-b);},getRandom:function(objects,startIndex,length){if(typeof startIndex==="undefined"){startIndex=0;}
if(typeof length==="undefined"){length=0;}
if(objects!=null){var l=length;if((l===0)||(l>objects.length-startIndex))
{l=objects.length-startIndex;}
if(l>0)
{return objects[startIndex+Math.floor(Math.random()*l)];}}
return null;},removeRandom:function(objects,startIndex,length){if(typeof startIndex==="undefined"){startIndex=0;}
if(typeof length==="undefined"){length=0;}
if(objects!=null){var l=length;if((l===0)||(l>objects.length-startIndex))
{l=objects.length-startIndex;}
if(l>0)
{var idx=startIndex+Math.floor(Math.random()*l);var removed=objects.splice(idx,1);return removed[0];}}
return null;},floor:function(value){var n=value|0;return(value>0)?(n):((n!=value)?(n-1):(n));},ceil:function(value){var n=value|0;return(value>0)?((n!=value)?(n+1):(n)):(n);},sinCosGenerator:function(length,sinAmplitude,cosAmplitude,frequency){if(typeof sinAmplitude==="undefined"){sinAmplitude=1.0;}
if(typeof cosAmplitude==="undefined"){cosAmplitude=1.0;}
if(typeof frequency==="undefined"){frequency=1.0;}
var sin=sinAmplitude;var cos=cosAmplitude;var frq=frequency*Math.PI/length;var cosTable=[];var sinTable=[];for(var c=0;c<length;c++){cos-=sin*frq;sin+=cos*frq;cosTable[c]=cos;sinTable[c]=sin;}
return{sin:sinTable,cos:cosTable,length:length};},shift:function(stack){var s=stack.shift();stack.push(s);return s;},shuffleArray:function(array){for(var i=array.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var temp=array[i];array[i]=array[j];array[j]=temp;}
return array;},distance:function(x1,y1,x2,y2){var dx=x1-x2;var dy=y1-y2;return Math.sqrt(dx*dx+dy*dy);},distancePow:function(x1,y1,x2,y2,pow){if(typeof pow==='undefined'){pow=2;}
return Math.sqrt(Math.pow(x2-x1,pow)+Math.pow(y2-y1,pow));},distanceRounded:function(x1,y1,x2,y2){return Math.round(Phaser.Math.distance(x1,y1,x2,y2));},clamp:function(x,a,b){return(x<a)?a:((x>b)?b:x);},clampBottom:function(x,a){return x<a?a:x;},within:function(a,b,tolerance){return(Math.abs(a-b)<=tolerance);},mapLinear:function(x,a1,a2,b1,b2){return b1+(x-a1)*(b2-b1)/(a2-a1);},smoothstep:function(x,min,max){x=Math.max(0,Math.min(1,(x-min)/(max-min)));return x*x*(3-2*x);},smootherstep:function(x,min,max){x=Math.max(0,Math.min(1,(x-min)/(max-min)));return x*x*x*(x*(x*6-15)+10);},sign:function(x){return(x<0)?-1:((x>0)?1:0);},degToRad:(function(){var degreeToRadiansFactor=Math.PI/180;return function(degrees){return degrees*degreeToRadiansFactor;};}()),radToDeg:(function(){var radianToDegreesFactor=180/Math.PI;return function(radians){return radians*radianToDegreesFactor;};}())};Phaser.RandomDataGenerator=function(seeds){if(typeof seeds==="undefined"){seeds=[];}
this.c=1;this.s0=0;this.s1=0;this.s2=0;this.sow(seeds);};Phaser.RandomDataGenerator.prototype={rnd:function(){var t=2091639*this.s0+this.c*2.3283064365386963e-10;this.c=t|0;this.s0=this.s1;this.s1=this.s2;this.s2=t-this.c;return this.s2;},sow:function(seeds){if(typeof seeds==="undefined"){seeds=[];}
this.s0=this.hash(' ');this.s1=this.hash(this.s0);this.s2=this.hash(this.s1);this.c=1;var seed;for(var i=0;seed=seeds[i++];)
{this.s0-=this.hash(seed);this.s0+=~~(this.s0<0);this.s1-=this.hash(seed);this.s1+=~~(this.s1<0);this.s2-=this.hash(seed);this.s2+=~~(this.s2<0);}},hash:function(data){var h,i,n;n=0xefc8249d;data=data.toString();for(i=0;i<data.length;i++){n+=data.charCodeAt(i);h=0.02519603282416938*n;n=h>>>0;h-=n;h*=n;n=h>>>0;h-=n;n+=h*0x100000000;}
return(n>>>0)*2.3283064365386963e-10;},integer:function(){return this.rnd.apply(this)*0x100000000;},frac:function(){return this.rnd.apply(this)+(this.rnd.apply(this)*0x200000|0)*1.1102230246251565e-16;},real:function(){return this.integer()+this.frac();},integerInRange:function(min,max){return Math.floor(this.realInRange(0,max-min+1))+min;},realInRange:function(min,max){return this.frac()*(max-min)+min;},normal:function(){return 1-2*this.frac();},uuid:function(){var a='';var b='';for(b=a='';a++<36;b+=~a%5|a*3&4?(a^15?8^this.frac()*(a^20?16:4):4).toString(16):'-')
{}
return b;},pick:function(ary){return ary[this.integerInRange(0,ary.length-1)];},weightedPick:function(ary){return ary[~~(Math.pow(this.frac(),2)*(ary.length-1))];},timestamp:function(min,max){return this.realInRange(min||946684800000,max||1577862000000);},angle:function(){return this.integerInRange(-180,180);}};Phaser.RandomDataGenerator.prototype.constructor=Phaser.RandomDataGenerator;Phaser.QuadTree=function(x,y,width,height,maxObjects,maxLevels,level){this.maxObjects=10;this.maxLevels=4;this.level=0;this.bounds={};this.objects=[];this.nodes=[];this._empty=[];this.reset(x,y,width,height,maxObjects,maxLevels,level);};Phaser.QuadTree.prototype={reset:function(x,y,width,height,maxObjects,maxLevels,level){this.maxObjects=maxObjects||10;this.maxLevels=maxLevels||4;this.level=level||0;this.bounds={x:Math.round(x),y:Math.round(y),width:width,height:height,subWidth:Math.floor(width/2),subHeight:Math.floor(height/2),right:Math.round(x)+Math.floor(width/2),bottom:Math.round(y)+Math.floor(height/2)};this.objects.length=0;this.nodes.length=0;},populate:function(group){group.forEach(this.populateHandler,this,true);},populateHandler:function(sprite){if(sprite.body&&sprite.exists)
{this.insert(sprite.body);}},split:function(){this.level++;this.nodes[0]=new Phaser.QuadTree(this.bounds.right,this.bounds.y,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level);this.nodes[1]=new Phaser.QuadTree(this.bounds.x,this.bounds.y,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level);this.nodes[2]=new Phaser.QuadTree(this.bounds.x,this.bounds.bottom,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level);this.nodes[3]=new Phaser.QuadTree(this.bounds.right,this.bounds.bottom,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level);},insert:function(body){var i=0;var index;if(this.nodes[0]!=null)
{index=this.getIndex(body);if(index!==-1)
{this.nodes[index].insert(body);return;}}
this.objects.push(body);if(this.objects.length>this.maxObjects&&this.level<this.maxLevels)
{if(this.nodes[0]==null)
{this.split();}
while(i<this.objects.length)
{index=this.getIndex(this.objects[i]);if(index!==-1)
{this.nodes[index].insert(this.objects.splice(i,1)[0]);}
else
{i++;}}}},getIndex:function(rect){var index=-1;if(rect.x<this.bounds.right&&rect.right<this.bounds.right)
{if(rect.y<this.bounds.bottom&&rect.bottom<this.bounds.bottom)
{index=1;}
else if(rect.y>this.bounds.bottom)
{index=2;}}
else if(rect.x>this.bounds.right)
{if(rect.y<this.bounds.bottom&&rect.bottom<this.bounds.bottom)
{index=0;}
else if(rect.y>this.bounds.bottom)
{index=3;}}
return index;},retrieve:function(sprite){if(!sprite.body)
{return this._empty;}
var returnObjects=this.objects;var index=this.getIndex(sprite.body);if(this.nodes[0])
{if(index!==-1)
{returnObjects=returnObjects.concat(this.nodes[index].retrieve(sprite));}
else
{returnObjects=returnObjects.concat(this.nodes[0].retrieve(sprite));returnObjects=returnObjects.concat(this.nodes[1].retrieve(sprite));returnObjects=returnObjects.concat(this.nodes[2].retrieve(sprite));returnObjects=returnObjects.concat(this.nodes[3].retrieve(sprite));}}
return returnObjects;},clear:function(){this.objects.length=0;var i=this.nodes.length;while(i--)
{this.nodes[i].clear();this.nodes.splice(i,1);}
this.nodes.length=0;}};Phaser.QuadTree.prototype.constructor=Phaser.QuadTree;Phaser.Net=function(game){this.game=game;};Phaser.Net.prototype={getHostName:function(){if(window.location&&window.location.hostname){return window.location.hostname;}
return null;},checkDomainName:function(domain){return window.location.hostname.indexOf(domain)!==-1;},updateQueryString:function(key,value,redirect,url){if(typeof redirect==="undefined"){redirect=false;}
if(typeof url==="undefined"||url===''){url=window.location.href;}
var output='';var re=new RegExp("([?|&])"+key+"=.*?(&|#|$)(.*)","gi");if(re.test(url))
{if(typeof value!=='undefined'&&value!==null)
{output=url.replace(re,'$1'+key+"="+value+'$2$3');}
else
{output=url.replace(re,'$1$3').replace(/(&|\?)$/,'');}}
else
{if(typeof value!=='undefined'&&value!==null)
{var separator=url.indexOf('?')!==-1?'&':'?';var hash=url.split('#');url=hash[0]+separator+key+'='+value;if(hash[1]){url+='#'+hash[1];}
output=url;}
else
{output=url;}}
if(redirect)
{window.location.href=output;}
else
{return output;}},getQueryString:function(parameter){if(typeof parameter==="undefined"){parameter='';}
var output={};var keyValues=location.search.substring(1).split('&');for(var i in keyValues)
{var key=keyValues[i].split('=');if(key.length>1)
{if(parameter&&parameter==this.decodeURI(key[0]))
{return this.decodeURI(key[1]);}
else
{output[this.decodeURI(key[0])]=this.decodeURI(key[1]);}}}
return output;},decodeURI:function(value){return decodeURIComponent(value.replace(/\+/g," "));}};Phaser.Net.prototype.constructor=Phaser.Net;Phaser.TweenManager=function(game){this.game=game;this._tweens=[];this._add=[];this.game.onPause.add(this._pauseAll,this);this.game.onResume.add(this._resumeAll,this);};Phaser.TweenManager.prototype={getAll:function(){return this._tweens;},removeAll:function(){for(var i=0;i<this._tweens.length;i++)
{this._tweens[i].pendingDelete=true;}
this._add=[];},add:function(tween){tween._manager=this;this._add.push(tween);},create:function(object){return new Phaser.Tween(object,this.game,this);},remove:function(tween){var i=this._tweens.indexOf(tween);if(i!==-1)
{this._tweens[i].pendingDelete=true;}},update:function(){if(this._tweens.length===0&&this._add.length===0)
{return false;}
var i=0;var numTweens=this._tweens.length;while(i<numTweens)
{if(this._tweens[i].update(this.game.time.now))
{i++;}
else
{this._tweens.splice(i,1);numTweens--;}}
if(this._add.length>0)
{this._tweens=this._tweens.concat(this._add);this._add.length=0;}
return true;},isTweening:function(object){return this._tweens.some(function(tween){return tween._object===object;});},_pauseAll:function(){for(var i=this._tweens.length-1;i>=0;i--)
{this._tweens[i]._pause();}},_resumeAll:function(){for(var i=this._tweens.length-1;i>=0;i--)
{this._tweens[i]._resume();}},pauseAll:function(){for(var i=this._tweens.length-1;i>=0;i--)
{this._tweens[i].pause();}},resumeAll:function(){for(var i=this._tweens.length-1;i>=0;i--)
{this._tweens[i].resume(true);}}};Phaser.TweenManager.prototype.constructor=Phaser.TweenManager;Phaser.Tween=function(object,game,manager){this._object=object;this.game=game;this._manager=manager;this._valuesStart={};this._valuesEnd={};this._valuesStartRepeat={};this._duration=1000;this._repeat=0;this._yoyo=false;this._reversed=false;this._delayTime=0;this._startTime=null;this._easingFunction=Phaser.Easing.Linear.None;this._interpolationFunction=Phaser.Math.linearInterpolation;this._chainedTweens=[];this._onStartCallbackFired=false;this._onUpdateCallback=null;this._onUpdateCallbackContext=null;this._paused=false;this._pausedTime=0;this._codePaused=false;this.pendingDelete=false;this.onStart=new Phaser.Signal();this.onLoop=new Phaser.Signal();this.onComplete=new Phaser.Signal();this.isRunning=false;};Phaser.Tween.prototype={to:function(properties,duration,ease,autoStart,delay,repeat,yoyo){duration=duration||1000;ease=ease||null;autoStart=autoStart||false;delay=delay||0;repeat=repeat||0;yoyo=yoyo||false;if(yoyo&&repeat===0)
{repeat=1;}
var self;if(this._parent)
{self=this._manager.create(this._object);this._lastChild.chain(self);this._lastChild=self;}
else
{self=this;this._parent=this;this._lastChild=this;}
self._repeat=repeat;self._duration=duration;self._valuesEnd=properties;if(ease!==null)
{self._easingFunction=ease;}
if(delay>0)
{self._delayTime=delay;}
self._yoyo=yoyo;if(autoStart)
{return this.start();}
else
{return this;}},start:function(){if(this.game===null||this._object===null)
{return;}
this._manager.add(this);this.isRunning=true;this._onStartCallbackFired=false;this._startTime=this.game.time.now+this._delayTime;for(var property in this._valuesEnd)
{if(Array.isArray(this._valuesEnd[property]))
{if(this._valuesEnd[property].length===0)
{continue;}
this._valuesEnd[property]=[this._object[property]].concat(this._valuesEnd[property]);}
this._valuesStart[property]=this._object[property];if(!Array.isArray(this._valuesStart[property]))
{this._valuesStart[property]*=1.0;}
this._valuesStartRepeat[property]=this._valuesStart[property]||0;}
return this;},generateData:function(frameRate,data){if(this.game===null||this._object===null)
{return null;}
this._startTime=0;for(var property in this._valuesEnd)
{if(Array.isArray(this._valuesEnd[property]))
{if(this._valuesEnd[property].length===0)
{continue;}
this._valuesEnd[property]=[this._object[property]].concat(this._valuesEnd[property]);}
this._valuesStart[property]=this._object[property];if(!Array.isArray(this._valuesStart[property]))
{this._valuesStart[property]*=1.0;}
this._valuesStartRepeat[property]=this._valuesStart[property]||0;}
var time=0;var total=Math.floor(frameRate*(this._duration/1000));var tick=this._duration/total;var output=[];while(total--)
{var property;var elapsed=(time-this._startTime)/this._duration;elapsed=elapsed>1?1:elapsed;var value=this._easingFunction(elapsed);var blob={};for(property in this._valuesEnd)
{var start=this._valuesStart[property]||0;var end=this._valuesEnd[property];if(end instanceof Array)
{blob[property]=this._interpolationFunction(end,value);}
else
{if(typeof(end)==='string')
{end=start+parseFloat(end,10);}
if(typeof(end)==='number')
{blob[property]=start+(end-start)*value;}}}
output.push(blob);time+=tick;}
if(this._yoyo)
{var reversed=output.slice();reversed.reverse();output=output.concat(reversed);}
if(typeof data!=='undefined')
{data=data.concat(output);return data;}
else
{return output;}},stop:function(){this.isRunning=false;this._onUpdateCallback=null;this._manager.remove(this);return this;},delay:function(amount){this._delayTime=amount;return this;},repeat:function(times){this._repeat=times;return this;},yoyo:function(yoyo){this._yoyo=yoyo;if(yoyo&&this._repeat===0)
{this._repeat=1;}
return this;},easing:function(easing){this._easingFunction=easing;return this;},interpolation:function(interpolation){this._interpolationFunction=interpolation;return this;},chain:function(){this._chainedTweens=arguments;return this;},loop:function(){this._lastChild.chain(this);return this;},onUpdateCallback:function(callback,callbackContext){this._onUpdateCallback=callback;this._onUpdateCallbackContext=callbackContext;return this;},pause:function(){this._codePaused=true;this._paused=true;this._pausedTime=this.game.time.now;},_pause:function(){if(!this._codePaused)
{this._paused=true;this._pausedTime=this.game.time.now;}},resume:function(){if(this._paused)
{this._paused=false;this._codePaused=false;this._startTime+=(this.game.time.now-this._pausedTime);}},_resume:function(){if(this._codePaused)
{return;}
else
{this._startTime+=this.game.time.pauseDuration;this._paused=false;}},update:function(time){if(this.pendingDelete)
{return false;}
if(this._paused||time<this._startTime)
{return true;}
var property;if(time<this._startTime)
{return true;}
if(this._onStartCallbackFired===false)
{this.onStart.dispatch(this._object);this._onStartCallbackFired=true;}
var elapsed=(time-this._startTime)/this._duration;elapsed=elapsed>1?1:elapsed;var value=this._easingFunction(elapsed);for(property in this._valuesEnd)
{var start=this._valuesStart[property]||0;var end=this._valuesEnd[property];if(end instanceof Array)
{this._object[property]=this._interpolationFunction(end,value);}
else
{if(typeof(end)==='string')
{end=start+parseFloat(end,10);}
if(typeof(end)==='number')
{this._object[property]=start+(end-start)*value;}}}
if(this._onUpdateCallback!==null)
{this._onUpdateCallback.call(this._onUpdateCallbackContext,this,value);}
if(elapsed==1)
{if(this._repeat>0)
{if(isFinite(this._repeat))
{this._repeat--;}
for(property in this._valuesStartRepeat)
{if(typeof(this._valuesEnd[property])==='string')
{this._valuesStartRepeat[property]=this._valuesStartRepeat[property]+parseFloat(this._valuesEnd[property],10);}
if(this._yoyo)
{var tmp=this._valuesStartRepeat[property];this._valuesStartRepeat[property]=this._valuesEnd[property];this._valuesEnd[property]=tmp;this._reversed=!this._reversed;}
this._valuesStart[property]=this._valuesStartRepeat[property];}
this._startTime=time+this._delayTime;this.onLoop.dispatch(this._object);return true;}
else
{this.isRunning=false;this.onComplete.dispatch(this._object);for(var i=0,numChainedTweens=this._chainedTweens.length;i<numChainedTweens;i++)
{this._chainedTweens[i].start(time);}
return false;}}
return true;}};Phaser.Tween.prototype.constructor=Phaser.Tween;Phaser.Easing={Linear:{None:function(k){return k;}},Quadratic:{In:function(k){return k*k;},Out:function(k){return k*(2-k);},InOut:function(k){if((k*=2)<1)return 0.5*k*k;return-0.5*(--k*(k-2)-1);}},Cubic:{In:function(k){return k*k*k;},Out:function(k){return--k*k*k+1;},InOut:function(k){if((k*=2)<1)return 0.5*k*k*k;return 0.5*((k-=2)*k*k+2);}},Quartic:{In:function(k){return k*k*k*k;},Out:function(k){return 1-(--k*k*k*k);},InOut:function(k){if((k*=2)<1)return 0.5*k*k*k*k;return-0.5*((k-=2)*k*k*k-2);}},Quintic:{In:function(k){return k*k*k*k*k;},Out:function(k){return--k*k*k*k*k+1;},InOut:function(k){if((k*=2)<1)return 0.5*k*k*k*k*k;return 0.5*((k-=2)*k*k*k*k+2);}},Sinusoidal:{In:function(k){return 1-Math.cos(k*Math.PI/2);},Out:function(k){return Math.sin(k*Math.PI/2);},InOut:function(k){return 0.5*(1-Math.cos(Math.PI*k));}},Exponential:{In:function(k){return k===0?0:Math.pow(1024,k-1);},Out:function(k){return k===1?1:1-Math.pow(2,-10*k);},InOut:function(k){if(k===0)return 0;if(k===1)return 1;if((k*=2)<1)return 0.5*Math.pow(1024,k-1);return 0.5*(-Math.pow(2,-10*(k-1))+2);}},Circular:{In:function(k){return 1-Math.sqrt(1-k*k);},Out:function(k){return Math.sqrt(1-(--k*k));},InOut:function(k){if((k*=2)<1)return-0.5*(Math.sqrt(1-k*k)-1);return 0.5*(Math.sqrt(1-(k-=2)*k)+1);}},Elastic:{In:function(k){var s,a=0.1,p=0.4;if(k===0)return 0;if(k===1)return 1;if(!a||a<1){a=1;s=p/4;}
else s=p*Math.asin(1/a)/(2*Math.PI);return-(a*Math.pow(2,10*(k-=1))*Math.sin((k-s)*(2*Math.PI)/p));},Out:function(k){var s,a=0.1,p=0.4;if(k===0)return 0;if(k===1)return 1;if(!a||a<1){a=1;s=p/4;}
else s=p*Math.asin(1/a)/(2*Math.PI);return(a*Math.pow(2,-10*k)*Math.sin((k-s)*(2*Math.PI)/p)+1);},InOut:function(k){var s,a=0.1,p=0.4;if(k===0)return 0;if(k===1)return 1;if(!a||a<1){a=1;s=p/4;}
else s=p*Math.asin(1/a)/(2*Math.PI);if((k*=2)<1)return-0.5*(a*Math.pow(2,10*(k-=1))*Math.sin((k-s)*(2*Math.PI)/p));return a*Math.pow(2,-10*(k-=1))*Math.sin((k-s)*(2*Math.PI)/p)*0.5+1;}},Back:{In:function(k){var s=1.70158;return k*k*((s+1)*k-s);},Out:function(k){var s=1.70158;return--k*k*((s+1)*k+s)+1;},InOut:function(k){var s=1.70158*1.525;if((k*=2)<1)return 0.5*(k*k*((s+1)*k-s));return 0.5*((k-=2)*k*((s+1)*k+s)+2);}},Bounce:{In:function(k){return 1-Phaser.Easing.Bounce.Out(1-k);},Out:function(k){if(k<(1/2.75)){return 7.5625*k*k;}else if(k<(2/2.75)){return 7.5625*(k-=(1.5/2.75))*k+0.75;}else if(k<(2.5/2.75)){return 7.5625*(k-=(2.25/2.75))*k+0.9375;}else{return 7.5625*(k-=(2.625/2.75))*k+0.984375;}},InOut:function(k){if(k<0.5)return Phaser.Easing.Bounce.In(k*2)*0.5;return Phaser.Easing.Bounce.Out(k*2-1)*0.5+0.5;}}};Phaser.Time=function(game){this.game=game;this.time=0;this.now=0;this.elapsed=0;this.pausedTime=0;this.advancedTiming=false;this.fps=0;this.fpsMin=1000;this.fpsMax=0;this.msMin=1000;this.msMax=0;this.physicsElapsed=0;this.deltaCap=0;this.timeCap=1000;this.frames=0;this.pauseDuration=0;this.timeToCall=0;this.lastTime=0;this.events=new Phaser.Timer(this.game,false);this._started=0;this._timeLastSecond=0;this._pauseStarted=0;this._justResumed=false;this._timers=[];this._len=0;this._i=0;};Phaser.Time.prototype={boot:function(){this._started=Date.now();this.events.start();},create:function(autoDestroy){if(typeof autoDestroy==='undefined'){autoDestroy=true;}
var timer=new Phaser.Timer(this.game,autoDestroy);this._timers.push(timer);return timer;},removeAll:function(){for(var i=0;i<this._timers.length;i++)
{this._timers[i].destroy();}
this._timers=[];this.events.removeAll();},update:function(time){this.now=time;this.timeToCall=this.game.math.max(0,16-(time-this.lastTime));this.elapsed=this.now-this.time;if(this.elapsed>this.timeCap)
{this.elapsed=1/60;}
this.physicsElapsed=this.elapsed/1000||1/60;if(this.deltaCap>0&&this.physicsElapsed>this.deltaCap)
{this.physicsElapsed=this.deltaCap;}
if(this.advancedTiming)
{this.msMin=this.game.math.min(this.msMin,this.elapsed);this.msMax=this.game.math.max(this.msMax,this.elapsed);this.frames++;if(this.now>this._timeLastSecond+1000)
{this.fps=Math.round((this.frames*1000)/(this.now-this._timeLastSecond));this.fpsMin=this.game.math.min(this.fpsMin,this.fps);this.fpsMax=this.game.math.max(this.fpsMax,this.fps);this._timeLastSecond=this.now;this.frames=0;}}
this.time=this.now;this.lastTime=time+this.timeToCall;if(!this.game.paused)
{this.events.update(this.now);this._i=0;this._len=this._timers.length;while(this._i<this._len)
{if(this._timers[this._i].update(this.now))
{this._i++;}
else
{this._timers.splice(this._i,1);this._len--;}}}},gamePaused:function(){this._pauseStarted=this.now;this.events.pause();var i=this._timers.length;while(i--)
{this._timers[i]._pause();}},gameResumed:function(){this.time=this.now=Date.now();this.pauseDuration=this.time-this._pauseStarted;this.events.resume();var i=this._timers.length;while(i--)
{this._timers[i]._resume();}},totalElapsedSeconds:function(){return(this.now-this._started)*0.001;},elapsedSince:function(since){return this.now-since;},elapsedSecondsSince:function(since){return(this.now-since)*0.001;},reset:function(){this._started=this.now;this.removeAll();}};Phaser.Time.prototype.constructor=Phaser.Time;Phaser.Timer=function(game,autoDestroy){if(typeof autoDestroy==='undefined'){autoDestroy=true;}
this.game=game;this.running=false;this.autoDestroy=autoDestroy;this.expired=false;this.elapsed=0;this.events=[];this.onComplete=new Phaser.Signal();this.nextTick=0;this.timeCap=1000;this.paused=false;this._codePaused=false;this._started=0;this._pauseStarted=0;this._pauseTotal=0;this._now=Date.now();this._len=0;this._marked=0;this._i=0;this._diff=0;this._newTick=0;};Phaser.Timer.MINUTE=60000;Phaser.Timer.SECOND=1000;Phaser.Timer.HALF=500;Phaser.Timer.QUARTER=250;Phaser.Timer.prototype={create:function(delay,loop,repeatCount,callback,callbackContext,args){var tick=delay;if(this._now===0)
{tick+=this.game.time.now;}
else
{tick+=this._now;}
var event=new Phaser.TimerEvent(this,delay,tick,repeatCount,loop,callback,callbackContext,args);this.events.push(event);this.order();this.expired=false;return event;},add:function(delay,callback,callbackContext){return this.create(delay,false,0,callback,callbackContext,Array.prototype.splice.call(arguments,3));},repeat:function(delay,repeatCount,callback,callbackContext){return this.create(delay,false,repeatCount,callback,callbackContext,Array.prototype.splice.call(arguments,4));},loop:function(delay,callback,callbackContext){return this.create(delay,true,0,callback,callbackContext,Array.prototype.splice.call(arguments,3));},start:function(delay){if(this.running)
{return;}
this._started=this.game.time.now+(delay||0);this.running=true;for(var i=0;i<this.events.length;i++)
{this.events[i].tick=this.events[i].delay+this._started;}},stop:function(clearEvents){this.running=false;if(typeof clearEvents==='undefined'){clearEvents=true;}
if(clearEvents)
{this.events.length=0;}},remove:function(event){for(var i=0;i<this.events.length;i++)
{if(this.events[i]===event)
{this.events[i].pendingDelete=true;return true;}}
return false;},order:function(){if(this.events.length>0)
{this.events.sort(this.sortHandler);this.nextTick=this.events[0].tick;}},sortHandler:function(a,b){if(a.tick<b.tick)
{return-1;}
else if(a.tick>b.tick)
{return 1;}
return 0;},clearPendingEvents:function(){this._i=this.events.length;while(this._i--)
{if(this.events[this._i].pendingDelete)
{this.events.splice(this._i,1);}}
this._len=this.events.length;this._i=0;},update:function(time){if(this.paused)
{return true;}
this.elapsed=time-this._now;this._now=time;if(this.elapsed>this.timeCap)
{this.adjustEvents(time-this.elapsed);}
this._marked=0;this.clearPendingEvents();if(this.running&&this._now>=this.nextTick&&this._len>0)
{while(this._i<this._len&&this.running)
{if(this._now>=this.events[this._i].tick)
{this._newTick=(this._now+this.events[this._i].delay)-(this._now-this.events[this._i].tick);if(this._newTick<0)
{this._newTick=this._now+this.events[this._i].delay;}
if(this.events[this._i].loop===true)
{this.events[this._i].tick=this._newTick;this.events[this._i].callback.apply(this.events[this._i].callbackContext,this.events[this._i].args);}
else if(this.events[this._i].repeatCount>0)
{this.events[this._i].repeatCount--;this.events[this._i].tick=this._newTick;this.events[this._i].callback.apply(this.events[this._i].callbackContext,this.events[this._i].args);}
else
{this._marked++;this.events[this._i].pendingDelete=true;this.events[this._i].callback.apply(this.events[this._i].callbackContext,this.events[this._i].args);}
this._i++;}
else
{break;}}
if(this.events.length>this._marked)
{this.order();}
else
{this.expired=true;this.onComplete.dispatch(this);}}
if(this.expired&&this.autoDestroy)
{return false;}
else
{return true;}},pause:function(){if(this.paused)
{return;}
this._pauseStarted=this.game.time.now;this.paused=true;this._codePaused=true;},_pause:function(){if(this.paused)
{return;}
this._pauseStarted=this.game.time.now;this.paused=true;},adjustEvents:function(baseTime){for(var i=0;i<this.events.length;i++)
{if(!this.events[i].pendingDelete)
{var t=this.events[i].tick-baseTime;if(t<0)
{t=0;}
this.events[i].tick=this._now+t;}}
var d=this.nextTick-baseTime;if(d<0)
{this.nextTick=this._now;}
else
{this.nextTick=this._now+d;}},resume:function(){if(!this.paused)
{return;}
this._pauseTotal+=this.game.time.pauseDuration;this._now=this.game.time.now;this.adjustEvents(this._pauseStarted);this.paused=false;this._codePaused=false;},_resume:function(){if(this._codePaused)
{return;}
else
{this.resume();}},removeAll:function(){this.onComplete.removeAll();this.events.length=0;this._len=0;this._i=0;},destroy:function(){this.onComplete.removeAll();this.running=false;this.events=[];this._len=0;this._i=0;}};Object.defineProperty(Phaser.Timer.prototype,"next",{get:function(){return this.nextTick;}});Object.defineProperty(Phaser.Timer.prototype,"duration",{get:function(){if(this.running&&this.nextTick>this._now)
{return this.nextTick-this._now;}
else
{return 0;}}});Object.defineProperty(Phaser.Timer.prototype,"length",{get:function(){return this.events.length;}});Object.defineProperty(Phaser.Timer.prototype,"ms",{get:function(){return this._now-this._started-this._pauseTotal;}});Object.defineProperty(Phaser.Timer.prototype,"seconds",{get:function(){return this.ms*0.001;}});Phaser.Timer.prototype.constructor=Phaser.Timer;Phaser.TimerEvent=function(timer,delay,tick,repeatCount,loop,callback,callbackContext,args){this.timer=timer;this.delay=delay;this.tick=tick;this.repeatCount=repeatCount-1;this.loop=loop;this.callback=callback;this.callbackContext=callbackContext;this.args=args;this.pendingDelete=false;};Phaser.TimerEvent.prototype.constructor=Phaser.TimerEvent;Phaser.AnimationManager=function(sprite){this.sprite=sprite;this.game=sprite.game;this.currentFrame=null;this.currentAnim=null;this.updateIfVisible=true;this.isLoaded=false;this._frameData=null;this._anims={};this._outputFrames=[];};Phaser.AnimationManager.prototype={loadFrameData:function(frameData){this._frameData=frameData;this.frame=0;this.isLoaded=true;},add:function(name,frames,frameRate,loop,useNumericIndex){if(this._frameData==null)
{console.warn('No FrameData available for Phaser.Animation '+name);return;}
frames=frames||[];frameRate=frameRate||60;if(typeof loop==='undefined'){loop=false;}
if(typeof useNumericIndex==='undefined')
{if(frames&&typeof frames[0]==='number')
{useNumericIndex=true;}
else
{useNumericIndex=false;}}
if(this.sprite.events.onAnimationStart==null)
{this.sprite.events.onAnimationStart=new Phaser.Signal();this.sprite.events.onAnimationComplete=new Phaser.Signal();this.sprite.events.onAnimationLoop=new Phaser.Signal();}
this._outputFrames.length=0;this._frameData.getFrameIndexes(frames,useNumericIndex,this._outputFrames);this._anims[name]=new Phaser.Animation(this.game,this.sprite,name,this._frameData,this._outputFrames,frameRate,loop);this.currentAnim=this._anims[name];this.currentFrame=this.currentAnim.currentFrame;this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);if(this.sprite.__tilePattern)
{this.__tilePattern=false;this.tilingTexture=false;}
return this._anims[name];},validateFrames:function(frames,useNumericIndex){if(typeof useNumericIndex=='undefined'){useNumericIndex=true;}
for(var i=0;i<frames.length;i++)
{if(useNumericIndex===true)
{if(frames[i]>this._frameData.total)
{return false;}}
else
{if(this._frameData.checkFrameName(frames[i])===false)
{return false;}}}
return true;},play:function(name,frameRate,loop,killOnComplete){if(this._anims[name])
{if(this.currentAnim===this._anims[name])
{if(this.currentAnim.isPlaying===false)
{this.currentAnim.paused=false;return this.currentAnim.play(frameRate,loop,killOnComplete);}}
else
{if(this.currentAnim&&this.currentAnim.isPlaying)
{this.currentAnim.stop();}
this.currentAnim=this._anims[name];this.currentAnim.paused=false;return this.currentAnim.play(frameRate,loop,killOnComplete);}}},stop:function(name,resetFrame){if(typeof resetFrame=='undefined'){resetFrame=false;}
if(typeof name=='string')
{if(this._anims[name])
{this.currentAnim=this._anims[name];this.currentAnim.stop(resetFrame);}}
else
{if(this.currentAnim)
{this.currentAnim.stop(resetFrame);}}},update:function(){if(this.updateIfVisible&&!this.sprite.visible)
{return false;}
if(this.currentAnim&&this.currentAnim.update()===true)
{this.currentFrame=this.currentAnim.currentFrame;return true;}
return false;},getAnimation:function(name){if(typeof name==='string')
{if(this._anims[name])
{return this._anims[name];}}
return null;},refreshFrame:function(){this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);if(this.sprite.__tilePattern)
{this.__tilePattern=false;this.tilingTexture=false;}},destroy:function(){var anim=null;for(var anim in this._anims)
{if(this._anims.hasOwnProperty(anim))
{this._anims[anim].destroy();}}
this._anims={};this._frameData=null;this._frameIndex=0;this.currentAnim=null;this.currentFrame=null;}};Phaser.AnimationManager.prototype.constructor=Phaser.AnimationManager;Object.defineProperty(Phaser.AnimationManager.prototype,'frameData',{get:function(){return this._frameData;}});Object.defineProperty(Phaser.AnimationManager.prototype,'frameTotal',{get:function(){if(this._frameData)
{return this._frameData.total;}
else
{return-1;}}});Object.defineProperty(Phaser.AnimationManager.prototype,'paused',{get:function(){return this.currentAnim.isPaused;},set:function(value){this.currentAnim.paused=value;}});Object.defineProperty(Phaser.AnimationManager.prototype,'frame',{get:function(){if(this.currentFrame)
{return this._frameIndex;}},set:function(value){if(typeof value==='number'&&this._frameData&&this._frameData.getFrame(value)!==null)
{this.currentFrame=this._frameData.getFrame(value);if(this.currentFrame)
{this._frameIndex=value;this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);if(this.sprite.__tilePattern)
{this.__tilePattern=false;this.tilingTexture=false;}}}}});Object.defineProperty(Phaser.AnimationManager.prototype,'frameName',{get:function(){if(this.currentFrame)
{return this.currentFrame.name;}},set:function(value){if(typeof value==='string'&&this._frameData&&this._frameData.getFrameByName(value)!==null)
{this.currentFrame=this._frameData.getFrameByName(value);if(this.currentFrame)
{this._frameIndex=this.currentFrame.index;this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);if(this.sprite.__tilePattern)
{this.__tilePattern=false;this.tilingTexture=false;}}}
else
{console.warn('Cannot set frameName: '+value);}}});Phaser.Animation=function(game,parent,name,frameData,frames,delay,loop){this.game=game;this._parent=parent;this._frameData=frameData;this.name=name;this._frames=[];this._frames=this._frames.concat(frames);this.delay=1000/delay;this.loop=loop;this.loopCount=0;this.killOnComplete=false;this.isFinished=false;this.isPlaying=false;this.isPaused=false;this._pauseStartTime=0;this._frameIndex=0;this._frameDiff=0;this._frameSkip=1;this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]);this.onStart=new Phaser.Signal();this.onComplete=new Phaser.Signal();this.onLoop=new Phaser.Signal();this.game.onPause.add(this.onPause,this);this.game.onResume.add(this.onResume,this);};Phaser.Animation.prototype={play:function(frameRate,loop,killOnComplete){if(typeof frameRate==='number')
{this.delay=1000/frameRate;}
if(typeof loop==='boolean')
{this.loop=loop;}
if(typeof killOnComplete!=='undefined')
{this.killOnComplete=killOnComplete;}
this.isPlaying=true;this.isFinished=false;this.paused=false;this.loopCount=0;this._timeLastFrame=this.game.time.now;this._timeNextFrame=this.game.time.now+this.delay;this._frameIndex=0;this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]);this._parent.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);if(this._parent.__tilePattern)
{this._parent.__tilePattern=false;this._parent.tilingTexture=false;}
this._parent.events.onAnimationStart.dispatch(this._parent,this);this.onStart.dispatch(this._parent,this);return this;},restart:function(){this.isPlaying=true;this.isFinished=false;this.paused=false;this.loopCount=0;this._timeLastFrame=this.game.time.now;this._timeNextFrame=this.game.time.now+this.delay;this._frameIndex=0;this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]);this.onStart.dispatch(this._parent,this);},setFrame:function(frameId,useLocalFrameIndex){var frameIndex;if(typeof useLocalFrameIndex==='undefined')
{useLocalFrameIndex=false;}
if(typeof frameId==="string")
{for(var i=0;i<this._frames.length;i++)
{if(this._frameData.getFrame(this._frames[i]).name===frameId)
{frameIndex=i;}}}
else if(typeof frameId==="number")
{if(useLocalFrameIndex)
{frameIndex=frameId;}
else
{for(var i=0;i<this._frames.length;i++)
{if(this.frames[i]===frameIndex)
{frameIndex=i;}}}}
if(frameIndex)
{this._frameIndex=frameIndex-1;this._timeNextFrame=this.game.time.now;this.update();}},stop:function(resetFrame,dispatchComplete){if(typeof resetFrame==='undefined'){resetFrame=false;}
if(typeof dispatchComplete==='undefined'){dispatchComplete=false;}
this.isPlaying=false;this.isFinished=true;this.paused=false;if(resetFrame)
{this.currentFrame=this._frameData.getFrame(this._frames[0]);}
if(dispatchComplete)
{this._parent.events.onAnimationComplete.dispatch(this._parent,this);this.onComplete.dispatch(this._parent,this);}},onPause:function(){if(this.isPlaying)
{this._frameDiff=this._timeNextFrame-this.game.time.now;}},onResume:function(){if(this.isPlaying)
{this._timeNextFrame=this.game.time.now+this._frameDiff;}},update:function(){if(this.isPaused)
{return false;}
if(this.isPlaying===true&&this.game.time.now>=this._timeNextFrame)
{this._frameSkip=1;this._frameDiff=this.game.time.now-this._timeNextFrame;this._timeLastFrame=this.game.time.now;if(this._frameDiff>this.delay)
{this._frameSkip=Math.floor(this._frameDiff/this.delay);this._frameDiff-=(this._frameSkip*this.delay);}
this._timeNextFrame=this.game.time.now+(this.delay-this._frameDiff);this._frameIndex+=this._frameSkip;if(this._frameIndex>=this._frames.length)
{if(this.loop)
{this._frameIndex%=this._frames.length;this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]);if(this.currentFrame)
{this._parent.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);if(this._parent.__tilePattern)
{this._parent.__tilePattern=false;this._parent.tilingTexture=false;}}
this.loopCount++;this._parent.events.onAnimationLoop.dispatch(this._parent,this);this.onLoop.dispatch(this._parent,this);}
else
{this.complete();}}
else
{this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]);if(this.currentFrame)
{this._parent.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);if(this._parent.__tilePattern)
{this._parent.__tilePattern=false;this._parent.tilingTexture=false;}}}
return true;}
return false;},destroy:function(){this.game.onPause.remove(this.onPause,this);this.game.onResume.remove(this.onResume,this);this.game=null;this._parent=null;this._frames=null;this._frameData=null;this.currentFrame=null;this.isPlaying=false;this.onStart.dispose();this.onLoop.dispose();this.onComplete.dispose();},complete:function(){this.isPlaying=false;this.isFinished=true;this.paused=false;this._parent.events.onAnimationComplete.dispatch(this._parent,this);this.onComplete.dispatch(this._parent,this);if(this.killOnComplete)
{this._parent.kill();}}};Phaser.Animation.prototype.constructor=Phaser.Animation;Object.defineProperty(Phaser.Animation.prototype,'paused',{get:function(){return this.isPaused;},set:function(value){this.isPaused=value;if(value)
{this._pauseStartTime=this.game.time.now;}
else
{if(this.isPlaying)
{this._timeNextFrame=this.game.time.now+this.delay;}}}});Object.defineProperty(Phaser.Animation.prototype,'frameTotal',{get:function(){return this._frames.length;}});Object.defineProperty(Phaser.Animation.prototype,'frame',{get:function(){if(this.currentFrame!==null)
{return this.currentFrame.index;}
else
{return this._frameIndex;}},set:function(value){this.currentFrame=this._frameData.getFrame(this._frames[value]);if(this.currentFrame!==null)
{this._frameIndex=value;this._parent.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);}}});Object.defineProperty(Phaser.Animation.prototype,'speed',{get:function(){return Math.round(1000/this.delay);},set:function(value){if(value>=1)
{this.delay=1000/value;}}});Phaser.Animation.generateFrameNames=function(prefix,start,stop,suffix,zeroPad){if(typeof suffix=='undefined'){suffix='';}
var output=[];var frame='';if(start<stop)
{for(var i=start;i<=stop;i++)
{if(typeof zeroPad=='number')
{frame=Phaser.Utils.pad(i.toString(),zeroPad,'0',1);}
else
{frame=i.toString();}
frame=prefix+frame+suffix;output.push(frame);}}
else
{for(var i=start;i>=stop;i--)
{if(typeof zeroPad=='number')
{frame=Phaser.Utils.pad(i.toString(),zeroPad,'0',1);}
else
{frame=i.toString();}
frame=prefix+frame+suffix;output.push(frame);}}
return output;};Phaser.Frame=function(index,x,y,width,height,name,uuid){this.index=index;this.x=x;this.y=y;this.width=width;this.height=height;this.name=name;this.uuid=uuid;this.centerX=Math.floor(width/2);this.centerY=Math.floor(height/2);this.distance=Phaser.Math.distance(0,0,width,height);this.rotated=false;this.rotationDirection='cw';this.trimmed=false;this.sourceSizeW=width;this.sourceSizeH=height;this.spriteSourceSizeX=0;this.spriteSourceSizeY=0;this.spriteSourceSizeW=0;this.spriteSourceSizeH=0;};Phaser.Frame.prototype={setTrim:function(trimmed,actualWidth,actualHeight,destX,destY,destWidth,destHeight){this.trimmed=trimmed;if(trimmed)
{this.width=actualWidth;this.height=actualHeight;this.sourceSizeW=actualWidth;this.sourceSizeH=actualHeight;this.centerX=Math.floor(actualWidth/2);this.centerY=Math.floor(actualHeight/2);this.spriteSourceSizeX=destX;this.spriteSourceSizeY=destY;this.spriteSourceSizeW=destWidth;this.spriteSourceSizeH=destHeight;}},getRect:function(out){if(typeof out==='undefined')
{out=new Phaser.Rectangle(this.x,this.y,this.width,this.height);}
else
{out.setTo(this.x,this.y,this.width,this.height);}
return out;}};Phaser.Frame.prototype.constructor=Phaser.Frame;Phaser.FrameData=function(){this._frames=[];this._frameNames=[];};Phaser.FrameData.prototype={addFrame:function(frame){frame.index=this._frames.length;this._frames.push(frame);if(frame.name!=='')
{this._frameNames[frame.name]=frame.index;}
return frame;},getFrame:function(index){if(index>this._frames.length)
{index=0;}
return this._frames[index];},getFrameByName:function(name){if(typeof this._frameNames[name]==='number')
{return this._frames[this._frameNames[name]];}
return null;},checkFrameName:function(name){if(this._frameNames[name]==null)
{return false;}
return true;},getFrameRange:function(start,end,output){if(typeof output==="undefined"){output=[];}
for(var i=start;i<=end;i++)
{output.push(this._frames[i]);}
return output;},getFrames:function(frames,useNumericIndex,output){if(typeof useNumericIndex==="undefined"){useNumericIndex=true;}
if(typeof output==="undefined"){output=[];}
if(typeof frames==="undefined"||frames.length===0)
{for(var i=0;i<this._frames.length;i++)
{output.push(this._frames[i]);}}
else
{for(var i=0,len=frames.length;i<len;i++)
{if(useNumericIndex)
{output.push(this.getFrame(frames[i]));}
else
{output.push(this.getFrameByName(frames[i]));}}}
return output;},getFrameIndexes:function(frames,useNumericIndex,output){if(typeof useNumericIndex==="undefined"){useNumericIndex=true;}
if(typeof output==="undefined"){output=[];}
if(typeof frames==="undefined"||frames.length===0)
{for(var i=0,len=this._frames.length;i<len;i++)
{output.push(this._frames[i].index);}}
else
{for(var i=0,len=frames.length;i<len;i++)
{if(useNumericIndex)
{output.push(frames[i]);}
else
{if(this.getFrameByName(frames[i]))
{output.push(this.getFrameByName(frames[i]).index);}}}}
return output;}};Phaser.FrameData.prototype.constructor=Phaser.FrameData;Object.defineProperty(Phaser.FrameData.prototype,"total",{get:function(){return this._frames.length;}});Phaser.AnimationParser={spriteSheet:function(game,key,frameWidth,frameHeight,frameMax,margin,spacing){var img=game.cache.getImage(key);if(img==null)
{return null;}
var width=img.width;var height=img.height;if(frameWidth<=0)
{frameWidth=Math.floor(-width/Math.min(-1,frameWidth));}
if(frameHeight<=0)
{frameHeight=Math.floor(-height/Math.min(-1,frameHeight));}
var row=Math.floor((width-margin)/(frameWidth+spacing));var column=Math.floor((height-margin)/(frameHeight+spacing));var total=row*column;if(frameMax!==-1)
{total=frameMax;}
if(width===0||height===0||width<frameWidth||height<frameHeight||total===0)
{console.warn("Phaser.AnimationParser.spriteSheet: width/height zero or width/height < given frameWidth/frameHeight");return null;}
var data=new Phaser.FrameData();var x=margin;var y=margin;for(var i=0;i<total;i++)
{var uuid=game.rnd.uuid();data.addFrame(new Phaser.Frame(i,x,y,frameWidth,frameHeight,'',uuid));PIXI.TextureCache[uuid]=new PIXI.Texture(PIXI.BaseTextureCache[key],{x:x,y:y,width:frameWidth,height:frameHeight});x+=frameWidth+spacing;if(x+frameWidth>width)
{x=margin;y+=frameHeight+spacing;}}
return data;},JSONData:function(game,json,cacheKey){if(!json['frames'])
{console.warn("Phaser.AnimationParser.JSONData: Invalid Texture Atlas JSON given, missing 'frames' array");console.log(json);return;}
var data=new Phaser.FrameData();var frames=json['frames'];var newFrame;for(var i=0;i<frames.length;i++)
{var uuid=game.rnd.uuid();newFrame=data.addFrame(new Phaser.Frame(i,frames[i].frame.x,frames[i].frame.y,frames[i].frame.w,frames[i].frame.h,frames[i].filename,uuid));PIXI.TextureCache[uuid]=new PIXI.Texture(PIXI.BaseTextureCache[cacheKey],{x:frames[i].frame.x,y:frames[i].frame.y,width:frames[i].frame.w,height:frames[i].frame.h});if(frames[i].trimmed)
{newFrame.setTrim(frames[i].trimmed,frames[i].sourceSize.w,frames[i].sourceSize.h,frames[i].spriteSourceSize.x,frames[i].spriteSourceSize.y,frames[i].spriteSourceSize.w,frames[i].spriteSourceSize.h);PIXI.TextureCache[uuid].trim=new Phaser.Rectangle(frames[i].spriteSourceSize.x,frames[i].spriteSourceSize.y,frames[i].sourceSize.w,frames[i].sourceSize.h);}}
return data;},JSONDataHash:function(game,json,cacheKey){if(!json['frames'])
{console.warn("Phaser.AnimationParser.JSONDataHash: Invalid Texture Atlas JSON given, missing 'frames' object");console.log(json);return;}
var data=new Phaser.FrameData();var frames=json['frames'];var newFrame;var i=0;for(var key in frames)
{var uuid=game.rnd.uuid();newFrame=data.addFrame(new Phaser.Frame(i,frames[key].frame.x,frames[key].frame.y,frames[key].frame.w,frames[key].frame.h,key,uuid));PIXI.TextureCache[uuid]=new PIXI.Texture(PIXI.BaseTextureCache[cacheKey],{x:frames[key].frame.x,y:frames[key].frame.y,width:frames[key].frame.w,height:frames[key].frame.h});if(frames[key].trimmed)
{newFrame.setTrim(frames[key].trimmed,frames[key].sourceSize.w,frames[key].sourceSize.h,frames[key].spriteSourceSize.x,frames[key].spriteSourceSize.y,frames[key].spriteSourceSize.w,frames[key].spriteSourceSize.h);PIXI.TextureCache[uuid].trim=new Phaser.Rectangle(frames[key].spriteSourceSize.x,frames[key].spriteSourceSize.y,frames[key].sourceSize.w,frames[key].sourceSize.h);}
i++;}
return data;},XMLData:function(game,xml,cacheKey){if(!xml.getElementsByTagName('TextureAtlas'))
{console.warn("Phaser.AnimationParser.XMLData: Invalid Texture Atlas XML given, missing <TextureAtlas> tag");return;}
var data=new Phaser.FrameData();var frames=xml.getElementsByTagName('SubTexture');var newFrame;var uuid;var name;var frame;var x;var y;var width;var height;var frameX;var frameY;var frameWidth;var frameHeight;for(var i=0;i<frames.length;i++)
{uuid=game.rnd.uuid();frame=frames[i].attributes;name=frame.name.nodeValue;x=parseInt(frame.x.nodeValue,10);y=parseInt(frame.y.nodeValue,10);width=parseInt(frame.width.nodeValue,10);height=parseInt(frame.height.nodeValue,10);frameX=null;frameY=null;if(frame.frameX)
{frameX=Math.abs(parseInt(frame.frameX.nodeValue,10));frameY=Math.abs(parseInt(frame.frameY.nodeValue,10));frameWidth=parseInt(frame.frameWidth.nodeValue,10);frameHeight=parseInt(frame.frameHeight.nodeValue,10);}
newFrame=data.addFrame(new Phaser.Frame(i,x,y,width,height,name,uuid));PIXI.TextureCache[uuid]=new PIXI.Texture(PIXI.BaseTextureCache[cacheKey],{x:x,y:y,width:width,height:height});if(frameX!==null||frameY!==null)
{newFrame.setTrim(true,width,height,frameX,frameY,frameWidth,frameHeight);PIXI.TextureCache[uuid].trim=new Phaser.Rectangle(frameX,frameY,width,height);}}
return data;}};Phaser.Cache=function(game){this.game=game;this._canvases={};this._images={};this._textures={};this._sounds={};this._text={};this._json={};this._physics={};this._tilemaps={};this._binary={};this._bitmapDatas={};this._bitmapFont={};this.addDefaultImage();this.addMissingImage();this.onSoundUnlock=new Phaser.Signal();};Phaser.Cache.CANVAS=1;Phaser.Cache.IMAGE=2;Phaser.Cache.TEXTURE=3;Phaser.Cache.SOUND=4;Phaser.Cache.TEXT=5;Phaser.Cache.PHYSICS=6;Phaser.Cache.TILEMAP=7;Phaser.Cache.BINARY=8;Phaser.Cache.BITMAPDATA=9;Phaser.Cache.BITMAPFONT=10;Phaser.Cache.JSON=11;Phaser.Cache.prototype={addCanvas:function(key,canvas,context){this._canvases[key]={canvas:canvas,context:context};},addBinary:function(key,binaryData){this._binary[key]=binaryData;},addBitmapData:function(key,bitmapData){this._bitmapDatas[key]=bitmapData;return bitmapData;},addRenderTexture:function(key,texture){var frame=new Phaser.Frame(0,0,0,texture.width,texture.height,'','');this._textures[key]={texture:texture,frame:frame};},addSpriteSheet:function(key,url,data,frameWidth,frameHeight,frameMax,margin,spacing){this._images[key]={url:url,data:data,spriteSheet:true,frameWidth:frameWidth,frameHeight:frameHeight,margin:margin,spacing:spacing};PIXI.BaseTextureCache[key]=new PIXI.BaseTexture(data);PIXI.TextureCache[key]=new PIXI.Texture(PIXI.BaseTextureCache[key]);this._images[key].frameData=Phaser.AnimationParser.spriteSheet(this.game,key,frameWidth,frameHeight,frameMax,margin,spacing);},addTilemap:function(key,url,mapData,format){this._tilemaps[key]={url:url,data:mapData,format:format};},addTextureAtlas:function(key,url,data,atlasData,format){this._images[key]={url:url,data:data,spriteSheet:true};PIXI.BaseTextureCache[key]=new PIXI.BaseTexture(data);PIXI.TextureCache[key]=new PIXI.Texture(PIXI.BaseTextureCache[key]);if(format==Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY)
{this._images[key].frameData=Phaser.AnimationParser.JSONData(this.game,atlasData,key);}
else if(format==Phaser.Loader.TEXTURE_ATLAS_JSON_HASH)
{this._images[key].frameData=Phaser.AnimationParser.JSONDataHash(this.game,atlasData,key);}
else if(format==Phaser.Loader.TEXTURE_ATLAS_XML_STARLING)
{this._images[key].frameData=Phaser.AnimationParser.XMLData(this.game,atlasData,key);}},addBitmapFont:function(key,url,data,xmlData,xSpacing,ySpacing){this._images[key]={url:url,data:data,spriteSheet:true};PIXI.BaseTextureCache[key]=new PIXI.BaseTexture(data);PIXI.TextureCache[key]=new PIXI.Texture(PIXI.BaseTextureCache[key]);Phaser.LoaderParser.bitmapFont(this.game,xmlData,key,xSpacing,ySpacing);},addPhysicsData:function(key,url,JSONData,format){this._physics[key]={url:url,data:JSONData,format:format};},addDefaultImage:function(){var img=new Image();img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABVJREFUeF7NwIEAAAAAgKD9qdeocAMAoAABm3DkcAAAAABJRU5ErkJggg==";this._images['__default']={url:null,data:img,spriteSheet:false};this._images['__default'].frame=new Phaser.Frame(0,0,0,32,32,'','');PIXI.BaseTextureCache['__default']=new PIXI.BaseTexture(img);PIXI.TextureCache['__default']=new PIXI.Texture(PIXI.BaseTextureCache['__default']);},addMissingImage:function(){var img=new Image();img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJ9JREFUeNq01ssOwyAMRFG46v//Mt1ESmgh+DFmE2GPOBARKb2NVjo+17PXLD8a1+pl5+A+wSgFygymWYHBb0FtsKhJDdZlncG2IzJ4ayoMDv20wTmSMzClEgbWYNTAkQ0Z+OJ+A/eWnAaR9+oxCF4Os0H8htsMUp+pwcgBBiMNnAwF8GqIgL2hAzaGFFgZauDPKABmowZ4GL369/0rwACp2yA/ttmvsQAAAABJRU5ErkJggg==";this._images['__missing']={url:null,data:img,spriteSheet:false};this._images['__missing'].frame=new Phaser.Frame(0,0,0,32,32,'','');PIXI.BaseTextureCache['__missing']=new PIXI.BaseTexture(img);PIXI.TextureCache['__missing']=new PIXI.Texture(PIXI.BaseTextureCache['__missing']);},addText:function(key,url,data){this._text[key]={url:url,data:data};},addJSON:function(key,url,data){this._json[key]={url:url,data:data};},addImage:function(key,url,data){this._images[key]={url:url,data:data,spriteSheet:false};this._images[key].frame=new Phaser.Frame(0,0,0,data.width,data.height,key,this.game.rnd.uuid());PIXI.BaseTextureCache[key]=new PIXI.BaseTexture(data);PIXI.TextureCache[key]=new PIXI.Texture(PIXI.BaseTextureCache[key]);},addSound:function(key,url,data,webAudio,audioTag){webAudio=webAudio||true;audioTag=audioTag||false;var decoded=false;if(audioTag)
{decoded=true;}
this._sounds[key]={url:url,data:data,isDecoding:false,decoded:decoded,webAudio:webAudio,audioTag:audioTag,locked:this.game.sound.touchLocked};},reloadSound:function(key){var _this=this;if(this._sounds[key])
{this._sounds[key].data.src=this._sounds[key].url;this._sounds[key].data.addEventListener('canplaythrough',function(){return _this.reloadSoundComplete(key);},false);this._sounds[key].data.load();}},reloadSoundComplete:function(key){if(this._sounds[key])
{this._sounds[key].locked=false;this.onSoundUnlock.dispatch(key);}},updateSound:function(key,property,value){if(this._sounds[key])
{this._sounds[key][property]=value;}},decodedSound:function(key,data){this._sounds[key].data=data;this._sounds[key].decoded=true;this._sounds[key].isDecoding=false;},getCanvas:function(key){if(this._canvases[key])
{return this._canvases[key].canvas;}
else
{console.warn('Phaser.Cache.getCanvas: Invalid key: "'+key+'"');}},getBitmapData:function(key){if(this._bitmapDatas[key])
{return this._bitmapDatas[key];}
else
{console.warn('Phaser.Cache.getBitmapData: Invalid key: "'+key+'"');}},getBitmapFont:function(key){if(this._bitmapFont[key])
{return this._bitmapFont[key];}
else
{console.warn('Phaser.Cache.getBitmapFont: Invalid key: "'+key+'"');}},getPhysicsData:function(key,object,fixtureKey){if(typeof object==='undefined'||object===null)
{if(this._physics[key])
{return this._physics[key].data;}
else
{console.warn('Phaser.Cache.getPhysicsData: Invalid key: "'+key+'"');}}
else
{if(this._physics[key]&&this._physics[key].data[object])
{var fixtures=this._physics[key].data[object];if(fixtures&&fixtureKey)
{for(var fixture in fixtures)
{fixture=fixtures[fixture];if(fixture.fixtureKey===fixtureKey)
{return fixture;}}
console.warn('Phaser.Cache.getPhysicsData: Could not find given fixtureKey: "'+fixtureKey+' in '+key+'"');}
else
{return fixtures;}}
else
{console.warn('Phaser.Cache.getPhysicsData: Invalid key/object: "'+key+' / '+object+'"');}}
return null;},checkImageKey:function(key){if(this._images[key])
{return true;}
return false;},getImage:function(key){if(this._images[key])
{return this._images[key].data;}
else
{console.warn('Phaser.Cache.getImage: Invalid key: "'+key+'"');}},getTilemapData:function(key){if(this._tilemaps[key])
{return this._tilemaps[key];}
else
{console.warn('Phaser.Cache.getTilemapData: Invalid key: "'+key+'"');}},getFrameData:function(key){if(this._images[key]&&this._images[key].frameData)
{return this._images[key].frameData;}
return null;},updateFrameData:function(key,frameData){if(this._images[key])
{this._images[key].spriteSheet=true;this._images[key].frameData=frameData;}},getFrameByIndex:function(key,frame){if(this._images[key]&&this._images[key].frameData)
{return this._images[key].frameData.getFrame(frame);}
return null;},getFrameByName:function(key,frame){if(this._images[key]&&this._images[key].frameData)
{return this._images[key].frameData.getFrameByName(frame);}
return null;},getFrame:function(key){if(this._images[key]&&this._images[key].spriteSheet===false)
{return this._images[key].frame;}
return null;},getTextureFrame:function(key){if(this._textures[key])
{return this._textures[key].frame;}
return null;},getTexture:function(key){if(this._textures[key])
{return this._textures[key];}
else
{console.warn('Phaser.Cache.getTexture: Invalid key: "'+key+'"');}},getSound:function(key){if(this._sounds[key])
{return this._sounds[key];}
else
{console.warn('Phaser.Cache.getSound: Invalid key: "'+key+'"');}},getSoundData:function(key){if(this._sounds[key])
{return this._sounds[key].data;}
else
{console.warn('Phaser.Cache.getSoundData: Invalid key: "'+key+'"');}},isSoundDecoded:function(key){if(this._sounds[key])
{return this._sounds[key].decoded;}},isSoundReady:function(key){return(this._sounds[key]&&this._sounds[key].decoded&&this.game.sound.touchLocked===false);},isSpriteSheet:function(key){if(this._images[key])
{return this._images[key].spriteSheet;}
return false;},getText:function(key){if(this._text[key])
{return this._text[key].data;}
else
{console.warn('Phaser.Cache.getText: Invalid key: "'+key+'"');}},getJSON:function(key){if(this._json[key])
{return this._json[key].data;}
else
{console.warn('Phaser.Cache.getJSON: Invalid key: "'+key+'"');}},getBinary:function(key){if(this._binary[key])
{return this._binary[key];}
else
{console.warn('Phaser.Cache.getBinary: Invalid key: "'+key+'"');}},getKeys:function(type){var array=null;switch(type)
{case Phaser.Cache.CANVAS:array=this._canvases;break;case Phaser.Cache.IMAGE:array=this._images;break;case Phaser.Cache.TEXTURE:array=this._textures;break;case Phaser.Cache.SOUND:array=this._sounds;break;case Phaser.Cache.TEXT:array=this._text;break;case Phaser.Cache.PHYSICS:array=this._physics;break;case Phaser.Cache.TILEMAP:array=this._tilemaps;break;case Phaser.Cache.BINARY:array=this._binary;break;case Phaser.Cache.BITMAPDATA:array=this._bitmapDatas;break;case Phaser.Cache.BITMAPFONT:array=this._bitmapFont;break;case Phaser.Cache.JSON:array=this._json;break;}
if(!array)
{return;}
var output=[];for(var item in array)
{if(item!=='__default'&&item!=='__missing')
{output.push(item);}}
return output;},removeCanvas:function(key){delete this._canvases[key];},removeImage:function(key){delete this._images[key];},removeSound:function(key){delete this._sounds[key];},removeText:function(key){delete this._text[key];},removeJSON:function(key){delete this._json[key];},removePhysics:function(key){delete this._physics[key];},removeTilemap:function(key){delete this._tilemaps[key];},removeBinary:function(key){delete this._binary[key];},removeBitmapData:function(key){delete this._bitmapDatas[key];},removeBitmapFont:function(key){delete this._bitmapFont[key];},destroy:function(){for(var item in this._canvases)
{delete this._canvases[item];}
for(var item in this._images)
{if(item!=='__default'&&item!=='__missing')
{delete this._images[item];}}
for(var item in this._sounds)
{delete this._sounds[item];}
for(var item in this._text)
{delete this._text[item];}
for(var item in this._json)
{delete this._json[item];}
for(var item in this._textures)
{delete this._textures[item];}
for(var item in this._physics)
{delete this._physics[item];}
for(var item in this._tilemaps)
{delete this._tilemaps[item];}
for(var item in this._binary)
{delete this._binary[item];}
for(var item in this._bitmapDatas)
{delete this._bitmapDatas[item];}
for(var item in this._bitmapFont)
{delete this._bitmapFont[item];}}};Phaser.Cache.prototype.constructor=Phaser.Cache;Phaser.Loader=function(game){this.game=game;this._fileList=[];this._fileIndex=0;this._progressChunk=0;this._xhr=new XMLHttpRequest();this._ajax=null;this.isLoading=false;this.hasLoaded=false;this.progress=0;this.progressFloat=0;this.preloadSprite=null;this.crossOrigin=false;this.baseURL='';this.onLoadStart=new Phaser.Signal();this.onFileStart=new Phaser.Signal();this.onFileComplete=new Phaser.Signal();this.onFileError=new Phaser.Signal();this.onLoadComplete=new Phaser.Signal();};Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY=0;Phaser.Loader.TEXTURE_ATLAS_JSON_HASH=1;Phaser.Loader.TEXTURE_ATLAS_XML_STARLING=2;Phaser.Loader.PHYSICS_LIME_CORONA_JSON=3;Phaser.Loader.PHYSICS_PHASER_JSON=4;Phaser.Loader.prototype={setPreloadSprite:function(sprite,direction){direction=direction||0;this.preloadSprite={sprite:sprite,direction:direction,width:sprite.width,height:sprite.height,rect:null};if(direction===0)
{this.preloadSprite.rect=new Phaser.Rectangle(0,0,1,sprite.height);}
else
{this.preloadSprite.rect=new Phaser.Rectangle(0,0,sprite.width,1);}
sprite.crop(this.preloadSprite.rect);sprite.visible=true;},checkKeyExists:function(type,key){if(this._fileList.length>0)
{for(var i=0;i<this._fileList.length;i++)
{if(this._fileList[i].type===type&&this._fileList[i].key===key)
{return true;}}}
return false;},getAssetIndex:function(type,key){if(this._fileList.length>0)
{for(var i=0;i<this._fileList.length;i++)
{if(this._fileList[i].type===type&&this._fileList[i].key===key)
{return i;}}}
return-1;},getAsset:function(type,key){if(this._fileList.length>0)
{for(var i=0;i<this._fileList.length;i++)
{if(this._fileList[i].type===type&&this._fileList[i].key===key)
{return{index:i,file:this._fileList[i]};}}}
return false;},reset:function(){this.preloadSprite=null;this.isLoading=false;this._fileList.length=0;this._fileIndex=0;},addToFileList:function(type,key,url,properties){var entry={type:type,key:key,url:url,data:null,error:false,loaded:false};if(typeof properties!=="undefined")
{for(var prop in properties)
{entry[prop]=properties[prop];}}
if(this.checkKeyExists(type,key)===false)
{this._fileList.push(entry);}},replaceInFileList:function(type,key,url,properties){var entry={type:type,key:key,url:url,data:null,error:false,loaded:false};if(typeof properties!=="undefined")
{for(var prop in properties)
{entry[prop]=properties[prop];}}
var index=this.getAssetIndex(type,key);if(index===-1)
{this._fileList.push(entry);}
else
{this._fileList[index]=entry;}},image:function(key,url,overwrite){if(typeof overwrite==="undefined"){overwrite=false;}
if(overwrite)
{this.replaceInFileList('image',key,url);}
else
{this.addToFileList('image',key,url);}
return this;},text:function(key,url,overwrite){if(typeof overwrite==="undefined"){overwrite=false;}
if(overwrite)
{this.replaceInFileList('text',key,url);}
else
{this.addToFileList('text',key,url);}
return this;},json:function(key,url,overwrite){if(typeof overwrite==="undefined"){overwrite=false;}
if(overwrite)
{this.replaceInFileList('json',key,url);}
else
{this.addToFileList('json',key,url);}
return this;},script:function(key,url,callback,callbackContext){if(typeof callback==='undefined'){callback=false;}
if(callback!==false&&typeof callbackContext==='undefined'){callbackContext=callback;}
this.addToFileList('script',key,url,{callback:callback,callbackContext:callbackContext});return this;},binary:function(key,url,callback,callbackContext){if(typeof callback==='undefined'){callback=false;}
if(callback!==false&&typeof callbackContext==='undefined'){callbackContext=callback;}
this.addToFileList('binary',key,url,{callback:callback,callbackContext:callbackContext});return this;},spritesheet:function(key,url,frameWidth,frameHeight,frameMax,margin,spacing){if(typeof frameMax==="undefined"){frameMax=-1;}
if(typeof margin==="undefined"){margin=0;}
if(typeof spacing==="undefined"){spacing=0;}
this.addToFileList('spritesheet',key,url,{frameWidth:frameWidth,frameHeight:frameHeight,frameMax:frameMax,margin:margin,spacing:spacing});return this;},audio:function(key,urls,autoDecode){if(typeof autoDecode==="undefined"){autoDecode=true;}
this.addToFileList('audio',key,urls,{buffer:null,autoDecode:autoDecode});return this;},tilemap:function(key,mapDataURL,mapData,format){if(typeof mapDataURL==="undefined"){mapDataURL=null;}
if(typeof mapData==="undefined"){mapData=null;}
if(typeof format==="undefined"){format=Phaser.Tilemap.CSV;}
if(mapDataURL==null&&mapData==null)
{console.warn('Phaser.Loader.tilemap - Both mapDataURL and mapData are null. One must be set.');return this;}
if(mapData)
{switch(format)
{case Phaser.Tilemap.CSV:break;case Phaser.Tilemap.TILED_JSON:if(typeof mapData==='string')
{mapData=JSON.parse(mapData);}
break;}
this.game.cache.addTilemap(key,null,mapData,format);}
else
{this.addToFileList('tilemap',key,mapDataURL,{format:format});}
return this;},physics:function(key,dataURL,jsonData,format){if(typeof dataURL==="undefined"){dataURL=null;}
if(typeof jsonData==="undefined"){jsonData=null;}
if(typeof format==="undefined"){format=Phaser.Physics.LIME_CORONA_JSON;}
if(dataURL==null&&jsonData==null)
{console.warn('Phaser.Loader.physics - Both dataURL and jsonData are null. One must be set.');return this;}
if(jsonData)
{if(typeof jsonData==='string')
{jsonData=JSON.parse(jsonData);}
this.game.cache.addPhysicsData(key,null,jsonData,format);}
else
{this.addToFileList('physics',key,dataURL,{format:format});}
return this;},bitmapFont:function(key,textureURL,xmlURL,xmlData,xSpacing,ySpacing){if(typeof xmlURL==="undefined"){xmlURL=null;}
if(typeof xmlData==="undefined"){xmlData=null;}
if(typeof xSpacing==="undefined"){xSpacing=0;}
if(typeof ySpacing==="undefined"){ySpacing=0;}
if(xmlURL)
{this.addToFileList('bitmapfont',key,textureURL,{xmlURL:xmlURL,xSpacing:xSpacing,ySpacing:ySpacing});}
else
{if(typeof xmlData==='string')
{var xml;try{if(window['DOMParser'])
{var domparser=new DOMParser();xml=domparser.parseFromString(xmlData,"text/xml");}
else
{xml=new ActiveXObject("Microsoft.XMLDOM");xml.async='false';xml.loadXML(xmlData);}}
catch(e)
{xml=undefined;}
if(!xml||!xml.documentElement||xml.getElementsByTagName("parsererror").length)
{throw new Error("Phaser.Loader. Invalid Bitmap Font XML given");}
else
{this.addToFileList('bitmapfont',key,textureURL,{xmlURL:null,xmlData:xml,xSpacing:xSpacing,ySpacing:ySpacing});}}}
return this;},atlasJSONArray:function(key,textureURL,atlasURL,atlasData){return this.atlas(key,textureURL,atlasURL,atlasData,Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);},atlasJSONHash:function(key,textureURL,atlasURL,atlasData){return this.atlas(key,textureURL,atlasURL,atlasData,Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);},atlasXML:function(key,textureURL,atlasURL,atlasData){return this.atlas(key,textureURL,atlasURL,atlasData,Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);},atlas:function(key,textureURL,atlasURL,atlasData,format){if(typeof atlasURL==="undefined"){atlasURL=null;}
if(typeof atlasData==="undefined"){atlasData=null;}
if(typeof format==="undefined"){format=Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY;}
if(atlasURL)
{this.addToFileList('textureatlas',key,textureURL,{atlasURL:atlasURL,format:format});}
else
{switch(format)
{case Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY:if(typeof atlasData==='string')
{atlasData=JSON.parse(atlasData);}
break;case Phaser.Loader.TEXTURE_ATLAS_XML_STARLING:if(typeof atlasData==='string')
{var xml;try{if(window['DOMParser'])
{var domparser=new DOMParser();xml=domparser.parseFromString(atlasData,"text/xml");}
else
{xml=new ActiveXObject("Microsoft.XMLDOM");xml.async='false';xml.loadXML(atlasData);}}
catch(e)
{xml=undefined;}
if(!xml||!xml.documentElement||xml.getElementsByTagName("parsererror").length)
{throw new Error("Phaser.Loader. Invalid Texture Atlas XML given");}
else
{atlasData=xml;}}
break;}
this.addToFileList('textureatlas',key,textureURL,{atlasURL:null,atlasData:atlasData,format:format});}
return this;},removeFile:function(type,key){var file=this.getAsset(type,key);if(file!==false)
{this._fileList.splice(file.index,1);}},removeAll:function(){this._fileList.length=0;},start:function(){if(this.isLoading)
{return;}
this.progress=0;this.progressFloat=0;this.hasLoaded=false;this.isLoading=true;this.onLoadStart.dispatch(this._fileList.length);if(this._fileList.length>0)
{this._fileIndex=0;this._progressChunk=100/this._fileList.length;this.loadFile();}
else
{this.progress=100;this.progressFloat=100;this.hasLoaded=true;this.onLoadComplete.dispatch();}},loadFile:function(){if(!this._fileList[this._fileIndex])
{console.warn('Phaser.Loader loadFile invalid index '+this._fileIndex);return;}
var file=this._fileList[this._fileIndex];var _this=this;this.onFileStart.dispatch(this.progress,file.key);switch(file.type)
{case'image':case'spritesheet':case'textureatlas':case'bitmapfont':file.data=new Image();file.data.name=file.key;file.data.onload=function(){return _this.fileComplete(_this._fileIndex);};file.data.onerror=function(){return _this.fileError(_this._fileIndex);};if(this.crossOrigin)
{file.data.crossOrigin=this.crossOrigin;}
file.data.src=this.baseURL+file.url;break;case'audio':file.url=this.getAudioURL(file.url);if(file.url!==null)
{if(this.game.sound.usingWebAudio)
{this._xhr.open("GET",this.baseURL+file.url,true);this._xhr.responseType="arraybuffer";this._xhr.onload=function(){return _this.fileComplete(_this._fileIndex);};this._xhr.onerror=function(){return _this.fileError(_this._fileIndex);};this._xhr.send();}
else if(this.game.sound.usingAudioTag)
{if(this.game.sound.touchLocked)
{file.data=new Audio();file.data.name=file.key;file.data.preload='auto';file.data.src=this.baseURL+file.url;this.fileComplete(this._fileIndex);}
else
{file.data=new Audio();file.data.name=file.key;file.data.onerror=function(){return _this.fileError(_this._fileIndex);};file.data.preload='auto';file.data.src=this.baseURL+file.url;file.data.addEventListener('canplaythrough',Phaser.GAMES[this.game.id].load.fileComplete(this._fileIndex),false);file.data.load();}}}
else
{this.fileError(this._fileIndex);}
break;case'json':if(window.XDomainRequest)
{this._ajax=new window.XDomainRequest();this._ajax.timeout=3000;this._ajax.onerror=function(){return _this.dataLoadError(_this._fileIndex);};this._ajax.ontimeout=function(){return _this.dataLoadError(_this._fileIndex);};this._ajax.onprogress=function(){};this._ajax.onload=function(){return _this.jsonLoadComplete(_this._fileIndex);};this._ajax.open('GET',this.baseURL+file.url,true);this._ajax.send();}
else
{this._xhr.open("GET",this.baseURL+file.url,true);this._xhr.responseType="text";this._xhr.onload=function(){return _this.jsonLoadComplete(_this._fileIndex);};this._xhr.onerror=function(){return _this.dataLoadError(_this._fileIndex);};this._xhr.send();}
break;case'tilemap':this._xhr.open("GET",this.baseURL+file.url,true);this._xhr.responseType="text";if(file.format===Phaser.Tilemap.TILED_JSON)
{this._xhr.onload=function(){return _this.jsonLoadComplete(_this._fileIndex);};}
else if(file.format===Phaser.Tilemap.CSV)
{this._xhr.onload=function(){return _this.csvLoadComplete(_this._fileIndex);};}
else
{throw new Error("Phaser.Loader. Invalid Tilemap format: "+file.format);}
this._xhr.onerror=function(){return _this.dataLoadError(_this._fileIndex);};this._xhr.send();break;case'text':case'script':case'physics':this._xhr.open("GET",this.baseURL+file.url,true);this._xhr.responseType="text";this._xhr.onload=function(){return _this.fileComplete(_this._fileIndex);};this._xhr.onerror=function(){return _this.fileError(_this._fileIndex);};this._xhr.send();break;case'binary':this._xhr.open("GET",this.baseURL+file.url,true);this._xhr.responseType="arraybuffer";this._xhr.onload=function(){return _this.fileComplete(_this._fileIndex);};this._xhr.onerror=function(){return _this.fileError(_this._fileIndex);};this._xhr.send();break;}},getAudioURL:function(urls){var extension;if(typeof urls==='string'){urls=[urls];}
for(var i=0;i<urls.length;i++)
{extension=urls[i].toLowerCase();extension=extension.substr((Math.max(0,extension.lastIndexOf("."))||Infinity)+1);if(this.game.device.canPlayAudio(extension))
{return urls[i];}}
return null;},fileError:function(index){this._fileList[index].loaded=true;this._fileList[index].error=true;this.onFileError.dispatch(this._fileList[index].key,this._fileList[index]);console.warn("Phaser.Loader error loading file: "+this._fileList[index].key+' from URL '+this._fileList[index].url);this.nextFile(index,false);},fileComplete:function(index){if(!this._fileList[index])
{console.warn('Phaser.Loader fileComplete invalid index '+index);return;}
var file=this._fileList[index];file.loaded=true;var loadNext=true;var _this=this;switch(file.type)
{case'image':this.game.cache.addImage(file.key,file.url,file.data);break;case'spritesheet':this.game.cache.addSpriteSheet(file.key,file.url,file.data,file.frameWidth,file.frameHeight,file.frameMax,file.margin,file.spacing);break;case'textureatlas':if(file.atlasURL==null)
{this.game.cache.addTextureAtlas(file.key,file.url,file.data,file.atlasData,file.format);}
else
{loadNext=false;this._xhr.open("GET",this.baseURL+file.atlasURL,true);this._xhr.responseType="text";if(file.format==Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY||file.format==Phaser.Loader.TEXTURE_ATLAS_JSON_HASH)
{this._xhr.onload=function(){return _this.jsonLoadComplete(index);};}
else if(file.format==Phaser.Loader.TEXTURE_ATLAS_XML_STARLING)
{this._xhr.onload=function(){return _this.xmlLoadComplete(index);};}
else
{throw new Error("Phaser.Loader. Invalid Texture Atlas format: "+file.format);}
this._xhr.onerror=function(){return _this.dataLoadError(index);};this._xhr.send();}
break;case'bitmapfont':if(file.xmlURL==null)
{this.game.cache.addBitmapFont(file.key,file.url,file.data,file.xmlData,file.xSpacing,file.ySpacing);}
else
{loadNext=false;this._xhr.open("GET",this.baseURL+file.xmlURL,true);this._xhr.responseType="text";this._xhr.onload=function(){return _this.xmlLoadComplete(index);};this._xhr.onerror=function(){return _this.dataLoadError(index);};this._xhr.send();}
break;case'audio':if(this.game.sound.usingWebAudio)
{file.data=this._xhr.response;this.game.cache.addSound(file.key,file.url,file.data,true,false);if(file.autoDecode)
{var that=this;var key=file.key;this.game.cache.updateSound(key,'isDecoding',true);this.game.sound.context.decodeAudioData(file.data,function(buffer){if(buffer)
{that.game.cache.decodedSound(key,buffer);that.game.sound.onSoundDecode.dispatch(key,that.game.cache.getSound(key));}});}}
else
{file.data.removeEventListener('canplaythrough',Phaser.GAMES[this.game.id].load.fileComplete);this.game.cache.addSound(file.key,file.url,file.data,false,true);}
break;case'text':file.data=this._xhr.responseText;this.game.cache.addText(file.key,file.url,file.data);break;case'physics':var data=JSON.parse(this._xhr.responseText);this.game.cache.addPhysicsData(file.key,file.url,data,file.format);break;case'script':file.data=document.createElement('script');file.data.language='javascript';file.data.type='text/javascript';file.data.defer=false;file.data.text=this._xhr.responseText;document.head.appendChild(file.data);if(file.callback)
{file.data=file.callback.call(file.callbackContext,file.key,this._xhr.responseText);}
break;case'binary':if(file.callback)
{file.data=file.callback.call(file.callbackContext,file.key,this._xhr.response);}
else
{file.data=this._xhr.response;}
this.game.cache.addBinary(file.key,file.data);break;}
if(loadNext)
{this.nextFile(index,true);}},jsonLoadComplete:function(index){if(!this._fileList[index])
{console.warn('Phaser.Loader jsonLoadComplete invalid index '+index);return;}
var file=this._fileList[index];var data=JSON.parse(this._xhr.responseText);file.loaded=true;if(file.type==='tilemap')
{this.game.cache.addTilemap(file.key,file.url,data,file.format);}
else if(file.type==='json')
{this.game.cache.addJSON(file.key,file.url,data);}
else
{this.game.cache.addTextureAtlas(file.key,file.url,file.data,data,file.format);}
this.nextFile(index,true);},csvLoadComplete:function(index){if(!this._fileList[index])
{console.warn('Phaser.Loader csvLoadComplete invalid index '+index);return;}
var file=this._fileList[index];var data=this._xhr.responseText;file.loaded=true;this.game.cache.addTilemap(file.key,file.url,data,file.format);this.nextFile(index,true);},dataLoadError:function(index){var file=this._fileList[index];file.loaded=true;file.error=true;console.warn("Phaser.Loader dataLoadError: "+file.key);this.nextFile(index,true);},xmlLoadComplete:function(index){var data=this._xhr.responseText;var xml;try
{if(window['DOMParser'])
{var domparser=new DOMParser();xml=domparser.parseFromString(data,"text/xml");}
else
{xml=new ActiveXObject("Microsoft.XMLDOM");xml.async='false';xml.loadXML(data);}}
catch(e)
{xml=undefined;}
if(!xml||!xml.documentElement||xml.getElementsByTagName("parsererror").length)
{throw new Error("Phaser.Loader. Invalid XML given");}
var file=this._fileList[index];file.loaded=true;if(file.type=='bitmapfont')
{this.game.cache.addBitmapFont(file.key,file.url,file.data,xml,file.xSpacing,file.ySpacing);}
else if(file.type=='textureatlas')
{this.game.cache.addTextureAtlas(file.key,file.url,file.data,xml,file.format);}
this.nextFile(index,true);},nextFile:function(previousIndex,success){this.progressFloat+=this._progressChunk;this.progress=Math.round(this.progressFloat);if(this.progress>100)
{this.progress=100;}
if(this.preloadSprite!==null)
{if(this.preloadSprite.direction===0)
{this.preloadSprite.rect.width=Math.floor((this.preloadSprite.width/100)*this.progress);this.preloadSprite.sprite.crop(this.preloadSprite.rect);}
else
{this.preloadSprite.rect.height=Math.floor((this.preloadSprite.height/100)*this.progress);this.preloadSprite.sprite.crop(this.preloadSprite.rect);}}
this.onFileComplete.dispatch(this.progress,this._fileList[previousIndex].key,success,this.totalLoadedFiles(),this._fileList.length);if(this.totalQueuedFiles()>0)
{this._fileIndex++;this.loadFile();}
else
{this.hasLoaded=true;this.isLoading=false;this.removeAll();this.onLoadComplete.dispatch();}},totalLoadedFiles:function(){var total=0;for(var i=0;i<this._fileList.length;i++)
{if(this._fileList[i].loaded)
{total++;}}
return total;},totalQueuedFiles:function(){var total=0;for(var i=0;i<this._fileList.length;i++)
{if(this._fileList[i].loaded===false)
{total++;}}
return total;}};Phaser.Loader.prototype.constructor=Phaser.Loader;Phaser.LoaderParser={bitmapFont:function(game,xml,cacheKey,xSpacing,ySpacing){var data={};var info=xml.getElementsByTagName('info')[0];var common=xml.getElementsByTagName('common')[0];data.font=info.getAttribute('face');data.size=parseInt(info.getAttribute('size'),10);data.lineHeight=parseInt(common.getAttribute('lineHeight'),10)+ySpacing;data.chars={};var letters=xml.getElementsByTagName('char');var texture=PIXI.TextureCache[cacheKey];for(var i=0;i<letters.length;i++)
{var charCode=parseInt(letters[i].getAttribute('id'),10);var textureRect=new PIXI.Rectangle(parseInt(letters[i].getAttribute('x'),10),parseInt(letters[i].getAttribute('y'),10),parseInt(letters[i].getAttribute('width'),10),parseInt(letters[i].getAttribute('height'),10));data.chars[charCode]={xOffset:parseInt(letters[i].getAttribute('xoffset'),10),yOffset:parseInt(letters[i].getAttribute('yoffset'),10),xAdvance:parseInt(letters[i].getAttribute('xadvance'),10)+xSpacing,kerning:{},texture:PIXI.TextureCache[cacheKey]=new PIXI.Texture(texture,textureRect)};}
var kernings=xml.getElementsByTagName('kerning');for(i=0;i<kernings.length;i++)
{var first=parseInt(kernings[i].getAttribute('first'),10);var second=parseInt(kernings[i].getAttribute('second'),10);var amount=parseInt(kernings[i].getAttribute('amount'),10);data.chars[second].kerning[first]=amount;}
PIXI.BitmapText.fonts[cacheKey]=data;}};Phaser.Sound=function(game,key,volume,loop,connect){if(typeof volume=='undefined'){volume=1;}
if(typeof loop=='undefined'){loop=false;}
if(typeof connect==='undefined'){connect=game.sound.connectToMaster;}
this.game=game;this.name=key;this.key=key;this.loop=loop;this.volume=volume;this.markers={};this.context=null;this.autoplay=false;this.totalDuration=0;this.startTime=0;this.currentTime=0;this.duration=0;this.durationMS=0;this.position=0;this.stopTime=0;this.paused=false;this.pausedPosition=0;this.pausedTime=0;this.isPlaying=false;this.currentMarker='';this.pendingPlayback=false;this.override=false;this.usingWebAudio=this.game.sound.usingWebAudio;this.usingAudioTag=this.game.sound.usingAudioTag;this.externalNode=null;this.masterGainNode=null;this.gainNode=null;if(this.usingWebAudio)
{this.context=this.game.sound.context;this.masterGainNode=this.game.sound.masterGain;if(typeof this.context.createGain==='undefined')
{this.gainNode=this.context.createGainNode();}
else
{this.gainNode=this.context.createGain();}
this.gainNode.gain.value=volume*this.game.sound.volume;if(connect)
{this.gainNode.connect(this.masterGainNode);}}
else
{if(this.game.cache.getSound(key)&&this.game.cache.isSoundReady(key))
{this._sound=this.game.cache.getSoundData(key);this.totalDuration=0;if(this._sound.duration)
{this.totalDuration=this._sound.duration;}}
else
{this.game.cache.onSoundUnlock.add(this.soundHasUnlocked,this);}}
this.onDecoded=new Phaser.Signal();this.onPlay=new Phaser.Signal();this.onPause=new Phaser.Signal();this.onResume=new Phaser.Signal();this.onLoop=new Phaser.Signal();this.onStop=new Phaser.Signal();this.onMute=new Phaser.Signal();this.onMarkerComplete=new Phaser.Signal();this._volume=volume;this._buffer=null;this._muted=false;this._tempMarker=0;this._tempPosition=0;this._tempVolume=0;this._tempLoop=0;this._paused=false;};Phaser.Sound.prototype={soundHasUnlocked:function(key){if(key==this.key)
{this._sound=this.game.cache.getSoundData(this.key);this.totalDuration=this._sound.duration;}},addMarker:function(name,start,duration,volume,loop){if(typeof volume=='undefined'){volume=1;}
if(typeof loop=='undefined'){loop=false;}
this.markers[name]={name:name,start:start,stop:start+duration,volume:volume,duration:duration,durationMS:duration*1000,loop:loop};},removeMarker:function(name){delete this.markers[name];},update:function(){if(this.pendingPlayback&&this.game.cache.isSoundReady(this.key))
{this.pendingPlayback=false;this.play(this._tempMarker,this._tempPosition,this._tempVolume,this._tempLoop);}
if(this.isPlaying)
{this.currentTime=this.game.time.now-this.startTime;if(this.currentTime>=this.durationMS)
{if(this.usingWebAudio)
{if(this.loop)
{this.onLoop.dispatch(this);if(this.currentMarker==='')
{this.currentTime=0;this.startTime=this.game.time.now;}
else
{this.onMarkerComplete.dispatch(this.currentMarker,this);this.play(this.currentMarker,0,this.volume,true,true);}}
else
{this.stop();}}
else
{if(this.loop)
{this.onLoop.dispatch(this);this.play(this.currentMarker,0,this.volume,true,true);}
else
{this.stop();}}}}},play:function(marker,position,volume,loop,forceRestart){if(typeof marker==='undefined'){marker='';}
if(typeof forceRestart==='undefined'){forceRestart=true;}
if(this.isPlaying===true&&forceRestart===false&&this.override===false)
{return;}
if(this.isPlaying&&this.override)
{if(this.usingWebAudio)
{if(typeof this._sound.stop==='undefined')
{this._sound.noteOff(0);}
else
{this._sound.stop(0);}}
else if(this.usingAudioTag)
{this._sound.pause();this._sound.currentTime=0;}}
this.currentMarker=marker;if(marker!=='')
{if(this.markers[marker])
{this.position=this.markers[marker].start;this.volume=this.markers[marker].volume;this.loop=this.markers[marker].loop;this.duration=this.markers[marker].duration;this.durationMS=this.markers[marker].durationMS;if(typeof volume!=='undefined')
{this.volume=volume;}
if(typeof loop!=='undefined')
{this.loop=loop;}
this._tempMarker=marker;this._tempPosition=this.position;this._tempVolume=this.volume;this._tempLoop=this.loop;}
else
{console.warn("Phaser.Sound.play: audio marker "+marker+" doesn't exist");return;}}
else
{position=position||0;if(typeof volume==='undefined'){volume=this._volume;}
if(typeof loop==='undefined'){loop=this.loop;}
this.position=position;this.volume=volume;this.loop=loop;this.duration=0;this.durationMS=0;this._tempMarker=marker;this._tempPosition=position;this._tempVolume=volume;this._tempLoop=loop;}
if(this.usingWebAudio)
{if(this.game.cache.isSoundDecoded(this.key))
{if(this._buffer==null)
{this._buffer=this.game.cache.getSoundData(this.key);}
this._sound=this.context.createBufferSource();this._sound.buffer=this._buffer;if(this.externalNode)
{this._sound.connect(this.externalNode.input);}
else
{this._sound.connect(this.gainNode);}
this.totalDuration=this._sound.buffer.duration;if(this.duration===0)
{this.duration=this.totalDuration;this.durationMS=this.totalDuration*1000;}
if(this.loop&&marker==='')
{this._sound.loop=true;}
if(typeof this._sound.start==='undefined')
{this._sound.noteGrainOn(0,this.position,this.duration);}
else
{this._sound.start(0,this.position,this.duration);}
this.isPlaying=true;this.startTime=this.game.time.now;this.currentTime=0;this.stopTime=this.startTime+this.durationMS;this.onPlay.dispatch(this);}
else
{this.pendingPlayback=true;if(this.game.cache.getSound(this.key)&&this.game.cache.getSound(this.key).isDecoding===false)
{this.game.sound.decode(this.key,this);}}}
else
{if(this.game.cache.getSound(this.key)&&this.game.cache.getSound(this.key).locked)
{this.game.cache.reloadSound(this.key);this.pendingPlayback=true;}
else
{if(this._sound&&(this.game.device.cocoonJS||this._sound.readyState===4))
{this._sound.play();this.totalDuration=this._sound.duration;if(this.duration===0)
{this.duration=this.totalDuration;this.durationMS=this.totalDuration*1000;}
this._sound.currentTime=this.position;this._sound.muted=this._muted;if(this._muted)
{this._sound.volume=0;}
else
{this._sound.volume=this._volume;}
this.isPlaying=true;this.startTime=this.game.time.now;this.currentTime=0;this.stopTime=this.startTime+this.durationMS;this.onPlay.dispatch(this);}
else
{this.pendingPlayback=true;}}}},restart:function(marker,position,volume,loop){marker=marker||'';position=position||0;volume=volume||1;if(typeof loop=='undefined'){loop=false;}
this.play(marker,position,volume,loop,true);},pause:function(){if(this.isPlaying&&this._sound)
{this.stop();this.isPlaying=false;this.paused=true;this.pausedPosition=this.currentTime;this.pausedTime=this.game.time.now;this.onPause.dispatch(this);}},resume:function(){if(this.paused&&this._sound)
{if(this.usingWebAudio)
{var p=this.position+(this.pausedPosition/1000);this._sound=this.context.createBufferSource();this._sound.buffer=this._buffer;if(this.externalNode)
{this._sound.connect(this.externalNode.input);}
else
{this._sound.connect(this.gainNode);}
if(this.loop)
{this._sound.loop=true;}
if(typeof this._sound.start==='undefined')
{this._sound.noteGrainOn(0,p,this.duration);}
else
{this._sound.start(0,p,this.duration);}}
else
{this._sound.play();}
this.isPlaying=true;this.paused=false;this.startTime+=(this.game.time.now-this.pausedTime);this.onResume.dispatch(this);}},stop:function(){if(this.isPlaying&&this._sound)
{if(this.usingWebAudio)
{if(typeof this._sound.stop==='undefined')
{this._sound.noteOff(0);}
else
{this._sound.stop(0);}}
else if(this.usingAudioTag)
{this._sound.pause();this._sound.currentTime=0;}}
this.isPlaying=false;var prevMarker=this.currentMarker;if(this.currentMarker!=='')
{this.onMarkerComplete.dispatch(this.currentMarker,this);}
this.currentMarker='';this.onStop.dispatch(this,prevMarker);},destroy:function(remove){if(typeof remove==='undefined'){remove=true;}
this.stop();if(remove)
{this.game.sound.remove(this);}
this.markers={};this.context=null;this._buffer=null;this.externalNode=null;this.onDecoded.dispose();this.onPlay.dispose();this.onPause.dispose();this.onResume.dispose();this.onLoop.dispose();this.onStop.dispose();this.onMute.dispose();this.onMarkerComplete.dispose();}};Phaser.Sound.prototype.constructor=Phaser.Sound;Object.defineProperty(Phaser.Sound.prototype,"isDecoding",{get:function(){return this.game.cache.getSound(this.key).isDecoding;}});Object.defineProperty(Phaser.Sound.prototype,"isDecoded",{get:function(){return this.game.cache.isSoundDecoded(this.key);}});Object.defineProperty(Phaser.Sound.prototype,"mute",{get:function(){return(this._muted||this.game.sound.mute);},set:function(value){value=value||null;if(value)
{this._muted=true;if(this.usingWebAudio)
{this._muteVolume=this.gainNode.gain.value;this.gainNode.gain.value=0;}
else if(this.usingAudioTag&&this._sound)
{this._muteVolume=this._sound.volume;this._sound.volume=0;}}
else
{this._muted=false;if(this.usingWebAudio)
{this.gainNode.gain.value=this._muteVolume;}
else if(this.usingAudioTag&&this._sound)
{this._sound.volume=this._muteVolume;}}
this.onMute.dispatch(this);}});Object.defineProperty(Phaser.Sound.prototype,"volume",{get:function(){return this._volume;},set:function(value){if(this.usingWebAudio)
{this._volume=value;this.gainNode.gain.value=value;}
else if(this.usingAudioTag&&this._sound)
{if(value>=0&&value<=1)
{this._volume=value;this._sound.volume=value;}}}});Phaser.SoundManager=function(game){this.game=game;this.onSoundDecode=new Phaser.Signal();this._codeMuted=false;this._muted=false;this._unlockSource=null;this._volume=1;this._sounds=[];this.context=null;this.usingWebAudio=true;this.usingAudioTag=false;this.noAudio=false;this.connectToMaster=true;this.touchLocked=false;this.channels=32;};Phaser.SoundManager.prototype={boot:function(){if(this.game.device.iOS&&this.game.device.webAudio===false)
{this.channels=1;}
if(this.game.device.iOS||(window['PhaserGlobal']&&window['PhaserGlobal'].fakeiOSTouchLock))
{this.game.input.touch.callbackContext=this;this.game.input.touch.touchStartCallback=this.unlock;this.game.input.mouse.callbackContext=this;this.game.input.mouse.mouseDownCallback=this.unlock;this.touchLocked=true;}
else
{this.touchLocked=false;}
if(window['PhaserGlobal'])
{if(window['PhaserGlobal'].disableAudio===true)
{this.usingWebAudio=false;this.noAudio=true;return;}
if(window['PhaserGlobal'].disableWebAudio===true)
{this.usingWebAudio=false;this.usingAudioTag=true;this.noAudio=false;return;}}
if(!!window['AudioContext'])
{try{this.context=new window['AudioContext']();}catch(error){this.context=null;this.usingWebAudio=false;this.noAudio=true;}}
else if(!!window['webkitAudioContext'])
{try{this.context=new window['webkitAudioContext']();}catch(error){this.context=null;this.usingWebAudio=false;this.noAudio=true;}}
if(!!window['Audio']&&this.context===null)
{this.usingWebAudio=false;this.usingAudioTag=true;this.noAudio=false;}
if(this.context!==null)
{if(typeof this.context.createGain==='undefined')
{this.masterGain=this.context.createGainNode();}
else
{this.masterGain=this.context.createGain();}
this.masterGain.gain.value=1;this.masterGain.connect(this.context.destination);}},unlock:function(){if(this.touchLocked===false)
{return;}
if(this.game.device.webAudio===false||(window['PhaserGlobal']&&window['PhaserGlobal'].disableWebAudio===true))
{this.touchLocked=false;this._unlockSource=null;this.game.input.touch.callbackContext=null;this.game.input.touch.touchStartCallback=null;this.game.input.mouse.callbackContext=null;this.game.input.mouse.mouseDownCallback=null;}
else
{var buffer=this.context.createBuffer(1,1,22050);this._unlockSource=this.context.createBufferSource();this._unlockSource.buffer=buffer;this._unlockSource.connect(this.context.destination);this._unlockSource.noteOn(0);}},stopAll:function(){for(var i=0;i<this._sounds.length;i++)
{if(this._sounds[i])
{this._sounds[i].stop();}}},pauseAll:function(){for(var i=0;i<this._sounds.length;i++)
{if(this._sounds[i])
{this._sounds[i].pause();}}},resumeAll:function(){for(var i=0;i<this._sounds.length;i++)
{if(this._sounds[i])
{this._sounds[i].resume();}}},decode:function(key,sound){sound=sound||null;var soundData=this.game.cache.getSoundData(key);if(soundData)
{if(this.game.cache.isSoundDecoded(key)===false)
{this.game.cache.updateSound(key,'isDecoding',true);var that=this;this.context.decodeAudioData(soundData,function(buffer){that.game.cache.decodedSound(key,buffer);if(sound)
{that.onSoundDecode.dispatch(key,sound);}});}}},update:function(){if(this.touchLocked)
{if(this.game.device.webAudio&&this._unlockSource!==null)
{if((this._unlockSource.playbackState===this._unlockSource.PLAYING_STATE||this._unlockSource.playbackState===this._unlockSource.FINISHED_STATE))
{this.touchLocked=false;this._unlockSource=null;this.game.input.touch.callbackContext=null;this.game.input.touch.touchStartCallback=null;}}}
for(var i=0;i<this._sounds.length;i++)
{this._sounds[i].update();}},add:function(key,volume,loop,connect){if(typeof volume==='undefined'){volume=1;}
if(typeof loop==='undefined'){loop=false;}
if(typeof connect==='undefined'){connect=this.connectToMaster;}
var sound=new Phaser.Sound(this.game,key,volume,loop,connect);this._sounds.push(sound);return sound;},remove:function(sound){var i=this._sounds.length;while(i--)
{if(this._sounds[i]===sound)
{this._sounds[i].destroy(false);this._sounds.splice(i,1);return true;}}
return false;},removeByKey:function(key){var i=this._sounds.length;var removed=0;while(i--)
{if(this._sounds[i].key===key)
{this._sounds[i].destroy(false);this._sounds.splice(i,1);removed++;}}
return removed;},play:function(key,volume,loop){var sound=this.add(key,volume,loop);sound.play();return sound;},setMute:function(){if(this._muted)
{return;}
this._muted=true;if(this.usingWebAudio)
{this._muteVolume=this.masterGain.gain.value;this.masterGain.gain.value=0;}
for(var i=0;i<this._sounds.length;i++)
{if(this._sounds[i].usingAudioTag)
{this._sounds[i].mute=true;}}},unsetMute:function(){if(!this._muted||this._codeMuted)
{return;}
this._muted=false;if(this.usingWebAudio)
{this.masterGain.gain.value=this._muteVolume;}
for(var i=0;i<this._sounds.length;i++)
{if(this._sounds[i].usingAudioTag)
{this._sounds[i].mute=false;}}}};Phaser.SoundManager.prototype.constructor=Phaser.SoundManager;Object.defineProperty(Phaser.SoundManager.prototype,"mute",{get:function(){return this._muted;},set:function(value){value=value||null;if(value)
{if(this._muted)
{return;}
this._codeMuted=true;this.setMute();}
else
{if(!this._muted)
{return;}
this._codeMuted=false;this.unsetMute();}}});Object.defineProperty(Phaser.SoundManager.prototype,"volume",{get:function(){if(this.usingWebAudio)
{return this.masterGain.gain.value;}
else
{return this._volume;}},set:function(value){this._volume=value;if(this.usingWebAudio)
{this.masterGain.gain.value=value;}
else
{for(var i=0;i<this._sounds.length;i++)
{if(this._sounds[i].usingAudioTag)
{this._sounds[i].volume=this._sounds[i].volume*value;}}}}});Phaser.Utils.Debug=function(game){this.game=game;this.sprite=null;this.canvas=null;this.baseTexture=null;this.texture=null;this.textureFrame=null;this.context=null;this.font='14px Courier';this.columnWidth=100;this.lineHeight=16;this.renderShadow=true;this.currentX=0;this.currentY=0;this.currentAlpha=1;this.dirty=false;};Phaser.Utils.Debug.prototype={boot:function(){if(this.game.renderType===Phaser.CANVAS)
{this.context=this.game.context;}
else
{this.canvas=Phaser.Canvas.create(this.game.width,this.game.height,'',true);this.context=this.canvas.getContext('2d');this.baseTexture=new PIXI.BaseTexture(this.canvas);this.texture=new PIXI.Texture(this.baseTexture);this.textureFrame=new Phaser.Frame(0,0,0,this.game.width,this.game.height,'debug',this.game.rnd.uuid());this.sprite=this.game.make.image(0,0,this.texture,this.textureFrame);this.game.stage.addChild(this.sprite);}},preUpdate:function(){if(this.dirty&&this.sprite)
{this.context.clearRect(0,0,this.game.width,this.game.height);this.dirty=false;}},start:function(x,y,color,columnWidth){if(typeof x!=='number'){x=0;}
if(typeof y!=='number'){y=0;}
color=color||'rgb(255,255,255)';if(typeof columnWidth==='undefined'){columnWidth=0;}
this.currentX=x;this.currentY=y;this.currentColor=color;this.currentAlpha=this.context.globalAlpha;this.columnWidth=columnWidth;if(this.sprite)
{this.dirty=true;}
this.context.save();this.context.setTransform(1,0,0,1,0,0);this.context.strokeStyle=color;this.context.fillStyle=color;this.context.font=this.font;this.context.globalAlpha=1;},stop:function(){this.context.restore();this.context.globalAlpha=this.currentAlpha;if(this.sprite)
{PIXI.updateWebGLTexture(this.baseTexture,this.game.renderer.gl);}},line:function(){var x=this.currentX;for(var i=0;i<arguments.length;i++)
{if(this.renderShadow)
{this.context.fillStyle='rgb(0,0,0)';this.context.fillText(arguments[i],x+1,this.currentY+1);this.context.fillStyle=this.currentColor;}
this.context.fillText(arguments[i],x,this.currentY);x+=this.columnWidth;}
this.currentY+=this.lineHeight;},soundInfo:function(sound,x,y,color){this.start(x,y,color);this.line('Sound: '+sound.key+' Locked: '+sound.game.sound.touchLocked);this.line('Is Ready?: '+this.game.cache.isSoundReady(sound.key)+' Pending Playback: '+sound.pendingPlayback);this.line('Decoded: '+sound.isDecoded+' Decoding: '+sound.isDecoding);this.line('Total Duration: '+sound.totalDuration+' Playing: '+sound.isPlaying);this.line('Time: '+sound.currentTime);this.line('Volume: '+sound.volume+' Muted: '+sound.mute);this.line('WebAudio: '+sound.usingWebAudio+' Audio: '+sound.usingAudioTag);if(sound.currentMarker!=='')
{this.line('Marker: '+sound.currentMarker+' Duration: '+sound.duration+' (ms: '+sound.durationMS+')');this.line('Start: '+sound.markers[sound.currentMarker].start+' Stop: '+sound.markers[sound.currentMarker].stop);this.line('Position: '+sound.position);}
this.stop();},cameraInfo:function(camera,x,y,color){this.start(x,y,color);this.line('Camera ('+camera.width+' x '+camera.height+')');this.line('X: '+camera.x+' Y: '+camera.y);this.line('Bounds x: '+camera.bounds.x+' Y: '+camera.bounds.y+' w: '+camera.bounds.width+' h: '+camera.bounds.height);this.line('View x: '+camera.view.x+' Y: '+camera.view.y+' w: '+camera.view.width+' h: '+camera.view.height);this.stop();},timer:function(timer,x,y,color){this.start(x,y,color);this.line('Timer (running: '+timer.running+' expired: '+timer.expired+')');this.line('Next Tick: '+timer.next+' Duration: '+timer.duration);this.line('Paused: '+timer.paused+' Length: '+timer.length);this.stop();},pointer:function(pointer,hideIfUp,downColor,upColor,color){if(pointer==null)
{return;}
if(typeof hideIfUp==='undefined'){hideIfUp=false;}
downColor=downColor||'rgba(0,255,0,0.5)';upColor=upColor||'rgba(255,0,0,0.5)';if(hideIfUp===true&&pointer.isUp===true)
{return;}
this.start(pointer.x,pointer.y-100,color);this.context.beginPath();this.context.arc(pointer.x,pointer.y,pointer.circle.radius,0,Math.PI*2);if(pointer.active)
{this.context.fillStyle=downColor;}
else
{this.context.fillStyle=upColor;}
this.context.fill();this.context.closePath();this.context.beginPath();this.context.moveTo(pointer.positionDown.x,pointer.positionDown.y);this.context.lineTo(pointer.position.x,pointer.position.y);this.context.lineWidth=2;this.context.stroke();this.context.closePath();this.line('ID: '+pointer.id+" Active: "+pointer.active);this.line('World X: '+pointer.worldX+" World Y: "+pointer.worldY);this.line('Screen X: '+pointer.x+" Screen Y: "+pointer.y);this.line('Duration: '+pointer.duration+" ms");this.line('is Down: '+pointer.isDown+" is Up: "+pointer.isUp);this.stop();},spriteInputInfo:function(sprite,x,y,color){this.start(x,y,color);this.line('Sprite Input: ('+sprite.width+' x '+sprite.height+')');this.line('x: '+sprite.input.pointerX().toFixed(1)+' y: '+sprite.input.pointerY().toFixed(1));this.line('over: '+sprite.input.pointerOver()+' duration: '+sprite.input.overDuration().toFixed(0));this.line('down: '+sprite.input.pointerDown()+' duration: '+sprite.input.downDuration().toFixed(0));this.line('just over: '+sprite.input.justOver()+' just out: '+sprite.input.justOut());this.stop();},key:function(key,x,y,color){this.start(x,y,color,150);this.line('Key:',key.keyCode,'isDown:',key.isDown);this.line('justPressed:',key.justPressed(),'justReleased:',key.justReleased());this.line('Time Down:',key.timeDown.toFixed(0),'duration:',key.duration.toFixed(0));this.stop();},inputInfo:function(x,y,color){this.start(x,y,color);this.line('Input');this.line('X: '+this.game.input.x+' Y: '+this.game.input.y);this.line('World X: '+this.game.input.worldX+' World Y: '+this.game.input.worldY);this.line('Scale X: '+this.game.input.scale.x.toFixed(1)+' Scale Y: '+this.game.input.scale.x.toFixed(1));this.line('Screen X: '+this.game.input.activePointer.screenX+' Screen Y: '+this.game.input.activePointer.screenY);this.stop();},spriteBounds:function(sprite,color,filled){var bounds=sprite.getBounds();bounds.x+=this.game.camera.x;bounds.y+=this.game.camera.y;this.rectangle(bounds,color,filled);},spriteInfo:function(sprite,x,y,color){this.start(x,y,color);this.line('Sprite: '+' ('+sprite.width+' x '+sprite.height+') anchor: '+sprite.anchor.x+' x '+sprite.anchor.y);this.line('x: '+sprite.x.toFixed(1)+' y: '+sprite.y.toFixed(1));this.line('angle: '+sprite.angle.toFixed(1)+' rotation: '+sprite.rotation.toFixed(1));this.line('visible: '+sprite.visible+' in camera: '+sprite.inCamera);this.stop();},spriteCoords:function(sprite,x,y,color){this.start(x,y,color,100);if(sprite.name)
{this.line(sprite.name);}
this.line('x:',sprite.x.toFixed(2),'y:',sprite.y.toFixed(2));this.line('pos x:',sprite.position.x.toFixed(2),'pos y:',sprite.position.y.toFixed(2));this.line('world x:',sprite.world.x.toFixed(2),'world y:',sprite.world.y.toFixed(2));this.stop();},lineInfo:function(line,x,y,color){this.start(x,y,color,80);this.line('start.x:',line.start.x.toFixed(2),'start.y:',line.start.y.toFixed(2));this.line('end.x:',line.end.x.toFixed(2),'end.y:',line.end.y.toFixed(2));this.line('length:',line.length.toFixed(2),'angle:',line.angle);this.stop();},pixel:function(x,y,color,size){size=size||2;this.start();this.context.fillStyle=color;this.context.fillRect(x,y,size,size);this.stop();},geom:function(object,color,filled,forceType){if(typeof filled==='undefined'){filled=true;}
if(typeof forceType==='undefined'){forceType=0;}
color=color||'rgba(0,255,0,0.4)';this.start();this.context.fillStyle=color;this.context.strokeStyle=color;if(object instanceof Phaser.Rectangle||forceType===1)
{if(filled)
{this.context.fillRect(object.x-this.game.camera.x,object.y-this.game.camera.y,object.width,object.height);}
else
{this.context.strokeRect(object.x-this.game.camera.x,object.y-this.game.camera.y,object.width,object.height);}}
else if(object instanceof Phaser.Circle||forceType===2)
{this.context.beginPath();this.context.arc(object.x-this.game.camera.x,object.y-this.game.camera.y,object.radius,0,Math.PI*2,false);this.context.closePath();if(filled)
{this.context.fill();}
else
{this.context.stroke();}}
else if(object instanceof Phaser.Point||forceType===3)
{this.context.fillRect(object.x-this.game.camera.x,object.y-this.game.camera.y,4,4);}
else if(object instanceof Phaser.Line||forceType===4)
{this.context.lineWidth=1;this.context.beginPath();this.context.moveTo((object.start.x+0.5)-this.game.camera.x,(object.start.y+0.5)-this.game.camera.y);this.context.lineTo((object.end.x+0.5)-this.game.camera.x,(object.end.y+0.5)-this.game.camera.y);this.context.closePath();this.context.stroke();}
this.stop();},rectangle:function(object,color,filled){if(typeof filled==='undefined'){filled=true;}
color=color||'rgba(0, 255, 0, 0.4)';this.start();if(filled)
{this.context.fillStyle=color;this.context.fillRect(object.x-this.game.camera.x,object.y-this.game.camera.y,object.width,object.height);}
else
{this.context.strokeStyle=color;this.context.strokeRect(object.x-this.game.camera.x,object.y-this.game.camera.y,object.width,object.height);}
this.stop();},text:function(text,x,y,color,font){color=color||'rgb(255,255,255)';font=font||'16px Courier';this.start();this.context.font=font;if(this.renderShadow)
{this.context.fillStyle='rgb(0,0,0)';this.context.fillText(text,x+1,y+1);}
this.context.fillStyle=color;this.context.fillText(text,x,y);this.stop();},quadTree:function(quadtree,color){color=color||'rgba(255,0,0,0.3)';this.start();var bounds=quadtree.bounds;if(quadtree.nodes.length===0)
{this.context.strokeStyle=color;this.context.strokeRect(bounds.x,bounds.y,bounds.width,bounds.height);this.text('size: '+quadtree.objects.length,bounds.x+4,bounds.y+16,'rgb(0,200,0)','12px Courier');this.context.strokeStyle='rgb(0,255,0)';for(var i=0;i<quadtree.objects.length;i++)
{this.context.strokeRect(quadtree.objects[i].x,quadtree.objects[i].y,quadtree.objects[i].width,quadtree.objects[i].height);}}
else
{for(var i=0;i<quadtree.nodes.length;i++)
{this.quadTree(quadtree.nodes[i]);}}
this.stop();},body:function(sprite,color,filled){if(sprite.body)
{if(sprite.body.type===Phaser.Physics.ARCADE)
{this.start();Phaser.Physics.Arcade.Body.render(this.context,sprite.body,color,filled);this.stop();}}},bodyInfo:function(sprite,x,y,color){if(sprite.body)
{if(sprite.body.type===Phaser.Physics.ARCADE)
{this.start(x,y,color,210);Phaser.Physics.Arcade.Body.renderBodyInfo(this,sprite.body);this.stop();}}}};Phaser.Utils.Debug.prototype.constructor=Phaser.Utils.Debug;Phaser.Color={packPixel:function(r,g,b,a){if(Phaser.Device.LITTLE_ENDIAN)
{return(a<<24)|(b<<16)|(g<<8)|r;}
else
{return(r<<24)|(g<<16)|(b<<8)|a;}},unpackPixel:function(rgba,out,hsl,hsv){if(typeof out==='undefined'||out===null){out=Phaser.Color.createColor();}
if(typeof hsl==='undefined'||hsl===null){hsl=false;}
if(typeof hsv==='undefined'||hsv===null){hsv=false;}
if(Phaser.Device.LITTLE_ENDIAN)
{out.a=((rgba&0xff000000)>>>24);out.b=((rgba&0x00ff0000)>>>16);out.g=((rgba&0x0000ff00)>>>8);out.r=((rgba&0x000000ff));}
else
{out.r=((rgba&0xff000000)>>>24);out.g=((rgba&0x00ff0000)>>>16);out.b=((rgba&0x0000ff00)>>>8);out.a=((rgba&0x000000ff));}
out.color=rgba;out.rgba='rgba('+out.r+','+out.g+','+out.b+','+(out.a/255)+')';if(hsl)
{Phaser.Color.RGBtoHSL(out.r,out.g,out.b,out);}
if(hsv)
{Phaser.Color.RGBtoHSV(out.r,out.g,out.b,out);}
return out;},fromRGBA:function(rgba,out){if(!out)
{out=Phaser.Color.createColor();}
out.r=((rgba&0xff000000)>>>24);out.g=((rgba&0x00ff0000)>>>16);out.b=((rgba&0x0000ff00)>>>8);out.a=((rgba&0x000000ff));out.rgba='rgba('+out.r+','+out.g+','+out.b+','+out.a+')';return out;},toRGBA:function(r,g,b,a){return(r<<24)|(g<<16)|(b<<8)|a;},RGBtoHSL:function(r,g,b,out){if(!out)
{out=Phaser.Color.createColor(r,g,b,1);}
r/=255;g/=255;b/=255;var min=Math.min(r,g,b);var max=Math.max(r,g,b);out.h=0;out.s=0;out.l=(max+min)/2;if(max!==min)
{var d=max-min;out.s=out.l>0.5?d/(2-max-min):d/(max+min);if(max===r)
{out.h=(g-b)/d+(g<b?6:0);}
else if(max===g)
{out.h=(b-r)/d+2;}
else if(max===b)
{out.h=(r-g)/d+4;}
out.h/=6;}
return out;},HSLtoRGB:function(h,s,l,out){if(!out)
{out=Phaser.Color.createColor(l,l,l);}
else
{out.r=l;out.g=l;out.b=l;}
if(s!==0)
{var q=l<0.5?l*(1+s):l+s-l*s;var p=2*l-q;out.r=Phaser.Color.hueToColor(p,q,h+1/3);out.g=Phaser.Color.hueToColor(p,q,h);out.b=Phaser.Color.hueToColor(p,q,h-1/3);}
out.r=Math.floor((out.r*255|0));out.g=Math.floor((out.g*255|0));out.b=Math.floor((out.b*255|0));Phaser.Color.updateColor(out);return out;},RGBtoHSV:function(r,g,b,out){if(!out)
{out=Phaser.Color.createColor(r,g,b,255);}
r/=255;g/=255;b/=255;var min=Math.min(r,g,b);var max=Math.max(r,g,b);var d=max-min;out.h=0;out.s=max===0?0:d/max;out.v=max;if(max!==min)
{if(max===r)
{out.h=(g-b)/d+(g<b?6:0);}
else if(max===g)
{out.h=(b-r)/d+2;}
else if(max===b)
{out.h=(r-g)/d+4;}
out.h/=6;}
return out;},HSVtoRGB:function(h,s,v,out){if(typeof out==='undefined'){out=Phaser.Color.createColor(0,0,0,1,h,s,0,v);}
var r,g,b;var i=Math.floor(h*6);var f=h*6-i;var p=v*(1-s);var q=v*(1-f*s);var t=v*(1-(1-f)*s);switch(i%6)
{case 0:r=v;g=t;b=p;break;case 1:r=q;g=v;b=p;break;case 2:r=p;g=v;b=t;break;case 3:r=p;g=q;b=v;break;case 4:r=t;g=p;b=v;break;case 5:r=v;g=p;b=q;break;}
out.r=Math.floor(r*255);out.g=Math.floor(g*255);out.b=Math.floor(b*255);Phaser.Color.updateColor(out);return out;},hueToColor:function(p,q,t){if(t<0)
{t+=1;}
if(t>1)
{t-=1;}
if(t<1/6)
{return p+(q-p)*6*t;}
if(t<1/2)
{return q;}
if(t<2/3)
{return p+(q-p)*(2/3-t)*6;}
return p;},createColor:function(r,g,b,a,h,s,l,v){var out={r:r||0,g:g||0,b:b||0,a:a||1,h:h||0,s:s||0,l:l||0,v:v||0,color:0};out.rgba='rgba('+out.r+','+out.g+','+out.b+','+out.a+')';return out;},updateColor:function(out){out.rgba='rgba('+out.r+','+out.g+','+out.b+','+out.a+')';return out;},getColor32:function(a,r,g,b){return a<<24|r<<16|g<<8|b;},getColor:function(r,g,b){return r<<16|g<<8|b;},RGBtoString:function(r,g,b,a,prefix){if(typeof a==='undefined'){a=255;}
if(typeof prefix==='undefined'){prefix='#';}
if(prefix==='#')
{return'#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);}
else
{return'0x'+Phaser.Color.componentToHex(a)+Phaser.Color.componentToHex(r)+Phaser.Color.componentToHex(g)+Phaser.Color.componentToHex(b);}},hexToRGB:function(hex){var rgb=Phaser.Color.hexToColor(hex);if(rgb)
{return Phaser.Color.getColor32(rgb.a,rgb.r,rgb.g,rgb.b);}},hexToColor:function(hex,out){if(!out)
{out=Phaser.Color.createColor();}
var shorthandRegex=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;hex=hex.replace(shorthandRegex,function(m,r,g,b){return r+r+g+g+b+b;});var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);if(result)
{out.r=parseInt(result[1],16);out.g=parseInt(result[2],16);out.b=parseInt(result[3],16);}
return out;},componentToHex:function(color){var hex=color.toString(16);return hex.length==1?"0"+hex:hex;},HSVColorWheel:function(s,v){if(typeof s==='undefined'){s=1.0;}
if(typeof v==='undefined'){v=1.0;}
var colors=[];for(var c=0;c<=359;c++)
{colors.push(Phaser.Color.HSVtoRGB(c/359,s,v));}
return colors;},HSLColorWheel:function(s,l){if(typeof s==='undefined'){s=0.5;}
if(typeof l==='undefined'){l=0.5;}
var colors=[];for(var c=0;c<=359;c++)
{colors.push(Phaser.Color.HSLtoRGB(c/359,s,l));}
return colors;},interpolateColor:function(color1,color2,steps,currentStep,alpha){if(typeof alpha==="undefined"){alpha=255;}
var src1=Phaser.Color.getRGB(color1);var src2=Phaser.Color.getRGB(color2);var r=(((src2.red-src1.red)*currentStep)/steps)+src1.red;var g=(((src2.green-src1.green)*currentStep)/steps)+src1.green;var b=(((src2.blue-src1.blue)*currentStep)/steps)+src1.blue;return Phaser.Color.getColor32(alpha,r,g,b);},interpolateColorWithRGB:function(color,r,g,b,steps,currentStep){var src=Phaser.Color.getRGB(color);var or=(((r-src.red)*currentStep)/steps)+src.red;var og=(((g-src.green)*currentStep)/steps)+src.green;var ob=(((b-src.blue)*currentStep)/steps)+src.blue;return Phaser.Color.getColor(or,og,ob);},interpolateRGB:function(r1,g1,b1,r2,g2,b2,steps,currentStep){var r=(((r2-r1)*currentStep)/steps)+r1;var g=(((g2-g1)*currentStep)/steps)+g1;var b=(((b2-b1)*currentStep)/steps)+b1;return Phaser.Color.getColor(r,g,b);},getRandomColor:function(min,max,alpha){if(typeof min==="undefined"){min=0;}
if(typeof max==="undefined"){max=255;}
if(typeof alpha==="undefined"){alpha=255;}
if(max>255||min>max)
{return Phaser.Color.getColor(255,255,255);}
var red=min+Math.round(Math.random()*(max-min));var green=min+Math.round(Math.random()*(max-min));var blue=min+Math.round(Math.random()*(max-min));return Phaser.Color.getColor32(alpha,red,green,blue);},getRGB:function(color){return{alpha:color>>>24,red:color>>16&0xFF,green:color>>8&0xFF,blue:color&0xFF};},getWebRGB:function(color){var alpha=(color>>>24)/255;var red=color>>16&0xFF;var green=color>>8&0xFF;var blue=color&0xFF;return'rgba('+red.toString()+','+green.toString()+','+blue.toString()+','+alpha.toString()+')';},getAlpha:function(color){return color>>>24;},getAlphaFloat:function(color){return(color>>>24)/255;},getRed:function(color){return color>>16&0xFF;},getGreen:function(color){return color>>8&0xFF;},getBlue:function(color){return color&0xFF;},getColorInfo:function(color){var argb=Phaser.Color.getRGB(color);var result=Phaser.Color.RGBtoHexstring(color)+"\n";result=result.concat("Alpha: "+argb.alpha+" Red: "+argb.red+" Green: "+argb.green+" Blue: "+argb.blue)+"\n";return result;},RGBtoHexstring:function(color){var argb=Phaser.Color.getRGB(color);return"0x"+Phaser.Color.colorToHexstring(argb.alpha)+Phaser.Color.colorToHexstring(argb.red)+Phaser.Color.colorToHexstring(argb.green)+Phaser.Color.colorToHexstring(argb.blue);},RGBtoWebstring:function(color){var argb=Phaser.Color.getRGB(color);return"#"+Phaser.Color.colorToHexstring(argb.red)+Phaser.Color.colorToHexstring(argb.green)+Phaser.Color.colorToHexstring(argb.blue);},colorToHexstring:function(color){var digits="0123456789ABCDEF";var lsd=color%16;var msd=(color-lsd)/16;var hexified=digits.charAt(msd)+digits.charAt(lsd);return hexified;}};Phaser.Physics=function(game,config){config=config||{};this.game=game;this.config=config;this.arcade=null;this.p2=null;this.ninja=null;this.box2d=null;this.chipmunk=null;this.parseConfig();};Phaser.Physics.ARCADE=0;Phaser.Physics.P2JS=1;Phaser.Physics.NINJA=2;Phaser.Physics.BOX2D=3;Phaser.Physics.CHIPMUNK=5;Phaser.Physics.prototype={parseConfig:function(){if((!this.config.hasOwnProperty('arcade')||this.config['arcade']===true)&&Phaser.Physics.hasOwnProperty('Arcade'))
{this.arcade=new Phaser.Physics.Arcade(this.game);this.game.time.deltaCap=0.2;}
if(this.config.hasOwnProperty('ninja')&&this.config['ninja']===true&&Phaser.Physics.hasOwnProperty('Ninja'))
{this.ninja=new Phaser.Physics.Ninja(this.game);}
if(this.config.hasOwnProperty('p2')&&this.config['p2']===true&&Phaser.Physics.hasOwnProperty('P2'))
{this.p2=new Phaser.Physics.P2(this.game,this.config);}},startSystem:function(system){if(system===Phaser.Physics.ARCADE)
{this.arcade=new Phaser.Physics.Arcade(this.game);}
else if(system===Phaser.Physics.P2JS)
{this.p2=new Phaser.Physics.P2(this.game,this.config);}
if(system===Phaser.Physics.NINJA)
{this.ninja=new Phaser.Physics.Ninja(this.game);}
else if(system===Phaser.Physics.BOX2D&&this.box2d===null)
{throw new Error('The Box2D physics system has not been implemented yet.');}
else if(system===Phaser.Physics.CHIPMUNK&&this.chipmunk===null)
{throw new Error('The Chipmunk physics system has not been implemented yet.');}},enable:function(object,system,debug){if(typeof system==='undefined'){system=Phaser.Physics.ARCADE;}
if(typeof debug==='undefined'){debug=false;}
if(system===Phaser.Physics.ARCADE)
{this.arcade.enable(object);}
else if(system===Phaser.Physics.P2JS&&this.p2)
{this.p2.enable(object,debug);}
else if(system===Phaser.Physics.NINJA&&this.ninja)
{this.ninja.enableAABB(object);}},preUpdate:function(){if(this.p2)
{this.p2.preUpdate();}},update:function(){if(this.p2)
{this.p2.update();}},setBoundsToWorld:function(){if(this.arcade)
{this.arcade.setBoundsToWorld();}
if(this.ninja)
{this.ninja.setBoundsToWorld();}
if(this.p2)
{this.p2.setBoundsToWorld();}},clear:function(){if(this.p2)
{this.p2.clear();}},destroy:function(){if(this.p2)
{this.p2.destroy();}
this.arcade=null;this.ninja=null;this.p2=null;}};Phaser.Physics.prototype.constructor=Phaser.Physics;Phaser.Physics.Arcade=function(game){this.game=game;this.gravity=new Phaser.Point();this.bounds=new Phaser.Rectangle(0,0,game.world.width,game.world.height);this.checkCollision={up:true,down:true,left:true,right:true};this.maxObjects=10;this.maxLevels=4;this.OVERLAP_BIAS=4;this.TILE_BIAS=16;this.forceX=false;this.quadTree=new Phaser.QuadTree(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height,this.maxObjects,this.maxLevels);this._overlap=0;this._maxOverlap=0;this._velocity1=0;this._velocity2=0;this._newVelocity1=0;this._newVelocity2=0;this._average=0;this._mapData=[];this._result=false;this._total=0;this._angle=0;this._dx=0;this._dy=0;};Phaser.Physics.Arcade.prototype.constructor=Phaser.Physics.Arcade;Phaser.Physics.Arcade.prototype={setBounds:function(x,y,width,height){this.bounds.setTo(x,y,width,height);},setBoundsToWorld:function(){this.bounds.setTo(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height);},enable:function(object,children){if(typeof children==='undefined'){children=true;}
var i=1;if(Array.isArray(object))
{i=object.length;while(i--)
{if(object[i]instanceof Phaser.Group)
{this.enable(object[i].children,children);}
else
{this.enableBody(object[i]);if(children&&object[i].hasOwnProperty('children')&&object[i].children.length>0)
{this.enable(object[i],true);}}}}
else
{if(object instanceof Phaser.Group)
{this.enable(object.children,children);}
else
{this.enableBody(object);if(children&&object.hasOwnProperty('children')&&object.children.length>0)
{this.enable(object.children,true);}}}},enableBody:function(object){if(object.hasOwnProperty('body')&&object.body===null)
{object.body=new Phaser.Physics.Arcade.Body(object);}},updateMotion:function(body){this._velocityDelta=this.computeVelocity(0,body,body.angularVelocity,body.angularAcceleration,body.angularDrag,body.maxAngular)-body.angularVelocity;body.angularVelocity+=this._velocityDelta;body.rotation+=(body.angularVelocity*this.game.time.physicsElapsed);body.velocity.x=this.computeVelocity(1,body,body.velocity.x,body.acceleration.x,body.drag.x,body.maxVelocity.x);body.velocity.y=this.computeVelocity(2,body,body.velocity.y,body.acceleration.y,body.drag.y,body.maxVelocity.y);},computeVelocity:function(axis,body,velocity,acceleration,drag,max){max=max||10000;if(axis==1&&body.allowGravity)
{velocity+=(this.gravity.x+body.gravity.x)*this.game.time.physicsElapsed;}
else if(axis==2&&body.allowGravity)
{velocity+=(this.gravity.y+body.gravity.y)*this.game.time.physicsElapsed;}
if(acceleration)
{velocity+=acceleration*this.game.time.physicsElapsed;}
else if(drag)
{this._drag=drag*this.game.time.physicsElapsed;if(velocity-this._drag>0)
{velocity-=this._drag;}
else if(velocity+this._drag<0)
{velocity+=this._drag;}
else
{velocity=0;}}
if(velocity>max)
{velocity=max;}
else if(velocity<-max)
{velocity=-max;}
return velocity;},overlap:function(object1,object2,overlapCallback,processCallback,callbackContext){overlapCallback=overlapCallback||null;processCallback=processCallback||null;callbackContext=callbackContext||overlapCallback;this._result=false;this._total=0;if(Array.isArray(object2))
{for(var i=0,len=object2.length;i<len;i++)
{this.collideHandler(object1,object2[i],overlapCallback,processCallback,callbackContext,true);}}
else
{this.collideHandler(object1,object2,overlapCallback,processCallback,callbackContext,true);}
return(this._total>0);},collide:function(object1,object2,collideCallback,processCallback,callbackContext){collideCallback=collideCallback||null;processCallback=processCallback||null;callbackContext=callbackContext||collideCallback;this._result=false;this._total=0;if(Array.isArray(object2))
{for(var i=0,len=object2.length;i<len;i++)
{this.collideHandler(object1,object2[i],collideCallback,processCallback,callbackContext,false);}}
else
{this.collideHandler(object1,object2,collideCallback,processCallback,callbackContext,false);}
return(this._total>0);},collideHandler:function(object1,object2,collideCallback,processCallback,callbackContext,overlapOnly){if(typeof object2==='undefined'&&(object1.type===Phaser.GROUP||object1.type===Phaser.EMITTER))
{this.collideGroupVsSelf(object1,collideCallback,processCallback,callbackContext,overlapOnly);return;}
if(object1&&object2&&object1.exists&&object2.exists)
{if(object1.type==Phaser.SPRITE||object1.type==Phaser.TILESPRITE)
{if(object2.type==Phaser.SPRITE||object2.type==Phaser.TILESPRITE)
{this.collideSpriteVsSprite(object1,object2,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.GROUP||object2.type==Phaser.EMITTER)
{this.collideSpriteVsGroup(object1,object2,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.TILEMAPLAYER)
{this.collideSpriteVsTilemapLayer(object1,object2,collideCallback,processCallback,callbackContext);}}
else if(object1.type==Phaser.GROUP)
{if(object2.type==Phaser.SPRITE||object2.type==Phaser.TILESPRITE)
{this.collideSpriteVsGroup(object2,object1,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.GROUP||object2.type==Phaser.EMITTER)
{this.collideGroupVsGroup(object1,object2,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.TILEMAPLAYER)
{this.collideGroupVsTilemapLayer(object1,object2,collideCallback,processCallback,callbackContext);}}
else if(object1.type==Phaser.TILEMAPLAYER)
{if(object2.type==Phaser.SPRITE||object2.type==Phaser.TILESPRITE)
{this.collideSpriteVsTilemapLayer(object2,object1,collideCallback,processCallback,callbackContext);}
else if(object2.type==Phaser.GROUP||object2.type==Phaser.EMITTER)
{this.collideGroupVsTilemapLayer(object2,object1,collideCallback,processCallback,callbackContext);}}
else if(object1.type==Phaser.EMITTER)
{if(object2.type==Phaser.SPRITE||object2.type==Phaser.TILESPRITE)
{this.collideSpriteVsGroup(object2,object1,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.GROUP||object2.type==Phaser.EMITTER)
{this.collideGroupVsGroup(object1,object2,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.TILEMAPLAYER)
{this.collideGroupVsTilemapLayer(object1,object2,collideCallback,processCallback,callbackContext);}}}},collideSpriteVsSprite:function(sprite1,sprite2,collideCallback,processCallback,callbackContext,overlapOnly){if(!sprite1.body||!sprite2.body)
{return false;}
if(this.separate(sprite1.body,sprite2.body,processCallback,callbackContext,overlapOnly))
{if(collideCallback)
{collideCallback.call(callbackContext,sprite1,sprite2);}
this._total++;}
return true;},collideSpriteVsGroup:function(sprite,group,collideCallback,processCallback,callbackContext,overlapOnly){if(group.length===0||!sprite.body)
{return;}
this.quadTree.clear();this.quadTree.reset(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height,this.maxObjects,this.maxLevels);this.quadTree.populate(group);this._potentials=this.quadTree.retrieve(sprite);for(var i=0,len=this._potentials.length;i<len;i++)
{if(this.separate(sprite.body,this._potentials[i],processCallback,callbackContext,overlapOnly))
{if(collideCallback)
{collideCallback.call(callbackContext,sprite,this._potentials[i].sprite);}
this._total++;}}},collideGroupVsSelf:function(group,collideCallback,processCallback,callbackContext,overlapOnly){if(group.length===0)
{return;}
var len=group.children.length;for(var i=0;i<len;i++)
{for(var j=i+1;j<=len;j++)
{if(group.children[i]&&group.children[j]&&group.children[i].exists&&group.children[j].exists)
{this.collideSpriteVsSprite(group.children[i],group.children[j],collideCallback,processCallback,callbackContext,overlapOnly);}}}},collideGroupVsGroup:function(group1,group2,collideCallback,processCallback,callbackContext,overlapOnly){if(group1.length===0||group2.length===0)
{return;}
for(var i=0,len=group1.children.length;i<len;i++)
{if(group1.children[i].exists)
{this.collideSpriteVsGroup(group1.children[i],group2,collideCallback,processCallback,callbackContext,overlapOnly);}}},collideSpriteVsTilemapLayer:function(sprite,tilemapLayer,collideCallback,processCallback,callbackContext){if(!sprite.body)
{return;}
this._mapData=tilemapLayer.getTiles(sprite.body.position.x-sprite.body.tilePadding.x,sprite.body.position.y-sprite.body.tilePadding.y,sprite.body.width+sprite.body.tilePadding.x,sprite.body.height+sprite.body.tilePadding.y,false,false);if(this._mapData.length===0)
{return;}
for(var i=0;i<this._mapData.length;i++)
{if(this.separateTile(i,sprite.body,this._mapData[i]))
{if(processCallback)
{if(processCallback.call(callbackContext,sprite,this._mapData[i]))
{this._total++;if(collideCallback)
{collideCallback.call(callbackContext,sprite,this._mapData[i]);}}}
else
{this._total++;if(collideCallback)
{collideCallback.call(callbackContext,sprite,this._mapData[i]);}}}}},collideGroupVsTilemapLayer:function(group,tilemapLayer,collideCallback,processCallback,callbackContext){if(group.length===0)
{return;}
for(var i=0,len=group.children.length;i<len;i++)
{if(group.children[i].exists)
{this.collideSpriteVsTilemapLayer(group.children[i],tilemapLayer,collideCallback,processCallback,callbackContext);}}},separate:function(body1,body2,processCallback,callbackContext,overlapOnly){if(!this.intersects(body1,body2))
{return false;}
if(processCallback&&processCallback.call(callbackContext,body1.sprite,body2.sprite)===false)
{return false;}
if(overlapOnly)
{return true;}
if(this.forceX||Math.abs(this.gravity.y+body1.gravity.y)<Math.abs(this.gravity.x+body1.gravity.x))
{this._result=(this.separateX(body1,body2,overlapOnly)||this.separateY(body1,body2,overlapOnly));}
else
{this._result=(this.separateY(body1,body2,overlapOnly)||this.separateX(body1,body2,overlapOnly));}
return this._result;},intersects:function(body1,body2){if(body1.right<=body2.position.x)
{return false;}
if(body1.bottom<=body2.position.y)
{return false;}
if(body1.position.x>=body2.right)
{return false;}
if(body1.position.y>=body2.bottom)
{return false;}
return true;},separateX:function(body1,body2,overlapOnly){if(body1.immovable&&body2.immovable)
{return false;}
this._overlap=0;if(this.intersects(body1,body2))
{this._maxOverlap=body1.deltaAbsX()+body2.deltaAbsX()+this.OVERLAP_BIAS;if(body1.deltaX()===0&&body2.deltaX()===0)
{body1.embedded=true;body2.embedded=true;}
else if(body1.deltaX()>body2.deltaX())
{this._overlap=body1.right-body2.x;if((this._overlap>this._maxOverlap)||body1.checkCollision.right===false||body2.checkCollision.left===false)
{this._overlap=0;}
else
{body1.touching.none=false;body1.touching.right=true;body2.touching.none=false;body2.touching.left=true;}}
else if(body1.deltaX()<body2.deltaX())
{this._overlap=body1.x-body2.width-body2.x;if((-this._overlap>this._maxOverlap)||body1.checkCollision.left===false||body2.checkCollision.right===false)
{this._overlap=0;}
else
{body1.touching.none=false;body1.touching.left=true;body2.touching.none=false;body2.touching.right=true;}}
if(this._overlap!==0)
{body1.overlapX=this._overlap;body2.overlapX=this._overlap;if(overlapOnly||body1.customSeparateX||body2.customSeparateX)
{return true;}
this._velocity1=body1.velocity.x;this._velocity2=body2.velocity.x;if(!body1.immovable&&!body2.immovable)
{this._overlap*=0.5;body1.x=body1.x-this._overlap;body2.x+=this._overlap;this._newVelocity1=Math.sqrt((this._velocity2*this._velocity2*body2.mass)/body1.mass)*((this._velocity2>0)?1:-1);this._newVelocity2=Math.sqrt((this._velocity1*this._velocity1*body1.mass)/body2.mass)*((this._velocity1>0)?1:-1);this._average=(this._newVelocity1+this._newVelocity2)*0.5;this._newVelocity1-=this._average;this._newVelocity2-=this._average;body1.velocity.x=this._average+this._newVelocity1*body1.bounce.x;body2.velocity.x=this._average+this._newVelocity2*body2.bounce.x;}
else if(!body1.immovable)
{body1.x=body1.x-this._overlap;body1.velocity.x=this._velocity2-this._velocity1*body1.bounce.x;}
else if(!body2.immovable)
{body2.x+=this._overlap;body2.velocity.x=this._velocity1-this._velocity2*body2.bounce.x;}
return true;}}
return false;},separateY:function(body1,body2,overlapOnly){if(body1.immovable&&body2.immovable)
{return false;}
this._overlap=0;if(this.intersects(body1,body2))
{this._maxOverlap=body1.deltaAbsY()+body2.deltaAbsY()+this.OVERLAP_BIAS;if(body1.deltaY()===0&&body2.deltaY()===0)
{body1.embedded=true;body2.embedded=true;}
else if(body1.deltaY()>body2.deltaY())
{this._overlap=body1.bottom-body2.y;if((this._overlap>this._maxOverlap)||body1.checkCollision.down===false||body2.checkCollision.up===false)
{this._overlap=0;}
else
{body1.touching.none=false;body1.touching.down=true;body2.touching.none=false;body2.touching.up=true;}}
else if(body1.deltaY()<body2.deltaY())
{this._overlap=body1.y-body2.bottom;if((-this._overlap>this._maxOverlap)||body1.checkCollision.up===false||body2.checkCollision.down===false)
{this._overlap=0;}
else
{body1.touching.none=false;body1.touching.up=true;body2.touching.none=false;body2.touching.down=true;}}
if(this._overlap!==0)
{body1.overlapY=this._overlap;body2.overlapY=this._overlap;if(overlapOnly||body1.customSeparateY||body2.customSeparateY)
{return true;}
this._velocity1=body1.velocity.y;this._velocity2=body2.velocity.y;if(!body1.immovable&&!body2.immovable)
{this._overlap*=0.5;body1.y=body1.y-this._overlap;body2.y+=this._overlap;this._newVelocity1=Math.sqrt((this._velocity2*this._velocity2*body2.mass)/body1.mass)*((this._velocity2>0)?1:-1);this._newVelocity2=Math.sqrt((this._velocity1*this._velocity1*body1.mass)/body2.mass)*((this._velocity1>0)?1:-1);this._average=(this._newVelocity1+this._newVelocity2)*0.5;this._newVelocity1-=this._average;this._newVelocity2-=this._average;body1.velocity.y=this._average+this._newVelocity1*body1.bounce.y;body2.velocity.y=this._average+this._newVelocity2*body2.bounce.y;}
else if(!body1.immovable)
{body1.y=body1.y-this._overlap;body1.velocity.y=this._velocity2-this._velocity1*body1.bounce.y;if(body2.moves)
{body1.x+=body2.x-body2.prev.x;}}
else if(!body2.immovable)
{body2.y+=this._overlap;body2.velocity.y=this._velocity1-this._velocity2*body2.bounce.y;if(body1.moves)
{body2.x+=body1.x-body1.prev.x;}}
return true;}}
return false;},separateTile:function(i,body,tile){if(!tile.intersects(body.position.x,body.position.y,body.right,body.bottom))
{return false;}
if(tile.collisionCallback&&!tile.collisionCallback.call(tile.collisionCallbackContext,body.sprite,tile))
{return false;}
else if(tile.layer.callbacks[tile.index]&&!tile.layer.callbacks[tile.index].callback.call(tile.layer.callbacks[tile.index].callbackContext,body.sprite,tile))
{return false;}
if(!tile.faceLeft&&!tile.faceRight&&!tile.faceTop&&!tile.faceBottom)
{return false;}
var ox=0;var oy=0;var minX=0;var minY=1;if(body.deltaAbsX()>body.deltaAbsY())
{minX=-1;}
else if(body.deltaAbsX()<body.deltaAbsY())
{minY=-1;}
if(body.deltaX()!==0&&body.deltaY()!==0&&(tile.faceLeft||tile.faceRight)&&(tile.faceTop||tile.faceBottom))
{minX=Math.min(Math.abs(body.position.x-tile.right),Math.abs(body.right-tile.left));minY=Math.min(Math.abs(body.position.y-tile.bottom),Math.abs(body.bottom-tile.top));}
if(minX<minY)
{if(tile.faceLeft||tile.faceRight)
{ox=this.tileCheckX(body,tile);if(ox!==0&&!tile.intersects(body.position.x,body.position.y,body.right,body.bottom))
{return true;}}
if(tile.faceTop||tile.faceBottom)
{oy=this.tileCheckY(body,tile);}}
else
{if(tile.faceTop||tile.faceBottom)
{oy=this.tileCheckY(body,tile);if(oy!==0&&!tile.intersects(body.position.x,body.position.y,body.right,body.bottom))
{return true;}}
if(tile.faceLeft||tile.faceRight)
{ox=this.tileCheckX(body,tile);}}
return(ox!==0||oy!==0);},tileCheckX:function(body,tile){var ox=0;if(body.deltaX()<0&&!body.blocked.left&&tile.collideRight&&body.checkCollision.left)
{if(tile.faceRight&&body.x<tile.right)
{ox=body.x-tile.right;if(ox<-this.TILE_BIAS)
{ox=0;}}}
else if(body.deltaX()>0&&!body.blocked.right&&tile.collideLeft&&body.checkCollision.right)
{if(tile.faceLeft&&body.right>tile.left)
{ox=body.right-tile.left;if(ox>this.TILE_BIAS)
{ox=0;}}}
if(ox!==0)
{this.processTileSeparationX(body,ox);}
return ox;},tileCheckY:function(body,tile){var oy=0;if(body.deltaY()<0&&!body.blocked.up&&tile.collideDown&&body.checkCollision.up)
{if(tile.faceBottom&&body.y<tile.bottom)
{oy=body.y-tile.bottom;if(oy<-this.TILE_BIAS)
{oy=0;}}}
else if(body.deltaY()>0&&!body.blocked.down&&tile.collideUp&&body.checkCollision.down)
{if(tile.faceTop&&body.bottom>tile.top)
{oy=body.bottom-tile.top;if(oy>this.TILE_BIAS)
{oy=0;}}}
if(oy!==0)
{this.processTileSeparationY(body,oy);}
return oy;},processTileSeparationX:function(body,x){if(x<0)
{body.blocked.left=true;}
else if(x>0)
{body.blocked.right=true;}
body.position.x-=x;if(body.bounce.x===0)
{body.velocity.x=0;}
else
{body.velocity.x=-body.velocity.x*body.bounce.x;}},processTileSeparationY:function(body,y){if(y<0)
{body.blocked.up=true;}
else if(y>0)
{body.blocked.down=true;}
body.position.y-=y;if(body.bounce.y===0)
{body.velocity.y=0;}
else
{body.velocity.y=-body.velocity.y*body.bounce.y;}},moveToObject:function(displayObject,destination,speed,maxTime){if(typeof speed==='undefined'){speed=60;}
if(typeof maxTime==='undefined'){maxTime=0;}
this._angle=Math.atan2(destination.y-displayObject.y,destination.x-displayObject.x);if(maxTime>0)
{speed=this.distanceBetween(displayObject,destination)/(maxTime/1000);}
displayObject.body.velocity.x=Math.cos(this._angle)*speed;displayObject.body.velocity.y=Math.sin(this._angle)*speed;return this._angle;},moveToPointer:function(displayObject,speed,pointer,maxTime){if(typeof speed==='undefined'){speed=60;}
pointer=pointer||this.game.input.activePointer;if(typeof maxTime==='undefined'){maxTime=0;}
this._angle=this.angleToPointer(displayObject,pointer);if(maxTime>0)
{speed=this.distanceToPointer(displayObject,pointer)/(maxTime/1000);}
displayObject.body.velocity.x=Math.cos(this._angle)*speed;displayObject.body.velocity.y=Math.sin(this._angle)*speed;return this._angle;},moveToXY:function(displayObject,x,y,speed,maxTime){if(typeof speed==='undefined'){speed=60;}
if(typeof maxTime==='undefined'){maxTime=0;}
this._angle=Math.atan2(y-displayObject.y,x-displayObject.x);if(maxTime>0)
{speed=this.distanceToXY(displayObject,x,y)/(maxTime/1000);}
displayObject.body.velocity.x=Math.cos(this._angle)*speed;displayObject.body.velocity.y=Math.sin(this._angle)*speed;return this._angle;},velocityFromAngle:function(angle,speed,point){if(typeof speed==='undefined'){speed=60;}
point=point||new Phaser.Point();return point.setTo((Math.cos(this.game.math.degToRad(angle))*speed),(Math.sin(this.game.math.degToRad(angle))*speed));},velocityFromRotation:function(rotation,speed,point){if(typeof speed==='undefined'){speed=60;}
point=point||new Phaser.Point();return point.setTo((Math.cos(rotation)*speed),(Math.sin(rotation)*speed));},accelerationFromRotation:function(rotation,speed,point){if(typeof speed==='undefined'){speed=60;}
point=point||new Phaser.Point();return point.setTo((Math.cos(rotation)*speed),(Math.sin(rotation)*speed));},accelerateToObject:function(displayObject,destination,speed,xSpeedMax,ySpeedMax){if(typeof speed==='undefined'){speed=60;}
if(typeof xSpeedMax==='undefined'){xSpeedMax=1000;}
if(typeof ySpeedMax==='undefined'){ySpeedMax=1000;}
this._angle=this.angleBetween(displayObject,destination);displayObject.body.acceleration.setTo(Math.cos(this._angle)*speed,Math.sin(this._angle)*speed);displayObject.body.maxVelocity.setTo(xSpeedMax,ySpeedMax);return this._angle;},accelerateToPointer:function(displayObject,pointer,speed,xSpeedMax,ySpeedMax){if(typeof speed==='undefined'){speed=60;}
if(typeof pointer==='undefined'){pointer=this.game.input.activePointer;}
if(typeof xSpeedMax==='undefined'){xSpeedMax=1000;}
if(typeof ySpeedMax==='undefined'){ySpeedMax=1000;}
this._angle=this.angleToPointer(displayObject,pointer);displayObject.body.acceleration.setTo(Math.cos(this._angle)*speed,Math.sin(this._angle)*speed);displayObject.body.maxVelocity.setTo(xSpeedMax,ySpeedMax);return this._angle;},accelerateToXY:function(displayObject,x,y,speed,xSpeedMax,ySpeedMax){if(typeof speed==='undefined'){speed=60;}
if(typeof xSpeedMax==='undefined'){xSpeedMax=1000;}
if(typeof ySpeedMax==='undefined'){ySpeedMax=1000;}
this._angle=this.angleToXY(displayObject,x,y);displayObject.body.acceleration.setTo(Math.cos(this._angle)*speed,Math.sin(this._angle)*speed);displayObject.body.maxVelocity.setTo(xSpeedMax,ySpeedMax);return this._angle;},distanceBetween:function(source,target){this._dx=source.x-target.x;this._dy=source.y-target.y;return Math.sqrt(this._dx*this._dx+this._dy*this._dy);},distanceToXY:function(displayObject,x,y){this._dx=displayObject.x-x;this._dy=displayObject.y-y;return Math.sqrt(this._dx*this._dx+this._dy*this._dy);},distanceToPointer:function(displayObject,pointer){pointer=pointer||this.game.input.activePointer;this._dx=displayObject.x-pointer.x;this._dy=displayObject.y-pointer.y;return Math.sqrt(this._dx*this._dx+this._dy*this._dy);},angleBetween:function(source,target){this._dx=target.x-source.x;this._dy=target.y-source.y;return Math.atan2(this._dy,this._dx);},angleToXY:function(displayObject,x,y){this._dx=x-displayObject.x;this._dy=y-displayObject.y;return Math.atan2(this._dy,this._dx);},angleToPointer:function(displayObject,pointer){pointer=pointer||this.game.input.activePointer;this._dx=pointer.worldX-displayObject.x;this._dy=pointer.worldY-displayObject.y;return Math.atan2(this._dy,this._dx);}};Phaser.Physics.Arcade.Body=function(sprite){this.sprite=sprite;this.game=sprite.game;this.type=Phaser.Physics.ARCADE;this.offset=new Phaser.Point();this.position=new Phaser.Point(sprite.x,sprite.y);this.prev=new Phaser.Point(this.position.x,this.position.y);this.allowRotation=true;this.rotation=sprite.rotation;this.preRotation=sprite.rotation;this.sourceWidth=sprite.texture.frame.width;this.sourceHeight=sprite.texture.frame.height;this.width=sprite.width;this.height=sprite.height;this.halfWidth=Math.abs(sprite.width/2);this.halfHeight=Math.abs(sprite.height/2);this.center=new Phaser.Point(sprite.x+this.halfWidth,sprite.y+this.halfHeight);this.velocity=new Phaser.Point();this.newVelocity=new Phaser.Point(0,0);this.deltaMax=new Phaser.Point(0,0);this.acceleration=new Phaser.Point();this.drag=new Phaser.Point();this.allowGravity=true;this.gravity=new Phaser.Point(0,0);this.bounce=new Phaser.Point();this.maxVelocity=new Phaser.Point(10000,10000);this.angularVelocity=0;this.angularAcceleration=0;this.angularDrag=0;this.maxAngular=1000;this.mass=1;this.angle=0;this.speed=0;this.facing=Phaser.NONE;this.immovable=false;this.moves=true;this.customSeparateX=false;this.customSeparateY=false;this.overlapX=0;this.overlapY=0;this.embedded=false;this.collideWorldBounds=false;this.checkCollision={none:false,any:true,up:true,down:true,left:true,right:true};this.touching={none:true,up:false,down:false,left:false,right:false};this.wasTouching={none:true,up:false,down:false,left:false,right:false};this.blocked={up:false,down:false,left:false,right:false};this.tilePadding=new Phaser.Point();this.phase=0;this._reset=true;this._sx=sprite.scale.x;this._sy=sprite.scale.y;this._dx=0;this._dy=0;};Phaser.Physics.Arcade.Body.prototype={updateBounds:function(){var asx=Math.abs(this.sprite.scale.x);var asy=Math.abs(this.sprite.scale.y);if(asx!==this._sx||asy!==this._sy)
{this.width=this.sourceWidth*asx;this.height=this.sourceHeight*asy;this.halfWidth=Math.floor(this.width/2);this.halfHeight=Math.floor(this.height/2);this._sx=asx;this._sy=asy;this.center.setTo(this.position.x+this.halfWidth,this.position.y+this.halfHeight);this._reset=true;}},preUpdate:function(){this.phase=1;this.wasTouching.none=this.touching.none;this.wasTouching.up=this.touching.up;this.wasTouching.down=this.touching.down;this.wasTouching.left=this.touching.left;this.wasTouching.right=this.touching.right;this.touching.none=true;this.touching.up=false;this.touching.down=false;this.touching.left=false;this.touching.right=false;this.blocked.up=false;this.blocked.down=false;this.blocked.left=false;this.blocked.right=false;this.embedded=false;this.updateBounds();this.position.x=(this.sprite.world.x-(this.sprite.anchor.x*this.width))+this.offset.x;this.position.y=(this.sprite.world.y-(this.sprite.anchor.y*this.height))+this.offset.y;this.rotation=this.sprite.angle;this.preRotation=this.rotation;if(this._reset||this.sprite._cache[4]===1)
{this.prev.x=this.position.x;this.prev.y=this.position.y;}
if(this.moves)
{this.game.physics.arcade.updateMotion(this);this.newVelocity.set(this.velocity.x*this.game.time.physicsElapsed,this.velocity.y*this.game.time.physicsElapsed);this.position.x+=this.newVelocity.x;this.position.y+=this.newVelocity.y;if(this.position.x!==this.prev.x||this.position.y!==this.prev.y)
{this.speed=Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.y*this.velocity.y);this.angle=Math.atan2(this.velocity.y,this.velocity.x);}
if(this.collideWorldBounds)
{this.checkWorldBounds();}}
this._dx=this.deltaX();this._dy=this.deltaY();this._reset=false;},postUpdate:function(){if(this.phase===2)
{return;}
this.phase=2;if(this.deltaX()<0)
{this.facing=Phaser.LEFT;}
else if(this.deltaX()>0)
{this.facing=Phaser.RIGHT;}
if(this.deltaY()<0)
{this.facing=Phaser.UP;}
else if(this.deltaY()>0)
{this.facing=Phaser.DOWN;}
if(this.moves)
{this._dx=this.deltaX();this._dy=this.deltaY();if(this.deltaMax.x!==0&&this._dx!==0)
{if(this._dx<0&&this._dx<-this.deltaMax.x)
{this._dx=-this.deltaMax.x;}
else if(this._dx>0&&this._dx>this.deltaMax.x)
{this._dx=this.deltaMax.x;}}
if(this.deltaMax.y!==0&&this._dy!==0)
{if(this._dy<0&&this._dy<-this.deltaMax.y)
{this._dy=-this.deltaMax.y;}
else if(this._dy>0&&this._dy>this.deltaMax.y)
{this._dy=this.deltaMax.y;}}
this.sprite.x+=this._dx;this.sprite.y+=this._dy;}
this.center.setTo(this.position.x+this.halfWidth,this.position.y+this.halfHeight);if(this.allowRotation)
{this.sprite.angle+=this.deltaZ();}
this.prev.x=this.position.x;this.prev.y=this.position.y;},destroy:function(){this.sprite=null;},checkWorldBounds:function(){if(this.position.x<this.game.physics.arcade.bounds.x&&this.game.physics.arcade.checkCollision.left)
{this.position.x=this.game.physics.arcade.bounds.x;this.velocity.x*=-this.bounce.x;this.blocked.left=true;}
else if(this.right>this.game.physics.arcade.bounds.right&&this.game.physics.arcade.checkCollision.right)
{this.position.x=this.game.physics.arcade.bounds.right-this.width;this.velocity.x*=-this.bounce.x;this.blocked.right=true;}
if(this.position.y<this.game.physics.arcade.bounds.y&&this.game.physics.arcade.checkCollision.up)
{this.position.y=this.game.physics.arcade.bounds.y;this.velocity.y*=-this.bounce.y;this.blocked.up=true;}
else if(this.bottom>this.game.physics.arcade.bounds.bottom&&this.game.physics.arcade.checkCollision.down)
{this.position.y=this.game.physics.arcade.bounds.bottom-this.height;this.velocity.y*=-this.bounce.y;this.blocked.down=true;}},setSize:function(width,height,offsetX,offsetY){offsetX=offsetX||this.offset.x;offsetY=offsetY||this.offset.y;this.sourceWidth=width;this.sourceHeight=height;this.width=this.sourceWidth*this._sx;this.height=this.sourceHeight*this._sy;this.halfWidth=Math.floor(this.width/2);this.halfHeight=Math.floor(this.height/2);this.offset.setTo(offsetX,offsetY);this.center.setTo(this.position.x+this.halfWidth,this.position.y+this.halfHeight);},reset:function(x,y){this.velocity.set(0);this.acceleration.set(0);this.angularVelocity=0;this.angularAcceleration=0;this.position.x=(x-(this.sprite.anchor.x*this.width))+this.offset.x;this.position.y=(y-(this.sprite.anchor.y*this.height))+this.offset.y;this.prev.x=this.position.x;this.prev.y=this.position.y;this.rotation=this.sprite.angle;this.preRotation=this.rotation;this._sx=this.sprite.scale.x;this._sy=this.sprite.scale.y;this.center.setTo(this.position.x+this.halfWidth,this.position.y+this.halfHeight);},hitTest:function(x,y){return Phaser.Rectangle.contains(this,x,y);},onFloor:function(){return this.blocked.down;},onWall:function(){return(this.blocked.left||this.blocked.right);},deltaAbsX:function(){return(this.deltaX()>0?this.deltaX():-this.deltaX());},deltaAbsY:function(){return(this.deltaY()>0?this.deltaY():-this.deltaY());},deltaX:function(){return this.position.x-this.prev.x;},deltaY:function(){return this.position.y-this.prev.y;},deltaZ:function(){return this.rotation-this.preRotation;}};Object.defineProperty(Phaser.Physics.Arcade.Body.prototype,"bottom",{get:function(){return this.position.y+this.height;}});Object.defineProperty(Phaser.Physics.Arcade.Body.prototype,"right",{get:function(){return this.position.x+this.width;}});Object.defineProperty(Phaser.Physics.Arcade.Body.prototype,"x",{get:function(){return this.position.x;},set:function(value){this.position.x=value;}});Object.defineProperty(Phaser.Physics.Arcade.Body.prototype,"y",{get:function(){return this.position.y;},set:function(value){this.position.y=value;}});Phaser.Physics.Arcade.Body.render=function(context,body,filled,color){if(typeof filled==='undefined'){filled=true;}
color=color||'rgba(0,255,0,0.4)';if(filled)
{context.fillStyle=color;context.fillRect(body.position.x-body.game.camera.x,body.position.y-body.game.camera.y,body.width,body.height);}
else
{context.strokeStyle=color;context.strokeRect(body.position.x-body.game.camera.x,body.position.y-body.game.camera.y,body.width,body.height);}};Phaser.Physics.Arcade.Body.renderBodyInfo=function(debug,body){debug.line('x: '+body.x.toFixed(2),'y: '+body.y.toFixed(2),'width: '+body.width,'height: '+body.height);debug.line('velocity x: '+body.velocity.x.toFixed(2),'y: '+body.velocity.y.toFixed(2),'deltaX: '+body._dx.toFixed(2),'deltaY: '+body._dy.toFixed(2));debug.line('acceleration x: '+body.acceleration.x.toFixed(2),'y: '+body.acceleration.y.toFixed(2),'speed: '+body.speed.toFixed(2),'angle: '+body.angle.toFixed(2));debug.line('gravity x: '+body.gravity.x,'y: '+body.gravity.y,'bounce x: '+body.bounce.x.toFixed(2),'y: '+body.bounce.y.toFixed(2));debug.line('touching left: '+body.touching.left,'right: '+body.touching.right,'up: '+body.touching.up,'down: '+body.touching.down);debug.line('blocked left: '+body.blocked.left,'right: '+body.blocked.right,'up: '+body.blocked.up,'down: '+body.blocked.down);};Phaser.Physics.Arcade.Body.prototype.constructor=Phaser.Physics.Arcade.Body;Phaser.Particles=function(game){this.game=game;this.emitters={};this.ID=0;};Phaser.Particles.prototype={add:function(emitter){this.emitters[emitter.name]=emitter;return emitter;},remove:function(emitter){delete this.emitters[emitter.name];},update:function(){for(var key in this.emitters)
{if(this.emitters[key].exists)
{this.emitters[key].update();}}}};Phaser.Particles.prototype.constructor=Phaser.Particles;Phaser.Particles.Arcade={};Phaser.Particles.Arcade.Emitter=function(game,x,y,maxParticles){this.maxParticles=maxParticles||50;Phaser.Group.call(this,game);this.name='emitter'+this.game.particles.ID++;this.type=Phaser.EMITTER;this.width=1;this.height=1;this.minParticleSpeed=new Phaser.Point(-100,-100);this.maxParticleSpeed=new Phaser.Point(100,100);this.minParticleScale=1;this.maxParticleScale=1;this.scaleData=null;this.minRotation=-360;this.maxRotation=360;this.minParticleAlpha=1;this.maxParticleAlpha=1;this.alphaData=null;this.gravity=100;this.particleClass=Phaser.Particle;this.particleDrag=new Phaser.Point();this.angularDrag=0;this.frequency=100;this.lifespan=2000;this.bounce=new Phaser.Point();this.on=false;this.particleAnchor=new Phaser.Point(0.5,0.5);this.blendMode=Phaser.blendModes.NORMAL;this.emitX=x;this.emitY=y;this.autoScale=false;this.autoAlpha=false;this.particleBringToTop=false;this.particleSendToBack=false;this._minParticleScale=new Phaser.Point(1,1);this._maxParticleScale=new Phaser.Point(1,1);this._quantity=0;this._timer=0;this._counter=0;this._explode=true;this._frames=null;};Phaser.Particles.Arcade.Emitter.prototype=Object.create(Phaser.Group.prototype);Phaser.Particles.Arcade.Emitter.prototype.constructor=Phaser.Particles.Arcade.Emitter;Phaser.Particles.Arcade.Emitter.prototype.update=function(){if(this.on)
{if(this._explode)
{this._counter=0;do
{this.emitParticle();this._counter++;}
while(this._counter<this._quantity);this.on=false;}
else
{if(this.game.time.now>=this._timer)
{this.emitParticle();this._counter++;if(this._quantity>0)
{if(this._counter>=this._quantity)
{this.on=false;}}
this._timer=this.game.time.now+this.frequency;}}}
var i=this.children.length;while(i--)
{if(this.children[i].exists)
{this.children[i].update();}}};Phaser.Particles.Arcade.Emitter.prototype.makeParticles=function(keys,frames,quantity,collide,collideWorldBounds){if(typeof frames==='undefined'){frames=0;}
if(typeof quantity==='undefined'){quantity=this.maxParticles;}
if(typeof collide==='undefined'){collide=false;}
if(typeof collideWorldBounds==='undefined'){collideWorldBounds=false;}
var particle;var i=0;var rndKey=keys;var rndFrame=frames;this._frames=frames;while(i<quantity)
{if(typeof keys==='object')
{rndKey=this.game.rnd.pick(keys);}
if(typeof frames==='object')
{rndFrame=this.game.rnd.pick(frames);}
particle=new this.particleClass(this.game,0,0,rndKey,rndFrame);this.game.physics.arcade.enable(particle,false);if(collide)
{particle.body.checkCollision.any=true;particle.body.checkCollision.none=false;}
else
{particle.body.checkCollision.none=true;}
particle.body.collideWorldBounds=collideWorldBounds;particle.exists=false;particle.visible=false;particle.anchor.copyFrom(this.particleAnchor);this.add(particle);i++;}
return this;};Phaser.Particles.Arcade.Emitter.prototype.kill=function(){this.on=false;this.alive=false;this.exists=false;};Phaser.Particles.Arcade.Emitter.prototype.revive=function(){this.alive=true;this.exists=true;};Phaser.Particles.Arcade.Emitter.prototype.start=function(explode,lifespan,frequency,quantity){if(typeof explode==='undefined'){explode=true;}
if(typeof lifespan==='undefined'){lifespan=0;}
if(typeof frequency==='undefined'||frequency===null){frequency=250;}
if(typeof quantity==='undefined'){quantity=0;}
this.revive();this.visible=true;this.on=true;this._explode=explode;this.lifespan=lifespan;this.frequency=frequency;if(explode)
{this._quantity=quantity;}
else
{this._quantity+=quantity;}
this._counter=0;this._timer=this.game.time.now+frequency;};Phaser.Particles.Arcade.Emitter.prototype.emitParticle=function(){var particle=this.getFirstExists(false);if(particle===null)
{return;}
if(this.width>1||this.height>1)
{particle.reset(this.game.rnd.integerInRange(this.left,this.right),this.game.rnd.integerInRange(this.top,this.bottom));}
else
{particle.reset(this.emitX,this.emitY);}
particle.angle=0;particle.lifespan=this.lifespan;if(this.particleBringToTop)
{this.bringToTop(particle);}
else if(this.particleSendToBack)
{this.sendToBack(particle);}
if(this.autoScale)
{particle.setScaleData(this.scaleData);}
else if(this.minParticleScale!==1||this.maxParticleScale!==1)
{particle.scale.set(this.game.rnd.realInRange(this.minParticleScale,this.maxParticleScale));}
else if((this._minParticleScale.x!==this._maxParticleScale.x)||(this._minParticleScale.y!==this._maxParticleScale.y))
{particle.scale.set(this.game.rnd.realInRange(this._minParticleScale.x,this._maxParticleScale.x),this.game.rnd.realInRange(this._minParticleScale.y,this._maxParticleScale.y));}
if(Array.isArray(this._frames==='object'))
{particle.frame=this.game.rnd.pick(this._frames);}
else
{particle.frame=this._frames;}
if(this.autoAlpha)
{particle.setAlphaData(this.alphaData);}
else
{particle.alpha=this.game.rnd.realInRange(this.minParticleAlpha,this.maxParticleAlpha);}
particle.blendMode=this.blendMode;particle.body.updateBounds();particle.body.bounce.setTo(this.bounce.x,this.bounce.y);particle.body.velocity.x=this.game.rnd.integerInRange(this.minParticleSpeed.x,this.maxParticleSpeed.x);particle.body.velocity.y=this.game.rnd.integerInRange(this.minParticleSpeed.y,this.maxParticleSpeed.y);particle.body.angularVelocity=this.game.rnd.integerInRange(this.minRotation,this.maxRotation);particle.body.gravity.y=this.gravity;particle.body.drag.x=this.particleDrag.x;particle.body.drag.y=this.particleDrag.y;particle.body.angularDrag=this.angularDrag;particle.onEmit();};Phaser.Particles.Arcade.Emitter.prototype.setSize=function(width,height){this.width=width;this.height=height;};Phaser.Particles.Arcade.Emitter.prototype.setXSpeed=function(min,max){min=min||0;max=max||0;this.minParticleSpeed.x=min;this.maxParticleSpeed.x=max;};Phaser.Particles.Arcade.Emitter.prototype.setYSpeed=function(min,max){min=min||0;max=max||0;this.minParticleSpeed.y=min;this.maxParticleSpeed.y=max;};Phaser.Particles.Arcade.Emitter.prototype.setRotation=function(min,max){min=min||0;max=max||0;this.minRotation=min;this.maxRotation=max;};Phaser.Particles.Arcade.Emitter.prototype.setAlpha=function(min,max,rate,ease,yoyo){if(typeof min==='undefined'){min=1;}
if(typeof max==='undefined'){max=1;}
if(typeof rate==='undefined'){rate=0;}
if(typeof ease==='undefined'){ease=Phaser.Easing.Linear.None;}
if(typeof yoyo==='undefined'){yoyo=false;}
this.minParticleAlpha=min;this.maxParticleAlpha=max;this.autoAlpha=false;if(rate>0&&min!==max)
{var tweenData={v:min};var tween=this.game.make.tween(tweenData).to({v:max},rate,ease);tween.yoyo(yoyo);this.alphaData=tween.generateData(60);this.alphaData.reverse();this.autoAlpha=true;}};Phaser.Particles.Arcade.Emitter.prototype.setScale=function(minX,maxX,minY,maxY,rate,ease,yoyo){if(typeof minX==='undefined'){minX=1;}
if(typeof maxX==='undefined'){maxX=1;}
if(typeof minY==='undefined'){minY=1;}
if(typeof maxY==='undefined'){maxY=1;}
if(typeof rate==='undefined'){rate=0;}
if(typeof ease==='undefined'){ease=Phaser.Easing.Linear.None;}
if(typeof yoyo==='undefined'){yoyo=false;}
this.minParticleScale=1;this.maxParticleScale=1;this._minParticleScale.set(minX,minY);this._maxParticleScale.set(maxX,maxY);this.autoScale=false;if(rate>0&&(minX!==maxX)||(minY!==maxY))
{var tweenData={x:minX,y:minY};var tween=this.game.make.tween(tweenData).to({x:maxX,y:maxY},rate,ease);tween.yoyo(yoyo);this.scaleData=tween.generateData(60);this.scaleData.reverse();this.autoScale=true;}};Phaser.Particles.Arcade.Emitter.prototype.at=function(object){if(object.center)
{this.emitX=object.center.x;this.emitY=object.center.y;}
else
{this.emitX=object.world.x+(object.anchor.x*object.width);this.emitY=object.world.y+(object.anchor.y*object.height);}};Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype,"x",{get:function(){return this.emitX;},set:function(value){this.emitX=value;}});Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype,"y",{get:function(){return this.emitY;},set:function(value){this.emitY=value;}});Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype,"left",{get:function(){return Math.floor(this.x-(this.width/2));}});Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype,"right",{get:function(){return Math.floor(this.x+(this.width/2));}});Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype,"top",{get:function(){return Math.floor(this.y-(this.height/2));}});Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype,"bottom",{get:function(){return Math.floor(this.y+(this.height/2));}});Phaser.Tile=function(layer,index,x,y,width,height){this.layer=layer;this.index=index;this.x=x;this.y=y;this.worldX=x*width;this.worldY=y*height;this.width=width;this.height=height;this.centerX=Math.abs(width/2);this.centerY=Math.abs(height/2);this.alpha=1;this.properties={};this.scanned=false;this.faceTop=false;this.faceBottom=false;this.faceLeft=false;this.faceRight=false;this.collideLeft=false;this.collideRight=false;this.collideUp=false;this.collideDown=false;this.collisionCallback=null;this.collisionCallbackContext=this;};Phaser.Tile.prototype={containsPoint:function(x,y){return!(x<this.worldX||y<this.worldY||x>this.right||y>this.bottom);},intersects:function(x,y,right,bottom){if(right<=this.worldX)
{return false;}
if(bottom<=this.worldY)
{return false;}
if(x>=this.worldX+this.width)
{return false;}
if(y>=this.worldY+this.height)
{return false;}
return true;},setCollisionCallback:function(callback,context){this.collisionCallback=callback;this.collisionCallbackContext=context;},destroy:function(){this.collisionCallback=null;this.collisionCallbackContext=null;this.properties=null;},setCollision:function(left,right,up,down){this.collideLeft=left;this.collideRight=right;this.collideUp=up;this.collideDown=down;},resetCollision:function(){this.collideLeft=false;this.collideRight=false;this.collideUp=false;this.collideDown=false;this.faceTop=false;this.faceBottom=false;this.faceLeft=false;this.faceRight=false;},isInteresting:function(collides,faces){if(collides&&faces)
{return(this.collideLeft||this.collideRight||this.collideUp||this.collideDown||this.faceTop||this.faceBottom||this.faceLeft||this.faceRight||this.collisionCallback);}
else if(collides)
{return(this.collideLeft||this.collideRight||this.collideUp||this.collideDown);}
else if(faces)
{return(this.faceTop||this.faceBottom||this.faceLeft||this.faceRight);}
return false;},copy:function(tile){this.index=tile.index;this.alpha=tile.alpha;this.properties=tile.properties;this.collideUp=tile.collideUp;this.collideDown=tile.collideDown;this.collideLeft=tile.collideLeft;this.collideRight=tile.collideRight;this.collisionCallback=tile.collisionCallback;this.collisionCallbackContext=tile.collisionCallbackContext;}};Phaser.Tile.prototype.constructor=Phaser.Tile;Object.defineProperty(Phaser.Tile.prototype,"collides",{get:function(){return(this.collideLeft||this.collideRight||this.collideUp||this.collideDown);}});Object.defineProperty(Phaser.Tile.prototype,"canCollide",{get:function(){return(this.collideLeft||this.collideRight||this.collideUp||this.collideDown||this.collisionCallback);}});Object.defineProperty(Phaser.Tile.prototype,"left",{get:function(){return this.worldX;}});Object.defineProperty(Phaser.Tile.prototype,"right",{get:function(){return this.worldX+this.width;}});Object.defineProperty(Phaser.Tile.prototype,"top",{get:function(){return this.worldY;}});Object.defineProperty(Phaser.Tile.prototype,"bottom",{get:function(){return this.worldY+this.height;}});Phaser.Tilemap=function(game,key,tileWidth,tileHeight,width,height){this.game=game;this.key=key;var data=Phaser.TilemapParser.parse(this.game,key,tileWidth,tileHeight,width,height);if(data===null)
{return;}
this.width=data.width;this.height=data.height;this.tileWidth=data.tileWidth;this.tileHeight=data.tileHeight;this.orientation=data.orientation;this.format=data.format;this.version=data.version;this.properties=data.properties;this.widthInPixels=data.widthInPixels;this.heightInPixels=data.heightInPixels;this.layers=data.layers;this.tilesets=data.tilesets;this.tiles=data.tiles;this.objects=data.objects;this.collideIndexes=[];this.collision=data.collision;this.images=data.images;this.currentLayer=0;this.debugMap=[];this._results=[];this._tempA=0;this._tempB=0;};Phaser.Tilemap.CSV=0;Phaser.Tilemap.TILED_JSON=1;Phaser.Tilemap.prototype={create:function(name,width,height,tileWidth,tileHeight,group){if(typeof group==='undefined'){group=this.game.world;}
this.width=width;this.height=height;this.setTileSize(tileWidth,tileHeight);this.layers.length=0;return this.createBlankLayer(name,width,height,tileWidth,tileHeight,group);},setTileSize:function(tileWidth,tileHeight){this.tileWidth=tileWidth;this.tileHeight=tileHeight;this.widthInPixels=this.width*tileWidth;this.heightInPixels=this.height*tileHeight;},addTilesetImage:function(tileset,key,tileWidth,tileHeight,tileMargin,tileSpacing,gid){if(typeof tileWidth==='undefined'){tileWidth=this.tileWidth;}
if(typeof tileHeight==='undefined'){tileHeight=this.tileHeight;}
if(typeof tileMargin==='undefined'){tileMargin=0;}
if(typeof tileSpacing==='undefined'){tileSpacing=0;}
if(typeof gid==='undefined'){gid=0;}
if(tileWidth===0)
{tileWidth=32;}
if(tileHeight===0)
{tileHeight=32;}
if(typeof key==='undefined')
{if(typeof tileset==='string')
{key=tileset;if(!this.game.cache.checkImageKey(key))
{console.warn('Phaser.Tilemap.addTilesetImage: Invalid image key given: "'+key+'"');return null;}}
else
{return null;}}
if(typeof tileset==='string')
{tileset=this.getTilesetIndex(tileset);if(tileset===null&&this.format===Phaser.Tilemap.TILED_JSON)
{console.warn('Phaser.Tilemap.addTilesetImage: No data found in the JSON matching the tileset name: "'+key+'"');return null;}}
if(this.tilesets[tileset])
{this.tilesets[tileset].setImage(this.game.cache.getImage(key));return this.tilesets[tileset];}
else
{var newSet=new Phaser.Tileset(key,gid,tileWidth,tileHeight,tileMargin,tileSpacing,{});newSet.setImage(this.game.cache.getImage(key));this.tilesets.push(newSet);var i=this.tilesets.length-1;var x=tileMargin;var y=tileMargin;var count=0;var countX=0;var countY=0;for(var t=gid;t<gid+newSet.total;t++)
{this.tiles[t]=[x,y,i];x+=tileWidth+tileSpacing;count++;if(count===newSet.total)
{break;}
countX++;if(countX===newSet.columns)
{x=tileMargin;y+=tileHeight+tileSpacing;countX=0;countY++;if(countY===newSet.rows)
{break;}}}
return newSet;}
return null;},createFromObjects:function(name,gid,key,frame,exists,autoCull,group,CustomClass,adjustY){if(typeof exists==='undefined'){exists=true;}
if(typeof autoCull==='undefined'){autoCull=false;}
if(typeof group==='undefined'){group=this.game.world;}
if(typeof CustomClass==='undefined'){CustomClass=Phaser.Sprite;}
if(typeof adjustY==='undefined'){adjustY=true;}
if(!this.objects[name])
{console.warn('Tilemap.createFromObjects: Invalid objectgroup name given: '+name);return;}
var sprite;for(var i=0,len=this.objects[name].length;i<len;i++)
{if(this.objects[name][i].gid===gid)
{sprite=new CustomClass(this.game,this.objects[name][i].x,this.objects[name][i].y,key,frame);sprite.name=this.objects[name][i].name;sprite.visible=this.objects[name][i].visible;sprite.autoCull=autoCull;sprite.exists=exists;if(adjustY)
{sprite.y-=sprite.height;}
group.add(sprite);for(var property in this.objects[name][i].properties)
{group.set(sprite,property,this.objects[name][i].properties[property],false,false,0);}}}},createLayer:function(layer,width,height,group){if(typeof width==='undefined'){width=this.game.width;}
if(typeof height==='undefined'){height=this.game.height;}
if(typeof group==='undefined'){group=this.game.world;}
var index=layer;if(typeof layer==='string')
{index=this.getLayerIndex(layer);}
if(index===null||index>this.layers.length)
{console.warn('Tilemap.createLayer: Invalid layer ID given: '+index);return;}
return group.add(new Phaser.TilemapLayer(this.game,this,index,width,height));},createBlankLayer:function(name,width,height,tileWidth,tileHeight,group){if(typeof group==='undefined'){group=this.game.world;}
if(this.getLayerIndex(name)!==null)
{console.warn('Tilemap.createBlankLayer: Layer with matching name already exists');return;}
var layer={name:name,x:0,y:0,width:width,height:height,widthInPixels:width*tileWidth,heightInPixels:height*tileHeight,alpha:1,visible:true,properties:{},indexes:[],callbacks:[],bodies:[],data:null};var row;var output=[];for(var y=0;y<height;y++)
{row=[];for(var x=0;x<width;x++)
{row.push(new Phaser.Tile(layer,-1,x,y,tileWidth,tileHeight));}
output.push(row);}
layer.data=output;this.layers.push(layer);this.currentLayer=this.layers.length-1;var w=layer.widthInPixels;var h=layer.heightInPixels;if(w>this.game.width)
{w=this.game.width;}
if(h>this.game.height)
{h=this.game.height;}
var output=new Phaser.TilemapLayer(this.game,this,this.layers.length-1,w,h);output.name=name;return group.add(output);},getIndex:function(location,name){for(var i=0;i<location.length;i++)
{if(location[i].name===name)
{return i;}}
return null;},getLayerIndex:function(name){return this.getIndex(this.layers,name);},getTilesetIndex:function(name){return this.getIndex(this.tilesets,name);},getImageIndex:function(name){return this.getIndex(this.images,name);},getObjectIndex:function(name){return this.getIndex(this.objects,name);},setTileIndexCallback:function(indexes,callback,callbackContext,layer){layer=this.getLayer(layer);if(typeof indexes==='number')
{this.layers[layer].callbacks[indexes]={callback:callback,callbackContext:callbackContext};}
else
{for(var i=0,len=indexes.length;i<len;i++)
{this.layers[layer].callbacks[indexes[i]]={callback:callback,callbackContext:callbackContext};}}},setTileLocationCallback:function(x,y,width,height,callback,callbackContext,layer){layer=this.getLayer(layer);this.copy(x,y,width,height,layer);if(this._results.length<2)
{return;}
for(var i=1;i<this._results.length;i++)
{this._results[i].setCollisionCallback(callback,callbackContext);}},setCollision:function(indexes,collides,layer){if(typeof collides==='undefined'){collides=true;}
layer=this.getLayer(layer);if(typeof indexes==='number')
{return this.setCollisionByIndex(indexes,collides,layer,true);}
else
{for(var i=0,len=indexes.length;i<len;i++)
{this.setCollisionByIndex(indexes[i],collides,layer,false);}
this.calculateFaces(layer);}},setCollisionBetween:function(start,stop,collides,layer){if(typeof collides==='undefined'){collides=true;}
layer=this.getLayer(layer);if(start>stop)
{return;}
for(var index=start;index<=stop;index++)
{this.setCollisionByIndex(index,collides,layer,false);}
this.calculateFaces(layer);},setCollisionByExclusion:function(indexes,collides,layer){if(typeof collides==='undefined'){collides=true;}
layer=this.getLayer(layer);for(var i=0,len=this.tiles.length;i<len;i++)
{if(indexes.indexOf(i)===-1)
{this.setCollisionByIndex(i,collides,layer,false);}}
this.calculateFaces(layer);},setCollisionByIndex:function(index,collides,layer,recalculate){if(typeof collides==='undefined'){collides=true;}
if(typeof layer==='undefined'){layer=this.currentLayer;}
if(typeof recalculate==='undefined'){recalculate=true;}
if(collides)
{this.collideIndexes.push(index);}
else
{var i=this.collideIndexes.indexOf(index);if(i>-1)
{this.collideIndexes.splice(i,1);}}
for(var y=0;y<this.layers[layer].height;y++)
{for(var x=0;x<this.layers[layer].width;x++)
{var tile=this.layers[layer].data[y][x];if(tile&&tile.index===index)
{if(collides)
{tile.setCollision(true,true,true,true);}
else
{tile.resetCollision();}
tile.faceTop=collides;tile.faceBottom=collides;tile.faceLeft=collides;tile.faceRight=collides;}}}
if(recalculate)
{this.calculateFaces(layer);}
return layer;},getLayer:function(layer){if(typeof layer==='undefined')
{layer=this.currentLayer;}
else if(typeof layer==='string')
{layer=this.getLayerIndex(layer);}
else if(layer instanceof Phaser.TilemapLayer)
{layer=layer.index;}
return layer;},calculateFaces:function(layer){var above=null;var below=null;var left=null;var right=null;for(var y=0,h=this.layers[layer].height;y<h;y++)
{for(var x=0,w=this.layers[layer].width;x<w;x++)
{var tile=this.layers[layer].data[y][x];if(tile)
{above=this.getTileAbove(layer,x,y);below=this.getTileBelow(layer,x,y);left=this.getTileLeft(layer,x,y);right=this.getTileRight(layer,x,y);if(tile.collides)
{tile.faceTop=true;tile.faceBottom=true;tile.faceLeft=true;tile.faceRight=true;}
if(above&&above.collides)
{tile.faceTop=false;}
if(below&&below.collides)
{tile.faceBottom=false;}
if(left&&left.collides)
{tile.faceLeft=false;}
if(right&&right.collides)
{tile.faceRight=false;}}}}},getTileAbove:function(layer,x,y){if(y>0)
{return this.layers[layer].data[y-1][x];}
return null;},getTileBelow:function(layer,x,y){if(y<this.layers[layer].height-1)
{return this.layers[layer].data[y+1][x];}
return null;},getTileLeft:function(layer,x,y){if(x>0)
{return this.layers[layer].data[y][x-1];}
return null;},getTileRight:function(layer,x,y){if(x<this.layers[layer].width-1)
{return this.layers[layer].data[y][x+1];}
return null;},setLayer:function(layer){layer=this.getLayer(layer);if(this.layers[layer])
{this.currentLayer=layer;}},hasTile:function(x,y,layer){layer=this.getLayer(layer);return(this.layers[layer].data[y]!==null&&this.layers[layer].data[y][x]!==null);},removeTile:function(x,y,layer){layer=this.getLayer(layer);if(x>=0&&x<this.layers[layer].width&&y>=0&&y<this.layers[layer].height)
{if(this.hasTile(x,y,layer))
{var tile=this.layers[layer].data[y][x];this.layers[layer].data[y][x]=null;this.layers[layer].dirty=true;this.calculateFaces(layer);return tile;}}},removeTileWorldXY:function(x,y,tileWidth,tileHeight,layer){layer=this.getLayer(layer);x=this.game.math.snapToFloor(x,tileWidth)/tileWidth;y=this.game.math.snapToFloor(y,tileHeight)/tileHeight;return this.removeTile(x,y,layer);},putTile:function(tile,x,y,layer){if(tile===null)
{return this.removeTile(x,y,layer);}
layer=this.getLayer(layer);if(x>=0&&x<this.layers[layer].width&&y>=0&&y<this.layers[layer].height)
{var index;if(tile instanceof Phaser.Tile)
{index=tile.index;if(this.hasTile(x,y,layer))
{this.layers[layer].data[y][x].copy(tile);}
else
{this.layers[layer].data[y][x]=new Phaser.Tile(layer,index,x,y,tile.width,tile.height);}}
else
{index=tile;if(this.hasTile(x,y,layer))
{this.layers[layer].data[y][x].index=index;}
else
{this.layers[layer].data[y][x]=new Phaser.Tile(this.layers[layer],index,x,y,this.tileWidth,this.tileHeight);}}
if(this.collideIndexes.indexOf(index)>-1)
{this.layers[layer].data[y][x].setCollision(true,true,true,true);}
else
{this.layers[layer].data[y][x].resetCollision();}
this.layers[layer].dirty=true;this.calculateFaces(layer);return this.layers[layer].data[y][x];}
return null;},putTileWorldXY:function(tile,x,y,tileWidth,tileHeight,layer){layer=this.getLayer(layer);x=this.game.math.snapToFloor(x,tileWidth)/tileWidth;y=this.game.math.snapToFloor(y,tileHeight)/tileHeight;return this.putTile(tile,x,y,layer);},getTile:function(x,y,layer){layer=this.getLayer(layer);if(x>=0&&x<this.layers[layer].width&&y>=0&&y<this.layers[layer].height)
{if(this.layers[layer].data[y][x].index===-1)
{return null;}
else
{return this.layers[layer].data[y][x];}}},getTileWorldXY:function(x,y,tileWidth,tileHeight,layer){if(typeof tileWidth==='undefined'){tileWidth=this.tileWidth;}
if(typeof tileHeight==='undefined'){tileHeight=this.tileHeight;}
layer=this.getLayer(layer);x=this.game.math.snapToFloor(x,tileWidth)/tileWidth;y=this.game.math.snapToFloor(y,tileHeight)/tileHeight;return this.getTile(x,y,layer);},copy:function(x,y,width,height,layer){layer=this.getLayer(layer);if(!this.layers[layer])
{this._results.length=0;return;}
if(typeof x==="undefined"){x=0;}
if(typeof y==="undefined"){y=0;}
if(typeof width==="undefined"){width=this.layers[layer].width;}
if(typeof height==="undefined"){height=this.layers[layer].height;}
if(x<0)
{x=0;}
if(y<0)
{y=0;}
if(width>this.layers[layer].width)
{width=this.layers[layer].width;}
if(height>this.layers[layer].height)
{height=this.layers[layer].height;}
this._results.length=0;this._results.push({x:x,y:y,width:width,height:height,layer:layer});for(var ty=y;ty<y+height;ty++)
{for(var tx=x;tx<x+width;tx++)
{this._results.push(this.layers[layer].data[ty][tx]);}}
return this._results;},paste:function(x,y,tileblock,layer){if(typeof x==="undefined"){x=0;}
if(typeof y==="undefined"){y=0;}
layer=this.getLayer(layer);if(!tileblock||tileblock.length<2)
{return;}
var diffX=tileblock[1].x-x;var diffY=tileblock[1].y-y;for(var i=1;i<tileblock.length;i++)
{this.layers[layer].data[diffY+tileblock[i].y][diffX+tileblock[i].x].copy(tileblock[i]);}
this.layers[layer].dirty=true;this.calculateFaces(layer);},swap:function(tileA,tileB,x,y,width,height,layer){layer=this.getLayer(layer);this.copy(x,y,width,height,layer);if(this._results.length<2)
{return;}
this._tempA=tileA;this._tempB=tileB;this._results.forEach(this.swapHandler,this);this.paste(x,y,this._results,layer);},swapHandler:function(value,index){if(value.index===this._tempA)
{this._results[index].index=this._tempB;}
if(value.index===this._tempB)
{this._results[index].index=this._tempA;}},forEach:function(callback,context,x,y,width,height,layer){layer=this.getLayer(layer);this.copy(x,y,width,height,layer);if(this._results.length<2)
{return;}
this._results.forEach(callback,context);this.paste(x,y,this._results,layer);},replace:function(source,dest,x,y,width,height,layer){layer=this.getLayer(layer);this.copy(x,y,width,height,layer);if(this._results.length<2)
{return;}
for(var i=1;i<this._results.length;i++)
{if(this._results[i].index===source)
{this._results[i].index=dest;}}
this.paste(x,y,this._results,layer);},random:function(x,y,width,height,layer){layer=this.getLayer(layer);this.copy(x,y,width,height,layer);if(this._results.length<2)
{return;}
var indexes=[];for(var t=1;t<this._results.length;t++)
{if(this._results[t].index)
{var idx=this._results[t].index;if(indexes.indexOf(idx)===-1)
{indexes.push(idx);}}}
for(var i=1;i<this._results.length;i++)
{this._results[i].index=this.game.rnd.pick(indexes);}
this.paste(x,y,this._results,layer);},shuffle:function(x,y,width,height,layer){layer=this.getLayer(layer);this.copy(x,y,width,height,layer);if(this._results.length<2)
{return;}
var indexes=[];for(var t=1;t<this._results.length;t++)
{if(this._results[t].index)
{indexes.push(this._results[t].index);}}
Phaser.Utils.shuffle(indexes);for(var i=1;i<this._results.length;i++)
{this._results[i].index=indexes[i-1];}
this.paste(x,y,this._results,layer);},fill:function(index,x,y,width,height,layer){layer=this.getLayer(layer);this.copy(x,y,width,height,layer);if(this._results.length<2)
{return;}
for(var i=1;i<this._results.length;i++)
{this._results[i].index=index;}
this.paste(x,y,this._results,layer);},removeAllLayers:function(){this.layers.length=0;this.currentLayer=0;},dump:function(){var txt='';var args=[''];for(var y=0;y<this.layers[this.currentLayer].height;y++)
{for(var x=0;x<this.layers[this.currentLayer].width;x++)
{txt+="%c  ";if(this.layers[this.currentLayer].data[y][x]>1)
{if(this.debugMap[this.layers[this.currentLayer].data[y][x]])
{args.push("background: "+this.debugMap[this.layers[this.currentLayer].data[y][x]]);}
else
{args.push("background: #ffffff");}}
else
{args.push("background: rgb(0, 0, 0)");}}
txt+="\n";}
args[0]=txt;console.log.apply(console,args);},destroy:function(){this.removeAllLayers();this.data=[];this.game=null;}};Phaser.Tilemap.prototype.constructor=Phaser.Tilemap;Phaser.TilemapLayer=function(game,tilemap,index,width,height){this.game=game;this.map=tilemap;this.index=index;this.layer=tilemap.layers[index];this.canvas=Phaser.Canvas.create(width,height,'',true);this.context=this.canvas.getContext('2d');this.baseTexture=new PIXI.BaseTexture(this.canvas);this.texture=new PIXI.Texture(this.baseTexture);this.textureFrame=new Phaser.Frame(0,0,0,width,height,'tilemapLayer',game.rnd.uuid());Phaser.Image.call(this,this.game,0,0,this.texture,this.textureFrame);this.name='';this.type=Phaser.TILEMAPLAYER;this.fixedToCamera=true;this.cameraOffset=new Phaser.Point(0,0);this.tileColor='rgb(255, 255, 255)';this.debug=false;this.debugAlpha=0.5;this.debugColor='rgba(0, 255, 0, 1)';this.debugFill=false;this.debugFillColor='rgba(0, 255, 0, 0.2)';this.debugCallbackColor='rgba(255, 0, 0, 1)';this.scrollFactorX=1;this.scrollFactorY=1;this.dirty=true;this.rayStepRate=4;this._mc={cw:tilemap.tileWidth,ch:tilemap.tileHeight,ga:1,dx:0,dy:0,dw:0,dh:0,tx:0,ty:0,tw:0,th:0,tl:0,maxX:0,maxY:0,startX:0,startY:0,x:0,y:0,prevX:0,prevY:0};this._results=[];this.updateMax();};Phaser.TilemapLayer.prototype=Object.create(Phaser.Image.prototype);Phaser.TilemapLayer.prototype.constructor=Phaser.TilemapLayer;Phaser.TilemapLayer.prototype.postUpdate=function(){Phaser.Image.prototype.postUpdate.call(this);this.scrollX=this.game.camera.x*this.scrollFactorX;this.scrollY=this.game.camera.y*this.scrollFactorY;this.render();if(this._cache[7]===1)
{this.position.x=(this.game.camera.view.x+this.cameraOffset.x)/this.game.camera.scale.x;this.position.y=(this.game.camera.view.y+this.cameraOffset.y)/this.game.camera.scale.y;}};Phaser.TilemapLayer.prototype.resizeWorld=function(){this.game.world.setBounds(0,0,this.layer.widthInPixels,this.layer.heightInPixels);};Phaser.TilemapLayer.prototype._fixX=function(x){if(x<0)
{x=0;}
if(this.scrollFactorX===1)
{return x;}
return this._mc.x+(x-(this._mc.x/this.scrollFactorX));};Phaser.TilemapLayer.prototype._unfixX=function(x){if(this.scrollFactorX===1)
{return x;}
return(this._mc.x/this.scrollFactorX)+(x-this._mc.x);};Phaser.TilemapLayer.prototype._fixY=function(y){if(y<0)
{y=0;}
if(this.scrollFactorY===1)
{return y;}
return this._mc.y+(y-(this._mc.y/this.scrollFactorY));};Phaser.TilemapLayer.prototype._unfixY=function(y){if(this.scrollFactorY===1)
{return y;}
return(this._mc.y/this.scrollFactorY)+(y-this._mc.y);};Phaser.TilemapLayer.prototype.getTileX=function(x){return this.game.math.snapToFloor(this._fixX(x),this.map.tileWidth)/this.map.tileWidth;};Phaser.TilemapLayer.prototype.getTileY=function(y){return this.game.math.snapToFloor(this._fixY(y),this.map.tileHeight)/this.map.tileHeight;};Phaser.TilemapLayer.prototype.getTileXY=function(x,y,point){point.x=this.getTileX(x);point.y=this.getTileY(y);return point;};Phaser.TilemapLayer.prototype.getRayCastTiles=function(line,stepRate,collides,interestingFace){if(typeof stepRate==='undefined'||stepRate===null){stepRate=this.rayStepRate;}
if(typeof collides==='undefined'){collides=false;}
if(typeof interestingFace==='undefined'){interestingFace=false;}
var tiles=this.getTiles(line.x,line.y,line.width,line.height,collides,interestingFace);if(tiles.length===0)
{return[];}
var coords=line.coordinatesOnLine(stepRate);var total=coords.length;var results=[];for(var i=0;i<tiles.length;i++)
{for(var t=0;t<total;t++)
{if(tiles[i].containsPoint(coords[t][0],coords[t][1]))
{results.push(tiles[i]);break;}}}
return results;};Phaser.TilemapLayer.prototype.getTiles=function(x,y,width,height,collides,interestingFace){if(typeof collides==='undefined'){collides=false;}
if(typeof interestingFace==='undefined'){interestingFace=false;}
x=this._fixX(x);y=this._fixY(y);if(width>this.layer.widthInPixels)
{width=this.layer.widthInPixels;}
if(height>this.layer.heightInPixels)
{height=this.layer.heightInPixels;}
this._mc.tx=this.game.math.snapToFloor(x,this._mc.cw)/this._mc.cw;this._mc.ty=this.game.math.snapToFloor(y,this._mc.ch)/this._mc.ch;this._mc.tw=(this.game.math.snapToCeil(width,this._mc.cw)+this._mc.cw)/this._mc.cw;this._mc.th=(this.game.math.snapToCeil(height,this._mc.ch)+this._mc.ch)/this._mc.ch;this._results.length=0;for(var wy=this._mc.ty;wy<this._mc.ty+this._mc.th;wy++)
{for(var wx=this._mc.tx;wx<this._mc.tx+this._mc.tw;wx++)
{if(this.layer.data[wy]&&this.layer.data[wy][wx])
{if((!collides&&!interestingFace)||this.layer.data[wy][wx].isInteresting(collides,interestingFace))
{this._results.push(this.layer.data[wy][wx]);}}}}
return this._results;};Phaser.TilemapLayer.prototype.updateMax=function(){this._mc.maxX=this.game.math.ceil(this.canvas.width/this.map.tileWidth)+1;this._mc.maxY=this.game.math.ceil(this.canvas.height/this.map.tileHeight)+1;if(this.layer)
{if(this._mc.maxX>this.layer.width)
{this._mc.maxX=this.layer.width;}
if(this._mc.maxY>this.layer.height)
{this._mc.maxY=this.layer.height;}}
this.dirty=true;};Phaser.TilemapLayer.prototype.render=function(){if(this.layer.dirty)
{this.dirty=true;}
if(!this.dirty||!this.visible)
{return;}
this._mc.prevX=this._mc.dx;this._mc.prevY=this._mc.dy;this._mc.dx=-(this._mc.x-(this._mc.startX*this.map.tileWidth));this._mc.dy=-(this._mc.y-(this._mc.startY*this.map.tileHeight));this._mc.tx=this._mc.dx;this._mc.ty=this._mc.dy;this.context.clearRect(0,0,this.canvas.width,this.canvas.height);this.context.fillStyle=this.tileColor;var tile;var set;if(this.debug)
{this.context.globalAlpha=this.debugAlpha;}
for(var y=this._mc.startY,lenY=this._mc.startY+this._mc.maxY;y<lenY;y++)
{this._column=this.layer.data[y];for(var x=this._mc.startX,lenX=this._mc.startX+this._mc.maxX;x<lenX;x++)
{if(this._column[x])
{tile=this._column[x];if(tile.index>-1)
{set=this.map.tilesets[this.map.tiles[tile.index][2]];if(this.debug===false&&tile.alpha!==this.context.globalAlpha)
{this.context.globalAlpha=tile.alpha;}
set.draw(this.context,Math.floor(this._mc.tx),Math.floor(this._mc.ty),tile.index);if(tile.debug)
{this.context.fillStyle='rgba(0, 255, 0, 0.4)';this.context.fillRect(Math.floor(this._mc.tx),Math.floor(this._mc.ty),this.map.tileWidth,this.map.tileHeight);}}}
this._mc.tx+=this.map.tileWidth;}
this._mc.tx=this._mc.dx;this._mc.ty+=this.map.tileHeight;}
if(this.debug)
{this.context.globalAlpha=1;this.renderDebug();}
if(this.game.renderType===Phaser.WEBGL)
{PIXI.updateWebGLTexture(this.baseTexture,this.game.renderer.gl);}
this.dirty=false;this.layer.dirty=false;return true;};Phaser.TilemapLayer.prototype.renderDebug=function(){this._mc.tx=this._mc.dx;this._mc.ty=this._mc.dy;this.context.strokeStyle=this.debugColor;this.context.fillStyle=this.debugFillColor;for(var y=this._mc.startY,lenY=this._mc.startY+this._mc.maxY;y<lenY;y++)
{this._column=this.layer.data[y];for(var x=this._mc.startX,lenX=this._mc.startX+this._mc.maxX;x<lenX;x++)
{var tile=this._column[x];if(tile&&(tile.faceTop||tile.faceBottom||tile.faceLeft||tile.faceRight))
{this._mc.tx=Math.floor(this._mc.tx);if(this.debugFill)
{this.context.fillRect(this._mc.tx,this._mc.ty,this._mc.cw,this._mc.ch);}
this.context.beginPath();if(tile.faceTop)
{this.context.moveTo(this._mc.tx,this._mc.ty);this.context.lineTo(this._mc.tx+this._mc.cw,this._mc.ty);}
if(tile.faceBottom)
{this.context.moveTo(this._mc.tx,this._mc.ty+this._mc.ch);this.context.lineTo(this._mc.tx+this._mc.cw,this._mc.ty+this._mc.ch);}
if(tile.faceLeft)
{this.context.moveTo(this._mc.tx,this._mc.ty);this.context.lineTo(this._mc.tx,this._mc.ty+this._mc.ch);}
if(tile.faceRight)
{this.context.moveTo(this._mc.tx+this._mc.cw,this._mc.ty);this.context.lineTo(this._mc.tx+this._mc.cw,this._mc.ty+this._mc.ch);}
this.context.stroke();}
this._mc.tx+=this.map.tileWidth;}
this._mc.tx=this._mc.dx;this._mc.ty+=this.map.tileHeight;}};Object.defineProperty(Phaser.TilemapLayer.prototype,"scrollX",{get:function(){return this._mc.x;},set:function(value){if(value!==this._mc.x&&value>=0&&this.layer.widthInPixels>this.width)
{this._mc.x=value;if(this._mc.x>(this.layer.widthInPixels-this.width))
{this._mc.x=this.layer.widthInPixels-this.width;}
this._mc.startX=this.game.math.floor(this._mc.x/this.map.tileWidth);if(this._mc.startX<0)
{this._mc.startX=0;}
if(this._mc.startX+this._mc.maxX>this.layer.width)
{this._mc.startX=this.layer.width-this._mc.maxX;}
this.dirty=true;}}});Object.defineProperty(Phaser.TilemapLayer.prototype,"scrollY",{get:function(){return this._mc.y;},set:function(value){if(value!==this._mc.y&&value>=0&&this.layer.heightInPixels>this.height)
{this._mc.y=value;if(this._mc.y>(this.layer.heightInPixels-this.height))
{this._mc.y=this.layer.heightInPixels-this.height;}
this._mc.startY=this.game.math.floor(this._mc.y/this.map.tileHeight);if(this._mc.startY<0)
{this._mc.startY=0;}
if(this._mc.startY+this._mc.maxY>this.layer.height)
{this._mc.startY=this.layer.height-this._mc.maxY;}
this.dirty=true;}}});Object.defineProperty(Phaser.TilemapLayer.prototype,"collisionWidth",{get:function(){return this._mc.cw;},set:function(value){this._mc.cw=value;this.dirty=true;}});Object.defineProperty(Phaser.TilemapLayer.prototype,"collisionHeight",{get:function(){return this._mc.ch;},set:function(value){this._mc.ch=value;this.dirty=true;}});Phaser.TilemapParser={parse:function(game,key,tileWidth,tileHeight,width,height){if(typeof tileWidth==='undefined'){tileWidth=32;}
if(typeof tileHeight==='undefined'){tileHeight=32;}
if(typeof width==='undefined'){width=10;}
if(typeof height==='undefined'){height=10;}
if(typeof key==='undefined')
{return this.getEmptyData();}
if(key===null)
{return this.getEmptyData(tileWidth,tileHeight,width,height);}
var map=game.cache.getTilemapData(key);if(map)
{if(map.format===Phaser.Tilemap.CSV)
{return this.parseCSV(key,map.data,tileWidth,tileHeight);}
else if(!map.format||map.format===Phaser.Tilemap.TILED_JSON)
{return this.parseTiledJSON(map.data);}}
else
{console.warn('Phaser.TilemapParser.parse - No map data found for key '+key);}},parseCSV:function(key,data,tileWidth,tileHeight){var map=this.getEmptyData();data=data.trim();var output=[];var rows=data.split("\n");var height=rows.length;var width=0;for(var y=0;y<rows.length;y++)
{output[y]=[];var column=rows[y].split(",");for(var x=0;x<column.length;x++)
{output[y][x]=new Phaser.Tile(map.layers[0],parseInt(column[x],10),x,y,tileWidth,tileHeight);}
if(width===0)
{width=column.length;}}
map.format=Phaser.Tilemap.CSV;map.name=key;map.width=width;map.height=height;map.tileWidth=tileWidth;map.tileHeight=tileHeight;map.widthInPixels=width*tileWidth;map.heightInPixels=height*tileHeight;map.layers[0].width=width;map.layers[0].height=height;map.layers[0].widthInPixels=map.widthInPixels;map.layers[0].heightInPixels=map.heightInPixels;map.layers[0].data=output;return map;},getEmptyData:function(tileWidth,tileHeight,width,height){var map={};map.width=0;map.height=0;map.tileWidth=0;map.tileHeight=0;if(typeof tileWidth!=='undefined'&&tileWidth!==null){map.tileWidth=tileWidth;}
if(typeof tileHeight!=='undefined'&&tileHeight!==null){map.tileHeight=tileHeight;}
if(typeof width!=='undefined'&&width!==null){map.width=width;}
if(typeof height!=='undefined'&&height!==null){map.height=height;}
map.orientation='orthogonal';map.version='1';map.properties={};map.widthInPixels=0;map.heightInPixels=0;var layers=[];var layer={name:'layer',x:0,y:0,width:0,height:0,widthInPixels:0,heightInPixels:0,alpha:1,visible:true,properties:{},indexes:[],callbacks:[],data:[]};layers.push(layer);map.layers=layers;map.images=[];map.objects={};map.collision={};map.tilesets=[];map.tiles=[];return map;},parseTiledJSON:function(json){if(json.orientation!=='orthogonal')
{console.warn('TilemapParser.parseTiledJSON: Only orthogonal map types are supported in this version of Phaser');return null;}
var map={};map.width=json.width;map.height=json.height;map.tileWidth=json.tilewidth;map.tileHeight=json.tileheight;map.orientation=json.orientation;map.format=Phaser.Tilemap.TILED_JSON;map.version=json.version;map.properties=json.properties;map.widthInPixels=map.width*map.tileWidth;map.heightInPixels=map.height*map.tileHeight;var layers=[];for(var i=0;i<json.layers.length;i++)
{if(json.layers[i].type!=='tilelayer')
{continue;}
var layer={name:json.layers[i].name,x:json.layers[i].x,y:json.layers[i].y,width:json.layers[i].width,height:json.layers[i].height,widthInPixels:json.layers[i].width*json.tilewidth,heightInPixels:json.layers[i].height*json.tileheight,alpha:json.layers[i].opacity,visible:json.layers[i].visible,properties:{},indexes:[],callbacks:[],bodies:[]};if(json.layers[i].properties)
{layer.properties=json.layers[i].properties;}
var x=0;var row=[];var output=[];for(var t=0,len=json.layers[i].data.length;t<len;t++)
{if(json.layers[i].data[t]>0)
{row.push(new Phaser.Tile(layer,json.layers[i].data[t],x,output.length,json.tilewidth,json.tileheight));}
else
{row.push(new Phaser.Tile(layer,-1,x,output.length,json.tilewidth,json.tileheight));}
x++;if(x===json.layers[i].width)
{output.push(row);x=0;row=[];}}
layer.data=output;layers.push(layer);}
map.layers=layers;var images=[];for(var i=0;i<json.layers.length;i++)
{if(json.layers[i].type!=='imagelayer')
{continue;}
var image={name:json.layers[i].name,image:json.layers[i].image,x:json.layers[i].x,y:json.layers[i].y,alpha:json.layers[i].opacity,visible:json.layers[i].visible,properties:{}};if(json.layers[i].properties)
{image.properties=json.layers[i].properties;}
images.push(image);}
map.images=images;var tilesets=[];for(var i=0;i<json.tilesets.length;i++)
{var set=json.tilesets[i];var newSet=new Phaser.Tileset(set.name,set.firstgid,set.tilewidth,set.tileheight,set.margin,set.spacing,set.properties);if(set.tileproperties)
{newSet.tileProperties=set.tileproperties;}
newSet.rows=Math.round((set.imageheight-set.margin)/(set.tileheight+set.spacing));newSet.columns=Math.round((set.imagewidth-set.margin)/(set.tilewidth+set.spacing));newSet.total=newSet.rows*newSet.columns;if(newSet.rows%1!==0||newSet.columns%1!==0)
{console.warn('TileSet image dimensions do not match expected dimensions. Tileset width/height must be evenly divisible by Tilemap tile width/height.');}
else
{tilesets.push(newSet);}}
map.tilesets=tilesets;var objects={};var collision={};for(var i=0;i<json.layers.length;i++)
{if(json.layers[i].type!=='objectgroup')
{continue;}
objects[json.layers[i].name]=[];collision[json.layers[i].name]=[];for(var v=0,len=json.layers[i].objects.length;v<len;v++)
{if(json.layers[i].objects[v].gid)
{var object={gid:json.layers[i].objects[v].gid,name:json.layers[i].objects[v].name,x:json.layers[i].objects[v].x,y:json.layers[i].objects[v].y,visible:json.layers[i].objects[v].visible,properties:json.layers[i].objects[v].properties};objects[json.layers[i].name].push(object);}
else if(json.layers[i].objects[v].polyline)
{var object={name:json.layers[i].objects[v].name,x:json.layers[i].objects[v].x,y:json.layers[i].objects[v].y,width:json.layers[i].objects[v].width,height:json.layers[i].objects[v].height,visible:json.layers[i].objects[v].visible,properties:json.layers[i].objects[v].properties};object.polyline=[];for(var p=0;p<json.layers[i].objects[v].polyline.length;p++)
{object.polyline.push([json.layers[i].objects[v].polyline[p].x,json.layers[i].objects[v].polyline[p].y]);}
collision[json.layers[i].name].push(object);}}}
map.objects=objects;map.collision=collision;map.tiles=[];for(var i=0;i<map.tilesets.length;i++)
{var set=map.tilesets[i];var x=set.tileMargin;var y=set.tileMargin;var count=0;var countX=0;var countY=0;for(var t=set.firstgid;t<set.firstgid+set.total;t++)
{map.tiles[t]=[x,y,i];x+=set.tileWidth+set.tileSpacing;count++;if(count===set.total)
{break;}
countX++;if(countX===set.columns)
{x=set.tileMargin;y+=set.tileHeight+set.tileSpacing;countX=0;countY++;if(countY===set.rows)
{break;}}}}
return map;}};Phaser.Tileset=function(name,firstgid,width,height,margin,spacing,properties){if(typeof width==='undefined'||width<=0){width=32;}
if(typeof height==='undefined'||height<=0){height=32;}
if(typeof margin==='undefined'){margin=0;}
if(typeof spacing==='undefined'){spacing=0;}
this.name=name;this.firstgid=firstgid;this.tileWidth=width;this.tileHeight=height;this.tileMargin=margin;this.tileSpacing=spacing;this.properties=properties;this.image=null;this.rows=0;this.columns=0;this.total=0;this.drawCoords=[];};Phaser.Tileset.prototype={draw:function(context,x,y,index){if(!this.image||!this.drawCoords[index])
{return;}
context.drawImage(this.image,this.drawCoords[index][0],this.drawCoords[index][1],this.tileWidth,this.tileHeight,x,y,this.tileWidth,this.tileHeight);},setImage:function(image){this.image=image;this.rows=Math.round((image.height-this.tileMargin)/(this.tileHeight+this.tileSpacing));this.columns=Math.round((image.width-this.tileMargin)/(this.tileWidth+this.tileSpacing));this.total=this.rows*this.columns;this.drawCoords.length=0;var tx=this.tileMargin;var ty=this.tileMargin;var i=this.firstgid;for(var y=0;y<this.rows;y++)
{for(var x=0;x<this.columns;x++)
{this.drawCoords[i]=[tx,ty];tx+=this.tileWidth+this.tileSpacing;i++;}
tx=this.tileMargin;ty+=this.tileHeight+this.tileSpacing;}},setSpacing:function(margin,spacing){this.tileMargin=margin;this.tileSpacing=spacing;this.setImage(this.image);}};Phaser.Tileset.prototype.constructor=Phaser.Tileset;if(typeof exports!=='undefined'){if(typeof module!=='undefined'&&module.exports){exports=module.exports=Phaser;}
exports.Phaser=Phaser;}else if(typeof define!=='undefined'&&define.amd){define('Phaser',(function(){return root.Phaser=Phaser;})());}else{root.Phaser=Phaser;}}).call(this);Phaser.Physics.Ninja=function(game){this.game=game;this.time=this.game.time;this.gravity=0.2;this.bounds=new Phaser.Rectangle(0,0,game.world.width,game.world.height);this.maxObjects=10;this.maxLevels=4;this.quadTree=new Phaser.QuadTree(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height,this.maxObjects,this.maxLevels);};Phaser.Physics.Ninja.prototype.constructor=Phaser.Physics.Ninja;Phaser.Physics.Ninja.prototype={enableAABB:function(object,children){this.enable(object,1,0,0,children);},enableCircle:function(object,radius,children){this.enable(object,2,0,radius,children);},enableTile:function(object,id,children){this.enable(object,3,id,0,children);},enable:function(object,type,id,radius,children){if(typeof type==='undefined'){type=1;}
if(typeof id==='undefined'){id=1;}
if(typeof radius==='undefined'){radius=0;}
if(typeof children==='undefined'){children=true;}
if(Array.isArray(object))
{var i=object.length;while(i--)
{if(object[i]instanceof Phaser.Group)
{this.enable(object[i].children,type,id,radius,children);}
else
{this.enableBody(object[i],type,id,radius);if(children&&object[i].hasOwnProperty('children')&&object[i].children.length>0)
{this.enable(object[i],type,id,radius,true);}}}}
else
{if(object instanceof Phaser.Group)
{this.enable(object.children,type,id,radius,children);}
else
{this.enableBody(object,type,id,radius);if(children&&object.hasOwnProperty('children')&&object.children.length>0)
{this.enable(object.children,type,id,radius,true);}}}},enableBody:function(object,type,id,radius){if(object.hasOwnProperty('body')&&object.body===null)
{object.body=new Phaser.Physics.Ninja.Body(this,object,type,id,radius);object.anchor.set(0.5);}},setBounds:function(x,y,width,height){this.bounds.setTo(x,y,width,height);},setBoundsToWorld:function(){this.bounds.setTo(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height);},clearTilemapLayerBodies:function(map,layer){layer=map.getLayer(layer);var i=map.layers[layer].bodies.length;while(i--)
{map.layers[layer].bodies[i].destroy();}
map.layers[layer].bodies.length=[];},convertTilemap:function(map,layer,slopeMap){layer=map.getLayer(layer);this.clearTilemapLayerBodies(map,layer);for(var y=0,h=map.layers[layer].height;y<h;y++)
{for(var x=0,w=map.layers[layer].width;x<w;x++)
{var tile=map.layers[layer].data[y][x];if(tile&&slopeMap.hasOwnProperty(tile.index))
{var body=new Phaser.Physics.Ninja.Body(this,null,3,slopeMap[tile.index],0,tile.worldX+tile.centerX,tile.worldY+tile.centerY,tile.width,tile.height);map.layers[layer].bodies.push(body);}}}
return map.layers[layer].bodies;},overlap:function(object1,object2,overlapCallback,processCallback,callbackContext){overlapCallback=overlapCallback||null;processCallback=processCallback||null;callbackContext=callbackContext||overlapCallback;this._result=false;this._total=0;if(Array.isArray(object2))
{for(var i=0,len=object2.length;i<len;i++)
{this.collideHandler(object1,object2[i],overlapCallback,processCallback,callbackContext,true);}}
else
{this.collideHandler(object1,object2,overlapCallback,processCallback,callbackContext,true);}
return(this._total>0);},collide:function(object1,object2,collideCallback,processCallback,callbackContext){collideCallback=collideCallback||null;processCallback=processCallback||null;callbackContext=callbackContext||collideCallback;this._result=false;this._total=0;if(Array.isArray(object2))
{for(var i=0,len=object2.length;i<len;i++)
{this.collideHandler(object1,object2[i],collideCallback,processCallback,callbackContext,false);}}
else
{this.collideHandler(object1,object2,collideCallback,processCallback,callbackContext,false);}
return(this._total>0);},collideHandler:function(object1,object2,collideCallback,processCallback,callbackContext,overlapOnly){if(typeof object2==='undefined'&&(object1.type===Phaser.GROUP||object1.type===Phaser.EMITTER))
{this.collideGroupVsSelf(object1,collideCallback,processCallback,callbackContext,overlapOnly);return;}
if(object1&&object2&&object1.exists&&object2.exists)
{if(object1.type==Phaser.SPRITE||object1.type==Phaser.TILESPRITE)
{if(object2.type==Phaser.SPRITE||object2.type==Phaser.TILESPRITE)
{this.collideSpriteVsSprite(object1,object2,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.GROUP||object2.type==Phaser.EMITTER)
{this.collideSpriteVsGroup(object1,object2,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.TILEMAPLAYER)
{this.collideSpriteVsTilemapLayer(object1,object2,collideCallback,processCallback,callbackContext);}}
else if(object1.type==Phaser.GROUP)
{if(object2.type==Phaser.SPRITE||object2.type==Phaser.TILESPRITE)
{this.collideSpriteVsGroup(object2,object1,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.GROUP||object2.type==Phaser.EMITTER)
{this.collideGroupVsGroup(object1,object2,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.TILEMAPLAYER)
{this.collideGroupVsTilemapLayer(object1,object2,collideCallback,processCallback,callbackContext);}}
else if(object1.type==Phaser.TILEMAPLAYER)
{if(object2.type==Phaser.SPRITE||object2.type==Phaser.TILESPRITE)
{this.collideSpriteVsTilemapLayer(object2,object1,collideCallback,processCallback,callbackContext);}
else if(object2.type==Phaser.GROUP||object2.type==Phaser.EMITTER)
{this.collideGroupVsTilemapLayer(object2,object1,collideCallback,processCallback,callbackContext);}}
else if(object1.type==Phaser.EMITTER)
{if(object2.type==Phaser.SPRITE||object2.type==Phaser.TILESPRITE)
{this.collideSpriteVsGroup(object2,object1,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.GROUP||object2.type==Phaser.EMITTER)
{this.collideGroupVsGroup(object1,object2,collideCallback,processCallback,callbackContext,overlapOnly);}
else if(object2.type==Phaser.TILEMAPLAYER)
{this.collideGroupVsTilemapLayer(object1,object2,collideCallback,processCallback,callbackContext);}}}},collideSpriteVsSprite:function(sprite1,sprite2,collideCallback,processCallback,callbackContext,overlapOnly){if(this.separate(sprite1.body,sprite2.body,processCallback,callbackContext,overlapOnly))
{if(collideCallback)
{collideCallback.call(callbackContext,sprite1,sprite2);}
this._total++;}},collideSpriteVsGroup:function(sprite,group,collideCallback,processCallback,callbackContext,overlapOnly){if(group.length===0)
{return;}
for(var i=0,len=group.children.length;i<len;i++)
{if(group.children[i].exists&&group.children[i].body&&this.separate(sprite.body,group.children[i].body,processCallback,callbackContext,overlapOnly))
{if(collideCallback)
{collideCallback.call(callbackContext,sprite,group.children[i]);}
this._total++;}}},collideGroupVsSelf:function(group,collideCallback,processCallback,callbackContext,overlapOnly){if(group.length===0)
{return;}
var len=group.children.length;for(var i=0;i<len;i++)
{for(var j=i+1;j<=len;j++)
{if(group.children[i]&&group.children[j]&&group.children[i].exists&&group.children[j].exists)
{this.collideSpriteVsSprite(group.children[i],group.children[j],collideCallback,processCallback,callbackContext,overlapOnly);}}}},collideGroupVsGroup:function(group1,group2,collideCallback,processCallback,callbackContext,overlapOnly){if(group1.length===0||group2.length===0)
{return;}
for(var i=0,len=group1.children.length;i<len;i++)
{if(group1.children[i].exists)
{this.collideSpriteVsGroup(group1.children[i],group2,collideCallback,processCallback,callbackContext,overlapOnly);}}},separate:function(body1,body2){if(body1.type!==Phaser.Physics.NINJA||body2.type!==Phaser.Physics.NINJA)
{return false;}
if(body1.aabb&&body2.aabb)
{return body1.aabb.collideAABBVsAABB(body2.aabb);}
if(body1.aabb&&body2.tile)
{return body1.aabb.collideAABBVsTile(body2.tile);}
if(body1.tile&&body2.aabb)
{return body2.aabb.collideAABBVsTile(body1.tile);}
if(body1.circle&&body2.tile)
{return body1.circle.collideCircleVsTile(body2.tile);}
if(body1.tile&&body2.circle)
{return body2.circle.collideCircleVsTile(body1.tile);}}};Phaser.Physics.Ninja.Body=function(system,sprite,type,id,radius,x,y,width,height){sprite=sprite||null;if(typeof type==='undefined'){type=1;}
if(typeof id==='undefined'){id=1;}
if(typeof radius==='undefined'){radius=16;}
this.sprite=sprite;this.game=system.game;this.type=Phaser.Physics.NINJA;this.system=system;this.aabb=null;this.tile=null;this.circle=null;this.shape=null;this.drag=1;this.friction=0.05;this.gravityScale=1;this.bounce=0.3;this.velocity=new Phaser.Point();this.facing=Phaser.NONE;this.immovable=false;this.collideWorldBounds=true;this.checkCollision={none:false,any:true,up:true,down:true,left:true,right:true};this.touching={none:true,up:false,down:false,left:false,right:false};this.wasTouching={none:true,up:false,down:false,left:false,right:false};this.maxSpeed=8;if(sprite)
{x=sprite.x;y=sprite.y;width=sprite.width;height=sprite.height;if(sprite.anchor.x===0)
{x+=(sprite.width*0.5);}
if(sprite.anchor.y===0)
{y+=(sprite.height*0.5);}}
if(type===1)
{this.aabb=new Phaser.Physics.Ninja.AABB(this,x,y,width,height);this.shape=this.aabb;}
else if(type===2)
{this.circle=new Phaser.Physics.Ninja.Circle(this,x,y,radius);this.shape=this.circle;}
else if(type===3)
{this.tile=new Phaser.Physics.Ninja.Tile(this,x,y,width,height,id);this.shape=this.tile;}};Phaser.Physics.Ninja.Body.prototype={preUpdate:function(){this.wasTouching.none=this.touching.none;this.wasTouching.up=this.touching.up;this.wasTouching.down=this.touching.down;this.wasTouching.left=this.touching.left;this.wasTouching.right=this.touching.right;this.touching.none=true;this.touching.up=false;this.touching.down=false;this.touching.left=false;this.touching.right=false;this.shape.integrate();if(this.collideWorldBounds)
{this.shape.collideWorldBounds();}},postUpdate:function(){if(this.sprite)
{if(this.sprite.type===Phaser.TILESPRITE)
{this.sprite.x=this.shape.pos.x-this.shape.xw;this.sprite.y=this.shape.pos.y-this.shape.yw;}
else
{this.sprite.x=this.shape.pos.x;this.sprite.y=this.shape.pos.y;}}
if(this.velocity.x<0)
{this.facing=Phaser.LEFT;}
else if(this.velocity.x>0)
{this.facing=Phaser.RIGHT;}
if(this.velocity.y<0)
{this.facing=Phaser.UP;}
else if(this.velocity.y>0)
{this.facing=Phaser.DOWN;}},setZeroVelocity:function(){this.shape.oldpos.x=this.shape.pos.x;this.shape.oldpos.y=this.shape.pos.y;},moveTo:function(speed,angle){var magnitude=speed*this.game.time.physicsElapsed;var angle=this.game.math.degToRad(angle);this.shape.pos.x=this.shape.oldpos.x+(magnitude*Math.cos(angle));this.shape.pos.y=this.shape.oldpos.y+(magnitude*Math.sin(angle));},moveFrom:function(speed,angle){var magnitude=-speed*this.game.time.physicsElapsed;var angle=this.game.math.degToRad(angle);this.shape.pos.x=this.shape.oldpos.x+(magnitude*Math.cos(angle));this.shape.pos.y=this.shape.oldpos.y+(magnitude*Math.sin(angle));},moveLeft:function(speed){var fx=-speed*this.game.time.physicsElapsed;this.shape.pos.x=this.shape.oldpos.x+Math.min(this.maxSpeed,Math.max(-this.maxSpeed,this.shape.pos.x-this.shape.oldpos.x+fx));},moveRight:function(speed){var fx=speed*this.game.time.physicsElapsed;this.shape.pos.x=this.shape.oldpos.x+Math.min(this.maxSpeed,Math.max(-this.maxSpeed,this.shape.pos.x-this.shape.oldpos.x+fx));},moveUp:function(speed){var fx=-speed*this.game.time.physicsElapsed;this.shape.pos.y=this.shape.oldpos.y+Math.min(this.maxSpeed,Math.max(-this.maxSpeed,this.shape.pos.y-this.shape.oldpos.y+fx));},moveDown:function(speed){var fx=speed*this.game.time.physicsElapsed;this.shape.pos.y=this.shape.oldpos.y+Math.min(this.maxSpeed,Math.max(-this.maxSpeed,this.shape.pos.y-this.shape.oldpos.y+fx));},reset:function(){this.velocity.set(0);this.shape.pos.x=this.sprite.x;this.shape.pos.y=this.sprite.y;this.shape.oldpos.copyFrom(this.shape.pos);},deltaAbsX:function(){return(this.deltaX()>0?this.deltaX():-this.deltaX());},deltaAbsY:function(){return(this.deltaY()>0?this.deltaY():-this.deltaY());},deltaX:function(){return this.shape.pos.x-this.shape.oldpos.x;},deltaY:function(){return this.shape.pos.y-this.shape.oldpos.y;},destroy:function(){this.sprite=null;this.system=null;this.aabb=null;this.tile=null;this.circle=null;this.shape.destroy();this.shape=null;}};Object.defineProperty(Phaser.Physics.Ninja.Body.prototype,"x",{get:function(){return this.shape.pos.x;},set:function(value){this.shape.pos.x=value;}});Object.defineProperty(Phaser.Physics.Ninja.Body.prototype,"y",{get:function(){return this.shape.pos.y;},set:function(value){this.shape.pos.y=value;}});Object.defineProperty(Phaser.Physics.Ninja.Body.prototype,"width",{get:function(){return this.shape.width;}});Object.defineProperty(Phaser.Physics.Ninja.Body.prototype,"height",{get:function(){return this.shape.height;}});Object.defineProperty(Phaser.Physics.Ninja.Body.prototype,"bottom",{get:function(){return this.shape.pos.y+this.shape.yw;}});Object.defineProperty(Phaser.Physics.Ninja.Body.prototype,"right",{get:function(){return this.shape.pos.x+this.shape.xw;}});Object.defineProperty(Phaser.Physics.Ninja.Body.prototype,"speed",{get:function(){return Math.sqrt(this.shape.velocity.x*this.shape.velocity.x+this.shape.velocity.y*this.shape.velocity.y);}});Object.defineProperty(Phaser.Physics.Ninja.Body.prototype,"angle",{get:function(){return Math.atan2(this.shape.velocity.y,this.shape.velocity.x);}});Phaser.Physics.Ninja.AABB=function(body,x,y,width,height){this.body=body;this.system=body.system;this.pos=new Phaser.Point(x,y);this.oldpos=new Phaser.Point(x,y);this.xw=Math.abs(width/2);this.yw=Math.abs(height/2);this.width=width;this.height=height;this.oH=0;this.oV=0;this.velocity=new Phaser.Point();this.aabbTileProjections={};this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_FULL]=this.projAABB_Full;this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_45DEG]=this.projAABB_45Deg;this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_CONCAVE]=this.projAABB_Concave;this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_CONVEX]=this.projAABB_Convex;this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_22DEGs]=this.projAABB_22DegS;this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_22DEGb]=this.projAABB_22DegB;this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_67DEGs]=this.projAABB_67DegS;this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_67DEGb]=this.projAABB_67DegB;this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_HALF]=this.projAABB_Half;};Phaser.Physics.Ninja.AABB.prototype.constructor=Phaser.Physics.Ninja.AABB;Phaser.Physics.Ninja.AABB.COL_NONE=0;Phaser.Physics.Ninja.AABB.COL_AXIS=1;Phaser.Physics.Ninja.AABB.COL_OTHER=2;Phaser.Physics.Ninja.AABB.prototype={integrate:function(){var px=this.pos.x;var py=this.pos.y;this.pos.x+=(this.body.drag*this.pos.x)-(this.body.drag*this.oldpos.x);this.pos.y+=(this.body.drag*this.pos.y)-(this.body.drag*this.oldpos.y)+(this.system.gravity*this.body.gravityScale);this.velocity.set(this.pos.x-px,this.pos.y-py);this.oldpos.set(px,py);},reportCollisionVsWorld:function(px,py,dx,dy){var p=this.pos;var o=this.oldpos;var vx=p.x-o.x;var vy=p.y-o.y;var dp=(vx*dx+vy*dy);var nx=dp*dx;var ny=dp*dy;var tx=vx-nx;var ty=vy-ny;var b,bx,by,fx,fy;if(dp<0)
{fx=tx*this.body.friction;fy=ty*this.body.friction;b=1+this.body.bounce;bx=(nx*b);by=(ny*b);if(dx===1)
{this.body.touching.left=true;}
else if(dx===-1)
{this.body.touching.right=true;}
if(dy===1)
{this.body.touching.up=true;}
else if(dy===-1)
{this.body.touching.down=true;}}
else
{bx=by=fx=fy=0;}
p.x+=px;p.y+=py;o.x+=px+bx+fx;o.y+=py+by+fy;},reverse:function(){var vx=this.pos.x-this.oldpos.x;var vy=this.pos.y-this.oldpos.y;if(this.oldpos.x<this.pos.x)
{this.oldpos.x=this.pos.x+vx;}
else if(this.oldpos.x>this.pos.x)
{this.oldpos.x=this.pos.x-vx;}
if(this.oldpos.y<this.pos.y)
{this.oldpos.y=this.pos.y+vy;}
else if(this.oldpos.y>this.pos.y)
{this.oldpos.y=this.pos.y-vy;}},reportCollisionVsBody:function(px,py,dx,dy,obj){var vx1=this.pos.x-this.oldpos.x;var vy1=this.pos.y-this.oldpos.y;var dp1=(vx1*dx+vy1*dy);if(this.body.immovable&&obj.body.immovable)
{px*=0.5;py*=0.5;this.pos.add(px,py);this.oldpos.set(this.pos.x,this.pos.y);obj.pos.subtract(px,py);obj.oldpos.set(obj.pos.x,obj.pos.y);return;}
else if(!this.body.immovable&&!obj.body.immovable)
{px*=0.5;py*=0.5;this.pos.add(px,py);obj.pos.subtract(px,py);if(dp1<0)
{this.reverse();obj.reverse();}}
else if(!this.body.immovable)
{this.pos.subtract(px,py);if(dp1<0)
{this.reverse();}}
else if(!obj.body.immovable)
{obj.pos.subtract(px,py);if(dp1<0)
{obj.reverse();}}},collideWorldBounds:function(){var dx=this.system.bounds.x-(this.pos.x-this.xw);if(0<dx)
{this.reportCollisionVsWorld(dx,0,1,0,null);}
else
{dx=(this.pos.x+this.xw)-this.system.bounds.right;if(0<dx)
{this.reportCollisionVsWorld(-dx,0,-1,0,null);}}
var dy=this.system.bounds.y-(this.pos.y-this.yw);if(0<dy)
{this.reportCollisionVsWorld(0,dy,0,1,null);}
else
{dy=(this.pos.y+this.yw)-this.system.bounds.bottom;if(0<dy)
{this.reportCollisionVsWorld(0,-dy,0,-1,null);}}},collideAABBVsAABB:function(aabb){var pos=this.pos;var c=aabb;var tx=c.pos.x;var ty=c.pos.y;var txw=c.xw;var tyw=c.yw;var dx=pos.x-tx;var px=(txw+this.xw)-Math.abs(dx);if(0<px)
{var dy=pos.y-ty;var py=(tyw+this.yw)-Math.abs(dy);if(0<py)
{if(px<py)
{if(dx<0)
{px*=-1;py=0;}
else
{py=0;}}
else
{if(dy<0)
{px=0;py*=-1;}
else
{px=0;}}
var l=Math.sqrt(px*px+py*py);this.reportCollisionVsBody(px,py,px/l,py/l,c);return Phaser.Physics.Ninja.AABB.COL_AXIS;}}
return false;},collideAABBVsTile:function(tile){var dx=this.pos.x-tile.pos.x;var px=(tile.xw+this.xw)-Math.abs(dx);if(0<px)
{var dy=this.pos.y-tile.pos.y;var py=(tile.yw+this.yw)-Math.abs(dy);if(0<py)
{if(px<py)
{if(dx<0)
{px*=-1;py=0;}
else
{py=0;}}
else
{if(dy<0)
{px=0;py*=-1;}
else
{px=0;}}
return this.resolveTile(px,py,this,tile);}}
return false;},resolveTile:function(x,y,body,tile){if(0<tile.id)
{return this.aabbTileProjections[tile.type](x,y,body,tile);}
else
{return false;}},projAABB_Full:function(x,y,obj,t){var l=Math.sqrt(x*x+y*y);obj.reportCollisionVsWorld(x,y,x/l,y/l,t);return Phaser.Physics.Ninja.AABB.COL_AXIS;},projAABB_Half:function(x,y,obj,t){var sx=t.signx;var sy=t.signy;var ox=(obj.pos.x-(sx*obj.xw))-t.pos.x;var oy=(obj.pos.y-(sy*obj.yw))-t.pos.y;var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;var lenN=Math.sqrt(sx*sx+sy*sy);var lenP=Math.sqrt(x*x+y*y);if(lenP<lenN)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.AABB.COL_AXIS;}
else
{obj.reportCollisionVsWorld(sx,sy,t.signx,t.signy,t);return Phaser.Physics.Ninja.AABB.COL_OTHER;}}
return Phaser.Physics.Ninja.AABB.COL_NONE;},projAABB_45Deg:function(x,y,obj,t){var signx=t.signx;var signy=t.signy;var ox=(obj.pos.x-(signx*obj.xw))-t.pos.x;var oy=(obj.pos.y-(signy*obj.yw))-t.pos.y;var sx=t.sx;var sy=t.sy;var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;var lenN=Math.sqrt(sx*sx+sy*sy);var lenP=Math.sqrt(x*x+y*y);if(lenP<lenN)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.AABB.COL_AXIS;}
else
{obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy);return Phaser.Physics.Ninja.AABB.COL_OTHER;}}
return Phaser.Physics.Ninja.AABB.COL_NONE;},projAABB_22DegS:function(x,y,obj,t){var signx=t.signx;var signy=t.signy;var py=obj.pos.y-(signy*obj.yw);var penY=t.pos.y-py;if(0<(penY*signy))
{var ox=(obj.pos.x-(signx*obj.xw))-(t.pos.x+(signx*t.xw));var oy=(obj.pos.y-(signy*obj.yw))-(t.pos.y-(signy*t.yw));var sx=t.sx;var sy=t.sy;var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;var lenN=Math.sqrt(sx*sx+sy*sy);var lenP=Math.sqrt(x*x+y*y);var aY=Math.abs(penY);if(lenP<lenN)
{if(aY<lenP)
{obj.reportCollisionVsWorld(0,penY,0,penY/aY,t);return Phaser.Physics.Ninja.AABB.COL_OTHER;}
else
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.AABB.COL_AXIS;}}
else
{if(aY<lenN)
{obj.reportCollisionVsWorld(0,penY,0,penY/aY,t);return Phaser.Physics.Ninja.AABB.COL_OTHER;}
else
{obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);return Phaser.Physics.Ninja.AABB.COL_OTHER;}}}}
return Phaser.Physics.Ninja.AABB.COL_NONE;},projAABB_22DegB:function(x,y,obj,t){var signx=t.signx;var signy=t.signy;var ox=(obj.pos.x-(signx*obj.xw))-(t.pos.x-(signx*t.xw));var oy=(obj.pos.y-(signy*obj.yw))-(t.pos.y+(signy*t.yw));var sx=t.sx;var sy=t.sy;var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;var lenN=Math.sqrt(sx*sx+sy*sy);var lenP=Math.sqrt(x*x+y*y);if(lenP<lenN)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.AABB.COL_AXIS;}
else
{obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);return Phaser.Physics.Ninja.AABB.COL_OTHER;}}
return Phaser.Physics.Ninja.AABB.COL_NONE;},projAABB_67DegS:function(x,y,obj,t){var signx=t.signx;var signy=t.signy;var px=obj.pos.x-(signx*obj.xw);var penX=t.pos.x-px;if(0<(penX*signx))
{var ox=(obj.pos.x-(signx*obj.xw))-(t.pos.x-(signx*t.xw));var oy=(obj.pos.y-(signy*obj.yw))-(t.pos.y+(signy*t.yw));var sx=t.sx;var sy=t.sy;var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;var lenN=Math.sqrt(sx*sx+sy*sy);var lenP=Math.sqrt(x*x+y*y);var aX=Math.abs(penX);if(lenP<lenN)
{if(aX<lenP)
{obj.reportCollisionVsWorld(penX,0,penX/aX,0,t);return Phaser.Physics.Ninja.AABB.COL_OTHER;}
else
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.AABB.COL_AXIS;}}
else
{if(aX<lenN)
{obj.reportCollisionVsWorld(penX,0,penX/aX,0,t);return Phaser.Physics.Ninja.AABB.COL_OTHER;}
else
{obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);return Phaser.Physics.Ninja.AABB.COL_OTHER;}}}}
return Phaser.Physics.Ninja.AABB.COL_NONE;},projAABB_67DegB:function(x,y,obj,t){var signx=t.signx;var signy=t.signy;var ox=(obj.pos.x-(signx*obj.xw))-(t.pos.x+(signx*t.xw));var oy=(obj.pos.y-(signy*obj.yw))-(t.pos.y-(signy*t.yw));var sx=t.sx;var sy=t.sy;var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;var lenN=Math.sqrt(sx*sx+sy*sy);var lenP=Math.sqrt(x*x+y*y);if(lenP<lenN)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.AABB.COL_AXIS;}
else
{obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);return Phaser.Physics.Ninja.AABB.COL_OTHER;}}
return Phaser.Physics.Ninja.AABB.COL_NONE;},projAABB_Convex:function(x,y,obj,t){var signx=t.signx;var signy=t.signy;var ox=(obj.pos.x-(signx*obj.xw))-(t.pos.x-(signx*t.xw));var oy=(obj.pos.y-(signy*obj.yw))-(t.pos.y-(signy*t.yw));var len=Math.sqrt(ox*ox+oy*oy);var twid=t.xw*2;var rad=Math.sqrt(twid*twid+0);var pen=rad-len;if(((signx*ox)<0)||((signy*oy)<0))
{var lenP=Math.sqrt(x*x+y*y);obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.AABB.COL_AXIS;}
else if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.AABB.COL_OTHER;}
return Phaser.Physics.Ninja.AABB.COL_NONE;},projAABB_Concave:function(x,y,obj,t){var signx=t.signx;var signy=t.signy;var ox=(t.pos.x+(signx*t.xw))-(obj.pos.x-(signx*obj.xw));var oy=(t.pos.y+(signy*t.yw))-(obj.pos.y-(signy*obj.yw));var twid=t.xw*2;var rad=Math.sqrt(twid*twid+0);var len=Math.sqrt(ox*ox+oy*oy);var pen=len-rad;if(0<pen)
{var lenP=Math.sqrt(x*x+y*y);if(lenP<pen)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.AABB.COL_AXIS;}
else
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.AABB.COL_OTHER;}}
return Phaser.Physics.Ninja.AABB.COL_NONE;},destroy:function(){this.body=null;this.system=null;}};Phaser.Physics.Ninja.Tile=function(body,x,y,width,height,type){if(typeof type==='undefined'){type=Phaser.Physics.Ninja.Tile.EMPTY;}
this.body=body;this.system=body.system;this.id=type;this.type=Phaser.Physics.Ninja.Tile.TYPE_EMPTY;this.pos=new Phaser.Point(x,y);this.oldpos=new Phaser.Point(x,y);if(this.id>1&&this.id<30)
{height=width;}
this.xw=Math.abs(width/2);this.yw=Math.abs(height/2);this.width=width;this.height=height;this.velocity=new Phaser.Point();this.signx=0;this.signy=0;this.sx=0;this.sy=0;this.body.gravityScale=0;this.body.collideWorldBounds=false;if(this.id>0)
{this.setType(this.id);}};Phaser.Physics.Ninja.Tile.prototype.constructor=Phaser.Physics.Ninja.Tile;Phaser.Physics.Ninja.Tile.prototype={integrate:function(){var px=this.pos.x;var py=this.pos.y;this.pos.x+=(this.body.drag*this.pos.x)-(this.body.drag*this.oldpos.x);this.pos.y+=(this.body.drag*this.pos.y)-(this.body.drag*this.oldpos.y)+(this.system.gravity*this.body.gravityScale);this.velocity.set(this.pos.x-px,this.pos.y-py);this.oldpos.set(px,py);},collideWorldBounds:function(){var dx=this.system.bounds.x-(this.pos.x-this.xw);if(0<dx)
{this.reportCollisionVsWorld(dx,0,1,0,null);}
else
{dx=(this.pos.x+this.xw)-this.system.bounds.right;if(0<dx)
{this.reportCollisionVsWorld(-dx,0,-1,0,null);}}
var dy=this.system.bounds.y-(this.pos.y-this.yw);if(0<dy)
{this.reportCollisionVsWorld(0,dy,0,1,null);}
else
{dy=(this.pos.y+this.yw)-this.system.bounds.bottom;if(0<dy)
{this.reportCollisionVsWorld(0,-dy,0,-1,null);}}},reportCollisionVsWorld:function(px,py,dx,dy){var p=this.pos;var o=this.oldpos;var vx=p.x-o.x;var vy=p.y-o.y;var dp=(vx*dx+vy*dy);var nx=dp*dx;var ny=dp*dy;var tx=vx-nx;var ty=vy-ny;var b,bx,by,fx,fy;if(dp<0)
{fx=tx*this.body.friction;fy=ty*this.body.friction;b=1+this.body.bounce;bx=(nx*b);by=(ny*b);if(dx===1)
{this.body.touching.left=true;}
else if(dx===-1)
{this.body.touching.right=true;}
if(dy===1)
{this.body.touching.up=true;}
else if(dy===-1)
{this.body.touching.down=true;}}
else
{bx=by=fx=fy=0;}
p.x+=px;p.y+=py;o.x+=px+bx+fx;o.y+=py+by+fy;},setType:function(id){if(id===Phaser.Physics.Ninja.Tile.EMPTY)
{this.clear();}
else
{this.id=id;this.updateType();}
return this;},clear:function(){this.id=Phaser.Physics.Ninja.Tile.EMPTY;this.updateType();},destroy:function(){this.body=null;this.system=null;},updateType:function(){if(this.id===0)
{this.type=Phaser.Physics.Ninja.Tile.TYPE_EMPTY;this.signx=0;this.signy=0;this.sx=0;this.sy=0;return true;}
if(this.id<Phaser.Physics.Ninja.Tile.TYPE_45DEG)
{this.type=Phaser.Physics.Ninja.Tile.TYPE_FULL;this.signx=0;this.signy=0;this.sx=0;this.sy=0;}
else if(this.id<Phaser.Physics.Ninja.Tile.TYPE_CONCAVE)
{this.type=Phaser.Physics.Ninja.Tile.TYPE_45DEG;if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_45DEGpn)
{this.signx=1;this.signy=-1;this.sx=this.signx/Math.SQRT2;this.sy=this.signy/Math.SQRT2;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_45DEGnn)
{this.signx=-1;this.signy=-1;this.sx=this.signx/Math.SQRT2;this.sy=this.signy/Math.SQRT2;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_45DEGnp)
{this.signx=-1;this.signy=1;this.sx=this.signx/Math.SQRT2;this.sy=this.signy/Math.SQRT2;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_45DEGpp)
{this.signx=1;this.signy=1;this.sx=this.signx/Math.SQRT2;this.sy=this.signy/Math.SQRT2;}
else
{return false;}}
else if(this.id<Phaser.Physics.Ninja.Tile.TYPE_CONVEX)
{this.type=Phaser.Physics.Ninja.Tile.TYPE_CONCAVE;if(this.id==Phaser.Physics.Ninja.Tile.CONCAVEpn)
{this.signx=1;this.signy=-1;this.sx=0;this.sy=0;}
else if(this.id==Phaser.Physics.Ninja.Tile.CONCAVEnn)
{this.signx=-1;this.signy=-1;this.sx=0;this.sy=0;}
else if(this.id==Phaser.Physics.Ninja.Tile.CONCAVEnp)
{this.signx=-1;this.signy=1;this.sx=0;this.sy=0;}
else if(this.id==Phaser.Physics.Ninja.Tile.CONCAVEpp)
{this.signx=1;this.signy=1;this.sx=0;this.sy=0;}
else
{return false;}}
else if(this.id<Phaser.Physics.Ninja.Tile.TYPE_22DEGs)
{this.type=Phaser.Physics.Ninja.Tile.TYPE_CONVEX;if(this.id==Phaser.Physics.Ninja.Tile.CONVEXpn)
{this.signx=1;this.signy=-1;this.sx=0;this.sy=0;}
else if(this.id==Phaser.Physics.Ninja.Tile.CONVEXnn)
{this.signx=-1;this.signy=-1;this.sx=0;this.sy=0;}
else if(this.id==Phaser.Physics.Ninja.Tile.CONVEXnp)
{this.signx=-1;this.signy=1;this.sx=0;this.sy=0;}
else if(this.id==Phaser.Physics.Ninja.Tile.CONVEXpp)
{this.signx=1;this.signy=1;this.sx=0;this.sy=0;}
else
{return false;}}
else if(this.id<Phaser.Physics.Ninja.Tile.TYPE_22DEGb)
{this.type=Phaser.Physics.Ninja.Tile.TYPE_22DEGs;if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_22DEGpnS)
{this.signx=1;this.signy=-1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*1)/slen;this.sy=(this.signy*2)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_22DEGnnS)
{this.signx=-1;this.signy=-1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*1)/slen;this.sy=(this.signy*2)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_22DEGnpS)
{this.signx=-1;this.signy=1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*1)/slen;this.sy=(this.signy*2)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_22DEGppS)
{this.signx=1;this.signy=1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*1)/slen;this.sy=(this.signy*2)/slen;}
else
{return false;}}
else if(this.id<Phaser.Physics.Ninja.Tile.TYPE_67DEGs)
{this.type=Phaser.Physics.Ninja.Tile.TYPE_22DEGb;if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_22DEGpnB)
{this.signx=1;this.signy=-1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*1)/slen;this.sy=(this.signy*2)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_22DEGnnB)
{this.signx=-1;this.signy=-1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*1)/slen;this.sy=(this.signy*2)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_22DEGnpB)
{this.signx=-1;this.signy=1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*1)/slen;this.sy=(this.signy*2)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_22DEGppB)
{this.signx=1;this.signy=1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*1)/slen;this.sy=(this.signy*2)/slen;}
else
{return false;}}
else if(this.id<Phaser.Physics.Ninja.Tile.TYPE_67DEGb)
{this.type=Phaser.Physics.Ninja.Tile.TYPE_67DEGs;if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_67DEGpnS)
{this.signx=1;this.signy=-1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*2)/slen;this.sy=(this.signy*1)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_67DEGnnS)
{this.signx=-1;this.signy=-1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*2)/slen;this.sy=(this.signy*1)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_67DEGnpS)
{this.signx=-1;this.signy=1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*2)/slen;this.sy=(this.signy*1)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_67DEGppS)
{this.signx=1;this.signy=1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*2)/slen;this.sy=(this.signy*1)/slen;}
else
{return false;}}
else if(this.id<Phaser.Physics.Ninja.Tile.TYPE_HALF)
{this.type=Phaser.Physics.Ninja.Tile.TYPE_67DEGb;if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_67DEGpnB)
{this.signx=1;this.signy=-1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*2)/slen;this.sy=(this.signy*1)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_67DEGnnB)
{this.signx=-1;this.signy=-1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*2)/slen;this.sy=(this.signy*1)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_67DEGnpB)
{this.signx=-1;this.signy=1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*2)/slen;this.sy=(this.signy*1)/slen;}
else if(this.id==Phaser.Physics.Ninja.Tile.SLOPE_67DEGppB)
{this.signx=1;this.signy=1;var slen=Math.sqrt(2*2+1*1);this.sx=(this.signx*2)/slen;this.sy=(this.signy*1)/slen;}
else
{return false;}}
else
{this.type=Phaser.Physics.Ninja.Tile.TYPE_HALF;if(this.id==Phaser.Physics.Ninja.Tile.HALFd)
{this.signx=0;this.signy=-1;this.sx=this.signx;this.sy=this.signy;}
else if(this.id==Phaser.Physics.Ninja.Tile.HALFu)
{this.signx=0;this.signy=1;this.sx=this.signx;this.sy=this.signy;}
else if(this.id==Phaser.Physics.Ninja.Tile.HALFl)
{this.signx=1;this.signy=0;this.sx=this.signx;this.sy=this.signy;}
else if(this.id==Phaser.Physics.Ninja.Tile.HALFr)
{this.signx=-1;this.signy=0;this.sx=this.signx;this.sy=this.signy;}
else
{return false;}}}};Object.defineProperty(Phaser.Physics.Ninja.Tile.prototype,"x",{get:function(){return this.pos.x-this.xw;},set:function(value){this.pos.x=value;}});Object.defineProperty(Phaser.Physics.Ninja.Tile.prototype,"y",{get:function(){return this.pos.y-this.yw;},set:function(value){this.pos.y=value;}});Object.defineProperty(Phaser.Physics.Ninja.Tile.prototype,"bottom",{get:function(){return this.pos.y+this.yw;}});Object.defineProperty(Phaser.Physics.Ninja.Tile.prototype,"right",{get:function(){return this.pos.x+this.xw;}});Phaser.Physics.Ninja.Tile.EMPTY=0;Phaser.Physics.Ninja.Tile.FULL=1;Phaser.Physics.Ninja.Tile.SLOPE_45DEGpn=2;Phaser.Physics.Ninja.Tile.SLOPE_45DEGnn=3;Phaser.Physics.Ninja.Tile.SLOPE_45DEGnp=4;Phaser.Physics.Ninja.Tile.SLOPE_45DEGpp=5;Phaser.Physics.Ninja.Tile.CONCAVEpn=6;Phaser.Physics.Ninja.Tile.CONCAVEnn=7;Phaser.Physics.Ninja.Tile.CONCAVEnp=8;Phaser.Physics.Ninja.Tile.CONCAVEpp=9;Phaser.Physics.Ninja.Tile.CONVEXpn=10;Phaser.Physics.Ninja.Tile.CONVEXnn=11;Phaser.Physics.Ninja.Tile.CONVEXnp=12;Phaser.Physics.Ninja.Tile.CONVEXpp=13;Phaser.Physics.Ninja.Tile.SLOPE_22DEGpnS=14;Phaser.Physics.Ninja.Tile.SLOPE_22DEGnnS=15;Phaser.Physics.Ninja.Tile.SLOPE_22DEGnpS=16;Phaser.Physics.Ninja.Tile.SLOPE_22DEGppS=17;Phaser.Physics.Ninja.Tile.SLOPE_22DEGpnB=18;Phaser.Physics.Ninja.Tile.SLOPE_22DEGnnB=19;Phaser.Physics.Ninja.Tile.SLOPE_22DEGnpB=20;Phaser.Physics.Ninja.Tile.SLOPE_22DEGppB=21;Phaser.Physics.Ninja.Tile.SLOPE_67DEGpnS=22;Phaser.Physics.Ninja.Tile.SLOPE_67DEGnnS=23;Phaser.Physics.Ninja.Tile.SLOPE_67DEGnpS=24;Phaser.Physics.Ninja.Tile.SLOPE_67DEGppS=25;Phaser.Physics.Ninja.Tile.SLOPE_67DEGpnB=26;Phaser.Physics.Ninja.Tile.SLOPE_67DEGnnB=27;Phaser.Physics.Ninja.Tile.SLOPE_67DEGnpB=28;Phaser.Physics.Ninja.Tile.SLOPE_67DEGppB=29;Phaser.Physics.Ninja.Tile.HALFd=30;Phaser.Physics.Ninja.Tile.HALFr=31;Phaser.Physics.Ninja.Tile.HALFu=32;Phaser.Physics.Ninja.Tile.HALFl=33;Phaser.Physics.Ninja.Tile.TYPE_EMPTY=0;Phaser.Physics.Ninja.Tile.TYPE_FULL=1;Phaser.Physics.Ninja.Tile.TYPE_45DEG=2;Phaser.Physics.Ninja.Tile.TYPE_CONCAVE=6;Phaser.Physics.Ninja.Tile.TYPE_CONVEX=10;Phaser.Physics.Ninja.Tile.TYPE_22DEGs=14;Phaser.Physics.Ninja.Tile.TYPE_22DEGb=18;Phaser.Physics.Ninja.Tile.TYPE_67DEGs=22;Phaser.Physics.Ninja.Tile.TYPE_67DEGb=26;Phaser.Physics.Ninja.Tile.TYPE_HALF=30;Phaser.Physics.Ninja.Circle=function(body,x,y,radius){this.body=body;this.system=body.system;this.pos=new Phaser.Point(x,y);this.oldpos=new Phaser.Point(x,y);this.radius=radius;this.xw=radius;this.yw=radius;this.width=radius*2;this.height=radius*2;this.oH=0;this.oV=0;this.velocity=new Phaser.Point();this.circleTileProjections={};this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_FULL]=this.projCircle_Full;this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_45DEG]=this.projCircle_45Deg;this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_CONCAVE]=this.projCircle_Concave;this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_CONVEX]=this.projCircle_Convex;this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_22DEGs]=this.projCircle_22DegS;this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_22DEGb]=this.projCircle_22DegB;this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_67DEGs]=this.projCircle_67DegS;this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_67DEGb]=this.projCircle_67DegB;this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_HALF]=this.projCircle_Half;};Phaser.Physics.Ninja.Circle.prototype.constructor=Phaser.Physics.Ninja.Circle;Phaser.Physics.Ninja.Circle.COL_NONE=0;Phaser.Physics.Ninja.Circle.COL_AXIS=1;Phaser.Physics.Ninja.Circle.COL_OTHER=2;Phaser.Physics.Ninja.Circle.prototype={integrate:function(){var px=this.pos.x;var py=this.pos.y;this.pos.x+=(this.body.drag*this.pos.x)-(this.body.drag*this.oldpos.x);this.pos.y+=(this.body.drag*this.pos.y)-(this.body.drag*this.oldpos.y)+(this.system.gravity*this.body.gravityScale);this.velocity.set(this.pos.x-px,this.pos.y-py);this.oldpos.set(px,py);},reportCollisionVsWorld:function(px,py,dx,dy){var p=this.pos;var o=this.oldpos;var vx=p.x-o.x;var vy=p.y-o.y;var dp=(vx*dx+vy*dy);var nx=dp*dx;var ny=dp*dy;var tx=vx-nx;var ty=vy-ny;var b,bx,by,fx,fy;if(dp<0)
{fx=tx*this.body.friction;fy=ty*this.body.friction;b=1+this.body.bounce;bx=(nx*b);by=(ny*b);if(dx===1)
{this.body.touching.left=true;}
else if(dx===-1)
{this.body.touching.right=true;}
if(dy===1)
{this.body.touching.up=true;}
else if(dy===-1)
{this.body.touching.down=true;}}
else
{bx=by=fx=fy=0;}
p.x+=px;p.y+=py;o.x+=px+bx+fx;o.y+=py+by+fy;},collideWorldBounds:function(){var dx=this.system.bounds.x-(this.pos.x-this.radius);if(0<dx)
{this.reportCollisionVsWorld(dx,0,1,0,null);}
else
{dx=(this.pos.x+this.radius)-this.system.bounds.right;if(0<dx)
{this.reportCollisionVsWorld(-dx,0,-1,0,null);}}
var dy=this.system.bounds.y-(this.pos.y-this.radius);if(0<dy)
{this.reportCollisionVsWorld(0,dy,0,1,null);}
else
{dy=(this.pos.y+this.radius)-this.system.bounds.bottom;if(0<dy)
{this.reportCollisionVsWorld(0,-dy,0,-1,null);}}},collideCircleVsTile:function(tile){var pos=this.pos;var r=this.radius;var c=tile;var tx=c.pos.x;var ty=c.pos.y;var txw=c.xw;var tyw=c.yw;var dx=pos.x-tx;var px=(txw+r)-Math.abs(dx);if(0<px)
{var dy=pos.y-ty;var py=(tyw+r)-Math.abs(dy);if(0<py)
{this.oH=0;this.oV=0;if(dx<-txw)
{this.oH=-1;}
else if(txw<dx)
{this.oH=1;}
if(dy<-tyw)
{this.oV=-1;}
else if(tyw<dy)
{this.oV=1;}
return this.resolveCircleTile(px,py,this.oH,this.oV,this,c);}}},resolveCircleTile:function(x,y,oH,oV,obj,t){if(0<t.id)
{return this.circleTileProjections[t.type](x,y,oH,oV,obj,t);}
else
{return false;}},projCircle_Full:function(x,y,oH,oV,obj,t){if(oH===0)
{if(oV===0)
{if(x<y)
{var dx=obj.pos.x-t.pos.x;if(dx<0)
{obj.reportCollisionVsWorld(-x,0,-1,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{obj.reportCollisionVsWorld(x,0,1,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}}
else
{var dy=obj.pos.y-t.pos.y;if(dy<0)
{obj.reportCollisionVsWorld(0,-y,0,-1,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{obj.reportCollisionVsWorld(0,y,0,1,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}}}
else
{obj.reportCollisionVsWorld(0,y*oV,0,oV,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}}
else if(oV===0)
{obj.reportCollisionVsWorld(x*oH,0,oH,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var vx=t.pos.x+(oH*t.xw);var vy=t.pos.y+(oV*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
return Phaser.Physics.Ninja.Circle.COL_NONE;},projCircle_45Deg:function(x,y,oH,oV,obj,t){var signx=t.signx;var signy=t.signy;var lenP;if(oH===0)
{if(oV===0)
{var sx=t.sx;var sy=t.sy;var ox=(obj.pos.x-(sx*obj.radius))-t.pos.x;var oy=(obj.pos.y-(sy*obj.radius))-t.pos.y;var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;if(x<y)
{lenP=x;y=0;if((obj.pos.x-t.pos.x)<0)
{x*=-1;}}
else
{lenP=y;x=0;if((obj.pos.y-t.pos.y)<0)
{y*=-1;}}
var lenN=Math.sqrt(sx*sx+sy*sy);if(lenP<lenN)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
else
{if((signy*oV)<0)
{obj.reportCollisionVsWorld(0,y*oV,0,oV,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var sx=t.sx;var sy=t.sy;var ox=obj.pos.x-(t.pos.x-(signx*t.xw));var oy=obj.pos.y-(t.pos.y+(oV*t.yw));var perp=(ox*-sy)+(oy*sx);if(0<(perp*signx*signy))
{var len=Math.sqrt(ox*ox+oy*oy);var pen=obj.radius-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{var dp=(ox*sx)+(oy*sy);var pen=obj.radius-Math.abs(dp);if(0<pen)
{obj.reportCollisionVsWorld(sx*pen,sy*pen,sx,sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}}
else if(oV===0)
{if((signx*oH)<0)
{obj.reportCollisionVsWorld(x*oH,0,oH,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var sx=t.sx;var sy=t.sy;var ox=obj.pos.x-(t.pos.x+(oH*t.xw));var oy=obj.pos.y-(t.pos.y-(signy*t.yw));var perp=(ox*-sy)+(oy*sx);if((perp*signx*signy)<0)
{var len=Math.sqrt(ox*ox+oy*oy);var pen=obj.radius-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{var dp=(ox*sx)+(oy*sy);var pen=obj.radius-Math.abs(dp);if(0<pen)
{obj.reportCollisionVsWorld(sx*pen,sy*pen,sx,sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}
else
{if(0<((signx*oH)+(signy*oV)))
{return Phaser.Physics.Ninja.Circle.COL_NONE;}
else
{var vx=t.pos.x+(oH*t.xw);var vy=t.pos.y+(oV*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
return Phaser.Physics.Ninja.Circle.COL_NONE;},projCircle_Concave:function(x,y,oH,oV,obj,t){var signx=t.signx;var signy=t.signy;var lenP;if(oH===0)
{if(oV===0)
{var ox=(t.pos.x+(signx*t.xw))-obj.pos.x;var oy=(t.pos.y+(signy*t.yw))-obj.pos.y;var twid=t.xw*2;var trad=Math.sqrt(twid*twid+0);var len=Math.sqrt(ox*ox+oy*oy);var pen=(len+obj.radius)-trad;if(0<pen)
{if(x<y)
{lenP=x;y=0;if((obj.pos.x-t.pos.x)<0)
{x*=-1;}}
else
{lenP=y;x=0;if((obj.pos.y-t.pos.y)<0)
{y*=-1;}}
if(lenP<pen)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{return Phaser.Physics.Ninja.Circle.COL_NONE;}}
else
{if((signy*oV)<0)
{obj.reportCollisionVsWorld(0,y*oV,0,oV,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var vx=t.pos.x-(signx*t.xw);var vy=t.pos.y+(oV*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=0;dy=oV;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}
else if(oV===0)
{if((signx*oH)<0)
{obj.reportCollisionVsWorld(x*oH,0,oH,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var vx=t.pos.x+(oH*t.xw);var vy=t.pos.y-(signy*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH;dy=0;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
else
{if(0<((signx*oH)+(signy*oV)))
{return Phaser.Physics.Ninja.Circle.COL_NONE;}
else
{var vx=t.pos.x+(oH*t.xw);var vy=t.pos.y+(oV*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
return Phaser.Physics.Ninja.Circle.COL_NONE;},projCircle_Convex:function(x,y,oH,oV,obj,t){var signx=t.signx;var signy=t.signy;var lenP;if(oH===0)
{if(oV===0)
{var ox=obj.pos.x-(t.pos.x-(signx*t.xw));var oy=obj.pos.y-(t.pos.y-(signy*t.yw));var twid=t.xw*2;var trad=Math.sqrt(twid*twid+0);var len=Math.sqrt(ox*ox+oy*oy);var pen=(trad+obj.radius)-len;if(0<pen)
{if(x<y)
{lenP=x;y=0;if((obj.pos.x-t.pos.x)<0)
{x*=-1;}}
else
{lenP=y;x=0;if((obj.pos.y-t.pos.y)<0)
{y*=-1;}}
if(lenP<pen)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
else
{if((signy*oV)<0)
{obj.reportCollisionVsWorld(0,y*oV,0,oV,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var ox=obj.pos.x-(t.pos.x-(signx*t.xw));var oy=obj.pos.y-(t.pos.y-(signy*t.yw));var twid=t.xw*2;var trad=Math.sqrt(twid*twid+0);var len=Math.sqrt(ox*ox+oy*oy);var pen=(trad+obj.radius)-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}
else if(oV===0)
{if((signx*oH)<0)
{obj.reportCollisionVsWorld(x*oH,0,oH,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var ox=obj.pos.x-(t.pos.x-(signx*t.xw));var oy=obj.pos.y-(t.pos.y-(signy*t.yw));var twid=t.xw*2;var trad=Math.sqrt(twid*twid+0);var len=Math.sqrt(ox*ox+oy*oy);var pen=(trad+obj.radius)-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
else
{if(0<((signx*oH)+(signy*oV)))
{var ox=obj.pos.x-(t.pos.x-(signx*t.xw));var oy=obj.pos.y-(t.pos.y-(signy*t.yw));var twid=t.xw*2;var trad=Math.sqrt(twid*twid+0);var len=Math.sqrt(ox*ox+oy*oy);var pen=(trad+obj.radius)-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{var vx=t.pos.x+(oH*t.xw);var vy=t.pos.y+(oV*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
return Phaser.Physics.Ninja.Circle.COL_NONE;},projCircle_Half:function(x,y,oH,oV,obj,t){var signx=t.signx;var signy=t.signy;var celldp=(oH*signx+oV*signy);if(0<celldp)
{return Phaser.Physics.Ninja.Circle.COL_NONE;}
else if(oH===0)
{if(oV===0)
{var r=obj.radius;var ox=(obj.pos.x-(signx*r))-t.pos.x;var oy=(obj.pos.y-(signy*r))-t.pos.y;var sx=signx;var sy=signy;var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;var lenN=Math.sqrt(sx*sx+sy*sy);var lenP=Math.sqrt(x*x+y*y);if(lenP<lenN)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{obj.reportCollisionVsWorld(sx,sy,t.signx,t.signy);return Phaser.Physics.Ninja.Circle.COL_OTHER;}
return true;}}
else
{if(celldp===0)
{var dx=obj.pos.x-t.pos.x;if((dx*signx)<0)
{obj.reportCollisionVsWorld(0,y*oV,0,oV,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var dy=obj.pos.y-(t.pos.y+oV*t.yw);var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=signx/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
else
{obj.reportCollisionVsWorld(0,y*oV,0,oV,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}}}
else if(oV===0)
{if(celldp===0)
{var dy=obj.pos.y-t.pos.y;if((dy*signy)<0)
{obj.reportCollisionVsWorld(x*oH,0,oH,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var dx=obj.pos.x-(t.pos.x+oH*t.xw);var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=signx/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
else
{obj.reportCollisionVsWorld(x*oH,0,oH,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}}
else
{var vx=t.pos.x+(oH*t.xw);var vy=t.pos.y+(oV*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
return Phaser.Physics.Ninja.Circle.COL_NONE;},projCircle_22DegS:function(x,y,oH,oV,obj,t){var lenP;var signx=t.signx;var signy=t.signy;if(0<(signy*oV))
{return Phaser.Physics.Ninja.Circle.COL_NONE;}
else if(oH===0)
{if(oV===0)
{var sx=t.sx;var sy=t.sy;var r=obj.radius;var ox=obj.pos.x-(t.pos.x-(signx*t.xw));var oy=obj.pos.y-t.pos.y;var perp=(ox*-sy)+(oy*sx);if(0<(perp*signx*signy))
{var len=Math.sqrt(ox*ox+oy*oy);var pen=r-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{ox-=r*sx;oy-=r*sy;var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;var lenN=Math.sqrt(sx*sx+sy*sy);if(x<y)
{lenP=x;y=0;if((obj.pos.x-t.pos.x)<0)
{x*=-1;}}
else
{lenP=y;x=0;if((obj.pos.y-t.pos.y)<0)
{y*=-1;}}
if(lenP<lenN)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}
else
{obj.reportCollisionVsWorld(0,y*oV,0,oV,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}}
else if(oV===0)
{if((signx*oH)<0)
{var vx=t.pos.x-(signx*t.xw);var vy=t.pos.y;var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;if((dy*signy)<0)
{obj.reportCollisionVsWorld(x*oH,0,oH,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
else
{var sx=t.sx;var sy=t.sy;var ox=obj.pos.x-(t.pos.x+(oH*t.xw));var oy=obj.pos.y-(t.pos.y-(signy*t.yw));var perp=(ox*-sy)+(oy*sx);if((perp*signx*signy)<0)
{var len=Math.sqrt(ox*ox+oy*oy);var pen=obj.radius-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{var dp=(ox*sx)+(oy*sy);var pen=obj.radius-Math.abs(dp);if(0<pen)
{obj.reportCollisionVsWorld(sx*pen,sy*pen,sx,sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}
else
{var vx=t.pos.x+(oH*t.xw);var vy=t.pos.y+(oV*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
return Phaser.Physics.Ninja.Circle.COL_NONE;},projCircle_22DegB:function(x,y,oH,oV,obj,t){var lenP;var signx=t.signx;var signy=t.signy;if(oH===0)
{if(oV===0)
{var sx=t.sx;var sy=t.sy;var r=obj.radius;var ox=(obj.pos.x-(sx*r))-(t.pos.x-(signx*t.xw));var oy=(obj.pos.y-(sy*r))-(t.pos.y+(signy*t.yw));var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;var lenN=Math.sqrt(sx*sx+sy*sy);if(x<y)
{lenP=x;y=0;if((obj.pos.x-t.pos.x)<0)
{x*=-1;}}
else
{lenP=y;x=0;if((obj.pos.y-t.pos.y)<0)
{y*=-1;}}
if(lenP<lenN)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
else
{if((signy*oV)<0)
{obj.reportCollisionVsWorld(0,y*oV,0,oV,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var sx=t.sx;var sy=t.sy;var ox=obj.pos.x-(t.pos.x-(signx*t.xw));var oy=obj.pos.y-(t.pos.y+(signy*t.yw));var perp=(ox*-sy)+(oy*sx);if(0<(perp*signx*signy))
{var len=Math.sqrt(ox*ox+oy*oy);var pen=obj.radius-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{var dp=(ox*sx)+(oy*sy);var pen=obj.radius-Math.abs(dp);if(0<pen)
{obj.reportCollisionVsWorld(sx*pen,sy*pen,sx,sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}}
else if(oV===0)
{if((signx*oH)<0)
{obj.reportCollisionVsWorld(x*oH,0,oH,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var ox=obj.pos.x-(t.pos.x+(signx*t.xw));var oy=obj.pos.y-t.pos.y;if((oy*signy)<0)
{obj.reportCollisionVsWorld(x*oH,0,oH,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var sx=t.sx;var sy=t.sy;var perp=(ox*-sy)+(oy*sx);if((perp*signx*signy)<0)
{var len=Math.sqrt(ox*ox+oy*oy);var pen=obj.radius-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{var dp=(ox*sx)+(oy*sy);var pen=obj.radius-Math.abs(dp);if(0<pen)
{obj.reportCollisionVsWorld(sx*pen,sy*pen,t.sx,t.sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}}
else
{if(0<((signx*oH)+(signy*oV)))
{var slen=Math.sqrt(2*2+1*1);var sx=(signx*1)/slen;var sy=(signy*2)/slen;var r=obj.radius;var ox=(obj.pos.x-(sx*r))-(t.pos.x-(signx*t.xw));var oy=(obj.pos.y-(sy*r))-(t.pos.y+(signy*t.yw));var dp=(ox*sx)+(oy*sy);if(dp<0)
{obj.reportCollisionVsWorld(-sx*dp,-sy*dp,t.sx,t.sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}
return Phaser.Physics.Ninja.Circle.COL_NONE;}
else
{var vx=t.pos.x+(oH*t.xw);var vy=t.pos.y+(oV*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
return Phaser.Physics.Ninja.Circle.COL_NONE;},projCircle_67DegS:function(x,y,oH,oV,obj,t){var signx=t.signx;var signy=t.signy;if(0<(signx*oH))
{return Phaser.Physics.Ninja.Circle.COL_NONE;}
else if(oH===0)
{if(oV===0)
{var lenP;var sx=t.sx;var sy=t.sy;var r=obj.radius;var ox=obj.pos.x-t.pos.x;var oy=obj.pos.y-(t.pos.y-(signy*t.yw));var perp=(ox*-sy)+(oy*sx);if((perp*signx*signy)<0)
{var len=Math.sqrt(ox*ox+oy*oy);var pen=r-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{ox-=r*sx;oy-=r*sy;var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;var lenN=Math.sqrt(sx*sx+sy*sy);if(x<y)
{lenP=x;y=0;if((obj.pos.x-t.pos.x)<0)
{x*=-1;}}
else
{lenP=y;x=0;if((obj.pos.y-t.pos.y)<0)
{y*=-1;}}
if(lenP<lenN)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}
else
{if((signy*oV)<0)
{var vx=t.pos.x;var vy=t.pos.y-(signy*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;if((dx*signx)<0)
{obj.reportCollisionVsWorld(0,y*oV,0,oV,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
else
{var sx=t.sx;var sy=t.sy;var ox=obj.pos.x-(t.pos.x-(signx*t.xw));var oy=obj.pos.y-(t.pos.y+(oV*t.yw));var perp=(ox*-sy)+(oy*sx);if(0<(perp*signx*signy))
{var len=Math.sqrt(ox*ox+oy*oy);var pen=obj.radius-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{var dp=(ox*sx)+(oy*sy);var pen=obj.radius-Math.abs(dp);if(0<pen)
{obj.reportCollisionVsWorld(sx*pen,sy*pen,t.sx,t.sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}}
else if(oV===0)
{obj.reportCollisionVsWorld(x*oH,0,oH,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var vx=t.pos.x+(oH*t.xw);var vy=t.pos.y+(oV*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
return Phaser.Physics.Ninja.Circle.COL_NONE;},projCircle_67DegB:function(x,y,oH,oV,obj,t){var signx=t.signx;var signy=t.signy;if(oH===0)
{if(oV===0)
{var lenP;var sx=t.sx;var sy=t.sy;var r=obj.radius;var ox=(obj.pos.x-(sx*r))-(t.pos.x+(signx*t.xw));var oy=(obj.pos.y-(sy*r))-(t.pos.y-(signy*t.yw));var dp=(ox*sx)+(oy*sy);if(dp<0)
{sx*=-dp;sy*=-dp;var lenN=Math.sqrt(sx*sx+sy*sy);if(x<y)
{lenP=x;y=0;if((obj.pos.x-t.pos.x)<0)
{x*=-1;}}
else
{lenP=y;x=0;if((obj.pos.y-t.pos.y)<0)
{y*=-1;}}
if(lenP<lenN)
{obj.reportCollisionVsWorld(x,y,x/lenP,y/lenP,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
else
{if((signy*oV)<0)
{obj.reportCollisionVsWorld(0,y*oV,0,oV,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var ox=obj.pos.x-t.pos.x;var oy=obj.pos.y-(t.pos.y+(signy*t.yw));if((ox*signx)<0)
{obj.reportCollisionVsWorld(0,y*oV,0,oV,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var sx=t.sx;var sy=t.sy;var perp=(ox*-sy)+(oy*sx);if(0<(perp*signx*signy))
{var len=Math.sqrt(ox*ox+oy*oy);var pen=obj.radius-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{var dp=(ox*sx)+(oy*sy);var pen=obj.radius-Math.abs(dp);if(0<pen)
{obj.reportCollisionVsWorld(sx*pen,sy*pen,sx,sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}}}
else if(oV===0)
{if((signx*oH)<0)
{obj.reportCollisionVsWorld(x*oH,0,oH,0,t);return Phaser.Physics.Ninja.Circle.COL_AXIS;}
else
{var slen=Math.sqrt(2*2+1*1);var sx=(signx*2)/slen;var sy=(signy*1)/slen;var ox=obj.pos.x-(t.pos.x+(signx*t.xw));var oy=obj.pos.y-(t.pos.y-(signy*t.yw));var perp=(ox*-sy)+(oy*sx);if((perp*signx*signy)<0)
{var len=Math.sqrt(ox*ox+oy*oy);var pen=obj.radius-len;if(0<pen)
{ox/=len;oy/=len;obj.reportCollisionVsWorld(ox*pen,oy*pen,ox,oy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}
else
{var dp=(ox*sx)+(oy*sy);var pen=obj.radius-Math.abs(dp);if(0<pen)
{obj.reportCollisionVsWorld(sx*pen,sy*pen,t.sx,t.sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}}
else
{if(0<((signx*oH)+(signy*oV)))
{var sx=t.sx;var sy=t.sy;var r=obj.radius;var ox=(obj.pos.x-(sx*r))-(t.pos.x+(signx*t.xw));var oy=(obj.pos.y-(sy*r))-(t.pos.y-(signy*t.yw));var dp=(ox*sx)+(oy*sy);if(dp<0)
{obj.reportCollisionVsWorld(-sx*dp,-sy*dp,t.sx,t.sy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}
return Phaser.Physics.Ninja.Circle.COL_NONE;}
else
{var vx=t.pos.x+(oH*t.xw);var vy=t.pos.y+(oV*t.yw);var dx=obj.pos.x-vx;var dy=obj.pos.y-vy;var len=Math.sqrt(dx*dx+dy*dy);var pen=obj.radius-len;if(0<pen)
{if(len===0)
{dx=oH/Math.SQRT2;dy=oV/Math.SQRT2;}
else
{dx/=len;dy/=len;}
obj.reportCollisionVsWorld(dx*pen,dy*pen,dx,dy,t);return Phaser.Physics.Ninja.Circle.COL_OTHER;}}}
return Phaser.Physics.Ninja.Circle.COL_NONE;},destroy:function(){this.body=null;this.system=null;}};!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define('p2',(function(){return this.p2=e();})()):"undefined"!=typeof window?window.p2=e():"undefined"!=typeof global?self.p2=e():"undefined"!=typeof self&&(self.p2=e())}(function(){var define,module,exports;return(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){if(!GLMAT_EPSILON){var GLMAT_EPSILON=0.000001;}
if(!GLMAT_ARRAY_TYPE){var GLMAT_ARRAY_TYPE=(typeof Float32Array!=='undefined')?Float32Array:Array;}
var glMatrix={};glMatrix.setMatrixArrayType=function(type){GLMAT_ARRAY_TYPE=type;}
if(typeof(exports)!=='undefined'){exports.glMatrix=glMatrix;}
var vec2={};vec2.create=function(){var out=new GLMAT_ARRAY_TYPE(2);out[0]=0;out[1]=0;return out;};vec2.clone=function(a){var out=new GLMAT_ARRAY_TYPE(2);out[0]=a[0];out[1]=a[1];return out;};vec2.fromValues=function(x,y){var out=new GLMAT_ARRAY_TYPE(2);out[0]=x;out[1]=y;return out;};vec2.copy=function(out,a){out[0]=a[0];out[1]=a[1];return out;};vec2.set=function(out,x,y){out[0]=x;out[1]=y;return out;};vec2.add=function(out,a,b){out[0]=a[0]+b[0];out[1]=a[1]+b[1];return out;};vec2.subtract=function(out,a,b){out[0]=a[0]-b[0];out[1]=a[1]-b[1];return out;};vec2.sub=vec2.subtract;vec2.multiply=function(out,a,b){out[0]=a[0]*b[0];out[1]=a[1]*b[1];return out;};vec2.mul=vec2.multiply;vec2.divide=function(out,a,b){out[0]=a[0]/b[0];out[1]=a[1]/b[1];return out;};vec2.div=vec2.divide;vec2.min=function(out,a,b){out[0]=Math.min(a[0],b[0]);out[1]=Math.min(a[1],b[1]);return out;};vec2.max=function(out,a,b){out[0]=Math.max(a[0],b[0]);out[1]=Math.max(a[1],b[1]);return out;};vec2.scale=function(out,a,b){out[0]=a[0]*b;out[1]=a[1]*b;return out;};vec2.distance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1];return Math.sqrt(x*x+y*y);};vec2.dist=vec2.distance;vec2.squaredDistance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1];return x*x+y*y;};vec2.sqrDist=vec2.squaredDistance;vec2.length=function(a){var x=a[0],y=a[1];return Math.sqrt(x*x+y*y);};vec2.len=vec2.length;vec2.squaredLength=function(a){var x=a[0],y=a[1];return x*x+y*y;};vec2.sqrLen=vec2.squaredLength;vec2.negate=function(out,a){out[0]=-a[0];out[1]=-a[1];return out;};vec2.normalize=function(out,a){var x=a[0],y=a[1];var len=x*x+y*y;if(len>0){len=1/Math.sqrt(len);out[0]=a[0]*len;out[1]=a[1]*len;}
return out;};vec2.dot=function(a,b){return a[0]*b[0]+a[1]*b[1];};vec2.cross=function(out,a,b){var z=a[0]*b[1]-a[1]*b[0];out[0]=out[1]=0;out[2]=z;return out;};vec2.lerp=function(out,a,b,t){var ax=a[0],ay=a[1];out[0]=ax+t*(b[0]-ax);out[1]=ay+t*(b[1]-ay);return out;};vec2.transformMat2=function(out,a,m){var x=a[0],y=a[1];out[0]=m[0]*x+m[2]*y;out[1]=m[1]*x+m[3]*y;return out;};vec2.transformMat2d=function(out,a,m){var x=a[0],y=a[1];out[0]=m[0]*x+m[2]*y+m[4];out[1]=m[1]*x+m[3]*y+m[5];return out;};vec2.transformMat3=function(out,a,m){var x=a[0],y=a[1];out[0]=m[0]*x+m[3]*y+m[6];out[1]=m[1]*x+m[4]*y+m[7];return out;};vec2.transformMat4=function(out,a,m){var x=a[0],y=a[1];out[0]=m[0]*x+m[4]*y+m[12];out[1]=m[1]*x+m[5]*y+m[13];return out;};vec2.forEach=(function(){var vec=vec2.create();return function(a,stride,offset,count,fn,arg){var i,l;if(!stride){stride=2;}
if(!offset){offset=0;}
if(count){l=Math.min((count*stride)+offset,a.length);}else{l=a.length;}
for(i=offset;i<l;i+=stride){vec[0]=a[i];vec[1]=a[i+1];fn(vec,vec,arg);a[i]=vec[0];a[i+1]=vec[1];}
return a;};})();vec2.str=function(a){return'vec2('+a[0]+', '+a[1]+')';};if(typeof(exports)!=='undefined'){exports.vec2=vec2;}},{}],2:[function(require,module,exports){var Scalar=require('./Scalar');module.exports=Line;function Line(){};Line.lineInt=function(l1,l2,precision){precision=precision||0;var i=[0,0];var a1,b1,c1,a2,b2,c2,det;a1=l1[1][1]-l1[0][1];b1=l1[0][0]-l1[1][0];c1=a1*l1[0][0]+b1*l1[0][1];a2=l2[1][1]-l2[0][1];b2=l2[0][0]-l2[1][0];c2=a2*l2[0][0]+b2*l2[0][1];det=a1*b2-a2*b1;if(!Scalar.eq(det,0,precision)){i[0]=(b2*c1-b1*c2)/det;i[1]=(a1*c2-a2*c1)/det;}
return i;};Line.segmentsIntersect=function(p1,p2,q1,q2){var dx=p2[0]-p1[0];var dy=p2[1]-p1[1];var da=q2[0]-q1[0];var db=q2[1]-q1[1];if(da*dy-db*dx==0)
return false;var s=(dx*(q1[1]-p1[1])+dy*(p1[0]-q1[0]))/(da*dy-db*dx)
var t=(da*(p1[1]-q1[1])+db*(q1[0]-p1[0]))/(db*dx-da*dy)
return(s>=0&&s<=1&&t>=0&&t<=1);};},{"./Scalar":5}],3:[function(require,module,exports){module.exports=Point;function Point(){};Point.area=function(a,b,c){return(((b[0]-a[0])*(c[1]-a[1]))-((c[0]-a[0])*(b[1]-a[1])));};Point.left=function(a,b,c){return Point.area(a,b,c)>0;};Point.leftOn=function(a,b,c){return Point.area(a,b,c)>=0;};Point.right=function(a,b,c){return Point.area(a,b,c)<0;};Point.rightOn=function(a,b,c){return Point.area(a,b,c)<=0;};var tmpPoint1=[],tmpPoint2=[];Point.collinear=function(a,b,c,thresholdAngle){if(!thresholdAngle)
return Point.area(a,b,c)==0;else{var ab=tmpPoint1,bc=tmpPoint2;ab[0]=b[0]-a[0];ab[1]=b[1]-a[1];bc[0]=c[0]-b[0];bc[1]=c[1]-b[1];var dot=ab[0]*bc[0]+ab[1]*bc[1],magA=Math.sqrt(ab[0]*ab[0]+ab[1]*ab[1]),magB=Math.sqrt(bc[0]*bc[0]+bc[1]*bc[1]),angle=Math.acos(dot/(magA*magB));return angle<thresholdAngle;}};Point.sqdist=function(a,b){var dx=b[0]-a[0];var dy=b[1]-a[1];return dx*dx+dy*dy;};},{}],4:[function(require,module,exports){var Line=require("./Line"),Point=require("./Point"),Scalar=require("./Scalar")
module.exports=Polygon;function Polygon(){this.vertices=[];}
Polygon.prototype.at=function(i){var v=this.vertices,s=v.length;return v[i<0?i%s+s:i%s];};Polygon.prototype.first=function(){return this.vertices[0];};Polygon.prototype.last=function(){return this.vertices[this.vertices.length-1];};Polygon.prototype.clear=function(){this.vertices.length=0;};Polygon.prototype.append=function(poly,from,to){if(typeof(from)=="undefined")throw new Error("From is not given!");if(typeof(to)=="undefined")throw new Error("To is not given!");if(to-1<from)throw new Error("lol1");if(to>poly.vertices.length)throw new Error("lol2");if(from<0)throw new Error("lol3");for(var i=from;i<to;i++){this.vertices.push(poly.vertices[i]);}};Polygon.prototype.makeCCW=function(){var br=0,v=this.vertices;for(var i=1;i<this.vertices.length;++i){if(v[i][1]<v[br][1]||(v[i][1]==v[br][1]&&v[i][0]>v[br][0])){br=i;}}
if(!Point.left(this.at(br-1),this.at(br),this.at(br+1))){this.reverse();}};Polygon.prototype.reverse=function(){var tmp=[];for(var i=0,N=this.vertices.length;i!==N;i++){tmp.push(this.vertices.pop());}
this.vertices=tmp;};Polygon.prototype.isReflex=function(i){return Point.right(this.at(i-1),this.at(i),this.at(i+1));};var tmpLine1=[],tmpLine2=[];Polygon.prototype.canSee=function(a,b){var p,dist,l1=tmpLine1,l2=tmpLine2;if(Point.leftOn(this.at(a+1),this.at(a),this.at(b))&&Point.rightOn(this.at(a-1),this.at(a),this.at(b))){return false;}
dist=Point.sqdist(this.at(a),this.at(b));for(var i=0;i!==this.vertices.length;++i){if((i+1)%this.vertices.length===a||i===a)
continue;if(Point.leftOn(this.at(a),this.at(b),this.at(i+1))&&Point.rightOn(this.at(a),this.at(b),this.at(i))){l1[0]=this.at(a);l1[1]=this.at(b);l2[0]=this.at(i);l2[1]=this.at(i+1);p=Line.lineInt(l1,l2);if(Point.sqdist(this.at(a),p)<dist){return false;}}}
return true;};Polygon.prototype.copy=function(i,j,targetPoly){var p=targetPoly||new Polygon();p.clear();if(i<j){for(var k=i;k<=j;k++)
p.vertices.push(this.vertices[k]);}else{for(var k=0;k<=j;k++)
p.vertices.push(this.vertices[k]);for(var k=i;k<this.vertices.length;k++)
p.vertices.push(this.vertices[k]);}
return p;};Polygon.prototype.getCutEdges=function(){var min=[],tmp1=[],tmp2=[],tmpPoly=new Polygon();var nDiags=Number.MAX_VALUE;for(var i=0;i<this.vertices.length;++i){if(this.isReflex(i)){for(var j=0;j<this.vertices.length;++j){if(this.canSee(i,j)){tmp1=this.copy(i,j,tmpPoly).getCutEdges();tmp2=this.copy(j,i,tmpPoly).getCutEdges();for(var k=0;k<tmp2.length;k++)
tmp1.push(tmp2[k]);if(tmp1.length<nDiags){min=tmp1;nDiags=tmp1.length;min.push([this.at(i),this.at(j)]);}}}}}
return min;};Polygon.prototype.decomp=function(){var edges=this.getCutEdges();if(edges.length>0)
return this.slice(edges);else
return[this];};Polygon.prototype.slice=function(cutEdges){if(cutEdges.length==0)return[this];if(cutEdges instanceof Array&&cutEdges.length&&cutEdges[0]instanceof Array&&cutEdges[0].length==2&&cutEdges[0][0]instanceof Array){var polys=[this];for(var i=0;i<cutEdges.length;i++){var cutEdge=cutEdges[i];for(var j=0;j<polys.length;j++){var poly=polys[j];var result=poly.slice(cutEdge);if(result){polys.splice(j,1);polys.push(result[0],result[1]);break;}}}
return polys;}else{var cutEdge=cutEdges;var i=this.vertices.indexOf(cutEdge[0]);var j=this.vertices.indexOf(cutEdge[1]);if(i!=-1&&j!=-1){return[this.copy(i,j),this.copy(j,i)];}else{return false;}}};Polygon.prototype.isSimple=function(){var path=this.vertices;for(var i=0;i<path.length-1;i++){for(var j=0;j<i-1;j++){if(Line.segmentsIntersect(path[i],path[i+1],path[j],path[j+1])){return false;}}}
for(var i=1;i<path.length-2;i++){if(Line.segmentsIntersect(path[0],path[path.length-1],path[i],path[i+1])){return false;}}
return true;};function getIntersectionPoint(p1,p2,q1,q2,delta){delta=delta||0;var a1=p2[1]-p1[1];var b1=p1[0]-p2[0];var c1=(a1*p1[0])+(b1*p1[1]);var a2=q2[1]-q1[1];var b2=q1[0]-q2[0];var c2=(a2*q1[0])+(b2*q1[1]);var det=(a1*b2)-(a2*b1);if(!Scalar.eq(det,0,delta))
return[((b2*c1)-(b1*c2))/det,((a1*c2)-(a2*c1))/det]
else
return[0,0]}
Polygon.prototype.quickDecomp=function(result,reflexVertices,steinerPoints,delta,maxlevel,level){maxlevel=maxlevel||100;level=level||0;delta=delta||25;result=typeof(result)!="undefined"?result:[];reflexVertices=reflexVertices||[];steinerPoints=steinerPoints||[];var upperInt=[0,0],lowerInt=[0,0],p=[0,0];var upperDist=0,lowerDist=0,d=0,closestDist=0;var upperIndex=0,lowerIndex=0,closestIndex=0;var lowerPoly=new Polygon(),upperPoly=new Polygon();var poly=this,v=this.vertices;if(v.length<3)return result;level++;if(level>maxlevel){console.warn("quickDecomp: max level ("+maxlevel+") reached.");return result;}
for(var i=0;i<this.vertices.length;++i){if(poly.isReflex(i)){reflexVertices.push(poly.vertices[i]);upperDist=lowerDist=Number.MAX_VALUE;for(var j=0;j<this.vertices.length;++j){if(Point.left(poly.at(i-1),poly.at(i),poly.at(j))&&Point.rightOn(poly.at(i-1),poly.at(i),poly.at(j-1))){p=getIntersectionPoint(poly.at(i-1),poly.at(i),poly.at(j),poly.at(j-1));if(Point.right(poly.at(i+1),poly.at(i),p)){d=Point.sqdist(poly.vertices[i],p);if(d<lowerDist){lowerDist=d;lowerInt=p;lowerIndex=j;}}}
if(Point.left(poly.at(i+1),poly.at(i),poly.at(j+1))&&Point.rightOn(poly.at(i+1),poly.at(i),poly.at(j))){p=getIntersectionPoint(poly.at(i+1),poly.at(i),poly.at(j),poly.at(j+1));if(Point.left(poly.at(i-1),poly.at(i),p)){d=Point.sqdist(poly.vertices[i],p);if(d<upperDist){upperDist=d;upperInt=p;upperIndex=j;}}}}
if(lowerIndex==(upperIndex+1)%this.vertices.length){p[0]=(lowerInt[0]+upperInt[0])/2;p[1]=(lowerInt[1]+upperInt[1])/2;steinerPoints.push(p);if(i<upperIndex){lowerPoly.append(poly,i,upperIndex+1);lowerPoly.vertices.push(p);upperPoly.vertices.push(p);if(lowerIndex!=0){upperPoly.append(poly,lowerIndex,poly.vertices.length);}
upperPoly.append(poly,0,i+1);}else{if(i!=0){lowerPoly.append(poly,i,poly.vertices.length);}
lowerPoly.append(poly,0,upperIndex+1);lowerPoly.vertices.push(p);upperPoly.vertices.push(p);upperPoly.append(poly,lowerIndex,i+1);}}else{if(lowerIndex>upperIndex){upperIndex+=this.vertices.length;}
closestDist=Number.MAX_VALUE;if(upperIndex<lowerIndex){return result;}
for(var j=lowerIndex;j<=upperIndex;++j){if(Point.leftOn(poly.at(i-1),poly.at(i),poly.at(j))&&Point.rightOn(poly.at(i+1),poly.at(i),poly.at(j))){d=Point.sqdist(poly.at(i),poly.at(j));if(d<closestDist){closestDist=d;closestIndex=j%this.vertices.length;}}}
if(i<closestIndex){lowerPoly.append(poly,i,closestIndex+1);if(closestIndex!=0){upperPoly.append(poly,closestIndex,v.length);}
upperPoly.append(poly,0,i+1);}else{if(i!=0){lowerPoly.append(poly,i,v.length);}
lowerPoly.append(poly,0,closestIndex+1);upperPoly.append(poly,closestIndex,i+1);}}
if(lowerPoly.vertices.length<upperPoly.vertices.length){lowerPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);upperPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);}else{upperPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);lowerPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);}
return result;}}
result.push(this);return result;};Polygon.prototype.removeCollinearPoints=function(precision){var num=0;for(var i=this.vertices.length-1;this.vertices.length>3&&i>=0;--i){if(Point.collinear(this.at(i-1),this.at(i),this.at(i+1),precision)){this.vertices.splice(i%this.vertices.length,1);i--;num++;}}
return num;};},{"./Line":2,"./Point":3,"./Scalar":5}],5:[function(require,module,exports){module.exports=Scalar;function Scalar(){}
Scalar.eq=function(a,b,precision){precision=precision||0;return Math.abs(a-b)<precision;};},{}],6:[function(require,module,exports){module.exports={Polygon:require("./Polygon"),Point:require("./Point"),};},{"./Point":3,"./Polygon":4}],7:[function(require,module,exports){module.exports={"name":"p2","version":"0.5.0","description":"A JavaScript 2D physics engine.","author":"Stefan Hedman <schteppe@gmail.com> (http://steffe.se)","keywords":["p2.js","p2","physics","engine","2d"],"main":"./src/p2.js","engines":{"node":"*"},"repository":{"type":"git","url":"https://github.com/schteppe/p2.js.git"},"bugs":{"url":"https://github.com/schteppe/p2.js/issues"},"licenses":[{"type":"MIT"}],"devDependencies":{"grunt":"~0.4.0","grunt-contrib-jshint":"~0.9.2","grunt-contrib-nodeunit":"~0.1.2","grunt-contrib-uglify":"~0.4.0","grunt-contrib-watch":"~0.5.0","grunt-browserify":"~2.0.1","z-schema":"~2.4.6"},"dependencies":{"poly-decomp":"0.1.0","gl-matrix":"2.1.0"}}},{}],8:[function(require,module,exports){var vec2=require('../math/vec2'),Utils=require('../utils/Utils');module.exports=AABB;function AABB(options){this.lowerBound=vec2.create();if(options&&options.lowerBound){vec2.copy(this.lowerBound,options.lowerBound);}
this.upperBound=vec2.create();if(options&&options.upperBound){vec2.copy(this.upperBound,options.upperBound);}}
var tmp=vec2.create();AABB.prototype.setFromPoints=function(points,position,angle){var l=this.lowerBound,u=this.upperBound;vec2.set(l,Number.MAX_VALUE,Number.MAX_VALUE);vec2.set(u,-Number.MAX_VALUE,-Number.MAX_VALUE);for(var i=0;i<points.length;i++){var p=points[i];if(typeof(angle)==="number"){vec2.rotate(tmp,p,angle);p=tmp;}
for(var j=0;j<2;j++){if(p[j]>u[j]){u[j]=p[j];}
if(p[j]<l[j]){l[j]=p[j];}}}
if(position){vec2.add(this.lowerBound,this.lowerBound,position);vec2.add(this.upperBound,this.upperBound,position);}};AABB.prototype.copy=function(aabb){vec2.copy(this.lowerBound,aabb.lowerBound);vec2.copy(this.upperBound,aabb.upperBound);};AABB.prototype.extend=function(aabb){for(var i=0;i<2;i++){if(aabb.lowerBound[i]<this.lowerBound[i]){this.lowerBound[i]=aabb.lowerBound[i];}
if(aabb.upperBound[i]>this.upperBound[i]){this.upperBound[i]=aabb.upperBound[i];}}};AABB.prototype.overlaps=function(aabb){var l1=this.lowerBound,u1=this.upperBound,l2=aabb.lowerBound,u2=aabb.upperBound;return((l2[0]<=u1[0]&&u1[0]<=u2[0])||(l1[0]<=u2[0]&&u2[0]<=u1[0]))&&((l2[1]<=u1[1]&&u1[1]<=u2[1])||(l1[1]<=u2[1]&&u2[1]<=u1[1]));};},{"../math/vec2":30,"../utils/Utils":47}],9:[function(require,module,exports){var vec2=require('../math/vec2')
var Body=require('../objects/Body')
module.exports=Broadphase;function Broadphase(type){this.type=type;this.result=[];this.world=null;this.boundingVolumeType=Broadphase.AABB;}
Broadphase.AABB=1;Broadphase.BOUNDING_CIRCLE=2;Broadphase.prototype.setWorld=function(world){this.world=world;};Broadphase.prototype.getCollisionPairs=function(world){throw new Error("getCollisionPairs must be implemented in a subclass!");};var dist=vec2.create();Broadphase.boundingRadiusCheck=function(bodyA,bodyB){vec2.sub(dist,bodyA.position,bodyB.position);var d2=vec2.squaredLength(dist),r=bodyA.boundingRadius+bodyB.boundingRadius;return d2<=r*r;};Broadphase.aabbCheck=function(bodyA,bodyB){if(bodyA.aabbNeedsUpdate){bodyA.updateAABB();}
if(bodyB.aabbNeedsUpdate){bodyB.updateAABB();}
return bodyA.aabb.overlaps(bodyB.aabb);};Broadphase.prototype.boundingVolumeCheck=function(bodyA,bodyB){var result;switch(this.boundingVolumeType){case Broadphase.BOUNDING_CIRCLE:result=Broadphase.boundingRadiusCheck(bodyA,bodyB);break;case Broadphase.AABB:result=Broadphase.aabbCheck(bodyA,bodyB);break;default:throw new Error('Bounding volume type not recognized: '+this.boundingVolumeType);}
return result;};Broadphase.canCollide=function(bodyA,bodyB){if(bodyA.motionState===Body.STATIC&&bodyB.motionState===Body.STATIC){return false;}
if((bodyA.motionState===Body.KINEMATIC&&bodyB.motionState===Body.STATIC)||(bodyA.motionState===Body.STATIC&&bodyB.motionState===Body.KINEMATIC)){return false;}
if(bodyA.motionState===Body.KINEMATIC&&bodyB.motionState===Body.KINEMATIC){return false;}
if(bodyA.sleepState===Body.SLEEPING&&bodyB.sleepState===Body.SLEEPING){return false;}
if((bodyA.sleepState===Body.SLEEPING&&bodyB.motionState===Body.STATIC)||(bodyB.sleepState===Body.SLEEPING&&bodyA.motionState===Body.STATIC)){return false;}
return true;};Broadphase.NAIVE=1;Broadphase.SAP=2;},{"../math/vec2":30,"../objects/Body":31}],10:[function(require,module,exports){var Circle=require('../shapes/Circle'),Plane=require('../shapes/Plane'),Particle=require('../shapes/Particle'),Broadphase=require('../collision/Broadphase'),vec2=require('../math/vec2'),Utils=require('../utils/Utils')
module.exports=GridBroadphase;function GridBroadphase(options){Broadphase.apply(this);options=Utils.defaults(options,{xmin:-100,xmax:100,ymin:-100,ymax:100,nx:10,ny:10});this.xmin=options.xmin;this.ymin=options.ymin;this.xmax=options.xmax;this.ymax=options.ymax;this.nx=options.nx;this.ny=options.ny;this.binsizeX=(this.xmax-this.xmin)/this.nx;this.binsizeY=(this.ymax-this.ymin)/this.ny;}
GridBroadphase.prototype=new Broadphase();GridBroadphase.prototype.getCollisionPairs=function(world){var result=[],bodies=world.bodies,Ncolliding=bodies.length,binsizeX=this.binsizeX,binsizeY=this.binsizeY,nx=this.nx,ny=this.ny,xmin=this.xmin,ymin=this.ymin,xmax=this.xmax,ymax=this.ymax;var bins=[],Nbins=nx*ny;for(var i=0;i<Nbins;i++){bins.push([]);}
var xmult=nx/(xmax-xmin);var ymult=ny/(ymax-ymin);for(var i=0;i!==Ncolliding;i++){var bi=bodies[i];var aabb=bi.aabb;var lowerX=Math.max(aabb.lowerBound[0],xmin);var lowerY=Math.max(aabb.lowerBound[1],ymin);var upperX=Math.min(aabb.upperBound[0],xmax);var upperY=Math.min(aabb.upperBound[1],ymax);var xi1=Math.floor(xmult*(lowerX-xmin));var yi1=Math.floor(ymult*(lowerY-ymin));var xi2=Math.floor(xmult*(upperX-xmin));var yi2=Math.floor(ymult*(upperY-ymin));for(var j=xi1;j<=xi2;j++){for(var k=yi1;k<=yi2;k++){var xi=j;var yi=k;var idx=xi*(ny-1)+yi;if(idx>=0&&idx<Nbins){bins[idx].push(bi);}}}}
for(var i=0;i!==Nbins;i++){var bin=bins[i];for(var j=0,NbodiesInBin=bin.length;j!==NbodiesInBin;j++){var bi=bin[j];for(var k=0;k!==j;k++){var bj=bin[k];if(Broadphase.canCollide(bi,bj)&&this.boundingVolumeCheck(bi,bj)){result.push(bi,bj);}}}}
return result;};},{"../collision/Broadphase":9,"../math/vec2":30,"../shapes/Circle":35,"../shapes/Particle":39,"../shapes/Plane":40,"../utils/Utils":47}],11:[function(require,module,exports){var Circle=require('../shapes/Circle'),Plane=require('../shapes/Plane'),Shape=require('../shapes/Shape'),Particle=require('../shapes/Particle'),Broadphase=require('../collision/Broadphase'),vec2=require('../math/vec2');module.exports=NaiveBroadphase;function NaiveBroadphase(){Broadphase.call(this,Broadphase.NAIVE);}
NaiveBroadphase.prototype=new Broadphase();NaiveBroadphase.prototype.getCollisionPairs=function(world){var bodies=world.bodies,result=this.result;result.length=0;for(var i=0,Ncolliding=bodies.length;i!==Ncolliding;i++){var bi=bodies[i];for(var j=0;j<i;j++){var bj=bodies[j];if(Broadphase.canCollide(bi,bj)&&this.boundingVolumeCheck(bi,bj)){result.push(bi,bj);}}}
return result;};},{"../collision/Broadphase":9,"../math/vec2":30,"../shapes/Circle":35,"../shapes/Particle":39,"../shapes/Plane":40,"../shapes/Shape":42}],12:[function(require,module,exports){var vec2=require('../math/vec2'),sub=vec2.sub,add=vec2.add,dot=vec2.dot,Utils=require('../utils/Utils'),TupleDictionary=require('../utils/TupleDictionary'),Equation=require('../equations/Equation'),ContactEquation=require('../equations/ContactEquation'),FrictionEquation=require('../equations/FrictionEquation'),Circle=require('../shapes/Circle'),Convex=require('../shapes/Convex'),Shape=require('../shapes/Shape'),Body=require('../objects/Body'),Rectangle=require('../shapes/Rectangle');module.exports=Narrowphase;var yAxis=vec2.fromValues(0,1);var tmp1=vec2.fromValues(0,0),tmp2=vec2.fromValues(0,0),tmp3=vec2.fromValues(0,0),tmp4=vec2.fromValues(0,0),tmp5=vec2.fromValues(0,0),tmp6=vec2.fromValues(0,0),tmp7=vec2.fromValues(0,0),tmp8=vec2.fromValues(0,0),tmp9=vec2.fromValues(0,0),tmp10=vec2.fromValues(0,0),tmp11=vec2.fromValues(0,0),tmp12=vec2.fromValues(0,0),tmp13=vec2.fromValues(0,0),tmp14=vec2.fromValues(0,0),tmp15=vec2.fromValues(0,0),tmp16=vec2.fromValues(0,0),tmp17=vec2.fromValues(0,0),tmp18=vec2.fromValues(0,0),tmpArray=[];function Narrowphase(){this.contactEquations=[];this.frictionEquations=[];this.enableFriction=true;this.slipForce=10.0;this.frictionCoefficient=0.3;this.surfaceVelocity=0;this.reuseObjects=true;this.reusableContactEquations=[];this.reusableFrictionEquations=[];this.restitution=0;this.stiffness=Equation.DEFAULT_STIFFNESS;this.relaxation=Equation.DEFAULT_RELAXATION;this.frictionStiffness=Equation.DEFAULT_STIFFNESS;this.frictionRelaxation=Equation.DEFAULT_RELAXATION;this.collidingBodiesLastStep=new TupleDictionary();}
Narrowphase.prototype.collidedLastStep=function(bi,bj){var id1=bi.id|0,id2=bj.id|0;return!!this.collidingBodiesLastStep.get(id1,id2);};function clearObject(obj){var l=obj.keys.length;while(l--){delete obj[obj.keys[l]];}
obj.keys.length=0;}
Narrowphase.prototype.reset=function(world){this.collidingBodiesLastStep.reset();for(var i=0;i!==this.contactEquations.length;i++){var eq=this.contactEquations[i],id1=eq.bodyA.id|0,id2=eq.bodyB.id|0;this.collidingBodiesLastStep.set(id1,id2,true);}
if(this.reuseObjects){var ce=this.contactEquations,fe=this.frictionEquations,rfe=this.reusableFrictionEquations,rce=this.reusableContactEquations;Utils.appendArray(rce,ce);Utils.appendArray(rfe,fe);}
this.contactEquations.length=this.frictionEquations.length=0;};Narrowphase.prototype.createContactEquation=function(bodyA,bodyB,shapeA,shapeB){var c=this.reusableContactEquations.length?this.reusableContactEquations.pop():new ContactEquation(bodyA,bodyB);c.bodyA=bodyA;c.bodyB=bodyB;c.shapeA=shapeA;c.shapeB=shapeB;c.restitution=this.restitution;c.firstImpact=!this.collidedLastStep(bodyA,bodyB);c.stiffness=this.stiffness;c.relaxation=this.relaxation;c.needsUpdate=true;c.enabled=true;return c;};Narrowphase.prototype.createFrictionEquation=function(bodyA,bodyB,shapeA,shapeB){var c=this.reusableFrictionEquations.length?this.reusableFrictionEquations.pop():new FrictionEquation(bodyA,bodyB);c.bodyA=bodyA;c.bodyB=bodyB;c.shapeA=shapeA;c.shapeB=shapeB;c.setSlipForce(this.slipForce);c.frictionCoefficient=this.frictionCoefficient;c.relativeVelocity=this.surfaceVelocity;c.enabled=true;c.needsUpdate=true;c.stiffness=this.frictionStiffness;c.relaxation=this.frictionRelaxation;return c;};Narrowphase.prototype.createFrictionFromContact=function(c){var eq=this.createFrictionEquation(c.bodyA,c.bodyB,c.shapeA,c.shapeB);vec2.copy(eq.contactPointA,c.contactPointA);vec2.copy(eq.contactPointB,c.contactPointB);vec2.rotate90cw(eq.t,c.normalA);eq.contactEquation=c;return eq;};Narrowphase.prototype[Shape.LINE|Shape.CONVEX]=Narrowphase.prototype.convexLine=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){if(justTest)
return false;else
return 0;};Narrowphase.prototype[Shape.LINE|Shape.RECTANGLE]=Narrowphase.prototype.lineRectangle=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){if(justTest)
return false;else
return 0;};function setConvexToCapsuleShapeMiddle(convexShape,capsuleShape){vec2.set(convexShape.vertices[0],-capsuleShape.length*0.5,-capsuleShape.radius);vec2.set(convexShape.vertices[1],capsuleShape.length*0.5,-capsuleShape.radius);vec2.set(convexShape.vertices[2],capsuleShape.length*0.5,capsuleShape.radius);vec2.set(convexShape.vertices[3],-capsuleShape.length*0.5,capsuleShape.radius);}
var convexCapsule_tempRect=new Rectangle(1,1),convexCapsule_tempVec=vec2.create();Narrowphase.prototype[Shape.CAPSULE|Shape.CONVEX]=Narrowphase.prototype[Shape.CAPSULE|Shape.RECTANGLE]=Narrowphase.prototype.convexCapsule=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){var circlePos=convexCapsule_tempVec;vec2.set(circlePos,sj.length/2,0);vec2.rotate(circlePos,circlePos,aj);vec2.add(circlePos,circlePos,xj);var result1=this.circleConvex(bj,sj,circlePos,aj,bi,si,xi,ai,justTest,sj.radius);vec2.set(circlePos,-sj.length/2,0);vec2.rotate(circlePos,circlePos,aj);vec2.add(circlePos,circlePos,xj);var result2=this.circleConvex(bj,sj,circlePos,aj,bi,si,xi,ai,justTest,sj.radius);if(justTest&&(result1||result2))
return true;var r=convexCapsule_tempRect;setConvexToCapsuleShapeMiddle(r,sj);var result=this.convexConvex(bi,si,xi,ai,bj,r,xj,aj,justTest);return result+result1+result2;};Narrowphase.prototype[Shape.CAPSULE|Shape.LINE]=Narrowphase.prototype.lineCapsule=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){if(justTest)
return false;else
return 0;};var capsuleCapsule_tempVec1=vec2.create();var capsuleCapsule_tempVec2=vec2.create();var capsuleCapsule_tempRect1=new Rectangle(1,1);Narrowphase.prototype[Shape.CAPSULE|Shape.CAPSULE]=Narrowphase.prototype.capsuleCapsule=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){var circlePosi=capsuleCapsule_tempVec1,circlePosj=capsuleCapsule_tempVec2;var numContacts=0;for(var i=0;i<2;i++){vec2.set(circlePosi,(i==0?-1:1)*si.length/2,0);vec2.rotate(circlePosi,circlePosi,ai);vec2.add(circlePosi,circlePosi,xi);for(var j=0;j<2;j++){vec2.set(circlePosj,(j==0?-1:1)*sj.length/2,0);vec2.rotate(circlePosj,circlePosj,aj);vec2.add(circlePosj,circlePosj,xj);var result=this.circleCircle(bi,si,circlePosi,ai,bj,sj,circlePosj,aj,justTest,si.radius,sj.radius);if(justTest&&result)
return true;numContacts+=result;}}
var rect=capsuleCapsule_tempRect1;setConvexToCapsuleShapeMiddle(rect,si);var result1=this.convexCapsule(bi,rect,xi,ai,bj,sj,xj,aj,justTest);if(justTest&&result1)return true;numContacts+=result1;setConvexToCapsuleShapeMiddle(rect,sj);var result2=this.convexCapsule(bj,rect,xj,aj,bi,si,xi,ai,justTest);if(justTest&&result2)return true;numContacts+=result2;return numContacts;};Narrowphase.prototype[Shape.LINE|Shape.LINE]=Narrowphase.prototype.lineLine=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){if(justTest)
return false;else
return 0;};Narrowphase.prototype[Shape.PLANE|Shape.LINE]=Narrowphase.prototype.planeLine=function(planeBody,planeShape,planeOffset,planeAngle,lineBody,lineShape,lineOffset,lineAngle,justTest){var worldVertex0=tmp1,worldVertex1=tmp2,worldVertex01=tmp3,worldVertex11=tmp4,worldEdge=tmp5,worldEdgeUnit=tmp6,dist=tmp7,worldNormal=tmp8,worldTangent=tmp9,verts=tmpArray
numContacts=0;vec2.set(worldVertex0,-lineShape.length/2,0);vec2.set(worldVertex1,lineShape.length/2,0);vec2.rotate(worldVertex01,worldVertex0,lineAngle);vec2.rotate(worldVertex11,worldVertex1,lineAngle);add(worldVertex01,worldVertex01,lineOffset);add(worldVertex11,worldVertex11,lineOffset);vec2.copy(worldVertex0,worldVertex01);vec2.copy(worldVertex1,worldVertex11);sub(worldEdge,worldVertex1,worldVertex0);vec2.normalize(worldEdgeUnit,worldEdge);vec2.rotate90cw(worldTangent,worldEdgeUnit);vec2.rotate(worldNormal,yAxis,planeAngle);verts[0]=worldVertex0;verts[1]=worldVertex1;for(var i=0;i<verts.length;i++){var v=verts[i];sub(dist,v,planeOffset);var d=dot(dist,worldNormal);if(d<0){if(justTest)
return true;var c=this.createContactEquation(planeBody,lineBody,planeShape,lineShape);numContacts++;vec2.copy(c.normalA,worldNormal);vec2.normalize(c.normalA,c.normalA);vec2.scale(dist,worldNormal,d);sub(c.contactPointA,v,dist);sub(c.contactPointA,c.contactPointA,planeBody.position);sub(c.contactPointB,v,lineOffset);add(c.contactPointB,c.contactPointB,lineOffset);sub(c.contactPointB,c.contactPointB,lineBody.position);this.contactEquations.push(c);if(this.enableFriction){this.frictionEquations.push(this.createFrictionFromContact(c));}}}
return numContacts;};Narrowphase.prototype[Shape.PARTICLE|Shape.CAPSULE]=Narrowphase.prototype.particleCapsule=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){return this.circleLine(bi,si,xi,ai,bj,sj,xj,aj,justTest,sj.radius,0);};Narrowphase.prototype[Shape.CIRCLE|Shape.LINE]=Narrowphase.prototype.circleLine=function(bi,si,xi,ai,bj,sj,xj,aj,justTest,lineRadius,circleRadius){var lineShape=sj,lineAngle=aj,lineBody=bj,lineOffset=xj,circleOffset=xi,circleBody=bi,circleShape=si,lineRadius=lineRadius||0,circleRadius=typeof(circleRadius)!="undefined"?circleRadius:circleShape.radius,orthoDist=tmp1,lineToCircleOrthoUnit=tmp2,projectedPoint=tmp3,centerDist=tmp4,worldTangent=tmp5,worldEdge=tmp6,worldEdgeUnit=tmp7,worldVertex0=tmp8,worldVertex1=tmp9,worldVertex01=tmp10,worldVertex11=tmp11,dist=tmp12,lineToCircle=tmp13,lineEndToLineRadius=tmp14,verts=tmpArray;vec2.set(worldVertex0,-lineShape.length/2,0);vec2.set(worldVertex1,lineShape.length/2,0);vec2.rotate(worldVertex01,worldVertex0,lineAngle);vec2.rotate(worldVertex11,worldVertex1,lineAngle);add(worldVertex01,worldVertex01,lineOffset);add(worldVertex11,worldVertex11,lineOffset);vec2.copy(worldVertex0,worldVertex01);vec2.copy(worldVertex1,worldVertex11);sub(worldEdge,worldVertex1,worldVertex0);vec2.normalize(worldEdgeUnit,worldEdge);vec2.rotate90cw(worldTangent,worldEdgeUnit);sub(dist,circleOffset,worldVertex0);var d=dot(dist,worldTangent);sub(centerDist,worldVertex0,lineOffset);sub(lineToCircle,circleOffset,lineOffset);if(Math.abs(d)<circleRadius+lineRadius){vec2.scale(orthoDist,worldTangent,d);sub(projectedPoint,circleOffset,orthoDist);vec2.scale(lineToCircleOrthoUnit,worldTangent,dot(worldTangent,lineToCircle));vec2.normalize(lineToCircleOrthoUnit,lineToCircleOrthoUnit);vec2.scale(lineToCircleOrthoUnit,lineToCircleOrthoUnit,lineRadius);add(projectedPoint,projectedPoint,lineToCircleOrthoUnit);var pos=dot(worldEdgeUnit,projectedPoint);var pos0=dot(worldEdgeUnit,worldVertex0);var pos1=dot(worldEdgeUnit,worldVertex1);if(pos>pos0&&pos<pos1){if(justTest)return true;var c=this.createContactEquation(circleBody,lineBody,si,sj);vec2.scale(c.normalA,orthoDist,-1);vec2.normalize(c.normalA,c.normalA);vec2.scale(c.contactPointA,c.normalA,circleRadius);add(c.contactPointA,c.contactPointA,circleOffset);sub(c.contactPointA,c.contactPointA,circleBody.position);sub(c.contactPointB,projectedPoint,lineOffset);add(c.contactPointB,c.contactPointB,lineOffset);sub(c.contactPointB,c.contactPointB,lineBody.position);this.contactEquations.push(c);if(this.enableFriction){this.frictionEquations.push(this.createFrictionFromContact(c));}
return 1;}}
verts[0]=worldVertex0;verts[1]=worldVertex1;for(var i=0;i<verts.length;i++){var v=verts[i];sub(dist,v,circleOffset);if(vec2.squaredLength(dist)<(circleRadius+lineRadius)*(circleRadius+lineRadius)){if(justTest)return true;var c=this.createContactEquation(circleBody,lineBody,si,sj);vec2.copy(c.normalA,dist);vec2.normalize(c.normalA,c.normalA);vec2.scale(c.contactPointA,c.normalA,circleRadius);add(c.contactPointA,c.contactPointA,circleOffset);sub(c.contactPointA,c.contactPointA,circleBody.position);sub(c.contactPointB,v,lineOffset);vec2.scale(lineEndToLineRadius,c.normalA,-lineRadius);add(c.contactPointB,c.contactPointB,lineEndToLineRadius);add(c.contactPointB,c.contactPointB,lineOffset);sub(c.contactPointB,c.contactPointB,lineBody.position);this.contactEquations.push(c);if(this.enableFriction){this.frictionEquations.push(this.createFrictionFromContact(c));}
return 1;}}
return 0;};Narrowphase.prototype[Shape.CIRCLE|Shape.CAPSULE]=Narrowphase.prototype.circleCapsule=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){return this.circleLine(bi,si,xi,ai,bj,sj,xj,aj,justTest,sj.radius);};Narrowphase.prototype[Shape.CIRCLE|Shape.CONVEX]=Narrowphase.prototype[Shape.CIRCLE|Shape.RECTANGLE]=Narrowphase.prototype.circleConvex=function(bi,si,xi,ai,bj,sj,xj,aj,justTest,circleRadius){var convexShape=sj,convexAngle=aj,convexBody=bj,convexOffset=xj,circleOffset=xi,circleBody=bi,circleShape=si,circleRadius=typeof(circleRadius)=="number"?circleRadius:circleShape.radius;var worldVertex0=tmp1,worldVertex1=tmp2,worldEdge=tmp3,worldEdgeUnit=tmp4,worldTangent=tmp5,centerDist=tmp6,convexToCircle=tmp7,orthoDist=tmp8,projectedPoint=tmp9,dist=tmp10,worldVertex=tmp11,closestEdge=-1,closestEdgeDistance=null,closestEdgeOrthoDist=tmp12,closestEdgeProjectedPoint=tmp13,candidate=tmp14,candidateDist=tmp15,minCandidate=tmp16,found=false,minCandidateDistance=Number.MAX_VALUE;var numReported=0;verts=convexShape.vertices;for(var i=0;i!==verts.length+1;i++){var v0=verts[i%verts.length],v1=verts[(i+1)%verts.length];vec2.rotate(worldVertex0,v0,convexAngle);vec2.rotate(worldVertex1,v1,convexAngle);add(worldVertex0,worldVertex0,convexOffset);add(worldVertex1,worldVertex1,convexOffset);sub(worldEdge,worldVertex1,worldVertex0);vec2.normalize(worldEdgeUnit,worldEdge);vec2.rotate90cw(worldTangent,worldEdgeUnit);vec2.scale(candidate,worldTangent,-circleShape.radius);add(candidate,candidate,circleOffset);if(pointInConvex(candidate,convexShape,convexOffset,convexAngle)){vec2.sub(candidateDist,worldVertex0,candidate);var candidateDistance=Math.abs(vec2.dot(candidateDist,worldTangent));if(candidateDistance<minCandidateDistance){vec2.copy(minCandidate,candidate);minCandidateDistance=candidateDistance;vec2.scale(closestEdgeProjectedPoint,worldTangent,candidateDistance);vec2.add(closestEdgeProjectedPoint,closestEdgeProjectedPoint,candidate);found=true;}}}
if(found){if(justTest)
return true;var c=this.createContactEquation(circleBody,convexBody,si,sj);vec2.sub(c.normalA,minCandidate,circleOffset)
vec2.normalize(c.normalA,c.normalA);vec2.scale(c.contactPointA,c.normalA,circleRadius);add(c.contactPointA,c.contactPointA,circleOffset);sub(c.contactPointA,c.contactPointA,circleBody.position);sub(c.contactPointB,closestEdgeProjectedPoint,convexOffset);add(c.contactPointB,c.contactPointB,convexOffset);sub(c.contactPointB,c.contactPointB,convexBody.position);this.contactEquations.push(c);if(this.enableFriction)
this.frictionEquations.push(this.createFrictionFromContact(c));return 1;}
if(circleRadius>0){for(var i=0;i<verts.length;i++){var localVertex=verts[i];vec2.rotate(worldVertex,localVertex,convexAngle);add(worldVertex,worldVertex,convexOffset);sub(dist,worldVertex,circleOffset);if(vec2.squaredLength(dist)<circleRadius*circleRadius){if(justTest)return true;var c=this.createContactEquation(circleBody,convexBody,si,sj);vec2.copy(c.normalA,dist);vec2.normalize(c.normalA,c.normalA);vec2.scale(c.contactPointA,c.normalA,circleRadius);add(c.contactPointA,c.contactPointA,circleOffset);sub(c.contactPointA,c.contactPointA,circleBody.position);sub(c.contactPointB,worldVertex,convexOffset);add(c.contactPointB,c.contactPointB,convexOffset);sub(c.contactPointB,c.contactPointB,convexBody.position);this.contactEquations.push(c);if(this.enableFriction){this.frictionEquations.push(this.createFrictionFromContact(c));}
return 1;}}}
return 0;};var pic_worldVertex0=vec2.create(),pic_worldVertex1=vec2.create(),pic_r0=vec2.create(),pic_r1=vec2.create();function pointInConvex(worldPoint,convexShape,convexOffset,convexAngle){var worldVertex0=pic_worldVertex0,worldVertex1=pic_worldVertex1,r0=pic_r0,r1=pic_r1,point=worldPoint,verts=convexShape.vertices,lastCross=null;for(var i=0;i!==verts.length+1;i++){var v0=verts[i%verts.length],v1=verts[(i+1)%verts.length];vec2.rotate(worldVertex0,v0,convexAngle);vec2.rotate(worldVertex1,v1,convexAngle);add(worldVertex0,worldVertex0,convexOffset);add(worldVertex1,worldVertex1,convexOffset);sub(r0,worldVertex0,point);sub(r1,worldVertex1,point);var cross=vec2.crossLength(r0,r1);if(lastCross===null)lastCross=cross;if(cross*lastCross<=0){return false;}
lastCross=cross;}
return true;};Narrowphase.prototype[Shape.PARTICLE|Shape.CONVEX]=Narrowphase.prototype[Shape.PARTICLE|Shape.RECTANGLE]=Narrowphase.prototype.particleConvex=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){var convexShape=sj,convexAngle=aj,convexBody=bj,convexOffset=xj,particleOffset=xi,particleBody=bi,particleShape=si,worldVertex0=tmp1,worldVertex1=tmp2,worldEdge=tmp3,worldEdgeUnit=tmp4,worldTangent=tmp5,centerDist=tmp6,convexToparticle=tmp7,orthoDist=tmp8,projectedPoint=tmp9,dist=tmp10,worldVertex=tmp11,closestEdge=-1,closestEdgeDistance=null,closestEdgeOrthoDist=tmp12,closestEdgeProjectedPoint=tmp13,r0=tmp14,r1=tmp15,localPoint=tmp16,candidateDist=tmp17,minEdgeNormal=tmp18,minCandidateDistance=Number.MAX_VALUE;var numReported=0,found=false,verts=convexShape.vertices;if(!pointInConvex(particleOffset,convexShape,convexOffset,convexAngle)){return 0;}
if(justTest)return true;var lastCross=null;for(var i=0;i!==verts.length+1;i++){var v0=verts[i%verts.length],v1=verts[(i+1)%verts.length];vec2.rotate(worldVertex0,v0,convexAngle);vec2.rotate(worldVertex1,v1,convexAngle);add(worldVertex0,worldVertex0,convexOffset);add(worldVertex1,worldVertex1,convexOffset);sub(worldEdge,worldVertex1,worldVertex0);vec2.normalize(worldEdgeUnit,worldEdge);vec2.rotate90cw(worldTangent,worldEdgeUnit);sub(dist,particleOffset,worldVertex0);var d=dot(dist,worldTangent);sub(centerDist,worldVertex0,convexOffset);sub(convexToparticle,particleOffset,convexOffset);vec2.sub(candidateDist,worldVertex0,particleOffset);var candidateDistance=Math.abs(vec2.dot(candidateDist,worldTangent));if(candidateDistance<minCandidateDistance){minCandidateDistance=candidateDistance;vec2.scale(closestEdgeProjectedPoint,worldTangent,candidateDistance);vec2.add(closestEdgeProjectedPoint,closestEdgeProjectedPoint,particleOffset);vec2.copy(minEdgeNormal,worldTangent);found=true;}}
if(found){var c=this.createContactEquation(particleBody,convexBody,si,sj);vec2.scale(c.normalA,minEdgeNormal,-1);vec2.normalize(c.normalA,c.normalA);vec2.set(c.contactPointA,0,0);add(c.contactPointA,c.contactPointA,particleOffset);sub(c.contactPointA,c.contactPointA,particleBody.position);sub(c.contactPointB,closestEdgeProjectedPoint,convexOffset);add(c.contactPointB,c.contactPointB,convexOffset);sub(c.contactPointB,c.contactPointB,convexBody.position);this.contactEquations.push(c);if(this.enableFriction)
this.frictionEquations.push(this.createFrictionFromContact(c));return 1;}
return 0;};Narrowphase.prototype[Shape.CIRCLE]=Narrowphase.prototype.circleCircle=function(bi,si,xi,ai,bj,sj,xj,aj,justTest,radiusA,radiusB){var bodyA=bi,shapeA=si,offsetA=xi,bodyB=bj,shapeB=sj,offsetB=xj,dist=tmp1,radiusA=radiusA||shapeA.radius,radiusB=radiusB||shapeB.radius;sub(dist,xi,xj);var r=radiusA+radiusB;if(vec2.squaredLength(dist)>r*r){return 0;}
if(justTest){return true;}
var c=this.createContactEquation(bodyA,bodyB,si,sj);sub(c.normalA,offsetB,offsetA);vec2.normalize(c.normalA,c.normalA);vec2.scale(c.contactPointA,c.normalA,radiusA);vec2.scale(c.contactPointB,c.normalA,-radiusB);add(c.contactPointA,c.contactPointA,offsetA);sub(c.contactPointA,c.contactPointA,bodyA.position);add(c.contactPointB,c.contactPointB,offsetB);sub(c.contactPointB,c.contactPointB,bodyB.position);this.contactEquations.push(c);if(this.enableFriction){this.frictionEquations.push(this.createFrictionFromContact(c));}
return 1;};Narrowphase.prototype[Shape.PLANE|Shape.CONVEX]=Narrowphase.prototype[Shape.PLANE|Shape.RECTANGLE]=Narrowphase.prototype.planeConvex=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){var convexBody=bj,convexOffset=xj,convexShape=sj,convexAngle=aj,planeBody=bi,planeShape=si,planeOffset=xi,planeAngle=ai;var worldVertex=tmp1,worldNormal=tmp2,dist=tmp3;var numReported=0;vec2.rotate(worldNormal,yAxis,planeAngle);for(var i=0;i<convexShape.vertices.length;i++){var v=convexShape.vertices[i];vec2.rotate(worldVertex,v,convexAngle);add(worldVertex,worldVertex,convexOffset);sub(dist,worldVertex,planeOffset);if(dot(dist,worldNormal)<=Narrowphase.convexPrecision){if(justTest){return true;}
numReported++;var c=this.createContactEquation(planeBody,convexBody,planeShape,convexShape);sub(dist,worldVertex,planeOffset);vec2.copy(c.normalA,worldNormal);var d=dot(dist,c.normalA);vec2.scale(dist,c.normalA,d);sub(c.contactPointB,worldVertex,convexBody.position);sub(c.contactPointA,worldVertex,dist);sub(c.contactPointA,c.contactPointA,planeBody.position);this.contactEquations.push(c);if(this.enableFriction){this.frictionEquations.push(this.createFrictionFromContact(c));}}}
return numReported;};Narrowphase.prototype.convexPlane=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){console.warn("Narrowphase.prototype.convexPlane is deprecated. Use planeConvex instead!");return this.planeConvex(bj,sj,xj,aj,bi,si,xi,ai,justTest);}
Narrowphase.prototype[Shape.PARTICLE|Shape.PLANE]=Narrowphase.prototype.particlePlane=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){var particleBody=bi,particleShape=si,particleOffset=xi,planeBody=bj,planeShape=sj,planeOffset=xj,planeAngle=aj;var dist=tmp1,worldNormal=tmp2;planeAngle=planeAngle||0;sub(dist,particleOffset,planeOffset);vec2.rotate(worldNormal,yAxis,planeAngle);var d=dot(dist,worldNormal);if(d>0)return 0;if(justTest)return true;var c=this.createContactEquation(planeBody,particleBody,sj,si);vec2.copy(c.normalA,worldNormal);vec2.scale(dist,c.normalA,d);sub(c.contactPointA,particleOffset,dist);sub(c.contactPointA,c.contactPointA,planeBody.position);sub(c.contactPointB,particleOffset,particleBody.position);this.contactEquations.push(c);if(this.enableFriction){this.frictionEquations.push(this.createFrictionFromContact(c));}
return 1;};Narrowphase.prototype[Shape.CIRCLE|Shape.PARTICLE]=Narrowphase.prototype.circleParticle=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){var circleBody=bi,circleShape=si,circleOffset=xi,particleBody=bj,particleShape=sj,particleOffset=xj,dist=tmp1;sub(dist,particleOffset,circleOffset);if(vec2.squaredLength(dist)>circleShape.radius*circleShape.radius)return 0;if(justTest)return true;var c=this.createContactEquation(circleBody,particleBody,si,sj);vec2.copy(c.normalA,dist);vec2.normalize(c.normalA,c.normalA);vec2.scale(c.contactPointA,c.normalA,circleShape.radius);add(c.contactPointA,c.contactPointA,circleOffset);sub(c.contactPointA,c.contactPointA,circleBody.position);sub(c.contactPointB,particleOffset,particleBody.position);this.contactEquations.push(c);if(this.enableFriction){this.frictionEquations.push(this.createFrictionFromContact(c));}
return 1;};var capsulePlane_tmpCircle=new Circle(1),capsulePlane_tmp1=vec2.create(),capsulePlane_tmp2=vec2.create(),capsulePlane_tmp3=vec2.create();Narrowphase.prototype[Shape.PLANE|Shape.CAPSULE]=Narrowphase.prototype.planeCapsule=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){var end1=capsulePlane_tmp1,end2=capsulePlane_tmp2,circle=capsulePlane_tmpCircle,dst=capsulePlane_tmp3;vec2.set(end1,-sj.length/2,0);vec2.rotate(end1,end1,aj);add(end1,end1,xj);vec2.set(end2,sj.length/2,0);vec2.rotate(end2,end2,aj);add(end2,end2,xj);circle.radius=sj.radius;var numContacts1=this.circlePlane(bj,circle,end1,0,bi,si,xi,ai,justTest),numContacts2=this.circlePlane(bj,circle,end2,0,bi,si,xi,ai,justTest);if(justTest)
return numContacts1||numContacts2;else
return numContacts1+numContacts2;};Narrowphase.prototype.capsulePlane=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){console.warn("Narrowphase.prototype.capsulePlane() is deprecated. Use .planeCapsule() instead!");return this.planeCapsule(bj,sj,xj,aj,bi,si,xi,ai,justTest);}
Narrowphase.prototype[Shape.CIRCLE|Shape.PLANE]=Narrowphase.prototype.circlePlane=function(bi,si,xi,ai,bj,sj,xj,aj,justTest){var circleBody=bi,circleShape=si,circleOffset=xi,planeBody=bj,shapeB=sj,planeOffset=xj,planeAngle=aj;planeAngle=planeAngle||0;var planeToCircle=tmp1,worldNormal=tmp2,temp=tmp3;sub(planeToCircle,circleOffset,planeOffset);vec2.rotate(worldNormal,yAxis,planeAngle);var d=dot(worldNormal,planeToCircle);if(d>circleShape.radius){return 0;}
if(justTest){return true;}
var contact=this.createContactEquation(planeBody,circleBody,sj,si);vec2.copy(contact.normalA,worldNormal);vec2.scale(contact.contactPointB,contact.normalA,-circleShape.radius);add(contact.contactPointB,contact.contactPointB,circleOffset);sub(contact.contactPointB,contact.contactPointB,circleBody.position);vec2.scale(temp,contact.normalA,d);sub(contact.contactPointA,planeToCircle,temp);add(contact.contactPointA,contact.contactPointA,planeOffset);sub(contact.contactPointA,contact.contactPointA,planeBody.position);this.contactEquations.push(contact);if(this.enableFriction){this.frictionEquations.push(this.createFrictionFromContact(contact));}
return 1;};Narrowphase.convexPrecision=1e-7;Narrowphase.prototype[Shape.CONVEX]=Narrowphase.prototype[Shape.CONVEX|Shape.RECTANGLE]=Narrowphase.prototype[Shape.RECTANGLE]=Narrowphase.prototype.convexConvex=function(bi,si,xi,ai,bj,sj,xj,aj,justTest,precision){var sepAxis=tmp1,worldPoint=tmp2,worldPoint0=tmp3,worldPoint1=tmp4,worldEdge=tmp5,projected=tmp6,penetrationVec=tmp7,dist=tmp8,worldNormal=tmp9,numContacts=0,precision=precision||Narrowphase.convexPrecision;var found=Narrowphase.findSeparatingAxis(si,xi,ai,sj,xj,aj,sepAxis);if(!found){return 0;}
sub(dist,xj,xi);if(dot(sepAxis,dist)>0){vec2.scale(sepAxis,sepAxis,-1);}
var closestEdge1=Narrowphase.getClosestEdge(si,ai,sepAxis,true),closestEdge2=Narrowphase.getClosestEdge(sj,aj,sepAxis);if(closestEdge1===-1||closestEdge2===-1){return 0;}
for(var k=0;k<2;k++){var closestEdgeA=closestEdge1,closestEdgeB=closestEdge2,shapeA=si,shapeB=sj,offsetA=xi,offsetB=xj,angleA=ai,angleB=aj,bodyA=bi,bodyB=bj;if(k===0){var tmp;tmp=closestEdgeA;closestEdgeA=closestEdgeB;closestEdgeB=tmp;tmp=shapeA;shapeA=shapeB;shapeB=tmp;tmp=offsetA;offsetA=offsetB;offsetB=tmp;tmp=angleA;angleA=angleB;angleB=tmp;tmp=bodyA;bodyA=bodyB;bodyB=tmp;}
for(var j=closestEdgeB;j<closestEdgeB+2;j++){var v=shapeB.vertices[(j+shapeB.vertices.length)%shapeB.vertices.length];vec2.rotate(worldPoint,v,angleB);add(worldPoint,worldPoint,offsetB);var insideNumEdges=0;for(var i=closestEdgeA-1;i<closestEdgeA+2;i++){var v0=shapeA.vertices[(i+shapeA.vertices.length)%shapeA.vertices.length],v1=shapeA.vertices[(i+1+shapeA.vertices.length)%shapeA.vertices.length];vec2.rotate(worldPoint0,v0,angleA);vec2.rotate(worldPoint1,v1,angleA);add(worldPoint0,worldPoint0,offsetA);add(worldPoint1,worldPoint1,offsetA);sub(worldEdge,worldPoint1,worldPoint0);vec2.rotate90cw(worldNormal,worldEdge);vec2.normalize(worldNormal,worldNormal);sub(dist,worldPoint,worldPoint0);var d=dot(worldNormal,dist);if(d<=precision){insideNumEdges++;}}
if(insideNumEdges>=3){if(justTest){return true;}
var c=this.createContactEquation(bodyA,bodyB,shapeA,shapeB);numContacts++;var v0=shapeA.vertices[(closestEdgeA)%shapeA.vertices.length],v1=shapeA.vertices[(closestEdgeA+1)%shapeA.vertices.length];vec2.rotate(worldPoint0,v0,angleA);vec2.rotate(worldPoint1,v1,angleA);add(worldPoint0,worldPoint0,offsetA);add(worldPoint1,worldPoint1,offsetA);sub(worldEdge,worldPoint1,worldPoint0);vec2.rotate90cw(c.normalA,worldEdge);vec2.normalize(c.normalA,c.normalA);sub(dist,worldPoint,worldPoint0);var d=dot(c.normalA,dist);vec2.scale(penetrationVec,c.normalA,d);sub(c.contactPointA,worldPoint,offsetA);sub(c.contactPointA,c.contactPointA,penetrationVec);add(c.contactPointA,c.contactPointA,offsetA);sub(c.contactPointA,c.contactPointA,bodyA.position);sub(c.contactPointB,worldPoint,offsetB);add(c.contactPointB,c.contactPointB,offsetB);sub(c.contactPointB,c.contactPointB,bodyB.position);this.contactEquations.push(c);if(this.enableFriction)
this.frictionEquations.push(this.createFrictionFromContact(c));}}}
return numContacts;};var pcoa_tmp1=vec2.fromValues(0,0);Narrowphase.projectConvexOntoAxis=function(convexShape,convexOffset,convexAngle,worldAxis,result){var max=null,min=null,v,value,localAxis=pcoa_tmp1;vec2.rotate(localAxis,worldAxis,-convexAngle);for(var i=0;i<convexShape.vertices.length;i++){v=convexShape.vertices[i];value=dot(v,localAxis);if(max===null||value>max)max=value;if(min===null||value<min)min=value;}
if(min>max){var t=min;min=max;max=t;}
var offset=dot(convexOffset,worldAxis);vec2.set(result,min+offset,max+offset);};var fsa_tmp1=vec2.fromValues(0,0),fsa_tmp2=vec2.fromValues(0,0),fsa_tmp3=vec2.fromValues(0,0),fsa_tmp4=vec2.fromValues(0,0),fsa_tmp5=vec2.fromValues(0,0),fsa_tmp6=vec2.fromValues(0,0)
Narrowphase.findSeparatingAxis=function(c1,offset1,angle1,c2,offset2,angle2,sepAxis){var maxDist=null,overlap=false,found=false,edge=fsa_tmp1,worldPoint0=fsa_tmp2,worldPoint1=fsa_tmp3,normal=fsa_tmp4,span1=fsa_tmp5,span2=fsa_tmp6;for(var j=0;j!==2;j++){var c=c1,angle=angle1;if(j===1){c=c2;angle=angle2;}
for(var i=0;i!==c.vertices.length;i++){vec2.rotate(worldPoint0,c.vertices[i],angle);vec2.rotate(worldPoint1,c.vertices[(i+1)%c.vertices.length],angle);sub(edge,worldPoint1,worldPoint0);vec2.rotate90cw(normal,edge);vec2.normalize(normal,normal);Narrowphase.projectConvexOntoAxis(c1,offset1,angle1,normal,span1);Narrowphase.projectConvexOntoAxis(c2,offset2,angle2,normal,span2);var a=span1,b=span2,swapped=false;if(span1[0]>span2[0]){b=span1;a=span2;swapped=true;}
var dist=b[0]-a[1];overlap=(dist<=Narrowphase.convexPrecision);if(maxDist===null||dist>maxDist){vec2.copy(sepAxis,normal);maxDist=dist;found=overlap;}}}
return found;};var gce_tmp1=vec2.fromValues(0,0),gce_tmp2=vec2.fromValues(0,0),gce_tmp3=vec2.fromValues(0,0)
Narrowphase.getClosestEdge=function(c,angle,axis,flip){var localAxis=gce_tmp1,edge=gce_tmp2,normal=gce_tmp3;vec2.rotate(localAxis,axis,-angle);if(flip){vec2.scale(localAxis,localAxis,-1);}
var closestEdge=-1,N=c.vertices.length;for(var i=0;i!==N;i++){sub(edge,c.vertices[(i+1)%N],c.vertices[i%N]);vec2.rotate90cw(normal,edge);vec2.normalize(normal,normal);var d=dot(normal,localAxis);if(closestEdge==-1||d>maxDot){closestEdge=i%N;maxDot=d;}}
return closestEdge;};var circleHeightfield_candidate=vec2.create(),circleHeightfield_dist=vec2.create(),circleHeightfield_v0=vec2.create(),circleHeightfield_v1=vec2.create(),circleHeightfield_minCandidate=vec2.create(),circleHeightfield_worldNormal=vec2.create(),circleHeightfield_minCandidateNormal=vec2.create();Narrowphase.prototype[Shape.CIRCLE|Shape.HEIGHTFIELD]=Narrowphase.prototype.circleHeightfield=function(circleBody,circleShape,circlePos,circleAngle,hfBody,hfShape,hfPos,hfAngle,justTest,radius){var data=hfShape.data,radius=radius||circleShape.radius,w=hfShape.elementWidth,dist=circleHeightfield_dist,candidate=circleHeightfield_candidate,minCandidate=circleHeightfield_minCandidate,minCandidateNormal=circleHeightfield_minCandidateNormal,worldNormal=circleHeightfield_worldNormal,v0=circleHeightfield_v0,v1=circleHeightfield_v1;var idxA=Math.floor((circlePos[0]-radius-hfPos[0])/w),idxB=Math.ceil((circlePos[0]+radius-hfPos[0])/w);if(idxA<0)idxA=0;if(idxB>=data.length)idxB=data.length-1;var max=data[idxA],min=data[idxB];for(var i=idxA;i<idxB;i++){if(data[i]<min)min=data[i];if(data[i]>max)max=data[i];}
if(circlePos[1]-radius>max)
return justTest?false:0;if(circlePos[1]+radius<min){}
var found=false;for(var i=idxA;i<idxB;i++){vec2.set(v0,i*w,data[i]);vec2.set(v1,(i+1)*w,data[i+1]);vec2.add(v0,v0,hfPos);vec2.add(v1,v1,hfPos);vec2.sub(worldNormal,v1,v0);vec2.rotate(worldNormal,worldNormal,Math.PI/2);vec2.normalize(worldNormal,worldNormal);vec2.scale(candidate,worldNormal,-radius);vec2.add(candidate,candidate,circlePos);vec2.sub(dist,candidate,v0);var d=vec2.dot(dist,worldNormal);if(candidate[0]>=v0[0]&&candidate[0]<v1[0]&&d<=0){if(justTest){return true;}
found=true;vec2.scale(dist,worldNormal,-d);vec2.add(minCandidate,candidate,dist);vec2.copy(minCandidateNormal,worldNormal);var c=this.createContactEquation(hfBody,circleBody,hfShape,circleShape);vec2.copy(c.normalA,minCandidateNormal);vec2.scale(c.contactPointB,c.normalA,-radius);add(c.contactPointB,c.contactPointB,circlePos);sub(c.contactPointB,c.contactPointB,circleBody.position);vec2.copy(c.contactPointA,minCandidate);vec2.sub(c.contactPointA,c.contactPointA,hfBody.position);this.contactEquations.push(c);if(this.enableFriction){this.frictionEquations.push(this.createFrictionFromContact(c));}}}
found=false;if(radius>0){for(var i=idxA;i<=idxB;i++){vec2.set(v0,i*w,data[i]);vec2.add(v0,v0,hfPos);vec2.sub(dist,circlePos,v0);if(vec2.squaredLength(dist)<radius*radius){if(justTest)return true;found=true;var c=this.createContactEquation(hfBody,circleBody,hfShape,circleShape);vec2.copy(c.normalA,dist);vec2.normalize(c.normalA,c.normalA);vec2.scale(c.contactPointB,c.normalA,-radius);add(c.contactPointB,c.contactPointB,circlePos);sub(c.contactPointB,c.contactPointB,circleBody.position);sub(c.contactPointA,v0,hfPos);add(c.contactPointA,c.contactPointA,hfPos);sub(c.contactPointA,c.contactPointA,hfBody.position);this.contactEquations.push(c);if(this.enableFriction){this.frictionEquations.push(this.createFrictionFromContact(c));}}}}
if(found){return 1;}
return 0;};var convexHeightfield_v0=vec2.create(),convexHeightfield_v1=vec2.create(),convexHeightfield_tilePos=vec2.create(),convexHeightfield_tempConvexShape=new Convex([vec2.create(),vec2.create(),vec2.create(),vec2.create()]);Narrowphase.prototype[Shape.RECTANGLE|Shape.HEIGHTFIELD]=Narrowphase.prototype[Shape.CONVEX|Shape.HEIGHTFIELD]=Narrowphase.prototype.convexHeightfield=function(convexBody,convexShape,convexPos,convexAngle,hfBody,hfShape,hfPos,hfAngle,justTest){var data=hfShape.data,w=hfShape.elementWidth,v0=convexHeightfield_v0,v1=convexHeightfield_v1,tilePos=convexHeightfield_tilePos,tileConvex=convexHeightfield_tempConvexShape;var idxA=Math.floor((convexBody.aabb.lowerBound[0]-hfPos[0])/w),idxB=Math.ceil((convexBody.aabb.upperBound[0]-hfPos[0])/w);if(idxA<0)idxA=0;if(idxB>=data.length)idxB=data.length-1;var max=data[idxA],min=data[idxB];for(var i=idxA;i<idxB;i++){if(data[i]<min)min=data[i];if(data[i]>max)max=data[i];}
if(convexBody.aabb.lowerBound[1]>max){return justTest?false:0;}
var found=false;var numContacts=0;for(var i=idxA;i<idxB;i++){vec2.set(v0,i*w,data[i]);vec2.set(v1,(i+1)*w,data[i+1]);vec2.add(v0,v0,hfPos);vec2.add(v1,v1,hfPos);var tileHeight=100;vec2.set(tilePos,(v1[0]+v0[0])*0.5,(v1[1]+v0[1]-tileHeight)*0.5);vec2.sub(tileConvex.vertices[0],v1,tilePos);vec2.sub(tileConvex.vertices[1],v0,tilePos);vec2.copy(tileConvex.vertices[2],tileConvex.vertices[1]);vec2.copy(tileConvex.vertices[3],tileConvex.vertices[0]);tileConvex.vertices[2][1]-=tileHeight;tileConvex.vertices[3][1]-=tileHeight;numContacts+=this.convexConvex(convexBody,convexShape,convexPos,convexAngle,hfBody,tileConvex,tilePos,0,justTest);}
return numContacts;};},{"../equations/ContactEquation":21,"../equations/Equation":22,"../equations/FrictionEquation":23,"../math/vec2":30,"../objects/Body":31,"../shapes/Circle":35,"../shapes/Convex":36,"../shapes/Rectangle":41,"../shapes/Shape":42,"../utils/TupleDictionary":46,"../utils/Utils":47}],13:[function(require,module,exports){var Utils=require('../utils/Utils'),Broadphase=require('../collision/Broadphase');module.exports=SAPBroadphase;function SAPBroadphase(){Broadphase.call(this,Broadphase.SAP);this.axisList=[];this.world=null;this.axisIndex=0;var axisList=this.axisList;this._addBodyHandler=function(e){axisList.push(e.body);};this._removeBodyHandler=function(e){var idx=axisList.indexOf(e.body);if(idx!==-1){axisList.splice(idx,1);}};}
SAPBroadphase.prototype=new Broadphase();SAPBroadphase.prototype.setWorld=function(world){this.axisList.length=0;Utils.appendArray(this.axisList,world.bodies);world.off("addBody",this._addBodyHandler).off("removeBody",this._removeBodyHandler);world.on("addBody",this._addBodyHandler).on("removeBody",this._removeBodyHandler);this.world=world;};SAPBroadphase.sortAxisList=function(a,axisIndex){axisIndex=axisIndex|0;for(var i=1,l=a.length;i<l;i++){var v=a[i];for(var j=i-1;j>=0;j--){if(a[j].aabb.lowerBound[axisIndex]<=v.aabb.lowerBound[axisIndex]){break;}
a[j+1]=a[j];}
a[j+1]=v;}
return a;};SAPBroadphase.prototype.getCollisionPairs=function(world){var bodies=this.axisList,result=this.result,axisIndex=this.axisIndex;result.length=0;var l=bodies.length;while(l--){var b=bodies[l];if(b.aabbNeedsUpdate){b.updateAABB();}}
SAPBroadphase.sortAxisList(bodies,axisIndex);for(var i=0,N=bodies.length|0;i!==N;i++){var bi=bodies[i];for(var j=i+1;j<N;j++){var bj=bodies[j];var overlaps=(bj.aabb.lowerBound[axisIndex]<=bi.aabb.upperBound[axisIndex]);if(!overlaps){break;}
if(Broadphase.canCollide(bi,bj)&&this.boundingVolumeCheck(bi,bj)){result.push(bi,bj);}}}
return result;};},{"../collision/Broadphase":9,"../utils/Utils":47}],14:[function(require,module,exports){module.exports=Constraint;var Utils=require('../utils/Utils');function Constraint(bodyA,bodyB,type,options){this.type=type;options=Utils.defaults(options,{collideConnected:true,wakeUpBodies:true,});this.equations=[];this.bodyA=bodyA;this.bodyB=bodyB;this.collideConnected=options.collideConnected;if(options.wakeUpBodies){if(bodyA){bodyA.wakeUp();}
if(bodyB){bodyB.wakeUp();}}}
Constraint.prototype.update=function(){throw new Error("method update() not implmemented in this Constraint subclass!");};Constraint.DISTANCE=1;Constraint.GEAR=2;Constraint.LOCK=3;Constraint.PRISMATIC=4;Constraint.REVOLUTE=5;Constraint.prototype.setStiffness=function(stiffness){var eqs=this.equations;for(var i=0;i!==eqs.length;i++){var eq=eqs[i];eq.stiffness=stiffness;eq.needsUpdate=true;}};Constraint.prototype.setRelaxation=function(relaxation){var eqs=this.equations;for(var i=0;i!==eqs.length;i++){var eq=eqs[i];eq.relaxation=relaxation;eq.needsUpdate=true;}};},{"../utils/Utils":47}],15:[function(require,module,exports){var Constraint=require('./Constraint'),Equation=require('../equations/Equation'),vec2=require('../math/vec2')
module.exports=DistanceConstraint;function DistanceConstraint(bodyA,bodyB,distance,options){options=options||{};Constraint.call(this,bodyA,bodyB,Constraint.DISTANCE,options);this.distance=distance;this.localAnchorA=vec2.create();this.localAnchorB=vec2.create();var localAnchorA=this.localAnchorA;var localAnchorB=this.localAnchorB;var maxForce;if(typeof(options.maxForce)==="undefined"){maxForce=Number.MAX_VALUE;}else{maxForce=options.maxForce;}
var normal=new Equation(bodyA,bodyB,-maxForce,maxForce);this.equations=[normal];var r=vec2.create();var ri=vec2.create();var rj=vec2.create();var that=this;normal.computeGq=function(){var bodyA=this.bodyA,bodyB=this.bodyB,xi=bodyA.position,xj=bodyB.position;vec2.rotate(ri,localAnchorA,bodyA.angle);vec2.rotate(rj,localAnchorB,bodyB.angle);vec2.add(r,xi,rj);vec2.sub(r,r,ri);vec2.sub(r,r,xi);vec2.sub(r,bodyB.position,bodyA.position);return vec2.length(r)-that.distance;};this.setMaxForce(maxForce);}
DistanceConstraint.prototype=new Constraint();var n=vec2.create();var ri=vec2.create();var rj=vec2.create();DistanceConstraint.prototype.update=function(){var normal=this.equations[0],bodyA=this.bodyA,bodyB=this.bodyB,distance=this.distance,xi=bodyA.position,xj=bodyB.position,G=normal.G;vec2.rotate(ri,this.localAnchorA,bodyA.angle);vec2.rotate(rj,this.localAnchorB,bodyB.angle);var rixn=vec2.crossLength(ri,n),rjxn=vec2.crossLength(rj,n);vec2.sub(n,bodyB.position,bodyA.position);vec2.normalize(n,n);G[0]=-n[0];G[1]=-n[1];G[3]=n[0];G[4]=n[1];};DistanceConstraint.prototype.setMaxForce=function(f){var normal=this.equations[0];normal.minForce=-f;normal.maxForce=f;};DistanceConstraint.prototype.getMaxForce=function(f){var normal=this.equations[0];return normal.maxForce;};},{"../equations/Equation":22,"../math/vec2":30,"./Constraint":14}],16:[function(require,module,exports){var Constraint=require('./Constraint'),Equation=require('../equations/Equation'),AngleLockEquation=require('../equations/AngleLockEquation'),vec2=require('../math/vec2')
module.exports=GearConstraint;function GearConstraint(bodyA,bodyB,options){options=options||{};Constraint.call(this,bodyA,bodyB,Constraint.GEAR,options);this.equations=[new AngleLockEquation(bodyA,bodyB,options),];this.angle=typeof(options.angle)==="number"?options.angle:0;this.ratio=typeof(options.ratio)==="number"?options.ratio:1;if(typeof(options.maxTorque)==="number"){this.setMaxTorque(options.maxTorque);}}
GearConstraint.prototype=new Constraint();GearConstraint.prototype.update=function(){var eq=this.equations[0];if(eq.ratio!==this.ratio){eq.setRatio(this.ratio);}
eq.angle=this.angle;};GearConstraint.prototype.setMaxTorque=function(torque){this.equations[0].setMaxTorque(torque);};GearConstraint.prototype.getMaxTorque=function(torque){return this.equations[0].maxForce;};},{"../equations/AngleLockEquation":20,"../equations/Equation":22,"../math/vec2":30,"./Constraint":14}],17:[function(require,module,exports){var Constraint=require('./Constraint'),vec2=require('../math/vec2'),Equation=require('../equations/Equation')
module.exports=LockConstraint;function LockConstraint(bodyA,bodyB,options){options=options||{};Constraint.call(this,bodyA,bodyB,Constraint.LOCK,options);var maxForce=(typeof(options.maxForce)==="undefined"?Number.MAX_VALUE:options.maxForce);var localOffsetB=options.localOffsetB||vec2.fromValues(0,0);localOffsetB=vec2.fromValues(localOffsetB[0],localOffsetB[1]);var localAngleB=options.localAngleB||0;var x=new Equation(bodyA,bodyB,-maxForce,maxForce),y=new Equation(bodyA,bodyB,-maxForce,maxForce),rot=new Equation(bodyA,bodyB,-maxForce,maxForce);var l=vec2.create(),g=vec2.create(),that=this;x.computeGq=function(){vec2.rotate(l,that.localOffsetB,bodyA.angle);vec2.sub(g,bodyB.position,bodyA.position);vec2.sub(g,g,l);return g[0];};y.computeGq=function(){vec2.rotate(l,that.localOffsetB,bodyA.angle);vec2.sub(g,bodyB.position,bodyA.position);vec2.sub(g,g,l);return g[1];};var r=vec2.create(),t=vec2.create();rot.computeGq=function(){vec2.rotate(r,that.localOffsetB,bodyB.angle-that.localAngleB);vec2.scale(r,r,-1);vec2.sub(g,bodyA.position,bodyB.position);vec2.add(g,g,r);vec2.rotate(t,r,-Math.PI/2);vec2.normalize(t,t);return vec2.dot(g,t);};this.localOffsetB=localOffsetB;this.localAngleB=localAngleB;this.equations.push(x,y,rot);this.setMaxForce(maxForce);}
LockConstraint.prototype=new Constraint();LockConstraint.prototype.setMaxForce=function(force){var eqs=this.equations;for(var i=0;i<this.equations.length;i++){eqs[i].maxForce=force;eqs[i].minForce=-force;}};LockConstraint.prototype.getMaxForce=function(){return this.equations[0].maxForce;};var l=vec2.create();var r=vec2.create();var t=vec2.create();var xAxis=vec2.fromValues(1,0);var yAxis=vec2.fromValues(0,1);LockConstraint.prototype.update=function(){var x=this.equations[0],y=this.equations[1],rot=this.equations[2],bodyA=this.bodyA,bodyB=this.bodyB;vec2.rotate(l,this.localOffsetB,bodyA.angle);vec2.rotate(r,this.localOffsetB,bodyB.angle-this.localAngleB);vec2.scale(r,r,-1);vec2.rotate(t,r,Math.PI/2);vec2.normalize(t,t);x.G[0]=-1;x.G[1]=0;x.G[2]=-vec2.crossLength(l,xAxis);x.G[3]=1;y.G[0]=0;y.G[1]=-1;y.G[2]=-vec2.crossLength(l,yAxis);y.G[4]=1;rot.G[0]=-t[0];rot.G[1]=-t[1];rot.G[3]=t[0];rot.G[4]=t[1];rot.G[5]=vec2.crossLength(r,t);};},{"../equations/Equation":22,"../math/vec2":30,"./Constraint":14}],18:[function(require,module,exports){var Constraint=require('./Constraint'),ContactEquation=require('../equations/ContactEquation'),Equation=require('../equations/Equation'),vec2=require('../math/vec2'),RotationalLockEquation=require('../equations/RotationalLockEquation')
module.exports=PrismaticConstraint;function PrismaticConstraint(bodyA,bodyB,options){options=options||{};Constraint.call(this,bodyA,bodyB,Constraint.PRISMATIC,options);var localAnchorA=vec2.fromValues(0,0),localAxisA=vec2.fromValues(1,0),localAnchorB=vec2.fromValues(0,0);if(options.localAnchorA)vec2.copy(localAnchorA,options.localAnchorA);if(options.localAxisA)vec2.copy(localAxisA,options.localAxisA);if(options.localAnchorB)vec2.copy(localAnchorB,options.localAnchorB);this.localAnchorA=localAnchorA;this.localAnchorB=localAnchorB;this.localAxisA=localAxisA;var maxForce=this.maxForce=typeof(options.maxForce)!="undefined"?options.maxForce:Number.MAX_VALUE;var trans=new Equation(bodyA,bodyB,-maxForce,maxForce);var ri=new vec2.create(),rj=new vec2.create(),gg=new vec2.create(),t=new vec2.create();trans.computeGq=function(){return vec2.dot(gg,t);};trans.updateJacobian=function(){var G=this.G,xi=bodyA.position,xj=bodyB.position;vec2.rotate(ri,localAnchorA,bodyA.angle);vec2.rotate(rj,localAnchorB,bodyB.angle);vec2.add(gg,xj,rj);vec2.sub(gg,gg,xi);vec2.sub(gg,gg,ri);vec2.rotate(t,localAxisA,bodyA.angle+Math.PI/2);G[0]=-t[0];G[1]=-t[1];G[2]=-vec2.crossLength(ri,t)+vec2.crossLength(t,gg);G[3]=t[0];G[4]=t[1];G[5]=vec2.crossLength(rj,t);};this.equations.push(trans);if(!options.disableRotationalLock){var rot=new RotationalLockEquation(bodyA,bodyB,-maxForce,maxForce);this.equations.push(rot);}
this.position=0;this.velocity=0;this.lowerLimitEnabled=typeof(options.lowerLimit)!=="undefined"?true:false;this.upperLimitEnabled=typeof(options.upperLimit)!=="undefined"?true:false;this.lowerLimit=typeof(options.lowerLimit)!=="undefined"?options.lowerLimit:0;this.upperLimit=typeof(options.upperLimit)!=="undefined"?options.upperLimit:1;this.upperLimitEquation=new ContactEquation(bodyA,bodyB);this.lowerLimitEquation=new ContactEquation(bodyA,bodyB);this.upperLimitEquation.minForce=this.lowerLimitEquation.minForce=0;this.upperLimitEquation.maxForce=this.lowerLimitEquation.maxForce=maxForce;this.motorEquation=new Equation(bodyA,bodyB);this.motorEnabled=false;this.motorSpeed=0;var that=this;var motorEquation=this.motorEquation;var old=motorEquation.computeGW;motorEquation.computeGq=function(){return 0;};motorEquation.computeGW=function(){var G=this.G,bi=this.bodyA,bj=this.bodyB,vi=bi.velocity,vj=bj.velocity,wi=bi.angularVelocity,wj=bj.angularVelocity;return this.transformedGmult(G,vi,wi,vj,wj)+that.motorSpeed;};}
PrismaticConstraint.prototype=new Constraint();var worldAxisA=vec2.create(),worldAnchorA=vec2.create(),worldAnchorB=vec2.create(),orientedAnchorA=vec2.create(),orientedAnchorB=vec2.create(),tmp=vec2.create();PrismaticConstraint.prototype.update=function(){var eqs=this.equations,trans=eqs[0],upperLimit=this.upperLimit,lowerLimit=this.lowerLimit,upperLimitEquation=this.upperLimitEquation,lowerLimitEquation=this.lowerLimitEquation,bodyA=this.bodyA,bodyB=this.bodyB,localAxisA=this.localAxisA,localAnchorA=this.localAnchorA,localAnchorB=this.localAnchorB;trans.updateJacobian();vec2.rotate(worldAxisA,localAxisA,bodyA.angle);vec2.rotate(orientedAnchorA,localAnchorA,bodyA.angle);vec2.add(worldAnchorA,orientedAnchorA,bodyA.position);vec2.rotate(orientedAnchorB,localAnchorB,bodyB.angle);vec2.add(worldAnchorB,orientedAnchorB,bodyB.position);var relPosition=this.position=vec2.dot(worldAnchorB,worldAxisA)-vec2.dot(worldAnchorA,worldAxisA);if(this.motorEnabled){var G=this.motorEquation.G;G[0]=worldAxisA[0];G[1]=worldAxisA[1];G[2]=vec2.crossLength(worldAxisA,orientedAnchorB);G[3]=-worldAxisA[0];G[4]=-worldAxisA[1];G[5]=-vec2.crossLength(worldAxisA,orientedAnchorA);}
if(this.upperLimitEnabled&&relPosition>upperLimit){vec2.scale(upperLimitEquation.normalA,worldAxisA,-1);vec2.sub(upperLimitEquation.contactPointA,worldAnchorA,bodyA.position);vec2.sub(upperLimitEquation.contactPointB,worldAnchorB,bodyB.position);vec2.scale(tmp,worldAxisA,upperLimit);vec2.add(upperLimitEquation.contactPointA,upperLimitEquation.contactPointA,tmp);if(eqs.indexOf(upperLimitEquation)==-1)
eqs.push(upperLimitEquation);}else{var idx=eqs.indexOf(upperLimitEquation);if(idx!=-1)eqs.splice(idx,1);}
if(this.lowerLimitEnabled&&relPosition<lowerLimit){vec2.scale(lowerLimitEquation.normalA,worldAxisA,1);vec2.sub(lowerLimitEquation.contactPointA,worldAnchorA,bodyA.position);vec2.sub(lowerLimitEquation.contactPointB,worldAnchorB,bodyB.position);vec2.scale(tmp,worldAxisA,lowerLimit);vec2.sub(lowerLimitEquation.contactPointB,lowerLimitEquation.contactPointB,tmp);if(eqs.indexOf(lowerLimitEquation)==-1)
eqs.push(lowerLimitEquation);}else{var idx=eqs.indexOf(lowerLimitEquation);if(idx!=-1)eqs.splice(idx,1);}};PrismaticConstraint.prototype.enableMotor=function(){if(this.motorEnabled)return;this.equations.push(this.motorEquation);this.motorEnabled=true;};PrismaticConstraint.prototype.disableMotor=function(){if(!this.motorEnabled)return;var i=this.equations.indexOf(this.motorEquation);this.equations.splice(i,1);this.motorEnabled=false;};},{"../equations/ContactEquation":21,"../equations/Equation":22,"../equations/RotationalLockEquation":24,"../math/vec2":30,"./Constraint":14}],19:[function(require,module,exports){var Constraint=require('./Constraint'),Equation=require('../equations/Equation'),RotationalVelocityEquation=require('../equations/RotationalVelocityEquation'),RotationalLockEquation=require('../equations/RotationalLockEquation'),vec2=require('../math/vec2')
module.exports=RevoluteConstraint;var worldPivotA=vec2.create(),worldPivotB=vec2.create(),xAxis=vec2.fromValues(1,0),yAxis=vec2.fromValues(0,1),g=vec2.create();function RevoluteConstraint(bodyA,pivotA,bodyB,pivotB,options){options=options||{};Constraint.call(this,bodyA,bodyB,Constraint.REVOLUTE,options);var maxForce=this.maxForce=typeof(options.maxForce)!=="undefined"?options.maxForce:Number.MAX_VALUE;this.pivotA=vec2.fromValues(pivotA[0],pivotA[1]);this.pivotB=vec2.fromValues(pivotB[0],pivotB[1]);var eqs=this.equations=[new Equation(bodyA,bodyB,-maxForce,maxForce),new Equation(bodyA,bodyB,-maxForce,maxForce),];var x=eqs[0];var y=eqs[1];var that=this;x.computeGq=function(){vec2.rotate(worldPivotA,that.pivotA,bodyA.angle);vec2.rotate(worldPivotB,that.pivotB,bodyB.angle);vec2.add(g,bodyB.position,worldPivotB);vec2.sub(g,g,bodyA.position);vec2.sub(g,g,worldPivotA);return vec2.dot(g,xAxis);};y.computeGq=function(){vec2.rotate(worldPivotA,that.pivotA,bodyA.angle);vec2.rotate(worldPivotB,that.pivotB,bodyB.angle);vec2.add(g,bodyB.position,worldPivotB);vec2.sub(g,g,bodyA.position);vec2.sub(g,g,worldPivotA);return vec2.dot(g,yAxis);};y.minForce=x.minForce=-maxForce;y.maxForce=x.maxForce=maxForce;this.motorEquation=new RotationalVelocityEquation(bodyA,bodyB);this.motorEnabled=false;this.angle=0;this.lowerLimitEnabled=false;this.upperLimitEnabled=false;this.lowerLimit=0;this.upperLimit=0;this.upperLimitEquation=new RotationalLockEquation(bodyA,bodyB);this.lowerLimitEquation=new RotationalLockEquation(bodyA,bodyB);this.upperLimitEquation.minForce=0;this.lowerLimitEquation.maxForce=0;}
RevoluteConstraint.prototype=new Constraint();RevoluteConstraint.prototype.update=function(){var bodyA=this.bodyA,bodyB=this.bodyB,pivotA=this.pivotA,pivotB=this.pivotB,eqs=this.equations,normal=eqs[0],tangent=eqs[1],x=eqs[0],y=eqs[1],upperLimit=this.upperLimit,lowerLimit=this.lowerLimit,upperLimitEquation=this.upperLimitEquation,lowerLimitEquation=this.lowerLimitEquation;var relAngle=this.angle=bodyB.angle-bodyA.angle;if(this.upperLimitEnabled&&relAngle>upperLimit){upperLimitEquation.angle=upperLimit;if(eqs.indexOf(upperLimitEquation)==-1)
eqs.push(upperLimitEquation);}else{var idx=eqs.indexOf(upperLimitEquation);if(idx!=-1)eqs.splice(idx,1);}
if(this.lowerLimitEnabled&&relAngle<lowerLimit){lowerLimitEquation.angle=lowerLimit;if(eqs.indexOf(lowerLimitEquation)==-1)
eqs.push(lowerLimitEquation);}else{var idx=eqs.indexOf(lowerLimitEquation);if(idx!=-1)eqs.splice(idx,1);}
vec2.rotate(worldPivotA,pivotA,bodyA.angle);vec2.rotate(worldPivotB,pivotB,bodyB.angle);x.G[0]=-1;x.G[1]=0;x.G[2]=-vec2.crossLength(worldPivotA,xAxis);x.G[3]=1;x.G[4]=0;x.G[5]=vec2.crossLength(worldPivotB,xAxis);y.G[0]=0;y.G[1]=-1;y.G[2]=-vec2.crossLength(worldPivotA,yAxis);y.G[3]=0;y.G[4]=1;y.G[5]=vec2.crossLength(worldPivotB,yAxis);};RevoluteConstraint.prototype.enableMotor=function(){if(this.motorEnabled)return;this.equations.push(this.motorEquation);this.motorEnabled=true;};RevoluteConstraint.prototype.disableMotor=function(){if(!this.motorEnabled)return;var i=this.equations.indexOf(this.motorEquation);this.equations.splice(i,1);this.motorEnabled=false;};RevoluteConstraint.prototype.motorIsEnabled=function(){return!!this.motorEnabled;};RevoluteConstraint.prototype.setMotorSpeed=function(speed){if(!this.motorEnabled){return;}
var i=this.equations.indexOf(this.motorEquation);this.equations[i].relativeVelocity=speed;};RevoluteConstraint.prototype.getMotorSpeed=function(){if(!this.motorEnabled)return false;return this.motorEquation.relativeVelocity;};},{"../equations/Equation":22,"../equations/RotationalLockEquation":24,"../equations/RotationalVelocityEquation":25,"../math/vec2":30,"./Constraint":14}],20:[function(require,module,exports){var Equation=require("./Equation"),vec2=require('../math/vec2');module.exports=AngleLockEquation;function AngleLockEquation(bodyA,bodyB,options){options=options||{};Equation.call(this,bodyA,bodyB,-Number.MAX_VALUE,Number.MAX_VALUE);this.angle=options.angle||0;this.ratio=typeof(options.ratio)==="number"?options.ratio:1;this.setRatio(this.ratio);}
AngleLockEquation.prototype=new Equation();AngleLockEquation.prototype.constructor=AngleLockEquation;AngleLockEquation.prototype.computeGq=function(){return this.ratio*this.bodyA.angle-this.bodyB.angle+this.angle;};AngleLockEquation.prototype.setRatio=function(ratio){var G=this.G;G[2]=ratio;G[5]=-1;this.ratio=ratio;};AngleLockEquation.prototype.setMaxTorque=function(torque){this.maxForce=torque;this.minForce=-torque;};},{"../math/vec2":30,"./Equation":22}],21:[function(require,module,exports){var Equation=require("./Equation"),vec2=require('../math/vec2');module.exports=ContactEquation;function ContactEquation(bodyA,bodyB){Equation.call(this,bodyA,bodyB,0,Number.MAX_VALUE);this.contactPointA=vec2.create();this.penetrationVec=vec2.create();this.contactPointB=vec2.create();this.normalA=vec2.create();this.restitution=0;this.firstImpact=false;this.shapeA=null;this.shapeB=null;}
ContactEquation.prototype=new Equation();ContactEquation.prototype.constructor=ContactEquation;ContactEquation.prototype.computeB=function(a,b,h){var bi=this.bodyA,bj=this.bodyB,ri=this.contactPointA,rj=this.contactPointB,xi=bi.position,xj=bj.position;var penetrationVec=this.penetrationVec,n=this.normalA,G=this.G;var rixn=vec2.crossLength(ri,n),rjxn=vec2.crossLength(rj,n);G[0]=-n[0];G[1]=-n[1];G[2]=-rixn;G[3]=n[0];G[4]=n[1];G[5]=rjxn;vec2.add(penetrationVec,xj,rj);vec2.sub(penetrationVec,penetrationVec,xi);vec2.sub(penetrationVec,penetrationVec,ri);var GW,Gq;if(this.firstImpact&&this.restitution!==0){Gq=0;GW=(1/b)*(1+this.restitution)*this.computeGW();}else{Gq=vec2.dot(n,penetrationVec);GW=this.computeGW();}
var GiMf=this.computeGiMf();var B=-Gq*a-GW*b-h*GiMf;return B;};},{"../math/vec2":30,"./Equation":22}],22:[function(require,module,exports){module.exports=Equation;var vec2=require('../math/vec2'),Utils=require('../utils/Utils'),Body=require('../objects/Body');function Equation(bodyA,bodyB,minForce,maxForce){this.minForce=typeof(minForce)==="undefined"?-Number.MAX_VALUE:minForce;this.maxForce=typeof(maxForce)==="undefined"?Number.MAX_VALUE:maxForce;this.bodyA=bodyA;this.bodyB=bodyB;this.stiffness=Equation.DEFAULT_STIFFNESS;this.relaxation=Equation.DEFAULT_RELAXATION;this.G=new Utils.ARRAY_TYPE(6);for(var i=0;i<6;i++){this.G[i]=0;}
this.offset=0;this.a=0;this.b=0;this.epsilon=0;this.timeStep=1/60;this.needsUpdate=true;this.multiplier=0;this.relativeVelocity=0;this.enabled=true;}
Equation.prototype.constructor=Equation;Equation.DEFAULT_STIFFNESS=1e6;Equation.DEFAULT_RELAXATION=4;Equation.prototype.update=function(){var k=this.stiffness,d=this.relaxation,h=this.timeStep;this.a=4.0/(h*(1+4*d));this.b=(4.0*d)/(1+4*d);this.epsilon=4.0/(h*h*k*(1+4*d));this.needsUpdate=false;};function Gmult(G,vi,wi,vj,wj){return G[0]*vi[0]+
G[1]*vi[1]+
G[2]*wi+
G[3]*vj[0]+
G[4]*vj[1]+
G[5]*wj;}
Equation.prototype.computeB=function(a,b,h){var GW=this.computeGW();var Gq=this.computeGq();var GiMf=this.computeGiMf();return-Gq*a-GW*b-GiMf*h;};var qi=vec2.create(),qj=vec2.create();Equation.prototype.computeGq=function(){var G=this.G,bi=this.bodyA,bj=this.bodyB,xi=bi.position,xj=bj.position,ai=bi.angle,aj=bj.angle;return Gmult(G,qi,ai,qj,aj)+this.offset;};Equation.prototype.computeGW=function(){var G=this.G,bi=this.bodyA,bj=this.bodyB,vi=bi.velocity,vj=bj.velocity,wi=bi.angularVelocity,wj=bj.angularVelocity;return Gmult(G,vi,wi,vj,wj)+this.relativeVelocity;};Equation.prototype.computeGWlambda=function(){var G=this.G,bi=this.bodyA,bj=this.bodyB,vi=bi.vlambda,vj=bj.vlambda,wi=bi.wlambda,wj=bj.wlambda;return Gmult(G,vi,wi,vj,wj);};var iMfi=vec2.create(),iMfj=vec2.create();Equation.prototype.computeGiMf=function(){var bi=this.bodyA,bj=this.bodyB,fi=bi.force,ti=bi.angularForce,fj=bj.force,tj=bj.angularForce,invMassi=getBodyInvMass(bi),invMassj=getBodyInvMass(bj),invIi=getBodyInvInertia(bi),invIj=getBodyInvInertia(bj),G=this.G;vec2.scale(iMfi,fi,invMassi);vec2.scale(iMfj,fj,invMassj);return Gmult(G,iMfi,ti*invIi,iMfj,tj*invIj);};function getBodyInvMass(body){if(body.sleepState===Body.SLEEPING){return 0;}else{return body.invMass;}}
function getBodyInvInertia(body){if(body.sleepState===Body.SLEEPING){return 0;}else{return body.invInertia;}}
Equation.prototype.computeGiMGt=function(){var bi=this.bodyA,bj=this.bodyB,invMassi=getBodyInvMass(bi),invMassj=getBodyInvMass(bj),invIi=getBodyInvInertia(bi),invIj=getBodyInvInertia(bj),G=this.G;return G[0]*G[0]*invMassi+
G[1]*G[1]*invMassi+
G[2]*G[2]*invIi+
G[3]*G[3]*invMassj+
G[4]*G[4]*invMassj+
G[5]*G[5]*invIj;};var addToWlambda_temp=vec2.create(),addToWlambda_Gi=vec2.create(),addToWlambda_Gj=vec2.create(),addToWlambda_ri=vec2.create(),addToWlambda_rj=vec2.create(),addToWlambda_Mdiag=vec2.create();Equation.prototype.addToWlambda=function(deltalambda){var bi=this.bodyA,bj=this.bodyB,temp=addToWlambda_temp,Gi=addToWlambda_Gi,Gj=addToWlambda_Gj,ri=addToWlambda_ri,rj=addToWlambda_rj,invMassi=getBodyInvMass(bi),invMassj=getBodyInvMass(bj),invIi=getBodyInvInertia(bi),invIj=getBodyInvInertia(bj),Mdiag=addToWlambda_Mdiag,G=this.G;Gi[0]=G[0];Gi[1]=G[1];Gj[0]=G[3];Gj[1]=G[4];vec2.scale(temp,Gi,invMassi*deltalambda);vec2.add(bi.vlambda,bi.vlambda,temp);bi.wlambda+=invIi*G[2]*deltalambda;vec2.scale(temp,Gj,invMassj*deltalambda);vec2.add(bj.vlambda,bj.vlambda,temp);bj.wlambda+=invIj*G[5]*deltalambda;};Equation.prototype.computeInvC=function(eps){return 1.0/(this.computeGiMGt()+eps);};},{"../math/vec2":30,"../objects/Body":31,"../utils/Utils":47}],23:[function(require,module,exports){var vec2=require('../math/vec2'),Equation=require('./Equation'),Utils=require('../utils/Utils');module.exports=FrictionEquation;function FrictionEquation(bodyA,bodyB,slipForce){Equation.call(this,bodyA,bodyB,-slipForce,slipForce);this.contactPointA=vec2.create();this.contactPointB=vec2.create();this.t=vec2.create();this.contactEquation=null;this.shapeA=null;this.shapeB=null;this.frictionCoefficient=0.3;}
FrictionEquation.prototype=new Equation();FrictionEquation.prototype.constructor=FrictionEquation;FrictionEquation.prototype.setSlipForce=function(slipForce){this.maxForce=slipForce;this.minForce=-slipForce;};FrictionEquation.prototype.getSlipForce=function(){return this.maxForce;};FrictionEquation.prototype.computeB=function(a,b,h){var bi=this.bodyA,bj=this.bodyB,ri=this.contactPointA,rj=this.contactPointB,t=this.t,G=this.G;G[0]=-t[0];G[1]=-t[1];G[2]=-vec2.crossLength(ri,t);G[3]=t[0];G[4]=t[1];G[5]=vec2.crossLength(rj,t);var GW=this.computeGW(),GiMf=this.computeGiMf();var B=-GW*b-h*GiMf;return B;};},{"../math/vec2":30,"../utils/Utils":47,"./Equation":22}],24:[function(require,module,exports){var Equation=require("./Equation"),vec2=require('../math/vec2');module.exports=RotationalLockEquation;function RotationalLockEquation(bodyA,bodyB,options){options=options||{};Equation.call(this,bodyA,bodyB,-Number.MAX_VALUE,Number.MAX_VALUE);this.angle=options.angle||0;var G=this.G;G[2]=1;G[5]=-1;}
RotationalLockEquation.prototype=new Equation();RotationalLockEquation.prototype.constructor=RotationalLockEquation;var worldVectorA=vec2.create(),worldVectorB=vec2.create(),xAxis=vec2.fromValues(1,0),yAxis=vec2.fromValues(0,1);RotationalLockEquation.prototype.computeGq=function(){vec2.rotate(worldVectorA,xAxis,this.bodyA.angle+this.angle);vec2.rotate(worldVectorB,yAxis,this.bodyB.angle);return vec2.dot(worldVectorA,worldVectorB);};},{"../math/vec2":30,"./Equation":22}],25:[function(require,module,exports){var Equation=require("./Equation"),vec2=require('../math/vec2');module.exports=RotationalVelocityEquation;function RotationalVelocityEquation(bodyA,bodyB){Equation.call(this,bodyA,bodyB,-Number.MAX_VALUE,Number.MAX_VALUE);this.relativeVelocity=1;this.ratio=1;}
RotationalVelocityEquation.prototype=new Equation();RotationalVelocityEquation.prototype.constructor=RotationalVelocityEquation;RotationalVelocityEquation.prototype.computeB=function(a,b,h){var G=this.G;G[2]=-1;G[5]=this.ratio;var GiMf=this.computeGiMf();var GW=this.computeGW();var B=-GW*b-h*GiMf;return B;};},{"../math/vec2":30,"./Equation":22}],26:[function(require,module,exports){var EventEmitter=function(){}
module.exports=EventEmitter;EventEmitter.prototype={constructor:EventEmitter,on:function(type,listener,context){listener.context=context||this;if(this._listeners===undefined)this._listeners={};var listeners=this._listeners;if(listeners[type]===undefined){listeners[type]=[];}
if(listeners[type].indexOf(listener)===-1){listeners[type].push(listener);}
return this;},has:function(type,listener){if(this._listeners===undefined)return false;var listeners=this._listeners;if(listener){if(listeners[type]!==undefined&&listeners[type].indexOf(listener)!==-1){return true;}}else{if(listeners[type]!==undefined){return true;}}
return false;},off:function(type,listener){if(this._listeners===undefined)return this;var listeners=this._listeners;var index=listeners[type].indexOf(listener);if(index!==-1){listeners[type].splice(index,1);}
return this;},emit:function(event){if(this._listeners===undefined)return this;var listeners=this._listeners;var listenerArray=listeners[event.type];if(listenerArray!==undefined){event.target=this;for(var i=0,l=listenerArray.length;i<l;i++){var listener=listenerArray[i];listener.call(listener.context,event);}}
return this;}};},{}],27:[function(require,module,exports){var Material=require('./Material');var Equation=require('../equations/Equation');module.exports=ContactMaterial;function ContactMaterial(materialA,materialB,options){options=options||{};if(!(materialA instanceof Material)||!(materialB instanceof Material))
throw new Error("First two arguments must be Material instances.");this.id=ContactMaterial.idCounter++;this.materialA=materialA;this.materialB=materialB;this.friction=typeof(options.friction)!=="undefined"?Number(options.friction):0.3;this.restitution=typeof(options.restitution)!=="undefined"?Number(options.restitution):0.0;this.stiffness=typeof(options.stiffness)!=="undefined"?Number(options.stiffness):Equation.DEFAULT_STIFFNESS;this.relaxation=typeof(options.relaxation)!=="undefined"?Number(options.relaxation):Equation.DEFAULT_RELAXATION;this.frictionStiffness=typeof(options.frictionStiffness)!=="undefined"?Number(options.frictionStiffness):Equation.DEFAULT_STIFFNESS;this.frictionRelaxation=typeof(options.frictionRelaxation)!=="undefined"?Number(options.frictionRelaxation):Equation.DEFAULT_RELAXATION;this.surfaceVelocity=typeof(options.surfaceVelocity)!=="undefined"?Number(options.surfaceVelocity):0;}
ContactMaterial.idCounter=0;},{"../equations/Equation":22,"./Material":28}],28:[function(require,module,exports){module.exports=Material;function Material(){this.id=Material.idCounter++;};Material.idCounter=0;},{}],29:[function(require,module,exports){var PolyK={};PolyK.GetArea=function(p)
{if(p.length<6)return 0;var l=p.length-2;var sum=0;for(var i=0;i<l;i+=2)
sum+=(p[i+2]-p[i])*(p[i+1]+p[i+3]);sum+=(p[0]-p[l])*(p[l+1]+p[1]);return-sum*0.5;}
PolyK.Triangulate=function(p)
{var n=p.length>>1;if(n<3)return[];var tgs=[];var avl=[];for(var i=0;i<n;i++)avl.push(i);var i=0;var al=n;while(al>3)
{var i0=avl[(i+0)%al];var i1=avl[(i+1)%al];var i2=avl[(i+2)%al];var ax=p[2*i0],ay=p[2*i0+1];var bx=p[2*i1],by=p[2*i1+1];var cx=p[2*i2],cy=p[2*i2+1];var earFound=false;if(PolyK._convex(ax,ay,bx,by,cx,cy))
{earFound=true;for(var j=0;j<al;j++)
{var vi=avl[j];if(vi==i0||vi==i1||vi==i2)continue;if(PolyK._PointInTriangle(p[2*vi],p[2*vi+1],ax,ay,bx,by,cx,cy)){earFound=false;break;}}}
if(earFound)
{tgs.push(i0,i1,i2);avl.splice((i+1)%al,1);al--;i=0;}
else if(i++>3*al)break;}
tgs.push(avl[0],avl[1],avl[2]);return tgs;}
PolyK._PointInTriangle=function(px,py,ax,ay,bx,by,cx,cy)
{var v0x=cx-ax;var v0y=cy-ay;var v1x=bx-ax;var v1y=by-ay;var v2x=px-ax;var v2y=py-ay;var dot00=v0x*v0x+v0y*v0y;var dot01=v0x*v1x+v0y*v1y;var dot02=v0x*v2x+v0y*v2y;var dot11=v1x*v1x+v1y*v1y;var dot12=v1x*v2x+v1y*v2y;var invDenom=1/(dot00*dot11-dot01*dot01);var u=(dot11*dot02-dot01*dot12)*invDenom;var v=(dot00*dot12-dot01*dot02)*invDenom;return(u>=0)&&(v>=0)&&(u+v<1);}
PolyK._convex=function(ax,ay,bx,by,cx,cy)
{return(ay-by)*(cx-bx)+(bx-ax)*(cy-by)>=0;}
module.exports=PolyK;},{}],30:[function(require,module,exports){var vec2=require('../../build/vec2').vec2;vec2.crossLength=function(a,b){return a[0]*b[1]-a[1]*b[0];};vec2.crossVZ=function(out,vec,zcomp){vec2.rotate(out,vec,-Math.PI/2);vec2.scale(out,out,zcomp);return out;};vec2.crossZV=function(out,zcomp,vec){vec2.rotate(out,vec,Math.PI/2);vec2.scale(out,out,zcomp);return out;};vec2.rotate=function(out,a,angle){var c=Math.cos(angle),s=Math.sin(angle),x=a[0],y=a[1];out[0]=c*x-s*y;out[1]=s*x+c*y;};vec2.rotate90cw=function(out,a){out[0]=a[1];out[1]=-a[0];};vec2.toLocalFrame=function(out,worldPoint,framePosition,frameAngle){vec2.copy(out,worldPoint);vec2.sub(out,out,framePosition);vec2.rotate(out,out,-frameAngle);};vec2.toGlobalFrame=function(out,localPoint,framePosition,frameAngle){vec2.copy(out,localPoint);vec2.rotate(out,out,frameAngle);vec2.add(out,out,framePosition);};vec2.centroid=function(out,a,b,c){vec2.add(out,a,b);vec2.add(out,out,c);vec2.scale(out,out,1/3);return out;};module.exports=vec2;},{"../../build/vec2":1}],31:[function(require,module,exports){var vec2=require('../math/vec2'),decomp=require('poly-decomp'),Convex=require('../shapes/Convex'),AABB=require('../collision/AABB'),EventEmitter=require('../events/EventEmitter')
module.exports=Body;function Body(options){options=options||{};EventEmitter.call(this);this.id=++Body._idCounter;this.world=null;this.shapes=[];this.shapeOffsets=[];this.shapeAngles=[];this.mass=options.mass||0;this.invMass=0;this.inertia=0;this.invInertia=0;this.fixedRotation=!!options.fixedRotation||false;this.position=vec2.fromValues(0,0);if(options.position){vec2.copy(this.position,options.position);}
this.interpolatedPosition=vec2.fromValues(0,0);this.interpolatedAngle=0;this.previousPosition=vec2.fromValues(0,0);this.previousAngle=0;this.velocity=vec2.fromValues(0,0);if(options.velocity){vec2.copy(this.velocity,options.velocity);}
this.vlambda=vec2.fromValues(0,0);this.wlambda=0;this.angle=options.angle||0;this.angularVelocity=options.angularVelocity||0;this.force=vec2.create();if(options.force)vec2.copy(this.force,options.force);this.angularForce=options.angularForce||0;this.damping=typeof(options.damping)=="number"?options.damping:0.1;this.angularDamping=typeof(options.angularDamping)=="number"?options.angularDamping:0.1;this.motionState=this.mass===0?Body.STATIC:Body.DYNAMIC;this.boundingRadius=0;this.aabb=new AABB();this.aabbNeedsUpdate=true;this.allowSleep=true;this.wantsToSleep=false;this.sleepState=Body.AWAKE;this.sleepSpeedLimit=0.2;this.sleepTimeLimit=1;this.gravityScale=1;this.timeLastSleepy=0;this.concavePath=null;this.lastDampingScale=1;this.lastAngularDampingScale=1;this.lastDampingTimeStep=-1;this._wakeUpAfterNarrowphase=false;this.updateMassProperties();}
Body.prototype=new EventEmitter();Body._idCounter=0;Body.prototype.setDensity=function(density){var totalArea=this.getArea();this.mass=totalArea*density;this.updateMassProperties();};Body.prototype.getArea=function(){var totalArea=0;for(var i=0;i<this.shapes.length;i++){totalArea+=this.shapes[i].area;}
return totalArea;};var shapeAABB=new AABB(),tmp=vec2.create();Body.prototype.updateAABB=function(){var shapes=this.shapes,shapeOffsets=this.shapeOffsets,shapeAngles=this.shapeAngles,N=shapes.length;for(var i=0;i!==N;i++){var shape=shapes[i],offset=tmp,angle=shapeAngles[i]+this.angle;vec2.rotate(offset,shapeOffsets[i],this.angle);vec2.add(offset,offset,this.position);shape.computeAABB(shapeAABB,offset,angle);if(i===0)
this.aabb.copy(shapeAABB);else
this.aabb.extend(shapeAABB);}
this.aabbNeedsUpdate=false;};Body.prototype.updateBoundingRadius=function(){var shapes=this.shapes,shapeOffsets=this.shapeOffsets,N=shapes.length,radius=0;for(var i=0;i!==N;i++){var shape=shapes[i],offset=vec2.length(shapeOffsets[i]),r=shape.boundingRadius;if(offset+r>radius){radius=offset+r;}}
this.boundingRadius=radius;};Body.prototype.addShape=function(shape,offset,angle){angle=angle||0.0;if(offset){offset=vec2.fromValues(offset[0],offset[1]);}else{offset=vec2.fromValues(0,0);}
this.shapes.push(shape);this.shapeOffsets.push(offset);this.shapeAngles.push(angle);this.updateMassProperties();this.updateBoundingRadius();this.aabbNeedsUpdate=true;};Body.prototype.removeShape=function(shape){var idx=this.shapes.indexOf(shape);if(idx!==-1){this.shapes.splice(idx,1);this.shapeOffsets.splice(idx,1);this.shapeAngles.splice(idx,1);this.aabbNeedsUpdate=true;return true;}else{return false;}};Body.prototype.updateMassProperties=function(){if(this.motionState===Body.STATIC||this.motionState===Body.KINEMATIC){this.mass=Number.MAX_VALUE;this.invMass=0;this.inertia=Number.MAX_VALUE;this.invInertia=0;}else{var shapes=this.shapes,N=shapes.length,m=this.mass/N,I=0;if(!this.fixedRotation){for(var i=0;i<N;i++){var shape=shapes[i],r2=vec2.squaredLength(this.shapeOffsets[i]),Icm=shape.computeMomentOfInertia(m);I+=Icm+m*r2;}
this.inertia=I;this.invInertia=I>0?1/I:0;}else{this.inertia=Number.MAX_VALUE;this.invInertia=0;}
this.invMass=1/this.mass;}};var Body_applyForce_r=vec2.create();Body.prototype.applyForce=function(force,worldPoint){var r=Body_applyForce_r;vec2.sub(r,worldPoint,this.position);vec2.add(this.force,this.force,force);var rotForce=vec2.crossLength(r,force);this.angularForce+=rotForce;};Body.prototype.toLocalFrame=function(out,worldPoint){vec2.toLocalFrame(out,worldPoint,this.position,this.angle);};Body.prototype.toWorldFrame=function(out,localPoint){vec2.toGlobalFrame(out,localPoint,this.position,this.angle);};Body.prototype.fromPolygon=function(path,options){options=options||{};for(var i=this.shapes.length;i>=0;--i)
this.removeShape(this.shapes[i]);var p=new decomp.Polygon();p.vertices=path;p.makeCCW();if(typeof(options.removeCollinearPoints)=="number"){p.removeCollinearPoints(options.removeCollinearPoints);}
if(typeof(options.skipSimpleCheck)=="undefined"){if(!p.isSimple())return false;}
this.concavePath=p.vertices.slice(0);for(var i=0;i<this.concavePath.length;i++){var v=[0,0];vec2.copy(v,this.concavePath[i]);this.concavePath[i]=v;}
var convexes;if(options.optimalDecomp)convexes=p.decomp();else convexes=p.quickDecomp();var cm=vec2.create();for(var i=0;i!==convexes.length;i++){var c=new Convex(convexes[i].vertices);for(var j=0;j!==c.vertices.length;j++){var v=c.vertices[j];vec2.sub(v,v,c.centerOfMass);}
vec2.scale(cm,c.centerOfMass,1);c.updateTriangles();c.updateCenterOfMass();c.updateBoundingRadius();this.addShape(c,cm);}
this.adjustCenterOfMass();this.aabbNeedsUpdate=true;return true;};var adjustCenterOfMass_tmp1=vec2.fromValues(0,0),adjustCenterOfMass_tmp2=vec2.fromValues(0,0),adjustCenterOfMass_tmp3=vec2.fromValues(0,0),adjustCenterOfMass_tmp4=vec2.fromValues(0,0);Body.prototype.adjustCenterOfMass=function(){var offset_times_area=adjustCenterOfMass_tmp2,sum=adjustCenterOfMass_tmp3,cm=adjustCenterOfMass_tmp4,totalArea=0;vec2.set(sum,0,0);for(var i=0;i!==this.shapes.length;i++){var s=this.shapes[i],offset=this.shapeOffsets[i];vec2.scale(offset_times_area,offset,s.area);vec2.add(sum,sum,offset_times_area);totalArea+=s.area;}
vec2.scale(cm,sum,1/totalArea);for(var i=0;i!==this.shapes.length;i++){var s=this.shapes[i],offset=this.shapeOffsets[i];if(!offset){offset=this.shapeOffsets[i]=vec2.create();}
vec2.sub(offset,offset,cm);}
vec2.add(this.position,this.position,cm);for(var i=0;this.concavePath&&i<this.concavePath.length;i++){vec2.sub(this.concavePath[i],this.concavePath[i],cm);}
this.updateMassProperties();this.updateBoundingRadius();};Body.prototype.setZeroForce=function(){vec2.set(this.force,0.0,0.0);this.angularForce=0.0;};Body.prototype.resetConstraintVelocity=function(){var b=this,vlambda=b.vlambda;vec2.set(vlambda,0,0);b.wlambda=0;};Body.prototype.addConstraintVelocity=function(){var b=this,v=b.velocity;vec2.add(v,v,b.vlambda);b.angularVelocity+=b.wlambda;};Body.prototype.applyDamping=function(dt){if(this.motionState===Body.DYNAMIC){if(dt!==this.lastDampingTimeStep){this.lastDampingScale=Math.pow(1.0-this.damping,dt);this.lastAngularDampingScale=Math.pow(1.0-this.angularDamping,dt);this.lastDampingTimeStep=dt;}
var v=this.velocity;vec2.scale(v,v,this.lastDampingScale);this.angularVelocity*=this.lastAngularDampingScale;}};Body.prototype.wakeUp=function(){var s=this.sleepState;this.sleepState=Body.AWAKE;this.idleTime=0;if(s!==Body.AWAKE){this.emit(Body.wakeUpEvent);}};Body.prototype.sleep=function(){this.sleepState=Body.SLEEPING;this.angularVelocity=0;this.angularForce=0;vec2.set(this.velocity,0,0);vec2.set(this.force,0,0);this.emit(Body.sleepEvent);};Body.prototype.sleepTick=function(time,dontSleep,dt){if(!this.allowSleep||this.motionState===Body.SLEEPING){return;}
this.wantsToSleep=false;var sleepState=this.sleepState,speedSquared=vec2.squaredLength(this.velocity)+Math.pow(this.angularVelocity,2),speedLimitSquared=Math.pow(this.sleepSpeedLimit,2);if(speedSquared>=speedLimitSquared){this.idleTime=0;this.sleepState=Body.AWAKE;}else{this.idleTime+=dt;this.sleepState=Body.SLEEPY;}
if(this.idleTime>this.sleepTimeLimit){if(!dontSleep){this.sleep();}else{this.wantsToSleep=true;}}};Body.prototype.getVelocityFromPosition=function(store,timeStep){store=store||vec2.create();vec2.sub(store,this.position,this.previousPosition);vec2.scale(store,store,1/timeStep);return store;};Body.prototype.getAngularVelocityFromPosition=function(timeStep){return(this.angle-this.previousAngle)/timeStep;};Body.sleepyEvent={type:"sleepy"};Body.sleepEvent={type:"sleep"};Body.wakeUpEvent={type:"wakeup"};Body.DYNAMIC=1;Body.STATIC=2;Body.KINEMATIC=4;Body.AWAKE=0;Body.SLEEPY=1;Body.SLEEPING=2;},{"../collision/AABB":8,"../events/EventEmitter":26,"../math/vec2":30,"../shapes/Convex":36,"poly-decomp":6}],32:[function(require,module,exports){var vec2=require('../math/vec2');var Utils=require('../utils/Utils');module.exports=Spring;function Spring(bodyA,bodyB,options){options=Utils.defaults(options,{restLength:1,stiffness:100,damping:1,localAnchorA:[0,0],localAnchorB:[0,0],});this.restLength=options.restLength;this.stiffness=options.stiffness;this.damping=options.damping;this.bodyA=bodyA;this.bodyB=bodyB;this.localAnchorA=vec2.create();vec2.copy(this.localAnchorA,options.localAnchorA);this.localAnchorB=vec2.create();vec2.copy(this.localAnchorB,options.localAnchorB);if(options.worldAnchorA){this.setWorldAnchorA(options.worldAnchorA);}
if(options.worldAnchorB){this.setWorldAnchorB(options.worldAnchorB);}}
Spring.prototype.setWorldAnchorA=function(worldAnchorA){this.bodyA.toLocalFrame(this.localAnchorA,worldAnchorA);};Spring.prototype.setWorldAnchorB=function(worldAnchorB){this.bodyB.toLocalFrame(this.localAnchorB,worldAnchorB);};Spring.prototype.getWorldAnchorA=function(result){this.bodyA.toWorldFrame(result,this.localAnchorA);};Spring.prototype.getWorldAnchorB=function(result){this.bodyB.toWorldFrame(result,this.localAnchorB);};var applyForce_r=vec2.create(),applyForce_r_unit=vec2.create(),applyForce_u=vec2.create(),applyForce_f=vec2.create(),applyForce_worldAnchorA=vec2.create(),applyForce_worldAnchorB=vec2.create(),applyForce_ri=vec2.create(),applyForce_rj=vec2.create(),applyForce_tmp=vec2.create();Spring.prototype.applyForce=function(){var k=this.stiffness,d=this.damping,l=this.restLength,bodyA=this.bodyA,bodyB=this.bodyB,r=applyForce_r,r_unit=applyForce_r_unit,u=applyForce_u,f=applyForce_f,tmp=applyForce_tmp;var worldAnchorA=applyForce_worldAnchorA,worldAnchorB=applyForce_worldAnchorB,ri=applyForce_ri,rj=applyForce_rj;this.getWorldAnchorA(worldAnchorA);this.getWorldAnchorB(worldAnchorB);vec2.sub(ri,worldAnchorA,bodyA.position);vec2.sub(rj,worldAnchorB,bodyB.position);vec2.sub(r,worldAnchorB,worldAnchorA);var rlen=vec2.len(r);vec2.normalize(r_unit,r);vec2.sub(u,bodyB.velocity,bodyA.velocity);vec2.crossZV(tmp,bodyB.angularVelocity,rj);vec2.add(u,u,tmp);vec2.crossZV(tmp,bodyA.angularVelocity,ri);vec2.sub(u,u,tmp);vec2.scale(f,r_unit,-k*(rlen-l)-d*vec2.dot(u,r_unit));vec2.sub(bodyA.force,bodyA.force,f);vec2.add(bodyB.force,bodyB.force,f);var ri_x_f=vec2.crossLength(ri,f);var rj_x_f=vec2.crossLength(rj,f);bodyA.angularForce-=ri_x_f;bodyB.angularForce+=rj_x_f;};},{"../math/vec2":30,"../utils/Utils":47}],33:[function(require,module,exports){module.exports={AABB:require('./collision/AABB'),AngleLockEquation:require('./equations/AngleLockEquation'),Body:require('./objects/Body'),Broadphase:require('./collision/Broadphase'),Capsule:require('./shapes/Capsule'),Circle:require('./shapes/Circle'),Constraint:require('./constraints/Constraint'),ContactEquation:require('./equations/ContactEquation'),ContactMaterial:require('./material/ContactMaterial'),Convex:require('./shapes/Convex'),DistanceConstraint:require('./constraints/DistanceConstraint'),Equation:require('./equations/Equation'),EventEmitter:require('./events/EventEmitter'),FrictionEquation:require('./equations/FrictionEquation'),GearConstraint:require('./constraints/GearConstraint'),GridBroadphase:require('./collision/GridBroadphase'),GSSolver:require('./solver/GSSolver'),Heightfield:require('./shapes/Heightfield'),Line:require('./shapes/Line'),LockConstraint:require('./constraints/LockConstraint'),Material:require('./material/Material'),Narrowphase:require('./collision/Narrowphase'),NaiveBroadphase:require('./collision/NaiveBroadphase'),Particle:require('./shapes/Particle'),Plane:require('./shapes/Plane'),RevoluteConstraint:require('./constraints/RevoluteConstraint'),PrismaticConstraint:require('./constraints/PrismaticConstraint'),Rectangle:require('./shapes/Rectangle'),RotationalVelocityEquation:require('./equations/RotationalVelocityEquation'),SAPBroadphase:require('./collision/SAPBroadphase'),Shape:require('./shapes/Shape'),Solver:require('./solver/Solver'),Spring:require('./objects/Spring'),Utils:require('./utils/Utils'),World:require('./world/World'),vec2:require('./math/vec2'),version:require('../package.json').version,};},{"../package.json":7,"./collision/AABB":8,"./collision/Broadphase":9,"./collision/GridBroadphase":10,"./collision/NaiveBroadphase":11,"./collision/Narrowphase":12,"./collision/SAPBroadphase":13,"./constraints/Constraint":14,"./constraints/DistanceConstraint":15,"./constraints/GearConstraint":16,"./constraints/LockConstraint":17,"./constraints/PrismaticConstraint":18,"./constraints/RevoluteConstraint":19,"./equations/AngleLockEquation":20,"./equations/ContactEquation":21,"./equations/Equation":22,"./equations/FrictionEquation":23,"./equations/RotationalVelocityEquation":25,"./events/EventEmitter":26,"./material/ContactMaterial":27,"./material/Material":28,"./math/vec2":30,"./objects/Body":31,"./objects/Spring":32,"./shapes/Capsule":34,"./shapes/Circle":35,"./shapes/Convex":36,"./shapes/Heightfield":37,"./shapes/Line":38,"./shapes/Particle":39,"./shapes/Plane":40,"./shapes/Rectangle":41,"./shapes/Shape":42,"./solver/GSSolver":43,"./solver/Solver":44,"./utils/Utils":47,"./world/World":51}],34:[function(require,module,exports){var Shape=require('./Shape'),vec2=require('../math/vec2');module.exports=Capsule;function Capsule(length,radius){this.length=length||1;this.radius=radius||1;Shape.call(this,Shape.CAPSULE);}
Capsule.prototype=new Shape();Capsule.prototype.computeMomentOfInertia=function(mass){var r=this.radius,w=this.length+r,h=r*2;return mass*(h*h+w*w)/12;};Capsule.prototype.updateBoundingRadius=function(){this.boundingRadius=this.radius+this.length/2;};Capsule.prototype.updateArea=function(){this.area=Math.PI*this.radius*this.radius+this.radius*2*this.length;};var r=vec2.create();Capsule.prototype.computeAABB=function(out,position,angle){var radius=this.radius;vec2.set(r,this.length,0);vec2.rotate(r,r,angle);vec2.set(out.upperBound,Math.max(r[0]+radius,-r[0]+radius),Math.max(r[1]+radius,-r[1]+radius));vec2.set(out.lowerBound,Math.min(r[0]-radius,-r[0]-radius),Math.min(r[1]-radius,-r[1]-radius));vec2.add(out.lowerBound,out.lowerBound,position);vec2.add(out.upperBound,out.upperBound,position);};},{"../math/vec2":30,"./Shape":42}],35:[function(require,module,exports){var Shape=require('./Shape'),vec2=require('../math/vec2')
module.exports=Circle;function Circle(radius){this.radius=radius||1;Shape.call(this,Shape.CIRCLE);};Circle.prototype=new Shape();Circle.prototype.computeMomentOfInertia=function(mass){var r=this.radius;return mass*r*r/2;};Circle.prototype.updateBoundingRadius=function(){this.boundingRadius=this.radius;};Circle.prototype.updateArea=function(){this.area=Math.PI*this.radius*this.radius;};Circle.prototype.computeAABB=function(out,position,angle){var r=this.radius;vec2.set(out.upperBound,r,r);vec2.set(out.lowerBound,-r,-r);if(position){vec2.add(out.lowerBound,out.lowerBound,position);vec2.add(out.upperBound,out.upperBound,position);}};},{"../math/vec2":30,"./Shape":42}],36:[function(require,module,exports){var Shape=require('./Shape'),vec2=require('../math/vec2'),polyk=require('../math/polyk'),decomp=require('poly-decomp')
module.exports=Convex;function Convex(vertices){this.vertices=[];for(var i=0;i<vertices.length;i++){var v=vec2.create();vec2.copy(v,vertices[i]);this.vertices.push(v);}
this.centerOfMass=vec2.fromValues(0,0);this.triangles=[];if(this.vertices.length){this.updateTriangles();this.updateCenterOfMass();}
this.boundingRadius=0;Shape.call(this,Shape.CONVEX);this.updateBoundingRadius();this.updateArea();if(this.area<0)
throw new Error("Convex vertices must be given in conter-clockwise winding.");};Convex.prototype=new Shape();Convex.prototype.updateTriangles=function(){this.triangles.length=0;var polykVerts=[];for(var i=0;i<this.vertices.length;i++){var v=this.vertices[i];polykVerts.push(v[0],v[1]);}
var triangles=polyk.Triangulate(polykVerts);for(var i=0;i<triangles.length;i+=3){var id1=triangles[i],id2=triangles[i+1],id3=triangles[i+2];this.triangles.push([id1,id2,id3]);}};var updateCenterOfMass_centroid=vec2.create(),updateCenterOfMass_centroid_times_mass=vec2.create(),updateCenterOfMass_a=vec2.create(),updateCenterOfMass_b=vec2.create(),updateCenterOfMass_c=vec2.create(),updateCenterOfMass_ac=vec2.create(),updateCenterOfMass_ca=vec2.create(),updateCenterOfMass_cb=vec2.create(),updateCenterOfMass_n=vec2.create();Convex.prototype.updateCenterOfMass=function(){var triangles=this.triangles,verts=this.vertices,cm=this.centerOfMass,centroid=updateCenterOfMass_centroid,n=updateCenterOfMass_n,a=updateCenterOfMass_a,b=updateCenterOfMass_b,c=updateCenterOfMass_c,ac=updateCenterOfMass_ac,ca=updateCenterOfMass_ca,cb=updateCenterOfMass_cb,centroid_times_mass=updateCenterOfMass_centroid_times_mass;vec2.set(cm,0,0);var totalArea=0;for(var i=0;i!==triangles.length;i++){var t=triangles[i],a=verts[t[0]],b=verts[t[1]],c=verts[t[2]];vec2.centroid(centroid,a,b,c);var m=Convex.triangleArea(a,b,c)
totalArea+=m;vec2.scale(centroid_times_mass,centroid,m);vec2.add(cm,cm,centroid_times_mass);}
vec2.scale(cm,cm,1/totalArea);};Convex.prototype.computeMomentOfInertia=function(mass){var denom=0.0,numer=0.0,N=this.vertices.length;for(var j=N-1,i=0;i<N;j=i,i++){var p0=this.vertices[j];var p1=this.vertices[i];var a=Math.abs(vec2.crossLength(p0,p1));var b=vec2.dot(p1,p1)+vec2.dot(p1,p0)+vec2.dot(p0,p0);denom+=a*b;numer+=a;}
return(mass/6.0)*(denom/numer);};Convex.prototype.updateBoundingRadius=function(){var verts=this.vertices,r2=0;for(var i=0;i!==verts.length;i++){var l2=vec2.squaredLength(verts[i]);if(l2>r2)r2=l2;}
this.boundingRadius=Math.sqrt(r2);};Convex.triangleArea=function(a,b,c){return(((b[0]-a[0])*(c[1]-a[1]))-((c[0]-a[0])*(b[1]-a[1])))*0.5;}
Convex.prototype.updateArea=function(){this.updateTriangles();this.area=0;var triangles=this.triangles,verts=this.vertices;for(var i=0;i!==triangles.length;i++){var t=triangles[i],a=verts[t[0]],b=verts[t[1]],c=verts[t[2]];var m=Convex.triangleArea(a,b,c);this.area+=m;}};Convex.prototype.computeAABB=function(out,position,angle){out.setFromPoints(this.vertices,position,angle);};},{"../math/polyk":29,"../math/vec2":30,"./Shape":42,"poly-decomp":6}],37:[function(require,module,exports){var Shape=require('./Shape'),vec2=require('../math/vec2'),Utils=require('../utils/Utils');module.exports=Heightfield;function Heightfield(data,options){options=Utils.defaults(options,{maxValue:null,minValue:null,elementWidth:0.1});if(options.minValue===null||options.maxValue===null){options.maxValue=data[0];options.minValue=data[0];for(var i=0;i!==data.length;i++){var v=data[i];if(v>options.maxValue){options.maxValue=v;}
if(v<options.minValue){options.minValue=v;}}}
this.data=data;this.maxValue=options.maxValue;this.minValue=options.minValue;this.elementWidth=options.elementWidth;Shape.call(this,Shape.HEIGHTFIELD);}
Heightfield.prototype=new Shape();Heightfield.prototype.computeMomentOfInertia=function(mass){return Number.MAX_VALUE;};Heightfield.prototype.updateBoundingRadius=function(){this.boundingRadius=Number.MAX_VALUE;};Heightfield.prototype.updateArea=function(){var data=this.data,area=0;for(var i=0;i<data.length-1;i++){area+=(data[i]+data[i+1])/2*this.elementWidth;}
this.area=area;};Heightfield.prototype.computeAABB=function(out,position,angle){out.upperBound[0]=this.elementWidth*this.data.length+position[0];out.upperBound[1]=this.maxValue+position[1];out.lowerBound[0]=position[0];out.lowerBound[1]=-Number.MAX_VALUE;};},{"../math/vec2":30,"../utils/Utils":47,"./Shape":42}],38:[function(require,module,exports){var Shape=require('./Shape'),vec2=require('../math/vec2')
module.exports=Line;function Line(length){this.length=length||1;Shape.call(this,Shape.LINE);}
Line.prototype=new Shape();Line.prototype.computeMomentOfInertia=function(mass){return mass*Math.pow(this.length,2)/12;};Line.prototype.updateBoundingRadius=function(){this.boundingRadius=this.length/2;};var points=[vec2.create(),vec2.create()];Line.prototype.computeAABB=function(out,position,angle){var l=this.length;vec2.set(points[0],-l/2,0);vec2.set(points[1],l/2,0);out.setFromPoints(points,position,angle);};},{"../math/vec2":30,"./Shape":42}],39:[function(require,module,exports){var Shape=require('./Shape'),vec2=require('../math/vec2')
module.exports=Particle;function Particle(){Shape.call(this,Shape.PARTICLE);};Particle.prototype=new Shape();Particle.prototype.computeMomentOfInertia=function(mass){return 0;};Particle.prototype.updateBoundingRadius=function(){this.boundingRadius=0;};Particle.prototype.computeAABB=function(out,position,angle){var l=this.length;vec2.copy(out.lowerBound,position);vec2.copy(out.upperBound,position);};},{"../math/vec2":30,"./Shape":42}],40:[function(require,module,exports){var Shape=require('./Shape'),vec2=require('../math/vec2'),Utils=require('../utils/Utils')
module.exports=Plane;function Plane(){Shape.call(this,Shape.PLANE);};Plane.prototype=new Shape();Plane.prototype.computeMomentOfInertia=function(mass){return 0;};Plane.prototype.updateBoundingRadius=function(){this.boundingRadius=Number.MAX_VALUE;};Plane.prototype.computeAABB=function(out,position,angle){var a=0,set=vec2.set;if(typeof(angle)=="number")
a=angle%(2*Math.PI);if(a==0){set(out.lowerBound,-Number.MAX_VALUE,-Number.MAX_VALUE);set(out.upperBound,Number.MAX_VALUE,0);}else if(a==Math.PI/2){set(out.lowerBound,0,-Number.MAX_VALUE);set(out.upperBound,Number.MAX_VALUE,Number.MAX_VALUE);}else if(a==Math.PI){set(out.lowerBound,-Number.MAX_VALUE,0);set(out.upperBound,Number.MAX_VALUE,Number.MAX_VALUE);}else if(a==3*Math.PI/2){set(out.lowerBound,-Number.MAX_VALUE,-Number.MAX_VALUE);set(out.upperBound,0,Number.MAX_VALUE);}else{set(out.lowerBound,-Number.MAX_VALUE,-Number.MAX_VALUE);set(out.upperBound,Number.MAX_VALUE,Number.MAX_VALUE);}
vec2.add(out.lowerBound,out.lowerBound,position);vec2.add(out.upperBound,out.upperBound,position);};Plane.prototype.updateArea=function(){this.area=Number.MAX_VALUE;};},{"../math/vec2":30,"../utils/Utils":47,"./Shape":42}],41:[function(require,module,exports){var vec2=require('../math/vec2'),Shape=require('./Shape'),Convex=require('./Convex');module.exports=Rectangle;function Rectangle(width,height){width=width||1;height=height||1;var verts=[vec2.fromValues(-width/2,-height/2),vec2.fromValues(width/2,-height/2),vec2.fromValues(width/2,height/2),vec2.fromValues(-width/2,height/2)];this.width=width;this.height=height;Convex.call(this,verts);this.type=Shape.RECTANGLE;}
Rectangle.prototype=new Convex([]);Rectangle.prototype.computeMomentOfInertia=function(mass){var w=this.width,h=this.height;return mass*(h*h+w*w)/12;};Rectangle.prototype.updateBoundingRadius=function(){var w=this.width,h=this.height;this.boundingRadius=Math.sqrt(w*w+h*h)/2;};var corner1=vec2.create(),corner2=vec2.create(),corner3=vec2.create(),corner4=vec2.create();Rectangle.prototype.computeAABB=function(out,position,angle){out.setFromPoints(this.vertices,position,angle);};Rectangle.prototype.updateArea=function(){this.area=this.width*this.height;};},{"../math/vec2":30,"./Convex":36,"./Shape":42}],42:[function(require,module,exports){module.exports=Shape;function Shape(type){this.type=type;this.id=Shape.idCounter++;this.boundingRadius=0;this.collisionGroup=1;this.collisionMask=1;if(type)this.updateBoundingRadius();this.material=null;this.area=0;this.sensor=false;this.updateArea();};Shape.idCounter=0;Shape.CIRCLE=1;Shape.PARTICLE=2;Shape.PLANE=4;Shape.CONVEX=8;Shape.LINE=16;Shape.RECTANGLE=32;Shape.CAPSULE=64;Shape.HEIGHTFIELD=128;Shape.prototype.computeMomentOfInertia=function(mass){throw new Error("Shape.computeMomentOfInertia is not implemented in this Shape...");};Shape.prototype.updateBoundingRadius=function(){throw new Error("Shape.updateBoundingRadius is not implemented in this Shape...");};Shape.prototype.updateArea=function(){};Shape.prototype.computeAABB=function(out,position,angle){};},{}],43:[function(require,module,exports){var vec2=require('../math/vec2'),Solver=require('./Solver'),Utils=require('../utils/Utils'),FrictionEquation=require('../equations/FrictionEquation');module.exports=GSSolver;function GSSolver(options){Solver.call(this,options,Solver.GS);options=options||{};this.iterations=options.iterations||10;this.tolerance=options.tolerance||1e-10;this.arrayStep=30;this.lambda=new Utils.ARRAY_TYPE(this.arrayStep);this.Bs=new Utils.ARRAY_TYPE(this.arrayStep);this.invCs=new Utils.ARRAY_TYPE(this.arrayStep);this.useZeroRHS=false;this.frictionIterations=0;this.usedIterations=0;}
GSSolver.prototype=new Solver();function setArrayZero(array){var l=array.length;while(l--){array[l]=+0.0;}}
GSSolver.prototype.solve=function(h,world){this.sortEquations();var iter=0,maxIter=this.iterations,maxFrictionIter=this.frictionIterations,equations=this.equations,Neq=equations.length,tolSquared=Math.pow(this.tolerance*Neq,2),bodies=world.bodies,Nbodies=world.bodies.length,add=vec2.add,set=vec2.set,useZeroRHS=this.useZeroRHS,lambda=this.lambda;this.usedIterations=0;if(lambda.length<Neq){lambda=this.lambda=new Utils.ARRAY_TYPE(Neq+this.arrayStep);this.Bs=new Utils.ARRAY_TYPE(Neq+this.arrayStep);this.invCs=new Utils.ARRAY_TYPE(Neq+this.arrayStep);}
setArrayZero(lambda);var invCs=this.invCs,Bs=this.Bs,lambda=this.lambda;for(var i=0;i!==equations.length;i++){var c=equations[i];if(c.timeStep!==h||c.needsUpdate){c.timeStep=h;c.update();}
Bs[i]=c.computeB(c.a,c.b,h);invCs[i]=c.computeInvC(c.epsilon);}
var q,B,c,deltalambdaTot,i,j;if(Neq!==0){for(i=0;i!==Nbodies;i++){bodies[i].resetConstraintVelocity();}
if(maxFrictionIter){for(iter=0;iter!==maxFrictionIter;iter++){deltalambdaTot=0.0;for(j=0;j!==Neq;j++){c=equations[j];if(c instanceof FrictionEquation){}
var deltalambda=GSSolver.iterateEquation(j,c,c.epsilon,Bs,invCs,lambda,useZeroRHS,h,iter);deltalambdaTot+=Math.abs(deltalambda);}
this.usedIterations++;if(deltalambdaTot*deltalambdaTot<=tolSquared){break;}}
GSSolver.updateMultipliers(equations,lambda,1/h);for(j=0;j!==Neq;j++){var eq=equations[j];if(eq instanceof FrictionEquation){var f=eq.contactEquation.multiplier*eq.frictionCoefficient;eq.maxForce=f;eq.minForce=-f;}}}
for(iter=0;iter!==maxIter;iter++){deltalambdaTot=0.0;for(j=0;j!==Neq;j++){c=equations[j];var deltalambda=GSSolver.iterateEquation(j,c,c.epsilon,Bs,invCs,lambda,useZeroRHS,h,iter);deltalambdaTot+=Math.abs(deltalambda);}
this.usedIterations++;if(deltalambdaTot*deltalambdaTot<=tolSquared){break;}}
for(i=0;i!==Nbodies;i++){bodies[i].addConstraintVelocity();}
GSSolver.updateMultipliers(equations,lambda,1/h);}};GSSolver.updateMultipliers=function(equations,lambda,invDt){var l=equations.length;while(l--){equations[l].multiplier=lambda[l]*invDt;}};GSSolver.iterateEquation=function(j,eq,eps,Bs,invCs,lambda,useZeroRHS,dt,iter){var B=Bs[j],invC=invCs[j],lambdaj=lambda[j],GWlambda=eq.computeGWlambda();var maxForce=eq.maxForce,minForce=eq.minForce;if(useZeroRHS){B=0;}
var deltalambda=invC*(B-GWlambda-eps*lambdaj);var lambdaj_plus_deltalambda=lambdaj+deltalambda;if(lambdaj_plus_deltalambda<minForce*dt){deltalambda=minForce*dt-lambdaj;}else if(lambdaj_plus_deltalambda>maxForce*dt){deltalambda=maxForce*dt-lambdaj;}
lambda[j]+=deltalambda;eq.addToWlambda(deltalambda);return deltalambda;};},{"../equations/FrictionEquation":23,"../math/vec2":30,"../utils/Utils":47,"./Solver":44}],44:[function(require,module,exports){var Utils=require('../utils/Utils'),EventEmitter=require('../events/EventEmitter')
module.exports=Solver;function Solver(options,type){options=options||{};EventEmitter.call(this);this.type=type;this.equations=[];this.equationSortFunction=options.equationSortFunction||false;}
Solver.prototype=new EventEmitter();Solver.prototype.solve=function(dt,world){throw new Error("Solver.solve should be implemented by subclasses!");};var mockWorld={bodies:[]};Solver.prototype.solveIsland=function(dt,island){this.removeAllEquations();if(island.equations.length){this.addEquations(island.equations);mockWorld.bodies.length=0;island.getBodies(mockWorld.bodies);if(mockWorld.bodies.length){this.solve(dt,mockWorld);}}};Solver.prototype.sortEquations=function(){if(this.equationSortFunction){this.equations.sort(this.equationSortFunction);}};Solver.prototype.addEquation=function(eq){if(eq.enabled){this.equations.push(eq);}};Solver.prototype.addEquations=function(eqs){for(var i=0,N=eqs.length;i!==N;i++){var eq=eqs[i];if(eq.enabled){this.equations.push(eq);}}};Solver.prototype.removeEquation=function(eq){var i=this.equations.indexOf(eq);if(i!==-1){this.equations.splice(i,1);}};Solver.prototype.removeAllEquations=function(){this.equations.length=0;};Solver.GS=1;Solver.ISLAND=2;},{"../events/EventEmitter":26,"../utils/Utils":47}],45:[function(require,module,exports){var TupleDictionary=require('./TupleDictionary');var Utils=require('./Utils');module.exports=OverlapKeeper;function OverlapKeeper(){this.overlappingLastState=new TupleDictionary();this.overlappingCurrentState=new TupleDictionary();this.recordPool=[];this.tmpDict=new TupleDictionary();this.tmpArray1=[];}
OverlapKeeper.prototype.tick=function(){var last=this.overlappingLastState;var current=this.overlappingCurrentState;var l=current.keys.length;while(l--){var key=current.keys[l];this.recordPool.push(current.getByKey(key));}
last.reset();last.copy(current);current.reset();};OverlapKeeper.prototype.setOverlapping=function(bodyA,shapeA,bodyB,shapeB){var last=this.overlappingLastState;var current=this.overlappingCurrentState;if(!current.get(shapeA.id,shapeB.id)){var data;if(this.recordPool.length){data=this.recordPool.pop();}else{data=new OverlapKeeperRecord(bodyA,shapeA,bodyB,shapeB);}
current.set(shapeA.id,shapeB.id,data);}};OverlapKeeper.prototype.getNewOverlaps=function(result){return this.getDiff(this.overlappingLastState,this.overlappingCurrentState,result);};OverlapKeeper.prototype.getEndOverlaps=function(result){return this.getDiff(this.overlappingCurrentState,this.overlappingLastState,result);};OverlapKeeper.prototype.getDiff=function(dictA,dictB,result){var result=result||[];var last=dictA;var current=dictB;result.length=0;var l=current.keys.length;while(l--){var key=current.keys[l];var data=current.data[key];if(!data){throw new Error('Key '+key+' had no data!');}
var lastData=last.data[key];if(!lastData){result.push(data);}}
return result;};OverlapKeeper.prototype.isNewOverlap=function(shapeA,shapeB){var idA=shapeA.id|0,idB=shapeB.id|0;return!!!this.overlappingLastState.get(idA,idB)&&!!this.overlappingCurrentState.get(idA,idB);};OverlapKeeper.prototype.getNewBodyOverlaps=function(result){this.tmpArray1.length=0;var overlaps=this.getNewOverlaps(this.tmpArray1);return this.getBodyDiff(overlaps,result);};OverlapKeeper.prototype.getEndBodyOverlaps=function(result){this.tmpArray1.length=0;var overlaps=this.getEndOverlaps(this.tmpArray1);return this.getBodyDiff(overlaps,result);};OverlapKeeper.prototype.getBodyDiff=function(overlaps,result){result=result||[];var accumulator=this.tmpDict;var l=overlaps.length;while(l--){var data=overlaps[l];accumulator.set(data.bodyA.id|0,data.bodyB.id|0,data);}
l=accumulator.keys.length;while(l--){var data=accumulator.keys[l];result.push(data.bodyA,data.bodyB);}
accumulator.reset();return result;};function OverlapKeeperRecord(bodyA,shapeA,bodyB,shapeB){this.shapeA=shapeA;this.shapeB=shapeB;this.bodyA=bodyA;this.bodyB=bodyB;}
OverlapKeeperRecord.prototype.set=function(bodyA,shapeA,bodyB,shapeB){OverlapKeeperRecord.call(this,bodyA,shapeA,bodyB,shapeB);};},{"./TupleDictionary":46,"./Utils":47}],46:[function(require,module,exports){var Utils=require('./Utils');module.exports=TupleDictionary;function TupleDictionary(){this.data=[];this.keys=[];}
TupleDictionary.prototype.getKey=function(id1,id2){id1=id1|0;id2=id2|0;if((id1|0)===(id2|0)){return-1;}
return((id1|0)>(id2|0)?(id1<<16)|(id2&0xFFFF):(id2<<16)|(id1&0xFFFF))|0;};TupleDictionary.prototype.getByKey=function(key){key=key|0;return this.data[key];};TupleDictionary.prototype.get=function(i,j){i=i|0;j=j|0;var key=this.getKey(i,j)|0;return this.data[key];};TupleDictionary.prototype.set=function(i,j,value){if(!value){throw new Error("No data!");}
i=i|0;j=j|0;var key=this.getKey(i,j)|0;if(!this.get(i,j)){this.keys.push(key);}
this.data[key]=value;return key;};TupleDictionary.prototype.reset=function(){var data=this.data,keys=this.keys;var l=keys.length|0;while(l--){var key=keys[l]|0;data[key]=undefined;}
keys.length=0;};TupleDictionary.prototype.copy=function(dict){this.reset();Utils.appendArray(this.keys,dict.keys);var l=dict.keys.length|0;while(l--){var key=dict.keys[l]|0;this.data[key]=dict.data[key];}};},{"./Utils":47}],47:[function(require,module,exports){module.exports=Utils;function Utils(){};Utils.appendArray=function(a,b){if(b.length<150000){a.push.apply(a,b);}else{for(var i=0,len=b.length;i!==len;++i){a.push(b[i]);}}};Utils.splice=function(array,index,howmany){howmany=howmany||1;for(var i=index,len=array.length-howmany;i<len;i++){array[i]=array[i+howmany];}
array.length=len;};Utils.ARRAY_TYPE=window.Float32Array||Array;Utils.extend=function(a,b){for(var key in b){a[key]=b[key];}};Utils.defaults=function(options,defaults){options=options||{};for(var key in defaults){if(!(key in options)){options[key]=defaults[key];}}
return options;};},{}],48:[function(require,module,exports){var Body=require('../objects/Body');module.exports=Island;function Island(){this.equations=[];this.bodies=[];}
Island.prototype.reset=function(){this.equations.length=this.bodies.length=0;};var bodyIds=[];Island.prototype.getBodies=function(result){var bodies=result||[],eqs=this.equations;bodyIds.length=0;for(var i=0;i!==eqs.length;i++){var eq=eqs[i];if(bodyIds.indexOf(eq.bodyA.id)===-1){bodies.push(eq.bodyA);bodyIds.push(eq.bodyA.id);}
if(bodyIds.indexOf(eq.bodyB.id)===-1){bodies.push(eq.bodyB);bodyIds.push(eq.bodyB.id);}}
return bodies;};Island.prototype.wantsToSleep=function(){for(var i=0;i<this.bodies.length;i++){var b=this.bodies[i];if(b.motionState===Body.DYNAMIC&&!b.wantsToSleep){return false;}}
return true;};Island.prototype.sleep=function(){for(var i=0;i<this.bodies.length;i++){var b=this.bodies[i];b.sleep();}
return true;};},{"../objects/Body":31}],49:[function(require,module,exports){var vec2=require('../math/vec2'),Island=require('./Island'),IslandNode=require('./IslandNode'),Body=require('../objects/Body')
module.exports=IslandManager;function IslandManager(options){this._nodePool=[];this._islandPool=[];this.equations=[];this.islands=[];this.nodes=[];this.queue=[];}
IslandManager.getUnvisitedNode=function(nodes){var Nnodes=nodes.length;for(var i=0;i!==Nnodes;i++){var node=nodes[i];if(!node.visited&&node.body.motionState===Body.DYNAMIC){return node;}}
return false;};IslandManager.prototype.visit=function(node,bds,eqs){bds.push(node.body);var Neqs=node.equations.length;for(var i=0;i!==Neqs;i++){var eq=node.equations[i];if(eqs.indexOf(eq)===-1){eqs.push(eq);}}};IslandManager.prototype.bfs=function(root,bds,eqs){var queue=this.queue;queue.length=0;queue.push(root);root.visited=true;this.visit(root,bds,eqs);while(queue.length){var node=queue.pop();var child;while((child=IslandManager.getUnvisitedNode(node.neighbors))){child.visited=true;this.visit(child,bds,eqs);if(child.body.motionState===Body.DYNAMIC){queue.push(child);}}}};IslandManager.prototype.split=function(world){var bodies=world.bodies,nodes=this.nodes,equations=this.equations;while(nodes.length){this._nodePool.push(nodes.pop());}
for(var i=0;i!==bodies.length;i++){if(this._nodePool.length){var node=this._nodePool.pop();node.reset();node.body=bodies[i];nodes.push(node);}else{nodes.push(new IslandNode(bodies[i]));}}
for(var k=0;k!==equations.length;k++){var eq=equations[k],i=bodies.indexOf(eq.bodyA),j=bodies.indexOf(eq.bodyB),ni=nodes[i],nj=nodes[j];ni.neighbors.push(nj);nj.neighbors.push(ni);ni.equations.push(eq);nj.equations.push(eq);}
var islands=this.islands;while(islands.length){var island=islands.pop();island.reset();this._islandPool.push(island);}
var child;while((child=IslandManager.getUnvisitedNode(nodes))){var island=this._islandPool.length?this._islandPool.pop():new Island();this.bfs(child,island.bodies,island.equations);islands.push(island);}
return islands;};},{"../math/vec2":30,"../objects/Body":31,"./Island":48,"./IslandNode":50}],50:[function(require,module,exports){module.exports=IslandNode;function IslandNode(body){this.body=body;this.neighbors=[];this.equations=[];this.visited=false;}
IslandNode.prototype.reset=function(){this.equations.length=0;this.neighbors.length=0;this.visited=false;this.body=null;};},{}],51:[function(require,module,exports){var GSSolver=require('../solver/GSSolver'),Solver=require('../solver/Solver'),NaiveBroadphase=require('../collision/NaiveBroadphase'),vec2=require('../math/vec2'),Circle=require('../shapes/Circle'),Rectangle=require('../shapes/Rectangle'),Convex=require('../shapes/Convex'),Line=require('../shapes/Line'),Plane=require('../shapes/Plane'),Capsule=require('../shapes/Capsule'),Particle=require('../shapes/Particle'),EventEmitter=require('../events/EventEmitter'),Body=require('../objects/Body'),Shape=require('../shapes/Shape'),Spring=require('../objects/Spring'),Material=require('../material/Material'),ContactMaterial=require('../material/ContactMaterial'),DistanceConstraint=require('../constraints/DistanceConstraint'),Constraint=require('../constraints/Constraint'),LockConstraint=require('../constraints/LockConstraint'),RevoluteConstraint=require('../constraints/RevoluteConstraint'),PrismaticConstraint=require('../constraints/PrismaticConstraint'),GearConstraint=require('../constraints/GearConstraint'),pkg=require('../../package.json'),Broadphase=require('../collision/Broadphase'),SAPBroadphase=require('../collision/SAPBroadphase'),Narrowphase=require('../collision/Narrowphase'),Utils=require('../utils/Utils'),OverlapKeeper=require('../utils/OverlapKeeper'),IslandManager=require('./IslandManager')
module.exports=World;if(typeof performance==='undefined'){performance={};}
if(!performance.now){var nowOffset=Date.now();if(performance.timing&&performance.timing.navigationStart){nowOffset=performance.timing.navigationStart;}
performance.now=function(){return Date.now()-nowOffset;};}
function World(options){EventEmitter.apply(this);options=options||{};this.springs=[];this.bodies=[];this.disabledBodyCollisionPairs=[];this.solver=options.solver||new GSSolver();this.narrowphase=new Narrowphase(this);this.islandManager=new IslandManager();this.gravity=vec2.fromValues(0,-9.78);if(options.gravity){vec2.copy(this.gravity,options.gravity);}
this.frictionGravity=vec2.length(this.gravity)||10;this.useWorldGravityAsFrictionGravity=true;this.useFrictionGravityOnZeroGravity=true;this.doProfiling=options.doProfiling||false;this.lastStepTime=0.0;this.broadphase=options.broadphase||new NaiveBroadphase();this.broadphase.setWorld(this);this.constraints=[];this.defaultMaterial=new Material();this.defaultContactMaterial=new ContactMaterial(this.defaultMaterial,this.defaultMaterial);this.lastTimeStep=1/60;this.applySpringForces=true;this.applyDamping=true;this.applyGravity=true;this.solveConstraints=true;this.contactMaterials=[];this.time=0.0;this.stepping=false;this.bodiesToBeRemoved=[];this.fixedStepTime=0.0;this.islandSplit=typeof(options.islandSplit)!=="undefined"?!!options.islandSplit:false;this.emitImpactEvent=true;this._constraintIdCounter=0;this._bodyIdCounter=0;this.postStepEvent={type:"postStep",};this.addBodyEvent={type:"addBody",body:null};this.removeBodyEvent={type:"removeBody",body:null};this.addSpringEvent={type:"addSpring",spring:null,};this.impactEvent={type:"impact",bodyA:null,bodyB:null,shapeA:null,shapeB:null,contactEquation:null,};this.postBroadphaseEvent={type:"postBroadphase",pairs:null,};this.enableBodySleeping=false;this.enableIslandSleeping=false;this.beginContactEvent={type:"beginContact",shapeA:null,shapeB:null,bodyA:null,bodyB:null,contactEquations:[],};this.endContactEvent={type:"endContact",shapeA:null,shapeB:null,bodyA:null,bodyB:null,};this.preSolveEvent={type:"preSolve",contactEquations:null,frictionEquations:null,};this.overlappingShapesLastState={keys:[]};this.overlappingShapesCurrentState={keys:[]};this.overlapKeeper=new OverlapKeeper();}
World.prototype=new Object(EventEmitter.prototype);World.prototype.addConstraint=function(c){this.constraints.push(c);};World.prototype.addContactMaterial=function(contactMaterial){this.contactMaterials.push(contactMaterial);};World.prototype.removeContactMaterial=function(cm){var idx=this.contactMaterials.indexOf(cm);if(idx!==-1){Utils.splice(this.contactMaterials,idx,1);}};World.prototype.getContactMaterial=function(materialA,materialB){var cmats=this.contactMaterials;for(var i=0,N=cmats.length;i!==N;i++){var cm=cmats[i];if((cm.materialA===materialA)&&(cm.materialB===materialB)||(cm.materialA===materialB)&&(cm.materialB===materialA)){return cm;}}
return false;};World.prototype.removeConstraint=function(c){var idx=this.constraints.indexOf(c);if(idx!==-1){Utils.splice(this.constraints,idx,1);}};var step_r=vec2.create(),step_runit=vec2.create(),step_u=vec2.create(),step_f=vec2.create(),step_fhMinv=vec2.create(),step_velodt=vec2.create(),step_mg=vec2.create(),xiw=vec2.fromValues(0,0),xjw=vec2.fromValues(0,0),zero=vec2.fromValues(0,0),interpvelo=vec2.fromValues(0,0);World.prototype.step=function(dt,timeSinceLastCalled,maxSubSteps){maxSubSteps=maxSubSteps||10;timeSinceLastCalled=timeSinceLastCalled||0;if(timeSinceLastCalled===0){this.internalStep(dt);this.time+=dt;}else{var internalSteps=Math.floor((this.time+timeSinceLastCalled)/dt)-Math.floor(this.time/dt);internalSteps=Math.min(internalSteps,maxSubSteps);for(var i=0;i!==internalSteps;i++){this.internalStep(dt);}
this.time+=timeSinceLastCalled;var h=this.time%dt;var h_div_dt=h/dt;for(var j=0;j!==this.bodies.length;j++){var b=this.bodies[j];if(b.motionState!==Body.STATIC&&b.sleepState!==Body.SLEEPING){vec2.sub(interpvelo,b.position,b.previousPosition);vec2.scale(interpvelo,interpvelo,h_div_dt);vec2.add(b.interpolatedPosition,b.position,interpvelo);b.interpolatedAngle=b.angle+(b.angle-b.previousAngle)*h_div_dt;}else{vec2.copy(b.interpolatedPosition,b.position);b.interpolatedAngle=b.angle;}}}};var endOverlaps=[];World.prototype.internalStep=function(dt){this.stepping=true;var that=this,doProfiling=this.doProfiling,Nsprings=this.springs.length,springs=this.springs,bodies=this.bodies,g=this.gravity,solver=this.solver,Nbodies=this.bodies.length,broadphase=this.broadphase,np=this.narrowphase,constraints=this.constraints,t0,t1,fhMinv=step_fhMinv,velodt=step_velodt,mg=step_mg,scale=vec2.scale,add=vec2.add,rotate=vec2.rotate,islandManager=this.islandManager;this.lastTimeStep=dt;if(doProfiling){t0=performance.now();}
if(this.useWorldGravityAsFrictionGravity){var gravityLen=vec2.length(this.gravity);if(gravityLen===0&&this.useFrictionGravityOnZeroGravity){}else{this.frictionGravity=gravityLen;}}
if(this.applyGravity){for(var i=0;i!==Nbodies;i++){var b=bodies[i],fi=b.force;if(b.motionState!==Body.DYNAMIC||b.sleepState===Body.SLEEPING){continue;}
vec2.scale(mg,g,b.mass*b.gravityScale);add(fi,fi,mg);}}
if(this.applySpringForces){for(var i=0;i!==Nsprings;i++){var s=springs[i];s.applyForce();}}
if(this.applyDamping){for(var i=0;i!==Nbodies;i++){var b=bodies[i];if(b.motionState===Body.DYNAMIC){b.applyDamping(dt);}}}
var result=broadphase.getCollisionPairs(this);var ignoredPairs=this.disabledBodyCollisionPairs;for(var i=ignoredPairs.length-2;i>=0;i-=2){for(var j=result.length-2;j>=0;j-=2){if((ignoredPairs[i]===result[j]&&ignoredPairs[i+1]===result[j+1])||(ignoredPairs[i+1]===result[j]&&ignoredPairs[i]===result[j+1])){result.splice(j,2);}}}
var Nconstraints=constraints.length;for(i=0;i!==Nconstraints;i++){var c=constraints[i];if(!c.collideConnected){for(var j=result.length-2;j>=0;j-=2){if((c.bodyA===result[j]&&c.bodyB===result[j+1])||(c.bodyB===result[j]&&c.bodyA===result[j+1])){result.splice(j,2);}}}}
this.postBroadphaseEvent.pairs=result;this.emit(this.postBroadphaseEvent);np.reset(this);for(var i=0,Nresults=result.length;i!==Nresults;i+=2){var bi=result[i],bj=result[i+1];for(var k=0,Nshapesi=bi.shapes.length;k!==Nshapesi;k++){var si=bi.shapes[k],xi=bi.shapeOffsets[k],ai=bi.shapeAngles[k];for(var l=0,Nshapesj=bj.shapes.length;l!==Nshapesj;l++){var sj=bj.shapes[l],xj=bj.shapeOffsets[l],aj=bj.shapeAngles[l];var cm=this.defaultContactMaterial;if(si.material&&sj.material){var tmp=this.getContactMaterial(si.material,sj.material);if(tmp){cm=tmp;}}
this.runNarrowphase(np,bi,si,xi,ai,bj,sj,xj,aj,cm,this.frictionGravity);}}}
for(var i=0;i!==Nbodies;i++){var body=bodies[i];if(body._wakeUpAfterNarrowphase){body.wakeUp();body._wakeUpAfterNarrowphase=false;}}
if(this.has('endContact')){this.overlapKeeper.getEndOverlaps(endOverlaps);var e=this.endContactEvent;var l=endOverlaps.length;while(l--){var data=endOverlaps[l];e.shapeA=data.shapeA;e.shapeB=data.shapeB;e.bodyA=data.bodyA;e.bodyB=data.bodyA;this.emit(e);}}
this.overlapKeeper.tick();var preSolveEvent=this.preSolveEvent;preSolveEvent.contactEquations=np.contactEquations;preSolveEvent.frictionEquations=np.frictionEquations;this.emit(preSolveEvent);var Nconstraints=constraints.length;for(i=0;i!==Nconstraints;i++){constraints[i].update();}
if(np.contactEquations.length||np.frictionEquations.length||constraints.length){if(this.islandSplit){islandManager.equations.length=0;Utils.appendArray(islandManager.equations,np.contactEquations);Utils.appendArray(islandManager.equations,np.frictionEquations);for(i=0;i!==Nconstraints;i++){Utils.appendArray(islandManager.equations,constraints[i].equations);}
islandManager.split(this);for(var i=0;i!==islandManager.islands.length;i++){var island=islandManager.islands[i];if(island.equations.length){solver.solveIsland(dt,island);}}}else{solver.addEquations(np.contactEquations);solver.addEquations(np.frictionEquations);for(i=0;i!==Nconstraints;i++){solver.addEquations(constraints[i].equations);}
if(this.solveConstraints){solver.solve(dt,this);}
solver.removeAllEquations();}}
for(var i=0;i!==Nbodies;i++){var body=bodies[i];if(body.sleepState!==Body.SLEEPING&&body.motionState!==Body.STATIC){World.integrateBody(body,dt);}}
for(var i=0;i!==Nbodies;i++){bodies[i].setZeroForce();}
if(doProfiling){t1=performance.now();that.lastStepTime=t1-t0;}
if(this.emitImpactEvent&&this.has('impact')){var ev=this.impactEvent;for(var i=0;i!==np.contactEquations.length;i++){var eq=np.contactEquations[i];if(eq.firstImpact){ev.bodyA=eq.bodyA;ev.bodyB=eq.bodyB;ev.shapeA=eq.shapeA;ev.shapeB=eq.shapeB;ev.contactEquation=eq;this.emit(ev);}}}
if(this.enableBodySleeping){for(i=0;i!==Nbodies;i++){bodies[i].sleepTick(this.time,false,dt);}}else if(this.enableIslandSleeping&&this.islandSplit){for(i=0;i!==Nbodies;i++){bodies[i].sleepTick(this.time,true,dt);}
for(var i=0;i<this.islandManager.islands.length;i++){var island=this.islandManager.islands[i];if(island.wantsToSleep()){island.sleep();}}}
this.stepping=false;if(this.bodiesToBeRemoved.length){for(var i=0;i!==this.bodiesToBeRemoved.length;i++){this.removeBody(this.bodiesToBeRemoved[i]);}
this.bodiesToBeRemoved.length=0;}
this.emit(this.postStepEvent);};var ib_fhMinv=vec2.create();var ib_velodt=vec2.create();World.integrateBody=function(body,dt){var minv=body.invMass,f=body.force,pos=body.position,velo=body.velocity;vec2.copy(body.previousPosition,body.position);body.previousAngle=body.angle;if(!body.fixedRotation){body.angularVelocity+=body.angularForce*body.invInertia*dt;body.angle+=body.angularVelocity*dt;}
vec2.scale(ib_fhMinv,f,dt*minv);vec2.add(velo,ib_fhMinv,velo);vec2.scale(ib_velodt,velo,dt);vec2.add(pos,pos,ib_velodt);body.aabbNeedsUpdate=true;};World.prototype.runNarrowphase=function(np,bi,si,xi,ai,bj,sj,xj,aj,cm,glen){if(!((si.collisionGroup&sj.collisionMask)!==0&&(sj.collisionGroup&si.collisionMask)!==0)){return;}
vec2.rotate(xiw,xi,bi.angle);vec2.rotate(xjw,xj,bj.angle);vec2.add(xiw,xiw,bi.position);vec2.add(xjw,xjw,bj.position);var aiw=ai+bi.angle;var ajw=aj+bj.angle;np.enableFriction=cm.friction>0;np.frictionCoefficient=cm.friction;var reducedMass;if(bi.motionState===Body.STATIC||bi.motionState===Body.KINEMATIC){reducedMass=bj.mass;}else if(bj.motionState===Body.STATIC||bj.motionState===Body.KINEMATIC){reducedMass=bi.mass;}else{reducedMass=(bi.mass*bj.mass)/(bi.mass+bj.mass);}
np.slipForce=cm.friction*glen*reducedMass;np.restitution=cm.restitution;np.surfaceVelocity=cm.surfaceVelocity;np.frictionStiffness=cm.frictionStiffness;np.frictionRelaxation=cm.frictionRelaxation;np.stiffness=cm.stiffness;np.relaxation=cm.relaxation;var resolver=np[si.type|sj.type],numContacts=0;if(resolver){var sensor=si.sensor||sj.sensor;var numFrictionBefore=np.frictionEquations.length;if(si.type<sj.type){numContacts=resolver.call(np,bi,si,xiw,aiw,bj,sj,xjw,ajw,sensor);}else{numContacts=resolver.call(np,bj,sj,xjw,ajw,bi,si,xiw,aiw,sensor);}
var numFrictionEquations=np.frictionEquations.length-numFrictionBefore;if(numContacts){if(bi.allowSleep&&bi.motionState===Body.DYNAMIC&&bi.sleepState===Body.SLEEPING&&bj.sleepState===Body.AWAKE&&bj.motionState!==Body.STATIC){var speedSquaredB=vec2.squaredLength(bj.velocity)+Math.pow(bj.angularVelocity,2);var speedLimitSquaredB=Math.pow(bj.sleepSpeedLimit,2);if(speedSquaredB>=speedLimitSquaredB*2){bi._wakeUpAfterNarrowphase=true;}}
if(bj.allowSleep&&bj.motionState===Body.DYNAMIC&&bj.sleepState===Body.SLEEPING&&bi.sleepState===Body.AWAKE&&bi.motionState!==Body.STATIC){var speedSquaredA=vec2.squaredLength(bi.velocity)+Math.pow(bi.angularVelocity,2);var speedLimitSquaredA=Math.pow(bi.sleepSpeedLimit,2);if(speedSquaredA>=speedLimitSquaredA*2){bj._wakeUpAfterNarrowphase=true;}}
this.overlapKeeper.setOverlapping(bi,si,bj,sj);if(this.has('beginContact')&&this.overlapKeeper.isNewOverlap(si,sj)){var e=this.beginContactEvent;e.shapeA=si;e.shapeB=sj;e.bodyA=bi;e.bodyB=bj;e.contactEquations.length=0;if(typeof(numContacts)==="number"){for(var i=np.contactEquations.length-numContacts;i<np.contactEquations.length;i++){e.contactEquations.push(np.contactEquations[i]);}}
this.emit(e);}
if(typeof(numContacts)==="number"&&numFrictionEquations>1){for(var i=np.frictionEquations.length-numFrictionEquations;i<np.frictionEquations.length;i++){var f=np.frictionEquations[i];f.setSlipForce(f.getSlipForce()/numFrictionEquations);}}}}};World.prototype.addSpring=function(s){this.springs.push(s);this.addSpringEvent.spring=s;this.emit(this.addSpringEvent);};World.prototype.removeSpring=function(s){var idx=this.springs.indexOf(s);if(idx===-1){Utils.splice(this.springs,idx,1);}};World.prototype.addBody=function(body){if(this.bodies.indexOf(body)===-1){this.bodies.push(body);body.world=this;this.addBodyEvent.body=body;this.emit(this.addBodyEvent);}};World.prototype.removeBody=function(body){if(this.stepping){this.bodiesToBeRemoved.push(body);}else{body.world=null;var idx=this.bodies.indexOf(body);if(idx!==-1){Utils.splice(this.bodies,idx,1);this.removeBodyEvent.body=body;body.resetConstraintVelocity();this.emit(this.removeBodyEvent);}}};World.prototype.getBodyById=function(id){var bodies=this.bodies;for(var i=0;i<bodies.length;i++){var b=bodies[i];if(b.id===id){return b;}}
return false;};World.prototype.disableBodyCollision=function(bodyA,bodyB){this.disabledBodyCollisionPairs.push(bodyA,bodyB);};World.prototype.enableBodyCollision=function(bodyA,bodyB){var pairs=this.disabledBodyCollisionPairs;for(var i=0;i<pairs.length;i+=2){if((pairs[i]===bodyA&&pairs[i+1]===bodyB)||(pairs[i+1]===bodyA&&pairs[i]===bodyB)){pairs.splice(i,2);return;}}};function v2a(v){if(!v)return v;return[v[0],v[1]];}
function extend(a,b){for(var key in b)
a[key]=b[key];}
function contactMaterialToJSON(cm){return{id:cm.id,materialA:cm.materialA.id,materialB:cm.materialB.id,friction:cm.friction,restitution:cm.restitution,stiffness:cm.stiffness,relaxation:cm.relaxation,frictionStiffness:cm.frictionStiffness,frictionRelaxation:cm.frictionRelaxation,};}
World.prototype.toJSON=function(){var world=this;var json={p2:pkg.version,bodies:[],springs:[],solver:{},gravity:v2a(world.gravity),broadphase:{},distanceConstraints:[],revoluteConstraints:[],prismaticConstraints:[],lockConstraints:[],gearConstraints:[],contactMaterials:[],materials:[],defaultContactMaterial:contactMaterialToJSON(world.defaultContactMaterial),islandSplit:world.islandSplit,enableIslandSleeping:world.enableIslandSleeping,enableBodySleeping:world.enableBodySleeping,};var js=json.solver,s=world.solver;if(s.type===Solver.GS){js.type="GSSolver";js.iterations=s.iterations;}
var jb=json.broadphase,wb=world.broadphase;if(wb.type===Broadphase.NAIVE){jb.type="NaiveBroadphase";}else if(wb.type===Broadphase.SAP){jb.type="SAPBroadphase";}else{console.error("Broadphase not supported: "+wb.type);}
for(var i=0;i!==world.springs.length;i++){var s=world.springs[i];json.springs.push({bodyA:world.bodies.indexOf(s.bodyA),bodyB:world.bodies.indexOf(s.bodyB),stiffness:s.stiffness,damping:s.damping,restLength:s.restLength,localAnchorA:v2a(s.localAnchorA),localAnchorB:v2a(s.localAnchorB),});}
for(var i=0;i<world.constraints.length;i++){var c=world.constraints[i];var jc={bodyA:world.bodies.indexOf(c.bodyA),bodyB:world.bodies.indexOf(c.bodyB),collideConnected:c.collideConnected};switch(c.type){case Constraint.DISTANCE:extend(jc,{distance:c.distance,maxForce:c.getMaxForce(),});json.distanceConstraints.push(jc);break;case Constraint.REVOLUTE:extend(jc,{pivotA:v2a(c.pivotA),pivotB:v2a(c.pivotB),maxForce:c.maxForce,motorSpeed:c.getMotorSpeed()||0,motorEnabled:!!c.getMotorSpeed(),lowerLimit:c.lowerLimit,lowerLimitEnabled:c.lowerLimitEnabled,upperLimit:c.upperLimit,upperLimitEnabled:c.upperLimitEnabled,});json.revoluteConstraints.push(jc);break;case Constraint.PRISMATIC:extend(jc,{localAxisA:v2a(c.localAxisA),localAnchorA:v2a(c.localAnchorA),localAnchorB:v2a(c.localAnchorB),maxForce:c.maxForce,upperLimitEnabled:c.upperLimitEnabled,lowerLimitEnabled:c.lowerLimitEnabled,upperLimit:c.upperLimit,lowerLimit:c.lowerLimit,motorEnabled:c.motorEnabled,motorSpeed:c.motorSpeed,});json.prismaticConstraints.push(jc);break;case Constraint.LOCK:extend(jc,{localOffsetB:v2a(c.localOffsetB),localAngleB:c.localAngleB,maxForce:c.getMaxForce(),});json.lockConstraints.push(jc);break;case Constraint.GEAR:extend(jc,{angle:c.angle,ratio:c.ratio,maxForce:c.maxForce||1e6,});json.gearConstraints.push(jc);break;default:console.error("Constraint not supported yet: ",c.type);break;}}
for(var i=0;i!==world.bodies.length;i++){var b=world.bodies[i],ss=b.shapes,jsonBody={id:b.id,mass:b.mass,angle:b.angle,position:v2a(b.position),velocity:v2a(b.velocity),angularVelocity:b.angularVelocity,force:v2a(b.force),motionState:b.motionState,fixedRotation:b.fixedRotation,circleShapes:[],planeShapes:[],particleShapes:[],lineShapes:[],rectangleShapes:[],convexShapes:[],capsuleShapes:[],};if(b.concavePath){jsonBody.concavePath=b.concavePath;}
for(var j=0;j<ss.length;j++){var s=ss[j],jsonShape={};jsonShape.offset=v2a(b.shapeOffsets[j]);jsonShape.angle=b.shapeAngles[j];jsonShape.collisionGroup=s.collisionGroup;jsonShape.collisionMask=s.collisionMask;jsonShape.material=s.material?s.material.id:null;switch(s.type){case Shape.CIRCLE:extend(jsonShape,{radius:s.radius,});jsonBody.circleShapes.push(jsonShape);break;case Shape.PLANE:jsonBody.planeShapes.push(jsonShape);break;case Shape.PARTICLE:jsonBody.particleShapes.push(jsonShape);break;case Shape.LINE:jsonShape.length=s.length;jsonBody.lineShapes.push(jsonShape);break;case Shape.RECTANGLE:extend(jsonShape,{width:s.width,height:s.height});jsonBody.rectangleShapes.push(jsonShape);break;case Shape.CONVEX:var verts=[];for(var k=0;k<s.vertices.length;k++){verts.push(v2a(s.vertices[k]));}
extend(jsonShape,{vertices:verts});jsonBody.convexShapes.push(jsonShape);break;case Shape.CAPSULE:extend(jsonShape,{length:s.length,radius:s.radius});jsonBody.capsuleShapes.push(jsonShape);break;default:console.error("Shape type not supported yet!");break;}}
json.bodies.push(jsonBody);}
for(var i=0;i<world.contactMaterials.length;i++){var cm=world.contactMaterials[i];json.contactMaterials.push(contactMaterialToJSON(cm));}
var mats={};for(var i=0;i<world.contactMaterials.length;i++){var cm=world.contactMaterials[i];mats[cm.materialA.id+'']=cm.materialA;mats[cm.materialB.id+'']=cm.materialB;}
for(var matId in mats){var m=mats[parseInt(matId)];json.materials.push({id:m.id,});}
return json;};World.prototype.fromJSON=function(json){this.clear();if(!json.p2){return false;}
var w=this;vec2.copy(w.gravity,json.gravity);w.islandSplit=json.islandSplit;w.enableIslandSleeping=json.enableIslandSleeping;w.enableBodySleeping=json.enableBodySleeping;switch(json.solver.type){case"GSSolver":var js=json.solver,s=new GSSolver();w.solver=s;s.iterations=js.iterations;break;default:throw new Error("Solver type not recognized: "+json.solver.type);}
switch(json.broadphase.type){case"NaiveBroadphase":w.broadphase=new NaiveBroadphase();break;case"SAPBroadphase":w.broadphase=new SAPBroadphase();break;}
w.broadphase.setWorld(w);var bodies=w.bodies;var id2material={};for(var i=0;i!==json.materials.length;i++){var jm=json.materials[i];var m=new Material();id2material[jm.id+""]=m;m.id=jm.id;}
w.defaultMaterial.id=json.defaultContactMaterial.materialA;for(var i=0;i!==json.bodies.length;i++){var jb=json.bodies[i];var b=new Body({mass:jb.mass,position:jb.position,angle:jb.angle,velocity:jb.velocity,angularVelocity:jb.angularVelocity,force:jb.force,fixedRotation:jb.fixedRotation,});b.id=jb.id;b.motionState=jb.motionState;for(var j=0;j<jb.circleShapes.length;j++){var s=jb.circleShapes[j];addShape(b,new Circle(s.radius),s);}
for(var j=0;j<jb.planeShapes.length;j++){var s=jb.planeShapes[j];addShape(b,new Plane(),s);}
for(var j=0;j<jb.particleShapes.length;j++){var s=jb.particleShapes[j];addShape(b,new Particle(),s);}
for(var j=0;j<jb.lineShapes.length;j++){var s=jb.lineShapes[j];addShape(b,new Line(s.length),s);}
for(var j=0;j<jb.rectangleShapes.length;j++){var s=jb.rectangleShapes[j];addShape(b,new Rectangle(s.width,s.height),s);}
for(var j=0;j<jb.convexShapes.length;j++){var s=jb.convexShapes[j];addShape(b,new Convex(s.vertices),s);}
for(var j=0;j<jb.capsuleShapes.length;j++){var s=jb.capsuleShapes[j];addShape(b,new Capsule(s.length,s.radius),s);}
function addShape(body,shape,shapeJSON){shape.collisionMask=shapeJSON.collisionMask;shape.collisionGroup=shapeJSON.collisionGroup;if(shapeJSON.material){shape.material=id2material[shapeJSON.material+""];}
body.addShape(shape,shapeJSON.offset,shapeJSON.angle);}
if(jb.concavePath){b.concavePath=jb.concavePath;}
w.addBody(b);}
for(var i=0;i<json.springs.length;i++){var js=json.springs[i];var bodyA=bodies[js.bodyA],bodyB=bodies[js.bodyB];if(!bodyA){this.error="instance.springs["+i+"] references instance.body["+js.bodyA+"], which does not exist.";return false;}
if(!bodyB){this.error="instance.springs["+i+"] references instance.body["+js.bodyB+"], which does not exist.";return false;}
var s=new Spring(bodyA,bodyB,{stiffness:js.stiffness,damping:js.damping,restLength:js.restLength,localAnchorA:js.localAnchorA,localAnchorB:js.localAnchorB,});w.addSpring(s);}
for(var i=0;i<json.contactMaterials.length;i++){var jm=json.contactMaterials[i],matA=id2material[jm.materialA+""],matB=id2material[jm.materialB+""];if(!matA){this.error="Reference to material id "+jm.materialA+": material not found";return false;}
if(!matB){this.error="Reference to material id "+jm.materialB+": material not found";return false;}
var cm=new ContactMaterial(matA,matB,{friction:jm.friction,restitution:jm.restitution,stiffness:jm.stiffness,relaxation:jm.relaxation,frictionStiffness:jm.frictionStiffness,frictionRelaxation:jm.frictionRelaxation,});cm.id=jm.id;w.addContactMaterial(cm);}
var jm=json.defaultContactMaterial,matA=w.defaultMaterial,matB=w.defaultMaterial;var cm=new ContactMaterial(matA,matB,{friction:jm.friction,restitution:jm.restitution,stiffness:jm.stiffness,relaxation:jm.relaxation,frictionStiffness:jm.frictionStiffness,frictionRelaxation:jm.frictionRelaxation,});cm.id=jm.id;w.defaultContactMaterial=cm;for(var i=0;i<json.distanceConstraints.length;i++){var c=json.distanceConstraints[i];w.addConstraint(new DistanceConstraint(bodies[c.bodyA],bodies[c.bodyB],c.distance,{maxForce:c.maxForce,collideConnected:c.collideConnected}));}
for(var i=0;i<json.revoluteConstraints.length;i++){var c=json.revoluteConstraints[i];var revolute=new RevoluteConstraint(bodies[c.bodyA],c.pivotA,bodies[c.bodyB],c.pivotB,{maxForce:c.maxForce,collideConnected:c.collideConnected});if(c.motorEnabled){revolute.enableMotor();}
revolute.setMotorSpeed(c.motorSpeed);revolute.lowerLimit=c.lowerLimit;revolute.upperLimit=c.upperLimit;revolute.lowerLimitEnabled=c.lowerLimitEnabled;revolute.upperLimitEnabled=c.upperLimitEnabled;w.addConstraint(revolute);}
for(var i=0;i<json.prismaticConstraints.length;i++){var c=json.prismaticConstraints[i],p=new PrismaticConstraint(bodies[c.bodyA],bodies[c.bodyB],{maxForce:c.maxForce,localAxisA:c.localAxisA,localAnchorA:c.localAnchorA,localAnchorB:c.localAnchorB,collideConnected:c.collideConnected});p.motorSpeed=c.motorSpeed;w.addConstraint(p);}
for(var i=0;i<json.lockConstraints.length;i++){var c=json.lockConstraints[i];w.addConstraint(new LockConstraint(bodies[c.bodyA],bodies[c.bodyB],{maxForce:c.maxForce,localOffsetB:c.localOffsetB,localAngleB:c.localAngleB,collideConnected:c.collideConnected}));}
for(var i=0;i<json.gearConstraints.length;i++){var c=json.gearConstraints[i];w.addConstraint(new GearConstraint(bodies[c.bodyA],bodies[c.bodyB],{maxForce:c.maxForce,angle:c.angle,ratio:c.ratio,collideConnected:c.collideConnected}));}
return true;};World.prototype.clear=function(){this.time=0;this.fixedStepTime=0;if(this.solver&&this.solver.equations.length){this.solver.removeAllEquations();}
var cs=this.constraints;for(var i=cs.length-1;i>=0;i--){this.removeConstraint(cs[i]);}
var bodies=this.bodies;for(var i=bodies.length-1;i>=0;i--){this.removeBody(bodies[i]);}
var springs=this.springs;for(var i=springs.length-1;i>=0;i--){this.removeSpring(springs[i]);}
var cms=this.contactMaterials;for(var i=cms.length-1;i>=0;i--){this.removeContactMaterial(cms[i]);}
World.apply(this);};World.prototype.clone=function(){var world=new World();world.fromJSON(this.toJSON());return world;};var hitTest_tmp1=vec2.create(),hitTest_zero=vec2.fromValues(0,0),hitTest_tmp2=vec2.fromValues(0,0);World.prototype.hitTest=function(worldPoint,bodies,precision){precision=precision||0;var pb=new Body({position:worldPoint}),ps=new Particle(),px=worldPoint,pa=0,x=hitTest_tmp1,zero=hitTest_zero,tmp=hitTest_tmp2;pb.addShape(ps);var n=this.narrowphase,result=[];for(var i=0,N=bodies.length;i!==N;i++){var b=bodies[i];for(var j=0,NS=b.shapes.length;j!==NS;j++){var s=b.shapes[j],offset=b.shapeOffsets[j]||zero,angle=b.shapeAngles[j]||0.0;vec2.rotate(x,offset,b.angle);vec2.add(x,x,b.position);var a=angle+b.angle;if((s instanceof Circle&&n.circleParticle(b,s,x,a,pb,ps,px,pa,true))||(s instanceof Convex&&n.particleConvex(pb,ps,px,pa,b,s,x,a,true))||(s instanceof Plane&&n.particlePlane(pb,ps,px,pa,b,s,x,a,true))||(s instanceof Capsule&&n.particleCapsule(pb,ps,px,pa,b,s,x,a,true))||(s instanceof Particle&&vec2.squaredLength(vec2.sub(tmp,x,worldPoint))<precision*precision)){result.push(b);}}}
return result;};World.prototype.setGlobalEquationParameters=function(parameters){parameters=parameters||{};for(var i=0;i!==this.constraints.length;i++){var c=this.constraints[i];for(var j=0;j!==c.equations.length;j++){var eq=c.equations[j];if(typeof(parameters.stiffness)!=="undefined"){eq.stiffness=parameters.stiffness;}
if(typeof(parameters.relaxation)!=="undefined"){eq.relaxation=parameters.relaxation;}
eq.needsUpdate=true;}}
for(var i=0;i!==this.contactMaterials.length;i++){var c=this.contactMaterials[i];if(typeof(parameters.stiffness)!=="undefined"){c.stiffness=parameters.stiffness;c.frictionStiffness=parameters.stiffness;}
if(typeof(parameters.relaxation)!=="undefined"){c.relaxation=parameters.relaxation;c.frictionRelaxation=parameters.relaxation;}}
var c=this.defaultContactMaterial;if(typeof(parameters.stiffness)!=="undefined"){c.stiffness=parameters.stiffness;c.frictionStiffness=parameters.stiffness;}
if(typeof(parameters.relaxation)!=="undefined"){c.relaxation=parameters.relaxation;c.frictionRelaxation=parameters.relaxation;}};World.prototype.setGlobalStiffness=function(stiffness){this.setGlobalEquationParameters({stiffness:stiffness});};World.prototype.setGlobalRelaxation=function(relaxation){this.setGlobalEquationParameters({relaxation:relaxation});};},{"../../package.json":7,"../collision/Broadphase":9,"../collision/NaiveBroadphase":11,"../collision/Narrowphase":12,"../collision/SAPBroadphase":13,"../constraints/Constraint":14,"../constraints/DistanceConstraint":15,"../constraints/GearConstraint":16,"../constraints/LockConstraint":17,"../constraints/PrismaticConstraint":18,"../constraints/RevoluteConstraint":19,"../events/EventEmitter":26,"../material/ContactMaterial":27,"../material/Material":28,"../math/vec2":30,"../objects/Body":31,"../objects/Spring":32,"../shapes/Capsule":34,"../shapes/Circle":35,"../shapes/Convex":36,"../shapes/Line":38,"../shapes/Particle":39,"../shapes/Plane":40,"../shapes/Rectangle":41,"../shapes/Shape":42,"../solver/GSSolver":43,"../solver/Solver":44,"../utils/OverlapKeeper":45,"../utils/Utils":47,"./IslandManager":49}]},{},[33])
(33)});;;p2.Body.prototype.parent=null;p2.Spring.prototype.parent=null;Phaser.Physics.P2=function(game,config){this.game=game;if(typeof config==='undefined'||!config.hasOwnProperty('gravity')||!config.hasOwnProperty('broadphase'))
{config={gravity:[0,0],broadphase:new p2.SAPBroadphase()};}
this.world=new p2.World(config);this.frameRate=1/60;this.useElapsedTime=false;this.paused=false;this.materials=[];this.gravity=new Phaser.Physics.P2.InversePointProxy(this,this.world.gravity);this.walls={left:null,right:null,top:null,bottom:null};this.onBodyAdded=new Phaser.Signal();this.onBodyRemoved=new Phaser.Signal();this.onSpringAdded=new Phaser.Signal();this.onSpringRemoved=new Phaser.Signal();this.onConstraintAdded=new Phaser.Signal();this.onConstraintRemoved=new Phaser.Signal();this.onContactMaterialAdded=new Phaser.Signal();this.onContactMaterialRemoved=new Phaser.Signal();this.postBroadphaseCallback=null;this.callbackContext=null;this.onBeginContact=new Phaser.Signal();this.onEndContact=new Phaser.Signal();if(config.hasOwnProperty('mpx')&&config.hasOwnProperty('pxm')&&config.hasOwnProperty('mpxi')&&config.hasOwnProperty('pxmi'))
{this.mpx=config.mpx;this.mpxi=config.mpxi;this.pxm=config.pxm;this.pxmi=config.pxmi;}
this.world.on("beginContact",this.beginContactHandler,this);this.world.on("endContact",this.endContactHandler,this);this.collisionGroups=[];this.nothingCollisionGroup=new Phaser.Physics.P2.CollisionGroup(1);this.boundsCollisionGroup=new Phaser.Physics.P2.CollisionGroup(2);this.everythingCollisionGroup=new Phaser.Physics.P2.CollisionGroup(2147483648);this.boundsCollidesWith=[];this._toRemove=[];this._collisionGroupID=2;this.setBoundsToWorld(true,true,true,true,false);};Phaser.Physics.P2.prototype={removeBodyNextStep:function(body){this._toRemove.push(body);},preUpdate:function(){var i=this._toRemove.length;while(i--)
{this.removeBody(this._toRemove[i]);}
this._toRemove.length=0;},enable:function(object,debug,children){if(typeof debug==='undefined'){debug=false;}
if(typeof children==='undefined'){children=true;}
var i=1;if(Array.isArray(object))
{i=object.length;while(i--)
{if(object[i]instanceof Phaser.Group)
{this.enable(object[i].children,debug,children);}
else
{this.enableBody(object[i],debug);if(children&&object[i].hasOwnProperty('children')&&object[i].children.length>0)
{this.enable(object[i],debug,true);}}}}
else
{if(object instanceof Phaser.Group)
{this.enable(object.children,debug,children);}
else
{this.enableBody(object,debug);if(children&&object.hasOwnProperty('children')&&object.children.length>0)
{this.enable(object.children,debug,true);}}}},enableBody:function(object,debug){if(object.hasOwnProperty('body')&&object.body===null)
{object.body=new Phaser.Physics.P2.Body(this.game,object,object.x,object.y,1);object.body.debug=debug;object.anchor.set(0.5);}},setImpactEvents:function(state){if(state)
{this.world.on("impact",this.impactHandler,this);}
else
{this.world.off("impact",this.impactHandler,this);}},setPostBroadphaseCallback:function(callback,context){this.postBroadphaseCallback=callback;this.callbackContext=context;if(callback!==null)
{this.world.on("postBroadphase",this.postBroadphaseHandler,this);}
else
{this.world.off("postBroadphase",this.postBroadphaseHandler,this);}},postBroadphaseHandler:function(event){if(this.postBroadphaseCallback)
{var i=event.pairs.length;while(i-=2)
{if(event.pairs[i].parent&&event.pairs[i+1].parent&&!this.postBroadphaseCallback.call(this.callbackContext,event.pairs[i].parent,event.pairs[i+1].parent))
{event.pairs.splice(i,2);}}}},impactHandler:function(event){if(event.bodyA.parent&&event.bodyB.parent)
{var a=event.bodyA.parent;var b=event.bodyB.parent;if(a._bodyCallbacks[event.bodyB.id])
{a._bodyCallbacks[event.bodyB.id].call(a._bodyCallbackContext[event.bodyB.id],a,b,event.shapeA,event.shapeB);}
if(b._bodyCallbacks[event.bodyA.id])
{b._bodyCallbacks[event.bodyA.id].call(b._bodyCallbackContext[event.bodyA.id],b,a,event.shapeB,event.shapeA);}
if(a._groupCallbacks[event.shapeB.collisionGroup])
{a._groupCallbacks[event.shapeB.collisionGroup].call(a._groupCallbackContext[event.shapeB.collisionGroup],a,b,event.shapeA,event.shapeB);}
if(b._groupCallbacks[event.shapeA.collisionGroup])
{b._groupCallbacks[event.shapeA.collisionGroup].call(b._groupCallbackContext[event.shapeA.collisionGroup],b,a,event.shapeB,event.shapeA);}}},beginContactHandler:function(event){this.onBeginContact.dispatch(event.bodyA,event.bodyB,event.shapeA,event.shapeB,event.contactEquations);if(event.bodyA.parent)
{event.bodyA.parent.onBeginContact.dispatch(event.bodyB.parent,event.shapeA,event.shapeB,event.contactEquations);}
if(event.bodyB.parent)
{event.bodyB.parent.onBeginContact.dispatch(event.bodyA.parent,event.shapeB,event.shapeA,event.contactEquations);}},endContactHandler:function(event){this.onEndContact.dispatch(event.bodyA,event.bodyB,event.shapeA,event.shapeB);if(event.bodyA.parent)
{event.bodyA.parent.onEndContact.dispatch(event.bodyB.parent,event.shapeA,event.shapeB);}
if(event.bodyB.parent)
{event.bodyB.parent.onEndContact.dispatch(event.bodyA.parent,event.shapeB,event.shapeA);}},setBoundsToWorld:function(left,right,top,bottom,setCollisionGroup){this.setBounds(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height,left,right,top,bottom,setCollisionGroup);},setWorldMaterial:function(material,left,right,top,bottom){if(typeof left==='undefined'){left=true;}
if(typeof right==='undefined'){right=true;}
if(typeof top==='undefined'){top=true;}
if(typeof bottom==='undefined'){bottom=true;}
if(left&&this.walls.left)
{this.walls.left.shapes[0].material=material;}
if(right&&this.walls.right)
{this.walls.right.shapes[0].material=material;}
if(top&&this.walls.top)
{this.walls.top.shapes[0].material=material;}
if(bottom&&this.walls.bottom)
{this.walls.bottom.shapes[0].material=material;}},updateBoundsCollisionGroup:function(setCollisionGroup){var mask=this.everythingCollisionGroup.mask;if(typeof setCollisionGroup==='undefined'){mask=this.boundsCollisionGroup.mask;}
if(this.walls.left)
{this.walls.left.shapes[0].collisionGroup=mask;}
if(this.walls.right)
{this.walls.right.shapes[0].collisionGroup=mask;}
if(this.walls.top)
{this.walls.top.shapes[0].collisionGroup=mask;}
if(this.walls.bottom)
{this.walls.bottom.shapes[0].collisionGroup=mask;}},setBounds:function(x,y,width,height,left,right,top,bottom,setCollisionGroup){if(typeof left==='undefined'){left=true;}
if(typeof right==='undefined'){right=true;}
if(typeof top==='undefined'){top=true;}
if(typeof bottom==='undefined'){bottom=true;}
if(typeof setCollisionGroup==='undefined'){setCollisionGroup=true;}
if(this.walls.left)
{this.world.removeBody(this.walls.left);}
if(this.walls.right)
{this.world.removeBody(this.walls.right);}
if(this.walls.top)
{this.world.removeBody(this.walls.top);}
if(this.walls.bottom)
{this.world.removeBody(this.walls.bottom);}
if(left)
{this.walls.left=new p2.Body({mass:0,position:[this.pxmi(x),this.pxmi(y)],angle:1.5707963267948966});this.walls.left.addShape(new p2.Plane());if(setCollisionGroup)
{this.walls.left.shapes[0].collisionGroup=this.boundsCollisionGroup.mask;}
this.world.addBody(this.walls.left);}
if(right)
{this.walls.right=new p2.Body({mass:0,position:[this.pxmi(x+width),this.pxmi(y)],angle:-1.5707963267948966});this.walls.right.addShape(new p2.Plane());if(setCollisionGroup)
{this.walls.right.shapes[0].collisionGroup=this.boundsCollisionGroup.mask;}
this.world.addBody(this.walls.right);}
if(top)
{this.walls.top=new p2.Body({mass:0,position:[this.pxmi(x),this.pxmi(y)],angle:-3.141592653589793});this.walls.top.addShape(new p2.Plane());if(setCollisionGroup)
{this.walls.top.shapes[0].collisionGroup=this.boundsCollisionGroup.mask;}
this.world.addBody(this.walls.top);}
if(bottom)
{this.walls.bottom=new p2.Body({mass:0,position:[this.pxmi(x),this.pxmi(height)]});this.walls.bottom.addShape(new p2.Plane());if(setCollisionGroup)
{this.walls.bottom.shapes[0].collisionGroup=this.boundsCollisionGroup.mask;}
this.world.addBody(this.walls.bottom);}},pause:function(){this.paused=true;},resume:function(){this.paused=false;},update:function(){if(this.paused)
{return;}
if(this.useElapsedTime)
{this.world.step(this.game.time.physicsElapsed);}
else
{this.world.step(this.frameRate);}},clear:function(){this.world.clear();this.world.off("beginContact",this.beginContactHandler,this);this.world.off("endContact",this.endContactHandler,this);this.postBroadphaseCallback=null;this.callbackContext=null;this.impactCallback=null;this.collisionGroups=[];this._toRemove=[];this._collisionGroupID=2;this.boundsCollidesWith=[];},destroy:function(){this.clear();this.game=null;},addBody:function(body){if(body.data.world)
{return false;}
else
{this.world.addBody(body.data);this.onBodyAdded.dispatch(body);return true;}},removeBody:function(body){if(body.data.world==this.world)
{this.world.removeBody(body.data);this.onBodyRemoved.dispatch(body);}
return body;},addSpring:function(spring){this.world.addSpring(spring);this.onSpringAdded.dispatch(spring);return spring;},removeSpring:function(spring){this.world.removeSpring(spring);this.onSpringRemoved.dispatch(spring);return spring;},createDistanceConstraint:function(bodyA,bodyB,distance,maxForce){bodyA=this.getBody(bodyA);bodyB=this.getBody(bodyB);if(!bodyA||!bodyB)
{console.warn('Cannot create Constraint, invalid body objects given');}
else
{return this.addConstraint(new Phaser.Physics.P2.DistanceConstraint(this,bodyA,bodyB,distance,maxForce));}},createGearConstraint:function(bodyA,bodyB,angle,ratio){bodyA=this.getBody(bodyA);bodyB=this.getBody(bodyB);if(!bodyA||!bodyB)
{console.warn('Cannot create Constraint, invalid body objects given');}
else
{return this.addConstraint(new Phaser.Physics.P2.GearConstraint(this,bodyA,bodyB,angle,ratio));}},createRevoluteConstraint:function(bodyA,pivotA,bodyB,pivotB,maxForce){bodyA=this.getBody(bodyA);bodyB=this.getBody(bodyB);if(!bodyA||!bodyB)
{console.warn('Cannot create Constraint, invalid body objects given');}
else
{return this.addConstraint(new Phaser.Physics.P2.RevoluteConstraint(this,bodyA,pivotA,bodyB,pivotB,maxForce));}},createLockConstraint:function(bodyA,bodyB,offset,angle,maxForce){bodyA=this.getBody(bodyA);bodyB=this.getBody(bodyB);if(!bodyA||!bodyB)
{console.warn('Cannot create Constraint, invalid body objects given');}
else
{return this.addConstraint(new Phaser.Physics.P2.LockConstraint(this,bodyA,bodyB,offset,angle,maxForce));}},createPrismaticConstraint:function(bodyA,bodyB,lockRotation,anchorA,anchorB,axis,maxForce){bodyA=this.getBody(bodyA);bodyB=this.getBody(bodyB);if(!bodyA||!bodyB)
{console.warn('Cannot create Constraint, invalid body objects given');}
else
{return this.addConstraint(new Phaser.Physics.P2.PrismaticConstraint(this,bodyA,bodyB,lockRotation,anchorA,anchorB,axis,maxForce));}},addConstraint:function(constraint){this.world.addConstraint(constraint);this.onConstraintAdded.dispatch(constraint);return constraint;},removeConstraint:function(constraint){this.world.removeConstraint(constraint);this.onConstraintRemoved.dispatch(constraint);return constraint;},addContactMaterial:function(material){this.world.addContactMaterial(material);this.onContactMaterialAdded.dispatch(material);return material;},removeContactMaterial:function(material){this.world.removeContactMaterial(material);this.onContactMaterialRemoved.dispatch(material);return material;},getContactMaterial:function(materialA,materialB){return this.world.getContactMaterial(materialA,materialB);},setMaterial:function(material,bodies){var i=bodies.length;while(i--)
{bodies[i].setMaterial(material);}},createMaterial:function(name,body){name=name||'';var material=new Phaser.Physics.P2.Material(name);this.materials.push(material);if(typeof body!=='undefined')
{body.setMaterial(material);}
return material;},createContactMaterial:function(materialA,materialB,options){if(typeof materialA==='undefined'){materialA=this.createMaterial();}
if(typeof materialB==='undefined'){materialB=this.createMaterial();}
var contact=new Phaser.Physics.P2.ContactMaterial(materialA,materialB,options);return this.addContactMaterial(contact);},getBodies:function(){var output=[];var i=this.world.bodies.length;while(i--)
{output.push(this.world.bodies[i].parent);}
return output;},getBody:function(object){if(object instanceof p2.Body)
{return object;}
else if(object instanceof Phaser.Physics.P2.Body)
{return object.data;}
else if(object['body']&&object['body'].type===Phaser.Physics.P2JS)
{return object.body.data;}
return null;},getSprings:function(){var output=[];var i=this.world.springs.length;while(i--)
{output.push(this.world.springs[i].parent);}
return output;},getConstraints:function(){var output=[];var i=this.world.constraints.length;while(i--)
{output.push(this.world.constraints[i].parent);}
return output;},hitTest:function(worldPoint,bodies,precision,filterStatic){if(typeof bodies==='undefined'){bodies=this.world.bodies;}
if(typeof precision==='undefined'){precision=5;}
if(typeof filterStatic==='undefined'){filterStatic=false;}
var physicsPosition=[this.pxmi(worldPoint.x),this.pxmi(worldPoint.y)];var query=[];var i=bodies.length;while(i--)
{if(bodies[i]instanceof Phaser.Physics.P2.Body&&!(filterStatic&&bodies[i].data.motionState===p2.Body.STATIC))
{query.push(bodies[i].data);}
else if(bodies[i]instanceof p2.Body&&bodies[i].parent&&!(filterStatic&&bodies[i].motionState===p2.Body.STATIC))
{query.push(bodies[i]);}
else if(bodies[i]instanceof Phaser.Sprite&&bodies[i].hasOwnProperty('body')&&!(filterStatic&&bodies[i].body.data.motionState===p2.Body.STATIC))
{query.push(bodies[i].body.data);}}
return this.world.hitTest(physicsPosition,query,precision);},toJSON:function(){return this.world.toJSON();},createCollisionGroup:function(object){var bitmask=Math.pow(2,this._collisionGroupID);if(this.walls.left)
{this.walls.left.shapes[0].collisionMask=this.walls.left.shapes[0].collisionMask|bitmask;}
if(this.walls.right)
{this.walls.right.shapes[0].collisionMask=this.walls.right.shapes[0].collisionMask|bitmask;}
if(this.walls.top)
{this.walls.top.shapes[0].collisionMask=this.walls.top.shapes[0].collisionMask|bitmask;}
if(this.walls.bottom)
{this.walls.bottom.shapes[0].collisionMask=this.walls.bottom.shapes[0].collisionMask|bitmask;}
this._collisionGroupID++;var group=new Phaser.Physics.P2.CollisionGroup(bitmask);this.collisionGroups.push(group);if(object)
{this.setCollisionGroup(object,group);}
return group;},setCollisionGroup:function(object,group){if(object instanceof Phaser.Group)
{for(var i=0;i<object.total;i++)
{if(object.children[i]['body']&&object.children[i]['body'].type===Phaser.Physics.P2JS)
{object.children[i].body.setCollisionGroup(group);}}}
else
{object.body.setCollisionGroup(group);}},createSpring:function(bodyA,bodyB,restLength,stiffness,damping,worldA,worldB,localA,localB){bodyA=this.getBody(bodyA);bodyB=this.getBody(bodyB);if(!bodyA||!bodyB)
{console.warn('Cannot create Spring, invalid body objects given');}
else
{return this.addSpring(new Phaser.Physics.P2.Spring(this,bodyA,bodyB,restLength,stiffness,damping,worldA,worldB,localA,localB));}},createBody:function(x,y,mass,addToWorld,options,data){if(typeof addToWorld==='undefined'){addToWorld=false;}
var body=new Phaser.Physics.P2.Body(this.game,null,x,y,mass);if(data)
{var result=body.addPolygon(options,data);if(!result)
{return false;}}
if(addToWorld)
{this.world.addBody(body.data);}
return body;},createParticle:function(x,y,mass,addToWorld,options,data){if(typeof addToWorld==='undefined'){addToWorld=false;}
var body=new Phaser.Physics.P2.Body(this.game,null,x,y,mass);if(data)
{var result=body.addPolygon(options,data);if(!result)
{return false;}}
if(addToWorld)
{this.world.addBody(body.data);}
return body;},convertCollisionObjects:function(map,layer,addToWorld){if(typeof addToWorld==='undefined'){addToWorld=true;}
var output=[];for(var i=0,len=map.collision[layer].length;i<len;i++)
{var object=map.collision[layer][i];var body=this.createBody(object.x,object.y,0,addToWorld,{},object.polyline);if(body)
{output.push(body);}}
return output;},clearTilemapLayerBodies:function(map,layer){layer=map.getLayer(layer);var i=map.layers[layer].bodies.length;while(i--)
{map.layers[layer].bodies[i].destroy();}
map.layers[layer].bodies.length=[];},convertTilemap:function(map,layer,addToWorld,optimize){layer=map.getLayer(layer);if(typeof addToWorld==='undefined'){addToWorld=true;}
if(typeof optimize==='undefined'){optimize=true;}
this.clearTilemapLayerBodies(map,layer);var width=0;var sx=0;var sy=0;for(var y=0,h=map.layers[layer].height;y<h;y++)
{width=0;for(var x=0,w=map.layers[layer].width;x<w;x++)
{var tile=map.layers[layer].data[y][x];if(tile&&tile.collides)
{if(optimize)
{var right=map.getTileRight(layer,x,y);if(width===0)
{sx=tile.x*tile.width;sy=tile.y*tile.height;width=tile.width;}
if(right&&right.collides)
{width+=tile.width;}
else
{var body=this.createBody(sx,sy,0,false);body.addRectangle(width,tile.height,width/2,tile.height/2,0);if(addToWorld)
{this.addBody(body);}
map.layers[layer].bodies.push(body);width=0;}}
else
{var body=this.createBody(tile.x*tile.width,tile.y*tile.height,0,false);body.addRectangle(tile.width,tile.height,tile.width/2,tile.height/2,0);if(addToWorld)
{this.addBody(body);}
map.layers[layer].bodies.push(body);}}}}
return map.layers[layer].bodies;},mpx:function(v){return v*=20;},pxm:function(v){return v*0.05;},mpxi:function(v){return v*=-20;},pxmi:function(v){return v*-0.05;}};Object.defineProperty(Phaser.Physics.P2.prototype,"friction",{get:function(){return this.world.defaultContactMaterial.friction;},set:function(value){this.world.defaultContactMaterial.friction=value;}});Object.defineProperty(Phaser.Physics.P2.prototype,"defaultFriction",{get:function(){return this.world.defaultContactMaterial.friction;},set:function(value){this.world.defaultContactMaterial.friction=value;}});Object.defineProperty(Phaser.Physics.P2.prototype,"restitution",{get:function(){return this.world.defaultContactMaterial.restitution;},set:function(value){this.world.defaultContactMaterial.restitution=value;}});Object.defineProperty(Phaser.Physics.P2.prototype,"defaultRestitution",{get:function(){return this.world.defaultContactMaterial.restitution;},set:function(value){this.world.defaultContactMaterial.restitution=value;}});Object.defineProperty(Phaser.Physics.P2.prototype,"contactMaterial",{get:function(){return this.world.defaultContactMaterial;},set:function(value){this.world.defaultContactMaterial=value;}});Object.defineProperty(Phaser.Physics.P2.prototype,"applySpringForces",{get:function(){return this.world.applySpringForces;},set:function(value){this.world.applySpringForces=value;}});Object.defineProperty(Phaser.Physics.P2.prototype,"applyDamping",{get:function(){return this.world.applyDamping;},set:function(value){this.world.applyDamping=value;}});Object.defineProperty(Phaser.Physics.P2.prototype,"applyGravity",{get:function(){return this.world.applyGravity;},set:function(value){this.world.applyGravity=value;}});Object.defineProperty(Phaser.Physics.P2.prototype,"solveConstraints",{get:function(){return this.world.solveConstraints;},set:function(value){this.world.solveConstraints=value;}});Object.defineProperty(Phaser.Physics.P2.prototype,"time",{get:function(){return this.world.time;}});Object.defineProperty(Phaser.Physics.P2.prototype,"emitImpactEvent",{get:function(){return this.world.emitImpactEvent;},set:function(value){this.world.emitImpactEvent=value;}});Object.defineProperty(Phaser.Physics.P2.prototype,"enableBodySleeping",{get:function(){return this.world.enableBodySleeping;},set:function(value){this.world.enableBodySleeping=value;}});Object.defineProperty(Phaser.Physics.P2.prototype,"total",{get:function(){return this.world.bodies.length;}});Phaser.Physics.P2.FixtureList=function(list){if(!Array.isArray(list))
{list=[list];}
this.rawList=list;this.init();this.parse(this.rawList);};Phaser.Physics.P2.FixtureList.prototype={init:function(){this.namedFixtures={};this.groupedFixtures=[];this.allFixtures=[];},setCategory:function(bit,fixtureKey){var setter=function(fixture){fixture.collisionGroup=bit;};this.getFixtures(fixtureKey).forEach(setter);},setMask:function(bit,fixtureKey){var setter=function(fixture){fixture.collisionMask=bit;};this.getFixtures(fixtureKey).forEach(setter);},setSensor:function(value,fixtureKey){var setter=function(fixture){fixture.sensor=value;};this.getFixtures(fixtureKey).forEach(setter);},setMaterial:function(material,fixtureKey){var setter=function(fixture){fixture.material=material;};this.getFixtures(fixtureKey).forEach(setter);},getFixtures:function(keys){var fixtures=[];if(keys)
{if(!(keys instanceof Array))
{keys=[keys];}
var self=this;keys.forEach(function(key){if(self.namedFixtures[key])
{fixtures.push(self.namedFixtures[key]);}});return this.flatten(fixtures);}
else
{return this.allFixtures;}},getFixtureByKey:function(key){return this.namedFixtures[key];},getGroup:function(groupID){return this.groupedFixtures[groupID];},parse:function(){var key,value,_ref,_results;_ref=this.rawList;_results=[];for(key in _ref)
{value=_ref[key];if(!isNaN(key-0))
{this.groupedFixtures[key]=this.groupedFixtures[key]||[];this.groupedFixtures[key]=this.groupedFixtures[key].concat(value);}
else
{this.namedFixtures[key]=this.flatten(value);}
_results.push(this.allFixtures=this.flatten(this.groupedFixtures));}},flatten:function(array){var result,self;result=[];self=arguments.callee;array.forEach(function(item){return Array.prototype.push.apply(result,(Array.isArray(item)?self(item):[item]));});return result;}};Phaser.Physics.P2.PointProxy=function(world,destination){this.world=world;this.destination=destination;};Phaser.Physics.P2.PointProxy.prototype.constructor=Phaser.Physics.P2.PointProxy;Object.defineProperty(Phaser.Physics.P2.PointProxy.prototype,"x",{get:function(){return this.destination[0];},set:function(value){this.destination[0]=this.world.pxm(value);}});Object.defineProperty(Phaser.Physics.P2.PointProxy.prototype,"y",{get:function(){return this.destination[1];},set:function(value){this.destination[1]=this.world.pxm(value);}});Phaser.Physics.P2.InversePointProxy=function(world,destination){this.world=world;this.destination=destination;};Phaser.Physics.P2.InversePointProxy.prototype.constructor=Phaser.Physics.P2.InversePointProxy;Object.defineProperty(Phaser.Physics.P2.InversePointProxy.prototype,"x",{get:function(){return this.destination[0];},set:function(value){this.destination[0]=this.world.pxm(-value);}});Object.defineProperty(Phaser.Physics.P2.InversePointProxy.prototype,"y",{get:function(){return this.destination[1];},set:function(value){this.destination[1]=this.world.pxm(-value);}});Phaser.Physics.P2.Body=function(game,sprite,x,y,mass){sprite=sprite||null;x=x||0;y=y||0;if(typeof mass==='undefined'){mass=1;}
this.game=game;this.world=game.physics.p2;this.sprite=sprite;this.type=Phaser.Physics.P2JS;this.offset=new Phaser.Point();this.data=new p2.Body({position:[this.world.pxmi(x),this.world.pxmi(y)],mass:mass});this.data.parent=this;this.velocity=new Phaser.Physics.P2.InversePointProxy(this.world,this.data.velocity);this.force=new Phaser.Physics.P2.InversePointProxy(this.world,this.data.force);this.gravity=new Phaser.Point();this.onBeginContact=new Phaser.Signal();this.onEndContact=new Phaser.Signal();this.collidesWith=[];this.removeNextStep=false;this.debugBody=null;this._collideWorldBounds=true;this._bodyCallbacks={};this._bodyCallbackContext={};this._groupCallbacks={};this._groupCallbackContext={};if(sprite)
{this.setRectangleFromSprite(sprite);if(sprite.exists)
{this.game.physics.p2.addBody(this);}}};Phaser.Physics.P2.Body.prototype={createBodyCallback:function(object,callback,callbackContext){var id=-1;if(object['id'])
{id=object.id;}
else if(object['body'])
{id=object.body.id;}
if(id>-1)
{if(callback===null)
{delete(this._bodyCallbacks[id]);delete(this._bodyCallbackContext[id]);}
else
{this._bodyCallbacks[id]=callback;this._bodyCallbackContext[id]=callbackContext;}}},createGroupCallback:function(group,callback,callbackContext){if(callback===null)
{delete(this._groupCallbacks[group.mask]);delete(this._groupCallbacksContext[group.mask]);}
else
{this._groupCallbacks[group.mask]=callback;this._groupCallbackContext[group.mask]=callbackContext;}},getCollisionMask:function(){var mask=0;if(this._collideWorldBounds)
{mask=this.game.physics.p2.boundsCollisionGroup.mask;}
for(var i=0;i<this.collidesWith.length;i++)
{mask=mask|this.collidesWith[i].mask;}
return mask;},updateCollisionMask:function(shape){var mask=this.getCollisionMask();if(typeof shape==='undefined')
{for(var i=this.data.shapes.length-1;i>=0;i--)
{this.data.shapes[i].collisionMask=mask;}}
else
{shape.collisionMask=mask;}},setCollisionGroup:function(group,shape){var mask=this.getCollisionMask();if(typeof shape==='undefined')
{for(var i=this.data.shapes.length-1;i>=0;i--)
{this.data.shapes[i].collisionGroup=group.mask;this.data.shapes[i].collisionMask=mask;}}
else
{shape.collisionGroup=group.mask;shape.collisionMask=mask;}},clearCollision:function(clearGroup,clearMask,shape){if(typeof shape==='undefined')
{for(var i=this.data.shapes.length-1;i>=0;i--)
{if(clearGroup)
{this.data.shapes[i].collisionGroup=null;}
if(clearMask)
{this.data.shapes[i].collisionMask=null;}}}
else
{if(clearGroup)
{shape.collisionGroup=null;}
if(clearMask)
{shape.collisionMask=null;}}
if(clearGroup)
{this.collidesWith.length=0;}},collides:function(group,callback,callbackContext,shape){if(Array.isArray(group))
{for(var i=0;i<group.length;i++)
{if(this.collidesWith.indexOf(group[i])===-1)
{this.collidesWith.push(group[i]);if(callback)
{this.createGroupCallback(group[i],callback,callbackContext);}}}}
else
{if(this.collidesWith.indexOf(group)===-1)
{this.collidesWith.push(group);if(callback)
{this.createGroupCallback(group,callback,callbackContext);}}}
var mask=this.getCollisionMask();if(typeof shape==='undefined')
{for(var i=this.data.shapes.length-1;i>=0;i--)
{this.data.shapes[i].collisionMask=mask;}}
else
{shape.collisionMask=mask;}},adjustCenterOfMass:function(){this.data.adjustCenterOfMass();},applyDamping:function(dt){this.data.applyDamping(dt);},applyForce:function(force,worldX,worldY){this.data.applyForce(force,[this.world.pxmi(worldX),this.world.pxmi(worldY)]);},setZeroForce:function(){this.data.setZeroForce();},setZeroRotation:function(){this.data.angularVelocity=0;},setZeroVelocity:function(){this.data.velocity[0]=0;this.data.velocity[1]=0;},setZeroDamping:function(){this.data.damping=0;this.data.angularDamping=0;},toLocalFrame:function(out,worldPoint){return this.data.toLocalFrame(out,worldPoint);},toWorldFrame:function(out,localPoint){return this.data.toWorldFrame(out,localPoint);},rotateLeft:function(speed){this.data.angularVelocity=this.world.pxm(-speed);},rotateRight:function(speed){this.data.angularVelocity=this.world.pxm(speed);},moveForward:function(speed){var magnitude=this.world.pxmi(-speed);var angle=this.data.angle+Math.PI/2;this.data.velocity[0]=magnitude*Math.cos(angle);this.data.velocity[1]=magnitude*Math.sin(angle);},moveBackward:function(speed){var magnitude=this.world.pxmi(-speed);var angle=this.data.angle+Math.PI/2;this.data.velocity[0]=-(magnitude*Math.cos(angle));this.data.velocity[1]=-(magnitude*Math.sin(angle));},thrust:function(speed){var magnitude=this.world.pxmi(-speed);var angle=this.data.angle+Math.PI/2;this.data.force[0]+=magnitude*Math.cos(angle);this.data.force[1]+=magnitude*Math.sin(angle);},reverse:function(speed){var magnitude=this.world.pxmi(-speed);var angle=this.data.angle+Math.PI/2;this.data.force[0]-=magnitude*Math.cos(angle);this.data.force[1]-=magnitude*Math.sin(angle);},moveLeft:function(speed){this.data.velocity[0]=this.world.pxmi(-speed);},moveRight:function(speed){this.data.velocity[0]=this.world.pxmi(speed);},moveUp:function(speed){this.data.velocity[1]=this.world.pxmi(-speed);},moveDown:function(speed){this.data.velocity[1]=this.world.pxmi(speed);},preUpdate:function(){if(this.removeNextStep)
{this.removeFromWorld();this.removeNextStep=false;}},postUpdate:function(){this.sprite.x=this.world.mpxi(this.data.position[0]);this.sprite.y=this.world.mpxi(this.data.position[1]);if(!this.fixedRotation)
{this.sprite.rotation=this.data.angle;}},reset:function(x,y,resetDamping,resetMass){if(typeof resetDamping==='undefined'){resetDamping=false;}
if(typeof resetMass==='undefined'){resetMass=false;}
this.setZeroForce();this.setZeroVelocity();this.setZeroRotation();if(resetDamping)
{this.setZeroDamping();}
if(resetMass)
{this.mass=1;}
this.x=x;this.y=y;},addToWorld:function(){if(this.data.world!==this.game.physics.p2.world)
{this.game.physics.p2.addBody(this);}},removeFromWorld:function(){if(this.data.world===this.game.physics.p2.world)
{this.game.physics.p2.removeBodyNextStep(this);}},destroy:function(){this.removeFromWorld();this.clearShapes();this._bodyCallbacks={};this._bodyCallbackContext={};this._groupCallbacks={};this._groupCallbackContext={};if(this.debugBody)
{this.debugBody.destroy();}
this.debugBody=null;this.sprite=null;},clearShapes:function(){var i=this.data.shapes.length;while(i--)
{this.data.removeShape(this.data.shapes[i]);}
this.shapeChanged();},addShape:function(shape,offsetX,offsetY,rotation){if(typeof offsetX==='undefined'){offsetX=0;}
if(typeof offsetY==='undefined'){offsetY=0;}
if(typeof rotation==='undefined'){rotation=0;}
this.data.addShape(shape,[this.world.pxmi(offsetX),this.world.pxmi(offsetY)],rotation);this.shapeChanged();return shape;},addCircle:function(radius,offsetX,offsetY,rotation){var shape=new p2.Circle(this.world.pxm(radius));return this.addShape(shape,offsetX,offsetY,rotation);},addRectangle:function(width,height,offsetX,offsetY,rotation){var shape=new p2.Rectangle(this.world.pxm(width),this.world.pxm(height));return this.addShape(shape,offsetX,offsetY,rotation);},addPlane:function(offsetX,offsetY,rotation){var shape=new p2.Plane();return this.addShape(shape,offsetX,offsetY,rotation);},addParticle:function(offsetX,offsetY,rotation){var shape=new p2.Particle();return this.addShape(shape,offsetX,offsetY,rotation);},addLine:function(length,offsetX,offsetY,rotation){var shape=new p2.Line(this.world.pxm(length));return this.addShape(shape,offsetX,offsetY,rotation);},addCapsule:function(length,radius,offsetX,offsetY,rotation){var shape=new p2.Capsule(this.world.pxm(length),radius);return this.addShape(shape,offsetX,offsetY,rotation);},addPolygon:function(options,points){options=options||{};points=Array.prototype.slice.call(arguments,1);var path=[];if(points.length===1&&Array.isArray(points[0]))
{path=points[0].slice(0);}
else if(Array.isArray(points[0]))
{path=points[0].slice(0);}
else if(typeof points[0]==='number')
{for(var i=0,len=points.length;i<len;i+=2)
{path.push([points[i],points[i+1]]);}}
var idx=path.length-1;if(path[idx][0]===path[0][0]&&path[idx][1]===path[0][1])
{path.pop();}
for(var p=0;p<path.length;p++)
{path[p][0]=this.world.pxmi(path[p][0]);path[p][1]=this.world.pxmi(path[p][1]);}
var result=this.data.fromPolygon(path,options);this.shapeChanged();return result;},removeShape:function(shape){return this.data.removeShape(shape);},setCircle:function(radius,offsetX,offsetY,rotation){this.clearShapes();return this.addCircle(radius,offsetX,offsetY,rotation);},setRectangle:function(width,height,offsetX,offsetY,rotation){if(typeof width==='undefined'){width=16;}
if(typeof height==='undefined'){height=16;}
this.clearShapes();return this.addRectangle(width,height,offsetX,offsetY,rotation);},setRectangleFromSprite:function(sprite){if(typeof sprite==='undefined'){sprite=this.sprite;}
this.clearShapes();return this.addRectangle(sprite.width,sprite.height,0,0,sprite.rotation);},setMaterial:function(material,shape){if(typeof shape==='undefined')
{for(var i=this.data.shapes.length-1;i>=0;i--)
{this.data.shapes[i].material=material;}}
else
{shape.material=material;}},shapeChanged:function(){if(this.debugBody)
{this.debugBody.draw();}},addPhaserPolygon:function(key,object){var data=this.game.cache.getPhysicsData(key,object);var createdFixtures=[];for(var i=0;i<data.length;i++)
{var fixtureData=data[i];var shapesOfFixture=this.addFixture(fixtureData);createdFixtures[fixtureData.filter.group]=createdFixtures[fixtureData.filter.group]||[];createdFixtures[fixtureData.filter.group]=createdFixtures[fixtureData.filter.group].concat(shapesOfFixture);if(fixtureData.fixtureKey)
{createdFixtures[fixtureData.fixtureKey]=shapesOfFixture;}}
this.data.aabbNeedsUpdate=true;this.shapeChanged();return createdFixtures;},addFixture:function(fixtureData){var generatedShapes=[];if(fixtureData.circle)
{var shape=new p2.Circle(this.world.pxm(fixtureData.circle.radius));shape.collisionGroup=fixtureData.filter.categoryBits;shape.collisionMask=fixtureData.filter.maskBits;shape.sensor=fixtureData.isSensor;var offset=p2.vec2.create();offset[0]=this.world.pxmi(fixtureData.circle.position[0]-this.sprite.width/2);offset[1]=this.world.pxmi(fixtureData.circle.position[1]-this.sprite.height/2);this.data.addShape(shape,offset);generatedShapes.push(shape);}
else
{var polygons=fixtureData.polygons;var cm=p2.vec2.create();for(var i=0;i<polygons.length;i++)
{var shapes=polygons[i];var vertices=[];for(var s=0;s<shapes.length;s+=2)
{vertices.push([this.world.pxmi(shapes[s]),this.world.pxmi(shapes[s+1])]);}
var shape=new p2.Convex(vertices);for(var j=0;j!==shape.vertices.length;j++)
{var v=shape.vertices[j];p2.vec2.sub(v,v,shape.centerOfMass);}
p2.vec2.scale(cm,shape.centerOfMass,1);cm[0]-=this.world.pxmi(this.sprite.width/2);cm[1]-=this.world.pxmi(this.sprite.height/2);shape.updateTriangles();shape.updateCenterOfMass();shape.updateBoundingRadius();shape.collisionGroup=fixtureData.filter.categoryBits;shape.collisionMask=fixtureData.filter.maskBits;shape.sensor=fixtureData.isSensor;this.data.addShape(shape,cm);generatedShapes.push(shape);}}
return generatedShapes;},loadPolygon:function(key,object){var data=this.game.cache.getPhysicsData(key,object);var cm=p2.vec2.create();for(var i=0;i<data.length;i++)
{var vertices=[];for(var s=0;s<data[i].shape.length;s+=2)
{vertices.push([this.world.pxmi(data[i].shape[s]),this.world.pxmi(data[i].shape[s+1])]);}
var c=new p2.Convex(vertices);for(var j=0;j!==c.vertices.length;j++)
{var v=c.vertices[j];p2.vec2.sub(v,v,c.centerOfMass);}
p2.vec2.scale(cm,c.centerOfMass,1);cm[0]-=this.world.pxmi(this.sprite.width/2);cm[1]-=this.world.pxmi(this.sprite.height/2);c.updateTriangles();c.updateCenterOfMass();c.updateBoundingRadius();this.data.addShape(c,cm);}
this.data.aabbNeedsUpdate=true;this.shapeChanged();return true;},loadData:function(key,object){var data=this.game.cache.getPhysicsData(key,object);if(data&&data.shape)
{this.mass=data.density;return this.loadPolygon(key,object);}}};Phaser.Physics.P2.Body.prototype.constructor=Phaser.Physics.P2.Body;Phaser.Physics.P2.Body.DYNAMIC=1;Phaser.Physics.P2.Body.STATIC=2;Phaser.Physics.P2.Body.KINEMATIC=4;Object.defineProperty(Phaser.Physics.P2.Body.prototype,"static",{get:function(){return(this.data.motionState===Phaser.Physics.P2.Body.STATIC);},set:function(value){if(value&&this.data.motionState!==Phaser.Physics.P2.Body.STATIC)
{this.data.motionState=Phaser.Physics.P2.Body.STATIC;this.mass=0;}
else if(!value&&this.data.motionState===Phaser.Physics.P2.Body.STATIC)
{this.data.motionState=Phaser.Physics.P2.Body.DYNAMIC;if(this.mass===0)
{this.mass=1;}}}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"dynamic",{get:function(){return(this.data.motionState===Phaser.Physics.P2.Body.DYNAMIC);},set:function(value){if(value&&this.data.motionState!==Phaser.Physics.P2.Body.DYNAMIC)
{this.data.motionState=Phaser.Physics.P2.Body.DYNAMIC;if(this.mass===0)
{this.mass=1;}}
else if(!value&&this.data.motionState===Phaser.Physics.P2.Body.DYNAMIC)
{this.data.motionState=Phaser.Physics.P2.Body.STATIC;this.mass=0;}}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"kinematic",{get:function(){return(this.data.motionState===Phaser.Physics.P2.Body.KINEMATIC);},set:function(value){if(value&&this.data.motionState!==Phaser.Physics.P2.Body.KINEMATIC)
{this.data.motionState=Phaser.Physics.P2.Body.KINEMATIC;this.mass=4;}
else if(!value&&this.data.motionState===Phaser.Physics.P2.Body.KINEMATIC)
{this.data.motionState=Phaser.Physics.P2.Body.STATIC;this.mass=0;}}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"allowSleep",{get:function(){return this.data.allowSleep;},set:function(value){if(value!==this.data.allowSleep)
{this.data.allowSleep=value;}}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"angle",{get:function(){return Phaser.Math.wrapAngle(Phaser.Math.radToDeg(this.data.angle));},set:function(value){this.data.angle=Phaser.Math.degToRad(Phaser.Math.wrapAngle(value));}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"angularDamping",{get:function(){return this.data.angularDamping;},set:function(value){this.data.angularDamping=value;}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"angularForce",{get:function(){return this.data.angularForce;},set:function(value){this.data.angularForce=value;}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"angularVelocity",{get:function(){return this.data.angularVelocity;},set:function(value){this.data.angularVelocity=value;}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"damping",{get:function(){return this.data.damping;},set:function(value){this.data.damping=value;}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"fixedRotation",{get:function(){return this.data.fixedRotation;},set:function(value){if(value!==this.data.fixedRotation)
{this.data.fixedRotation=value;}}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"inertia",{get:function(){return this.data.inertia;},set:function(value){this.data.inertia=value;}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"mass",{get:function(){return this.data.mass;},set:function(value){if(value!==this.data.mass)
{this.data.mass=value;this.data.updateMassProperties();}}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"motionState",{get:function(){return this.data.motionState;},set:function(value){if(value!==this.data.motionState)
{this.data.motionState=value;}}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"rotation",{get:function(){return this.data.angle;},set:function(value){this.data.angle=value;}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"sleepSpeedLimit",{get:function(){return this.data.sleepSpeedLimit;},set:function(value){this.data.sleepSpeedLimit=value;}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"x",{get:function(){return this.world.mpxi(this.data.position[0]);},set:function(value){this.data.position[0]=this.world.pxmi(value);}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"y",{get:function(){return this.world.mpxi(this.data.position[1]);},set:function(value){this.data.position[1]=this.world.pxmi(value);}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"id",{get:function(){return this.data.id;}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"debug",{get:function(){return(!this.debugBody);},set:function(value){if(value&&!this.debugBody)
{this.debugBody=new Phaser.Physics.P2.BodyDebug(this.game,this.data);}
else if(!value&&this.debugBody)
{this.debugBody.destroy();this.debugBody=null;}}});Object.defineProperty(Phaser.Physics.P2.Body.prototype,"collideWorldBounds",{get:function(){return this._collideWorldBounds;},set:function(value){if(value&&!this._collideWorldBounds)
{this._collideWorldBounds=true;this.updateCollisionMask();}
else if(!value&&this._collideWorldBounds)
{this._collideWorldBounds=false;this.updateCollisionMask();}}});Phaser.Physics.P2.BodyDebug=function(game,body,settings){Phaser.Group.call(this,game);var defaultSettings={pixelsPerLengthUnit:20,debugPolygons:false,lineWidth:1,alpha:0.5};this.settings=Phaser.Utils.extend(defaultSettings,settings);this.ppu=this.settings.pixelsPerLengthUnit;this.ppu=-1*this.ppu;this.body=body;this.canvas=new Phaser.Graphics(game);this.canvas.alpha=this.settings.alpha;this.add(this.canvas);this.draw();};Phaser.Physics.P2.BodyDebug.prototype=Object.create(Phaser.Group.prototype);Phaser.Physics.P2.BodyDebug.prototype.constructor=Phaser.Physics.P2.BodyDebug;Phaser.Utils.extend(Phaser.Physics.P2.BodyDebug.prototype,{update:function(){this.updateSpriteTransform();},updateSpriteTransform:function(){this.position.x=this.body.position[0]*this.ppu;this.position.y=this.body.position[1]*this.ppu;return this.rotation=this.body.angle;},draw:function(){var angle,child,color,i,j,lineColor,lw,obj,offset,sprite,v,verts,vrot,_j,_ref1;obj=this.body;sprite=this.canvas;sprite.clear();color=parseInt(this.randomPastelHex(),16);lineColor=0xff0000;lw=this.lineWidth;if(obj instanceof p2.Body&&obj.shapes.length)
{var l=obj.shapes.length;i=0;while(i!==l)
{child=obj.shapes[i];offset=obj.shapeOffsets[i];angle=obj.shapeAngles[i];offset=offset||0;angle=angle||0;if(child instanceof p2.Circle)
{this.drawCircle(sprite,offset[0]*this.ppu,offset[1]*this.ppu,angle,child.radius*this.ppu,color,lw);}
else if(child instanceof p2.Convex)
{verts=[];vrot=p2.vec2.create();for(j=_j=0,_ref1=child.vertices.length;0<=_ref1?_j<_ref1:_j>_ref1;j=0<=_ref1?++_j:--_j)
{v=child.vertices[j];p2.vec2.rotate(vrot,v,angle);verts.push([(vrot[0]+offset[0])*this.ppu,-(vrot[1]+offset[1])*this.ppu]);}
this.drawConvex(sprite,verts,child.triangles,lineColor,color,lw,this.settings.debugPolygons,[offset[0]*this.ppu,-offset[1]*this.ppu]);}
else if(child instanceof p2.Plane)
{this.drawPlane(sprite,offset[0]*this.ppu,-offset[1]*this.ppu,color,lineColor,lw*5,lw*10,lw*10,this.ppu*100,angle);}
else if(child instanceof p2.Line)
{this.drawLine(sprite,child.length*this.ppu,lineColor,lw);}
else if(child instanceof p2.Rectangle)
{this.drawRectangle(sprite,offset[0]*this.ppu,-offset[1]*this.ppu,angle,child.width*this.ppu,child.height*this.ppu,lineColor,color,lw);}
i++;}}},drawRectangle:function(g,x,y,angle,w,h,color,fillColor,lineWidth){if(typeof lineWidth==='undefined'){lineWidth=1;}
if(typeof color==='undefined'){color=0x000000;}
g.lineStyle(lineWidth,color,1);g.beginFill(fillColor);g.drawRect(x-w/2,y-h/2,w,h);},drawCircle:function(g,x,y,angle,radius,color,lineWidth){if(typeof lineWidth==='undefined'){lineWidth=1;}
if(typeof color==='undefined'){color=0xffffff;}
g.lineStyle(lineWidth,0x000000,1);g.beginFill(color,1.0);g.drawCircle(x,y,-radius);g.endFill();g.moveTo(x,y);g.lineTo(x+radius*Math.cos(-angle),y+radius*Math.sin(-angle));},drawLine:function(g,len,color,lineWidth){if(typeof lineWidth==='undefined'){lineWidth=1;}
if(typeof color==='undefined'){color=0x000000;}
g.lineStyle(lineWidth*5,color,1);g.moveTo(-len/2,0);g.lineTo(len/2,0);},drawConvex:function(g,verts,triangles,color,fillColor,lineWidth,debug,offset){var colors,i,v,v0,v1,x,x0,x1,y,y0,y1;if(typeof lineWidth==='undefined'){lineWidth=1;}
if(typeof color==='undefined'){color=0x000000;}
if(!debug)
{g.lineStyle(lineWidth,color,1);g.beginFill(fillColor);i=0;while(i!==verts.length)
{v=verts[i];x=v[0];y=v[1];if(i===0)
{g.moveTo(x,-y);}
else
{g.lineTo(x,-y);}
i++;}
g.endFill();if(verts.length>2)
{g.moveTo(verts[verts.length-1][0],-verts[verts.length-1][1]);return g.lineTo(verts[0][0],-verts[0][1]);}}
else
{colors=[0xff0000,0x00ff00,0x0000ff];i=0;while(i!==verts.length+1)
{v0=verts[i%verts.length];v1=verts[(i+1)%verts.length];x0=v0[0];y0=v0[1];x1=v1[0];y1=v1[1];g.lineStyle(lineWidth,colors[i%colors.length],1);g.moveTo(x0,-y0);g.lineTo(x1,-y1);g.drawCircle(x0,-y0,lineWidth*2);i++;}
g.lineStyle(lineWidth,0x000000,1);return g.drawCircle(offset[0],offset[1],lineWidth*2);}},drawPath:function(g,path,color,fillColor,lineWidth){var area,i,lastx,lasty,p1x,p1y,p2x,p2y,p3x,p3y,v,x,y;if(typeof lineWidth==='undefined'){lineWidth=1;}
if(typeof color==='undefined'){color=0x000000;}
g.lineStyle(lineWidth,color,1);if(typeof fillColor==="number")
{g.beginFill(fillColor);}
lastx=null;lasty=null;i=0;while(i<path.length)
{v=path[i];x=v[0];y=v[1];if(x!==lastx||y!==lasty)
{if(i===0)
{g.moveTo(x,y);}
else
{p1x=lastx;p1y=lasty;p2x=x;p2y=y;p3x=path[(i+1)%path.length][0];p3y=path[(i+1)%path.length][1];area=((p2x-p1x)*(p3y-p1y))-((p3x-p1x)*(p2y-p1y));if(area!==0)
{g.lineTo(x,y);}}
lastx=x;lasty=y;}
i++;}
if(typeof fillColor==="number")
{g.endFill();}
if(path.length>2&&typeof fillColor==="number")
{g.moveTo(path[path.length-1][0],path[path.length-1][1]);g.lineTo(path[0][0],path[0][1]);}},drawPlane:function(g,x0,x1,color,lineColor,lineWidth,diagMargin,diagSize,maxLength,angle){var max,xd,yd;if(typeof lineWidth==='undefined'){lineWidth=1;}
if(typeof color==='undefined'){color=0xffffff;}
g.lineStyle(lineWidth,lineColor,11);g.beginFill(color);max=maxLength;g.moveTo(x0,-x1);xd=x0+Math.cos(angle)*this.game.width;yd=x1+Math.sin(angle)*this.game.height;g.lineTo(xd,-yd);g.moveTo(x0,-x1);xd=x0+Math.cos(angle)*-this.game.width;yd=x1+Math.sin(angle)*-this.game.height;g.lineTo(xd,-yd);},randomPastelHex:function(){var blue,green,mix,red;mix=[255,255,255];red=Math.floor(Math.random()*256);green=Math.floor(Math.random()*256);blue=Math.floor(Math.random()*256);red=Math.floor((red+3*mix[0])/4);green=Math.floor((green+3*mix[1])/4);blue=Math.floor((blue+3*mix[2])/4);return this.rgbToHex(red,green,blue);},rgbToHex:function(r,g,b){return this.componentToHex(r)+this.componentToHex(g)+this.componentToHex(b);},componentToHex:function(c){var hex;hex=c.toString(16);if(hex.len===2)
{return hex;}
else
{return hex+'0';}}});Phaser.Physics.P2.Spring=function(world,bodyA,bodyB,restLength,stiffness,damping,worldA,worldB,localA,localB){this.game=world.game;this.world=world;if(typeof restLength==='undefined'){restLength=1;}
if(typeof stiffness==='undefined'){stiffness=100;}
if(typeof damping==='undefined'){damping=1;}
restLength=world.pxm(restLength);var options={restLength:restLength,stiffness:stiffness,damping:damping};if(typeof worldA!=='undefined'&&worldA!==null)
{options.worldAnchorA=[world.pxm(worldA[0]),world.pxm(worldA[1])];}
if(typeof worldB!=='undefined'&&worldB!==null)
{options.worldAnchorB=[world.pxm(worldB[0]),world.pxm(worldB[1])];}
if(typeof localA!=='undefined'&&localA!==null)
{options.localAnchorA=[world.pxm(localA[0]),world.pxm(localA[1])];}
if(typeof localB!=='undefined'&&localB!==null)
{options.localAnchorB=[world.pxm(localB[0]),world.pxm(localB[1])];}
p2.Spring.call(this,bodyA,bodyB,options);};Phaser.Physics.P2.Spring.prototype=Object.create(p2.Spring.prototype);Phaser.Physics.P2.Spring.prototype.constructor=Phaser.Physics.P2.Spring;Phaser.Physics.P2.Material=function(name){this.name=name;p2.Material.call(this);};Phaser.Physics.P2.Material.prototype=Object.create(p2.Material.prototype);Phaser.Physics.P2.Material.prototype.constructor=Phaser.Physics.P2.Material;Phaser.Physics.P2.ContactMaterial=function(materialA,materialB,options){p2.ContactMaterial.call(this,materialA,materialB,options);};Phaser.Physics.P2.ContactMaterial.prototype=Object.create(p2.ContactMaterial.prototype);Phaser.Physics.P2.ContactMaterial.prototype.constructor=Phaser.Physics.P2.ContactMaterial;Phaser.Physics.P2.CollisionGroup=function(bitmask){this.mask=bitmask;};Phaser.Physics.P2.DistanceConstraint=function(world,bodyA,bodyB,distance,maxForce){if(typeof distance==='undefined'){distance=100;}
this.game=world.game;this.world=world;distance=world.pxm(distance);p2.DistanceConstraint.call(this,bodyA,bodyB,distance,maxForce);};Phaser.Physics.P2.DistanceConstraint.prototype=Object.create(p2.DistanceConstraint.prototype);Phaser.Physics.P2.DistanceConstraint.prototype.constructor=Phaser.Physics.P2.DistanceConstraint;Phaser.Physics.P2.GearConstraint=function(world,bodyA,bodyB,angle,ratio){if(typeof angle==='undefined'){angle=0;}
if(typeof ratio==='undefined'){ratio=1;}
this.game=world.game;this.world=world;var options={angle:angle,ratio:ratio};p2.GearConstraint.call(this,bodyA,bodyB,options);};Phaser.Physics.P2.GearConstraint.prototype=Object.create(p2.GearConstraint.prototype);Phaser.Physics.P2.GearConstraint.prototype.constructor=Phaser.Physics.P2.GearConstraint;Phaser.Physics.P2.LockConstraint=function(world,bodyA,bodyB,offset,angle,maxForce){if(typeof offset==='undefined'){offset=[0,0];}
if(typeof angle==='undefined'){angle=0;}
if(typeof maxForce==='undefined'){maxForce=Number.MAX_VALUE;}
this.game=world.game;this.world=world;offset=[world.pxm(offset[0]),world.pxm(offset[1])];var options={localOffsetB:offset,localAngleB:angle,maxForce:maxForce};p2.LockConstraint.call(this,bodyA,bodyB,options);};Phaser.Physics.P2.LockConstraint.prototype=Object.create(p2.LockConstraint.prototype);Phaser.Physics.P2.LockConstraint.prototype.constructor=Phaser.Physics.P2.LockConstraint;Phaser.Physics.P2.PrismaticConstraint=function(world,bodyA,bodyB,lockRotation,anchorA,anchorB,axis,maxForce){if(typeof lockRotation==='undefined'){lockRotation=true;}
if(typeof anchorA==='undefined'){anchorA=[0,0];}
if(typeof anchorB==='undefined'){anchorB=[0,0];}
if(typeof axis==='undefined'){axis=[0,0];}
if(typeof maxForce==='undefined'){maxForce=Number.MAX_VALUE;}
this.game=world.game;this.world=world;anchorA=[world.pxmi(anchorA[0]),world.pxmi(anchorA[1])];anchorB=[world.pxmi(anchorB[0]),world.pxmi(anchorB[1])];var options={localAnchorA:anchorA,localAnchorB:anchorB,localAxisA:axis,maxForce:maxForce,disableRotationalLock:!lockRotation};p2.PrismaticConstraint.call(this,bodyA,bodyB,options);};Phaser.Physics.P2.PrismaticConstraint.prototype=Object.create(p2.PrismaticConstraint.prototype);Phaser.Physics.P2.PrismaticConstraint.prototype.constructor=Phaser.Physics.P2.PrismaticConstraint;Phaser.Physics.P2.RevoluteConstraint=function(world,bodyA,pivotA,bodyB,pivotB,maxForce){if(typeof maxForce==='undefined'){maxForce=Number.MAX_VALUE;}
this.game=world.game;this.world=world;pivotA=[world.pxmi(pivotA[0]),world.pxmi(pivotA[1])];pivotB=[world.pxmi(pivotB[0]),world.pxmi(pivotB[1])];p2.RevoluteConstraint.call(this,bodyA,pivotA,bodyB,pivotB,{maxForce:maxForce});};Phaser.Physics.P2.RevoluteConstraint.prototype=Object.create(p2.RevoluteConstraint.prototype);Phaser.Physics.P2.RevoluteConstraint.prototype.constructor=Phaser.Physics.P2.RevoluteConstraint;
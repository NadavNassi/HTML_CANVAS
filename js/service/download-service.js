'use strict'

function downloadImg(elLink) {
    const image = gCanvas.toDataURL();  
  
    const tmpLink = document.createElement( 'a' );  
    tmpLink.download = 'image.png';
    tmpLink.href = image;  
  
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink ); 
}
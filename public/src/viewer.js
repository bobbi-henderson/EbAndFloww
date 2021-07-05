// You should import the CSS file.
// import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';


// View an image.
if(document.getElementById('image')){
  const viewer = new Viewer(document.getElementById('image'), {
  });
} else if (document.getElementById('images')){
  const gallery = new Viewer(document.getElementById('images'));
}


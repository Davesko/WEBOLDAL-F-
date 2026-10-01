import { createRoot } from 'react-dom/client';
import { PhotoPage } from './archive/archive';
import { Archive } from './archive/home';
import { getPhotograph } from './archive/projects';
// Static export route adapter. The live site uses server-rendered file routes.
const match=window.location.pathname.match(/^\/work\/(\d+)\/?$/);
const photo=match?getPhotograph(match[1]):undefined;
if(photo){document.title=`${photo.title} | Nagyházu Archive`;document.querySelector('meta[name="description"]')?.setAttribute('content',photo.description);}
createRoot(document.getElementById('root')!).render(match?<PhotoPage photoId={match[1]}/>:<Archive/>);

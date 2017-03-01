import './style.css';
import cat from './cat.jpeg';
import  {aa} from './tree';

const app = document.getElementById('app');
//const aa = 'dfdsfdsf';
app.innerHTML = `<h1>CAT CAT CAT ${aa()}</h1> 
				<img src=${cat} />`;

if (module.hot) {
	module.hot.accept();
}

import React,{ Component } from 'react';
import { Link } from 'react-router';
import styles from './App.css';

// where visual things begin
class App extends Component{
	render(){
		return(
			<div>
				<header className={styles.header}>
					<nav>
						<ul className={styles.ul}>
							<li className={styles.list}><Link to="home">HOME</Link></li>
							<li className={styles.list}><Link to="about">ABOUT</Link></li>
						</ul>
					</nav>
				</header>
				<main>
					{ this.props.children }
				</main>
			</div>
		);
	}
}
export default App;

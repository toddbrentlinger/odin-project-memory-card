import Game from './components/Game';
import Footer from './components/Footer';
import './styles/styles.scss';

function App() {
  return (
    <>
      <header>
        <h1>Memory Card Game</h1>
      </header>
      <main>
        <Game />
      </main>
      <Footer
        initialYear={2023}
        sourceCodeUrl="https://github.com/toddbrentlinger/odin-project-memory-card"
      ></Footer>
    </>
  )
}

export default App

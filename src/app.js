import Item from 'components/Item'
import Footer from 'components/Footer'
import './common/style/base.css'
import './common/style/index.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      todosData: [],
      inputVal: ''
    }

    this.inputChange = this.inputChange.bind(this)
    this.handleKeyDownPost = this.handleKeyDownPost.bind(this)
    this.onDestroy = this.onDestroy.bind(this)
    this.onClearCompleted.bind(this)
  }

  inputChange (ev) {
    this.setState({
      inputVal: ev.target.value
    })
  }

  handleKeyDownPost (ev) {
    if (ev.keyCode !== 13) return
    let {inputVal} = this.state
    let value = inputVal.trim()
    if (value === '') return
    let todo = {}
    todo.id = new Date().getTime()
    todo.value = value
    todo.hasCompleted = false
    let {todosData} = this.state
    todosData.push(todo)
    this.setState({
      todosData,
      inputVal: ''
    })
  }

  onDestroy (todo) {
    let {todosData} = this.state
    todosData = todosData.filter(e => {
      return e.id !== todo.id
    })

    this.setState({todosData})
  }

  onClearCompleted () {
    let {todosData} = this.state
    todosData = todosData.filter(e => {
      return !elt.hasCompleted
    })

    this.setState({todosData})
  }

  render () {
    let {inputChange, handleKeyDownPost, onDestroy, onClearCompleted} = this
    let {todosData, inputVal} = this.state
    let items = null
    items = todosData.map((e, i) => {
      return (
        <Item {...{onDestroy, todo:e}} key={i}/>
      )
    })

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input type="text"
            className="new-todo"
            value={inputVal}
            onChange={inputChange}
            onKeyDown={handleKeyDownPost}/>
        </header>
        <section className="main">
          <input type="checkbox" className="toggle-all"/>
          <ul className="todo-list">
            {items}
          </ul>
        </section>
        <Footer/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}

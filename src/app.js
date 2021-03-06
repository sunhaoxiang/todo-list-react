import Item from 'components/Item'
import Footer from 'components/Footer'
import './common/style/base.css'
import './common/style/index.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      todosData: [],
      inputVal: '',
      view: 'all'
    }

    this.inputChange = this.inputChange.bind(this)
    this.handleKeyDownPost = this.handleKeyDownPost.bind(this)
    this.onDestroy = this.onDestroy.bind(this)
    this.onClearCompleted.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.changeView = this.changeView.bind(this)
    this.itemEditDone = this.itemEditDone.bind(this)
  }

  itemEditDone (todo, value) {
    let {todosData} = this.state

    todosData = todosData.map(e => {
      if(todo.id === e.id) {
        e.value = value
      }
      return e
    })
  }

  changeView (view) {
    this.setState({view})
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

  toggleAll (ev) {
    let {checked} = ev.target
    let {todosData} = this.state
    todosData = todosData.map(e => {
      e.hasCompleted = checked
      return e
    })
    this.setState({
      todosData
    })
  }

  onToggle (todo) {
    let {todosData} = this.state
    todosData = todosData.map(e => {
      if (e.id === todo.id) {
        e.hasCompleted = !e.hasCompleted
      }
      return e
    })
    this.setState({
      todosData
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
    let {
      inputChange, 
      handleKeyDownPost, 
      onDestroy, 
      onClearCompleted, 
      toggleAll, 
      onToggle, 
      changeView,
      itemEditDone
    } = this
    let {todosData, inputVal, view} = this.state
    let items = null
    let footer = null
    let itemsBox = null
    let leftCount = todosData.length

    items = todosData.filter(e => {
      if (e.hasCompleted) leftCount--
      switch (view) {
        case 'active':
          return !e.hasCompleted
        case 'completed':
          return e.hasCompleted
        default:
          return true
      }
    })

    items = items.map((e, i) => {
      return (
        <Item 
          {...{
            onDestroy, 
            onToggle, 
            itemEditDone,
            todo:e
          }} 
          key={i}
        />
      )
    })

    if (todosData.length) {
      itemsBox = (
        <section className="main">
          <input
            type="checkbox"
            className="toggle-all"
            checked={leftCount === 0}
            onChange={toggleAll}/>
          <ul className="todo-list">
            {items}
          </ul>
        </section>
      )
      footer = (
        <Footer
          {...{
            leftCount,
            showClearButton: leftCount < todosData.length,
            onClearCompleted,
            changeView,
            view
          }}
        />
      )
    }

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
        {itemsBox}
        {footer}
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

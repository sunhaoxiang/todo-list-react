let propTypes = {
  todo: PT.object,
  onDestroy: PT.func,
  onToggle: PT.func
}

export default class Item extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let {todo, onDestroy, onToggle} = this.props

    return (
      <li>
        <div className="view">
          <input
          type="checkbox"
          className="toggle"
          checked={todo.hasCompleted}
          onChange={ev => {onToggle(todo)}}/>
          <label>{todo.value}</label>
          <button className="destroy" onClick={ev => onDestroy(todo)}></button>
        </div>
        <input type="text" className="edit"/>
      </li>
    )
  }
}

Item.propTypes = propTypes

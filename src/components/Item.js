let propTypes = {
  todo: PT.object,
  onDestroy: PT.func,
  onToggle: PT.func,
  itemEditDone: PT.func
}

export default class Item extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      inEdit: false,
      val: ''
    }

    this.onEdit = this.onEdit.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onEnter = this.onEnter.bind(this)
    this.itemEditDone = this.itemEditDone.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }

  inputChange (ev) {
    this.setState({
      val: ev.target.value
    })
  }

  onEdit () {
    let {value} = this.props.todo

    this.setState({
      inEdit: true,
      val: value
    }, () => this.refs.editInput.focus())
  }

  itemEditDone () {
    this.setState({
      inEdit: false
    })
    let {itemEditDone, todo} = this.props
    let {val} = this.state

    itemEditDone(todo, val)
  }

  onBlur () {
    this.itemEditDone()
  }

  onEnter (ev) {
    if (ev.keyCode !== 13) return
    this.itemEditDone()
  }

  render () {
    let {onEdit, onBlur, onEnter, inputChange} = this
    let {todo, onDestroy, onToggle} = this.props
    let {inEdit, val} = this.state

    let itemClassName = todo.hasCompleted ? 'completed' : ''

    if (inEdit) itemClassName += 'editing'

    return (
      <li className={itemClassName}>
        <div className="view">
          <input
          type="checkbox"
          className="toggle"
          checked={todo.hasCompleted}
          onChange={ev => {onToggle(todo)}}/>
          <label onDoubleClick={onEdit}>{todo.value}</label>
          <button className="destroy" onClick={ev => onDestroy(todo)}></button>
        </div>
        <input
          type="text" 
          className="edit"
          value={val}
          onBlur={onBlur}
          onKeyDown={onEnter}
          onChange={inputChange}
          ref="editInput"
        />
      </li>
    )
  }
}

Item.propTypes = propTypes

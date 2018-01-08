export default class Item extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <li>
        <div className="view">
          <input type="checkbox" className="toggle"/>
          <label>content</label>
          <button className="destory"></button>
        </div>
        <input type="text" className="edit"/>
      </li>
    )
  }
}

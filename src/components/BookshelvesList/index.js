import './index.css'

const BookshelvesList = props => {
  const {bookshelvesDetails, changeShelfLabel} = props
  const {id, label} = bookshelvesDetails
  const onChangeLabel = () => {
    changeShelfLabel(id)
  }
  return (
    <button className="shelf-button" type="button" onClick={onChangeLabel}>
      {label}
    </button>
  )
}

export default BookshelvesList

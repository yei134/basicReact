const Item = ({ id, note, date, time, listDelete, submittingState}) => {
  function deleteItem() {
    submittingState.current = true
    listDelete(function (prev) {
      return prev.filter((item) => item.id !== id);
    });
  }
  return (
    <div className="item">
      <div>
        <p>{note}</p>
        <p>{`${date} ${time}`}</p>
      </div>
      <button onClick={deleteItem} className="remove">
        刪除
      </button>
    </div>
  );
};

export default Item;

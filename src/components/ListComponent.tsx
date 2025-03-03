import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import AddMemberForm from "./AddMemberForm";
import '../css/list-component.css';

interface ListProps {
  listHeading: string;
  listOfItems: string[];
}

function ListComponent({ listHeading, listOfItems }: ListProps) {
  const [selectedItemIndex, setSelectedIndex] = useState(-1);
  const [addBtnIsClicked, showAddMemberForm] = useState(false)
  return (
    <Fragment>
      <div className="list-container">
        <div className="list-header">
          <h1 className="list-header-title">
            List of {listHeading}
          </h1>
          <button
            className="list-header-button btn btn-secondary"
            onClick={() => showAddMemberForm(!addBtnIsClicked)}
          >
            Add List member
          </button>
        </div>
        
        {listOfItems.length === 0 && <p className="list-empty-message">No items found</p>}
        {addBtnIsClicked && <AddMemberForm item={listOfItems} />}
        
        <ul className="list-group">
          {listOfItems.map((item, index) =>
            <li
              className={
                selectedItemIndex === index
                  ? "list-group-item list-item-active"
                  : "list-group-item"
              }
              key={index}
              onClick={() => {
                setSelectedIndex(index);
              }}
            >
              <div className="list-item-title">{item}</div>
            </li>
          )}
        </ul>
      </div>
    </Fragment>
  );
}

export default ListComponent;
